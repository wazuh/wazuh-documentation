.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The FIM module runs scans on Windows, Linux, and macOS operating systems.  Learn how to configure the FIM module in this section of the Wazuh documentation. 
  
How to configure the FIM module
===============================

The FIM module runs scans on Windows, Linux, and macOS operating systems. There are both global settings and settings that are specific to the operating system of the endpoint. We discuss these settings and the supported operating systems in the :doc:`Basic settings </user-manual/capabilities/file-integrity/basic-settings>` section of this guide.

You must specify the directories where the FIM module must monitor the creation, modification, and deletion of files or configure the specific files you need to monitor. You can specify the file or directory to monitor on the Wazuh server and the Wazuh agent :doc:`configuration </user-manual/reference/ossec-conf/index>` files. You can also configure this capability remotely using the :doc:`centralized configuration </user-manual/reference/centralized-configuration>` file. 

You have to set the files and directories to monitor with the :ref:`directories <reference_ossec_syscheck_directories>` options. You can include multiple files and directories using comma-separated entries or adding entries on multiple lines. You can configure FIM directories using * and ? wildcards in the same way you would use them in a shell or Command Prompt (cmd) terminal. For example, ``C:\Users\*\Downloads``.

Any time the FIM module runs a scan, it triggers alerts if it finds modified files and depending on the changed file attributes. You can view these alerts in the Wazuh dashboard. 

Following, you can see how to configure the FIM module to monitor a file and directory. Replace ``FILEPATH/OF/MONITORED/FILE`` and ``FILEPATH/OF/MONITORED/DIRECTORY`` with your own filepaths. 

#. Add the following settings to the Wazuh agent configuration file, replacing the directories values with your own filepaths:
   
   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2,3

      <syscheck>
         <directories>FILEPATH/OF/MONITORED/FILE</directories>
         <directories>FILEPATH/OF/MONITORED/DIRECTORY</directories>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``

   .. note::

      If you specify a directory both in a :doc:`centralized configuration </user-manual/reference/centralized-configuration>` and on the :doc:`configuration </user-manual/reference/ossec-conf/index>` file of the Wazuh agent, the centralized configuration takes precedence and overrides the local configuration.



