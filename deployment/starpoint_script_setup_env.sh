#Purpose: Variables & functions to be referenced from other scripts using something similar to below:
# if [ "$STARPOINT_ROOT" = '' ]; then
#     . ../starpoint_script_env_setup.sh || return $?
# fi

configure_starpoint_env_variables () {
    #If we're running under bash
    if [ "$BASH_SOURCE" != '' ]; then
        REFERENCE_FOR_FINDING_SP=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
    #If the script absolute path is known and it's in the starpoint git repo
    elif [ "$(cd -- "$( dirname -- "$0" )" &> /dev/null; git rev-parse --is-inside-work-tree)" = 'true' ] \
        && [ -f "$(cd -- "$( dirname -- "$0" )" &> /dev/null; git rev-parse --show-toplevel)/src/server.ts"  ]; then
        REFERENCE_FOR_FINDING_SP=$( cd -- "$( dirname -- "$0" )" &> /dev/null && pwd )
    #If the current working directory is within the starpoint repo
    elif [ "$(git rev-parse --is-inside-work-tree)" = 'true' ] && [ -f "$(git rev-parse --show-toplevel)/src/server.ts"  ]; then
        REFERENCE_FOR_FINDING_SP=$PWD
        #TODO: Other ways to find a reference directory?
    else
        #Don't know where we are
        echo 'Cannot find StarPoint''s root directory. Please run from a bash-compatible env or with a working directory within the starpoint git repo.' >&2
        return 1
    fi
    set -a
    STARPOINT_ROOT=$(cd $REFERENCE_FOR_FINDING_SP; git rev-parse --show-toplevel)
    #Load values from .env file as bash vars
    . $STARPOINT_ROOT/.env
    set +a
}

prompt_yes_no () (
    while getopts 'e' opt; do
        case $opt in
            (e) explicit=true;;
        esac
    done
    shift $((OPTIND -1))
    if [ "$explicit" != true ]; then
        case $2 in
            ([YyNn]*    ) default=$2  ;;
            (true|0     ) default='y' ;;
            (false|[1-9]) default='n' ;;
            (*          ) default='n' ;;
        esac
        yn_prompt="$1 [Y/n](default: $default)"
    else
        yn_prompt="$1 [Y/n]"
    fi

    while true; do
        echo -n "$yn_prompt" > `tty`
        read REPLY
        yn=${REPLY:-$default}
        case $yn in
            ([Yy]*) return 0  ;;
            ([Nn]*) return 1  ;;
        esac
        echo "Invalid option. You chose '$yn'. Please choose one of the following: [YyNn]" >&2
    done
)

build_starpoint () (
    echo "$STARPOINT_ROOT"
    cd "$STARPOINT_ROOT"
    npm install
    npx tsc & npm run css
)

ensure_root() {
    non_root_message=${1:-"Please re-run as root before proceeding"}
    if [ $(id -u) -ne 0 ]; then 
         echo "$non_root_message"
         exit 77
    fi
}

#Run on setup. Error if any of these fail
set -e
configure_starpoint_env_variables
set +e