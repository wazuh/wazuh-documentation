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

BASE_RESOURCES_URL="https://packages.wazuh.com/resources/${WAZUH_MINOR}"

ARCH="x86_64" # Default architecture

SILENT="s" # Silent and Verbose turned\
VERBOSE="" # on and off by default

WAZUH_DEB_BASE_URL="${BASE_URL}/apt/pool/main/w/wazuh-manager"
WAZUH_DEB_PACKAGES=( "wazuh-manager_${WAZUH_VERSION}-1_amd64.deb" )

FILEBEAT_DEB_BASE_URL="${BASE_URL}/apt/pool/main/f/filebeat"
FILEBEAT_DEB_PACKAGES=( "filebeat-oss-${ES_VERSION}-amd64.deb" )

ESOSS_DEB_BASE_URL="${BASE_URL}/apt/pool/main/e/elasticsearch-oss"
ESOSS_DEB_PACKAGES=( "elasticsearch-oss-${ES_VERSION}-amd64.deb" )

OD_DEB_BASE_URL="${BASE_URL}/apt/pool/main/o"
OD_DEB_PACKAGES=( "opendistro-anomaly-detection/opendistro-anomaly-detection_1.13.0.0-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistro-reports-scheduler/opendistro-reports-scheduler_1.13.0.0-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistro-knn/opendistro-knn_1.13.0.0-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistro-performance-analyzer/opendistro-performance-analyzer_1.13.0.0-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistro-asynchronous-search/opendistro-asynchronous-search_1.13.0.1-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistro-knnlib/opendistro-knnlib_1.13.0.0_amd64.deb" )
OD_DEB_PACKAGES+=( "opendistro-alerting/opendistro-alerting_1.13.1.0-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistro-security/opendistro-security_1.13.1.0-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistroforelasticsearch/opendistroforelasticsearch_1.13.2-1_amd64.deb" )
OD_DEB_PACKAGES+=( "opendistro-index-management/opendistro-index-management_1.13.2.0-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistro-job-scheduler/opendistro-job-scheduler_1.13.0.0-1_all.deb" )
OD_DEB_PACKAGES+=( "opendistro-sql/opendistro-sql_1.13.2.0-1_all.deb" )

KIBANA_DEB_BASE_URL="${BASE_URL}/apt/pool/main/o/opendistroforelasticsearch-kibana"
KIBANA_DEB_PACKAGES=( "opendistroforelasticsearch-kibana_1.13.2_amd64.deb" )

WAZUH_RPM_BASE_URL="${BASE_URL}/yum"
WAZUH_RPM_PACKAGES=( "wazuh-manager-${WAZUH_VERSION}-1.x86_64.rpm" )

FILEBEAT_RPM_BASE_URL="${BASE_URL}/yum"
FILEBEAT_RPM_PACKAGES=( "filebeat-oss-${ES_VERSION}-x86_64.rpm" )

ESOSS_RPM_BASE_URL="${BASE_URL}/yum"
ESOSS_RPM_PACKAGES=( "elasticsearch-oss-${ES_VERSION}-x86_64.rpm" )

OD_RPM_BASE_URL="${BASE_URL}/yum"
OD_RPM_PACKAGES=( "opendistro-alerting-1.13.1.0.rpm" )
OD_RPM_PACKAGES+=( "opendistro-anomaly-detection-1.13.0.0.rpm" )
OD_RPM_PACKAGES+=( "opendistro-asynchronous-search-1.13.0.1.rpm" )
OD_RPM_PACKAGES+=( "opendistro-index-management-1.13.2.0.rpm" )
OD_RPM_PACKAGES+=( "opendistro-job-scheduler-1.13.0.0.rpm" )
OD_RPM_PACKAGES+=( "opendistro-knn-1.13.0.0.rpm" )
OD_RPM_PACKAGES+=( "opendistro-knnlib-1.13.0.0-linux-x64.rpm" )
OD_RPM_PACKAGES+=( "opendistro-performance-analyzer-1.13.0.0.rpm" )
OD_RPM_PACKAGES+=( "opendistro-reports-scheduler-1.13.0.0.rpm" )
OD_RPM_PACKAGES+=( "opendistro-security-1.13.1.0.rpm" )
OD_RPM_PACKAGES+=( "opendistro-sql-1.13.2.0.rpm" )
OD_RPM_PACKAGES+=( "opendistroforelasticsearch-1.13.2-linux-x64.rpm" )

KIBANA_RPM_BASE_URL="${BASE_URL}/yum"
KIBANA_RPM_PACKAGES=( "opendistroforelasticsearch-kibana-1.13.2-linux-x64.rpm" )

