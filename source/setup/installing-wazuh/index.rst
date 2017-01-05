.. _installation:

Installing Wazuh
==================

This guide decribes how to install Wazuh and get it running. Before starting you need to know how each component fixs in the architecture.

A Wazuh environment consists in 3 parts:

 - Wazuh Server: Wazuh Manager, Wazuh API and Filebeat.
 - Elastic Server: Logstash, Elasticsearch, Kibana, Wazuh APP.
 - Production hosts: Wazuh Agent, OpenSCAP scanner.

There are 3 ways to install Wazuh according to where you want to locate each component:

.. image:: ../../images/installation/installation_diagram.png
    :align: center
    :width: 100%

Each option is described below.

Option 1: Recommended installation
--------------------------------------

The recommended installation is to install *Elastic server* on one host and *Wazuh server* on another. This solution is more stable, efficient and scalable.

.. topic:: Contents

    .. toctree::
       :maxdepth: 1

       recommended-installation/index


Option 2: Single host installation
--------------------------------------

It is possible to deploy all the components in a single server. This option requires a server with high resources (specially memory RAM) and it is only recommended if your environment has a low rate of alerts per second.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        installation_single

Option 3: Docker container
--------------------------------------

This installation is performed using a docker container. It includes both Wazuh server and Elastic server. As in a single host installation, this option requires a server with high resources.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        wazuh_docker
