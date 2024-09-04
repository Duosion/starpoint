#shellcheck shell=ash
#Common functions for starting up Starpoint

#shellcheck disable=SC1091
#shellcheck source-path=SCRIPTDIR/../../
if [ "$STARPOINT_ROOT" = '' ] || [ "$(command -v build_starpoint)x" = "x" ]; then
    [ -x "starpoint_script_setup_env.sh" ] && \
    . starpoint_script_setup_env.sh || \
        [ -x "deployment/starpoint_script_setup_env.sh" ] && \
        . deployment/starpoint_script_setup_env.sh || \
            . "$(cd -- "$( dirname -- "$0" )" 2>&1 1> /dev/null && pwd)/deployment/starpoint_script_setup_env.sh" || \
            . "$(git rev-parse --show-toplevel)/deployment/starpoint_script_setup_env.sh" || return $?
fi

#Collection of functions to start starpoint. Organized here since I feel they don't warrant their own subfolder, but still....
#DO NOT CALL ANY OF THESE UNLESS CALLING THEM AS A BG PROCESS! THEY WILL REPLACE THEIR CURRENT ID AT POINT OF CALLING (done to make it easy to redirect stuff & such. This may change....)
# shellcheck disable=SC2317
starpoint_start_functions(){

    #TODO: Maybe reconfigure this to run as a bunch of methods instead, with OOP-like syntax. Can do so with command substitution on the first arg.

    starpoint_start(){
        echo "starting starpoint"
        #subshell_if_fg starpoint_start $@ || return $?
        cd "$STARPOINT_ROOT"
        npm install && exec npm run dev
    }

    #USE EXEC TO REPLACE CURRENT PROCESS WHEN CALLING!!!
    mitmweb_start_common(){
        # shellcheck disable=SC2068
        mitmweb_inner_exec(){
            case $MITM_WEB_EXECTYPE in
                (local) exec .mitmproxy/mitmweb $@;;
                #(app_folder) open -n $STARPOINT_ROOT/.mitmproxy/mitmproxy.app --args $mitmargs;;
                (path) exec mitmweb $@;;
            esac
        }

        cd "$STARPOINT_ROOT"
        # shellcheck disable=SC2068
        mitmweb_inner_exec $@ --set connection_strategy=lazy --allow-hosts gc-openapi-zinny3.kakaogames.com --allow-hosts gc-infodesk-zinny3.kakaogames.com --allow-hosts na.wdfp.kakaogames.com --allow-hosts patch.wdfp.kakaogames.com -s scripts/mitm-redirect-traffic.py
    }

    mitmweb_exec_wireguard(){
        #subshell_if_fg mitmweb_wireguard $@ || return $?
        mitmweb_start_common --mode wireguard
    }

    mitmweb_exec_proxy() {
        mitmweb_start_common
    }

    mitmweb_exec(){
        if [ "${MITM_USE_WIREGUARD:-'true'}" = 'true' ]; then
            mitmweb_exec_wireguard
        else
            mitmweb_exec_proxy
        fi
    }
}

#Run once in the respective start script
starpoint_set_local_dependencies() {
    
    missing_dependencies=false

    if ! type node > /dev/null 2>&1; then
        missing_dependencies=true
        logf -e "Missing nodejs! Please follow instructions at https://nodejs.org/en/download/package-manager/current to install!\n\t(Note: NVM's node cannot be used to run Starpoint as a system service (without some trickery), so you might want to consider a different method if that is your goal.)"
    fi
    
    export MITM_PROXY_EXECTYPE=
    export MITM_WEB_EXECTYPE=

    #TODO: Does this directly work here?
    if [ -x "$STARPOINT_ROOT/.mitmproxy/mitmproxy" ]; then
        MITM_PROXY_EXECTYPE=local
    # elif [ -d "$STARPOINT_ROOT/.mitmproxy/mitmproxy.app" ]; then
    #     log "WARNING: MACOSX.APP STARTING UNTESTED. MIGHT BE BETTER TO TRY INSTALLING IT FROM BREW INSTEAD. THIS MIGHT NOT WORK...."
    #     MITM_PROXY_EXECTYPE=app_folder
    elif type mitmproxy > /dev/null 2>&1; then
        MITM_PROXY_EXECTYPE=path
    fi

    if [ -x "$STARPOINT_ROOT/.mitmproxy/mitmweb" ]; then
        MITM_WEB_EXECTYPE=local
    # elif [ -d "$STARPOINT_ROOT/.mitmproxy/mitmproxy.app" ]; then
    #     log "WARNING: MACOSX.APP STARTING UNTESTED. MIGHT BE BETTER TO TRY INSTALLING IT FROM BREW INSTEAD. THIS MIGHT NOT WORK...."
    #     MITM_WEB_EXECTYPE=app_folder
    elif type mitmweb > /dev/null 2>&1; then
        MITM_WEB_EXECTYPE=path
    fi

    if [ "$MITM_PROXY_EXECTYPE" = '' ] && [ "$MITM_WEB_EXECTYPE" = '' ]; then
        log -e "Missing mitmproxy! You can install it via following the instructions at 'https://docs.mitmproxy.org/stable/overview-installation/'. Add it to the .mitmproxy folder, your PATH, or via python using 'pip install mitmproxy'!"
        missing_dependencies=true
    fi

    if [ "$missing_dependencies" = 'true' ]; then
        log -e "Missing required dependencies! Starpoint will not start. See errors above."
        return 1
    fi
}