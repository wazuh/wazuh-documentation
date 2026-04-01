.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to scale a Wazuh distributed deployment by adding new Wazuh server nodes.

.. _distributed-deployment:

Distributed deployment
======================

The distributed deployment refers to installing the Wazuh components as separate servers, following the step-by-step installation guide (applicable to the Wazuh :doc:`indexer </installation-guide/wazuh-indexer/step-by-step>`, :doc:`server </installation-guide/wazuh-server/step-by-step>`, and :doc:`dashboard </installation-guide/wazuh-dashboard/step-by-step>`) or using the install assistant (for the Wazuh :doc:`indexer </installation-guide/wazuh-indexer/installation-assistant>`, :doc:`server </installation-guide/wazuh-server/installation-assistant>`, and :doc:`dashboard </installation-guide/wazuh-dashboard/installation-assistant>`).

To scale your distributed deployment by adding a node, complete these steps:

-  `Certificate creation`_
-  `Configuring existing components to connect with the new node`_
-  `Wazuh server worker node(s) installation`_
-  `Testing the cluster`_

Certificate creation
--------------------

For a distributed deployment, certificates can be generated either by using the pre-existing root CA keys or by generating a new root CA along with a new set of certificates. We recommend using the existing root CA keys to maintain trust between nodes.

-  `Using pre-existing root CA key`_
-  `Generating new certificates`_

Using pre-existing root CA key
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform the steps below on your existing Wazuh server node to generate the certificates using the pre-existing root CA key.

.. note::

   You will require a copy of the ``<CERTIFICATE_ARCHIVE>.tar`` file created during the initial configuration for the :ref:`Wazuh indexer <certificates_creation>` in steps 4 and 5 or a copy of the root CA keys. If neither is available, you can generate new certificates by following the steps outlined in the next :ref:`section <generating_new_certificates>`.

#. Create a ``config.yml`` file in the ``/root`` directory to add the new Wazuh server node(s):

   .. code-block:: console

      # touch /root/config.yml

   Edit the ``/root/config.yml`` file to include the Wazuh server node name and IP address of the new node:

   .. code-block:: yaml
      :emphasize-lines: 4,5,7,8

      nodes:
        # Wazuh server nodes
        server:
          - name: <EXISTING_WAZUH_SERVER_NODE_NAME>
            ip: <EXISTING_WAZUH_SERVER_IP>
            node_type: master
          - name: <NEW_WAZUH_SERVER_NODE_NAME>
            ip: <NEW_WAZUH_SERVER_IP>
            node_type: worker

   Replace the values with your node names and their corresponding IP addresses.

   .. note::

      The existing Wazuh server node name and IP address can be found in the cluster section in ``/var/ossec/etc/ossec.conf`` of the  existing Wazuh server.

#. Extract the certificate archive to obtain the root CA keys:

   .. code-block:: console

      # mkdir wazuh-install-files && tar -xf ./<CERTIFICATE_ARCHIVE>.tar -C wazuh-install-files

   Replace ``<CERTIFICATE_ARCHIVE>.tar`` with the name of the compressed certificates generated during the certificate creation step. (for example, ``wazuh-certificates.tar`` or ``wazuh-install-files.tar``).

#. Download and run ``wazuh-certs-tool.sh`` to create the certificates for the new Wazuh server node using the pre-existing root CA keys:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A wazuh-install-files/root-ca.pem wazuh-install-files/root-ca.key

   .. code-block:: none
      :class: output

      23/01/2026 12:33:37 INFO: Generating Admin certificates.
      23/01/2026 12:33:37 INFO: Admin certificates created.
      23/01/2026 12:33:37 INFO: Generating Filebeat certificates.
      23/01/2026 12:34:38 INFO: Wazuh Filebeat certificates created.

#. Copy the newly created certificates to the ``wazuh-install-files`` directory. Make sure you do not replace the admin certificates:

   .. code-block:: console

      # cp wazuh-certificates/<NEW_WAZUH_SERVER_NODE_NAME>* wazuh-install-files
      # cp wazuh-certificates/<EXISTING_WAZUH_SERVER_NODE_NAME>* wazuh-install-files

