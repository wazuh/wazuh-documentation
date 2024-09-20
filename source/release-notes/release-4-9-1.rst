.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.9.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.9.1 Release notes - TBD
=========================

This section lists the changes in version 4.9.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#6977 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6991>`__ Added feature to filter by field in the events table rows.
-  `#6981 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6981>`__ Changed the text of the query limit tooltip.
-  `#6919 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6919>`__ Upgraded the ``axios`` dependency to ``1.7.4``.
-  `#6954 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6954>`__ Improved MITRE ATT&CK intelligence flyout details readability.
-  `#6984 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6984>`__ Upgraded Event-tab column selector to show picked columns first.
-  `#6960 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6960>`__ Changed ``vulnerabilities.reference`` to links in **Vulnerability Detection** > **Inventory columns**.
-  `#6982 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6982>`__ Upgraded the ``follow-redirects`` dependency to ``1.15.6``.
-  `#6956 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6956>`__ Changed many loading spinners in some views to loading search progress.
-  `#6999 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6999>`__ Removed the XML autoformat function group configuration due to performance issues.

Packages
^^^^^^^^

-  `#3111 <https://github.com/wazuh/wazuh-packages/pull/3111>`__ Added offline installation assistant import for the downloaded GPG Wazuh key.
-  `#3098 <https://github.com/wazuh/wazuh-packages/pull/3098>`__ Changed version to tag reference in ``source_branch`` references.
-  `#3118 <https://github.com/wazuh/wazuh-packages/pull/3118>`__ Changed Filebeat passwords only when installing Wazuh Server or changing passwords.
-  `#3119 <https://github.com/wazuh/wazuh-packages/pull/3119>`__ Updated ``SECURITY.md`` format.
-  `#3121 <https://github.com/wazuh/wazuh-packages/pull/3121>`__ Added stage parameter in ``bump_version`` script.
-  `#3124 <https://github.com/wazuh/wazuh-packages/pull/3124>`__ Replaced source branch in Installation Assistant.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh dashboard
^^^^^^^^^^^^^^^

-  `#6933 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6993>`__ Fixed issue causing vulnerability dashboard to fail loading for read-only users.
-  `#6905 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6905>`__ Fixed the temporal directory variable in the command to deploy a new Windows agent.
-  `#6906 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6906>`__ Fixed an error in the command to deploy a new macOS agent that could cause the registration password to have a wrong value due to a ``\n`` inclusion.
-  `#6901 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6901>`__ Fixed rendering of an active response as disabled when it is active.
-  `#6908 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6908>`__ Fixed an error in **Dev Tools** when using payload properties as arrays.
-  `#6987 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6987>`__ Fixed font size in tables used in the events tab, the **Threat hunting** dashboard tab, and the **Vulnerabilities inventory** tab.
-  `#6983 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6983>`__ Fixed missing link to Vulnerabilities detection and Office 365 in the agent menu of **Endpoints Summary**.
-  `#6983 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6983>`__ Fixed missing options depending on agent operating system in the agent configuration report.
-  `#6989 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6989>`__ Fixed a style issue that affected the **Discover** plugin.
-  `#6995 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/6995>`__ Fixed a problem updating the API host registry in the ``GET /api/check-stored-api``.

Packages
^^^^^^^^

-  `#3110 <https://github.com/wazuh/wazuh-packages/pull/3110>`__ Fixed bug when changing the Filebeat URL in the Installation Assistant.

Changelogs
----------

The repository changelogs provide more details about the changes.

Product repositories
^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.9.1/CHANGELOG.md>`__
-  `wazuh/wazuh-dashboard-plugins <https://github.com/wazuh/wazuh-dashboard-plugins/blob/v4.9.1-2.11.0/CHANGELOG.md>`__
-  `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/blob/v4.9.1/CHANGELOG.md>`__

Auxiliary repositories
^^^^^^^^^^^^^^^^^^^^^^^

-  `wazuh/wazuh-ansible <https://github.com/wazuh/wazuh-ansible/blob/v4.9.1/CHANGELOG.md>`__
-  `wazuh/wazuh-kubernetes <https://github.com/wazuh/wazuh-kubernetes/blob/v4.9.1/CHANGELOG.md>`__
-  `wazuh/wazuh-puppet <https://github.com/wazuh/wazuh-puppet/blob/v4.9.1/CHANGELOG.md>`__
-  `wazuh/wazuh-docker <https://github.com/wazuh/wazuh-docker/blob/v4.9.1/CHANGELOG.md>`__

-  `wazuh/wazuh-qa <https://github.com/wazuh/wazuh-qa/blob/v4.9.1/CHANGELOG.md>`__
-  `wazuh/qa-integration-framework <https://github.com/wazuh/qa-integration-framework/blob/v4.9.1/CHANGELOG.md>`__

-  `wazuh/wazuh-documentation <https://github.com/wazuh/wazuh-documentation/blob/v4.9.1/CHANGELOG.md>`__
