.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_elastic_legacy:

Upgrading Elastic Stack
=======================


This guide describes the upgrading of an Elastic Stack including Filebeat, Logstash, Elasticsearch, and Kibana. We will illustrate package-based installations of these components.  You can also install them from binary tarballs, however, this is not preferred or supported under Wazuh documentation.

In addition to Elastic Stack components, you will also find the instructions to install and configure the Wazuh app (deployed as a Kibana plugin).

.. note::

    Upgrading directly to 7.x from 6.6 or earlier requires a `full cluster restart <https://www.elastic.co/guide/en/elasticsearch/reference/current/restart-upgrade.html>`_

+-------------------------------------------------------------+---------------------------------------------+
| Type                                                        | Description                                 |
+=============================================================+=============================================+
| :doc:`From 7.x to 7.y <elastic_server_minor_upgrade>`       | Perform an upgrade from 7.x to 7.y.         |
+-------------------------------------------------------------+---------------------------------------------+
| :doc:`From 6.8 to 7.x <elastic_server_rolling_upgrade>`     | Perform a rolling upgrade from 6.8 to 7.x.  |
+-------------------------------------------------------------+---------------------------------------------+
| :doc:`From a legacy version <elastic_server_hard_upgrade>`  | Perform an upgrade from 6.x to 6.8.         |
+-------------------------------------------------------------+---------------------------------------------+

.. toctree::
   :hidden:
   :maxdepth: 4

   elastic_server_minor_upgrade
   elastic_server_rolling_upgrade
   elastic_server_hard_upgrade
