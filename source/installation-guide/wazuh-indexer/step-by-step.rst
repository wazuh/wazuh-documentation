.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer is a highly scalable full-text search engine. Install it in a single-node or multi-node configuration.

Installing the Wazuh indexer step-by-step
=========================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster by following these step-by-step instructions. The Wazuh indexer is a scalable search and analytics engine. It stores and indexes the events that the Wazuh manager forwards, so you can analyze them in near real time.

Before you start, choose a name and an IP address for every Wazuh indexer, manager, and dashboard node. You create the certificates and passwords for all nodes on the first Wazuh indexer node, then copy one archive to each of the other nodes.

For an all-in-one deployment, see **All-in-one deployment** before you start.

The installation process is divided into four stages:

#. `Wazuh indexer nodes installation`_
#. `Certificate creation on the first Wazuh indexer node <Certificate creation_>`_
#. `Wazuh indexer nodes configuration`_
#. `Cluster initialization`_

.. note::

   Run every command on these pages in a root shell, for example ``sudo -i``, and from the same working directory, for example ``/root``. Paste the ``wazuh_generate_password`` function and the command after it into the same shell.

Wazuh indexer nodes installation
--------------------------------

Run this stage on every Wazuh indexer node. Install the package only on the first node at this stage, as it generates the certificates and passwords for the entire deployment. Install the package on the remaining nodes later, in :ref:`Deploying certificates <wazuh_indexer_deploying_certificates>`. Installing it earlier causes each node to generate its own passwords and root CA, which the cluster rejects.

Installing package dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Run the following command to install the following packages if missing:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install -y debconf adduser procps diffutils iproute2 openssl

      .. group-tab:: Yum

         .. code-block:: console

            # yum install -y coreutils diffutils hostname iproute openssl procps-ng util-linux

      .. group-tab:: DNF

         .. code-block:: console

            # dnf install -y coreutils diffutils hostname iproute openssl procps-ng util-linux

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: APT

      #. Install the following packages if missing:

         .. code-block:: console

            # apt-get install -y gnupg apt-transport-https curl

      #. Install the GPG key:

         .. code-block:: console

            # curl -s https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

      #. Add the repository:

         .. code-block:: console

            # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/apt/ unstable main" | tee /etc/apt/sources.list.d/wazuh.list

      #. Update the package information:

         .. code-block:: console

            # apt-get update

   .. group-tab:: Yum

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH

      #. Add the repository:

         -  For RHEL-compatible systems version 8 and earlier, use the following command:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

         -  For RHEL-compatible systems version 9 and later, use the following command:

            .. code-block:: console

               # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

   .. group-tab:: DNF

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH

      #. Add the repository:

         .. code-block:: console

            # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

.. _wazuh_indexer_creating_passwords:

Creating the passwords
^^^^^^^^^^^^^^^^^^^^^^

On the **first Wazuh indexer node** only, create the five deployment passwords before installing the package. The Wazuh indexer uses three of these passwords instead of generating its own. In the next stage, all five passwords are packaged into ``wazuh-certificates.tar`` for use on the other nodes. The assisted method uses ``wazuh-install-files.tar`` instead.

#. Create the five passwords in ``credentials.env``, in your working directory. A password must be 12 to 64 characters long, use only ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``, and contain at least one uppercase letter, one lowercase letter, one digit and one symbol. You can choose them yourself, or run the following command to generate them with this function:

   .. code-block:: bash

      wazuh_generate_password() {
          local password
          while :; do
              password=$(LC_ALL=C tr -dc 'A-Za-z0-9.,_+:@%^=~-' < /dev/urandom | head -c 32)
              [[ $password =~ [A-Z] && $password =~ [a-z] && $password =~ [0-9] && $password =~ [.,_+:@%^=~-] ]] && break
          done
          printf '%s\n' "$password"
      }

   .. code-block:: console

      # install -m 0600 /dev/null credentials.env
      # cat > credentials.env <<EOF
      WAZUH_INDEXER_ADMIN_PASSWORD="$(wazuh_generate_password)"
      WAZUH_INDEXER_KIBANASERVER_PASSWORD="$(wazuh_generate_password)"
      WAZUH_INDEXER_MANAGER_PASSWORD="$(wazuh_generate_password)"
      WAZUH_MANAGER_API_PASSWORD="$(wazuh_generate_password)"
      WAZUH_MANAGER_WUI_PASSWORD="$(wazuh_generate_password)"
      EOF

