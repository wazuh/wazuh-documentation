.. Copyright (C) 2018 Wazuh, Inc.

.. _setup_puppet_agent:

Installing Puppet agent
=======================

In this section it is explained how to install *puppet-master*. Follow this link to check the `Official installation guide. <https://puppet.com/docs/puppet/5.1/install_linux.html>`_

In this section we assume that you have already installed the ``apt`` or ``yum`` Puppet repository on your agent system in the same way that you did on your Puppet Server.

Installation on CentOS/RHEL/Fedora
----------------------------------

Install the Puppet yum repository and then the "puppet-agent" package. See this `index <https://yum.puppetlabs.com/>`_ to find the correct rpm file needed to install the puppet repo for your Linux distribution. For example, to install Puppet 5 for CentOS 7 or RHEL 7, do the following:

.. code-block:: console

   # rpm -ivh https://yum.puppetlabs.com/puppet5/puppet5-release-el-7.noarch.rpm
   # yum -y install puppet-agent

.. note:: 

  For a correct installation we recommend the use of Puppet versions equal or greater than 5.

Installation on Debian/Ubuntu
-----------------------------

Install ``curl``, ``apt-transport-https`` and ``lsb-release``:

.. code-block:: console

	# apt-get update
	# apt-get install curl apt-transport-https lsb-release

Get the appropriate Puppet apt repository, and then the "puppet-agent" package. See https://apt.puppetlabs.com to find the correct deb file to install the puppet repo for your Linux distribution.

.. code-block:: console

  # wget https://apt.puppetlabs.com/puppet5-release-xenial.deb
  # dpkg -i puppet5-release-xenial.deb
  # apt update
  # apt-get install -y puppet-agent

Create a symbolic link between the installed binary file and your default binary file:

  .. code-block:: bash
    
    # ln -s /opt/puppetlabs/bin/puppet /bin

.. note:: We recommend to use Puppet versions from 5.1 to 6.0.


.. note:: The releases supported by the manifest to install Wazuh are as follows: 

      Ubuntu: **precise | trusty | vivid | wily | xenial | yakketi | bionic**

      Debian: **jessie | wheezy | stretch | sid**
  

Installation on Windows
-----------------------

1 - Download the Windows `puppet-agent <https://downloads.puppetlabs.com/windows/puppet5/>`_ package.
  This package bundle all of Puppet's prerequisites.

2 - Install Puppet.
  
  a. Using command line: Double-click the MSI package downloaded and follow the GUI instructions.

      .. code-block:: bash
      
        msiexec /qn /norestart /i puppet-agent-<VERSION>-x64.msi

    Optionally, you can specify ``/l*v install.txt`` to log the installation’s progress to a file.

    You can also set several MSI properties to pre-configure Puppet as you install it. For example:
        
      .. code-block:: bash

        msiexec /qn /norestart /i puppet-agent-<VERSION>-x64.msi PUPPET_MASTER_SERVER=puppet.example.com

  b. Using the Windows GUI:

    - Execute the GUI with elevated privileges.
    - During installation, Puppet asks you for the hostname of your Puppet master server. This must be a *nix node configured to act as a Puppet master.
    - For standalone Puppet nodes that won’t connect to a master, use the default hostname (*puppet*). You might also want to install on the command line and set the agent startup mode to *Disabled*.
    - Once the installer finishes, Puppet will be installed, running, and partially configured.

Configuration
^^^^^^^^^^^^^

Add the server value to the ``[main]`` section of the node’s ``/etc/puppetlabs/puppet/puppet.conf`` file, replacing ``puppet.example.com`` with your Puppet Server’s FQDN::

   [main]
   server = puppet.example.com

Restart the Puppet service:

.. code-block:: console

   # puppet resource service puppet ensure=running enable=true
