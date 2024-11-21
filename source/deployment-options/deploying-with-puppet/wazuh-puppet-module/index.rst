.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about Wazuh Puppet module in this section of the Wazuh documentation.

.. _wazuh_puppet_module:

Wazuh Puppet module
===================

This `module <https://github.com/wazuh/wazuh-puppet>`_ has been authored by Nicolas Zin and updated by Jonathan Gazeley and Michael Porter. Wazuh has forked it with the purpose of maintaining it. Thank you to the authors for their contribution.


Install Wazuh module
--------------------

Download and install the Wazuh module from Puppet Forge:

  .. code-block:: console

    # puppet module install wazuh-wazuh --version |WAZUH_CURRENT_PUPPET|

  .. code-block:: none
    :class: output

    Notice: Preparing to install into /etc/puppetlabs/code/environments/production/modules ...
    Notice: Downloading from https://forgeapi.puppet.com ...
    Notice: Installing -- do not interrupt ...
    /etc/puppetlabs/code/environments/production/modules
    └─┬ wazuh-wazuh (v|WAZUH_CURRENT|)
      ├── puppet-nodejs (v7.0.1)
      ├── puppet-selinux (v3.4.1)
      ├── puppetlabs-apt (v7.7.1)
      ├─┬ puppetlabs-concat (v6.4.0)
      │ └── puppetlabs-translate (v2.2.0)
      ├── puppetlabs-firewall (v2.8.1)
      ├─┬ puppetlabs-powershell (v4.1.0)
      │ └── puppetlabs-pwshlib (v0.10.1)
      └── puppetlabs-stdlib (v6.6.0)


This module installs and configures Wazuh agent and manager.


Install a stack via Puppet
--------------------------

Single Node
^^^^^^^^^^^

You can use  the manifest shown below to deploy a single-node stack. This stack consists of:

-  Wazuh dashboard
-  Wazuh indexer
-  Wazuh manager
-  Filebeat

To configure the manager before deployment, check the configuration variables for the Wazuh manager class section in :ref:`ref_wazuh_puppet`.

Create the ``stack.pp`` file at ``/etc/puppetlabs/code/environments/production/manifests/`` with the contents below.
Here, ``puppet-aio-node`` refers to the hostname or IP address of the Puppet agent and ``puppet-server`` refers to the hostname or IP address of the Puppet server when Wazuh module was installed.

.. code-block:: puppet

   $discovery_type = 'single-node'
   stage { 'certificates': }
   stage { 'repo': }
   stage { 'indexerdeploy': }
   stage { 'securityadmin': }
   stage { 'dashboard': }
   stage { 'manager': }
   Stage[certificates] -> Stage[repo] -> Stage[indexerdeploy] -> Stage[securityadmin] -> Stage[manager] -> Stage[dashboard]
   Exec {
   timeout => 0,
   }
   node "puppet-server" {
   class { 'wazuh::certificates':
     indexer_certs => [['node-1','127.0.0.1']],
     manager_certs => [['master','127.0.0.1']],
     dashboard_certs => ['127.0.0.1'],
     stage => certificates,
   }
   }
   node "puppet-aio-node" {
   class { 'wazuh::repo':
   stage => repo,
   }
   class { 'wazuh::indexer':
     stage => indexerdeploy,
   }
   class { 'wazuh::securityadmin':
   stage => securityadmin
   }
   class { 'wazuh::manager':
     stage => manager,
   }
   class { 'wazuh::filebeat_oss':
     stage => manager,
   }
   class { 'wazuh::dashboard':
     stage => dashboard,
   }
   }

Multi Node
^^^^^^^^^^

Using the multi-node manifest below, you can deploy a distributed stack consisting of the following nodes on three different servers or Virtual Machines (VM).

-  3 indexer nodes
-  Manager master node
-  Manager worker node
-  Dashboard node

You must include the IP addresses of the servers where you are installing each application.

