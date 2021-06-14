.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: The pre-built Wazuh Virtual Machine includes all Wazuh components ready-to-use. Test all Wazuh capabilities with our OVA.  

.. _virtual_machine:

Virtual Machine (OVA)
=====================

Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox or other OVA compatible virtualization systems.

.. note::

  This VM only runs on 64-bit systems and is not recommended for use in production environments. It is a useful tool for proof-of-concepts and labs. Multi-tier servers and multi-node clusters are generally more suitable for production environments where higher performance is required.

This virtual appliance, available `in this link <https://packages.wazuh.com/|CURRENT_MAJOR|/vm/wazuh-|WAZUH_LATEST_OVA|_|OPEN_DISTRO_LATEST|.ova>`_, contains the following components:

    - CentOS 7
    - Wazuh manager: |WAZUH_LATEST_OVA|
    - Open Distro for Elasticsearch: |ELASTICSEARCH_LATEST_OVA|
    - Filebeat-OSS: |ELASTICSEARCH_LATEST_OVA|
    - Kibana: |ELASTICSEARCH_LATEST_OVA|
    - Wazuh Kibana plugin: |WAZUH_LATEST_OVA|-|ELASTICSEARCH_LATEST_OVA|

First, import the OVA in the virtualization platform and run the virtual machine. 

You can access to it with the following credentials (user/password):

    - root/wazuh
    - wazuh/wazuh

The `following video <https://www.youtube.com/watch?v=uijZuneDPPk>`_ explains how to import and run the virtual machine.

To access the web interface: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: wazuh
      password: wazuh

All components included in this virtual image are configured to work out-of-the-box without the need to modify any settings. However, all components can be fully customized. These are the configuration files locations:

  - Wazuh manager: ``/var/ossec/etc/ossec.conf``
  - Open Distro for Elasticsearch: ``/etc/elasticsearch/elasticsearch.yml``
  - Filebeat-OSS: ``/etc/filebeat/filebeat.yml``
  - Kibana: ``/etc/kibana/kibana.yml``

In case of using VirtualBox, once the virtual machine is imported it may run into issues caused by time skew when VirtualBox synchronizes the time of the guest machine. To avoid this situation, enable the ``Hardware Clock in UTC Time`` option in the ``System`` tab of the virtual machine configuration.

.. note::
  By default, the network interface type is bridge. The VM will attempt to obtain an IP address from the network DHCP server. Alternatively, a static IP address can be set by configuring the appropriate network files in the CentOS operating system on which the VM is based.


Once the virtual machine is imported and running, the next step is to :ref:`deploy the Wazuh agents <installation_agents>` on the systems to be monitored.

It is highly recommended to change Elasticsearch default passwords for the users' found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found in the :ref:`user manual <change_elastic_pass>`.


Upgrading the VM
----------------

The virtual machine can be upgraded as a traditional installation:

  - :ref:`Upgrading the Wazuh manager <upgrading_wazuh_server>`
  - :ref:`Upgrading Open Distro for Elasticsearch, Filebeat-OSS and Kibana <upgrading_open_distro>`
