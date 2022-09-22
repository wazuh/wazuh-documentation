.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh 4.1.4 has been released. Check out our release notes to discover the changes and additions of this release.
  
.. _release_4_1_4:

4.1.4 Release notes - 25 March 2021
===================================

This section lists the changes in version 4.1.4. More details about these changes are provided in the changelog of each component:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/v4.1.4/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/4.1-7.10/CHANGELOG.md>`_


Wazuh core
----------

Resolved issues
^^^^^^^^^^^^^^^

This release resolves known issues. 

**Cluster**

======================================================  =============
Reference                                                Description
======================================================  =============
`#8017 <https://github.com/wazuh/wazuh/pull/8017>`_     Issue with the Wazuh manager worker nodes reconnection after restarting the Wazuh master node is fixed. Workers now successfully reconnect to the master node after it is restarted. 
======================================================  =============

Wazuh Kibana plugin
-------------------

What's new
^^^^^^^^^^

This release includes new features or enhancements. 

- Wazuh Kibana plugin is now compatible with Wazuh 4.1.4.
