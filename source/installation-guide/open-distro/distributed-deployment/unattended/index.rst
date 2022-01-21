.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about distributed deployment and the unattended installation of Wazuh using scripts in this section of our documentation. 
  
.. _unattended_distributed_index:

Unattended installation
=======================


You can install Wazuh server, Open Distro for Elasticsearch and Open Distro for Kibana using an automated script. This script performs a health check to verify that the system has enough resources to achieve optimal performance.

For more information on system resources, see the :ref:`Requirements <installation_requirements>` section.


.. note:: Root user privileges are required to run all the commands. To download the script, the package ``curl`` is used.

.. _configure_deployment_unatended:

Configure your deployment
--------------------------

#. Download the script and the configuration file template

    .. code-block:: console

        # curl -so ~/wazuh_install.sh https://packages.wazuh.com/wazuh_install/4.2/wazuh_install.sh 
        # curl -so ~/config.yml https://packages.wazuh.com/wazuh_install/4.2/config/opendistro/certificate/config.yml
    
#. Edit the ``config.yml`` file to specify the architecture of your deployment. 

    .. code-block:: yaml
      :emphasize-lines: 2, 9, 19

      nodes:
        # Elasticsearch server nodes
        elasticsearch:
          name: <elasticsearch-node-name>
          ip: <elasticsearch-node-ip>
          # name: <elasticsearch-node-name>
          # ip: <elasticsearch-node-ip>

        # Wazuh server nodes
        # Use node_type only with more than one Wazuh manager
        wazuh_servers:
          name: <wazuh-node-name>
          ip: <wazuh-manager-ip>
          # node_type: master
          # name: <wazuh-node-name>
          # ip: <wazuh-manager-ip>
          # node_type: worker

        # Kibana node
        kibana:
          name: <kibana-node-name>
          ip: <kibana-node-ip>

    .. note:: When configuring more than one Wazuh server node it is necessary to specify the type of node in the Wazuh cluster.

#. Run the script to generate certificates and passwords

    This will generate the ``configurations.tar`` file that will be necessary for the next steps.

    .. code-block:: console

      # bash ~/elastic-stack-installation.sh -c

.. _install_elasticsearch_unattended:

Installing Elasticsearch
------------------------

#. Download the script

    .. code-block:: console

        # curl -so ~/wazuh_install.sh https://packages.wazuh.com/wazuh_install/4.2/wazuh_install.sh 

#. Copy the ``configurations.tar`` file to the node.

#. Run the script

    .. code-block:: console

      # ./wazuh_install -e <elasticsearch-node-name>

    The following values must be replaced:

      - ``elasticsearch-node-name``: Name of the instance. This name must be the same used in ``config.yml`` for the configuration setting, e.g. ``elasticsearch``. 

.. note:: The script will look for the configurations.tar in the path it is stored you can specify a different path by using -t / --tar <path-to-configurations-tar>.

.. _insitialize_elasticsearch_unattended:

Initialize Elasticsearch Cluster
--------------------------------

Once Elasticsearch has been installed in all the nodes we need to initialize the OpenDistro cluster. This proccess only needs to be done in one node.

#. Download the script. Skip this step if it is already on the node:

    .. code-block:: console

      # curl -so ~/wazuh_install.sh https://packages.wazuh.com/wazuh_install/4.2/wazuh_install.sh 

#. Run the script

    .. code-block:: console

      # ./wazuh_install -s

.. _install_kibana_unattended:

Installing Wazuh server
-----------------------

#. Download the script. Skip this step if it is already on the node:

    .. code-block:: console

      # curl -so ~/wazuh_install.sh https://packages.wazuh.com/wazuh_install/4.2/wazuh_install.sh 

#. Run the script:

    .. code-block:: console

      # ./wazuh_install -w <wazuh-server-node-name>

    The following values must be replaced:

      - ``wazuh-server-node-name``: Name of the instance. This name must be the same used in ``config.yml`` for the configuration setting, e.g. ``wazuh``. 

      
Installing Kibana
-----------------

.. note:: It is necessary to initialize the Elasticsearch cluster before this step.

#. Download the script. Skip this step if it is already on the node:

    .. code-block:: console

      # curl -so ~/wazuh_install.sh https://packages.wazuh.com/wazuh_install/4.2/wazuh_install.sh 

#. Run the script:

    .. code-block:: console

      # ./wazuh_install -k <kibana-node-name>

    The following values must be replaced:

      - ``kibana-node-name``: Name of the instance. This name must be the same used in ``config.yml`` for the configuration setting, e.g. ``kibana``. 

#. Access the web interface: 

    The user and password for the registration will show at the end of the script execution, aditionally all the passwords are stored in the ``passwords_file.yml`` file in ``configurations.tar``.

    .. code-block:: none

      URL: https://<kibana_ip>
      user: admin
      password: admin_password  
  

    Upon the first access to Kibana, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser or,  for increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser.  Alternatively, a certificate from a trusted authority can be configured. 

    .. note:: If Kibana is accessed before installing the Wazuh server, the Wazuh Kibana plugin indicates that it cannot establish a connection with the Wazuh API. Proceed with the Wazuh server installation to remediate this.

Next steps
----------

Once the Wazuh environment is ready, a Wazuh agent can be installed on every endpoint to be monitored. To learn how to install agents, check the :ref:`Wazuh agent<installation_agents>` section.