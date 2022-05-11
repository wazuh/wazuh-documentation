.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta:: :description: Splunk for Wazuh installation guide

Install the Wazuh app for Splunk
================================

Wazuh app for Splunk offers a UI to visualize Wazuh alerts and Wazuh API data. Wazuh helps you gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

.. thumbnail:: /images/splunk-app/12.png
   :align: center
   :width: 80%

Install the Wazuh app for Splunk in an all-in-one architecture
--------------------------------------------------------------

.. note::      

      - This guide will install and configure the Wazuh app for Splunk |SPLUNK_LATEST|. If you intend to configure a different version of Splunk with the Wazuh app, change the Splunk version number in the requests for the configuration files and Wazuh app for Splunk. For example, if you intend to configure Splunk 8.2.2:

         .. code-block:: console

            #  # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_|SPLUNK_LATEST|-1.tar.gz


         Becomes

         .. code-block:: console
            
            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_8.2.2-1.tar.gz


#. Download the latest Wazuh app for Splunk to the all-in-one server:

         .. code-block:: console      

            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_|SPLUNK_LATEST|-1.tar.gz


#. Install the Wazuh app for Splunk:

   .. tabs::
      
      .. group-tab:: CLI mode
        
         .. code-block:: console
            
            # /opt/splunk/bin/splunk install app SplunkAppForWazuh.tar.gz
                
      .. group-tab:: Web GUI
        
         Apps -> Manage apps -> Install app from file

#. Restart Splunk:

   .. code-block:: console
    
      # /opt/splunk/bin/splunk restart

#. Restart the Splunk forwarder:

   .. code-block:: console
    
      # /opt/splunkforwarder/bin/splunk restart

#. Open Splunk in your desired browser and login with the username and password created when the Splunk package was installed. Click on the Wazuh app icon.

#. The app will redirect you to the Settings tab. Fill the form with your Wazuh API credentials. Use the URL and port from your Wazuh API server.

   By default, the Wazuh API port is ``55000``. The default username and password is ``wazuh:wazuh``. Once the API has been added, it is possible to check the connection by pressing the `Check connection` button on each Wazuh API entry. A successful message appears on the bottom right corner if the connection is established.

   .. note::
    
      You can get more information about how to set up the credentials at :doc:`Securing the Wazuh API </user-manual/api/securing-api>` section.

   .. thumbnail:: /images/splunk-app/13.png
      :align: left
      :width: 100%

   When the Wazuh app for Splunk is installed, the next step is installing and configuring :ref:`Splunk forwarder <splunk_forwarder>`.

#. In order to configure the index and source type of the app, go to `Settings/Index` (view image).

   The default values are: ``wazuh`` for the index and ``All`` for the source type.

   .. note::
      
      The Wazuh app considers as a valid index all indices that contain the word ``wazuh`` in the source type. The default value from the installation guide for source type is ``wazuh``.

   .. thumbnail:: /images/splunk-app/14.png
      :align: left
      :width: 100%

   You can also select the API, Index and Source Type using the `Quick settings menu`.

#. Open the “Overview” tab, and you should start seeing alerts and events.

   .. thumbnail:: /images/splunk-app/15.png
      :align: left
      :width: 100%

Install the Wazuh app for Splunk in a minimal distributed architecture
----------------------------------------------------------------------

.. note::      

      - This guide will install and configure the Wazuh app for Splunk |SPLUNK_LATEST|. If you intend to configure a different version of Splunk with the Wazuh app, change the Splunk version number in the requests for the configuration files and Wazuh app for Splunk. For example, if you intend to configure Splunk 8.2.2:

         .. code-block:: console



         Becomes

         .. code-block:: console
            
            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_8.2.2-1.tar.gz


#. Download the latest Wazuh app for Splunk to the indexer node:

         .. code-block:: console
            
            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_|SPLUNK_LATEST|-1.tar.gz


