.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use the Wazuh passwords tool to manage passwords for Wazuh indexer users and Wazuh manager API users.

Password management
===================

The Wazuh passwords tool changes the passwords for :doc:`Wazuh indexer </getting-started/components/wazuh-indexer>` users, also known as internal users, and the Wazuh manager API users.

The following Wazuh indexer users are relevant to password management:

-  ``admin``: The default administrator user of the Wazuh indexer. This user logs in to the Wazuh dashboard.
-  ``kibanaserver``: Handles communications between the Wazuh dashboard and the Wazuh indexer.
-  ``wazuh-manager``: Handles communications between the Wazuh manager and the Wazuh indexer.

The Wazuh manager API has two default users:

-  ``wazuh``: The default administrator user for the Wazuh manager API.
-  ``wazuh-wui``: Administrator user that handles communications between the Wazuh dashboard and the Wazuh manager API.

The Wazuh passwords tool is located at ``/usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh``. You can also download it by running the following command:

.. code-block:: console

   # curl -so wazuh-passwords-tool.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_CURRENT_OFFLINE_INSTALL_REV|.sh

In an all-in-one deployment, the tool automatically updates the passwords in the required components. In a distributed deployment, you must update the password in other components depending on the user whose password you change. See :ref:`Change the passwords in a distributed environment <passwords_distributed>` for more details.

The ``wazuh-passwords-tool.sh`` script provides the following options:

+---------------------------+-------------------------------------------------------------------------------+
| Option                    | Description                                                                   |
+===========================+===============================================================================+
| ``-a``, ``--change-all``  | Changes the passwords of all the Wazuh indexer and Wazuh manager API users    |
|                           | installed on the host. The new passwords are generated and saved in           |
|                           | ``/etc/wazuh/credentials.env``.                                               |
+---------------------------+-------------------------------------------------------------------------------+
| ``-u``, ``--user <USER>`` | Specifies the user whose password is changed. If ``-p`` is not used, the tool |
|                           | generates a random password and saves it in ``/etc/wazuh/credentials.env``.   |
+---------------------------+-------------------------------------------------------------------------------+
| ``-p``, ``--password``    | Reads the new password from standard input. Must be used with ``-u``.         |
+---------------------------+-------------------------------------------------------------------------------+
| ``-v``, ``--verbose``     | Displays the full script execution output.                                    |
+---------------------------+-------------------------------------------------------------------------------+
| ``-h``, ``--help``        | Displays the help message.                                                    |
+---------------------------+-------------------------------------------------------------------------------+

.. _change_password_indexer_user:

Change the password for a Wazuh indexer user
---------------------------------------------

Wazuh indexer users are defined in ``/etc/wazuh-indexer/opensearch-security/internal_users.yml``. To change the password for a Wazuh indexer user, run the script with the ``-u`` option and pass the new password to the ``-p`` option through standard input. Passwords for Wazuh indexer users and Wazuh manager API users must contain 12 to 64 characters, using only ``A``-``Z``, ``a``-``z``, ``0``-``9``, and the symbols ``. , _ + : @ % ^ = ~ -``. They must include at least one uppercase letter, one lowercase letter, one number, and one of the previously mentioned symbols.

.. code-block:: console

   # printf '%s\n' '<PASSWORD>' | bash wazuh-passwords-tool.sh -u <USER> -p

Where:

-  ``<USER>`` is the name of the user whose password you want to change: ``admin``, ``kibanaserver``, or ``wazuh-manager``.
-  ``<PASSWORD>`` is the new password. If you omit ``-p``, the tool generates a random password and saves it in ``/etc/wazuh/credentials.env``.

.. note::

   Run this command on **any Wazuh indexer node** for distributed deployments.

For example, run the following command to change the password of the ``admin`` user to ``Secr3tP4ssw0rd-2026``:

.. code-block:: console

   # printf '%s\n' 'Secr3tP4ssw0rd-2026' | bash wazuh-passwords-tool.sh -u admin -p

The command output looks similar to this:

.. code-block:: none
   :class: output

   INFO: Updating the internal users.
   INFO: A backup of the internal users has been saved in the /etc/wazuh-indexer/internalusers-backup folder.
   INFO: Generating password hash
   INFO: The password of the Wazuh indexer user admin was changed.
   INFO: WAZUH_INDEXER_ADMIN_PASSWORD was updated in /etc/wazuh/credentials.env.

.. _change_password_api_user:

Change the password for a Wazuh manager API user
-------------------------------------------------

To change the password for a Wazuh manager API user, run the script with the ``-u`` option and pass the new password to the ``-p`` option through standard input:

.. code-block:: console

   # printf '%s\n' '<PASSWORD>' | bash wazuh-passwords-tool.sh -u <USER> -p

Where:

-  ``<USER>`` is the name of the API user whose password you want to change: ``wazuh`` or ``wazuh-wui``.
-  ``<PASSWORD>`` is the new password. If you omit ``-p``, the tool generates a random password and saves it in ``/etc/wazuh/credentials.env``.

.. note::

   Run this command **on the Wazuh manager master node** for distributed deployments.

For example, run the following command to change the password of the ``wazuh`` user to ``Secr3tP4ssw.rd``:

.. code-block:: console

   # printf '%s\n' 'Secr3tP4ssw.rd' | bash wazuh-passwords-tool.sh -u wazuh -p

The command output looks similar to this:

.. code-block:: none
   :class: output

   INFO: The password of the Wazuh API user wazuh was changed.
   INFO: WAZUH_MANAGER_API_PASSWORD was updated in /etc/wazuh/credentials.env.

You can also change the Wazuh manager API passwords by following the instructions in the Securing the Wazuh manager API documentation.

.. _passwords_distributed:

Change the passwords in a distributed environment
-------------------------------------------------

Run the ``wazuh-passwords-tool.sh`` script on the node that corresponds to the user whose password you want to change in a distributed deployment:

-  To :ref:`change the password of a Wazuh indexer user <change_password_indexer_user>`, run the tool on **any Wazuh indexer node**.
-  To :ref:`change the password of a Wazuh manager API user <change_password_api_user>`, run the tool on the **Wazuh manager master node**.

Update the Wazuh dashboard configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Perform these steps on the Wazuh dashboard node after you change the ``kibanaserver`` or ``wazuh-wui`` password in a distributed deployment. This ensures the Wazuh dashboard can authenticate with the Wazuh indexer and Wazuh manager API using the updated credentials.

Update the kibanaserver password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you change the ``kibanaserver`` password, update the ``opensearch.password`` value in the Wazuh dashboard keystore. Replace ``<KIBANASERVER_PASSWORD>`` with the new password:

.. code-block:: console

   # echo <KIBANASERVER_PASSWORD> | /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin opensearch.password

Update the wazuh-wui password
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you change the ``wazuh-wui`` password, update the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` configuration file with the new password generated. Replace ``<WAZUH_WUI_PASSWORD>`` with the new password:

.. code-block:: yaml
   :emphasize-lines: 6

   wazuh_core.hosts:
     default:
       url: https://127.0.0.1
       port: 55000
       username: wazuh-wui
       password: <WAZUH_WUI_PASSWORD>
       run_as: true

Restart the Wazuh dashboard to apply the changes.

.. include:: /_templates/common/restart_dashboard.rst
