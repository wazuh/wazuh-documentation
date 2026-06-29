.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Content management defines how Wazuh handles the rules, decoders, integrations, KVDBs, and IOCs used in the data analysis pipeline. Learn more in this section.

.. _data_analysis_content_management:

Content management
==================

Content management refers to how Wazuh handles detection content used throughout the data analysis pipeline. The content manager is a Wazuh indexer plugin that manages rules, decoders, integrations, KVDBs, and Indicators of Compromise.

It synchronizes content from the Wazuh Cyber Threat Intelligence (CTI) API, provides APIs for managing custom content, and communicates with the Wazuh manager to synchronize changes. In Wazuh 5.0, where normalization runs on the Wazuh manager and detection runs on the Wazuh indexer, the content manager ensures detection content remains consistent across both layers. It also includes an update mechanism that periodically checks the CTI Update API for new content and Wazuh releases.
