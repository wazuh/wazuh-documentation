.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh agent enrollment is the process of registering a Wazuh agent to a Wazuh manager. Learn more in this section of the documentation.

Wazuh agent enrollment
======================

Wazuh agent enrollment is the process of registering a Wazuh agent with a Wazuh manager. Enrollment authorizes the Wazuh agent to communicate securely with the Wazuh manager and become part of the Wazuh security platform.

The Wazuh agent enrollment process allows the Wazuh manager to generate a unique client key for each Wazuh agent. The Wazuh agent uses the client key to encrypt communication with the Wazuh manager and validate its identity.

After enrollment, the Wazuh agent collects security information from the monitored endpoint and sends it to the Wazuh manager for analysis.

.. note::

   When you follow the :ref:`installation guide <installing_the_wazuh_agent>`, we recommend that you use environment variables to configure the Wazuh agent automatically. This method allows the Wazuh agent to enroll with the Wazuh manager and connect to it.

Learn about the different enrollment options and the information required for Wazuh agent enrollment in these sections.

.. toctree::
   :maxdepth: 1

   requirements
   agent-life-cycle
   enrollment-methods/index
   security-options/index
   troubleshooting

..
   deployment-variables/index
