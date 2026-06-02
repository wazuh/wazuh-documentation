.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section describes the two methods available for enrolling Wazuh agents. Learn more in this section of the documentation.

Enrollment methods
==================

Wazuh supports two methods for enrolling Wazuh agents. Both methods configure the Wazuh agent to request or receive a client key and use it to connect to the Wazuh manager.

#. :doc:`Enrollment through agent configuration <via-agent-configuration/index>`: Configure the IP address or fully qualified domain name (FQDN) of the Wazuh manager on the Wazuh agent. The Wazuh agent requests the client key from the Wazuh manager and imports it automatically. This is the recommended enrollment method.

#. :doc:`Enrollment through the Wazuh manager API <via-manager-API/index>`: Request the client key from the Wazuh manager API and import it manually on the Wazuh agent.

.. toctree::
   :hidden:
   :maxdepth: 1

   via-agent-configuration/index
   via-manager-API/index
