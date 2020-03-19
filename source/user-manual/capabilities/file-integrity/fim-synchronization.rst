.. Copyright (C) 2020 Wazuh, Inc.

FIM synchronization algorithm
=============================

.. versionadded:: 3.12.0

Since Wazuh 3.12, the FIM module in the agents is responsible of storing and reporting changes produced in the monitored
files, task previously done by the manager. This assures accuracy in the alerts, regardless of the status of the agent
in relation to the manager (e.g. disconnections, changes between cluster nodes).

Regardless of this change engine, the synchronization mechanism ensures the file inventory in the manager is always
updated with respect to the agent. Being this inventory consultable from the web interface. This mechanism is based in
periodic calculations of integrity between the agent and manager databases, updating in the manager only those files
that are outdated, optimizing the data transfer of FIM.

Configuration options
^^^^^^^^^^^^^^^^^^^^^
FIM synchronization has these configuration options to change the synchronization interval, the number of events per
second, ...:

.. code-block:: xml

    <!-- Database synchronization settings -->
    <synchronization>
      <enabled>yes</enabled>
      <interval>5m</interval>
      <max_interval>1h</max_interval>
      <response_timeout>30</response_timeout>
      <sync_queue_size>16384</sync_queue_size>
      <max_eps>10</max_eps>
    </synchronization>
