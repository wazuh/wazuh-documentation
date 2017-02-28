.. _upgrading_ossec:

Migrating from OSSEC
====================

Prerequisites
-------------
- OSSEC 2.8.3 or higher
- ELK stack NOT installed

This section explains how to migrate from an existing OSSEC installation (agent or server) to Wazuh.

.. note::
	OSSEC agents are compatible with Wazuh Manager.

Follow the appropriate section depending on the type of your OSSEC installation: from sources or packages:

+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| Upgrade from | Installation type | Upgrade to    |                             Upgrade type                              |
+==============+===================+===============+=======================================================================+
| OSSEC 2.8.3+ | Sources           | Wazuh 2       | :ref:`Automatic <upgrading_ossec_sources>`                            |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+
| OSSEC 2.8.3+ | Packages          | Wazuh 2       | :ref:`Manual <upgrading_ossec_packages>`                              |
+--------------+-------------------+---------------+-----------------------------------------------------------------------+

.. _upgrading_ossec_sources:

Migrating OSSEC installed from sources
--------------------------------------

This section describes how to upgrade from OSSEC to Wazuh in case that OSSEC was installed from sources.

.. warning::
    The configuration file ``/var/ossec/etc/ossec.conf`` **will be overwritten**. The *old* configuration file from the current installation is saved as ``ossec.conf.rpmorig`` or ``ossec.conf.deborig``. You should compare the new file with the old one.

A backup of your previous ruleset will be saved at ``/var/ossec/etc/backup_ruleset``. You need to review it in case you have created new rules/decoders in other file than ``local_rules.xml`` or ``local_decoder.xml``.

Following the proper installation guide, your OSSEC installation will be automatically upgraded to Wazuh:

+---------------------------------------------+-----------------------------------+-----------------------------------+
|                                             |Wazuh Server                       |Wazuh agent                        |
+=============================================+===================================+===================================+
| Red Hat, CentOS and other RPM-based systems | :ref:`Packages <wazuh_server_rpm>`| :ref:`Packages <wazuh_agent_rpm>` |
+---------------------------------------------+-----------------------------------+-----------------------------------+
| Ubuntu, and other Debian-based systems      | :ref:`Packages <wazuh_server_deb>`| :ref:`Packages <wazuh_agent_deb>` |
+---------------------------------------------+-----------------------------------+-----------------------------------+

.. _upgrading_ossec_packages:

Migrating OSSEC installed from packages
---------------------------------------

This section describes how to migrate from OSSEC to Wazuh in case that OSSEC was installed using official OSSEC packages:


.. toctree::
   :maxdepth: 1

   ossec_packages_agent
   ossec_packages_manager

Installing Elastic stack
------------------------

At this point you should have your OSSEC Manager and agents migrated to Wazuh. Now, we recommend you install the ELK stack, which will allow you to use our web application integrated as a Kibana app.

Install Elastic stack server following this guide:

.. toctree::
   :maxdepth: 1

   ../../installation_guide/installing-elastic-stack/elastic_server_rpm
   ../../installation_guide/installing-elastic-stack/elastic_server_deb

.. image:: ../../images/screenshots/Overview_general_1024x1024.png
  :align: center
  :width: 100%