#. Copy the Wazuh indexer passwords from ``credentials.env`` to ``/etc/wazuh/credentials.env`` on this node. The following commands create the directory and file with the required permissions, then copy only the Wazuh indexer credentials:

   .. code-block:: console

      # install -d -m 0700 -o root -g root /etc/wazuh
      # install -m 0600 /dev/null /etc/wazuh/credentials.env
      # grep '^WAZUH_INDEXER_' credentials.env > /etc/wazuh/credentials.env

.. important::

   Keep ``credentials.env`` in the working directory until the installation is finished. It is the only file that holds all five passwords.

.. _wazuh_indexer_installing_package:

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. important::

   Install the package only on the first Wazuh indexer node. On all other Wazuh indexer nodes, install the package after completing the **Deploying certificates** step and after placing the deployment passwords and certificates.

#. On the first Wazuh indexer node, install the Wazuh indexer package:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-indexer|WAZUH_INDEXER_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

Checking the passwords
^^^^^^^^^^^^^^^^^^^^^^

On the first Wazuh indexer node, the package uses the three passwords created in :ref:`Creating the passwords <wazuh_indexer_creating_passwords>` instead of generating new ones. Run the following command to verify that each variable contains the value you created. The output shows three lines, one per variable.

.. code-block:: console

   # grep '^WAZUH_INDEXER_' /etc/wazuh/credentials.env | tr -d '"' | sort -u

The other Wazuh indexer nodes receive the same three passwords from ``wazuh-certificates.tar`` in :ref:`Deploying certificates <wazuh_indexer_deploying_certificates>`, before their package is installed, so they never generate their own. Keep the file until all components are installed and running, then remove it as described in :ref:`Securing your Wazuh installation <wazuh_dashboard_securing_installation>`.

Passwords are generated once. Reinstalling, restarting, or upgrading the Wazuh indexer does not change them, and neither does removing this file. To change a password after installation, see the :doc:`password management </user-manual/user-administration/password-management>` documentation.

.. _certificates_creation:

Certificate creation
--------------------

Wazuh uses certificates to establish confidentiality and encrypt communications between its central components. The Wazuh indexer package issues its own certificates from a root certificate authority (CA) it creates in ``/etc/wazuh/ca``, and ships the certificates tool in ``/usr/share/wazuh-indexer/tools/``.

Run this stage once, on the first Wazuh indexer node, after its package is installed. It creates the certificates of every node and packs them, with the passwords every node needs, into ``wazuh-certificates.tar``.

