.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: A space is the logical storage location where Wazuh keeps its detection content. Learn about the draft, test, custom, and standard spaces in this section.

.. _data_analysis_space:

Space
=====

A space is the logical storage location where Wazuh keeps its detection content. Detection content defines how events are parsed, enriched, and evaluated. It includes decoders, KVDBs, detectors, rules, and other enrichment information. Wazuh provides four spaces: draft, test, custom, and standard. The standard space contains the official Wazuh detection content. The custom space contains the user-created detection content. This separation ensures that the Wazuh standard policy remains independent from the user-defined policy, keeping both processing pipelines isolated.

The draft, test, and custom spaces are fully user-managed, enabling the creation, validation, and deployment of custom detection content, while standard provides the default Wazuh CTI-managed content.

+--------------+------------------------------------------------------------------------+
| Space        | Description                                                            |
+==============+========================================================================+
| **Draft**    | A writable space for user-generated content where users can create,    |
|              | read, update, and delete resources.                                    |
+--------------+------------------------------------------------------------------------+
| **Test**     | Used for log test operations and content validation before final       |
|              | promotion.                                                             |
+--------------+------------------------------------------------------------------------+
| **Custom**   | The final space for user content. Content promoted to this space is    |
|              | used by the Wazuh data analysis engine to actively decode and process  |
|              | logs.                                                                  |
+--------------+------------------------------------------------------------------------+
| **Standard** | Read-only content synced from the CTI API. This is the baseline        |
|              | detection content.                                                     |
+--------------+------------------------------------------------------------------------+

.. thumbnail:: /images/manual/data-analysis/security-analytics-spaces.png
   :title: Security Analytics spaces
   :alt: Security Analytics spaces
   :align: center
   :width: 80%

.. _data_analysis_promotion_workflow:

Promotion workflow
------------------

The promotion workflow moves content through the space chain (draft → test → custom) to ensure that changes are validated before they reach production.

-  **Draft → Test**: Content is promoted to the test space for validation and functional testing using the Wazuh Log test tool. Log test validates the decoders, KVDBs, detectors, and rules defined in the test, custom, and standard spaces.

-  **Test → Custom**: After successful validation, content is promoted to the custom space, where it becomes active in production. The Wazuh data analysis engine then uses the promoted content to decode, normalize, and analyze incoming events.

During each promotion, the content manager:

-  Deploys the updated content to the Wazuh data analysis engine.

-  Validates the configuration.

-  Triggers a configuration reload.

-  Updates the target space with the promoted content.

This workflow helps teams validate changes in a controlled environment before deployment, ensuring consistent and up-to-date detection behavior across the Wazuh platform.
