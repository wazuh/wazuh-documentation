.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server cluster follows a master-worker architecture. Learn how the Wazuh server cluster works in this section of the documentation.

How the Wazuh server cluster works
==================================

The Wazuh server cluster is managed by the ``wazuh-clusterd`` daemon which communicates with all the nodes following a master-worker architecture. Refer to the :doc:`Daemons </user-manual/reference/daemons/clusterd>` section for more information about its use.

The image below shows the communications between a worker and a master node. Each worker-master communication is independent of each other since workers are the ones who start the communication with the master.

There are different independent threads running and each one is framed in the image:

-  **Keep alive thread**: Responsible for sending keep alive messages to the master in frequent intervals. It is necessary to keep the connection opened between master and worker nodes, since the cluster uses permanent connections.
-  **Agent info thread**: Responsible for sending OS information, labels configured, and the :ref:`status of the Wazuh agents <agent-status-cycle>` that are reporting to that node. The master also checks whether the agent exists or not before saving its status update. This is done to prevent the master from storing unnecessary information. For example, this situation is very common when an agent is removed but the master hasn't notified worker nodes yet.
-  **Agent groups send thread**: Responsible for sending information of agent groups assignment to  worker nodes. The information is calculated in the master when an agent connects for the first time.
-  **Local agent-groups thread**: Responsible for reading all new agent groups information in the master. The master node needs to get agent-groups information from the database before sending it to all the worker nodes. To avoid requesting it once per each worker connection, the information is obtained and stored in a different thread called *Local agent-groups thread*, in the master node at intervals.
-  **Integrity thread**: Responsible for synchronizing files in the Wazuh server cluster, from the master node to the worker nodes. These files include the Wazuh agent keys file, :doc:`user defined rules, decoders </user-manual/ruleset/index>`, :doc:`custom SCA policies </user-manual/capabilities/sec-config-assessment/creating-custom-policies>`, :doc:`CDB lists </user-manual/ruleset/cdb-list>` and :doc:`group files </user-manual/agent/agent-management/grouping-agents>`.
-  **Local integrity thread**: Responsible for calculating the integrity of each file using its MD5 checksum and its modification time. To avoid calculating the integrity with each worker node connection, the integrity is calculated in a different thread, called the *File integrity thread*, in the master node at intervals.

All cluster logs are written in the ``/var/ossec/logs/cluster.log`` file of a default Wazuh installation.

.. thumbnail:: /images/manual/wazuh-server/server-cluster-diagram.png
   :title: Wazuh server cluster diagram
   :alt: Wazuh server cluster diagram
   :align: center
   :width: 80%

