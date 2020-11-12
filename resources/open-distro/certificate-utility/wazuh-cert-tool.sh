#!/bin/bash

# Program to generate the certificates necessary for Wazuh installation
# Copyright (C) 2015-2020, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

debug='> /dev/null 2>&1'

generateCertificateconfiguration() {
    if [ ${cname} == "admin" ]; then

		cat > ~/certs/$cname.conf <<- EOF
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

		cat > ~/certs/$cname.conf <<- EOF
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

    fi
}

generateRootCAcertificate() {

    eval "openssl req -x509 -new -nodes -newkey rsa:2048 -keyout root-ca.key -out root-ca.pem -batch -subj '/OU=Docu/O=Wazuh/L=California/' -days 3650 ${debug}"

}

generateAdmincertificate() {

    eval "openssl req -new -nodes -newkey rsa:2048 -keyout admin-key.pem -out admin.csr -config csr.conf -days 3650 ${debug}"
    eval "openssl x509 -req -in admin.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out admin.pem -extfile csr.conf -extensions v3_req -days 3650  ${debug}"

}

generateElasticsearchcertificates() {

    enl=$(awk -v RS='' '/elasticsearch-nodes:/' ~/instances.yml) 
    rt="# Elasticsearch nodes"
    ens="${enl//$rt}"

    eval "openssl req -new -nodes -newkey rsa:2048 -keyout elasticsearch-key.pem -out elasticsearch.csr -config elasticsearch.conf -days 3650 ${debug}"
    eval "openssl x509 -req -in elasticsearch.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out elasticsearch.pem -extfile elasticsearch.conf -extensions v3_req -days 3650 ${debug}"
    eval "chmod 444 /etc/elasticsearch/certs/elasticsearch-key.pem ${debug}"

}

generateFilebeatcertificates() {
    eval "openssl req -new -nodes -newkey rsa:2048 -keyout filebeat-key.pem -out filebeat.csr -config filebeat.conf -days 3650 ${debug}"
    eval "openssl x509 -req -in filebeat.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out filebeat.pem -extfile filebeat.conf -extensions v3_req -days 3650 ${debug}"
}

generateKibanacertificates() {
    eval "openssl req -new -nodes -newkey rsa:2048 -keyout kibana-key.pem -out kibana.csr -config kibana.conf -days 3650 ${debug}"
    eval "openssl x509 -req -in kibana.csr -CA root-ca.pem -CAkey root-ca.key -CAcreateserial -out kibana.pem -extfile kibana.conf -extensions v3_req -days 3650 ${debug}"
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
            echo "Elasticsearch certificates created."
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
        generateRootCAcertificate
        generateAdmincertificate
        generateElasticsearchcertificates
        generateFilebeatcertificates
        generateKibanacertificates
    fi

}

main "$@"