Generating the SSL certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit ``/usr/share/wazuh-indexer/tools/config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed. If there is more than one Wazuh manager node, each one must have a ``node_type``:

   .. code-block:: yaml
      :emphasize-lines: 4-5, 15-16, 27-28

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: indexer
            ip: "<indexer-node-ip>"
          #- name: indexer-2
          #  ip: "<indexer-node-ip>"
          #- name: indexer-3
          #  ip: "<indexer-node-ip>"

        # Wazuh manager nodes
        # If there is more than one Wazuh manager
        # node, each one must have a node_type
        manager:
          - name: manager
            ip: "<wazuh-manager-ip>"
          #  node_type: master
          #- name: manager-2
          #  ip: "<wazuh-manager-ip>"
          #  node_type: worker
          #- name: manager-3
          #  ip: "<wazuh-manager-ip>"
          #  node_type: worker

        # Wazuh dashboard nodes
        dashboard:
          - name: dashboard
            ip: "<dashboard-node-ip>"

        # ip and dns both accept a list, for a node reachable at more than one address.
        # Every item reaches the certificate of the node; the first one is the address
        # the components are configured with.
        #- name: manager-2
        #  ip:
        #    - "<wazuh-manager-ip>"
        #    - "<wazuh-manager-second-ip>"
        #  dns:
        #    - "<wazuh-manager-name>"

        # Optional. Only for a proxy that TERMINATES the agents' TLS session: it issues the
        # certificate that proxy serves, from the same root-ca the agents pin. A layer 4
        # passthrough load balancer terminates nothing and needs --agent-san with its
        # address instead, so that address reaches the listener certificate of every
        # manager node.
        #load_balancer:
        #  - name: lb
        #    dns:
        #      - "<load-balancer-name>"
        #    ip:
        #      - "<load-balancer-ip>"

   For a **Wazuh manager cluster**, uncomment ``node_type`` in every manager entry. Set ``master`` on exactly one node and ``worker`` on all other nodes. For a single Wazuh manager, leave ``node_type`` commented. When two components share a host, set both entries to that host's IP address.

   The file that ships with the package also has commented examples for nodes with more than one address and for a TLS-terminating load balancer. To learn more about how to create and configure the certificates, see the :ref:`Certificates deployment <wazuh_indexer_cluster_certificates_deployment>` section.

   Each node needs an ``ip``, a ``dns``, or both, and each accepts a list. The certificate of the node includes every value. If a node has only a ``dns`` name, use that name wherever these sections ask for the node's address, for example ``network.host``.

#. Run the tool to create the certificates. It signs them with the root CA the package created in ``/etc/wazuh/ca`` and writes them to ``wazuh-certificates/``, beside the tool:

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh -A

   If the Wazuh agents will connect to a Wazuh manager through a different address, such as a public IP, a NAT address, or a load balancer, add it with ``-as|--agent-san <ALTERNATE_ADDRESS>``. Agent enrollment tokens can only be created for an address that is in the listener certificate of the Wazuh manager.

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh -A -as <ALTERNATE_ADDRESS>

   .. note::

      The root CA private key, ``root-ca.key``, stays in ``/etc/wazuh/ca`` on this node and is not in ``wazuh-certificates.tar``. Back up ``/etc/wazuh/ca``: you need it to add nodes or renew certificates.

Adding the passwords
^^^^^^^^^^^^^^^^^^^^

#. Add the five passwords from :ref:`Creating the passwords <wazuh_indexer_creating_passwords>` to the certificates. The Wazuh manager and the Wazuh manager workers use the two Wazuh manager API passwords instead of generating their own, so the Wazuh dashboard receives ``WAZUH_MANAGER_WUI_PASSWORD`` in the same archive:

   .. code-block:: console

      # install -m 0600 credentials.env /usr/share/wazuh-indexer/tools/wazuh-certificates/credentials.env

Packing and copying the archive
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Compress all the necessary files and make the archive readable by ``root`` only:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C /usr/share/wazuh-indexer/tools/wazuh-certificates/ .
      # chmod 600 ./wazuh-certificates.tar
      # rm -rf /usr/share/wazuh-indexer/tools/wazuh-certificates

#. Copy ``wazuh-certificates.tar`` to the working directory of each remaining Wazuh indexer, manager, and dashboard node. Transfer it as ``root``, or stage it as your login user with permissions set to ``0600`` and remove it after use. For example, to copy it with ``scp``, run the following commands on this node. Replace ``<USER>`` with a login user on this node, ``<REMOTE_USER>`` with a login user on the other node, and ``<NODE_IP>`` with the other node's IP address. ``<USER>`` must be able to sign in to the other node over SSH as ``<REMOTE_USER>``. The first connection asks you to confirm the host key.

   .. code-block:: console

      # install -m 0600 -o <USER> ./wazuh-certificates.tar /home/<USER>/
      # sudo -u <USER> scp /home/<USER>/wazuh-certificates.tar <REMOTE_USER>@<NODE_IP>:
      # rm -f /home/<USER>/wazuh-certificates.tar

   If the nodes cannot sign in to each other, replace the ``scp`` line with the following command. Run it on a workstation that can sign in to both nodes, before you run the ``rm`` line. Replace ``<FIRST_NODE_IP>`` with this node's IP address.

   .. code-block:: console

      $ scp -3 <USER>@<FIRST_NODE_IP>:/home/<USER>/wazuh-certificates.tar <REMOTE_USER>@<NODE_IP>:

   Then run the following command on the other node, from its working directory:

   .. code-block:: console

      # install -m 0600 /home/<REMOTE_USER>/wazuh-certificates.tar ./ && rm -f /home/<REMOTE_USER>/wazuh-certificates.tar

