.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This method uses SSL certificates to verify that a Wazuh agent is authorized to enroll in the Wazuh manager. Learn more in this section of the documentation.

Wazuh agent identity verification
=================================

This method uses SSL certificates to verify that a Wazuh agent is authorized to enroll in the Wazuh manager. The Wazuh manager and Wazuh agent verification are independent of each other. However, it is possible to use a combination of both.

Learn about Wazuh agent identity verification steps in the sections below.

.. contents::
   :local:
   :depth: 3
   :backlinks: none

Prerequisites
-------------

You need a certificate authority to sign certificates for the Wazuh manager and Wazuh agents. Perform the following prerequisites on your Wazuh manager if you do not have an already configured certificate authority:

#. Navigate to the ``/etc/wazuh-manager`` folder of your Wazuh manager.

   .. code-block:: console

      # cd /etc/wazuh-manager

#. Run the following command on the Wazuh manager to use it as the certificate authority:

   .. code-block:: console

      # openssl req -x509 -new -nodes -days 3650 -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Wazuh"

The root certificate is created and saved as the ``rootCA.pem`` file. It is valid for 3650 days (10 years). The CA must stay valid longer than the certificates it signs, which last 365 days.

Wazuh agent verification options
--------------------------------

In the prerequisite section, we create a root certificate authority on the Wazuh manager, which generates ``rootCA.key`` and ``rootCA.pem``.

Later, we generate a Certificate Signing Request (CSR) ``sslagent.csr`` and private key ``sslagent.key`` for the Wazuh agent.

The CA files ``rootCA.pem`` and ``rootCA.key`` are then used to sign ``sslagent.csr``, producing the agent certificate ``sslagent.cert``, which is copied together with ``sslagent.key`` to the Wazuh agent endpoint for enrollment.

The Wazuh manager verifies the certificate presented by the Wazuh agent during Wazuh agent enrollment, using the root certificate. Wazuh provides two Wazuh agent verification options:

-  Wazuh agent verification without host validation: The certificates for the Wazuh agents are issued without specifying their hostname or IP address.
-  Wazuh agent verification with host validation: The certificates for the Wazuh agents are issued with their IP address as a subject alternative name (SAN). The Wazuh manager accepts each certificate only from the address it names.

The difference between these validation methods is that the certificate in the former method can be reused on multiple agents, while the certificate created in the latter can only be used on the Wazuh agent whose IP address was specified during certificate generation.

Host validation is off by default. Turn it on in the Wazuh manager configuration, as step 5 shows: ``<verification_mode>full</verification_mode>``. Wazuh agents must have their IP address as an IP entry in the SAN, because the common name isn't checked.

Wazuh manager configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Generate a certificate signing request (CSR) for the Wazuh agent on the Wazuh manager:

   -  Wazuh agent verification without host validation: This is done without specifying the IP address or hostname of the Wazuh agent.

      .. code-block:: console

         # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -batch

   -  Wazuh agent verification with host validation: This is done by specifying the IP address or hostname of the Wazuh agent.

      .. code-block:: console

         # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=<WAZUH_AGENT_IP_ADDRESS>'

   Where:

   -  ``sslagent.csr`` is the CSR to be submitted to the certificate authority.
   -  ``sslagent.key`` is the generated CSR private key.

#. Sign the generated agent CSR using the CA keys:

   .. code-block:: console

      # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

   For Wazuh agent verification with host validation, add the IP address of the Wazuh agent to the certificate as a subject alternative name (SAN):

   .. code-block:: console

      # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial -extfile <(printf "subjectAltName=IP:<WAZUH_AGENT_IP_ADDRESS>")

   Where:

   -  ``sslagent.csr`` is the CSR to be submitted to the certificate authority.
   -  ``sslagent.cert`` is the SSL certificate signed by the CSR.
   -  ``rootCA.pem`` is the root certificate for the CA.
   -  ``rootCA.key`` is the root certificate private key for the CA.

#. Copy the signed SSL certificate and key (``sslagent.cert`` and ``sslagent.key`` in this case) to the Wazuh agent. You can use a tool like SCP to copy the certificate to the endpoints:

   .. code-block:: console

      # scp sslagent.key  ubuntu@<IP_ADDRESS>:/home/ubuntu
      # scp sslagent.cert ubuntu@<IP_ADDRESS>:/home/ubuntu

#. Ensure that the ``rootCA.pem`` file is in the ``/etc/wazuh-manager/`` directory on the Wazuh manager.

