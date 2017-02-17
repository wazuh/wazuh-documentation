.. _packages_list:

Installation guide
========================

This document will guide you through the installation process, from downloading Wazuh to registering agents. Before installing, you would be well advised to view the :ref:`Getting started <getting_started>` section. See the :ref:`User manual <user_manual>` for configuration overview. For interactive help, our `email support forum <https://groups.google.com/d/forum/wazuh>`_ is availablei.  You can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``.

We will set up a distributed architecture based on two servers:

 - **Wazuh server**: Runs the Wazuh manager, API and Filebeat.
 - **Elastic Stack**: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).

.. thumbnail:: ../images/installation/installing_wazuh.png
    :title: Installing Wazuh Manager
    :align: center
    :width: 100%

.. note::
    In case you need a single-host architecture (Wazuh Manager and Elastic stack on the same server), perform all the steps in the same server.

.. note::
	Before installing the components please configure your **NTP** to sync time. **NTP** is a TCP/IP protocol for synchronising time over a network. Basically a client requests the current time from a server, and uses it to set its own clock. More info `deb <https://help.ubuntu.com/lts/serverguide/NTP.html>`_ , `rpm <http://www.tecmint.com/install-ntp-server-in-centos/>`_

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        installing-wazuh-server/index
        installing-elastic-stack/index
        installing-agents/index
        optional-configurations/index
        upgrading/index
        virtual_machines
      	packages_list/index
