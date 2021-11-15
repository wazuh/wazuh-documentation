.. meta::
      :description: Wazuh 4.2.5 has been released. Check out our release notes to discover the changes and additions of this release.

.. _release_4_2_5:

4.2.5 Release notes
===================

This section lists the changes in version 4.2.5. Every update of the Wazuh solution is cumulative and includes all enhancements and fixes from previous releases.

What's new
----------

This release includes new features or enhancements.

Manager
^^^^^^^

- `#10809 <https://github.com/wazuh/wazuh/pull/10809>`_ Active response requests for agents between versions 4.2.0 and 4.2.4 is now sanitized to prevent unauthorized code execution.


Resolved issues
---------------

This release resolves known issues. 

Agent
^^^^^

==============================================================    =============
Reference                                                         Description
==============================================================    =============
`#10809 <https://github.com/wazuh/wazuh/pull/10809>`_             A bug in the Active response tools that might allow unauthorized code execution has been mitigated.
==============================================================    =============



Changelogs
----------

More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.2.5/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <nnnnn>`_
- `wazuh/wazuh-splunk <nnnn>`_