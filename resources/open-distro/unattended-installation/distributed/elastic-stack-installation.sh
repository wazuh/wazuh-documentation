#!/bin/bash
## Check if system is based on yum or apt-get
char="#"
debug='> /dev/null 2>&1'
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
   echo -e "\t-kip   | --kibana-ip indicates the IP of Kibana. It can be set to 0.0.0.0 which will bind all the availables IPs"
   echo -e "\t-eip   | --elasticsearch-ip Indicates the IP of Elasticsearch. It can be set to 0.0.0.0 which will bind all the availables IPs"
   echo -e "\t-c     | --create-certificates Generates the certificates for all the indicated nodes"
   echo -e "\t-k     | --install-kibana Install Kibana"
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
            if [ -f ~/certs.tar ]
            then
                echo "Certificates file found. Starting the installation..."
                eval "tar -xf certs.tar config.yml $debug"
            else
                echo "No configuration file found."
                exit 1;
            fi
        fi
    
    elif [ -n "$k" ]
    then
        if [ -f /etc/elasticsearch/certs/certs.tar ]
        then
            eval "mv /etc/elasticsearch/certs/certs.tar ~/"
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
        eval "yum install curl unzip wget libcap -y -q $debug"
        eval "yum install java-11-openjdk-devel -y -q $debug"
        if [ "$?" != 0 ]
        then
            os=$(cat /etc/os-release > /dev/null 2>&1 | awk -F"ID=" '/ID=/{print $2; exit}' | tr -d \")
            if [ -z "$os" ]
            then
                os="centos"
            fi
            echo -e '[AdoptOpenJDK] \nname=AdoptOpenJDK \nbaseurl=http://adoptopenjdk.jfrog.io/adoptopenjdk/rpm/system-ver/$releasever/$basearch\nenabled=1\ngpgcheck=1\ngpgkey=https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public' | eval "tee /etc/yum.repos.d/adoptopenjdk.repo $debug"
            conf="$(awk '{sub("system-ver", "'"${os}"'")}1' /etc/yum.repos.d/adoptopenjdk.repo)"
            echo "$conf" > /etc/yum.repos.d/adoptopenjdk.repo 
            eval "yum install adoptopenjdk-11-hotspot -y -q $debug"
        fi
        export JAVA_HOME=/usr/
    elif [ $sys_type == "zypper" ] 
    then
        eval "zypper -n install curl unzip wget $debug" 
        eval "zypper -n install libcap-progs $debug || zypper -n install libcap2 $debug"
        eval "zypper -n install java-11-openjdk-devel $debug"
        if [ "$?" != 0 ]
        then
            eval "zypper ar -f http://adoptopenjdk.jfrog.io/adoptopenjdk/rpm/opensuse/15.0/$(uname -m) adoptopenjdk $debug" | echo 'a'
            eval "zypper -n install adoptopenjdk-11-hotspot $debug "

        fi    
        export JAVA_HOME=/usr/    
    elif [ $sys_type == "apt-get" ] 
    then
        eval "apt-get install apt-transport-https curl unzip wget libcap2-bin -y -q $debug"

        if [ -n "$(command -v add-apt-repository)" ]
        then
            eval "add-apt-repository ppa:openjdk-r/ppa -y $debug"
        else
            echo 'deb http://deb.debian.org/debian stretch-backports main' > /etc/apt/sources.list.d/backports.list
        fi
        eval "apt-get update -q $debug"
        eval "apt-get install openjdk-11-jdk -y -q $debug" 
        if [  "$?" != 0  ]
        then
            logger "JDK installation falied."
            exit 1;
        fi
        export JAVA_HOME=/usr/
        
    fi

    if [  "$?" != 0  ]
    then
        echo "Error: Prerequisites could not be installed"
        exit 1;
    else
        logger "Done"
    fi  

}