#. Compress the certificates directory into a new ``<CERTIFICATE_ARCHIVE>.tar`` file and copy it to the new Wazuh server node(s). You can make use of the ``scp`` utility to securely copy the compressed file as follows:

   .. code-block:: console

      # tar -cvf ./<CERTIFICATE_ARCHIVE>.tar -C ./wazuh-install-files/ .
      # scp <CERTIFICATE_ARCHIVE>.tar <TARGET_USERNAME>@<TARGET_IP>:

   Replace ``<CERTIFICATE_ARCHIVE>.tar`` with the name of the compressed certificates generated during the certificate creation step. (for example, ``wazuh-certificates.tar`` or ``wazuh-install-files.tar``).

   .. note::

      The ``scp`` command copies the certificates to the ``/home`` directory of the target user on the endpoint. You can modify the command to specify a path to your installation directory.

.. _generating_new_certificates:

Generating new certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can follow the steps below to generate new certificates if the pre-existing root CA keys have been deleted or are inaccessible.

#. Create the ``/root/config.yml`` file to reference all your Wazuh server nodes:

   .. code-block:: yaml
      :emphasize-lines: 4,5,9,10,12,13,18,19

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: <WAZUH_INDEXER_NODE_NAME>
            ip: <WAZUH_INDEXER_IP>

        # Wazuh server nodes
        server:
          - name: <EXISTING_WAZUH_SERVER_NODE_NAME>
            ip: <EXISTING_WAZUH_SERVER_IP>
            node_type: master
          - name: <NEW_WAZUH_SERVER_NODE_NAME>
            ip: <NEW_WAZUH_SERVER_IP>
            node_type: worker

        # Wazuh dashboard nodes
        dashboard:
          - name: <WAZUH_DASHBOARD_NODE_NAME>
            ip: <WAZUH_DASHBOARD_IP>

   Replace the values with your node names and their corresponding IP addresses.

   .. note::

      The existing Wazuh server node name and IP address can be found in the cluster section of ``/var/ossec/etc/ossec.conf`` on the existing Wazuh server.

#. Download and execute the ``wazuh-certs-tool.sh`` script to create the certificates:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-certs-tool.sh
      # bash wazuh-certs-tool.sh -A

#. Compress the certificates folder and copy it to the new Wazuh indexer node(s). You can make use of the ``scp`` utility to securely copy the compressed file:

   .. code-block:: console

      # tar -cvf ./<CERTIFICATE_ARCHIVE>.tar -C ./wazuh-certificates/ .
      # scp <CERTIFICATE_ARCHIVE> <TARGET_USERNAME>@<TARGET_IP>:

   Replace ``<CERTIFICATE_ARCHIVE>.tar`` with the name you want to use for the compressed certificate archive (for example, ``wazuh-certificates.tar`` or ``wazuh-install-files.tar``).

   .. note::

      The ``scp`` command copies the certificates to the ``/home`` directory of the target user on the endpoint. You can modify the command to specify a path to your installation directory.

Configuring existing components to connect with the new node
------------------------------------------------------------

Before adding a new Wazuh server node, existing components must be adjusted to maintain proper cluster communication. This includes updating relevant configuration files and connection settings so the Wazuh manager, Wazuh indexer, and Wazuh dashboard can integrate the new node.

