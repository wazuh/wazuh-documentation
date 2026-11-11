.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use the Wazuh passwords tool to manage passwords for Wazuh indexer users and Wazuh manager API users.

Password management
===================

The ``wazuh-passwords-tool.sh`` script changes the passwords for :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` users, also known as internal users, and the Wazuh manager API users.

The following Wazuh indexer users are relevant to password management:

-  ``admin``: The default administrator user of the Wazuh indexer. This user logs in to the Wazuh dashboard.
-  ``kibanaserver``: Handles communications between the Wazuh dashboard and the Wazuh indexer.
-  ``wazuh-manager``: Handles communications between the Wazuh manager and the Wazuh indexer.

The Wazuh manager API has two default users:

-  ``wazuh``: The default administrator user for the Wazuh manager API.
-  ``wazuh-internal-client``: Service account that the Wazuh dashboard uses to connect to the Wazuh manager API. It isn't a user for logging in to the Wazuh dashboard.

There are no default passwords. The Wazuh packages generate random passwords when you install them. The Wazuh indexer saves the passwords of its users in ``/etc/wazuh-indexer/export/credentials.env``, and the Wazuh manager master node saves the passwords of the Wazuh manager API users in ``/etc/wazuh-manager/export/credentials.env``. See :ref:`Where the passwords are saved <passwords_where_saved>` for more details.

The tool is located at ``/usr/share/wazuh-indexer/tools/wazuh-passwords-tool.sh``. You can also download it by running the following command:

.. code-block:: console

   # curl -so wazuh-passwords-tool.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

The tool requires root privileges.

In an all-in-one deployment, the tool also writes the new passwords to the Wazuh manager and Wazuh dashboard keystores and restarts those services, so the components keep connecting. In a distributed deployment, you must update the password in other components depending on the user whose password you change. See :ref:`Change the passwords in a distributed environment <passwords_distributed>` for more details.

The ``wazuh-passwords-tool.sh`` script provides the following options:

+---------------------------+----------------------------------------------------------------------------------+
| Option                    | Description                                                                      |
+===========================+==================================================================================+
| ``-a``, ``--change-all``  | Changes the passwords of all the Wazuh indexer and Wazuh manager API users       |
|                           | installed on the host, generating a random password for each one. You can't      |
|                           | combine it with ``-u`` or ``-p``.                                                |
+---------------------------+----------------------------------------------------------------------------------+
| ``-u``, ``--user <USER>`` | Specifies the user whose password is changed. If ``-p`` is not used, the tool    |
|                           | generates a random password and saves it in the credentials files of the host.   |
+---------------------------+----------------------------------------------------------------------------------+
| ``-p``, ``--password``    | Reads the new password from standard input. In a terminal, the tool asks for it  |
|                           | twice without showing it. Must be used with ``-u``.                              |
+---------------------------+----------------------------------------------------------------------------------+
| ``-v``, ``--verbose``     | Displays the full script execution output.                                       |
+---------------------------+----------------------------------------------------------------------------------+
| ``-h``, ``--help``        | Displays the help message.                                                       |
+---------------------------+----------------------------------------------------------------------------------+

.. _passwords_where_saved:

Where the passwords are saved
-----------------------------

The tool never prints a password. It saves a new password in every credentials file of the host that already holds that user:

-  The ``export/credentials.env`` file of the package that owns the user: ``/etc/wazuh-indexer/export/credentials.env`` for the Wazuh indexer users, and ``/etc/wazuh-manager/export/credentials.env`` for the Wazuh manager API users.
-  The ``local.env`` file of each package that uses the password: ``/etc/wazuh-indexer/local.env``, ``/etc/wazuh-manager/local.env``, or ``/etc/wazuh-dashboard/local.env``.
-  The ``credentials.env`` file that the installation assistant keeps next to the root CA, in the ``wazuh-ca`` directory next to the tool or in the directory set in the ``WAZUH_CA_DIR`` environment variable.

Each user has the following key in these files:

-  ``admin``: ``WAZUH_INDEXER_ADMIN_PASSWORD``
-  ``kibanaserver``: ``WAZUH_INDEXER_KIBANASERVER_PASSWORD``
-  ``wazuh-manager``: ``WAZUH_INDEXER_MANAGER_PASSWORD``
-  ``wazuh``: ``WAZUH_MANAGER_API_PASSWORD``
-  ``wazuh-internal-client``: ``WAZUH_MANAGER_WUI_PASSWORD``

To read a new password, run the following command on the host where you ran the tool. Replace the key and the file with the ones of the user:

.. code-block:: console

   # grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-

.. note::

   Editing a value in these files doesn't change the password. Use the tool to change a password. If the tool generates a password and no credentials file on the host holds the user, the tool applies the password but can't save it, and exits with an error. Use ``-p`` on such hosts to set a password you know.

.. _change_password_indexer_user:

Change the password for a Wazuh indexer user
---------------------------------------------

Wazuh indexer users are defined in ``/etc/wazuh-indexer/opensearch-security/internal_users.yml``. To change the password for a Wazuh indexer user, run the script with the ``-u`` option and pass the new password to the ``-p`` option through standard input. Passwords for Wazuh indexer users and Wazuh manager API users must contain 12 to 64 characters, using only ``A``-``Z``, ``a``-``z``, ``0``-``9``, and the symbols ``. , _ + : @ % ^ = ~ -``. They must include at least one uppercase letter, one lowercase letter, one number, and one of the previously mentioned symbols. This rule applies to the passwords you set with the tool or at installation. When you change a Wazuh manager API password with ``rbac_control`` or the Wazuh manager API, the Wazuh manager API accepts a wider set: 12 to 64 printable ASCII characters with at least one letter and one number.

.. code-block:: console

   # printf '%s\n' '<PASSWORD>' | bash wazuh-passwords-tool.sh -u <USER> -p

Where:

-  ``<USER>`` is the name of the user whose password you want to change: ``admin``, ``kibanaserver``, or ``wazuh-manager``.
-  ``<PASSWORD>`` is the new password. If you omit ``-p``, the tool generates a random password and saves it in the credentials files of the host.

.. note::

   Run this command on **any Wazuh indexer node** for distributed deployments.

For example, run the following command to change the password of the ``admin`` user to ``Secr3tP4ssw.rd``:

.. code-block:: console

   # printf '%s\n' 'Secr3tP4ssw.rd' | bash wazuh-passwords-tool.sh -u admin -p

The command output looks similar to this:

.. code-block:: none
   :class: output

   INFO: Updating the internal users.
   INFO: A backup of the internal users has been saved in the /etc/wazuh-indexer/internalusers-backup folder.
   INFO: Generating password hash
   INFO: The password of the Wazuh indexer user admin was changed.
   INFO: WAZUH_INDEXER_ADMIN_PASSWORD was updated in: /etc/wazuh-indexer/export/credentials.env.

When you change the ``kibanaserver`` or ``wazuh-manager`` password and the Wazuh dashboard or Wazuh manager is installed on the same host, the tool also writes the new password to the Wazuh dashboard or Wazuh manager keystore and restarts that service. For nodes on other hosts, see :ref:`Change the passwords in a distributed environment <passwords_distributed>`.

.. _change_password_api_user:

Change the password for a Wazuh manager API user
-------------------------------------------------

The tool changes the Wazuh manager API passwords with ``rbac_control`` on the Wazuh manager, so you don't need Wazuh manager API administrator credentials. To change the password for a Wazuh manager API user, run the script with the ``-u`` option and pass the new password to the ``-p`` option through standard input:

.. code-block:: console

   # printf '%s\n' '<PASSWORD>' | bash wazuh-passwords-tool.sh -u <USER> -p

Where:

-  ``<USER>`` is the name of the API user whose password you want to change: ``wazuh`` or ``wazuh-internal-client``.
-  ``<PASSWORD>`` is the new password. If you omit ``-p``, the tool generates a random password and saves it in the credentials files of the host.

.. note::

   Run this command on the **Wazuh manager master node** for distributed deployments.

For example, run the following command to change the password of the ``wazuh`` user to ``Secr3tP4ssw.rd``:

.. code-block:: console

   # printf '%s\n' 'Secr3tP4ssw.rd' | bash wazuh-passwords-tool.sh -u wazuh -p

The command output looks similar to this:

.. code-block:: none
   :class: output

   INFO: The password of the Wazuh API user wazuh was changed.
   INFO: WAZUH_MANAGER_API_PASSWORD was updated in: /etc/wazuh-manager/export/credentials.env.

When you change the ``wazuh-internal-client`` password, and the Wazuh dashboard is installed on the same host, the tool also writes the new password to the Wazuh dashboard keystore and restarts the Wazuh dashboard.

You can also change a Wazuh manager API password with ``/var/wazuh-manager/bin/rbac_control change-password`` on a Wazuh manager node. ``rbac_control`` doesn't update ``/etc/wazuh-manager/export/credentials.env``, which keeps the previous value, so update the key there too.

.. note::

   The Wazuh manager API users are stored in the ``rbac.db`` database of the Wazuh manager master node, and the cluster doesn't synchronize it. If you promote another node to master, change the ``wazuh`` and ``wazuh-internal-client`` passwords again on that node.

.. _change_password_all:

Change all passwords
--------------------

Use the ``-a`` option to change the passwords of all the Wazuh indexer and Wazuh manager API users installed on the host. The tool generates a different random password for each user:

.. code-block:: console

   # bash wazuh-passwords-tool.sh -a

The command output looks similar to this:

.. code-block:: none
   :class: output

   INFO: Updating the internal users.
   INFO: A backup of the internal users has been saved in the /etc/wazuh-indexer/internalusers-backup folder.
   INFO: The passwords of the Wazuh indexer users were changed.
   INFO: The new password of user admin was saved as WAZUH_INDEXER_ADMIN_PASSWORD in: /etc/wazuh-indexer/export/credentials.env.
   INFO: The new password of user kibanaserver was saved as WAZUH_INDEXER_KIBANASERVER_PASSWORD in: /etc/wazuh-indexer/export/credentials.env.
   INFO: The new password of user wazuh-manager was saved as WAZUH_INDEXER_MANAGER_PASSWORD in: /etc/wazuh-indexer/export/credentials.env.
   INFO: The password of the Wazuh API user wazuh was changed.
   INFO: The new password of user wazuh was saved as WAZUH_MANAGER_API_PASSWORD in: /etc/wazuh-manager/export/credentials.env.
   INFO: The password of the Wazuh API user wazuh-internal-client was changed.
   INFO: The new password of user wazuh-internal-client was saved as WAZUH_MANAGER_WUI_PASSWORD in: /etc/wazuh-manager/export/credentials.env.

The tool updates the Wazuh manager and Wazuh dashboard keystores on the host and restarts both services. If a service is stopped, the tool doesn't start it, and the new credentials apply the next time the service starts. In a distributed deployment, see :ref:`Change all passwords in a distributed deployment <passwords_all_distributed>`.

.. _passwords_distributed:

Change the passwords in a distributed environment
-------------------------------------------------

In a distributed deployment, run the ``wazuh-passwords-tool.sh`` script on the correct node depending on the user whose password you change:

-  To :ref:`change the password of a Wazuh indexer user <change_password_indexer_user>`, run the tool on **any Wazuh indexer node**.
-  To :ref:`change the password of a Wazuh manager API user <change_password_api_user>`, run the tool on the **Wazuh manager master node**.

The tool only updates the keystores and credentials files of the host where it runs. After you change a password, update the nodes that use it on other hosts:

-  ``admin`` and ``wazuh``: No other update is needed.
-  ``kibanaserver``: Update the ``opensearch.password`` entry in the keystore of every Wazuh dashboard node, and restart the Wazuh dashboard.
-  ``wazuh-manager``: Update the keystore of every Wazuh manager node, master and workers, and restart the Wazuh manager.
-  ``wazuh-internal-client``: Update the ``wazuh_core.hosts.default.password`` entry in the keystore of every Wazuh dashboard node, and restart the Wazuh dashboard.

Read the new password in the ``export/credentials.env`` file of the node where you ran the tool. The files on the other nodes keep the previous values.

.. _update_wazuh_manager_nodes:

Update the Wazuh manager nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform these steps on every Wazuh manager node after you change the ``wazuh-manager`` password. Replace ``<WAZUH_MANAGER_PASSWORD>`` with the ``WAZUH_INDEXER_MANAGER_PASSWORD`` value:

.. code-block:: console
   :emphasize-lines: 2,3

   # echo 'wazuh-manager' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k username
   # echo '<WAZUH_MANAGER_PASSWORD>' | /var/wazuh-manager/bin/wazuh-manager-keystore -f indexer -k password
   # sed -i 's|^WAZUH_INDEXER_MANAGER_PASSWORD=.*|WAZUH_INDEXER_MANAGER_PASSWORD=<WAZUH_MANAGER_PASSWORD>|' /etc/wazuh-manager/local.env
   # systemctl restart wazuh-manager

Until you update the keystore and restart the service, the Wazuh manager logs ``Unauthorized - Check indexer credentials``. After the restart, it logs ``The indexer is reachable``. Run the following command to check it:

.. code-block:: console

   # grep 'indexer is reachable' /var/wazuh-manager/logs/wazuh-manager.log | tail -1

.. _update_wazuh_dashboard_configuration:

Update the Wazuh dashboard nodes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform these steps on every Wazuh dashboard node after you change the ``kibanaserver`` or ``wazuh-internal-client`` password. You need them even with a single Wazuh dashboard node when it isn't on the host where you ran the tool. This ensures the Wazuh dashboard can authenticate with the Wazuh indexer and Wazuh manager API using the updated credentials.

Update the kibanaserver password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you change the ``kibanaserver`` password, update the ``opensearch.password`` value in the Wazuh dashboard keystore. Replace ``<KIBANASERVER_PASSWORD>`` with the new password:

.. code-block:: console

   # echo '<KIBANASERVER_PASSWORD>' | OSD_PATH_CONF=/etc/wazuh-dashboard /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin opensearch.password

.. _update_wazuh_internal_client_password:

Update the wazuh-internal-client password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you change the ``wazuh-internal-client`` password, update the ``wazuh_core.hosts.default.password`` value in the Wazuh dashboard keystore. Replace ``<WAZUH_WUI_PASSWORD>`` with the new password:

.. code-block:: console

   # echo '<WAZUH_WUI_PASSWORD>' | OSD_PATH_CONF=/etc/wazuh-dashboard /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin wazuh_core.hosts.default.password

Give the keystore back to the ``wazuh-dashboard`` group:

.. code-block:: console

   # chown root:wazuh-dashboard /etc/wazuh-dashboard/opensearch_dashboards.keystore
   # chmod 640 /etc/wazuh-dashboard/opensearch_dashboards.keystore

If the node has a ``/etc/wazuh-dashboard/local.env`` file, update the same key there too:

.. code-block:: console

   # sed -i 's|^WAZUH_INDEXER_KIBANASERVER_PASSWORD=.*|WAZUH_INDEXER_KIBANASERVER_PASSWORD=<KIBANASERVER_PASSWORD>|' /etc/wazuh-dashboard/local.env
   # sed -i 's|^WAZUH_MANAGER_WUI_PASSWORD=.*|WAZUH_MANAGER_WUI_PASSWORD=<WAZUH_WUI_PASSWORD>|' /etc/wazuh-dashboard/local.env

Restart the Wazuh dashboard to apply the changes.

.. include:: /_templates/common/restart_dashboard.rst

.. _passwords_all_distributed:

Change all passwords in a distributed deployment
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On a Wazuh indexer node, run the tool with ``-a``. It changes the ``admin``, ``kibanaserver``, and ``wazuh-manager`` passwords.

#. On the Wazuh manager master node, run the tool with ``-a``. It changes the ``wazuh`` and ``wazuh-internal-client`` passwords.

#. On every Wazuh manager node, update the keystore and the ``/etc/wazuh-manager/local.env`` file with the ``WAZUH_INDEXER_MANAGER_PASSWORD`` value of the Wazuh indexer node, and restart the Wazuh manager, as described in :ref:`Update the Wazuh manager nodes <update_wazuh_manager_nodes>`.

#. On every Wazuh dashboard node, write ``opensearch.password`` with the ``WAZUH_INDEXER_KIBANASERVER_PASSWORD`` value of the Wazuh indexer node and ``wazuh_core.hosts.default.password`` with the ``WAZUH_MANAGER_WUI_PASSWORD`` value of the Wazuh manager master node. Then restart the Wazuh dashboard once.

Add or reinstall nodes after a password change
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The installation files bundle, ``wazuh-install-files.tar``, keeps the passwords it was generated with. After you change a password, a node that you install or reinstall from the bundle gets the previous password and can't connect. Before you add or reinstall a node, update ``credentials.env`` inside ``wazuh-install-files.tar`` and in the ``wazuh-ca`` directory with the current passwords. Alternatively, install the node and then update its keystores as described in this section.
