.. _setup_puppet_certificates:

Setting up Puppet certificates
=================================

Run Puppet agent to generate a certificate for the Puppet Server to sign:

.. code-block:: console

   # puppet agent -t

Log into to your Puppet Server, and list the certificates that need approval:

.. code-block:: console

   # puppet cert list

It should output a list with your node’s hostname.

Approve the certificate, replacing ``hostname.example.com`` with your agent's node name:

.. code-block:: console

   # puppet cert sign hostname.example.com

Back on the Puppet agent node, run the puppet agent again: 

.. code-block:: console

   # puppet agent -t

.. note:: Remember that private network DNS is a prerequisite for a successful certificate signing.
