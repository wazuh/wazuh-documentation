###############################################################################
#
# Custom replacements
#
# This file contains the dictionary of custom replacements. Requires the 
# variables 'version', 'release' and 'is_latest_release' from 
# source/_variables/settings.py
#

import sys
import os
sys.path.append(os.path.abspath("_variables"))
from settings import version, is_latest_release, release


custom_replacements = {
    "|CURRENT_MAJOR|" : "4.x",
    "|WAZUH_LATEST|" : "4.1.5",
    "|WAZUH_GCC_CHANGE|" : "4.1.4",
    "|WAZUH_PREGCC_CHANGE|" : "4.1.3",
    "|WAZUH_LATEST_MINOR|" : "4.1",
    "|WAZUH_PACKAGES_BRANCH|" : "4.1",
    "|WAZUH_LATEST_ANSIBLE|" : "4.1.5",
    "|WAZUH_LATEST_KUBERNETES|" : "4.1.5",
    "|WAZUH_LATEST_PUPPET|" : "4.1.5",
    "|WAZUH_LATEST_OVA|" : "4.1.5",
    "|WAZUH_LATEST_DOCKER|" : "4.1.5",
    "|OPEN_DISTRO_LATEST|" : "1.13.2",
    "|ELASTICSEARCH_LATEST|" : "7.10.2",
    "|ELASTICSEARCH_LATEST_OVA|" : "7.10.2",
    "|ELASTICSEARCH_LATEST_ANSIBLE|" : "7.10.2",
    "|ELASTICSEARCH_LATEST_KUBERNETES|" : "7.10.2",
    "|ELASTICSEARCH_LATEST_PUPPET|" : "7.10.2",
    "|ELASTICSEARCH_LATEST_DOCKER|" : "7.10.2",
    "|OPENDISTRO_LATEST_DOCKER|" : "1.13.2",
    "|OPENDISTRO_LATEST_KUBERNETES|" : "1.13.2",
    "|DOCKER_COMPOSE_VERSION|" : "1.28.3",
    "|SPLUNK_LATEST|" : "8.1.3",
    "|WAZUH_SPLUNK_LATEST|" : "4.1.5",
    "|ELASTIC_6_LATEST|" : "6.8.8",
    "|WAZUH_REVISION_YUM_AGENT_I386|" : "1",
    "|WAZUH_REVISION_YUM_MANAGER_I386|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_X86|" : "1",
    "|WAZUH_REVISION_YUM_MANAGER_X86|" : "1",
    "|WAZUH_REVISION_YUM_API_X86|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_AARCH64|" : "1",
    "|WAZUH_REVISION_YUM_MANAGER_AARCH64|" : "1",
    "|WAZUH_REVISION_YUM_API_AARCH64|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_ARMHF|" : "1",
    "|WAZUH_REVISION_YUM_MANAGER_ARMHF|" : "1",
    "|WAZUH_REVISION_YUM_API_ARMHF|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_I386_EL5|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_X86_EL5|" : "1",
    "|WAZUH_REVISION_DEB_AGENT_I386|" : "1",
    "|WAZUH_REVISION_DEB_MANAGER_I386|" : "1",
    "|WAZUH_REVISION_DEB_AGENT_X86|" : "1",
    "|WAZUH_REVISION_DEB_MANAGER_X86|" : "1",
    "|WAZUH_REVISION_DEB_API_X86|" : "1",
    "|WAZUH_REVISION_DEB_AGENT_AARCH64|" : "1",
    "|WAZUH_REVISION_DEB_MANAGER_AARCH64|" : "1",
    "|WAZUH_REVISION_DEB_API_AARCH64|" : "1",
    "|WAZUH_REVISION_DEB_AGENT_ARMHF|" : "1",
    "|WAZUH_REVISION_DEB_MANAGER_ARMHF|" : "1",
    "|WAZUH_REVISION_DEB_API_ARMHF|" : "1",
    "|WAZUH_REVISION_HPUX|" : "1",
    "|WAZUH_REVISION_OSX|" : "2",
    "|WAZUH_REVISION_WINDOWS|" : "1",
    "|WAZUH_REVISION_AIX|" : "1",
    "|CHECKSUMS_URL|" : "https://packages.wazuh.com/4.x/checksums/wazuh/",
    "|RPM_AGENT|" : "https://packages.wazuh.com/4.x/yum/wazuh-agent",
    "|RPM_MANAGER|" : "https://packages.wazuh.com/4.x/yum/wazuh-manager",
    "|DEB_AGENT|" : "https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent",
    "|DEB_MANAGER|" : "https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-manager/wazuh-manager",
    "|DEB_API|" : "https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-api/wazuh-api",
    # Variables for Elastic's Elasticsearch
    "|ELASTICSEARCH_ELK_LATEST|" : "7.11.2",
    "|ELASTICSEARCH_ELK_LATEST_ANSIBLE|" : "7.10.2",
    "|ELASTICSEARCH_ELK_LATEST_KUBERNETES|" : "7.10.2",
    "|ELASTICSEARCH_ELK_LATEST_PUPPET|" : "7.10.2",
    "|ELASTICSEARCH_ELK_LATEST_DOCKER|" : "7.10.2",
}
