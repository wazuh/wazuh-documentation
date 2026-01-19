.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to proceed with installing and configuring the new Wazuh server as a worker node in this section of the documentation.

Wazuh server node(s) installation
=================================

Once the certificates have been created and copied to the new node(s), you can now proceed with installing and configuring the new Wazuh server as a worker node.

Adding the Wazuh repository
---------------------------

.. tabs::

   .. group-tab:: YUM

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH

      #. Add the repository:

         -  For RHEL-compatible systems version 8 and earlier, use the following command:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

         -  For RHEL-compatible systems version 9 and later, use the following command:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages.wazuh.com/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

   .. group-tab:: APT

      #. Install the following packages if missing:

         .. code-block:: console

            # apt-get install gnupg apt-transport-https

      #. Install the GPG key:

         .. code-block:: console

            # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

      #. Add the repository:

         .. code-block:: console

            # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

      #. Update the packages information:

         .. code-block:: console

            # apt-get update

Installing the Wazuh manager
----------------------------

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

Deploying certificates
----------------------

Run the following commands in the directory where the ``wazuh-certificates.tar`` file was copied to, replacing ``<NEW_WAZUH_SERVER_NODE_NAME>`` with the name of the Wazuh server node you are configuring as defined in ``/root/config.yml``. This deploys the SSL certificates to encrypt communications between the Wazuh central components:

#. Create an environment variable to store the node name:

   .. code-block:: console

      NODE_NAME=<NEW_WAZUH_SERVER_NODE_NAME>

#. Deploy the certificates:

   .. code-block:: console

      # mkdir /var/ossec/etc/certs
      # tar -xf ./wazuh-certificates.tar -C /var/ossec/etc/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
      # mv -n /var/ossec/etc/certs/$NODE_NAME.pem /var/ossec/etc/certs/server.pem
      # mv -n /var/ossec/etc/certs/$NODE_NAME-key.pem /var/ossec/etc/certs/server-key.pem
      # chmod 500 /var/ossec/etc/certs
      # chmod 400 /var/ossec/etc/certs/*
      # chown -R root:root /var/ossec/etc/certs

Configuring the Wazuh server worker nodes
-----------------------------------------

#. Configure the Wazuh server worker node to enable cluster mode by editing the following settings in the ``/var/ossec/etc/ossec``.conf file:

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

   The configurable fields in the above section of the ``ossec.conf`` file are as follows:

   -  ``<name>`` indicates the name of the cluster.
   -  ``<node_name>`` indicates the name of the current node. Each node of the cluster must have a unique name. Replace ``<NEW_WAZUH_SERVER_NODE_NAME>`` with the name specified in the ``/root/config.yml`` file.
   -  ``<node_type>`` specifies the role of the node. It has to be set as a worker.
   -  ``<key>`` represents the :ref:`key created previously <generate_random_encryption_key_cluster>` for the master node. It has to be the same for all the nodes. In case you have an already distributed infrastructure, copy this key from the master node’s ``/var/ossec/etc/ossec.conf`` file.
   -  ``<port>`` indicates the destination port for cluster communication. Leave the default as ``1516``.
   -  ``<bind_addr>`` is the network IP to which the node is bound to listen for incoming requests (0.0.0.0 means the node will use any IP).
   -  ``<nodes>`` contain the address of the master node which can be either an IP or a DNS hostname. Replace ``<MASTER_NODE_IP_ADDRESS>`` with the IP address of your master node.
   -  ``<hidden>`` shows or hides the cluster information in the generated alerts.
   -  ``<disabled>`` indicates whether the node is enabled or disabled in the cluster. This option must be set to ``no``.

   You can learn more about the available configuration options in the :doc:`cluster </user-manual/reference/ossec-conf/cluster>` reference guide.

#. Restart the Wazuh manager service.

   .. include:: /_templates/common/restart_manager.rst
