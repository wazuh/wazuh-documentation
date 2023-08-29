.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out the compatibility matrix of the upgrade process of the Wazuh server and other components.
  
Compatibility matrix
====================

When upgrading Wazuh there are specific compatibility requirements to take into consideration.

Wazuh central components and agents
-----------------------------------

The Wazuh central components must share the same version numbers down to the patch category for the correct operation. For example:

-  Wazuh manager |WAZUH_CURRENT|, Wazuh indexer |WAZUH_CURRENT|, and Wazuh dashboard |WAZUH_CURRENT|. 

- The Wazuh indexer |WAZUH_CURRENT| is compatible with Filebeat-OSS |FILEBEAT_LATEST|. 

The Wazuh manager version must always be **newer than or equal to**  the Wazuh agents versions. For example:

-  Wazuh manager |WAZUH_CURRENT| and Wazuh agent 4.2.7
-  Wazuh manager |WAZUH_CURRENT| and Wazuh agent |WAZUH_CURRENT|

The Wazuh manager is also compatible with OSSEC agents but not all capabilities are available with them. 

.. _wazuh_kibana_compatibility_matrix:    

Elastic and the Wazuh Kibana plugin
-----------------------------------

Since v4.6.0, we no longer support Elastic Stack nor Open Distro for Elasticsearch. Check :doc:`/integrations-guide/index` for information on how to integrate Wazuh with them.


Splunk and the Wazuh Splunk app
-------------------------------

Since v4.6.0, we no longer support Splunk. Check :doc:`/integrations-guide/index` for information on how to integrate Wazuh with it.