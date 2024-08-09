#PURPOSE: Build starpoint for deployment

if [ "$STARPOINT_ROOT" = '' ]; then
    . ../starpoint_script_setup_env.sh || return $?
fi

#This function will get used elsewhere anyway; this file just allows calling it directly
build_starpoint