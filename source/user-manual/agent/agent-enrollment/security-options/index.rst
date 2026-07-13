.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: You can implement additional security measures in the enrollment process to authenticate the endpoint to the Wazuh manager and vice versa. Learn more in this section of the documentation.

Additional security options
===========================

You can add security controls to the Wazuh agent enrollment process. These controls help authenticate the enrollment request, verify the identity of the Wazuh manager, or verify the identity of the Wazuh agent.

The additional security options include:

.. toctree::
   :maxdepth: 1

   using-password-authentication
   manager-identity-verification
   agent-identity-verification

These security options are available only when enrolling Wazuh agents via the :doc:`agent configuration method <../enrollment-methods/via-agent-configuration/index>`.