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
    "|WAZUH_LATEST|" : "4.0.4",
    "|WAZUH_LATEST_MINOR|": "4.0",
    "|WAZUH_PACKAGES_BRANCH|" : "4.0",
    "|WAZUH_LATEST_ANSIBLE|" : "4.0.4",
    "|WAZUH_LATEST_KUBERNETES|" : "4.0.4",
    "|WAZUH_LATEST_PUPPET|" : "4.0.4",
    "|WAZUH_LATEST_OVA|" : "4.0.4",
    "|WAZUH_LATEST_DOCKER|" : "4.0.4",
    "|OPEN_DISTRO_LATEST|" : "1.11.0",
    "|ELASTICSEARCH_LATEST|" : "7.9.1",
    "|ELASTICSEARCH_LATEST_OVA|" : "7.9.1",
    "|ELASTICSEARCH_LATEST_ANSIBLE|" : "7.8.0",
    "|ELASTICSEARCH_LATEST_KUBERNETES|" : "7.8.0",
    "|ELASTICSEARCH_LATEST_PUPPET|" : "7.8.0",
    "|ELASTICSEARCH_LATEST_DOCKER|" : "7.9.1",
    "|OPENDISTRO_LATEST_DOCKER|" : "1.11.0",
    "|OPENDISTRO_LATEST_KUBERNETES|" : "1.11.0",
    "|DOCKER_COMPOSE_VERSION|" : "1.27.4",
    "|SPLUNK_LATEST|" : "8.0.4",
    "|WAZUH_SPLUNK_LATEST|" : "3.13.2",
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
    "|WAZUH_REVISION_OSX|" : "1",
    "|WAZUH_REVISION_WINDOWS|" : "1",
    "|WAZUH_REVISION_AIX|" : "1",
    "|CHECKSUMS_URL|" : "https://packages.wazuh.com/4.x/checksums/wazuh/",
    "|RPM_AGENT|" : "https://packages.wazuh.com/4.x/yum/wazuh-agent",
    "|RPM_MANAGER|" : "https://packages.wazuh.com/4.x/yum/wazuh-manager",
    "|DEB_AGENT|" : "https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent",
    "|DEB_MANAGER|" : "https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-manager/wazuh-manager",
    "|DEB_API|" : "https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-api/wazuh-api",
    # Variables for Elastic's Elasticsearch
    "|ELASTICSEARCH_ELK_LATEST|" : "7.9.3",
    "|ELASTICSEARCH_ELK_LATEST_ANSIBLE|" : "7.8.0",
    "|ELASTICSEARCH_ELK_LATEST_KUBERNETES|" : "7.8.0",
    "|ELASTICSEARCH_ELK_LATEST_PUPPET|" : "7.8.0",
    "|ELASTICSEARCH_ELK_LATEST_DOCKER|" : "7.8.0",
}
