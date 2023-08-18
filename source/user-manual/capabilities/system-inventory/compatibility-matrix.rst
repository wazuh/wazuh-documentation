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

.. versionadded:: 4.7.0

The Syscollector module now supports scan packages from `NPM (Node Package Manager)  <https://www.npmjs.com/>`_ and `PyPI (Python Package Index)  <https://pypi.org/>`_, **the support is only for the default paths of those packages' installation**. This enhancement requires a C++ compiler that supports the `17 standard <https://en.cppreference.com/w/cpp/compiler_support/17>`_ (GCC>=7), and it's for this reason that some Operating Systems are not supported.

The following table shows the packages that syscollector is able to detect, depending on the operating system where it is installed.

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