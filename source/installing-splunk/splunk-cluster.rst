.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_cluster:

Splunk Cluster
==============

.. note::
  To know how to mount a Splunk cluster, visit the `Official Splunk Documentation <https://docs.splunk.com/Documentation/Splunk/7.2.3/Indexer/Aboutclusters>`_

Installing the Wazuh App
------------------------

The Wazuh App will be installed in the deployer.

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

Once outputs.conf has been created, we copy the app in the deployer in the directory:

.. code-block:: console

  # /opt/splunk/etc/shcluster/apps

Apply the changes:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -target https://172.16.2.30:8089 -auth admin:changeme

.. note::
  The last command must point to the **search head captain IP**.

Now, we should have the `/opt/splunk/etc/apps/SplunkAppForWazuh` in the **search heads**.

To actualice, we must delete the app. First, we delete it from the deployer.

Once, we synchronize with the option -force and will be deleted from the search heads:

.. code-block:: console

  # /opt/splunk/bin/splunk apply shcluster-bundle -force true -target https://172.16.2.30:8089 -auth admin:changeme -f
