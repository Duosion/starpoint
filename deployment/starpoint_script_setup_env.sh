#Purpose: Variables & functions to be referenced from other scripts for installing Starpoint

#*******************************************
#NOTE TO CONTRIBUTORS:
#This file is meant to be written as if running under `sh`. However,
#It is purposefully not she-banged as such because this is meant to take advantage of bash in a few cases when possible to get better answers.
#HOWEVER, this means that the local directive, etc. should not be used here. DO NOT USE LOCAL
#LOCAL VARS WILL FAIL FOR SOME SHELLS
#*******************************************

# USAGE:
# Run this at the beginning of all starpoint-associated scripts. Adjust path as necessary to get to the correct directory.
# Try to use dirname ${BASH_SOURCE[0]} to find the script directory here for bash scripts
# if [ "$STARPOINT_ROOT" = '' ]; then
#     . ../starpoint_script_env_setup.sh || return $?
# fi

log() {
    log_function_redirect=""
    old_OPTIND=$OPTIND
    old_OPTARG=$OPTARG
    unset -v OPTIND
    unset -v OPTARG
    unset -v log_function_color
    while getopts ':l:eisr:fo:p:' opt; do
        case $opt in
            (l) log_function_type=$OPTARG;;
            (o) log_function_type="other_format"
                log_function_color=$OPTARG;;
            (e) log_function_type="error"
                log_function_redirect="&2";;
            (i) log_function_type="info";;
            (s) log_function_type="success";;
            (r) log_function_redirect=$OPTARG;;
            #Don't depend on this flag; it may go away later on....
            (f) log_function_use_printf=true;;
        esac
    done
    shift $((OPTIND -1))

    log_function_timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    case "$log_function_type" in
        ("info"         ) log_function_color="\033[38;5;79m" ;;
        ("success"      ) log_function_color="\033[1;32m" ;;
        ("error"        ) log_function_color="\033[1;31m" ;;
        ("other_format" ) ;;
        (*              ) log_function_color="\033[1;34m" ;;
    esac
    

    #If this fails, we are not using stdin. We are piping in from a redirect of some kind
    if ! [ -t 0 ]; then
        while read -r line ; do
            log_function_message="$log_function_message$line\n"
        done
        #Magic sequence at end restores default colors
        log_function_message="${log_function_color}${log_function_timestamp} - ${log_function_message::-2}\033[0m"
    elif [ "$log_function_use_printf" = true ]; then
        log_function_message="${log_function_color}${log_function_timestamp} - $1\033[0m"
        shift 1
        printf -v log_function_message "$log_function_message" "$@"
    else
        log_function_message="${log_function_color}${log_function_timestamp} - $@\033[0m"
    fi

    if [ "$log_function_redirect" = '&2' ]; then
        echo -e $log_function_message >&2
    elif [ "$log_function_redirect" = '' ]; then
        echo -e $log_function_message
    else
        echo -e $log_function_message > $log_function_redirect
    fi

    OPTIND=$old_OPTIND
    OPTARG=$old_OPTARG
    unset -v log_function_message
    unset -v log_function_color
    unset -v log_function_timestamp
    unset -v log_function_type
    unset -v log_function_redirect
    unset -v log_function_use_printf
    unset -v log_function_padding
    unset -v old_OPTIND
    unset -v old_OPTARG
}

logf () {
    log -f "$@"
}

handle_error() {
    last_error_code=$1
    shift 1
    log -e ERROR CODE: $last_error_code. Message: $@
    set -- $last_error_code
    unset -v last_error_code
    return $1
}

handle_errorf() {
    last_error_code=$1
    error_message_template=$2
    shift 2
    logf -e "ERROR CODE: $last_error_code. Message: $error_message_template" $@
    unset -v error_message_template
    set -- $last_error_code
    unset -v last_error_code
    return $1
}

handle_critical() {
    last_error_code=$1
    shift 1
    log -e CRITICAL! CODE: $last_error_code. Message: $@
    log -e NOW EXITING...
    exit $last_error_code
}

handle_criticalf() {
    last_error_code=$1
    error_message_template=$2
    shift 2
    logf -e "CRITICAL! CODE: $last_error_code. Message: $error_message_template" $@
    log -e NOW EXITING...
    exit $last_error_code
}

