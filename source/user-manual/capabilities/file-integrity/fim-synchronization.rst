.. Copyright (C) 2020 Wazuh, Inc.

FIM synchronization algorithm
=============================

.. versionadded:: 3.12.0

Since Wazuh version 3.12, the FIM module in the Wazuh agents is responsible for storing and reporting changes produced in the monitored files, previously the agent would only collect the information and send it to the manager. This change ensures accuracy in the alerts, regardless of the status of the agent in relation to the manager (e.g. disconnections, agents switching between cluster nodes, etc).

Regardless of this architectural change, the synchronization mechanism ensures that the file inventory in the manager is always updated with respect to the agent. Thus allowing the query of this inventory from the web interface. The synchronization mechanism is based on periodic calculations of integrity between the agent and manager databases, updating in the manager only those files that are outdated and in consequence optimizing the data transfer of FIM.

FIM synchronization can be configured in the ``ossec.conf`` as explained :ref:`here <how_to_fim_synchronization>`.
