.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section covers installing dependencies, downloading and compiling the source code, running the installation wizard, and uninstalling the manager if needed.

Installing the Wazuh manager from sources
=========================================

The Wazuh manager is the core component of the Wazuh server that processes and analyzes security data from Wazuh agents and other sources. It includes the analysis engine for log processing, rule evaluation, and alert generation, along with services for the Wazuh agent enrollment and connection.

This section covers installing dependencies, downloading and compiling the source code, running the installation wizard, and uninstalling the manager if needed.

.. _installing_manager_from_sources_dependencies:

Installing dependencies
-----------------------

Before compiling Wazuh from sources, install the build tools for your operating system. The build requires GCC 13 or later and CMake 3.22.1 or later. These commands are tested with the Wazuh 5.0.0 RC2 sources on Ubuntu 26.04, Ubuntu 24.04, CentOS Stream 10, and Amazon Linux 2023. Other systems and versions are likely to work, but we can't guarantee it.

.. tabs::

   .. group-tab:: APT

      **Ubuntu 24.04 and Ubuntu 26.04**

      .. code-block:: console

         # apt-get update
         # apt-get install gcc g++ make cmake curl procps policycoreutils

   .. group-tab:: Yum

      **Amazon Linux 2023**

      .. code-block:: console

         # yum install make cmake gcc14 gcc14-c++ gcc14-libstdc++-static procps-ng policycoreutils tar gzip
         # export CC=gcc14-gcc CXX=gcc14-g++

      Amazon Linux 2023 includes GCC 11 by default. These commands install GCC 14 and select it for the build. Run the build and the ``install.sh`` script in the same shell, so that they use GCC 14.

   .. group-tab:: DNF

      **CentOS Stream 10**

      .. code-block:: console

         # dnf install make cmake gcc gcc-c++ curl procps-ng policycoreutils dnf-plugins-core
         # dnf config-manager --set-enabled crb
         # dnf install libstdc++-static

Installing the Wazuh manager
----------------------------

This section covers downloading the Wazuh source code, compiling it, and running the installation wizard.

Install the Wazuh indexer from packages first, as the :doc:`Installation guide </installation-guide/index>` describes. The Wazuh manager needs its password and certificates to start.

#. Download and extract the Wazuh source code:

   .. code-block:: console

      # curl -Ls https://github.com/wazuh/wazuh/archive/v|WAZUH_CURRENT_FROM_SOURCES|-|WAZUH_MANAGER_CURRENT_REV|.tar.gz | tar zx
      # cd wazuh-|WAZUH_CURRENT_FROM_SOURCES|-|WAZUH_MANAGER_CURRENT_REV|

#. If you have previously compiled for another platform, clean the build using the Makefile in ``src/``:

   .. code-block:: console

      # make -C src clean
      # make -C src clean-deps

#. Download the external dependencies and build the Wazuh manager. The build takes several minutes:

   .. code-block:: console

      # make -C src TARGET=manager deps
      # make -C src TARGET=manager -j$(nproc)

#. Create the ``/etc/wazuh-manager/local.env`` file:

   .. code-block:: console

      # install -d -m 0750 /etc/wazuh-manager
      # install -m 0600 /dev/null /etc/wazuh-manager/local.env

   If the Wazuh indexer runs on another host, add the password of its ``wazuh-manager`` user. The password is the ``WAZUH_INDEXER_MANAGER_PASSWORD`` value in ``/etc/wazuh-indexer/export/credentials.env`` on a Wazuh indexer node. Replace ``<WAZUH_INDEXER_MANAGER_PASSWORD>`` with it:

   .. code-block:: console

      # echo "WAZUH_INDEXER_MANAGER_PASSWORD=<WAZUH_INDEXER_MANAGER_PASSWORD>" >> /etc/wazuh-manager/local.env

   If Wazuh agents reach this node through an address it doesn't have, such as a load balancer or a NAT address, add ``WAZUH_MANAGER_REMOTED_CERT_SANS``. Include this node's own address too, because the list replaces the addresses the installer discovers:

   .. code-block:: console

      # echo "WAZUH_MANAGER_REMOTED_CERT_SANS=DNS:<LOAD_BALANCER_NAME>,IP:<NODE_IP>" >> /etc/wazuh-manager/local.env

