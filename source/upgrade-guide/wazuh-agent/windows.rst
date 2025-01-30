
.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: Check out how to upgrade the Wazuh agent to the latest available version remotely, using the agent_upgrade tool or the Wazuh API, or locally.


Upgrading Wazuh agents on Windows endpoints
===========================================

Follow these steps to upgrade Wazuh agents locally on Windows endpoints.

.. note:: You need administrator privileges to upgrade the agent.

#. Download the latest `Windows installer <https://packages.wazuh.com/|WAZUH_CURRENT_MAJOR_WINDOWS|/windows/wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi>`_. 

#. Run the Windows installer by using the command line interface (CLI) or the graphical user interface (GUI).


   .. tabs::
    
      .. group-tab:: CLI

         To upgrade the Wazuh agent from the command line, run the installer using Windows PowerShell or the command prompt. The ``/q`` argument is used for unattended installations.

            .. code-block:: none

               # .\wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /q


      .. group-tab:: GUI

         Open the installer and follow the instructions to upgrade the Wazuh agent.

            .. thumbnail:: /images/installation/windows.png
              :title: Windows agent setup window
              :alt: Windows agent setup Window
              :align: center
              :width: 100%
       