#Prompt using stdout and stdin with a y/n question. Second argument sets default. -e to unset default and require explicit answer
prompt_yes_no () {
    yn_old_OPTIND=$OPTIND
    yn_old_OPTARG=$OPTARG
    unset -v OPTIND
    unset -v OPTARG
    while getopts 'e' opt; do
        case $opt in
            (e) yn_explicit=true;;
        esac
    done
    shift $((OPTIND -1))
    if [ "$yn_explicit" != true ]; then
        case $2 in
            ([YyNn]*     ) yn_default=$2  ;;
            (true|0      ) yn_default='y' ;;
            #(false|[1-9]*) yn_default='n' ;; #Only need this if the fallback is ever edited to do something else
            (*           ) yn_default='n' ;;
        esac
        yn_prompt="$1 [Y/n](default: $yn_default)"
    else
        unset -v yn_default #Just in case
        yn_prompt="$1 [Y/n]"
    fi

    while true; do
        echo -n "$yn_prompt"
        read REPLY # < `tty` #TODO: Add some way to do this redirect?
        yn=${REPLY:-$yn_default}
        case $yn in
            ([Yy]*) return 0  ;;
            ([Nn]*) return 1  ;;
        esac
        log -e "Invalid option. You chose '$yn'. Please choose one of the following: [YyNn]*"
    done
    unset -v yn_explicit
    unset -v yn_prompt
    unset -v yn_default
    OPTIND=$yn_old_OPTIND
    OPTARG=$yn_old_OPTARG
    unset -v yn_old_OPTIND
    unset -v yn_old_OPTARG
}

#Kill the current shell with the given permissions
ensure_root() {
    non_root_message=${1:-"Please re-run as root before proceeding"}
    if [ $(id -u) -ne 0 ]; then
        handle_critical 77 "$non_root_message"
    fi
}

#Return the current shell with the given permissions
is_root() {
    if [ $(id -u) -ne 0 ]; then 
		return 77
    fi
    return 0
}

configure_starpoint_env_variables () {
    #If we're running under bash
    if [ "$BASH_SOURCE" != '' ]; then
        REFERENCE_FOR_FINDING_SP=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
    #If the script absolute path is known and it's in the starpoint git repo
    elif [ "$(cd -- "$( dirname -- "$0" )" 2>&1 1> /dev/null; git rev-parse --is-inside-work-tree)" = 'true' ] \
        && [ -e "$(cd -- "$( dirname -- "$0" )" 2>&1 1> /dev/null; git rev-parse --show-toplevel)/src/server.ts"  ]; then
        REFERENCE_FOR_FINDING_SP=$(cd -- "$( dirname -- "$0" )" 2>&1 1> /dev/null && pwd)
    #If the current working directory is within the starpoint repo
    elif [ "$(git rev-parse --is-inside-work-tree)" = 'true' ] && [ -e "$(git rev-parse --show-toplevel)/src/server.ts"  ]; then
        REFERENCE_FOR_FINDING_SP=$PWD
        #TODO: Other ways to find a reference directory?
    else
        #Don't know where we are, let's not continue until we do....
        log -e 'Cannot find StarPoint''s root directory. Please run from a bash-compatible env or with a working directory within the starpoint git repo.'
        return 1
    fi
    set -a
    STARPOINT_ROOT=$(cd $REFERENCE_FOR_FINDING_SP; git rev-parse --show-toplevel)
    #Load values from .env file as bash vars
    . $STARPOINT_ROOT/.env
    #Assumes that version will always be in the format of "major.minor.patch" with optional dash into a dev build tag
    STARPOINT_VERSION=$(grep -Po '"version":.*?[^\\]",' $STARPOINT_ROOT/package.json | grep -Po "\d+\.\d+\.\d+(-[\w]+)?")

    #Convenience color code for later
    GRAY_ON_BLACK="\033[3740m"
    set +a
}

build_starpoint () {
    pushd "$STARPOINT_ROOT"
    npm install
    npx tsc & npm run css
    popd
}

#Run on setup. Error if any of these fail
set -e
configure_starpoint_env_variables
set +e