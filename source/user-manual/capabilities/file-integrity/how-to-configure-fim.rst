.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh FIM module runs scans on Windows, Linux, and macOS. Learn how to configure the FIM module in this section of the Wazuh documentation.

Configuration
=============

The Wazuh FIM module runs scans on Windows, Linux, and macOS. Some settings are global while others are specific to the endpoint's operating system. The :doc:`Basic configuration options </user-manual/capabilities/file-integrity/basic-settings>` and :doc:`Advanced configuration options </user-manual/capabilities/file-integrity/advanced-settings>` sections provide further details on the available configuration settings.

The Wazuh FIM module monitors files within the specified directories and detects file creation, modification, and deletion events. It does not detect directory creation, modification, or deletion events. You can configure monitored files and directories either locally in the Wazuh agent configuration file or remotely via centralized configuration.

Use the ``<directories>`` option to specify the files and directories the FIM module monitors. Include multiple entries as a comma-separated list or on separate lines. FIM directories support ``*`` and ``?`` wildcards in the same way you would use them in a shell or Command Prompt (cmd) terminal. For example, ``C:\Users\*\Downloads``.

This example configures the FIM module to monitor a file and directory. Replace ``<FILEPATH_OF_MONITORED_FILE>`` and ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own file paths.

#. Add the following settings to the Wazuh agent configuration file, replacing the ``<directories>`` values with your own file paths:

   -  Linux: ``/var/ossec/etc/ossec.conf``
   -  Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   -  macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2,3

      <syscheck>
         <directories><FILEPATH_OF_MONITORED_FILE></directories>
         <directories><FILEPATH_OF_MONITORED_DIRECTORY></directories>
      </syscheck>

#. Restart the Wazuh agent to apply any configuration change:

   -  Linux: ``systemctl restart wazuh-agent``
   -  Windows: ``Restart-Service -Name wazuh``
   -  macOS: ``/Library/Ossec/bin/wazuh-control restart``

.. note::

   If you specify a directory both in a centralized configuration and in the configuration file of the Wazuh agent, the centralized configuration takes precedence and overrides the local configuration. The FIM module does not support monitoring UNC network paths or mapped network drives on Windows. Only local file system paths are supported. This applies to all FIM modes: scheduled, real-time, and whodata.

