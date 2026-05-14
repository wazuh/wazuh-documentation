.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Discover the offline step-by-step process to install the Wazuh central components without connection to the Internet.

Offline installation guide
==========================

You can install Wazuh without an Internet connection. To install Wazuh offline, download the central components on a system with Internet access, then transfer and install them on the offline system. Wazuh supports both all-in-one and distributed deployments. The Wazuh manager, Wazuh indexer, and Wazuh dashboard can run on the same host in an all-in-one setup, or be installed on separate hosts for a distributed deployment. Wazuh supports 64-bit architectures, including x86_64/AMD64 and AARCH64/ARM64.

Check the :ref:`Requirements <installation_requirements>` section for more information about the hardware requirements and the recommended operating systems.

.. note::

   Root user privileges are required to run all the commands in this guide.

Prerequisites
-------------

-  Install ``curl``, ``tar``, ``openssl``, and ``setcap`` on the target system before performing the offline installation. ``gnupg`` might need to be installed as well for some Debian-based systems.
-  In some systems, the command ``cp`` is an alias for ``cp -i`` — verify this by running ``alias cp``. If this is your case, use ``unalias cp`` to avoid being asked for confirmation to overwrite files.

Download the packages and configuration files
---------------------------------------------

Run the Wazuh installation assistant on any Linux system with Internet access to download all files needed for offline installation. Choose the package format (RPM or DEB) and architecture (x86_64/AMD64 or AARCH64/ARM64).

#. Run the following commands on any Linux system with Internet access to download and prepare the Wazuh installation assistant:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.sh
      # chmod 744 wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.sh

#. Download packages by architecture and format:

   .. tabs::

      .. group-tab:: RPM

         **x86_64 / AMD64**

         .. code-block:: console

            # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.sh -dw rpm -da x86_64 -d pre-release

         **AARCH64 / ARM64**

         .. code-block:: console

            # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.sh -dw rpm -da aarch64 -d pre-release

      .. group-tab:: DEB

         **x86_64 / AMD64**

         .. code-block:: console

            # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.sh -dw deb -da amd64 -d pre-release

         **AARCH64 / ARM64**

         .. code-block:: console

            # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.sh -dw deb -da arm64 -d pre-release

#. Download the certificate configuration file.

   .. code-block:: console

      # curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.yml

#. Edit the ``config.yml`` file to prepare for certificate creation.

   -  If you are performing an all-in-one deployment, replace ``"<indexer-node-ip>"``, ``"<wazuh-manager-ip>"``, and ``"<dashboard-node-ip>"`` with ``127.0.0.1``.
   -  If you are performing a distributed deployment, replace the node names and IP addresses with the corresponding values. Do this for all the Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed. The tag ``node_type`` needs to be specified for all Wazuh manager nodes.

   .. code-block:: yaml
      :emphasize-lines: 5, 20, 35

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: indexer
            ip: "<indexer-node-ip>"
          #  dns: "<indexer-node-dns>"
          #- name: indexer-2
          #  ip: "<indexer-node-ip>"
          #  dns: "<indexer-node-dns>"
          #- name: indexer-3
          #  ip: "<indexer-node-ip>"
          #  dns:
          #    - "<indexer-node-dns>"

        # Wazuh manager nodes
        # If there is more than one Wazuh manager
        # node, each one must have a node_type
        manager:
          - name: manager
            ip: "<wazuh-manager-ip>"
          #  dns: "<wazuh-manager-dns>"
          #  node_type: master
          #- name: manager-2
          #  dns: "<wazuh-manager-dns>"
          #  node_type: worker
          #- name: manager-3
          #  ip: "<wazuh-manager-ip>"
          #  dns:
          #    - "<wazuh-manager-dns>"
          #  node_type: worker

        # Wazuh dashboard nodes
        dashboard:
          - name: dashboard
            ip: "<dashboard-node-ip>"
          #  dns: "<dashboard-node-dns>"

#. Run the following command to create the certificates. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster.

   .. code-block:: console

      # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.sh -g

#. Copy the following files to a directory on the host(s) from where the offline installation will be carried out. You can use ``scp`` for this.

   -  ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_INSTALL_ASSISTANT_REV|.sh``
   -  ``wazuh-offline.tar.gz``
   -  ``wazuh-install-files.tar``

Next steps
----------

After the Wazuh files are ready and copied to the specified hosts, install the Wazuh components.

.. toctree::
  :maxdepth: 1

  installation-assistant
  step-by-step
