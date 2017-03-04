.. _installation_guide:

Installation guide
========================

This document will guide you through the installation process. For interactive help, our `email forum <https://groups.google.com/d/forum/wazuh>`_ is available.  You can subscribe by sending an email to ``wazuh+subscribe@googlegroups.com``.

This guide is mostly focused on a distributed architecture based on two servers. If you are setting everything up on one server, just perform all the steps on the same server, following the notes about single-server setups found in the Filebeat and Logstash configuration sections.

 - **Wazuh server**: Runs the Wazuh manager, API and Filebeat (only necessary in distributed architecture).
 - **Elastic Stack**: Runs the Elasticsearch engine, Logstash server and Kibana (including the Wazuh App).

**Distributed architecture**:

.. thumbnail:: ../images/installation/installing_wazuh.png
    :title: Installing Wazuh server - distributed architecture
    :align: center
    :width: 100%

**Single-server architecture**:

.. thumbnail:: ../images/installation/installing_wazuh_singlehost.png
    :title: Installing Wazuh server - single server architecture
    :align: center
    :width: 100%

.. note::
	Before installing the components please confirm time synchronization is configured and working on your servers. This is most commonly done with **NTP**.  More info for `Debian/Ubuntu <https://help.ubuntu.com/lts/serverguide/NTP.html>`_ and `CentOS/RHEL/Fedora <http://www.tecmint.com/install-ntp-server-in-centos/>`_.

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
