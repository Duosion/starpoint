# Deploying StarPoint

## DISCLAIMER

**While these scripts exist to facilitate ease of deployment, they are not a one-size-fits-all solution and may not work if not properly configured. Please ensure you have the necessary dependencies for each part of the install script BEFORE you attempt to run scripts.**

**THESE FILES ARE PROVIDED FOR PERSONAL USE AND NOT DESIGNED FOR PUBLIC AVAILABILITY. CREATING AND SERVING A PUBLICLY-AVAILABLE SERVER IS HIGHLY DISCOURAGED, ESPECIALLY WITH THESE FILES AS PROVIDED.**

This folder currently contains configuration files for:

- Nginx reverse proxy configuration
- SSL self-signed certificate and key generation script (for shell and windows)
  - Automatic certificate installation for Linux systems, to the paths the nginx file expects
- dnsmasq DNS redirection \[Requires manual IP insertion\]
- systemd service file \[Requires manual path to starpoint repo\]
- Utilities shell script file, to be imported by other scripts for extra functions

An install.sh script is in development.

Ensure you have the required dependencies for the scripts you want to run. Note that npm must be run on the target system to build dependencies. Running build tasks on another system and copying the output over may not work.

Make sure to change the host address in .env to something other than localhost!