#. Deploy the Wazuh server certificates on your existing Wazuh server node by running the following commands. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with the node name of the Wazuh server you are configuring as defined in ``/root/config.yml``.

   .. code-block:: console

      # NODE_NAME=<EXISTING_WAZUH_SERVER_NODE_NAME>

   .. code-block:: console
      :emphasize-lines: 3

      # rm -rf /etc/filebeat/certs
      # mkdir /etc/filebeat/certs
      # tar -xf ./<CERTIFICATE_ARCHIVE>.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
      # chmod 500 /etc/filebeat/certs
      # chmod 400 /etc/filebeat/certs/*
      # chown -R root:root /etc/filebeat/certs

   .. note::

      If the certificates were recreated as recommended in the :ref:`note <generating_new_certificates>` above.

      You will also have to redeploy the certificates on all your existing Wazuh nodes (indexer and dashboard).

   After deploying the new certificate on the server, run the following commands to deploy the certificates to the Wazuh indexer and dashboard:

   -  On the Wazuh indexer node(s):

      .. code-block:: console

         # NODE_NAME=<WAZUH_INDEXER_NODE_NAME>

      .. code-block:: console
         :emphasize-lines: 3

         # rm -rf /etc/wazuh-indexer/certs
         # mkdir /etc/wazuh-indexer/certs
         # tar -xf ./<CERTIFICATE_ARCHIVE>.tar -C /etc/wazuh-indexer/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./admin.pem ./admin-key.pem ./root-ca.pem
         # mv -n /etc/wazuh-indexer/certs/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
         # mv -n /etc/wazuh-indexer/certs/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
         # chmod 500 /etc/wazuh-indexer/certs
         # chmod 400 /etc/wazuh-indexer/certs/*
         # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

   -  On the Wazuh dashboard node:

      .. code-block:: console

         # NODE_NAME=<WAZUH_DASHBOARD_NODE_NAME>

      .. code-block:: console
         :emphasize-lines: 3

         # rm -rf /etc/wazuh-dashboard/certs
         # mkdir /etc/wazuh-dashboard/certs
         # tar -xf ./<CERTIFICATE_ARCHIVE>.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
         # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME.pem /etc/wazuh-dashboard/certs/wazuh-dashboard.pem
         # mv -n /etc/wazuh-dashboard/certs/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/wazuh-dashboard-key.pem
         # chmod 500 /etc/wazuh-dashboard/certs
         # chmod 400 /etc/wazuh-dashboard/certs/*
         # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

   **Recommended action:** Securely save a copy offline for potential future use and scalability. You can  remove the ``<CERTIFICATE_ARCHIVE>.tar`` file on this node by running the command below to increase security:

   .. code-block:: console

      # rm -f ./<CERTIFICATE_ARCHIVE>.tar

#. Edit the Wazuh indexer configuration file at ``/etc/wazuh-indexer/opensearch.yml`` to specify the Wazuh indexer's IP address as specified in the ``/root/config.yml`` file:

   .. code-block:: yaml
      :emphasize-lines: 1,2,4

      network.host: "<WAZUH_INDEXER_IP>"
      node.name: "<WAZUH_INDEXER_NODE_NAME>"
      cluster.initial_master_nodes:
      - "<WAZUH_INDEXER_NODE_NAME>"

#. Edit the Filebeat configuration file ``/etc/filebeat/filebeat.yml`` (located in the Wazuh server node) to specify the indexer's IP address:

   .. code-block:: yaml
      :emphasize-lines: 2

      output.elasticsearchhosts:
              - <WAZUH_INDEXER_IP>:9200

   .. note::

      The structure of this section will vary depending on whether you installed Wazuh using the Wazuh installation assistant or the step-by-step guide. Here, we used the Wazuh installation assistant.

#. Generate an encryption key that will be used to encrypt communication between the Wazuh server cluster nodes:

   .. _generate_random_encryption_key_cluster:

   .. code-block:: console

      # openssl rand -hex 16

   Save the output of the above command, as it will be used later to configure cluster mode on both Wazuh server nodes.

#. Edit the configuration file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to include the Wazuh indexer node's IP address:

   .. code-block:: yaml

      opensearch.hosts: https://<WAZUH_INDEXER_IP>:9200

#. Edit the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file located in the Wazuh dashboard node and replace the ``url`` value with the IP address or hostname of the Wazuh server master node:

   .. code-block:: yaml
      :emphasize-lines: 3,6

      hosts:
        - default:
            url: https://<EXISTING_WAZUH_SERVER_IP>
            port: 55000
            username: wazuh-wui
            password: <WAZUH-WUI-PASSWORD>
            run_as: false

