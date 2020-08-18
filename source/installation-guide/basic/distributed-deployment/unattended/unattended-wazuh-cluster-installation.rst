.. Copyright (C) 2020 Wazuh, Inc.

.. _basic_unattended_distributed_wazuh:

Wazuh server unattended installation
====================================

This section will explain how to install the Wazuh manager with the Wazuh API, and Filebeat using an automated script. This script will perform a health check to verify that the system has enough resources to ensure the proper performance of the installation. For more information, please visit the :ref:`requirements <basic_distributed_requirements>` section.

Run the script
--------------

.. note:: Root user privileges are required to run all the commands described below. To download the script the package ``curl`` will be used.

Download the script:

.. code-block:: console

  # curl -so ~/wazuh-server-installation.sh https://documentation.wazuh.com/resources/elastic-stack/unattended-installation/distributed/wazuh-server-installation.sh
    

Filebeat needs to be configured by adding the Elasticsearch nodes IPs in order to connect with them. Choose between single-node or multi-node depending on the type of installation. The following commands assume that the script has been downloaded in the home directory ( ``~/`` ):

.. tabs::

  .. group-tab:: Single-node

    .. code-block:: console

        # bash ~/wazuh-server-installation.sh -ip <elasticsearch_IP> -p <elastic_password>

    Values to be replaced:

    - ``<elasticsearch_IP>``: The IP of Elasticsearch.
    - ``elastic_user_password``: The password of the user ``elastic`` generated during the Elasticsearch installation.


  .. group-tab:: Multi-node

    .. code-block:: console

        # bash ~/wazuh-server-installation.sh -ip <elasticsearch_IP_1> -ip <elasticsearch_IP_2>

    Values to be replaced:
    
    - ``<elasticsearch_IP_X>``: The IP of Elasticsearch ``node_X``. There must be added as many ``-ip`` tags as nodes needed.
    - ``elastic_user_password``: The password of the user ``elastic`` generated during the Elasticsearch installation.    



The script allows the following options:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -ip / --elasticsearch-ip      | Indicates the IP of Elasticsearch. Can be added as many as necessary                                          |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -p / --elastic-password       | Elastic user password                                                                                         |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -i / --ignore-healthcheck     | Ignores the health-check                                                                                      |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| -h / --help                   | Shows help                                                                                                    |
+-------------------------------+---------------------------------------------------------------------------------------------------------------+

Configure the installation
--------------------------

After the installation of all the components of the node, some steps must be done manually. Choose between single-node or multi-node depending on the type of installation:

.. tabs::


  .. group-tab:: Single-node


    .. include:: ../../../../_templates/installations/basic/elastic/common/copy_certificates_filebeat_un.rst



  .. group-tab:: Multi-node


    By default, the Wazuh manager is configured to work as a single-node cluster. The following steps will describe how to configure the Wazuh manager as a Wazuh ``master`` or ``worker`` node.

    **Master node:**

    #. .. include:: ../../../../_templates/installations/basic/wazuh/common/configure_wazuh_master_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

    .. include:: ../../../../_templates/installations/basic/wazuh/common/restart_wazuh_manager.rst


    **Worker node:**

    #. .. include:: ../../../../_templates/installations/basic/wazuh/common/configure_wazuh_worker_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../_templates/installations/basic/wazuh/common/restart_wazuh_manager.rst

    #. .. include:: ../../../../_templates/installations/basic/wazuh/common/check_wazuh_cluster.rst 


    **Certificates deployment**
    
    During the Elasticsearch installation, the ``certs.zip`` file was created. The file must be copied into the Wazuh server host, for example, using ``scp``. This guide assumes that the file is placed in ~/ (home user folder).

    The ``X`` must be replaced with the number used in the certificate name defined for this Wazuh server:

    .. code-block:: console

      # zip -d ~/certs.zip "ca/ca.key"
      # unzip ~/certs.zip -d ~/certs
      # cp -R ~/certs/ca/ ~/certs/filebeat-X/* /etc/filebeat/certs/
      # mv /etc/filebeat/certs/filebeat-X.crt /etc/filebeat/certs/filebeat.crt
      # mv /etc/filebeat/certs/filebeat-X.key /etc/filebeat/certs/filebeat.key
      # chmod -R 500 /etc/filebeat/certs
      # chmod 400 /etc/filebeat/certs/ca/ca.* /etc/filebeat/certs/filebeat.*
      # rm -rf ~/certs/ ~/certs.zip



Enable and start the Filebeat service:

.. include:: ../../../../_templates/installations/basic/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, run the following command:

.. code-block:: console

    # filebeat test output

An example response should look as follows:

.. code-block:: none
  :class: output

  elasticsearch: https://172.16.1.40:9200...
    parse url... OK
    connection...
      parse host... OK
      dns lookup... OK
      addresses: 172.16.1.40
      dial up... OK
    TLS...
      security: server's certificate chain verification is enabled
      handshake... OK
      TLS version: TLSv1.3
      dial up... OK
    talk to server... OK
    version: 7.8.1