.. important::

   The ``wazuh-certificates.tar`` holds the private key of every node, ``admin-key.pem`` included, and all five passwords of the deployment. Each node extracts only what it needs. Remove the archive from every node once that node is installed, as each section describes.

Wazuh indexer nodes configuration
---------------------------------

Follow these steps on every Wazuh indexer node.

.. _wazuh_indexer_deploying_certificates:

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

.. note::

   -  Make sure that a copy of ``wazuh-certificates.tar``, created in the previous stage of the installation process, is placed in your working directory.

#. Run the following commands in the directory that holds ``wazuh-certificates.tar``, replacing ``<INDEXER_NODE_NAME>`` with the name of the Wazuh indexer node you are configuring as defined in ``config.yml``. For example, ``indexer`` on the first node and ``indexer-2`` on the second node:

   .. code-block:: console

      # NODE_NAME=<INDEXER_NODE_NAME>

   .. code-block:: console

      # umask 022
      # mkdir wazuh-certificates
      # tar -xf wazuh-certificates.tar -C wazuh-certificates

#. On every Wazuh indexer node **except the first**, place the passwords and the root CA certificate of the deployment. The first node already has both, and its ``/etc/wazuh/ca`` also holds the root CA private key, which must stay there:

   .. code-block:: console

      # install -d -m 0700 -o root -g root /etc/wazuh /etc/wazuh/ca
      # install -m 0644 wazuh-certificates/root-ca.pem /etc/wazuh/ca/root-ca.pem
      # [ -e /etc/wazuh/credentials.env ] || install -m 0600 /dev/null /etc/wazuh/credentials.env
      # for key in WAZUH_INDEXER_ADMIN_PASSWORD WAZUH_INDEXER_KIBANASERVER_PASSWORD WAZUH_INDEXER_MANAGER_PASSWORD; do
          sed -i "/^${key}=/d" /etc/wazuh/credentials.env
          grep "^${key}=" wazuh-certificates/credentials.env >> /etc/wazuh/credentials.env
        done

#. Place this node's certificates using the filenames expected by the package. On the first node, they replace the certificates that the package created:

   .. code-block:: console

      # install -d -m 0750 /etc/wazuh-indexer
      # install -d -m 0500 /etc/wazuh-indexer/certs
      # install -m 0400 wazuh-certificates/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # install -m 0400 wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # install -m 0400 wazuh-certificates/admin.pem /etc/wazuh-indexer/certs/admin.pem
      # install -m 0400 wazuh-certificates/admin-key.pem /etc/wazuh-indexer/certs/admin-key.pem
      # rm -rf wazuh-certificates

   On the first node, change the ownership of the certificates and their contents to the ``wazuh-indexer`` service user and group. On the other nodes, the package does this when you install it in step 4.

   .. code-block:: console

      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

   The certificates tool issues each certificate with the node name from ``config.yml`` as CN. Run the following command to display the certificate subject in the format that ``plugins.security.nodes_dn`` expects:

   .. code-block:: console

      # openssl x509 -noout -subject -nameopt RFC2253 -in /etc/wazuh-indexer/certs/indexer.pem

#. On every Wazuh indexer node **except the first**, install the Wazuh indexer package now. The package uses the passwords and certificates you placed and generates nothing. It copies ``root-ca.pem`` to ``/etc/wazuh-indexer/certs/`` and grants the certificates ownership to the ``wazuh-indexer`` user.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-indexer|WAZUH_INDEXER_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install wazuh-indexer|WAZUH_INDEXER_RPM_PKG_INSTALL|

