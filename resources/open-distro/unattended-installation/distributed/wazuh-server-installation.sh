#!/bin/bash

# Program to install Wazuh server
# Copyright (C) 2015-2021, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

## Check if system is based on yum or apt-get
char="."
debug='> /dev/null 2>&1'
WAZUH_VER="4.0.4"
WAZUH_REV="1"
ELK_VER="7.9.1"
OD_VER="1.11.0"
OD_REV="1"
if [ -n "$(command -v yum)" ]; then
    sys_type="yum"
    sep="-"
elif [ -n "$(command -v zypper)" ]; then
    sys_type="zypper"   
    sep="-"  
elif [ -n "$(command -v apt-get)" ]; then
    sys_type="apt-get"   
    sep="="
fi

logger() {
    echo $1
}

checkArch() {
    arch=$(uname -m)

    if [ ${arch} != "x86_64" ]; then
        echo "Uncompatible system. This script must be run on a 64-bit system."
        exit 1;
    fi
}

startService() {

    if [ -n "$(ps -e | egrep ^\ *1\ .*systemd$)" ]; then
        eval "systemctl daemon-reload ${debug}"
        eval "systemctl enable $1.service ${debug}"
        eval "systemctl start $1.service ${debug}"
        if [  "$?" != 0  ]
        then
            echo "${1^} could not be started."
            exit 1;
        else
            echo "${1^} started"
        fi  
    elif [ -n "$(ps -e | egrep ^\ *1\ .*init$)" ]; then
        eval "chkconfig $1 on ${debug}"
        eval "service $1 start ${debug}"
        eval "/etc/init.d/$1 start ${debug}"
        if [  "$?" != 0  ]
        then
            echo "${1^} could not be started."
            exit 1;
        else
            echo "${1^} started"
        fi     
    elif [ -x /etc/rc.d/init.d/$1 ] ; then
        eval "/etc/rc.d/init.d/$1 start ${debug}"
        if [  "$?" != 0  ]
        then
            echo "${1^} could not be started."
            exit 1;
        else
            echo "${1^} started"
        fi             
    else
        echo "Error: ${1^} could not start. No service manager found on the system."
        exit 1;
    fi

}

## Show script usage
getHelp() {
   echo ""
   echo "Usage: $0 arguments"
   echo -e "\t-i    | --ignore-healthcheck Ignores the healthcheck"
   echo -e "\t-n    | --node-name Name of the node"
   echo -e "\t-d    | --debug Shows the complete installation output"
   echo -e "\t-h    | --help Shows help"
   exit 1 # Exit script after printing help
}

## Checks if the configuration file or certificates exist
checkConfig() {

    if [ -f ~/certs.tar ]
    then
        echo "Certificates file found. Starting the installation..."
        eval "tar --overwrite -C ~/ -xf ~/certs.tar config.yml ${debug}"
    else
        echo "No certificates file found."
        exit 1;
    fi 

}

## Install the required packages for the installation
installPrerequisites() {

    logger "Installing all necessary utilities for the installation..."

    if [ ${sys_type} == "yum" ] 
    then
        eval "yum install curl -y -q ${debug}"
    elif [ ${sys_type} == "zypper" ] 
    then
        eval "zypper -n install curl ${debug}"        
    elif [ ${sys_type} == "apt-get" ] 
    then
        if [ -n "$(command -v add-apt-repository)" ]
        then
            eval "add-apt-repository ppa:openjdk-r/ppa -y ${debug}"
        else
            echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list
        fi
        eval "apt-get update -q ${debug}"
        eval "apt-get install apt-transport-https curl -y -q ${debug}"
    fi

    logger "Done"

}

## Add the Wazuh repository
addWazuhrepo() {
    logger "Adding the Wazuh repository..."

    if [ ${sys_type} == "yum" ] 
    then
        eval "rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH ${debug}"
        eval "echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-${releasever} - Wazuh\nbaseurl=https://packages.wazuh.com/4.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo ${debug}"
    elif [ ${sys_type} == "zypper" ] 
    then
        eval "rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH ${debug}"
        eval "echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-${releasever} - Wazuh\nbaseurl=https://packages.wazuh.com/4.x/yum/\nprotect=1' | tee /etc/zypp/repos.d/wazuh.repo ${debug}"            
    elif [ ${sys_type} == "apt-get" ] 
    then
        eval "curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH --max-time 300 | apt-key add - ${debug}"
        eval "echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list ${debug}"
        eval "apt-get update -q ${debug}"
    fi    

    logger "Done" 
}

