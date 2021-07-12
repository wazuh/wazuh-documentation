.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Looking for installing Wazuh through unattended installation? Learn more about how to do it in this section of the documentation.
  
Unattended installation
=======================

You can install Wazuh on a single host by using a script that automatically detects whether the operating system uses ``rpm`` or ``deb`` packages.
The script performs a health check to verify that the available system resources meet the minimal requirements. For more information, check the :ref:`Requirements <installation_requirements>` section.

The script installs some packages, including ``unzip`` and ``libcap``, required by Open Distro for Elasticsearch.

Installing Wazuh
----------------

.. note:: Root user privileges are required to run all the commands. The ``curl`` package is used to download the script. 


#. Run the following command:

   .. code-block:: console

     # curl -so ~/unattended-installation.sh https://packages.wazuh.com/resources/4.1/open-distro/unattended-installation/unattended-installation.sh && bash ~/unattended-installation.sh

   The script performs a health check to ensure that the host has enough resources to guarantee proper performance. To skip this step, add the ``-i`` or ``--ignore-healthcheck`` option when running the script.

   After executing the script, the output prompts all the users' passwords and a message confirms that the installation was successful.
   
   .. code-block:: none
     :class: output

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
      
      You can access the web interface https://<kibana_ip>. The credentials are wazuh:vhDpq7YcwA08BLTmcdeYeJmXPU_VD31f
     

#. Access the web interface: 

  .. code-block:: none

      URL: https://<wazuh_server_ip>
      user: wazuh
      password: <wazuh_user_password>

On the first access to Kibana, the browser displays a warning message indicating that the certificate was not issued by a trusted authority. It is possible to add an exception in the browser's advanced options or, for increased security, the previously generated ``root-ca.pem`` file can be imported into the certificate manager of the browser. Alternatively, it is possible to configure a certificate from a trusted authority.

.. note:: The Open Distro for Elasticsearch performance analyzer plugin is removed during the installation since it might have a negative impact on system resources. 

Customizing the installation
----------------------------

The Kibana configuration found at the ``/etc/kibana/kibana.yml`` file has the ``server.host`` parameter set to ``0.0.0.0``. This means that Kibana can be accessed from the outside and accepts all the available IPs of the host. This value can be changed for a specific IP if needed.

To uninstall the components of the all-in-one installation, you can use the option ``-r / --uninstall`` to remove all the components installed.
 
Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. To learn how to install agents, check the :ref:`Wazuh agent<installation_agents>` section.