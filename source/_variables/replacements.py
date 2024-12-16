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
    # === URLs and base URLs
    "|CHECKSUMS_URL|" : "https://packages.wazuh.com/4.x/checksums/wazuh/",
    "|RPM_AGENT_URL|" : "https://packages.wazuh.com/4.x/yum/wazuh-agent",
    "|RPM_MANAGER_URL|" : "https://packages.wazuh.com/4.x/yum/wazuh-manager",
    "|DEB_AGENT_URL|" : "https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-agent/wazuh-agent",
    "|DEB_MANAGER_URL|" : "https://packages.wazuh.com/4.x/apt/pool/main/w/wazuh-manager/wazuh-manager",
    #
    "|CTI_URL|" : "https://cti.wazuh.com/api/v1/catalog/contexts/vd_1.0.0/consumers/vd_4.8.0",
    #
    # === Environment
    "|PYTHON_CLOUD_CONTAINERS_MIN|": "3.8",
    "|PYTHON_CLOUD_CONTAINERS_MAX|": "3.12",
    "|WAZUH_DASHBOARD_YARN_VERSION|": "1.22.22",
    #
    # === Global and Wazuh version (wazuh agent, manager, indexer, and dashboard)
    "|WAZUH_CURRENT_MAJOR|" : "4.x",
    "|WAZUH_CURRENT_MINOR|" : version,
    "|WAZUH_CURRENT|" : release,

    # --- Revision numbers for Wazuh agent and manager packages versions
    # Yum packages revisions
    "|WAZUH_REVISION_YUM_AGENT_I386|" : "1",
    "|WAZUH_REVISION_YUM_MANAGER_I386|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_I386_EL5|" : "1",
    #"|WAZUH_REVISION_YUM_MANAGER_I386_EL5|" :
    "|WAZUH_REVISION_YUM_AGENT_X86|" : "1",
    "|WAZUH_REVISION_YUM_MANAGER_X86|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_X86_EL5|" : "1",
    #|WAZUH_REVISION_YUM_MANAGER_X86_EL5|
    "|WAZUH_REVISION_YUM_AGENT_AARCH64|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_ARMHF|" : "1",
    #"|WAZUH_REVISION_YUM_MANAGER_ARMHF|" : "1",
    "|WAZUH_REVISION_YUM_AGENT_PPC|" : "1",
    #|WAZUH_REVISION_YUM_MANAGER_PPC|" :
    # Deb packages revisions
    "|WAZUH_REVISION_DEB_AGENT_I386|" : "1",
    "|WAZUH_REVISION_DEB_MANAGER_I386|" : "1",
    "|WAZUH_REVISION_DEB_AGENT_X86|" : "1",
    "|WAZUH_REVISION_DEB_MANAGER_X86|" : "1",
    "|WAZUH_REVISION_DEB_AGENT_AARCH64|" : "1",
    "|WAZUH_REVISION_DEB_AGENT_ARMHF|" : "1",
    "|WAZUH_REVISION_DEB_MANAGER_ARMHF|" : "1",
    "|WAZUH_REVISION_DEB_AGENT_PPC|" : "1",
    #"|WAZUH_REVISION_DEB_MANAGER_PPC|" :
    #
    # === Wazuh indexer version revisions
    "|WAZUH_INDEXER_CURRENT_REV|" : "1", # RPM and Deb
    #"|WAZUH_INDEXER_CURRENT_REV_DEB|" :
    # --- Architectures for Wazuh indexer packages
    "|WAZUH_INDEXER_x64_RPM|" : "x86_64",
    "|WAZUH_INDEXER_x64_DEB|" : "amd64",
    #
    # === Wazuh dashboard version revisions
    "|WAZUH_DASHBOARD_CURRENT_REV_RPM|" : "1",
    "|WAZUH_DASHBOARD_CURRENT_REV_DEB|" : "1",
    # --- Architectures for Wazuh dashboard packages
    "|WAZUH_DASHBOARD_x64_RPM|" : "x86_64",
    "|WAZUH_DASHBOARD_x64_DEB|" : "amd64",
    #
    # === Versions and revisions for other Wazuh deployments
    #"|WAZUH_CURRENT_MAJOR_AMI|" :
    #"|WAZUH_CURRENT_MINOR_AMI|" :
    "|WAZUH_CURRENT_AMI|" : release,
    "|WAZUH_CURRENT_MAJOR_OVA|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_OVA|" :
    "|WAZUH_CURRENT_OVA|" : release,
    #"|WAZUH_CURRENT_MAJOR_DOCKER|" :
    "|WAZUH_CURRENT_MINOR_DOCKER|" : version,
    "|WAZUH_CURRENT_DOCKER|" : release,
    #"|WAZUH_CURRENT_MAJOR_KUBERNETES|" :
    #"|WAZUH_CURRENT_MINOR_KUBERNETES|" :
    "|WAZUH_CURRENT_KUBERNETES|" : release,
    #"|WAZUH_CURRENT_MAJOR_ANSIBLE|" :
    "|WAZUH_CURRENT_MINOR_ANSIBLE|" : version,
    "|WAZUH_CURRENT_ANSIBLE|" : release,
    #"|WAZUH_CURRENT_MAJOR_PUPPET|" :
    #"|WAZUH_CURRENT_MINOR_PUPPET|" :
    "|WAZUH_CURRENT_PUPPET|" : release,
    #"|WAZUH_CURRENT_MAJOR_FROM_SOURCES|" :
    "|WAZUH_CURRENT_MINOR_FROM_SOURCES|" : version,
    "|WAZUH_CURRENT_FROM_SOURCES|" : release,
    #"|WAZUH_CURRENT_MAJOR_WIN_FROM_SOURCES|" :
    #"|WAZUH_CURRENT_MINOR_WIN_FROM_SOURCES|" :
    "|WAZUH_CURRENT_WIN_FROM_SOURCES|" : release,
    "|WAZUH_CURRENT_WIN_FROM_SOURCES_REV|" : "1",
    #
    # === Versions and revisions for packages of specific operating systems
    "|WAZUH_CURRENT_MAJOR_WINDOWS|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_WINDOWS|" :
    "|WAZUH_CURRENT_WINDOWS|" : release,
    "|WAZUH_REVISION_WINDOWS|" : "1",
    "|WAZUH_CURRENT_MAJOR_OSX|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_OSX|" :
    "|WAZUH_CURRENT_OSX|" : release,
    "|WAZUH_REVISION_OSX|" : "1",
    "|WAZUH_CURRENT_MAJOR_SOLARIS|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_SOLARIS|" :
    "|WAZUH_CURRENT_SOLARIS|" : release, # Set here the lesser of WAZUH_CURRENT_MAJOR_SOLARIS10 and 11 values
    #"|WAZUH_REVISION_SOLARIS|" : "1",
    "|WAZUH_CURRENT_MAJOR_SOLARIS10|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_SOLARIS10|" :
    "|WAZUH_CURRENT_SOLARIS10|" : release,
    #"|WAZUH_REVISION_SOLARIS10|" : "1",
    "|WAZUH_CURRENT_MAJOR_SOLARIS11|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_SOLARIS11|" :
    "|WAZUH_CURRENT_SOLARIS11|" : release,
    #"|WAZUH_REVISION_SOLARIS11|" : "1",
    "|WAZUH_CURRENT_MAJOR_SOLARIS10_i386|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_SOLARIS10_i386|" :
    "|WAZUH_CURRENT_SOLARIS10_i386|" : release,
    #"|WAZUH_REVISION_SOLARIS10_i386|" : "1",
    "|WAZUH_CURRENT_MAJOR_SOLARIS10_SPARC|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_SOLARIS10_SPARC|" :
    "|WAZUH_CURRENT_SOLARIS10_SPARC|" : release,
    #"|WAZUH_REVISION_SOLARIS10_SPARC|" : "1",
    "|WAZUH_CURRENT_MAJOR_SOLARIS11_i386|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_SOLARIS11_i386|" :
    "|WAZUH_CURRENT_SOLARIS11_i386|" : release,
    #"|WAZUH_REVISION_SOLARIS11_i386|" : "1",
    "|WAZUH_CURRENT_MAJOR_SOLARIS11_SPARC|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_SOLARIS11_SPARC|" :
    "|WAZUH_CURRENT_SOLARIS11_SPARC|" : release,
    #"|WAZUH_REVISION_SOLARIS11_SPARC|" : "1",
    "|WAZUH_CURRENT_MAJOR_AIX|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_AIX|" :
    "|WAZUH_CURRENT_AIX|" : release,
    "|WAZUH_REVISION_AIX|" : "1",
    "|WAZUH_CURRENT_MAJOR_HPUX|" : "4.x",
    #"|WAZUH_CURRENT_MINOR_HPUX|" :
    "|WAZUH_CURRENT_HPUX|" : release,
    "|WAZUH_REVISION_HPUX|" : "1",
    #
    # === Elastic
    # --- Filebeat
    "|FILEBEAT_LATEST|" : "7.10.2",
    "|FILEBEAT_LATEST_AMI|" : "7.10.2",
    "|FILEBEAT_LATEST_OVA|" : "7.10.2",
    # --- Open Distro for Elasticsearch
    "|OPEN_DISTRO_LATEST|" : "1.13.2",
    # --- Elasticsearch
    "|ELASTICSEARCH_ELK_LATEST|" : "7.17.13", # Basic license
    "|ELASTICSEARCH_LATEST|" : "7.10.2",
    # --- Other Elastic
    "|ELASTIC_6_LATEST|" : "6.8.8",
    #
    # === Splunk
    "|SPLUNK_LATEST|" : "8.2.8",
    "|WAZUH_SPLUNK_CURRENT|" : release,
    #
    "|SPLUNK_LATEST_MINOR|" : "8.2",
    "|WAZUH_SPLUNK_REV_CURRENT_LATEST|" : "1", # 8.2
    "|WAZUH_SPLUNK_REV_CURRENT_8.1|" : "1",
}

