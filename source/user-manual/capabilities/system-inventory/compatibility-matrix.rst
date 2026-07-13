.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Compatibility matrix shows the scans that are compatible with various operating systems. Learn more about it in this section of the Wazuh documentation.

Compatibility matrix
====================

The Wazuh Syscollector module supports different options across the operating systems on which the Wazuh agent can be installed. The following table shows the scans that are compatible with each of these operating systems.

+------------------+----------+-----+----------+---------+-------+-----------+----------+-------+--------+----------+--------------------+
| Operating System | Hardware | OS  | Packages | Network | Ports | Processes | Hotfixes | Users | Groups | Services | Browser extensions |
+==================+==========+=====+==========+=========+=======+===========+==========+=======+========+==========+====================+
| Windows          | Yes      | Yes | Yes      | Yes     | Yes   | Yes       | Yes      | Yes   | Yes    | Yes      | Yes                |
+------------------+----------+-----+----------+---------+-------+-----------+----------+-------+--------+----------+--------------------+
| Linux            | Yes      | Yes | Yes      | Yes     | Yes   | Yes       | No       | Yes   | Yes    | Yes      | Yes                |
+------------------+----------+-----+----------+---------+-------+-----------+----------+-------+--------+----------+--------------------+
| macOS            | Yes      | Yes | Yes      | Yes     | Yes   | Yes       | No       | Yes   | Yes    | Yes      | Yes                |
+------------------+----------+-----+----------+---------+-------+-----------+----------+-------+--------+----------+--------------------+
| FreeBSD          | Yes      | Yes | Yes      | Yes     | No    | No        | No       | No    | No     | No       | No                 |
+------------------+----------+-----+----------+---------+-------+-----------+----------+-------+--------+----------+--------------------+
| OpenBSD          | Yes      | Yes | No       | Yes     | No    | No        | No       | No    | No     | No       | No                 |
+------------------+----------+-----+----------+---------+-------+-----------+----------+-------+--------+----------+--------------------+

The module detects multiple package formats depending on the operating system. The packages scan supports detection of `NPM (Node Package Manager) <https://www.npmjs.com/>`__ and `PyPI (Python Package Index) <https://pypi.org/>`__ packages on multiple operating systems, as the table below shows. The NPM and PyPI scan requires a C++ compiler supporting the `C++17 standard <https://en.cppreference.com/w/cpp/compiler_support/17>`__ (GCC 7 or later).

.. note::

   Support for scanning NPM and PyPI packages is limited to the default installation paths.

+------------------+-----+------+-----+-----+--------+-----+
| Operating System | NPM | PyPI | rpm | deb | pacman | pkg |
+==================+=====+======+=====+=====+========+=====+
| Windows          | Yes | Yes  | No  | No  | No     | No  |
+------------------+-----+------+-----+-----+--------+-----+
| Linux            | Yes | Yes  | Yes | Yes | Yes    | No  |
+------------------+-----+------+-----+-----+--------+-----+
| macOS            | Yes | Yes  | No  | No  | No     | No  |
+------------------+-----+------+-----+-----+--------+-----+
| FreeBSD          | Yes | Yes  | No  | No  | No     | Yes |
+------------------+-----+------+-----+-----+--------+-----+
| OpenBSD          | No  | No   | No  | No  | No     | No  |
+------------------+-----+------+-----+-----+--------+-----+
| Solaris          | Yes | Yes  | No  | No  | No     | Yes |
+------------------+-----+------+-----+-----+--------+-----+
