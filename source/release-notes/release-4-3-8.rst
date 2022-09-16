.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.3.8 has been released. Check out our release notes to discover the changes and additions of this release.

4.3.8 Release notes - 19 September 2022
=======================================

This section lists the changes in version 4.3.8. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements as the following:

Wazuh agent
^^^^^^^^^^^

- `#14842 <https://github.com/wazuh/wazuh/pull/14842>`_ Updated the WPK upgrade root CA certificate.


Resolved issues
---------------

This release resolves known issues as the following: 

Wazuh manager
^^^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14752 <https://github.com/wazuh/wazuh/pull/14752>`_             A wrong field assignation in Audit decoders is now fixed.
`#14825 <https://github.com/wazuh/wazuh/pull/14825>`_             A performance problem related to the synchronization of files through the cluster is fixed. Avoiding ``wazuh-remoted`` from cleaning the multigroup folder in worker nodes.
`#14772 <https://github.com/wazuh/wazuh/pull/14772>`_             The rule skipped in ``wazuh-analysisd`` when the option ``if_sid`` is invalid is fixed.
==============================================================    =============

Wazuh agent
^^^^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#14801 <https://github.com/wazuh/wazuh/pull/14801>`_             A path traversal flaw in Active Response affecting agents from v3.6.1 to v4.3.7 is fixed. Thanks to Roshan Guragain for reporting this vulnerability.
==============================================================    =============

Packages
^^^^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#1798 <https://github.com/wazuh/wazuh-packages/pull/1798>`__     Improved error management and IP values extraction function in the ``wazuh-certs-tool.sh``.
`#1806 <https://github.com/wazuh/wazuh-packages/pull/1806>`__     An error while changing the password in the Wazuh dashboard configuration using ``wazuh-dashboard`` is now fixed.
==============================================================    =============

Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.3.8/CHANGELOG.md>`_
- `wazuh/wazuh-dashboard <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.8-1.2.0/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.10.2 <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.8-7.10.2/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app 7.17.x <https://github.com/wazuh/wazuh-kibana-app/blob/v4.3.8-7.17.5/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/v4.3.8-8.2.6/CHANGELOG.md>`_
- `wazuh/wazuh-packages <https://github.com/wazuh/wazuh-packages/releases/tag/v4.3.8>`_
