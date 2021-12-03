.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Kibana, a flexible and intuitive web interface for mining and visualizing the events and archives. 

.. _wazuh_dashboard_step_by_step:

Installing Kibana in step-by-step mode
======================================

Kibana is a flexible and intuitive web interface for mining and visualizing the events and archives. 

.. note:: Root user privileges are required to run the commands described below.

Install Kibana
--------------

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Add the Wazuh repository if you are installing Kibana on a dedicated server. Skip this step to install it on the same host as the Wazuh server or Elasticsearch. 

  .. tabs::
  
    .. group-tab:: Yum
  
  
      .. include:: ../../_templates/installations/wazuh/yum/add_repository_kibana.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: ../../_templates/installations/wazuh/deb/add_repository_kibana.rst
  
  
  
    .. group-tab:: Zypp
  
  
      .. include:: ../../_templates/installations/wazuh/zypp/add_repository_kibana.rst
  
  

Installing and configuring Kibana
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

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

#. Edit the ``/etc/kibana/kibana.yml`` file and replace ``<kibana_ip>`` and ``<elasticsearch_ip>`` with the IP address values.

    .. code-block:: yaml

        server.host: <kibana_ip>
        elasticsearch.hosts: "https://<elasticsearch_ip>:9200"

    - By default, Kibana only listens on the loopback interface (localhost), which means that it can be only accessed from the same host. To access Kibana from the outside it may be configured to listen on its network IP by replacing ``<kibana_ip>`` with Kibana's host IP. The value ``0.0.0.0`` will accept all the available IPs of the host.

    - ``<elasticsearch_ip>``: the host's IP. In case of having more than one Elasticsearch node, Kibana can be configured to connect to multiple Elasticsearch nodes in the same cluster. The IPs of the nodes can be separated with commas. Eg. ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

#. Create the ``/usr/share/kibana/data`` directory.

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana/data


#. Install the Wazuh Kibana plugin from the Kibana home directory. 

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/|CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip
        

#. Replace ``kibana-node-name`` with your Kibana node name, the same used in ``instances.yml`` to create the certificates, and move the certificates to their corresponding location. We assume that you placed a copy of ``certs.tar``, created during the Elasticsearch installation, in the root home folder (``~/``).

    .. include:: ../../_templates/installations/elastic/common/generate_new_kibana_certificates.rst


#. Link the Kibana socket to privileged port 443.

    .. code-block:: console

        # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node


#. Enable and start the Kibana service.

    .. include:: ../../_templates/installations/elastic/common/enable_kibana.rst

    
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

    - URL: *https://<kibana_ip>*
    - **Username**: *wazuh*
    - **Password**: *<wazuh_user_password>*

  When you access Kibana for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or, for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, a certificate from a trusted authority can be configured. 


If you want to uninstall Kibana, see the :ref:`uninstalling <uninstall_kibana>` section. 

Next steps
----------

All the Wazuh central components are successfully installed.

.. thumbnail:: ../../images/installation/Wazuh-Installation-workflow-complete.png
    :alt: Wazuh installation workflow
    :align: center
    :width: 100%


The Wazuh environment is now ready and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :ref:`Wazuh agent <installation_agents>` section.
