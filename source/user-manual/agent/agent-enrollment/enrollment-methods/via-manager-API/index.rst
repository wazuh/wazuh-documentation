.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh server API allows manual control over the enrollment process. Learn more in this section of the documentation.

Enrollment via Wazuh server API
===============================

The Wazuh server API allows users to make an agent enrollment request to the Wazuh manager. This request returns a unique client key for the Wazuh agent, which must be manually imported to the Wazuh agent. This is useful for users who need manual control over the enrollment process.

How it works
------------

The flow of a Wazuh agent being enrolled via API is as follows:

#. The user sends an API request with the Wazuh server API credentials to generate an authorization token (a JSON Web Token). This action can be performed from any authorized endpoint. 
#. The user sends an API request with the authorization token to the Wazuh manager. This request enrolls the Wazuh agent and gets the agent key.
#. On the Wazuh agent endpoint, the user imports the agent key to the Wazuh agent.
#. The user configures the Wazuh manager IP address or FQDN (Fully Qualified Domain Name) on the Wazuh agent.
#. The user restarts the Wazuh agent, establishing the connection to the Wazuh manager.

In this section of the guide, you will find the following information:

.. toctree::
   :maxdepth: 1

   requesting-the-key
   importing-the-key