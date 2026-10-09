.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The rbac_control tool manages the Wazuh role-based access control (RBAC) database. Learn more about it in this section of the documentation.

.. _rbac_control:

rbac_control
============

The ``rbac_control`` tool manages the Wazuh role-based access control (RBAC) database.

Use this tool to change the passwords of the default RBAC users, create and seed the RBAC database, or restore the RBAC database to its default state.

Commands
--------

+-----------------+----------------------------------------------------------------------------------------------+
| Command         | Description                                                                                  |
+=================+==============================================================================================+
| change-password | Changes the password for one or more default RBAC users. Without options, the tool prompts   |
|                 | for the new password of each default user, and empty values leave the current password       |
|                 | unchanged. See the `change-password options`_.                                               |
+-----------------+----------------------------------------------------------------------------------------------+
| seed            | Creates the RBAC database and seeds the default users with the supplied passwords. If the    |
|                 | RBAC database already exists, it is left unchanged. A default user with no supplied password |
|                 | gets a generated one.                                                                        |
+-----------------+----------------------------------------------------------------------------------------------+
| factory-reset   | Restores the RBAC database to its default state. This removes all custom RBAC users, roles,  |
|                 | policies, and rules, and gives each default user a newly generated password that is not      |
|                 | displayed. Use ``change-password`` afterwards to set a known password. The command asks you  |
|                 | to type RESET to confirm unless you use ``-f``.                                              |
+-----------------+----------------------------------------------------------------------------------------------+

change-password options
^^^^^^^^^^^^^^^^^^^^^^^

+-----------------------------------+---------------------------------------------------------------------------------------------+
| Option                            | Description                                                                                 |
+===================================+=============================================================================================+
| -u <user>, --user <user>          | Changes the password of this default user only.                                             |
+-----------------------------------+---------------------------------------------------------------------------------------------+
| -p <file>, --password-file <file> | Reads the new password from the first line of the file, or from standard input if the value |
|                                   | is ``-``. Requires ``--user``.                                                              |
+-----------------------------------+---------------------------------------------------------------------------------------------+
| --passwords-file <file>           | Reads a JSON object that maps default usernames to their new passwords from the file, or    |
|                                   | from standard input if the value is ``-``, and changes all of them in a single run. You     |
|                                   | can't combine this option with ``--user`` or ``--password-file``.                           |
+-----------------------------------+---------------------------------------------------------------------------------------------+

seed options
^^^^^^^^^^^^

+-------------------------+-------------------------------------------------------------------------------------------+
| Option                  | Description                                                                               |
+=========================+===========================================================================================+
| --passwords-file <file> | Reads a JSON object that maps default usernames to their passwords from the file, or from |
|                         | standard input if the value is ``-``.                                                     |
+-------------------------+-------------------------------------------------------------------------------------------+

factory-reset options
^^^^^^^^^^^^^^^^^^^^^

+-------------+-----------------------------------------------------------+
| Option      | Description                                               |
+=============+===========================================================+
| -f, --force | Resets the RBAC database without asking for confirmation. |
+-------------+-----------------------------------------------------------+

Examples
--------

``-h`` argument:

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control -h

The command output looks similar to this:

.. code-block:: none
   :class: output

   usage: rbac_control.py [-h] {change-password,seed,factory-reset} ...

   Wazuh RBAC tool: manage resources from the Wazuh RBAC database

   Arguments:
     {change-password,seed,factory-reset}
       change-password     Change the password for each default user. Without any
                           option the passwords are prompted for, and empty
                           values will leave the password unchanged.
       seed                Create the RBAC database, seeding the default users
                           with the supplied passwords. An existing database is
                           left untouched. A default user with no password
                           supplied gets a generated one.
       factory-reset       Reset the RBAC database to its default state. This
                           will completely wipe your custom RBAC information, and
                           give each default user a newly generated password.

   options:
     -h, --help            show this help message and exit

``factory-reset`` example:

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control factory-reset

The command output looks similar to this:

.. code-block:: none
   :class: output

   This action will completely wipe your RBAC configuration and restart it to default values. Type RESET to proceed: RESET
     Successfully reset RBAC database. Each default user was given a new, unknown password; set one with '/var/wazuh-manager/bin/rbac_control change-password'

``factory-reset`` example (aborted):

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control factory-reset

The command output looks similar to this:

.. code-block:: none
   :class: output

   This action will completely wipe your RBAC configuration and restart it to default values. Type RESET to proceed: xx
     RBAC database reset aborted.

``change-password`` example with an insecure password:

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control change-password

The command output looks similar to this:

.. code-block:: none
   :class: output

   New password for 'wazuh' (skip):
   New password for 'wazuh-wui' (skip):
         wazuh: FAILED | Error 5009 - Insecure user password provided

``change-password`` example where the *wazuh* user password was changed successfully (to skip any of the user, leave the new password blank):

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control change-password

The command output looks similar to this:

.. code-block:: none
   :class: output

   New password for 'wazuh' (skip):
   New password for 'wazuh-wui' (skip):
     wazuh: UPDATED