#. **Recommended action**: If no other Wazuh components will be installed on this node, run the following command to remove the ``wazuh-certificates.tar`` file.

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

.. _wazuh_indexer_configuring:

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit ``/etc/wazuh-indexer/opensearch.yml`` and replace the following values:

   #. ``network.host``: Sets the address of this node for both HTTP and transport traffic. The node will bind to this address and will also use it as its publish address. Accepts an IP address or a hostname.

      Use the same node address set in ``config.yml`` to create the SSL certificates.

   #. ``node.name``: Name of the Wazuh indexer node as defined in the ``config.yml`` file. For example, ``indexer``. The package sets ``node-1`` on every node, so change it on every node to that node's name in ``config.yml``. List the same names in ``cluster.initial_cluster_manager_nodes``.

   #. ``cluster.initial_cluster_manager_nodes``: List of the names of the master-eligible nodes. Use names defined in the ``config.yml`` file, for example, ``indexer``. For a multi-node cluster, uncomment the ``node-2`` and ``node-3`` lines, change the names, or add more lines, according to your ``config.yml`` definitions.

      .. code-block:: yaml
         :emphasize-lines: 2

         cluster.initial_cluster_manager_nodes:
         - "indexer"
         #- "node-2"
         #- "node-3"

   #. ``discovery.seed_hosts``: List of the addresses of the master-eligible nodes. Each element can be either an IP address or a hostname. You may leave this setting commented if you are configuring the Wazuh indexer as a single-node. For multi-node configurations, uncomment this setting and set the addresses of each master-eligible node.

      .. code-block:: yaml

         discovery.seed_hosts:
         #  - "node-1-ip"
         #  - "node-2-ip"
         #  - "node-3-ip"

   #. ``plugins.security.nodes_dn``: the Distinguished Names (DNs) of the certificates of all Wazuh indexer nodes. On every node, including single-node clusters, replace the line the package wrote with one line per Wazuh indexer node in ``config.yml``. Each entry is ``C=US,L=California,O=Wazuh,OU=Wazuh,CN=`` followed by the node's name in ``config.yml``, with the fields in this order, because the Security plugin compares each entry as an exact string. The ``openssl`` command in :ref:`Deploying certificates <wazuh_indexer_deploying_certificates>` prints this node's subject in that form, so you can check it:

      .. code-block:: yaml
         :emphasize-lines: 2-3

         plugins.security.nodes_dn:
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=<NODE_1_NAME>"
         - "C=US,L=California,O=Wazuh,OU=Wazuh,CN=<NODE_2_NAME>"

      .. note::

         Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and ensure the necessary ports are open.

Starting the service
^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh indexer service:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable wazuh-indexer
            # systemctl start wazuh-indexer

      .. group-tab:: SysV Init

         Choose one option according to the operating system used.

         #. RPM-based operating system:

            .. code-block:: console

               # chkconfig --add wazuh-indexer
               # service wazuh-indexer start

         #. Debian-based operating system:

            .. code-block:: console

               # update-rc.d wazuh-indexer defaults 95 10
               # service wazuh-indexer start

Repeat this stage of the installation process for every Wazuh indexer node in your multi-node cluster. Then proceed with initializing your single-node or multi-node cluster in the next stage.

Cluster initialization
----------------------

The final stage of installing the Wazuh indexer single-node or multi-node cluster consists of running the security admin script.

.. note::

   You only have to initialize the cluster once, there is no need to run this command on every node.