## Add the Wazuh repository
addWazuhrepo() {
    logger "Adding the Wazuh repository..."

    if [ $sys_type == "yum" ] 
    then
        eval "rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH $debug"
        eval "echo -e '[wazuh_staging]\ngpgcheck=1\ngpgkey=https://packages-dev.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-dev.wazuh.com/staging/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh_pre.repo $debug"
    elif [ $sys_type == "zypper" ] 
    then
        eval "rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH $debug"
        eval "echo -e '[wazuh_staging]\ngpgcheck=1\ngpgkey=https://packages-dev.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-dev.wazuh.com/staging/yum/\nprotect=1' | tee /etc/zypp/repos.d/wazuh_pre.repo $debug"            
    elif [ $sys_type == "apt-get" ] 
    then
        eval "curl -s https://packages-dev.wazuh.com/key/GPG-KEY-WAZUH --max-time 300 | apt-key add - $debug"
        eval "echo "deb https://packages-dev.wazuh.com/staging/apt/ unstable main" | tee -a /etc/apt/sources.list.d/wazuh_staging.list $debug"
        eval "apt-get update -q $debug"
    fi    

    logger "Done" 
}
## Elasticsearch
installElasticsearch() {

    logger "Installing Open Distro for Elasticsearch..."

    if [ $sys_type == "yum" ] 
    then
        eval "yum install opendistroforelasticsearch -y -q $debug"
    elif [ $sys_type == "zypper" ] 
    then
        eval "zypper -n install opendistroforelasticsearch $debug"
    elif [ $sys_type == "apt-get" ] 
    then
        eval "apt-get install elasticsearch-oss opendistroforelasticsearch -y -q $debug"
    fi

    if [  "$?" != 0  ]
    then
        echo "Error: Elasticsearch installation failed"
        exit 1;
    else
        logger "Done"

        logger "Configuring Elasticsearch..."

        eval "curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/unattended-installation/distributed/templates/elasticsearch_unattended.yml --max-time 300 $debug"
        
        if [ -n "$single" ]
        then
            nh=$(awk -v RS='' '/network.host:/' ~/config.yml)
            nhr="network.host: "
            nip="${nh//$nhr}"
            echo "node.name: ${iname}" >> /etc/elasticsearch/elasticsearch.yml    
            echo "${nn}" >> /etc/elasticsearch/elasticsearch.yml    
            echo "${nh}" >> /etc/elasticsearch/elasticsearch.yml    
            echo "cluster.initial_master_nodes: $iname" >> /etc/elasticsearch/elasticsearch.yml    

            echo "opendistro_security.nodes_dn:" >> /etc/elasticsearch/elasticsearch.yml        
            echo '        - CN='$name',OU=Docu,O=Wazuh,L=California,C=US' >> /etc/elasticsearch/elasticsearch.yml             
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

            echo "opendistro_security.nodes_dn:" >> /etc/elasticsearch/elasticsearch.yml        
            for i in "${!IMN[@]}"; do
                    echo '        - CN='${IMN[i]}',OU=Docu,O=Wazuh,L=California,C=US' >> /etc/elasticsearch/elasticsearch.yml    
            done

        fi        
        #awk -v RS='' '/## Elasticsearch/' ~/config.yml >> /etc/elasticsearch/elasticsearch.yml

        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/elasticsearch/roles/roles.yml --max-time 300 $debug"
        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/roles_mapping.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/elasticsearch/roles/roles_mapping.yml --max-time 300 $debug"
        eval "curl -so /usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/elasticsearch/roles/internal_users.yml --max-time 300 $debug"
        eval "rm /etc/elasticsearch/esnode-key.pem /etc/elasticsearch/esnode.pem /etc/elasticsearch/kirk-key.pem /etc/elasticsearch/kirk.pem /etc/elasticsearch/root-ca.pem -f $debug"
        eval "mkdir /etc/elasticsearch/certs $debug"
        eval "cd /etc/elasticsearch/certs $debug"

        
        # Configure JVM options for Elasticsearch
        ram_gb=$(free -g | awk '/^Mem:/{print $2}')
        ram=$(( ${ram_gb} / 2 ))

        if [ ${ram} -eq "0" ]; then
            ram=1;
        fi    
        eval "sed -i "s/-Xms1g/-Xms${ram}g/" /etc/elasticsearch/jvm.options $debug"
        eval "sed -i "s/-Xmx1g/-Xmx${ram}g/" /etc/elasticsearch/jvm.options $debug"

        jv=$(java -version 2>&1 | grep -o -m1 '1.8.0' )
        if [ "$jv" == "1.8.0" ]
        then
            ln -s /usr/lib/jvm/java-1.8.0/lib/tools.jar /usr/share/elasticsearch/lib/
            echo "root hard nproc 4096" >> /etc/security/limits.conf 
            echo "root soft nproc 4096" >> /etc/security/limits.conf 
            echo "elasticsearch hard nproc 4096" >> /etc/security/limits.conf 
            echo "elasticsearch soft nproc 4096" >> /etc/security/limits.conf 
            echo "bootstrap.system_call_filter: false" >> /etc/elasticsearch/elasticsearch.yml
        fi        

        # Create certificates
        if [ -n "$single" ]
        then
            createCertificates name ip
        elif [ -n "$c" ]
        then
            createCertificates IMN DSH
        else
            logger "Done"
        fi      
        
        if [ -n "$single" ]
        then
            copyCertificates iname
        else
            copyCertificates iname pos
        fi
        initializeElastic nip
        echo "Done"
    fi
}

