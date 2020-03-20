.. Copyright (C) 2019 Wazuh, Inc.

.. _registration-service:

Registering agents using Registration Service
=============================================

If the ``OpenSSL`` package is installed before installing the manager, the package will create the certificate and key needed to run the authentication process called ``ossec-authd``. This certificate and key can be found on the manager in ``/var/ossec/etc/sslmanager.cert`` and
``/var/ossec/etc/sslmanager.key``.

The ``ossec-authd`` service is used to obtain a unique key, one per each agent, which allows to authenticate with the Wazuh communication service and to encrypt traffic. The communication is done over TLS protocol.
The ``agent-auth`` program is the client application used along with ``ossec-authd`` to automatically add the agent to the manager.

Below are presented three different scenarios of registering the agent using ``agent-auth`` program.

The agent registration can be adjusted by using different :ref:`agent-auth` options.

.. _simple-registration-service:

Simple Registration Service
---------------------------

This is the easiest method to register the agent. It doesn’t require any kind of authorization or host verification.

Choose the tab corresponding to the agent host operating system:

.. tabs::

 .. group-tab:: Linux/Unix host

   Open a session in the Linux/Unix agent host as a ``root`` user.

   1. Run the ``agent-auth`` program, using the manager’s IP address:

    .. include:: ../../_templates/registrations/common/set_agent_name.rst

    .. code-block:: console

     # /var/ossec/bin/agent-auth -m <manager_IP>

   2. Edit the agent's  ``/var/ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent:

    .. include:: ../../_templates/registrations/linux/start_agent.rst



 .. group-tab:: Windows host

   Open a Powershell or CMD session in the agent host as an ``Administrator``.

    .. include:: ../../_templates/registrations/windows/installation_directory.rst

   1. Run the ``agent-auth.exe`` program, using the manager's IP address:

    .. include:: ../../_templates/registrations/common/set_agent_name.rst

    .. code-block:: console

    # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP>

   2. Edit the agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent.

    .. include:: ../../_templates/registrations/windows/start_agent.rst



 .. group-tab:: MacOS X host

  Open a session in the MacOS X agent host as a ``root`` user.

  1. Run the ``agent-auth`` program, using the manager’s IP address:

   .. include:: ../../_templates/registrations/common/set_agent_name.rst

   .. code-block:: console

    # /Library/Ossec/bin/agent-auth -m <manager_IP>

  2. Edit the agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

   .. include:: ../../_templates/registrations/common/client_server_section.rst

  3. Start the agent:

   .. include:: ../../_templates/registrations/macosx/start_agent.rst



.. _password-authorization-registration-service:

Registration Service with Password Authorization
------------------------------------------------

This registration method is similar to ``Simple registration service`` except that it allows additional protection of the manager from unauthorized registrations by using a password.

Manager
^^^^^^^

1. To enable password authorization amend the manager's ``/var/ossec/etc/ossec.conf`` configuration file as shown below:

  .. code-block:: xml

    <auth>
      ...
      <use_password>yes</use_password>
      ...
    </auth>

2. Choose custom password or let the registration service generate one.

  .. note::

   In this example, the custom password to register the Wazuh agent is ``TopSecret``.

  .. tabs::

   .. group-tab:: Using a custom password

    Create ``/var/ossec/etc/authd.pass`` file and save custom password in it:

    .. code-block:: console

      # echo "TopSecret" > /var/ossec/etc/authd.pass

   .. group-tab:: Using a random password

    If no password is specified in ``/var/ossec/etc/authd.pass``, the registration service will create a random password. The password can be found in ``/var/ossec/logs/ossec.log`` by executing the following command:

    .. code-block:: console

      # grep "Random password" /var/ossec/logs/ossec.log

    .. code-block:: none
             :class: output

             2019/04/25 15:09:50 ossec-authd: INFO: Accepting connections on port 1515. Random password chosen for agent authentication: 3027022fa85bb4c697dc0ed8274a4554