#. Install the Wazuh app for Splunk:

   .. tabs::
      
      .. group-tab:: CLI mode
        
         .. code-block:: console
            
           # /opt/splunk/bin/splunk install app SplunkAppForWazuh.tar.gz
           # /opt/splunk/bin/splunk restart
                
      .. group-tab:: Web GUI
        
         Apps -> Manage apps -> Install app from file

#. Open Splunk in your desired browser and login with the username and password created when the Splunk package was installed. Click on the Wazuh app icon.

#. The app will redirect you to the Settings tab. If you are not redirected to the Settings tab, select the settings icon, this will take you to the “Settings” page.

   .. thumbnail:: /images/splunk-app/16.png
      :align: left
      :width: 100%

   Fill the form with your Wazuh API credentials. Use the URL and port from your Wazuh API server.
        
   By default, the Wazuh API port is ``55000``. The default username and password is ``wazuh:wazuh``. Once the API has been added, it is possible to check the connection by pressing the Check connection button on each Wazuh API entry. A successful message appears on the bottom right corner if the connection is established.
    
   .. note::
    
      You can get more information about how to set up the credentials at :doc:`Securing the Wazuh API </user-manual/api/securing-api>` section.

   .. thumbnail:: /images/splunk-app/17.png
      :align: left
      :width: 100%

#. In order to configure the index and source type of the app, go to Settings/Index (view image).

   The default values are: ``wazuh`` for the index and ``All`` for the source type.

   .. note::

      The Wazuh app considers as a valid index all indices that contain the word ``wazuh`` in the source type. The default value from the installation guide for source type is ``wazuh``.

   .. thumbnail:: /images/splunk-app/18.png
      :align: left
      :width: 100%
        
   You can also select the API, Index and Source Type using the Quick settings menu.
    
#. Open the “Overview” tab, and you should start seeing alerts and events.

   .. thumbnail:: /images/splunk-app/19.png
      :align: left
      :width: 100%

Install the Wazuh app for Splunk in a multi-instance cluster
------------------------------------------------------------

.. note::

   -  We can install the Wazuh app for Splunk in each search-head manually, but in cases where there are many search-heads, it is more convenient to install it automatically. For this purpose, the ``deployer`` will be used. The deployer is an endpoint that installs the Wazuh app for Splunk in every search-head automatically.
    
   -  The official Splunk documentation for deploying a search head cluster is `here <https://docs.splunk.com/Documentation/Splunk/|SPLUNK_LATEST|/Deploy/SHCwithindexers>`__.

   -  This guide will install and configure the Wazuh app for Splunk |SPLUNK_LATEST|. If you intend to configure a different version of Splunk with the Wazuh app, change the Splunk version number in the requests for the configuration files and Wazuh app for Splunk. For example, if you intend to configure Splunk 8.2.2:

         .. code-block:: console

            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_|SPLUNK_LATEST|-1.tar.gz


         Becomes

         .. code-block:: console
            
            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_8.2.2-1.tar.gz


Install the Wazuh app for Splunk on the ``deployer`` machine and follow the steps below:

#. Download the latest Wazuh app for Splunk to the deployer node:

         .. code-block:: console
            
            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_|SPLUNK_LATEST|-1.tar.gz



#. Install the Wazuh app for Splunk on the deployer:

   .. tabs::

      .. group-tab:: CLI mode

         .. code-block:: console

            # /opt/splunk/bin/splunk install app SplunkAppForWazuh.tar.gz
            # /opt/splunk/bin/splunk restart

#. Copy the Wazuh app for Splunk into the Splunk cluster folder:

   .. code-block:: console

      # cp -r $SPLUNK_HOME/etc/apps/SplunkAppForWazuh /opt/splunk/etc/shcluster/apps

#. Create the file that listens for outputs from the Wazuh API:

   .. code-block:: console

      # touch /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh/default/outputs.conf

