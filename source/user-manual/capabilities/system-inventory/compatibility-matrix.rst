.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Compatibility matrix shows the scans that are compatible with various operating systems. Learn more about it in this section of the Wazuh documentation.

Compatibility matrix
====================

The Syscollector module supports different options across various operating systems that the Wazuh agent can be installed on. The following table shows the scans that are compatible with various operating systems.

+------------------------+----------------------------------------------------------------------------------+
|                        |                      **Syscollector scan**                                       |
+  **Operating System**  +-----------+-----------+-----------+----------+-----------+-----------+-----------+
|                        |  Hardware |    OS     |  Packages |  Network |   Ports   | Processes |  Hotfixes |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    Windows             |     ✓     |     ✓     |     ✓     |     ✓    |     ✓     |     ✓     |     ✓     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    Linux               |     ✓     |     ✓     |     ✓     |     ✓    |     ✓     |     ✓     |     \-    |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    macOS               |     ✓     |     ✓     |     ✓     |     ✓    |     ✓     |     ✓     |     \-    |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    FreeBSD             |     ✓     |     ✓     |     ✓     |     ✓    |     ✗     |     ✗     |     \-    |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    OpenBSD             |     ✓     |     ✓     |     ✗     |     ✓    |     ✗     |     ✗     |     \-    |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    Solaris             |     ✗     |     ✓     |     ✓     |     ✓    |     ✗     |     ✗     |     \-    |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+

.. note::
    The '-' corresponds to a type of information that doesn't apply to that operating system.
