.. _setup_puppet_agent:

Installing Puppet agent
============================

In this section we assume you have already installed the ``apt`` or ``yum`` Puppet repository on your agent system in the same way that you did on your Puppet Server.

Installation on CentOS/RHEL/Fedora
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

   $ sudo yum install puppet
   $ sudo puppet resource package puppet ensure=latest

Installation on Debian/Ubuntu
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

   $ sudo apt-get install puppet
   $ sudo apt-get update
   $ sudo puppet resource package puppet ensure=latest

Configuration
^^^^^^^^^^^^^

Add the server value to the ``[main]`` section of the node’s ``/etc/puppet/puppet.conf`` file, replacing ``puppet.example.com`` with your Puppet Server’s FQDN::

   [main]
   server = puppet.example.com

Restart the Puppet service::

   $ service puppet restart
