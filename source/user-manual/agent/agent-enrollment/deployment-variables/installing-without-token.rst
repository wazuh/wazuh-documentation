.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn what happens when you install the Wazuh agent package without an enrollment token and how to enroll the Wazuh agent later.

Installing without a token
==========================

If you install the package without ``WAZUH_ENROLLMENT_TOKEN``, the installation completes, but the Wazuh agent isn't enrolled and can't start until it is. The installer records this message in ``ossec.log``. On Linux, it's also displayed:

.. code-block:: none
   :class: output

   No manager configured [INFO_NO_MANAGER]: WAZUH_ENROLLMENT_TOKEN was not supplied, so the agent does not know where to connect.

The other variables, such as ``WAZUH_AGENT_NAME`` and ``WAZUH_AGENT_GROUP``, are still applied. To enroll the Wazuh agent later, save the token to a file and run ``wazuh-agent-auth`` as root or as an administrator. It uses the name and groups set during installation:

-  Linux:

   .. code-block:: console

      # /var/ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE>

-  macOS:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE>

-  Windows: in the Wazuh agent tray application, select **Manage** → **Enroll** and provide the token. Alternatively, run:

   .. code-block:: pwsh-session

      > & "C:\Program Files (x86)\ossec-agent\wazuh-agent-auth.exe" --token-file <TOKEN_FILE>

Then start the Wazuh agent as shown in the deployment variables page for your operating system: :doc:`Linux <deployment-variables-linux>`, :doc:`Windows <deployment-variables-windows>`, or :doc:`macOS <deployment-variables-macos>`. ``wazuh-agent-auth`` doesn't delete the token file, so delete it after enrolling.
