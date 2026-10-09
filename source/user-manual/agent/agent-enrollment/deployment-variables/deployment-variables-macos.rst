.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to pass deployment variables to the Wazuh agent package on macOS and see an example of how to use them.

Deployment variables for macOS
==============================

Write the variables to ``/tmp/wazuh_envs``, one per line, then run the installer. The installer reads the file and then deletes it.

.. code-block:: console

   # echo "WAZUH_ENROLLMENT_TOKEN='<TOKEN>'" > /tmp/wazuh_envs && echo "WAZUH_AGENT_NAME='macbook-01'" >> /tmp/wazuh_envs && installer -pkg wazuh-agent-*.pkg -target /

Then start the Wazuh agent:

.. code-block:: console

   # /Library/Ossec/bin/wazuh-control start
