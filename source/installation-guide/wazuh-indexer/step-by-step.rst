.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh indexer is a highly scalable full-text search engine. Install it in a single-node or multi-node configuration.

Installing the Wazuh indexer step-by-step
=========================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster following step-by-step instructions. The Wazuh indexer is a scalable search and analytics engine that stores and indexes events forwarded by the Wazuh manager, enabling near real-time data analysis and several other features.

The installation process is divided into three stages:

#. `Certificates creation <Certificate creation_>`_
#. `Wazuh indexer nodes installation`_
#. `Cluster initialization`_

.. note::

   You need root user privileges to run all the commands described below.

.. _certificates_creation:

Certificate creation
--------------------

Wazuh uses certificates to establish confidentiality and encrypt communications between its central components. The Wazuh indexer package generates certificates signed by a local certificate authority (CA) during installation.

Follow the steps below to generate and distribute certificates for the Wazuh central components in a multi-node deployment.

Generating the SSL certificates
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Download the ``wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh`` script and the ``config.yml`` configuration file. This creates the certificates that encrypt communications between the Wazuh central components:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
      # curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for all Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed:

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

   To learn more about how to create and configure the certificates, see the :ref:`Certificates deployment <wazuh_indexer_cluster_certificates_deployment>` section.

#. Run ``./wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh`` to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster:

   .. code-block:: console

      # bash ./wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A

   If the Wazuh agents will connect to a Wazuh manager through a different address, such as a public IP, a NAT address, or a load balancer, add it with ``-as|--agent-san <ADDRESS>``. Agent enrollment tokens can only be created for an address that is in the listener certificate of the Wazuh manager.

   .. code-block:: console

      # bash ./wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A -as <ADDRESS>

   .. note::

      The ``-A`` option creates the root CA in ``/etc/wazuh/ca`` on the host where you run it, and keeps its private key, ``root-ca.key``, there. The key is not in ``wazuh-certificates.tar``. Back up ``/etc/wazuh/ca``: you need it to add nodes or renew certificates. Each Wazuh package issues its own certificates during installation, and the following steps replace them.

#. Compress all the necessary files:

   .. code-block:: console

      # tar -cvf ./wazuh-certificates.tar -C ./wazuh-certificates/ .
      # rm -rf ./wazuh-certificates

#. Copy the ``wazuh-certificates.tar`` file to all the nodes, including the Wazuh indexer, Wazuh manager, and Wazuh dashboard nodes. You can use the ``scp`` utility or any other secure file transfer method available in your environment. On the node that generated the certificate, and on every other Wazuh indexer node, replace the certificates the package issued with this node's pair. See :ref:`Deploying certificates <wazuh_indexer_deploying_certificates>`.

Wazuh indexer nodes installation
--------------------------------

Follow these steps to install and configure a single-node or multi-node Wazuh indexer.

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

Installing the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh indexer package:

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

Retrieving the generated credentials
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The installation generates one password per internal user and writes them to ``/etc/wazuh/credentials.env`` readable only by root. On a multi-node cluster, every node generates its own values, and only the values on the node where you run ``indexer-security-init.sh`` work after cluster initialization. Run this command to view the credential:

.. code-block:: console

   # cat /etc/wazuh/credentials.env

The command output looks similar to this:

.. code-block:: none
   :class: output

   # >>> wazuh generated — do not edit <<<
   # Editing a value here does not change the deployment.
   # To rotate, use wazuh-passwords-tool.sh.
   WAZUH_INDEXER_ADMIN_PASSWORD="..."
   WAZUH_INDEXER_KIBANASERVER_PASSWORD="..."
   WAZUH_INDEXER_MANAGER_PASSWORD="..."
   # >>> end wazuh generated <<<

The Wazuh manager and Wazuh dashboard use this file during installation. Keep it until all components are installed and running, then remove it after securely storing the passwords, as it contains all deployment credentials in plain text:

.. code-block:: console

   # rm /etc/wazuh/credentials.env

Passwords are generated once. Reinstalling, restarting or upgrading the Wazuh indexer does not change them, and neither does removing this file. To change a password after installation, see the :doc:`password management </user-manual/user-administration/password-management>` documentation.

.. _wazuh_indexer_configuring:

Configuring the Wazuh indexer
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/indexer/common/configure_indexer_nodes.rst

.. _wazuh_indexer_deploying_certificates:

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

.. note::

   -  This step applies only if you generated the certificates in advance, as described in `Certificate creation`_. A single-node deployment already has the certificates the package issued.

   -  Make sure that a copy of ``wazuh-certificates.tar``, created in the previous stage of the installation process, is placed in your working directory.

.. include:: /_templates/installations/indexer/common/deploy_certificates.rst

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

#. Run the Wazuh indexer ``indexer-security-init.sh`` script on *any* Wazuh indexer node to load the new certificates information and start the single-node or multi-node cluster:

   .. code-block:: console

      # /usr/share/wazuh-indexer/bin/indexer-security-init.sh

Testing the cluster installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On the node where you ran ``indexer-security-init.sh``, run the following command to view the ``WAZUH_INDEXER_ADMIN_PASSWORD`` value. Only this node's value works on a multi-node cluster.

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

#. Edit the ``/etc/wazuh-indexer/jvm.options`` file and change the JVM flags. Set a Wazuh indexer heap size value to limit memory usage. JVM heap limits prevent the ``OutOfMemory`` exception if the Wazuh indexer tries to allocate more memory than is available while memory locking is enabled. The recommended value is half of the system RAM. For example, set the size as follows for a system with 8 GB of RAM.

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

Repeat the heap size and restart steps on every Wazuh indexer node in your multi-node cluster. The ``mlockall`` check lists every node, so you run it once.

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

Next steps
----------

The Wazuh indexer is now successfully installed on your single-node or multi-node cluster, and you can proceed with installing the Wazuh manager. To perform this action, see the :doc:`../wazuh-manager/step-by-step` section.

To uninstall the Wazuh indexer, see :ref:`uninstall_indexer`.
