#!/bin/bash

# Program to install Wazuh manager along Open Distro for Elasticsearch
# Copyright (C) 2015-2021, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

## Check if system is based on yum or apt-get
char="."
debug='>> /var/log/wazuh-unattended-installation.log 2>&1'
WAZUH_VER="4.1.2"
WAZUH_REV="1"
ELK_VER="7.10.0"
OD_VER="1.12.0"
OD_REV="1"
ow=""
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

    if [ -n "${javainstalled}" ]; then
        echo "Removing Java Developent Kit..."
        if [ "${sys_type}" == "yum" ]; then
            eval "yum remove java-11* -y ${debug}"
        elif [ "${sys_type}" == "zypper" ]; then
            eval "zypper -n remove java-11* ${debug}"
        elif [ "${sys_type}" == "apt-get" ]; then
            eval "apt remove --purge openjdk-11-j* -y ${debug}"
        fi 

        if [ "${sys_type}" == "yum" ]; then
            eval "yum clean all -y ${debug}"
        elif [ "${sys_type}" == "zypper" ]; then
            eval "zypper -n packages --orphaned ${debug}"
        elif [ "${sys_type}" == "apt-get" ]; then
            eval "apt autoremove -y ${debug}"
        fi         
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
            exit 1;
        else
            echo "${1^} started"
        fi     
    elif [ -x /etc/rc.d/init.d/$1 ] ; then
        eval "/etc/rc.d/init.d/$1 start ${debug}"
        if [  "$?" != 0  ]; then
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
   echo -e "\t-w   | --install-wazuh Installs the Wazuh manager"
   echo -e "\t-e   | --install-elasticsearch Installs Elasticsearch"
   echo -e "\t-f   | --install-filebeat Installs Filebeat"
   echo -e "\t-k   | --install-kibana Install Kibana"
   echo -e "\t-b   | --basic Installs Elasticsearch basic license components"
   echo -e "\t-c   | --create-certificates Creates the certificates for the installation. Only needed in Elasticsearch distributed installations"
   echo -e "\t-m   | --migrate Migrates the installation from Elastic basic license to Open Distro for Elasticsearch"
   echo -e "\t-u   | --upgrade Upgrades the installation to the latest version available"
   echo -e "\t-o   | --overwrite Overwrite the existing installation"
   echo -e "\t-r   | --uninstall Remove the installation"
   echo -e "\t-p   | --download-packages Downloads all the necessary packages to perform an offline installation"
   echo -e "\t-a   | --architecture Indicates the architecture of the packages to be downloaded. Must be used with '-p'"
   echo -e "\t-v   | --verbose Shows the complete installation output"
   echo -e "\t-i   | --ignore-health-check Ignores the health-check"
   echo -e "\t-h   | --help Shows help"
   exit 1 # Exit script after printing help

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

