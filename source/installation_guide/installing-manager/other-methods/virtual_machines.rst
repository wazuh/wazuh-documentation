.. _virtual_machines:

Virtual Machines
==============================================

We provide a pre-built virtual machine image (OVA) that you can import in most of the virtualization systems.

WAZUH Virtual Appliance
----------------------------------------------

The virtual machine image can be found at https://packages.wazuh.com/vm

1. This virtual appliance contains the following facilities:

    - CentOS 7
    - Wazuh 1.1.1
    - ESTful API 1.2.1
    - Elasticsearch 2
    - Logstash 2.1
    - Kibana 4.5

2. The virtual appliance is provided as an OVA which you can import into most of the virtual systems.  We recommend using VirtualBox which can import the OVA image directly. We used VirtualBox to create this appliance and the OVA.

.. note::
   The VM can only be run on 64 bit systems.

3. To open the appliance, unzip the package with gunzip then open the wazuh-virtual-appliance.ova in VirtualBox / VMWare.

4. The password and/or user if needed for all the accounts on this system including root, user, Kibana interface and Wazuh API is "**wazuhelk**".

5. Although you don't have to change any ELK configuration settings, if you want to explore, the Elasticsearch system is installed in ``/usr/share/elasticsearch`` and the main configuration files are ``/etc/elasticsearch/elasticsearch.yml`` and ``/etc/sysconfig/elasticsearch``. Similarly, Logstash is installed in ``/usr/share/logstash``.

7. **Wazuh** and the **ELK** (Elasticsearch-Logstash-Kibana) stack are all configured to work out of the box.  There are copies of Wazuh agent for Linux and Windows that you can push out to systems that you want to monitor More info: `How to install Wazuh agents <installation_agents>`_.

.. warning::
  Before installing a Wazuh agent, make sure you change the VM network interface from NAT - the factory default - to bridged so that you will get an IP address from you network's DHCP server or set a static IP in the VM by configuring the network files on the CentOS system as you would any other Redhat derived Linux system.

8. You can start and stop wazuh-manager, elasticsearch, logstash with the 'service' command. Examples ::

    service wazuh-manager start
    service elasticsearch start
    service logstash start
