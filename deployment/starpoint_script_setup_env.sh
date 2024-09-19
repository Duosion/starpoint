# shellcheck shell=ash
#Purpose: Variables & functions to be referenced from other scripts for installing Starpoint

#*******************************************
#NOTE TO CONTRIBUTORS:
# This file is meant to be written as if running under ash. However, it is purposefully not she-banged as such because this is meant to take advantage of 
# whatever shell it is in a few cases when possible to get better info.
#*******************************************

# USAGE:
# Run this at the beginning of all starpoint-associated scripts. Adjust path as necessary to get to the correct directory.
# Try to use dirname ${BASH_SOURCE[0]} to find the script directory here for bash scripts
# if [ "$STARPOINT_ROOT" = '' ]; then
#     . ../starpoint_script_env_setup.sh || return $?
# fi
set -a
log() {
    local OPTIND OPTARG message color timestamp log_type use_printf log_redirect
    while getopts ':l:eis:fo:d' opt; do
        case $opt in
            (l) log_type=$OPTARG;;
            (o) log_type="other_format"
                color=$OPTARG;;
            (e) log_type="error"
                log_redirect="&2";;
            (i) log_type="info";;
            (s) log_type="success";;
            #Expand this functionality later.
            (d) if [ "$MINIMUM_LOG_LEVEL" != 'debug' ]; then
                    return 0;
                fi
            
                log_type='debug'
            ;;
            #Don't depend on this flag; it may go away later on....
            (f) use_printf=true;;
            (*) ;;
        esac
    done
    shift $((OPTIND -1))

    timestamp=$(date '+%Y-%m-%d %H:%M:%S')

    case "$log_type" in
        ("info"         ) color=$LOG_INFO_FORMAT ;;
        ("success"      ) color=$LOG_SUCCESS_FORMAT ;;
        ("error"        ) color=$LOG_ERROR_FORMAT ;;
        ("other_format" ) ;;
        (*              ) color=$LOG_OTHER_FORMAT ;;
    esac
    

    #If this fails, we are not using stdin. We are piping in from a redirect of some kind
    if ! [ -t 0 ]; then
        while read -r line ; do
            message="$message$line\n"
        done
        #Magic sequence at end restores default colors
        message="${color}${timestamp} - $(printf '%s2' "$message")$LOG_FORMAT_RESET"
    elif [ "$use_printf" = true ]; then
        message="$1"
        shift 1
        # shellcheck disable=SC2059
        message=$(printf "$message" "$@")
        message="${color}${timestamp} - ${message}${LOG_FORMAT_RESET}"
    else
        message="${color}${timestamp} - ${*}${LOG_FORMAT_RESET}"
    fi

    if [ "$log_redirect" = '&2' ]; then
        printf '%s\n' "$message" >&2
    else
        printf '%s\n' "$message"
    fi
}

logf () {
    log -f "$@"
}

handle_error() {
    local last_error_code=$1
    shift 1
    log -e ERROR CODE: "$last_error_code". Message: "$@"
    return "$last_error_code"
}

handle_errorf() {
    local last_error_code=$1
    local error_message_template=$2
    shift 2
    logf -e "ERROR CODE: $last_error_code. Message: $error_message_template" "$@"
    return "$last_error_code"
}

handle_critical() {
    last_error_code=$1
    shift 1
    log -e "CRITICAL! CODE: $last_error_code. Message: $*"
    log -e NOW EXITING...
    exit "$last_error_code"
}

handle_criticalf() {
    last_error_code=$1
    error_message_template=$2
    shift 2
    logf -e "CRITICAL! CODE: $last_error_code. Message: $error_message_template" "$@"
    log -e NOW EXITING...
    exit "$last_error_code"
}

#Prompt using stdout and stdin with a y/n question. Second argument sets default. -e to unset default and require explicit answer
prompt_yes_no () {
    local OPTIND OPTARG yn_explicit yn_default yn_prompt
    while getopts 'e' opt; do
        case $opt in
            (e) yn_explicit=true;;
            (*) ;;
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
        yn_prompt="$1 [Y/n]"
    fi

    while true; do
        printf "%s" "$yn_prompt"
        read -r REPLY # < `tty` #TODO: Add some way to do this redirect?
        yn=${REPLY:-$yn_default}
        case $yn in
            ([Yy]*) return 0  ;;
            ([Nn]*) return 1  ;;
        esac
        log -e "Invalid option. You chose '$yn'. Please choose one of the following: [YyNn]*"
    done
}

#Kill the current shell with the given permissions
ensure_root() {
    non_root_message=${1:-"Please re-run as root before proceeding"}
    if [ "$(id -u)" -ne 0 ]; then
        handle_critical 77 "$non_root_message"
    fi
}

#Return the current shell with the given permissions
is_root() {
    if [ "$(id -u)" -ne 0 ]; then 
		return 77
    fi
    return 0
}

