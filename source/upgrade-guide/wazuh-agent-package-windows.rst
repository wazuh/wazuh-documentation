
.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Ugrading Wazuh agents on Windows systems
========================================

The Wazuh agent upgrading process for Windows systems requires to download the latest `Windows installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_WINDOWS|/windows/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi>`_. There are two ways of using the installer, both of them require ``administrator rights``.

a) Using the GUI installer. Open the installer and follow the instructions to upgrade the Wazuh agent:

   .. thumbnail:: ../images/installation/windows.png
      :title: Windows agent
      :align: left
      :width: 100%

b) Using the command line. To upgrade the Wazuh agent from the command line, run the installer using Windows PowerShell or the command prompt. The ``/q`` argument is used for unattended installations:

   .. code-block:: none

      # .\wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q


.. note::

   Once the Wazuh agent is upgraded, if it still uses UDP, which was the default protocol for versions prior to Wazuh 4.x, it must be changed to TCP in the ``ossec.conf`` file:
   
   .. code-block:: console
     :emphasize-lines: 6
   
     <ossec_config>
       <client>
         <server>
           <address>172.16.1.17</address>
           <port>1514</port>
           <protocol>udp</protocol>
         </server>               