#. Run the ``install.sh`` script. The script starts a wizard that guides you through the installation:

   .. code-block:: console

      # ./install.sh

#. When the script asks what kind of installation you want, type ``1`` to install the Wazuh manager:

   .. code-block:: none

      1- Installation type:
         1) manager
         2) agent
         Select an option [1-2]: 1

#. If the Wazuh indexer runs on another host, copy ``ca.pem``, ``manager-client.pem``, and ``manager-client-key.pem`` from ``/etc/wazuh-indexer/export`` on a Wazuh indexer node. Then place them in ``/etc/wazuh-manager/certs``:

   .. code-block:: console

      # install -m 0640 -o root -g wazuh-manager ca.pem /etc/wazuh-manager/certs/indexer-ca.pem
      # install -m 0640 -o root -g wazuh-manager manager-client.pem /etc/wazuh-manager/certs/indexer-connector.pem
      # install -m 0640 -o root -g wazuh-manager manager-client-key.pem /etc/wazuh-manager/certs/indexer-connector-key.pem

#. If the Wazuh indexer runs on another host, edit the ``<indexer>`` block in ``/etc/wazuh-manager/wazuh-manager.conf``. Replace ``127.0.0.1`` with the IP address of the Wazuh indexer:

   .. code-block:: xml
      :emphasize-lines: 3

      <indexer>
        <hosts>
          <host>https://<WAZUH_INDEXER_IP_ADDRESS>:9200</host>
        </hosts>

#. The installer doesn't start the Wazuh manager. Start the Wazuh manager and enable it to start at boot:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable --now wazuh-manager

      .. group-tab:: SysV init

         .. code-block:: console

            # service wazuh-manager start

   Run the following command to check that the Wazuh manager daemons are running:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-control status

   If the Wazuh manager doesn't start, run ``/var/wazuh-manager/bin/wazuh-manager-resolve-credentials --check``. It names each missing or invalid password and certificate, and prints ``check: no problem found`` when there is none.

Installing other Wazuh components
---------------------------------

After you install the Wazuh manager, install the Wazuh dashboard from packages, as the :doc:`Installation guide </installation-guide/index>` describes. The Wazuh dashboard isn't available for installation from sources.

Uninstall
---------

This section provides instructions for completely removing the Wazuh manager installation from your system.

#. To uninstall the Wazuh manager, set ``WAZUH_HOME`` to the installation path, ``/var/wazuh-manager`` by default. The configuration is in ``/etc/wazuh-manager``, which the last step removes:

   .. code-block:: console

      # WAZUH_HOME="/WAZUH/INSTALLATION/PATH"

#. Stop the service:

   .. code-block:: console

      # service wazuh-manager stop 2> /dev/null

#. Stop the daemon:

   .. code-block:: console

      # $WAZUH_HOME/bin/wazuh-manager-control stop 2> /dev/null

#. Remove the installation folder and all its content:

   .. code-block:: console

      # rm -rf $WAZUH_HOME

#. Delete the service:

   .. tabs::

      .. group-tab:: SysV init

         .. code-block:: console

            # [ -f /etc/rc.local ] && sed -i'' '/wazuh-manager-control start/d' /etc/rc.local
            # find /etc/{init.d,rc*.d} -name "*wazuh-manager*" | xargs rm -f

      .. group-tab:: Systemd

         .. code-block:: console

            # find /etc/systemd/system /usr/lib/systemd/system -name "wazuh-manager*" | xargs rm -f
            # systemctl daemon-reload

#. Remove the ``wazuh-manager`` user and group:

   .. code-block:: console

      # userdel wazuh-manager 2> /dev/null
      # groupdel wazuh-manager 2> /dev/null

   Remove the Wazuh manager configuration directory. It holds the CA private key that the Wazuh agents trust, so back up ``/etc/wazuh-manager/ca`` first if you plan to reinstall:

   .. code-block:: console

      # rm -rf /etc/wazuh-manager
