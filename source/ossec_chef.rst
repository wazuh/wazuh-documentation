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

Wazuh OSSEC module
-------------------

Attributes
----------

* `node['ossec']['dir']` - Installation directory for OSSEC, default `/var/ossec`. All existing packages use this directory so you should not change this.
* `node['ossec']['server_role']` - When using server/agent setup, this role is used to search for the OSSEC server, default `ossec_server`.
* `node['ossec']['agent_server_ip']` - The IP of the OSSEC server. The client recipe will attempt to determine this value via search. Default is nil, only required for agent installations.

###ossec.conf

OSSEC's configuration is mainly read from an XML file called `ossec.conf`. You can directly control the contents of this file using node attributes under `node['ossec']['conf']`. These attributes are mapped to XML using Gyoku. See the [Gyoku site](https://github.com/savonrb/gyoku) for details on how this works.

Chef applies attributes from all attribute files regardless of which recipes were executed. In order to make wrapper cookbooks easier to write, `node['ossec']['conf']` is divided into the three installation types mentioned below, `local`, `server`, and `agent`. You can also set attributes under `all` to apply settings across all installation types. The typed attributes are automatically deep merged over the `all` attributes in the normal Chef manner.

`true` and `false` values are automatically mapped to `"yes"` and `"no"` as OSSEC expects the latter.

`ossec.conf` makes little use of XML attributes so you can generally construct nested hashes in the usual fashion. Where an attribute is required, you can do it like this:

::

    default['ossec']['conf']['all']['syscheck']['directories'] = [
      { '@check_all' => true, 'content!' => '/bin,/sbin' },
      '/etc,/usr/bin,/usr/sbin'
    ]

This produces:

::

    <syscheck>
      <directories check_all="yes">/bin,/sbin</directories>
      <directories>/etc,/usr/bin,/usr/sbin</directories>
    </syscheck>

The default values are based on those given in the OSSEC manual. They do not include any specific rules, checks, outputs, or alerts as everyone has different requirements.

###agent.conf

OSSEC servers can also distribute configuration to agents through the centrally managed XM file called `agent.conf`. Since Chef is better at distributing configuration than OSSEC is, the cookbook leaves this file blank by default. Should you want to populate it, it is done in a similar manner to the above. Since this file is only used on servers, you can define the attributes directly under `node['ossec']['agent_conf']`. Unlike conventional XML files, `agent.conf` has multiple root nodes so `node['ossec']['agent_conf']` must be treated as an array like so.

::

    default['ossec']['agent_conf'] = [
      {
        'syscheck' => { 'frequency' => 4321 },
        'rootcheck' => { 'disabled' => true }
      },
      {
        '@os' => 'Windows',
        'content!' => {
          'syscheck' => { 'frequency' => 1234 }
        }
      }
    ]

This produces:

::

    <agent_config>
      <syscheck>
        <frequency>4321</frequency>
      </syscheck>
      <rootcheck>
        <disabled>yes</disabled>
      </rootcheck>
    </agent_config>

    <agent_config os="Windows">
      <syscheck>
        <frequency>1234</frequency>
      </syscheck>
    </agent_config>

Recipes
-------

###repository

Adds the OSSEC repository to the package agent. This recipe is included by others and should not be used directly. For highly customised setups, you should use `ossec::install_agent`.

###install_agent

Installs the agent packages but performs no explicit configuration.


###common

Puts the configuration file in place and starts the (agent or server) service. This recipe is included by other recipes and generally should not be used directly.

Note that the service will not be started if the client.keys file is missing or empty. For agents, this results in an error. For servers, this prevents ossec-remoted from starting, resulting in agents being unable to connect. Once client.keys does exist with content, simply perform another chef-client run to start the service.


###agent

OSSEC uses the term `agent` instead of client. The agent recipe includes the `wazuh_ossec::agent` recipe.


###manager

Sets up a system to be an OSSEC server. This recipe will search for all nodes that have an `ossec` attribute and add them as an agent to register with the given server running ossec-authd. To allow registration with a new server after changing `agent_server_ip`, delete the client.keys file and rerun the recipe..

To manage additional agents on the server that don't run chef, or for agentless OSSEC configuration (for example, routers), add a new node for them and create the `node['ossec']['agentless']` attribute as true. For example if we have a router named gw01.example.com with the IP `192.168.100.1`:

::

    % knife node create gw01.example.com
    {
      "name": "gw01.example.com",
      "json_class": "Chef::Node",
      "automatic": {
      },
      "normal": {
        "hostname": "gw01",
        "fqdn": "gw01.example.com",
        "ipaddress": "192.168.100.1",
        "ossec": {
          "agentless": true
        }
      },
      "chef_type": "node",
      "default": {
      },
      "override": {
      },
      "run_list": [
      ]
    }

Enable agentless monitoring in OSSEC and register the hosts on the server. Automated configuration of agentless nodes is not yet supported by this cookbook. For more information on the commands and configuration directives required in `ossec.conf`, see the [OSSEC Documentation](http://www.ossec.net/doc/manual/agent/agentless-monitoring.html)

Usage
-----

The cookbook can be used to install OSSEC in one of the three types:

* server - use the wazuh_ossec::manager recipe.
* agent - use the wazuh_ossec::agent recipe
* API - use the wazuh_ossec::wazuh-api recipe

For the OSSEC server, create a role, `wazuh_ossec_server`. Add attributes per above as needed to customize the installation.

::

  {
    "name": "wazuh_ossec_server",
    "description": "",
    "json_class": "Chef::Role",
    "default_attributes": {

    },
    "override_attributes": {

    },
    "chef_type": "role",
    "run_list": [
      "recipe[wazuh_ossec::manager]"
    ],
    "env_run_lists": {

    }
  }

For OSSEC agents, create a role, `wazuh_ossec_agent`.

::

  {
    "name": "wazuh_ossec_agent",
    "description": "",
    "json_class": "Chef::Role",
    "default_attributes": {

    },
    "override_attributes": {
      "ossec": {
        "agent_server_ip": "192.168.186.135"
      }
    },
    "chef_type": "role",
    "run_list": [
      "recipe[wazuh_ossec::agent]"
    ],
    "env_run_lists": {

    }
  }

Customization
-------------

The main configuration file is maintained by Chef as a template, `ossec.conf.erb`. It should just work on most installations, but can be customized for the local environment. Notably, the rules, ignores and commands may be modified.

Further reading:

* [OSSEC Documentation](http://www.ossec.net/doc/index.html)
