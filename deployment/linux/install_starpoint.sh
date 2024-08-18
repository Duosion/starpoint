#! /bin/bash
# Install starpoint dependencies automatically using the NGINX deployment configuration
# Do not run if you require any kind of custom configuration

if [ "$STARPOINT_ROOT" = '' ]; then
    . $(dirname ${BASH_SOURCE[0]})/../starpoint_script_setup_env.sh || return $?
fi

#CONFIGURATION OPTIONS TO ADD:
#Generate configs only
#Dry run (if possible)
#No ENV file (will require adding at least SOME command flags)
#Skip installing dependencies

allow_config_override(){
    if [ "$FORCE_CONFIGURE_DEPENDENCIES" = true ]; then
        return 0
    fi
    return 1
}

on_step_fail () {
    if [ "$HALT_INSTALL_ON_STEP_ERROR" = true ]; then
        handle_critical "$@"
    else
        handle_error "$@"
    fi
}

on_step_failf () {
    if [ "$HALT_INSTALL_ON_STEP_ERROR" = true ]; then
        handle_criticalf "$@"
    else
        handle_errorf "$@"
    fi
}

on_critical_step_failf (){
    #We're gonna exit on this anyway, so might as well!
    HALT_INSTALL_ON_STEP_ERROR=true
    on_step_failf "$@"
}

set_default_variables(){
    set -a
    AUTO_INSTALL_PACKAGES=${AUTO_INSTALL_PACKAGES:-true}
    INSTALL_ENV_FILE=${INSTALL_ENV_FILE:-"$STARPOINT_ROOT/deployment/linux/.env"}
    STARPOINT_SERVICE_NAME=${STARPOINT_SERVICE_NAME:-"starpoint"}
    DEPLOYMENT_DIRECTORY=${DEPLOYMENT_DIRECTORY:-"$STARPOINT_ROOT/deployment/.deployed"}
    DNS_CONFIG_FILE_NAME=${DNS_CONFIG_FILE_NAME:-"starpoint_proxy_dnsmasq.conf"}
    PROXY_IP=${PROXY_IP:-'PLEASE SET PROXY_IP IN THE .env FILE OR AS AN ENV VARIABLE!'}
    #TODO: put checks for this everywhere, and then maybe a flag or prompt. Last step you need to do before submitting.
    FORCE_CONFIGURE_DEPENDENCIES=${FORCE_CONFIGURE_DEPENDENCIES:-false}
    STARPOINT_INSTALL_DEPENDENCIES=${STARPOINT_INSTALL_DEPENDENCIES:-"true"}
    set +a
}

ensure_deployment_folder() {
    mkdir -p $DEPLOYMENT_DIRECTORY
}

read_install_env_file() {
    INSTALL_ENV_FILE=${INSTALL_ENV_FILE:-"$STARPOINT_ROOT/deployment/linux/.env"}
    if [ -e $INSTALL_ENV_FILE ]; then
        set -a
        . "$INSTALL_ENV_FILE"
        set +a
    else
        local log_message_end="Perhaps you can use the one at $STARPOINT_ROOT/deployment/linux/.env?"
        if ! [ -e "$STARPOINT_ROOT/deployment/linux/.env" ]; then

#TODO: Determine if anything else should be in the default .env file.
            cat << EOF > "$STARPOINT_ROOT/deployment/linux/.env"
#Configuration options for installing starpoint as a service
PROXY_IP="$PROXY_IP" #REQUIRED
AUTO_INSTALL_PACKAGES=
#DANGEROUS. WILL OVERWRITE EXISTING DEPLOYMENT CONFIGURATIONS
FORCE_CONFIGURE_DEPENDENCIES=
EOF

            log_message_end="A sample one has been created at $STARPOINT_ROOT/deployment/linux/.env. Please set values in it prior to running this script!"
        fi
        log -e Could not find a .env file to copy over at $INSTALL_ENV_FILE. $log_message_end
        exit 1
    fi
}

