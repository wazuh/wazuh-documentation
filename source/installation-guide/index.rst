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

Setting up Wazuh involves the installation of two server subsystems: the Wazuh server and Elastic Stack, along with the Wazuh agents:

- **Wazuh server:** collects and analyzes data from deployed agents. Consists of: Wazuh manager, Wazuh API and Filebeat.

+ **Elastic Stack**: manages the ingest, indexation of data from the Wazuh server.  In addition to this, it provides a flexible visualization tool. Users can create bar, line and scatter plots, or pie charts and maps on top of large volumes of Wazuh data. Consists of: Elasticsearch, Kibana and the Wazuh App. Logstash is optional.

- **Wazuh agent**: runs on the monitored endpoint. Collects endpoint logs, events and configuration data and sends it to the Wazuh server to detect intrusions and anomalies.

Installation types
------------------

The Wazuh server can be installed and operated in either of these two deployments:

- **Single-host server**: the Wazuh server and Elastic Stack subsystems run on a single host.

.. thumbnail:: ../images/installation/installing_wazuh_singlehost.png
    :title: Installing Wazuh manager - single server architecture
    :align: center
    :width: 100%

+ **Multitier server**: the Wazuh and Elastic Stack subsystems run on separate host systems. Wazuh can be configured to work in two or more servers (cluster mode) and Elastic Stack as well.

.. thumbnail:: ../images/installation/installing_wazuh_distributed.png
    :title: Installing Wazuh manager - Multitier Server
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
