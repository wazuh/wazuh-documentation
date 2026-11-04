.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to pass deployment variables to the Wazuh agent package on Linux and see examples of how to use them.

Deployment variables for Linux
==============================

Pass the variables to the package manager command. Run the command as root, or put the variables after ``sudo``, because ``sudo`` doesn't pass on your environment variables. Download the package as described in the :doc:`Linux installation guide </installation-guide/wazuh-agent/wazuh-agent-package-linux>`. For more variables, such as ``WAZUH_AGENT_GROUP``, see the :doc:`Deployment variables </user-manual/agent/agent-enrollment/deployment-variables/index>` table.

-  Debian-based endpoints:

   .. code-block:: console

      # WAZUH_ENROLLMENT_TOKEN='<TOKEN>' WAZUH_AGENT_NAME='web-server-01' dpkg -i wazuh-agent_*.deb

-  RPM-based endpoints, such as Red Hat Enterprise Linux, Amazon Linux, and SUSE Linux Enterprise Server. The first command imports the Wazuh GPG key, so that ``rpm`` doesn't warn that the key is missing (NOKEY):

   .. code-block:: console

      # rpm --import https://packages.wazuh.com/key/GPG-KEY-WAZUH
      # WAZUH_ENROLLMENT_TOKEN='<TOKEN>' WAZUH_AGENT_NAME='web-server-01' rpm -ivh wazuh-agent-*.rpm

Then start the Wazuh agent:

.. code-block:: console

   # systemctl daemon-reload
   # systemctl enable --now wazuh-agent

To check that the Wazuh agent enrolled, search its log for the ``Token bootstrap: enrollment succeeded`` message. The Wazuh agent also shows as Active in **Agents management** > **Summary** on the Wazuh dashboard.

.. code-block:: console

   # grep "enrollment succeeded" /var/ossec/logs/ossec.log
