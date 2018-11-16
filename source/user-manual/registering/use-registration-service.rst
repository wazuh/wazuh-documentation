.. Copyright (C) 2018 Wazuh, Inc.

.. _use-registration-service:

Using the registration service
==============================

The ``authd`` daemon allows to register agents automatically. This registration process uses :ref:`ossec-authd` on the manager instance, and :ref:`agent-auth` on the agent instances.

Launching the daemon on the manager with default options would allow any agent to register itself, and then connect to it. The secure methods provide some mechanisms to authorize the connections.

+------------+-----------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Type       | Method                                        | Description                                                                                                                 |
+============+===============================================+=============================================================================================================================+
| Not secure | `Simple method`_                              | The easiest method. There is no authentication or host verification.                                                        |
+------------+-----------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Secure     | `Use a password to authorize agents`_         | Allows agents to authenticate via a shared password. This method is easy but does not perform host validation.              |
|            +-----------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
|            | `Verify manager via SSL`_                     | The manager's certificate is signed by a CA that agents use to validate the server. This may include host checking.         |
|            +--------------------------+--------------------+-----------------------------------------------------------------------------------------------------------------------------+
|            | `Verify agents via SSL`_ | Host validation    | The same as above, but the manager verifies the agent's certificate and address. There should be one certificate per agent. |
|            |                          +--------------------+-----------------------------------------------------------------------------------------------------------------------------+
|            |                          | No host validation | The manager validates the agent by CA but not the host address. This method allows the use of a shared agent certificate.   |
+------------+--------------------------+--------------------+-----------------------------------------------------------------------------------------------------------------------------+

.. note::
  The secure methods can be combined for a stronger security during the registration process.

Prerequisites
-------------

The registration service requires an SSL certificate on the manager in order to work. If the system already has the ``openssl`` package, Wazuh will automatically generate a new one during the installation process. The certificate (and its key) will be available at ``/var/ossec/etc/``.

It's possible to use a valid certificate with its key, just by copying them into the same path:

.. code-block:: console

  # cp <ssl_cert> /var/ossec/etc/sslmanager.cert
  # cp <ssl_key> /var/ossec/etc/sslmanager.key

Otherwise, you can create a self-signed certificate using the following command:

.. code-block:: console

  # openssl req -x509 -batch -nodes -days 365 -newkey rsa:2048 -out /var/ossec/etc/sslmanager.cert -keyout /var/ossec/etc/sslmanager.key

Simple method
-------------

This is the easiest method to register agents. It doesn't require any kind of authorization or host verification. To do so, follow these steps:

1. On the manager, start the registration service:

  .. code-block:: console

    # /var/ossec/bin/ossec-authd

2. On the agents, run the ``agent-auth`` program, using the manager's IP address:

  .. code-block:: console

    # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>

Secure methods
--------------

Use a password to authorize agents
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The manager can be protected from unauthorized registrations by using a password. We can choose one ourselves or let authd generate a random password.

1. To specify a password manually, just write it to the file ``etc/authd.pass``. For example, if the key were "TopSecret":

   (Manager)

   .. code-block:: console

        # echo "TopSecret" > /var/ossec/etc/authd.pass
        # /var/ossec/bin/ossec-authd -P

      Accepting connections. Using password specified on file: /var/ossec/etc/authd.pass

2. If you don't specify a password, then authd will create a password itself and tell you what it is:

   (Manager)

   .. code-block:: console

        # /var/ossec/bin/ossec-authd -P

      Accepting connections. Random password chosen for agent authentication: abcd1234

On the agent side, the key can be put in a file of the same name or specified as a command-line argument.

1. Using the file ``etc/authd.pass``:

   (Agent)

   .. code-block:: console

        # echo "abcd1234" > /var/ossec/etc/authd.pass
        # /var/ossec/bin/agent-auth -m 192.168.1.2

2. Entering the password at the command line:

   (Agent)

   .. code-block:: console

        # /var/ossec/bin/agent-auth -m 192.168.1.2 -P "abcd1234"

.. _verify-hosts:

Use SSL to verify hosts
^^^^^^^^^^^^^^^^^^^^^^^

