#!/bin/bash

# Program toinstall Open Distro for Elasticsearch and Kibana
# Copyright (C) 2015-2020, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

## Check if system is based on yum or apt-get
char="."
debug='> /dev/null 2>&1'
password=""
passwords=""
if [ -n "$(command -v yum)" ]
then
    sys_type="yum"
elif [ -n "$(command -v zypper)" ]
then
    sys_type="zypper"
elif [ -n "$(command -v apt-get)" ]
then
    sys_type="apt-get"
fi

## Prints information
logger() {

    echo $1

}

startService() {

    if [ -n "$(ps -e | egrep ^\ *1\ .*systemd$)" ]; then
        eval "systemctl daemon-reload $debug"
        eval "systemctl enable $1.service $debug"
        eval "systemctl start $1.service $debug"
        if [  "$?" != 0  ]
        then
            echo "${1^} could not be started."
            exit 1;
        else
            echo "${1^} started"
        fi
    elif [ -n "$(ps -e | egrep ^\ *1\ .*init$)" ]; then
        eval "chkconfig $1 on $debug"
        eval "service $1 start $debug"
        eval "/etc/init.d/$1 start $debug"
        if [  "$?" != 0  ]
        then
            echo "${1^} could not be started."
            exit 1;
        else
            echo "${1^} started"
        fi
    elif [ -x /etc/rc.d/init.d/$1 ] ; then
        eval "/etc/rc.d/init.d/$1 start $debug"
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
   echo -e "\t-e     | --install-elasticsearch Installs Open Distro for Elasticsearch (cannot be used together with option -k)"
   echo -e "\t-k     | --install-kibana Installs Open Distro for Kibana (cannot be used together with option -e)"
   echo -e "\t-n     | --node-name Name of the node"
   echo -e "\t-c     | --create-certificates Generates the certificates for all the indicated nodes"
   echo -e "\t-k     | --install-kibana Install Kibana"
   echo -e "\t-p     | --elastic-password Elastic user password"
   echo -e "\t-d     | --debug Shows the complete installation output"
   echo -e "\t-i     | --ignore-health-check Ignores the health-check"
   echo -e "\t-h     | --help Shows help"
   exit 1 # Exit script after printing help

}

## Checks if the configuration file or certificates exist
checkConfig() {

    if [ -n "$e" ]
    then
        if [ -f ~/config.yml ]
        then
            echo "Configuration file found. Starting the installation..."
        else
            if [ -f ~/certs.zip ]
            then
                echo "Certificates file found. Starting the installation..."
                eval "unzip -o ~/certs.zip config.yml $debug"
            else
                echo "No configuration file found."
                exit 1;
            fi
        fi

    elif [ -n "$k" ]
    then
        if [ -e ~/certs/${iname} ]
        then
            echo "Certificates file found. Starting the installation..."
        else
            echo "No certificates found."
            exit 1;
        fi
    fi

}


## Install the required packages for the installation
installPrerequisites() {

    logger "Installing all necessary utilities for the installation..."

    if [ $sys_type == "yum" ]
    then
        eval "yum install zip unzip curl -y -q $debug"
    elif [ $sys_type == "zypper" ]
    then
        eval "zypper -n install zip unzip curl $debug"
    elif [ $sys_type == "apt-get" ]
    then
        eval "apt-get install curl apt-transport-https zip unzip lsb-release libcap2-bin -y -q $debug"
        eval "apt-get update -q $debug"
    fi

    if [  "$?" != 0  ]
    then
        echo "Error: Prerequisites could not be installed"
        exit 1;
    else
        logger "Done"
    fi
    certs=~/certs.zip
    if [ -f "$certs" ]; then
        eval "unzip -o ~/certs.zip config.yml $debug"
    fi

}