add_node_repo() {
    ensure_root 'Please run as root before setting up NodeJS repo'
    #Perma-link to ensure it's the same version of this file always.
    log -i Configuring Nodesource Distribution repository....
    wget -O "$DEPLOYMENT_DIRECTORY/Nodesource_LICENSE.md" "https://raw.githubusercontent.com/nodesource/distributions/f80a2491c9c5b261952687cf19a7d47c7e498bb6/LICENSE.md"
    wget -O "$DEPLOYMENT_DIRECTORY/Nodesource_node_repo_setup_script.sh" "https://raw.githubusercontent.com/nodesource/distributions/f80a2491c9c5b261952687cf19a7d47c7e498bb6/scripts/deb/setup_20.x"
    echo "e0f0bf8ae8ba61a819e55e53faa47f5cb189afaba5fd151cbfd17e4116e704978ba350c46864e41e326570180e81d30a16b58ee21df3776ea11692b50e4c0385" "$DEPLOYMENT_DIRECTORY/Nodesource_node_repo_setup_script.sh"\
      | sha512sum --check --status || on_step_fail $? "Acquired Nodesource install script does not match expected hash!" || return $?
    log Temporarily downloaded Nodesource repository setup script to $DEPLOYMENT_DIRECTORY/Nodesource_node_repo_setup_script.sh, along with its license. Please examine during the duration of this step.
    if [ "$INSTALL_AUTO_RUN" = false ] && ! prompt_yes_no "Add Nodesource repository to apt-get keyring? If not, will have to exit just in case...." ; then exit 0; fi
    bash < "$DEPLOYMENT_DIRECTORY/Nodesource_node_repo_setup_script.sh" || on_step_fail $? "Error encountered running nodesource repo configuration script. See above." \
     && log -s "Nodesource node repository configured!"
    #TODO: Keep this as the default action?
    if [ "$INSTALL_AUTO_RUN" = true ] || prompt_yes_no "Delete Nodesource repository setup script & license file?" true; then
        rm $DEPLOYMENT_DIRECTORY/Nodesource_node_repo_setup_script.sh
        rm $DEPLOYMENT_DIRECTORY/Nodesource_LICENSE.md
    fi
}

#Requires apt package manager
install_node() {
    : ${NODE_VERSION:="20.x"}
    if [ "$AUTO_INSTALL_PACKAGES" = true ]; then
        apt-get install nodejs -y
    else
        apt-get install nodejs
    fi
}

