#!/bin/sh
#Purpose: Install self-signed certificates for starpoint hosting

#This is not done in the most secure fashion. Only use these certs for private services.

#TODO: Investigate whether staying with sh is for the best

if [ "$STARPOINT_ROOT" = '' ]; then
    . ../starpoint_script_setup_env.sh || return $?
fi

SCRIPT_DIR="$STARPOINT_ROOT/deployment/ssl"
#TODO: Allow passing argument. Should this care about the script dir?
: ${ssl_tempdir:="$SCRIPT_DIR/generated_ssl_certs"}

delete_generated () {
    rm -rf $ssl_tempdir
}

print_syntax () {
    cat << EOF
h - Print this help message.
a - Run automatically with defaults (defaults overridden by above)
c - Automatically copy the files to their (Linux default) locations (expected by starpoint_proxy.nginx)
r - Automatically delete the generated folder when done.
EOF
}

print_help () {
    cat <<- EOF
    Generate starpoint SSL certificates and optionally install them where they need to be. Will prompt for extra options after creation by default.
    Additionally deletes any existing versions of the scripts.
    Arguments:
    $(print_syntax)
EOF
    return 0
}

copy_certs () {
    ensure_root "Please run as root to allow automatically copying certificates"

    cp -fv `find $ssl_tempdir -name *.crt` /etc/ssl/certs/
    cp -fv `find $ssl_tempdir -name *.key` /etc/ssl/private/
}

while getopts "arch" opt; do
  case $opt in
    (a) no_prompt=true
    ;;
    (r) del_gen_dir=true
    ;;
    (c) do_copy=true
    ;;
    (h) print_help; return 0
    ;;
    (\? ) echo "Unknown option: -$OPTARG" >&2; return 1;;
    (:  ) echo "Missing option argument for -$OPTARG" >&2; return 1;;
    (*  ) echo "Unimplemented option: -$option" >&2; return 1;;
  esac
done
shift "$(($OPTIND -1))"

echo Quitting early or having an error will delete temporary folder with generated scripts
trap "rm -rf $ssl_tempdir; exit" SIGHUP SIGINT SIGTERM ERR

mkdir $ssl_tempdir

set -e
openssl genrsa -out $ssl_tempdir/starpoint_multiversal.key
openssl req -x509 -new -subj "/CN=*.wdfp.kakaogames.com" -config $SCRIPT_DIR/starpoint.cnf -key $ssl_tempdir/starpoint_multiversal.key -out $ssl_tempdir/starpoint_kakao_wdfp_global.crt
openssl req -x509 -new -subj "/CN=openapi-zinny3.game.kakaogames.com" -config $SCRIPT_DIR/starpoint.cnf -key $ssl_tempdir/starpoint_multiversal.key -out $ssl_tempdir/starpoint_zinny3_openapi.crt
openssl req -x509 -new -subj "/CN=gc-openapi-zinny3.kakaogames.com" -config $SCRIPT_DIR/starpoint.cnf -key $ssl_tempdir/starpoint_multiversal.key -out $ssl_tempdir/starpoint_zinny3_openapi_gc.crt
openssl req -x509 -new -subj "/CN=gc-infodesk-zinny3.kakaogames.com" -config $SCRIPT_DIR/starpoint.cnf -key $ssl_tempdir/starpoint_multiversal.key -out $ssl_tempdir/starpoint_zinny3_infodesk_gc.crt
set +e

#This should not normally be necessary, but included in case it is for your environment
#openssl req -x509 -new -subj "/CN=starpoint.local" -config $SCRIPT_DIR/starpoint.cnf -key generated/starpoint_multiversal.key -out generated/starpoint_local.crt
if [ "$do_copy" = true ]; then
    copy_certs
    default_delete_tempdir=true
elif [ "$no_prompt" = true ]; then
    echo "SSL certificates & key generated at $ssl_tempdir"
    return 0
elif prompt_yes_no 'Install ssl certificates to default locations?' = true ; then
    copy_certs
fi

if [ "$del_gen_dir" = true ]; then
    delete_generated
elif [ "$no_prompt" = true ]; then
    return 0
elif prompt_yes_no "Delete generated files? (Make sure they've been copied or installed!)" "$default_delete_tempdir" = true; then
    delete_generated
fi