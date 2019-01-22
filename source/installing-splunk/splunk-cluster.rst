.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_cluster:

Splunk Cluster
==============

.. note::
  To know how to mount a Splunk cluster, visit the `Official Splunk Documentation. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Indexer/Aboutclusters>`_

Installing the Wazuh App in a search-heads cluster
--------------------------------------------------

After we have followed all the steps in the `Official Splunk Documentation, <https://docs.splunk.com/Documentation/Splunk/7.2.3/Indexer/Aboutclusters>`_ we should have an architecture like this:

  - The deployer, a machine outside the cluster where almost the entire configuration is done.
  - The search-heads cluster, formed with the different search-heads machines.
  - The indexers.

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

After installing the App following the **Official installation guide**, we follow this steps:

.. code-block:: console

  # cp -r `<installation_path/SplunkAppForWazuh` `/opt/splunk/etc/shcluster/apps`

  # rm /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh/default/indexes.conf

  # touch /opt/splunk/etc/shcluster/apps/SplunkAppForWazuh/default/outputs.conf

Then, we fill the outputs.conf file wit the next lines:

.. code-block:: console

  [indexer_discovery:cluster1]
  pass4SymmKey = changeme
  master_uri = https://<master_ip>:<management_port>

  [tcpout:cluster1_tcp]
  indexerDiscovery = cluster1

  [tcpout]
  defaultGroup = cluster1_tcp

.. note::
  We use indexerDiscovery to connect to peer nodes. Click `here <https://docs.splunk.com/Documentation/Splunk/7.1.3/Indexer/indexerdiscovery>`_ to check more info about indexerDiscovery.


Once outputs.conf has been created, we copy the app in the deployer in the following directory:

.. code-block:: console

  # /opt/splunk/etc/shcluster/apps

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


Other configuration
--------------------

To find different ways of configuring the deployer, visit this page: `Distribute apps with the deployer. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Updating/Extendedexampledeployseveralstandardforwarders>`_

Extended example
-----------------

To see an extended example of configuration to several forwarders, visit this link: `Extended example: Deploy configurations to several forwarders. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Updating/Extendedexampledeployseveralstandardforwarders>`_