#. Run the Wazuh indexer ``indexer-security-init.sh`` script on *any* Wazuh indexer node to load the new certificate information and start the single-node or multi-node cluster:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      Security Admin v7
      Will connect to 192.168.33.135:9200 ... done
      Connected as "C=US,L=California,O=Wazuh,OU=Wazuh,CN=admin"
      OpenSearch Version: 3.6.0
      Contacting opensearch cluster 'opensearch' and wait for YELLOW clusterstate ...
      Clustername: wazuh-cluster
      Clusterstate: GREEN
      Number of nodes: 1
      Number of data nodes: 1
      .opendistro_security index does not exists, attempt to create it ... done (0-all replicas)
      Populate config from /etc/wazuh-indexer/opensearch-security/
      Will update '/config' with /etc/wazuh-indexer/opensearch-security/config.yml
         SUCC: Configuration for 'config' created or updated
      Will update '/roles' with /etc/wazuh-indexer/opensearch-security/roles.yml
         SUCC: Configuration for 'roles' created or updated
      Will update '/rolesmapping' with /etc/wazuh-indexer/opensearch-security/roles_mapping.yml
         SUCC: Configuration for 'rolesmapping' created or updated
      Will update '/internalusers' with /etc/wazuh-indexer/opensearch-security/internal_users.yml
         SUCC: Configuration for 'internalusers' created or updated
      Will update '/actiongroups' with /etc/wazuh-indexer/opensearch-security/action_groups.yml
         SUCC: Configuration for 'actiongroups' created or updated
      Will update '/tenants' with /etc/wazuh-indexer/opensearch-security/tenants.yml
         SUCC: Configuration for 'tenants' created or updated
      Will update '/nodesdn' with /etc/wazuh-indexer/opensearch-security/nodes_dn.yml
         SUCC: Configuration for 'nodesdn' created or updated
      Will update '/audit' with /etc/wazuh-indexer/opensearch-security/audit.yml
         SUCC: Configuration for 'audit' created or updated
      Will update '/allowlist' with /etc/wazuh-indexer/opensearch-security/allowlist.yml
         SUCC: Configuration for 'allowlist' created or updated
      SUCC: Expected 9 config types for node {"updated_config_types":["allowlist","tenants","rolesmapping","nodesdn","audit","roles","actiongroups","config","internalusers"],"updated_config_size":9,"message":null} is 9
      Done with success

   The output includes the line ``Done with success``. The last ``SUCC`` line can end with ``due to: null``, and lines with ``java.nio.channels.ClosedSelectorException`` can follow ``Done with success``. Neither means that the initialization failed.

Testing the cluster installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On the node where you ran ``indexer-security-init.sh``, run the following command to print the Wazuh indexer admin user password. Every Wazuh indexer node holds the same value.

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | tr -d '"' | sort -u | cut -d= -f2-

#. Run the following commands to confirm that the installation is successful. Replace ``<WAZUH_INDEXER_ADDRESS>`` with the IP address of the Wazuh indexer. When prompted, enter the password that step 1 printed:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_ADDRESS>:9200

   The output is similar to the following. The ``build_type`` value is ``rpm`` or ``deb``, depending on the package.

   .. code-block:: none
      :class: output accordion-output

      {
        "name" : "indexer",
        "cluster_name" : "wazuh-cluster",
        "cluster_uuid" : "89AmEmB8QImyIJFFxkYaBQ",
        "version" : {
          "distribution" : "opensearch",
          "number" : "3.6.0",
          "build_type" : "rpm",
          "build_hash" : "1b0a897cd71105595b450b48b591581865f8b46b",
          "build_date" : "2026-10-01T01:51:00.589932681Z",
          "build_snapshot" : false,
          "lucene_version" : "10.4.0",
          "minimum_wire_compatibility_version" : "2.19.0",
          "minimum_index_compatibility_version" : "2.0.0"
        },
        "tagline" : "The OpenSearch Project: https://opensearch.org/"
      }

#. Run the following command to check if the cluster is working correctly. Replace ``<WAZUH_INDEXER_ADDRESS>`` with the IP address of the Wazuh indexer. When prompted, enter the password that step 1 printed:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_ADDRESS>:9200/_cat/nodes?v

   The command produces output similar to the following:

   .. code-block:: none
      :class: output

      ip             heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                                        cluster_manager name
      192.168.33.135           30          57  16    1.50    1.30     0.69 dimr      cluster_manager,data,ingest,remote_cluster_client *               indexer