## Wazuh manager
installWazuh() {

    logger "Installing the Wazuh manager..."
    if [ ${sys_type} == "zypper" ]; then
        eval "zypper -n install wazuh-manager-${WAZUH_VER}-${WAZUH_REV} ${debug}"
    else
        eval "${sys_type} install wazuh-manager${sep}${WAZUH_VER}-${WAZUH_REV} -y -q ${debug}"
    fi
    if [  "$?" != 0  ]
    then
        echo "Error: Wazuh installation failed"
        exit 1;
    else
        logger "Done"
    fi  
    startService "wazuh-manager"

}

## Filebeat
installFilebeat() {

    if [[ -f /etc/filebeat/filebeat.yml ]]; then
        echo "Filebeat is already installed in this node."
        exit 1;
    fi      
    
    logger "Installing Filebeat..."
    
    if [ ${sys_type} == "zypper" ]; then
        eval "zypper -n install filebeat-${ELK_VER} ${debug}"
    else
        eval "${sys_type} install filebeat${sep}${ELK_VER} -y -q  ${debug}"
    fi
    if [  "$?" != 0  ]
    then
        echo "Error: Filebeat installation failed"
        exit 1;
    else
        eval "curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/open-distro/unattended-installation/distributed/templates/filebeat.yml --max-time 300 ${debug}"
        eval "curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/4.0/extensions/elasticsearch/7.x/wazuh-template.json --max-time 300 ${debug}"
        eval "chmod go+r /etc/filebeat/wazuh-template.json ${debug}"
        eval "curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz --max-time 300 | tar -xvz -C /usr/share/filebeat/module ${debug}"       
    fi        
}

configureFilebeat() {

    nh=$(awk -v RS='' '/network.host:/' ~/config.yml)

    if [ -n "$nh" ]
    then
        nhr="network.host: "
        nip="${nh//$nhr}"
        echo "output.elasticsearch.hosts:" >> /etc/filebeat/filebeat.yml  
        echo "  - ${nip}"  >> /etc/filebeat/filebeat.yml  
    else
        echo "output.elasticsearch.hosts:" >> /etc/filebeat/filebeat.yml  
        sh=$(awk -v RS='' '/discovery.seed_hosts:/' ~/config.yml)
        shr="discovery.seed_hosts:"
        rm="- "
        sh="${sh//$shr}"
        sh="${sh//$rm}"
        for line in $sh; do
                echo "  - ${line}" >> /etc/filebeat/filebeat.yml      
        done        
    fi

    eval "mkdir /etc/filebeat/certs ${debug}"
    eval "cp ~/certs.tar /etc/filebeat/certs/ ${debug}"
    eval "cd /etc/filebeat/certs/ ${debug}"
    eval "tar -xf certs.tar ${iname}.pem ${iname}.key root-ca.pem ${debug}"
    if [ ${iname} != "filebeat" ]
    then
        eval "mv /etc/filebeat/certs/${iname}.pem /etc/filebeat/certs/filebeat.pem ${debug}"
        eval "mv /etc/filebeat/certs/${iname}.key /etc/filebeat/certs/filebeat.key ${debug}"
    fi        
    logger "Done"
    echo "Starting Filebeat..."
    eval "systemctl daemon-reload ${debug}"
    eval "systemctl enable filebeat.service ${debug}"
    eval "systemctl start filebeat.service ${debug}"     
}

## Health check
healthCheck() {
    cores=$(cat /proc/cpuinfo | grep processor | wc -l)
    ram_gb=$(free -m | awk '/^Mem:/{print $2}')

    if [ ${cores} -lt 2 ] || [ ${ram_gb} -lt 3700 ]
    then
        echo "Your system does not meet the recommended minimum hardware requirements of 2Gb of RAM and 2 CPU cores . If you want to proceed with the installation use the -i option to ignore these requirements."
        exit 1;
    else
        echo "Starting the installation..."
    fi
}

## Main

main() {
  
    
    if [ -n "$1" ] 
    then    
        while [ -n "$1" ]
        do
            case "$1" in
            "-i"|"--ignore-healthcheck")        
                ignore=1
                shift
                ;;     
            "-n"|"--node-name") 
                iname=$2  
                shift
                shift
                ;;                   
            "-d"|"--debug") 
                debugEnabled=1          
                shift 1
                ;;                 
            "-h"|"--help")        
                getHelp
                ;;                
            *)
                getHelp
            esac
        done

        if [ "$EUID" -ne 0 ]; then
            echo "This script must be run as root."
            exit 1;
        fi

        checkArch
                
        if [ -n "${debugEnabled}" ]
        then
            debug=""
        fi
        if [[ -z "${iname}" ]]  
        then
            getHelp
        fi
        if [ -n "${ignore}" ]
        then
            echo "Health-check ignored."

        else
            healthCheck
        fi
        checkConfig
        installPrerequisites
        addWazuhrepo
        installWazuh
        installFilebeat iname        
        configureFilebeat
    else
        getHelp
    fi
}

main "$@"
