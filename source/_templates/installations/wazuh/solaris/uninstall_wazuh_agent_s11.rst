.. Copyright (C) 2021 Wazuh, Inc.

To uninstall the agent in Solaris 11:

.. code-block:: console

    # pkg uninstall wazuh-agent

.. note:: 

  There are two known issues in Solaris 11:
  
  - If you uninstall the Wazuh agent from Solaris 11.4 or greater, the Solaris 11 package manager does not remove the group ``wazuh`` from the system. You can remove it manually with ``groupdel wazuh``.
  - If you want to upgrade the Wazuh agent in Solaris 11, you will need to stop first the service. For that ``/var/ossec/bin/wazuh-control stop``.

.. End of include file
