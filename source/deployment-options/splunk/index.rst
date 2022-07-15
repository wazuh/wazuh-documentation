.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install Splunk Enterprise as a single or multi-instance cluster along with the Splunk forwarder and the Wazuh Splunk app. 

Installing Wazuh with Splunk
============================

This guide describes how to install Splunk Enterprise as an all-in-one installation with the Splunk forwarder and the Wazuh app for Splunk on one server, or as a distributed installation where the Wazuh manager and Splunk components are installed on different servers.

-  :doc:`All-in-one installation <splunk-basic>`: This will install the Splunk indexer, the Splunk forwarder, the Wazuh app for Splunk, and the Wazuh manager on one server. This is suitable for test environments.

-  :doc:`Distributed installation <splunk-install>`: This will install the Splunk forwarder and the Wazuh manager on one server while the rest of the Splunk components are installed on different servers. There are two options for using the distributed architecture:

   -   :doc:`Minimal Splunk distributed installation <splunk-minimal-distributed>`: This guide will install the Splunk indexer and the Wazuh app for Splunk on one server, while the Splunk forwarder, and the Wazuh manager are installed on another server.
   -   :doc:`Multi-instance cluster installation <splunk-distributed>`: This will install a Wazuh manager cluster to be used with a Splunk cluster. It is recommended to replicate data along different indexes and make distributed searches.

To learn more about how Splunk works, see the `Splunk documentation <https://docs.splunk.com/Documentation>`__. Additionally, you can check the `Splunk Distributed Deployment Manual <http://docs.splunk.com/Documentation/Splunk/|SPLUNK_LATEST|/Deploy/Distributedoverview>`__ to learn how to scale your environments using Splunk Enterprise.

.. note::
  
   On Linux systems, the Splunk software requires a 64-bit version of the operating system. Although Splunk can be installed on different OS, the Splunk app is only compatible with Linux systems.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2
      :includehidden:

      splunk-wazuh
      splunk-install
      splunk-app
      splunk-reverse-proxy
      splunk-polling
      splunk-rbac
