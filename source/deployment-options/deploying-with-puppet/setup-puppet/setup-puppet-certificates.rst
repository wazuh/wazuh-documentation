.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to set up Puppet certificates in this section of the Wazuh documentation. 

.. _setup_puppet_certificates:

Setting up Puppet certificates
==============================

To generate and sign a certificate, follow the next steps:

#. On the Puppet agent, run this command to generate an empty certificate:

   .. code-block:: console

      # puppet agent -t

#. On the Puppet server side, list the current certificates that need approval:

   .. code-block:: console

      # puppetserver ca list

   It should output a list with your node hostname.

#. Approve the certificate, replacing ``pending-agent-node`` with your agent’s node name:

   .. code-block:: console

      # puppetserver ca sign --certname pending-agent-node

   All certificates can be approved with this:

   .. code-block:: console

      # puppetserver ca sign --all

#. Back on the Puppet agent node, run in the puppet agent again:

   .. code-block:: console

      # puppet agent -t

.. note:: Remember that private network DNS is a prerequisite for a successful certificate signing.