3. Restart the manager for the changes to take effect:

 .. include:: ../../_templates/registrations/common/restart_manager.rst

Agents
^^^^^^

Choose the tab corresponding to the agent host operating system:

.. tabs::

 .. group-tab:: Linux/Unix host

   Open a session in the Linux/Unix agent host as a ``root`` user.

   1. Register the agent using the password. It can be stored in a file or provided as a command-line argument:

     .. tabs::

      .. group-tab:: Using a stored password

       Write the password on ``/var/ossec/etc/authd.pass`` file and run the ``agent-auth`` program using the manager’s IP address:

       .. include:: ../../_templates/registrations/common/set_agent_name.rst

       .. code-block:: console

        # echo "TopSecret" > /var/ossec/etc/authd.pass
        # /var/ossec/bin/agent-auth -m <manager_IP>

      .. group-tab:: Using a password as a command-line argument

       Run the ``agent-auth`` program providing the manager’s IP address together with the password followed by the ``-P`` flag:

       .. include:: ../../_templates/registrations/common/set_agent_name.rst

       .. code-block:: console

        # /var/ossec/bin/agent-auth -m <manager_IP> -P "TopSecret"

   2. Edit the agent's ``/var/ossec/etc/ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent:

    .. include:: ../../_templates/registrations/linux/start_agent.rst



 .. group-tab:: Windows host

   Open a Powershell or CMD session in the agent host as an ``Administrator``.

   .. include:: ../../_templates/registrations/windows/installation_directory.rst

   1. Register the agent using the password. It can be stored in a file or provided as a command-line argument:

     .. tabs::

      .. group-tab:: Using a stored password

       Write the password on ``C:\Program Files (x86)\ossec-agent\authd.pass`` file and run the ``agent-auth`` program using the manager’s IP address:

       .. include:: ../../_templates/registrations/common/set_agent_name.rst

       .. code-block:: none

        # echo TopSecret > "C:\Program Files (x86)\ossec-agent\authd.pass"
        # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP>

       The agent assumes the input file is in ``UTF-8 encoding``, without ``byte-order mark (BOM)``. If the file is created in an incorrect encoding it can be changed by opening the ``authd.pass`` file in a Notepad and Save As ``ANSI`` encoding.

      .. group-tab:: Using a password as a command-line argument

       Run the ``agent-auth`` program, provide the manager’s IP address together with the password following the ``-P`` flag:

       .. include:: ../../_templates/registrations/common/set_agent_name.rst

       .. code-block:: none

         # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP> -P "TopSecret"

   2. Edit the agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

    .. include:: ../../_templates/registrations/common/client_server_section.rst

   3. Start the agent:

    .. include:: ../../_templates/registrations/windows/start_agent.rst



 .. group-tab:: MacOS X host

  Open a session in the Linux/Unix agent host as a ``root`` user.

  1. Register the agent using the password. It can be stored in a file or provided as a command-line argument:

    .. tabs::

     .. group-tab:: Using a stored password

      Write the password on ``/Library/Ossec/etc/authd.pass`` file and run the ``agent-auth`` program using the manager’s IP address:

      .. include:: ../../_templates/registrations/common/set_agent_name.rst

      .. code-block:: console

         # echo "TopSecret" > /Library/Ossec/etc/authd.pass
         # /Library/Ossec/bin/agent-auth -m <manager_IP>

     .. group-tab:: Using a password as a command-line argument

      Run the ``agent-auth`` program, provide the manager’s IP address together with the password following the ``-P`` flag:

      .. include:: ../../_templates/registrations/common/set_agent_name.rst

      .. code-block:: console

        # /Library/Ossec/bin/agent-auth -m <manager_IP> -P "TopSecret"

  2. Edit the agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

   .. include:: ../../_templates/registrations/common/client_server_section.rst

  3. Start the agent.

   .. include:: ../../_templates/registrations/macosx/start_agent.rst



.. _host-verification-registration:

Registering agents using Registration Service with Host Verification
--------------------------------------------------------------------