.. code-block:: puppet
   :emphasize-lines: 1-6

   $node1host   = '<wazuh-indexer-node1-ip>'
   $node2host   = '<wazuh-indexer-node2-ip>'
   $node3host   = '<wazuh-indexer-node3-ip>'
   $masterhost    = '<wazuh-manager-master-ip>'
   $workerhost    = '<wazuh-manager-worker-ip>'
   $dashboardhost = '<wazuh-dashboard-ip>'
   $indexer_node1_name = 'node1'
   $indexer_node2_name = 'node2'
   $indexer_node3_name = 'node3'
   $master_name = 'master'
   $worker_name = 'worker'
   $cluster_size = '3'
   $indexer_discovery_hosts = [$node1host, $node2host, $node3host]
   $indexer_cluster_initial_master_nodes = [$node1host, $node2host, $node3host]
   $indexer_cluster_CN = [$indexer_node1_name, $indexer_node2_name, $indexer_node3_name]
   # Define stage for order execution
   stage { 'certificates': }
   stage { 'repo': }
   stage { 'indexerdeploy': }
   stage { 'securityadmin': }
   stage { 'dashboard': }
   stage { 'manager': }
   Stage[certificates] -> Stage[repo] -> Stage[indexerdeploy] -> Stage[securityadmin] -> Stage[manager] -> Stage[dashboard]
   Exec {
   timeout => 0,
   }
   node "puppet-server" {
   class { 'wazuh::certificates':
     indexer_certs => [["$indexer_node1_name","$node1host" ],["$indexer_node2_name","$node2host" ],["$indexer_node3_name","$node3host" ]],
     manager_master_certs => [["$master_name","$masterhost"]],
     manager_worker_certs => [["$worker_name","$workerhost"]],
     dashboard_certs => ["$dashboardhost"],
     stage => certificates
   }
   class { 'wazuh::repo':
   stage => repo
   }
   }
   node "puppet-wazuh-indexer-node1" {
   class { 'wazuh::repo':
   stage => repo
   }
   class { 'wazuh::indexer':
     indexer_node_name => "$indexer_node1_name",
     indexer_network_host => "$node1host",
     indexer_node_max_local_storage_nodes => "$cluster_size",
     indexer_discovery_hosts => $indexer_discovery_hosts,
     indexer_cluster_initial_master_nodes => $indexer_cluster_initial_master_nodes,
     indexer_cluster_CN => $indexer_cluster_CN,
     stage => indexerdeploy
   }
   class { 'wazuh::securityadmin':
   indexer_network_host => "$node1host",
   stage => securityadmin
   }
   }
   node "puppet-wazuh-indexer-node2" {
   class { 'wazuh::repo':
   stage => repo
   }
   class { 'wazuh::indexer':
     indexer_node_name => "$indexer_node2_name",
     indexer_network_host => "$node2host",
     indexer_node_max_local_storage_nodes => "$cluster_size",
     indexer_discovery_hosts => $indexer_discovery_hosts,
     indexer_cluster_initial_master_nodes => $indexer_cluster_initial_master_nodes,
     indexer_cluster_CN => $indexer_cluster_CN,
     stage => indexerdeploy
   }
   }
   node "puppet-wazuh-indexer-node3" {
   class { 'wazuh::repo':
   stage => repo
   }
   class { 'wazuh::indexer':
     indexer_node_name => "$indexer_node3_name",
     indexer_network_host => "$node3host",
     indexer_node_max_local_storage_nodes => "$cluster_size",
     indexer_discovery_hosts => $indexer_discovery_hosts,
     indexer_cluster_initial_master_nodes => $indexer_cluster_initial_master_nodes,
     indexer_cluster_CN => $indexer_cluster_CN,
     stage => indexerdeploy
   }
   }
   node "puppet-wazuh-manager-master" {
   class { 'wazuh::repo':
   stage => repo
   }
   class { 'wazuh::manager':
     ossec_cluster_name => 'wazuh-cluster',
     ossec_cluster_node_name => 'wazuh-master',
     ossec_cluster_node_type => 'master',
     ossec_cluster_key => '01234567890123456789012345678912',
     ossec_cluster_bind_addr => "$masterhost",
     ossec_cluster_nodes => ["$masterhost"],
     ossec_cluster_disabled => 'no',
     stage => manager
   }
   class { 'wazuh::filebeat_oss':
     filebeat_oss_indexer_ip => "$node1host",
     wazuh_node_name => "$master_name",
     stage => manager
   }
   }
   node "puppet-wazuh-manager-worker" {
   class { 'wazuh::repo':
   stage => repo
   }
   class { 'wazuh::manager':
     ossec_cluster_name => 'wazuh-cluster',
     ossec_cluster_node_name => 'wazuh-worker',
     ossec_cluster_node_type => 'worker',
     ossec_cluster_key => '01234567890123456789012345678912',
     ossec_cluster_bind_addr => "$masterhost",
     ossec_cluster_nodes => ["$masterhost"],
     ossec_cluster_disabled => 'no',
     stage => manager
   }
   class { 'wazuh::filebeat_oss':
     filebeat_oss_indexer_ip => "$node1host",
     wazuh_node_name => "$worker_name",
     stage => manager
   }
   }
   node "puppet-wazuh-dashboard" {
   class { 'wazuh::repo':
   stage => repo,
   }
   class { 'wazuh::dashboard':
     indexer_server_ip  => "$node1host",
     manager_api_host   => "$masterhost",
     stage => dashboard
   }
   }

