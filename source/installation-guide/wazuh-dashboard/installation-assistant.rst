.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Wazuh dashboard using the assisted installation method. The Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing security data.

Installing the Wazuh dashboard using the assisted installation method
=====================================================================

Install and configure the Wazuh dashboard on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture using the assisted installation method. Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing security data.

Wazuh dashboard installation
----------------------------

#. Download the Wazuh installation assistant. Skip this step if the Wazuh installation assistant is already in your working directory:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Run the Wazuh installation assistant with the option ``--wazuh-dashboard`` and the node name to install and configure the Wazuh dashboard. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``dashboard``:

   .. note::

      Make sure that a copy of ``wazuh-install-files.tar``, created in :ref:`Initial configuration <wazuh_indexer_assisted_initial_configuration>` of the Wazuh indexer assisted installation, is in your working directory.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --wazuh-dashboard dashboard -id -d pre-release

   The default Wazuh web user interface port is 443, used by the Wazuh dashboard. To use another port after the installation, set ``server.port`` in ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to the new port and restart the Wazuh dashboard service.

   When the installation finishes, the assistant prints the address of the Wazuh dashboard, the username, and the command that shows the password:

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      INFO: Wazuh dashboard web application initialized.
      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: to read it from wazuh-install-files.tar, run:
      INFO:         sudo tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env | grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' | cut -d= -f2-
      INFO: The passwords of the other users are in wazuh-install-files/credentials.env of wazuh-install-files.tar.
      INFO: Installation finished.

   The assistant prints one URL for each address in the Wazuh dashboard certificate. Use the one your browser can reach.

   To trust the certificate in your browser, import ``wazuh-install-files/root-ca.pem`` from ``wazuh-install-files.tar``. It is the same file as ``/etc/wazuh-dashboard/certs/indexer-ca.pem`` on this node: the assistant creates no separate Wazuh dashboard CA. Keep a copy of the file before :ref:`Securing your Wazuh installation <wazuh_dashboard_assisted_securing_installation>` removes the archive.

   You have now installed and configured the Wazuh dashboard.

#. Get the ``admin`` password. On a Wazuh indexer node, run the following command:

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-

   On a host without the Wazuh indexer, read it from ``wazuh-install-files.tar`` instead:

   .. code-block:: console

      # tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env | grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' | cut -d= -f2-

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer and it allows you to access the Wazuh dashboard.

   -  **URL:** ``https://<WAZUH_DASHBOARD_ADDRESS>``
   -  **Username:** ``admin``
   -  **Password:** the password from step 3

   The browser warns that the certificate wasn't issued by a trusted authority, because Wazuh creates its own certificate authority. Add an exception in the browser, or, for better security, import ``root-ca.pem`` into the browser's certificate manager. You can also :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

.. _wazuh_dashboard_assisted_securing_installation:

Securing your Wazuh installation
--------------------------------

After every component is installed and running, each component stores the passwords it needs in its own keystore or database. No component reads the password files after the installation, and deleting them doesn't affect running or restarted components. ``wazuh-install-files.tar`` holds all five passwords. On each node, the installation assistant writes the passwords that node's components need to ``local.env`` in the component's directory, for example ``/etc/wazuh-indexer/local.env``. The Wazuh indexer and Wazuh manager also keep a copy in ``export/credentials.env``, and the ``wazuh-ca`` directory beside the installation assistant holds all five.

#. Log in to the Wazuh dashboard. A successful login shows that the Wazuh dashboard reaches the Wazuh indexer. Then open the menu and go to **Dashboard management** > **Server API**. In the **API connection** card, the **Host** is the address of the Wazuh manager master node, and the **Status** is **Online**. This shows that the Wazuh dashboard reaches the Wazuh manager. If the **Status** is **Offline**, check that the ``wazuh-manager`` service runs on the master node and that the Wazuh dashboard host reaches port ``55000/TCP``. Also check that the Wazuh manager API certificate lists the address in the **Host** field. To list the addresses in the certificate, run this command on the master node:

   .. code-block:: console

      # openssl x509 -in /etc/wazuh-manager/certs/apid.pem -noout -ext subjectAltName

   Also check that ``/etc/wazuh-dashboard/certs/manager-ca.pem`` exists on the Wazuh dashboard host, and run ``journalctl -u wazuh-dashboard -n 50`` to see the cause. Then click **Refresh**.

#. Store the five passwords in a safe place. The ``credentials.env`` file in ``wazuh-install-files.tar`` holds all five. Run the following command to show them:

   .. code-block:: console

      # tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env

#. Remove the installation files and the copies of the passwords. On every node, run the following command from the directory where you ran the installation assistant:

   .. code-block:: console

      # rm -rf ./wazuh-install-files.tar ./config.yml ./artifact_urls_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.yaml ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

   The passwords of each component stay in ``local.env`` and ``export/credentials.env`` in its configuration directory, readable by ``root`` only.

#. Only the host where you ran ``--generate-config-files`` keeps the root CA private key, in the ``wazuh-ca`` directory beside the installation assistant. Back up the whole directory securely: its ``root-ca.key`` and ``credentials.env`` are what you need to add nodes or renew certificates later. After you change a password on another host, update ``wazuh-ca/credentials.env`` too. To add a node, don't run ``--generate-config-files`` again: it creates a new cluster key. On every node, the components hold only ``root-ca.pem``. Run the following command to check:

   .. code-block:: console

      # ls -A /etc/wazuh-indexer/ca /etc/wazuh-manager/ca 2>/dev/null

   If the command lists ``root-ca.key``, remove it there. Don't remove the key from the ``wazuh-ca`` directory, because you need it to add nodes or renew certificates later:

   .. code-block:: console

      # rm -f /etc/wazuh-indexer/ca/root-ca.key /etc/wazuh-manager/ca/root-ca.key /etc/wazuh-manager/ca/root-ca.srl

Editing ``local.env`` after installation doesn't change any password. To change a password after installation, see the :doc:`password management </user-manual/user-administration/password-management>` documentation.

Disable Wazuh updates
---------------------

The installation assistant installs the Wazuh packages from downloaded files and doesn't add a Wazuh package repository, so there is no repository to disable.

Next steps
----------

All the Wazuh central components are successfully installed.

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
