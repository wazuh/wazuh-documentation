.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn what to prepare and download to install the Wazuh central components without connection to the Internet, then choose the assisted or step-by-step installation method.

Offline installation guide
==========================

You can install Wazuh without an Internet connection. To install Wazuh offline, download the central components on a system with Internet access, then transfer and install them on the offline system. Wazuh supports both all-in-one and distributed deployments. The Wazuh manager, Wazuh indexer, and Wazuh dashboard can run on the same host in an all-in-one setup, or be installed on separate hosts for a distributed deployment. Wazuh supports 64-bit architectures, including x86_64/AMD64 and AARCH64/ARM64.

Check the :ref:`Requirements <installation_requirements>` section for more information about the hardware requirements and the recommended operating systems.

The download takes up to about 2.5 GB of disk space on the system with Internet access. On each offline host, the copied files and the packages extracted from them take up to about 2.5 GB, in addition to the space the Wazuh components need.

.. note::

   Root user privileges are required to run all the commands in this guide.

.. _offline_installation_prerequisites:

Prerequisites
-------------

-  Install ``curl``, ``tar``, ``openssl``, and the package that provides ``setcap``, ``libcap`` on RPM systems or ``libcap2-bin`` on DEB systems, on the target system before performing the offline installation. ``gnupg`` might need to be installed as well for some Debian-based systems.
-  The installation methods list the operating system packages they need, and ``wazuh-offline.tar.gz`` doesn't include them. For example, the stock Ubuntu 24.04 image lacks ``apt-transport-https``, which the assisted method requires. If a listed package is missing on the offline host and you have no local package mirror, download it on a system with Internet access that runs the same operating system version. Copy it with the other files, and install it on the offline host:

   -  DEB: run ``apt-get download <PACKAGE>``, which downloads only the package you name, then run ``dpkg -i <PACKAGE>_*.deb`` on the offline host.
   -  RPM: run ``dnf download --resolve --destdir <DIRECTORY> <PACKAGE>``, then run ``rpm -ivh <DIRECTORY>/*.rpm`` on the offline host to install every file it downloaded. ``--resolve`` skips dependencies already installed on the download system. Add ``--alldeps`` if that system has packages the offline host lacks.

-  On the system where you download the packages, the installation assistant needs ``curl`` and ``gawk``. Some distributions, such as Ubuntu, don't install ``gawk`` by default. Install it, or add the ``-id|--install-dependencies`` option to the ``-dw`` and ``-g`` commands, and the assistant installs the missing packages.

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

   Where

   -  ``-dw|--download-wazuh`` sets the package format.
   -  ``-da|--download-arch`` sets the architecture.
   -  ``-d|--development pre-release`` downloads the release candidate packages from the pre-release repository.

   The assistant downloads the Wazuh indexer, Wazuh manager, and Wazuh dashboard packages and packs them into ``wazuh-offline.tar.gz`` in the current directory, about 1.05 GB for DEB and 1.25 GB for RPM. The file doesn't include operating system dependencies. The output shows ``INFO: Creating wazuh-offline.tar.gz with all packages.`` when it packs the file.

#. Download the certificate configuration file.

   .. code-block:: console

      # curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.yml

   To verify the packages before you install them, also download the Wazuh GPG key, and copy ``GPG-KEY-WAZUH`` with the other files in step 6:

   .. code-block:: console

      # curl -sO https://packages.wazuh.com/key/GPG-KEY-WAZUH

#. Edit the ``config.yml`` file to prepare for certificate creation.

   -  If you are using the assisted all-in-one deployment, skip to step 6.
   -  If you are performing a distributed deployment, replace the node names and IP addresses with the corresponding values. Do this for all the Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes. Add as many node fields as needed. If there is more than one Wazuh manager node, set ``node_type`` on each one: ``master`` on one node and ``worker`` on the others.

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

#. Run the following command to create the certificates and the passwords. For a multi-node cluster, these certificates need to be later deployed to all Wazuh instances in your cluster. The command reads ``config.yml`` from the directory of the installation assistant and moves it into ``wazuh-install-files.tar``.

   .. code-block:: console

      # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh -g

   If the Wazuh agents reach a Wazuh manager through an address that is not in ``config.yml``, such as a load balancer, a NAT address, or a public DNS name, add it with ``-as|--agent-san <ALTERNATE_ADDRESS>``, once per address. Enrollment tokens can only be created for an address in the agent listener certificate. For example, the following command adds a NAT address and a public DNS name to the agent listener certificate of every Wazuh manager node:

   .. code-block:: console

      # ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh -g -as 203.0.113.10 -as wazuh.example.com

   .. note::

      The ``-g`` option creates the root CA in ``/etc/wazuh/ca`` and stores its private key, ``root-ca.key``, only on the system where the command is run. This key is not included in ``wazuh-install-files.tar``. Back up ``/etc/wazuh/ca``, as it is required to generate certificates for additional nodes and to renew existing certificates. The ``-g`` option also saves the five passwords in ``/etc/wazuh/credentials.env`` on this system, and every later ``-g`` run on this system reuses them and the same root CA. To give another deployment its own passwords and root CA, create its files on another system.

      The ``wazuh-install-files.tar`` archive contains the private keys for all nodes, along with the passwords stored in ``credentials.env``. Copy this file only to the Wazuh nodes that require it during installation, and remove it immediately after installation is complete.

#. Copy the following files to the same directory on each host where you install Wazuh. For an all-in-one deployment with the assisted method, copy only the script and ``wazuh-offline.tar.gz``.

   -  ``wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh``
   -  ``wazuh-offline.tar.gz``
   -  ``wazuh-install-files.tar``
   -  ``GPG-KEY-WAZUH``, for the step-by-step method, if you downloaded it in step 3

   For example, run the following command with ``scp``. Replace ``<USER>``, ``<OFFLINE_HOST_IP>``, and ``<DIRECTORY>``. Leave out ``wazuh-install-files.tar`` for an all-in-one deployment with the assisted method, and ``GPG-KEY-WAZUH`` if you didn't download it.

   .. code-block:: console

      # scp wazuh-install-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh wazuh-offline.tar.gz wazuh-install-files.tar GPG-KEY-WAZUH <USER>@<OFFLINE_HOST_IP>:<DIRECTORY>

   On each offline host, run the installation commands from that directory.

Next steps
----------

After the Wazuh files are ready and copied to the specified hosts, install the Wazuh components.

-  :doc:`Install Wazuh components using the assisted method <installation-assistant>`: the installation assistant installs and configures each component with one command. Use it unless you need to place every file and setting yourself.
-  :doc:`Install Wazuh components step by step <step-by-step>`: install each package and manually configure the certificates and settings.

.. toctree::
   :hidden:
   :maxdepth: 1

   installation-assistant
   step-by-step
   securing-installation
   running-offline
