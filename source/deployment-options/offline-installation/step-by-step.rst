Install Wazuh components step by step
-------------------------------------

#. Navigate to the directory containing ``wazuh-offline.tar.gz`` and ``wazuh-install-files.tar``, then run the following command to decompress the installation files:

   .. code-block:: console

      # tar xf wazuh-offline.tar.gz
      # tar xf wazuh-install-files.tar

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Install and configure the Wazuh indexer nodes.

The following dependencies must be installed on the Wazuh indexer nodes.

.. tabs::

   .. group-tab:: RPM

      -  coreutils

   .. group-tab:: DEB

      -  debconf
      -  adduser
      -  procps

#. Run the following commands to install the Wazuh indexer.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-indexer*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-indexer*.deb

#. Run the following commands, replacing ``<INDEXER_NODE_NAME>`` with the name of the Wazuh indexer node you are configuring as defined in the ``config.yml`` file. For example, ``indexer``. This deploys the SSL certificates to encrypt communications between the Wazuh central components.

   .. code-block:: console

      # NODE_NAME=<INDEXER_NODE_NAME>

   .. code-block:: console

      # mkdir /etc/wazuh-indexer/certs
      # mv -n wazuh-install-files/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # mv -n wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # mv wazuh-install-files/admin-key.pem /etc/wazuh-indexer/certs/
      # mv wazuh-install-files/admin.pem /etc/wazuh-indexer/certs/
      # cp wazuh-install-files/root-ca.pem /etc/wazuh-indexer/certs/
      # chmod 500 /etc/wazuh-indexer/certs
      # chmod 400 /etc/wazuh-indexer/certs/*
      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

   Here, you move the node certificate and key files, such as ``indexer.pem`` and ``indexer-key.pem``, to their corresponding ``certs`` folder. They are specific to the node and are not required on the other nodes. However, note that the ``root-ca.pem`` certificate isn't moved but copied to the ``certs`` folder. This way, you can continue deploying it to other component folders in the next steps.

#. Edit ``/etc/wazuh-indexer/opensearch.yml`` and replace the following values:

   #. ``network.host``: Sets the address of this node for both HTTP and transport traffic. The node will bind to this address and will also use it as its publish address. Accepts an IP address or a hostname.

      Use the same node address set in the ``config.yml`` file to create the SSL certificates.

   #. ``node.name``: Name of the Wazuh indexer node as defined in the ``config.yml`` file. For example, ``indexer``.

   #. ``cluster.initial_master_nodes``: List of the names of the master-eligible nodes. These names are defined in the ``config.yml`` file. Uncomment the ``indexer-2`` and ``indexer-3`` lines, change the names, or add more lines, according to your ``config.yml`` file definitions.

      .. code-block:: yaml

         cluster.initial_master_nodes:
         - "indexer"
         - "indexer-2"
         - "indexer-3"

   #. ``discovery.seed_hosts``: List of the addresses of the master-eligible nodes. Each element can be either an IP address or a hostname. You can leave this setting commented if you are configuring the Wazuh indexer as a single-node. For multi-node configurations, uncomment this setting and set your master-eligible node addresses.

      .. code-block:: yaml

         discovery.seed_hosts:
           - "10.0.0.1"
           - "10.0.0.2"
           - "10.0.0.3"

   #. ``plugins.security.nodes_dn``: List of the Distinguished Names of the certificates of all the Wazuh indexer cluster nodes. Uncomment the lines for ``indexer-2`` and ``indexer-3`` and change the common names (CN) and values according to your settings and your ``config.yml`` file definitions.

      .. code-block:: yaml

         plugins.security.nodes_dn:
         - "CN=indexer,OU=Wazuh,O=Wazuh,L=California,C=US"
         - "CN=indexer-2,OU=Wazuh,O=Wazuh,L=California,C=US"
         - "CN=indexer-3,OU=Wazuh,O=Wazuh,L=California,C=US"

#. Enable and start the Wazuh indexer service.

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

#. For multi-node clusters, repeat the previous steps on every Wazuh indexer node.

#. After all Wazuh indexer nodes are running, run ``indexer-security-init.sh`` on any indexer node to load the new certificate information and start the cluster.

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

#. Run the following command to check that the installation is successful. Note that this command uses ``127.0.0.1``, set your Wazuh indexer address if necessary.

   .. code-block:: console

      # curl -XGET https://127.0.0.1:9200 -u admin:admin -k

   The following is an example response.

   .. code-block:: none
      :class: output

      {
        "name" : "indexer",
        "cluster_name" : "wazuh-cluster",
        "cluster_uuid" : "bMp5Us0Asa2kNzabFJ97jg",
        "version" : {
          "distribution" : "opensearch",
          "number" : "3.5.0",
          "build_type" : "deb",
          "build_hash" : "d1b7e0374671e8d137cebcbd26fef5bd23bcada40",
          "build_date" : "2026-04-15T15:38:52.077964284Z",
          "build_snapshot" : false,
          "lucene_version" : "10.3.2",
          "minimum_wire_compatibility_version" : "2.19.0",
          "minimum_index_compatibility_version" : "2.0.0"
        },
        "tagline" : "The OpenSearch Project: https://opensearch.org/"
      }

Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: RPM

      On systems with ``yum`` as the package manager, the following dependencies must be installed on the Wazuh manager nodes.

      -  libcap

   .. group-tab:: DEB

      On systems with ``apt`` as the package manager, the following dependencies must be installed on the Wazuh manager nodes.

      -  apt-transport-https
      -  gnupg