Create a Certificate of Authority
"""""""""""""""""""""""""""""""""

First we are going to create a certificate of authority (CA) that we will use to sign the certificates for the manager and agents. Hosts will receive a copy of this certificate in order to verify the remote certificate:

   .. code-block:: console

        # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Manager"

.. warning::
    The file ``rootCA.key`` that we have just created is the **private key** of the certificate of authority. It is needed to sign other certificates and it is critical to keep it secure. Note that we will never copy this file to other hosts.

Verify manager via SSL
^^^^^^^^^^^^^^^^^^^^^^

1. Issue and sign a certificate for the authd server, entering the hostname or the IP address that agents will use to connect to the server. For example, if the server's IP is 192.168.1.2:

   .. code-block:: console

        # openssl req -new -nodes -newkey rsa:2048 -keyout sslmanager.key -out sslmanager.csr -subj '/C=US/CN=192.168.1.2'
        # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial

2. Copy the newly created certificate and the key to the manager's ``etc`` folder and start ``ossec-authd``:

   (Manager)

   .. code-block:: console

        # cp sslmanager.cert sslmanager.key /var/ossec/etc
        # /var/ossec/bin/ossec-authd

3. Copy the CA (but not the key) to the agent's ``etc`` folder and run ``agent-auth``:

   (Agent)

   .. code-block:: console

        # cp rootCA.pem /var/ossec/etc
        # /var/ossec/bin/agent-auth -m 192.168.1.2 -v /var/ossec/etc/rootCA.pem

Verify agents via SSL
^^^^^^^^^^^^^^^^^^^^^


**Verify agents via SSL (no host validation)**

  In this example, we are going to create a certificate for agents without specifying their hostname, so that the same certificate can be used by many agents. This verifies that agents have a certificate signed by our CA, no matter where they are connecting from.

  1. Issue and sign a certificate for the agent. Note that we will not enter the *common name* field:

    .. code-block:: console

        # openssl req -new -nodes -newkey rsa:2048 -keyout sslagent.key -out sslagent.csr -batch
        # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

  2. Copy the CA (but not the key) to the manager's ``etc`` folder (if not already there) and start ``ossec-authd``:

   (Manager)

   .. code-block:: console

          # cp rootCA.pem /var/ossec/etc
          # /var/ossec/bin/ossec-authd -v /var/ossec/etc/rootCA.pem

  3. Copy the newly created certificate and key to the agent's ``etc`` folder and run ``agent-auth``. For example, if the server's IP is 192.168.1.2:

   (Agent)

   .. code-block:: console

          # cp sslagent.cert sslagent.key /var/ossec/etc
          # /var/ossec/bin/agent-auth -m 192.168.1.2 -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key

**Verify agents via SSL (host validation)**

  This is an alternative method to the last section. In this case, we will bind the agent's certificate to the agent IP address as seen by the manager.

  1. Issue and sign a certificate for the agent. Then enter its hostname or IP address into the *common name* field. For example, if the agent's IP is 192.168.1.3:

   .. code-block:: console

          # openssl req -new -nodes -newkey rsa:2048 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=192.168.1.3'
          # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

  2. Copy the CA (but not the key) to the manager's ``etc`` folder (if not already there) and start ``ossec-authd``. Note that we use the ``-s`` option in order to enable agent host verification:

   (Manager)

   .. code-block:: console

          # cp rootCA.pem /var/ossec/etc
          # /var/ossec/bin/ossec-authd -v /var/ossec/etc/rootCA.pem -s

  3. Copy the newly created certificate and key to the agent's ``etc`` folder and run ``agent-auth``. For example, if the server's IP is 192.168.1.2:

   (Agent)

   .. code-block:: console

          # cp sslagent.cert sslagent.key /var/ossec/etc
          # /var/ossec/bin/agent-auth -m 192.168.1.2 -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key

Some hints
----------

By default, authd adds the agents with their static IP. If you want to add agents with a dynamic IP address (like using ``any`` on ``manage_agents``) you must change ``etc/ossec.conf`` on the server-side:

   (Manager)

   .. code-block:: xml

    <auth>
	<use_source_ip>no</use_source_ip>
    </auth>

On the other hand, **duplicate IPs are not allowed**, so an agent won't be added if there is already another agent registered with the same IP. By changing ``etc/ossec.conf``, authd can be told to **force a registration** if it finds an older agent with the same IP - the older agent's registration will be deleted:

   (Manager)

   .. code-block:: xml

    <auth>
	<force_insert>yes</force_insert>
	<force_time>0</force_time>
    </auth>

The ``0`` means the minimum time, in seconds, since the last connection of the old agent (the one to be deleted). In this case, ``0`` means to delete the old agent's registration regardless of how recently it has checked in.
