.. _wazuh_puppet_module_install:

Install Wazuh module
==============================

.. note:: This Puppet module has been authored by Nicolas Zin, and updated by Jonathan Gazeley and Michael Porter. Wazuh has forked it with the purpose of maintaining it. Thank you to the authors for the contribution.

Download and install the Wazuh module from Puppet Forge: ::

   $ sudo puppet module install wazuh-ossec
   Notice: Preparing to install into /etc/puppet/modules ...
   Notice: Downloading from https://forgeapi.puppetlabs.com ...
   Notice: Installing -- do not interrupt ...
   /etc/puppet/modules
   └─┬ wazuh-ossec (v2.0.1)
     ├── jfryman-selinux (v0.2.5)
     ├── puppetlabs-apt (v2.2.0)
     ├── puppetlabs-concat (v1.2.4)
     ├── puppetlabs-stdlib (v4.9.0)
     └── stahnma-epel (v1.1.1)

This module installs and configures Wazuh agent and manager.