#. Run the following commands to install the Wazuh manager.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-manager*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-manager*.deb

#. Run the following commands, replacing ``<MANAGER_NODE_NAME>`` with the name of the Wazuh manager node you are configuring as defined in the ``config.yml`` file. For example, ``manager``. This deploys the SSL certificates to encrypt communications between the Wazuh central components.

   .. code-block:: console

      # NODE_NAME=<MANAGER_NODE_NAME>

   .. code-block:: console

      # mkdir -p /var/wazuh-manager/etc/certs
      # cp ./wazuh-install-files/root-ca.pem /var/wazuh-manager/etc/certs/root-ca.pem
      # mv ./wazuh-install-files/$NODE_NAME.pem /var/wazuh-manager/etc/certs/manager.pem
      # mv ./wazuh-install-files/$NODE_NAME-key.pem /var/wazuh-manager/etc/certs/manager-key.pem
      # chmod 500 /var/wazuh-manager/etc/certs
      # chmod 400 /var/wazuh-manager/etc/certs/*
      # chown -R wazuh-manager:wazuh-manager /var/wazuh-manager/etc/certs

#. Save the Wazuh indexer username and password into the Wazuh manager keystore using the ``wazuh-keystore`` tool:

   .. code-block:: console

      # echo '<INDEXER_USERNAME>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k username
      # echo '<INDEXER_PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password

   .. note::

      The default offline-installation credentials are ``admin``:``admin``.

#. Update the indexer configuration in ``/var/wazuh-manager/etc/wazuh-manager.conf`` to specify the indexer IP address:

   .. code-block:: xml

      <indexer>
      <hosts>
          <host>https://127.0.0.1:9200</host>
      </hosts>
      <ssl>
          <certificate_authorities>
          <ca>/var/wazuh-manager/etc/certs/root-ca.pem</ca>
          </certificate_authorities>
          <certificate>/var/wazuh-manager/etc/certs/manager.pem</certificate>
          <key>/var/wazuh-manager/etc/certs/manager-key.pem</key>
      </ssl>
      </indexer>

#. Enable and start the Wazuh manager service.

   .. include:: /_templates/installations/wazuh/common/enable_wazuh_manager_service.rst

#. Run the following command to verify that the Wazuh manager status is active.

   .. include:: /_templates/installations/wazuh/common/check_wazuh_manager.rst

Wazuh cluster configuration for multi-node deployment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After completing the installation of the Wazuh manager on every node, you must configure one manager node as the master and the rest as workers.

Configuring the Wazuh manager master node
"""""""""""""""""""""""""""""""""""""""""

#. Edit the following settings in the ``/var/wazuh-manager/etc/wazuh-manager.conf`` configuration file. Replace ``<WAZUH_MASTER_NODE_ADDRESS>`` with the IP address of the master node.

   .. include:: /_templates/installations/manager/configure_wazuh_master_node.rst

#. Restart the Wazuh manager.

   .. include:: /_templates/installations/manager/restart_wazuh_manager.rst

   Repeat these configuration steps for every Wazuh manager worker node in your cluster.

Testing Wazuh manager cluster
"""""""""""""""""""""""""""""

To verify that the Wazuh cluster is enabled and all the nodes are connected, run the following command:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -l

The command returns output similar to the following example:

.. code-block:: none
   :class: output

   NAME         TYPE    VERSION  ADDRESS
   master-node  master  5.0.0   10.0.0.3
   worker-node1 worker  5.0.0   10.0.0.4
   worker-node2 worker  5.0.0   10.0.0.5

Note that ``10.0.0.3``, ``10.0.0.4``, ``10.0.0.5`` are example IPs.

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The following dependencies must be installed on the Wazuh dashboard node.

.. tabs::

   .. group-tab:: RPM

      -  libcap

   .. group-tab:: DEB

      -  debhelper version 9 or later
      -  tar
      -  curl
      -  libcap2-bin

#. Run the following commands to install the Wazuh dashboard.

   .. tabs::

      .. group-tab:: RPM

         .. code-block:: console

            # rpm -ivh ./wazuh-offline/wazuh-packages/wazuh-dashboard*.rpm

      .. group-tab:: DEB

         .. code-block:: console

            # dpkg -i ./wazuh-offline/wazuh-packages/wazuh-dashboard*.deb