Memory locking
--------------

If the system swaps Wazuh indexer memory to disk, the Wazuh indexer can stop working correctly. The package enables memory locking by default, so you only set the heap size and check the result.

.. note::

   You require root user privileges to run the commands described below.

#. The Wazuh indexer package already enables memory locking: ``/etc/wazuh-indexer/opensearch.yml`` ships ``bootstrap.memory_lock: true``, and the service sets an unlimited locked-memory limit. No change is needed.

#. Set the heap size in ``/etc/wazuh-indexer/jvm.options``. Use half of the system RAM on a dedicated Wazuh indexer node, or a quarter on a host that also runs the Wazuh manager or Wazuh dashboard. For example, use ``-Xms4g`` and ``-Xmx4g`` on a dedicated node with 8 GB of RAM or on a shared host with 16 GB, and ``-Xms2g`` and ``-Xmx2g`` on an all-in-one host with 8 GB. For a size that is not a whole number of gigabytes, use megabytes, for example ``-Xms1536m`` and ``-Xmx1536m``:

   .. code-block:: ini

      -Xms4g
      -Xmx4g

   Where the total heap space:

   -  ``-Xms4g`` sets the initial size to 4 GB of RAM.
   -  ``-Xmx4g`` sets the maximum size to 4 GB of RAM.

   .. note::

      To prevent performance degradation due to JVM heap resizing at runtime, the minimum (Xms) and maximum (Xmx) size values must be the same.

#. Restart the Wazuh indexer service:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl restart wazuh-indexer

      .. group-tab:: SysV Init

         .. code-block:: console

            # service wazuh-indexer restart

#. Run the following command to check that the ``mlockall`` value is ``true`` on every node. Replace ``<WAZUH_INDEXER_ADDRESS>`` with the IP address of a Wazuh indexer node. When prompted, enter the password that step 1 of **Testing the cluster installation** printed:

   .. code-block:: console

      # curl -k -u admin "https://<WAZUH_INDEXER_ADDRESS>:9200/_nodes?filter_path=**.mlockall&pretty"

   The command output looks similar to this:

   .. code-block:: json
      :class: output
      :emphasize-lines: 5

      {
        "nodes" : {
          "sRuGbIQRRfC54wzwIHjJWQ" : {
            "process" : {
              "mlockall" : true
            }
          }
        }
      }

   Repeat the heap size and restart steps on every Wazuh indexer node in your multi-node cluster. The ``mlockall`` checks every node, so you run it once.

#. Restart one Wazuh indexer node at a time. Before you restart the next node, check that the cluster status is ``green``. Replace ``<WAZUH_INDEXER_ADDRESS>`` with the IP address of a Wazuh indexer node. When prompted, enter the password that step 1 of **Testing the cluster installation** printed:

   .. code-block:: console

      # curl -k -u admin "https://<WAZUH_INDEXER_ADDRESS>:9200/_cluster/health?pretty"

   If the status stays ``yellow`` and a shard failed to allocate after several attempts, retry the allocation:

   .. code-block:: console

      # curl -k -u admin -X POST "https://<WAZUH_INDEXER_ADDRESS>:9200/_cluster/reroute?retry_failed=true"

Disable Wazuh updates
---------------------

After all Wazuh components on this host are installed, disable the Wazuh repository to prevent accidental upgrades. If you will also install another component on this host, do this after installing it:

.. tabs::

   .. group-tab:: APT

      .. code-block:: console

         # sed -i "s/^deb /#deb /" /etc/apt/sources.list.d/wazuh.list
         # apt update

   .. group-tab:: Yum

      .. code-block:: console

         # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

   .. group-tab:: DNF

      .. code-block:: console

         # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

Next steps
----------

The Wazuh indexer is now successfully installed on your single-node or multi-node cluster, and you can proceed with installing the Wazuh manager. To perform this action, see the :doc:`../wazuh-manager/step-by-step` section.

To uninstall the Wazuh indexer, see :ref:`Uninstall the Wazuh indexer <uninstall_indexer>`.
