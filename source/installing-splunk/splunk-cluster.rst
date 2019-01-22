.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_cluster:

Splunk Cluster
==============

.. note::
  To know how to mount a Splunk cluster, visit the `Official Splunk Documentation. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Indexer/Aboutclusters>`_

Installing the Wazuh App
------------------------

After we have followed all the steps in the `Official Splunk Documentation, <https://docs.splunk.com/Documentation/Splunk/7.2.3/Indexer/Aboutclusters>`_  the next step is to install the Wazuh App into the search-head cluster:

The Wazuh App will be installed in the machine/s that act as the deployer.

.. thumbnail:: ../images/splunk_cluster/Searchhead_cluster.png
    :title: Splunk Cluster with Wazuh installed architecture.
    :align: center
    :width: 100%


.. note::
  We need to eliminate "SplunkAppForWazuh/default/indexes.conf" so it does not create automatic indexes in the search-heads.

Once we have eliminated that file, we create the file "SplunkAppForWazuh/default/outputs.conf" and we fill it with the following lines:

.. code-block:: console

  [indexer_discovery:cluster1]
  pass4SymmKey = changeme
  master_uri = https://172.16.2.15:8089

  [tcpout:cluster1_tcp]
  indexerDiscovery = cluster1

  [tcpout]
  defaultGroup = cluster1_tcp

Once outputs.conf has been created, we copy the app in the deployer in the following directory:

.. code-block:: console

  # /opt/splunk/etc/shcluster/apps

Apply the changes:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -target https://<NODE_IP>:<management_port> -auth <user>:<password>

.. note::
  The last command must point to the **search head captain IP**.

Now, we should have the `/opt/splunk/etc/apps/SplunkAppForWazuh` in the **search heads**.

Update the Wazuh App
--------------------

To update, we must delete the app from the deployer, and reinstall it following the previous steps.

.. code-block:: console

  # rm -rf /opt/splunk/etc/shcluster/apps/<SplunkAppForWazuh>

Once, we synchronize with the option -force and will be deleted from the search heads:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -force true -target https://<NODE_IP>:<management_port> -auth <user>:<password> -f


Other configuration:
--------------------

To find different ways of configuring the deployer, visit this page: `Distribute apps with the deployer. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Updating/Extendedexampledeployseveralstandardforwarders>`_

Extended example:
-----------------

To see an extended example of configuration to several forwarders, visit this link: `Extended example: Deploy configurations to several forwarders. <https://docs.splunk.com/Documentation/Splunk/7.2.3/Updating/Extendedexampledeployseveralstandardforwarders>`_
