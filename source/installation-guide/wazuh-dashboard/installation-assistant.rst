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

      Make sure that a copy of ``wazuh-install-files.tar``, created in **Initial configuration** of the Wazuh indexer assisted installation, is in your working directory.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --wazuh-dashboard dashboard -id -d pre-release

   The default Wazuh web user interface port is 443, used by the Wazuh dashboard. To use another port after the installation, set ``server.port`` in ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` to the new port and restart the Wazuh dashboard service.

   When the installation finishes, the assistant prints the address of the Wazuh dashboard, the username, and the command that shows the password:

   .. code-block:: none
      :class: output

      INFO: Wazuh dashboard web application initialized.
      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_ADDRESS>:443
      INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
      INFO:     Password: to read it from wazuh-install-files.tar, run:
      INFO:         sudo tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env | grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' | cut -d= -f2-
      INFO: The other users of the deployment are listed at the top of wazuh-install-files/credentials.env of wazuh-install-files.tar.
      INFO: Installation finished.

   The assistant prints one URL for each address in the Wazuh dashboard certificate. Use the one your browser can reach.

   You have now installed and configured the Wazuh dashboard.

#. Get the ``admin`` password. On a Wazuh indexer node, run the following command:

   .. code-block:: console

      # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh/credentials.env | cut -d= -f2-

   On a host without the Wazuh indexer, read it from ``wazuh-install-files.tar`` instead:

   .. code-block:: console

      # tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env | grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' | cut -d= -f2-

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer and it allows you to access the Wazuh dashboard.

   -  **URL:** ``https://<WAZUH_DASHBOARD_ADDRESS>``
   -  **Username:** ``admin``
   -  **Password:** the password from step 3

   The browser warns that the certificate wasn't issued by a trusted authority. Add an exception in the browser, or, for better security, import ``root-ca.pem`` into the browser's certificate manager. You can also :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

Securing your Wazuh installation
--------------------------------

After every component is installed and running, each component stores the passwords it needs in its own keystore or database. No component reads ``/etc/wazuh/credentials.env`` after the installation, and deleting it doesn't affect running or restarted components. ``wazuh-install-files.tar`` holds all five passwords. On each node, the installation assistant writes to ``/etc/wazuh/credentials.env`` only the passwords that node's components need, and the host where you ran ``--generate-config-files`` holds all five.

#. Log in to the Wazuh dashboard. A successful login shows that the Wazuh dashboard reaches the Wazuh indexer. Then open the menu and go to **Dashboard management** > **Server API**. In the **API connection** card, the **Host** is the address of the Wazuh manager master node, and the **Status** is **Online**. This shows that the Wazuh dashboard reaches the Wazuh manager. If the **Status** is **Offline**, check that the ``wazuh-manager`` service is running on the master node, and that port 55000/TCP is reachable from the Wazuh dashboard host, then click **Refresh**.

#. Store the five passwords in a safe place. The ``credentials.env`` file in ``wazuh-install-files.tar`` holds all five. Run the following command to show them:

   .. code-block:: console

      # tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env

#. Remove the credentials file and the installation files. On every node, run the following command from the directory where you ran the installation assistant:

   .. code-block:: console

      # rm -rf /etc/wazuh/credentials.env ./wazuh-install-files.tar ./artifact_urls_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.yaml ./wazuh-install-packages ./wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Only the host where you ran ``--generate-config-files`` keeps the root CA private key. On every other node, ``/etc/wazuh/ca`` holds only ``root-ca.pem``. Run the following command to check:

   .. code-block:: console

      # ls -A /etc/wazuh/ca

   If the command lists ``root-ca.key`` on any other node, remove the key there. Don't remove it from the host where you ran ``--generate-config-files``, because you need the key to add nodes or renew certificates later:

   .. code-block:: console

      # rm -f /etc/wazuh/ca/root-ca.key /etc/wazuh/ca/root-ca.srl

To change a password after installation, see the :doc:`password management </user-manual/user-administration/password-management>` documentation.

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
