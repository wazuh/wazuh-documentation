.. _register_agent_manual:

Register agents automatically with authd
=============================================

Choose the method that best meets your needs:

+----------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Method                                             | Description                                                                                                                 |
+====================================================+=============================================================================================================================+
| `Simple method`_                                   | The easiest method. There are no host verification.                                                                         |
+----------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| `Use a password to authorize agents`_              | Allows agents to authenticate by a shared password. This method is easy but does not perform host validation.               |
+----------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| `Verify manager via SSL`_                          | The manager's certificate is signed by a CA that agents use to validate the server. It may include host checking.           |
+-------------------------+--------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| `Verify agents via SSL`_| Host validation          | The same as above, but the manager verifies the agent's certificate and address. There should be one certificate per agent. |
+                         +--------------------------+-----------------------------------------------------------------------------------------------------------------------------+
|                         | No host validation       | The manager validates the agent by CA but not the host address. This method allows to use a shared agent certificate.       |
+-------------------------+--------------------------+-----------------------------------------------------------------------------------------------------------------------------+

``Simple method``
-----------------

Get a SSL certificate
^^^^^^^^^^^^^^^^^^^^^^^^

The first step is to get a SSL key and certificate. This is required in order to make Authd to work.

1. If you have a valid SSL certificate with its key, copy them into the `etc` folder::

    # (Server)
    cp <ssl_cert> /var/ossec/etc/sslmanager.cert
    cp <ssl_key> /var/ossec/etc/sslmanager.key

2. Else you can create a self-signed certificate::

    # (Server)
    openssl req -x509 -batch -nodes -days 365 -newkey rsa:2048 -keyout /var/ossec/etc/sslmanager.key -out /var/ossec/etc/sslmanager.cert

Register the agent
^^^^^^^^^^^^^^^^^^^^^^^^

1. Start the authd server::

    # (Server)
    /var/ossec/bin/ossec-authd

2. Run the auth client. You must enter the Authd server's IP address. For example, if such address is 192.168.1.2::

    # (Client)
    /var/ossec/bin/agent-auth -m 192.168.1.2

Some hints
^^^^^^^^^^

By default, Authd adds agents with dynamic IP (like using "any" on ``manage_agents``). If you want to add agents with static address, use ``-i`` at server-side::

    # (Server)
    /var/ossec/bin/ossec-authd -i

On the other hand, **duplicated IPs are not allowed**. So an agent won't be added if there is already another agent registered with the same IP. Authd can be asked to **force a registration** if it finds an older agent with the same IP by deleting the former first, using the option ``-f``::

    # (Server)
    /var/ossec/bin/ossec-authd -i -f 0

The ``0`` means the minimum time, in seconds, since the last connection of the old agent (the one to be erased). In this case, 0 means to delete anyway.

Secure methods
------------------------------

Launching the Authd daemon with default options would allow any agent to connect to a manager. The following options provides some mechanisms to authorize connections. We will introduce the following methods:

+----------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Method                                             | Description                                                                                                                 |
+====================================================+=============================================================================================================================+
| `Use a password to authorize agents`_              | Allows agents to authenticate by a shared password. This method is easy but does not perform host validation.               |
+----------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| `Verify manager via SSL`_                          | The manager's certificate is signed by a CA that agents use to validate the server. It may include host checking.           |
+-------------------------+--------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| `Verify agents via SSL`_| Host validation          | The same as above, but the manager verifies the agent's certificate and address. There should be one certificate per agent. |
+                         +--------------------------+-----------------------------------------------------------------------------------------------------------------------------+
|                         | No host validation       | The manager validates the agent by CA but not the host address. This method allows to use a shared agent certificate.       |
+-------------------------+--------------------------+-----------------------------------------------------------------------------------------------------------------------------+

.. note::
    These methods can be mixed.

``Use a password to authorize agents``
--------------------------------------

Manager can be protected from unauthorized connections by using a password. We can choose one by ourself or let Authd to generate a key randomly.

1. To choose a password manually, we have to write it onto the file ``etc/authd.pass``. For example, if the key would be "TopSecret"::

    # (Server)
    echo "TopSecret" > /var/ossec/etc/authd.pass
    /var/ossec/bin/ossec-authd -P

      Accepting connections. Using password specified on file: /var/ossec/etc/authd.pass

