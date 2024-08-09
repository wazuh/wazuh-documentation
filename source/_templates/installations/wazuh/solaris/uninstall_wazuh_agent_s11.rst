.. Copyright (C) 2015, Wazuh, Inc.

Run the following command to uninstall the Wazuh agent in Solaris 11.

.. code-block:: console

   # /var/ossec/bin/wazuh-control stop
   # pkg uninstall wazuh-agent

.. note:: 
  
   If you uninstall the Wazuh agent in Solaris 11.4 or later, the Solaris 11 package manager does not remove the group ``wazuh`` from the system. Run the ``groupdel wazuh`` command to manually remove it.

.. End of include file
