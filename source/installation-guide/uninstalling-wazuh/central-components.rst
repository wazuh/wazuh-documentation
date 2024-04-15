.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall each Wazuh central component.
  
Uninstalling the Wazuh central components
=========================================

You can uninstall all the Wazuh central components using the `Wazuh installation assistant <https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-install.sh>`_.

Run the assistant with the option ``-u`` or ``--uninstall`` as follows:

.. code-block:: console

   $ sudo bash wazuh-install.sh --uninstall

This will remove the Wazuh indexer, the Wazuh server, and the Wazuh dashboard.

If you want to uninstall one specific central component, follow the instructions below.

.. note::
   
   You need root user privileges to run all the commands described below.

.. _uninstall_dashboard:

Uninstall the Wazuh dashboard
-----------------------------

#. Remove the Wazuh dashboard installation.

   .. tabs::

      .. group-tab:: Yum

         .. code:: console
        
            # yum remove wazuh-dashboard -y
            # rm -rf /var/lib/wazuh-dashboard/
            # rm -rf /usr/share/wazuh-dashboard/
            # rm -rf /etc/wazuh-dashboard/

      .. group-tab:: APT

         .. code:: console

            # apt-get remove --purge wazuh-dashboard -y

.. _uninstall_server:

Uninstall the Wazuh server
--------------------------

#. Remove the Wazuh manager installation.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console
          
            # yum remove wazuh-manager -y
            # rm -rf /var/ossec/

      .. group-tab:: APT

         .. code-block:: console
        
            # apt-get remove --purge wazuh-manager -y

#. Disable the Wazuh manager service.

   .. include:: ../../_templates/installations/wazuh/common/disable_wazuh_manager_service.rst

#. Remove the Filebeat installation.

   .. tabs::

      .. group-tab:: Yum

         .. code:: console
        
            # yum remove filebeat -y
            # rm -rf /var/lib/filebeat/
            # rm -rf /usr/share/filebeat/
            # rm -rf /etc/filebeat/

      .. group-tab:: APT

         .. code:: console
      
            # apt-get remove --purge filebeat -y

.. _uninstall_indexer:

Uninstall the Wazuh indexer
---------------------------

#. Remove the Wazuh indexer installation.

   .. tabs::

      .. group-tab:: Yum

         .. code:: console
        
            # yum remove wazuh-indexer -y
            # rm -rf /var/lib/wazuh-indexer/
            # rm -rf /usr/share/wazuh-indexer/
            # rm -rf /etc/wazuh-indexer/

      .. group-tab:: APT

         .. code:: console

            # apt-get remove --purge wazuh-indexer -y
