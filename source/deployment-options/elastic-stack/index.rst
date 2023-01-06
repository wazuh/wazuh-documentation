.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to install Wazuh with Elastic Stack basic license, deployment types, installation methods, and more. 
  
.. _basic_installation_guide:

Installing Wazuh with Elastic Stack basic license
=================================================

This section aims to guide the user through the installation process of Wazuh. This installation guide will use the Elastic Stack basic license option, which contains everything included in the open-source version under the Apache 2.0 license, plus additional capabilities such as Elastic Stack Security features, Kibana alerting, and others. More information about the Wazuh components, including a brief description of each one, can be found :doc:`here </installation-guide/index>`.

Compatibility matrix
--------------------

The following Elastic Stack and Open Distro for Elasticsearch versions are compatible with the Wazuh manager 4.3.10 using the Wazuh Kibana plugin:

+-------------------------+----------------------+
| Elastic stack version   | Open Distro version  | 
+=========================+======================+
| 7.10.2                  | 1.13.2               |  
+-------------------------+----------------------+
| 7.16.0–7.16.3           |                      | 
+-------------------------+----------------------+
| 7.17.0–7.17.6           |                      | 
+-------------------------+----------------------+

Packages list
-------------

This section contains packages required for the Wazuh 4.3.10 installation using the Elastic Stack option:

Wazuh Kibana plugin
^^^^^^^^^^^^^^^^^^^

.. |WAZUH_KIBANA_7.10.2| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.10.2.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.10.2-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.10.2-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.16.0| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.16.0.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.16.0-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.16.0-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.16.1| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.16.1.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.16.1-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.16.1-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.16.2| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.16.2.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.16.2-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.16.2-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.16.3| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.16.3.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.16.3-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.16.3-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.0| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.0.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.0-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.0-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.1| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.1.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.1-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.1-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.2| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.2.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.2-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.2-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.3| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.3.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.3-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.3-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.4| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.4.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.4-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.4-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.5| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.5.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.5-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.5-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.6| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.6.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.6-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.6-1.zip.sha512>`__)

+------------------+-----------------------+--------------------------+
| Kibana Version   | Open Distro Version   | Package                  |
+==================+=======================+==========================+
| 7.10.2           | 1.13.2                | |WAZUH_KIBANA_7.10.2|    |
+------------------+-----------------------+--------------------------+
| 7.16.0           |                       | |WAZUH_KIBANA_7.16.0|    |
+------------------+-----------------------+--------------------------+
| 7.16.1           |                       | |WAZUH_KIBANA_7.16.1|    |
+------------------+-----------------------+--------------------------+
| 7.16.2           |                       | |WAZUH_KIBANA_7.16.2|    |
+------------------+-----------------------+--------------------------+
| 7.16.3           |                       | |WAZUH_KIBANA_7.16.3|    |
+------------------+-----------------------+--------------------------+
| 7.17.0           |                       | |WAZUH_KIBANA_7.17.0|    |
+------------------+-----------------------+--------------------------+
| 7.17.1           |                       | |WAZUH_KIBANA_7.17.1|    |
+------------------+-----------------------+--------------------------+
| 7.17.2           |                       | |WAZUH_KIBANA_7.17.2|    |
+------------------+-----------------------+--------------------------+
| 7.17.3           |                       | |WAZUH_KIBANA_7.17.3|    |
+------------------+-----------------------+--------------------------+
| 7.17.4           |                       | |WAZUH_KIBANA_7.17.4|    |
+------------------+-----------------------+--------------------------+
| 7.17.5           |                       | |WAZUH_KIBANA_7.17.5|    |
+------------------+-----------------------+--------------------------+
| 7.17.6           |                       | |WAZUH_KIBANA_7.17.6|    |
+------------------+-----------------------+--------------------------+

For a complete list of the available versions, see the `Wazuh Kibana plugin compatibility matrix <https://github.com/wazuh/wazuh-kibana-app/wiki/Compatibility>`_.

Filebeat
^^^^^^^^

+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Package type | Package                                                                                                                                                                                                                                         |
+==============+=================================================================================================================================================================================================================================================+
|     RPM      | `filebeat-oss-|ELASTICSEARCH_LATEST|-x86_64.rpm <https://packages.wazuh.com/4.x/yum/filebeat-oss-|ELASTICSEARCH_LATEST|-x86_64.rpm>`_ (`sha512 <https://packages.wazuh.com/4.x/checksums/elasticsearch/|ELASTICSEARCH_LATEST|/filebeat-oss-|ELASTICSEARCH_LATEST|-x86_64.rpm.sha512>`__)                        |
+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
|     DEB      | `filebeat-oss-|ELASTICSEARCH_LATEST|-amd64.deb <https://packages.wazuh.com/4.x/apt/pool/main/f/filebeat/filebeat-oss-|ELASTICSEARCH_LATEST|-amd64.deb>`_ (`sha512 <https://packages.wazuh.com/4.x/checksums/elasticsearch/|ELASTICSEARCH_LATEST|/filebeat-oss-|ELASTICSEARCH_LATEST|-amd64.deb.sha512>`__)      |
+--------------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Deployment types
----------------

The installation guide is divided into two independent sections: all-in-one deployment and distributed deployment, according to the chosen configuration. The installation requirements for the Wazuh server and Elastic Stack are similar to those described in the :ref:`requirements <installation_requirements>` section.


All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^
  
Wazuh server and Elastic Stack are installed on the same host. This type of deployment is appropriate for testing and small working environments. 

      .. thumbnail:: ../../images/installation/all-in-one-deployment.png
        :title: All-in-one deployment
        :align: center
        :width: 80%

    The following components will be installed:

    - The Wazuh server, including the Wazuh manager as a single-node cluster, and Filebeat. 

    - Elastic Stack, including Elasticsearch as a single-node cluster, and Kibana, including the Wazuh Kibana plugin.

    The communication is encrypted using certificates. Follow the installation guide to install and configure all the required components.



Distributed deployment
^^^^^^^^^^^^^^^^^^^^^^

Each component is installed in a separate host as a single-node or multi-node cluster. This type of deployment allows high availability and scalability of the product and is convenient for large working environments.

Kibana can be installed on the same server as the Elasticsearch node, or on a separate one. This type of deployment is appropriate for production environments as it provides high availability and scalability of the services.

      .. thumbnail:: ../../images/installation/distributed-no-title.png
        :title: Distributed deployment
        :align: center
        :width: 80%

    The following components will be installed:

    - The Wazuh server, including the Wazuh manager as a single-node cluster or as a multi-node cluster, and Filebeat.

    - Elastic Stack as a single-node cluster or as a multi-node cluster, and Kibana, including the Wazuh Kibana plugin, on the same host as Elasticsearch node or on a separate one.

    The communication will be encrypted using certificates, and the user can follow the installation steps guide to install all required components.



Start deploying Wazuh and Elastic Stack
---------------------------------------

.. toctree::
    :maxdepth: 1

    all-in-one-deployment/index
    distributed-deployment/index