if is_latest_release:
    custom_replacements["|WAZUH_INDEXER_RPM_PKG_INSTALL|"] = ''
    custom_replacements["|WAZUH_MANAGER_RPM_PKG_INSTALL|"] = ''
    custom_replacements["|WAZUH_DASHBOARD_RPM_PKG_INSTALL|"] = ''
    custom_replacements["|WAZUH_INDEXER_DEB_PKG_INSTALL|"] = ''
    custom_replacements["|WAZUH_MANAGER_DEB_PKG_INSTALL|"] = ''
    custom_replacements["|WAZUH_DASHBOARD_DEB_PKG_INSTALL|"] = ''
    custom_replacements["|WAZUH_AGENT_RPM_PKG_INSTALL|"] = ''
    custom_replacements["|WAZUH_AGENT_DEB_PKG_INSTALL|"] = ''
    custom_replacements["|WAZUH_AGENT_ZYPP_PKG_INSTALL|"] = ''
else:
    custom_replacements["|WAZUH_INDEXER_RPM_PKG_INSTALL|"] = '-' + custom_replacements["|WAZUH_CURRENT|"] + '-' + custom_replacements["|WAZUH_INDEXER_CURRENT_REV|"]
    custom_replacements["|WAZUH_MANAGER_RPM_PKG_INSTALL|"] = '-' + custom_replacements["|WAZUH_CURRENT|"] + '-' + custom_replacements["|WAZUH_REVISION_YUM_MANAGER_X86|"]
    custom_replacements["|WAZUH_DASHBOARD_RPM_PKG_INSTALL|"] = '-' + custom_replacements["|WAZUH_CURRENT|"] + '-' + custom_replacements["|WAZUH_DASHBOARD_CURRENT_REV_RPM|"]
    custom_replacements["|WAZUH_INDEXER_DEB_PKG_INSTALL|"] = '=' + custom_replacements["|WAZUH_CURRENT|"] + '-' + custom_replacements["|WAZUH_INDEXER_CURRENT_REV|"]
    custom_replacements["|WAZUH_MANAGER_DEB_PKG_INSTALL|"] = '=' + custom_replacements["|WAZUH_CURRENT|"] + '-' + custom_replacements["|WAZUH_REVISION_DEB_MANAGER_X86|"]
    custom_replacements["|WAZUH_DASHBOARD_DEB_PKG_INSTALL|"] = '=' + custom_replacements["|WAZUH_CURRENT|"] + '-' + custom_replacements["|WAZUH_DASHBOARD_CURRENT_REV_DEB|"]
    custom_replacements["|WAZUH_AGENT_RPM_PKG_INSTALL|"] = '-' + custom_replacements["|WAZUH_CURRENT|"] + '-' + custom_replacements["|WAZUH_REVISION_YUM_AGENT_X86|"]
    custom_replacements["|WAZUH_AGENT_DEB_PKG_INSTALL|"] = '=' + custom_replacements["|WAZUH_CURRENT|"] + '-' + custom_replacements["|WAZUH_REVISION_DEB_AGENT_X86|"]
    custom_replacements["|WAZUH_AGENT_ZYPP_PKG_INSTALL|"] = '-' + custom_replacements["|WAZUH_CURRENT|"] + '-' + '1'
