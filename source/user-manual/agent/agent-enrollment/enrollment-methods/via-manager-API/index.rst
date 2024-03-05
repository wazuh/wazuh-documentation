.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _enrollment_via_manager_api:

Enrollment via manager API
==========================

The Wazuh manager API allows users to make an agent enrollment request to the Wazuh manager. This request returns a unique key for the agent, which must be manually imported to the agent.

How it works
------------

The flow of an agent being enrolled via API is as follows:

   #. The user sends an API request with the manager API credentials to generate an authorization token (a JSON Web Token).
   #. The user sends an API request with the authorization token to the Wazuh manager. This request enrolls the agent and gets the agent key.
   #. On the agent endpoint, the user imports the key to the agent.
   #. The user configures the Wazuh manager IP address on the agent.
   #. The user restarts the agent and then the connection to the manager is established.


In this document, you will find the following information:

.. toctree::    
    :maxdepth: 1

    requesting-the-key
    importing-the-key