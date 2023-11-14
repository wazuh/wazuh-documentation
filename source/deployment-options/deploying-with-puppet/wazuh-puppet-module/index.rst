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

Single Node:
^^^^^^^^^^^

You can use  the followingmanifest to deploy a single node stack of Wazuh manager, Wazuh dashboard, Wazuh indexer, and Filebeat. To configure the manager before deployment, check the configuration variables in the Wazuh manager section.

Create a stack.pp file at ``/etc/puppetlabs/code/environments/production/manifests/`` and put the contents below. ``puppet-agent-node`` refers to the hostname or IP of the puppet agent:

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

Multi Node:
^^^^^^^^^^^

With the multi-node manifest below, you can deploy a distributed stack with the following nodes between three different servers or Virtual Machines (VM).

-  3 indexer nodes
-  Manager master node
-  Manager worker node
-  Dashboard node

Within the manifest, include the IP addresses of the servers where you are installing each application.

This is the correspondence of the IPs with the puppet nodes described in the manifest:

.. code-block:: console

    puppet-wazuh-indexer-node1 = node1host (Wazuh indexer node1)
    puppet-wazuh-indexer-node2 = node2host (Wazuh indexer node2)
    puppet-wazuh-indexer-node3 = node3host (Wazuh indexer node3)
    puppet-wazuh-manager-master = masterhost (Wazuh manager master)
    puppet-wazuh-manager-worker = workerhost (Wazuh manager worker)
    puppet-wazuh-dashboard = dashboardhost (Wazuh dashboard node)

The wazuh::certificates class must be executed inside the puppet server where the Wazuh module is installed (``puppet-server``) because we use the archives module to pass files to all the servers where we deploy the Wazuh stack.

If you need to add more ``Wazuh Indexer`` nodes, you need to add new variables (``indexer_node4_name`` and ``node4host`` for example) and add them to the ``indexer_discovery_hosts``, ``indexer_cluster_initial_master_nodes``, ``indexer_cluster_CN`` and ``indexer_certs`` arrays. In addition, it is necessary to add a new node instance equal to ``puppet-wazuh-indexer-node2`` or ``puppet-wazuh-indexer-node3``, so that they do not run ``securityadmin``.

In case it is necessary to add any ``Wazuh manager worker`` server, it is necessary to add a new ``worker2host`` variable for example, add this variable to the ``manager_worker_certs`` array as ``['worker',"$worker2host"]`` and then replicate the node instance ``puppet-wazuh-manager-worker`` with the new server.


.. code-block:: console

      $node1host   = 'x.x.x.x'
      $node2host   = 'x.x.x.x'
      $node3host   = 'x.x.x.x'
      $masterhost    = 'x.x.x.x'
      $workerhost    = 'x.x.x.x'
      $dashboardhost = 'x.x.x.x'
      $indexer_node1_name = 'node1'
      $indexer_node2_name = 'node2'
      $indexer_node3_name = 'node3'
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
        manager_master_certs => [['master',"$masterhost"]],
        manager_worker_certs => [['worker',"$workerhost"]],
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
Place the file at ``/etc/puppetlabs/code/environments/production/manifests/`` in your Puppet master and it will be executed in the specified node after the ``runinterval`` time set in ``puppet.conf``. However, if you want to run the manifest immediately on a specific node, run the following command on the node:

  .. code-block:: console

    # puppet agent -t


Install Wazuh agent via Puppet
------------------------------

The agent is configured by installing the ``wazuh::agent`` class.

Here is an example of a manifest ``wazuh-agent.pp`` (please replace  ``MANAGER_IP`` with your manager IP address).

  .. code-block:: puppet

   node "puppet-agent.com" {
     class { "wazuh::agent":
       wazuh_register_endpoint => "<MANAGER_IP>",
       wazuh_reporting_endpoint => "<MANAGER_IP>"
     }
   }


Place the file at ``/etc/puppetlabs/code/environments/production/manifests/`` in your Puppet master and it will be executed in the specified node after the ``runinterval`` time set in ``puppet.conf``. However, if you want to run it first, try the following command in the Puppet agent.

  .. code-block:: console

    # puppet agent -t

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
|                                                                 | :ref:`Vulnerability Detector <ref_server_vars_vuln_detector>`   |                                             |
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
| :ref:`Wazuh agent class <reference_wazuh_agent_class>`          | :ref:`Active response <ref_agent_vars_ar>`                      |                                             |
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

