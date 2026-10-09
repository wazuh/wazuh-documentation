.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Wazuh indexer using the assisted installation method. The Wazuh indexer is a scalable search and analytics engine that stores and indexes events forwarded by the Wazuh manager, enabling near real-time data analysis and several other features.

Installing the Wazuh indexer using the assisted installation method
===================================================================

Install and configure the Wazuh indexer as a single-node or multi-node cluster on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture using the assisted installation method. The Wazuh indexer is a scalable search and analytics engine that stores and indexes events forwarded by the Wazuh manager, enabling near real-time data analysis and several other features.

Wazuh indexer cluster installation
----------------------------------

The Wazuh indexer installation process is divided into three stages:

#. Initial configuration

#. Wazuh indexer node installation

#. Cluster initialization

.. note::

   You need root user privileges to run all the commands described below.

Before you start, choose the name and IP address of every Wazuh indexer, Wazuh manager, and Wazuh dashboard node. You create the certificates and passwords of all of them on one host, usually the first Wazuh indexer node, then copy one archive to every other node.

Initial configuration
^^^^^^^^^^^^^^^^^^^^^

Run these steps as root on one host of your deployment, for example, your first Wazuh indexer node. They configure your Wazuh deployment, create SSL certificates to encrypt communications between the Wazuh components, and generate random passwords to secure your installation. This host keeps the root CA and its private key in ``/etc/wazuh/ca``.

#. Download the Wazuh installation assistant and the configuration file:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
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

   For a **Wazuh manager cluster**, uncomment ``node_type`` in every manager entry. Set ``master`` on exactly one node and ``worker`` on all other nodes. For a single Wazuh manager, leave ``node_type`` commented. When two components share a host, set both entries to that host's IP address.

   For an **all-in-one installation**, keep one node in each section and set all three ``ip`` values to the address that users and agents use to reach the host. Skip step 4.

   Each node needs an ``ip``, a ``dns``, or both, and each accepts a list. The certificate of the node includes every value. The installation assistant configures the components with the first ``ip`` of each node, so give every node an ``ip``.

#. Run the Wazuh installation assistant with the ``--generate-config-files`` option to generate the Wazuh cluster key, certificates, and passwords required for the installation. The generated files are packaged in ``./wazuh-install-files.tar``, and the assistant moves ``config.yml`` into this archive. The step-by-step method uses ``wazuh-certificates.tar`` instead.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --generate-config-files -id

   If the Wazuh agents will connect to a Wazuh manager through a different address, such as a public IP, a NAT address, or a load balancer, add it with ``-as|--agent-san <ALTERNATE_ADDRESS>``. Agent enrollment tokens can only be created for an address that is in the listener certificate of the Wazuh manager.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --generate-config-files -id -as <ALTERNATE_ADDRESS>

   .. note::

      The root CA private key, ``root-ca.key``, stays in ``/etc/wazuh/ca`` on this host and is not included in the archive. The archive includes only the root CA certificate, ``root-ca.pem``. Back up ``/etc/wazuh/ca`` securely: you need the key to add nodes or renew certificates.

#. **Distributed deployments only:** Copy the ``wazuh-install-files.tar`` file and the ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh`` script from the host where you generated them to all servers in the distributed deployment, including the Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes. Use ``scp`` or another secure file transfer method available in your environment.

   The assisted method generates ``wazuh-install-files.tar``, while the step-by-step method generates ``wazuh-certificates.tar``.

Wazuh indexer nodes installation
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow these steps to install and configure a single-node or multi-node Wazuh indexer.

#. Download the Wazuh installation assistant. Skip this step if the Wazuh installation assistant is already in your working directory:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Run the Wazuh installation assistant with the option ``--wazuh-indexer`` and the node name to install and configure the Wazuh indexer. The node name must be the same one used in the ``config.yml`` file for the initial configuration, for example, ``indexer``:

   .. note::

      Make sure that a copy of ``wazuh-install-files.tar`` created during the initial configuration step, is placed in your working directory.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --wazuh-indexer indexer -id -d pre-release

   Where

   -  ``-id`` (``--install-dependencies``) installs the missing operating system packages that the installation requires, without asking, and removes the ones the assistant needed only for itself when it finishes. It does not install ``lsof``. Without ``lsof``, the assistant prints ``WARNING: Cannot find lsof. Port checking will be skipped.`` and continues.
   -  ``-d pre-release`` downloads the release candidate packages. Remove ``-d pre-release`` for the final release.

Repeat this stage of the installation process for every Wazuh indexer node in your cluster. The command installs, configures, and starts the Wazuh indexer on the host. Then proceed with initializing your single-node or multi-node cluster in the next stage.

The installation assistant sets the Wazuh indexer heap to half of the host's RAM. On a host that also runs the Wazuh manager or the Wazuh dashboard, set it to a quarter of the RAM, as **Memory locking** in the step-by-step section describes, and restart the Wazuh indexer.

Cluster initialization
^^^^^^^^^^^^^^^^^^^^^^

The final stage of installing the Wazuh indexer single-node or multi-node cluster consists of running the security admin script. The security admin script loads the new certificates and initializes the single-node or multi-node cluster.

.. note::

   You only have to initialize the cluster *once*, there is no need to run this command on every node.

#. Run the Wazuh installation assistant with the ``--start-cluster`` option on any Wazuh indexer node to run the security admin script:

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --start-cluster -id

Testing the cluster installation
--------------------------------

Verify that the Wazuh indexer installed correctly and the Wazuh indexer cluster is functioning as expected by following the steps below.

#. Run the following command on a Wazuh indexer node to print the Wazuh indexer admin user password.

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-

#. Run the following command to confirm that the installation is successful. Replace ``<WAZUH_INDEXER_ADDRESS>`` with the IP address of the Wazuh indexer. When prompted, enter the password that step 1 printed.

   .. code-block:: console

      # curl -k -u admin https://<WAZUH_INDEXER_ADDRESS>:9200

   The output is similar to the following. The ``build_type`` value is ``deb`` or ``rpm``, depending on the package.

   .. code-block:: none
      :class: output

      {
        "name" : "indexer",
        "cluster_name" : "wazuh-cluster",
        "cluster_uuid" : "2iYNKDCzR1ShJvSN-2vfOQ",
        "version" : {
          "distribution" : "opensearch",
          "number" : "3.6.0",
          "build_type" : "deb",
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

   The command output should be similar to the following:

   .. code-block:: none
      :class: output

      ip             heap.percent ram.percent cpu load_1m load_5m load_15m node.role node.roles                                        cluster_manager name
      192.168.33.135           37          98  15    0.70    0.99     0.79 dimr      cluster_manager,data,ingest,remote_cluster_client *               indexer

Next steps
----------

The Wazuh indexer is now successfully installed, and you can proceed with installing the Wazuh manager. To perform this action, see the :doc:`../wazuh-manager/installation-assistant` section.
