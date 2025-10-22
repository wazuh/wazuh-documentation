.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn about Wazuh Puppet module in this section of the Wazuh documentation.

Wazuh Puppet module
===================

This `module <https://github.com/wazuh/wazuh-puppet>`_ has been authored by Nicolas Zin and updated by Jonathan Gazeley and Michael Porter. Wazuh has forked it with the purpose of maintaining it. Thank you to the authors for their contribution.


Install Wazuh module
--------------------

#. Download and install the Wazuh module from Puppet Forge:

   .. code-block:: console

      # puppet module install wazuh-wazuh --version |WAZUH_CURRENT_PUPPET|

   .. code-block:: none
      :class: output

      Notice: Preparing to install into /etc/puppetlabs/code/environments/production/modules ...
      Notice: Downloading from https://forgeapi.puppet.com ...
      Notice: Installing -- do not interrupt ...
      /etc/puppetlabs/code/environments/production/modules
      └─┬ wazuh-wazuh (v|WAZUH_CURRENT|)
        ├── puppet-archive (v8.0.0)
        ├── puppet-nodejs (v10.0.0)
        ├── puppet-selinux (v4.1.0)
        ├── puppet-zypprepo (v5.0.0)
        ├── puppetlabs-apt (v10.0.1)
        ├── puppetlabs-concat (v9.0.2)
        ├── puppetlabs-firewall (v8.1.7)
        ├─┬ puppetlabs-powershell (v6.0.1)
        │ └── puppetlabs-pwshlib (v1.2.3)
        └── puppetlabs-stdlib (v9.6.0)

This module is used to install and configure the Wazuh agent and manager.


Install a stack via Puppet
--------------------------

Single-node
^^^^^^^^^^^

You can use the manifest shown below to deploy a single-node stack. This stack consists of:

- Wazuh dashboard
- Wazuh indexer
- Wazuh manager
- Filebeat

To configure the manager before deployment, check the :ref:`Wazuh puppet reference <ref_wazuh_puppet>`.

#. Install the following packages if missing on the Puppet agent. The Wazuh central components require these packages:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install debhelper tar curl libcap2-bin #debhelper version 9 or later

      .. group-tab:: Yum

         .. code-block:: console

            # yum install libcap

      .. group-tab:: DNF

         .. code-block:: console

            # dnf install libcap

