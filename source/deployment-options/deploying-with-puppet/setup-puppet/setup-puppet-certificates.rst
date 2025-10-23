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

#. Approve the certificate on the Puppet server. Replace ``<PENDING_AGENT_NODE>`` with your agent's node name retrieved from the previous step:

   .. code-block:: console

      # puppetserver ca sign --certname <PENDING_AGENT_NODE>

   All certificates can be approved with this command:

   .. code-block:: console

      # puppetserver ca sign --all

#. On the Puppet agent node, run this command to update the signed certificate:

   .. code-block:: console

      # puppet agent -t

   .. code-block:: none
      :class: output

      Info: Using environment 'production'
      Info: Retrieving pluginfacts
      Info: Retrieving plugin
      Notice: Requesting catalog from puppet-master:8140 (172.31.11.101)
      Notice: Catalog compiled by ip-172-31-11-101.host
      Info: Caching catalog for ip-172-31-0-23.host
      Info: Applying configuration version '1757619362'
      Notice: Applied catalog in 0.01 seconds


.. note:: Remember that private network DNS is a prerequisite for a successful certificate signing.
