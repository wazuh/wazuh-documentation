#!/bin/bash

# Program to generate the certificates necessary for Wazuh installation
# Copyright (C) 2015-2020, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

debug='> /dev/null 2>&1'

readInstances() {

    if [ -f ~/instances.yml ]; then
        echo "Configuration file found. Creating certificates..."
        eval "mkdir ~/certs $debug"
    else
        echo "Error: no configuration file found."
        exit 1;
    fi

}

deploymentType() {
    head=$(head -n1 ~/instances.yml)
    if [ "${head}" == "# Elasticsearch nodes" ]; then
        multi=1
    else
        single=1
    fi    
}

generateCertificateconfiguration() {

    cat > ~/certs/${cname}.conf <<- EOF
        [ req ]
        prompt = no
        default_bits = 2048
        default_md = sha256
        distinguished_name = req_distinguished_name
        x509_extensions = v3_req
        
        [req_distinguished_name]
        C = US
        L = California
        O = Wazuh
        OU = Docu
        CN = cname
        
        [ v3_req ]
        authorityKeyIdentifier=keyid,issuer
        basicConstraints = CA:FALSE
        keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
        subjectAltName = @alt_names
        
        [alt_names]
        IP.1 = cip
	EOF

    conf="$(awk '{sub("CN = cname", "CN = '${cname}'")}1' ~/certs/$cname.conf)"
    echo "${conf}" > ~/certs/$cname.conf
    conf="$(awk '{sub("IP.1 = cip", "IP.1 = '${cip}'")}1' ~/certs/$cname.conf)"
    echo "${conf}" > ~/certs/$cname.conf       

}

generateRootCAcertificate() {

    eval "openssl req -x509 -new -nodes -newkey rsa:2048 -keyout ~/certs/root-ca.key -out ~/certs/root-ca.pem -batch -subj '/OU=Docu/O=Wazuh/L=California/' -days 3650 ${debug}"

}

generateAdmincertificate() {
    
    eval "openssl genrsa -out ~/certs/admin-key-temp.pem 2048 ${debug}"
    eval "openssl pkcs8 -inform PEM -outform PEM -in ~/certs/admin-key-temp.pem -topk8 -nocrypt -v1 PBE-SHA1-3DES -out ~/certs/admin-key.pem ${debug}"
    eval "openssl req -new -key ~/certs/admin-key.pem -out ~/certs/admin.csr -batch -subj '/C=US/L=California/O=Wazuh/OU=Docu/CN=admin' ${debug}"
    eval "openssl x509 -req -in ~/certs/admin.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -sha256 -out ~/certs/admin.pem ${debug}"

}

