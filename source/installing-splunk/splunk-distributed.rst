.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_distributed:

Installing & Configuring Splunk Cluster
=======================================

This document will guide you through the installation process for a multi-instance distributed architecture, recommended for larger environments with huge amounts of data (in this case, Wazuh alerts) and users.

.. note::
  Many of the commands described below need to be executed with root user privileges.

.. note::
  To know how to deploy a Splunk cluster, visit the `Official Splunk Documentation. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Indexer/Aboutclusters>`_

.. warning::
  By following this guide,you will learn how to install and configure **Wazuh** in an already created Splunk Cluster, so all the configuration related with Splunk is in their **Official Documentation**, and its assumed that an Splunk installation and configuration has been already done.


This is the performance of a basic Splunk Cluster, that's formed by the next elements:

- The **search head** instances will be in charge of all the searching functionality, and they will look for data on the search peers' indexes. This instances won't have any indexes at all.
- The **search peer** instances (or indexers) collect all the Wazuh data and stores it in the form of indexes. This instances are connected to the search heads so they can consult the peer's indexes.
- The **forwarder** runs on the Wazuh manager instance, it reads local data and sends it to the indexer.
- The **deployer** instance installs and configures the Wazuh App into every **search head** instance at the same time.

.. thumbnail:: ../images/splunk_cluster/splunk_cluster.png
    :title: Splunk Cluster with Wazuh installed architecture.
    :align: center
    :width: 80%

Install Splunk Enterprise instances
-----------------------------------

Each instance can be installed on different hosts following the same steps described below:

1. Download Splunk v7.2.1 package from `its official website <https://www.splunk.com/en_us/download/partners/splunk-enterprise.html>`_.

  .. note::
    Splunk is not open source software and it requires a registered user and license in order to work. You can also use a free trial license.

2. Install the Splunk v7.2.1 package:

  a) For RPM based distributions:

    .. code-block:: console

      # yum install splunk-enterprise-package.rpm

  b) For Debian/Ubuntu distributions:

    .. code-block:: console

      # dpkg --install splunk-enterprise-package.deb

3. Ensure Splunk v7.2.1 is installed in ``/opt/splunk`` and start the service:

  .. code-block:: console

    # /opt/splunk/bin/splunk start

  .. note::
    You will be prompted for a name and password for the administrator user.

  After this step the Splunk Web service will be listening to port 8000. You can browse ``http://<your-instance-ip>:8000`` in order to access the Web GUI.

4. Optional. If additionally want the Splunk service to start at boot time, execute the following command:

  .. code-block:: console

    # /opt/splunk/bin/splunk enable boot-start

Configuring the Splunk instances
--------------------------------

Master:
_______

To configure the master instance first install the `splunk forwarder. <https://www.splunk.com/en_us/download/universal-forwarder.html>`_

Now, it is necessary to configure the 3 most important files in this instance:

  - **inputs.conf**: Reads alerts from **alerts.json**
  - **outputs.conf**: Contains necessary information to know the cluster's indexers.
  - **props.conf**: Contains the different ways of how alerts will be indexes.

Starting with **inputs.conf**, create it and fill it with the next block:

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
  master_uri = https://<master_ip>:<port>

  [tcpout:cluster1_tcp]
  indexerDiscovery = cluster1

  [tcpout]
  defaultGroup = cluster1_tcp

For the last one, the **props.conf**, follow the same procedure:

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

To save all the changes, restart splunk:

.. code-block:: console

  # /opt/splunkforwarder/bin/splunk restart


Indexers:
_________

Here, in the **master instance**, make the configuration that will be pushed to the indexers.

For this configuration is necessary to create the following two files and paste into them the following blocks of code respectively:

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


Now, restart Wazuh:

.. code-block:: console

  # splunk restart

.. note::

  Check the state of the cluster executing:

    .. code-block:: console

      # splunk show cluster-bundle-status


Installing the Wazuh App in a Splunk cluster
____________________________________________

The next step is to install the Wazuh App into the search-head cluster.

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
____________________

To update, we must delete the app from the deployer, and reinstall it following the previous steps.

.. code-block:: console

  # rm -rf /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh

Then, we synchronize with the option -force and will be deleted from the search heads:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -force true -target https://<NODE_IP>:<management_port> -auth <user>:<password> -f

Now, we follow the steps related in the **Installing the Wazuh App in a search-heads cluster** at this same page.

Useful Links:
-------------
- You can find useful Splunk CLI commands in the `official documentation <http://docs.splunk.com/Documentation/Splunk/7.2.1/Admin/CLIadmincommands>`_ .
- To learn more about the Splunk distributed search, check out `this article <http://docs.splunk.com/Documentation/Splunk/7.2.1/DistSearch/Whatisdistributedsearch>`_ from the official documentation.
