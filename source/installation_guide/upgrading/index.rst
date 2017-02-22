.. _upgrading_wazuh:

Upgrading to Wazuh 2.0
===================================================

.. warning::
	Draft document.

Introduction
----------------------------------------------------------

This section describes how to upgrade an existing Wazuh installation to **Wazuh 2.0**.

.. warning::
    The configuration file **/var/ossec/etc/ossec.conf will be overwritten**. The *old* configuration file from the current installation is saved as *ossec.conf.rpmorig* or *ossec.conf.deborig*. You should compare the new file with the old one.

    **Next upgrades (versions > 2.0) will not overwrite the file /var/ossec/etc/ossec.conf**. In these cases, the *new* configuration file from the update package is installed as *ossec.conf.rpmnew* or *ossec.conf.debnew* and might reflect new options or a new notion of best practices.

.. note::
    A backup of your previous ruleset will be saved at */var/ossec/etc/backup_ruleset*. You need to review it in case you have created new rules/decoders in other file than *local_rules.xml* or *local_decoder.xml*.


Step 1: Update Manager
----------------------------------------------------------

Following the next guide, your current installation will be automatically update:

- :ref:`Install Wazuh server with RPM packages <wazuh_server_rpm>`
- :ref:`Install Wazuh server with Deb packages <wazuh_server_deb>`

Step 2: Update Agents
----------------------------------------------------------

Following the next guide, your current installation will be automatically update:

- :ref:`Install Wazuh agent with RPM packages <installing_wazuh_agent>`
- :ref:`Install Wazuh agent with Deb packages <installing_wazuh_agent>`

Step 3: Change from Logstash forwarder to Filebeat
----------------------------------------------------------

.. warning::
	Draft section.

*ToDo*

 - Remove Logstash
 - Install Filebeat: filebeat_deb, filebeat_rpm.

Step 4: Update Elastic configuration
----------------------------------------------------------

.. warning::
	Draft section.

*ToDo*

Keep Elastic 2
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Download the configuration template for Logstash::

	curl -so /etc/logstash/conf.d/01-wazuh.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/logstash/01-wazuh.conf
	curl -so /etc/logstash/wazuh-elastic2-template.json https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/wazuh-elastic2-template.json


Update to Elastic 5
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

These are the steps to update Elastic Stack server, and configure it to work with Wazuh.

- :ref:`Install Elastic Stack with RPM packages <elastic_server_rpm>`
- :ref:`Install Elastic Stack with Debian packages <elastic_server_deb>`
