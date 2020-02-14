.. Copyright (C) 2019 Wazuh, Inc.

.. _registration-service:

Registering agents using registration service
=============================================

.. toctree::
    :maxdepth: 4
    :hidden:

    Registering agents using simple registration service<simple-registration-method>
    Registering agents using registration service with password authorization<password-authorization-registration-service>
    Registering agents using registration service with host verification<manager-verification/host-verification-registration>

Below are presented three different scenarios of registering the agent using ``agent-auth`` program.

Registering agents using simple registration service
----------------------------------------------------

This is the easiest method to register agents. It doesn’t require any kind of authorization or host verification. If the ``OpenSSL`` package is installed before installing the manager, the package will create the certificate and key needed to run the authentication process called ``ossec-authd``. This certificate and key can be found on the manager in ``/var/ossec/etc/sslmanager.cert`` and
``/var/ossec/etc/sslmanager.key``.

The ``ossec-authd`` service is used to obtain a unique key, one per each agent, which allows to authenticate with the Wazuh communication service and to encrypt traffic. The communication is done over TLS protocol.
The ``agent-auth`` program is the client application used along with ``ossec-authd`` to automatically add agent to the manager.

Agents
^^^^^^
Now, follow the instructions to register the agent depending on the OS of the host:

* :doc:`Linux and Unix host<linux-unix-simple-registration>`
* :doc:`Windows host<windows-simple-registration>`
* :doc:`MacOS X host<macos-simple-registration>`

Registering agents using registration service with password authorization
-------------------------------------------------------------------------

This registration method is similar to ``Simple registration service`` except that it allows additional protection of the manager from unauthorized registrations by using a password.

To register the agent follow the instructions in the **Manager** section and then select the corresponding section for the agent's operating system.

Manager
^^^^^^^

To enable password authorization, in ``/var/ossec/etc/ossec.conf`` file, in ``<auth><use_password>`` section, set the value to ``yes``.

   .. code-block:: xml

     <auth>
       ...
       <use_password>yes</use_password>
       ...
     </auth>

You can choose your password or let the registration service generate one for you.

.. note::
  In this example, the custom password to register the Wazuh agent is ``TopSecret``.

a) **Using a custom password**: create ``/var/ossec/etc/authd.pass`` file and save your custom password in it:

   .. code-block:: console

     # echo "TopSecret" > /var/ossec/etc/authd.pass

b) **Using a random password**: if no password is specified in ``/var/ossec/etc/authd.pass``, the registration service will create a random password. You can find the password in ``/var/ossec/logs/ossec.log`` by exectuting the following command:

   .. code-block:: console

     # grep "Random password" /var/ossec/logs/ossec.log
       2019/04/25 15:09:50 ossec-authd: INFO: Accepting connections on port 1515. Random password chosen for agent authentication: 3027022fa85bb4c697dc0ed8274a4554


Restart the Wazuh manager for the changes to take effect:

a) For Systemd:

   .. code-block:: console

     # systemctl start wazuh-manager

b) For SysV Init:

   .. code-block:: console

     # service wazuh-manager start

Agents
^^^^^^

Now, follow the instructions to register the agent depending on the OS of the host:

* :doc:`Linux and Unix host<password/linux-unix-password-registration>`
* :doc:`Windows host<password/windows-password-registration>`
* :doc:`MacOS X host<password/macos-password-registration>`

Registering agents using registration service with host verification
--------------------------------------------------------------------

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

* :doc:`Registration with Manager verification<manager-verification/agent-verification-registration>`
* :doc:`Registration with Agent verification<manager-verification/manager-verification-registration>`
