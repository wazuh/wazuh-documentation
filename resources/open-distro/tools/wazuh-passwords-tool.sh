#!/bin/bash

# Tool to change the passwords of Open Distro internal users
# Copyright (C) 2015-2021, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

VERBOSE='> /dev/null 2>&1'
if [ -n "$(command -v yum)" ]; then
    SYS_TYPE="yum"
elif [ -n "$(command -v zypper)" ]; then
    SYS_TYPE="zypper"   
elif [ -n "$(command -v apt-get)" ]; then
    SYS_TYPE="apt-get"   
fi

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
   echo -e "\t-p     | --Password Indicates the new user password"
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
    
    if [ "${SYS_TYPE}" == "yum" ]; then
        elasticinstalled=$(yum list installed 2>/dev/null | grep opendistroforelasticsearch)
    elif [ "${SYS_TYPE}" == "zypper" ]; then
        elasticinstalled=$(zypper packages --installed | grep opendistroforelasticsearch | grep i+ | grep noarch)
    elif [ "${SYS_TYPE}" == "apt-get" ]; then
        elasticinstalled=$(apt list --installed  2>/dev/null | grep opendistroforelasticsearch)
    fi 

    if [ -z "${elasticinstalled}" ]; then
        echo "Error: Open Distro is not installed on the system."
        exit 1;
    fi

}

## Reads all the users present in internal_users.yml

readUsers() {
    SUSERS=$(grep -B 1 hash: /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml | grep -v hash: | grep -v "-" | awk '{ print substr( $0, 1, length($0)-1 ) }')
    USERS=($SUSERS)  
}

## Creates a backup of the existing insternal_users.yml

createBackUp() {
    
    echo "Creating backup..."
    eval "mkdir /usr/share/elasticsearch/backup ${VERBOSE}"
    eval "cd /usr/share/elasticsearch/plugins/opendistro_security/tools/ ${VERBOSE}"
    eval "./securityadmin.sh -backup /usr/share/elasticsearch/backup -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -icl -h ${IP} > /dev/null 2>&1"
    if [  "$?" != 0  ]; then
        echo "Error: The backup could not be created."
        exit 1;
    fi
    echo "Backup created"
    
}

## Generate random password

generatePassword() {
    echo "Generating random password"

    if [ -n "${NUSER}" ]; then
        PASSWORD=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-32};echo;)
    else
    
        for i in "${!USERS[@]}"; do
            PASS=$(< /dev/urandom tr -dc _A-Z-a-z-0-9 | head -c${1:-32};echo;)
            PASSWORDS+=(${PASS})
        done
    fi
 
}

## Generates the hash for the new password

generateHash() {
    
    if [ -n "${CHANGEALL}" ]; then
        echo "Generating hashes"
        for i in "${!PASSWORDS[@]}"
        do
            NHASH=$(bash /usr/share/elasticsearch/plugins/opendistro_security/tools/hash.sh -p ${PASSWORDS[i]} | grep -v WARNING)
            HASHES+=(${NHASH})
        done
    else
        echo "Generating hash"
        eval "bash /usr/share/elasticsearch/plugins/opendistro_security/tools/hash.sh -p ${PASSWORD} | grep -v WARNING > hash.file ${VERBOSE}"
        HASH="\"$(cat hash.file)\""
        if [  "$?" != 0  ]; then
            echo "Error: Hash generation failed."
            exit 1;
        fi    
        echo "Hash generated"
    fi

}

## Changes the password for the indicated user

changePassword() {
    
    if [ -n "${CHANGEALL}" ]; then
        for i in "${!PASSWORDS[@]}"
        do
           awk -v new=${HASHES[i]} 'prev=="'${USERS[i]}':"{sub(/\042.*/,""); $0=$0 new} {prev=$1} 1' /usr/share/elasticsearch/backup/internal_users.yml > internal_users.yml_tmp && mv -f internal_users.yml_tmp /usr/share/elasticsearch/backup/internal_users.yml
        done
    else
        
        awk -v new="$HASH" 'prev=="'${NUSER}':"{sub(/\042.*/,""); $0=$0 new} {prev=$1} 1' /usr/share/elasticsearch/backup/internal_users.yml > internal_users.yml_tmp && mv -f internal_users.yml_tmp /usr/share/elasticsearch/backup/internal_users.yml
    fi

}

## Runs the Security Admin script to load the changes
runSecurityAdmin() {
    
    echo "Loading changes..."
    eval "cd /usr/share/elasticsearch/plugins/opendistro_security/tools/ ${VERBOSE}"
    eval "./securityadmin.sh -f /usr/share/elasticsearch/backup/internal_users.yml -t internalusers -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -icl -h ${IP} > /dev/null 2>&1"
    if [  "$?" != 0  ]; then
        echo "Error: Could not load the changes."
        exit 1;
    fi    
    eval "rm -rf /usr/share/elasticsearch/backup/ ${VERBOSE}"

    if [[ -n "${NUSER}" ]] && [[ -n ${AUTOPASS} ]]; then
        echo $'\nThe password for user '${NUSER}' is '${PASSWORD}''
        echo "Password changed. Renember to update the password in /etc/filebeat/filebeat.yml and /etc/kibana/kibana.yml if necessary and restart the services."
    fi

    if [ -n "${CHANGEALL}" ]; then
        
        for i in "${!USERS[@]}"
        do
            echo ""
            echo "The password for ${USERS[i]} is ${PASSWORDS[i]}"
        done
        echo ""
        echo "Passwords changed. Renember to update the password in /etc/filebeat/filebeat.yml and /etc/kibana/kibana.yml if necessary and restart the services."
        echo ""
    fi 

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
                NUSER=$2
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
            VERBOSE=""
        fi        

        if [[ -n "${NUSER}" ]] && [[ -z "${PASSWORD}" ]]; then
            AUTOPASS=1
            generatePassword
        fi

        if [ -n "${CHANGEALL}" ]; then
            readUsers
            generatePassword
        fi        
        
        if [[ -z "${NUSER}" ]] && [[ -n "${PASSWORD}" ]]; then
            getHelp
        fi   

        if [[ -z "${NUSER}" ]] && [[ -z "${PASSWORD}" ]] && [[ -z "${CHANGEALL}" ]]; then
            getHelp
        fi             

        checkInstalled
        getNetworkHost
        createBackUp
        generateHash
        changePassword
        runSecurityAdmin

    else

        getHelp        

    fi

}

main "$@"