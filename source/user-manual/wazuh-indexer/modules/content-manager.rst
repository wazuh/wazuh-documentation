.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Content Manager module manages detection content used by Wazuh. Find more information in this section of the documentation.

Content Manager module
======================

The Content Manager module manages detection content used by Wazuh. It synchronizes threat intelligence content from the Wazuh Cyber Threat Intelligence (CTI) service, manages user-created content, and deploys content to the Wazuh manager and Security Analytics module.

The module is installed as part of the Wazuh indexer and exposes a REST API under ``/_plugins/_content_manager/``.

The Content Manager module:

-  Synchronizes content from the Wazuh Cyber Threat Intelligence (CTI) service.
-  Manages Sigma rules, decoders, integrations, KVDBs, and security policies.
-  Validates content before deployment.
-  Promotes content between development stages.
-  Synchronizes Security Analytics detectors and rules.
-  Runs logtest validations.
-  Loads content into the Wazuh indexer.

Content spaces
--------------

The Content Manager module organizes content into four spaces that support content development and promotion workflows.

+----------+-----------------------------------------------------------+
| Space    | Description                                               |
+==========+===========================================================+
| Standard | Official content synchronized from the Wazuh CTI service. |
+----------+-----------------------------------------------------------+
| Draft    | Working area for newly created or modified content.       |
+----------+-----------------------------------------------------------+
| Test     | Validation area used before production deployment.        |
+----------+-----------------------------------------------------------+
| Custom   | Production-ready user content.                            |
+----------+-----------------------------------------------------------+

User-generated (custom) content is promoted through the *Draft* -> *Test* -> *Custom* spaces as illustrated in the diagram below:

.. thumbnail:: /images/manual/wazuh-indexer/content-spaces-promotion-diagram.png
   :title: Content spaces promotion diagram
   :alt: Content spaces promotion diagram
   :align: center
   :width: 80%

This workflow allows content to be validated before it is deployed to production environments.

CTI synchronization
-------------------

The Content Manager module automatically synchronizes content from the Wazuh CTI service. The synchronization process downloads and updates the following:

-  Rules
-  Decoders
-  Integrations
-  KVDBs
-  Policies

By default, synchronization runs every 60 minutes.

When new content becomes available, The Content Manager module updates the local content repository and automatically synchronizes related Security Analytics resources.

Security Analytics integration
------------------------------

The Content Manager module automatically synchronizes Security Analytics resources created from the Wazuh CTI content. This includes:

-  Sigma rules
-  Security Analytics detectors
-  Security Analytics integrations

When CTI content changes, Content Manager updates the corresponding Security Analytics resources automatically.

.. note::

   Security Analytics detectors support a maximum of 100 Sigma rules per detector. Detector creation or updates that exceed this limit are rejected.

Content management
------------------

The Content Manager module also provides APIs for creating, updating, and deleting the following resources:

-  Rules
-  Decoders
-  Integrations
-  KVDBs
-  Policies

User-created content is stored in the Draft space and can be promoted through the standard content workflow.

Content validation
^^^^^^^^^^^^^^^^^^

Before content is promoted, the Content Manager module validates the configuration against the Wazuh manager. Validation helps identify:

-  Syntax errors
-  Invalid references
-  Configuration inconsistencies

Content that fails validation cannot be promoted.

Log test
^^^^^^^^

The Content Manager module provides log test capabilities through the Wazuh indexer. Logtest allows you to:

-  Validate decoder behavior.
-  Verify rule matching.
-  Test event processing before deployment.

Content promotion
-----------------

Content promotion is the process of moving content between spaces. Before promotion, the Content Manager generates a preview of the proposed changes. The preview identifies:

-  New resources
-  Updated resources
-  Deleted resources

After validation succeeds, Content Manager applies the changes to the target space and synchronizes any affected Security Analytics resources.

Promotion workflow
^^^^^^^^^^^^^^^^^^

.. thumbnail:: /images/manual/wazuh-indexer/content-promotion-workflow.png
   :title: Content promotion workflow
   :alt: Content promotion workflow
   :align: center
   :width: 80%

Rollback protection
^^^^^^^^^^^^^^^^^^^

The Content Manager module automatically protects promotions from partial failures. If an error occurs during promotion, previously applied changes are reverted, and the original content state is restored. This prevents incomplete promotions from leaving content in an inconsistent state.

Update notifications
--------------------

Content Manager periodically checks for available content updates from the Wazuh CTI service. When newer content becomes available, the Wazuh dashboard displays update notifications to administrators.

This functionality is enabled by default, and you can configure it through the Wazuh indexer settings.

REST API
--------

The Content Manager API is available under ``/_plugins/_content_manager/`` on the Wazuh indexer. The API supports:

-  Subscription management
-  Content synchronization
-  Content management operations
-  Policy management
-  Promotion workflows
-  Logtest execution
-  Content validation

For a complete list of endpoints, see the :doc:`Wazuh indexer API reference </user-manual/indexer-api/reference>` documentation.
