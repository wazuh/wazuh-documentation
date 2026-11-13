.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Compatibility matrix shows the scans that are compatible with various operating systems. Learn more about it in this section of the Wazuh documentation.

Compatibility matrix
====================

The Wazuh Syscollector module supports different options across the operating systems on which the Wazuh agent can be installed. The following table shows the scans that are compatible with each of these operating systems.

.. table:: Scan support per operating system
   :widths: auto

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

The module detects multiple package formats depending on the operating system. The packages scan supports detection of `NPM (Node Package Manager) <https://www.npmjs.com/>`__ and `PyPI (Python Package Index) <https://pypi.org/>`__ packages on multiple operating systems, as the table below shows.

.. note::

   Support for scanning NPM and PyPI packages is limited to the default installation paths.

.. table:: Package format support per operating system
   :widths: auto

   +------------------+-----+------+-----+-----+--------+-----+------+
   | Operating System | NPM | PyPI | rpm | deb | pacman | pkg | snap |
   +==================+=====+======+=====+=====+========+=====+======+
   | Windows          | Yes | Yes  | No  | No  | No     | No  | No   |
   +------------------+-----+------+-----+-----+--------+-----+------+
   | Linux            | Yes | Yes  | Yes | Yes | No     | No  | Yes  |
   +------------------+-----+------+-----+-----+--------+-----+------+
   | macOS            | Yes | Yes  | No  | No  | No     | No  | No   |
   +------------------+-----+------+-----+-----+--------+-----+------+
   | FreeBSD          | No  | No   | No  | No  | No     | Yes | No   |
   +------------------+-----+------+-----+-----+--------+-----+------+
   | OpenBSD          | No  | No   | No  | No  | No     | No  | No   |
   +------------------+-----+------+-----+-----+--------+-----+------+
