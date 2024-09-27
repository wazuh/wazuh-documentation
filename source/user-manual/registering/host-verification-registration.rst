.. Copyright (C) 2020 Wazuh, Inc.

.. _host-verification-registration:

Registration service with host verification
===========================================

Using verification with an SSL key certificate ensures that the connection between the right Wazuh agent and the right Wazuh manager is established.

Creating a Certificate of Authority (CA)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Registration service with SSL certification requires the creation of a Certificate of Authority used to sign certificates for the Wazuh manager and the Wazuh agents. The hosts will receive a copy of this CA in order to verify the remote certificate.

To generate the certificate execute the following command:

.. code-block:: console

 # openssl req -x509 -new -nodes -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Manager"

.. warning::

 The newly created ``rootCA.key`` file is the **private key** of the CA. It is needed to sign other certificates and it is critical to keep it secure. **Never copy this file to other hosts**.

Available options to verify the hosts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are two options to register the Wazuh agent using host verification. Please note, that both, the Wazuh agent verification as well as the Wazuh manager verification can be used in the registration process:

.. tabs::

 .. group-tab:: Registration with Wazuh manager verification

   To verify the Wazuh manager using SSL, create an SSL certificate and sign it using the Certificate of Authority (CA) created in the previous section. This will allow the Wazuh agents to ensure that they are connected to the correct Wazuh manager during the registration service.

   .. thumbnail:: ../../images/manual/managing-agents/SSLregister1.png
      :align: center
      :wrap_image: No

   **Creating and signing a certificate on the Wazuh manager**


   Follow these steps in the Wazuh manager's host:


   #. Create the configuration file ``req.conf``, replacing ``<manager_IP>`` with the hostname or the IP address of the Wazuh server where the Wazuh agents are going to be registered. The configuration file could be as follows:

         .. code-block:: console

          [req]
          distinguished_name = req_distinguished_name
          req_extensions = req_ext
          prompt = no
          [req_distinguished_name]
          C = US
          CN = <manager_IP>
          [req_ext]
          subjectAltName = @alt_names
          [alt_names]
          DNS.1 = wazuh
          DNS.2 = wazuh.com

         .. note:: The ``subjectAltName`` extension is optional but necessary to allow the registration of Wazuh agents with a SAN certificate. In this case, the Wazuh server DNS are ``wazuh`` and ``wazuh.com``.


   #. Issue and sign the certificate for the Wazuh manager:

         .. code-block:: console

          # openssl req -new -nodes -newkey rsa:4096 -keyout sslmanager.key -out sslmanager.csr -config req.conf
          # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial -extfile req.conf -extensions req_ext

         .. note::

           The ``-extfile`` and ``-extensions`` options are required to copy the subject and the extensions from ``sslmanager.csr`` to ``sslmanager.cert``. This allows the registration of the Wazuh agents with a SAN certificate.


   #. Copy the certificate and the key to the ``/var/ossec/etc`` folder:

         .. code-block:: console

          # cp sslmanager.cert sslmanager.key /var/ossec/etc


   #. Restart the Wazuh manager:

     .. include:: ../../_templates/common/restart_manager.rst

   **The Wazuh agent registration using CA and enabling the communication with the Wazuh manager**

   Copy the CA file (``.pem``) to the Wazuh agent's host. In this example, the CA file is ``rootCA.pem``.

   Choose the tab corresponding to the wazuh agent's host operating system:

   .. tabs::

    .. group-tab:: Linux/Unix host

     Open a terminal in the Linux/Unix Wazuh agent's host as a ``root`` user.


     #. Copy the CA (``.pem`` file) previously created on the Wazuh manager to the ``/var/ossec/etc`` folder:

         .. code-block:: console

           # cp rootCA.pem /var/ossec/etc


     #. To register the Wazuh agent, run the ``agent-auth`` utility providing the Wazuh manager’s IP address and location of the CA:

         .. code-block:: console

           # /var/ossec/bin/agent-auth -m <manager_IP> -v /var/ossec/etc/rootCA.pem

         .. include:: ../../_templates/registrations/common/set_agent_name.rst

         .. note::

           Note that this method must include the ``-v option`` that indicates the location of the CA. If this option is not included, a warning message will be displayed and the connection will be established without verifying the Wazuh manager.


     #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/var/ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


     #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/linux/restart_agent.rst

     The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



    .. group-tab:: Windows host

     Open a Powershell or CMD session in the Windows Wazuh agent's host and start a CMD or a Powershell as an ``Administrator``.

     .. include:: ../../_templates/windows/installation_directory.rst


     #. Copy the CA (``.pem`` file) previously created on the Wazuh manager to the ``C:\Program Files (x86)\ossec-agent`` folder:

         .. code-block:: console

           # cp rootCA.pem C:\Program Files (x86)\ossec-agent


     #. To register the Wazuh agent, run the ``agent-auth`` utility providing the Wazuh manager’s IP address and location of the CA:

         .. code-block:: console

           # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP> -v C:\Program Files (x86)\ossec-agent\rootCA.pem

         .. include:: ../../_templates/registrations/common/set_agent_name.rst

         .. note::

           Note that this method must include the ``-v option`` that indicates the location of the CA. If this option is not included, a warning message will be displayed and the connection will be established without verifying the Wazuh manager.


     #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``C:\Program Files (x86)\ossec-agent\ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


     #. Restart the Wazuh agent:

      .. include:: ../../_templates/common/windows/restart_agent.rst

     The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



    .. group-tab:: MacOS X host

     Open a terminal in the MacOS X Wazuh agent's host as a ``root`` user.


     #. Copy the CA (``.pem`` file) previously created on the Wazuh manager to the ``/Library/Ossec/etc`` folder:

         .. code-block:: console

           # cp rootCA.pem /Library/Ossec/etc


     #. To register the Wazuh agent, run the ``agent-auth`` utility providing the Wazuh manager’s IP address and location of the CA:

         .. code-block:: console

           # /Library/Ossec/bin/agent-auth -m <manager_IP> -v /Library/Ossec/etc/rootCA.pem

         .. include:: ../../_templates/registrations/common/set_agent_name.rst

         .. note::

           Note that this method must include the ``-v option`` that indicates the location of the CA. If this option is not included, a warning message will be displayed and the connection will be established without verifying the Wazuh manager.


     #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/Library/Ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


     #. Restart the Wazuh agent:

      .. code-block:: console

       # /Library/Ossec/bin/ossec-control restart

     The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



 .. group-tab:: Registration with Wazuh agent verification

   To verify the Wazuh agent using an SSL, create an SSL certificate for the Wazuh agent and sign it using Certificate of Authority (CA) created in the previous section. This will allow the Wazuh manager to ensure that the correct Wazuh agent is beeing connected during the registration service.

   .. thumbnail:: ../../images/manual/managing-agents/SSLregister2.png
    :align: center
    :wrap_image: No

   **Creating and signing the Wazuh agent's certificate and enabling the host verification option on the Wazuh manager**

   .. tabs::

    .. group-tab:: Enable Wazuh agent verification without host validation

     .. _agent-verification-without-host-validation:

     This example shows the creation of the certificate for the Wazuh agents without specifying their hostname or IP address. This will allow to share the same certificate among all selected Wazuh agents. The signed certificate will verify the Wazuh agent. Registration service for Wazuh agents where the certificate is not present will be refused.


     #. Issue and sign the certificate for the Wazuh agent by executing the following commands in the location of CA files. Remember not to enter the ``common name`` field:

         .. code-block:: console

          # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -batch -subj '/C=US/ST=CA/O=Manager'
          # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial


     #. Copy the CA (``.pem`` file) to the ``/var/ossec/etc`` folder:

         .. code-block:: console

          # cp rootCA.pem /var/ossec/etc


     #. Modify the ``/var/ossec/etc/ossec.conf`` file to enable the host verification. Uncomment the ``<auth><ssl_agent_ca>`` section and add the path to the ``CA`` file.

         .. code-block:: xml

          <auth>
            ...
            <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
            ...
          </client>


     #. Restart the Wazuh manager:

       .. include:: ../../_templates/common/restart_manager.rst



    .. group-tab:: Enable Wazuh agent verification with host validation

     .. _agent-verification-with-host-validation:

     This example shows the creation of the certificate for the Wazuh agent binding its IP address as seen by the Wazuh manager.


     #. Issue and sign the certificate for the Wazuh agent by executing the following commands in the location of ``CA`` files. In the ``common name`` field replace ``<agent_IP>`` with the Wazuh agent's hostname or IP address.

         .. code-block:: console

          # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=<agent_IP>'
          # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial


     #. Copy the CA (**.pem file**) to the ``/var/ossec/etc`` folder:

         .. code-block:: console

          # cp rootCA.pem /var/ossec/etc


     #. Modify the ``/var/ossec/etc/ossec.conf`` file to enable the host verification. Uncomment the ``<auth><ssl_agent_ca>`` section and add the path to the ``CA`` file. Set the field ``<ssl_verify_host>`` to ``yes``:

         .. code-block:: xml

          <auth>
            ...
            <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
            <ssl_verify_host>yes</ssl_verify_host>
            ...
          </client>

     #. Restart the Wazuh manager:

       .. include:: ../../_templates/common/restart_manager.rst



   **The Wazuh agent registration using the certificate and the key and enabling the communication with the Wazuh manager**

   Copy the newly created certificate (``.cert`` file) and key (``.key`` file) to the Wazuh agent. In this example, the certificate file is ``sslagent.cert`` and the key is ``sslagent.key``.

   Choose the tab corresponding to the wazuh agent's host operating system:

   .. tabs::

    .. group-tab:: Linux/Unix host

     Open a terminal in the Linux/Unix Wazuh agent's host as a ``root`` user.


     #. Copy the certificate (``.cert`` file) and its key (``.key`` file), previously created on the Wazuh manager, to the ``/var/ossec/etc`` folder:

         .. code-block:: console

            # cp sslagent.cert sslagent.key /var/ossec/etc


     #. To register the Wazuh agent, run the ``agent-auth`` utility which automatically adds the Wazuh agent to the Wazuh manager:

         .. code-block:: console

            # /var/ossec/bin/agent-auth -m <manager_IP> -x /var/ossec/etc/sslagent.cert -k /var/ossec/etc/sslagent.key

         .. include:: ../../_templates/registrations/common/set_agent_name.rst


     #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``/var/ossec/etc/ossec.conf``.

         .. include:: ../../_templates/registrations/common/client_server_section.rst


     #. Restart the Wazuh agent:

       .. include:: ../../_templates/common/linux/restart_agent.rst

     The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.



    .. group-tab:: Windows host

      Open a Powershell or CMD session in the Windows Wazuh agent's host and start a CMD or a Powershell as an ``Administrator``.

      .. include:: ../../_templates/windows/installation_directory.rst


      #. Copy the certificate (``.cert`` file) and its key (``.key`` file), previously created on the Wazuh manager, to the ``C:\Program Files (x86)\ossec-agent`` folder:

         .. code-block:: console

           # cp sslagent.cert sslagent.key C:\Program Files (x86)\ossec-agent


      #. To register the Wazuh agent, run the ``agent-auth`` utility which automatically adds the Wazuh agent to the Wazuh manager:

         .. code-block:: console

         	 # C:\Program Files (x86)\ossec-agent\agent-auth.exe -m <manager_IP> -x C:\Program Files (x86)\ossec-agent\sslagent.cert -k C:\Program Files (x86)\ossec-agent\sslagent.key

         .. include:: ../../_templates/registrations/common/set_agent_name.rst


      #. To enable the communication with the Wazuh manager, edit the Wazuh agent's configuration file placed at ``C:\Program Files (x86)\ossec-agent\ossec.conf``.

           .. include:: ../../_templates/registrations/common/client_server_section.rst


      #. Restart the Wazuh agent:

        .. include:: ../../_templates/common/windows/restart_agent.rst



    .. group-tab:: MacOS X host

       Open a terminal in the MacOS X Wazuh agent's host as a ``root`` user.


       #. Copy the certificate (``.cert`` file) and its key (``.key`` file), previously created on the Wazuh manager, to the ``/Library/Ossec/etc`` folder:

            .. code-block:: console

               # cp sslagent.cert sslagent.key /Library/Ossec/etc


       #. To register the Wazuh agent, run the ``agent-auth`` utility which automatically adds the Wazuh agent to the Wazuh manager:

            .. code-block:: console

               # /Library/Ossec/bin/agent-auth -m <manager_IP> -x /Library/Ossec/etc/sslagent.cert -k /Library/Ossec/etc/sslagent.key

            .. include:: ../../_templates/registrations/common/set_agent_name.rst


       #. To enable the communication with the Wauh manager, edit the Wazuh agent's configuration file placed at ``/Library/Ossec/etc/ossec.conf``.

            .. include:: ../../_templates/registrations/common/client_server_section.rst


       #. Restart the Wazuh agent:

          .. include:: ../../_templates/common/macosx/restart_agent.rst

       The Wazuh agent registration can be adjusted by using different :ref:`agent-auth` options.
