.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install a Puppet agent in this section of the Wazuh documentation. 

.. _setup_puppet_agent:

Installing Puppet agent
=======================

This section explains how to install Puppet Agent. Follow this link to check the `official installation guide <https://puppet.com/docs/puppet/6.4/install_agents.html>`_.

We assume that you have already installed the ``apt`` or ``yum`` Puppet repository on your agent system in the same way that you did on your Puppet Server.

If you do not have DNS configured, use your hosts file for name resolution.

Edit the ``/etc/hosts`` file, and add the IP address and hostname of the Puppet master and agent:

.. code-block:: console

    <PUPPET_MASTER_IP> puppet puppet-master
    <PUPPET_AGENT_IP> puppet-agent

Where:

- ``PUPPET_MASTER_IP`` is the IP address of your Puppet master.
- ``PUPPET_AGENT_IP`` is the IP address of your Puppet agent.


Installation on CentOS/RHEL/Fedora
----------------------------------

See this `index <https://yum.puppetlabs.com/>`_ to find the correct rpm file to install the Puppet repo for your Linux distribution. For example, to install Puppet 7 for RHEL 9, do the following:

#. Install the Puppet yum repository and the puppet-agent package:

   .. code-block:: console

      # rpm -Uvh https://yum.puppetlabs.com/puppet7-release-el-9.noarch.rpm
      # yum -y install puppet-agent

#. Create a symbolic link between the installed binary file and your default binary file:

   .. code-block:: console

      # ln -s /opt/puppetlabs/bin/puppet /usr/local/bin


Installation on Debian/Ubuntu
-----------------------------

The manifest supports the following releases for installing Wazuh.

-  **Debian**: 7 (wheezy), 8 (jessie), 9 (stretch), 10 (buster), 11 (bullseye), 12 (bookworm)

-  **Ubuntu**: 12.04 (Precise Pangolin), 14.04 (Trusty Tahr), 15.04 (Vivid Vervet), 15.10 (Wily Werewolf), 16.04 (Xenial Xerus), 16.10 (Yakkety Yak), 18.04 (Bionic Beaver), 20.04 (Focal Fossa), 22.04 (Jammy Jellyfish), 24.04 (Noble Numbat).

#. Install ``curl``, ``apt-transport-https`` and ``lsb-release``:

   .. code-block:: console
   
       # apt-get update
       # apt-get install curl apt-transport-https lsb-release wget


#. Install the appropriate Puppet apt repository, and then the “puppet-agent” package. See https://apt.puppetlabs.com for the correct Debian file to install the Puppet repo for your Linux distribution.

   .. code-block:: console
   
       # wget https://apt.puppet.com/puppet7-release-focal.deb
       # dpkg -i puppet7-release-focal.deb
       # apt-get update
       # apt-get install -y puppet-agent


#. Create a symbolic link between the installed binary file and your default binary file:

   .. code-block:: console
   
       # ln -s /opt/puppetlabs/bin/puppet /usr/local/bin


Installation on Windows
-----------------------

1. Download the Windows `puppet-agent <https://downloads.puppetlabs.com/windows/puppet5/puppet-agent-5.1.0-x86.msi>`_ package.

    This package bundles all of Puppet's prerequisites.

    .. note::
      This is the package for a Puppet 7.16 version agent. If another package is needed, go to the `official directory <https://downloads.puppetlabs.com/windows/puppet7/>`_ where all packages are available for download.


2. Install Puppet.

    a. Using the Windows GUI:

      - Execute the GUI with elevated privileges.
      - During installation, Puppet asks you for the hostname of your Puppet master server.
      - For standalone Puppet nodes that won't connect to a master, use the default hostname (puppet). You might also want to install it on the command line and set the agent startup mode to Disabled.
      - Once the installer finishes, Puppet will be installed and running.


    b. Using command line:

        .. code-block:: console

           > msiexec /qn /norestart /i puppet-agent-<VERSION>-x64.msi

      Specify ``/l*v install.txt`` to log the installation's progress to a file. You can also set several MSI properties to pre-configure Puppet as you install it.     


Agent configuration
^^^^^^^^^^^^^^^^^^^

To configure the Puppet agent, edit the configuration file on the node.

- ``/etc/puppetlabs/puppet/puppet.conf`` for Linux systems

- ``C:\ProgramData\PuppetLabs\puppet\etc\puppet.conf`` for Windows systems

Add the ``server`` setting to the ``[main]`` section of the file. If you have set up your own DNS, replace puppet-master with the Fully Qualified Domain Name (FQDN) of your Puppet server.

.. code-block:: none

   [main]
   server = puppet-master

Restart and check the status of the Puppet service:

.. code-block:: console

    # puppet resource service puppet ensure=running enable=true
    # systemctl status puppet