#. Update the ``/etc/wazuh-manager/wazuh-manager.conf`` file with the location of the ``rootCA.pem`` file to enable the use of certificates.

   Wazuh agents enroll and connect on port 1517. Set the CA and the ``<verification_mode>`` option in the ``<https>`` block of the ``<remote>`` section:

   .. code-block:: xml

      <remote>
         ...
         <https>
           <ca>/etc/wazuh-manager/rootCA.pem</ca>
           <verification_mode>certificate</verification_mode>
         </https>
      </remote>

   These settings apply to all the traffic on port 1517, not only to enrollment. Every Wazuh agent then needs a certificate signed by this CA, or the Wazuh manager refuses its connection. ``certificate`` is also the mode the Wazuh manager uses when ``<ca>`` is set without a ``<verification_mode>``, and it logs a warning when it does. See :ref:`reference_wazuh_manager_conf_remote` for the allowed values.

   For Wazuh agent verification with host validation, set ``<verification_mode>full</verification_mode>`` in the ``<https>`` block. The Wazuh manager then refuses, with HTTP 403, a Wazuh agent whose certificate doesn't list the address it connects from. Behind a load balancer or proxy that terminates TLS, that address is the proxy's. The address must be an IP entry in the subject alternative name of the certificate of the Wazuh agent. The CN isn't checked.

   .. note::

      With ``<verification_mode>`` set to ``certificate`` or ``full``, the Wazuh manager rejects remote upgrades to Wazuh 5.0.0 or later unless the upgrade request sets ``force_upgrade``. Upgrades with a custom WPK can't be forced. After you change ``<verification_mode>``, restart ``wazuh-manager-modulesd`` as well as ``wazuh-manager-remoted``, or upgrade requests keep using the previous value.

#. Restart the Wazuh manager service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Linux/Unix
^^^^^^^^^^

Follow these steps to enroll a Linux/Unix endpoint by using certificates for agent verification.

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) for the Wazuh agent have been copied to the endpoint. Move ``sslagent.cert`` and ``sslagent.key`` to ``/var/ossec/etc/``.

#. Assign the right permissions and ownership to the ``sslagent.key`` and ``sslagent.cert`` files.

   .. code-block:: console

      # chown root:wazuh sslagent.key sslagent.cert
      # chmod 640 sslagent.key sslagent.cert

#. Modify the Wazuh agent configuration file located at ``/var/ossec/etc/ossec.conf``, and include the following:

   .. code-block:: xml
      :emphasize-lines: 4

      <ossec_config>
        <agent>
          <manager>
            <endpoint><WAZUH_MANAGER_ADDRESS></endpoint>
          </manager>
          <ssl>
            <certificate>/var/ossec/etc/sslagent.cert</certificate>
            <key>/var/ossec/etc/sslagent.key</key>
          </ssl>
        </agent>
      </ossec_config>

#. Restart the Wazuh agent to make the changes effective:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Click on the upper-left menu icon and navigate to **Agents management** > **Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, the Wazuh dashboard displays an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/linux-agent-verification-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - Linux
      :alt: Check newly enrolled Wazuh agent - Linux
      :align: center
      :width: 80%

Windows
^^^^^^^

Follow these steps to enroll a Windows endpoint by using certificates for the Wazuh agent verification:

The Wazuh agent is a 32-bit application. Its installation directory depends on the Windows operating system architecture:

-  On a 64-bit Windows operating system, Windows installs the Wazuh agent in ``C:\Program Files (x86)\ossec-agent``
-  On a 32-bit Windows operating system, Windows installs the Wazuh agent in ``C:\Program Files\ossec-agent``

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) have been copied to the endpoint.

#. Using an administrator account, modify the Wazuh agent configuration file located at ``C:\Program Files (x86)\ossec-agent\ossec.conf`` and include the following:

   .. code-block:: xml
      :emphasize-lines: 4

      <ossec_config>
        <agent>
          <manager>
            <endpoint><WAZUH_MANAGER_ADDRESS></endpoint>
          </manager>
          <ssl>
            <certificate>/<PATH_TO>/sslagent.cert</certificate>
            <key>/<PATH_TO>/sslagent.key</key>
          </ssl>
        </agent>
      </ossec_config>

#. Restart the Wazuh agent to make the changes effective.

   .. tabs::

      .. group-tab:: PowerShell (as an administrator)

         .. code-block:: pwsh-session

            > Restart-Service -Name WazuhSvc

      .. group-tab:: CMD (as an administrator)

         .. code-block:: doscon

            > net stop WazuhSvc
            > net start WazuhSvc

#. Click on the upper-left menu icon and navigate to **Agents management** > **Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, the Wazuh dashboard displays an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/windows-agent-verification-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - Windows
      :alt: Check newly enrolled Wazuh agent - Windows
      :align: center
      :width: 80%

macOS
^^^^^

Follow these steps to enroll a macOS endpoint by using certificates for Wazuh agent verification.

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) for the Wazuh agent have been copied to the endpoint.

#. Launch the terminal, obtain root access, edit the Wazuh agent configuration file located at ``/Library/Ossec/etc/ossec.conf``, and include the following:

   .. code-block:: xml
      :emphasize-lines: 4

      <ossec_config>
        <agent>
          <manager>
            <endpoint><WAZUH_MANAGER_ADDRESS></endpoint>
          </manager>
          <ssl>
            <certificate>/<PATH_TO>/sslagent.cert</certificate>
            <key>/<PATH_TO>/sslagent.key</key>
          </ssl>
        </agent>
      </ossec_config>

#. Restart the Wazuh agent to make the changes effective:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control restart

#. Click on the upper-left menu icon and navigate to **Agents management** > **Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, the Wazuh dashboard displays an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/macOS-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - macOS
      :alt: Check newly enrolled Wazuh agent - macOS
      :align: center
      :width: 80%
