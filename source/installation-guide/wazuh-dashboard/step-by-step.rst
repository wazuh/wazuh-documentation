.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing security data.

Installing the Wazuh dashboard step-by-step
===========================================

Install and configure the Wazuh dashboard following step-by-step instructions. The Wazuh dashboard is a web interface for mining and visualizing security data.

.. note::

   You need root user privileges to run all the commands described below.

Wazuh dashboard installation
----------------------------

Follow these steps to install the Wazuh dashboard.

Installing package dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/dashboard/install-dependencies.rst

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   If the Wazuh repository is already configured and enabled on this host, for example on the Wazuh indexer host, skip these steps.

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

Deploying certificates and passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Do this **before installing the package**. The package then uses these files and passwords instead of generating its own.

.. note::

   Make sure that a copy of the ``wazuh-certificates.tar`` file, created in the Wazuh indexer :ref:`Certificate creation <certificates_creation>` stage, is placed in your working directory.

#. Replace ``<DASHBOARD_NODE_NAME>`` with your Wazuh dashboard node name, the same one used in the ``config.yml`` file to create the certificates. In our case, the node name is ``dashboard``. Then place the root CA, the passwords, and this node's certificates:

   .. code-block:: console

      # NODE_NAME=<DASHBOARD_NODE_NAME>

   .. code-block:: console

      # umask 022
      # mkdir wazuh-certificates
      # tar -xf wazuh-certificates.tar -C wazuh-certificates
      # install -d -m 0700 -o root -g root /etc/wazuh /etc/wazuh/ca
      # install -m 0644 wazuh-certificates/root-ca.pem /etc/wazuh/ca/root-ca.pem
      # [ -e /etc/wazuh/credentials.env ] || install -m 0600 /dev/null /etc/wazuh/credentials.env
      # for key in WAZUH_INDEXER_KIBANASERVER_PASSWORD WAZUH_MANAGER_WUI_PASSWORD; do
          sed -i "/^${key}=/d" /etc/wazuh/credentials.env
          grep "^${key}=" wazuh-certificates/credentials.env >> /etc/wazuh/credentials.env
        done
      # mkdir -p /etc/wazuh-dashboard/certs
      # install -m 0400 wazuh-certificates/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
      # install -m 0400 wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
      # rm -rf wazuh-certificates

   The ``wazuh-dashboard`` user does not exist yet. When the package is installed, it gives these files to the ``wazuh-dashboard`` user and installs ``root-ca.pem`` in ``/etc/wazuh-dashboard/certs/``.

#. **Recommended action**: If no other Wazuh components will be installed on this node, remove the ``wazuh-certificates.tar`` file.

   .. code-block:: console

      # rm -f ./wazuh-certificates.tar

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh dashboard package:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-dashboard|WAZUH_DASHBOARD_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-dashboard|WAZUH_DASHBOARD_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install wazuh-dashboard|WAZUH_DASHBOARD_RPM_PKG_INSTALL|

Configuring the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Make sure the service user owns the certificates and restrict their directory:

   .. code-block:: console

      # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs
      # chmod 500 /etc/wazuh-dashboard/certs

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file. The package ships it pre-filled with single-host values, so change only ``opensearch.hosts`` and ``wazuh_core.hosts.default.url``, and leave the rest of the file as shipped:

   #. ``server.host``: The package sets ``0.0.0.0``, which accepts connections on every address of the host. You don't need to change it.

   #. ``opensearch.hosts``: The package sets ``https://localhost:9200``. Replace it with the URL of the Wazuh indexer node, using the address you set in ``network.host`` in **Configuring the Wazuh indexer**. The Wazuh indexer listens only on that address, so ``localhost`` fails even when the Wazuh indexer runs on this host.

      .. code-block:: yaml
         :emphasize-lines: 3

         server.host: 0.0.0.0
         server.port: 443
         opensearch.hosts: https://<WAZUH_INDEXER_ADDRESS>:9200
         opensearch.ssl.verificationMode: certificate

      For a Wazuh indexer cluster, list every node:

      .. code-block:: yaml

         opensearch.hosts: ["https://10.0.0.2:9200", "https://10.0.0.3:9200", "https://10.0.0.4:9200"]

   #. ``wazuh_core.hosts.default.url``: The Wazuh manager master node. Replace ``<WAZUH_MASTER_ADDRESS>`` with the IP address or DNS name of the master node. If the Wazuh manager master node is on this host, keep the shipped value, ``https://localhost``.

      .. code-block:: yaml
         :emphasize-lines: 3

         wazuh_core.hosts:
           default:
             url: https://<WAZUH_MASTER_ADDRESS>
             port: 55000
             username: wazuh-wui
             run_as: true

      .. note::

         Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and ensure the necessary ports are open.

