.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This method uses SSL certificates to verify the Wazuh manager's identity before a Wazuh agent sends its enrollment request.

Wazuh manager identity verification
===================================

This method uses SSL certificates to verify the identity of the Wazuh manager before a Wazuh agent sends the enrollment request. The Wazuh manager verification and the :doc:`Wazuh agent verification <agent-identity-verification>` are independent. However, it is possible to use a combination of both.

Learn about Wazuh manager identity verification steps in the sections below:

.. contents::
   :local:
   :depth: 3
   :backlinks: none

Prerequisites
-------------

You need a certificate authority to sign certificates for the Wazuh manager and Wazuh agents. In the absence of an already configured certificate authority, run the following command on the Wazuh manager to use it as the certificate authority:

.. code-block:: console

   # openssl req -x509 -new -nodes -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Wazuh"

The root certificate is created and saved as the ``rootCA.pem`` file.

Wazuh agents enrollment with token
----------------------------------

Wazuh 5.0 agents verify the identity of the Wazuh manager using an enrollment token. The token carries the Wazuh manager address, the enrollment credential, and a pin of the certificate authority (CA) that signs the Wazuh manager certificate. During enrollment, the Wazuh agent installs that CA as its trust anchor and verifies the Wazuh manager certificate against it, including the hostname. You don't need to copy a CA file to the endpoint or edit the ``ossec.conf`` file.

#. Create a token on the Wazuh manager for the address the Wazuh agents connect to. In a cluster, run this command on the master node. The address must be included in the subject alternative names (SAN) of the Wazuh manager certificate:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <WAZUH_MANAGER_ADDRESS>

   The token is displayed only once. Store it securely, as no command retrieves it later. Tokens expire after 30 days by default. Use ``--ttl`` to change this.

   By default, the Wazuh agent downloads the CA from the Wazuh manager and installs it only if it matches the pin in the token. To include the CA certificate in the token instead, so the Wazuh agent doesn't download it, add the ``--embed-ca`` option:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <WAZUH_MANAGER_ADDRESS> --embed-ca

#. Install the Wazuh agent with the token.

   Replace ``<TOKEN>`` with the token you created:

   -  Debian-based endpoints:

      .. code-block:: console

         # WAZUH_ENROLLMENT_TOKEN='<TOKEN>' dpkg -i wazuh-agent_*.deb

   -  Red Hat-based endpoints:

      .. code-block:: console

         # WAZUH_ENROLLMENT_TOKEN='<TOKEN>' rpm -ivh wazuh-agent-*.rpm

   -  macOS endpoints:

      .. code-block:: console

         # echo "WAZUH_ENROLLMENT_TOKEN='<TOKEN>'" > /tmp/wazuh_envs && installer -pkg wazuh-agent-*.pkg -target /

   -  Windows endpoints. Replace ``<WAZUH_AGENT_MSI>`` with the file name of the package you downloaded:

      .. code-block:: doscon

         > msiexec.exe /i <WAZUH_AGENT_MSI> /q WAZUH_ENROLLMENT_TOKEN="<TOKEN>"

   For a Wazuh agent that is already installed, save the token to a file, stop the Wazuh agent, and run ``wazuh-agent-auth`` from the ``bin`` directory of the Wazuh agent installation. For example, on Linux:

   .. code-block:: console

      # /var/ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE>

#. Start the Wazuh agent:

   Linux:

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable --now wazuh-agent

   Windows (PowerShell):

   .. code-block:: pwsh-session

      > Start-Service -Name wazuh

   macOS:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control start

The Wazuh agent saves the CA as its trust anchor in ``etc/certs/root-ca.pem`` (``certs\root-ca.pem`` on Windows) and verifies the Wazuh manager certificate on every connection, without any ``<ssl>`` configuration.

To use your own certificate authority instead, follow the steps in the sections below.

.. _manager-identity-validation:

Wazuh manager identity validation
---------------------------------

In this process, the Wazuh manager generates an SSL certificate using the Certificate Authority (CA). Subsequently, during the agent enrollment, the Wazuh agent verifies the Wazuh manager certificate using the root certificate of the CA.

Wazuh manager configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Generate an SSL certificate on the Wazuh manager signed by the certificate authority. The steps to generate an SSL certificate for the Wazuh manager are as follows:

#. Create a certificate request configuration file ``req.conf`` on the Wazuh manager. Replace ``<WAZUH_MANAGER_IP>`` with the IP address or fully qualified domain name (FQDN) of the Wazuh manager where the Wazuh agents will be enrolled. The contents of the file can be as follows:

   .. code-block:: ini
      :emphasize-lines: 7

      [req]
      distinguished_name = req_distinguished_name
      req_extensions = req_ext
      prompt = no
      [req_distinguished_name]
      C = US
      CN = <WAZUH_MANAGER_IP>
      [req_ext]
      subjectAltName = @alt_names
      [alt_names]
      DNS.1 = wazuh
      DNS.2 = wazuh.com

   Where:

   -  ``C`` is the country where the organization making this request is domiciled.
   -  ``CN`` is the common name on the certificate. This should be the IP address or FQDN of the Wazuh manager. This field is not optional.
   -  ``subjectAltName`` is optional and specifies the alternate subject names that can be used for the server. It should be included to allow the enrollment of the Wazuh agents with a SAN certificate.
   -  ``DNS.1`` and ``DNS.2`` refer to the additional identities that the certificate should be valid for. In this case, the Wazuh manager DNS names are wazuh and wazuh.com.

#. Create a certificate signing request (CSR) on the Wazuh manager with the following command. The CSR will be used to request a digital certificate from a Certificate Authority (CA):

   .. code-block:: console

      # openssl req -new -nodes -newkey rsa:4096 -keyout sslmanager.key -out sslmanager.csr -config req.conf

   Where:

   -  ``req.conf`` is the certificate request configuration file.
   -  ``sslmanager.key`` is the private key for the certificate request.
   -  ``sslmanager.csr`` is the CSR to be submitted to the certificate authority.

#. Issue and sign the certificate for the Wazuh manager CSR with the following command:

   .. code-block:: console

      # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial -extfile req.conf -extensions req_ext

   Where:

   -  ``req.conf`` is the certificate request configuration file.
   -  ``sslmanager.csr`` is the CSR to be submitted to the certificate authority.
   -  ``sslmanager.cert`` is the SSL certificate signed by the CSR.
   -  ``rootCA.pem`` is the root certificate for the CA.
   -  The ``-extfile`` and ``-extensions`` options are required to copy the subject and the extensions from ``sslmanager.csr`` to ``sslmanager.cert``.

   .. code-block:: none
      :class: output

      Certificate request self-signature ok
      subject=C=US, CN=192.168.xxx.xxx

#. Copy the newly signed certificate and key files to ``/var/wazuh-manager/etc`` on the Wazuh manager:

   .. code-block:: console

      # cp sslmanager.cert sslmanager.key /var/wazuh-manager/etc

#. Restart the Wazuh manager to apply the changes made:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Configure the new certificate on the Wazuh manager. Edit the ``<auth>`` section of the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file:

   .. code-block:: xml

      <auth>
        <ssl_manager_cert>etc/sslmanager.cert</ssl_manager_cert>
        <ssl_manager_key>etc/sslmanager.key</ssl_manager_key>
      </auth>

   Without this step the manager keeps using its default certificate (``etc/certs/remoted.pem``) and never loads the one you just created.

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Linux/Unix
^^^^^^^^^^

Follow the steps below to enroll a Linux/Unix endpoint by using certificates to verify the identity of the Wazuh manager:

#. Ensure that the root certificate authority ``rootCA.pem`` file has been copied to the endpoint.

#. Obtain root access, modify the Wazuh agent configuration file located at ``/var/ossec/etc/ossec.conf``, and include the following:

   **Wazuh 5.0 agents**:

   .. code-block:: xml
      :emphasize-lines: 4,7

      <ossec_config>
        <agent>
          <manager>
            <endpoint><WAZUH_MANAGER_IP_ADDRESS></endpoint>
          </manager>
          <ssl>
            <certificate_authorities>/<PATH_TO>/rootCA.pem</certificate_authorities>
            <verification_mode>full</verification_mode>
          </ssl>
        </agent>
      </ossec_config>

   **Wazuh 4.x agents**:

   .. code-block:: xml
      :emphasize-lines: 4,7

      <ossec_config>
        <client>
          <server>
            <address><WAZUH_MANAGER_IP_ADDRESS></address>
          </server>
          <enrollment>
            <server_ca_path>/<PATH_TO>/rootCA.pem</server_ca_path>
          </enrollment>
        </client>
      </ossec_config>

