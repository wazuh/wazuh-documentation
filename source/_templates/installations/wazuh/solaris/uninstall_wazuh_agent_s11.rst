.. Copyright (C) 2015, Wazuh, Inc.

To uninstall the Wazuh agent in Solaris 11, run the following command:

.. code-block:: console

    # /var/ossec/bin/wazuh-control stop
    # pkg uninstall wazuh-agent

.. note:: 
  
  If you uninstall the Wazuh agent in Solaris 11.4 or later, the Solaris 11 package manager does not remove the group ``wazuh`` from the system. To remove it manually, run the ``groupdel wazuh`` command.


.. End of include file
