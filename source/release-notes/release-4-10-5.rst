.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.10.5 has been released. Check out our release notes to discover the changes and additions of this release.

4.10.5 Release notes - TBD
==========================

This section lists the changes in version 4.10.5. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#8576 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8576>`__ Removed the unnecessary ``axios`` plugin dependency, provided by the OpenSearch Dashboards platform.
-  `#8582 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8582>`__ Removed the unnecessary ``follow-redirects`` plugin dependency and upgraded the ``dompurify`` and ``swagger-client`` dependencies.
-  `#8978 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/8978>`__ Upgraded ``jsdom`` and its dependencies (``lodash`` to ``4.18.1``, ``form-data`` to ``3.0.5``).

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#36243 <https://github.com/wazuh/wazuh/issues/36243>`__ Hardened RSA decryption to reject malformed ciphertext blobs.
-  `#38375 <https://github.com/wazuh/wazuh/pull/38375>`__ Improved cluster merged file parameter validation to prevent directory escape.
-  `#38376 <https://github.com/wazuh/wazuh/pull/38376>`__ Improved ``tmp_file`` path validation in cluster DAPI.
-  `#38377 <https://github.com/wazuh/wazuh/pull/38377>`__ Improved cluster non-merged file path validation during worker file processing.
-  `#38378 <https://github.com/wazuh/wazuh/pull/38378>`__ Improved cluster worker file path validation.
-  `#38379 <https://github.com/wazuh/wazuh/pull/38379>`__ Improved destination path validation when uploading CDB list, rule, and decoder files.
-  `#38380 <https://github.com/wazuh/wazuh/pull/38380>`__ Improved cluster master validation of the files received from worker nodes.
-  `#38381 <https://github.com/wazuh/wazuh/pull/38381>`__ Fixed a remote-command configuration validation bypass where upper- or mixed-case XML element names let ``localfile`` and ``wodle`` command blocks pass the ``remote_commands`` restriction.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.10.5/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.10.5/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.10.5/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.10.5/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.10.5/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.10.5/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.10.5/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.10.5/CHANGELOG.md>`__