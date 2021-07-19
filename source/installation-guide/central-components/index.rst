.. Copyright (C) 2021 Wazuh, Inc.

.. _central_components:

.. meta::
  :description: Wazuh is a free, open source and enterprise-ready security monitoring solution for threat detection, integrity monitoring, incident response and compliance.

Central components
==================

Wazuh central components are in charge of analyzing the data gathered by the Wazuh agents, providing a search engine and data visualization tool that allows users to navigate through their security alerts. The Wazuh central components include the Wazuh indexer, the Wazuh server and the Wazuh interface. 

You can install all the  Wazuh central components on the same server, as an all-in-one deployment, or on different servers as a distributed deployment that provides high availability and scalability of the product. 

Follow this installation workflow to install Wazuh. 

.. thumbnail:: ../../images/installation/Installation_workflow.png
  :title: Wazuh installation workflow
  :align: center
  :width: 100%


#. :ref:`Wazuh indexer <wazuh_indexer_installation>`: A highly scalable, full-text search and analytics engine based on Open Distro for Elasticsearch.
    
    The Wazuh indexer can be installed as a single-node or a multi-node cluster. Select an installation method, unattended or step-by-step and follow the instructions. 

    During the installation of the Wazuh indexer, the Wazuh certificates tool is used to create certificates to encrypt the communications between the different Wazuh central components, these certificates must be distributed to all the servers in the Wazuh installation. 
    
    Random passwords will also be generated for the system's users. 

#. :ref:`Wazuh server <wazuh_server_installation>`:  Is in charge of analyzing the data received from the Wazuh agents, triggering alerts when threats or anomalies are detected. It is also used to manage the agents' configuration remotely and to monitor their status. 

   It includes the Wazuh manager and the Wazuh forwarder, based on Filebeat-OSS. Select an installation method, unattended or step-by-step, and follow the instructions. 

   The Wazuh server can be deployed as a single or multi-node cluster depending on the environment needs. 

#. :ref:`Wazuh interface <wazuh_interface_installation>`: A flexible and intuitive web interface for mining, analyzing, and visualizing data based on Open Distro for Elasticsearch Kibana. It includes out-of-the-box dashboards for security events, regulatory compliance (e.g. PCI DSS, GDPR, CIS, HIPAA, NIST 800-53), detected vulnerable applications, file integrity monitoring data, configuration assessment results, cloud infrastructure monitoring events, and others.

    Select an installation method, unattended or step-by-step, and follow the instructions. 

After these steps, your Wazuh server is ready to use and you can deploy :ref:`Wazuh agents <installation_agents>` on the endpoints you wish to monitor.  



  .. toctree::
      :hidden:
      :maxdepth: 2

      wazuh-indexer/index
      wazuh-server/index
      wazuh-interface/index