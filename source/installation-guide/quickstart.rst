.. Copyright (C) 2021 Wazuh, Inc.

.. _quickstart:


.. meta::
  :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the unattended installation script. 


Quickstart
==========

Install Wazuh on a single host by using the unattended installation script. The minimum requirements for this type of deployment are 4 GB of RAM and 2 CPU cores, and the recommended are 16 GB of RAM and 8 CPU cores. A 64-bit :ref:`Linux operating system <supported_operating_systems>` is required. 

The unattended installation script installs and configures the Wazuh indexer, the Wazuh server, and the Wazuh dashboard. To learn more about each Wazuh component and its capabilities, check the :ref:`Components <components>` section. 

Installing Wazuh
----------------

#. Download and run the Wazuh unattended installation. 

   .. code-block:: console

     # curl -so ./unattended-installation.sh https://packages.wazuh.com/resources/4.2/unattended-installation/unattended-installation.sh && sudo bash ./unattended-installation.sh

   After executing the script, the output prompts all the users' passwords and a message confirms that the installation was successful.

   Expand the output to see an example response.
   
   .. code-block:: none
     :class: output accordion-output
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

#. Access the Wazuh web interface with your credentials. 

    - URL: *https://<server_ip>*
    - **Username**: *wazuh*
    - **Password**: *<wazuh_password>*

      .. thumbnail:: ../images/installation/kibana-log-in.png
          :alt: Wazuh dashboard login page
          :align: center
          :wrap_image: No


    When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 

If you want uninstall the components of the all-in-one installation, run the unattended installation script and use the option ``-r / --uninstall``.  

Next steps
----------

The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent<installation_agents>` section.