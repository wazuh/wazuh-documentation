.. Copyright (C) 2019 Wazuh, Inc.

.. _host-verification-registration:

Registration service with host verification
===========================================

Using verification with an SSL key certificate is really useful to check if connections between agents and managers are correct. This way, the user avoids the mistake of connecting to a different manager or agent.

Creating a Certificate of Authority (CA)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use the registration service with SSL certification, you must create a **Certificate of Authority** that will be used to sign certificates for the manager and the agents. The hosts will receive a copy of this CA in order to verify the remote certificate:

.. code-block:: console

  # openssl req -x509 -new -nodes -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Manager"

.. warning::
  The file ``rootCA.key`` that we have just created is the **private key** of the CA. It is needed to sign other certificates and it is critical to keep it secure. Note that we will **never copy this file to other hosts**.


Available options to verify the hosts 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 

After creating your *CA*, now you have these options to register the Wazuh Agents verifying the hosts:

.. toctree::
    :maxdepth: 2

    manager-verification-registration
    agent-verification-registration