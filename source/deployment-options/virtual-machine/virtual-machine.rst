.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: The pre-built Wazuh Virtual Machine includes all Wazuh components ready-to-use. Test all Wazuh capabilities with our OVA.  

.. _virtual_machine:

Virtual Machine (OVA)
=====================

Wazuh provides a pre-built virtual machine image in Open Virtual Appliance (OVA) format. This can be directly imported to VirtualBox or other OVA compatible virtualization systems. Take into account that this VM only runs on 64-bit systems. It does not provide high availability and scalability out of the box. However, these can be implemented by using :doc:`distributed deployment </installation-guide/index>`.


Download the `virtual appliance (OVA) <https://packages.wazuh.com/|CURRENT_MAJOR|/vm/wazuh-|WAZUH_LATEST_OVA|_|OPEN_DISTRO_LATEST|.ova>`_, which contains the following components:

    - CentOS 7
    - Wazuh manager |WAZUH_LATEST|
    - Wazuh indexer |WAZUH_INDEXER_CURRENT|
    - Filebeat-OSS |ELASTICSEARCH_LATEST_OVA|
    - Wazuh dashboard |WAZUH_DASHBOARD_CURRENT|


Hardware requirements
---------------------

The following requirements have to be in place before the Wazuh VM can be imported into a host operating system:

- The host operating system has to be a 64-bit system. 
- Hardware virtualization has to be enabled on the firmware of the host.
- A virtualization platform, such as VirtualBox, should be installed on the host system.

Out of the box, the Wazuh VM is configured with the following specifications:

  +-----------+------+--------------+--------------+----------------+
  |    Component     |   RAM (GB)   | Storage (GB) |   CPU (cores)  |
  +==================+==============+==============+================+
  | Wazuh v4.3.0 OVA |      8       |     50       |       4        |
  +-----------+------+--------------+--------------+----------------+

However, this hardware configuration can be modified depending on the number of protected endpoints and indexed alert data. More information about requirements can be found :doc:`here </quickstart>`. 


Import and access the virtual machine
-------------------------------------

First, import the OVA to the virtualization platform and start the machine.

When the virtual machine is accessed through the virtualization platform, either of the following system users can be used to log in:
 

  .. code-block:: none

      user: root
      password: wazuh

      user: wazuh-user
      password: wazuh


When a virtual machine is accessed via SSH, the root user login via SSH is disabled. Therefore, SSH login is only possible using the following system user:

  .. code-block:: none

      user: wazuh-user
      password: wazuh


Access the Wazuh dashboard
--------------------------

Shortly after starting the VM, the Wazuh dashboard can be accessed from the web interface by using the following credentials:

  .. code-block:: none

     URL: https://<wazuh_server_ip>
     user: admin
     password: admin


You can find ``<wazuh_server_ip>``  by typing the following command in the VM:

  .. code-block:: none

     ip a


Configuration files
-------------------

All components included in this virtual image are configured to work out-of-the-box, without the need to modify any settings. However, all components can be fully customized. These are the configuration files locations:

  - Wazuh manager: ``/var/ossec/etc/ossec.conf``

  - Wazuh indexer: ``/etc/wazuh-indexer/opensearch.yml``
  
  - Filebeat-OSS: ``/etc/filebeat/filebeat.yml``
  
  - Wazuh dashboard: ``/etc/wazuh-dashboard/opensearch_dashboards.yml``


VirtualBox time configuration
-----------------------------

In case of using VirtualBox, once the virtual machine is imported it may run into issues caused by time skew when VirtualBox synchronizes the time of the guest machine. To avoid this situation, enable the ``Hardware Clock in UTC Time`` option in the ``System`` tab of the virtual machine configuration.

.. note::
  By default, the network interface type is set to Bridged Adapter. The VM will attempt to obtain an IP address from the network DHCP server. Alternatively, a static IP address can be set by configuring the appropriate network files in the CentOS operating system on which the VM is based.


Once the virtual machine is imported and running, the next step is to :ref:`deploy the Wazuh agents <installation_agents>` on the systems to be monitored.


Upgrading the VM
----------------

The virtual machine can be upgraded as a traditional installation:

  - :ref:`Upgrading the Wazuh manager <upgrading_wazuh_server>`
  - :ref:`Upgrading Open Distro for Elasticsearch <upgrading_open_distro>`