createCertificates() {
  

    logger "Creating the certificates..."
    eval "curl -so /etc/elasticsearch/certs/search-guard-tlstool-1.8.zip https://maven.search-guard.com/search-guard-tlstool/1.8/search-guard-tlstool-1.8.zip --max-time 300 $debug"
    eval "unzip search-guard-tlstool-1.8.zip -d searchguard $debug"
    eval "curl -so /etc/elasticsearch/certs/searchguard/search-guard.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/unattended-installation/distributed/templates/search-guard-unattended.yml --max-time 300 $debug"

    if [ -n "$single" ]
    then
        echo -e "\n" >> /etc/elasticsearch/certs/searchguard/search-guard.yml
        echo "nodes:" >> /etc/elasticsearch/certs/searchguard/search-guard.yml
        echo '  - name: "'${iname}'"' >> /etc/elasticsearch/certs/searchguard/search-guard.yml
        echo '    dn: CN="'${iname}'",OU=Docu,O=Wazuh,L=California,C=US' >> /etc/elasticsearch/certs/searchguard/search-guard.yml
        echo '    ip:' >> /etc/elasticsearch/certs/searchguard/search-guard.yml
        echo '      - "'${nip}'"' >> /etc/elasticsearch/certs/searchguard/search-guard.yml
    else 
        echo -e "\n" >> /etc/elasticsearch/certs/searchguard/search-guard.yml
        echo "nodes:" >> /etc/elasticsearch/certs/searchguard/search-guard.yml       
        for i in "${!IMN[@]}"; do
            echo '  - name: "'${IMN[i]}'"' >> /etc/elasticsearch/certs/searchguard/search-guard.yml
            echo '    dn: CN="'${IMN[i]}'",OU=Docu,O=Wazuh,L=California,C=US' >> /etc/elasticsearch/certs/searchguard/search-guard.yml
            echo '    ip:' >> /etc/elasticsearch/certs/searchguard/search-guard.yml
            echo '      - "'${DSH[i]}'"' >> /etc/elasticsearch/certs/searchguard/search-guard.yml
        done
    fi
    awk -v RS='' '/# Clients certificates/' ~/config.yml >> /etc/elasticsearch/certs/searchguard/search-guard.yml
    eval "chmod +x searchguard/tools/sgtlstool.sh $debug"
    eval "./searchguard/tools/sgtlstool.sh -c ./searchguard/search-guard.yml -ca -crt -t /etc/elasticsearch/certs/ $debug"
    if [  "$?" != 0  ]
    then
        echo "Error: certificates were not created"
        exit 1;
    else
        logger "Certificates created"
    fi    
    #awk -v RS='' '/## Certificates/' ~/config.yml >> /etc/elasticsearch/certs/searchguard/search-guard.yml
}

