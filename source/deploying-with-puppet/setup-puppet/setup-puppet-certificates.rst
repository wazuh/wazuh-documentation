.. Copyright (C) 2018 Wazuh, Inc.

.. _setup_puppet_certificates:

Setting up Puppet certificates
==============================

To generate and Sign a certificate, follow the next steps:

1. In the agent side run this command to generate an empty certificate:

    .. code-block:: console

       # puppet agent -t

    .. note:: 

        You will see this message:  ``Exiting; no certificate found and waitforcert is disabled``

2. In the server side, list the current certificates:

    .. code-block:: console

       # puppet cert list

    It should output a list with your node’s hostname.

3. Approve the certificate, replacing ``hostname.example.com`` with your agent's node name:

    .. code-block:: console

        # puppet cert sign hostname.example.com

4. Back on the Puppet agent node, run in the puppet agent again:

.. code-block:: console

   # puppet agent -t

.. note:: Remember that private network DNS is a prerequisite for a successful certificate signing.
