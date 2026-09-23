.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about the ports that Wazuh indexer cluster nodes use to communicate with each other and with the other Wazuh central components.

Required ports
==============

Wazuh indexer cluster nodes communicate with each other and with the other Wazuh central components using the following ports.

+------+----------+------------------------------------------------------------------------------------------------------------------+
| Port | Protocol | Purpose                                                                                                          |
+======+==========+==================================================================================================================+
| 9200 | TCP      | Wazuh indexer RESTful API. Used by the Wazuh manager indexer connector, the Wazuh dashboard, and administrators. |
+------+----------+------------------------------------------------------------------------------------------------------------------+
| 9300 | TCP      | Wazuh indexer cluster communication between nodes.                                                               |
+------+----------+------------------------------------------------------------------------------------------------------------------+

.. note::

   Firewalls can block communication between Wazuh components on different endpoints, so ensure the necessary ports are open.
