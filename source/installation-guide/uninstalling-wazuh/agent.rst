.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to uninstall the Wazuh agent.
  
Uninstalling the Wazuh agent
============================

This section describes how to uninstall Wazuh agents installed across the different operating systems below:

-  :ref:`Linux <uninstalling_linux_agent>`
-  :ref:`Windows <uninstalling_windows_agent>`
-  :ref:`macOS <uninstalling_macos_agent>`
-  :ref:`Solaris <uninstalling_solaris_agent>`
-  :ref:`AIX <uninstalling_aix_agent>`
-  :ref:`HPUX <uninstalling_hpux_agent>`

.. _uninstalling_linux_agent:

Uninstalling a Linux Wazuh agent
--------------------------------

Run the following commands to uninstall a Linux agent.


#. Remove the Wazuh agent installation. 

   .. tabs::
 
      .. group-tab:: Yum
  
         .. include:: ../../_templates/installations/wazuh/yum/uninstall_wazuh_agent.rst
 
      .. group-tab:: APT
 
         .. include:: ../../_templates/installations/wazuh/deb/uninstall_wazuh_agent.rst

      .. group-tab:: ZYpp
  
         .. include:: ../../_templates/installations/wazuh/zypp/uninstall_wazuh_agent.rst

      .. group-tab:: APK
  
         .. include:: ../../_templates/installations/wazuh/apk/uninstall_wazuh_agent.rst

#. Disable the Wazuh agent service. 

   .. include:: ../../_templates/installations/wazuh/common/disable_wazuh_agent_service.rst

The Wazuh agent is now completely removed from your Linux endpoint.

.. _uninstalling_windows_agent:

Uninstalling a Windows Wazuh agent
----------------------------------

To uninstall the agent, the original Windows installer file is required to perform the unattended process:

  .. code-block:: none
  
      msiexec.exe /x wazuh-agent-|WAZUH_CURRENT_WINDOWS|-|WAZUH_REVISION_WINDOWS|.msi /qn  

The Wazuh agent is now completely removed from your Windows endpoint.

.. _uninstalling_macos_agent:

Uninstalling a macOS Wazuh agent
--------------------------------

Follow these steps to uninstall the Wazuh agent from your macOS endpoint.

#. Stop the Wazuh agent service.

    .. code-block:: console

      # sudo launchctl unload /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove the ``/Library/Ossec/`` folder.

    .. code-block:: console

      # /bin/rm -r /Library/Ossec

#. Remove ``launchdaemons`` and ``StartupItems``.

    .. code-block:: console

      # /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove the Wazuh user and group.

    .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/wazuh"
      # /usr/bin/dscl . -delete "/Groups/wazuh"

#. Remove from ``pkgutil``.

    .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent

The Wazuh agent is now completely removed from your macOS endpoint.

.. _uninstalling_solaris_agent:

Uninstalling a Solaris Wazuh agent
----------------------------------

Select the Solaris version you want to uninstall.

.. tabs::

  .. group-tab:: Solaris 10

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s10.rst

  .. group-tab:: Solaris 11

    .. include:: ../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s11.rst

The Wazuh agent is now completely removed from your Solaris endpoint.

.. _uninstalling_aix_agent:

Uninstalling an AIX Wazuh agent
-------------------------------

Follow the steps below to uninstall the Wazuh agent from the AIX endpoint.

.. code-block:: console

   # rpm -e wazuh-agent

Some files are not removed from the filesystem by the package manager. Delete the ``/var/ossec/`` folder if you want to remove all files completely. 

The Wazuh agent is now completely removed from your AIX system

.. _uninstalling_hpux_agent:

Uninstalling an HP-UX Wazuh agent
---------------------------------

Follow the steps below to uninstall the Wazuh agent from the HP-UX endpoint.

#. Stop the Wazuh agent service.


   .. code-block:: console

      # /var/ossec/bin/wazuh-control stop

#. Delete ``wazuh`` user and group:

   .. code-block:: console

      # groupdel wazuh
      # userdel wazuh

#. Remove Wazuh files.

   .. code-block:: console

      # rm -rf /var/ossec

The Wazuh agent is now completely removed from your HP-UX endpoint.
