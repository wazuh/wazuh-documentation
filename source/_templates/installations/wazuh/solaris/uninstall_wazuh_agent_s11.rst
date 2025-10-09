.. Copyright (C) 2015, Wazuh, Inc.

Uninstall Wazuh agent from Solaris 11:

.. code-block:: console

   # /var/ossec/bin/wazuh-control stop
   # pkg uninstall wazuh-agent

.. note::

   Solaris 11 package manager does not remove the group ``wazuh`` from the system. Run the ``groupdel wazuh`` command to manually remove it.

.. End of include file
