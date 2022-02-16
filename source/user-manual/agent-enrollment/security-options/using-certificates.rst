.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _using-certificates:


Using certificates
==================

This method uses SSL certificates to:

- Verify manager: Verify the identity of the Wazuh manager before an agent sends the enrollment request.
- Verify agent: Verify that an agent is authorized to enroll in the Wazuh manager.

The manager verification and the agent verification are independent of each other. However, it is possible to use a combination of both.


Prerequisite
------------

A certificate authority to sign certificates for the Wazuh manager and agents is needed. In the absence of an already configured certificate authority, the Wazuh manager can be used as the certificate authority by running the below command:

.. code-block:: console
     
    # openssl req -x509 -new -nodes -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Wazuh"


The root certificate is created and saved as the ``rootCA.pem`` file.


Manager identity validation
---------------------------

Here the Wazuh manager has issued an SSL certificate using the certificate authority. Then, during enrollment, the agent verifies the Wazuh manager certificate using the root certificate of the CA.


Manager configuration
^^^^^^^^^^^^^^^^^^^^^

#. Generate an SSL certificate on the Wazuh manager signed by the certificate authority. The steps to generate an SSL certificate for the manager are as follows:

    #. Create a certificate request configuration file ``req.conf`` on the manager. Replace ``<manager_IP>`` with the hostname or the IP address of the Wazuh manager where the Wazuh agents are going to be enrolled. The contents of the file can be as follows:

    .. code-block:: json
        :class: output

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


         Where: 

            - ``C`` is the country where the organization making this request is domiciled.
            - ``CN`` is the common name on the certificate. This should be the Wazuh manager IP address or its DNS name. This field is not optional. In this case, the Wazuh manager DNS are wazuh and wazuh.com.
            - ``subjectAltName`` is optional and specifies the alternate subject names that can be used for the server. Note that to allow the enrollment of Wazuh agents with a SAN certificate, this should be included.

    #. Create a certificate signing request (CSR) on the Wazuh manager with the following command:
    
         .. code-block:: console

            # openssl req -new -nodes -newkey rsa:4096 -keyout sslmanager.key -out sslmanager.csr -config req.conf
   
   
         Where:

            - ``req.conf`` is the certificate request configuration file.
            - ``sslmanager.key`` is the private key for the certificate request.
            - ``sslmanager.csr`` is the CSR to be submitted to the certificate authority.

    #. Issue and sign the certificate for the manager CSR with the following command:

         .. code-block:: console

            # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial -extfile req. conf -extensions req_ext

         Where:

            - ``req.conf`` is the certificate request configuration file.
            - ``sslmanager.csr`` is the CSR to be submitted to the certificate authority.
            - ``sslmanager.cert`` is the signed SSL certificate from the CSR.
            - ``rootCA.pem`` is the root certificate for the CA.
            - The -extfile and -extensions options are required to copy the subject and the extensions from sslmanager.csr to sslmanager.cert.

    #. Copy the newly signed certificate and key files to ``/var/ossec/etc`` on the Wazuh manager:

         .. code-block:: console

            # cp sslmanager.cert sslmanager.key /var/ossec/etc


    #. Restart the Wazuh manager to apply the changes made.

         .. code-block:: console

            # systemctl restart wazuh-manager


Linux/Unix endpoint
^^^^^^^^^^^^^^^^^^^

The following steps serve as a guide on how to enroll a Linux/Unix endpoint by using certificates to verify the manager identity:

#. Ensure that the root certificate authority ``rootCA.pem`` file has been copied to the endpoint.
#. As a root user, modify the Wazuh agent configuration file located at ``/var/ossec/etc/ossec.conf`` and include the following:

    #. Wazuh manager IP address or DNS name in the ``<client><server><address>`` section.
    #. Local path to root certificate in the ``<client><enrollment>`` section.
   
    .. code-block:: xml
        :emphasize-lines: 3 

         <client>
            <server>
               <address>MANAGER_IP</address>
               ...
            </server>
               ...
               <enrollment>
                  <server_ca_path>/path/to/rootCA.pem</server_ca_path>
                  ...
               </enrollment>
               ...
         </client>


