.. _release_3_2_2:

3.2.2 Release Notes
===================

From the Wazuh team, we continue working hard improving the existing features as well as fixing reported bugs. This section shows the most relevant improvements and fixes of Wazuh v3.2.2. You can find more detailed information in the `changelog <https://github.com/wazuh/wazuh/blob/v3.2.2/CHANGELOG.md>`_ file.

- `Manager-agent communication`_
- `Wazuh modules`_
- `Cluster`_
- `Other relevant changes`_

Manager-agent communication
---------------------------

It has been created an input buffer in the manager side, this queue will act as a congestion control by processing all the events incoming from agents.

Between the features of this queue, it dispatches events as fast as possible avoiding any delay in the communication process, and it warns when gets full stopping to ingest more events.

In addition, the capacity of the buffer is configurable in the ``remote`` section of the :doc:`Local configuration <../user-manual/reference/ossec-conf/remote>`

Wazuh modules
-------------

Same as the previous version, the new modules as the vulnerability detector and the system inventory collector include more improvements.

For the vulnerability-detector module, it has been improved the version comparator algorithm to avoid false positive alerts. It also has been fixed the behavior when the software inventory of an agent is missing.

Apart from that, some memory issues have been solved for several modules.

Cluster
-------

The cluster communication procedure has been received some important improvements in this version, we can highlight the following:

- A synchronization timeout has been added to prevent it from an indefinitely block state.
- The cluster client protocol has been reimplemented to use permanent connections, instead of creating new connections for each request. This way, the connections between the cluster nodes will be more efficient.

Other relevant changes
----------------------

In addition to the previous points, another important changes have been included in Wazuh 3.2.2:

- The Slack integration has been updated since some used parameters were deprecated by Slack. This integration allows Wazuh to send notifications to Slack when desired alerts are triggered.
- It has been fixed the agent group file deletion when using the Auth daemon. As well as the client of the daemon for old versions of Windows.
- Fixed the filter of the output syslog daemon when filtering by rule group.
