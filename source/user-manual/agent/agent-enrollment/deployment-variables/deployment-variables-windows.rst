.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to pass deployment variables to the Wazuh agent MSI package on Windows and see an example of how to use them.

Deployment variables for Windows
================================

Pass the variables as properties to the MSI package, then start the Wazuh agent. The installer doesn't start it. Replace ``<WAZUH_AGENT_MSI>`` with the file name of the package you downloaded.

.. code-block:: pwsh-session
   :emphasize-lines: 1

   > msiexec.exe /i <WAZUH_AGENT_MSI> /q WAZUH_ENROLLMENT_TOKEN="<TOKEN>" WAZUH_AGENT_NAME="windows-server-01"
   > Start-Service -Name wazuh

.. note::

   -  With ``/q``, the installer doesn't display errors. To find out why an installation failed, add ``/l*v C:\wazuh-agent-install.log`` and check the log.
   -  The installer fails with error ``1603`` if a system restart is pending. Restart Windows and run the installer again.
   -  In PowerShell, use ``""`` to quote a value that contains spaces. For example, ``WAZUH_AGENT_NAME=""Windows Server 01""``.
