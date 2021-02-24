#!/bin/bash

# Tool to change the passwords of Open Distro internal users
# Copyright (C) 2015-2021, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

VERBOSE='> /dev/null 2>&1'

## Checks if the script is run with enough privileges

checkRoot() {
    if [ "$EUID" -ne 0 ]; then
        echo "This script must be run as root."
        exit 1;
    fi 
}

## Shows script usage
getHelp() {
   echo ""
   echo "Usage: $0 arguments"
   echo -e "\t-a     | --change-all Changes all the Open Distro user passwords and prints them on screen"
   echo -e "\t-u     | --user Indicates the name of the user whose password will be changed"
   echo -e "\t-p     | --Password Indicate the new user password"
   echo -e "\t-v     | --verbose Shows the complete script execution output"
   echo -e "\t-h     | --help Shows help"
   exit 1 # Exit script after printing help
}

## Gets the network host

getNetworkHost() {
    IP=$(grep -hr "network.host:" /etc/elasticsearch/elasticsearch.yml)
    NH="network.host: "
    IP="${IP//$NH}"
}

## Checks if Open Distro for Elasticsearch is installed

checkInstalled() {

}

## Creates a backup of the existing insternal_users.yml

createBackUp() {

}

## Generates the hash for the new password

generateHash() {

}

## Changes the password for the indicated user

changePassword() {

}

## Runs the Security Admin script to load the changes
runSecurityAdmin() {

}

main() {   

    if [ -n "$1" ]; then      
        while [ -n "$1" ]
        do
            case "$1" in
            "-v"|"--verbose")
                VERBOSE=1
                shift 1
                ;;
            "-a"|"--change-all")
                CHANGEALL=1
                shift 1
                ;;                
            "-u"|"--user")
                USER=$2
                shift
                shift
                ;;
            "-p"|"--password")
                PASSWORD=$2
                shift
                shift
                ;;                              
            "-h"|"--help")
                getHelp
                ;;
            *)
                getHelp
            esac
        done

        if [ -n "${VERBOSE}" ]; then
            debug=""
        fi

        checkInstalled
        getNetworkHost
        createBackUp
        generateHash
        changePassword
        runSecurityAdmin
    fi

}

main "$@"