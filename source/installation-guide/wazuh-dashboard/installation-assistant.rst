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

      Make sure that a copy of ``wazuh-install-files.tar`` created during the Wazuh indexer installation is placed in your working directory.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --wazuh-dashboard dashboard -id -d pre-release

   The default Wazuh web user interface port is 443, used by the Wazuh dashboard. You can change this port using the optional parameter ``-p <PORT_NUMBER>`` or ``--port <PORT_NUMBER>``. Some recommended ports are 8443, 8444, 8080, 8888, and 9000.

   Once the Wazuh installation is completed, the output shows the access credentials and a message that confirms that the installation was successful.

   .. code-block:: none
      :class: output

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>
         User: admin
         Password: the WAZUH_INDEXER_ADMIN_PASSWORD value in the credentials.env file of wazuh-install-files.tar, or in /etc/wazuh/credentials.env of a Wazuh indexer node

      INFO: Installation finished.

   You now have installed and configured Wazuh.

#. Get the ``<WAZUH_INDEXER_ADMIN_PASSWORD>``. On a Wazuh indexer node, run the following command. The quotes around the value are not part of the password.

   .. code-block:: console

      # grep WAZUH_INDEXER_ADMIN_PASSWORD /etc/wazuh/credentials.env

   On a host without the Wazuh indexer, read it from ``wazuh-install-files.tar`` instead:

   .. code-block:: console

      # tar -xOf wazuh-install-files.tar wazuh-install-files/credentials.env | grep WAZUH_INDEXER_ADMIN_PASSWORD

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: ``<WAZUH_INDEXER_ADMIN_PASSWORD>``

   When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser instead. Alternatively, you can :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

Securing your Wazuh installation
--------------------------------

The ``/etc/wazuh/credentials.env`` file contains the passwords of the Wazuh users generated during the installation. Each node receives only the passwords of the components installed on it, while the node where ``wazuh-install-files.tar`` was generated retains the complete set of credentials.

Securely store these passwords and remove the ``/etc/wazuh/credentials.env`` file from every node. Wazuh components do not use this file after the installation process is complete.

To change a password after installation, see the :doc:`password management </user-manual/user-administration/password-management>` documentation.

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

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