ensure_node_installed(){
    echo 'Checking for node version 20 or greater....'
    node_version="$(node -v)"
    if [ "$?" -ne 0  ]; then
        export NODE_VERSION="20.x"
        add_node_repo || return $?
        install_node
        return $?
    fi
    node_version=${node_version%.*.*}
    node_version=${node_version#v*}
    if [ $node_version -lt 20 ] && [ "$INSTALL_AUTO_RUN" = true ] || prompt_yes_no "NodeJS is version $node_version, but a minimum of 20 is required. Install node version 20.x?" ; then
        add_node_repo || return $?
        install_node
        return $?
    fi
    log -s "Node $(node -v) installed."
}

install_ssl_certs() {
    command $STARPOINT_ROOT/deployment/ssl/ssl_gen_self_sign_certs.sh -arc
}

configure_nginx() {
    if ! [ -e "$DEPLOYMENT_DIRECTORY/starpoint_proxy.nginx" ] || allow_config_override; then
        cp -f "$STARPOINT_ROOT/deployment/nginx/starpoint_proxy.nginx" "$DEPLOYMENT_DIRECTORY/starpoint_proxy.nginx"
    else
        log -i "Found NGINX config already when configured to not override existing configurations. Skipping...."
    fi
}

configure_dnsmasq() {
    if ! [ -e "$DEPLOYMENT_DIRECTORY/$DNS_CONFIG_FILE_NAME" ] || allow_config_override; then
        sed "s/PUT PROXY IP HERE/$PROXY_IP/g" "$STARPOINT_ROOT/deployment/linux/dns/$DNS_CONFIG_FILE_NAME" > "$DEPLOYMENT_DIRECTORY/$DNS_CONFIG_FILE_NAME"
        logf -s "DNSMASQ configuration file created successfully at %s/%s with some values substituted" $DEPLOYMENT_DIRECTORY $DNS_CONFIG_FILE_NAME
    else
        logf -i "DNSMASQ configuration found in %s/%s. Skipping new file creation...." $DEPLOYMENT_DIRECTORY $DNS_CONFIG_FILE_NAME
    fi
}

configure_starpoint_service() {
    configured_service="$DEPLOYMENT_DIRECTORY/$STARPOINT_SERVICE_NAME.service"
    if ! [ -e "$configured_service" ] || allow_config_override; then
        sed "s~WorkingDirectory=/starpoint~WorkingDirectory=$STARPOINT_ROOT~g" "$STARPOINT_ROOT/deployment/linux/starpoint.service" > $configured_service
    fi
}

ensure_enable_nginx_site() {
    #TODO: Add copy version IN ADDITION TO symlink version!
    ln -sf "$DEPLOYMENT_DIRECTORY/starpoint_proxy.nginx" "/etc/nginx/sites-available/starpoint_proxy.nginx"
    
    ln -sf "/etc/nginx/sites-available/starpoint_proxy.nginx" "/etc/nginx/sites-enabled/starpoint_proxy.nginx"
    #Test that everything works!
    nginx -t || on_step_fail $? "Something went wrong with nginx's configuration. Please check the nginx configuration file and the output above. Will attempt to set up other" || return $?;
    service nginx reload || on_step_fail $? "Attempted to reload nginx, but got error. Check command log for details"
}

ensure_dnsmasq_enabled() {
    #TODO: Add copy version IN ADDITION TO symlink version!
    ln -sf $DEPLOYMENT_DIRECTORY/$DNS_CONFIG_FILE_NAME /etc/dnsmasq.d/$DNS_CONFIG_FILE_NAME
    dnsmasq --test || on_step_fail $? "DNSmasq detected configuration errors! Please check your configuration settings" || return $?
    service dnsmasq restart || on_step_fail $? "Error encountered restarting DNSMASQ service." || return $?
}

do_starpoint_configuration(){
    ensure_deployment_folder || on_critical_step_failf $? "COULD NOT CREATE DEPLOYMENT DIRECTORY AT %s. CANNOT CONTINUE." $DEPLOYMENT_DIRECTORY
    configure_nginx
    configure_dnsmasq
    configure_starpoint_service
}

install_dependencies(){
    ensure_node_installed || on_critical_step_failf $? "Node could not be installed! If Error Code is 100, please upgrade your installed Linux version!"
    #TODO: Split this into multiple functions after different setups are possible.
    if [ "$AUTO_INSTALL_PACKAGES" = true ]; then
        apt-get install nginx dnsmasq -y
    else
        apt-get install nginx dnsmasq
    fi
}

install_starpoint(){
    log Adding starpoint dependency configuration files...
    log Generating and installing SSL certs....
    install_ssl_certs
    log Enabling nginx site...
    ensure_enable_nginx_site && log -s Nginx enabled!
    log Enabling DNSmasq...
    ensure_dnsmasq_enabled && log -s DNSmasq now serving starpoint!!

    #TODO: Add copy version IN ADDITION TO symlink version!
    log -s "Dependencies configured! Now installing Starpoint service..."
    #Ensure deployment directory can only be edited by root
    chown root $DEPLOYMENT_DIRECTORY
    chmod 744 $DEPLOYMENT_DIRECTORY
    systemctl enable --now $DEPLOYMENT_DIRECTORY/$STARPOINT_SERVICE_NAME.service
}

#TODO: Complete this list as variables are validated to be safe to edit!
print_syntax(){
    set_default_variables
    cat << EOF
Option  | ENV variable                 | Purpose                                                     | DEFAULT
-h      =                              = Print this help message
-e PATH = INSTALL_ENV_FILE             = Set path for install env file                               = $INSTALL_ENV_FILE
-d PATH = DEPLOYMENT_DIRECTORY         = Set custom .deployed directory path                         = $DEPLOYMENT_DIRECTORY
-c      =                              = Create configuration files in deployment directory and quit =
-a      = INSTALL_AUTO_RUN             = Run on its own (Will prompt to do this if flag not passed)  = $INSTALL_AUTO_RUN
        = FORCE_CONFIGURE_DEPENDENCIES = DANGEROUSCreate new versions of all configuration files in  = $FORCE_CONFIGURE_DEPENDENCIES
                                         deploy directory, even if they are already present.
EOF
}

print_help() {
    cat << EOF
Install Starpoint on a Linux system. Currently, only debian-based distributions are supported at this time.
This script will install the following dependencies for StarPoint:

- NodeJS >= v20.x

This script allows configuring the following dependencies for a script:

- Reverse Proxy:
    - NGINX

- DNS:
    - dnsmasq (requires static IP on serving address at present.)

- System Service platform:
    - Systemd

$(print_syntax)
EOF
}

#******************************************************************************************
# MAIN ROUTINE
#******************************************************************************************

while getopts ":he:d:ca" opt; do
  case $opt in
    (a) INSTALL_AUTO_RUN=true
    ;;
    (e) INSTALL_ENV_FILE=$OPTARG
    ;;
    (d) DEPLOYMENT_DIRECTORY=$OPTARG
    ;;
    (c) STARPOINT_INSTALL_DEPENDENCIES=false
    ;;
    (h) print_help; exit 0
    ;;
    (\? ) echo "Unknown option: -$OPTARG" >&2; return 1;;
    (:  ) echo "Missing option argument for -$OPTARG" >&2; return 1;;
    (*  ) echo "Unimplemented option: -$option" >&2; return 1;;
  esac
done
shift "$(($OPTIND -1))"

log StarPoint installer script. Getting configuration....

read_install_env_file
set_default_variables

log -i << EOF
This script is currently configured to set up the following dependencies and configuration:
Starpoint version: $STARPOINT_VERSION
Starpoint run directory: $STARPOINT_ROOT/out
Deployment configuration directory: $DEPLOYMENT_DIRECTORY
Overwrite existing configuration files: $FORCE_CONFIGURE_DEPENDENCIES
Node version: 20.x+
Reverse Proxy: NGINX
DNS: dnsmasq
Expected Proxy IP: $PROXY_IP
Service Under: Systemd
EOF
log -o "\033[1;45;4;43m" "IMPORTANT!!!!"
log -i << EOF
The current configuration of this script will symlink all the configuration files in the configured deployment folder to
their proper locations. ANY CHANGES TO THE FILES IN $DEPLOYMENT_DIRECTORY WILL BE REFLECTED AT RUNTIME IMMEDIATELY. 
KEEP THEM SAFE!!!

Additionally, this script hasn't had a wide test base yet, so reliability can't be guaranteed much. Please use caution and open issues if they arise.
EOF

if [ "$FORCE_DEFAULT_CONFIGURATION" = true ]; then
    log -O "\033[1;45;4;43m" DANGER! CURRENT SCRIPT SETUP WILL REVERT ANY EXISTING CONFIGURATIONS IN DEPLOYMENT DIRECTORY AT THIS TIME. PLEASE TAKE EXTREME CAUTION RUNNING WITH THIS CONFIGURATION!!!
fi

if [ "$INSTALL_AUTO_RUN" != true ]; then
    if ! prompt_yes_no "Would you like to continue running with this configuration?"; then
        exit 0
    elif prompt_yes_no "Would you like to run this script without further confirmation prompts?"; then
        INSTALL_AUTO_RUN=true
    fi
fi

#TODO Add option to skip config in case someone wants to make install be two steps.
if [ "$INSTALL_AUTO_RUN" = true ] || prompt_yes_no "Would you like to generate configuration files for StarPoint?"; then
    log 'Configuring files in deployment directory...'
    do_starpoint_configuration && logf -s "Configuration files created in %s successfully!" $DEPLOYMENT_DIRECTORY
fi

test -d "$DEPLOYMENT_DIRECTORY" || on_critical_step_failf $? "Deployment directory not found at %s! Please check file logs to figure out why..." $DEPLOYMENT_DIRECTORY

if [ "$STARPOINT_INSTALL_DEPENDENCIES" = false ]; then
    log "Script was called to only create configuration, so it will now quit"
    exit 0
fi

ensure_root "This script requires root to install stuff. Please run as root before proceeding." #TODO: Add message here about only creating the config scripts here.


if [ "$INSTALL_AUTO_RUN" = true ] || prompt_yes_no "Install Starpoint dependencieslog -s Configured starpoint dependencies! Now installing Starpoint service...?"; then
    install_dependencies && log -s "Configured starpoint dependencies!"
fi

build_starpoint || on_critical_step_failf $? "Failed to build Starpoint! Critical error; exiting..."

if [ "$INSTALL_AUTO_RUN" = true ] || prompt_yes_no "Add Starpoint configuration files to their directories, or update them if necessary? This may overwrite files!"; then
    install_starpoint && log -s "Starpoint installed and enabled as service!" || on_step_fail $? "Starpoint not enabled! Check error logs...."
fi
