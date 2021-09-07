.. Copyright (C) 2020 Wazuh, Inc.

.. _virtual_machine:

Virtual machine
===============

Wazuh provides a pre-built virtual machine image (OVA) that you can directly import using VirtualBox (where installed) and other OVA compatible virtualization systems.

.. note::

  This VM only runs on 64-bit systems and is not recommended for use in production environments. It can be a useful tool for proofs of concept and labs. Distributed architectures and multi-node Elastic Stack clusters are usually a better fit for production environments where higher performance is required.

1. Download the `virtual appliance (OVA) <https://packages.wazuh.com/vm/wazuh|WAZUH_LATEST_OVA|_|ELASTICSEARCH_LATEST_OVA|.ova>`_ which contains the following components:

  - CentOS 7
  - Wazuh |WAZUH_LATEST_OVA|
  - Wazuh API |WAZUH_LATEST_OVA|
  - Elasticsearch |ELASTICSEARCH_LATEST_OVA|
  - Filebeat |ELASTICSEARCH_LATEST_OVA|
  - Kibana |ELASTICSEARCH_LATEST_OVA|
  - Wazuh app |WAZUH_LATEST_OVA|-|ELASTICSEARCH_LATEST_OVA|

2. Import the OVA in your virtualization platform and run the virtual machine. The root password is "**wazuh**" and the username/password for the Wazuh API is "**foo/bar**".

    Although you don't need to change any Elastic Stack configuration settings, feel free to explore the options. You can find Elasticsearch installed in ``/usr/share/elasticsearch``. Similarly, Filebeat is installed in ``/usr/share/filebeat`` and its configuration file is found in ``/etc/filebeat/filebeat.yml``.

    In case of using VirtualBox, once the virtual machine is imported it may run into issues caused by time skew when VirtualBox synchronizes the time of the guest machine. To prevent this situation it is recommended to enable the ``Hardware Clock in UTC Time`` option on the ``System`` tab of the virtual machine's settings.

3. The **Wazuh manager** and the **Elastic Stack** included in this virtual image are configured to work out of the box. The next step of the process is to deploy the Wazuh agents on the systems you intend to monitor. Once installed, connect them to your virtual appliance. More documentation can be found at:

    - :ref:`How to install Wazuh agents<installation_agents>`

  .. warning::
    By default the network interface type is bridge. The VM will try to get an IP address from the network's DHCP server. Alternatively, a static IP address can be set by configuring the proper network files on the CentOS operating system that the virtual machine is based on.

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
