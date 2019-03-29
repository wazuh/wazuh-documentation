.. Copyright (C) 2018 Wazuh, Inc.

.. _use-registration-service:

Using the registration service
==============================

The ``ossec-authd`` daemon allows to register agents automatically.

- The manager uses :ref:`ossec-authd` to launch the registration service.
- On the agent, :ref:`agent-auth` is used to connect to the registration service.

Launching the daemon on the manager with default options would allow any agent to register itself, and then connect to it. The secure methods provide some mechanisms to authorize the connections.

+------------+--------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Type       | Method                                                                                     | Description                                                                                                                 |
+============+============================================================================================+=============================================================================================================================+
| Not secure | `Simple method`_                                                                           | The easiest method. There is no authentication or host verification.                                                        |
+------------+--------------------------------------------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
| Secure     | `Password authorization`_                                                                  | Allows agents to authenticate via a shared password. This method is easy but does not perform host validation.              |
|            +--------------------------------+-----------------------------------------------------------+-----------------------------------------------------------------------------------------------------------------------------+
|            | `Host verification using SSL`_ | `Manager verification using SSL`_                         | The manager's certificate is signed by a CA that agents use to validate the server. This may include host checking.         |
|            |                                +---------------------------------+-------------------------+-----------------------------------------------------------------------------------------------------------------------------+
|            |                                | `Agent verification using SSL`_ | With host validation    | The same as above, but the manager verifies the agent's certificate and address. There should be one certificate per agent. |
|            |                                |                                 +-------------------------+-----------------------------------------------------------------------------------------------------------------------------+
|            |                                |                                 | Without host validation | The manager validates the agent by CA but not the host address. This method allows the use of a shared agent certificate.   |
+------------+--------------------------------+---------------------------------+-------------------------+-----------------------------------------------------------------------------------------------------------------------------+

.. note::
  The secure methods can be combined for a stronger security during the registration process.

Prerequisites
-------------

The registration service requires an SSL certificate on the manager in order to work. If the system already has the ``openssl`` package, a new one will be generated automatically during the installation process. The certificate (and its key) will be available at ``/var/ossec/etc/``.

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

  a. For Linux systems:

  .. code-block:: console

    # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>

  b. For Windows systems:

  .. code-block:: none

    # "C:\Program Files (x86)\ossec-agent\agent-auth.exe" -m <MANAGER_IP_ADDRESS>

Password authorization
----------------------

You can protect the manager from unauthorized registrations by using a password. Choose one by yourself, or let the registration service generate a random password.

To enable the password authorization, use the ``-P`` flag when running the registration service.

1. Follow one of these steps on the manager:

  * To use a custom password, edit the ``/var/ossec/etc/authd.pass`` file and write it. For example, if we want to use *TopSecret* as a password:

    .. code-block:: console

      # echo "TopSecret" > /var/ossec/etc/authd.pass
      # /var/ossec/bin/ossec-authd -P

      Accepting connections on port 1515. Using password specified on file: /var/ossec/etc/authd.pass

  * If no password is specified on ``/var/ossec/etc/authd.pass``, the registration service will create a password itself and tell you what it is on the console output:

    .. code-block:: console

      # /var/ossec/bin/ossec-authd -P

      Accepting connections on port 1515. Random password chosen for agent authentication: abdc1234

2. The agents can use the password by storing it on a file or as a command line argument. Follow one of these steps:

  * Write the password on ``/var/ossec/etc/authd.pass`` and run the ``agent-auth`` program:

    a. For Linux systems:

    .. code-block:: console

      # echo "abcd1234" > /var/ossec/etc/authd.pass
      # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS>

    b. For Windows systems:

    .. code-block:: console

      # echo abcd1234 > C:\Program Files (x86)\ossec-agent\authd.pass
      # "C:\Program Files (x86)\ossec-agent\agent-auth.exe" -m <MANAGER_IP_ADDRESS>

  * Run the program with the ``-P`` flag, and insert the password:

    a. For Linux systems:

    .. code-block:: console

      # /var/ossec/bin/agent-auth -m <MANAGER_IP_ADDRESS> -P "abcd1234"

    b. For Windows systems:

    .. code-block:: none

      # "C:\Program Files (x86)\ossec-agent\agent-auth.exe" -m <MANAGER_IP_ADDRESS> -P "abcd1234"

.. _verify-hosts:

Host verification using SSL
---------------------------

Creating a Certificate of Authority (CA)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To use the registration service with SSL certification, you must create a Certificate of Authority that will be used to sign certificates for the manager and the agents. The hosts will receive a copy of this CA in order to verify the remote certificate:

.. code-block:: console

  # openssl req -x509 -new -nodes -newkey rsa:2048 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Manager"

.. warning::
  The file ``rootCA.key`` that we have just created is the **private key** of the CA. It is needed to sign other certificates and it is critical to keep it secure. Note that we will never copy this file to other hosts.

Manager verification using SSL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Issue and sign a certificate for the manager, entering the hostname or the IP address that agents will use to connect to the server. For example, if the manager's IP is **192.168.1.2**:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:2048 -keyout sslmanager.key -out sslmanager.csr -subj '/C=US/CN=192.168.1.2'
    # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial

