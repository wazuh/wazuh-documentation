.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer is a highly scalable full-text search engine. Install it in a single-node or multi-node configuration.

Installing the Wazuh indexer step-by-step
=========================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster following step-by-step instructions. The Wazuh indexer is a scalable search and analytics engine that stores and indexes events forwarded by the Wazuh manager, enabling near real-time data analysis and several other features.

The installation process is divided into four stages:

#. `Wazuh indexer nodes installation`_
#. `Certificate creation on the first Wazuh indexer node <Certificate creation_>`_
#. `Wazuh indexer nodes configuration`_
#. `Cluster initialization`_

.. note::

   You need root user privileges to run all the commands described below.

Wazuh indexer nodes installation
--------------------------------

Follow these steps on every Wazuh indexer node, starting with the first one, but install the Wazuh indexer package only on the **first Wazuh indexer node** now. You will use that node in the next stage to create the certificates and gather the passwords for the entire deployment. On every other Wazuh indexer node, you install the package in :ref:`Deploying certificates <wazuh_indexer_deploying_certificates>`, once the node holds the passwords and certificates of the deployment. Installed earlier, the package generates passwords and a root CA of its own, which the cluster does not accept.

Installing package dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/indexer/common/install-dependencies.rst

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. tabs::

   .. group-tab:: APT

      .. include:: /_templates/installations/common/deb/add-repository.rst

   .. group-tab:: Yum

      .. include:: /_templates/installations/common/yum/add-repository.rst

   .. group-tab:: DNF

      .. include:: /_templates/installations/common/dnf/add-repository.rst

.. _wazuh_indexer_creating_passwords:

Creating the passwords
^^^^^^^^^^^^^^^^^^^^^^

On the **first Wazuh indexer node** only, create the five deployment passwords before installing the package. The Wazuh indexer uses three of these passwords instead of generating its own. In the next stage, all five passwords are packaged into ``wazuh-certificates.tar`` for use on the other nodes.

#. Create the five passwords in ``credentials.env``, in your working directory. A password must be 12 to 64 characters long, use only ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``, and contain at least one uppercase letter, one lowercase letter, one digit and one symbol. You can choose them yourself, or generate them with this function:

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

#. Give the Wazuh indexer passwords to the package of this node:

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

On the first Wazuh indexer node, the package uses the three passwords created in :ref:`Creating the passwords <wazuh_indexer_creating_passwords>` instead of generating new ones. Run the following command to verify that each variable contains the value you created.

.. code-block:: console

   # grep '^WAZUH_INDEXER_' /etc/wazuh/credentials.env | sort -u

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

   The file that ships with the package also has commented examples for nodes with more than one address and for a TLS-terminating load balancer. To learn more about how to create and configure the certificates, see the :ref:`Certificates deployment <wazuh_indexer_cluster_certificates_deployment>` section.

#. Run the tool to create the certificates. It signs them with the root CA the package created in ``/etc/wazuh/ca`` and writes them to ``wazuh-certificates/``, beside the tool:

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh -A

   If the Wazuh agents will connect to a Wazuh manager through a different address, such as a public IP, a NAT address, or a load balancer, add it with ``-as|--agent-san <ADDRESS>``. Agent enrollment tokens can only be created for an address that is in the listener certificate of the Wazuh manager.

   .. code-block:: console

      # bash /usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh -A -as <ADDRESS>

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

#. Copy ``wazuh-certificates.tar`` to the working directory of every other node, including the Wazuh indexer, Wazuh manager, and Wazuh dashboard nodes. You can use the ``scp`` utility or any other secure file transfer method available in your environment. Copy it as ``root``, or stage a copy owned by your login user with mode ``0600`` and delete the staged copy afterwards.

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

#. Run the following commands in the directory that holds ``wazuh-certificates.tar``, replacing ``<INDEXER_NODE_NAME>`` with the name of the Wazuh indexer node you are configuring as defined in ``config.yml``. For example, ``indexer-1``:

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

#. Place this node's certificates using the filenames expected by the package. On the first Wazuh indexer node, these files replace the certificates generated by the package. After installing the certificates, assign ownership to the ``wazuh-indexer`` service user:

   .. code-block:: console

      # install -d -m 0750 /etc/wazuh-indexer
      # install -d -m 0500 /etc/wazuh-indexer/certs
      # install -m 0400 wazuh-certificates/$NODE_NAME.pem /etc/wazuh-indexer/certs/indexer.pem
      # install -m 0400 wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-indexer/certs/indexer-key.pem
      # install -m 0400 wazuh-certificates/admin.pem /etc/wazuh-indexer/certs/admin.pem
      # install -m 0400 wazuh-certificates/admin-key.pem /etc/wazuh-indexer/certs/admin-key.pem
      # rm -rf wazuh-certificates

   On the first Wazuh indexer node only, replace the package-generated certificates with these files and assign ownership to the ``wazuh-indexer`` service user.

   .. code-block:: console

      # chown -R wazuh-indexer:wazuh-indexer /etc/wazuh-indexer/certs

   The certificates tool issues each certificate with the node name from ``config.yml`` as CN. Run the following command to display the certificate subject in the format that ``plugins.security.nodes_dn`` expects:

   .. code-block:: console

      # openssl x509 -noout -subject -nameopt RFC2253 -in /etc/wazuh-indexer/certs/indexer.pem

