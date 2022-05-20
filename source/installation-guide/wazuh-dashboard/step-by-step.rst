.. Copyright (C) 2022 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing the events and archives. 

.. _wazuh_dashboard_step_by_step:

Installing the Wazuh dashboard step by step
===========================================

Install and configure the Wazuh dashboard following step-by-step instructions. The Wazuh dashboard is a web interface for mining and visualizing the Wazuh server alerts and archived events.

.. note:: Root user privileges are required to run the commands described below.

Wazuh dashboard installation
----------------------------

Installing package dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/dashboard/install-dependencies.rst

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    If you are installing the Wazuh dashboard on the same host as the Wazuh indexer or the Wazuh server, you may skip these steps as you may have added the Wazuh repository already.

  .. tabs::
  
    .. group-tab:: Yum
  
  
      .. include:: /_templates/installations/common/yum/add-repository.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: /_templates/installations/common/deb/add-repository.rst
  
  
  

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Install the Wazuh dashboard package.

      .. tabs::

          .. group-tab:: Yum


              .. include:: /_templates/installations/dashboard/yum/install_dashboard.rst



          .. group-tab:: APT


              .. include:: /_templates/installations/dashboard/apt/install_dashboard.rst



Configuring the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file and replace the following values:

     #. ``server.host``: This setting specifies the host of the back end server. To allow remote users to connect, set the value to the IP address or DNS name of the Kibana server.  The value ``0.0.0.0`` will accept all the available IP addresses of the host.

     #. ``opensearch.hosts``: The URLs of the Wazuh indexer instances to use for all your queries. Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The addresses of the nodes can be separated by commas. For example,  ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

        .. code-block:: yaml
          :emphasize-lines: 1,3

             server.host: 0.0.0.0
             server.port: 443
             opensearch.hosts: https://localhost:9200
             opensearch.ssl.verificationMode: certificate




Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    Make sure that a copy of ``wazuh-certificates.tar``, created in the previous stage of the installation process, is placed in your working directory.

  .. include:: /_templates/installations/dashboard/deploy_certificates.rst


Starting the Wazuh dashboard service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Wazuh dashboard service.

      .. include:: /_templates/installations/dashboard/enable_dashboard.rst

      
      **Only for distributed deployments**  
      
          Edit the file ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` and replace the ``url`` value with the IP address or hostname of the Wazuh server master node.
          
            .. code-block:: yaml
            
              hosts:
                - default:
                  url: https://localhost
                  port: 55000
                  username: wazuh-wui
                  password: wazuh-wui
                  run_as: false


  #. Access the Wazuh web interface with your credentials.

      - URL: *https://<dashboard_ip>*
      - **Username**: *admin*
      - **Password**: *<admin_password>*

    When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


Securing your Wazuh installation
--------------------------------


You have now installed and configured all the Wazuh central components. We recommend changing the default credentials to protect your infrastructure from possible attacks. 

Follow the instructions below to change the passwords for both the Wazuh API and the Wazuh indexer users.  

Change the default Wazuh API credentials
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Change the default password of the admin users: `wazuh` and `wazuh-wui`. Note that the commands below use localhost, set your Wazuh manager IP address if necessary. 

#. Get an authorization token. 

   .. code-block:: console

      # TOKEN=$(curl -u wazuh-wui:wazuh-wui -k -X GET "https://localhost:55000/security/user/authenticate?raw=true")

#. Change the `wazuh` user credentials (ID 1). Select a password between 8 and 64 characters long, it should contain at least one uppercase and one lowercase letter, a number, and a symbol. See :api-ref:`PUT /security/users/{user_id} <operation/api.controllers.security_controller.update_user>` to learn more. 

   .. code-block:: console

      curl -k -X PUT "https://localhost:55000/security/users/1" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d' 
      {
        "password": "SuperS3cretPassword!"
      }'

   .. code-block:: console
      :class: output

      {"data": {"affected_items": [{"id": 1, "username": "wazuh", "allow_run_as": true, "roles": [1]}], "total_affected_items": 1, "total_failed_items": 0, "failed_items": []}, "message": "User was successfully updated", "error": 0}  
    
        
#. Change the `wazuh-wui` user credentials (ID 2). 

   .. code-block:: console

      curl -k -X PUT "https://localhost:55000/security/users/2" -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d' 
      {
        "password": "SuperS3cretPassword!"
      }'

   .. code-block:: console
     :class: output   

      {"data": {"affected_items": [{"id": 2, "username": "wazuh-wui", "allow_run_as": true, "roles": [1]}], "total_affected_items": 1, "total_failed_items": 0, "failed_items": []}, "message": "User was successfully updated", "error": 0}

   See the :doc:`Securing the Wazuh API </user-manual/api/securing-api>` section for additional security configurations. 

#. In your `Wazuh dashboard` server, update ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` with your new password.  

   .. code-block:: yaml
     :emphasize-lines: 6
    
      hosts:
        - default:
          url: https://localhost
          port: 55000
          username: wazuh-wui
          password: SuperS3cretPassword!
          run_as: false 

