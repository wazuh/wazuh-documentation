.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install a Puppet agent in this section of the Wazuh documentation. 

.. _setup_puppet_agent:

Installing Puppet agent
=======================

In this section it is explained how to install *puppet-agent*. Follow this link to check the `official installation guide <https://puppet.com/docs/puppet/6.4/install_agents.html>`_.

We assume that you have already installed the ``apt`` or ``yum`` Puppet repository on your agent system in the same way that you did on your Puppet Server.

If you do not have DNS configured, you must use your hosts file for name resolution.

Edit the ``/etc/hosts`` file, and add the IP address and hostname of the Puppet master and agent:

.. code-block:: console

    [puppet master ip] puppet puppet-master
    [puppet agent ip] puppet-agent


Installation on CentOS/RHEL/Fedora
----------------------------------

Install the Puppet yum repository and then the "puppet-agent" package. See this `index <https://yum.puppetlabs.com/>`_ to find the correct rpm file needed to install the puppet repo for your Linux distribution. For example, to install Puppet 7 for CentOS 7 or RHEL 7, do the following:

.. code-block:: console

    # sudo rpm -Uvh https://yum.puppet.com/puppet7-release-el-8.noarch.rpm
    # yum -y install puppet-agent


Create a symbolic link between the installed binary file and your default binary file:

.. code-block:: console

    # ln -s /opt/puppetlabs/bin/puppet /bin


Installation on Debian/Ubuntu
-----------------------------

+----------------------------------------------------------------------------+-------------+
| The releases supported by the manifest to install Wazuh are as follows:                  |
+------------+---------+--------+---------+------+--------+---------+--------+-------------+
| **Ubuntu** | precise | trusty | vivid   | wily | xenial | yakketi | bionic | Focal Fossa |
+------------+---------+--------+---------+------+--------+---------+--------+-------------+
| **Debian** | jessie  | wheezy | stretch | sid                                            |
+------------+---------+--------+---------+----------------------------------+-------------+

.. note::
  ``Ubuntu Focal Fossa`` is supported since version 4.0.4

Install ``curl``, ``apt-transport-https`` and ``lsb-release``:

.. code-block:: console

    # apt-get update
    # apt-get install curl apt-transport-https lsb-release wget


Install the appropriate Puppet apt repository, and then the “puppet-agent” package. See https://apt.puppetlabs.com to find the correct deb file to install the puppet repo for your Linux distribution.

.. code-block:: console

    # wget https://apt.puppet.com/puppet7-release-focal.deb
    # dpkg -i puppet7-release-focal.deb
    # apt-get update
    # apt-get install -y puppet-agent


Create a symbolic link between the installed binary file and your default binary file:

.. code-block:: console

    # ln -s /opt/puppetlabs/bin/puppet /bin


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
      - For standalone Puppet nodes that won’t connect to a master, use the default hostname (`puppet`). You might also want to install it on the command line and set the agent startup mode to `Disabled`.
      - Once the installer finishes, Puppet will be installed and running.


    b. Using command line:

        .. code-block:: console

           msiexec /qn /norestart /i puppet-agent-<VERSION>-x64.msi

      Optionally, you can specify ``/l*v install.txt`` to log the installation’s progress to a file. You can also set several MSI properties to pre-configure Puppet as you install it.     


Agent Configuration
^^^^^^^^^^^^^^^^^^^

Add the server value to the ``[main]`` section of the node ``/etc/puppetlabs/puppet/puppet.conf`` (Linux) or  ``C:\ProgramData\PuppetLabs\puppet\etc\puppet.conf`` (Windows) file, replacing ``puppet-master`` with your Puppet server FQDN::

   [main]
   server = puppet-master
   

.. note:: The Puppet server FQDN should be resolved by the Puppet agent host.


Restart and check the status of the Puppet service:

.. code-block:: console

    # puppet resource service puppet ensure=running enable=true
    # sudo systemctl status puppet
