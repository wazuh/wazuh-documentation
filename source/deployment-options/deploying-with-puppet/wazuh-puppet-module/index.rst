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
    └─┬ wazuh-wazuh (v4.4.5)
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

A stack of Wazuh manager, Wazuh dashboard, Wazuh indexer and Filebeat can be deployed using this manifest. See the Wazuh manager section for variables that can be used to configure the manager before deployment.

Create a stack.pp file at ``/etc/puppetlabs/code/environments/production/manifests/`` and put the contents below. ``puppet-agent-node`` refers to the hostname or IP of the puppet agent:

.. code-block:: console

   node "puppet-agent-node" {
    class { 'wazuh::manager':
    }
    class { 'wazuh::indexer':
    }
    class { 'wazuh::filebeat_oss':
    }
    class { 'wazuh::dashboard':
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
    
