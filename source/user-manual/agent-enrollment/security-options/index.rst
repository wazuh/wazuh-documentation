.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _enrolloment_additional_security:

Additional security options
===========================

Additional security measures can be implemented in the enrollment process in order to authenticate  the endpoint to the Wazuh manager and vice versa. These security options are only available when enrolling agents :ref:`via the agent configuration method <enrollment_via_agent_automatic_request>`.


The additional security options include:

- Using password authentication.
- Using certificates to:
   - Verify the Wazuh manager.
   - Verify the agents.



.. toctree::    
    :maxdepth: 1

    using-password-authentication
    using-certificates   
