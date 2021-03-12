#!/bin/bash

# Program to generate the certificates necessary for Wazuh installation
# Copyright (C) 2015-2020, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

debug='> /dev/null 2>&1'
ELASTICINSTANCES="elasticsearch-nodes:"
FILEBEATINSTANCES="wazuh-servers:"
KIBANAINSTANCES="kibana:"
ELASTICHEAD='# Elasticsearch nodes'
FILEBEATHEAD='# Wazuh server nodes'
KIBANAHEAD='# Kibana node'

readInstances() {

    if [ -f ~/instances.yml ]; then
        echo "Configuration file found. Creating certificates..."
        eval "mkdir ~/certs $debug"
    else
        echo "Error: no configuration file found."
        exit 1;
    fi

    readFile

}

readFile() {

    IFS=$'\r\n' GLOBIGNORE='*' command eval  'INSTANCES=($(cat instances.yml))'
    for i in "${!INSTANCES[@]}"; do
    if [[ "${INSTANCES[$i]}" == "${ELASTICINSTANCES}" ]]; then
        ELASTICLIMITT=${i}
    fi
        if [[ "${INSTANCES[$i]}" == "${FILEBEATINSTANCES}" ]]; then
        ELASTICLIMIB=${i}
    fi

    if [[ "${INSTANCES[$i]}" == "${FILEBEATINSTANCES}" ]]; then
        FILEBEATLIMITT=${i}
    fi
    
    if [[ "${INSTANCES[$i]}" == "${KIBANAINSTANCES}" ]]; then
        FILEBEATLIMIB=${i}
    fi  
    done

    ## Read Elasticsearch nodes
    counter=${ELASTICLIMITT}
    i=0
    while [ "${counter}" -le "${ELASTICLIMIB}" ]
    do
        if  [ "${INSTANCES[counter]}" !=  "${ELASTICINSTANCES}" ] && [ "${INSTANCES[counter]}" !=  "${FILEBEATINSTANCES}" ] && [ "${INSTANCES[counter]}" !=  "${FILEBEATHEAD}" ] && [ "${INSTANCES[counter]}" !=  "    ip:" ] && [ -n "${INSTANCES[counter]}" ]; then
            ELASTICNODES[i]+="$(echo "${INSTANCES[counter]}" | tr -d '\011\012\013\014\015\040')"
            ((i++))
        fi    

        ((counter++))
    done

    ## Read Filebeat nodes
    counter=${FILEBEATLIMITT}
    i=0
    while [ "${counter}" -le "${FILEBEATLIMIB}" ]
    do
        if  [ "${INSTANCES[counter]}" !=  "${FILEBEATINSTANCES}" ] && [ "${INSTANCES[counter]}" !=  "${KIBANAINSTANCES}" ] && [ "${INSTANCES[counter]}" !=  "${KIBANAHEAD}" ] && [ "${INSTANCES[counter]}" !=  "    ip:" ] && [ -n "${INSTANCES[counter]}" ]; then
            FILEBEATNODES[i]+="$(echo "${INSTANCES[counter]}" | tr -d '\011\012\013\014\015\040')"
            ((i++))
        fi    

        ((counter++))
    done

    ## Read Kibana nodes
    counter=${FILEBEATLIMIB}
    i=0
    while [ "${counter}" -le "${#INSTANCES[@]}" ]
    do
        if  [ "${INSTANCES[counter]}" !=  "${KIBANAINSTANCES}" ]  && [ "${INSTANCES[counter]}" !=  "${KIBANAHEAD}" ] && [ "${INSTANCES[counter]}" !=  "    ip:" ] && [ -n "${INSTANCES[counter]}" ]; then
            KIBANANODES[i]+="$(echo "${INSTANCES[counter]}" | tr -d '\011\012\013\014\015\040')"
            ((i++))
        fi    

        ((counter++))    
    done

    echo "ELASTIC NODES"
    for i in "${!ELASTICNODES[@]}"; do
    echo "$i. ${ELASTICNODES[i]}"
    done

    echo "FILEBEAT NODES"
    for i in "${!FILEBEATNODES[@]}"; do
    echo "$i. ${FILEBEATNODES[i]}"
    done

    echo "KIBANA NODES"
    for i in "${!KIBANANODES[@]}"; do
    echo "$i. ${KIBANANODES[i]}"
    done


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

     echo "Creating the Elasticsearch certificates..."

    i=0
    while [ ${i} -lt ${#ELASTICNODES[@]} ]; do
        cname=${ELASTICNODES[i]}
        cip=${ELASTICNODES[i+1]}
        generateCertificateconfiguration cname cip
        eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
        eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"
        eval "chmod 444 ~/certs/${cname}-key.pem ${debug}"    
        i=$(( ${i} + 2 ))
    done

}

generateFilebeatcertificates() {

    echo "Creating Wazuh server certificates..."

    i=0
    while [ ${i} -lt ${#FILEBEATNODES[@]} ]; do
        cname=${FILEBEATNODES[i]}
        cip=${FILEBEATNODES[i+1]}
        generateCertificateconfiguration cname cip
        eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
        eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"
        i=$(( ${i} + 2 ))
    done      

}

generateKibanacertificates() {

    echo "Creating Kibana certificate..."

    i=0
    while [ ${i} -lt ${#KIBANANODES[@]} ]; do
        cname=${KIBANANODES[i]}
        cip=${KIBANANODES[i+1]}
        generateCertificateconfiguration cname cip
        eval "openssl req -new -nodes -newkey rsa:2048 -keyout ~/certs/${cname}-key.pem -out ~/certs/${cname}.csr -config ~/certs/${cname}.conf -days 3650 ${debug}"
        eval "openssl x509 -req -in ~/certs/${cname}.csr -CA ~/certs/root-ca.pem -CAkey ~/certs/root-ca.key -CAcreateserial -out ~/certs/${cname}.pem -extfile ~/certs/${cname}.conf -extensions v3_req -days 3650 ${debug}"
        i=$(( ${i} + 2 ))
    done 

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
        generateRootCAcertificate
        generateAdmincertificate
        generateElasticsearchcertificates
        generateFilebeatcertificates
        generateKibanacertificates
        cleanFiles
    fi

}

main "$@"
