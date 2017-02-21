.. _virtual_machines:

Virtual Machine
==============================================

We provide a pre-built virtual machine image (OVA) that you can import into most virtualization systems.

1. This virtual appliance contains the following components:

    - CentOS 7
    - Wazuh 1.1.1
    - RESTful API 1.2.1
    - Elasticsearch 2
    - Logstash 2.1
    - Kibana 4.5

2. The virtual appliance is provided as an OVA which you can import into most virtualization systems.  We recommend using VirtualBox which can import the OVA image directly. We used VirtualBox to create this appliance and the OVA.

.. note::
   This VM can be run only on 64-bit systems.

3. Download wazuh-virtual-appliance.ova from https://packages.wazuh.com/vm

::

4. Import wazuh-virtual-appliance.ova with your virtualization manager.

::

5. In this virtual appliance, the default username and default password are both "**wazuhelk**".  Where other usernames are used, like "root", use the specific username with a password of "**wazuhelk**".  With these credentials you should be able to login as Linux users "root" and "user", access the Kibana interface, and use the Wazuh API.

:: 

6. Although you don't need to change any Elastic Stack configuration settings, feel free to explore.  The Elasticsearch system is installed in ``/usr/share/elasticsearch`` and the main configuration files are ``/etc/elasticsearch/elasticsearch.yml`` and ``/etc/sysconfig/elasticsearch``. Similarly, Logstash is installed in ``/usr/share/logstash`` and its config directory is ``/etc/logstash/conf.d/``.

::

7. **Wazuh Manager** and the **Elastic Stack** stack are configured to work out of the box.  To install the Wazuh agents and connect them to your virtual appliance, see: `How to install Wazuh agents <installation_agents>`_.  Note that this virtual appliance is using a single-server architecture.

.. warning::
  Before installing any Wazuh agents, change the VM's network interface type from NAT - the factory default - to bridged so that it will be reachable to your network.  By default, the VM will try to get an IP address from your network's DHCP server.  Alternatively, you can set a static IP for the VM by configuring the network files on the CentOS system as you would any other Red Hat derived Linux system.

8. You can start and stop wazuh-manager, elasticsearch, logstash, and kibana with the 'systemctl' command. Examples ::

    systemctl restart wazuh-manager
    systemctl stop elasticsearch
    systemctl start logstash
    systemctl status kibana
