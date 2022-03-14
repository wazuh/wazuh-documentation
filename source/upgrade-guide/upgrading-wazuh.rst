.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn how to upgrade the Wazuh manager to the latest version available in this section of the Wazuh documentation. 
  
.. _upgrading_wazuh_server:

Upgrading the Wazuh manager
===========================

Upgrade the Wazuh manager to the latest available version. When upgrading a Wazuh multi-node cluster, it is recommended to update the master node first to reduce server downtime.


.. note:: Root user privileges are required to execute all the commands described below.

Upgrade the Wazuh manager
-------------------------

To upgrade the Wazuh manager, choose your package manager and follow the instructions. 

#. Add the Wazuh repository:


    .. tabs::


      .. group-tab:: Yum


        .. include:: ../_templates/installations/wazuh/yum/add_repository.rst



      .. group-tab:: APT


        .. include:: ../_templates/installations/wazuh/deb/add_repository.rst



      .. group-tab:: ZYpp


        .. include:: ../_templates/installations/wazuh/zypp/add_repository.rst    



#. Upgrade the Wazuh manager to the latest version:


    .. tabs::


      .. group-tab:: Yum

         .. code-block:: console

            # yum upgrade wazuh-manager



      .. group-tab:: APT


          .. code-block:: console

              # apt-get install wazuh-manager



      .. group-tab:: ZYpp


          .. code-block:: console

              # zypper update wazuh-manager
    


.. note::

  The configuration file of the Wazuh manager will not be replaced in the updates if it has been modified, so the settings of the new capabilities will have to be added manually. More information can be found at the :ref:`User manual <user_manual>`.

  If Wazuh runs in a multi-node cluster, it is necessary to update all Wazuh managers to the same version. Otherwise, Wazuh nodes will not join the cluster.


- **Recommended action** -  Disable Wazuh updates

  We recommend disabling the Wazuh repository to prevent accidental upgrades. To do so, use the following command:


  
  .. tabs::
  
    .. group-tab:: Yum
  
      .. code-block:: console
  
        # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo
  
    .. group-tab:: APT
  
      This step is not necessary if the user set the packages to a ``hold`` state instead of disabling the repository.
  
      .. code-block:: console
  
        # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/wazuh.list
        # apt-get update
  
      Alternatively, the user can set the package state to ``hold``, which will stop updates. It will be still possible to upgrade it manually   using ``apt-get install``:
  
      .. code-block:: console
  
        # echo "wazuh-manager hold" | sudo dpkg --set-selections
  
    .. group-tab:: ZYpp
  
      .. code-block:: console
  
        # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo
    

Next steps
----------

The Wazuh manager is now successfully upgraded. To check if your version of Elastic Stack is compatible with the new Wazuh version, check our :ref:`compatibility matrix <wazuh_kibana_compatibility_matrix>`. 

- To upgrade Elastic Stack, follow the instructions in the :ref:`Upgrading Elasticsearch, Kibana and Filebeat<upgrade_elasticsearch_filebeat_kibana>` section.
- If you are going to keep the same version of Elastic Stack, unfold the next section and follow the instructions to replace the Wazuh Kibana plugin.  
    
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

   




