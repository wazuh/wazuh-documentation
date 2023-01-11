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


Compatibility matrix
--------------------

The following table shows the Splunk versions compatible with the Wazuh manager |WAZUH_SPLUNK_CURRENT| using the Wazuh Splunk app |WAZUH_SPLUNK_CURRENT|:

+----------------------+
| Splunk               |
+======================+
| 8.1.1 – 8.1.10       |
+----------------------+
| 8.2.0 – 8.2.8        |
+----------------------+

Packages list
-------------

This section contains packages required for the Wazuh Splunk app |WAZUH_SPLUNK_CURRENT| installation:

.. |SPLUNK_8.1.1_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.1.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.1-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.1-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.2_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.2.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.2-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.2-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.3_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.3.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.3-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.3-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.4_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.4.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.4-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.4-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.5_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.5.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.5-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.5-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.6_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.6.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.6-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.6-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.7_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.7.1_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7.1.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7.1-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7.1-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.7.2_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7.2.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7.2-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.7.2-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.8_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.8.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.8-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.8-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.9_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.9.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.9-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.9-1.tar.gz.sha512>`__)

.. |SPLUNK_8.1.10_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.10.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.10-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.1.10-1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.0_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.0.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.0-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.0-1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.1_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.1.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.1-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.1-1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.2_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.2.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.2-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.2-1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.3_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.3.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.3-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.3-1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.4_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.4.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.4-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.4-1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.5_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.5.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.5-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.5-1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.6_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.6.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.6-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.6-1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.7.1_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.7.1.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.7.1-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.7.1.tar.gz.sha512>`__)

.. |SPLUNK_8.2.8_PKG| replace:: `wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.8.tar.gz <https://packages.wazuh.com/4.x/ui/splunk/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.8-1.tar.gz>`__ (`sha512 <https://packages.wazuh.com/4.x/checksums/wazuh/|WAZUH_SPLUNK_CURRENT|/wazuh_splunk-|WAZUH_SPLUNK_CURRENT|_8.2.8-1.tar.gz.sha512>`__)  

+----------------------+----------------------+
| Splunk version       | Package              |
+======================+======================+
| 8.1.1                | |SPLUNK_8.1.1_PKG|   |
+----------------------+----------------------+
| 8.1.2                | |SPLUNK_8.1.2_PKG|   |
+----------------------+----------------------+
| 8.1.3                | |SPLUNK_8.1.3_PKG|   |
+----------------------+----------------------+
| 8.1.4                | |SPLUNK_8.1.4_PKG|   |
+----------------------+----------------------+
| 8.1.5                | |SPLUNK_8.1.5_PKG|   |
+----------------------+----------------------+
| 8.1.6                | |SPLUNK_8.1.6_PKG|   |
+----------------------+----------------------+
| 8.1.7                | |SPLUNK_8.1.7_PKG|   |
+----------------------+----------------------+
| 8.1.7.1              | |SPLUNK_8.1.7.1_PKG| |
+----------------------+----------------------+
| 8.1.7.2              | |SPLUNK_8.1.7.2_PKG| |
+----------------------+----------------------+
| 8.1.8                | |SPLUNK_8.1.8_PKG|   |
+----------------------+----------------------+
| 8.1.9                | |SPLUNK_8.1.9_PKG|   |
+----------------------+----------------------+
| 8.1.10               | |SPLUNK_8.1.10_PKG|  |
+----------------------+----------------------+
| 8.2.0                | |SPLUNK_8.2.0_PKG|   |
+----------------------+----------------------+
| 8.2.1                | |SPLUNK_8.2.1_PKG|   |
+----------------------+----------------------+
| 8.2.2                | |SPLUNK_8.2.2_PKG|   |
+----------------------+----------------------+
| 8.2.3                | |SPLUNK_8.2.3_PKG|   |
+----------------------+----------------------+
| 8.2.4                | |SPLUNK_8.2.4_PKG|   |
+----------------------+----------------------+
| 8.2.5                | |SPLUNK_8.2.5_PKG|   |
+----------------------+----------------------+
| 8.2.6                | |SPLUNK_8.2.6_PKG|   |
+----------------------+----------------------+
| 8.2.7.1              | |SPLUNK_8.2.7.1_PKG| |
+----------------------+----------------------+
| 8.2.8                | |SPLUNK_8.2.8_PKG|   |
+----------------------+----------------------+


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
