#!/bin/bash

# Program to download Wazuh manager along Open Distro for Elasticsearch installation files
# Copyright (C) 2015-2021, Wazuh Inc.
#
# This program is a free software; you can redistribute it
# and/or modify it under the terms of the GNU General Public
# License (version 2) as published by the FSF - Free Software
# Foundation.

WAZUH_MAJOR="4.x"
WAZUH_MINOR="4.2"
DEFAULT_WAZUH_VERSION="4.2.3"
WAZUH_VERSION=${DEFAULT_WAZUH_VERSION}

DEFAULT_ES_VERSION="7.10.2"
ES_VERSION=${DEFAULT_ES_VERSION}

#OD_VERSION="1.13.2"

BASE_DEST_FOLDER="wazuh-offline"

BASE_URL="https://packages.wazuh.com/${WAZUH_MAJOR}"

WAZUH_DEB_BASE_URL="${BASE_URL}/apt/pool/main/w/wazuh-manager"
FILEBEAT_DEB_BASE_URL="${BASE_URL}/apt/pool/main/f/filebeat"
ESOSS_DEB_BASE_URL="${BASE_URL}/apt/pool/main/e/elasticsearch-oss"
OD_DEB_BASE_URL="${BASE_URL}/apt/pool/main/o"
KIBANA_DEB_BASE_URL="${BASE_URL}/apt/pool/main/o/opendistroforelasticsearch-kibana"

WAZUH_RPM_BASE_URL="${BASE_URL}/yum"
FILEBEAT_RPM_BASE_URL="${BASE_URL}/yum"
ESOSS_RPM_BASE_URL="${BASE_URL}/yum"
OD_RPM_BASE_URL="${BASE_URL}/yum"
KIBANA_RPM_BASE_URL="${BASE_URL}/yum"

ARCH="x86_64" # Default architecture

SILENT="s" # Silent and Verbose turned
VERBOSE="" # on and off by default

get_wazuh_packages(){

  DEST_PATH="${BASE_DEST_FOLDER}/wazuh-packages"

  mkdir -p ${DEST_PATH}

  # Download packages for Wazuh and Filebeat
  printf "\nDownloading Wazuh $PACKAGE packages for $ARCH...\n"

  case "$PACKAGE $ARCH" in
    "deb x86_64")
      rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions
      curl -${SILENT}o ${DEST_PATH}/wazuh-manager_${WAZUH_VERSION}-1_amd64.deb ${WAZUH_DEB_BASE_URL}/wazuh-manager_${WAZUH_VERSION}-1_amd64.deb
      curl -${SILENT}o ${DEST_PATH}/filebeat-${ES_VERSION}-amd64.deb ${FILEBEAT_DEB_BASE_URL}/filebeat-oss-${ES_VERSION}-amd64.deb
    ;;
    #"deb aarch64")
    #  rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions
    #  curl -${SILENT}o ${DEST_PATH}/wazuh-manager_${WAZUH_VERSION}-1_arm64.deb ${WAZUH_DEB_BASE_URL}/wazuh-manager_${WAZUH_VERSION}-1_arm64.deb
    #  curl -${SILENT}o ${DEST_PATH}/filebeat_${ES_VERSION}_amd64.deb ${FILEBEAT_DEB_BASE_URL}/filebeat-oss-${ES_VERSION}-amd64.deb
    #;;
    "rpm x86_64")
      rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions
      curl -${SILENT}o ${DEST_PATH}/wazuh-manager-${WAZUH_VERSION}-1.x86_64.rpm ${WAZUH_RPM_BASE_URL}/wazuh-manager-${WAZUH_VERSION}-1.x86_64.rpm
      curl -${SILENT}o ${DEST_PATH}/filebeat-oss-${ES_VERSION}-x86_64.rpm ${FILEBEAT_RPM_BASE_URL}/filebeat-oss-${ES_VERSION}-x86_64.rpm
    ;;
    #"rpm aarch64")
    #  rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions
    #  curl -${SILENT}o ${DEST_PATH}/wazuh-manager-${WAZUH_VERSION}-1.aarch64.rpm ${WAZUH_RPM_BASE_URL}/wazuh-manager-${WAZUH_VERSION}-1.aarch64.rpm
    #  curl -${SILENT}o ${DEST_PATH}/filebeat-oss-${ES_VERSION}-x86_64.rpm ${FILEBEAT_RPM_BASE_URL}/filebeat-oss-${ES_VERSION}-x86_64.rpm
    #;;
    *)
      print_unknown_args
      exit 0
    ;;
  esac

}

