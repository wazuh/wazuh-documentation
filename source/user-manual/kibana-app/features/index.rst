.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_features:

Features
========

The Wazuh Kibana plugin supplies the view of the Wazuh cluster, Wazuh agents and generated alerts. It provides an elegant, easy-to-use UI to interact with the Wazuh manager through the Wazuh API, showing the relevant information in a convenient way. This section shows how to use the plugin through its different features.

#. `Reporting`_
#. `Index pattern selector`_
#. `Download as CSV`_

Reporting
---------

Under the *Overview* and the *Agents* tabs is an opiton for generating a report of the current section by clicking on the printer icon button, on the top right corner in the interface. The reports are stored on the same machine where Kibana is installed, in the ``/usr/share/kibana/optimize/wazuh/downloads/reports`` folder. A status message will indicate if the report was generated successfully, or if the process was aborted:

.. thumbnail:: ../../../images/kibana-app/features/reporting/wazuh-kibana-reports-generation.png
  :align: center
  :width: 100%

The list of the generated reports is available on *Management > Reporting*, from where they can be downloaded or deleted. The reports are generated in PDF format and downloaded to a user's computer:

.. thumbnail:: ../../../images/kibana-app/features/reporting/wazuh-kibana-reports.png
  :align: center
  :width: 100%

.. _kibana_index_pattern:

Index pattern selector
----------------------

The Wazuh Kibana plugin allows creating custom index patterns on Kibana and, if they are compatible, selecting them in the plugin to run search and analytics against.

Managing an existing index patterns as well as creating a custom index patterns can be done on the *Management > Index Patterns* page on the Kibana interface.
For a new index patterns, to properly order the alerts by creation date, the ``Time Filter field name`` has to be set to ``timestamp``:

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/wazuh-kibana-index-patterns.png
  :align: center
  :width: 100%

The index pattern selector is available on the top menu bar and is enabled only if there are more than one compatible index patterns:

.. thumbnail:: ../../../images/kibana-app/features/index-pattern/wazuh-kibana-index-pattern-selector.png
  :align: center
  :width: 100%

.. _kibana_download_csv:

Download as CSV
---------------

The content of Wazuh tables can be downloaded in CSV format by clicking the Formatted button on the bottom right corner of each table. The file will be downloaded to the user's computer:

.. thumbnail:: ../../../images/kibana-app/features/download-csv/download-csv.png
  :align: center
  :width: 100%