## Add the Elastic repository
addElasticrepo() {

    logger "Adding the Elasticsearch repository..."

    if [ $sys_type == "yum" ]
    then
        eval "rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch $debug"
        echo -e '[elasticsearch-7.x]\nname=Elasticsearch repository for 7.x packages\nbaseurl=https://artifacts.elastic.co/packages/7.x/yum\ngpgcheck=1\ngpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch\nenabled=1\nautorefresh=1\ntype=rpm-md' > /etc/yum.repos.d/elastic.repo
    elif [ $sys_type == "zypper" ]
    then
        rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch > /dev/null 2>&1
		cat > /etc/zypp/repos.d/elastic.repo <<- EOF
        [elasticsearch-7.x]
        name=Elasticsearch repository for 7.x packages
        baseurl=https://artifacts.elastic.co/packages/7.x/yum
        gpgcheck=1
        gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
        enabled=1
        autorefresh=1
        type=rpm-md
		EOF

    elif [ $sys_type == "apt-get" ]
    then
        eval "curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch --max-time 300 | apt-key add - $debug"
        echo 'deb https://artifacts.elastic.co/packages/7.x/apt stable main' | eval "tee /etc/apt/sources.list.d/elastic-7.x.list $debug"
        eval "apt-get update -q $debug"
    fi

    if [  "$?" != 0  ]
    then
        echo "Error: Elasticsearch repository could not be added"
        exit 1;
    else
        logger "Done"
    fi

}

## Elasticsearch
installElasticsearch() {

    if [[ -f /etc/elasticsearch/elasticsearch.yml ]]; then
        echo "Elasticsearch is already installed in this node."
        exit 1;
    fi

    logger "Installing Elasticsearch..."

    if [ $sys_type == "yum" ]
    then
        eval "yum install elasticsearch-7.9.2 -y -q $debug"
    elif [ $sys_type == "apt-get" ]
    then
        eval "apt-get install elasticsearch=7.9.2 -y -q $debug"
    elif [ $sys_type == "zypper" ]
    then
        eval "zypper -n install elasticsearch-7.9.2 $debug"
    fi

    if [  "$?" != 0  ]
    then
        echo "Error: Elasticsearch installation failed"
        exit 1;
    else
        logger "Done"

        logger "Configuring Elasticsearch..."
        eval "curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/elastic-stack/unattended-installation/distributed/templates/elasticsearch_unattended.yml --max-time 300 $debug"

        if [ -n "$single" ]
        then
            nh=$(awk -v RS='' '/network.host:/' ~/config.yml)
            nhr="network.host: "
            ip="${nh//$nhr}"
            echo "node.name: ${iname}" >> /etc/elasticsearch/elasticsearch.yml
            echo "${nn}" >> /etc/elasticsearch/elasticsearch.yml
            echo "${nh}" >> /etc/elasticsearch/elasticsearch.yml
            echo "cluster.initial_master_nodes: $iname" >> /etc/elasticsearch/elasticsearch.yml
        else
            echo "node.name: ${iname}" >> /etc/elasticsearch/elasticsearch.yml
            mn=$(awk -v RS='' '/cluster.initial_master_nodes:/' ~/config.yml)
            sh=$(awk -v RS='' '/discovery.seed_hosts:/' ~/config.yml)
            cn=$(awk -v RS='' '/cluster.name:/' ~/config.yml)
            echo "${cn}" >> /etc/elasticsearch/elasticsearch.yml
            mnr="cluster.initial_master_nodes:"
            rm="- "
            mn="${mn//$mnr}"
            mn="${mn//$rm}"

            shr="discovery.seed_hosts:"
            sh="${sh//$shr}"
            sh="${sh//$rm}"
            echo "cluster.initial_master_nodes:" >> /etc/elasticsearch/elasticsearch.yml
            for line in $mn; do
                    IMN+=(${line})
                    echo '        - "'${line}'"' >> /etc/elasticsearch/elasticsearch.yml
            done

            echo "discovery.seed_hosts:" >> /etc/elasticsearch/elasticsearch.yml
            for line in $sh; do
                    DSH+=(${line})
                    echo '        - "'${line}'"' >> /etc/elasticsearch/elasticsearch.yml
            done
            for i in "${!IMN[@]}"; do
            if [[ "${IMN[$i]}" = "${iname}" ]]; then
                pos="${i}";
            fi
            done
            if [[ ! " ${IMN[@]} " =~ " ${iname} " ]]; then
                echo "The name given does not appear on the configuration file"
                exit 1;
            fi
            nip="${DSH[pos]}"
            echo "network.host: ${nip}" >> /etc/elasticsearch/elasticsearch.yml

        fi

        # Configure JVM options for Elasticsearch
        ram_gb=$(free -g | awk '/^Mem:/{print $2}')
        ram=$(( ${ram_gb} / 2 ))

        if [ ${ram} -eq "0" ]; then
            ram=1;
        fi
        eval "sed -i "s/-Xms1g/-Xms${ram}g/" /etc/elasticsearch/jvm.options $debug"
        eval "sed -i "s/-Xmx1g/-Xmx${ram}g/" /etc/elasticsearch/jvm.options $debug"

        # Create certificates
        if [ -n "$single" ]
        then
            createCertificates name ip
        elif [ -n "$c" ]
        then
            createCertificates IMN DSH pos
        else
            logger "Done"
        fi

        if [ -n "$single" ]
        then
            copyCertificates name
        else
            copyCertificates iname
        fi
        initializeElastic
        echo "Done"
    fi

}

