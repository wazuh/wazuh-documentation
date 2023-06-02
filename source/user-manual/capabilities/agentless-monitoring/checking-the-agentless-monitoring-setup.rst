.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Agentless monitoring allows you to monitor devices or systems with no agent via SSH. Learn how it works and its configuration in this section.

Checking the agentless monitoring setup
=======================================

After  you configure the agentless monitoring on the Wazuh server, restart the Wazuh manager with the following command to apply the configuration: 

.. code-block:: console

   systemctl restart wazuh-manager

When the ``expect`` package is present, and Wazuh is restarted, you should see a message similar to the following in the ``/var/ossec/logs/ossec.log`` file:

.. code-block:: console

   wazuh-agentlessd: INFO: Test passed for 'ssh_integrity_check_linux'.

When Wazuh has connected to the monitored endpoint, you should see a message similar to the following in the same log file:

.. code-block:: console

   wazuh-agentlessd: INFO: ssh_integrity_check_linux: user@example_adress.com: Starting.
   wazuh-agentlessd: INFO: ssh_integrity_check_linux: user@example_adress.com: Finished.


