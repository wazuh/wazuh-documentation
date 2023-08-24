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
|    Windows             |     √     |     √     |     √     |     √    |     √     |     √     |     √     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    Linux               |     √     |     √     |     √     |     √    |     √     |     √     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    macOS               |     √     |     √     |     √     |     √    |     √     |     √     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    FreeBSD             |     √     |     √     |     √     |     √    |     ✗     |     ✗     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    OpenBSD             |     √     |     √     |     ✗     |     √    |     ✗     |     ✗     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+
|    Solaris             |     ✗     |     √     |     √     |     √    |     ✗     |     ✗     |     –     |
+------------------------+-----------+-----------+-----------+----------+-----------+-----------+-----------+

The module detects various package formats depending on the operating system. This is shown in the table below.

.. versionadded:: 4.7.0

The packages scan supports detection of `NPM (Node Package Manager)  <https://www.npmjs.com/>`__ and `PyPI (Python Package Index)  <https://pypi.org/>`__ packages in some of operating systems. The NPM and PyPI scan isn't available in all operating systems. The scan requires a C++ compiler supporting the `17 standard <https://en.cppreference.com/w/cpp/compiler_support/17>`__ (GCC>=7).

.. note::

   Support for scanning NPM and PyPI packages is limited to the default installation paths.

+------------------------+------------------------------------------------------------------------------------------------------------------+
|                        |                                        **Syscollector package scan support**                                     |
+  **Operating System**  +----------------------+-----------------+-----------------+------------------+------------------+-----------------+
|                        |        NPM           |       PyPI      |       rpm       |       deb        |       pacman     |       pkg       |
+------------------------+----------------------+-----------------+-----------------+------------------+------------------+-----------------+
|    Windows             |                  √   |        √        |        –        |        –         |        –         |        –        |
+------------------------+----------------------+-----------------+-----------------+------------------+------------------+-----------------+
|    Linux               |                  √   |        √        |        √        |        √         |        √         |        –        |
+------------------------+----------------------+-----------------+-----------------+------------------+------------------+-----------------+
|    macOS               |                  √   |        √        |        –        |        –         |        –         |        –        |
+------------------------+----------------------+-----------------+-----------------+------------------+------------------+-----------------+
|    FreeBSD             |                  √   |        √        |        –        |        –         |        –         |        √        |
+------------------------+----------------------+-----------------+-----------------+------------------+------------------+-----------------+
|    OpenBSD             |                  ✗   |        ✗        |        –        |        –         |        –         |        ✗        |
+------------------------+----------------------+-----------------+-----------------+------------------+------------------+-----------------+
|    Solaris             |                  √   |        √        |        –        |        –         |        –         |        √        |
+------------------------+----------------------+-----------------+-----------------+------------------+------------------+-----------------+