createCertificates() {

    if [ -n "$single" ]
    then
        echo "instances:" >> /usr/share/elasticsearch/instances.yml
        echo '- name: "'${iname}'"' >> /usr/share/elasticsearch/instances.yml
        echo '  ip:' >> /usr/share/elasticsearch/instances.yml
        echo '  - "'${ip}'"' >> /usr/share/elasticsearch/instances.yml
    else
        echo "instances:" >> /usr/share/elasticsearch/instances.yml
        for i in "${!IMN[@]}"; do
            echo '- name: "'${IMN[i]}'"' >> /usr/share/elasticsearch/instances.yml
            echo "  ip:" >> /usr/share/elasticsearch/instances.yml
            echo '  - "'${DSH[i]}'"' >> /usr/share/elasticsearch/instances.yml
        done
    fi
    awk -v RS='' '/- name: /' ~/config.yml >> /usr/share/elasticsearch/instances.yml
    eval "/usr/share/elasticsearch/bin/elasticsearch-certutil cert ca --pem --in instances.yml --keep-ca-key --out ~/certs.zip $debug"
    if [  "$?" != 0  ]
    then
        echo "Error: certificates were not created"
        exit 1;
    else
        logger "Certificates created"
    fi

}

copyCertificates() {

    if [ -n "$single" ]
    then
        eval "unzip ~/certs.zip -d ~/certs $debug"
        eval "mkdir /etc/elasticsearch/certs/ca -p $debug"
        eval "cp -R ~/certs/ca/ ~/certs/${iname}/* /etc/elasticsearch/certs/ $debug"
        eval "mv ~/certs/${iname}/${iname}.crt /etc/elasticsearch/certs/elasticsearch.crt $debug"
        eval "mv ~/certs/${iname}/${iname}.key /etc/elasticsearch/certs/elasticsearch.key $debug"
        eval "chown -R elasticsearch: /etc/elasticsearch/certs $debug"
        eval "chmod -R 500 /etc/elasticsearch/certs $debug"
        eval "chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.* $debug"
        eval "zip -u ~/certs.zip config.yml $debug"
        eval "cp ~/config.yml ~/certs/ $debug"
    else
        eval "unzip ~/certs.zip -d ~/certs $debug"
        eval "mkdir /etc/elasticsearch/certs/ca -p $debug"
        eval "cp -R ~/certs/ca/ ~/certs/${IMN[pos]}/* /etc/elasticsearch/certs/ $debug"
        eval "mv ~/certs/${IMN[pos]}/${IMN[pos]}.crt /etc/elasticsearch/certs/elasticsearch.crt $debug"
        eval "mv ~/certs/${IMN[pos]}/${IMN[pos]}.key /etc/elasticsearch/certs/elasticsearch.key $debug"
        eval "chown -R elasticsearch: /etc/elasticsearch/certs $debug"
        eval "chmod -R 500 /etc/elasticsearch/certs $debug"
        eval "chmod 400 /etc/elasticsearch/certs/ca/ca.* /etc/elasticsearch/certs/elasticsearch.* $debug"
        if [[ -n "$master" ]] && [[ -n "$c" ]]
        then
            eval "zip -u ~/certs.zip config.yml $debug"
            eval "cp ~/config.yml ~/certs/ $debug"
        fi
    fi

}