# shellcheck disable=SC2034
configure_starpoint_env_variables () {
    #If we're running under bash
    # shellcheck disable=SC3028
    # shellcheck disable=SC2128
    if [ "$BASH_SOURCE" != '' ]; then
        # shellcheck disable=SC3054
        REFERENCE_FOR_FINDING_SP=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" > /dev/null 2>&1 && pwd)
    elif [ "$ZSH_VERSION" != '' ]; then
        # Try to get this for ZSH
        # shellcheck disable=SC2296
        REFERENCE_FOR_FINDING_SP=${(%):-%x}
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
    # shellcheck disable=SC2086
    STARPOINT_ROOT=$(cd $REFERENCE_FOR_FINDING_SP; git rev-parse --show-toplevel)
    #Load values from .env file as bash vars
    #shellcheck source-path=SCRIPTDIR/../
    . "$STARPOINT_ROOT/.env"
    #Assumes that version will always be in the format of "major.minor.patch" with optional dash into a dev build tag
    STARPOINT_VERSION=$(grep -Po '"version":.*?[^\\]",' "$STARPOINT_ROOT/package.json" | grep -Po "\d+\.\d+\.\d+(-[\w]+)?")

    #Added because in some places the log codes were failing.
    LOG_INFO_FORMAT="$(tput setaf 79)"
    LOG_SUCCESS_FORMAT="$(tput setaf 76)"
    LOG_ERROR_FORMAT="$(tput setaf 1)"
    LOG_OTHER_FORMAT="$(tput setaf 4)"
    LOG_FORMAT_RESET="$(tput sgr0)"
    set +a
}

build_starpoint () (
    cd "$STARPOINT_ROOT"
    npm install
    npm run build
)

#Only call this from main processes, or within a subshell when wanting to redefine it as the main process
configure_non_parent_checkup_processes(){
    set -a
    export SCRIPT_ROOT_PROCESS_ID=$$
    set +a
    log -d "Process $SCRIPT_ROOT_PROCESS_ID is now considered a root for its children"
    #USAGE OF ALL OF THESE

    #Rationale: If returning 0, okay to proceed. If returning something else, it proceeded inside the call.
    #Downside: error code 1 swallowed by it

    #Drop-in at start of function that must be outside the parent
    # Use as follows, given function_name:
    # subshell_if_root_proc function_name $@ || return $?
    # subshell_if_root_proc () {
    #     if [ $SCRIPT_ROOT_PROCESS_ID -eq $$ ]; then
    #         echo "$SCRIPT_ROOT_PROCESS_ID"
    #         echo "$$"
    #         echo "FOOF"
    #         ($@) 
    #         return 1
    #     else
    #         echo "FOIF"
    #         return 0
    #     fi
    # }

    # ensure_one_subprocess(){
    #     subshell_if_root_proc $@ && $@
    # }

    #WARNING: CURRENTLY BUGGED, DO NOT USE. Preserved for later.
    subshell_if_fg () {
        # shellcheck disable=SC2068
        case $(ps -o stat= -p $$) in
            (*+*) ($@) #We are in foreground. Start a subshell now
                return 1 ;;
            (*) return 0 ;; #Already in background. No need to start subshell
        esac
    }

    # subshell_if_fg_or_root () {
    #     subshell_if_fg $@ && subshell_if_root_proc $@ 
    # }

    #Putting a function in a subshell might not be desired if we've already launched as bg. This ensures we do not duplicate that
    #TODO: Considering a process can be bg'd later, do we dare change behavior based on how it STARTS or not?
    # ensure_one_bg_shell (){
    #     #Do our best to redefine based on whether calling parent shell is fg or not.
    #     case $(ps -o stat= -p $$) in
    #         (*+*) ensure_one_bg_shell (){ subshell_only_if_fg $@ ;  } ;; #We are in foreground. Start a subshell now
    #         (*) ensure_one_bg_shell (){ subshell_only_if_fg_or_parent $@ ;  } ;; #Already in background. No need to start subshell
    #     esac

    #     ensure_one_bg_shell $@
    # }
}

# *******************************************************************
# STARTUP SCRIPTS RUN BELOW. DO NOT PUT ANY FUNCTIONS BELOW THIS TEXT
# *******************************************************************
set +a

# Breaks on simulated dash. No longer usable, sadly.
# SCRIPT_IS_SOURCED=1
# if [ -n "$ZSH_VERSION" ]; then 
#   case $ZSH_EVAL_CONTEXT in (*:file) SCRIPT_IS_SOURCED=0;; esac
# elif [ -n "$KSH_VERSION" ]; then
#   # This is fine in ksh
#   # shellcheck disable=SC2296
#   [ "$(cd -- "$(dirname -- "$0")" && pwd -P)/$(basename -- "$0")" != "$(cd -- "$(dirname -- "${.sh.file}")" && pwd -P)/$(basename -- "${.sh.file}")" ] && SCRIPT_IS_SOURCED=0
# elif [ -n "$BASH_VERSION" ]; then
#   (return 0 2>/dev/null) && SCRIPT_IS_SOURCED=0
# else # All other shells: examine $0 for known shell binary filenames.
#      # Detects `sh` and `dash`; add additional shell filenames as needed.
#   case ${0##*/} in (sh|-sh|dash|-dash|ash|-ash) SCRIPT_IS_SOURCED=0;; esac
# fi

# if [ $SCRIPT_IS_SOURCED -ne 0 ]; then
#     log -e "This script is not meant to be called directly, or shell type cannot be determined. Please only source it to set up Starpoint's environment in other scripts. Try running the script under SH if possible."
# else
#     unset -v SCRIPT_IS_SOURCED
# fi

#Run on setup. Error if any of these fail
set -e
configure_starpoint_env_variables
configure_non_parent_checkup_processes
: "${MINIMUM_LOG_LEVEL:='info'}"
set +e