copyCertificates() {

    if [ -n "$single" ]
    then
        eval "mv /etc/elasticsearch/certs/${iname}.pem /etc/elasticsearch/certs/elasticsearch.pem $debug"
        eval "mv /etc/elasticsearch/certs/${iname}.key /etc/elasticsearch/certs/elasticsearch.key $debug"
        eval "mv /etc/elasticsearch/certs/${iname}_http.pem /etc/elasticsearch/certs/elasticsearch_http.pem $debug"
        eval "mv /etc/elasticsearch/certs/${iname}_http.key /etc/elasticsearch/certs/elasticsearch_http.key $debug"            
        eval "rm /etc/elasticsearch/certs/client-certificates.readme /etc/elasticsearch/certs/elasticsearch_elasticsearch_config_snippet.yml search-guard-tlstool-1.8.zip -f $debug"
    else
        if [ -z "$c" ]
        then
            eval "mv ~/certs.tar /etc/elasticsearch/certs $debug"
            eval "tar -xf certs.tar ${IMN[pos]}.pem ${IMN[pos]}.key ${IMN[pos]}_http.pem ${IMN[pos]}_http.key root-ca.pem $debug"  
        fi
        eval "mv /etc/elasticsearch/certs/${IMN[pos]}.pem /etc/elasticsearch/certs/elasticsearch.pem $debug"
        eval "mv /etc/elasticsearch/certs/${IMN[pos]}.key /etc/elasticsearch/certs/elasticsearch.key $debug"
        eval "mv /etc/elasticsearch/certs/${IMN[pos]}_http.pem /etc/elasticsearch/certs/elasticsearch_http.pem $debug"
        eval "mv /etc/elasticsearch/certs/${IMN[pos]}_http.key /etc/elasticsearch/certs/elasticsearch_http.key $debug"            
        eval "rm /etc/elasticsearch/certs/client-certificates.readme /etc/elasticsearch/certs/elasticsearch_elasticsearch_config_snippet.yml search-guard-tlstool-1.8.zip -f $debug"        
    fi

    if [[ -n "$c" ]] || [[ -n "$single" ]]
    then
        cp ~/config.yml /etc/elasticsearch/certs/
        tar -cf certs.tar *
        tar --delete -f certs.tar 'searchguard'
    fi

}

