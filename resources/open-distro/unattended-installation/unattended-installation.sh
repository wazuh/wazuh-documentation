#!/bin/bash

# Program to install Wazuh manager along Open Distro for Elasticsearch for both, all-in-one and distributed deploments.
#
#
# Copyright (C) 2015-2021, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

## Check if system is based on yum or apt-get
char="."
debug='>> /var/log/wazuh-unattended-installation.log 2>&1'
WAZUH_VER="4.1.5"
WAZUH_REV="1"
ELK_VER="7.10.2"
OD_VER="1.13.2"
OD_REV="1"
ow=""
aio=""
ismaster=""
CONFIG_ROUTE="~/certs.tar"
ELASTICINSTANCES="Elasticsearch nodes:"
FILEBEATINSTANCES="Wazuh servers IPs:"
KIBANAINSTANCES="Kibana IP:"
ELASTICHEAD='## Elasticsearch configuration'
FILEBEATHEAD='# Wazuh-master configuration'
KIBANAHEAD='# Kibana configuration'
CLUSTERINITIALMNODES='  cluster.initial_master_nodes:'
DISCOVERSEEDHOST='  discovery.seed_hosts:'

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

rollBack() {

    if [ -z "${uninstall}" ]; then
        echo "Cleaning the installation" 
    fi   
    
    if [ -n "${wazuhinstalled}" ]; then
        echo "Removing the Wazuh manager..."
        if [ "${sys_type}" == "yum" ]; then
            eval "yum remove wazuh-manager -y ${debug}"
        elif [ "${sys_type}" == "zypper" ]; then
            eval "zypper -n remove wazuh-manager ${debug}"
        elif [ "${sys_type}" == "apt-get" ]; then
            eval "apt remove --purge wazuh-manager -y ${debug}"
        fi 
        eval "rm -rf /var/ossec/ ${debug}"
    fi     

    if [ -n "${elasticinstalled}" ]; then
        echo "Removing Elasticsearch..."
        if [ "${sys_type}" == "yum" ]; then
            eval "yum remove opendistroforelasticsearch -y ${debug}"
            eval "yum remove elasticsearch* -y ${debug}"
            eval "yum remove opendistro-* -y ${debug}"
        elif [ "${sys_type}" == "zypper" ]; then
            eval "zypper -n remove opendistroforelasticsearch elasticsearch* opendistro-* ${debug}"
        elif [ "${sys_type}" == "apt-get" ]; then
            eval "apt remove --purge opendistroforelasticsearch elasticsearch* opendistro-* -y ${debug}"
        fi 
        eval "rm -rf /var/lib/elasticsearch/ ${debug}"
        eval "rm -rf /usr/share/elasticsearch/ ${debug}"
        eval "rm -rf /etc/elasticsearch/ ${debug}"
        eval "rm -rf ~/search-guard-tlstool-1.8.zip ${debug}"
        eval "rm -rf ~/searchguard ${debug}"
    fi

    if [ -n "${filebeatinstalled}" ]; then
        echo "Removing Filebeat..."
        if [ "${sys_type}" == "yum" ]; then
            eval "yum remove filebeat -y ${debug}"
        elif [ "${sys_type}" == "zypper" ]; then
            eval "zypper -n remove filebeat ${debug}"
        elif [ "${sys_type}" == "apt-get" ]; then
            eval "apt remove --purge filebeat -y ${debug}"
        fi 
        eval "rm -rf /var/lib/filebeat/ ${debug}"
        eval "rm -rf /usr/share/filebeat/ ${debug}"
        eval "rm -rf /etc/filebeat/ ${debug}"
    fi

    if [ -n "${kibanainstalled}" ]; then
        echo "Removing Kibana..."
        if [ "${sys_type}" == "yum" ]; then
            eval "yum remove opendistroforelasticsearch-kibana -y ${debug}"
        elif [ "${sys_type}" == "zypper" ]; then
            eval "zypper -n remove opendistroforelasticsearch-kibana ${debug}"
        elif [ "${sys_type}" == "apt-get" ]; then
            eval "apt remove --purge opendistroforelasticsearch-kibana -y ${debug}"
        fi 
        eval "rm -rf /var/lib/kibana/ ${debug}"
        eval "rm -rf /usr/share/kibana/ ${debug}"
        eval "rm -rf /etc/kibana/ ${debug}"
    fi

    if [ -z "${uninstall}" ]; then    
        echo "Installation cleaned. Check the /var/log/wazuh-unattended-installation.log file to learn more about the issue."
    fi

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
        if [  "$?" != 0  ]; then
            echo "${1^} could not be started."
            rollBack
            exit 1;
        else
            echo "${1^} started"
        fi  
    elif [ -n "$(ps -e | egrep ^\ *1\ .*init$)" ]; then
        eval "chkconfig $1 on ${debug}"
        eval "service $1 start ${debug}"
        eval "/etc/init.d/$1 start ${debug}"
        if [  "$?" != 0  ]; then
            echo "${1^} could not be started."
            rollBack
            exit 1;
        else
            echo "${1^} started"
        fi     
    elif [ -x /etc/rc.d/init.d/$1 ] ; then
        eval "/etc/rc.d/init.d/$1 start ${debug}"
        if [  "$?" != 0  ]; then
            echo "${1^} could not be started."
            rollBack
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
   echo -e "\t-w   | --install-wazuh Installs the Wazuh server. Must be used with option -wname <node-name>"
   echo -e "\t-e   | --install-elasticsearch Installs Open Distro for Elasticsearch. Must be used with option -ename <node-name>"
   echo -e "\t-k   | --install-kibana Installs Open Distro for Kibana. Must be used with option -kname <node-name>"
   echo -e "\t-en  | --elastic-node-name Name of the node"
   echo -e "\t-wn  | --wazuh-node-name Name of the node"
   echo -e "\t-kn  | --kibana-node-name Name of the node"
   echo -e "\t-c   | --create-certificates Generates the certificates for all the indicated nodes"
   echo -e "\t-o   | --overwrite Overwrite the existing installation"
   echo -e "\t-r   | --uninstall Remove the installation"
   echo -e "\t-v   | --verbose Shows the complete installation output"
   echo -e "\t-i   | --ignore-health-check Ignores the health-check"
   echo -e "\t-h   | --help Shows help"
   exit 1 # Exit script after printing help

}

