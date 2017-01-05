.. _upgrading_wazuh:

Upgrading
===================================================

This section describes how to upgrade an existing Wazuh installation.

To determine if an upgrade is supported for your installation, please consult this table:

+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| Upgrade from | Installation type | Upgrade to    |                             Upgrade type                              |
+==============+===================+===============+=======================================================================+
| Wazuh 1.0+   | Sources           | Wazuh 1.2     | Automatic                                                             |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+

.. warning::
    The configuration file **/var/ossec/etc/ossec.conf will be overwritten**. The *old* configuration file from the current installation is saved as *ossec.conf.rpmorig* or *ossec.conf.deborig*. You should compare the new file with the old one.

    **Next upgrades (versions > 1.2) will not overwrite the file /var/ossec/etc/ossec.conf**. In these cases, the *new* configuration file from the update package is installed as *ossec.conf.rpmnew* or *ossec.conf.debnew* and might reflect new options or a new notion of best practices.

.. note::
    A backup of your previous ruleset will be saved at */var/ossec/etc/backup_ruleset*. You need to review it in case you have created new rules/decoders in other file than *local_rules.xml* or *local_decoder.xml*.


Following the guide to install Wazuh, your current installation will be automatically update:

 - :ref:`Install Wazuh server on CentOS <wazuh_server_centos>`
 - :ref:`Install Wazuh server on Debian <wazuh_server_debian>`
 - :ref:`Install Wazuh agent on Debian <wazuh_agent_debian>`
 - :ref:`Install Wazuh agent on CentOS <wazuh_agent_centos>`

Once Wazuh Manager and Agents are updated, it is necessary to update Elastic configuration.

ToDo:

 - Logstash forwarder vs Filebeat
 - wazuh-elastic2-template.json vs wazuh-elastic5-template.json
