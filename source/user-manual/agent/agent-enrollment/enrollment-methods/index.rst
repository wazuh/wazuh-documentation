.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section describes the two methods available for enrolling Wazuh agents. Learn more in this section of the documentation.

Enrollment methods
==================

This section describes the two methods available for enrolling Wazuh agents. It guides in configuring the necessary settings to ensure a successful connection of the Wazuh agent to the Wazuh server.

-  :doc:`Enrollment via agent configuration <via-agent-configuration/index>`: Once the IP address or FQDN (Fully Qualified Domain Name) of the Wazuh server has been set, the Wazuh agent can request the client key and import it automatically. This is the recommended enrollment method.
-  :doc:`Enrollment via Wazuh server API <via-manager-API/index>`: The user requests the client key from the Wazuh server API and then manually imports it to the Wazuh agent.

.. toctree::
   :hidden:
   :maxdepth: 1

   via-agent-configuration/index
   via-manager-API/index