## Checks if the configuration file or certificates exist
checkConfig() {

    if [ -f ~/config.yml ]; then
        echo "Configuration file found. Starting the installation..."
    else
        if [ -f ${CONFIG_ROUTE} ]; then
            echo "Certificates file found. Starting the installation..."
            eval "tar --overwrite -C ~/ -xf ${CONFIG_ROUTE} config.yml ${debug}"
            readConfig
        elif [ -f /etc/elasticsearch/certs/certs.tar ]; then
            eval "mv /etc/elasticsearch/certs/certs.tar ~/ ${debug}"
            eval "tar --overwrite -C ~/ -xf ${CONFIG_ROUTE} config.yml ${debug}"
            echo "Certificates file found. Starting the installation..."
            readConfig
        else
            echo "No configuration file found."
            exit 1;
        fi
    fi

}

readConfig() {
    
    IFS=$'\r\n' GLOBIGNORE='*' command eval  'CONFIG=($(cat ~/config.yml | grep -v "#" ~/config.yml))'
    for i in "${!CONFIG[@]}"; do
        if [[ "${CONFIG[$i]}" == "${ELASTICINSTANCES}" ]]; then
            ELASTICLIMITT=${i}
        fi

        if [[ "${CONFIG[$i]}" == "${DISCOVERSEEDHOST}" ]]; then
            DSH=${i}
        fi    

        if [[ "${CONFIG[$i]}" == "${FILEBEATINSTANCES}" ]]; then
            ELASTICLIMIB=${i}
            FILEBEATLIMITT=${i}
        fi

        if [[ "${CONFIG[$i]}" == "${KIBANAINSTANCES}" ]]; then
            FILEBEATLIMIB=${i}
        fi  
    done

    ## Read Elasticsearch nodes
    counter=${ELASTICLIMITT}
    i=0
    char="#"
    while [ "${counter}" -le "${ELASTICLIMIB}" ]
    do
        if  [ "${CONFIG[counter]}" !=  "${ELASTICINSTANCES}" ] && [ "${CONFIG[counter]}" !=  "${FILEBEATINSTANCES}" ] && [ "${CONFIG[counter]}" !=  "${FILEBEATHEAD}" ] && [ "${CONFIG[counter]}" !=  "${CLUSTERINITIALMNODES}" ] && [ "${CONFIG[counter]}" !=  "${DISCOVERSEEDHOST}" ] && [ -n "${CONFIG[counter]}" ]; then
            
            if [ "${counter}" -lt "${DSH}" ]; then
                ELASTICNODES[i]+="$(echo "${CONFIG[counter]}" | tr -d '\011\012\013\014\015\040')"
            else
                ENODESIP[i]+="$(echo "${CONFIG[counter]}" | tr -d '\011\012\013\014\015\040')"
            fi
            ((i++))
        fi    

        ((counter++))
    done

    ## Read Filebeat nodes
    counter=${FILEBEATLIMITT}
    i=0
    while [ "${counter}" -le "${FILEBEATLIMIB}" ]
    do
        if  [ "${CONFIG[counter]}" !=  "${FILEBEATINSTANCES}" ] && [ "${CONFIG[counter]}" !=  "${KIBANAINSTANCES}" ] && [ "${CONFIG[counter]}" !=  "${KIBANAHEAD}" ] && [ -n "${CONFIG[counter]}" ] && [ "${CONFIG[counter]}" !=  "  name:" ] && [ "${CONFIG[counter]}" !=  "  ip:" ] && [ "${CONFIG[counter]}" != "  master: true" ]; then
            FILEBEATNODES[i]+="$(echo "${CONFIG[counter]}" | tr -d '\011\012\013\014\015\040')"
            ((i++))
        elif [ "${CONFIG[counter]}" == "  master: true" ]; then
            ismaster="1"
            masterpos="${i}"
            echo "POS ${masterpos}"
        fi    

    ((counter++))
    done

    i=0
    j=0
    while [ "${i}" -lt "${#FILEBEATNODES[@]}" ]
    do
        ((i++))
        WAZUHSERVERIPS[j]+=${FILEBEATNODES[i]}
        ((i++))
        ((j++))
    done    

    ## Read Kibana nodes
    counter=${FILEBEATLIMIB}
    i=0
    while [ "${counter}" -le "${#CONFIG[@]}" ]
    do
        if  [ "${CONFIG[counter]}" !=  "${KIBANAINSTANCES}" ]  && [ "${CONFIG[counter]}" !=  "${KIBANAHEAD}" ] && [ "${CONFIG[counter]}" !=  "    ip:" ] && [ -n "${CONFIG[counter]}" ] && [ "${CONFIG[counter]}" !=  "  name:" ] && [ "${CONFIG[counter]}" !=  "  ip:" ]; then
            KIBANANODES[i]+="$(echo "${CONFIG[counter]}" | tr -d '\011\012\013\014\015\040')"
            ((i++))
        fi    

        ((counter++))    
    done

}