2. If such file doesn't exist, Authd will create a password by itself::

    # (Server)
    /var/ossec/bin/ossec-authd -P

      Accepting connections. Random password chosen for agent authentication: abcd1234

On the client-side, the key can be entered into the file with the same name or as a command argument.

1. Using the file ``etc/authd.pass``::

    # (Client)
    echo "abcd1234" > /var/ossec/etc/authd.pass
    /var/ossec/bin/agent-auth -m 192.168.1.2

2. Entering the password in the command line::

    # (Client)
    /var/ossec/bin/agent-auth -m 192.168.1.2 -P "abcd1234"

Use SSL to verify hosts
^^^^^^^^^^^^^^^^^^^^^^^

Create a Certificate of Authority
"""""""""""""""""""""""""""""""""

First we are going to create a certificate of authority (CA) that we will use to sign the certificates for the manager and agents. Hosts will receive a copy of this certificate in order to verify the remote certificate::

    openssl req -x509 -new -nodes -newkey rsa:2048 -keyout rootCA.key -out rootCA.pem -batch

.. warning::
    The file ``rootCA.key`` that we have just created is the **private key** of the certificate of authority. It is needed to sign other certificates and it is critical to keep it secure. Note that we will never copy this file to other hosts.

``Verify manager via SSL``
-----------------------------------------------

1. Issue and sign a certificate for the Authd server, entering the hostname (or the IP address) that agents will use to connect to the server. For example, if the server's IP is 192.168.1.2::

    openssl req -new -nodes -newkey rsa:2048 -keyout sslmanager.key -out sslmanager.csr -subj '/C=US/CN=192.168.1.2'
    openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial

2. Copy the new created certificate and the key to the manager's ``etc`` folder and start ``ossec-authd``::

    # (Server)
    cp sslmanager.cert sslmanager.key /var/ossec/etc
    ossec-authd

3. Copy the CA (but no the key) to the agent's ``etc`` folder and run ``agent-auth``::

    # (Client)
    cp rootCA.pem /var/ossec/etc
    agent-auth -m 192.168.1.2 -v /var/ossec/etc/rootCA.pem

``Verify agents via SSL``
--------------------------


**Verify agents via SSL (no host validation)**

  In this example we are going to create a certificate for agents without specifying their hostname, so that certificate can be used by many agents. This is useful to verify that agents have a certificate signed by our CA, no matter where are they connecting from.

  1. Issue and sign a certificate for the agent. Note that we will not enter the *common name* field::

      openssl req -new -nodes -newkey rsa:2048 -keyout sslagent.key -out sslagent.csr -batch
      openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

  2. Copy the CA (but no the key) to the manager's ``etc`` folder (if it was not already there) and start ``ossec-authd``::

      # (Server)
      cp rootCA.pem /var/ossec/etc
      ossec-authd -v /var/ossec/etc/rootCA.pem

  3. Copy the new created certificate and key to the agent's ``etc`` folder and run ``agent-auth``. For example, if the server's IP is 192.168.1.2::

      # (Client)
      cp sslagent.cert sslagent.key /var/ossec/etc
      agent-auth -m 192.168.1.2 -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key

**Verify agents via SSL (host validation)**

  This is an alternative method to the last section. In this case we will attach the agent's certificate to the visible agent address respect of the manager.

  1. Issue and sign a certificatte for the agent. Now will do enter it's hostname or IP address into the *common name* field. For example, if the agent's IP is 192.168.1.3::

      openssl req -new -nodes -newkey rsa:2048 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=192.168.1.3'
      openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

  2. Copy the CA (but no the key) to the manager's ``etc`` folder (if it was not already there) and start ``ossec-authd``. Note that we use the ``-s`` option in order to enable agent host veritication::

      # (Server)
      cp rootCA.pem /var/ossec/etc
      ossec-authd -v /var/ossec/etc/rootCA.pem -s

  3. Copy the new created certificate and key to the agent's ``etc`` folder and run ``agent-auth``. For example, if the server's IP is 192.168.1.2::

      # (Client)
      cp sslagent.cert sslagent.key /var/ossec/etc
      agent-auth -m 192.168.1.2 -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key
