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

#. Add the following lines in the editor that opens to enable core dump collection and store core dumps externally. To disable core dump generation you must set ``Storage=none``.

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

#. To check the generated core dump files, take a look at the default ``/var/lib/systemd/coredump/`` directory. To find the filename pattern for these files, run the following command.

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

MacOS endpoints
---------------
On macOS, most applications have core dump generation disabled by default. However, you can enable it using the ``ulimit`` command. To enable core dump generation on macOS follow these steps.

#. Set the core dump size limit to ``unlimited`` to enable core dump generation with complete debugging information. To disable it, set it to zero by running ``ulimit -c 0``. To check the current core dump size limit, run ``ulimit -c``.

    .. code-block:: console

        # ulimit -c unlimited

#. Set the core dump generation path and filename pattern. For example, to set the ``/cores/`` directory and the filename pattern ``core.%P``, where ``%P`` is the process ID, run the following command.

    .. code-block:: console

        # sysctl -w kern.corefile=/cores/core.%P

By following these steps, you can enable core dump generation on macOS. Keep in mind that enabling core dump generation may consume additional disk space, so use it judiciously. Additionally, core dump generation may not be supported or may behave differently for all processes on macOS.
