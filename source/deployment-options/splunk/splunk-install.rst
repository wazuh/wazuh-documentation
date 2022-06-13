.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta::
   :description: Learn how to install and configure Splunk components.

Install and configure Splunk
============================

The Splunk components must be installed and configured to use the Wazuh Splunk app. The Splunk installation architecture is dependent on the architecture of the Wazuh manager.

-  :doc:`Install Splunk in an all-in-one architecture <splunk-basic>`: In an **all-in-one architecture**, the forwarder, Splunk enterprise instance, the Wazuh app for Splunk, and the Wazuh manager are installed on one server.
-  **Install Splunk in a distributed architecture**: In a **distributed architecture**, the Wazuh manager and Splunk enterprise are installed on different servers. There are two options for using the distributed architecture:

   -  :doc:`Install a minimal Splunk distributed architecture <splunk-minimal-distributed>`: In a **minimal distributed architecture**, the forwarder is installed on the same server as the Wazuh manager. The forwarder must point to the **Splunk Enterprise instance** where the Wazuh app was installed.
   
      .. note::
      
         This installation architecture is used when you have a single Wazuh manager node.
         
   -  :doc:`Install Splunk in a multi-instance cluster <splunk-distributed>`: In a **multi-instance cluster**, the forwarder is installed on the same server as the Wazuh manager and must point to the **search peers (or indexers)**.
   
      .. note::
      
         This installation architecture is used when the Wazuh manager is installed as a cluster.

.. toctree::
   :maxdepth: 2
   :hidden:

   splunk-basic
   splunk-minimal-distributed
   splunk-distributed
