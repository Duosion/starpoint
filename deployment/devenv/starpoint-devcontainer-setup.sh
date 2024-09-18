#!/usr/bin/env dash
#TODO: The above may need to change if attempting to reuse in Alpine Linux, due to that terminal being ash, not dash.
#Currently dash to enable use of 'local', but if not needed just make it /bin/sh probably
#Commands to run after build to create a dev environment

#Fix issue where sometimes pulling from Git gives the wrong line endings to this file. This should usually not be CLRF....
#Running this each time we start the thing up, but during construction we want this sooner
tempHoldEdit="$(tr -d '\r' < .shellcheckrc)"
printf "%s" "$tempHoldEdit" > .shellcheckrc

#Support fixing only the files that need fixing in script form, so we don't need to repeat that everywhere, then exit.
#TODO: Have it do this for all of the startup scripts as well?
if [ "$1" = "--fix-file-escapes-only" ]; then
    exit 0
fi

#We DO trust this git repo, but it's not owned by the "node" user, so mark it safe for us.
git config --global --add safe.directory "$(pwd)"

#Because the feature version of this has had access problems (404 error for download at last attempt), install with pipx instead
pipx install mitmproxy

python3 -m venv ~/starpoint-venv
# shellcheck disable=SC1091
. "$HOME/starpoint-venv/bin/activate"
pip install -r scripts/requirements.txt
#This way we get the source code for the mitmproxy API as well
pip install mitmproxy
deactivate
tput sgr0

starpy_greeting_part="To activate python venv in the terminal, you can use the 'starpy' alias. VENV is located in $HOME/starpoint-venv. It is the default env used by VSCode."

cat <<EOF | tee -a ~/.bashrc >> ~/.zshrc

alias starpy=". $HOME/starpoint-venv/bin/activate"
echo "$starpy_greeting_part"
EOF

npm ci || npm install