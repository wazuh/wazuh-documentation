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

#. Install the following packages if missing. Amazon Linux 2023 already has the ``curl`` command, so don't install the ``curl`` package there:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install -y tar curl

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install tar

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install tar

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   If the Wazuh repository is already configured and enabled on this host (for example on the Wazuh indexer host), skip these steps.

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

         .. code-block:: console

            # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

   .. group-tab:: DNF

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH

      #. Add the repository:

         .. code-block:: console

            # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

.. _wazuh_dashboard_deploying_certificates:

Deploying certificates and passwords
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Do this **before installing the package**. The package then uses these files and passwords instead of generating its own.

.. note::

   If the Wazuh indexer and Wazuh manager are already installed on this host, skip this section. Do not extract the archive or place any files manually. The Wazuh dashboard package retrieves the passwords and certificates from their export directories during installation and issues its own certificate.

   Make sure that a copy of the ``wazuh-certificates.tar`` file, created in the Wazuh indexer :ref:`Certificate creation <certificates_creation>` stage, is placed in your working directory.

#. Replace ``<DASHBOARD_NODE_NAME>`` with your Wazuh dashboard node name, the same one used in the ``config.yml`` file to create the certificates. In our case, the node name is ``dashboard``. Then place the passwords, this node's certificates, the Wazuh indexer root CA, and the Wazuh manager CA:

   .. code-block:: console
      :emphasize-lines: 1

      # NODE_NAME=<DASHBOARD_NODE_NAME>
      # umask 022
      # mkdir wazuh-certificates
      # tar -xf wazuh-certificates.tar -C wazuh-certificates
      # install -d -m 0750 /etc/wazuh-dashboard /etc/wazuh-dashboard/certs
      # install -m 0600 /dev/null /etc/wazuh-dashboard/local.env
      # grep -E '^(WAZUH_INDEXER_KIBANASERVER_PASSWORD|WAZUH_MANAGER_WUI_PASSWORD)=' wazuh-certificates/credentials.env > /etc/wazuh-dashboard/local.env
      # install -m 0640 wazuh-certificates/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
      # install -m 0640 wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
      # install -m 0640 wazuh-certificates/root-ca.pem /etc/wazuh-dashboard/certs/indexer-ca.pem
      # install -m 0640 wazuh-certificates/root-ca.pem /etc/wazuh-dashboard/certs/manager-ca.pem
      # rm -rf wazuh-certificates

   The Wazuh dashboard uses ``manager-ca.pem`` to verify the Wazuh manager API. The Wazuh manager master node took its certificates from the same archive, so the archive's root CA verifies it. If the master node is the first Wazuh indexer node, the Wazuh manager package issued its own certificates instead. In that case, replace ``manager-ca.pem`` with the master node's ``/etc/wazuh-manager/export/ca.pem``. Only ``root`` can read that file. Run ``sudo cat /etc/wazuh-manager/export/ca.pem`` on the master node, save the output as ``manager-ca.pem`` in the working directory of this node, and run:

   .. code-block:: console

      # install -m 0640 manager-ca.pem /etc/wazuh-dashboard/certs/manager-ca.pem

   The ``wazuh-dashboard`` user does not exist yet. When the package is installed, it keeps these files and gives them their owner.

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

   Release candidate packages carry the version of the final release, ``|WAZUH_CURRENT|-|WAZUH_DASHBOARD_PKG_REV|``. Only their file names show the RC stage, for example ``wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_x64_DEB|.deb``, so ``dpkg -l`` and ``rpm -q`` show ``|WAZUH_CURRENT|-|WAZUH_DASHBOARD_PKG_REV|``.

.. _wazuh_dashboard_configuring:

Configuring the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file. The package ships it pre-filled with single-host values, so change only ``opensearch.hosts`` and ``wazuh_core.hosts.default.url``, and leave the rest of the file as shipped:

   #. ``server.host``: The package sets ``0.0.0.0``, which accepts connections on every address of the host. You don't need to change it.

   #. ``opensearch.hosts``: The package sets ``https://localhost:9200``. Replace it with the URL of the Wazuh indexer node, using the address you set in ``network.host`` in :ref:`Configuring the Wazuh indexer <wazuh_indexer_configuring>`. If you set ``network.host`` to one IP address, the Wazuh indexer listens only on that address. Then ``localhost`` fails, even when the Wazuh indexer runs on this host. If you left the package default, ``https://localhost:9200`` works.

      .. code-block:: yaml
         :emphasize-lines: 3

         server.host: 0.0.0.0
         server.port: 443
         opensearch.hosts: https://<WAZUH_INDEXER_ADDRESS>:9200
         opensearch.ssl.verificationMode: full

      Keep the ``opensearch.ssl.certificateAuthorities`` value that the package ships, ``/etc/wazuh-dashboard/certs/indexer-ca.pem``.

      For a Wazuh indexer cluster, list every node:

      .. code-block:: yaml

         opensearch.hosts: ["https://10.0.0.2:9200", "https://10.0.0.3:9200", "https://10.0.0.4:9200"]

   #. ``wazuh_core.hosts.default.url``: The Wazuh manager master node. Replace ``<WAZUH_MASTER_ADDRESS>`` with the IP address or DNS name of the master node. If the Wazuh manager master node is on this host, keep the shipped value, ``https://localhost``.

   #. Edit the block that the package shipped, and don't add a second one or a password line. The host in ``url`` must be in the Wazuh manager API certificate. To list its addresses, run this command on the master node:

      .. code-block:: console

         # openssl x509 -in /etc/wazuh-manager/certs/apid.pem -noout -ext subjectAltName

      .. code-block:: yaml
         :emphasize-lines: 3

         wazuh_core.hosts:
           default:
             url: https://<WAZUH_MASTER_ADDRESS>
             port: 55000
             username: wazuh-internal-client
             run_as: true
             ca: '/etc/wazuh-dashboard/certs/manager-ca.pem'

      .. note::

         Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and make sure the necessary ports are open.

Starting the Wazuh dashboard service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh dashboard service. The package neither enables nor starts it:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable wazuh-dashboard
            # systemctl start wazuh-dashboard

#. Run the following command to verify the Wazuh dashboard status. Check that the output shows ``Active: active (running)``:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl status wazuh-dashboard

   If the service fails to start, run ``journalctl -u wazuh-dashboard``. A ``MISSING WAZUH_INDEXER_KIBANASERVER_PASSWORD`` or ``MISSING WAZUH_MANAGER_WUI_PASSWORD`` line means that the password isn't in ``/etc/wazuh-dashboard/local.env``. A ``MISSING /etc/wazuh-dashboard/certs/indexer-ca.pem`` line means that the CA isn't there. An ``UNSAFE`` line means that a file or directory has the wrong owner or mode. Don't change the owner of ``/etc/wazuh-dashboard/certs`` to ``wazuh-dashboard``. To repair it, run:

   .. code-block:: console

      # chown -R root:wazuh-dashboard /etc/wazuh-dashboard/certs
      # chmod 0750 /etc/wazuh-dashboard/certs
      # chmod 0640 /etc/wazuh-dashboard/certs/*.pem

   Repeat :ref:`Deploying certificates and passwords <wazuh_dashboard_deploying_certificates>` if a file is missing. Then run ``systemctl reset-failed wazuh-dashboard``, because the service stops after three failed starts, and start the service again.