#. Fill the ``outputs.conf`` file with the next lines:

   .. code-block:: yaml

      [indexer_discovery:cluster1]
      pass4SymmKey = changeme
      master_uri = https://<master_ip>:<management_port>

      [tcpout:cluster1_tcp]
      indexerDiscovery = cluster1

      [tcpout]
      defaultGroup = cluster1_tcp

   .. note::

      -  The ``indexerDiscovery`` attribute is used for setting the connection to peer nodes. More information about the ``indexerDiscovery`` attribute can be found `here <https://docs.splunk.com/Documentation/Splunk/7.1.3/Indexer/indexerdiscovery>`__.
      -  ``<master_ip>`` references the indexers master IP address.
      -  ``changeme`` references the security key used with communication between the cluster master and the forwarders.

   .. warning::

      ``https`` is required by default and the default port is 8089.

#. Apply the changes:

   .. code-block:: console

      # /opt/splunk/bin/splunk apply shcluster-bundle -target https://<NODE_IP>:<management_port> -auth <user>:<password>
   
   Where:

   | ``<NODE_IP>`` references the search head captain IP address.
   | ``<port>`` references the search head captain management port.

   Now, we should have the ``/opt/splunk/etc/apps/SplunkAppForWazuh`` in every ``search head``.

#. Open a Splunk search head instance in your desired browser and login with the username and password created when the Splunk search head package was installed. Click on the Wazuh app icon.

#. The app will redirect you to the Settings tab. If you are not redirected to the Settings tab, select the settings icon, this will take you to the “Settings” page.

   .. thumbnail:: /images/splunk-app/20.png
      :align: left
      :width: 100%

   Fill the form with your Wazuh API credentials. Use the URL and port from your Wazuh master node.
    
   By default, the Wazuh API port is ``55000``. The default username and password is ``wazuh:wazuh``. Once the API has been added, it is possible to check the connection by pressing the Check connection button on each Wazuh API entry. A successful message appears on the bottom right corner if the connection is established.

   .. note::
    
      You can get more information about how to set up the credentials at :doc:`Securing the Wazuh API </user-manual/api/securing-api>` section.

   .. thumbnail:: /images/splunk-app/21.png
      :align: left
      :width: 100%
        
#. In order to configure the index and source type of the app, go to Settings/Index (view image).

   The default values are: ``wazuh`` for the index and ``All`` for the source type.
    
   .. note::
    
      The Wazuh app considers as a valid index all indices that contain the word ``wazuh`` in the source type. The default value from the installation guide for source type is ``wazuh``.

   .. thumbnail:: /images/splunk-app/22.png
      :align: left
      :width: 100%
    
   You can also select the API, Index and Source Type using the Quick settings menu.

#. Open the “Overview” tab, and you should start seeing alerts and events.

   .. thumbnail:: /images/splunk-app/23.png
      :align: left
      :width: 100%    
        
Update the Wazuh app for Splunk
-------------------------------

#. To perform the update, the Wazuh app for Splunk must be deleted from the deployer and reinstalled by following the previous steps:

   .. code-block:: console

      # rm -rf /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh

#. Then, synchronize the search heads with the option ``-force``.This will delete the Wazuh app for Splunk from the search heads:

   .. code-block:: console

      # /opt/splunk/bin/splunk apply shcluster-bundle -force true -target https://<NODE_IP>:<management_port> -auth <user>:<password> -f



Troubleshooting the Wazuh app for Splunk installation errors
------------------------------------------------------------

In some situations, after installing the Wazuh app for Splunk, the API input boxes do not show. Follow the steps below to fix this behavior:

#. Check the permissions on ``/opt/splunk/var/lib/splunk/kvstore/mongo/splunk.key``:

   .. code-block:: console

      # ls -lhs /opt/splunk/var/lib/splunk/kvstore/mongo/splunk.key

#. If the permissions are not set to ``400``, update them:

   .. code-block:: console

      # chmod -R 400 /opt/splunk/var/lib/splunk/kvstore/mongo/splunk.key
