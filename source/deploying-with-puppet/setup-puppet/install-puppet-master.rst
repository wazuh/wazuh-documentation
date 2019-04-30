.. Copyright (C) 2019 Wazuh, Inc.

.. _setup_puppet_master:

Installing Puppet master
========================

In this section it is explained how to install *puppet-master*. Follow this link to check the `official installation guide <https://puppet.com/docs/puppetserver/5.1/install_from_packages.html>`_.

Installation on CentOS/RHEL/Fedora
----------------------------------

Install the Puppet yum repository and then the "puppetserver" package. See this `index <https://yum.puppetlabs.com/>`_ to find the correct rpm file needed to install the puppet repo for your Linux distribution. For example, to install Puppet 5 for CentOS 7 or RHEL 7, do the following:

  .. code-block:: console

    # rpm -ivh https://yum.puppetlabs.com/puppet5/puppet5-release-el-7.noarch.rpm
    # yum -y install puppetserver


Installation on Debian/Ubuntu
-----------------------------

+----------------------------------------------------------------------------+
| The releases supported by the manifest to install Wazuh are as follows:    |
+------------+---------+--------+---------+------+--------+---------+--------+
| **Ubuntu** | precise | trusty | vivid   | wily | xenial | yakketi | bionic |
+------------+---------+--------+---------+------+--------+---------+--------+
| **Debian** | jessie  | wheezy | stretch | sid                              |
+------------+---------+--------+---------+----------------------------------+

Install ``curl``, ``apt-transport-https`` and ``lsb-release``:

  .. code-block:: console

    # apt-get update
    # apt-get install curl apt-transport-https lsb-release

Get the appropriate Puppet apt repository, and then the "puppetserver" package. See https://apt.puppetlabs.com to find the correct deb file to install the Puppet 5 repo for your Linux distribution.

  .. code-block:: console

    # wget https://apt.puppetlabs.com/puppet5-release-xenial.deb
    # dpkg -i puppet5-release-xenial.deb
    # apt update
    # apt-get install -y puppetserver

Create a symbolic link between the installed binary file and your default binary file:

  .. code-block:: bash
    
    # ln -s /opt/puppetlabs/bin/puppet /bin

Memory Allocation
-----------------

By default, Puppet Server will be configured to use 2GB of RAM. However, if you want to experiment with Puppet Server on a VM, you can safely allocate as little as 512MB of memory. To change Puppet Server memory allocation, you can edit the following init config file.

  * ``/etc/sysconfig/puppetserver`` -- CentOS/RHEL/Fedora
  * ``/etc/default/puppetserver`` -- Debian/Ubuntu

Replace 2g with the amount of memory you want to allocate to Puppet Server. For example, to allocate 1GB of memory, use ``JAVA_ARGS="-Xms1g -Xmx1g"``; for 512MB, use ``JAVA_ARGS="-Xms512m -Xmx512m"``.

Configuration
-------------

Edit the ``/etc/puppetlabs/puppet/puppet.conf`` file, adding this line to the ``[main]`` section (create the section if it does not exist), and replacing ``puppet.example.com`` with your own FQDN: 

  ::

    dns_alt_names = puppet,puppet.example.com

.. note:: If you find ``templatedir=$confdir/templates`` in the config file, delete that line.  It has been deprecated.

Then, restart your Puppet Server to apply changes:

  a) For Systemd:

    .. code-block:: console

      # systemctl start puppetserver
      # systemctl enable puppetserver

  b) For SysV Init:

    .. code-block:: console

      # service puppetserver start
      # update-rc.d puppetserver
