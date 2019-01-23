.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_cluster:

Splunk Cluster
==============

.. note::
  To know how to mount a Splunk cluster, visit the `Official Splunk Documentation. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Indexer/Aboutclusters>`_

  After we have followed all the steps in the `Official Splunk Documentation, <https://docs.splunk.com/Documentation/Splunk/7.2.3/Indexer/Aboutclusters>`_ we should have an architecture like this:

    - The deployer, a machine outside the cluster where almost the entire wazuh  installation is done.
    - The search-heads cluster, formed with the different search-heads machines.
    - The indexers.
    - The master, a machine where remote configure the indexers.

.. warning::
  By following this guide, you will learn how to install and configure **Wazuh** in an already created Splunk Cluster, so all the configuration related with Splunk is in their **Official Documentation**, and we assume that you have already done that installation and configuration well.

Master configuration
--------------------

To configure the master machine we first install the splunk forwarder:

.. code-block:: console

  # wget -O splunkforwarder-7.2.0-8c86330ac18-linux-2.6-x86_64.rpm 'https://www.splunk.com/bin/splunk/DownloadActivityServlet?architecture=x86_64&platform=linux&version=7.2.0&product=universalforwarder&filename=splunkforwarder-7.2.0-8c86330ac18-linux-2.6-x86_64.rpm&wget=true'

  # yum install splunkforwarder-7.2.0-8c86330ac18-linux-2.6-x86_64.rpm -y

Now, we need to configure the 3 most important files in this machine:

  - **inputs.conf**: Reads alerts from **alerts.json**
  - **outputs.conf**: Contains necessary information to know the cluster's indexers.
  - **props.conf**: Contains the different ways of how alerts will be indexes.

Starting with **inputs.conf**, we create it and fill it with the next block:

.. code-block:: console

  # touch /opt/splunkforwarder/etc/system/local/inputs.conf

.. code-block:: xml

  [monitor:///var/ossec/logs/alerts/alerts.json]
  disabled = 0
  host = MANAGER_HOSTNAME
  index = wazuh
  sourcetype = wazuh

Now, following with the **outputs.conf**:

.. code-block:: console

  # touch /opt/splunkforwarder/etc/system/local/outputs.conf

And paste this inside:

.. code-block:: xml

  [indexer_discovery:cluster1]
  pass4SymmKey = changeme
  master_uri = https://172.16.2.15:8089

  [tcpout:cluster1_tcp]
  indexerDiscovery = cluster1

  [tcpout]
  defaultGroup = cluster1_tcp

For the last one, the **props.conf**, we follow the same procedure:

.. code-block:: console

  # touch /opt/splunkforwarder/etc/system/local/props.conf

.. code-block:: xml

  [wazuh]
  DATETIME_CONFIG =
  INDEXED_EXTRACTIONS = json
  KV_MODE = none
  NO_BINARY_CHECK = true
  category = Application
  disabled = false
  pulldown_type = true

To save all the changes, we restart splunk:

.. code-block:: console

  # /opt/splunkforwarder/bin/splunk restart


Indexes configuration
---------------------

Here, we will configure in the **master machine** the indexes that will receive and create the search peers.

.. warning::
  At any moment we will create the indexes in the master.

For this configuration we need to create the following two files and paste into them the following blocks of code respectively:

.. code-block:: console

  # touch /opt/splunk/etc/master-apps/_cluster/local/inputs.conf

.. code-block:: xml

  [splunktcp://9997]
  connection_host = ip


.. code-block:: console

  # touch /opt/splunk/etc/master-apps/_cluster/local/indexes.conf

.. code-block:: xml

  [wazuh]
  coldPath = $SPLUNK_DB/wazuh/colddb
  enableDataIntegrityControl = 1
  enableTsidxReduction = 1
  homePath = $SPLUNK_DB/wazuh/db
  maxTotalDataSizeMB = 512000
  thawedPath = $SPLUNK_DB/wazuh/thaweddb
  timePeriodInSecBeforeTsidxReduction = 15552000
  tsidxReductionCheckPeriodInSec =

  [wazuh-monitoring-3x]
  coldPath = $SPLUNK_DB/wazuh-monitoring-3x/colddb
  enableDataIntegrityControl = 1
  enableTsidxReduction = 1
  homePath = $SPLUNK_DB/wazuh-monitoring-3x/db
  maxTotalDataSizeMB = 512000
  thawedPath = $SPLUNK_DB/wazuh-monitoring-3x/thaweddb
  timePeriodInSecBeforeTsidxReduction = 15552000
  tsidxReductionCheckPeriodInSec =


Now, we restart Wazuh:

.. code-block:: console

  # splunk restart

.. note::

  We can check the state of the cluster executing:

    .. code-block:: console

      # splunk show cluster-bundle-status

Installing the Wazuh App in a Splunk cluster
--------------------------------------------

The next step is to install the Wazuh App into the search-head cluster.

.. thumbnail:: ../images/splunk_cluster/Searchhead_cluster.png
    :title: Splunk Cluster with Wazuh installed architecture.
    :align: center
    :width: 100%

.. note::
  We can install the App in each search-head by hand, but if we have hundreds or even thousands of search-heads, it will be better to install it automatically.
  For this purpose, we are using the **deployer**, a machine that installs the App in every search-head at the same time and automatically.


.. warning::
  We need to eliminate "SplunkAppForWazuh/default/indexes.conf" so it does not create automatic indexes in the search-heads.

After installing the App following the **Official installation guide** in our **deployer** machine, we follow this steps:

.. code-block:: console

  // Copy the app into the splunk cluster folder:
  # cp -r installation_path/SplunkAppForWazuh /opt/splunk/etc/shcluster/apps
  // Delete the indexes.conf to don't install automatic indexers:
  # rm /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh/default/indexes.conf
  // Create the configuration file we are really using to configure the cluster:
  # touch /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh/default/outputs.conf

Then, we fill the outputs.conf file wit the next lines:

.. code-block:: xml

  [indexer_discovery:cluster1]
  pass4SymmKey = changeme
  master_uri = https://<master_ip>:<management_port>

  [tcpout:cluster1_tcp]
  indexerDiscovery = cluster1

  [tcpout]
  defaultGroup = cluster1_tcp

.. note::
  We use indexerDiscovery to connect to peer nodes. Click `here <https://docs.splunk.com/Documentation/Splunk/7.1.3/Indexer/indexerdiscovery>`_ to check more info about indexerDiscovery.

.. note::
  <master_ip> references to the search-heads master ip.

Apply the changes:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -target https://<NODE_IP>:<management_port> -auth <user>:<password>

Now, we should have the `/opt/splunk/etc/apps/SplunkAppForWazuh` in every **search head**.

Update the Wazuh App
--------------------

To update, we must delete the app from the deployer, and reinstall it following the previous steps.

.. code-block:: console

  # rm -rf /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh

Then, we synchronize with the option -force and will be deleted from the search heads:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -force true -target https://<NODE_IP>:<management_port> -auth <user>:<password> -f

Now, we follow the steps related in the **Installing the Wazuh App in a search-heads cluster** at this same page.

Other configuration
--------------------

To find different ways of configuring the deployer, visit this page: `Distribute apps with the deployer. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Updating/Extendedexampledeployseveralstandardforwarders>`_

Extended example
-----------------

To see an extended example of configuration to several forwarders, visit this link: `Extended example: Deploy configurations to several forwarders. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Updating/Extendedexampledeployseveralstandardforwarders>`_