#define_packages_names(){}

get_wazuh_packages(){

  # Wazuh and Filebeat packages
  if [ "$LIST_ONLY" = true ] ; then
    printf "\nListing Wazuh $PACKAGE packages for $ARCH...\n"
  else
    printf "\nDownloading Wazuh $PACKAGE packages for $ARCH...\n"

    DEST_PATH="${BASE_DEST_FOLDER}/wazuh-packages"

    mkdir -p ${DEST_PATH} # Create folder if it does not exist

    rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions
  fi

  case "$PACKAGE $ARCH" in
    "deb x86_64")
      for p in ${WAZUH_DEB_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List packages for Wazuh
          printf "${WAZUH_DEB_BASE_URL}/$p\n"
        else
          # Download packages for Wazuh
          curl -${SILENT}o ${DEST_PATH}/$p ${WAZUH_DEB_BASE_URL}/$p
        fi
      done
      
      for p in ${FILEBEAT_DEB_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List packages for Filebeat
          printf "${FILEBEAT_DEB_BASE_URL}/$p\n"
        else
          # Download packages for Filebeat
          curl -${SILENT}o ${DEST_PATH}/$p ${FILEBEAT_DEB_BASE_URL}/$p
        fi
      done
    ;;
    #"deb aarch64")
    #  curl -${SILENT}o ${DEST_PATH}/wazuh-manager_${WAZUH_VERSION}-1_arm64.deb ${WAZUH_DEB_BASE_URL}/wazuh-manager_${WAZUH_VERSION}-1_arm64.deb
    #  curl -${SILENT}o ${DEST_PATH}/filebeat_${ES_VERSION}_amd64.deb ${FILEBEAT_DEB_BASE_URL}/filebeat-oss-${ES_VERSION}-amd64.deb
    #;;
    "rpm x86_64")
      for p in ${WAZUH_RPM_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List packages for Wazuh
          printf "${WAZUH_RPM_BASE_URL}/$p\n"
        else
          # Download packages for Wazuh
          curl -${SILENT}o ${DEST_PATH}/$p ${WAZUH_RPM_BASE_URL}/$p
        fi
      done
      for p in ${FILEBEAT_RPM_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List packages for Filebeat
          printf "${FILEBEAT_RPM_BASE_URL}/$p\n"
        else
          # Download packages for Filebeat
          curl -${SILENT}o ${DEST_PATH}/$p ${FILEBEAT_RPM_BASE_URL}/$p
        fi
      done
    ;;
    #"rpm aarch64")
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

  # Open Distro packages
  if [ "$LIST_ONLY" = true ] ; then
    printf "\nListing Open Distro $PACKAGE packages...\n"
  else
    printf "\nDownloading Open Distro $PACKAGE packages...\n"

    DEST_PATH="${BASE_DEST_FOLDER}/opendistro-packages"

    mkdir -p ${DEST_PATH} # Create folder if it does not exist

    rm -f${VERBOSE} ${DEST_PATH}/opendistro-packages/* # Clean folder before downloading specific versions
  fi

  case "$PACKAGE $ARCH" in
    "deb x86_64")
      for p in ${ESOSS_DEB_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List packages for Elasticsearch
          printf "${ESOSS_DEB_BASE_URL}/$p\n"
        else
          # Download packages for Elasticsearch
          curl -${SILENT}o ${DEST_PATH}/$p ${ESOSS_DEB_BASE_URL}/$p
        fi
      done
      
      for p in ${OD_DEB_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List Open Distro packages
          printf "${OD_DEB_BASE_URL}/$p\n"
        else
          # Download Open Distro packages
          curl -${SILENT}o ${DEST_PATH}/${p##*/} ${OD_DEB_BASE_URL}/$p
        fi
      done
    ;;
    "rpm x86_64")
      for p in ${ESOSS_RPM_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List packages for Elasticsearch
          printf "${ESOSS_RPM_BASE_URL}/$p\n"
        else
          # Download packages for Elasticsearch
          curl -${SILENT}o ${DEST_PATH}/$p ${ESOSS_RPM_BASE_URL}/$p
        fi
      done
      
      for p in ${OD_RPM_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List Open Distro packages
          printf "${OD_RPM_BASE_URL}/$p\n"
        else
          # Download Open Distro packages
          curl -${SILENT}o ${DEST_PATH}/$p ${OD_RPM_BASE_URL}/$p
        fi
      done
    ;;
    *)
      print_unknown_args
      exit 0
    ;;
  esac

  # Kibana packages
  if [ "$LIST_ONLY" = true ] ; then
    printf "\n"
  else
    DEST_PATH="${BASE_DEST_FOLDER}/opendistro-kibana-packages"
    
    mkdir -p ${DEST_PATH} # Create folder if it does not exist

    rm -f${VERBOSE} ${DEST_PATH}/* # Clean folder before downloading specific versions
  fi

  case "$PACKAGE $ARCH" in
    "deb x86_64")
      for p in ${KIBANA_DEB_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List packages for Kibana
          printf "${KIBANA_DEB_BASE_URL}/$p\n"
        else
          # Download packages for Kibana
          curl -${SILENT}o ${DEST_PATH}/$p ${KIBANA_DEB_BASE_URL}/$p
        fi
      done
    ;;
    "rpm x86_64")
      for p in ${KIBANA_RPM_PACKAGES[@]}; do
        if [ "$LIST_ONLY" = true ] ; then
          # List packages for Kibana
          printf "${KIBANA_RPM_BASE_URL}/$p\n"
        else
          # Download packages for Kibana
          curl -${SILENT}o ${DEST_PATH}/$p ${KIBANA_RPM_BASE_URL}/$p
        fi
      done
    ;;
    *)
      print_unknown_args
      exit 0
    ;;
  esac

}

get_wazuh_files(){

  # Wazuh files
  if [ "$LIST_ONLY" = true ] ; then
    # List key, config templates and Filebeat module
    printf "\nListing Wazuh configuration files...\n"

    printf "https://packages.wazuh.com/key/GPG-KEY-WAZUH\n"

    printf "${BASE_RESOURCES_URL}/open-distro/filebeat/7.x/filebeat_all_in_one.yml\n"

    printf "https://raw.githubusercontent.com/wazuh/wazuh/${WAZUH_MINOR}/extensions/elasticsearch/7.x/wazuh-template.json\n"

    printf "${BASE_URL}/filebeat/wazuh-filebeat-0.1.tar.gz\n"

    printf "\n${BASE_URL}/ui/kibana/wazuh_kibana-${WAZUH_VERSION}_${ES_VERSION}-1.zip\n"
  else
    # Download key, config templates and Filebeat module
    printf "\nDownloading Wazuh configuration files...\n"

    DEST_PATH="${BASE_DEST_FOLDER}/wazuh_files"

    mkdir -p ${DEST_PATH}/filebeat # Create folder if it does not exist

    rm -f${VERBOSE} ${DEST_PATH}/filebeat/* # Clean folder before downloading specific versions

    mkdir -p ${DEST_PATH}/kibana # Create folder if it does not exist

    rm -f${VERBOSE} ${DEST_PATH}/kibana/* # Clean folder before downloading specific versions
    
    curl -${SILENT}o ${DEST_PATH}/GPG-KEY-WAZUH https://packages.wazuh.com/key/GPG-KEY-WAZUH

    curl -${SILENT}o ${DEST_PATH}/filebeat/filebeat.yml ${BASE_RESOURCES_URL}/open-distro/filebeat/7.x/filebeat_all_in_one.yml

    curl -${SILENT}o ${DEST_PATH}/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/${WAZUH_MINOR}/extensions/elasticsearch/7.x/wazuh-template.json

    curl -${SILENT}o ${DEST_PATH}/filebeat/wazuh-filebeat-module.tar.gz ${BASE_URL}/filebeat/wazuh-filebeat-0.1.tar.gz

    curl -${SILENT}o ${DEST_PATH}/kibana/wazuh_kibana.zip ${BASE_URL}/ui/kibana/wazuh_kibana-${WAZUH_VERSION}_${ES_VERSION}-1.zip
  fi

}

get_opendistro_files(){

  # Open Distro files
  if [ "$LIST_ONLY" = true ] ; then
    # List Elasticsearch config templates
    printf "\nListing Elasticsearch configuration files...\n"

    printf "${BASE_RESOURCES_URL}/open-distro/elasticsearch/7.x/elasticsearch_all_in_one.yml\n"

    printf "${BASE_RESOURCES_URL}/open-distro/elasticsearch/roles/roles.yml\n"
    
    printf "${BASE_RESOURCES_URL}/open-distro/elasticsearch/roles/roles_mapping.yml\n"
    
    printf "${BASE_RESOURCES_URL}/open-distro/elasticsearch/roles/internal_users.yml\n"
  else
    # Download Elasticsearch config templates
    printf "\nDownloading Elasticsearch configuration files...\n"

    DEST_PATH="${BASE_DEST_FOLDER}/opendistro_files"

    mkdir -p ${DEST_PATH}/elasticsearch # Create folder if it does not exist

    rm -f${VERBOSE} ${DEST_PATH}/elasticsearch/* # Clean folder before downloading specific versions

    curl -${SILENT}o ${DEST_PATH}/elasticsearch/elasticsearch.yml ${BASE_RESOURCES_URL}/open-distro/elasticsearch/7.x/elasticsearch_all_in_one.yml

    curl -${SILENT}o ${DEST_PATH}/elasticsearch/roles.yml ${BASE_RESOURCES_URL}/open-distro/elasticsearch/roles/roles.yml
    
    curl -${SILENT}o ${DEST_PATH}/elasticsearch/roles_mapping.yml ${BASE_RESOURCES_URL}/open-distro/elasticsearch/roles/roles_mapping.yml
    
    curl -${SILENT}o ${DEST_PATH}/elasticsearch/internal_users.yml ${BASE_RESOURCES_URL}/open-distro/elasticsearch/roles/internal_users.yml
  fi
  
  # Certificates utility files
  if [ "$LIST_ONLY" = true ] ; then
    # List certificates utility files
    printf "\nListing Wazuh certificates utility files...\n"

    printf "${BASE_RESOURCES_URL}/open-distro/tools/certificate-utility/wazuh-cert-tool.sh\n"

    printf "${BASE_RESOURCES_URL}/open-distro/tools/certificate-utility/instances_aio.yml\n"
  else
    # Download certificates utility files
    printf "\nDownloading Wazuh certificates utility files...\n"

    curl -${SILENT}o ${DEST_PATH}/elasticsearch/wazuh-cert-tool.sh ${BASE_RESOURCES_URL}/open-distro/tools/certificate-utility/wazuh-cert-tool.sh

    curl -${SILENT}o ${DEST_PATH}/elasticsearch/instances.yml ${BASE_RESOURCES_URL}/open-distro/tools/certificate-utility/instances_aio.yml
  fi
  
  # Kibana files
  if [ "$LIST_ONLY" = true ] ; then
    # List Kibana config templates
    printf "\nListing Kibana configuration files...\n"

    printf "${BASE_RESOURCES_URL}/open-distro/kibana/7.x/kibana_all_in_one.yml\n"
  else
    # Download Kibana config templates
    printf "\nDownloading Kibana configuration files...\n"

    mkdir -p ${DEST_PATH}/kibana

    curl -${SILENT}o ${DEST_PATH}/kibana/kibana.yml ${BASE_RESOURCES_URL}/open-distro/kibana/7.x/kibana_all_in_one.yml
  fi
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
      -l|--list-only)
        LIST_ONLY=true
        shift # past argument with no value
        ;;
      *)    # unknown option
        POSITIONAL+=("$1") # save it in an array for later
        shift # past argument
        ;;
    esac
  done

  set -- "${POSITIONAL[@]}" # restore positional parameters
  
  #for i in "$@"; do
  #  case $i in
  #    -w=*|--wazuh-version=*)
  #      WAZUH_VERSION="${i#*=}"
  #      shift # past argument=value
  #      ;;
  #    -e=*|--elastic-version=*)
  #      ES_VERSION="${i#*=}"
  #      shift # past argument=value
  #      ;;
  #    *)
  #      # unknown option
  #      ;;
  #  esac
  #done
}

print_help(){
  
  printf "Usage: $0 [OPTIONS]\n\nMandatory options\n\t-p, --packages <deb|rpm>\t\t\tPackage files format\n\nOther options\n"
  #printf "\t-a, --architecture <x86_64|aarch64>\t\tArchitecture type (Default: x86_64)\n"
  #printf "\t-w=<version>, --wazuh-version=<version>\t\tSelect specific Wazuh manager version (Default: ${DEFAULT_WAZUH_VERSION})\n\t-e=<version>, --elastic-version=<version>\tSelect specific ELK version (Default: ${DEFAULT_ES_VERSION})\n"
  printf "\t-l, --list-only\t\t\t\t\tDo not download. Show only the list of packages\n\t-v, --verbose\t\t\t\t\tShow detailed output\n\t-h, --help\t\t\t\t\tShow this help\n"

}

print_unknown_args(){

  printf "Not available for the packages format. Try '$0 --help' for more information\n"

}

parse_arguments "$@"

#define_packages_names

get_wazuh_packages

get_opendistro_packages

get_wazuh_files

get_opendistro_files