#. Get the ``admin`` password. On the Wazuh indexer node where you ran ``indexer-security-init.sh``, run the following command:

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer, and it allows you to access the Wazuh dashboard.

   -  **URL:** ``https://<WAZUH_DASHBOARD_ADDRESS>``
   -  **Username:** ``admin``
   -  **Password:** the password from step 3

   The browser warns that the certificate wasn't issued by a trusted authority, because Wazuh creates its own certificate authority. Add an exception in the browser, or, for better security, import the CA that issued the certificate into the browser's certificate manager. If you followed :ref:`Deploying certificates and passwords <wazuh_dashboard_deploying_certificates>`, it's the root CA of ``wazuh-certificates.tar``, also at ``/etc/wazuh-dashboard/certs/indexer-ca.pem``. If you skipped that section, the Wazuh dashboard package issued the certificate, and its CA is ``/etc/wazuh-dashboard/export/ca.pem``. Only ``root`` can read these files. Run ``sudo cat`` with the file's path on this host, and save the output as ``ca.pem`` on the computer that runs the browser. You can also :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

.. _wazuh_dashboard_securing_installation:

Securing your Wazuh installation
--------------------------------

Once every component is installed and running, each component stores the passwords it needs in its own keystore or database. The components don't need ``local.env`` or ``export/credentials.env`` after installation, and deleting them doesn't affect running or restarted components. If you keep them, keep them readable by root only. The components check them at every start and refuse to start if one has the wrong owner or permissions. Every node got its passwords from the ``credentials.env`` file you created in :ref:`Creating the passwords <wazuh_indexer_creating_passwords>`. The first Wazuh indexer node read it directly, and the other nodes got it through ``wazuh-certificates.tar``.

#. Log in to the Wazuh dashboard. A successful login shows that the Wazuh dashboard reaches the Wazuh indexer. Then open the menu and go to **Dashboard management** > **Server API**. In the **API connection** card, the **Host** is the address of the Wazuh manager master node, and the **Status** is **Online**. This shows that the Wazuh dashboard reaches the Wazuh manager. If the **Status** is **Offline**, check that the ``wazuh-manager`` service runs on the master node and that the Wazuh dashboard host reaches port ``55000/TCP``. Also check that the Wazuh manager API certificate lists the address in the **Host** field. To list the addresses in the certificate, run this command on the master node:

   .. code-block:: console

      # openssl x509 -in /etc/wazuh-manager/certs/apid.pem -noout -ext subjectAltName

   Also check that ``/etc/wazuh-dashboard/certs/manager-ca.pem`` exists on the Wazuh dashboard host, and run ``journalctl -u wazuh-dashboard -n 50`` to see the cause. Then click **Refresh**.

#. Securely store the five passwords. The ``credentials.env`` file in the working directory of the first Wazuh indexer node holds all five.

#. Remove the ``credentials.env`` you created on the first Wazuh indexer node and any ``wazuh-certificates.tar`` left behind, on every node. The passwords of each component stay in ``local.env`` and ``export/credentials.env`` in its configuration directory, readable by ``root`` only:

   .. code-block:: console

      # rm -f ./credentials.env ./wazuh-certificates.tar

#. Only the first Wazuh indexer node must hold the root CA private key, in ``/etc/wazuh-indexer/ca``. Back up this directory securely: you need the key to add nodes or renew certificates. A Wazuh manager or Wazuh dashboard package that issued its own certificates, for example on an all-in-one host, also keeps a root CA private key. It's in ``/etc/wazuh-manager/ca`` or ``/etc/wazuh-dashboard/ca``. Back it up too. Run the following command on every node to check:

   .. code-block:: console

      # ls -A /etc/wazuh-indexer/ca /etc/wazuh-manager/ca 2>/dev/null

   If the command lists ``root-ca.key`` on any other node, remove the key there. Never run this on the first Wazuh indexer node or on a host where a package issued its own certificates. Those hosts must keep their keys:

   .. code-block:: console

      # rm -f /etc/wazuh-indexer/ca/root-ca.key /etc/wazuh-manager/ca/root-ca.key /etc/wazuh-manager/ca/root-ca.srl

Editing ``local.env`` after installation doesn't change any password. To change a password after installation, see the :doc:`password management </user-manual/user-administration/password-management>` documentation.

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