#. Edit the Wazuh server configuration file at ``/var/ossec/etc/ossec.conf`` to enable cluster mode:

   .. code-block:: xml
      :emphasize-lines: 3-5,9,12

      <cluster>
        <name>wazuh</name>
        <node_name><EXISTING_WAZUH_SERVER_NODE_NAME></node_name>
        <node_type>master</node_type>
        <key><ENCRYPTION_KEY></key>
        <port>1516</port>
        <bind_addr>0.0.0.0</bind_addr>
        <nodes>
            <node><MASTER_NODE_IP></node>
        </nodes>
        <hidden>no</hidden>
        <disabled>no</disabled>
      </cluster>

   The configurable fields in the above section of the ``var/ossec/etc/ossec.conf`` file are as follows:

   -  :ref:`<name> <cluster_name>` indicates the name of the cluster.
   -  :ref:`<node_name> <cluster_node_name>` indicates the name of the current node. Replace ``<EXISTING_WAZUH_SERVER_NODE_NAME>`` with the name of the existing Wazuh server node as specified in the ``/root/config.yml`` file.
   -  :ref:`<node_type> <cluster_node_type>` specifies the role of the node. It has to be set to master.
   -  :ref:`<key> <cluster_key>` represents a :ref:`key <generate_random_encryption_key_cluster>` used to encrypt communication between cluster nodes. It should be the same on all the server nodes. To generate a unique key, you can use the command ``openssl rand -hex 16``.
   -  :ref:`<port> <cluster_port>` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  :ref:`<bind_addr> <cluster_bind_addr>` is the network IP address to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP address).
   -  :ref:`<nodes> <cluster_nodes>` is the address of the master node and can be either an IP address or a DNS hostname. This parameter must be specified in all Wazuh server nodes, including the master itself. Replace ``<MASTER_NODE_IP>`` with the IP address of your master node.
   -  :ref:`<hidden> <cluster_hidden>` shows or hides the cluster information in the generated alerts.
   -  :ref:`<disabled> <cluster_disabled>` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

#. Run the following commands on your respective nodes to apply the changes.

   -  **Wazuh indexer node**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-indexer

         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-indexer restart

   -  **Wazuh server node(s)**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart filebeat
               # systemctl restart wazuh-manager

         .. group-tab:: SysV init

            .. code-block:: console

               # service filebeat restart
               # service wazuh-manager restart

   -  **Wazuh dashboard node**

      .. tabs::

         .. group-tab:: SystemD

            .. code-block:: console

               # systemctl restart wazuh-dashboard

         .. group-tab:: SysV init

            .. code-block:: console

               # service wazuh-dashboard restart

Wazuh server worker node(s) installation
-----------------------------------------

Once the certificates have been created and copied to the new node(s), you can proceed to install and configure the new Wazuh server as a worker node.

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This step ensures that the new Wazuh server node can download and install the required Wazuh packages from the official repository.

.. tabs::

   .. group-tab:: YUM

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

      #. Add the repository:

         -  For RHEL-compatible systems version 8 and earlier, use the following command:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/4.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

         -  For RHEL-compatible systems version 9 and later, use the following command:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/4.x/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

   .. group-tab:: APT

      #. Install the following packages if missing:

         .. code-block:: console

            # apt-get install gnupg apt-transport-https

      #. Install the GPG key:

         .. code-block:: console

            # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

      #. Add the repository:

         .. code-block:: console

            # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

      #. Update the packages' information:

         .. code-block:: console

            # apt-get update

Installing the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This step installs the Wazuh manager on the node, which enables it to function as part of the cluster and manage alerts, Wazuh agents, and internal communication.

#. Install the Wazuh manager package.

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum -y install wazuh-manager

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-manager

#. Enable and start the Wazuh manager service.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable wazuh-manager
            # systemctl start wazuh-manager

      .. group-tab:: SysV init

         -  RPM-based operating system:

            .. code-block:: console

               # chkconfig --add wazuh-manager
               # service wazuh-manager start

         -  Debian-based operating system:

            .. code-block:: console

               # update-rc.d wazuh-manager defaults 95 10
               # service wazuh-manager start

#. Check the Wazuh manager status to ensure it is up and running.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl status wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager status

Install and configure Filebeat
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Filebeat package.

   .. tabs::

      .. group-tab:: YUM

         .. code-block:: console

            # yum -y install filebeat

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install filebeat

#. Download the preconfigured Filebeat configuration file:

   .. code-block:: console

      # curl -so /etc/filebeat/filebeat.yml https://packages.wazuh.com/4.14/tpl/wazuh/filebeat/filebeat.yml

