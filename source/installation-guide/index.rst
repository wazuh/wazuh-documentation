.. Copyright (C) 2019 Wazuh, Inc.

.. _installation_guide:

Installation guide
==================

.. meta::
  :description: Read this guide to know how to install Wazuh and the Elasticsearch integration.

This document will guide you through the Wazuh installation process. For interactive help, check our `community section <https://wazuh.com/community/>`_.

Concepts
--------

Setting up Wazuh involves the installation of two server subsystems - the Wazuh server and Elastic Stack - along with the Wazuh agents:

- **Wazuh server:** collects and analyze data from deployed agents. Consists of: Wazuh manager, Wazuh API and Filebeat.

+ **Elastic Stack**: ingests and indexes data from the Wazuh server. Consists of: Elasticsearch, Kibana and the Wazuh App. Logstash is optional.

- **Wazuh agent**: runs on the monitored endpoint. Collects endpoint logs, events and configuration data and sends it to the Wazuh server to detect intrusions and anomalies.

Installation types
------------------

The Wazuh server can be installed and operated in either of these two configurations:

- **Single-host server**: the Wazuh server and Elastic Stack subsystems run on a single host.

.. thumbnail:: ../images/installation/installing_wazuh_singlehost.png
    :title: Installing Wazuh manager - single server architecture
    :align: center
    :width: 100%

+ **Multitier server**: the Wazuh and Elastic Stack subsystems run on separate host systems. Wazuh can be configured to work along two or more servers (cluster mode) and Elastic Stack as well.

.. thumbnail:: ../images/installation/installing_wazuh_distributed.png
    :title: Installing Wazuh manager - Multitier Server
    :align: center
    :width: 100%

.. note::
  Before installing the components, please confirm that the time synchronization service is configured and working on your servers. This is most commonly done with **NTP**.  For more information, go to `Debian/Ubuntu <https://help.ubuntu.com/lts/serverguide/NTP.html>`_ or `CentOS/RHEL/Fedora <http://www.tecmint.com/install-ntp-server-in-centos/>`_.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        installing-wazuh-server/index
        installing-elastic-stack/index
        installing-wazuh-agent/index
        packages-list/index
        compatibility_matrix/index
        other-installation-options/index
