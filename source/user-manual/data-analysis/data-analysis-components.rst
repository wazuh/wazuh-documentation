.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh provides security analytics through two data analysis components: the normalization engine and the detection engine. Learn more in this section.

.. _data_analysis_components:

Data analysis components
========================

Security analytics involves collecting, aggregating, and analyzing digital data across an IT environment to detect, investigate, and mitigate cyber threats. Wazuh provides security analytics through its two data analysis components: the normalization engine and the detection engine. In Wazuh, the normalization engine prepares and enriches incoming events, and the detection engine evaluates those normalized events to identify threats and suspicious activity.

Wazuh security analytics policies are managed through the Security Analytics dashboard. This centralized interface allows users to configure and operate all elements of the data analysis workflow. From the dashboard, users can create and manage decoders, KVDBs, detectors, and detection rules that define how events are parsed, enriched, correlated, and analyzed.

The following sections describe the main components of the Wazuh Security Analytics dashboard and explain their roles in the data analysis workflow.

.. topic:: Contents

   .. toctree::
      :maxdepth: 1

      content-management
      space
      integration
      events
      filters
      decoders
      key-value-databases
      enrichment
      rules
      detectors
      findings