#. Create the ``stack.pp`` file on the Puppet master at ``/etc/puppetlabs/code/environments/production/manifests/`` with the code below:

   .. code-block:: puppet
      :emphasize-lines: 12, 20


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
      node "<PUPPET_MASTER>" {
      class { 'wazuh::certificates':
        indexer_certs => [['node-1','127.0.0.1']],
        manager_certs => [['master','127.0.0.1']],
        dashboard_certs => ['127.0.0.1'],
        stage => certificates,
      }
      }
      node "<PUPPET_AGENT>" {
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

   Where:

   - ``PUPPET_MASTER`` is the hostname of the Puppet server where the Wazuh module was installed.
   - ``PUPPET_AGENT`` is the hostname of the Puppet agent.

#. Trigger a Puppet run on the Puppet server to generate the Wazuh certificates. Skip this step if you want the stack to run on the specified node once the run interval time, as set in ``puppet.conf`` elapses:

   .. code-block:: console

      # puppet agent -t

#. Perform a Puppet run on the Puppet agent to start the deployment of the Wazuh stack. Skip this step if you want the stack to run on the specified node once the run interval time, as set in ``puppet.conf`` elapses:

   .. code-block:: console

      # puppet agent -t

.. note:: The default login credentials are ``admin``:``admin``. It is advised to `change the password <https://documentation.wazuh.com/current/user-manual/user-administration/password-management.html>`_ after installation.

Multi-node
^^^^^^^^^^

Using the multi-node manifest below, you can deploy a distributed stack consisting of the following nodes on three servers or Virtual Machines (VMs).

- 3 indexer nodes

- Manager master node

- Manager worker node

- Dashboard node

You must include the server's hostname where you are installing each application.

#. Install the following packages if missing. These packages are required by the Wazuh central components:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install debhelper tar curl libcap2-bin #debhelper version 9 or later

      .. group-tab:: Yum

         .. code-block:: console

            # yum install libcap

      .. group-tab:: DNF

         .. code-block:: console

            # dnf install libcap

#. Create the ``stack.pp`` file at ``/etc/puppetlabs/code/environments/production/manifests/`` with the code below:

   .. code-block:: puppet
      :emphasize-lines: 1-6

      $node1host   = '<WAZUH_INDEXER_NODE1>'
      $node2host   = '<WAZUH_INDEXER_NODE2>'
      $node3host   = '<WAZUH_INDEXER_NODE3>'
      $masterhost    = '<WAZUH_MANAGER_MASTER>'
      $workerhost    = '<WAZUH_MANAGER_WORKER>'
      $dashboardhost = '<WAZUH_DASHBOARD>'
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

   Where:

   - ``WAZUH_INDEXER_NODE1`` is the hostname of the Wazuh indexer node1.

   - ``WAZUH_INDEXER_NODE2`` is the hostname of the Wazuh indexer node2.

   - ``WAZUH_INDEXER_NODE3`` is the hostname of the Wazuh indexer node3.

   - ``WAZUH_MANAGER_MASTER`` is the hostname of the Wazuh manager master node.

   - ``WAZUH_MANAGER_WORKER`` is the hostname of the Wazuh manager worker node.

   - ``WAZUH_DASHBOARD`` is the hostname of the Wazuh dashboard.

   .. note:: ``ossec_cluster_key`` is a unique 32-character-long key. You can generate a unique key with the command ``openssl rand -hex 16``.

   The ``wazuh::certificates`` class must be applied on the Puppet server (``puppet-server``) where the Wazuh module is installed. This is necessary because the archives module distributes files to all servers in the Wazuh stack deployment.

   If you need more Wazuh indexer nodes, add new variables. For example, ``WAZUH_INDEXER_NODE4``. Add them to the following arrays:

   - ``indexer_discovery_hosts``

   - ``indexer_cluster_initial_master_nodes``

   - ``indexer_cluster_CN``

   - ``indexer_certs``

   In addition, you need to add a new node instance similar to ``WAZUH_INDEXER_NODE2`` or ``WAZUH_INDEXER_NODE3``. Unlike the example for ``WAZUH_INDEXER_NODE1``, these instances don't run securityadmin.

   In case you need to add a Wazuh manager worker server, add a new variable such as ``WAZUH_MANAGER_WORKER2``. Add the variable to the ``manager_worker_certs`` array. For example, ``['worker',"$worker2host"]``. Then, replicate the node instance ``WAZUH_MANAGER_WORKER`` with the new server.

#. Trigger a Puppet run on the Puppet server to generate the Wazuh certificates. Skip this step if you want the stack to run on the specified node once the run interval time, as set in ``puppet.conf`` elapses:

   .. code-block:: console

      # puppet agent -t

#. Perform a Puppet run on the Puppet agents to start the deployment of the Wazuh stack. Skip this step if you want the stack to run on the specified node once the run interval time, as set in ``puppet.conf`` elapses:

   .. code-block:: console

      # puppet agent -t

Change password for Wazuh users
-------------------------------

Follow the instructions in the :doc:`Password Management </user-manual/user-administration/password-management>` section to change your Wazuh user passwords. Once you change them, set the new passwords within the classes used for deploying the Wazuh Stack.

Indexer users
^^^^^^^^^^^^^

-  ``admin`` user:

   .. code-block:: puppet

      node "<PUPPET_AGENT_NODE_NAME>" {
        class { 'wazuh::filebeat_oss':
          filebeat_oss_elastic_password  => '<NEW_PASSWORD>'
        }
      }

-  ``kibanaserver`` user:

   .. code-block:: puppet

      node "<PUPPET_AGENT_NODE_NAME>" {
        class { 'wazuh::dashboard':
          dashboard_password => '<NEW_PASSWORD>'
        }
      }

Wazuh API users
^^^^^^^^^^^^^^^

-  ``wazuh-wui`` user:

   .. code-block:: puppet

      node "<PUPPET_AGENT_NODE_NAME>" {
        class { 'wazuh::dashboard':
          dashboard_wazuh_api_credentials => '<NEW_PASSWORD>'
        }
      }

Install Wazuh agent via Puppet
------------------------------

The agent is configured by installing the ``wazuh::agent`` class. Here is an example of a manifest ``wazuh-agent.pp`` (please replace ``<MANAGER_IP_ADDRESS>`` with your manager IP address).

#. Install the following packages if missing on the Puppet agent. The Wazuh central components require these packages:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get install debhelper tar curl libcap2-bin #debhelper version 9 or later

      .. group-tab:: Yum

         .. code-block:: console

            # yum install libcap

      .. group-tab:: DNF

         .. code-block:: console

            # dnf install libcap

#. Create the ``wazuh_agent_stack.pp`` file at ``/etc/puppetlabs/code/environments/production/manifests/`` with the contents below:

   .. code-block:: puppet
      :emphasize-lines: 1, 4, 5

      node "<PUPPET_AGENT_NODE_NAME>" {
        class { 'wazuh::repo':
        }
        class { "wazuh::agent":
          wazuh_register_endpoint => "<MANAGER_IP_ADDRESS>",
          wazuh_reporting_endpoint => "<MANAGER_IP_ADDRESS>"
        }
      }

   Where:

   - ``WAZUH_AGENT_NODE_NAME`` is the hostname of the Wazuh agent host.

   - ``MANAGER_IP_ADDRESS`` is the hostname of the Wazuh server node.

#. Perform a Puppet run on the Puppet agent to start the deployment of the Wazuh stack. Skip this step if you want the stack to run on the specified node once the run interval time, as set in ``puppet.conf`` elapses:

   .. code-block:: console

      # puppet agent -t

.. _ref_wazuh_puppet:

Wazuh Puppet module reference
-----------------------------

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
|                                                                 | :ref:`Wodle osquery <ref_agent_vars_wodle_osquery>`             |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Wodle Syscollector <ref_agent_vars_wodle_syscollector>`   |                                             |
|                                                                 |                                                                 |                                             |
|                                                                 | :ref:`Misc <ref_agent_vars_misc>`                               |                                             |
|                                                                 |                                                                 |                                             |
+-----------------------------------------------------------------+-----------------------------------------------------------------+---------------------------------------------+

.. topic:: Content

 .. toctree::
    :maxdepth: 1

    reference-wazuh-puppet/wazuh-manager-class
    reference-wazuh-puppet/wazuh-agent-class

