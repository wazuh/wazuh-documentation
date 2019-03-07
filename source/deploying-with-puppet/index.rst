.. Copyright (C) 2018 Wazuh, Inc.

.. _wazuh_puppet:

Deploying with Puppet
=====================

.. meta::
  :description: Find instructions to deploy Wazuh using the Puppet tool.

Puppet is an open-source software tool that gives you an automatic way to inspect, deliver, operate and future-proof all of your software, no matter where it is executed. It runs on many Unix-like systems as well as on Microsoft Windows, and includes its own declarative language to describe system configuration. It is very simple to use and allows you to install and configure Wazuh easily.

Puppet works in a way called "master-agent" in which the master transmits some configuration files called "catalogs" to the agent machines in which the configuration will be carried out.
This procedure is very useful together with Wazuh because the Puppet master can configure hundreds of machines installing Wazuh in them with the desired configuration in a matter of minutes.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        setup-puppet/index
        wazuh-puppet-module/index
