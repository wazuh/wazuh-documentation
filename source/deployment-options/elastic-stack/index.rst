.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out how to install Wazuh with Elastic Stack basic license, deployment types, installation methods, and more. 
  
.. _basic_installation_guide:

Installing Wazuh with Elastic Stack
===================================

This section aims to guide the user through the installation process of Wazuh. This installation guide will use the Elastic Stack basic license option, which contains everything included in the open-source version under the Apache 2.0 license, plus additional capabilities such as Elastic Stack Security features, Kibana alerting, and others.

This guide includes instructions to install Wazuh |WAZUH_CURRENT| and Elastic Stack |ELASTICSEARCH_ELK_LATEST|.  For a list of compatible versions, check below our :ref:`Compatibility matrix <compatibility_matrix_elk>` and :ref:`Packages list <packages_list_elk>`.  


Deployment types
----------------

The installation guide is divided into two independent sections: all-in-one deployment and distributed deployment, according to the chosen configuration. The installation requirements for the Wazuh server and Elastic Stack are similar to those described in the :ref:`requirements <installation_requirements>` section.


All-in-one deployment
^^^^^^^^^^^^^^^^^^^^^
  
Wazuh server and Elastic Stack are installed on the same host. This type of deployment is appropriate for testing and small working environments. 

      .. thumbnail:: ../../images/installation/all-in-one-deployment.png
        :title: All-in-one deployment
        :alt: All-in-one deployment
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

      .. thumbnail:: ../../images/installation/distributed-deployment.png
        :title: Distributed deployment
        :alt: Distributed deployment
        :align: center
        :width: 80%

    The following components will be installed:

    - The Wazuh server, including the Wazuh manager as a single-node cluster or as a multi-node cluster, and Filebeat.

    - Elastic Stack as a single-node cluster or as a multi-node cluster, and Kibana, including the Wazuh Kibana plugin, on the same host as Elasticsearch node or on a separate one.

    The communication will be encrypted using certificates, and the user can follow the installation steps guide to install all required components.


.. _compatibility_matrix_elk:

Compatibility matrix
--------------------

The following Elastic Stack versions are compatible with the Wazuh manager |WAZUH_CURRENT| using the Wazuh Kibana plugin:

+-------------------------+
| Elastic stack version   |
+=========================+
| 7.10.2                  |
+-------------------------+
| 7.16.0–7.16.3           |
+-------------------------+
| 7.17.0–7.17.9           | 
+-------------------------+

.. _packages_list_elk:

Packages list
-------------

The following table contains the Wazuh Kibana plugin files for each version of Elastic Stack compatible with Wazuh |WAZUH_CURRENT|:


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

.. |WAZUH_KIBANA_7.17.7| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.7.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.7-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.7-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.8| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.8.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.8-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.8-1.zip.sha512>`__)

.. |WAZUH_KIBANA_7.17.9| replace:: `wazuh_kibana-|WAZUH_CURRENT|_7.17.9.zip <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/ui/kibana/wazuh_kibana-|WAZUH_CURRENT|_7.17.9-1.zip>`__ (`sha512 <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh_kibana-|WAZUH_CURRENT|_7.17.9-1.zip.sha512>`__)

+------------------+--------------------------+
| Kibana Version   | Package                  |
+==================+==========================+
| 7.10.2           | |WAZUH_KIBANA_7.10.2|    |
+------------------+--------------------------+
| 7.16.0           | |WAZUH_KIBANA_7.16.0|    |
+------------------+--------------------------+
| 7.16.1           | |WAZUH_KIBANA_7.16.1|    |
+------------------+--------------------------+
| 7.16.2           | |WAZUH_KIBANA_7.16.2|    |
+------------------+--------------------------+
| 7.16.3           | |WAZUH_KIBANA_7.16.3|    |
+------------------+--------------------------+
| 7.17.0           | |WAZUH_KIBANA_7.17.0|    |
+------------------+--------------------------+
| 7.17.1           | |WAZUH_KIBANA_7.17.1|    |
+------------------+--------------------------+
| 7.17.2           | |WAZUH_KIBANA_7.17.2|    |
+------------------+--------------------------+
| 7.17.3           | |WAZUH_KIBANA_7.17.3|    |
+------------------+--------------------------+
| 7.17.4           | |WAZUH_KIBANA_7.17.4|    |
+------------------+--------------------------+
| 7.17.5           | |WAZUH_KIBANA_7.17.5|    |
+------------------+--------------------------+
| 7.17.6           | |WAZUH_KIBANA_7.17.6|    |
+------------------+--------------------------+
| 7.17.7           | |WAZUH_KIBANA_7.17.7|    |
+------------------+--------------------------+
| 7.17.8           | |WAZUH_KIBANA_7.17.8|    |
+------------------+--------------------------+
| 7.17.9           | |WAZUH_KIBANA_7.17.9|    |
+------------------+--------------------------+

For a full list of the available Wazuh Kibana plugin packages, check the `Wazuh Kibana plugin compatibility matrix <https://github.com/wazuh/wazuh-kibana-app/wiki/Compatibility>`__.  


Start deploying Wazuh and Elastic Stack
---------------------------------------

.. toctree::
    :maxdepth: 1

    all-in-one-deployment/index
    distributed-deployment/index
