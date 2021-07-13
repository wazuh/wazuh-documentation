.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install Elastic Stack for using Wazuh on Debian

.. _wazuh_interface_step_by_step:

Installing Wazuh interface in step-by-step mode
===============================================

Wazuh interface is a flexible and intuitive web interface, based on Kibana, for mining and visualizing the events and archives. 

.. note:: Root user privileges are required to run all the commands described below.

Install the Wazuh interface
---------------------------

Adding the Wazuh repository
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Add the Wazuh repository if you are installing the Wazuh interface on a dedicated server. In case you are installing on the same host as the Wazuh server or Wazuh indexer you may skip this step. 

  .. tabs::
  
    .. group-tab:: Yum
  
  
      .. include:: ../../../_templates/installations/wazuh/yum/add_repository_kibana.rst
  
  
  
    .. group-tab:: APT
  
  
      .. include:: ../../../_templates/installations/wazuh/deb/add_repository_kibana.rst
  
  
  
    .. group-tab:: Zypp
  
  
      .. include:: ../../../_templates/installations/wazuh/zypp/add_repository_kibana.rst
  
  

Installing and configuring the Wazuh interface
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Install the Kibana package.

    .. tabs::

        .. group-tab:: Yum


            .. include:: ../../../_templates/installations/elastic/yum/install_kibana.rst



        .. group-tab:: APT


            .. include:: ../../../_templates/installations/elastic/deb/install_kibana.rst



        .. group-tab:: Zypp


            .. include:: ../../../_templates/installations/elastic/zypp/install_kibana.rst



#. Download the Kibana configuration file.

    .. include:: ../../../_templates/installations/elastic/common/configure_kibana.rst

#. Edit the ``/etc/kibana/kibana.yml`` file and replace ``server.host`` and ``elasticsearch.host`` if necessary. 

    .. code-block:: yaml
    
        server.host: 0.0.0.0
        elasticsearch.hosts: "https://127.0.0.1:9200"
       
    - ``server.host: 0.0.0.0``: Kibana is available from the outside and will accept all the available IPs of the host.
    - ``elasticsearch.hosts: "https://127.0.0.1:9200"``: Elasticsearch host is set to localhost by default, replace this value if necessary. In case of having more than one Elasticsearch node, Kibana can be configured to connect to multiple Elasticsearch nodes in the same cluster. The IPs of the nodes can be separated with commas. Eg. ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``   

#. Create the ``/usr/share/kibana/data`` directory.

    .. code-block:: console
    
      # mkdir /usr/share/kibana/data
      # chown -R kibana:kibana /usr/share/kibana/data


#. Install the Wazuh Kibana plugin. The installation of the plugin must be done from the Kibana home directory. 

    .. code-block:: console

        # cd /usr/share/kibana
        # sudo -u kibana bin/kibana-plugin install https://packages.wazuh.com/|CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_LATEST|_|ELASTICSEARCH_LATEST|-1.zip
        

#. Configure the Kibana certificates. This guide assumes that a copy of ``certs.tar`` is placed in the root home folder (~/).

    .. include:: ../../../_templates/installations/elastic/common/generate_new_kibana_certificates.rst


#. Link Kibana socket to privileged port 443.

    .. code-block:: console

        # setcap 'cap_net_bind_service=+ep' /usr/share/kibana/node/bin/node


#. Enable and start the Kibana service.

    .. include:: ../../../_templates/installations/elastic/common/enable_kibana.rst


#. Access the Wazuh web interface.

  .. code-block:: none

      URL: https://<kibana_ip>
      user: wazuh
      password: <wazuh_user_password>  


Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 

With the first access attempt on a distributed deployment, the Wazuh Kibana plugin may prompt a message that indicates that it cannot communicate with the Wazuh API. To solve this issue edit the file ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` and replace the ``url`` by the Wazuh server's IP address or hostname: 
  
  .. code-block:: yaml
  
    hosts:
      - default:
         url: https://localhost
         port: 55000
         username: wazuh-wui
         password: wazuh-wui
         run_as: false
  
 
Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. The Wazuh agent installation guide is available for most operating systems and can be found :ref:`here<installation_agents>`.

If you want to uninstall Kibana, visit the :ref:`uninstalling section <uninstall_kibana>`.