initializeElastic() {

    logger "Elasticsearch installed."

    # Start Elasticsearch
    startService "elasticsearch"
    if [ -n "$single" ]
    then
        echo "Initializing Elasticsearch...(this may take a while)"
        until grep '\Security is enabled' /var/log/elasticsearch/elasticsearch.log > /dev/null
        do
            echo -ne $char
            sleep 10
        done
        echo $'\nGenerating passwords...'
        passwords=$(/usr/share/elasticsearch/bin/elasticsearch-setup-passwords auto -b)
        password=$(echo $passwords | awk 'NF{print $NF; exit}')
        elk=$(awk -F'network.host: ' '{print $2}' ~/config.yml | xargs)
        until $(curl -XGET https://${elk}:9200/ -elastic:"$password" -k --max-time 120 --silent --output /dev/null); do
            echo -ne $char
            sleep 10
        done

        logger "Done"
        echo $'\nDuring the installation of Elasticsearch the passwords for its user were generated. Please take note of them:'
        echo "$passwords"
    fi
    echo $'\nElasticsearch installation finished'
    disableRepos
    exit 0;

}

## Kibana
installKibana() {

    if [[ -f /etc/kibana/kibana.yml ]]; then
        echo "Kibana is already installed in this node."
        exit 1;
    fi

    logger "Installing Kibana..."
    if [ $sys_type == "yum" ]
    then
        eval "yum install kibana-7.9.2 -y -q  $debug"
    elif [ $sys_type == "zypper" ]
    then
        eval "zypper -n install kibana-7.9.2 $debug"
    elif [ $sys_type == "apt-get" ]
        then
        eval "apt-get install kibana=7.9.2 -y -q  $debug"
    fi
    if [  "$?" != 0  ]
    then
        echo "Error: Kibana installation failed"
        exit 1;
    else
        disableRepos
        eval "curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.0/resources/elastic-stack/unattended-installation/distributed/templates/kibana_unattended.yml --max-time 300 $debug"
        eval "cd /usr/share/kibana $debug"
        eval "chown -R kibana:kibana /usr/share/kibana/optimize $debug"
        eval "chown -R kibana:kibana /usr/share/kibana/plugins $debug"        
        eval "sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-4.0.1_7.9.2-1.zip $debug"
        if [  "$?" != 0  ]
        then
            echo "Error: Wazuh Kibana plugin could not be installed."
            exit 1;
        fi
        eval "setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node $debug"
        conf="$(awk '{sub("<elasticsearch_password>", "'"${epassword}"'")}1' /etc/kibana/kibana.yml)"
        echo "$conf" > /etc/kibana/kibana.yml
        eval "mkdir /etc/kibana/certs/ca -p"
        instance=$(awk -v RS='' '/- name:/' ~/config.yml)
        kip=$(grep -A 2 ${iname} ~/config.yml | tail -1)
        rm1="- "
        rm2='"'
        kip="${kip//$rm1}"
        kip="${kip//$rm2}"
        echo "server.host:"$kip"" >> /etc/kibana/kibana.yml
        nh=$(awk -v RS='' '/network.host:/' ~/config.yml)

        if [ -n "$nh" ]
        then
            nhr="network.host: "
            eip="${nh//$nhr}"
            echo "elasticsearch.hosts: https://"$eip":9200" >> /etc/kibana/kibana.yml
        else
            echo "elasticsearch.hosts:" >> /etc/kibana/kibana.yml
            sh=$(awk -v RS='' '/discovery.seed_hosts:/' ~/config.yml)
            shr="discovery.seed_hosts:"
            rm="- "
            sh="${sh//$shr}"
            sh="${sh//$rm}"
            for line in $sh; do
                    echo "  - https://${line}:9200" >> /etc/kibana/kibana.yml
            done
        fi
        logger "Kibana installed."

        initializeKibana iname kip epassword
        echo -e

        logger "Done"
    fi

}

initializeKibana() {

    eval "zip -d ~/certs.zip ca/ca.key $debug"
    eval "unzip -o ~/certs.zip -d ~/certs $debug"
    eval "cp -R ~/certs/ca/ ~/certs/${iname}/* /etc/kibana/certs/ $debug"
    if [ ${iname} != "kibana" ]
    then
        eval "mv /etc/kibana/certs/${iname}.crt /etc/kibana/certs/kibana.crt $debug"
        eval "mv /etc/kibana/certs/${iname}.key /etc/kibana/certs/kibana.key $debug"
    fi
    eval "chown -R kibana:kibana /etc/kibana/ $debug"
    eval "chmod -R 500 /etc/kibana/certs $debug"
    eval "chmod 400 /etc/kibana/certs/ca/ca.* /etc/kibana/certs/kibana.* $debug"
    # Start Kibana
    startService "kibana"
    logger "Initializing Kibana (this may take a while)"
    rms=" "
    kip="${kip//$rms}"
    until [[ "$(curl -XGET https://${kip}/status -I -uelastic:"$epassword" -k -s | grep "200 OK")" ]]; do
        echo -ne $char
        sleep 10
    done
    sleep 10
    wip=$(grep -A 2 ${iname} ~/config.yml | tail -1)
    rw1="- "
    rw2='"'
    wip="${wip//$rw1}"
    wip="${wip//$rw2}"

    conf="$(awk '{sub("url: https://localhost", "url: https://'"${wip}"'")}1' /usr/share/kibana/optimize/wazuh/config/wazuh.yml)"
    echo "$conf" > /usr/share/kibana/optimize/wazuh/config/wazuh.yml  
    echo $'\nYou can access the web interface https://'${kip}'. The credentials are elastic:'$epassword''    
  
}

## Check nodes
checkNodes() {

    head=$(head -n1 ~/config.yml)
    if [ "${head}" == "## Multi-node configuration" ]
    then
        master=1
    else
        single=1
    fi

}

## Health check
healthCheck() {

    cores=$(cat /proc/cpuinfo | grep processor | wc -l)
    ram_gb=$(free -m | awk '/^Mem:/{print $2}')
    if [ -n "$e" ]
    then
        if [ ${cores} -lt 2 ] || [ ${ram_gb} -lt 3700 ]
        then
            echo "Your system does not meet the recommended minimum hardware requirements of 4Gb of RAM and 2 CPU cores . If you want to proceed with the installation use the -i option to ignore these requirements."
            exit 1;
        else
            echo "Starting the installation..."
        fi
    elif [ -n "$k" ]
    then
        if [ ${cores} -lt 2 ] || [ ${ram_gb} -lt 3700 ]
        then
            echo "Your system does not meet the recommended minimum hardware requirements of 4Gb of RAM and 2 CPU cores . If you want to proceed with the installation use the -i option to ignore these requirements."
            exit 1;
        else
            echo "Starting the installation..."
        fi
    fi

}

## Disable repositories
disableRepos() {
    if [ $sys_type == "yum" ]
    then
        sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/elastic.repo
    elif [ $sys_type == "zypper" ]
    then
        sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/elastic.repo
    elif [ $sys_type == "apt-get" ]
    then
        sed -i 's/^deb/#deb/' /etc/apt/sources.list.d/elastic-7.x.list
        eval "apt-get update -q $debug"
    fi
}

## Main

main() {

    if [ -n "$1" ]
    then
        while [ -n "$1" ]
        do
            case "$1" in
            "-e"|"--install-elasticsearch")
                e=1
                shift 1
                ;;
            "-c"|"--create-certificates")
                c=1
                shift 1
                ;;
            "-n"|"--node-name")
                iname=$2
                shift
                shift
                ;;
            "-k"|"--install-kibana")
                k=1
                shift 1
                ;;
            "-p"|"--elastic-password")
                epassword=$2
                shift
                shift
                ;;
            "-i"|"--ignore-healthcheck")
                i=1
                shift 1
                ;;
            "-d"|"--debug")
                d=1
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

        if [ -n "$d" ]
        then
            debug=""
        fi

        if [[ -z "$iname" ]]
        then
            getHelp
        fi

        if [ -n "$e" ]
        then
            if [[ -n "$e" ]] && [[ -n "$k" ]]
            then
                getHelp
            fi

            if [ -n "$i" ]
            then
                echo "Health-check ignored."
            else
                healthCheck e k
            fi
            installPrerequisites
            addElasticrepo
            checkNodes
            checkConfig iname
            installElasticsearch iname
        fi
        if [ -n "$k" ]
        then
            if [ -z "$epassword" ]
            then
                getHelp
            fi
            if [[ -n "$e" ]] && [[ -n "$k" ]]
            then
                getHelp
            fi

            if [ -n "$i" ]
            then
                echo "Health-check ignored."
            else
                healthCheck e k
            fi
            installPrerequisites
            addElasticrepo
            installKibana iname
        fi
    else
        getHelp
    fi

}

main "$@"
