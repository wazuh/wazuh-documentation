.. Copyright (C) 2015-2022 Wazuh, Inc.

.. meta::
  :description: Learn how to uninstall each Wazuh central component.
  
Uninstalling the Wazuh central components
=========================================

You can uninstall all the Wazuh central components using the Wazuh installer.

Run the Wazuh installer with the option ``-u`` or ``--uninstall`` as follows:

    .. code-block:: console

      $ sudo bash wazuh-install.sh --uninstall

This will remove Wazuh indexer, Wazuh server, and Wazuh dashboard from your cluster node.

If you want to uninstall one specific central component, you need to follow the instructions below.

.. note:: Root user privileges are required to execute all the commands described below.

.. _uninstall_dashboard:

Uninstall the Wazuh dashboard
-----------------------------

#. Remove the Wazuh repository if not done already.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
          
          # rm /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

        .. code-block:: console
        
          # rm /etc/apt/sources.list.d/wazuh.list

#. Clean the Wazuh dashboard installation.

    .. tabs::

      .. group-tab:: Yum

        .. code:: console
        
          # yum remove wazuh-dashboard -y
          # rm -rf /var/lib/wazuh-dashboard/
          # rm -rf /usr/share/wazuh-dashboard/
          # rm -rf /etc/wazuh-dashboard/

      .. group-tab:: APT

        .. code:: console

          # apt remove --purge wazuh-dashboard -y

.. _uninstall_server:

Uninstall the Wazuh server
--------------------------

#. Remove the Wazuh repository if not done already.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
          
          # rm /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

        .. code-block:: console
        
          # rm /etc/apt/sources.list.d/wazuh.list

#. Clean the Wazuh manager installation.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
          
          # yum remove wazuh-manager -y
          # rm -rf /var/ossec/

      .. group-tab:: APT

        .. code-block:: console
        
          # apt remove --purge wazuh-manager -y

#. Clean the Filebeat installation.

    .. tabs::

      .. group-tab:: Yum

        .. code:: console
        
          # yum remove filebeat -y
          # rm -rf /var/lib/filebeat/
          # rm -rf /usr/share/filebeat/
          # rm -rf /etc/filebeat/

      .. group-tab:: APT

        .. code:: console
      
          # apt remove --purge filebeat -y


.. _uninstall_indexer:

Uninstall the Wazuh indexer
---------------------------

#. Remove the Wazuh repository if not done already.

    .. tabs::

      .. group-tab:: Yum

        .. code-block:: console
          
          # rm /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

        .. code-block:: console
        
          # rm /etc/apt/sources.list.d/wazuh.list

#. Clean the Wazuh indexer installation.

    .. tabs::

      .. group-tab:: Yum

        .. code:: console
        
          # yum remove wazuh-indexer -y
          # rm -rf /var/lib/wazuh-indexer/
          # rm -rf /usr/share/wazuh-indexer/
          # rm -rf /etc/wazuh-indexer/

      .. group-tab:: APT

        .. code:: console

          # apt remove --purge wazuh-indexer -y
