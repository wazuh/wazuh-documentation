.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to see a complete reference of all the configurations and settings that can be customized on Wazuh, for both managers and agents.

.. _reference_files:

Reference
=========


This part of the user manual covers the configuration files that Wazuh uses and defines the setting options. It explains how to customize Wazuh functionality for the unique environment and specific requirements of each installation.

The Wazuh manager and the Wazuh agent use different configuration files. The Wazuh manager reads ``/etc/wazuh-manager/wazuh-manager.conf``, with the ``<wazuh_config>`` root element, described in :ref:`reference_wazuh_manager_conf`. The Wazuh agent reads ``ossec.conf``, with the ``<ossec_config>`` root element, described in :ref:`reference_ossec_conf`.

.. topic:: Contents

    .. toctree::
       :maxdepth: 1

       wazuh-manager-conf/index
       ossec-conf/index
       centralized-configuration
       internal-options
       daemons/index
       tools/index
       installation-utilities/index
       unattended-installation
       wazuh-common-schema
       helper-functions
       statistics-files/index
