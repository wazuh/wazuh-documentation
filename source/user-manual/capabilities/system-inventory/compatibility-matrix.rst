.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Compatibility matrix shows the scans that are compatible with various operating systems. Learn more about it in this section of the Wazuh documentation.

Compatibility matrix
====================

The Syscollector module supports different options across various operating systems that the Wazuh agent can be installed on. The following table shows the scans that are compatible with various operating systems, where '*√*' means compatible scan, '*✗*' not supported scan, and '*–*' not applicable.

+------------------------+----------------------------------------------------------------------------------+
|                        |                      **Syscollector scan**                                       |
+  **Operating System**  +-----------+-----------+-----------+----------+-----------+-----------+-----------+
|                        |  Hardware |    OS     |  Packages |  Network |   Ports   | Processes |  Hotfixes |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    Linux               |     √     |     √     |     √     |     √    |     √     |     √     |     –     |
|    Windows             |     √     |     √     |     √     |     √    |     √     |     √     |     √     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    macOS               |     √     |     √     |     √     |     √    |     √     |     √     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    FreeBSD             |     √     |     √     |     √     |     √    |     ✗     |     ✗     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    OpenBSD             |     √     |     √     |     ✗     |     √    |     ✗     |     ✗     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    Solaris             |     ✗     |     √     |     √     |     √    |     ✗     |     ✗     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+

.. versionadded:: 4.7.0

The Syscollector module now supports scan packages from `NPM (Node Package Manager)  <https://https://www.npmjs.com/>`_, `PyPI (Python Package Index)  <https://https://www.npmjs.com/>`_ and `Snap store <https://snapcraft.io/>`_ , **the support is only for the default paths of those packages' installation**.

The following table shows the new feature that are compatible with various operating systems, where '*√*' means compatible enhancement, '*✗*' not supported enhancement, and '*–*' not applicable.

+------------------------+--------------------------------+
|                        |  **Syscollector enhancement**  |
+  **Operating System**  +------+-------------+-----------+
|                        |  NPM |    PyPI     |  Snap     |
+------------------------+------+-------------+-----------+
|    Windows             |  √   |    √        |     –     |
+------------------------+------+-------------+-----------+
|    Linux               |  √   |    √        |     √     |
+------------------------+------+-------------+-----------+
|    FreeBSD             |  ✗   |    ✗        |     ✗     |
+------------------------+------+-------------+-----------+
|    OpenBSD             |  ✗   |    ✗        |     ✗     |
+------------------------+------+-------------+-----------+
|    Solaris             |  ✗   |    ✗        |     ✗     |
+------------------------+------+-------------+-----------+

This enhancement requires a C++ compiler that supports the `17 standard <https://en.cppreference.com/w/cpp/compiler_support/17>`_ (GCC>=7), and it's for this reason that some Operating Systems are not supported.