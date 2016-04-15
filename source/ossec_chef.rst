.. _ossec_chef:

OSSEC deployment with Chef
==========================

Chef server installation
--------------------------

Before we get started with Chef, check the following network requirements:

  * An x86_64 compatible system architecture; Red Hat Enterprise Linux and CentOS may require updates prior to installation
  * A resolvable hostname that is specified using a FQDN or an IP address
  * A connection to Network Time Protocol (NTP) to prevent clock drift
  * A local mail transfer agent that allows the Chef server to send email notifications
  * Using cron and the /etc/cron.d directory for periodic maintenance tasks
  * Disabling the Apache Qpid daemon on CentOS and Red Hat systems
  * Optional. A local user account under which services will run, a local user account for PostgreSQL, and a group account under which services will run. See https://docs.chef.io/release/server_12-5/install_server_pre.html#uids-and-gids for more information.
  *Firewall open ports: The Chef server must be reachable on port 80 and 443.

Installation on CentOS
^^^^^^^^^^^^^^^^^^^^^^

Download Chef server package from http://downloads.chef.io/chef-server/, for your Enterprise Linux distribution. For example, for EL7: ::

   $ sudo wget https://packages.chef.io/stable/el/7/chef-server-core-12.5.0-1.el7.x86_64.rpm
   $ sudo rpm -Uvh chef-server-core-12.5.0-1.el7.x86_64.rpm

After a few minutes, the Chef server will be installed.

Installation on Ubuntu
^^^^^^^^^^^^^^^^^^^^^^

Download Chef server package from http://downloads.chef.io/chef-server/, for your Enterprise Linux distribution. For example, for Ubuntu 14.04: ::

   $ wget https://packages.chef.io/stable/ubuntu/14.04/chef-server-core_12.5.0-1_amd64.deb
   $ sudo dpkg -i chef-server-core_12.5.0-1_amd64.deb

After a few minutes, the Chef server will be installed.

Configuration
-------------