Starting the Wazuh dashboard service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh dashboard service:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable wazuh-dashboard
            # systemctl start wazuh-dashboard

      .. group-tab:: SysV Init

         Choose one option according to your operating system:

         #. RPM-based operating system:

            .. code-block:: console

               # chkconfig --add wazuh-dashboard
               # service wazuh-dashboard start

         #. Debian-based operating system:

            .. code-block:: console

               # update-rc.d wazuh-dashboard defaults 95 10
               # service wazuh-dashboard start

#. Run the following command to verify the Wazuh dashboard status. Check that the output shows ``Active: active (running)``:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl status wazuh-dashboard

      .. group-tab:: SysV Init

         .. code-block:: console

            # service wazuh-dashboard status

   If the service stops at once, run ``journalctl -u wazuh-dashboard``. A ``MISSING WAZUH_INDEXER_KIBANASERVER_PASSWORD`` or ``MISSING WAZUH_MANAGER_WUI_PASSWORD`` line means that the password is not in ``/etc/wazuh/credentials.env``. Repeat **Deploying certificates and passwords**, then start the service again.

#. Get the ``admin`` password. On the Wazuh indexer node where you ran ``indexer-security-init.sh``, run the following command:

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | tr -d '"' | sort -u | cut -d= -f2-

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer, and it allows you to access the Wazuh dashboard.

   -  **URL:** ``https://<WAZUH_DASHBOARD_ADDRESS>``
   -  **Username:** ``admin``
   -  **Password:** the password from step 3

   The browser warns that the certificate wasn't issued by a trusted authority. Add an exception in the browser, or, for better security, import ``root-ca.pem`` into the browser's certificate manager. You can also :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

.. _wazuh_dashboard_securing_installation:

Securing your Wazuh installation
--------------------------------

Once every component is installed and running, each component stores the passwords it needs in its own keystore or database. Nothing reads ``/etc/wazuh/credentials.env`` after installation, and deleting it doesn't affect running or restarted components. Every node received the passwords it needs from the ``credentials.env`` file you created in **Creating the passwords**, directly on the first Wazuh indexer node and through ``wazuh-certificates.tar`` on the others.

#. Log in to the Wazuh dashboard. A successful login shows that the Wazuh dashboard reaches the Wazuh indexer. Then open the menu and go to **Dashboard management** > **Server API**. In the **API connection** card, the **Host** is the address of the Wazuh manager master node, and the **Status** is **Online**. This shows that the Wazuh dashboard reaches the Wazuh manager. If the **Status** is **Offline**, check that the ``wazuh-manager`` service is running on the master node and that port 55000/TCP is reachable from the Wazuh dashboard host, then click **Refresh**.

#. Securely store the five passwords. The ``credentials.env`` file in the working directory of the first Wazuh indexer node holds all five.

#. Remove the credentials file, the ``credentials.env`` you created on the first Wazuh indexer node, and any ``wazuh-certificates.tar`` left behind, on every node:

   .. code-block:: console

      # rm -f /etc/wazuh/credentials.env ./credentials.env ./wazuh-certificates.tar

#. Only the first Wazuh indexer node must hold the root CA private key. On every other node, ``/etc/wazuh/ca`` must hold only ``root-ca.pem``:

   .. code-block:: console

      # ls -A /etc/wazuh/ca

   If the command lists ``root-ca.key`` on any node other than the first Wazuh indexer node, remove the key there. Never run this on the first Wazuh indexer node, which must keep the key to add nodes or renew certificates:

   .. code-block:: console

      # rm -f /etc/wazuh/ca/root-ca.key /etc/wazuh/ca/root-ca.srl

To change a password after installation, see the :doc:`password management </user-manual/user-administration/password-management>` documentation.

Disable Wazuh updates
---------------------

After all Wazuh components on this host are installed, disable the Wazuh repository to prevent accidental upgrades:

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

All the Wazuh central components are successfully installed and secured.

.. raw:: html

  <div class="link-boxes-group layout-3" data-step="4">
    <div class="steps-line">
      <div class="steps-number past-step">1</div>
      <div class="steps-number past-step">2</div>
      <div class="steps-number past-step">3</div>
    </div>
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-indexer/index.html">
        <p class="link-boxes-label">Install the Wazuh indexer</p>

.. image:: ../../images/installation/Indexer-Circle.png
     :alt: Wazuh indexer logo
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-manager/index.html">
        <p class="link-boxes-label">Install the Wazuh manager</p>

.. image:: ../../images/installation/Server-Circle.png
     :alt: Wazuh manager logo
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-Circle.png
     :alt: Wazuh dashboard logo
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  </div>


The Wazuh environment is now ready, and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` section.

If you want to uninstall the Wazuh dashboard, see :ref:`Uninstall the Wazuh dashboard <uninstall_dashboard>`.
