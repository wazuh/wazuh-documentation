.. _upgrading_ossec_sources:

Migrating OSSEC installed from sources
===================================================

This section describes how to upgrade from OSSEC to Wazuh in case that OSSEC was installed from sources.

.. warning::
    The configuration file **/var/ossec/etc/ossec.conf will be overwritten**. The *old* configuration file from the current installation is saved as *ossec.conf.rpmorig* or *ossec.conf.deborig*. You should compare the new file with the old one.

.. note::
    A backup of your previous ruleset will be saved at */var/ossec/etc/backup_ruleset*. You need to review it in case you have created new rules/decoders in other file than *local_rules.xml* or *local_decoder.xml*.

Following the proper installation guide, your OSSEC installation will be automatically upgraded to Wazuh:

**Debian, Ubuntu, and other Debian-based systems**

.. toctree::
    :maxdepth: 1

    ../installation_guide/installing-manager/packages-installation/wazuh_server_deb
    ../installation_guide/installing-agents/packages-installation/wazuh_agent_deb


**Red Hat, CentOS and other RPM-based systems**

.. toctree::
    :maxdepth: 1
    
    ../installation_guide/installing-manager/packages-installation/wazuh_server_rpm
    ../installation_guide/installing-agents/packages-installation/wazuh_agent_rpm