## Install the required packages for the installation
installPrerequisites() {
    logger "Installing all necessary utilities for the installation..."

    if [ ${sys_type} == "yum" ]; then
        eval "yum install curl unzip wget libcap -y ${debug}"
    elif [ ${sys_type} == "zypper" ]; then
        eval "zypper -n install curl unzip wget ${debug}"         
        eval "zypper -n install libcap-progs ${debug} || zypper -n install libcap2 ${debug}"
    elif [ ${sys_type} == "apt-get" ]; then
        eval "apt-get update -q $debug"
        eval "apt-get install apt-transport-https curl unzip wget libcap2-bin -y ${debug}"        
    fi

    if [  "$?" != 0  ]; then
        echo "Error: Prerequisites could not be installed"
        exit 1;
    else
        logger "Done"
    fi          
}


## Add the Wazuh repository
addWazuhrepo() {
    logger "Adding the Wazuh repository..."

    if [ ${sys_type} == "yum" ]; then
        eval "rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH ${debug}"
        eval "echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/4.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo ${debug}"
    elif [ ${sys_type} == "zypper" ]; then
        eval "rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH ${debug}"
        eval "echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/4.x/yum/\nprotect=1' | tee /etc/zypp/repos.d/wazuh.repo ${debug}"            
    elif [ ${sys_type} == "apt-get" ]; then
        eval "curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH --max-time 300 | apt-key add - ${debug}"
        eval "echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee - /etc/apt/sources.list.d/wazuh.list ${debug}"
        eval "apt-get update -q ${debug}"
    fi    

    logger "Done" 
}

## Wazuh manager
installWazuh() {
    
    logger "Installing the Wazuh manager..."
    if [ ${sys_type} == "zypper" ]; then
        eval "zypper -n install wazuh-manager=${WAZUH_VER}-${WAZUH_REV} ${debug}"
    else
        eval "${sys_type} install wazuh-manager${sep}${WAZUH_VER}-${WAZUH_REV} -y ${debug}"
    fi
    if [  "$?" != 0  ]; then
        echo "Error: Wazuh installation failed"
        rollBack
        exit 1;
    else
        wazuhinstalled="1"
        logger "Done"
    fi   
    startService "wazuh-manager"

}

