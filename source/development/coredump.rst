.. Copyright (C) 2024, Wazuh, Inc.

.. meta::
   :description: This section contains instructions to configure and collect core dumps for analysis.

Configuring core dump generation
================================

A *core dump* or *crash dump* is a snapshot of a process's memory taken when a serious or unhandled error occurs. The operating system on a monitored endpoint can automatically generate core dumps. These dumps are valuable for diagnosing hanging processes. Alongside environment information, such as the operating system version, they can offer insights into the cause of a crash.

Red Hat based OSs
-----------------

#. Edit the Systemd ``/etc/systemd/system.conf`` file. Add the following lines.

   .. code-block:: console

      DumpCore=yes
      DefaultLimitCORE=infinity

#. Edit the Systemd ``/etc/sysctl.d/core.conf`` file. Add the following lines.

   .. code-block:: console

      kernel.core_pattern = /var/lib/coredumps/core-%e-pid%p-time%t
      kernel.core_uses_pid = 1
      fs.suid_dumpable = 2

#. Create directory ``/var/lib/coredumps`` and grant it permissions ``773``.

#. Reboot the system

#. After system reboot set the core ulimit to unlimited in your terminal.

   .. code-block:: console

      # ulimit -c unlimited
      # sysctl -p

#. Restart wazuh agent:

   .. code-block:: console

      # ./var/ossec/bin/wazuh-control restart
      

Debian based OSs
----------------

In Linux version 2.41 and later, a template defines the location and name of the generated `core dump files <https://man7.org/linux/man-pages/man5/core.5.html>`__. Earlier versions generate the core dump files next to the location of the file that caused the error.

Using `systemd`
^^^^^^^^^^^^^^^

Systemd allows centralized management and configuration of core dumps across your system. To set up core dump generation with systemd, use the built-in features as follows.

#. Check that the Systemd core dump unit socket is active.

   .. code-block:: console

      # systemctl status systemd-coredump*

   .. code-block:: none
      :class: output
      :emphasize-lines: 3

      ● systemd-coredump.socket - Process Core Dump Socket
           Loaded: loaded (/lib/systemd/system/systemd-coredump.socket; static)
           Active: active (listening) ...

#. Edit the Systemd ``/etc/systemd/coredump.conf`` file.

   .. code-block:: console

      # systemctl edit systemd-coredump

#. Add the following lines in the editor that opens to enable core dump collection and set external core dump storage. To disable core dump generation you must set ``Storage=none``.

   .. code-block:: console

      [Coredump]
      Storage=external

#. **Recommended** – Set a size limit for core dump files. For example, 2 GB.

   .. code-block:: console

      ProcessSizeMax=2G

#. Restart the ``systemd-coredump`` service to apply the changes.

   .. code-block:: console

      # systemctl restart systemd-coredump

#. Check the status of the systemd-coredump service to ensure it is running without errors.

   .. code-block:: console

      # systemctl status systemd-coredump

#. To check the generated core dump files, take a look at the default ``/var/lib/systemd/coredump/`` directory. To find out the filename pattern for these files, run the following command.

   .. code-block:: console

      # cat /proc/sys/kernel/core_pattern

   .. code-block:: none
      :class: output

      │|/lib/systemd/systemd-coredump %P %u %g %s %t

Manual configuration
^^^^^^^^^^^^^^^^^^^^

Setting up core dump generation without using systemd involves configuring the operating system core dump settings manually. Follow these steps to set up core dump generation manually.

#. Set the core dump size limit to ``unlimited`` to enable core dump generation with complete debugging information. To disable it, set it to zero by running ``ulimit -c 0``. To check the current core dump size limit, run ``ulimit -c``.

   .. code-block:: console

      # ulimit -c unlimited

#. Set the core dump file location and pattern. For example, to set the  the ``/var/core/`` directory and the filename pattern ``core.%e.%p``, where ``%e`` represents the executable name and ``%p`` represents the process ID, run the following command.

   .. code-block:: console

      # echo "/var/core/core.%e.%p" > /proc/sys/kernel/core_pattern

   To discard core dumps, you can run ``echo "/dev/null" > /proc/sys/kernel/core_pattern``.

   .. note::

      Consider restarting relevant processes to ensure that the changes take effect.

#. **Recommended** – To preserve these changes across reboots, add the ``ulimit`` and ``echo`` commands above to a startup or system initialization script such as ``/etc/rc.local``.

macOS endpoints
---------------

On macOS, most applications have core dump generation disabled by default. However, you can enable it using the ``ulimit`` command. To enable core dump generation on macOS follow these steps.

#. Set the core dump size limit to ``unlimited`` to enable core dump generation with complete debugging information. To disable it, set it to zero by running ``ulimit -c 0``. To check the current core dump size limit, run ``ulimit -c``.

   .. code-block:: console

      # ulimit -c unlimited

#. Set the core dump generation path and filename pattern. For example, to set the ``/cores/`` directory and the filename pattern ``core.%P``, where ``%P`` is the process ID, run the following command.

   .. code-block:: console

      # sysctl -w kern.corefile=/cores/core.%P

Enabling core dump generation might consume significant disk space, so use it judiciously. Moreover, not all processes on macOS support or behave consistently with core dump generation.

Windows endpoints
-----------------

To collect user-mode crash dumps on Windows, you can use the Windows Error Reporting (WER) feature. You can set it to save crash dump files locally by editing the Windows Registry as follows.

Accessing the Windows Registry
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Press **Windows + R** keys on your keyboard to open the **Run** dialog box.

#. Type ``regedit`` in the search box and click **OK** to open the Registry editor.

#. `Backup the Windows Registry <https://support.microsoft.com/en-us/topic/how-to-back-up-and-restore-the-registry-in-windows-855140ad-e318-2a13-2829-d428a2ab0692>`__ or `create a system restore point <https://support.microsoft.com/en-us/windows/create-a-system-restore-point-77e02e2a-3298-c869-9974-ef5658ea3be9>`__ to safeguard your system.

Configuring Windows Error Reporting
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Navigate to the ``LocalDumps`` registry key or create it, as it might not exist by default.

   .. code-block:: none

      HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Windows Error Reporting\LocalDumps

#. Right-click on the ``LocalDumps`` key and choose **New** > **Key**. Name the new key ``wazuh-agent.exe``.

#. Right-click inside the ``wazuh-agent.exe`` key and choose **New** > **Expandable String Value**. Name the new value ``DumpFolder``.

#. Right-click the ``DumpFolder`` value and select **Modify**. Change it to ``%LOCALAPPDATA%\WazuhCrashDumps``.

#. Right-click inside the ``wazuh-agent.exe`` key again and choose **New** > **DWORD (32-bit) Value**. Name the new value ``DumpType``.

#. Right-click the ``DumpType`` value and select **Modify**. Change it to  ``2``.

#. Close the regedit tool and restart the Wazuh agent using PowerShell with administrator privileges.

   .. code-block:: PowerShell

      > Restart-Service -Name wazuh

