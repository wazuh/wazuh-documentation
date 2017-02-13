.. _installation_main:

Installation via packages
======================================

This guide describes the installation of Wazuh using packages. We will setup a distributed architecture based on two servers:

 - **Wazuh server**: Runs the Wazuh Manager, API and Filebeat.
 - **Elastic Stack**: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).

.. thumbnail:: ../../../images/installation/installing_wazuh.png
    :title: Installing Wazuh Manager
    :align: center
    :width: 100%

.. note::
    In case you need a single-host architecture (Wazuh Manager and Elastic stack on the same server), perform all the steps in the same server.

.. note::
	Before installing the components please configure your **NTP** to sync time. **NTP** is a TCP/IP protocol for synchronising time over a network. Basically a client requests the current time from a server, and uses it to set its own clock. More info `deb <https://help.ubuntu.com/lts/serverguide/NTP.html>`_ , `rpm <http://www.tecmint.com/install-ntp-server-in-centos/>`_


Follow the next guides to install and configure Wazuh server and Elastic Stack:

Debian-based systems
-------------------------------------------------

.. topic:: Wazuh server

    .. toctree::
        :maxdepth: 1

        wazuh_server_deb
        filebeat_deb

.. topic:: Elastic Stack

    .. toctree::
        :maxdepth: 1

        elastic_server_deb

RPM-based systems
-------------------------------------------------

.. topic:: Wazuh server

    .. toctree::
        :maxdepth: 1

        wazuh_server_rpm
        filebeat_rpm

.. topic:: Elastic Stack

    .. toctree::
        :maxdepth: 1

        elastic_server_rpm
