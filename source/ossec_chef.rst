.. _ossec_chef:

OSSEC deployment with Chef
==========================

Chef environment elements
---------------------------

.. image:: images/chef/workstation-server-node.png
    :align: center
    :width: 100%

Typically, Chef is comprised of three elements - your workstation, a Chef server, and nodes.

  - Your ```workstation``` is the computer from which you author your cookbooks and administer your network. It's typically the machine you use everyday. Although you'll be configuring a Red Hat Enterprise Linux server, your workstation can be any OS you choose - be it Linux, Mac OS, or Windows, in our case we will focus in Linux (CentOS & Ubuntu).
  - ``Chef server`` acts as a central repository for your cookbooks as well as for information about every node it manages. For example, the Chef server knows a node's fully qualified domain name (FQDN) and its platform.
  -  A ``node`` is any computer that is managed by a Chef server. Every node has the Chef client installed on it. The Chef client talks to the Chef server. A node can be any physical or virtual machine in your network.


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
  * Firewall open ports: The Chef server must be reachable on port 80 and 443.

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

Adding features to Chef server
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To configure Chef server is very easy you need to run the next command::

  $ sudo chef-server-ctl reconfigure

Because the Chef server is composed of many different services that work together to create a functioning system, this step may take a few minutes to complete.

If you like use Chef management console to manage data bags, attributes, run-lists, roles, environments, and cookbooks from a web user interface run this command: ::

  $ sudo chef-server-ctl install chef-manage
  $ sudo chef-server-ctl reconfigure
  $ sudo chef-manage-ctl reconfigure

If you like use Reporting to keep track of what happens during every chef-client runs across all of the infrastructure being managed by Chef. Run Reporting with Chef management console to view reports from a web user interface: ::

  $ sudo chef-server-ctl install opscode-reporting
  $ sudo chef-server-ctl reconfigure
  $ sudo opscode-reporting-ctl reconfigure

Create the administrator account and an organization
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

From your Chef server, run the following command to create the administrator account. Replace ADMIN_USER_NAME, ADMIN_FIRST_NAME, ADMIN_LAST_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD with your values. ::

  $ sudo chef-server-ctl user-create ADMIN_USER_NAME ADMIN_FIRST_NAME ADMIN_LAST_NAME ADMIN_EMAIL ADMIN_PASSWORD --filename ADMIN_USER_NAME.pem

For example: ::

  $ sudo chef-server-ctl user-create jlruizmlg Jose Luis Ruiz jose@example.com p4ssw0rd --filename jlruizmlg.pem

The command generates an RSA private key (.pem file) that enables you enables you to run knife commands against the Chef server as an authenticated user. You'll copy this file to your workstation in the next step. For now, verify that this private key was written to the current directory on your Chef server.

.. note:: You always create the initial user account directly from the Chef server on the command line. Later, you can add additional users from the command line or through the management console.

Workstation configuration
^^^^^^^^^^^^^^^^^^^^^^^^^^

Create the organization

From your ```Chef server```, run the following command to create the organization. Replace ORG_SHORT_NAME, ORG_LONG_NAME, and ADMIN_USER_NAME with your values. ::

  $ sudo chef-server-ctl org-create ORG_SHORT_NAME "ORG_LONG_NAME" --association_user ADMIN_USER_NAME

For example: ::

  $ sudo chef-server-ctl org-create wazuh "Wazuh, Inc." --association_user jlruizmlg

.. note:: You can ignore the RSA private key that chef-server-ctl org-create writes to the console. In prior versions of chef-client, you would use this private key during the bootstrap process to enable a node to authenticate itself for the first time with the Chef server. Newer versions of chef-client use your client key to perform the initial authentication.

In your ```Workstation``` to install donwload and install Chef client run the next command::

  $ curl -L https://www.chef.io/chef/install.sh | sudo bash

and then enter the local password when prompted.

In your workstation you can create the folder ```chef-repo/.chef``` and ```chef-repo/cookbooks``` with the next command: ::

  $ cd ~
  $ mkdir -p chef-repo/.chef
  $ mkdir -p chef-repo/cookbooks

After that move the admin user pem file in our case ```jlruizmlg.pem``` than we created in the last step to ```chef-repo/.chef``` folder in the Workstation from your Chef folder.

The last thing to do is create a file named ```knife.rb``` in the folder ```chef-repo/.chef``` with the next code:

::

  current_dir = File.dirname(__FILE__)
  log_level                :info
  log_location             STDOUT
  node_name                "workstation"
  client_key               "#{current_dir}/jlruiz.pem"
  validation_client_name   "wazuh-validator"
  validation_key           "#{current_dir}/wazuh-validator.pem"
  chef_server_url          "https://chef.wazuh.com/organizations/wazuh"
  cookbook_path            ["#{current_dir}/../cookbooks"]

Where ```client_key``` is your ```adminuser.pem```

.. note:: Since Chef version 12 the validator.pem is deprecated and not necessary, if you are doing this installation with a previous version probably you will need.

The last last step is validate your connection to the Chef server. One way to do that is to run the ```knife ssl check``` command. ::

  $ knife ssl check
     Connecting to host api.wazuh.com:443
     Successfully verified certificates from `api.wazuh.com'

Node configuration
^^^^^^^^^^^^^^^^^^^

The next step is to configure a new node and run the cookbook on it. In Learn the Chef basics, you ran chef-client in local mode to configure the node directly. Now you'll use knife to trigger chef-client to run on your node, remotely from your workstation.
