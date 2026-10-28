.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the Wazuh passwords tool, a script that changes the passwords of the Wazuh indexer and Wazuh manager API users.

.. _reference_wazuh_passwords_tool:

Wazuh passwords tool
======================

The ``wazuh-passwords-tool.sh`` script changes the passwords of the Wazuh indexer and Wazuh manager API users. Run it as root on the host of the component that owns the user.

You can download the Wazuh passwords tool here: `wazuh-passwords-tool.sh <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-passwords-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh>`__.

Options list
--------------

+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Option                    | Description                                                                                                                                                                      |
+===========================+==================================================================================================================================================================================+
| ``-a``, ``--change-all``  | Changes the password of all the Wazuh indexer and Wazuh manager API users installed on the host, generating a random password for each one. Incompatible with ``-u`` and ``-p``. |
+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-u``, ``--user <USER>`` | Name of the user whose password is changed. Without ``-p``, a random password is generated. Either ``-u`` or ``-a`` is required.                                                 |
+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-p``, ``--password``    | Reads the new password from standard input, or asks for it twice when standard input is a terminal. Must be used with ``-u``.                                                    |
+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-v``, ``--verbose``     | Shows the complete script execution output.                                                                                                                                      |
+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| ``-h``, ``--help``        | Shows help.                                                                                                                                                                      |
+---------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Users
-------

+---------------------------+-------------------+-----------------------------------------+
| User                      | Component         | Key in ``credentials.env``              |
+===========================+===================+=========================================+
| ``admin``                 | Wazuh indexer     | ``WAZUH_INDEXER_ADMIN_PASSWORD``        |
+---------------------------+-------------------+-----------------------------------------+
| ``kibanaserver``          | Wazuh indexer     | ``WAZUH_INDEXER_KIBANASERVER_PASSWORD`` |
+---------------------------+-------------------+-----------------------------------------+
| ``wazuh-manager``         | Wazuh indexer     | ``WAZUH_INDEXER_MANAGER_PASSWORD``      |
+---------------------------+-------------------+-----------------------------------------+
| ``wazuh``                 | Wazuh manager API | ``WAZUH_MANAGER_API_PASSWORD``          |
+---------------------------+-------------------+-----------------------------------------+
| ``wazuh-internal-client`` | Wazuh manager API | ``WAZUH_MANAGER_WUI_PASSWORD``          |
+---------------------------+-------------------+-----------------------------------------+

``wazuh-internal-client`` is the account the Wazuh dashboard uses to connect to the Wazuh manager API. It isn't a user to log in to the Wazuh dashboard: log in with ``admin``.

Password rules
----------------

A password has between 12 and 64 characters, uses only ``A-Z a-z 0-9 . , _ + : @ % ^ = ~ -``, and has at least one upper case letter, one lower case letter, one digit and one of the symbols. A generated password has 32 characters.

Where the passwords are saved
-------------------------------

The tool never prints a password. It saves a new one in every credential file of the host that already holds that key:

-  The ``export/credentials.env`` file of the package that owns the user: ``/etc/wazuh-indexer/export/credentials.env`` for the Wazuh indexer users, and ``/etc/wazuh-manager/export/credentials.env`` for the Wazuh manager API users.
-  The ``local.env`` file of each package that uses the password: ``/etc/wazuh-indexer/local.env``, ``/etc/wazuh-manager/local.env`` or ``/etc/wazuh-dashboard/local.env``.
-  The ``credentials.env`` file that ``--generate-config-files`` keeps next to the root CA (``wazuh-ca/credentials.env``, or in ``WAZUH_CA_DIR``), so a later ``--generate-config-files`` gives the new password to new nodes.

A generated password must be saved in at least one file: if there is none, the tool stops with an error. Use ``-p`` to set a password you know. Editing a value in these files doesn't change the deployment: use the tool.

The tool updates the keystores of the Wazuh manager and the Wazuh dashboard on the host where it runs, and restarts them. In a distributed deployment, run it on a Wazuh indexer node for the Wazuh indexer users and on the Wazuh manager master node for the Wazuh manager API users, then update the keystores of the other nodes, as described in :doc:`Password management </user-manual/user-administration/password-management>`.

Examples
----------

Change all the passwords of the users installed on the host:

.. code-block:: console

   # sudo bash wazuh-passwords-tool.sh -a

Change the ``admin`` password to one saved in a file:

.. code-block:: console

   # sudo bash wazuh-passwords-tool.sh -u admin -p < /root/new-admin-password.txt

The command output looks similar to this:

.. code-block:: none
   :class: output

   INFO: The password of the Wazuh indexer user admin was changed.
   INFO: WAZUH_INDEXER_ADMIN_PASSWORD was updated in: /etc/wazuh-indexer/export/credentials.env.

Read the new password in the file of the owner, for example:

.. code-block:: console

   # sudo grep '^WAZUH_INDEXER_ADMIN_PASSWORD=' /etc/wazuh-indexer/export/credentials.env | cut -d= -f2-
