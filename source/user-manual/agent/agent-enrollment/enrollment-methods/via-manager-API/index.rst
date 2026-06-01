.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh manager API lets you enroll a Wazuh agent manually. Learn more in this section of the documentation.

Enrollment through the Wazuh manager API
==========================================

The Wazuh manager API lets you enroll a Wazuh agent manually. The API request returns a unique client key for the Wazuh agent. You must import this key on the Wazuh agent endpoint before the Wazuh agent can connect to the Wazuh manager. Use this method when you need manual control over the enrollment process.

How it works
------------

The Wazuh agent enrollment flow through the API works as follows:

#. Send an API request with Wazuh manager API credentials to generate an authorization token in JSON Web Token (JWT) format. You can send this request from any authorized endpoint.
#. Send an API request with the authorization token to the Wazuh manager API. This request enrolls the Wazuh agent and returns the agent key.
#. Import the agent key on the Wazuh agent endpoint.
#. Configure the Wazuh manager IP address or fully qualified domain name (FQDN) on the Wazuh agent.
#. Restart the Wazuh agent to connect it to the Wazuh manager.

This section includes the following tasks:

.. toctree::
   :maxdepth: 1

   requesting-the-key
   importing-the-key