#. Restart the Wazuh dashboard.

   .. include:: /_templates/common/restart_dashboard.rst



Change the default Wazuh indexer credentials
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Select your deployment type and follow the instructions to change the default Wazuh indexer passwords. 


.. tabs::

   .. group-tab:: All-in-one deployment

       #. Use the Wazuh password tool to change all the internal users passwords. 
      
          .. code-block:: console
         
            # /usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh --change-all
         
          .. code-block:: console
            :class: output
       
            INFO: The password for user admin is o5XWBs044S5PJ1edYgw4R4MOM7r00Hjm
            INFO: The password for user kibanaserver is mqhbijWWw8vVyuOBDtFQvqoLYwMdrcXP
            INFO: The password for user kibanaro is jTbFvrCSQ4LaLmcNtcFOzVUvCL24nYtN
            INFO: The password for user logstash is bmtERx0schYGoANyGiWnyed6044CYGQv
            INFO: The password for user readall is j9JOe7nEhKZhjyfUWVXhI2FNaM5A7eT6
            INFO: The password for user snapshotrestore is tYyAqG9U72RURf0svrvJ8rtiVEzqjdmg
            INFO: The password for user wazuh_admin is NHJMpiJkeBgjwNSJnoPV1KD9XMD7a98N
            INFO: The password for user wazuh_user is N364F1kSkgKfUkVPzRxnCKwszaDVLqu0
            WARNING: Passwords changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.
       
    
   .. group-tab:: Distributed deployment

       #. Use the Wazuh password tool on `any Wazuh indexer node` to change all the internal users passwords. 

          .. code-block:: console
  
             # /usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh --change-all
  
          .. code-block:: console
            :class: output

             INFO: The password for user admin is o5XWBs044S5PJ1edYgw4R4MOM7r00Hjm
             INFO: The password for user kibanaserver is mqhbijWWw8vVyuOBDtFQvqoLYwMdrcXP
             INFO: The password for user kibanaro is jTbFvrCSQ4LaLmcNtcFOzVUvCL24nYtN
             INFO: The password for user logstash is bmtERx0schYGoANyGiWnyed6044CYGQv
             INFO: The password for user readall is j9JOe7nEhKZhjyfUWVXhI2FNaM5A7eT6
             INFO: The password for user snapshotrestore is tYyAqG9U72RURf0svrvJ8rtiVEzqjdmg
             INFO: The password for user wazuh_admin is NHJMpiJkeBgjwNSJnoPV1KD9XMD7a98N
             INFO: The password for user wazuh_user is N364F1kSkgKfUkVPzRxnCKwszaDVLqu0
             WARNING: Passwords changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.

       #. On your `Wazuh servers`, update the `admin` password in the Filebeat keystore. Replace ``<admin-password>`` with the random password generated in the previous step and run the following command:  
      
          .. code-block:: console

             # echo <admin-password> | filebeat keystore add password --stdin --force

       #. Restart Filebeat.

          .. include:: /_templates/common/restart_filebeat.rst

       #. On your `Wazuh dashboard` server, update the `kibanaserver` password in the Wazuh dashboard keystore. Replace ``<kibanaserver-password>`` with the random password generated in the previous step and run the following command:   

          .. code-block:: console

             # echo <kibanaserver-password> | /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin opensearch.password         

       #. Restart the Wazuh dashboard. 

          .. include:: /_templates/common/restart_dashboard.rst


Next steps
----------

All the Wazuh central components are successfully installed and secured.

.. thumbnail:: ../../images/installation/Wazuh-Installation-workflow-complete.png
    :alt: Wazuh installation workflow
    :align: center
    :width: 100%


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.

If you want to uninstall the Wazuh dashboard, see :ref:`uninstall_dashboard`.
