.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh

.. _installation_guide:

Quick start environment guide
=============================

.. meta::
  :description: Read this guide to know how to install Wazuh and the Elasticsearch integration.

This document will guide you through the Wazuh installation process. You also have the following resources available, in case you have questions or need assistance:

- `Mailing list <wazuh+subscribe@googlegroups.com>`_: in `our Google group <https://groups.google.com/forum/#!forum/wazuh>`_ you can share your questions and thoughts with our users community.
- `GitHub repositories <https://github.com/wazuh>`_: here you can submit issues and contribute to the project development. We happily review and accept pull requests.
- `Slack channel <https://wazuh.com/community/join-us-on-slack>`_: join users community channel to chat with our team members and other users.

In addition, we also provide `professional support, training and consulting services <https://wazuh.com/professional-services/>`_.

Basic concepts
--------------

- **Wazuh agent**: runs on the monitored endpoint. Collects log data and security events. It also performs inventory and hardening scans, detects malware and system anomalies, and executes active responses.

+ **Wazuh server**: collects and analyzes data from deployed agents. It runs the Wazuh manager, the Wazuh API and Filebeat.

- **Elastic Stack**: ingests and indexes data from the Wazuh server. It provides a search engine and a Wazuh user interface for configuration management and data visualization. It runs Elasticsearch and Kibana with the Wazuh plugin. Logstash is optional.

+ **Wazuh cluster**: is a group of Wazuh servers, that works together to provide high availability and load balancing. With a cluster configuration, your Wazuh infrastructure can scale as much as you need.

- **Elasticsearch cluster**: is a group of Elasticsearch nodes configured to work together. It provides high availability, scalability and load balancing for data indexing and searching.

Installation types
------------------

The Wazuh server and Elastic stack can be installed and operated in either of these five deployments:

- **Single-host**: the Wazuh server and Elastic Stack subsystems run on a single host.

.. thumbnail:: ../images/installation/installing_wazuh_architecture_onehost.png
    :title: Installing Wazuh manager - single server architecture
    :align: center
    :width: 100%

+ **Wazuh host and Elastic Stack host**: the Wazuh and Elastic Stack subsystems run on separate host systems.

.. thumbnail:: ../images/installation/installing_wazuh_architecture_twohosts.png
    :title: Installing Wazuh manager and Elastic stack each in a single host
    :align: center
    :width: 100%

- **Wazuh cluster and Elastic Stack host**: Wazuh can be configured to work in two or more servers (cluster mode) and Elastic Stack in a single host.

.. thumbnail:: ../images/installation/installing_wazuh_architecture_wazuhcluster.png
    :title: Installing Wazuh manager as cluster with Elastic Stack in a single host
    :align: center
    :width: 100%

+ **Wazuh host and Elastic Stack cluster**: Wazuh run in a single host and Elastic Stack can be configured in three or more servers (cluster mode).

.. thumbnail:: ../images/installation/installing_wazuh_architecture_elkcluster.png
    :title: Installing Wazuh manager in a single host  with Elastic Stack as cluster
    :align: center
    :width: 100%

- **Wazuh cluster and Elastic Stack cluster**: Wazuh can be configured to work in two or more servers (cluster mode) and Elastic Stack as well.

.. thumbnail:: ../images/installation/installing_wazuh_architecture_bothcluster.png
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
