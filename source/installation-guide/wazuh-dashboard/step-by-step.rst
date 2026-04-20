.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing the events and archives.

Installing the Wazuh dashboard step by step
===========================================

Install and configure the Wazuh dashboard following step-by-step instructions. The Wazuh dashboard is a web interface for mining and visualizing the Wazuh manager alerts and archived events.

.. note:: You need root user privileges to run all the commands described below.

Wazuh dashboard installation
----------------------------

Follow these steps to install the Wazuh dashboard.

Installing package dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/dashboard/install-dependencies.rst

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   If you are installing the Wazuh dashboard on the same host as the Wazuh indexer or the Wazuh manager, you may skip these steps as you may have added the Wazuh repository already.

.. tabs::

   .. group-tab:: APT

      .. include:: /_templates/installations/common/deb/add-repository.rst

   .. group-tab:: Yum

      .. include:: /_templates/installations/common/yum/add-repository.rst

   .. group-tab:: DNF

      .. include:: /_templates/installations/common/dnf/add-repository.rst

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh dashboard package.

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

  #. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file and replace the following values:

     #. ``server.host``: This setting specifies the host of the Wazuh dashboard server. To allow remote users to connect, set the value to the IP address or DNS name of the Wazuh dashboard server. The value ``0.0.0.0`` will accept all the available IP addresses of the host.

     #. ``opensearch.hosts``: The URLs of the Wazuh indexer instances to use for all your queries. The Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The addresses of the nodes can be separated by commas. For example,  ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

        .. code-block:: yaml
          :emphasize-lines: 1,3

             server.host: 0.0.0.0
             server.port: 443
             opensearch.hosts: https://localhost:9200
             opensearch.ssl.verificationMode: certificate

     #. ``wazuh_core.hosts.url``: This setting specifies the Wazuh manager master node. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address or hostname of the Wazuh manager master node.

        .. code-block:: yaml

             wazuh_core.hosts:
               default:
                 url: https://<WAZUH_MANAGER_IP_ADDRESS>
                 port: 55000
                 username: wazuh-wui
                 password: wazuh-wui
                 run_as: true

.. include:: /_templates/installations/common/firewall-ports-note.rst


Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

   .. note::
     Make sure that a copy of ``wazuh-certificates.tar`` file, created during the initial configuration step, is placed in your working directory.

   #. Replace ``<DASHBOARD_NODE_NAME>`` with your Wazuh dashboard node name, the same one used in the ``config.yml`` file to create the certificates. In our case, the node name is, ``dashboard``. Then move the certificates to their corresponding location:

       .. code-block:: console

         # NODE_NAME=<DASHBOARD_NODE_NAME>

       .. code-block:: console

         # mkdir /etc/wazuh-dashboard/certs
         # tar -xf ./wazuh-certificates.tar -C /etc/wazuh-dashboard/certs/ ./$NODE_NAME.pem ./$NODE_NAME-key.pem ./root-ca.pem
         # [ ! -e /etc/wazuh-dashboard/certs/dashboard.pem ] && mv -n /etc/wazuh-dashboard/certs/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
         # [ ! -e /etc/wazuh-dashboard/certs/dashboard-key.pem ] && mv -n /etc/wazuh-dashboard/certs/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
         # chmod 500 /etc/wazuh-dashboard/certs
         # chmod 400 /etc/wazuh-dashboard/certs/*
         # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs


