#shellcheck shell=ash
#Run an extremely basic shell that ends with ctrl+c and doesn't keep output separated. Cannot be daemoned.

# shellcheck disable=SC1091
if [ "$STARPOINT_ROOT" = '' ] || [ "$(command -v build_starpoint)x" = "x" ]; then
    [ -x "starpoint_script_setup_env.sh" ] && \
    . starpoint_script_setup_env.sh || \
        [ -x "deployment/starpoint_script_setup_env.sh" ] && \
        . deployment/starpoint_script_setup_env.sh || \
            . "$(cd -- "$( dirname -- "$0" )" 1> /dev/null 2>&1 && pwd)/deployment/starpoint_script_setup_env.sh" || \
            . "$(git rev-parse --show-toplevel)/deployment/starpoint_script_setup_env.sh" || return $?
fi

if [ "$(command -v starpoint_set_local_dependencies)x" = "x" ] ; then
    . "$STARPOINT_ROOT/scripts/posix-startup/start-common.sh"
fi

log -i Using startup with MITMproxy Web frontend

starpoint_start_functions

#TODO: Refine & move to scripts/posix-startup/start-basic-shell.sh
starpoint_start &
starpoint_pid=$!
printf "starpoint process: %d\n" $!
mitmweb_exec &
mitm_pid=$!
printf "mitmweb process: %d\n" $!

log -i "Use Ctrl+C to kill this program."
trap 'kill -INT $starpoint_pid $mitm_pid' INT TERM QUIT
wait $starpoint_pid $mitm_pid