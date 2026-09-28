.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Synchronized information allows any Wazuh server cluster node to process and raise alerts from the Wazuh agents properly.

Data synchronization
====================

The Wazuh server processes events from Wazuh agents, external APIs, and network devices, and raises alerts for threats and anomalies detected. Hence, all the required information to receive events from the Wazuh agents needs to be synchronized. This information is:

-  The Wazuh agents' keys, so the Wazuh server nodes can accept incoming connections from the Wazuh agents.
-  The Wazuh agents' shared configuration so that the Wazuh server nodes can send their configuration to the Wazuh agents.
-  The Wazuh agents' group assignments, so every Wazuh server node knows which configuration to send to the Wazuh agents.
-  The custom decoders, rules, SCA policies, and CDB lists allow the Wazuh server nodes to correctly process events from the Wazuh agents.
-  The Wazuh agents' last keep-alive and OS information, received when the Wazuh agent connects to a Wazuh server node, is necessary to determine whether an agent is reporting.

Synchronizing this information enables any Wazuh server cluster node to properly process events and generate alerts from Wazuh agents. It also allows a Wazuh environment to scale horizontally as new Wazuh agents are added.
