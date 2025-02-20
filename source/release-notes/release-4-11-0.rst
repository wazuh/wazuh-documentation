.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.11.0 has been released. Check out our release notes to discover the changes and additions of this release.

4.11.0 Release notes - TBD
==========================

This section lists the changes in version 4.11.0. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

Highlights
----------

The 4.11 release introduces significant improvements in vulnerability detection, system inventory accuracy, and virtual machine base OS updates. The focus is on enhancing security insights, ensuring up-to-date system compatibility, and improving detection mechanisms for installed software. Key updates include the enhancement of the vulnerability detection process for CNA (CVE Numbering Authority), updates to AMI and OVA base operating systems, and improvements to Syscollector's software detection capabilities.

Key features include the following:

-  `Vulnerability detection CNA enhancement <https://github.com/wazuh/wazuh/issues/26098>`__: The vulnerability scanner now prioritizes CISA-sourced vulnerability data over the NVD, ensuring more accurate and detailed vulnerability assessments. This enhancement reduces false positives and improves alignment with official security sources.
-  `AMI and OVA base OS update <https://github.com/wazuh/wazuh-virtual-machines/issues/146>`__: The base OS for AMI and OVA has been updated to Amazon Linux 2023 (AL2023) due to security vulnerabilities in Amazon Linux 2 (AL2) and its approaching end of life.
-  `Syscollector's software detection improvement <https://github.com/wazuh/wazuh/issues/26079>`__: Syscollector now provides enhanced detection of installed software. Improvements include better package identification in macOS, expanded detection of pip and npm installations, and integration with Windows WMI to capture system updates more accurately.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#27771 <https://github.com/wazuh/wazuh/pull/27771>`__ Improved delimiters on XML.
-  `#27893 <https://github.com/wazuh/wazuh/pull/27893>`__ Improved FIM decoder.
-  `#27835 <https://github.com/wazuh/wazuh/pull/27835>`__ Improved SCA and Syscheck decoders.
-  `#27914 <https://github.com/wazuh/wazuh/pull/27914>`__ Improved CISCAT decoder detection messages.
-  `#27692 <https://github.com/wazuh/wazuh/pull/27692>`__ Added CISA vulnerability content and prioritized it over NVD in the vulnerability scanner.
-  `#28195 <https://github.com/wazuh/wazuh/pull/28195>`__ Changed ``ms-graph`` page size.

Wazuh agent
^^^^^^^^^^^

-  `#26706 <https://github.com/wazuh/wazuh/pull/26706>`__ Improved Syscollector hotfix coverage on Windows by integrating WMI and WUA APIs.
-  `#26782 <https://github.com/wazuh/wazuh/pull/26782>`__ Extended Syscollector capabilities to detect installed .pkg packages.
-  `#26236 <https://github.com/wazuh/wazuh/pull/26236>`__ Updated standard Python and NPM package location in Syscollector to align with common installation paths.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7193 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7193>`__ Refined the layout of the agent details view.
-  `#7195 <https://github.com/wazuh/wazuh-dashboard-plugins/issues/7195>`__ Changed the width of the command column, relocate argvs column and change the width of the rest of the columns in the table processes.
-  `#7245 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7245>`__ Removed unused ``node_build`` field in the package manifest of the ``wazuh`` plugin.  

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#26132 <https://github.com/wazuh/wazuh/pull/26132>`__ Enabled inventory synchronization in Vulnerability Detector when the Indexer module is disabled.

Wazuh agent
^^^^^^^^^^^

-  `#27739 <https://github.com/wazuh/wazuh/pull/27739>`__ Fixed error in event processing on AWS Custom Logs Buckets module.  

RESTful API
^^^^^^^^^^^

-  `#26255 <https://github.com/wazuh/wazuh/pull/26255>`__ Added the ``security:revoke`` action to the ``PUT /security/user/revoke`` endpoint.

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#7251 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7251>`__ Fixed documentation URL related to the usage of the authentication password in agent deployment.
-  `#7255 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7255>`__ Fixed a problem with duplicated requests to get the list of valid index patterns in the menu.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/v4.11.0/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.11.0/CHANGELOG.md>`__

-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.11.0/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.11.0/CHANGELOG.md>`__
