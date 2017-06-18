.. _setup_puppet_certificates:

Setting up Puppet certificates
=================================

Run Puppet agent to generate a certificate for the Puppet Server to sign: ::

   $ sudo puppet agent -t

Log into to your Puppet Server, and list the certificates that need approval: ::

   $ sudo puppet cert list

It should output a list with your node’s hostname.

Approve the certificate, replacing ``hostname.example.com`` with your agent's node name: ::

   $ sudo puppet cert sign hostname.example.com

Back on the Puppet agent node, run the puppet agent again: ::

   $ sudo puppet agent -t

.. note:: Remember that private network DNS is a prerequisite for a successful certificate signing.
