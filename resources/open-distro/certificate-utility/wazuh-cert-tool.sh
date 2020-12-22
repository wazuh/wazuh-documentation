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
    else
        echo "Error: no configuration file found."
        exit 1;
    fi

}

generateCertificateconfiguration() {

    if [[ $cname == "admin" ]]; then

		cat > ~/certs/${cname}.conf <<- EOF
        [ req ]
        prompt = no
        default_bits = 2048
        default_md = sha256
        distinguished_name = req_distinguished_name
        x509_extensions = v3_req
        
        [req_distinguished_name]
        CN = admin
        OU = Docu
        O = Wazuh
        L = California
        C = US
        
        [ v3_req ]
        authorityKeyIdentifier=keyid,issuer
        basicConstraints = CA:FALSE
        keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
		EOF

    else
    
		cat > ~/certs/${cname}.conf <<- EOF
        [ req ]
        prompt = no
        default_bits = 2048
        default_md = sha256
        distinguished_name = req_distinguished_name
        x509_extensions = v3_req
        
        [req_distinguished_name]
        CN = cname
        OU = Docu
        O = Wazuh
        L = California
        C = US
        
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

    fi
}

generateRootCAcertificate() {

    eval "openssl req -x509 -new -nodes -newkey rsa:2048 -keyout ~/certs/root-ca.key -out ~/certs/root-ca.pem -batch -subj '/OU=Docu/O=Wazuh/L=California/' -days 3650 ${debug}"

}

generateAdmincertificate() {
    
    cname="admin"
    generateCertificateconfiguration cname
    eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/admin-key.pem -out ~/certs/admin.csr -config ~/certs/admin.conf -days 3650 ${debug}"
    eval "openssl x509 -req -in ~/certs/admin.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/admin.pem -extfile ~/certs/admin.conf -extensions v3_req -days 3650  ${debug}"

}

generateElasticsearchcertificates() {

    enl=$(awk -v RS='' '/elasticsearch-nodes:/' ~/instances.yml) 
    rt="# Elasticsearch nodes"
    rnt="elasticsearch-nodes:"
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

}

generateFilebeatcertificates() {

    enl=$(awk -v RS='' '/wazuh-server:/' ~/instances.yml) 
    rt="# Wazuh server nodes"
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

    echo $cname
    echo $cip

    generateCertificateconfiguration cname cip
    eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
    eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"

}

generateKibanacertificates() {

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
        generateRootCAcertificate
        generateAdmincertificate
        generateElasticsearchcertificates
        generateFilebeatcertificates
        generateKibanacertificates
        cleanFiles
    fi

}

main "$@"