#. Check the agent status to find out if it is running.

   .. tabs::   
   
      .. group-tab:: Systemd
   
         .. code-block:: console
      
             # systemctl status wazuh-agent
   
   
      .. group-tab:: SysV init
   
         .. code-block:: console
      
             # service wazuh-agent status


      .. group-tab:: Other Unix based OS

         .. code-block:: console

             # /var/ossec/bin/wazuh-control status
      

#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.

   Start the agent if it is not running:

   .. tabs::   
   
      .. group-tab:: Systemd
   
         .. code-block:: console
      
             # systemctl start wazuh-agent
   
   
      .. group-tab:: SysV init
   
         .. code-block:: console
      
             # service wazuh-agent start


      .. group-tab:: Other Unix based OS

         .. code-block:: console

             # /var/ossec/bin/wazuh-control start


   Restart the agent if it is already running:

   .. tabs::   
   
      .. group-tab:: Systemd
   
         .. code-block:: console
      
             # systemctl restart wazuh-agent
   
   
      .. group-tab:: SysV init
   
         .. code-block:: console
      
             # service wazuh-agent restart


      .. group-tab:: Other Unix based OS

         .. code-block:: console

             # /var/ossec/bin/wazuh-control restart


#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


Windows endpoint
^^^^^^^^^^^^^^^^

The following steps serve as a guide on how to enroll a Windows endpoint by using certificates to verify the manager identity:

The Wazuh agent installation directory depends on the architecture of the host.

- C:\Program Files (x86)\ossec-agent for 64-bit systems.
- C:\Program Files\ossec-agent for 32-bit systems.

#. Ensure that the root certificate authority ``rootCA.pem`` file has been copied to the endpoint.
#. As a root user, modify the Wazuh agent configuration file located at ``“C:\Program Files (x86)\ossec-agent\ossec.conf”`` and include the following:

    #. Wazuh manager IP address or DNS name in the ``<client><server><address>`` section.
    #. Local path to root certificate in the ``<client><enrollment><server_ca_path>`` section.

    .. code-block:: xml
        :emphasize-lines: 3  

         <client>
            <server>
               <address>MANAGER_IP</address>
               ...
            </server>
               ...
               <enrollment>
                  <server_ca_path>/path/to/rootCA.pem</server_ca_path>
                  ...
               </enrollment>
               ...
         </client>

#. Check the agent status to find out if it is running.

   .. tabs::
      
      
         .. group-tab:: PowerShell (as an administrator)
      
            .. code-block:: console
         
               # Get-Service -name wazuh
      
      
         .. group-tab:: CMD (as an administrator)
      
            .. code-block:: console
         
               # sc query WazuhSvc


#. Start or restart the agent depending on its current state (not running/running) to make the changes effective. Start the agent if it is not running:

   .. tabs::
      
      
         .. group-tab:: PowerShell (as an administrator)
      
            .. code-block:: console
         
               # Start-Service -Name wazuh
      
      
         .. group-tab:: CMD (as an administrator)
      
            .. code-block:: console
         
               # net start wazuh


   Restart the agent if it is already running:


   .. tabs::
      
      
         .. group-tab:: PowerShell (as an administrator)
      
            .. code-block:: console
         
               # Restart-Service -Name wazuh
      
      
         .. group-tab:: CMD (as an administrator)
      
            .. code-block:: console
         
               # net stop wazuh
               # net start wazuh


#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.



macOS endpoint
^^^^^^^^^^^^^^

The following steps serve as a guide on how to enroll a macOS endpoint by using certificates to verify the manager identity:

#. Ensure that the root certificate authority ``rootCA.pem`` file has been copied to the endpoint.

#. As a root user, modify the Wazuh agent configuration file located at ``/Library/Ossec/etc/ossec.conf`` and include the following:

    #. Wazuh manager IP address or DNS name in the ``<client><server><address>`` section.

    #. Local path to root certificate in the ``<client><enrollment>`` section.

    .. code-block:: xml
        :emphasize-lines: 3

        <client>
           <server>
              <address>MANAGER_IP</address>
              ...
           </server>
              ...
              <enrollment>
                 <server_ca_path>/path/to/rootCA.pem</server_ca_path>
                 ...
              </enrollment>
              ...
        </client>



#. Check the agent status to find out if it is running.
 
      .. code-block:: console

         # /Library/Ossec/bin/wazuh-control status


