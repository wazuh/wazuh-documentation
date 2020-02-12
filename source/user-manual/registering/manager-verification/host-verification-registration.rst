.. Copyright (C) 2019 Wazuh, Inc.

.. _host-verification-registration:

Registering agents using registration service with host verification
====================================================================

Using verification with an SSL key certificate provides confidence that the connection between the right agent and the right manager is established.

Creating a Certificate of Authority (CA)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use the registration service with SSL certification, you must create a **Certificate of Authority** that will be used to sign certificates for the manager and the agents. The hosts will receive a copy of this CA in order to verify the remote certificate.
To generate the certificate execute the following command:

.. code-block:: console

  # openssl req -x509 -new -nodes -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Manager"

.. warning::
  The file ``rootCA.key`` that we have just created is the **private key** of the CA. It is needed to sign other certificates and it is critical to keep it secure. Note that we will **never copy this file to other hosts**.


Available options to verify the hosts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

After creating your ``CA``, you have these options to register the agents verifying the hosts:

.. toctree::
    :maxdepth: 1

    manager-verification-registration
    agent-verification-registration
    
