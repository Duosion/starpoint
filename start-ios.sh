#shellcheck shell=ash
#TODO: With creation of multiple environments, make this script determine which one to run based on whatever criteria set, and then run that one.

# shellcheck disable=SC1091
if [ "$STARPOINT_ROOT" = '' ] || [ "$(command -v build_starpoint)x" = "x" ]; then
    [ -x "starpoint_script_setup_env.sh" ] && \
    . starpoint_script_setup_env.sh || \
        [ -x "deployment/starpoint_script_setup_env.sh" ] && \
        . deployment/starpoint_script_setup_env.sh || \
            . "$(cd -- "$( dirname -- "$0" )" 1> /dev/null 2>&1 && pwd)/deployment/starpoint_script_setup_env.sh" || \
            . "$(git rev-parse --show-toplevel)/deployment/starpoint_script_setup_env.sh" || return $?
fi

cd "$STARPOINT_ROOT"

. "scripts/posix-startup/start-common.sh"

starpoint_set_local_dependencies || return $? > /dev/null 2>&1 || exit $?
if [ "$MITM_WEB_EXECTYPE" = "" ]; then
    handle_critical "This configuration only supports MITMweb for execution. Other configurations are still WIP at this time."
    exit 1
fi

log "Starpoint v$STARPOINT_VERSION"
export MITM_USE_WIREGUARD=false

# There is currently only one setup method we support, so just run it. Add more later.
. scripts/posix-startup/start-basic.sh
