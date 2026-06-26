.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use the Wazuh passwords tool to manage passwords for Wazuh indexer users and Wazuh manager API users.

Password management
===================

The Wazuh passwords tool changes the passwords for :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` users, also known as internal users, and the Wazuh manager API users.

The following Wazuh indexer users are relevant to password management:

-  ``admin``: Default administrator user of the Wazuh indexer. It is used to log in to the Wazuh dashboard and to handle communication between the Wazuh manager and the Wazuh indexer.
-  ``kibanaserver``: Handles communications between the Wazuh dashboard and the Wazuh indexer.

The Wazuh manager API has two default users:

-  ``wazuh``: Default administrator user for the Wazuh manager API.
-  ``wazuh-wui``: Administrator user that handles communications between the Wazuh dashboard and the Wazuh manager API.

The Wazuh passwords tool is located at ``/usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh``. You can also download it by running the following command:

.. code-block:: console

   # curl -so wazuh-passwords-tool.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh

In an all-in-one deployment, the tool automatically updates the passwords in the required components. In a distributed deployment, you must update the password in other components depending on the user whose password you change. See :ref:`Change the passwords in a distributed environment <passwords_distributed>` for more details.

The ``wazuh-passwords-tool.sh`` script provides the following options for managing Wazuh internal user passwords:

+------------------------------------------------+--------------------------------------------------------------------+
| Option                                         | Description                                                        |
+================================================+====================================================================+
| ``-A``, ``--api``                              | Changes the Wazuh manager API password for the specified user.     |
|                                                | Requires ``-u``, ``--user <USER>``,                                |
|                                                | ``-p``, ``--password <PASSWORD>``,                                 |
|                                                | ``-au``, ``--admin-user <API_ADMIN_USERNAME>``, and                |
|                                                | ``-ap``, ``--admin-password <API_ADMIN_PASSWORD>``.                |
+------------------------------------------------+--------------------------------------------------------------------+
| ``-au``, ``--admin-user <ADMIN_USER>``         | Specifies the Wazuh manager API administrator user. Required for   |
|                                                | changing the Wazuh manager API passwords.                          |
|                                                | Requires ``-A``, ``--api``.                                        |
+------------------------------------------------+--------------------------------------------------------------------+
| ``-ap``,                                       | Specifies the password for the Wazuh manager API administrator     |
| ``--admin-password <ADMIN_PASSWORD>``          | user. Required for changing the Wazuh manager API passwords.       |
|                                                | Requires ``-A``, ``--api``.                                        |
+------------------------------------------------+--------------------------------------------------------------------+
| ``-u``, ``--user <user>``                      | Specifies the name of the user whose password is changed.          |
|                                                | If no password is specified, the tool generates a random one.      |
+------------------------------------------------+--------------------------------------------------------------------+
| ``-p``, ``--password <PASSWORD>``              | Specifies the new password. Must be used with option               |
|                                                | ``-u``, ``--user <user>``.                                         |
+------------------------------------------------+--------------------------------------------------------------------+
| ``-v``, ``--verbose``                          | Shows the complete script execution output.                        |
+------------------------------------------------+--------------------------------------------------------------------+
| ``-h``, ``--help``                             | Shows help.                                                        |
+------------------------------------------------+--------------------------------------------------------------------+

Change the password for a Wazuh indexer user
---------------------------------------------

Wazuh indexer users are defined in ``/etc/wazuh-indexer/opensearch-security/internal_users.yml``. To change the password for a Wazuh indexer user, run the script with the ``-u`` option and specify the new password with the ``-p`` option. The password must contain 8 to 64 characters, including at least one uppercase letter, one lowercase letter, one number, and one of the following special characters: ``.*+?-``.

.. code-block:: console

   # bash wazuh-passwords-tool.sh -u <USER> [-p <PASSWORD>]

Where:

-  ``<USER>`` is the name of the user whose password you want to change.
-  ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool generates a random password.

.. note::

   Run this command on **any Wazuh indexer node** for distributed deployments.

For example, to change the password of the ``admin`` user to ``Secr3tP4ssw*rd``, run the following command:

.. code-block:: console

   # bash wazuh-passwords-tool.sh -u admin -p Secr3tP4ssw*rd

.. code-block:: none
   :class: output

   INFO: Updating the internal users.
   INFO: A backup of the internal users has been saved in the /etc/wazuh-indexer/internalusers-backup folder.
   INFO: Generating password hash
   WARNING: Password changed. Remember to update the password in the Wazuh dashboard and the Wazuh server nodes if necessary, and restart the services.

Change the password for a Wazuh manager API user
-------------------------------------------------

To change the password for a Wazuh manager API user, use the ``-A`` option and specify the Wazuh manager API administrator credentials:

.. code-block:: console

   # bash wazuh-passwords-tool.sh -A -au <API_ADMIN_USERNAME> -ap <API_ADMIN_PASSWORD> -u <USER> [-p <PASSWORD>]

Where:

-  ``<API_ADMIN_USERNAME>`` is the Wazuh manager API administrator user.
-  ``<API_ADMIN_PASSWORD>`` is the Wazuh manager API administrator password.
-  ``<USER>`` is the name of the API user whose password you want to change.
-  ``<PASSWORD>`` is the new password. If ``<PASSWORD>`` is not specified, the tool generates a random password.

.. note::

   Run this command **on the Wazuh manager master node** for distributed deployments.

For example, run the following command to change the password of the ``wazuh`` user to ``Hello*123``:

.. code-block:: console

   # bash wazuh-passwords-tool.sh -A -au wazuh -ap wazuh -u wazuh -p Hello*123

.. code-block:: none
   :class: output

   INFO: The password for Wazuh API user wazuh is Hello*123

.. _passwords_distributed:

Change the passwords in a distributed environment
-------------------------------------------------

In a distributed deployment, run the Wazuh passwords tool on the correct node depending on the user whose password you change:

-  To change the password of a Wazuh indexer user, run the tool on **any Wazuh indexer node**.
-  To change the password of a Wazuh manager API user, run the tool on the **Wazuh manager master node**.

Update the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform these steps on the Wazuh dashboard node after changing the ``kibanaserver`` or ``wazuh-wui`` password in a distributed deployment.

If you change the ``kibanaserver`` password, update the ``opensearch.password`` value in the Wazuh dashboard keystore. Replace ``<KIBANASERVER_PASSWORD>`` with the new password:

.. code-block:: console

   # echo <KIBANASERVER_PASSWORD> | /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin opensearch.password

If you change the ``wazuh-wui`` password, update the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` configuration file with the new password. Replace ``<WAZUH_WUI_PASSWORD>`` with the new password:

.. code-block:: yaml
   :emphasize-lines: 6

   wazuh_core.hosts:
     - default:
         url: https://127.0.0.1
         port: 55000
         username: wazuh-wui
         password: <WAZUH_WUI_PASSWORD>
         run_as: true

Restart the Wazuh dashboard to apply the changes.

.. include:: /_templates/common/restart_dashboard.rst

.. note::

   Run this command on any Wazuh indexer node for distributed deployments.