2. Copy the newly created certificate (and its key) to the ``/var/ossec/etc`` folder **on the manager**, and start the registration service:

  .. code-block:: console

    # cp sslmanager.cert sslmanager.key /var/ossec/etc
    # /var/ossec/bin/ossec-authd

3. Copy the CA (**but not the key**) to the ``/var/ossec/etc`` folder **on the agent**, and run the ``agent-auth`` program:

  a. For Linux systems:

  .. code-block:: console

    # cp rootCA.pem /var/ossec/etc
    # /var/ossec/bin/agent-auth -m 192.168.1.2 -v /var/ossec/etc/rootCA.pem

  b. For Windows systems, the CA must be copied to ``C:\Program Files (x86)\ossec-agent``:

  .. code-block:: console

    # cp rootCA.pem C:\Program Files (x86)\ossec-agent
    # "C:\Program Files (x86)\ossec-agent\agent-auth.exe" -m 192.168.1.2 -v C:\Program Files (x86)\ossec-agent\rootCA.pem

Agent verification using SSL
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Agent verification (without host validation)**

In this example, we are going to create a certificate for agents without specifying their hostname, so that the same certificate can be used by many of them. This verifies that agents have a certificate signed by our CA, no matter where they're connecting from.

1. Issue and sign a certificate for the agent. Note that we will not enter the *common name* field:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:2048 -keyout sslagent.key -out sslagent.csr -batch
    # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

2. Copy the CA (**but not the key**) to the ``/var/ossec/etc`` folder **on the manager** (if it's not already there) and start the registration service:

  .. code-block:: console

    # cp rootCA.pem /var/ossec/etc
    # /var/ossec/bin/ossec-authd -v /var/ossec/etc/rootCA.pem

3. Copy the newly created certificate (and its key) to the ``/var/ossec/etc`` folder **on the agent**, and run the ``agent-auth`` program. For example, if the manager's IP address is 192.168.1.2:

  a. For Linux systems:

  .. code-block:: console

    # cp sslagent.cert sslagent.key /var/ossec/etc
    # /var/ossec/bin/agent-auth -m 192.168.1.2 -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key

  b. For Windows systems, the CA must be copied to ``C:\Program Files (x86)\ossec-agent``:

  .. code-block:: console

    # cp sslagent.cert sslagent.key C:\Program Files (x86)\ossec-agent
    # "C:\Program Files (x86)\ossec-agent\agent-auth.exe" -m 192.168.1.2 -x C:\Program Files (x86)\ossec-agent\sslagent.cert -k C:\Program Files (x86)\ossec-agent\sslagent.key

**Agent verification (with host validation)**

This is an alternative method to the previous one. In this case, we will bind the agent's certificate to its IP address as seen by the manager.

1. Issue and sign a certificate for the agent, entering its hostname or IP address into the *common name* field. For example, if the agent's IP is 192.168.1.3:

  .. code-block:: console

    # openssl req -new -nodes -newkey rsa:2048 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=192.168.1.3'
    # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

2. Copy the CA (**but not the key**) to the ``/var/ossec/etc`` folder **on the manager** (if it's not already there) and start the registration service. Note that we use the ``-s`` flag in order to enable agent host validation:

  .. code-block:: console

    # cp rootCA.pem /var/ossec/etc
    # /var/ossec/bin/ossec-authd -v /var/ossec/etc/rootCA.pem -s

3. Copy the newly created certificate (and its key) to the ``/var/ossec/etc`` folder **on the agent**, and run the ``agent-auth`` program. For example, if the manager's IP address is 192.168.1.2:

  a. For Linux systems:

  .. code-block:: console

    # cp sslagent.cert sslagent.key /var/ossec/etc
    # /var/ossec/bin/agent-auth -m 192.168.1.2 -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key

  b. For Windows systems, the CA must be copied to ``C:\Program Files (x86)\ossec-agent``:

  .. code-block:: console

    # cp sslagent.cert sslagent.key C:\Program Files (x86)\ossec-agent
    # "C:\Program Files (x86)\ossec-agent\agent-auth.exe" -m 192.168.1.2 -x C:\Program Files (x86)\ossec-agent\sslagent.cert -k C:\Program Files (x86)\ossec-agent\sslagent.key

Additional configurations
-------------------------

* By default, the registration service adds the agents with their static IP address. If you want to add them with a dynamic IP (like using ``any`` on the ``manage_agents`` tool), you must change the manager's configuration file (``/var/ossec/etc/ossec.conf``):

  .. code-block:: xml

    <auth>
      <use_source_ip>no</use_source_ip>
    </auth>ls

* Duplicate IPs are not allowed, so an agent won't be added if there is already another agent registered with the same IP. By changing the configuration file, ``ossec-authd`` can be told to **force a registration** if it finds an older agent with the same IP address. This will make the older agent's registration be deleted:

  .. code-block:: xml

    <auth>
      <force_insert>yes</force_insert>
      <force_time>0</force_time>
    </auth>

  The **0** on ``<force-time>`` means the minimum time, in seconds, since the last connection of the old agent (the one to be deleted). In this case, it means to delete the old agent's registration regardless of how recently it has checked in.
