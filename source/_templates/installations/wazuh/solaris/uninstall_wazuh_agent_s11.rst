.. Copyright (C) 2022 Wazuh, Inc.

To uninstall the Wazuh agent in Solaris 11, run the following command:

.. code-block:: console

    # pkg uninstall wazuh-agent

.. note:: 
  
  If you uninstall the Wazuh agent in Solaris 11.4 or later, the Solaris 11 package manager does not remove the group ``ossec`` from the system. To remove it manually, run the ``groupdel ossec`` command.


.. End of include file
