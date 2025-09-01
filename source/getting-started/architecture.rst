.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the architecture of Wazuh, our open source cybersecurity platform, in this section of our documentation. 
  
Getting started with Wazuh - Architecture
=========================================

The Wazuh architecture is composed of a multi-platform Wazuh :doc:`agent <components/wazuh-agent>` and three central components: the Wazuh :doc:`server <components/wazuh-server>`, Wazuh :doc:`indexer <components/wazuh-indexer>`, and Wazuh :doc:`dashboard <components/wazuh-dashboard>`. The agent is deployed on endpoints to collect and forward security data to the Wazuh server for analysis. The analyzed data is then forwarded to the Wazuh indexer for indexing and storage, and subsequently to the Wazuh dashboard for alerting and visualization.

Wazuh also supports agentless monitoring for systems and devices where installing the Wazuh agent is not possible. Network devices such as firewalls, switches, routers, and access points can actively forward log data via Syslog and SSH.

The Wazuh central components can be deployed in different ways, depending on scalability and availability needs:

-  **All-in-one deployment:** All Wazuh components (server, indexer, and dashboard) are installed on a single server. Best suited for labs and small environments with a limited number of monitored endpoints.

-  **Single-node deployment:** The Wazuh server, indexer, and dashboard are each deployed on separate servers. Recommended for medium environments that require higher performance than an all-in-one setup.

-  **Multi-node deployment:** Typically, one instance of the Wazuh dashboard and multiple instances of the Wazuh server (Wazuh server cluster) and indexer (Wazuh indexer cluster) are deployed on their individual servers, respectively. The number of instances varies depending on your needs. This deployment is recommended for large environments with high event throughput, or when fault tolerance and high availability are required.

Visit the :doc:`installation guide </installation-guide/index>` and :doc:`installation alternatives </deployment-options/index>` documentation to learn about the different ways to deploy Wazuh.

The diagram below represents a Wazuh deployment architecture. It shows how the Wazuh server and the Wazuh indexer nodes can be configured as clusters, providing load balancing and high availability.

.. thumbnail:: /images/getting-started/deployment-architecture.png    
   :title: Deployment architecture
   :alt: Deployment architecture
   :align: center
   :width: 80%

Component communication
=======================

Wazuh agent - Wazuh server
--------------------------

The :doc:`Wazuh agent <components/wazuh-agent>` continuously sends events to the :doc:`Wazuh server <components/wazuh-server>` for analysis and threat detection. To start shipping this data, the agent establishes a connection with the Wazuh server service for agent connection, which listens on TCP port 1514 by default (this is configurable). The Wazuh server then decodes and matches rules against the received events, utilizing the Wazuh Analysis engine. 

The Wazuh messages protocol uses AES encryption by default, with 128 bits per block and 256-bit keys. Blowfish encryption is optional.

.. note::
   
   Read the `Benefits of using AES in the Wazuh communications <https://wazuh.com/blog/benefits-of-using-aes-in-our-communications>`_ document for more information.

Wazuh server - Wazuh indexer
-----------------------------

The Wazuh server uses Filebeat to send alert and event data to the Wazuh indexer, using TLS encryption. Filebeat reads the Wazuh server output data and sends it to the Wazuh indexer (by default listening on port 9200/TCP). Once the data is indexed by the Wazuh indexer, the Wazuh dashboard is used to query and visualize the security information.

Wazuh dashboard - Wazuh dashboard/Wazuh indexer
-----------------------------------------------

The Wazuh dashboard queries the Wazuh server API (by default listening on port 55000/TCP on the Wazuh server) to display configuration and status-related information of the :doc:`Wazuh server <components/wazuh-server>` and :doc:`agents <components/wazuh-agent>`. This communication is encrypted with TLS and authenticated with a username and password.

The Wazuh dashboard visualizes and queries the information indexed on the Wazuh indexer.

.. _default_ports:

Required ports
==============

Wazuh components communicate using several services. The list of default ports used by these services is shown below. Users can modify these port numbers when necessary.

+-----------------+-----------+----------------+------------------------------------------------+
|  Component      | Port      | Protocol       | Purpose                                        |
+=================+===========+================+================================================+
|                 | 1514      | TCP (default)  | Agent connection service                       |
+                 +-----------+----------------+------------------------------------------------+
|                 | 1514      | UDP (optional) | Agent connection service (disabled by default) |
+                 +-----------+----------------+------------------------------------------------+
| Wazuh server    | 1515      | TCP            | Agent enrollment service                       |
+                 +-----------+----------------+------------------------------------------------+
|                 | 1516      | TCP            | Wazuh cluster daemon                           |
+                 +-----------+----------------+------------------------------------------------+
|                 | 514       | UDP (default)  | Wazuh Syslog collector (disabled by default)   |
+                 +-----------+----------------+------------------------------------------------+
|                 | 514       | TCP (optional) | Wazuh Syslog collector (disabled by default)   |
+                 +-----------+----------------+------------------------------------------------+
|                 | 55000     | TCP            | Wazuh server RESTful API                       |
+-----------------+-----------+----------------+------------------------------------------------+
|                 | 9200      | TCP            | Wazuh indexer RESTful API                      |
+ Wazuh indexer   +-----------+----------------+------------------------------------------------+
|                 | 9300-9400 | TCP            | Wazuh indexer cluster communication            |
+-----------------+-----------+----------------+------------------------------------------------+
| Wazuh dashboard | 443       | TCP            | Wazuh web user interface                       |
+-----------------+-----------+----------------+------------------------------------------------+

Wazuh CTI
=========

The Wazuh Cyber Threat Intelligence (CTI) service is a publicly accessible platform that collects, analyzes, and disseminates actionable information on emerging cyber threats and vulnerabilities. This service currently focuses on vulnerability intelligence, delivering timely updates on Common Vulnerabilities and Exposures (CVEs), severity scores, exploitability insights, and mitigation strategies. It aggregates and sanitizes data from trusted sources, including operating system vendors and major vulnerability databases, to ensure high-quality, relevant intelligence. 

This service is integrated directly with the Wazuh Vulnerability Detection module, but is also publicly available at the `Wazuh CTI website <https://cti.wazuh.com/>`_.
