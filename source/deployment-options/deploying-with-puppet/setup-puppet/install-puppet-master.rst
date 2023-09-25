.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Puppet server in this section of the Wazuh documentation. 

.. _setup_puppet_master:

Installing Puppet master
========================

This section explains how to install *puppet-master*. Follow this link to check the `official installation guide <https://puppet.com/docs/puppetserver/latest/install_from_packages.html>`_.

If you do not have DNS configured, you must use your hosts file for name resolution. 
Edit the ``/etc/hosts`` file and add the following:

  .. code-block:: console

      [puppet master ip] puppet puppet-master
      [puppet agent ip] puppet-agent


Installation on CentOS/RHEL/Fedora
----------------------------------

Install the Puppet yum repository and then the “puppetserver” package. See this `index <https://yum.puppetlabs.com/>`_ to find the correct rpm file needed to install the puppet repo for your Linux distribution. For example, to install Puppet 7 for CentOS 8 or RHEL 8, do the following:

  .. code-block:: console

    # sudo rpm -Uvh https://yum.puppet.com/puppet7-release-el-8.noarch.rpm
    # yum -y install puppetserver


Create a symbolic link between the installed binary file and your default binary file:

  .. code-block:: console

    # ln -s /opt/puppetlabs/bin/puppet /bin
    # ln -s /opt/puppetlabs/server/bin/puppetserver /bin

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


Install the appropriate Puppet apt repository, and then the “puppetserver” package. See https://apt.puppetlabs.com to find the correct deb file to install the Puppet 7 repo for your Linux distribution.

  .. code-block:: console

    # wget https://apt.puppet.com/puppet7-release-focal.deb
    # dpkg -i puppet7-release-focal.deb
    # apt-get update
    # apt-get install -y puppetserver


Create a symbolic link between the installed binary file and your default binary file:

  .. code-block:: console

    # ln -s /opt/puppetlabs/bin/puppet /bin
    # ln -s /opt/puppetlabs/server/bin/puppetserver /bin


Memory Allocation
-----------------

By default, Puppet Server will be configured to use 2GB of RAM. However, if you want to experiment with Puppet Server on a VM, you can safely allocate as little as 512MB of memory. To change Puppet Server memory allocation, you can edit the following init config file.

  * ``/etc/sysconfig/puppetserver`` -- CentOS/RHEL/Fedora
  * ``/etc/default/puppetserver`` -- Debian/Ubuntu

Replace 2g in the ``JAVA_ARGS`` variable with the amount of memory you want to allocate to Puppet Server. For example, to allocate 1GB of memory, use ``JAVA_ARGS="-Xms1g -Xmx1g"``; for 512MB, use ``JAVA_ARGS="-Xms512m -Xmx512m"``.

Configuration
-------------

Edit the ``/etc/puppetlabs/puppet/puppet.conf`` file, adding this line to the ``[main]`` section (create the section if it does not exist), and replacing ``puppet,puppet-master`` with your own FQDN:

  ::

    dns_alt_names = puppet,puppet-master.com

Also add the [server] section with the following content in the ``/etc/puppetlabs/puppet/puppet.conf`` file replacing ``puppet-master`` with your own FQDN:

  ::

    [main]
    server = puppet-master.com


.. note:: If you find ``templatedir=$confdir/templates`` in the config file, delete that line.  It has been deprecated.


For Ubuntu/Debian machines, in case puppetserver does not start. Edit the puppetserver file, ``/etc/default/puppetserver``. Modify the following line to change the memory size to 1G or 512MB:

.. code-block:: console

   JAVA_ARGS="-Xms512m -Xmx512m -Djruby.logger.class=com.puppetlabs.jruby_utils.jruby.Slf4jLogger"


Then, start your Puppet Server:

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