Starting the Wazuh dashboard service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh dashboard service.

   .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer and it allows you to access the Wazuh dashboard.

   - **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   - **Username**: ``admin``
   - **Password**: ``admin``

   When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem``  file previously generated can be imported to the certificate manager of the browser. Alternatively, you can :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

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

                  # wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-5.0.0-beta1.sh

            #. To change the password for a Wazuh indexer user, run the passwords tool with the ``-u`` option and indicate the new password with the ``-p`` option. The password must have a length between 8 and 64 characters and contain at least one upper case letter, one lower case letter, a number, and one of the following symbols: ``.*+?-``.

               .. code-block:: console

                  # bash wazuh-passwords-tool-5.0.0-beta1.sh -u <USER> -p <PASSWORD>

               Where ``<USER>`` is the name of the user whose password you want to change and ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool will generate a random password.

               For example, to change the password of the ``admin`` user to ``Secr3tP4ssw*rd``, run the following command:

               .. code-block:: console

                  # bash wazuh-passwords-tool-5.0.0-beta1.sh -u admin -p Secr3tP4ssw*rd

               .. code-block:: console
                  :class: output

                  10/04/2026 13:40:45 INFO: Updating the internal users.
                  10/04/2026 13:41:04 INFO: A backup of the internal users has been saved in the /etc/wazuh-indexer/internalusers-backup folder.
                  10/04/2026 13:41:05 INFO: Generating password hash
                  10/04/2026 13:42:28 WARNING: Password changed. Remember to update the password in the Wazuh dashboard and the Wazuh manager nodes if necessary, and restart the services.

         .. group-tab:: Changing the password for a Wazuh manager API user

            To change the password for a Wazuh manager API user, use the following syntax:

            .. code-block:: console

               # bash wazuh-passwords-tool-5.0.0-beta1.sh -A -au <ADMIN_USER> -ap <ADMIN_PASSWORD> -u <USER> -p <PASSWORD>

            Where ``<ADMIN_USER>`` and ``<ADMIN_PASSWORD>`` are the Wazuh manager API administrator user and password, respectively. ``<USER>`` is the name of the user whose password you want to change, and ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool will generate a random password.

            For example, to change the password of the ``wazuh`` user to ``Hello*123``, run the following command:

            .. code-block:: console

               # bash wazuh-passwords-tool-5.0.0-beta1.sh -A -au wazuh -ap wazuh -u wazuh -p Hello*123

            .. code-block:: console
               :class: output

               10/04/2026 13:52:43 INFO: The password for Wazuh API user wazuh is Hello*123


   .. group-tab:: Distributed deployment

      .. tabs::

         .. group-tab:: Changing the password for a Wazuh indexer user

            #. Download the Wazuh passwords tool on any Wazuh indexer node:

               .. code-block:: console

                  # wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-5.0.0-beta1.sh

            #. Use the Wazuh passwords tool to change the passwords of a specific Wazuh indexer user:

               .. code-block:: console

                  # bash wazuh-passwords-tool-5.0.0-beta1.sh -u <USER> -p <PASSWORD>

               Where ``<USER>`` is the name of the user whose password you want to change and ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool will generate a random password.

               For example, to change the password of the ``admin`` user to ``Secr3tP4ssw*rd``, run the following command:

               .. code-block:: console

                  # bash wazuh-passwords-tool-5.0.0-beta1.sh -u admin -p Secr3tP4ssw*rd

               .. code-block:: console
                  :class: output

                  10/04/2026 13:40:45 INFO: Updating the internal users.
                  10/04/2026 13:41:04 INFO: A backup of the internal users has been saved in the /etc/wazuh-indexer/internalusers-backup folder.
                  10/04/2026 13:41:05 INFO: Generating password hash
                  10/04/2026 13:42:28 WARNING: Password changed. Remember to update the password in the Wazuh dashboard and the Wazuh manager nodes if necessary, and restart the services.

         .. group-tab:: Changing the password for a Wazuh manager API user

            #. On your Wazuh manager master node, download the Wazuh passwords tool and use it to change the password of the ``wazuh-wui`` Wazuh API user:

               .. code-block:: console

                  # wget https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-5.0.0-beta1.sh
                  # bash wazuh-passwords-tool-5.0.0-beta1.sh -A -au wazuh -ap Hello*123 -u wazuh-wui -p P3ssword+098

               .. code-block:: console
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

      #. Restart the Wazuh dashboard to apply the changes.

         .. include:: /_templates/common/restart_dashboard.rst


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

If you want to uninstall the Wazuh dashboard, see :ref:`uninstall_dashboard`.