#. On every Wazuh indexer node **except the first**, install the Wazuh indexer package now, as described in :ref:`Installing the Wazuh indexer <wazuh_indexer_installing_package>`. The package uses the passwords and certificates you placed and generates nothing. It copies ``root-ca.pem`` to ``/etc/wazuh-indexer/certs/`` and grants the certificates ownership to the ``wazuh-indexer`` user.

#. **Recommended action**: If no other Wazuh components will be installed on this node, run the following command to remove the ``wazuh-certificates.tar`` file.

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

.. _wazuh_indexer_configuring:

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/indexer/common/configure_indexer_nodes.rst

Starting the service
^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh indexer service:

   .. include:: /_templates/installations/indexer/common/enable_indexer.rst

Repeat this stage of the installation process for every Wazuh indexer node in your multi-node cluster. Then proceed with initializing your single-node or multi-node cluster in the next stage.

Cluster initialization
----------------------

The final stage of installing the Wazuh indexer single-node or multi-node cluster consists of running the security admin script.

.. note::

   You only have to initialize the cluster once, there is no need to run this command on every node.

#. Run the Wazuh indexer ``indexer-security-init.sh`` script on *any* Wazuh indexer node to load the new certificate information and start the single-node or multi-node cluster:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

Testing the cluster installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On the node where you ran ``indexer-security-init.sh``, run the following command to view the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value. Every Wazuh indexer node holds the same value.

   .. code-block:: console

      # grep WAZUH_INDEXER_ADMIN_PASSWORD /etc/wazuh/credentials.env

#. Run the following commands to confirm that the installation is successful. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` with the IP address of the Wazuh indexer. When prompted, enter the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value from step 1, without the quotes around it:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200

   The command output looks similar to this:

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

#. Run the following command to check if the cluster is working correctly. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` with the IP address of the Wazuh indexer. When prompted, enter the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value from step 1, without the quotes around it:

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_cat/nodes?v

   The command produces output similar to the following:

   .. code-block:: none
      :class: output

      ip             heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                                        cluster_manager name
      192.168.33.135           30          57  16    1.50    1.30     0.69 dimr      cluster_manager,data,ingest,remote_cluster_client *               indexer

Memory locking
--------------

When the system is swapping memory, the Wazuh indexer may not work as expected. Therefore, it is important for the health of the Wazuh indexer node that none of the Java Virtual Machine (JVM) is ever swapped out to disk. To prevent any Wazuh indexer memory from being swapped out, the Wazuh indexer locks its process address space into RAM. The package enables memory locking by default, so you only set the heap size and check the result.

.. note::

   You require root user privileges to run the commands described below.

#. The Wazuh indexer package already enables memory locking: ``/etc/wazuh-indexer/opensearch.yml`` ships ``bootstrap.memory_lock: true``, and the service sets an unlimited locked-memory limit. No change is needed.

#. Edit the ``/etc/wazuh-indexer/jvm.options`` file and change the JVM flags. Set a Wazuh indexer heap size value to limit memory usage. JVM heap limits prevent the ``OutOfMemory`` exception if the Wazuh indexer tries to allocate more memory than is available while memory locking is enabled. The recommended value is half of the system RAM. On a host that also runs the Wazuh manager or the Wazuh dashboard, use about a quarter of the system RAM instead, so that those components keep enough memory. For example, set the size as follows for a dedicated Wazuh indexer node with 8 GB of RAM, or a shared host with 16 GB.

   .. code-block:: ini

      -Xms4g
      -Xmx4g

   Where the total heap space:

   -  ``-Xms4g`` - initial size is set to 4Gb of RAM.
   -  ``-Xmx4g`` - maximum size is to 4Gb of RAM.

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

#. Run the following command to check that the ``mlockall`` value is ``true`` on every node. Replace ``<WAZUH_INDEXER_IP_ADDRESS>`` with the IP address of a Wazuh indexer node. When prompted, enter the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value from the node where you ran ``indexer-security-init.sh``, without the quotes around it:

   .. code-block:: console

      # curl -k -u admin "https://<WAZUH_INDEXER_IP_ADDRESS>:9200/_nodes?filter_path=**.mlockall&pretty"

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

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

Next steps
----------

The Wazuh indexer is now successfully installed on your single-node or multi-node cluster, and you can proceed with installing the Wazuh manager. To perform this action, see the :doc:`../wazuh-manager/step-by-step` section.

To uninstall the Wazuh indexer, see :ref:`uninstall_indexer`.
