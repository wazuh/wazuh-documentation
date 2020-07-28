.. Copyright (C) 2019 Wazuh, Inc.

.. _virtual_machine:

Virtual Machine
===============

Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox (where installed) and other OVA compatible virtualization systems.

.. note::

  This VM only runs on 64-bit systems and is not recommended for use in production environments. It can be a useful tool for proofs of concept and labs. Distributed architectures and multi-node Elastic Stack clusters are usually a better fit for production environments where higher performance is required.

1. This virtual appliance, available `here <https://packages.wazuh.com/vm/wazuh3.10.2_7.3.2.ova>`_, contains the following components:

  - CentOS 7
  - Wazuh 3.10.2
  - Wazuh API 3.10.2
  - Elasticsearch 7.3.2
  - Filebeat 7.3.2
  - Kibana 7.3.2
  - Wazuh app |WAZUH_LATEST|-7.3.2

2. Import the OVA in your virtualization platform and run the virtual machine. The root password is "**wazuh**" and the username/password for the Wazuh API is "**foo/bar**".

    Although you don't need to change any Elastic Stack configuration settings, feel free to explore the options. You can find Elasticsearch installed in ``/usr/share/elasticsearch``. Similarly, Filebeat is installed in ``/usr/share/filebeat`` and its configuration file is found in ``/etc/filebeat/filebeat.yml``.

3. The **Wazuh manager** and the **Elastic Stack** included in this virtual image are configured to work out of the box. The next step of the process is to deploy the Wazuh agents on the systems you intend to monitor. Once installed, connect them to your virtual appliance. More documentation can be found at:

    - :ref:`How to install Wazuh agents<installation_agents>`

  .. warning::

    Before connecting any of the Wazuh agents, change the VM's network interface type from NAT (the factory default) to bridge for communication with your network. By default, the VM will try to get an IP address from your network's DHCP server. Alternatively, you can set a static IP address by configuring the proper network files on the CentOS operating system that the virtual machine is based on.

4. You can start and stop wazuh-manager, wazuh-api, elasticsearch, filebeat, and kibana with the 'systemctl' command. For example:

    .. code-block:: console

      # systemctl restart wazuh-manager
      # systemctl restart wazuh-api
      # systemctl stop elasticsearch
      # systemctl start filebeat
      # systemctl status kibana

5. In order to connect to the Kibana web user interface, login with ``https://OVA_IP_ADDRESS`` (where ``OVA_IP_ADDRESS`` is your system IP).

    .. note::

      If you need to update your OVA virtual machine, you can check out :ref:`this article <upgrading_latest_minor>`. We also recommend updating the repositories using the ``yum update`` command.
