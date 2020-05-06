.. Copyright (C) 2019 Wazuh, Inc.

.. _kibana_management:

Management
^^^^^^^^^^

Configuration
-------------

Cluster
-------

Groups
------

Logs
----

.. _kibana_reporting:

Reporting
---------

Under the *Overview* and the *Agents* tabs is an opiton for generating a report of the current section by clicking on the printer icon button, on the top right corner in the interface. The reports are stored on the same machine where Kibana is installed, in the ``/usr/share/kibana/optimize/wazuh/downloads/reports`` folder. A status message will indicate if the report was generated successfully, or if the process was aborted:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-reports-generation.png
  :align: center
  :width: 100%

This section contains the list of user generated reports in the PDF format. The reports can be downloaded to a user's computer or deleted:

.. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-reports.png
  :align: center
  :width: 100%

.. _kibana_ruleset:

Ruleset
-------

The :ref:`ruleset <ruleset>` is a key part of Wazuh. It's used by the Wazuh manager to detect attacks, intrusions, software misuse, configuration problems, application errors, malware, rootkits, system anomalies or security policy violations.

Ruleset section in the Wazuh Kibana plugin is available under *Management > Ruleset* option. The section is divided into three parts: :ref:`Rules <rules_syntax>`, :ref:`Decoders <decoders_syntax>`, and :ref:`Lists <ruleset_cdb-list>`:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-rules.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-decoders.png
    :align: center
    :width: 100%

 .. group-tab:: Lists

  .. thumbnail:: ../../images/kibana-app/sections/management/wazuh-kibana-lists.png
    :align: center
    :width: 100%

A special search syntax can be used on the bar for filtering rules and decoders, similar to the ``Lucene`` syntax used in Kibana. For example, typing ``group: audit``, creates a filter pill under the search bar. The ``X`` icon removes the filter:

.. thumbnail:: ../../images/kibana-app/features/ruleset/wazuh-kibana-ruleset-filter.png
  :align: center
  :width: 100%

Clicking on a specific rule or a decoder opens a detail view with the complete information and the table listing related rules or decoders that are defined on the same file:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../images/kibana-app/features/ruleset/wazuh-kibana-rule-details.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../images/kibana-app/features/ruleset/wazuh-kibana-decoder-details.png
    :align: center
    :width: 100%


``Custom rules`` and ``custom decoders`` slide buttons open a sections where the :ref:`custom ruleset <ruleset_custom>` is managed. All the changes to the saved custom ruleset require activating them on the Wazuh manager by clicking ``Restart now`` button:

.. tabs::

 .. group-tab:: Rules

  .. thumbnail:: ../../images/kibana-app/features/ruleset/wazuh-kibana-custom-rules.png
    :align: center
    :width: 100%

 .. group-tab:: Decoders

  .. thumbnail:: ../../images/kibana-app/features/ruleset/wazuh-kibana-custom-decoders.png
    :align: center
    :width: 100%


Status
------
