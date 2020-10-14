.. Copyright (C) 2020 Wazuh, Inc.

.. meta:: :description: Learn how to uninstall a Wazuh agent

.. _uninstalling_wazuh_agents:



Uninstall a Wazuh agent
=======================

To uninstall a Wazuh agent follow the instructions for your operating system:

.. _uninstalling_wazuh_agents_aix:

AIX
---

To uninstall the agent:

    .. code-block:: console

      # rpm -e wazuh-agent

There are files marked as configuration files. Due to this designation, the package manager does not remove those files from the filesystem. The complete file removal action is on user's responsibility. it can be done by removing the folder ``/var/ossec``.

.. _uninstalling_wazuh_agents_linux:

Linux
-----

To uninstall the agent:

.. tabs::


  .. group-tab:: APT


    .. include:: ../../../_templates/installations/wazuh/deb/uninstall_wazuh_agent.rst



  .. group-tab:: Yum


    .. include:: ../../../_templates/installations/wazuh/yum/uninstall_wazuh_agent.rst



  .. group-tab:: ZYpp


    .. include:: ../../../_templates/installations/wazuh/zypp/uninstall_wazuh_agent.rst


.. _uninstalling_wazuh_agents_macos:

macOS
-----

To uninstall the agent in macOS:

#. Stop the Wazuh agent service

    .. code-block:: console

      # /Library/Ossec/bin/ossec-control stop

#. Remove the ``/Library/Ossec/`` folder and ``ossec-init.conf`` file

    .. code-block:: console

      # /bin/rm -r /Library/Ossec
      # /bin/rm /etc/ossec-init.conf

#. Stop and unload dispatcher

    .. code-block:: console

      # /bin/launchctl unload /Library/LaunchDaemons/com.wazuh.agent.plist

#. Remove ``launchdaemons`` and ``StartupItems``

    .. code-block:: console

      # /bin/rm -f /Library/LaunchDaemons/com.wazuh.agent.plist
      # /bin/rm -rf /Library/StartupItems/WAZUH

#. Remove User and Groups

    .. code-block:: console

      # /usr/bin/dscl . -delete "/Users/ossec"
      # /usr/bin/dscl . -delete "/Groups/ossec"

#. Remove from ``pkgutil``

    .. code-block:: console

      # /usr/sbin/pkgutil --forget com.wazuh.pkg.wazuh-agent


.. _uninstalling_wazuh_agents_solaris:

Solaris
-------

.. tabs::


  .. group-tab:: Solaris 10

    .. include:: ../../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s10.rst



  .. group-tab:: Solaris 11

    .. include:: ../../../_templates/installations/wazuh/solaris/uninstall_wazuh_agent_s11.rst


.. _uninstalling_wazuh_agents_windows:

Windows
-------

To uninstall the agent, the original MSI file will be needed to perform the unattended process::

    msiexec.exe /x wazuh-agent-|WAZUH_LATEST|-|WAZUH_REVISION_WINDOWS|.msi /qn    

