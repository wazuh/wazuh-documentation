#!/bin/bash

WAZUH_MAJOR="4.x"
WAZUH_MINOR="4.2"
WAZUH_VERSION="4.2.1"

OD_VERSION="1.13.2"
ES_VERSION="7.10.2"

BASE_DEST="wazuh-offline"

install_prerequisites(){

# Install the prerequisites
printf "\nInstalling prerequisites for packages and files download...\n"

yum install -y yum-plugin-downloadonly curl unzip wget libcap

}

get_wazuh_packages(){

# Install GPG key and add Wazuh repo
rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

cat > /etc/yum.repos.d/wazuh.repo << EOF
[wazuh]
gpgcheck=1
gpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH
enabled=0
name=EL-$releasever - Wazuh
baseurl=https://packages.wazuh.com/${WAZUH_MAJOR}/yum/
protect=1
EOF

# Download packages for Wazuh and Filebeat
printf "\nDownloading Wazuh packages...\n"

DEST_PATH="${BASE_DEST}/wazuh-packages"
yum install --enablerepo=wazuh --downloadonly --downloaddir=${DEST_PATH} wazuh-manager-${WAZUH_VERSION}-1 filebeat-${ES_VERSION}-1

}

get_opendistro_packages(){

# Download packages for Elasticsearch, Kibana and Java
printf "\nDownloading Opendistro packages...\n"

DEST_PATH="${BASE_DEST}/opendistro-packages"
yum install --enablerepo=wazuh --downloadonly --downloaddir=${DEST_PATH} opendistroforelasticsearch-${OD_VERSION}-1

DEST_PATH="${BASE_DEST}/opendistro-kibana-packages"
yum install --enablerepo=wazuh --downloadonly --downloaddir=${DEST_PATH} opendistroforelasticsearch-kibana-${OD_VERSION}-1

}

get_wazuh_files(){

DEST_PATH="${BASE_DEST}/wazuh_files"

mkdir -p ${DEST_PATH}/filebeat

mkdir -p ${DEST_PATH}/kibana

# Download config templates and Filebeat module
printf "\nDownloading Wazuh configuration files...\n"

curl -so ${DEST_PATH}/filebeat/filebeat.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/filebeat/7.x/filebeat_all_in_one.yml

curl -so ${DEST_PATH}/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/${WAZUH_MINOR}/extensions/elasticsearch/7.x/wazuh-template.json

curl -so ${DEST_PATH}/filebeat/wazuh-filebeat-module.tar.gz https://packages.wazuh.com/${WAZUH_MAJOR}/filebeat/wazuh-filebeat-0.1.tar.gz

curl -so ${DEST_PATH}/kibana/wazuh_kibana.zip https://packages.wazuh.com/${WAZUH_MAJOR}/ui/kibana/wazuh_kibana-${WAZUH_VERSION}_${ES_VERSION}-1.zip

}

get_opendistro_files(){

DEST_PATH="${BASE_DEST}/opendistro_files"

mkdir -p ${DEST_PATH}/elasticsearch


# Download Elasticsearch config templates
printf "\nDownloading Elasticsearch configuration files...\n"

curl -so ${DEST_PATH}/elasticsearch/elasticsearch.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/elasticsearch/7.x/elasticsearch_all_in_one.yml

curl -so ${DEST_PATH}/elasticsearch/roles.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/elasticsearch/roles/roles.yml

curl -so ${DEST_PATH}/elasticsearch/roles_mapping.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/elasticsearch/roles/roles_mapping.yml

curl -so ${DEST_PATH}/elasticsearch/internal_users.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/elasticsearch/roles/internal_users.yml      


# Download certificates utility files
printf "\nDownloading Wazuh certificates tool...\n"

curl -so ${DEST_PATH}/elasticsearch/wazuh-cert-tool.sh https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/tools/certificate-utility/wazuh-cert-tool.sh

curl -so ${DEST_PATH}/elasticsearch/instances.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/tools/certificate-utility/instances_aio.yml


# Download Kibana config templates and Kibana app
printf "\nDownloading Kibana configuration files...\n"

mkdir -p ${DEST_PATH}/kibana

curl -so ${DEST_PATH}/kibana/kibana.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/kibana/7.x/kibana_all_in_one.yml

}

install_prerequisites

get_wazuh_packages

get_opendistro_packages

get_wazuh_files

get_opendistro_files    
