.. Copyright (C) 2021 Wazuh, Inc.

.. _quickstart:


.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the unattended installation script. 


Quickstart
==========

Install Wazuh on a single host by using the unattended installation script. The minimum requirements for this type of deployment are 4 GB of RAM and 2 CPU cores, and the recommended are 16 GB of RAM and 8 CPU cores. A 64-bit :ref:`Linux operating system <supported_operating_systems>` is required. The ``curl`` package is used to download the script. 

The unattended installation script installs and configures the Wazuh server, the Wazuh indexer and the Wazuh interface. 

Installing Wazuh
----------------

#. Download and run the Wazuh unattended installation script by running the following command: 

   .. code-block:: console

     # curl -so ~/unattended-installation.sh https://packages.wazuh.com/resources/4.2/unattended-installation/unattended-installation.sh && sudo bash ~/unattended-installation.sh


   After executing the script, the output prompts all the users' passwords and a message confirms that the installation was successful.
   
   .. code-block:: none
     :class: output
     :emphasize-lines: 1,26

      The password for wazuh is vhDpq7YcwA08BLTmcdeYeJmXPU_VD31f

      The password for admin is uLo9SBKCE80B8OSE8zNbOWlVvHlOjQ00
      
      The password for kibanaserver is -A452dUzB8gnk3ed7nSuci_kNiSZ0y6z
      
      The password for kibanaro is yyNBlV28VzJHKnYVPNLgoAEssgics9d4
      
      The password for logstash is Hm86wUT7paLDPNhtq-I6Q1H8Weh7tX-g
      
      The password for readall is ZDqyYqvV5moE60k_X5580-4US6CIjBmi
      
      The password for snapshotrestore is FCHX-YhCV_o6IE8x_AA6lFQsjzlmCVe7
      
      The password for wazuh_admin is rkDgTQEnyw8Li3hYXfhD9td-voCw1awm
      
      The password for wazuh_user is _9JE9cY2nMWdR5GRb_Gda8ikrRRvsASH
      
      Checking the installation...
      Elasticsearch installation succeeded.
      Filebeat installation succeeded.
      Initializing Kibana (this may take a while)
      .
      Installation finished
      
      You can access the web interface https://<server_ip>. The credentials are wazuh:vhDpq7YcwA08BLTmcdeYeJmXPU_VD31f

   You now have installed and configured Wazuh. Access the web interface and start securing your systems with Wazuh.       

#. Access the Wazuh web interface: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: wazuh
      password: <wazuh_user_password>


  On the first access to the Wazuh interface, the browser displays a warning message indicating that the certificate was not issued by a trusted authority. It is possible to add an exception in the browser's advanced options or, for increased security, the previously generated ``root-ca.pem`` file can be imported into the certificate manager of the browser. Alternatively, it is possible to configure a certificate from a trusted authority.

If you want uninstall the components of the all-in-one installation, run the unattended installation script and use the option ``-r / --uninstall``.  

Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. To learn how to install agents, check the :ref:`Wazuh agent<installation_agents>` section.