#. Replace ``<DASHBOARD_NODE_NAME>`` with your Wazuh dashboard node name, the same used in the ``config.yml`` file to create the certificates. For example, ``dashboard``. Then, move the certificates to their corresponding location.

   .. code-block:: console

      # NODE_NAME=<DASHBOARD_NODE_NAME>

   .. code-block:: console

      # mkdir /etc/wazuh-dashboard/certs
      # mv -n wazuh-install-files/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
      # mv -n wazuh-install-files/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
      # cp wazuh-install-files/root-ca.pem /etc/wazuh-dashboard/certs/
      # chmod 500 /etc/wazuh-dashboard/certs
      # chmod 400 /etc/wazuh-dashboard/certs/*
      # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file and replace the following values:

   -  ``server.host``: This setting specifies the host of the Wazuh dashboard server. To allow remote users to connect, set the value to the IP address or DNS name of the Wazuh dashboard. The value ``0.0.0.0`` will accept all the available IP addresses of the host.
   -  ``opensearch.hosts``: The URLs of the Wazuh indexer instances to use for all your queries. The Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The addresses of the nodes can be separated by commas. For example, ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``.
   -  ``wazuh_core.hosts``: The Wazuh manager hosts that the dashboard will use to query the Wazuh manager API. At least one host is required. Each host entry is defined with a unique ID and must include:

      -  ``url``: The URL to the server API, including the protocol and address (DNS or IP).
      -  ``port``: The port where it is served.
      -  ``username``: The user who runs the requests.
      -  ``password``: The password for the user.
      -  ``run_as``: This defines how the dashboard requests the data, using the default configured account (false) or the current user's context (true).

   .. code-block:: yaml

      server.host: 0.0.0.0
      server.port: 443
      opensearch.hosts: https://localhost:9200
      opensearch.ssl.verificationMode: certificate
      ---
      wazuh_core.hosts:
      default:
          url: https://localhost
          port: 55000
          username: wazuh-wui
          password: wazuh-wui
          run_as: false

#. Enable and start the Wazuh dashboard service:

   .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#. Run the following command to verify the Wazuh dashboard service is active.

   .. include:: /_templates/installations/wazuh/common/check_wazuh_dashboard.rst

#. Access the Wazuh web interface.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: ``admin``

Upon first accessing the Wazuh dashboard, the browser displays a warning that a trusted authority did not issue the certificate. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported into the browser's certificate manager. Alternatively, a certificate from a trusted authority can be configured.

Securing your Wazuh installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You have now installed and configured all the Wazuh central components. We recommend changing the default credentials to protect your infrastructure.

The Wazuh passwords tool is available at ``/usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh``. Alternatively, you can download it by running the following command:

.. code-block:: console

   # wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh

.. note::

   For distributed deployments, use the Wazuh passwords tool on *any Wazuh indexer node*.

Changing the password for a Wazuh indexer user
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Wazuh indexer users are defined in ``/etc/wazuh-indexer/opensearch-security/internal_users.yml``. To change the password for a Wazuh indexer user, run the script with the ``-u`` option and indicate the new password with the ``-p`` option.

The password must have a length between 8 and 64 characters and contain at least one uppercase letter, one lowercase letter, a number, and one of the following symbols: ``.*+?-``.

.. code-block:: console

   # bash wazuh-passwords-tool.sh -u <USER> [-p <PASSWORD>]

Where ``<USER>`` is the name of the user whose password you want to change and ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool generates a random password.

For example, to change the password of the ``admin`` user to ``Secr3tP4ssw*rd``, run the following command:

.. code-block:: console

   # bash wazuh-passwords-tool.sh -u admin -p Secr3tP4ssw*rd

.. code-block:: none
   :class: output

   INFO: Generating password hash
   WARNING: Password changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.

Changing the password for a Wazuh manager API user
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To change the password for a Wazuh API user, use the following syntax:

.. code-block:: console

   # bash wazuh-passwords-tool.sh -A -au <API_ADMIN_USER> -ap <API_ADMIN_PASSWORD> -u <USER> [-p <PASSWORD>]

Where ``<API_ADMIN_USERNAME>`` and ``<API_ADMIN_PASSWORD>`` are the Wazuh manager API administrator user and password, respectively. ``<USER>`` is the name of the user whose password you want to change, and ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool will generate a random password.

For example, to change the password of the ``wazuh`` user to ``Hello*123``, run the following command:

.. code-block:: console

   # bash wazuh-passwords-tool.sh -A -au wazuh -ap wazuh -u wazuh -p Hello*123

.. code-block:: none
   :class: output

   INFO: The password for Wazuh API user wazuh is Hello*123

Next steps
^^^^^^^^^^

Once the Wazuh environment is ready, Wazuh agents can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` installation section.

To uninstall all the Wazuh central components, see the :doc:`Uninstalling the Wazuh central components </installation-guide/uninstalling-wazuh/central-components>` section.
