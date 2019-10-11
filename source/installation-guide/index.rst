.. Copyright (C) 2019 Wazuh, Inc.

.. _installation_guide:

Installation guide
==================

.. meta::
  :description: Read this guide to know how to install Wazuh and the Elasticsearch integration.

This document will guide you through the Wazuh installation process. Wazuh has one of the fastest growing open source security communities in the world. Here you can learn from other users, participate in discussions, talk to our developers and contribute to the project. If you have any doubt or need assistance:

- `Join our mailing list <wazuh+subscribe@googlegroups.com>`_. In `our Google group <https://groups.google.com/forum/#!forum/wazuh>`_ you can ask questions and participate in discussions. Share your questions and thoughts with the community.
- `Ask in GitHub <https://github.com/wazuh>`_. Don’t hesitate to collaborate, make pull-requests, submit issues or send commits, we will review all your questions.
- `Join us on Slack <https://wazuh.com/community/join-us-on-slack>`_. Yet another way to connect with us. Join our #community channel to ask your questions and we will do our best to resolve them.

We also provide `professional support, training and consulting services <https://wazuh.com/professional-services/>`_.

Concepts
--------

- **Wazuh server:** collects and analyzes data from deployed agents. Consists of: Wazuh manager, Wazuh API and Filebeat.

+ **Elastic Stack**: ingests and indexes data from the Wazuh server. It also provides a flexible visualization tool. Users can create bar graphs, line graphs and scatter plots or pie charts and maps to consolidate and display a large volume of Wazuh data. Consists of: Elasticsearch, Kibana and the Wazuh App. Logstash is optional.

- **Wazuh agent**: runs on the monitored endpoint. Collects endpoint logs, events and configuration data and sends it to the Wazuh server to detect intrusions and anomalies.

+ **Wazuh cluster**: a Wazuh cluster is a group of Wazuh managers that work together to enhance the availability and scalability of the service. With a Wazuh cluster setup, we have the potential to greatly increase the number of agents as long as we add worker nodes whenever necessary.

- **Elasticsearch cluster**:  an Elasticsearch cluster is a group of hosts with Elasticsearch installed with a specific configuration that allows enhancing the availability, scalability and data redundancy of the Elasticsearch service.

Installation types
------------------

The Wazuh server and Elastic stack can be installed and operated in either of these four deployments:

- **Single-host**: the Wazuh server and Elastic Stack subsystems run on a single host.

.. thumbnail:: ../images/installation/installing_wazuh_singlehost.png
    :title: Installing Wazuh manager - single server architecture
    :align: center
    :width: 100%

+ **Wazuh host and Elastic Stack host**: the Wazuh and Elastic Stack subsystems run on separate host systems.

.. thumbnail:: ../images/installation/installing_wazuh_distributed.png
    :title: Installing Wazuh manager and Elastic stack each in a single host
    :align: center
    :width: 100%

- **Wazuh cluster and Elastic Stack host**: Wazuh can be configured to work in two or more servers (cluster mode) and Elastic Stack in a single host.

.. thumbnail:: ../images/installation/installing_wazuh_cluster_elastic_single.png
    :title: Installing Wazuh manager as cluster with Elastic Stack in a single host
    :align: center
    :width: 100%

+ **Wazuh host and Elastic Stack cluster**: Wazuh run in a single host and Elastic Stack can be configured in three or more servers (cluster mode).

.. thumbnail:: ../images/installation/installing_wazuh_single_elastic_cluster.png
    :title: Installing Wazuh manager in a single host  with Elastic Stack as cluster
    :align: center
    :width: 100%

- **Wazuh cluster and Elastic Stack cluster**: Wazuh can be configured to work in two or more servers (cluster mode) and Elastic Stack as well.

.. thumbnail:: ../images/installation/installing_wazuh_cluster_elastic_cluster.png
    :title: Installing Wazuh manager as cluster with Elastic Stack as cluster
    :align: center
    :width: 100%

.. note::
  Before installing the components, please confirm that the time synchronization service is configured and working on your servers. This is most commonly done with **NTP**.  For more information, go to `Debian/Ubuntu <https://help.ubuntu.com/lts/serverguide/NTP.html>`_ or `CentOS/RHEL/Fedora/Amazon Linux/Oracle Linux/OpenSUSE/SUSE <http://www.tecmint.com/install-ntp-server-in-centos/>`_.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        installing-wazuh-server/index
        installing-elastic-stack/index
        installing-wazuh-agent/index
        packages-list/index
        compatibility_matrix/index
        other-installation-options/index