#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.

      Start the agent if it is not running:

      .. code-block:: console

         # /Library/Ossec/bin/wazuh-control start


      Restart the agent if it is already running:

      .. code-block:: console

         # /Library/Ossec/bin/wazuh-control restart


#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


Verify the Wazuh agent identity
-------------------------------

An SSL certificate is issued to the agent host by the CA in prerequisite 1.On attempts to enroll by the agent, the Wazuh manager verifies the certificate presented by the agent using the root certificate. Wazuh provides two Wazuh agent verification options:

- Wazuh agent verification without host validation: The certificates for the agents are issued without specifying their host name or IP address.
- Wazuh agent verification with host validation: The certificates for the agents are issued with their IP address or hostname specified as the common name.
  
The difference between these validation methods is that the certificate in the former method can be reused on multiple agents while the certificate created in the latter can only be used on the agent whose IP address or hostname was specified during certificate generation.

Preparations on the Wazuh manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On the manager, generate a CSR for the Wazuh agent:

   - Wazuh agent verification without host validation: This is done without specifying the agent IP address or hostname.

     .. code-block:: console

        # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -batch

   - Wazuh agent verification with host validation: This is done by specifying the agent IP or hostname.

     .. code-block:: console

        # openssl req -new -nodes -newkey rsa:4096 -keyout sslagent.key -out sslagent.csr -subj '/C=US/CN=<agent_IP>'

   Where:

     - ``sslagent.csr`` is the CSR to be submitted to the certificate authority.
     - ``sslagent.key`` is the generated CSR private key.

#. Sign the generated agent CSR using the CA keys:

   .. code-block:: console

        # openssl x509 -req -days 365 -in sslagent.csr -CA rootCA.pem -CAkey rootCA.key -out sslagent.cert -CAcreateserial


   Where:

     - ``sslagent.csr`` is the CSR to be submitted to the certificate authority.
     - ``sslagent.cert`` is the signed SSL certificate from the CSR.
     - ``rootCA.pem`` is the root certificate for the CA.
     - ``rootCA.key`` is the root certificate private key for the CA.


#. Copy the signed SSL certificate and key (``sslagent.cert`` and ``sslagent.key`` in this case) to the agent. A tool like SCP can be used to copy the certificate to the endpoints. 
#. Ensure that the ``rootCA.pem`` file is in ``/var/ossec/etc/`` on the Wazuh manager.
#. Update the ``/var/ossec/etc/ossec.conf`` file with the location of the ``rootCA.pem`` file to enable the use of certificates. This is done by uncommenting the ``<auth><ssl_agent_ca>`` section and specifying the path to the ``rootCA.pem`` file on the manager.


   .. code-block:: xml
       :emphasize-lines: 3

         <auth>
            ...
            <ssl_agent_ca>/var/ossec/etc/rootCA.pem</ssl_agent_ca>
         </auth>


#. Restart the Wazuh manager service to apply the changes.

.. code-block:: console

       #systemctl restart wazuh-manager


Linux/Unix endpoint
^^^^^^^^^^^^^^^^^^^

The following steps serve as a guide on how to enroll a Linux/Unix endpoint by using certificates for agent verification:

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) for the agent have been copied to the endpoint.
#. As a root user, modify the Wazuh agent configuration file located at ``/var/ossec/etc/ossec.conf`` and include the following:

    #. The Wazuh manager IP address or DNS name in the ``<client><server><address>`` section.
    #. The local path to the agent certificate and the agent key in the ``<client><enrollment>`` section.


    .. code-block:: xml
        :emphasize-lines: 3, 7

         <client>
            <server>
               <address>MANAGER_IP</address>
            </server>
            <enrollment>
               <agent_certificate_path>CERTIFICATE_PATH</agent_certificate_path>
               <agent_key_path>KEY_PATH</agent_key_path>
            </enrollment>
         </client>

#. Check the agent status to find out if it is running.


   .. tabs::
   
   
      .. group-tab:: Systemd
   
         .. code-block:: console
   
             # systemctl status wazuh-agent
   
   
      .. group-tab:: SysV init
   
         .. code-block:: console
      
             # service wazuh-agent status


      .. group-tab:: Other Unix based OS

         .. code-block:: console

             # /var/ossec/bin/wazuh-control status
  

