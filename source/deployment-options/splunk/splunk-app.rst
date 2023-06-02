.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh installation guide for Splunk.

Install the Wazuh app for Splunk
================================

The Wazuh app for Splunk offers a UI to visualize Wazuh alerts and Wazuh API data. Wazuh helps you gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.

For the correct operation and communication, the Wazuh app for Splunk and the Wazuh server must run the same version, for example version |WAZUH_CURRENT|.

The following sections show how to install it, update it, and troubleshoot eventual installation errors.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

.. thumbnail:: /images/splunk-app/wazuh-app-for-splunk.png
   :align: center
   :width: 80%
   :title: Wazuh app for Splunk
   :alt: Wazuh app for Splunk

.. note::      

      - This guide installs and configures the Wazuh app for Splunk |SPLUNK_LATEST_MINOR|. If you intend to configure another version, such as 8.1, change the Splunk version number in the requests for the configuration files and the Wazuh app for Splunk. For example:

         .. code-block:: console

            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_|SPLUNK_LATEST_MINOR|-|WAZUH_SPLUNK_REV_CURRENT_LATEST|.tar.gz


         Becomes

         .. code-block:: console
            
            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1-|WAZUH_SPLUNK_REV_CURRENT_8.1|.tar.gz

         Check the :ref:`Splunk compatiblity matrix <wazuh_and_splunk_app>` for more information.

Install the Wazuh app for Splunk in an all-in-one architecture
--------------------------------------------------------------

#. Download the latest Wazuh app for Splunk to the all-in-one server:

         .. code-block:: console      

            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_|SPLUNK_LATEST_MINOR|-|WAZUH_SPLUNK_REV_CURRENT_LATEST|.tar.gz


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

#. Open Splunk in your desired browser and log in with the username and password created when the Splunk package was installed. Click on the Wazuh app icon.

#. The app will redirect you to the Settings tab. Fill out the form with your Wazuh API credentials. Use the URL and port from your Wazuh API server.

   By default, the Wazuh API port is ``55000``. The default username and password is ``wazuh:wazuh``. Once the API has been added, it is possible to check the connection by pressing the `Check connection` button on each Wazuh API entry. A successful message appears at the bottom right corner if the connection is established.

   .. note::
    
      You can get more information about how to set up the credentials at :doc:`Securing the Wazuh API </user-manual/api/securing-api>` section.

   .. thumbnail:: /images/splunk-app/wazuh-api-configuration.png
      :align: left
      :width: 100%
      :title: Wazuh API configuration
      :alt: Wazuh API configuration

   When the Wazuh app for Splunk is installed, the next step is installing and configuring the :ref:`Splunk forwarder <splunk_forwarder>`.

#. In order to configure the index and source type of the app, go to `Settings/Index` (view image).

   The default values are ``wazuh`` for the index and ``All`` for the source type.

   .. note::
      
      The Wazuh app considers as a valid index all indices that contain the word ``wazuh`` in the source type. The default value from the installation guide for source type is ``wazuh``.

   .. thumbnail:: /images/splunk-app/configure-index-and-source-type.png
      :align: left
      :width: 100%
      :title: Configure the index and source type
      :alt: Configure the index and source type

   You can also select the API, Index, and Source Type using the `Quick settings menu`.

#. Open the “Overview” tab, and you should start seeing alerts and events.

   .. thumbnail:: /images/splunk-app/alerts-dashboard.png
      :align: left
      :width: 100%
      :title: Alerts dashboard
      :alt: Alerts dashboard

Install the Wazuh app for Splunk in a minimal distributed architecture
----------------------------------------------------------------------

#. Download the latest Wazuh app for Splunk to the indexer node:

         .. code-block:: console
            
            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_|SPLUNK_LATEST_MINOR|-|WAZUH_SPLUNK_REV_CURRENT_LATEST|


#. Install the Wazuh app for Splunk:

   .. tabs::
      
      .. group-tab:: CLI mode
        
         .. code-block:: console
            
           # /opt/splunk/bin/splunk install app SplunkAppForWazuh.tar.gz
           # /opt/splunk/bin/splunk restart
                
      .. group-tab:: Web GUI
        
         Apps -> Manage apps -> Install app from file

