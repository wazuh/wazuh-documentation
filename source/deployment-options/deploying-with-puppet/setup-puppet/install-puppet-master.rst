.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Puppet server in this section of the Wazuh documentation. 

.. _setup_puppet_master:

Installing Puppet master
========================



Installation on CentOS/RHEL/Fedora
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Puppet yum repository and then the "puppetserver" package. See this `index <https://yum.puppetlabs.com/>`_ for the correct RPM file to install the Puppet repo for your Linux distribution. For example, to install Puppet 7 for RHEL 9, do the following:

   .. code-block:: console

      # rpm -Uvh https://yum.puppetlabs.com/puppet7-release-el-9.noarch.rpm
      # yum -y install puppetserver

#. Create a symbolic link between the installed binary file and your default binary file:

   .. code-block:: console

      # ln -s /opt/puppetlabs/bin/puppet /usr/local/bin
      # ln -s /opt/puppetlabs/server/bin/puppetserver /usr/local/bin

Installing on Debian/Ubuntu
---------------------------

The manifest supports the following releases for installing Wazuh.

-  **Debian**: 7 (wheezy), 8 (jessie), 9 (stretch), 10 (buster), 11 (bullseye), 12 (bookworm)
-  **Ubuntu**: 12.04 (Precise Pangolin), 14.04 (Trusty Tahr), 15.04 (Vivid Vervet), 15.10 (Wily Werewolf), 16.04 (Xenial Xerus), 16.10 (Yakkety Yak), 18.04 (Bionic Beaver), 20.04 (Focal Fossa), 22.04 (Jammy Jellyfish)

#. Install ``curl``, ``apt-transport-https``, and ``lsb-release``:

   .. code-block:: console

      # apt-get update
      # apt-get install curl apt-transport-https lsb-release wget

#. Install the appropriate Puppet apt repository, and then the "puppetserver" package. See https://apt.puppetlabs.com to find the correct Debian file to install the Puppet 8 repo for your Linux distribution.

   .. code-block:: console

      # wget https://apt.puppet.com/puppet7-release-focal.deb
      # dpkg -i puppet7-release-focal.deb
      # apt-get update
      # apt-get install -y puppetserver

#. Create a symbolic link between the installed binary file and your default binary file:

   .. code-block:: console

      # ln -s /opt/puppetlabs/bin/puppet /usr/local/bin
      # ln -s /opt/puppetlabs/server/bin/puppetserver /usr/local/bin


Memory allocation
-----------------

By default, Puppet Server will be configured to use 2GB of RAM. However, if you want to experiment with Puppet Server on a VM, you can safely allocate as little as 512MB of memory. To change Puppet Server memory allocation, you can edit the following init config file.

  * ``/etc/sysconfig/puppetserver`` -- CentOS/RHEL/Fedora
  * ``/etc/default/puppetserver`` -- Debian/Ubuntu

Replace 2g in the ``JAVA_ARGS`` variable with the amount of memory you want to allocate to Puppet Server. For example, to allocate 1GB of memory, use ``JAVA_ARGS="-Xms1g -Xmx1g"``; for 512MB, use ``JAVA_ARGS="-Xms512m -Xmx512m"``.

Configuration
-------------

Edit the ``/etc/puppetlabs/puppet/puppet.conf`` file to configure the Puppet server. Add the following settings to the ``[server]`` section. You need to create the section if it doesn't exist. If you have set up your own DNS, replace ``puppet`` and ``puppet-master`` with your Fully Qualified Domain Names (FQDNs).

   .. code-block:: none

      [server]
      server = puppet-master
      dns_alt_names = puppet, puppet-master

.. note:: If you find ``templatedir=$confdir/templates`` in the config file, delete that line.  It has been deprecated.



Start your Puppet Server:

   .. tabs::

         .. group-tab:: Systemd 

            .. code-block:: console

               # systemctl start puppetserver
               # systemctl enable puppetserver
               # systemctl status puppetserver

         .. group-tab:: SysV init

            .. code-block:: console

               # service puppetserver start
               # update-rc.d puppetserver

.. note:: 
   
   For Ubuntu/Debian machines, in case puppetserver does not start due to a lack of memory. Edit the ``/etc/default/puppetserver`` config file. Modify the following line to change the memory size to 1GB or 512MB:

   .. code-block:: console

      JAVA_ARGS="-Xms512m -Xmx512m -Djruby.logger.class=com.puppetlabs.jruby_utils.jruby.Slf4jLogger"