#. Edit the ``/etc/filebeat/filebeat.yml`` configuration file and replace the following value:

   -  ``hosts:`` which represents the list of Wazuh indexer nodes to connect to. You can use either IP addresses or hostnames. By default, the host is set to localhost ``hosts: ["127.0.0.1:9200"]``. Replace it with the IP address of your Wazuh indexer.

      If you have more than one Wazuh indexer node, you can separate the addresses using commas. For example, ``hosts: ["10.0.0.9:9200", "10.0.0.10:9200", "10.0.0.11:9200"]``:

   .. code-block:: yaml
      :emphasize-lines: 3

      # Wazuh - Filebeat configuration file
      output.elasticsearch:
        hosts: <WAZUH_INDEXER_IP>:9200
        protocol: https

#. Create a Filebeat keystore to securely store authentication credentials:

   .. code-block:: console

      # filebeat keystore create

#. Add the admin user and password to the secrets keystore:

   .. code-block:: console

      # echo admin | filebeat keystore add username --stdin --force
      # echo <ADMIN_PASSWORD> | filebeat keystore add password --stdin --force

   In case you are running an all-in-one deployment and using the default admin password, you could get it by running the following command:

   .. code-block:: console

      # sudo tar -O -xvf wazuh-install-files.tar wazuh-install-files/wazuh-passwords.txt

#. Download the alerts template for the Wazuh indexer:

   .. code-block:: console

      # curl -so /etc/filebeat/wazuh-template.json https://raw.githubusercontent.com/wazuh/wazuh/v4.14.2/extensions/elasticsearch/7.x/wazuh-template.json
      # chmod go+r /etc/filebeat/wazuh-template.json

#. Install the Wazuh module for Filebeat:

   .. code-block:: console

      # curl -s https://packages.wazuh.com/4.x/filebeat/wazuh-filebeat-0.4.tar.gz | tar -xvz -C /usr/share/filebeat/module

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^^

Before adding the new Wazuh server node, deploy the generated certificate archive on that node. This ensures that Filebeat can establish secure TLS communication with the Wazuh indexer and other required components.

Run the following commands in the directory where the ``wazuh-certificates.tar`` file was copied to, replacing ``<NEW_WAZUH_SERVER_NODE_NAME>`` with the name of the Wazuh server node you are configuring as defined in ``/root/config.yml``. This deploys the SSL certificates to encrypt communications between the Wazuh central components:

#. Create an environment variable to store the node name:

   .. code-block:: console

      NODE_NAME=<NEW_WAZUH_SERVER_NODE_NAME>

#. Deploy the certificates:

   .. code-block:: console

      # mkdir /etc/filebeat/certs
      # tar -xf ./wazuh-certificates.tar -C /etc/filebeat/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME.pem /etc/filebeat/certs/filebeat.pem
      # mv -n /etc/filebeat/certs/$NODE_NAME-key.pem /etc/filebeat/certs/filebeat-key.pem
      # chmod 500 /etc/filebeat/certs
      # chmod 400 /etc/filebeat/certs/*
      #chown -R root:root /etc/filebeat/certs

Starting the service
^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: SystemD

      .. code-block:: console

         # systemctl daemon-reload
         # systemctl enable filebeat
         # systemctl start filebeat

   .. group-tab:: SysV init

      -  RPM-based operating system:

         .. code-block:: console

            # chkconfig --add filebeat
            # service filebeat start

      -  Debian-based operating system:

         .. code-block:: console

            # update-rc.d filebeat defaults 95 10
            # service filebeat start

Run the following command to verify that Filebeat is successfully installed:

.. code-block:: console

   # filebeat test output

An example output is shown below:

.. code-block:: none
   :class: output

   elasticsearch: https://10.0.0.9:9200...
     parse url... OK
     connection...
       parse host... OK
       dns lookup... OK
       addresses: 10.0.0.9
       dial up... OK
     TLS...
       security: server's certificate chain verification is enabled
       handshake... OK
       TLS version: TLSv1.2
       dial up... OK
     talk to server... OK
     version: 7.10.2

