.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _enrollment_via_agent_automatic_request:

Enrollment via agent configuration
==================================

In this option, the agent is automatically enrolled after the Wazuh manager IP address has been configured. Please note that, when using :doc:`Additional security options<../../security-options/index>`, other settings might need to be configured.

The Wazuh manager IP address can be configured in one of two ways on the agent:

#. Using environment variables during the agent installation process. The guide to this process can be found :doc:`here </installation-guide/wazuh-agent/index>`. 

#. Manually configuring the Wazuh manager IP address in the agent configuration file.

Enrollment with additional security options involves the use of passwords for enrollment authorization or certificates for identity validation of the agent and manager. See the :doc:`Additional security options <../../security-options/index>` section for guidance on enrolling an agent to a manager with additional security options enabled.

Below you can find the steps to configure different endpoint agents:

.. toctree::    
    :maxdepth: 1

    linux-endpoint
    windows-endpoint
    macos-endpoint

    