## Install the required packages for the installation
installJava() {

    logger "Installing Java Development Kit..."

    if [ ${sys_type} == "yum" ]; then
        eval "yum install java-11-openjdk-devel -y ${debug}"
        if [ "$?" != 0 ]; then
            os=$(cat /etc/os-release > /dev/null 2>&1 | awk -F"ID=" '/ID=/{print $2; exit}' | tr -d \")
            if [ -z "${os}" ]; then
                os="centos"
            fi
            lv=$(cat /etc/os-release | grep  'PRETTY_NAME="')
            rm="PRETTY_NAME="
            rmc='"'
            ral="Amazon Linux "
            lv="${lv//$rm}"
            lv="${lv//$rmc}"
            lv="${lv//$ral}"
            lv=$(echo "$lv" | awk '{print $1;}')
            if [ ${lv} == "2" ]; then
                echo -e '[AdoptOpenJDK] \nname=AdoptOpenJDK \nbaseurl=https://adoptopenjdk.jfrog.io/artifactory/rpm/amazonlinux/2/x86_64\nenabled=1\ngpgcheck=1\ngpgkey=https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public' | eval "tee /etc/yum.repos.d/adoptopenjdk.repo ${debug}"
            elif [ ${lv} == "AMI" ]; then
                echo -e '[AdoptOpenJDK] \nname=AdoptOpenJDK \nbaseurl=https://adoptopenjdk.jfrog.io/artifactory/rpm/amazonlinux/1/x86_64\nenabled=1\ngpgcheck=1\ngpgkey=https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public' | eval "tee /etc/yum.repos.d/adoptopenjdk.repo ${debug}"
            else
                echo -e '[AdoptOpenJDK] \nname=AdoptOpenJDK \nbaseurl=http://adoptopenjdk.jfrog.io/adoptopenjdk/rpm/system-ver/$releasever/$basearch\nenabled=1\ngpgcheck=1\ngpgkey=https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public' | eval "tee /etc/yum.repos.d/adoptopenjdk.repo ${debug}"
                conf="$(awk '{sub("system-ver", "'"${os}"'")}1' /etc/yum.repos.d/adoptopenjdk.repo)"
                echo "$conf" > /etc/yum.repos.d/adoptopenjdk.repo 
            fi
            eval "yum install adoptopenjdk-11-hotspot -y ${debug}"
        fi
        export JAVA_HOME=/usr/
    elif [ ${sys_type} == "zypper" ]; then
        eval "zypper -n install java-11-openjdk-devel ${debug}"
        if [ "$?" != 0 ]; then
            eval "zypper ar -f http://adoptopenjdk.jfrog.io/adoptopenjdk/rpm/opensuse/15.0/$(uname -m) adoptopenjdk ${debug}" | echo 'a'
            eval "zypper -n install adoptopenjdk-11-hotspot ${debug} "

        fi    
        export JAVA_HOME=/usr/    
    elif [ ${sys_type} == "apt-get" ]; then
        if [ -n "$(command -v add-apt-repository)" ]; then
            eval "add-apt-repository ppa:openjdk-r/ppa -y ${debug}"
        else
            echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list
        fi
        eval "apt-get update -q ${debug}"
        eval "apt-get install openjdk-11-jdk -y ${debug}" 
        if [  "$?" != 0  ]; then
            logger "JDK installation failed."
            exit 1;
        fi
        export JAVA_HOME=/usr/
        
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
        eval "echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list ${debug}"
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
        logger "Done"

        logger "Configuring Elasticsearch..."

        eval "curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3364-Unattended_improvements/resources/open-distro/elasticsearch/7.x/elasticsearch.yml --max-time 300 ${debug}"
        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/open-distro/elasticsearch/roles/roles.yml --max-time 300 ${debug}"
        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/open-distro/elasticsearch/roles/roles_mapping.yml --max-time 300 ${debug}"
        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/open-distro/elasticsearch/roles/internal_users.yml --max-time 300 ${debug}"        
        eval "rm /etc/elasticsearch/esnode-key.pem /etc/elasticsearch/esnode.pem /etc/elasticsearch/kirk-key.pem /etc/elasticsearch/kirk.pem /etc/elasticsearch/root-ca.pem -f ${debug}"

        ## Create certificates
        eval "mkdir /etc/elasticsearch/certs ${debug}"
        eval "cd /etc/elasticsearch/certs ${debug}"
        eval "curl -so ~/wazuh-cert-tool.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3364-Unattended_improvements/resources/open-distro/tools/certificate-utility/wazuh-cert-tool.sh --max-time 300 ${debug}"
        ## eval "curl -so ~/instances.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3364-Unattended_improvements/resources/open-distro/tools/certificate-utility/instances.yml --max-time 300 ${debug}"

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
        
        # Configure JVM options for Elasticsearch
        ram_gb=$(free -g | awk '/^Mem:/{print $2}')
        ram=$(( ${ram_gb} / 2 ))

        if [ ${ram} -eq "0" ]; then
            ram=1;
        fi    
        eval "sed -i "s/-Xms1g/-Xms${ram}g/" /etc/elasticsearch/jvm.options ${debug}"
        eval "sed -i "s/-Xmx1g/-Xmx${ram}g/" /etc/elasticsearch/jvm.options ${debug}"

        jv=$(java -version 2>&1 | grep -o -m1 '1.8.0' )
        if [ "${jv}" == "1.8.0" ]; then
            echo "root hard nproc 4096" >> /etc/security/limits.conf 
            echo "root soft nproc 4096" >> /etc/security/limits.conf 
            echo "elasticsearch hard nproc 4096" >> /etc/security/limits.conf 
            echo "elasticsearch soft nproc 4096" >> /etc/security/limits.conf 
            echo "bootstrap.system_call_filter: false" >> /etc/elasticsearch/elasticsearch.yml
        fi      
        eval "/usr/share/elasticsearch/bin/elasticsearch-plugin remove opendistro_performance_analyzer ${debug}"
        # Start Elasticsearch
        startService "elasticsearch"
        echo "Initializing Elasticsearch..."
        until $(curl -XGET https://localhost:9200/ -uadmin:admin -k --max-time 120 --silent --output /dev/null); do
            echo -ne ${char}
            sleep 10
        done    

        eval "cd /usr/share/elasticsearch/plugins/opendistro_security/tools/ ${debug}"
        eval "./securityadmin.sh -cd ../securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin-key.pem ${debug}"
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
        eval "curl -so /etc/filebeat/filebeat.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3364-Unattended_improvements/resources/open-distro/filebeat/7.x/filebeat_all_in_one.yml --max-time 300  ${debug}"
        eval "curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/4.0/extensions/elasticsearch/7.x/wazuh-template.json --max-time 300 ${debug}"
        eval "chmod go+r /etc/filebeat/wazuh-template.json ${debug}"
        eval "curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.1.tar.gz --max-time 300 | tar -xvz -C /usr/share/filebeat/module ${debug}"
        eval "mkdir /etc/filebeat/certs ${debug}"
        eval "cp ~/certs/root-ca.pem /etc/filebeat/certs/ ${debug}"
        eval "cp ~/certs/filebeat* /etc/filebeat/certs/ ${debug}"

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
        rollBack
        echo "Error: Kibana installation failed"
        exit 1;
    else    
        eval "curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/3364-Unattended_improvements/resources/open-distro/kibana/7.x/kibana_all_in_one.yml --max-time 300 ${debug}"
        eval "mkdir /usr/share/kibana/data ${debug}"
        eval "chown -R kibana:kibana /usr/share/kibana/ ${debug}"
        eval "cd /usr/share/kibana ${debug}"
        eval "sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-4.1.2_7.10.0-1.zip ${debug}"
        if [  "$?" != 0  ]; then
            echo "Error: Wazuh Kibana plugin could not be installed."
            rollBack

            exit 1;
        fi     
        eval "mkdir /etc/kibana/certs ${debug}"
        eval "cp ~/certs/kibana* /etc/kibana/certs/ ${debug}"
        eval "cp ~/certs/root-ca.pem /etc/kibana/certs/ ${debug}"
        eval "chown -R kibana:kibana /etc/kibana/ ${debug}"
        eval "chmod -R 500 /etc/kibana/certs ${debug}"
        eval "chmod 440 /etc/kibana/certs/kibana* ${debug}"
        eval "setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node ${debug}"

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

    if [ -n "$(command -v java)" ]; then
        javainstalled="1"
        javaversion="$(java --version | head -1 | awk '{print $2}')"
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
            exit 1;
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
        installJava
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
    eval "curl -so ~/wazuh-passwords-tool.sh https://raw.githubusercontent.com/wazuh/wazuh-documentation/3364-Unattended_improvements/resources/open-distro/tools/wazuh-passwords-tool.sh --max-time 300 ${debug}"
    eval "bash ~/wazuh-passwords-tool.sh -a ${debug}"    
}

checkInstallation() {

    logger "Checking the installation..."
    eval "curl -XGET https://localhost:9200 -uadmin:admin -k --max-time 300 ${debug}"
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
    until [[ "$(curl -XGET https://localhost/status -I -uadmin:admin -k -s --max-time 300 | grep "200 OK")" ]]; do
        echo -ne $char
        sleep 10
    done    
    echo $'\nInstallation finished'
    echo $'\nYou can access the web interface https://<kibana_ip>. The credentials are admin:admin'

    exit 0;

}

main() {

    if [ "$EUID" -ne 0 ]; then
        echo "This script must be run as root."
        exit 1;
    fi   

    checkArch

    if [ -n "$1" ]; then      
        while [ -n "$1" ]
        do
            case "$1" in 
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
            debug=""
        fi

        if [ -n "${uninstall}" ]; then
            checkInstalled
            exit 0;
        fi        
        
        if [ -n "${ignore}" ]; then
            echo "Health-check ignored."    
            checkInstalled ow
        else
            checkInstalled ow
            healthCheck           
        fi            
        installPrerequisites
        installJava
        addWazuhrepo
        installWazuh
        installElasticsearch
        installFilebeat
        installKibana
        checkInstallation    
    else
        checkInstalled ow  
        healthCheck   
        installPrerequisites
        installJava
        addWazuhrepo
        installWazuh
        installElasticsearch
        installFilebeat
        installKibana
        checkInstallation  
    fi

}

main "$@"
