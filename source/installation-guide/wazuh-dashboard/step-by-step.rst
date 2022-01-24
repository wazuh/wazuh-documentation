.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing the events and archives. 

.. _wazuh_dashboard_step_by_step:

Installing the Wazuh dashboard in step-by-step mode
===================================================

Install and configure the Wazuh dashboard following step-by-step instructions. The Wazuh dashboard is a flexible and intuitive web interface for mining and visualizing the Wauh server alerts and archived events.

.. note:: Root user privileges are required to run the commands described below.

Wazuh dashboard installation
----------------------------

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

  .. note::
    If you are installing Wazuh dashboard on the same host as the Wazuh indexer or the Wazuh server, you may skip this step as you may have added the Wazuh repository already.

  .. tabs::
  
    .. group-tab:: Yum
  
  
      .. include:: /_templates/installations/dashboard/yum/add_repository.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: /_templates/installations/dashboard/apt/add_repository.rst
  
  
  
    .. group-tab:: Zypp
  
  
      .. include:: /_templates/installations/dashboard/zypp/add_repository.rst
  
  

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Install the Wazuh dashboard package.

      .. tabs::

          .. group-tab:: Yum


              .. include:: /_templates/installations/dashboard/yum/install_dashboard.rst



          .. group-tab:: APT


              .. include:: /_templates/installations/dashboard/apt/install_dashboard.rst



          .. group-tab:: Zypp


              .. include:: /_templates/installations/dashboard/zypp/install_dashboard.rst



Configuring the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

..
  #. Download the Wazuh dashboard configuration file.

      .. include:: /_templates/installations/dashboard/configure_dashboard.rst

  #. Edit the ``/etc/kibana/kibana.yml`` file and replace ``<kibana_ip>`` and ``<elasticsearch_ip>`` with the IP address values.

      .. code-block:: yaml

          server.host: <kibana_ip>
          elasticsearch.hosts: "https://<elasticsearch_ip>:9200"

      - By default, the Wazuh dashboard only listens on the loopback interface (localhost), which means that it can be only accessed from the same host. To access the Wazuh dashboard from the outside it may be configured to listen on its network IP by replacing ``<kibana_ip>`` with Wazuh dashboard's host IP. The value ``0.0.0.0`` will accept all the available IPs of the host.

      - ``<elasticsearch_ip>``: the host's IP. In case of having more than one Wazuh indexer node, the Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The IPs of the nodes can be separated with commas. Eg. ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

  #. Create the ``/usr/share/kibana/data`` directory.

      .. code-block:: console
      
        # mkdir /usr/share/kibana/data
        # chown -R kibana:kibana /usr/share/kibana/data


  #. Install the Wazuh Kibana plugin from the Kibana home directory. 

      .. code-block:: console

          # cd /usr/share/kibana
          # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/|CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip && cd -
          

  #. Replace ``kibana-node-name`` with your Wazuh dashboard node name, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location. We assume that you placed a copy of ``certs.tar``, created during the Elasticsearch installation, in your working directory (``./``).

      .. include:: ../../_templates/installations/elastic/common/generate_new_kibana_certificates.rst


  #. Link socket to privileged port 443.

      .. code-block:: console

          # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node


Starting the Wazuh dashboard service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

  #. Enable and start the Wazuh dashboard service.

      .. include:: /_templates/installations/dashboard/enable_dashboard.rst

      
      ..
        - **Only for distributed deployments**  
      
          Edit the file ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` and replace the ``url`` value with the Wazuh server IP address or hostname.
          
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
      - **Username**: *wazuh*
      - **Password**: *<wazuh_user_password>*

    When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


Next steps
----------

All the Wazuh central components are successfully installed.

.. thumbnail:: ../../images/installation/Wazuh-Installation-workflow-complete.png
    :alt: Wazuh installation workflow
    :align: center
    :width: 100%


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.

If you want to uninstall the Wazuh dashboard, see the :ref:`uninstalling <uninstall_kibana>` section. 
