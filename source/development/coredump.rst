.. Copyright (C) 2024, Wazuh, Inc.

.. meta::
  :description: This section contains instructions to configure and collect coredumps for furture analisys

.. _coredumps:

HowTo configure Wazuh agent's OS to generate `coredumps`
========================================================
This section contains instructions to customize the diferent OS where Wazuh agent is installed.

Introduction
------------
A **core dump** a.k.a **crash-dump** is a snapshot of the memory of a running process. The S.O. where the Wazuh agent resides, can automatically create a core dump when a serious or unhandled error occurs. Sometimes a crash dump is useful for diagnosing a process that appears to be hanging; The memory dump may reveal information about the cause of the crash.
When collecting a core dump, be sure to collect other information about the environment so that the core file can be analyzed (for example, the agent and OS version along with any other data you consider appropriate).

Linux agent's OS
----------------
Since Linux version 2.41 onwards, a template is implemented to define the location and name of the coredumps that are generated in the system, here the reference_.
Unlike the previous versions, which, if enabled, generated the core file next to the location of the file that caused the error.

.. _reference: https://man7.org/linux/man-pages/man5/core.5.html

Using `ulimit`, without `systemd`
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Setting up core dump generation without using systemd involves configuring the operating system's core dump settings manually. Here's how you can do it on Linux systems:

1. **Identify the Target Directory for Core Dumps**:
    Choose a directory where core dump files will be generated. This directory should have sufficient disk space and appropriate permissions for the process generating core dumps to write to it.

2. **Set the Core Dump Size Limit**:
    If the current core dump size limit is insufficient, increase it using the ``ulimit`` command. For example, to set the core dump size limit to unlimited:

.. code-block:: console

    ulimit -c unlimited
..

3. **Enable Core Dump Generation**:
    Enable core dump generation by setting the ``core_pattern`` sysctl parameter to specify the core dump file pattern and location. For example, to set the core dump file pattern to ``/var/core/core.%e.%p`` (where `%e` represents the executable name and `%p` represents the process ID):

.. code-block:: console

    echo "/var/core/core.%e.%p" > /proc/sys/kernel/core_pattern
..

4. **Automate Configuration (Optional)**:
    To preserve these changes across reboots, add the ``ulimit`` command and ``echo`` command setting ``core_pattern`` to a startup script or system initialization script (e.g., ``/etc/rc.local``).

    By following these steps, you can set up core dump generation manually without relying on systemd. However, keep in mind that the process may vary slightly depending on the Linux distribution and version you are using.


To disable core dump generation  you can directly adjust system-wide settings and configurations. Here's how you can do it:

1. **Identify the Target Directory for Core Dumps**:
    If core dumps are currently being generated, identify the directory where they are stored. By default, core dumps may be stored in the current working directory or in the directory specified by the ``core_pattern`` sysctl parameter.

2. **Disable Core Dump Generation**:
    To disable core dump generation, set the core dump size limit to zero using the ``ulimit`` command:

.. code-block:: console

    ulimit -c 0
..

3. **Optional: Configure Core Dump Storage Location**:
    If core dumps were previously being stored, you may want to configure the ``core_pattern`` sysctl parameter to prevent any future core dumps from being generated. For example, you can set it to ``/dev/null`` to discard core dumps:

.. code-block:: console

    echo "/dev/null" > /proc/sys/kernel/core_pattern
..

4. **Restart Processes if Necessary**:
If you've changed the ``core_pattern`` parameter, consider restarting relevant processes to ensure that the changes take effect.

By following these steps, you can disable core dump generation without relying on systemd. This approach directly modifies system-wide settings to prevent core dumps from being generated.

Using `systemd`
^^^^^^^^^^^^^^^

To set up core dump generation using systemd, you can utilize systemd's built-in features for managing core dumps. Here's a step-by-step guide:

1. **Check Core Dump Configuration**:
    First, verify the current core dump configuration using the ``coredumpctl`` command:

.. code-block:: console

    coredumpctl status
..

2. **Identify Target Directory for Core Dumps**:
    Choose a directory where core dump files will be generated. By default, systemd stores core dump files in ``/var/lib/systemd/coredump/``.

3. **Enable Core Dump Collection**:
    Enable core dump collection by setting the ``Storage=`` option in the systemd ``coredump.conf`` file. You can set it to ``external`` to store core dumps externally, or ``none`` to disable core dump collection altogether.

.. code-block:: console

    systemctl edit systemd-coredump
..

Add the following lines to the editor that opens:

.. code-block:: console

    [Coredump]
    Storage=external
..

4. **Set Core Dump Size Limit (Optional)**:
    You can optionally set the maximum size of core dump files by adding the ``ProcessSizeMax=`` option in the ``coredump.conf`` file. For example:

.. code-block:: console

    ProcessSizeMax=2G
..

5. **Restart systemd-coredump Service**:
After making changes to the configuration, restart the systemd-coredump service for the changes to take effect:

.. code-block:: console

    systemctl restart systemd-coredump
..

By following these steps, you can set up core dump generation using systemd. This allows for centralized management and configuration of core dumps across your system.

To disable core dump generation, you can modify the configuration of the systemd-coredump service. Here's how you can do it:

1. **Edit systemd-coredump Configuration**:
    Open the systemd-coredump configuration file for editing:

.. code-block:: console

    systemctl edit systemd-coredump
..

2. **Add Configuration to Disable Core Dumps**:
    Add the following lines to the editor that opens:

.. code-block:: console

    [Coredump]
    Storage=none
..

This configuration sets the ``Storage`` option to ``none``, effectively disabling core dump storage.

3. **Restart systemd-coredump Service**:
    After making changes to the configuration, restart the systemd-coredump service for the changes to take effect:

.. code-block:: console

    systemctl restart systemd-coredump
..

4. **Verify Configuration**:
    Check the status of the systemd-coredump service to ensure it is running without errors:

.. code-block:: console

    systemctl status systemd-coredump
..

Once you've completed these steps, core dump generation will be disabled on your system. Any attempts to generate core dumps will not result in files being stored.

MacOS agent's OS
----------------
On macOS, core dump generation is disabled by default for most applications. However, you can enable core dump generation for specific processes using the ``ulimit`` command. Here's how you can enable core dump generation on macOS:

1. **Check Current Core Dump Configuration**:
    Before enabling core dump generation, check the current core dump size limit using the ``ulimit`` command:

.. code-block:: console

    ulimit -c
    sysctl kern.corefile
..

2. **Identify the Target Directory for Core Dumps**:
    On macOS, core dump files are typically stored in the current working directory of the process that crashes.

3. **Enable Core Dump Generation**:
    To enable core dump generation for a specific process, set the core dump size limit to a non-zero value using the ``ulimit`` command. For example, to set the limit to unlimited:

.. code-block:: console

    ulimit -c unlimited
    sysctl -w kern.corefile=/cores/core.%P
..

By following these steps, you can enable core dump generation for specific processes on macOS. Keep in mind that enabling core dump generation may consume additional disk space, so use it judiciously. Additionally, core dump generation may not be supported or may behave differently for all processes on macOS.

To disable coredump generation, you can ensure that core dumps are not generated by setting the core dump size limit to zero. Here's how you can disable core dump generation on macOS:

.. code-block:: console

    ulimit -c 0
..

By setting the core dump size limit to zero, you ensure that core dumps are not generated for any processes on macOS. Keep in mind that this setting affects the entire system and may impact troubleshooting capabilities in case of application crashes. If necessary, you can revert this setting by restoring the core dump size limit to its default value or a non-zero value using the `ulimit` command.
