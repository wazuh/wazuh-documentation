
.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Ugrading Wazuh agents on macOS systems
======================================

The Wazuh agent upgrading process for macOS systems requires to download the latest `macOS installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.pkg>`_. There are two ways of using the installer.

a) Using the GUI will perform a simple upgrade. Double click on the downloaded file and follow the wizard. If you are not sure how to answer some of the prompts, simply use the default answers:

   .. image:: ../images/installation/macos.png
      :align: left
      :scale: 50 %


b) Using the command line:

   .. code-block:: console

      # installer -pkg wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.pkg -target /

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