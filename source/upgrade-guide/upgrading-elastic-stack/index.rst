.. Copyright (C) 2020 Wazuh, Inc.

.. _elastic_stack_packages_legacy:

Upgrading Elastic Stack
=======================


This guide describes the upgrade process of Elastic Stack including Elasticsearch, Filebeat and Kibana, and, for the Elastic versions older than 7.x., Logstash. Besides, the upgrade guide from 7.x to 7.y will walk the user through the process of upgrading Elasticsearch, Filebeat and Kibana for the Open Distro distribution. The Wazuh Kibana plugin will be installed and configured along with Kibana.

The documents illustrate package-based installations of these components. The user can also install them from binary tarballs, however, this is not preferred or supported under the Wazuh documentation.

.. note::

    Upgrading directly to 7.x from 6.6 or earlier requires a `full cluster restart <https://www.elastic.co/guide/en/elasticsearch/reference/current/restart-upgrade.html>`_

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
