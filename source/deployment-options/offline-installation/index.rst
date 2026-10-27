.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn what to prepare and download to install the Wazuh central components without connection to the Internet, then choose the assisted or step-by-step installation method.

Offline installation guide
==========================

You can install Wazuh without an Internet connection. To install Wazuh offline, download the central components on a system with Internet access, then transfer and install them on the offline system. Wazuh supports both all-in-one and distributed deployments. The Wazuh manager, Wazuh indexer, and Wazuh dashboard can run on one host, an all-in-one setup, or on separate hosts, a distributed deployment. Wazuh supports 64-bit architectures, including x86_64/AMD64 and AARCH64/ARM64.

Check the :ref:`Requirements <installation_requirements>` section for more information about the hardware requirements and the recommended operating systems.

The download takes up to about 2.5 GB of disk space on the system with Internet access. On each offline host, the copied files and extracted packages take up to about 2.5 GB. The Wazuh components need space on top of that.

.. note::

   Root user privileges are required to run all the commands in this guide.

.. _offline_installation_prerequisites:

Prerequisites
-------------

-  Install ``curl``, ``tar``, ``openssl``, and ``gnupg`` on every offline host before the installation. On RPM systems, ``gnupg`` is ``gnupg2``. Also install the package that provides ``setcap``: ``libcap`` on RPM systems or ``libcap2-bin`` on DEB systems. The installation assistant stops with ``--offline-installation`` when ``gnupg`` is missing, because it checks the signature of every package.
-  The installation methods list the operating system packages they need, and ``wazuh-offline.tar.gz`` doesn't include them. For example, the assisted method requires gawk, which isn't a required package on Debian and Ubuntu, so a minimal image can lack it. If a listed package is missing and you have no local package mirror, download it on a system with Internet access. That system must run the same operating system version. Copy it with the other files, and install it on the offline host:

   -  DEB: run ``apt-get download <PACKAGE>``, which downloads only the package you name, then run ``dpkg -i <PACKAGE>_*.deb`` on the offline host.
   -  RPM: run ``dnf download --resolve --destdir <DIRECTORY> <PACKAGE>``, then run ``rpm -ivh <DIRECTORY>/*.rpm`` on the offline host to install every file it downloaded. ``--resolve`` skips dependencies already installed on the download system. Add ``--alldeps`` if that system has packages the offline host lacks.

-  On the download system, the installation assistant needs ``curl``, ``gawk``, and ``openssl`` for the ``-g`` command. It also needs ``tar``, ``grep``, ``sed``, ``coreutils``, and ``procps``. If one is missing, the assistant names it and stops. Add the ``-id|--install-dependencies`` option to the ``-dw`` and ``-g`` commands to install the missing packages. The assistant removes them when it finishes.

.. _offline_installation_download:

Download the packages and configuration files
---------------------------------------------

Run the Wazuh installation assistant on any Linux system with Internet access to download all files needed for offline installation. Choose the package format (RPM or DEB) and architecture (x86_64/AMD64 or AARCH64/ARM64).

#. Run the following commands on any Linux system with Internet access to download and prepare the Wazuh installation assistant.

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh
      # chmod 744 wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh

#. Download packages by architecture and format:

   .. tabs::

      .. group-tab:: RPM

         **x86_64 / AMD64**

         .. code-block:: console

            # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh -dw rpm -da x86_64 -d pre-release

         **AARCH64 / ARM64**

         .. code-block:: console

            # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh -dw rpm -da aarch64 -d pre-release

      .. group-tab:: DEB

         **x86_64 / AMD64**

         .. code-block:: console

            # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh -dw deb -da amd64 -d pre-release

         **AARCH64 / ARM64**

         .. code-block:: console

            # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh -dw deb -da arm64 -d pre-release

   Where:

   -  ``-dw|--download-wazuh`` sets the package format.
   -  ``-da|--download-arch`` sets the architecture.
   -  ``-d|--development pre-release`` downloads the release candidate packages from the pre-release repository.

   The assistant downloads the Wazuh indexer, Wazuh manager, and Wazuh dashboard packages and the Wazuh GPG key. It packs them into ``wazuh-offline.tar.gz`` in the current directory, about 1.05 GB for DEB and 1.25 GB for RPM. The file doesn't include operating system dependencies. The output shows ``INFO: Creating wazuh-offline.tar.gz with all packages.`` when it packs the file.

   .. note::

      For an all-in-one deployment, skip to step 6. The Wazuh packages create the root CA, the certificates, and the passwords during the installation, so ``config.yml`` and ``wazuh-install-files.tar`` aren't used. Steps 3 to 5 are only for a distributed deployment.

#. Download the certificate configuration file.

   .. code-block:: console

      # curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.yml

#. Edit the ``config.yml`` file to prepare for certificate creation. Replace the node names and IP addresses with the corresponding values. Do this for all the Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed. If there is more than one Wazuh manager node, set ``node_type`` to ``master`` on one node and to ``worker`` on the others. Don't use ``127.0.0.1`` for a Wazuh manager node. Its agent listener certificate would name only loopback addresses, so no agent could verify it, and the next step fails.

   .. code-block:: yaml
      :emphasize-lines: 5, 16, 28

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

   Each node needs an ``ip``, a ``dns``, or both, and each accepts a list. The certificate of the node includes every value.

#. Run the following command to create the certificates and the passwords. The command reads ``config.yml`` from the directory of the installation assistant and copies it into ``wazuh-install-files.tar``.

   .. code-block:: console

      # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh -g

   If Wazuh agents reach a Wazuh manager through an address that isn't in ``config.yml``, add it with ``-as|--agent-san <ALTERNATE_ADDRESS>``, once per address. Examples are a load balancer, a NAT address, or a public DNS name. Enrollment tokens can only be created for an address in the agent listener certificate. For example, the following command adds a NAT address and a public DNS name to the agent listener certificate of every Wazuh manager node:

   .. code-block:: console

      # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh -g -as 203.0.113.10 -as wazuh.example.com

   .. note::

      The ``-g`` option keeps the root CA, its private key ``root-ca.key``, and the five passwords in the ``wazuh-ca`` directory next to the installation assistant, or in the directory set in the ``WAZUH_CA_DIR`` environment variable. Only ``root-ca.pem`` goes into ``wazuh-install-files.tar``.

      Back up the ``wazuh-ca`` directory. You need it to add nodes and to renew certificates. A later ``-g`` run from the same directory reuses this root CA and these passwords. Remove the previous ``wazuh-install-files.tar`` first, because ``-g`` doesn't overwrite it.

      To give another deployment its own root CA and passwords, run ``-g`` from another directory or with another ``WAZUH_CA_DIR``.

   The ``wazuh-install-files.tar`` archive contains the private keys for all nodes and the five passwords in ``credentials.env``. Copy this file only to the Wazuh nodes that require it during installation, and remove it immediately after installation is complete.

#. Copy the following files to the same directory on each host where you install Wazuh. For an all-in-one deployment, copy only the script and ``wazuh-offline.tar.gz``.

   -  ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh``
   -  ``wazuh-offline.tar.gz``
   -  ``wazuh-install-files.tar``, only for a distributed deployment

   For example, run the following command with ``scp``. Replace ``<USER>``, ``<OFFLINE_HOST_IP>``, and ``<DIRECTORY>``. Leave out ``wazuh-install-files.tar`` for an all-in-one deployment.

   .. code-block:: console

      # scp wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh wazuh-offline.tar.gz wazuh-install-files.tar <USER>@<OFFLINE_HOST_IP>:<DIRECTORY>

   On each offline host, run the installation commands from that directory.

Next steps
----------

After the Wazuh files are ready and copied to the specified hosts, install the Wazuh components.

-  :doc:`Install Wazuh components using the assisted method <installation-assistant>`: the installation assistant installs and configures each component with one command. Use it unless you need to place every file and setting yourself.
-  :doc:`Install Wazuh components step by step <step-by-step>`: install each package and configure the certificates and settings yourself.

.. toctree::
   :hidden:
   :maxdepth: 1

   installation-assistant
   step-by-step
   securing-installation
   running-offline
