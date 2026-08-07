.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Wazuh dashboard using the assisted installation method. The Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing security data.

Installing the Wazuh dashboard using the assisted installation method
=====================================================================

Install and configure the Wazuh dashboard on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture using the assisted installation method. Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing security data.

Wazuh dashboard installation
-----------------------------

#. Download the Wazuh installation assistant. Skip this step if you installed Wazuh indexer on the same server and the Wazuh installation assistant is already in your working directory:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Run the Wazuh installation assistant with the option ``--wazuh-dashboard`` and the node name to install and configure the Wazuh dashboard. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``dashboard``:

   .. note::

      Make sure that a copy of ``wazuh-install-files.tar`` created during the Wazuh indexer installation is placed in your working directory.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --wazuh-dashboard dashboard -id -d pre-release

   The default Wazuh web user interface port is 443, used by the Wazuh dashboard. You can change this port using the optional parameter ``-p <PORT_NUMBER>`` or ``--port <PORT_NUMBER>``. Some recommended ports are 8443, 8444, 8080, 8888, and 9000.

   Once the Wazuh installation is completed, the output shows the access credentials and a message that confirms that the installation was successful. The default password is ``admin``.

   .. code-block:: none

      INFO: --- Summary ---
      INFO: You can access the web interface https://<WAZUH_DASHBOARD_IP_ADDRESS>:443
         User: admin
         Password: <ADMIN_PASSWORD>

      INFO: Installation finished.

   You now have installed and configured Wazuh. 

#. After deployment, the web interface may take one to two minutes to become available while the Wazuh services finish initializing. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: ``<ADMIN_PASSWORD>``

   When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser instead.

Securing your Wazuh installation
--------------------------------

You have now installed and configured all the Wazuh central components. We recommend changing the default credentials to protect your infrastructure from possible attacks.

Select your deployment type and follow the instructions to change the default passwords for both the Wazuh API and the Wazuh indexer users.

.. tabs::

   .. group-tab:: All-in-one deployment

      .. tabs::

         .. group-tab:: Changing the password for a Wazuh indexer user

            Wazuh indexer users are defined in ``/etc/wazuh-indexer/opensearch-security/internal_users.yml``.

            #. Download the Wazuh passwords tool:

               .. code-block:: console

                  # wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

            #. To change the password for a Wazuh indexer user, run the passwords tool with the ``-u`` option and indicate the new password with the ``-p`` option. The password must have a length between 8 and 64 characters and contain at least one upper case letter, one lower case letter, a number, and one of the following symbols: ``.*+?-``.

               .. code-block:: console

                  # bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -u <USER> -p <PASSWORD>

               Where ``<USER>`` is the name of the user whose password you want to change and ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool will generate a random password.

               For example, to change the password of the ``admin`` user to ``Secr3tP4ssw*rd``, run the following command:

               .. code-block:: console

                  # bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -u admin -p Secr3tP4ssw*rd

               The command output looks similar to this:

               .. code-block:: none
                  :class: output

                  10/04/2026 13:40:45 INFO: Updating the internal users.
                  10/04/2026 13:41:04 INFO: A backup of the internal users has been saved in the /etc/wazuh-indexer/internalusers-backup folder.
                  10/04/2026 13:41:05 INFO: Generating password hash
                  10/04/2026 13:42:28 WARNING: Password changed. Remember to update the password in the Wazuh dashboard and the Wazuh manager nodes if necessary, and restart the services.

         .. group-tab:: Changing the password for a Wazuh manager API user

            To change the password for a Wazuh manager API user, use the following syntax:

            .. code-block:: console

               # bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A -au <API_ADMIN_USER> -ap <API_ADMIN_PASSWORD> -u <USER> -p <PASSWORD>

            Where ``<API_ADMIN_USERNAME>`` and ``<API_ADMIN_PASSWORD>`` are the Wazuh manager API administrator user and password, respectively. ``<USER>`` is the name of the user whose password you want to change, and ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool will generate a random password.

            For example, to change the password of the ``wazuh`` user to ``Hello*123``, run the following command:

            .. code-block:: console

               # bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A -au wazuh -ap wazuh -u wazuh -p Hello*123

            The command output looks similar to this:

            .. code-block:: none
               :class: output

               10/04/2026 13:52:43 INFO: The password for Wazuh API user wazuh is Hello*123

   .. group-tab:: Distributed deployment

      #. Download the Wazuh passwords tool on *any Wazuh indexer node*:

         .. code-block:: console

            # wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

      #. Use the Wazuh passwords tool to change the passwords of a specific Wazuh indexer user:

         .. code-block:: console

            # bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -u <USER> -p <PASSWORD>

         Where ``<USER>`` is the name of the user whose password you want to change and ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool will generate a random password.

         For example, to change the password of the ``admin`` user to ``Secr3tP4ssw*rd``, run the following command:

         .. code-block:: console

            # bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -u admin -p Secr3tP4ssw*rd

         The command output looks similar to this:

         .. code-block:: none
            :class: output

            10/04/2026 13:40:45 INFO: Updating the internal users.
            10/04/2026 13:41:04 INFO: A backup of the internal users has been saved in the /etc/wazuh-indexer/internalusers-backup folder.
            10/04/2026 13:41:05 INFO: Generating password hash
            10/04/2026 13:42:28 WARNING: Password changed. Remember to update the password in the Wazuh dashboard and the Wazuh manager nodes if necessary, and restart the services.

      #. On your *Wazuh manager master node*, download the Wazuh passwords tool and use it to change the password of the ``wazuh-wui`` Wazuh API user:

         .. code-block:: console

            # wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh
            # bash wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A -au wazuh -ap Hello*123 -u wazuh-wui -p P3ssword+098

         The command output looks similar to this:

         .. code-block:: none
            :class: output

            10/04/2026 13:56:47 INFO: The password for Wazuh API user wazuh-wui is P3ssword+098

      #. Replace ``<WAZUH_WUI_PASSWORD>`` in the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file with the new ``wazuh-wui`` password generated in the previous step:

         .. code-block:: yaml
            :emphasize-lines: 6

            wazuh_core.hosts:
              default:
                url: https://127.0.0.1
                port: 55000
                username: wazuh-wui
                password: "<WAZUH_WUI_PASSWORD>"
                run_as: true

      #. Restart the Wazuh dashboard to apply the changes:

         .. include:: /_templates/common/restart_dashboard.rst

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
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-server/index.html">
        <p class="link-boxes-label">Install the Wazuh manager</p>

.. image:: ../../images/installation/Server-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  </div>

The Wazuh environment is now ready, and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` section.