The correspondence of the IP addresses with the puppet nodes described in the manifest is as follows:

-  ``puppet-wazuh-indexer-node1`` = ``node1host``. Wazuh indexer node1.
-  ``puppet-wazuh-indexer-node2`` = ``node2host``. Wazuh indexer node2.
-  ``puppet-wazuh-indexer-node3`` = ``node3host``. Wazuh indexer node3.
-  ``puppet-wazuh-manager-master`` = ``masterhost``. Wazuh manager master.
-  ``puppet-wazuh-manager-worker`` = ``workerhost``. Wazuh manager worker.
-  ``puppet-wazuh-dashboard`` = ``dashboardhost``. Wazuh dashboard node.

The ``wazuh::certificates`` class needs to be applied on the Puppet server (``puppet-server``) where the Wazuh module is installed. This is necessary because the archives module is used to distribute files to all servers in the Wazuh stack deployment.

If you need more Wazuh indexer nodes, add new variables. For example ``indexer_node4_name`` and ``node4host``. Add them to the following arrays:

-  ``indexer_discovery_hosts``
-  ``indexer_cluster_initial_master_nodes``
-  ``indexer_cluster_CN``
-  ``indexer_certs``

In addition, you need to add a new node instance similar to ``puppet-wazuh-indexer-node2`` or ``puppet-wazuh-indexer-node3``. Unlike the instance for Wazuh indexer node1, these instances don't run ``securityadmin``.

In case you need to add a Wazuh manager worker server, add a new variable such as ``worker2host``. Add the variable to the ``manager_worker_certs`` array. For example, ``['worker',"$worker2host"]``. Then, replicate the node instance ``puppet-wazuh-manager-worker`` with the new server.

Place the file at ``/etc/puppetlabs/code/environments/production/manifests/`` in your Puppet master. It executes on the specified node once the ``runinterval`` time, as set in ``puppet.conf``, elapses. However, if you want to run the manifest immediately on a specific node, run the following command on the node:

.. code-block:: console

   # puppet agent -t

Change Password for Wazuh users
-------------------------------

Follow the instructions in the :doc:`Password Management </user-manual/user-administration/password-management>` section to change your Wazuh user passwords. Once you change them, set the new passwords within the classes used for deploying the Wazuh Stack.

Indexer users
^^^^^^^^^^^^^

-  ``admin`` user:

   .. code-block:: puppet

      node "puppet-agent.com" {
        class { 'wazuh::dashboard':
          dashboard_password => '<NEW_PASSWORD>'
        }
      }

-  ``kibanaserver`` user:

   .. code-block:: puppet

      node "puppet-agent.com" {
        class { 'wazuh::filebeat_oss':
          filebeat_oss_elastic_password  => '<NEW_PASSWORD>'
        }
      }