Using verification with an SSL key certificate provides confidence that the connection between the right agent and the right manager is established.

Creating a Certificate of Authority (CA)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Registration service with SSL certification, requires creation of a **Certificate of Authority** used to sign certificates for the manager and the agents. The hosts will receive a copy of this CA in order to verify the remote certificate.

To generate the certificate execute the following command:

.. code-block:: console

 # openssl req -x509 -new -nodes -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Manager"

.. warning::

 The newly created ``rootCA.key`` file is the **private key** of the CA. It is needed to sign other certificates and it is critical to keep it secure. **Never copy this file to other hosts**.

Available options to verify the hosts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are two options to register the agent using host verification:

.. tabs::

 .. group-tab:: Registration with Manager verification

   .. _agent-verification-with-host-validation:

   Enable Agent verification without host validation
   -------------------------------------------------

   To verify the Wazuh manager using SSL, create an SSL certificate and sign it using the :ref:`Certificate of Authority (CA) <host-verification-registration>` created in the previous section. This will allow the agents to ensure that they are connected to the correct manager during the registration service.

   .. image:: ../../images/manual/managing-agents/SSLregister1.png
      :align: center
      :width: 100%

   .. note::

      This example shows the creation of a certificate for the manager with the IP address ``192.168.1.2``

   **Manager**

   Follow these steps in the Wazuh manager host:

   1. Create the configuration file ``req.conf`` with the hostname or the IP address of the Wazuh server where the agents are going to be registered. The configuration file could be as follows:

       .. code-block:: console

        [req]
        distinguished_name = req_distinguished_name
        req_extensions = req_ext
        prompt = no
        [req_distinguished_name]
        C = US
        CN = 192.168.1.2
        [req_ext]
        subjectAltName = @alt_names
        [alt_names]
        DNS.1 = wazuh
        DNS.2 = wazuh.com

       .. note:: The ``subjectAltName`` extension is optional but necessary to allow the registration of Wazuh agents with a SAN certificate. In this case, the Wazuh server DNS are ``wazuh`` and ``wazuh.com``.

   2. Issue and sign the certificate for the manager:

       .. code-block:: console

        # openssl req -new -nodes -newkey rsa:4096 -keyout sslmanager.key -out sslmanager.csr -config req.conf
        # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial -extfile req.conf -extensions req_ext

       .. note::

         The ``-extfile`` and ``-extensions`` options are required to copy the subject and the extensions from ``sslmanager.csr`` to ``sslmanager.cert``. This allows the registration of the agents with a SAN certificate.

   3. Copy the certificate and the key to the ``/var/ossec/etc`` folder:

       .. code-block:: console

        # cp sslmanager.cert sslmanager.key /var/ossec/etc

   4. Restart the Wazuh manager:

       .. include:: ../../_templates/registrations/common/restart_manager.rst

   **Agents**

   Copy the CA file (``.pem``) to the agent host. In this example, the CA file is ``rootCA.pem``.

   Choose the tab corresponding to the agent host operating system:

   .. tabs::

    .. group-tab:: Linux/Unix host

     Open a session in the Linux/Unix agent host as a ``root`` user.

     1. Copy the CA (``.pem`` file) previously created on the manager to the ``/var/ossec/etc`` folder:

       .. code-block:: console

        # cp rootCA.pem /var/ossec/etc

     2. Run the ``agent-auth`` program providing the manager’s IP address and location of the CA:

      .. include:: ../../_templates/registrations/common/set_agent_name.rst

      .. code-block:: console

        # /var/ossec/bin/agent-auth -m <manager_IP> -v /var/ossec/etc/rootCA.pem

      .. note::

        Note that this method must include the ``-v option`` that indicates the location of the CA. If this option is not included, a warning message will be displayed and the connection will be established without verifying the manager.

     3. Edit the agent's ``/var/ossec/etc/ossec.conf`` configuration file:

      .. include:: ../../_templates/registrations/common/client_server_section.rst

     4. Start the agent.

      .. include:: ../../_templates/registrations/linux/start_agent.rst



    .. group-tab:: Windows host

     Open a session in the Windows agent host and start a CMD or a Powershell as an ``Administrator``.

     .. include:: ../../_templates/registrations/windows/installation_directory.rst

     1. Copy the CA (``.pem`` file) previously created on the manager to the ``C:\Program Files (x86)\ossec-agent`` folder:

       .. code-block:: console

         # cp rootCA.pem C:\Program Files (x86)\ossec-agent

     2. Run the ``agent-auth`` program providing the manager’s IP address and location of the CA:

        .. include:: ../../_templates/registrations/common/set_agent_name.rst

        .. code-block:: console

         # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP> -v C:\Program Files (x86)\ossec-agent\rootCA.pem

        .. note::

         Note that this method must include the ``-v option`` that indicates the location of the CA. If this option is not included, a warning message will be displayed and the connection will be established without verifying the manager.

     3. Edit the agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

      .. include:: ../../_templates/registrations/common/client_server_section.rst

     4. Start the agent.

      .. include:: ../../_templates/registrations/windows/start_agent.rst



    .. group-tab:: MacOS X host

     Open a session in the MacOS X agent host as a ``root`` user.

     1. Copy the CA (``.pem`` file) previously created on the manager to the ``/Library/Ossec/etc`` folder:

       .. code-block:: console

         # cp rootCA.pem /Library/Ossec/etc

     2. Run the ``agent-auth`` program providing the manager’s IP address and location of the CA:

        .. include:: ../../_templates/registrations/common/set_agent_name.rst

        .. code-block:: console

         # /Library/Ossec/bin/agent-auth -m <manager_IP> -v /Library/Ossec/etc/rootCA.pem

        .. note::

         Note that this method must include the ``-v option`` that indicates the location of the CA. If this option is not included, a warning message will be displayed and the connection will be established without verifying the manager.

     3. Edit the agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

      .. include:: ../../_templates/registrations/common/client_server_section.rst

     4. Start the agent.

      .. code-block:: console

       # /Library/Ossec/bin/ossec-control start



 .. group-tab:: Registration with Agent verification

   To verify the Wazuh agent using an SSL, create an SSL certificate for the agent and sign it using Certificate of Authority (CA) created in the previous section. This will allow the manager to ensure that the correct agent is beeing connected during the registration service.

   .. image:: ../../images/manual/managing-agents/SSLregister2.png
    :align: center
    :width: 100%

   To register verified by SSL agent first complete the steps for the chosen verification method in a **Manager** section and then, follow the steps for the corresponding **Agent** host OS.

   **Manager**

   .. tabs::

    .. group-tab:: Enable Agent verification without host validation

     .. _agent-verification-without-host-validation:

     Enable Agent verification without host validation
     -------------------------------------------------

     This example shows the creation of a certificate for the agents without specifying their hostname or IP address. This will allow to share the same certificate among all selected agents. The signed certificate will verify the agent. Registration service for agents where the certificate is not present will be refused.

     1. Issue and sign a certificate for the agent by executing the following commands in the location of CA files. Remember to not enter the ``common name`` field:

       .. code-block:: console

        # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -batch
        # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

     2. Copy the CA (``.pem`` file) to the ``/var/ossec/etc`` folder:

       .. code-block:: console

        # cp rootCA.pem /var/ossec/etc

     3. Modify the ``/var/ossec/etc/ossec.conf`` file to enable the host verification. Uncomment the ``<auth><ssl_agent_ca>`` section and add the path to the ``CA`` file.

       .. code-block:: xml

        <auth>
          ...
          <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
          ...
        </client>

     4. Restart the manager:

       .. include:: ../../_templates/registrations/common/restart_manager.rst

    .. group-tab:: Enable Agent verification with host validation

     .. _agent-verification-with-host-validation:

     This example shows the creation of a certificate for the agent binding its IP address as seen by the manager.

     1. Issue and sign a certificate for the agent by executing the following commands in the location of ``CA`` files. In the ``common name`` field replace ``<agent_IP>`` with the agent's hostname or IP address.

       .. code-block:: console

        # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=<agent_IP>'
        # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

     2. Copy the CA (**.pem file**) to the ``/var/ossec/etc`` folder:

       .. code-block:: console

        # cp rootCA.pem /var/ossec/etc

     3. Modify the ``/var/ossec/etc/ossec.conf`` file to enable the host verification. Uncomment the ``<auth><ssl_agent_ca>`` section and add the path to the ``CA`` file. Set the field ``<ssl_verify_host>`` to ``yes``:

       .. code-block:: xml

        <auth>
          ...
          <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
          <ssl_verify_host>yes</ssl_verify_host>
          ...
        </client>

     4. Restart the manager:

       .. include:: ../../_templates/registrations/common/restart_manager.rst

   **Agent**

   Copy the newly created certificate (``.cert`` file) and key (``.key`` file) to the agent. In this example, the certificate file is ``sslagent.cert`` and the key is ``sslagent.key``.

   Choose the tab corresponding to the agent host operating system:

   .. tabs::

    .. group-tab:: Linux/Unix host

     Open a session in the Linux/Unix agent host as a ``root`` user.

     1. Copy the certificate (``.cert`` file) and its key (``.key`` file), previously created on the manager, to the ``/var/ossec/etc`` folder:

       .. code-block:: console

          # cp sslagent.cert sslagent.key /var/ossec/etc

     2. Run the ``agent-auth`` program which automatically add the agent to the manager:

       .. include:: ../../_templates/registrations/common/set_agent_name.rst

       .. code-block:: console

          # /var/ossec/bin/agent-auth -m <manager_IP> -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key

     3. Edit the agent's ``/var/ossec/etc/ossec.conf`` configuration file:

      .. include:: ../../_templates/registrations/common/client_server_section.rst

     3. Start the agent.

      .. include:: ../../_templates/registrations/linux/start_agent.rst



    .. group-tab:: Windows host

      Open a session in the Windows agent host and start a CMD or a Powershell as an ``Administrator``.

      .. include:: ../../_templates/registrations/windows/installation_directory.rst

      1. Copy the certificate (``.cert`` file) and its key (``.key`` file), previously created on the manager, to the ``C:\Program Files (x86)\ossec-agent`` folder:

       .. code-block:: console

        # cp sslagent.cert sslagent.key C:\Program Files (x86)\ossec-agent

      2. Run the ``agent-auth`` program which automatically adds the agent to the manager:

       .. include:: ../../_templates/registrations/common/set_agent_name.rst

       .. code-block:: console

       	# C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP> -x C:\Program Files (x86)\ossec-agent\sslagent.cert -k C:\Program Files (x86)\ossec-agent\sslagent.key

      3. Edit the agent's ``C:\Program Files (x86)\ossec-agent\ossec.conf`` configuration file:

        .. include:: ../../_templates/registrations/common/client_server_section.rst

      4. Start the agent.

        .. include:: ../../_templates/registrations/windows/start_agent.rst



    .. group-tab:: MacOS X host

       Open a session in the MacOS X agent host as a ``root`` user.

       1. Copy the certificate (``.cert`` file) and its key (``.key`` file), previously created on the manager, to the ``/Library/Ossec/etc`` folder:

          .. code-block:: console

             # cp sslagent.cert sslagent.key /Library/Ossec/etc

       2. Run the ``agent-auth`` program which automatically add the agent to the manager:

          .. include:: ../../_templates/registrations/common/set_agent_name.rst

          .. code-block:: console

             # /Library/Ossec/bin/agent-auth -m <manager_IP> -x /Library/Ossec/etc/sslagent.cert -k /Library/Ossec/etc/sslagent.key

       2. Edit the agent's ``/Library/Ossec/etc/ossec.conf`` configuration file:

        .. include:: ../../_templates/registrations/common/client_server_section.rst

       3. Start the agent.

        .. include:: ../../_templates/registrations/macosx/start_agent.rst
