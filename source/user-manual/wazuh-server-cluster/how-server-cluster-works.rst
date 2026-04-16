.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server cluster follows a master-worker architecture. Learn how the Wazuh server cluster works in this section of the documentation.

How the Wazuh server cluster works
==================================

The Wazuh server cluster is managed by the ``wazuh-clusterd`` daemon, which communicates with all the Wazuh server nodes following a master-worker architecture. Refer to the section for more information about its use. For more information, see the :doc:`Daemons </user-manual/reference/daemons/index>` section.

The image below shows the communications between a worker and a master node. Each worker-master communication is independent of the others since workers are the ones who start the communication with the master. If a worker's connection is interrupted or a worker node becomes unavailable, it does not affect the connectivity or synchronization of other workers in the cluster.

.. thumbnail:: /images/manual/wazuh-server/server-cluster-diagram.png
   :title: Wazuh server cluster diagram
   :alt: Wazuh server cluster diagram
   :align: center
   :width: 80%

There are different independent threads running, and each one is framed in the image:

-  **Keep-alive thread:** Responsible for sending keep-alive messages to the master in frequent intervals. It is necessary to keep the connection open between master and worker nodes, since the cluster uses permanent connections.
-  **Agent info thread:** Responsible for sending OS information, labels configured, and the :ref:`status of the Wazuh agents <agent-status-cycle>` that are reporting to that node. The master also checks whether the agent exists or not before saving its status update. This is done to prevent the master from storing unnecessary information. For example, this situation is very common when an agent is removed, but the master hasn't notified the worker nodes yet.
-  **Agent groups send thread:** Responsible for sending information of Wazuh agent group assignments to worker nodes. This information is calculated in the master when an agent connects for the first time.
-  **Local agent-groups thread:** This thread runs on the master node and retrieves updated agent-groups information from the database at regular intervals. The data is cached so that it does not need to be requested separately for each worker connection before being synchronized with worker nodes.
-  **Integrity thread:** Responsible for synchronizing files in the Wazuh server cluster, from the master node to the worker nodes. These files include the Wazuh agent keys file, :doc:`user defined rules, decoders </user-manual/ruleset/index>`, :doc:`custom SCA policies </user-manual/capabilities/sec-config-assessment/creating-custom-policies>`, :doc:`CDB lists </user-manual/ruleset/cdb-list>` and :doc:`group files </user-manual/agent/agent-management/grouping-agents>`.
-  **Local integrity thread:** This thread runs on the master node and periodically calculates file integrity using the MD5 checksum and modification time. The results are cached to avoid recalculating integrity data for each worker connection.

All cluster logs are written in the ``/var/ossec/logs/cluster.log`` file of a default Wazuh installation.

