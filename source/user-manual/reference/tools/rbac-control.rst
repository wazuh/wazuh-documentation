.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The rbac_control tool manages the Wazuh role-based access control (RBAC) database. Learn more about it in this section of the documentation.

.. _rbac_control:

rbac_control
============

The ``rbac_control`` tool manages the Wazuh role-based access control (RBAC) database.

Use this tool to change the passwords of the default RBAC users or restore the RBAC database to its default state.

Commands
--------

+-------------------+----------------------------------------------------------------------------------------------+
| Command           | Description                                                                                  |
+===================+==============================================================================================+
| change-password   | Changes the password for one or more default RBAC users. Empty values leave the current      |
|                   | password unchanged.                                                                          |
+-------------------+----------------------------------------------------------------------------------------------+
| factory-reset     | Restores the RBAC database to its default state. This removes all custom RBAC users, roles,  |
|                   | policies, and rules.                                                                         |
+-------------------+----------------------------------------------------------------------------------------------+

Examples
--------

``-h`` argument:

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control -h

The command output looks similar to this:

.. code-block:: none
   :class: output

   usage: rbac_control.py [-h] {change-password,factory-reset} ...

   Wazuh RBAC tool: manage resources from the Wazuh RBAC database

   Arguments:
     {change-password,factory-reset}
       change-password     Change the password for each default user. Empty values
                           will leave the password unchanged.
       factory-reset       Reset the RBAC database to its default state. This will
                           completely wipe your custom RBAC information.

   options:
     -h, --help            show this help message and exit

``factory-reset`` example:

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control factory-reset

The command output looks similar to this:

.. code-block:: none
   :class: output

   This action will completely wipe your RBAC configuration and restart it to default values.
   Type RESET to proceed: RESET
     Successfully reset RBAC database

``factory-reset`` example (aborted):

.. code-block:: console

   # /var/wazuh-manager/bin/rbac_control factory-reset

The command output looks similar to this:

.. code-block:: none
   :class: output

   This action will completely wipe your RBAC configuration and restart it to default values.
   Type RESET to proceed: xx
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
