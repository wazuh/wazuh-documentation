.. Copyright (C) 2015–2022 Wazuh, Inc.

.. meta::
  :description: Check out the compatibility matrix of the upgrade process of the Wazuh server and other components.
  
Compatibility matrix
====================

When upgrading Wazuh there are specific compatibility requirements to take into consideration.

Wazuh central components and agents
-----------------------------------

The Wazuh central components must share the same version numbers down to the patch category for the correct operation. For example:

-  Wazuh manager |WAZUH_LATEST|, Wazuh indexer |WAZUH_LATEST|, and Wazuh dashboard |WAZUH_LATEST|. 

- The Wazuh indexer |WAZUH_LATEST| is compatible with Filebeat-OSS 7.10.2. 

The Wazuh manager version must always be **newer than or equal to**  the Wazuh agents versions. For example:

-  Wazuh manager |WAZUH_LATEST| and Wazuh agent 4.2.7
-  Wazuh manager |WAZUH_LATEST| and Wazuh agent |WAZUH_LATEST|

The Wazuh manager is also compatible with OSSEC agents but not all capabilities are available with them. 

.. _wazuh_kibana_compatibility_matrix:    

Elastic and the Wazuh Kibana plugin
-----------------------------------

The following Elastic Stack and Open Distro for Elasticsearch versions are compatible with the Wazuh manager |WAZUH_LATEST| using the Wazuh Kibana plugin:

+--------------------------+---------------------------+
| Elastic Stack version    |   Open Distro version     |
+==========================+===========================+
| 7.10.2                   | 1.13.2                    |
+--------------------------+---------------------------+
| 7.16.0–7.16.3            |                           |
+--------------------------+---------------------------+
| 7.17.0–7.17.4            |                           |
+--------------------------+---------------------------+

You can find more information on the `Wazuh Kibana plugin repository <https://github.com/wazuh/wazuh-kibana-app/wiki/Compatibility>`_.

.. _wazuh_and_splunk_app:

Splunk and the Wazuh Splunk app
-------------------------------

The following Splunk versions are compatible with the Wazuh manager |WAZUH_LATEST| using the Wazuh Splunk app |WAZUH_SPLUNK_LATEST|:

+------------------+
| Splunk version   |
+==================+
| 8.1.1–8.1.10     |
+------------------+
| 8.2.0–8.2.6      |
+------------------+

You can find more information on the `Wazuh Splunk app repository <https://github.com/wazuh/wazuh-splunk#installation>`__.
