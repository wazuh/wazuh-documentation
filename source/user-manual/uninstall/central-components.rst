.. Copyright (C) 2015-2022 Wazuh, Inc.

.. meta::
  :description: Learn how to uninstall each Wazuh central component.
  
Uninstalling the Wazuh central components
=========================================

You can uninstall all the Wazuh central components using the Wazuh installer. Run the Wazuh installer with the option ``-u`` or ``--uninstall`` as follows:

    .. code-block:: console

      $ sudo bash wazuh-install.sh --uninstall

This will remove Wazuh indexer, Wazuh server, and Wazuh dashboard from your cluster node.

If you want to uninstall one specific central component, you need to follow the instructions below.

.. note:: Root user privileges are required to execute all the commands described below.

.. _uninstall_server:

Uninstall the Wazuh server
--------------------------

#. Remove the Wazuh repository and the Wauh manager package.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
          
          # rm /etc/yum.repos.d/wazuh.repo
          # yum remove wazuh-manager -y

      .. group-tab:: APT

        .. code-block:: console
        
          # rm /etc/apt/sources.list.d/wazuh.list
          # apt remove --purge wazuh-manager -y

#. Clean the Wazuh manager installation.

    .. code-block:: console

      # rm -rf /var/ossec/
      # rm -rf /etc/systemd/system/multi-user.target.wants/wazuh-manager.service

#. Remove the Filebeat package.

    .. tabs::

      .. group-tab:: Yum

        .. code:: console
        
          # yum remove filebeat -y

      .. group-tab:: APT

        .. code:: console
      
          # apt remove --purge filebeat -y

#. Clean the Filebeat installation.

    .. code:: console
    
      # rm -rf /var/lib/filebeat/
      # rm -rf /usr/share/filebeat/
      # rm -rf /etc/filebeat/
      # rm -rf /var/log/filebeat/
      # rm -rf /etc/systemd/system/multi-user.target.wants/filebeat.service


.. _uninstall_indexer:

Uninstall the Wazuh indexer
---------------------------

#. Remove the Wazuh indexer package.

    .. tabs::

      .. group-tab:: Yum

        .. code:: console
        
          # yum remove wazuh-indexer -y

      .. group-tab:: APT

        .. code:: console

          # apt remove --purge wazuh-indexer -y
          
#. Clean the Wazuh indexer installation.

    .. code:: console
    
      # rm -rf /var/lib/wazuh-indexer/
      # rm -rf /usr/share/wazuh-indexer/
      # rm -rf /etc/wazuh-indexer/
      # rm -rf /var/log/wazuh-indexer/
      # rm -rf /securityadmin_demo.sh
      # rm -rf /etc/systemd/system/opensearch.service.wants/
      # rm -rf /etc/systemd/system/multi-user.target.wants/opensearch.service
      # rm -rf /lib/firewalld/services/opensearch.xml

.. _uninstall_dashboard:

Uninstall the Wazuh dashboard
-----------------------------

#. Remove the Wazuh dashboard package.

    .. tabs::

      .. group-tab:: Yum

        .. code:: console
        
          # yum remove wazuh-dashboard -y

      .. group-tab:: APT

        .. code:: console

          # apt remove --purge wazuh-dashboard -y
          
#. Clean the Wazuh dashboard installation.

    .. code:: console
    
      # rm -rf /var/lib/wazuh-dashboard/
      # rm -rf /usr/share/wazuh-dashboard/
      # rm -rf /etc/wazuh-dashboard/
      # rm -rf /run/wazuh-dashboard/
      # rm -rf /etc/systemd/system/multi-user.target.wants/wazuh-dashboard.service
      # rm -rf /etc/systemd/system/wazuh-dashboard.service
      # rm -rf /lib/firewalld/services/dashboard.xml