Configuring the Wazuh server worker nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Configure the Wazuh server worker node to enable cluster mode by editing the following settings in the ``/var/ossec/etc/ossec.conf`` file:

   .. code-block:: xml
      :emphasize-lines: 3-5,9,12

      <cluster>
          <name>wazuh</name>
          <node_name><NEW_WAZUH_SERVER_NODE_NAME></node_name>
          <node_type>worker</node_type>
          <key><ENCRYPTION_KEY></key>
          <port>1516</port>
          <bind_addr>0.0.0.0</bind_addr>
          <nodes>
              <node><MASTER_NODE_IP_ADDRESS></node>
          </nodes>
          <hidden>no</hidden>
          <disabled>no</disabled>
      </cluster>

   The configurable fields in the above section of the ``var/ossec/etc/ossec.conf`` file is as follows:

   -  ``<name>`` indicates the name of the cluster.
   -  ``<node_name>`` indicates the name of the current node. Each node of the cluster must have a unique name. Replace ``<NEW_WAZUH_SERVER_NODE_NAME>`` with the name specified in the ``/root/config.yml`` file.
   -  ``node_type`` specifies the role of the Wazuh server node. In this instance, it is set as a worker.
   -  ``key`` represents the :ref:`key created previously <generate_random_encryption_key_cluster>` for the master node. It has to be the same for all the nodes. In case you have an already distributed infrastructure, copy this key from the master node's ``/var/ossec/etc/ossec.conf`` file.
   -  ``<port>`` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  ``<bind_addr>`` is the network IP address to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP address).
   -  ``<nodes>`` contain the address of the master node, which can be either an IP address or a DNS hostname. Replace ``<MASTER_NODE_IP_ADDRESS>`` with the IP address of your master node.
   -  ``<hidden>`` shows or hides the cluster information in the generated alerts.
   -  ``<disabled>`` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

   You can learn more about the available configuration options in the :doc:`cluster </user-manual/reference/ossec-conf/cluster>` reference guide.

#. Restart the Wazuh manager service.

   .. tabs::

      .. group-tab:: SystemD

         .. code-block:: console

            # systemctl restart wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager restart

Testing the cluster
-------------------

Now that installation and configuration are complete, you can test your cluster to verify that the new Wazuh server node is connected. Two possible ways of doing this:

-  `Using the cluster control tool`_
-  `Using the Wazuh API console`_

Using the cluster control tool
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Verify that the Wazuh server cluster is enabled and all the nodes are connected by executing the following command on any of the Wazuh server nodes:

.. code-block:: console

   # /var/ossec/bin/cluster_control -l

A sample output of the command:

.. code-block:: none
   :class: output

   NAME     TYPE    VERSION  ADDRESS
   wazuh-1  master  4.14.2   10.0.0.9
   wazuh-2  worker  4.14.2   10.0.0.10
   wazuh-3  worker  4.14.2   10.0.0.11

Note that ``10.0.0.9``, ``10.0.0.10, 10.0.0.11`` are example IP addresses.

Using the Wazuh API console
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You can also check your new Wazuh server cluster by using the **Wazuh API Console** accessible via the Wazuh dashboard.

Access the Wazuh dashboard using the credentials below.

-  URL: ``https://<WAZUH_DASHBOARD_IP>``
-  Username: ``admin``
-  Password: ``<ADMIN_PASSWORD>`` or ``admin`` in case you already have a distributed architecture and are using the default password.

Navigate to **Server management** > **Dev Tools**.  On the console, run the query below:

.. code-block:: none

   GET /cluster/healthcheck

.. thumbnail:: /images/manual/wazuh-server/running-api-console-query1.png
   :title: Running query in the API console
   :alt: Running query in the API console
   :align: center
   :width: 80%

This query will display the global status of your Wazuh server cluster with the following information for each node:

-  ``Name`` indicates the name of the Wazuh server node.
-  ``Type`` indicates the role assigned to a node(Master or Worker).
-  ``Version`` indicates the version of the ``Wazuh-manager`` service running on the node.
-  ``IP`` is the IP address of the Wazuh server node.
-  ``n_active_agents`` indicates the number of active Wazuh agents connected to the node.

Having completed these steps, the Wazuh infrastructure has been successfully scaled up, and the new server nodes have been integrated into the cluster.

If you want to uninstall the Wazuh server, see :ref:`Uninstall the Wazuh server <uninstall_server>` documentation.
