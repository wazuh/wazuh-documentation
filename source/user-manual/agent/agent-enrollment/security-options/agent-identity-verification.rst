.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This method uses SSL certificates to verify that a Wazuh agent is authorized to enroll in the Wazuh manager. Learn more in this section of the documentation.

Wazuh agent identity verification
=================================

This method uses SSL certificates to verify that a Wazuh agent is authorized to enroll in the Wazuh manager. The Wazuh manager and Wazuh agent verification are independent of each other. However, it is possible to use a combination of both.

Learn about Wazuh agent identity verification steps in the sections below

.. contents::
   :local:
   :depth: 3
   :backlinks: none

Prerequisites
-------------

You need a certificate authority to sign certificates for the Wazuh manager and Wazuh agents. Perform the following prerequisites on your Wazuh manager if you do not have an already configured certificate authority:

#. Navigate to the ``/var/wazuh-manager/etc`` folder of your Wazuh manager.

   .. code-block:: console

      # cd /var/wazuh-manager/etc

#. Run the following command on the Wazuh manager to use it as the certificate authority:

   .. code-block:: console

      # openssl req -x509 -new -nodes -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Wazuh"

The root certificate is created and saved as the ``rootCA.pem`` file.

Wazuh agent verification options
--------------------------------

In the prerequisite section, we create a root certificate authority on the Wazuh manager, which generates ``rootCA.key`` and ``rootCA.pem``.

Later, we generate a Certificate Signing Request (CSR) ``sslagent.csr`` and private key ``sslagent.key`` for the Wazuh agent.

The CA files ``rootCA.pem`` and ``rootCA.key`` are then used to sign ``sslagent.csr``, producing the agent certificate ``sslagent.cert``, which is copied together with ``sslagent.key`` to the Wazuh agent endpoint for enrollment.

The Wazuh manager verifies the certificate presented by the Wazuh agent during Wazuh agent enrollment, using the root certificate. Wazuh provides two Wazuh agent verification options:

-  Wazuh agent verification without host validation: The certificates for the Wazuh agents are issued without specifying their hostname or IP address.
-  Wazuh agent verification with host validation: The certificates for the Wazuh agents are issued with their IP address or hostname specified as the common name.

The difference between these validation methods is that the certificate in the former method can be reused on multiple agents, while the certificate created in the latter can only be used on the Wazuh agent whose IP address or hostname was specified during certificate generation.

Wazuh manager configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Generate a certificate signing request (CSR) for the Wazuh agent on the Wazuh manager:

   -  Wazuh agent verification without host validation: This is done without specifying the IP address or hostname of the Wazuh agent.

      .. code-block:: console

         # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -batch

   -  Wazuh agent verification with host validation: This is done by specifying the IP address or hostname of the Wazuh agent.

      .. code-block:: console

         # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=<agent_IP>'

   Where:

   -  ``sslagent.csr`` is the CSR to be submitted to the certificate authority.
   -  ``sslagent.key`` is the generated CSR private key.

#. Sign the generated agent CSR using the CA keys:

   .. code-block:: console

      # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial

   Where:

   -  ``sslagent.csr`` is the CSR to be submitted to the certificate authority.
   -  ``sslagent.cert`` is the SSL certificate signed by the CSR.
   -  ``rootCA.pem`` is the root certificate for the CA.
   -  ``rootCA.key`` is the root certificate private key for the CA.

#. Copy the signed SSL certificate and key (``sslagent.cert`` and ``sslagent.key`` in this case) to the Wazuh agent. You can use a tool like SCP to copy the certificate to the endpoints:

   .. code-block:: console

      # scp sslagent.key  ubuntu@192.168.xxx.xxx:/home/ubuntu
      # scp sslagent.cert ubuntu@192.168.xxx.xxx:/home/ubuntu

#. Ensure that the ``rootCA.pem`` file is in the ``/var/wazuh-manager/etc/`` directory on the Wazuh manager.

#. Update the ``/var/wazuh-manager/etc/wazuh-manager.conf`` file with the location of the ``rootCA.pem`` file to enable the use of certificates. Uncomment the ``<auth><ssl_agent_ca>`` section and specify the path to the ``rootCA.pem`` file on the Wazuh manager.

   .. code-block:: xml
      :emphasize-lines: 3

      <auth>
         ...
         <ssl_agent_ca>/var/wazuh-manager/etc/rootCA.pem</ssl_agent_ca>
      </auth>

#. Restart the Wazuh manager service to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-manager

Linux/Unix
^^^^^^^^^^

