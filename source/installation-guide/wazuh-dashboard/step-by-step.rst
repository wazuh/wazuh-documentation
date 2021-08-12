.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing the events and archives. 

.. _wazuh_dashboard_step_by_step:

Installing the Wazuh dashboard in step-by-step mode
===================================================

The Wazuh dashboard is a flexible and intuitive web interface, based on Kibana, for mining and visualizing the events and archives. 

.. note:: Root user privileges are required to run the commands described below.

Install the Wazuh dashboard
---------------------------

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the Wazuh repository if you are installing the Wazuh dashboard on a dedicated server. Skip this step to install it on the same host as the Wazuh server or Wazuh indexer. 

  .. tabs::
  
    .. group-tab:: Yum
  
  
      .. include:: ../../_templates/installations/wazuh/yum/add_repository_kibana.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: ../../_templates/installations/wazuh/deb/add_repository_kibana.rst
  
  
  
    .. group-tab:: Zypp
  
  
      .. include:: ../../_templates/installations/wazuh/zypp/add_repository_kibana.rst
  
  

Installing and configuring the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Kibana package.

    .. tabs::

        .. group-tab:: Yum


            .. include:: ../../_templates/installations/elastic/yum/install_kibana.rst



        .. group-tab:: APT


            .. include:: ../../_templates/installations/elastic/deb/install_kibana.rst



        .. group-tab:: Zypp


            .. include:: ../../_templates/installations/elastic/zypp/install_kibana.rst



#. Download the Kibana configuration file.

    .. include:: ../../_templates/installations/elastic/common/configure_kibana.rst

#. Edit the ``/etc/kibana/kibana.yml`` file to replace ``server.host`` and ``elasticsearch.host`` if necessary. 

    .. code-block:: yaml
    
        server.host: 0.0.0.0
        elasticsearch.hosts: "https://127.0.0.1:9200"
       
    - ``server.host: 0.0.0.0``: Kibana is available from the outside and accepts all the available IPs of the host.
    - ``elasticsearch.hosts: "https://127.0.0.1:9200"``: Elasticsearch host is set to localhost by default, replace this value if necessary. If you have more than one Elasticsearch node, Kibana can be configured to connect to multiple Elasticsearch nodes in the same cluster. To do this, you need to separate the IPs of the nodes with commas as in ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``.

#. Create the ``/usr/share/kibana/data`` directory.

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana/data


#. Install the Wazuh Kibana plugin from the Kibana home directory. 

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/|CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip
        

#. Replace ``kibana-node-name`` with your Kibana node name, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location. We assume that you placed a copy of ``certs.tar``, created during the Wazuh indexer installation, in the root home folder (``~/``).

    .. include:: ../../_templates/installations/elastic/common/generate_new_kibana_certificates.rst


#. Link the Kibana socket to privileged port 443.

    .. code-block:: console

        # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node


#. Enable and start the Kibana service.

    .. include:: ../../_templates/installations/elastic/common/enable_kibana.rst

    
    - **Only for distributed deployments**  
  
      Edit the file ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` and replace the ``url`` with the Wazuh server IP address or hostname.
      
        .. code-block:: yaml
        
          hosts:
            - default:
              url: https://localhost
              port: 55000
              username: wazuh-wui
              password: wazuh-wui
              run_as: false


#. Access the Wazuh web interface with your credentials.

    - URL: *https://<wazuh_server_ip>*
    - **Username**: *wazuh*
    - **Password**: *<wazuh_user_password>*

  When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


If you want to uninstall Kibana, see the :ref:`uninstalling <uninstall_kibana>` section. 

Next steps
----------

All the Wazuh central components are successfully installed.

.. thumbnail:: ../../images/installation/Wazuh-Installation-workflow-complete.png
    :alt: Wazuh installation workflow
    :align: center
    :width: 100%


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.
