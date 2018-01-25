.. _virtual_machine:

Virtual Machine
===============

We provide a pre-built virtual machine image (OVA) you can directly import using VirtualBox (where installed) and other OVA compatible virtualization systems as well.

.. note::  This VM only runs on 64-bit systems and is not recommended for use in production environments. It can be a useful tool for proofs of concept and labs. Distributed architectures and multi-node Elastic Stack clusters are usually a better fit for production environments where higher performance is required.

1. This virtual appliance, available at https://packages.wazuh.com/vm/wazuh3.1.0_6.1.1.ova, contains the following components:

    - CentOS 7
    - Wazuh 3.1.0-1
    - RESTful API 3.1.0-1
    - Elasticsearch 6.1.1
    - Logstash 6.1.1
    - Kibana 6.1.1 port "**5601**""
    - WazuhAPP 3.1.0_6.1.1

2. Import the OVA in your virtualization platform and run the virtual machine. The root password is "**wazuh**" and the username/password for the Wazuh API is "**foo/bar**".

  Although you don't need to change any Elastic Stack configuration settings, feel free to explore the options. You can find Elasticsearch installed in ``/usr/share/elasticsearch``. Similarly, Logstash is installed in ``/usr/share/logstash`` and the directory of its configuration file is ``/etc/logstash/conf.d/``.

3. **Wazuh Manager** and the **Elastic Stack** are configured to work out of the box. The next step will be deploying Wazuh agents on the systems that you intend to monitor.  Once installed, connect them to your virtual appliance. More documentation at:

    - `How to install Wazuh agents <installation-wazuh-agent>`_.

  .. warning:: Before connecting any Wazuh agent, change the VM's network interface type from NAT (the factory default) to bridge for communication with your network. By default, the VM will try to get an IP address from your network's DHCP server. Alternatively, you can set a static IP address by configuring the proper network files on the CentOS operating system that the virtual machine is based on.

4. You can start and stop wazuh-manager, wazuh-api, elasticsearch, logstash, and kibana with the 'systemctl' command. For example:

  .. code-block:: console

    # systemctl restart wazuh-manager
    # systemctl restart wazuh-api
    # systemctl stop elasticsearch
    # systemctl start logstash
    # systemctl status kibana

5. In order to connect to the Kibana web user interface, login with http://OVA_IP_ADRESS:5601 (where ``OVA_IP_ADDRESS`` is your system IP).
