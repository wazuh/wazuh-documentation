.. Copyright (C) 2020 Wazuh, Inc.

.. _elastic_stack_packages_legacy:

Upgrading Elastic Stack
=======================

In this guide it is described how to upgrade Elastic Stack including Filebeat, Logstash, Elasticsearch, and Kibana. Besides, it is also described how  to install and configure the Wazuh Kibana plugin. It has been used the package-based upgrade but it can be also installed from binary tarballs.

.. note::

    Upgrading directly to 7.x from 6.6 or earlier requires a `full cluster restart <https://www.elastic.co/guide/en/elasticsearch/reference/current/restart-upgrade.html>`_. Alternatively, Elastic Stack can be upgraded from 6.x to 6.8 and after that, upgraded it to |ELASTICSEARCH_LATEST|.

+----------------------------------------------------------+----------------------------------------------------+
| Type                                                     | Description                                        |
+==========================================================+====================================================+
| :doc:`From 7.x to 7.y <elastic_server_minor_upgrade>`    | How to perform an upgrade from 7.x to 7.y.         |
+----------------------------------------------------------+----------------------------------------------------+
| :doc:`From 6.8 to 7.x <elastic_server_rolling_upgrade>`  | How to perform a rolling upgrade from 6.8 to 7.x.  |
+----------------------------------------------------------+----------------------------------------------------+
| :doc:`From 6.x to 6.8 <elastic_server_hard_upgrade>`     | How to perform an upgrade from 6.x to 6.8.         |
+----------------------------------------------------------+----------------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 4

   elastic_server_minor_upgrade
   elastic_server_rolling_upgrade
   elastic_server_hard_upgrade
