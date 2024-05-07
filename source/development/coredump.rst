.. Copyright (C) 2024, Wazuh, Inc.

.. meta::
   :description: This section contains instructions to configure and collect core dumps for analysis.

Configuring core dump generation
================================

A *core dump* or *crash dump* is a snapshot of a process's memory taken when a serious or unhandled error occurs. The operating system on a monitored endpoint can automatically generate core dumps. These dumps are valuable for diagnosing hanging processes. Alongside environment information such as the operating system version, they can offer insights into the cause of a crash.

Linux endpoints
---------------

In Linux version 2.41 and later, a template defines the location and name of the generated `core dump files <https://man7.org/linux/man-pages/man5/core.5.html>`__. Earlier versions generate the core dump files next to the location of the file that caused the error.

Using `systemd`
^^^^^^^^^^^^^^^

To set up core dump generation using systemd, you can utilize systemd's built-in features for managing core dumps. Here's a step-by-step guide:

#. **Check Core Dump Configuration**:
    First, verify the current core dump configuration:

    .. code-block:: console

        systemctl status systemd-coredump*

    .. code-block:: none                                                                                                                                                                                            
        :class: output                            

        ● systemd-coredump.socket - Process Core Dump Socket
             Loaded: loaded (/lib/systemd/system/systemd-coredump.socket; static)
             Active: active (listening) ...

#. **Identify Target Directory for Core Dumps**:
    Choose a directory where core dump files will be generated. By default, systemd stores core dump files in ``/var/lib/systemd/coredump/``.

    .. code-block:: console

        cat /proc/sys/kernel/core_pattern

    .. code-block:: none                                                                                                                                                                                            
        :class: output                            

        │|/lib/systemd/systemd-coredump %P %u %g %s %t                                                                                                                                                                                                                            

#. **Enable Core Dump Collection**:
    Enable core dump collection by setting the ``Storage=`` option in the systemd ``coredump.conf`` file. You can set it to ``external`` to store core dumps externally, or ``none`` to disable core dump collection altogether.

    .. code-block:: console

        systemctl edit systemd-coredump

    Add the following lines to the editor that opens:

    .. code-block:: console

        [Coredump]
        Storage=external

#. **Set Core Dump Size Limit (Optional)**:
    You can optionally set the maximum size of core dump files by adding the ``ProcessSizeMax=`` option in the ``coredump.conf`` file. For example:

    .. code-block:: console

        ProcessSizeMax=2G

#. **Restart systemd-coredump Service**:
    After making changes to the configuration, restart the systemd-coredump service for the changes to take effect:

    .. code-block:: console

        systemctl restart systemd-coredump

By following these steps, you can set up core dump generation using systemd. This allows for centralized management and configuration of core dumps across your system.

To disable core dump generation, you can modify the configuration of the systemd-coredump service. Here's how you can do it:

#. **Edit systemd-coredump Configuration**:
    Open the systemd-coredump configuration file for editing:

    .. code-block:: console

        systemctl edit systemd-coredump

#. **Add Configuration to Disable Core Dumps**:
    Add the following lines to the editor that opens:

    .. code-block:: console

        [Coredump]
        Storage=none

    This configuration sets the ``Storage`` option to ``none``, effectively disabling core dump storage.

#. **Restart systemd-coredump Service**:
    After making changes to the configuration, restart the systemd-coredump service for the changes to take effect:

    .. code-block:: console

        systemctl restart systemd-coredump

#. **Verify Configuration**:
    Check the status of the systemd-coredump service to ensure it is running without errors:

    .. code-block:: console

        systemctl status systemd-coredump

Once you've completed these steps, core dump generation will be disabled on your system. Any attempts to generate core dumps will not result in files being stored.

Manual configuration
^^^^^^^^^^^^^^^^^^^^

Setting up core dump generation without using systemd involves configuring the operating system's core dump settings manually. Here's how you can do it on Linux systems:

#. **Identify the Target Directory for Core Dumps**:
    Choose a directory where core dump files will be generated. This directory should have sufficient disk space and appropriate permissions for the process generating core dumps to write to it.

#. **Set the Core Dump Size Limit**:
    If the current core dump size limit is insufficient, increase it using the ``ulimit`` command. For example, to set the core dump size limit to unlimited:

    .. code-block:: console

        ulimit -c unlimited

#. **Enable Core Dump Generation**:
    Enable core dump generation by setting the ``core_pattern`` sysctl parameter to specify the core dump file pattern and location. For example, to set the core dump file pattern to ``/var/core/core.%e.%p`` (where `%e` represents the executable name and `%p` represents the process ID):

    .. code-block:: console

        echo "/var/core/core.%e.%p" > /proc/sys/kernel/core_pattern

#. **Automate Configuration (Optional)**:
    To preserve these changes across reboots, add the ``ulimit`` command and ``echo`` command setting ``core_pattern`` to a startup script or system initialization script (e.g., ``/etc/rc.local``).

    By following these steps, you can set up core dump generation manually without relying on systemd. However, keep in mind that the process may vary slightly depending on the Linux distribution and version you are using.


To disable core dump generation  you can directly adjust system-wide settings and configurations. Here's how you can do it:

#. **Identify the Target Directory for Core Dumps**:
    If core dumps are currently being generated, identify the directory where they are stored. By default, core dumps may be stored in the current working directory or in the directory specified by the ``core_pattern`` sysctl parameter.

#. **Disable Core Dump Generation**:
    To disable core dump generation, set the core dump size limit to zero using the ``ulimit`` command:

    .. code-block:: console

        ulimit -c 0

#. **Optional: Configure Core Dump Storage Location**:
    If core dumps were previously being stored, you may want to configure the ``core_pattern`` sysctl parameter to prevent any future core dumps from being generated. For example, you can set it to ``/dev/null`` to discard core dumps:

    .. code-block:: console

        echo "/dev/null" > /proc/sys/kernel/core_pattern

#. **Restart Processes if Necessary**:
    If you've changed the ``core_pattern`` parameter, consider restarting relevant processes to ensure that the changes take effect.

By following these steps, you can disable core dump generation without relying on systemd. This approach directly modifies system-wide settings to prevent core dumps from being generated.

MacOS agent's OS
----------------
On macOS, core dump generation is disabled by default for most applications. However, you can enable core dump generation for specific processes using the ``ulimit`` command. Here's how you can enable core dump generation on macOS:

#. **Check Current Core Dump Configuration**:
    Before enabling core dump generation, check the current core dump size limit using the ``ulimit`` command:

    .. code-block:: console

        ulimit -c
        sysctl kern.corefile

#. **Identify the Target Directory for Core Dumps**:
    On macOS, core dump files are typically stored in the current working directory of the process that crashes.

#. **Enable Core Dump Generation**:
    To enable core dump generation for a specific process, set the core dump size limit to a non-zero value using the ``ulimit`` command. For example, to set the limit to unlimited:

    .. code-block:: console

        ulimit -c unlimited
        sysctl -w kern.corefile=/cores/core.%P

By following these steps, you can enable core dump generation for specific processes on macOS. Keep in mind that enabling core dump generation may consume additional disk space, so use it judiciously. Additionally, core dump generation may not be supported or may behave differently for all processes on macOS.

To disable coredump generation, you can ensure that core dumps are not generated by setting the core dump size limit to zero. Here's how you can disable core dump generation on macOS:

    .. code-block:: console

        ulimit -c 0

By setting the core dump size limit to zero, you ensure that core dumps are not generated for any processes on macOS. Keep in mind that this setting affects the entire system and may impact troubleshooting capabilities in case of application crashes.