Follow these steps to enroll a Linux/Unix endpoint by using certificates for agent verification.

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) for the Wazuh agent have been copied to the endpoint.

#. Assign the right permissions and ownership to the ``sslagent.key`` and ``sslagent.cert`` files.

   .. code-block:: console

      # chown root:wazuh sslagent.key sslagent.cert
      # chmod 640 sslagent.key sslagent.cert

#. Modify the Wazuh agent configuration file located at ``/var/ossec/etc/ossec.conf``, and include the following:

   -  The Wazuh manager IP address or fully qualified domain name (FQDN) in the ``<client><manager><address>`` section.
   -  The local path to the agent certificate and the agent key are in the ``<client><enrollment>`` section.

   .. code-block:: xml
      :emphasize-lines: 3,6,7

      <client>
         <manager>
            <address><WAZUH_MANAGER_IP></address>
         </manager>
         <enrollment>
            <agent_certificate_path>/<PATH_TO>/sslagent.cert</agent_certificate_path>
            <agent_key_path>/<PATH_TO>/sslagent.key</agent_key_path>
         </enrollment>
      </client>

#. Restart the Wazuh agent to make the changes effective:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Click on the upper-left menu icon and navigate to **Server management** > **Endpoints Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, you will have an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/linux-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - Linux
      :alt: Check newly enrolled Wazuh agent - Linux
      :align: center
      :width: 80%

Windows
^^^^^^^

Follow these steps to enroll a Windows endpoint by using certificates for the Wazuh agent verification:

The Wazuh agent installation directory depends on the architecture of the host.

-  ``C:\Program Files (x86)\ossec-agent`` for 64-bit systems.
-  ``C:\Program Files\ossec-agent`` for 32-bit systems.

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) have been copied to the endpoint.

#. Using an administrator account, modify the Wazuh agent configuration file located at ``C:\Program Files (x86)\ossec-agent\ossec.conf`` and include the following:

   -  Wazuh manager IP address or FQDN in the ``<client><manager><address>`` section.
   -  The local path to the agent certificate and key is in the ``<client><enrollment>`` section.

   .. code-block:: xml
      :emphasize-lines: 3,6,7

      <client>
         <manager>
            <address>WAZUH_MANAGER_IP</address>
         </manager>
         <enrollment>
            <agent_certificate_path><PATH_TO>/sslagent.cert</agent_certificate_path>
            <agent_key_path><PATH_TO>/sslagent.key</agent_key_path>
         </enrollment>
      </client>

#. Restart the Wazuh agent to make the changes effective.

   .. tabs::

      .. group-tab:: PowerShell (as an administrator)

         .. code-block:: pwsh-session

            > Restart-Service -Name wazuh

      .. group-tab:: CMD (as an administrator)

         .. code-block:: doscon

            > net stop wazuh
            > net start wazuh

#. Click on the upper-left menu icon and navigate to **Server management** > **Endpoints Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, you will have an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/windows-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - Windows
      :alt: Check newly enrolled Wazuh agent - Windows
      :align: center
      :width: 80%

macOS
^^^^^

Follow these steps to enroll a macOS endpoint by using certificates for Wazuh agent verification.

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) for the Wazuh agent have been copied to the endpoint.

#. Launch the terminal, obtain root access, edit the Wazuh agent configuration file located at ``/Library/Ossec/etc/ossec.conf``, and include the following:

   -  The Wazuh manager IP address or FQDN in the ``<client><manager><address>`` section.
   -  The local path to the agent certificate and key is in the ``<client><enrollment>`` section.

   .. code-block:: xml
      :emphasize-lines: 3,6,7

      <client>
         <manager>
            <address><WAZUH_MANAGER_IP></address>
         </manager>
         <enrollment>
            <agent_certificate_path>/<PATH_TO>/sslagent.cert</agent_certificate_path>
            <agent_key_path>/<PATH_TO>/sslagent.key</agent_key_path>
         </enrollment>
      </client>

#. Restart the Wazuh agent to make the changes effective:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control restart

#. Click on the upper-left menu icon and navigate to **Server management** > **Endpoints Summary** on the Wazuh dashboard to check for the newly enrolled Wazuh agent and its connection status. If the enrollment was successful, you will have an interface similar to the image below.

   .. thumbnail:: /images/manual/agent/macOS-check-newly-enrolled.png
      :title: Check newly enrolled Wazuh agent - macOS
      :alt: Check newly enrolled Wazuh agent - macOS
      :align: center
      :width: 80%