get_opendistro_packages(){

  DEST_PATH="${BASE_DEST_FOLDER}/opendistro-packages"

  mkdir -p ${DEST_PATH}

  # Download packages for Elasticsearch, Kibana and Java
  printf "\nDownloading Opendistro $PACKAGE packages...\n"

  case "$PACKAGE $ARCH" in
    "deb x86_64")
      rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions

      curl -${SILENT}o ${DEST_PATH}/elasticsearch-oss-${ES_VERSION}-amd64.deb ${ESOSS_DEB_BASE_URL}/elasticsearch-oss-${ES_VERSION}-amd64.deb

      curl -${SILENT}o ${DEST_PATH}/opendistro-anomaly-detection_1.13.0.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-anomaly-detection/opendistro-anomaly-detection_1.13.0.0-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-reports-scheduler_1.13.0.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-reports-scheduler/opendistro-reports-scheduler_1.13.0.0-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-knn_1.13.0.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-knn/opendistro-knn_1.13.0.0-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-performance-analyzer_1.13.0.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-performance-analyzer/opendistro-performance-analyzer_1.13.0.0-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-asynchronous-search_1.13.0.1-1_all.deb ${OD_DEB_BASE_URL}/opendistro-asynchronous-search/opendistro-asynchronous-search_1.13.0.1-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-knnlib_1.13.0.0_amd64.deb ${OD_DEB_BASE_URL}/opendistro-knnlib/opendistro-knnlib_1.13.0.0_amd64.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-alerting_1.13.1.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-alerting/opendistro-alerting_1.13.1.0-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-security_1.13.1.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-security/opendistro-security_1.13.1.0-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistroforelasticsearch_1.13.2-1_amd64.deb ${OD_DEB_BASE_URL}/opendistroforelasticsearch/opendistroforelasticsearch_1.13.2-1_amd64.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-index-management_1.13.2.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-index-management/opendistro-index-management_1.13.2.0-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-job-scheduler_1.13.0.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-job-scheduler/opendistro-job-scheduler_1.13.0.0-1_all.deb
      curl -${SILENT}o ${DEST_PATH}/opendistro-sql_1.13.2.0-1_all.deb ${OD_DEB_BASE_URL}/opendistro-sql/opendistro-sql_1.13.2.0-1_all.deb
    ;;
    "rpm x86_64")
      rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions

      curl -${SILENT}o ${DEST_PATH}/elasticsearch-oss-${ES_VERSION}-x86_64.rpm ${ESOSS_RPM_BASE_URL}/elasticsearch-oss-${ES_VERSION}-x86_64.rpm

      curl -${SILENT}o ${DEST_PATH}/opendistro-alerting-1.13.1.0.rpm ${OD_RPM_BASE_URL}/opendistro-alerting-1.13.1.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-anomaly-detection-1.13.0.0.rpm ${OD_RPM_BASE_URL}/opendistro-anomaly-detection-1.13.0.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-asynchronous-search-1.13.0.1.rpm ${OD_RPM_BASE_URL}/opendistro-asynchronous-search-1.13.0.1.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-index-management-1.13.2.0.rpm ${OD_RPM_BASE_URL}/opendistro-index-management-1.13.2.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-job-scheduler-1.13.0.0.rpm ${OD_RPM_BASE_URL}/opendistro-job-scheduler-1.13.0.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-knn-1.13.0.0.rpm ${OD_RPM_BASE_URL}/opendistro-knn-1.13.0.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-knnlib-1.13.0.0-linux-x64.rpm ${OD_RPM_BASE_URL}/opendistro-knnlib-1.13.0.0-linux-x64.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-performance-analyzer-1.13.0.0.rpm ${OD_RPM_BASE_URL}/opendistro-performance-analyzer-1.13.0.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-reports-scheduler-1.13.0.0.rpm ${OD_RPM_BASE_URL}/opendistro-reports-scheduler-1.13.0.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-security-1.13.1.0.rpm ${OD_RPM_BASE_URL}/opendistro-security-1.13.1.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistro-sql-1.13.2.0.rpm ${OD_RPM_BASE_URL}/opendistro-sql-1.13.2.0.rpm
      curl -${SILENT}o ${DEST_PATH}/opendistroforelasticsearch-1.13.2-linux-x64.rpm ${OD_RPM_BASE_URL}/opendistroforelasticsearch-1.13.2-linux-x64.rpm
    ;;
    *)
      print_unknown_args
      exit 0
    ;;
  esac

  DEST_PATH="${BASE_DEST_FOLDER}/opendistro-kibana-packages"
  
  mkdir -p ${DEST_PATH}

  case "$PACKAGE $ARCH" in
    "deb x86_64")
      rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions
      curl -${SILENT}o ${DEST_PATH}/opendistroforelasticsearch-kibana_1.13.2_amd64.deb ${KIBANA_DEB_BASE_URL}/opendistroforelasticsearch-kibana_1.13.2_amd64.deb
    ;;
    "rpm x86_64")
      rm -f${VERBOSE} ${DEST_PATH}/*  # Clean folder before downloading specific versions
      curl -${SILENT}o ${DEST_PATH}/opendistroforelasticsearch-kibana-1.13.2-linux-x64.rpm ${KIBANA_RPM_BASE_URL}/opendistroforelasticsearch-kibana-1.13.2-linux-x64.rpm
    ;;
    *)
      print_unknown_args
      exit 0
    ;;
  esac

}

get_wazuh_files(){

  DEST_PATH="${BASE_DEST_FOLDER}/wazuh_files"

  mkdir -p ${DEST_PATH}/filebeat

  mkdir -p ${DEST_PATH}/kibana

  # Download key, config templates and Filebeat module
  printf "\nDownloading Wazuh configuration files...\n"

  curl -${SILENT}o ${DEST_PATH}/GPG-KEY-WAZUH https://packages.wazuh.com/key/GPG-KEY-WAZUH

  curl -${SILENT}o ${DEST_PATH}/filebeat/filebeat.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/filebeat/7.x/filebeat_all_in_one.yml

  curl -${SILENT}o ${DEST_PATH}/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/${WAZUH_MINOR}/extensions/elasticsearch/7.x/wazuh-template.json

  curl -${SILENT}o ${DEST_PATH}/filebeat/wazuh-filebeat-module.tar.gz ${BASE_URL}/filebeat/wazuh-filebeat-0.1.tar.gz

  curl -${SILENT}o ${DEST_PATH}/kibana/wazuh_kibana.zip ${BASE_URL}/ui/kibana/wazuh_kibana-${WAZUH_VERSION}_${ES_VERSION}-1.zip
  
}

get_opendistro_files(){

  DEST_PATH="${BASE_DEST_FOLDER}/opendistro_files"

  mkdir -p ${DEST_PATH}/elasticsearch


  # Download Elasticsearch config templates
  printf "\nDownloading Elasticsearch configuration files...\n"

  curl -${SILENT}o ${DEST_PATH}/elasticsearch/elasticsearch.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/elasticsearch/7.x/elasticsearch_all_in_one.yml

  curl -${SILENT}o ${DEST_PATH}/elasticsearch/roles.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/elasticsearch/roles/roles.yml

  curl -${SILENT}o ${DEST_PATH}/elasticsearch/roles_mapping.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/elasticsearch/roles/roles_mapping.yml

  curl -${SILENT}o ${DEST_PATH}/elasticsearch/internal_users.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/elasticsearch/roles/internal_users.yml      


  # Download certificates utility files
  printf "\nDownloading Wazuh certificates tool...\n"

  curl -${SILENT}o ${DEST_PATH}/elasticsearch/wazuh-cert-tool.sh https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/tools/certificate-utility/wazuh-cert-tool.sh

  curl -${SILENT}o ${DEST_PATH}/elasticsearch/instances.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/tools/certificate-utility/instances_aio.yml


  # Download Kibana config templates and Kibana app
  printf "\nDownloading Kibana configuration files...\n"

  mkdir -p ${DEST_PATH}/kibana

  curl -${SILENT}o ${DEST_PATH}/kibana/kibana.yml https://packages.wazuh.com/resources/${WAZUH_MINOR}/open-distro/kibana/7.x/kibana_all_in_one.yml

}

parse_arguments() {
  POSITIONAL=()
  
  if [ $# = 0 ]; then
    printf "Missing arguments\n\n"
    print_help
    exit 0
  fi
  
  while [[ "$#" -gt 0 ]]; do
    key="$1"

    case $key in
      -h|--help)
        print_help
        exit 0
        ;;
      -p|--package)
        PACKAGE="$2"
        shift # past argument
        shift # past value
        ;;
      #-a|--architecture)
      #  ARCH="$2"
      #  shift # past argument
      #  shift # past value
      #  ;;
      -v|--verbose)
        SILENT=""
        VERBOSE="v"
        shift # past argument with no value
        ;;
      *)    # unknown option
        POSITIONAL+=("$1") # save it in an array for later
        shift # past argument
        ;;
    esac
  done

  set -- "${POSITIONAL[@]}" # restore positional parameters
  
  for i in "$@"; do
    case $i in
      -w=*|--wazuh-version=*)
        WAZUH_VERSION="${i#*=}"
        shift # past argument=value
        ;;
      -e=*|--elastic-version=*)
        ES_VERSION="${i#*=}"
        shift # past argument=value
        ;;
      *)
        # unknown option
        ;;
    esac
  done
}

print_help(){
  
  #printf "\t-a, --architecture <x86_64|aarch64>\t\tArchitecture type (Default: x86_64)\n"
  printf "Usage: $0 [OPTIONS]\n\nMandatory options\n\t-p, --packages <deb|rpm>\t\t\t\tPackage file format\n\nOther options\n\t-w=<version>, --wazuh-version=<version>\t\tSelect specific Wazuh manager version\n\t-e=<version>, --elastic-version=<version>\tSelect specific ELK version\n\t-v, --verbose\t\t\t\t\t\tShow detailed output\n\t-h, --help\t\t\t\t\t\tShow this help\n"

}

print_unknown_args(){

  printf "Not available for packages type and/or target architecture. Try '$0 --help' for more information\n"

}


parse_arguments "$@"

get_wazuh_packages

get_opendistro_packages

get_wazuh_files

get_opendistro_files
