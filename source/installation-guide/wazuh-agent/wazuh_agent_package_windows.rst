.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to install the Wazuh agent on Windows systems. 

.. _wazuh_agent_package_windows:

Deploying Wazuh agents on your Windows systems
==============================================

Install, register and configure a Wazuh agent on your Windows system. 

.. note:: In order to perform this installation, administrator privileges are required.

#. Download the `Windows installer <https://packages.wazuh.com/|CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi>`_. 

#. Edit the ``WAZUH_MANAGER`` and ``WAZUH_REGISTRATION_SERVER`` variables to contain the Wazuh managers IP address or hostname, and proceed to deploy the agent in your system using command line:

        .. tabs::
    
          .. group-tab:: Powershell
    
             .. code-block:: console
    
                .\wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2" 
    
          .. group-tab:: Windows cmd
    
             .. code-block:: console
    
                wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /q WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_SERVER="10.0.0.2"


 

For additional deployment options, like agent name, agent group, and registration password, see :ref:`Deployment variables for Windows <deployment_variables_windows>`.


You now have an installed, registered and configured Wazuh agent reporting to the Wazuh manager. By default, all agent files are stored in: ``C:\Program Files (x86)\ossec-agent``.


Uninstall
---------

In order to uninstall the agent, the original MSI file will be needed to perform the unattended process:

.. code-block:: none

    msiexec.exe /x wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /qn  