#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.

   Start the agent if it is not running:


   .. tabs::  

   
      .. group-tab:: Systemd
   
         .. code-block:: console
      
             # systemctl start wazuh-agent
   
   
      .. group-tab:: SysV init
   
         .. code-block:: console
      
             # service wazuh-agent start


      .. group-tab:: Other Unix based OS

         .. code-block:: console

             # /var/ossec/bin/wazuh-control start


   Restart the agent if it is already running:


   .. tabs::
         
   
      .. group-tab:: Systemd
   
         .. code-block:: console
      
             # systemctl restart wazuh-agent
   
   
      .. group-tab:: SysV init
   
         .. code-block:: console
      
             # service wazuh-agent restart


      .. group-tab:: Other Unix based OS

         .. code-block:: console

             # /var/ossec/bin/wazuh-control restart


#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


Windows endpoint
^^^^^^^^^^^^^^^^

The following steps serve as a guide on how to enroll a Windows endpoint by using certificates for agent verification:

The Wazuh agent installation directory depends on the architecture of the host.

- C:\Program Files (x86)\ossec-agent for 64-bit systems.
- C:\Program Files\ossec-agent for 32-bit systems.

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) have been copied to the endpoint.
#. As a root user, modify the Wazuh agent configuration file located at ``“C:\Program Files (x86)\ossec-agent\ossec.conf”`` and include the following:

    #. The Wazuh manager IP address or DNS name in the ``<client><server><address>`` section.
    #. The local path to the agent certificate and the agent key in the ``<client><enrollment>`` section.

   .. code-block:: xml
       :emphasize-lines: 3, 7     

         <client>
            <server>
               <address>MANAGER_IP</address>
            </server>
            <enrollment>
               <agent_certificate_path>CERTIFICATE_PATH</agent_certificate_path>
               <agent_key_path>KEY_PATH</agent_key_path>
            </enrollment>
         </client>


#. Check the agent status to find out if it is running.


   .. tabs::
   
   
      .. group-tab:: PowerShell (as an administrator)
   
         .. code-block:: console
   
            # Get-Service -name wazuh
   
   
      .. group-tab:: CMD (as an administrator)
   
         .. code-block:: console
   
            # sc query WazuhSvc

#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.

   Start the agent if it is not running:


   .. tabs::
      
      
         .. group-tab:: PowerShell (as an administrator)
      
            .. code-block:: console
         
               # Start-Service -Name wazuh
      
      
         .. group-tab:: CMD (as an administrator)
      
            .. code-block:: console
         
               # net start wazuh


   Restart the agent if it is already running:


   .. tabs::
      
      
         .. group-tab:: PowerShell (as an administrator)
      
            .. code-block:: console
         
               # Restart-Service -Name wazuh
      
      
         .. group-tab:: CMD (as an administrator)
      
            .. code-block:: console
         
               # net stop wazuh
               # net start wazuh



#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


macOS endpoint
^^^^^^^^^^^^^^

The following steps serve as a guide on how to enroll a macOS endpoint by using certificates for agent verification:

#. Ensure that the signed SSL certificate and key files (``sslagent.cert`` and ``sslagent.key``) have been copied to the endpoint.
#. As a root user, modify the Wazuh agent configuration file located at ``/Library/Ossec/etc/ossec.conf`` and include the following:

    #. The Wazuh manager IP address or DNS name in the ``<client><server><address>`` section.
    #. The local path to the agent certificate and agent key in the ``<client><enrollment>`` section.


   .. code-block:: xml
       :emphasize-lines: 3, 7

         <client>
            <server>
               <address>MANAGER_IP</address>
            </server>
            <enrollment>
               <agent_certificate_path>CERTIFICATE_PATH</agent_certificate_path>
               <agent_key_path>KEY_PATH</agent_key_path>
            </enrollment>
         </client>


#. Check the agent status to find out if it is running.

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control status


#. Start or restart the agent depending on its current state (not running/running) to make the changes effective.

   Start the agent if it is not running:
   
   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control start

#. Restart the agent if it is already running:
   
   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control restart

#. Check the agent status again to confirm that it has started.
#. Select the “agents” tab to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.

