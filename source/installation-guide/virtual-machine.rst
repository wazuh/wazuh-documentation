.. Copyright (C) 2018 Wazuh, Inc.

.. _virtual_machine:

Virtual Machine
===============

Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox (where installed) and other OVA compatible virtualization systems.

.. note:: This VM only runs on 64-bit systems and is not recommended for use in production environments. It can be a useful tool for proofs of concept and labs. Distributed architectures and multi-node Elastic Stack clusters are usually a better fit for production environments where higher performance is required.

1. This virtual appliance, available `here <https://packages.wazuh.com/vm/wazuh3.7.2_6.5.3.ova>`_, contains the following components:

    - CentOS 7
    - Wazuh 3.7.2
    - Wazuh API 3.7.2
    - Elasticsearch 6.5.3
    - Logstash 6.5.3
    - Kibana 6.5.3
    - Wazuh app 3.7.2-6.5.3

2. Import the OVA in your virtualization platform and run the virtual machine. The root password is "**wazuh**" and the username/password for the Wazuh API is "**foo/bar**".

  Although you don't need to change any Elastic Stack configuration settings, feel free to explore the options. You can find Elasticsearch installed in ``/usr/share/elasticsearch``. Similarly, Logstash is installed in ``/usr/share/logstash`` and its configuration file is found in ``/etc/logstash/conf.d/``.

3. The **Wazuh Manager** and the **Elastic Stack** included in this virtual image are configured to work out of the box. The next step of the process is to deploy the Wazuh agents on the systems you intend to monitor. Once installed, connect them to your virtual appliance. More documentation can be found at:

    - :doc:`How to install Wazuh agents<installing-wazuh-agent/index>`

  .. warning:: Before connecting any of the Wazuh agents, change the VM's network interface type from NAT (the factory default) to bridge for communication with your network. By default, the VM will try to get an IP address from your network's DHCP server. Alternatively, you can set a static IP address by configuring the proper network files on the CentOS operating system that the virtual machine is based on.

4. You can start and stop wazuh-manager, wazuh-api, elasticsearch, logstash, and kibana with the 'systemctl' command. For example:

  .. code-block:: console

    # systemctl restart wazuh-manager
    # systemctl restart wazuh-api
    # systemctl stop elasticsearch
    # systemctl start logstash
    # systemctl status kibana

5. In order to connect to the Kibana web user interface, login with https://OVA_IP_ADRESS (where ``OVA_IP_ADRESS`` is your system IP).

.. note:: You can also download the virtual machine using the OVF format. You need to download the `OVF <https://packages.wazuh.com/vm/wazuh3.7.2_6.5.3.ovf>`_ file and the `vmdk <https://packages.wazuh.com/vm/wazuh3.7.2_6.5.3-disk1.vmdk>`_ disk.

.. note:: If you need to update your OVA virtual machine, you can check out :ref:`this article <upgrading_latest_minor>`. We also recommend updating the repositories using the ``yum update`` command.
