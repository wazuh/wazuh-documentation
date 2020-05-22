.. _kibana_index_pattern:

Index pattern selector
----------------------

The Wazuh Kibana plugin allows creating custom index patterns on Kibana and, if they are compatible, selecting them in the plugin to run search and analytics against.

Managing an existing index patterns as well as creating a custom index patterns can be done on the *Management > Index Patterns* page on the Kibana interface.
For the new index patterns, to properly order the alerts by creation date, the ``Time Filter field name`` has to be set to ``timestamp``:

.. thumbnail:: ../../images/kibana-app/sections/index-pattern-selector/wazuh-kibana-index-patterns.png
  :align: center
  :width: 100%

The index pattern selector is available on the top menu bar and is enabled only if there is more than one compatible index pattern to choose from:

.. thumbnail:: ../../images/kibana-app/sections/index-pattern-selector/wazuh-kibana-index-pattern-selector.png
  :align: center
  :width: 100%
