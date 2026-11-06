.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to pass deployment variables to the Wazuh agent MSI package on Windows and see an example of how to use them.

Deployment variables for Windows
================================

Pass the variables as properties to the MSI package, then start the Wazuh agent. The installer doesn't start it. Replace ``<WAZUH_AGENT_MSI>`` with the file name of the package you downloaded. For more variables, such as ``WAZUH_AGENT_GROUP``, see the :doc:`Deployment variables </user-manual/agent/agent-enrollment/deployment-variables/index>` table.

.. code-block:: pwsh-session
   :emphasize-lines: 1

   > (Start-Process msiexec.exe -ArgumentList '/i "<WAZUH_AGENT_MSI>" /q WAZUH_ENROLLMENT_TOKEN="<TOKEN>" WAZUH_AGENT_NAME="windows-server-01"' -Wait -PassThru).ExitCode
   > Start-Service -Name wazuh

To check that the Wazuh agent enrolled, search its log for the ``Token bootstrap: enrollment succeeded`` message. The Wazuh agent also shows as Active in **Agents management** > **Summary** on the Wazuh dashboard.

.. code-block:: pwsh-session

   > Select-String -Path "C:\Program Files (x86)\ossec-agent\ossec.log" -Pattern "enrollment succeeded"

.. note::

   -  With ``/q``, the installer doesn't display errors. To find out why an installation failed, add ``/l*v C:\wazuh-agent-install.log`` and check the log.
   -  The installer fails with error ``1603`` if a system restart is pending. Restart Windows and run the installer again.
   -  Agent names can't contain spaces. Use only letters, digits, dots (.), dashes (-), and underscores (_), for example ``WAZUH_AGENT_NAME="windows-server-01"``.
