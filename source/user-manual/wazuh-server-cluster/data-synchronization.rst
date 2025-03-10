.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Having information synchronized allows any Wazuh server cluster nodes to process and raise alerts from the Wazuh agents properly. Learn more in this section of the documentation.

Data synchronization
====================

The Wazuh server processes events from the Wazuh agents, external APIs, and network devices, raising alerts for threats and anomalies detected. Hence, all required information to receive events from the agents needs to be synchronized. This information is:

-  The Wazuh agents' keys, so the Wazuh server nodes can accept incoming connections from agents.
-  The Wazuh agents' shared configuration so the Wazuh server nodes can send the agents their configuration.
-  The Wazuh agents' groups assignments, so every Wazuh server node knows which configuration to send to the agents.
-  The custom decoders, rules, SCA policies and CDB lists so the Wazuh server nodes can correctly process events from the agents.
-  The Wazuh agents' last keep alive and OS information, which is received once the agents connect to a Wazuh server node and it's necessary to know whether an agent is reporting or not.

Having all this information synchronized allows any Wazuh server cluster nodes to process and raise alerts from the Wazuh agents properly. Data synchronization makes it possible to horizontally scale a Wazuh environment when new Wazuh agents are added.
