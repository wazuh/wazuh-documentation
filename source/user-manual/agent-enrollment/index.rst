.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _agent_enrollment:

Wazuh agent enrollment
=======================

Agent enrollment is the process of registering Wazuh agents as authorized members of the Wazuh solution. Agent enrollment allows:

- The Wazuh manager to register agents and generate unique keys for them.

- The use of the key to encrypt communication between the agent and the manager.

- Validation of the identity of the agents communicating with the manager.

Please note that, when following our :ref:`installation guide <installation_guide>`, it is recommended to use environment variables to automatically configure the Wazuh agent. This allows the agent to enroll and connect to the Wazuh manager. This documentation provides additional information on the different enrollment options.

Enrollment methods
------------------

There are two options for enrolling agents to the Wazuh manager. 

#. :doc:`Enrollment via agent configuration <../agent-enrollment/via-agent-configuration>`: Once the IP address of the manager has been set, the agent will be able to automatically request the key and import it. This is the recommended enrollment method.

#. :ref:`Enrollment via manager API <enrollment_via_manager_api>`: The user requests for the key from the manager API, and then manually imports it to the agent.


Requirements
------------

The following has to be in place to ensure the Wazuh agent enrollment is done:

#. An installed and running Wazuh manager. 

#. An installed Wazuh agent on the endpoint in need of enrollment. 

#. Connectivity between the server in which the Wazuh manager is installed and the endpoint. This server should have the following default ports opened to allow the Wazuh manager to establish communication with the agents: 

   - 1514/TCP for agent communication.

   - 1515/TCP for enrollment via automatic agent request.
   
   - 55000/TCP for enrollment via manager API.


Troubleshooting
---------------

Refer to the :ref:`Troubleshooting <troubleshooting>` section for details on how to test the connectivity between the agent and the manager. 


.. toctree::
    :hidden:
    :maxdepth: 1

    via-agent-configuration/index
    via-manager-API/index
    security-options/index
    troubleshooting
    
    
