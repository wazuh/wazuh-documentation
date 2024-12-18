.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing the events and archives. 

.. _wazuh_dashboard_step_by_step:

Installing the Wazuh dashboard step by step
===========================================

Install and configure the Wazuh dashboard following step-by-step instructions. The Wazuh dashboard is a web interface for mining and visualizing the Wazuh server alerts and archived events.

.. note:: You need root user privileges to run all the commands described below.

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

     #. ``server.host``: This setting specifies the host of the Wazuh dashboard server. To allow remote users to connect, set the value to the IP address or DNS name of the Wazuh dashboard server. The value ``0.0.0.0`` will accept all the available IP addresses of the host.

     #. ``opensearch.hosts``: The URLs of the Wazuh indexer instances to use for all your queries. The Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The addresses of the nodes can be separated by commas. For example,  ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

        .. code-block:: yaml
          :emphasize-lines: 1,3

             server.host: 0.0.0.0
             server.port: 443
             opensearch.hosts: https://localhost:9200
             opensearch.ssl.verificationMode: certificate




Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    Make sure that a copy of the ``wazuh-certificates.tar`` file, created during the initial configuration step, is placed in your working directory.

  .. include:: /_templates/installations/dashboard/deploy_certificates.rst


Starting the Wazuh dashboard service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Wazuh dashboard service.

      .. include:: /_templates/installations/dashboard/enable_dashboard.rst

      
      **Only for distributed deployments**  
      
          Edit the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` file and replace the ``url`` value with the IP address or hostname of the Wazuh server master node.
          
            .. code-block:: yaml
               :emphasize-lines: 3
            
               hosts:
                 - default:
                     url: https://localhost
                     port: 55000
                     username: wazuh-wui
                     password: wazuh-wui
                     run_as: false


  #. Access the Wazuh web interface with your credentials.

      - URL: *https://<wazuh-dashboard-ip>*
      - **Username**: *admin*
      - **Password**: *admin*

    When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem``  file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


Securing your Wazuh installation
--------------------------------


You have now installed and configured all the Wazuh central components. We recommend changing the default credentials to protect your infrastructure from possible attacks. 

Select your deployment type and follow the instructions to change the default passwords for both the Wazuh API and the Wazuh indexer users.


.. tabs::

   .. group-tab:: All-in-one deployment

      #. Use the Wazuh passwords tool to change all the internal users' passwords.
      
         .. code-block:: console
         
            # /usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh --change-all --admin-user wazuh --admin-password wazuh
         
         .. code-block:: console
            :class: output
       
            INFO: The password for user admin is yWOzmNA.?Aoc+rQfDBcF71KZp?1xd7IO
            INFO: The password for user kibanaserver is nUa+66zY.eDF*2rRl5GKdgLxvgYQA+wo
            INFO: The password for user kibanaro is 0jHq.4i*VAgclnqFiXvZ5gtQq1D5LCcL
            INFO: The password for user logstash is hWW6U45rPoCT?oR.r.Baw2qaWz2iH8Ml
            INFO: The password for user readall is PNt5K+FpKDMO2TlxJ6Opb2D0mYl*I7FQ
            INFO: The password for user snapshotrestore is +GGz2noZZr2qVUK7xbtqjUup049tvLq.
            WARNING: Wazuh indexer passwords changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.
            INFO: The password for Wazuh API user wazuh is JYWz5Zdb3Yq+uOzOPyUU4oat0n60VmWI
            INFO: The password for Wazuh API user wazuh-wui is +fLddaCiZePxh24*?jC0nyNmgMGCKE+2
            INFO: Updated wazuh-wui user password in wazuh dashboard. Remember to restart the service.
       
    
   .. group-tab:: Distributed deployment

      #. On `any Wazuh indexer node`, use the Wazuh passwords tool to change the passwords of the Wazuh indexer users. 

         .. code-block:: console
  
            # /usr/share/wazuh-indexer/plugins/opensearch-security/tools/wazuh-passwords-tool.sh --change-all
  
         .. code-block:: console
            :class: output

            INFO: Wazuh API admin credentials not provided, Wazuh API passwords not changed.
            INFO: The password for user admin is wcAny.XUwOVWHFy.+7tW9l8gUW1L8N3j
            INFO: The password for user kibanaserver is qy6fBrNOI4fD9yR9.Oj03?pihN6Ejfpp
            INFO: The password for user kibanaro is Nj*sSXSxwntrx3O7m8ehrgdHkxCc0dna
            INFO: The password for user logstash is nQg1Qw0nIQFZXUJc8r8+zHVrkelch33h
            INFO: The password for user readall is s0iWAei?RXObSDdibBfzSgXdhZCD9kH4
            INFO: The password for user snapshotrestore is Mb2EHw8SIc1d.oz.nM?dHiPBGk7s?UZB
            WARNING: Wazuh indexer passwords changed. Remember to update the password in the Wazuh dashboard and Filebeat nodes if necessary, and restart the services.

      #. On your `Wazuh server master node`, download the Wazuh passwords tool and use it to change the passwords of the Wazuh API users.

         .. code-block:: console
  
            # curl -sO https://packages.wazuh.com/|WAZUH_CURRENT_MINOR|/wazuh-passwords-tool.sh
            # bash wazuh-passwords-tool.sh --admin-user wazuh --admin-password wazuh

         .. code-block:: console
            :class: output

            INFO: The password for Wazuh API user wazuh is ivLOfmj7.jL6*7Ev?UJoFjrkGy9t6Je.
            INFO: The password for Wazuh API user wazuh-wui is fL+f?sFRPEv5pYRE559rqy9b6G4Z5pVi

      #. On `all your Wazuh server nodes`, run the following command to update the `admin` password in the Filebeat keystore. Replace ``<admin-password>`` with the random password generated in the first step.
      
         .. code-block:: console

            # echo <admin-password> | filebeat keystore add password --stdin --force

      #. Restart Filebeat to apply the change.

         .. include:: /_templates/common/restart_filebeat.rst

         .. note:: Repeat steps 3 and 4 on `every Wazuh server node`.
       
      #. On your `Wazuh dashboard node`, run the following command to update the `kibanaserver` password in the Wazuh dashboard keystore. Replace ``<kibanaserver-password>`` with the random password generated in the first step.

         .. code-block:: console

            # echo <kibanaserver-password> | /usr/share/wazuh-dashboard/bin/opensearch-dashboards-keystore --allow-root add -f --stdin opensearch.password

      #. Update the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file with the new `wazuh-wui` password generated in the second step.

         .. code-block:: yaml
            :emphasize-lines: 6
           
            hosts:
              - default:
                  url: https://localhost
                  port: 55000
                  username: wazuh-wui
                  password: "<wazuh-wui-password>"
                  run_as: false

      #. Restart the Wazuh dashboard to apply the changes.

         .. include:: /_templates/common/restart_dashboard.rst


Next steps
----------

All the Wazuh central components are successfully installed and secured.

.. raw:: html

  <div class="link-boxes-group layout-3" data-step="4">
    <div class="steps-line">
      <div class="steps-number past-step">1</div>
      <div class="steps-number past-step">2</div>
      <div class="steps-number past-step">3</div>
    </div>
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-indexer/index.html">
        <p class="link-boxes-label">Install the Wazuh indexer</p>

.. image:: ../../images/installation/Indexer-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-server/index.html">
        <p class="link-boxes-label">Install the Wazuh server</p>

.. image:: ../../images/installation/Server-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-Circle.png
     :align: center
     :height: 61px
     
.. raw:: html

      </a>
    </div>
  </div>


The Wazuh environment is now ready, and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` section.

If you want to uninstall the Wazuh dashboard, see :ref:`uninstall_dashboard`.