initializeElastic() {

    logger "Elasticsearch installed."  

    # Start Elasticsearch
    logger "Starting Elasticsearch..."
    startService "elasticsearch"
    logger "Initializing Elasticsearch..."

    
    until $(curl -XGET https://${nip}:9200/ -uadmin:admin -k --max-time 120 --silent --output /dev/null); do
        echo -ne $char
        sleep 10
    done    

    if [ -n "$single" ]
    then
        eval "cd /usr/share/elasticsearch/plugins/opendistro_security/tools/ $debug"
        eval "./securityadmin.sh -cd ../securityconfig/ -nhnv -cacert /etc/elasticsearch/certs/root-ca.pem -cert /etc/elasticsearch/certs/admin.pem -key /etc/elasticsearch/certs/admin.key -h ${nip} $debug"
    fi

    logger "Done"
    exit 0;
}

## Kibana
installKibana() {
     
    logger "Installing Kibana..."
    if [ $sys_type == "zypper" ] 
    then
        eval "zypper -n install opendistroforelasticsearch-kibana $debug"
    else
        eval "$sys_type install opendistroforelasticsearch-kibana -y -q $debug"
    fi
    if [  "$?" != 0  ]
    then
        echo "Error: Kibana installation failed"
        exit 1;
    else  
        eval "curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/2205-Open_Distro_installation/resources/open-distro/unattended-installation/distributed/templates/kibana_unattended.yml --max-time 300 $debug"
        eval "cd /usr/share/kibana $debug"
        eval "sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages-dev.wazuh.com/staging/ui/kibana/wazuhapp-4.0.0_7.8.0_0.0.0.todelete.zip $debug"
        eval "setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node $debug"
        if [  "$?" != 0  ]
        then
            echo "Error: Wazuh Kibana plugin could not be installed."
            exit 1;
        fi     
        eval "mkdir /etc/kibana/certs $debug"
        
        kip=$(grep -A 1 "Kibana-instance" ~/config.yml | tail -1)
        rm="- "
        kip="${kip//$rm}"
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
                    echo "  - ${line}:9200" >> /etc/kibana/kibana.yml
            done        
        fi        


        eval "mv ~/certs.tar /etc/kibana/certs/ $debug"
        eval "cd /etc/kibana/certs/ $debug"
        eval "tar -xf certs.tar kibana.pem kibana.key root-ca.pem $debug"

        echo "server.host: "$kip"" >> /etc/kibana/kibana.yml
        echo "elasticsearch.hosts: https://"$eip":9200" >> /etc/kibana/kibana.yml
        
        logger "Kibana installed."
        
        copyKibanacerts iname
        initializeKibana
        echo -e
    fi

}

copyKibanacerts() {

    if [[ -f "/etc/elasticsearch/certs/kibana.pem" ]] && [[ -f "/etc/elasticsearch/certs/kibana.key" ]]
    then
        eval "mv /etc/elasticsearch/certs/kibana* /etc/kibana/certs/ $debug"
    elif [ -f "~/certs.tar" ]
    then
        eval "mv ~/certs.tar /etc/kibana/certs/ $debug"
        eval "cd /etc/kibana/certs/ $debug"
        eval "tar -xf certs.tar ${iname}.pem ${iname}.key root-ca.pem $debug"
        if [ ${iname} != "kibana" ]
        then
            eval "mv /etc/kibana/certs/${iname}.pem /etc/kibana/certs/kibana.pem $debug"
            eval "mv /etc/kibana/certs/${iname}.key /etc/kibana/certs/kibana.key $debug"
        fi            
    else
        echo "No certificates found. Could not initialize Kibana"
        exit 1;
    fi

}

initializeKibana() {

    # Start Kibana
    startService "kibana"   
    logger "Initializing Kibana (this may take a while)" 
    until [[ "$(curl -XGET https://${eip}/status -I -uadmin:admin -k -s --max-time 300 | grep "200 OK")" ]]; do
        echo -ne $char
        sleep 10
    done     
    wip=$(grep -A 1 "Wazuh-master-configuration" ~/config.yml | tail -1)
    rm="- "
    wip="${wip//$rm}"    
    conf="$(awk '{sub("url: https://localhost", "url: https://'"${wip}"'")}1' /usr/share/kibana/optimize/wazuh/config/wazuh.yml)"
    echo "$conf" > /usr/share/kibana/optimize/wazuh/config/wazuh.yml  

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
        if [[ $cores < "4" ]] || [[ $ram_gb < "15700" ]]
        then
            echo "Your system does not meet the recommended minimum hardware requirements of 16Gb of RAM and 4 CPU cores. If you want to proceed with the installation use the -i option to ignore these requirements."
            exit 1;
        else
            echo "Starting the installation..."
        fi
    elif [ -n "$k" ]
    then
        if [[ $cores < "2" ]] || [[ $ram_gb < "3700" ]]
        then
            echo "Your system does not meet the recommended minimum hardware requirements of 4Gb of RAM and 2 CPU cores. If you want to proceed with the installation use the -i option to ignore these requirements."
            exit 1;
        else
            echo "Starting the installation..."
        fi   
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
                exit 1
            esac
        done    

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

            if [ -n "$i" ]
            then
                echo "Health-check ignored."    
            else
                healthCheck e k         
            fi     
            checkConfig      
            installPrerequisites
            addWazuhrepo   
            checkNodes                   
            installElasticsearch iname
        fi
        if [ -n "$k" ]
        then
            if [[ -z "$e" ]] && [[ -z "$k" ]]   
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
            addWazuhrepo             
            installKibana iname
        fi
    else
        getHelp
    fi
}

main "$@"
