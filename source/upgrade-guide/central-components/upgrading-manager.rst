.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to upgrade the Wazuh manager to the latest version available in this section of the Wazuh documentation. 
  
.. _upgrading_wazuh_server:

Wazuh manager
=============

Upgrade the Wazuh manager to the latest available version. When upgrading a multi-node Wazuh manager cluster, it is recommended to run the upgrade in the master node first to reduce server downtime.

.. note::
   
   Root user privileges are required to execute all the commands described below.

Upgrade the Wazuh manager
-------------------------

#. Add the Wazuh repository. You can skip this step if the repository is already present and enabled on the node. 

   .. tabs::


     .. group-tab:: Yum


       .. include:: /_templates/installations/common/yum/add-repository.rst



     .. group-tab:: APT


       .. include:: /_templates/installations/common/deb/add-repository.rst




#. Upgrade the Wazuh manager to the latest version.

   .. note::

      If the ``/var/ossec/etc/ossec.conf`` configuration file has been modified, it will not be replaced by the upgrade. You must therefore add the settings of the new capabilities manually. More information can be found in :doc:`/user-manual/index`.

   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-manager

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install wazuh-manager

   .. note::

      If upgrading a multi-node Wazuh manager cluster, it is necessary to run the upgrade in every node. Otherwise, Wazuh manager nodes will not join the cluster.

#. **Recommended action** - Disable the Wazuh repository when finished upgrading the Wazuh components in the node to prevent accidental upgrades.
  
   .. tabs::

      .. group-tab:: Yum

         .. code-block:: console

            # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

      .. group-tab:: APT

         .. code-block:: console

            # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
            # apt-get update

         Alternatively, you can set the package state to ``hold``. This will stop automatic upgrades but it will still be possible to upgrade it manually using ``apt-get install``.

         .. code-block:: console

            # echo "wazuh-manager hold" | sudo dpkg --set-selections

            
#. Repeat these steps for every Wazuh manager node.

Next steps
----------

The Wazuh manager is now successfully upgraded. 

-  To upgrade the Wazuh indexer and the Wazuh dashboard, follow the instructions in the :doc:`upgrading-indexer-dashboard` section.

-  To migrate from Open Distro for Elasticsearch 1.13 to the Wazuh indexer, see the :doc:`/migration-guide/wazuh-indexer` section.

-  To upgrade Elastic Stack, follow the instructions in the :ref:`Upgrading Elasticsearch, Kibana and Filebeat<upgrade_elasticsearch_filebeat_kibana>` section.

- If you are going to keep the same version of Elastic Stack, unfold the next section and follow the instructions to replace the Wazuh Kibana plugin.  To check if your version of Elastic Stack is compatible with the new Wazuh version, check our :ref:`compatibility matrix <wazuh_kibana_compatibility_matrix>`. 
    
Upgrade the Wazuh Kibana plugin
-------------------------------

.. raw:: html

  <div class="accordion-section">

#. Remove the old Wazuh Kibana plugin:

   .. code-block:: console


    # cd /usr/share/kibana/
    # sudo -u kibana bin/kibana-plugin remove wazuh


#. Install the new Wazuh Kibana plugin. Replace the Kibana version if necessary:

    .. code-block:: console

      # cd /usr/share/kibana/
      # sudo -u kibana /usr/share/kibana/bin/kibana-plugin install https://packages.wazuh.com/4.x/ui/kibana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip



#. Restart Kibana:

   .. tabs::
   
     .. group-tab:: Systemd
    
      .. code-block:: console
    
       # systemctl restart kibana
    
     .. group-tab:: SysV init
    
      .. code-block:: console
    
       # service kibana restart
    
      
#. Clear the browser’s cache and cookies.

   
