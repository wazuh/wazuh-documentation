.. _packages_list:

Installation guide
========================

This document will guide you through the installation process, from downloading Wazuh to registering agents. Before installing, you would be well advised to view the :ref:`Getting started <getting_started>` section. See the :ref:`User manual <user_manual>` for configuration overview. For interactive help, our `email support forum <https://groups.google.com/d/forum/wazuh>`_ is available.  You can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``.

This guide is mostly focused on a distributed architecture based on two servers.  If you are setting everything up on one server, just perform all the steps on the same server, following the notes about single-server setups found in the Filebeat and Logstash configuration sections.

 - **Wazuh server**: Runs the Wazuh manager, API and probably Filebeat.
 - **Elastic Stack**: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).

.. thumbnail:: ../images/installation/installing_wazuh.png
    :title: Installing Wazuh Manager
    :align: center
    :width: 100%

.. note::
	Before installing the components please confirm time synchronization is configured and working on both servers.  This is most commonly done with **NTP**.  More info for `Debian/Ubuntu <https://help.ubuntu.com/lts/serverguide/NTP.html>`_ and `CentOS/RHEL/Fedora <http://www.tecmint.com/install-ntp-server-in-centos/>`_.

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