#. Open Splunk in your desired browser and log in with the username and password created when the Splunk package was installed. Click on the Wazuh app icon.

#. The app will redirect you to the Settings tab. If you are not redirected to the Settings tab, select the settings icon, this will take you to the “Settings” page.

   .. thumbnail:: /images/splunk-app/settings-icon.png
      :align: left
      :width: 100%
      :title: Settings icon
      :alt: Settings icon

   Fill out the form with your Wazuh API credentials. Use the URL and port from your Wazuh API server.
        
   By default, the Wazuh API port is ``55000``. The default username and password is ``wazuh:wazuh``. Once the API has been added, it is possible to check the connection by pressing the Check connection button on each Wazuh API entry. A successful message appears at the bottom right corner if the connection is established.
    
   .. note::
    
      You can get more information about how to set up the credentials at :doc:`Securing the Wazuh API </user-manual/api/securing-api>` section.

   .. thumbnail:: /images/splunk-app/wazuh-api-credentials.png
      :align: left
      :width: 100%
      :title: Wazuh API credentials
      :alt: Wazuh API credentials

#. In order to configure the index and source type of the app, go to Settings/Index (view image).

   The default values are ``wazuh`` for the index and ``All`` for the source type.

   .. note::

      The Wazuh app considers as a valid index all indices that contain the word ``wazuh`` in the source type. The default value from the installation guide for source type is ``wazuh``.

   .. thumbnail:: /images/splunk-app/settings-index.png
      :align: left
      :width: 100%
      :title: Settings/Index
      :alt: Settings/Index
        
   You can also select the API, Index, and Source Type using the `Quick settings menu`.
    
#. Open the “Overview” tab, and you should start seeing alerts and events.

   .. thumbnail:: /images/splunk-app/alerts-and-events.png
      :align: left
      :width: 100%
      :title: Alerts dashboard
      :alt: Alerts dashboard

Install the Wazuh app for Splunk in a multi-instance cluster
------------------------------------------------------------

Install the Wazuh app for Splunk on the ``deployer`` machine and follow the steps below:

#. Download the latest Wazuh app for Splunk to the deployer node:

         .. code-block:: console
            
            # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_|SPLUNK_LATEST_MINOR|-|WAZUH_SPLUNK_REV_CURRENT_LATEST|.tar.gz



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

#. Open a Splunk search head instance in your desired browser and log in with the username and password created when the Splunk search head package was installed. Click on the Wazuh app icon.

#. The app will redirect you to the Settings tab. If you are not redirected to the Settings tab, select the settings icon, this will take you to the “Settings” page.

   .. thumbnail:: /images/splunk-app/settings-page.png
      :align: left
      :width: 100%
      :title: Settings page
      :alt: Settings page

   Fill out the form with your Wazuh API credentials. Use the URL and port from your Wazuh master node.
    
   By default, the Wazuh API port is ``55000``. The default username and password is ``wazuh:wazuh``. Once the API has been added, it is possible to check the connection by pressing the Check connection button on each Wazuh API entry. A successful message appears at the bottom right corner if the connection is established.

   .. note::
    
      You can get more information about how to set up the credentials at :doc:`Securing the Wazuh API </user-manual/api/securing-api>` section.

   .. thumbnail:: /images/splunk-app/wazuh-api-setting.png
      :align: left
      :width: 100%
      :title: Wazuh API setting
      :alt: Wazuh API setting
        
#. In order to configure the index and source type of the app, go to Settings/Index (view image).

   The default values are ``wazuh`` for the index and ``All`` for the source type.
    
   .. note::
    
      The Wazuh app considers as a valid index all indices that contain the word ``wazuh`` in the source type. The default value from the installation guide for source type is ``wazuh``.

   .. thumbnail:: /images/splunk-app/index-tab.png
      :align: left
      :width: 100%
      :title: Index tab
      :alt: Index tab
    
   You can also select the API, Index, and Source Type using the `Quick settings menu`.

#. Open the “Overview” tab, and you should start seeing alerts and events.

   .. thumbnail:: /images/splunk-app/alerts-and-events-tab.png
      :align: left
      :width: 100%   
      :title: Alerts dashboard
      :alt: Alerts dashboard
        
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
