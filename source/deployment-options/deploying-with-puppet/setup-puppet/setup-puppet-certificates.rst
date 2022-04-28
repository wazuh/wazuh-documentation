.. Copyright (C) 2022 Wazuh, Inc.

.. _setup_puppet_certificates:

Setting up Puppet certificates
==============================

To generate and sign a certificate, follow the next steps:

1. On the Puppet agent, run this command to generate an empty certificate:

    .. code-block:: console

       # puppet agent -t

2. On the Puppet server side, list the current certificates that need approval:

    .. code-block:: console

       # puppet cert list

    It should output a list with your node hostname.

3. Approve the certificate, replacing ``puppet-master`` with your agent node name:

    .. code-block:: console

        # sudo puppetserver ca sign --certname puppet-master


     All certificates can be approved with this:

    .. code-block:: console

         # sudo puppetserver ca sign --all

4. Back on the Puppet agent node, run in the puppet agent again:

    .. code-block:: console

        # puppet agent -t

.. note:: Remember that private network DNS is a prerequisite for a successful certificate signing.
