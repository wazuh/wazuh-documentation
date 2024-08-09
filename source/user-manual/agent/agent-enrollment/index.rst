.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh agent enrollment is the process of registering a Wazuh agent to a Wazuh manager. Learn more in this section of the documentation.

Wazuh agent enrollment
======================

Wazuh agent enrollment is the process of registering a Wazuh agent to a Wazuh manager. This enrollment allows the Wazuh agents to communicate securely with the Wazuh manager and become authorized members of the Wazuh security platform.

The Wazuh agent enrollment process allows:

-  The Wazuh manager to enroll Wazuh agents and generate unique client keys for them.
-  The use of the client key to encrypt communication between the Wazuh agent and the Wazuh manager.
-  The validation of the identity of the Wazuh agents communicating with the Wazuh manager.
-  The Wazuh agent to collect security information from the monitored endpoint and send it to the Wazuh manager for analysis.

.. note::

   When following our :ref:`installation guide <installing_the_wazuh_agent>`, we recommend you use environment variables to configure the Wazuh agent automatically. This allows the Wazuh agent to enroll and connect to the Wazuh manager.

Learn about the different enrollment options and additional information needed for Wazuh agent enrollment in the sections below.

.. toctree::
   :maxdepth: 1

   requirements
   agent-life-cycle
   enrollment-methods/index
   security-options/index
   deployment-variables/index
   troubleshooting
