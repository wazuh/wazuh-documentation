.. _install_agent_puppet:

Install agent via Puppet
==============================

The agent is configured by installing the ``ossec::client`` class.

Here is an example of a manifest ``ossec.pp``:

Wazuh agent: ::

   node "client.yourhost.com" {

   class { "ossec::client":
     ossec_server_ip => "192.168.209.166"
   }

   }