## Elasticsearch
installElasticsearch() {

    logger "Installing Open Distro for Elasticsearch..."

    if [ ${sys_type} == "yum" ]; then
        eval "yum install opendistroforelasticsearch-${OD_VER}-${OD_REV} -y ${debug}"
    elif [ ${sys_type} == "zypper" ]; then
        eval "zypper -n install opendistroforelasticsearch=${OD_VER}-${OD_REV} ${debug}"
    elif [ ${sys_type} == "apt-get" ]; then
        eval "apt install elasticsearch-oss opendistroforelasticsearch -y ${debug}"
    fi

    if [  "$?" != 0  ]; then
        echo "Error: Elasticsearch installation failed"
        rollBack
        exit 1;
    else
        elasticinstalled="1"
        logger "Done"

        logger "Configuring Elasticsearch..."

        eval "curl -so /etc/elasticsearch/elasticsearch.yml https://packages.wazuh.com/resources/4.1/open-distro/elasticsearch/7.x/elasticsearch_unattended.yml --max-time 300 ${debug}"

        if [ -z "${aio}" ]; then
            conf="$(awk '{sub("node.name: node-1", "node.name: '${ename}':9200")}1' /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            conf="$( grep -v "cluster.initial_master_nodes:" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            conf="$( grep -v "        - node-1" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml    
            conf="$( grep -v "#        - node-2" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            conf="$( grep -v "#        - node-3" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            conf="$( grep -v "# discovery.seed_hosts:" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            conf="$( grep -v "#         - <elasticsearch_ip_node1>" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml                    
            conf="$( grep -v "#         - <elasticsearch_ip_node2>" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml                    
            conf="$( grep -v "#         - <elasticsearch_ip_node3>" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            conf="$( grep -v "opendistro_security.nodes_dn:" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml            
            conf="$( grep -v "- CN=node-1,OU=Docu,O=Wazuh,L=California,C=US" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            conf="$( grep -v "# - CN=node-2,OU=Docu,O=Wazuh,L=California,C=US" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            conf="$( grep -v "# - CN=node-3,OU=Docu,O=Wazuh,L=California,C=US" /etc/elasticsearch/elasticsearch.yml)"
            echo "${conf}" > /etc/elasticsearch/elasticsearch.yml
            
            echo "cluster.initial_master_nodes:" >> /etc/elasticsearch/elasticsearch.yml
            for i in "${!ELASTICNODES[@]}"; do
                echo "        - ${ELASTICNODES[i]}" >> /etc/elasticsearch/elasticsearch.yml
            done 
            if [ ${#ELASTICNODES[@]} -lt "3" ]; then
                echo "cluster.initial_master_nodes:" >> /etc/elasticsearch/elasticsearch.yml   
                for i in "${!ENODESIP[@]}"; do
                    echo "        - ${ENODESIP[i]}" >> /etc/elasticsearch/elasticsearch.yml
                done                         
            fi 
            echo "opendistro_security.nodes_dn:" >> /etc/elasticsearch/elasticsearch.yml
            for i in "${!ELASTICNODES[@]}"; do
                echo "- CN=${ELASTICNODES[i]},OU=Docu,O=Wazuh,L=California,C=US" >> /etc/elasticsearch/elasticsearch.yml
            done             

        fi

        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://packages.wazuh.com/resources/4.1/open-distro/elasticsearch/roles/roles.yml --max-time 300 ${debug}"
        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://packages.wazuh.com/resources/4.1/open-distro/elasticsearch/roles/roles_mapping.yml --max-time 300 ${debug}"
        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml https://packages.wazuh.com/resources/4.1/open-distro/elasticsearch/roles/internal_users.yml --max-time 300 ${debug}"        
        eval "rm /etc/elasticsearch/esnode-key.pem /etc/elasticsearch/esnode.pem /etc/elasticsearch/kirk-key.pem /etc/elasticsearch/kirk.pem /etc/elasticsearch/root-ca.pem -f ${debug}"

        if [ -n "${aio}" ]; then

            ## Create certificates
            eval "mkdir /etc/elasticsearch/certs ${debug}"
            eval "cd /etc/elasticsearch/certs ${debug}"
            eval "curl -so ~/wazuh-cert-tool.sh https://packages.wazuh.com/resources/4.1/open-distro/tools/certificate-utility/wazuh-cert-tool.sh --max-time 300 ${debug}"

            echo "# Elasticsearch nodes" >> ~/instances.yml
            echo "elasticsearch-nodes:" >> ~/instances.yml
            echo "- name: elasticsearch" >> ~/instances.yml
            echo "    ip:" >> ~/instances.yml
            echo "    - 127.0.0.1" >> ~/instances.yml

            echo "# Wazuh server nodes" >> ~/instances.yml
            echo "wazuh-servers:" >> ~/instances.yml
            echo "- name: filebeat" >> ~/instances.yml
            echo "    ip:" >> ~/instances.yml
            echo "    - 127.0.0.1" >> ~/instances.yml

            echo "# Kibana node"  >> ~/instances.yml
            echo "kibana:"  >> ~/instances.yml
            echo "- name: kibana" >> ~/instances.yml
            echo "    ip:" >> ~/instances.yml
            echo "    - 127.0.0.1" >> ~/instances.yml
        else
            eval "mkdir /etc/elasticsearch/certs ${debug}"
            eval "cd /etc/elasticsearch/certs ${debug}"
            eval "curl -so ~/wazuh-cert-tool.sh https://packages.wazuh.com/resources/4.1/open-distro/tools/certificate-utility/wazuh-cert-tool.sh --max-time 300 ${debug}"
            echo "# Elasticsearch nodes" >> ~/instances.yml
            echo "elasticsearch-nodes:" >> ~/instances.yml
            i=0
            while [ ${i} -lt ${#ENODESIP[@]} ]; do
                echo "  - name: ${ELASTICNODES[i]}" >> ~/instances.yml
                echo "    ip:" >> ~/instances.yml
                echo "      - ${ENODESIP[i]}" >> ~/instances.yml
                ((i++))
            done           
            echo "# Wazuh server nodes" >> ~/instances.yml
            echo "wazuh-servers:" >> ~/instances.yml
            i=0
            while [ ${i} -le ${#FILEBEATNODES[@]} ]; do
                if [ "${FILEBEATNODES[i]}" == "  master: true" ]; then
                    ((i++))
                else
                    echo "  - name: ${FILEBEATNODES[i]}" >> ~/instances.yml
                    echo "    ip:" >> ~/instances.yml
                    echo "  - ${FILEBEATNODES[i+1]}" >> ~/instances.yml
                    ((i++))
                    ((i++))
                fi
            done

            echo "# Kibana node"  >> ~/instances.yml
            echo "kibana:"  >> ~/instances.yml
            echo "- name: ${KIBANANODES[0]}" >> ~/instances.yml
            echo "    ip:" >> ~/instances.yml
            echo "    - ${KIBANANODES[1]}" >> ~/instances.yml

        fi

        export JAVA_HOME=/usr/share/elasticsearch/jdk/
        bash ~/wazuh-cert-tool.sh

        if [  "$?" != 0  ]; then
            echo "Error: certificates were not created"
            rollBack

            exit 1;
        else
            logger "Certificates created"
        fi     
        eval "cp ~/certs/elasticsearch* /etc/elasticsearch/certs/ ${debug}"
        eval "cp ~/certs/root-ca.pem /etc/elasticsearch/certs/ ${debug}"
        eval "cp ~/certs/admin* /etc/elasticsearch/certs/ ${debug}"

        if [ -z "${aio}" ]; then
            eval "cd ~/certs/ ${debug}"
            eval "tar -cvf certs.tar * ${debug}"
            eval "mv ~/certs/certs.tar ~/ ${debug}"
        fi
        
        # Configure JVM options for Elasticsearch
        ram_gb=$(free -g | awk '/^Mem:/{print $2}')
        ram=$(( ${ram_gb} / 2 ))

        if [ ${ram} -eq "0" ]; then
            ram=1;
        fi    
        eval "sed -i "s/-Xms1g/-Xms${ram}g/" /etc/elasticsearch/jvm.options ${debug}"
        eval "sed -i "s/-Xmx1g/-Xmx${ram}g/" /etc/elasticsearch/jvm.options ${debug}"
     
        eval "/usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro-performance-analyzer ${debug}"
        # Start Elasticsearch
        startService "elasticsearch"
        echo "Initializing Elasticsearch..."
        until $(curl -XGET https://localhost:9200/ -uadmin:admin -k --max-time 120 --silent --output /dev/null); do
            echo -ne ${char}
            sleep 10
        done    

        eval "cd /usr/share/elasticsearch/plugins/opendistro_security/tools/ ${debug}"
        eval "./securityadmin.sh -cd ../securityconfig/ -icl -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem ${debug}"
        echo "Done"
        
    fi

}

## Filebeat
installFilebeat() {
    
    logger "Installing Filebeat..."
    
    if [ ${sys_type} == "zypper" ]; then
        eval "zypper -n install filebeat=${ELK_VER} ${debug}"
    else
        eval "${sys_type} install filebeat${sep}${ELK_VER} -y -q  ${debug}"
    fi
    if [  "$?" != 0  ]; then
        echo "Error: Filebeat installation failed"
        rollBack
        exit 1;
    else
        filebeatinstalled="1"
        eval "curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/resources/4.1/open-distro/filebeat/7.x/filebeat_unattended.yml --max-time 300  ${debug}"
        eval "curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/4.0/extensions/elasticsearch/7.x/wazuh-template.json --max-time 300 ${debug}"
        eval "chmod go+r /etc/filebeat/wazuh-template.json ${debug}"
        eval "curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz --max-time 300 | tar -xvz -C /usr/share/filebeat/module ${debug}"
        eval "mkdir /etc/filebeat/certs ${debug}"
        if [[ -n "${aio}" ]]; then
            eval "cp ~/certs/root-ca.pem /etc/filebeat/certs/ ${debug}"
            eval "cp ~/certs/filebeat* /etc/filebeat/certs/ ${debug}"
        else

            if [ ${#FILEBEATNODES[@]} -lt "3" ]; then
                conf="$(awk '{sub("        - 127.0.0.1:9200", "        - '${FILEBEATNODES[1]}':9200")}1' /etc/filebeat/filebeat.yml)"
                echo "${conf}" > /etc/filebeat/filebeat.yml                
            else
                conf="$( grep -v "output.elasticsearch.hosts:" /etc/filebeat/filebeat.yml)"
                echo "${conf}" > /etc/filebeat/filebeat.yml
                conf="$( grep -v "        - 127.0.0.1:9200" /etc/filebeat/filebeat.yml)"
                echo "${conf}" > /etc/filebeat/filebeat.yml  
                conf="$( grep -v "#        - <elasticsearch_ip_node_2>:9200" /etc/filebeat/filebeat.yml)"
                echo "${conf}" > /etc/filebeat/filebeat.yml   
                conf="$( grep -v "#        - <elasticsearch_ip_node_3>:9200" /etc/filebeat/filebeat.yml)"
                echo "${conf}" > /etc/filebeat/filebeat.yml   
                
                echo "output.elasticsearch.hosts:" >> /etc/filebeat/filebeat.yml
                for i in "${!ENODESIP[@]}"; do
                    echo "        - ${ENODESIP[i]}:9200"
                done 

                # Configure the Wazuh cluster
                if [ -n "${ismaster}" ]; then
                    masterIP="${FILEBEATNODES[masterpos-1]}"
                    if [ -z "$clusterkey" ]; then
                        echo "Generating the Wazuh cluster key..."
                        clusterkey="$(openssl rand -hex 16)"
                        conf="$(awk '{sub("    <node_name>node01</node_name>", "    <node_name>'${wname}'</node_name>")}1' /var/ossec/etc/ossec.conf)"
                        echo "${conf}" > /var/ossec/etc/ossec.conf  
                        conf="$(awk '{sub("    <key></key>", "    <key>'${clusterkey}'</key>")}1' /var/ossec/etc/ossec.conf)"
                        echo "${conf}" > /var/ossec/etc/ossec.conf  
                        conf="$(awk '{sub("        <node>NODE_IP</node>", "        <node>'${masterIP}'</node>")}1' /var/ossec/etc/ossec.conf)"
                        echo "${conf}" > /var/ossec/etc/ossec.conf 
                        conf="$(awk '{sub("    <disabled>yes</disabled>", "    <disabled>no</disabled>")}1' /var/ossec/etc/ossec.conf)"
                        echo "${conf}" > /var/ossec/etc/ossec.conf                                                                
                    fi
                else
                    # Configure worker node
                    masterIP="${FILEBEATNODES[masterpos-1]}"
                    conf="$(awk '{sub("    <node_name>node01</node_name>", "    <node_name>'${wname}'</node_name>")}1' /var/ossec/etc/ossec.conf)"
                    echo "${conf}" > /var/ossec/etc/ossec.conf  
                    conf="$(awk '{sub("    <key></key>", "    <key>'${clusterkey}'</key>")}1' /var/ossec/etc/ossec.conf)"
                    echo "${conf}" > /var/ossec/etc/ossec.conf  
                    conf="$(awk '{sub("        <node>NODE_IP</node>", "        <node>'${masterIP}'</node>")}1' /var/ossec/etc/ossec.conf)"
                    echo "${conf}" > /var/ossec/etc/ossec.conf 
                    conf="$(awk '{sub("    <disabled>yes</disabled>", "    <disabled>no</disabled>")}1' /var/ossec/etc/ossec.conf)"
                    echo "${conf}" > /var/ossec/etc/ossec.conf  
                fi
            fi

            eval "cp ~/certs.tar /etc/filebeat/certs/ ${debug}"
            eval "cd /etc/filebeat/certs/ ${debug}"
            eval "tar -xf certs.tar ${wname}.pem ${wname}-key.pem root-ca.pem ${debug}"
            if [ ${wname} != "filebeat" ]
            then
                eval "mv /etc/filebeat/certs/${wname}.pem /etc/filebeat/certs/filebeat.pem ${debug}"
                eval "mv /etc/filebeat/certs/${wname}-key.pem /etc/filebeat/certs/filebeat-key.pem ${debug}"
            fi
        fi

        # Start Filebeat
        startService "filebeat"

        logger "Done"
    fi

}

## Kibana
installKibana() {
    
    logger "Installing Open Distro for Kibana..."
    if [ ${sys_type} == "zypper" ]; then
        eval "zypper -n install opendistroforelasticsearch-kibana=${OD_VER} ${debug}"
    else
        eval "${sys_type} install opendistroforelasticsearch-kibana${sep}${OD_VER} -y ${debug}"
    fi
    if [  "$?" != 0  ]; then
        echo "Error: Kibana installation failed"
        rollBack
        exit 1;
    else    
        kibanainstalled="1"
        eval "curl -so /etc/kibana/kibana.yml https://packages.wazuh.com/resources/4.1/open-distro/kibana/7.x/kibana_unattended.yml --max-time 300 ${debug}"
        eval "mkdir /usr/share/kibana/data ${debug}"
        eval "chown -R kibana:kibana /usr/share/kibana/ ${debug}"
        eval "cd /usr/share/kibana ${debug}"
        eval "sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-4.1.5_7.10.2-1.zip ${debug}"
        if [  "$?" != 0  ]; then
            echo "Error: Wazuh Kibana plugin could not be installed."
            rollBack

            exit 1;
        fi

        eval "mkdir /etc/kibana/certs ${debug}"

        if [ -n "${aio}" ]; then

            eval "cp ~/certs/kibana* /etc/kibana/certs/ ${debug}"
            eval "cp ~/certs/root-ca.pem /etc/kibana/certs/ ${debug}"
            eval "chown -R kibana:kibana /etc/kibana/ ${debug}"
            eval "chmod -R 500 /etc/kibana/certs ${debug}"
            eval "chmod 440 /etc/kibana/certs/kibana* ${debug}"
            eval "setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node ${debug}"
        else
            ## EDIT KIBANA.YML
            if [ ${#ENODESIP[@]} -gt "1" ]; then
                conf="$( grep -v "elasticsearch.hosts: https://127.0.0.1:9200" /etc/kibana/kibana.yml)"
                echo "${conf}" > /etc/kibana/kibana.yml   
                echo "elasticsearch.hosts:" >> /etc/kibana/kibana.yml
                i=0
                while [ ${i} -lt ${#ENODESIP[@]} ]; do
                    echo "  - ${ENODESIP[i]}" >> /etc/kibana/kibana.yml
                    ((i++))
                done

            else
                conf="$(awk '{sub("elasticsearch.hosts: https://127.0.0.1:9200", "elasticsearch.hosts: '${ENODESIP[0]}'")}1' /etc/kibana/kibana.yml)"
                echo "${conf}" > /etc/kibana/kibana.yml
            fi

            eval "cp ~/certs.tar /etc/kibana/certs/ ${debug}"
            eval "cd /etc/kibana/certs/ ${debug}"
            eval "tar --overwrite -xf certs.tar ${KIBANANODES[0]}.pem ${KIBANANODES[0]}-key.pem root-ca.pem ${debug}"            
        fi

        # Start Kibana
        startService "kibana"

        logger "Done"
    fi

}

checkFlavor() {
    if [ -n "$elasticinstalled" ]; then
        flavor=$(grep 'opendistro' /etc/elasticsearch/elasticsearch.yml)
    fi

    if [ -n "$flavor" ]; then
        echo "OD"
    fi
}

checkInstalled() {
    
    if [ "${sys_type}" == "yum" ]; then
        wazuhinstalled=$(yum list installed 2>/dev/null | grep wazuh-manager)
    elif [ "${sys_type}" == "zypper" ]; then
        wazuhinstalled=$(zypper packages --installed | grep wazuh-manager | grep i+)
    elif [ "${sys_type}" == "apt-get" ]; then
        wazuhinstalled=$(apt list --installed  2>/dev/null | grep wazuh-manager)
    fi    

    if [ -n "${wazuhinstalled}" ]; then
        if [ ${sys_type} == "zypper" ]; then
            wazuhversion=$(echo ${wazuhinstalled} | awk '{print $11}')
        else
            wazuhversion=$(echo ${wazuhinstalled} | awk '{print $2}')
        fi    
    fi

    if [ "${sys_type}" == "yum" ]; then
        elasticinstalled=$(yum list installed 2>/dev/null | grep opendistroforelasticsearch)
    elif [ "${sys_type}" == "zypper" ]; then
        elasticinstalled=$(zypper packages --installed | grep opendistroforelasticsearch | grep i+ | grep noarch)
    elif [ "${sys_type}" == "apt-get" ]; then
        elasticinstalled=$(apt list --installed  2>/dev/null | grep opendistroforelasticsearch)
    fi 

    if [ -n "${elasticinstalled}" ]; then
        if [ ${sys_type} == "zypper" ]; then
            odversion=$(echo ${elasticinstalled} | awk '{print $11}')
        else
            odversion=$(echo ${elasticinstalled} | awk '{print $2}')
        fi  
    fi

    if [ "${sys_type}" == "yum" ]; then
        filebeatinstalled=$(yum list installed 2>/dev/null | grep filebeat)
    elif [ "${sys_type}" == "zypper" ]; then
        filebeatinstalled=$(zypper packages --installed | grep filebeat | grep i+ | grep noarch)
    elif [ "${sys_type}" == "apt-get" ]; then
        filebeatinstalled=$(apt list --installed  2>/dev/null | grep filebeat)
    fi 

    if [ -n "${filebeatinstalled}" ]; then
        if [ ${sys_type} == "zypper" ]; then
            filebeatversion=$(echo ${filebeatinstalled} | awk '{print $11}')
        else
            filebeatversion=$(echo ${filebeatinstalled} | awk '{print $2}')
        fi  
    fi    

    if [ "${sys_type}" == "yum" ]; then
        kibanainstalled=$(yum list installed 2>/dev/null | grep opendistroforelasticsearch-kibana)
    elif [ "${sys_type}" == "zypper" ]; then
        kibanainstalled=$(zypper packages --installed | grep opendistroforelasticsearch-kibana | grep i+)
    elif [ "${sys_type}" == "apt-get" ]; then
        kibanainstalled=$(apt list --installed  2>/dev/null | grep opendistroforelasticsearch-kibana)
    fi 

    if [ -n "${kibanainstalled}" ]; then
        if [ ${sys_type} == "zypper" ]; then
            kibanaversion=$(echo ${kibanainstalled} | awk '{print $11}')
        else
            kibanaversion=$(echo ${kibanainstalled} | awk '{print $2}')
        fi  
    fi  

    if [ -z "${wazuhinstalled}" ] || [ -z "${elasticinstalled}" ] || [ -z "${filebeatinstalled}" ] || [ -z "${kibanainstalled}" ] && [ -n "${uninstall}" ]; then 
        echo "Error: No Wazuh components were found on the system."
        exit 1;        
    fi

    if [ -n "${wazuhinstalled}" ] || [ -n "${elasticinstalled}" ] || [ -n "${filebeatinstalled}" ] || [ -n "${kibanainstalled}" ]; then 
        if [ -n "${ow}" ]; then
             overwrite
        
        elif [ -n "${uninstall}" ]; then
            echo "Removing the installed items"
            rollBack
        else
            echo "All the Wazuh componets were found on this host. If you want to overwrite the current installation, run this script back using the option -o/--overwrite. NOTE: This will erase all the existing configuration and data."
            # exit 1;
        fi
    fi          

}

overwrite() {  
    rollBack
    addWazuhrepo
    installPrerequisites
    if [ -n "${wazuhinstalled}" ]; then
        installWazuh
    fi
    if [ -n "${elasticinstalled}" ]; then
        installElasticsearch
    fi    
    if [ -n "${filebeatinstalled}" ]; then
        installFilebeat
    fi
    if [ -n "${kibanainstalled}" ]; then
        installKibana
    fi    
    checkInstallation     
}

networkCheck() {
    connection=$(curl -I https://packages.wazuh.com/ -s | grep 200 | awk '{print $2}')
    if [ ${connection} != "200" ]; then
        echo "Error. No internet connection. To perform an offline installation, please run this script with the option -d/--download-packages in a computer with internet access, copy the wazuh-packages.tar file generated on this computer and run again this script."
        exit 1;
    fi
}

specsCheck() {

    cores=$(cat /proc/cpuinfo | grep processor | wc -l)
    ram_gb=$(free -m | awk '/^Mem:/{print $2}')
    
}

## Health check
healthCheck() {

    specsCheck
    if [ ${cores} -lt 2 ] || [ ${ram_gb} -lt 3700 ]; then
        echo "Your system does not meet the recommended minimum hardware requirements of 4Gb of RAM and 2 CPU cores. If you want to proceed with the installation use the -i option to ignore these requirements."
        exit 1;
    else
        echo "Starting the installation..."
    fi

}

changePasswords() {
    eval "curl -so ~/wazuh-passwords-tool.sh https://packages.wazuh.com/resources/4.1/open-distro/tools/wazuh-passwords-tool.sh --max-time 300 ${debug}"
    if [ -n "${verbose}" ]; then
        bash ~/wazuh-passwords-tool.sh -a -v
    else
        VERBOSE='> /dev/null 2>&1'
        bash ~/wazuh-passwords-tool.sh -a
    fi     
}

checkInstallation() {

    changePasswords
    wazuhpass=$(grep "password:" /etc/filebeat/filebeat.yml )
    ra="  password: "
    wazuhpass="${wazuhpass//$ra}"
    logger "Checking the installation..."
    eval "curl -XGET https://localhost:9200 -uwazuh:${wazuhpass} -k --max-time 300 ${debug}"
    if [  "$?" != 0  ]; then
        echo "Error: Elasticsearch was not successfully installed."
        rollBack
        exit 1;     
    else
        echo "Elasticsearch installation succeeded."
    fi
    eval "filebeat test output ${debug}"
    if [  "$?" != 0  ]; then
        echo "Error: Filebeat was not successfully installed."
        rollBack
        exit 1;     
    else
        echo "Filebeat installation succeeded."
    fi    
    logger "Initializing Kibana (this may take a while)"
    until [[ "$(curl -XGET https://localhost/status -I -uwazuh:${wazuhpass} -k -s --max-time 300 | grep "200 OK")" ]]; do
        echo -ne $char
        sleep 10
    done    
    echo $'\nInstallation finished'
    echo $'\nYou can access the web interface https://<kibana_ip>. The credentials are wazuh:'${wazuhpass}''

    exit 0;

}

main() {

    if [ "$EUID" -ne 0 ]; then
        echo "This script must be run as root."
        exit 1;
    fi   

    checkArch
    touch /var/log/wazuh-unattended-installation.log

    if [ -n "$1" ]; then      
        while [ -n "$1" ]
        do
            case "$1" in 
            "-w"|"--install-wazuh")
                wazuh=1
                shift 1
                ;;               
            "-e"|"--install-elasticsearch")
                elastic=1
                shift 1
                ;;
            "-c"|"--create-certificates")
                certificates=1
                shift 1
                ;;
            "-en"|"--elastic-node-name")
                ename=$2
                shift
                shift
                ;;
            "-wn"|"--wazuh-node-name")
                wname=$2
                shift
                shift
                ;;
            "-kn"|"--kibana-node-name")
                kname=$2
                shift
                shift
                ;;   
            "-ck"|"--cluster-key")
                clusterkey=$2
                shift
                shift
                ;;                                               
            "-k"|"--install-kibana")
                kibana=1
                shift 1
                ;;            
            "-i"|"--ignore-healthcheck") 
                ignore=1          
                shift 1
                ;; 
            "-v"|"--verbose") 
                verbose=1          
                shift 1
                ;; 
            "-o"|"--overwrite")  
                ow=1 
                shift 1     
                ;;  
            "-r"|"--uninstall")  
                uninstall=1 
                shift 1     
                ;;                                                              
            "-h"|"--help")        
                getHelp
                ;;                                         
            *)
                getHelp
            esac
        done    

        if [ -n "${verbose}" ]; then
            debug='>> /var/log/wazuh-unattended-installation.log'
        fi

        if [ -n "${uninstall}" ]; then
            checkInstalled
            exit 0;
        fi

        if [[ -n "${elastic}" ]] && [[ -z "${ename}" ]]; then
            getHelp
        fi

        if [[ -n "${wazuh}" ]] && [[ -z "${wname}" ]]; then
            getHelp
        fi

        if [[ -n "${kibana}" ]] && [[ -z "${kname}" ]]; then
            getHelp
        fi

        if [[ -z "${elastic}" ]] && [[ -n "${ename}" ]]; then
            getHelp
        fi

        if [[ -z "${wazuh}" ]] && [[ -n "${wname}" ]]; then
            getHelp
        fi

        if [[ -z "${kibana}" ]] && [[ -n "${kname}" ]]; then
            getHelp
        fi

        if [[ -z "${elastic}" ]] && [[ -z "${wazuh}" ]] && [[ -z "${kibana}" ]]; then
            aio=1
        fi

        if [ -n "$aio" ]; then
        
            if [ -n "${ignore}" ]; then
                echo "Health-check ignored."    
                checkInstalled
            else
                checkInstalled
                healthCheck           
            fi            
            installPrerequisites
            addWazuhrepo
            installWazuh
            installElasticsearch
            installFilebeat
            installKibana
            checkInstallation  

        fi

        if [ -n "$elastic" ]; then
        
            if [ -n "${ignore}" ]; then
                echo "Health-check ignored."    
                checkInstalled
            else
                checkInstalled
                healthCheck           
            fi            
            checkConfig
            installPrerequisites
            addWazuhrepo
            installElasticsearch 

        fi     

        if [ -n "$wazuh" ]; then
        
            if [ -n "${ignore}" ]; then
                echo "Health-check ignored."    
                checkInstalled
            else
                checkInstalled
                healthCheck           
            fi  
            checkConfig          
            installPrerequisites
            addWazuhrepo
            installWazuh
            installFilebeat

        fi   

        if [ -n "$kibana" ]; then
        
            if [ -n "${ignore}" ]; then
                echo "Health-check ignored."    
                checkInstalled
            else
                checkInstalled
                healthCheck           
            fi  
            checkConfig          
            installPrerequisites
            addWazuhrepo           
            installKibana

        fi                

    else
        aio="1"
        checkInstalled  
        healthCheck   
        installPrerequisites
        addWazuhrepo
        installWazuh
        installElasticsearch
        installFilebeat
        installKibana
        checkInstallation  
    fi

}

main "$@"
