.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to pass deployment variables to the Wazuh agent package on macOS and see an example of how to use them.

Deployment variables for macOS
==============================

Write the variables to ``/tmp/wazuh_envs``, one per line, then run the installer. The installer reads the file and then deletes it. For more variables, such as ``WAZUH_AGENT_GROUP``, see the :doc:`Deployment variables </user-manual/agent/agent-enrollment/deployment-variables/index>` table.

.. code-block:: console

   # echo "WAZUH_ENROLLMENT_TOKEN='<TOKEN>'" > /tmp/wazuh_envs && echo "WAZUH_AGENT_NAME='macbook-01'" >> /tmp/wazuh_envs && installer -pkg wazuh-agent-*.pkg -target /

Then start the Wazuh agent:

.. code-block:: console

   # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist

To check that the Wazuh agent enrolled, search its log for the ``Token bootstrap: enrollment succeeded`` message. The Wazuh agent also shows as Active in **Agents management** > **Summary** on the Wazuh dashboard.

.. code-block:: console

   # grep "enrollment succeeded" /Library/Ossec/logs/ossec.log
