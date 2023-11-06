.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to register Wazuh agents on Linux, Windows, or macOS X in this section of our documentation.
  
.. _manager-identity-verification:


Manager identity verification
=============================

This method uses SSL certificates to verify the identity of the Wazuh manager before an agent sends the enrollment request. The manager verification and the agent verification are independent of each other. However, it is possible to use a combination of both.

In this document, you will find the following information:

- :ref:`manager-identity-prerequisites`
- :ref:`manager-identity-validation`
    - :ref:`manager-identity-manager-configuration`
    - :ref:`manager-identity-linux-unix-endpoint`
    - :ref:`manager-identity-this-windows-endpoint`
    - :ref:`manager-identity-macos-endpoint`


.. _manager-identity-prerequisites:


Prerequisites
-------------

A certificate authority to sign certificates for the Wazuh manager and agents is needed. In the absence of an already configured certificate authority, the Wazuh manager can be used as the certificate authority by running the below command:

.. code-block:: console
     
    # openssl req -x509 -new -nodes -newkey rsa:4096 -keyout rootCA.key -out rootCA.pem -batch -subj "/C=US/ST=CA/O=Wazuh"


The root certificate is created and saved as the ``rootCA.pem`` file.


.. _manager-identity-validation:


Manager identity validation
---------------------------

Here the Wazuh manager has issued an SSL certificate using the certificate authority. Then, during enrollment, the agent verifies the Wazuh manager certificate using the root certificate of the CA.


.. _manager-identity-manager-configuration:


Manager configuration
^^^^^^^^^^^^^^^^^^^^^

#. Generate an SSL certificate on the Wazuh manager signed by the certificate authority. The steps to generate an SSL certificate for the manager are as follows:

    #. Create a certificate request configuration file ``req.conf`` on the manager. Replace ``<manager_IP>`` with the hostname or the IP address of the Wazuh manager where the Wazuh agents are going to be enrolled. The contents of the file can be as follows:

         .. code-block:: xml
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
            - ``subjectAltName`` is optional and specifies the alternate subject names that can be used for the server. Note that to allow the enrollment of the Wazuh agents with a SAN certificate, this should be included.

    #. Create a certificate signing request (CSR) on the Wazuh manager with the following command:
    
         .. code-block:: console

            # openssl req -new -nodes -newkey rsa:4096 -keyout sslmanager.key -out sslmanager.csr -config req.conf
   
   
         Where:

            - ``req.conf`` is the certificate request configuration file.
            - ``sslmanager.key`` is the private key for the certificate request.
            - ``sslmanager.csr`` is the CSR to be submitted to the certificate authority.

    #. Issue and sign the certificate for the manager CSR with the following command:

         .. code-block:: console

            # openssl x509 -req -days 365 -in sslmanager.csr -CA rootCA.pem -CAkey rootCA.key -out sslmanager.cert -CAcreateserial -extfile req.conf -extensions req_ext

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


.. _manager-identity-linux-unix-endpoint:

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



   
#. Restart the agent to make the changes effective.


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


#. Select the “agents” module to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


.. _manager-identity-this-windows-endpoint:


Windows endpoint
^^^^^^^^^^^^^^^^

The following steps serve as a guide on how to enroll a Windows endpoint by using certificates to verify the manager identity:

The Wazuh agent installation directory depends on the architecture of the host.

- ``C:\Program Files (x86)\ossec-agent`` for 64-bit systems.
- ``C:\Program Files\ossec-agent`` for 32-bit systems.

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


#. Restart the agent to make the changes effective. 

   .. tabs::
      
      
         .. group-tab:: PowerShell (as an administrator)
      
            .. code-block:: console
         
               # Restart-Service -Name wazuh
      
      
         .. group-tab:: CMD (as an administrator)
      
            .. code-block:: console
         
               # net stop wazuh
               # net start wazuh


#. Select the “agents” module to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.


.. _manager-identity-macos-endpoint:


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



#. Restart the agent to make the changes effective.

      .. code-block:: console

         # /Library/Ossec/bin/wazuh-control restart


#. Select the “agents” module to check for the newly enrolled agent and its connection status in the Wazuh dashboard to confirm that enrollment was successful.
