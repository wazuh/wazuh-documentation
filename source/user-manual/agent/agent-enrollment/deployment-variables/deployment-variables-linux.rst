.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to pass deployment variables to the Wazuh agent package on Linux and see examples of how to use them.

Deployment variables for Linux
==============================

Pass the variables to the package manager command. Run the command as root, or put the variables after ``sudo``, because ``sudo`` doesn't pass on your environment variables.

-  Debian-based endpoints:

   .. code-block:: console

      # WAZUH_ENROLLMENT_TOKEN='<TOKEN>' WAZUH_AGENT_NAME='web-server-01' dpkg -i wazuh-agent_*.deb

-  Red Hat-based endpoints:

   .. code-block:: console

      # WAZUH_ENROLLMENT_TOKEN='<TOKEN>' WAZUH_AGENT_NAME='web-server-01' rpm -ivh wazuh-agent-*.rpm

Then start the Wazuh agent:

.. code-block:: console

   # systemctl daemon-reload
   # systemctl enable --now wazuh-agent
