.. Copyright (C) 2020 Wazuh, Inc.

FIM synchronization algorithm
=============================

.. versionadded:: 3.12.0

Since Wazuh 3.12, the FIM module in the agents is responsible for storing and reporting changes produced in the monitored files, a task previously done by the manager. This assures accuracy in the alerts, regardless of the status of the agent in relation to the manager (e.g. disconnections, changes between cluster nodes).

Regardless of this change engine, the synchronization mechanism ensures the file inventory in the manager is always updated with respect to the agent. Being this inventory consultable from the web interface. This mechanism is based on periodic calculations of integrity between the agent and manager databases, updating in the manager only those files that are outdated, optimizing the data transfer of FIM.

FIM synchronization can be configured in the ``ossec.conf`` as explained :ref:`here <how_to_fim_synchronization>`.
