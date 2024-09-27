.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh 4.9.1 has been released. Check out our release notes to discover the changes and additions of this release.

4.9.1 Release notes - TBD
=========================

This section lists the changes in version 4.9.1. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#24110 <https://github.com/wazuh/wazuh/issues/24110>`__ Improved provisioning method for *wazuh-keystore* to enhance security.

Wazuh agent
^^^^^^^^^^^

-  `#25652 <https://github.com/wazuh/wazuh/issues/25652>`__ Added support for macOS 15 "Sequoia" in Wazuh Agent.

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
-  `#7023 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7023>`__ Removed the PDF report footer year.

Packages
^^^^^^^^

-  `#3111 <https://github.com/wazuh/wazuh-packages/pull/3111>`__ Added offline installation assistant import for the downloaded GPG Wazuh key.
-  `#3098 <https://github.com/wazuh/wazuh-packages/pull/3098>`__ Changed version to tag reference in ``source_branch`` references.
-  `#3118 <https://github.com/wazuh/wazuh-packages/pull/3118>`__ Changed Filebeat passwords only when installing Wazuh Server or changing passwords.
-  `#3119 <https://github.com/wazuh/wazuh-packages/pull/3119>`__ Updated ``SECURITY.md`` format.
-  `#3121 <https://github.com/wazuh/wazuh-packages/pull/3121>`__ Added stage parameter in ``bump_version`` script.

Resolved issues
---------------

This release resolves known issues as the following:

Wazuh manager
^^^^^^^^^^^^^

-  `#24909 <https://github.com/wazuh/wazuh/pull/24909>`__ Fixed vulnerability detector issue where RPM upgrade wouldn't download new content.
-  `#25667 <https://github.com/wazuh/wazuh/pull/25667>`__ Fixed uncaught exception at Keystore test tool.
-  `#25705 <https://github.com/wazuh/wazuh/pull/25705>`__ Replaced ``eval`` calls with ``ast.literal_eval``.

Wazuh agent
^^^^^^^^^^^

-  `#24910 <https://github.com/wazuh/wazuh/pull/24910>`__ Fixed agent crash on Windows version 4.8.0.
-  `#25209 <https://github.com/wazuh/wazuh/pull/25209>`__ Fixed data race conditions at FIM's ``run_check``.
-  `#24376 <https://github.com/wazuh/wazuh/issues/24376>`__ Fixed Windows agent crashes related to ``syscollector.dll``.
-  `#25445 <https://github.com/wazuh/wazuh/pull/25445>`__ Fixed errors related to the ``libatomic.a`` library on AIX 7.X.
-  `#24932 <https://github.com/wazuh/wazuh/pull/24932>`__ Fixed errors in Windows Agent where ``EvtFormatMessage`` returned errors 15027 and 15033.
-  `#25459 <https://github.com/wazuh/wazuh/pull/25459>`__ Fixed FIM issue where it couldn't fetch group entries longer than 1024 bytes.
-  `#25469 <https://github.com/wazuh/wazuh/pull/25469>`__ Fixed Wazuh Agent crash at ``syscollector``.
-  `#23528 <https://github.com/wazuh/wazuh/pull/23528>`__ Fixed a bug in the processed dates in the AWS module related to the AWS Config type.
-  `#24694 <https://github.com/wazuh/wazuh/pull/24694>`__ Fixed an error in Custom Logs Buckets when parsing a CSV file that exceeds a certain size.

RESTful API
^^^^^^^^^^^

-  `#25764 <https://github.com/wazuh/wazuh/pull/25764>`__ Fixed requests logging to obtain the ``hash_auth_context`` from JWT tokens.
-  `#25216 <https://github.com/wazuh/wazuh/pull/25216>`__ Enabled API to listen to both IPv4 and IPv6 stacks.

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
-  `#7019 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7019>`__ Fixed the **Open report** button on the toast and the **Download report** icon in the reporting table in Safari.
-  `#7015 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7015>`__ Fixed style issue when unpinning an agent in the endpoint summary section.
-  `#7021 <https://github.com/wazuh/wazuh-dashboard-plugins/pull/7021>`__ Fixed overflow style on a long value filter.

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
