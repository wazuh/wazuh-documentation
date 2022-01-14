.. Copyright (C) 2022 Wazuh, Inc.

.. meta:: :description: Splunk for Wazuh installation guide

.. _splunk_app:

Install the Wazuh app for Splunk
================================

Wazuh app for Splunk offers a UI to visualize Wazuh alerts and Wazuh API data. Wazuh helps you to gain deeper security visibility into your infrastructure by monitoring hosts at an operating system and application level.

.. thumbnail:: ../../../images/splunk-app/splunk-app.png
  :title: Splunk app - Overview > Security events tab
  :align: center
  :width: 90%

Installation
------------

#. Download the latest Wazuh app for Splunk:

    .. code-block:: console

      # curl -o SplunkAppForWazuh.tar.gz https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_LATEST|_|SPLUNK_LATEST|-1.tar.gz

#. Install the Wazuh app for Splunk:

    .. tabs::


      .. group-tab:: CLI mode
    

        .. code-block:: console

          # /opt/splunk/bin/splunk install app SplunkAppForWazuh.tar.gz
          # /opt/splunk/bin/splunk restart



      .. group-tab:: Web GUI


        .. code-block:: none

          Apps -> Manage apps -> Install app from file



#. Open Splunk in your desired browser and click on the Wazuh app icon:

    .. image:: ../../../images/splunk-app/app-icon.png
      :align: center

#. The app will redirect you to the *Settings* tab, where fill the form with your **Wazuh API credentials**. Use the URL and port from your Wazuh API server.

    By default, the Wazuh API port is ``55000``. The default username and password is ``wazuh:wazuh``. 
    
    Once added the API, it is possible to check the connection by pressing the *Check connection* button on each Wazuh API entry. A successful message appears on the bottom right corner if the connection is established.

    .. note::
      You can get more information about how to set up the credentials at :ref:`securing_api`.

    .. thumbnail:: ../../../images/splunk-app/app-setup.png
      :title: App initial configuration
      :align: center
      :width: 100%

    When the Wazuh app for Splunk is installed, the next step is installing and configuring :ref:`Splunk forwarder <splunk_forwarder>`.

#. In order to configure the index and source type of the app, go to *Settings/Index* (view image).

    The default values are for index ``wazuh`` and for source type ``*``.

    .. note::
       The Wazuh app considers as a valid index all indices that contain the word ``wazuh`` in the source type, the default value from the installation guide for source type is ``wazuh``.

    .. thumbnail:: ../../../images/splunk-app/app-index-sourcetype.png
      :title: Index and Source Type configuration
      :align: center
      :width: 100%

    You can also select the API, Index and Source Type using the *Quick settings* menu. 

    .. thumbnail:: ../../../images/splunk-app/quick-settings.png
      :title: Index and Source Type configuration
      :align: center
      :width: 100%

    .. thumbnail:: ../../../images/splunk-app/quick-settings-open.png
      :title: Index and Source Type configuration
      :align: center
      :width: 100%

Installing the Wazuh app for Splunk in a Splunk cluster
-------------------------------------------------------

.. note::
  We can install the Wazuh app for Splunk in each search-head manually, but in case of having hundreds or even thousands of search-heads, it is more convenient to install it automatically.
  For this purpose, the ``deployer`` will be used, a machine that installs the Wazuh app for Splunk in every search-head at the same time and automatically.

Install the Wazuh app for Splunk on the ``deployer`` machine and follow the steps:


#. Copy the Wazuh app for Splunk into the Splunk cluster folder:

    .. code-block:: console

      # cp -r installation_path/SplunkAppForWazuh /opt/splunk/etc/shcluster/apps

#. Create the file that listens the outputs from the Wazuh API:

    .. code-block:: console

      # touch /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh/default/outputs.conf

#. Fill the ``outputs.conf`` file with the next lines:

    .. code-block:: xml

      [indexer_discovery:cluster1]
      pass4SymmKey = changeme
      master_uri = https://<master_ip>:<management_port>

      [tcpout:cluster1_tcp]
      indexerDiscovery = cluster1

      [tcpout]
      defaultGroup = cluster1_tcp

    .. note::
      The ``indexerDiscovery`` attribute is used for setting the connection to peer nodes. More information about the ``indexerDiscovery`` attribute can be found `here <https://docs.splunk.com/Documentation/Splunk/7.1.3/Indexer/indexerdiscovery>`_.

    .. note::
      ``<master_ip>`` references to the indexers master IP address.

    .. warning::
      The ``https`` is required by default and the default port is 8089.

#. Apply the changes:

    .. code-block:: console

      # /opt/splunk/bin/splunk apply shcluster-bundle -target https://<NODE_IP>:<management_port> -auth <user>:<password>

Now, we should have the ``/opt/splunk/etc/apps/SplunkAppForWazuh`` in every ``search head``.

Update the Wazuh app for Splunk
-------------------------------

#. To perform the update, the Wazuh app for Splunk must be deleted from the deployer and reinstalled by following the previous steps:

    .. code-block:: console

      # rm -rf /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh


#. Then, synchronized with the option ``-force`` and will be deleted from the search heads:

    .. code-block:: console

      # /opt/splunk/bin/splunk apply shcluster-bundle -force true -target https://<NODE_IP>:<management_port> -auth <user>:<password> -f
