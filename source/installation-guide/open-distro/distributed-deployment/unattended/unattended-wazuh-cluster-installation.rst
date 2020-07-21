.. Copyright (C) 2020 Wazuh, Inc.

.. _unattended_distributed_wazuh:

Wazuh server unattended installation
====================================

This section will explain how to install the Wazuh manager, the Wazuh API, and Filebeat-OSS using an automated script. This script will perform a health check to verify that the system has enough resources to ensure the proper performance of the installation. For more information, please visit the :ref:`requirements <distributed_requirements>` section.

Run the script
--------------

.. note:: Root user privileges are required to run all the commands described below.

In order to download the script, ``curl`` package must be installed on the system:

.. tabs::

  .. group-tab:: Yum

    .. code-block:: console

        # yum install curl


  .. group-tab:: APT

    .. code-block:: console

        # apt install curl

Download the script:

.. code-block:: console

    # curl -so ~/wazuh-server-installation.sh https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/distributed/wazuh-server-installation.sh 
    

Filebeat needs to be configured by adding the Elasticsearch nodes IPs in order to connect with them. Choose between single-node or multi-node depending on the type of installation. The following commands assume that the script has been downloaded in the home directory ( ``~/`` ):

.. tabs::

  .. group-tab:: Single-node

    .. code-block:: console

        # bash ~/wazuh-server-installation.sh -ip <elasticsearch_IP>

    Replace the ``<elasticsearch_IP>`` by the corresponding Elasticsearch IP.


  .. group-tab:: Multi-node

    .. code-block:: console

        # bash ~/wazuh-server-installation.sh -ip <elasticsearch_IP_1> -ip <elasticsearch_IP_2>

    Replace the ``<elasticsearch_IP_X>`` values by the corresponding Elasticsearch IPs. There must be added as many ``-ip`` tags as nodes needed.


The script allows the following options:

+-------------------------------+---------------------------------------------------------------------------------------------------------------+
| Options                       | Purpose                                                                                                       |
+===============================+===============================================================================================================+
| -ip / --elasticsearch-ip      | Indicates the IP of Elasticsearch. Can be added as many as necessary                                          |
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


    .. include:: ../../../../_templates/installations/elastic/common/copy_certificates_filebeat.rst



  .. group-tab:: Multi-node


    By default, the Wazuh manager is configured to work as a single-node cluster. The following steps will describe how to configure the Wazuh manager as a Wazuh ``master`` or ``worker`` node.

    **Master node:**

    #. .. include:: ../../../../_templates/installations/wazuh/common/configure_wazuh_master_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

    .. include:: ../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst


    **Worker node:**

    #. .. include:: ../../../../_templates/installations/wazuh/common/configure_wazuh_worker_node.rst


    #. Once the ``/var/ossec/etc/ossec.conf`` configuration file is edited, the Wazuh manager needs to be restarted:

        .. include:: ../../../../_templates/installations/wazuh/common/restart_wazuh_manager.rst

    #. .. include:: ../../../../_templates/installations/wazuh/common/check_wazuh_cluster.rst 


    **Certificates deployment**
    
    .. include:: ../../../../_templates/installations/elastic/common/copy_certificates_filebeat_wazuh_cluster.rst



Enable and start the Filebeat service:

.. include:: ../../../../_templates/installations/elastic/common/enable_filebeat.rst

To ensure that Filebeat has been successfully installed, run the following command:

    .. code-block:: console

        # filebeat test output

An example response should look as follows:

.. code-block:: none
            :class: output

            elasticsearch: https://<elasticsearch_IP>:9200...
                parse url... OK
                connection...
                parse host... OK
                dns lookup... OK
                addresses: <elasticsearch_IP>
                dial up... OK
                TLS...
                security: server's certificate chain verification is enabled
                handshake... OK
                TLS version: TLSv1.3
                dial up... OK
                talk to server... OK
                version: 7.6.1s
