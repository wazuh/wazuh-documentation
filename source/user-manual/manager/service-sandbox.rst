.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how the wazuh-manager systemd unit sandboxes the Wazuh manager daemons, which directories they can write, and how it affects your deployment.

Wazuh manager service sandbox
=============================

The ``wazuh-manager`` systemd unit confines every Wazuh manager daemon it starts. The sandbox limits the files and resources a compromised daemon can access or modify on the host. No daemon runs in a chroot. Each daemon starts as root, then drops privileges to the ``wazuh-manager`` user. It retains ``/`` as its root directory and uses ``/var/wazuh-manager`` as its working directory.

The package installs the unit at ``/usr/lib/systemd/system/wazuh-manager.service``. These protections apply only when you start the Wazuh manager through this unit, for example, with ``systemctl start wazuh-manager``.

Writable directories
--------------------

The unit makes operating system directories read-only while keeping the two Wazuh manager directories writable.

The daemons write data and configuration files to these directories:

-  ``/var/wazuh-manager``, the installation directory.
-  ``/etc/wazuh-manager``, the configuration directory.

The unit mounts ``/usr``, ``/boot``, ``/efi``, and the rest of ``/etc`` as read-only. Attempts to write to these locations fail with a read-only file system error (``EROFS``). The unit also hides ``/home``, ``/root``, and ``/run/user``.

Other directories, such as ``/var`` and ``/opt``, retain their normal file permissions. The daemons access them as the unprivileged ``wazuh-manager`` user.

When the Wazuh indexer runs on the same endpoint, the credential resolver (``wazuh-manager-resolve-credentials``) reads files from ``/etc/wazuh-indexer/export/``. However, it cannot write to this directory.

Protections
-----------

Each unit setting removes access that Wazuh manager daemons do not need. Together, these settings limit the actions a compromised daemon can perform on the host.

+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| Setting                                                               | Effect                                                                 |
+=======================================================================+========================================================================+
| ``ProtectSystem=full``                                                | Mounts ``/usr``, ``/boot``, ``/efi``, and ``/etc`` read-only. Other    |
|                                                                       | directories, such as ``/var`` and ``/opt``, keep their usual           |
|                                                                       | permissions.                                                           |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``ReadWritePaths``                                                    | Keeps ``/var/wazuh-manager`` and ``/etc/wazuh-manager`` writable.      |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``PrivateTmp=yes``                                                    | Gives the daemons their own ``/tmp`` and ``/var/tmp`` directories,     |
|                                                                       | separate from the host's.                                              |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``ProtectHome=yes``                                                   | Hides ``/home``, ``/root``, and ``/run/user``.                         |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``ProtectKernelTunables=yes``, ``ProtectKernelModules=yes``,          | Prevent changes to kernel settings, loading kernel modules, and        |
| ``ProtectKernelLogs=yes``                                             | reading the kernel log.                                                |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``ProtectControlGroups=yes``                                          | Makes the control group hierarchy read-only.                           |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``ProtectClock=yes``, ``ProtectHostname=yes``                         | Prevent changes to the system clock and the host name.                 |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``LockPersonality=yes``, ``RestrictRealtime=yes``,                    | Prevent changes to the execution domain, the use of realtime           |
| ``RestrictNamespaces=yes``                                            | scheduling, and access to namespaces.                                  |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``CapabilityBoundingSet``                                             | Limits the root phase of the start, and                                |
|                                                                       | ``wazuh-manager-service-control``, to the capabilities the Wazuh       |
|                                                                       | manager needs: ``CAP_CHOWN``, ``CAP_FOWNER``, ``CAP_DAC_OVERRIDE``,    |
|                                                                       | ``CAP_DAC_READ_SEARCH``, ``CAP_SETUID``, ``CAP_SETGID``, ``CAP_KILL``, |
|                                                                       | and ``CAP_NET_BIND_SERVICE``.                                          |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``SystemCallArchitectures=native``                                    | Allows only system calls of the host's native architecture.            |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+
| ``SystemCallFilter=@system-service``, ``SystemCallErrorNumber=EPERM`` | Allows only the system calls of a typical service. A call outside this |
|                                                                       | set returns ``EPERM`` to the daemon. Without                           |
|                                                                       | ``SystemCallErrorNumber``, the kernel stops the process with           |
|                                                                       | ``SIGSYS``.                                                            |
+-----------------------------------------------------------------------+------------------------------------------------------------------------+

The unit does not enable ``NoNewPrivileges`` because the Wazuh manager API uses ``wazuh-manager-service-control``, a setuid-root program, to restart and reload the Wazuh manager.

Effects on your deployment
--------------------------

The sandbox determines where you can install the Wazuh manager, where its daemons can write files, and how long startup can take.

-  **Installation directory**: A Wazuh manager installed under ``/home``, ``/root``, ``/run/user``, ``/tmp``, or ``/var/tmp`` cannot run under the unit. Install it in a directory accessible to the unit, such as the default ``/var/wazuh-manager``.
-  **Files outside writable directories**: The Wazuh manager cannot write to ``/usr``, ``/boot``, ``/efi``, or the rest of ``/etc``. Keep files that the Wazuh manager needs to modify, such as configuration files, certificates, and logs, in ``/var/wazuh-manager`` or ``/etc/wazuh-manager``.
-  **Temporary files**: Files that daemons write to ``/tmp`` or ``/var/tmp`` are not visible in the host's corresponding directories. The ``wazuh-manager-db`` daemon stores its SQLite temporary files in ``/var/wazuh-manager/tmp``.
-  **Startup time**: Startup can take up to approximately 130 seconds while ``wazuh-manager-control`` waits for the Wazuh normalization engine to become ready. The unit allows up to 180 seconds (``TimeoutStartSec=180``) before reporting a timeout.

