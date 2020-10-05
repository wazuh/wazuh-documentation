.. Copyright (C) 2020 Wazuh, Inc.

.. _virtual_machine:

Virtual Machine (OVA)
=====================

Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox (where installed) and other OVA compatible virtualization systems.

.. note::

  This VM only runs on 64-bit systems and is not recommended for use in production environments. It can be a useful tool for proofs of concept and labs. Multitier server and multi-node Elastic Stack clusters are usually a better fit for production environments where higher performance is required.

This virtual appliance, available `here <https://packages.wazuh.com/vm/wazuh|WAZUH_LATEST_OVA|_|ELASTICSEARCH_LATEST_OVA|.ova>`_, contains the following components:

    - CentOS 7
    - Wazuh manager: |WAZUH_LATEST_OVA|
    - Open Distro for Elasticsearch: |ELASTICSEARCH_LATEST_OVA|
    - Filebeat-OSS: |ELASTICSEARCH_LATEST_OVA|
    - Open Distro for Kibana: |ELASTICSEARCH_LATEST_OVA|
    - Wazuh Kibana plugin: |WAZUH_LATEST_OVA|-|ELASTICSEARCH_LATEST_OVA|

First, import the OVA in the virtualization platform and run the virtual machine. The ``root`` password is ``wazuh`` and the username/password for the Wazuh API is ``wazuh/wazuh``. The `following video <https://www.youtube.com/watch?v=uijZuneDPPk>`_ explains how to import and execute the virtual machine.

The virtual machine is pre-configured to work without modifying any settings of its components. Nevertheless, they can be totally con

Although there is no need to change any Elastic Stack configuration settings, feel free to explore the options. Elasticsearch is installed in ``/usr/share/elasticsearch``. Similarly, Filebeat is installed in ``/usr/share/filebeat`` and its configuration file is found in ``/etc/filebeat/filebeat.yml``.

In case of using VirtualBox, once the virtual machine is imported it may run into issues caused by time skew when VirtualBox synchronizes the time of the guest machine. To prevent this situation it is recommended to enable the ``Hardware Clock in UTC Time`` option on the ``System`` tab of the virtual machine's settings.

All the components included in this virtual image are configured to work out of the box. The next step of the process is to :ref:`deploy the Wazuh agents <installation_agents>` on the systems to be monitored.

.. note::
  By default the type of the network interface is bridge. The VM will try to get an IP address from the network's DHCP server. Alternatively, a static IP address can be set by configuring the proper network files on the CentOS operating system that the virtual machine is based on.

In order to connect to the Kibana web user interface, login with ``https://OVA_IP_ADDRESS``.

Upgrading the VM
----------------

The virtual machine can be upgraded as a tradicional installation:

  - :ref:`Upgrading the Wazuh manager <upgrading_wazuh_server>`
  - :ref:`Upgrading Open Distro for Elasticsearch, Filebeat-OSS and Kibana <upgrading_open_distro>`