generateElasticsearchcertificates() {

    if [ -n "${single}" ]; then
        echo "Creating Elasticsearch certificate..."
    else
        echo "Creating Elasticsearch certificates..."
    fi

    if [ -n "${single}" ]; then
        enl=$(awk -v RS='' '/elasticsearch-node:/' ~/instances.yml) 
        rt="# Elasticsearch node"
        rnt="elasticsearch-node:"
        rnanme="- name: "
        rip="    ip:"
        r="      - "
        ens="${enl//$rt}"
        node="${ens//$rnt}"
        node="${node//$rnanme}"
        node="${node//$rip}"
        node="${node//$r}"
        cip="${node##*$'\n'}"
        cname="${node//$cip}"
        cname=$(echo ${cname} | xargs)
        cip=$(echo ${cip} | xargs)

        generateCertificateconfiguration cname cip
        eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
        eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"
        eval "chmod 444 ~/certs/${cname}-key.pem ${debug}"
    else
        mn=$(awk -v RS='' '/elasticsearch-nodes:/' ~/instances.yml)
        rt="# Elasticsearch nodes"
        mnr="elasticsearch-nodes:"
        rm="- name: "
        rmip="ip:"
        rms="- "
        mn="${mn//$rt}"
        mn="${mn//$mnr}"
        mn="${mn//$rm}"
        mn="${mn//$rmip}"
        mn="${mn//$rms}"
        for line in $mn; do
                IMN+=(${line})
        done
        nodes=$((${#IMN[@]} / 2 ))


        i=0
        while [ ${i} -lt ${#IMN[@]} ]; do
            cname=${IMN[i]}
            cip=${IMN[i+1]}
            generateCertificateconfiguration cname cip
            eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
            eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"
            eval "chmod 444 ~/certs/${cname}-key.pem ${debug}"    
            i=$(( ${i} + 2 ))
        done
    fi

}

generateFilebeatcertificates() {

    if [ -n "${single}" ]; then
        echo "Creating Wazuh server certificate..."
    else
        echo "Creating Wazuh server certificates..."
    fi

    if [ -n "${single}" ]; then
        enl=$(awk -v RS='' '/wazuh-server:/' ~/instances.yml) 
        rt="# Wazuh server node"
        rnt="wazuh-server:"
        rnanme="- name: "
        rip="    ip:"
        r="      - "
        ens="${enl//$rt}"
        node="${ens//$rnt}"
        node="${node//$rnanme}"
        node="${node//$rip}"
        node="${node//$r}"
        cip="${node##*$'\n'}"
        cname="${node//$cip}"
        cname=$(echo ${cname} | xargs)
        cip=$(echo ${cip} | xargs)

        generateCertificateconfiguration cname cip
        eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
        eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"
    else
        mn=$(awk -v RS='' '/wazuh-servers:/' ~/instances.yml)
        rt="# Wazuh server nodes"
        mnr="wazuh-servers:"
        rm="- name: "
        rmip="ip:"
        rms="- "
        mn="${mn//$rt}"
        mn="${mn//$mnr}"
        mn="${mn//$rm}"
        mn="${mn//$rmip}"
        mn="${mn//$rms}"
        for line in $mn; do
                IMN+=(${line})
        done
        nodes=$((${#IMN[@]} / 2 ))
        i=0
        while [ ${i} -lt ${#IMN[@]} ]; do
            cname=${IMN[i]}
            cip=${IMN[i+1]}
            generateCertificateconfiguration cname cip
            eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
            eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"
            i=$(( ${i} + 2 ))
        done
    fi        

}

generateKibanacertificates() {

    echo "Creating Kibana certificate..."

    enl=$(awk -v RS='' '/kibana:/' ~/instances.yml) 
    rt="# Kibana node"
    rnt="kibana:"
    rnanme="- name: "
    rip="    ip:"
    r="      - "
    ens="${enl//$rt}"
    node="${ens//$rnt}"
    node="${node//$rnanme}"
    node="${node//$rip}"
    node="${node//$r}"
    cip="${node##*$'\n'}"
    cname="${node//$cip}"
    cname=$(echo ${cname} | xargs)
    cip=$(echo ${cip} | xargs)

    generateCertificateconfiguration cname cip
    eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
    eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"

}

cleanFiles() {

    eval "rm -rf ~/certs/*.csr ${debug}"
    eval "rm -rf ~/certs/*.srl ${debug}"
    eval "rm -rf ~/certs/*.conf ${debug}"
    eval "rm -rf ~/certs/admin-key-temp.pem ${debug}"
    echo "Certificates creation finished. They can be found in ~/certs."

}

main() {

    if [ "$EUID" -ne 0 ]; then
        echo "This script must be run as root."
        exit 1;
    fi    

    if [ -n "$1" ]; then      
        while [ -n "$1" ]
        do
            case "$1" in 
            "-a"|"--admin-certificates") 
                cadmin=1
                shift 1
                ;;     
            "-ca"|"--root-ca-certificate") 
                ca=1
                shift 1
                ;;                           
            "-e"|"--elasticsearch-certificates") 
                celastic=1
                shift 1
                ;; 
            "-w"|"--wazuh-certificates") 
                cwazuh=1
                shift 1
                ;;   
            "-k"|"--kibana-certificates") 
                ckibana=1
                shift 1
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

        if [ -n "${debugEnabled}" ]; then
            debug=""           
        fi

        if [[ -n "${cadmin}" ]]; then
            generateAdmincertificate
            echo "Admin certificates created."
        fi   

        if [[ -n "${ca}" ]]; then
            generateRootCAcertificate
            echo "Authority certificates created."
        fi                   

        if [[ -n "${celastic}" ]]; then
            generateElasticsearchcertificates
            echo "Elasticsearch certificates created."
        fi     

        if [[ -n "${cwazuh}" ]]; then
            generateFilebeatcertificates
            echo "Wazuh server certificates created."
        fi 

        if [[ -n "${ckibana}" ]]; then
            generateKibanacertificates
            echo "Kibana certificates created."
        fi                     
           
    else
        readInstances
        deploymentType
        generateRootCAcertificate
        generateAdmincertificate
        generateElasticsearchcertificates
        generateFilebeatcertificates
        generateKibanacertificates
        cleanFiles
    fi

}

main "$@"