#. Restart the Wazuh agent to make the changes effective:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Click on the upper-left menu icon and navigate to **Agents management** > **Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, the Wazuh dashboard displays an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/linux-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - Linux
      :alt: Check newly enrolled Wazuh agent - Linux
      :align: center
      :width: 80%

Windows
^^^^^^^

Follow these steps to enroll a Windows endpoint by using certificates to verify the Wazuh manager identity:

The Wazuh agent installation directory depends on the architecture of the host.

-  ``C:\Program Files (x86)\ossec-agent`` for 64-bit systems.
-  ``C:\Program Files\ossec-agent`` for 32-bit systems.

#. Ensure that the root certificate authority ``rootCA.pem`` file has been copied to the endpoint.

#. Using an administrator account, modify the Wazuh agent configuration file located at ``C:\Program Files (x86)\ossec-agent\ossec.conf`` and include the following:

   **Wazuh 5.0 agents**:

   .. code-block:: xml
      :emphasize-lines: 4,7

      <ossec_config>
        <agent>
          <manager>
            <endpoint><WAZUH_MANAGER_IP_ADDRESS></endpoint>
          </manager>
          <ssl>
            <certificate_authorities>C:\<PATH_TO>\rootCA.pem</certificate_authorities>
            <verification_mode>full</verification_mode>
          </ssl>
        </agent>
      </ossec_config>

   **Wazuh 4.x agents**:

   .. code-block:: xml
      :emphasize-lines: 4,7

      <ossec_config>
        <client>
          <server>
            <address><WAZUH_MANAGER_IP_ADDRESS></address>
          </server>
          <enrollment>
            <server_ca_path>/<PATH_TO>/rootCA.pem</server_ca_path>
          </enrollment>
        </client>
      </ossec_config>

#. Restart the Wazuh agent to make the changes effective.

   .. tabs::

      .. group-tab:: PowerShell (as an administrator)

         .. code-block:: pwsh-session

            > Restart-Service -Name wazuh

      .. group-tab:: CMD (as an administrator)

         .. code-block:: doscon

            > net stop wazuh
            > net start wazuh

#. Click on the upper-left menu icon and navigate to **Agents management** > **Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, the Wazuh dashboard displays an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/windows-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - Windows
      :alt: Check newly enrolled Wazuh agent - Windows
      :align: center
      :width: 80%

macOS
^^^^^

Follow the steps below to enroll a macOS endpoint by using certificates to verify the Wazuh manager identity:

#. Ensure that the root certificate authority ``rootCA.pem`` file has been copied to the endpoint.

#. Modify the Wazuh agent configuration file located at ``/Library/Ossec/etc/ossec.conf`` with root access and include the following:

   **Wazuh 5.0 agents**:

   .. code-block:: xml
      :emphasize-lines: 4,7

      <ossec_config>
        <agent>
          <manager>
            <endpoint><WAZUH_MANAGER_IP_ADDRESS></endpoint>
          </manager>
          <ssl>
            <certificate_authorities>/<PATH_TO>/rootCA.pem</certificate_authorities>
            <verification_mode>full</verification_mode>
          </ssl>
        </agent>
      </ossec_config>

   **Wazuh 4.x agents**:

   .. code-block:: xml
      :emphasize-lines: 4,7

      <ossec_config>
        <client>
          <server>
            <address><WAZUH_MANAGER_IP_ADDRESS></address>
          </server>
          <enrollment>
            <server_ca_path>/<PATH_TO>/rootCA.pem</server_ca_path>
          </enrollment>
        </client>
      </ossec_config>

#. Restart the Wazuh agent to make the changes effective.

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control restart

#. Click on the upper-left menu icon and navigate to **Agents management** > **Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, the Wazuh dashboard displays an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/macOS-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - macOS
      :alt: Check newly enrolled Wazuh agent - macOS
      :align: center
      :width: 80%
