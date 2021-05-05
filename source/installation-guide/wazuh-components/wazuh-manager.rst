.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_manager:


Wazuh manager
=============

This document will go through the installation of the Wazuh manager.

.. note:: Root user privileges are required to run all the commands described below.

Installing the Wazuh manager
----------------------------

The Wazuh manager collects and analyzes data from the deployed Wazuh agents. The first step to set up Wazuh is adding the Wazuh's repository to the server, alternatively, all the available packages can be found :ref:`here <packages>`. 

Adding the Wazuh repository
---------------------------

.. tabs::


  .. group-tab:: Yum


    .. include:: ../../_templates/installations/wazuh/yum/add_repository.rst



  .. group-tab:: APT


    .. include:: ../../_templates/installations/wazuh/deb/add_repository.rst



  .. group-tab:: ZYpp


    .. include:: ../../_templates/installations/wazuh/zypp/add_repository.rst



Installing the Wazuh manager
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Wazuh manager package:

    .. tabs::


      .. group-tab:: Yum


        .. include:: ../../_templates/installations/wazuh/yum/install_wazuh_manager.rst



      .. group-tab:: APT


        .. include:: ../../_templates/installations/wazuh/deb/install_wazuh_manager.rst



      .. group-tab:: ZYpp


        .. include:: ../../_templates/installations/wazuh/zypp/install_wazuh_manager.rst


#. Enable and start the Wazuh manager service:

    .. include:: ../../_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to check if the Wazuh manager is active: 

    .. include:: ../../_templates/installations/wazuh/common/check_wazuh_manager.rst

.. _wazuh_server_single_node_filebeat:

Configure the Wazuh forwarder
-----------------------------

#. Edit the file ``/usr/share/wazuh-manager/filebeat/filebeat.yml``:

    .. include:: ../../_templates/installations/elastic/common/configure_filebeat.rst

To ensure that the Wazuh forwarder has been successfully installed and configured, run the following command:

    .. code-block:: console

      # /usr/share/wazuh-manager/filebeat test output

An example response should look as follows:

.. code-block:: none
             :class: output

              elasticsearch: https://127.0.0.1:9200...
                parse url... OK
                connection...
                  parse host... OK
                  dns lookup... OK
                  addresses: 127.0.0.1
                  dial up... OK
                TLS...
                  security: server's certificate chain verification is enabled
                  handshake... OK
                  TLS version: TLSv1.3
                  dial up... OK
                talk to server... OK
                version: 7.10.0

To uninstall the Wazuh manager, visit the :ref:`uninstalling section <user_manual_uninstall_wazuh_installation_open_distro>`.

Next steps
----------

The next step consists of :ref:`installing Kibana <kibana>`.
