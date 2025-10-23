.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the different instances of Puppet in this section of the Wazuh documentation. 

.. _setup_puppet:

Set up Puppet
=============

In this section, we will explain how to install the different instances of Puppet. For a more detailed guide, see the `official Puppet documentation <https://puppet.com/docs/puppet/latest/puppet_index.html>`_.

Before we get started with Puppet, confirm that the following network requirements are met:

- **Private network DNS**: Forward and reverse DNS must be configured, and every server must have a unique hostname. If you do not have DNS configured, use your hosts file for name resolution. We assume you will use your private network for communication within your infrastructure.

- **Firewall open ports**: The Puppet master must be reachable on TCP port 8140.

.. note:: 
   
   We made this guide using Puppet version 7.16. You need root user privileges to run all the commands described below.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        install-puppet-master.rst
        install-puppet-agent.rst        
        setup-puppet-certificates.rst
        

This section explains how to install puppet-master. Follow this link to check the `official installation guide <https://puppet.com/docs/puppetserver/latest/install_from_packages.html>`_.

If you do not have DNS configured, you must use your hosts file for name resolution. 
Edit the ``/etc/hosts`` file and add the following:

.. code-block:: console

    <PUPPET_MASTER_IP> puppet puppet-master
    <PUPPET_AGENT_IP> puppet-agent

Where:

- ``PUPPET_MASTER_IP`` is the IP address of your Puppet master.

- ``PUPPET_AGENT_IP`` is the IP address of your Puppet agent.