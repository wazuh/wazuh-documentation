.. Copyright (C) 2021 Wazuh, Inc.

To uninstall the agent in Solaris 11:

.. code-block:: console

    # pkg uninstall wazuh-agent

.. note:: 
  
  If you uninstall the Wazuh agent from Solaris 11.4 or greater, the Solaris 11 package manager does not remove the group ``ossec`` from the system. You can remove it manually with ``groupdel ossec``.


.. End of include file