Wazuh API users
^^^^^^^^^^^^^^^

-  ``wazuh-wui`` user:

   .. code-block:: puppet

      node "puppet-agent.com" {
        class { 'wazuh::dashboard':
          dashboard_wazuh_api_credentials => '<NEW_PASSWORD>'
        }
      }

Install Wazuh agent via Puppet
------------------------------

The agent is configured by installing the ``wazuh::agent`` class.

Here is an example of a manifest ``wazuh-agent.pp`` (please replace  ``<MANAGER_IP_ADDRESS>`` with your manager IP address).

  .. code-block:: puppet

   node "puppet-agent.com" {
     class { 'wazuh::repo':
     }
     class { "wazuh::agent":
       wazuh_register_endpoint => "<MANAGER_IP_ADDRESS>",
       wazuh_reporting_endpoint => "<MANAGER_IP_ADDRESS>"
     }
   }


Place the file at ``/etc/puppetlabs/code/environments/production/manifests/`` in your Puppet master and it will be executed in the specified node after the ``runinterval`` time set in ``puppet.conf``. However, if you want to run it first, try the following command in the Puppet agent.

  .. code-block:: console

    # puppet agent -t

.. _ref_wazuh_puppet:

Reference Wazuh puppet
----------------------

+-----------------------------------------------------------------+-----------------------------------------------------------------+---------------------------------------------+
| Sections                                                        | Variables                                                       | Functions                                   |
+=================================================================+=================================================================+=============================================+
| :ref:`Wazuh manager class <reference_wazuh_manager_class>`      | :ref:`Alerts <ref_server_vars_alerts>`                          | :ref:`email_alert <ref_server_email_alert>` |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Authd <ref_server_vars_authd>`                            | :ref:`command <ref_server_command>`         |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Cluster <ref_server_vars_cluster>`                        | :ref:`activeresponse <ref_server_ar>`       |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Global <ref_server_vars_global>`                          |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Localfile <ref_server_vars_localfile>`                    |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Rootcheck <ref_server_vars_rootcheck>`                    |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Syscheck <ref_server_vars_syscheck>`                      |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Syslog output <ref_server_vars_syslog_output>`            |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Vulnerability Detection <ref_server_vars_vuln_detection>` |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wazuh API <ref_server_vars_wazuh_api>`                    |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle OpenSCAP <ref_server_vars_wodle_openscap>`          |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle CIS-CAT <ref_server_vars_ciscat>`                   |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle osquery <ref_server_vars_wodle_osquery>`            |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle Syscollector <ref_server_vars_wodle_syscollector>`  |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Misc <ref_server_vars_misc>`                              |                                             |
+-----------------------------------------------------------------+-----------------------------------------------------------------+---------------------------------------------+
| :ref:`Wazuh agent class <reference_wazuh_agent_class>`          | :ref:`Active Response <ref_agent_vars_ar>`                      |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Agent enrollment <ref_agent_vars_enroll>`                 |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Client settings <ref_agent_vars_client>`                  |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Localfile <ref_agent_vars_localfile>`                     |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Rootcheck <ref_agent_vars_rootcheck>`                     |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`SCA <ref_agent_vars_sca>`                                 |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Syscheck <ref_agent_vars_syscheck>`                       |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle OpenSCAP <ref_agent_vars_wodle_openscap>`           |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle CIS-CAT <ref_agent_vars_wodle_ciscat>`              |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle osquery <ref_agent_vars_wodle_osquery>`             |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle Syscollector <ref_agent_vars_wodle_syscollector>`   |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Misc <ref_agent_vars_misc>`                               |                                             |
|                                                                 |                                                                 |                                             |
+-----------------------------------------------------------------+-----------------------------------------------------------------+---------------------------------------------+

.. topic:: Contents

 .. toctree::
    :maxdepth: 1

    reference-wazuh-puppet/wazuh-manager-class
    reference-wazuh-puppet/wazuh-agent-class

