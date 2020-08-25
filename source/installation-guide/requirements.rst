.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_requirements:


Requirements
============

This section aims to provide guidance about the supported operating systems as well as the minimum hardware requirements  for the different types of deployments of Wazuh and Elastic Stack or Open Distro for Elasticsearch.

Supported operating systems
---------------------------

The Wazuh server and Elastic Stack or Open Distro for Elasticsearch components can be installed in the following Linux operating systems:

- Amazon Linux 1 and 2.

- CentOS 6 or greater.

- Debian 7 or greater.

- Fedora 22 or greater.

- Oracle Linux 6 or greater.

- Red Hat Enterprise Linux 6 or greater.

- Ubuntu 12 or greater.


All-in-one deployment
---------------------

In an All-in-one deployment, Wazuh server and Elastic Stack or Open Distro for Elasticsearch, are installed on the same host. This type of deployment is suitable for testing and small production environments. For a typical environment, this type of configuration is adequate for around 100 agents or less.  

The minimum hardware specifications recommended are 16 GB of RAM and 4 CPU cores. Although Wazuh can be installed in either a 32-bit or 64-bit operating system, a 64-bit operating system is necessary for this type of deployment due to the requirements of Elastic Stack and Open Distro for Elasticsearch. More information can be found `here <https://www.elastic.co/support/matrix>`_.

Regarding the disk space, 100 agents are expected to generate around 200 GB of data in 90 days, but depending on the type of monitored endpoints this can vary greatly.

Distributed deployment
----------------------

In a distributed deployment, the Wazuh server and the Elastic Stack or Open Distro for Elasticsearch are installed on separate hosts. This configuration is recommended for production environments as it provides the high availability and scalability of the services. 

The Wazuh server and the Elastic Stack or Open Distro for Elasticsearch can each be installed as a single-node or as multi-node cluster. Kibana can either be installed in the same node as Elasticsearch or Open Distro for Elasticsearch, or in a dedicated host. For each node, the minimum hardware recommendations are: 

+-------------------------------------------------+------------+------------+
| Component                                       | RAM (GB)   | CPU (cores)|
+=================================================+============+============+
| Wazuh server                                    |     8      |     4      |
+-------------------------------------------------+------------+------------+
| Elastic Stack /  Open Distro for Elasticsearch  |     16     |     4      |  
+-------------------------------------------------+------------+------------+       
| Kibana                                          |     4      |     2      |                                         
+-------------------------------------------------+------------+------------+

Wazuh servers can be installed in 32-bit or 64-bit operating systems. A 64-bit operating system is necessary for Elastic Stack or Open Distro for Elasticsearch.  

Regarding the disk space, 100 agents are expected to generate around 50 GB of data in a Wazuh server and around 150 GB of data in a Elasticsearch or Open Distro for Elasticsearch server in a period of 90 days. Depending on the type of monitored endpoints this quantity can vary greatly.

Scaling 
-------

In order to determine if a Wazuh server requires more resources the following files may be monitored: ``/var/ossec/var/run/ossec-analysisd.state``  and  ``/var/ossec/var/run/ossec-remoted.state`` .

In the ``analysid.state`` file the variable  ``events_dropped`` indicates whether events are being dropped due to lack of resources. Similarly ``ossec-remoted.state`` has the variable ``discarded_count``, that indicates if messages from the agents have been discarded.  These two variables should be zero if the environment is working properly. If it is not the case, additional nodes can be added to the cluster. 

To monitor if the Elastic Stack or Open Distro for Elasticsearch environment is working properly, there are tools available like `cluster monitoring <https://www.elastic.co/guide/en/elasticsearch/reference/7.9/monitor-elasticsearch-cluster.html>`_  for Elastic Stack and `performance analyzer <https://opendistro.github.io/for-elasticsearch-docs/docs/pa/>`_ for Open Distro for Elasticsearch. 

In case that scaling is needed, the following sections describe how to make a distributed deployment with the selected configuration: :ref:`Wazuh and Elastic Stack  <basic_distributed_index>` or :ref:`Wazuh and Open Distro for Elasticsearch <distributed_index>`.  



