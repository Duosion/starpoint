# Deploying StarPoint

## DISCLAIMER

**While these scripts exist to facilitate ease of deployment, they are not a one-size-fits-all solution and may not work if not properly configured.**

**THESE FILES ARE PROVIDED FOR PERSONAL USE AND NOT DESIGNED FOR CREATING PUBLICLY-AVAILABLE SERVICES. CREATING AND SERVING A PUBLICLY-AVAILABLE SERVER IS HIGHLY DISCOURAGED, ESPECIALLY WITH THESE FILES AS PROVIDED. NO AUTHOR NOR CONTRIBUTOR TO STARPOINT ENDORSES NOR ASSUMES RESPONSIBILITY OF ANY KIND FOR ANY CONSEQUENCES OF ANY KIND SHOULD ONE ATTEMPT TO MAKE AVAILABLE ANY SERVICES USING THIS REPOSITORY. BY RUNNING ANY PART OF THIS CODE, AN INDIVIDUAL AGREES TO RELEASE STARPOINT AND ITS CONTRIBUTORS OF ALL LIABILITY. VOLUNTARY ASSISTANCE WITH LOCAL SETUPS SHALL NOT BE CONSIDERED LIABILITY, NOR ENDORSEMENT.**

This folder currently contains configuration files for:

- Nginx reverse proxy configuration
- SSL self-signed certificate and key generation script (for POSIX shell (Linux/Unix/Mac) and Windows) (requires installing OpenSSL)
  - Automatic certificate installation for Linux systems, to the paths the nginx file expects
- dnsmasq DNS redirection
- systemd service file
- Installation script
- Utilities shell script file, to be imported by other scripts for extra functions

Ensure you have the required dependencies for the scripts you want to run. Note that npm must be run on the target system to build dependencies. Running build tasks on another system and copying the output over may not work.

Make sure to change the host address in .env to something other than localhost!
