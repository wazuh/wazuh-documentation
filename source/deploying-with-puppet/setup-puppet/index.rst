.. _setup_puppet:

Set up Puppet
============================

Before we get started with Puppet, confirm the following network requirements are met:

- **Private network DNS**: Forward and reverse DNS must be configured, and every server must have a unique hostname. If you do not have DNS configured, you must use your hosts file for name resolution. We will assume that you will use your private network for communication within your infrastructure.
- **Firewall open ports**: The Puppet master must be reachable on TCP port 8140.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        install-puppet-master.rst
        install-puppet-agent.rst
        setup-puppet-certificates.rst
