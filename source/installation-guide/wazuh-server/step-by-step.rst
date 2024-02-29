.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server is in charge of analyzing the data received from the Wazuh agents. Install the Wazuh server in a single-node or multi-node configuration according to your environment needs.

Installing the Wazuh server step by step
========================================

Install and configure the Wazuh server as a single-node or multi-node cluster following step-by-step instructions. The Wazuh server is a central component that includes the Wazuh manager and Filebeat. The Wazuh manager collects and analyzes data from the deployed Wazuh agents. It triggers alerts when threats or anomalies are detected. Filebeat securely forwards alerts and archived events to the Wazuh indexer.

The installation process is divided into two stages.

#. Wazuh server node installation

#. Cluster configuration for multi-node deployment

.. note:: You need root user privileges to run all the commands described below.

1. Wazuh server node installation
----------------------------------
.. raw:: html

  <div class="accordion-section open">

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    If you are installing the Wazuh server on the same host as the Wazuh indexer, you may skip these steps as you may have added the Wazuh repository already.

  ..
    Add the Wazuh repository to download the official Wazuh packages. As an alternative, you can download the Wazuh packages directly from :doc:`../packages-list`.

  .. tabs::


    .. group-tab:: Yum


      .. include:: /_templates/installations/common/yum/add-repository.rst



    .. group-tab:: APT


      .. include:: /_templates/installations/common/deb/add-repository.rst




Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Install the Wazuh manager package.

     .. tabs::

        .. group-tab:: Yum

           .. code-block:: console

              # yum -y install wazuh-manager|WAZUH_MANAGER_RPM_PKG_INSTALL|

        .. group-tab:: APT

           .. code-block:: console

              # apt-get -y install wazuh-manager|WAZUH_MANAGER_DEB_PKG_INSTALL|

  #. Save the Wazuh indexer username and password into the Wazuh manager keystore using the wazuh-keystore tool: 

     .. code-block:: console

        # /var/ossec/bin/wazuh-keystore -f indexer -k username -v <INDEXER_USERNAME>
        # /var/ossec/bin/wazuh-keystore -f indexer -k password -v <INDEXER_PASSWORD>   

     .. note:: The default step-by-step installation credentials are ``admin``:``admin``

  #. Configure indexer connection

    Edit ``/var/ossec/etc/ossec.conf`` to configure the indexer connection. Set your host indexer IP address and port. You can skip this step if you are not going to use the vulnerability detection capability. For example:

    .. code-block:: console

      <indexer>
        <enabled>yes</enabled>
        <hosts>
          <host>https://0.0.0.0:9200</host> <!-- Replace with your indexer IP address and PORT -->
        </hosts>
        <ssl>
          <certificate_authorities>
            <ca>/etc/filebeat/certs/root-ca.pem</ca>
          </certificate_authorities>
          <certificate>/etc/filebeat/certs/filebeat.pem</certificate>
          <key>/etc/filebeat/certs/filebeat-key.pem</key>
        </ssl>
      </indexer>

  #. Enable and start the Wazuh manager service.

     .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

  #. Run the following command to verify the Wazuh manager status.

     .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

.. _wazuh_server_multi_node_filebeat:

Installing Filebeat
^^^^^^^^^^^^^^^^^^^

  #. Install the Filebeat package.

      .. tabs::


        .. group-tab:: Yum


          .. include:: /_templates/installations/filebeat/common/yum/install_filebeat.rst



        .. group-tab:: APT


          .. include:: /_templates/installations/filebeat/common/apt/install_filebeat.rst



Configuring Filebeat
^^^^^^^^^^^^^^^^^^^^

  #. Download the preconfigured Filebeat configuration file.

      .. code-block:: console

        # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/tpl/wazuh/filebeat/filebeat.yml


  #. Edit the ``/etc/filebeat/filebeat.yml`` configuration file and replace the following value:

     .. include:: /_templates/installations/filebeat/opensearch/configure_filebeat.rst

  #. Create a Filebeat keystore to securely store authentication credentials.

      .. code-block:: console

        # filebeat keystore create

  #. Add the default username and password ``admin``:``admin`` to the secrets keystore.

      .. code-block:: console

        # echo admin | filebeat keystore add username --stdin --force
        # echo admin | filebeat keystore add password --stdin --force

  #. Download the alerts template for the Wazuh indexer.

     .. code-block:: console

        # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v|WAZUH_CURRENT|/extensions/elasticsearch/7.x/wazuh-template.json
        # chmod go+r /etc/filebeat/wazuh-template.json

  #. Install the Wazuh module for Filebeat.

      .. code-block:: console

        # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.4.tar.gz | tar -xvz -C /usr/share/filebeat/module

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    Make sure that a copy of the ``wazuh-certificates.tar`` file, created during the initial configuration step, is placed in your working directory.

  #. Replace ``<server-node-name>`` with your Wazuh server node certificate name, the same one used in ``config.yml`` when creating the certificates. Then, move the certificates to their corresponding location.

      .. include:: /_templates/installations/filebeat/opensearch/copy_certificates_filebeat_wazuh_cluster.rst


Starting the Filebeat service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Filebeat service.

      .. include:: /_templates/installations/filebeat/common/enable_filebeat.rst

  #. Run the following command to verify that Filebeat is successfully installed.

     .. code-block:: console

        # filebeat test output

     Expand the output to see an example response.

     .. code-block:: none
          :class: output accordion-output

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
            version: 7.10.2


Your Wazuh server node is now successfully installed. Repeat this stage of the installation process for every Wazuh server node in your Wazuh cluster, then proceed with configuring the Wazuh cluster. If you want a Wazuh server single-node cluster, everything is set and you can proceed directly with :doc:`../wazuh-dashboard/step-by-step`.

2. Cluster configuration for multi-node deployment
--------------------------------------------------
.. raw:: html

  <div class="accordion-section">

After completing the installation of the Wazuh server on every node, you need to configure one server node only as the master and the rest as workers.

.. _wazuh_server_master_node:

Configuring the Wazuh server master node
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Edit the following settings in the ``/var/ossec/etc/ossec.conf`` configuration file.

      .. include:: /_templates/installations/manager/configure_wazuh_master_node.rst

  #. Restart the Wazuh manager.

      .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

.. _wazuh_server_worker_nodes:

Configuring the Wazuh server worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. .. include:: /_templates/installations/manager/configure_wazuh_worker_node.rst

  #. Restart the Wazuh manager.

      .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

  Repeat these configuration steps for every Wazuh server worker node in your cluster.

Testing Wazuh server cluster
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To verify that the Wazuh cluster is enabled and all the nodes are connected, execute the following command:

  .. code-block:: console

    # /var/ossec/bin/cluster_control -l

An example output of the command looks as follows:

  .. code-block:: none
    :class: output

      NAME         TYPE    VERSION  ADDRESS
      master-node  master  |WAZUH_CURRENT|   10.0.0.3
      worker-node1 worker  |WAZUH_CURRENT|   10.0.0.4
      worker-node2 worker  |WAZUH_CURRENT|   10.0.0.5

Note that ``10.0.0.3``, ``10.0.0.4``, ``10.0.0.5`` are example IPs.

Next steps
----------

The Wazuh server installation is now complete, and you can proceed with :doc:`../wazuh-dashboard/step-by-step`.

If you want to uninstall the Wazuh server, see :ref:`uninstall_server`.
