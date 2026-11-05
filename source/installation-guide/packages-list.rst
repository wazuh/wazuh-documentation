.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Find the packages required for Wazuh installation on this page. Available for Linux, macOS, and Windows.

Packages list
=============

Direct download links for the Wazuh |WAZUH_CURRENT| packages. Use them for offline or manual installations. The installation guides install the same packages from the Wazuh repository. Release candidate files carry the stage in their names, for example ``wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_amd64.deb``, but the packages inside are version ``|WAZUH_CURRENT|-|WAZUH_AGENT_PKG_REV|``, so ``dpkg -l`` and ``rpm -q`` show ``|WAZUH_CURRENT|-|WAZUH_AGENT_PKG_REV|``. Pick the table for the component, then the row for your operating system and CPU architecture. To print the architecture, run ``uname -m``, or ``dpkg --print-architecture`` on Debian and Ubuntu, which prints the ``amd64`` or ``arm64`` of the DEB rows.

Each package has a SHA512 checksum file. To verify a download, save the ``.sha512`` file in the directory of the package and run ``sha512sum -c <PACKAGE>.sha512`` (macOS: ``shasum -a 512 -c <PACKAGE>.sha512``). The output must be ``<PACKAGE>: OK``. The RPM packages are signed with the Wazuh GPG key. To check one, import the key with ``rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH``, then run ``rpm -K <PACKAGE>``. After you import the key, the output must be ``<PACKAGE>: digests signatures OK``. To check a DEB package, follow step 2 of :ref:`Preparing the packages <offline_installation_preparing_packages>` in the offline installation guide, with this key instead of ``wazuh-offline/GPG-KEY-WAZUH``. The Windows and macOS packages are code-signed by Wazuh, and the operating system checks the signature when you install them.

Wazuh indexer
-------------

.. |Indexer_x86_64_RPM| replace:: `wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_x64_RPM|.rpm.sha512>`__)
.. |Indexer_AARCH64_RPM| replace:: `wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer-|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|.|WAZUH_INDEXER_AARCH64_RPM|.rpm.sha512>`__)
.. |Indexer_AMD64_DEB| replace:: `wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-indexer/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_x64_DEB|.deb.sha512>`__)
.. |Indexer_ARM64_DEB| replace:: `wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-indexer/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-indexer_|WAZUH_CURRENT|-|WAZUH_INDEXER_CURRENT_REV|_|WAZUH_INDEXER_ARM64_DEB|.deb.sha512>`__)

+------------------------------------------------------+--------------+-----------------------+
| Distribution                                         | Architecture | Package               |
+======================================================+==============+=======================+
| Amazon Linux 2023, Red Hat Enterprise Linux 9 and 10 | x86_64       | |Indexer_x86_64_RPM|  |
|                                                      +--------------+-----------------------+
|                                                      | aarch64      | |Indexer_AARCH64_RPM| |
+------------------------------------------------------+--------------+-----------------------+
| Ubuntu 24.04 and 26.04                               | amd64        | |Indexer_AMD64_DEB|   |
|                                                      +--------------+-----------------------+
|                                                      | arm64        | |Indexer_ARM64_DEB|   |
+------------------------------------------------------+--------------+-----------------------+

Wazuh manager
-------------

.. |Amazon_x86_64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_x64_RPM|.rpm.sha512>`__)
.. |Amazon_aarch64_manager| replace:: `wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.|WAZUH_MANAGER_AARCH64_RPM|.rpm.sha512>`__)
.. |Ubuntu_x86_64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-manager/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_x64_DEB|.deb.sha512>`__)
.. |Ubuntu_aarch64_manager| replace:: `wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-manager/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-manager_|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|_|WAZUH_MANAGER_ARM64_DEB|.deb.sha512>`__)

+------------------------------------------------------+--------------+--------------------------+
| Distribution                                         | Architecture | Package                  |
+======================================================+==============+==========================+
| Amazon Linux 2023, Red Hat Enterprise Linux 9 and 10 | x86_64       | |Amazon_x86_64_manager|  |
|                                                      +--------------+--------------------------+
|                                                      | aarch64      | |Amazon_aarch64_manager| |
+------------------------------------------------------+--------------+--------------------------+
| Ubuntu 24.04 and 26.04                               | amd64        | |Ubuntu_x86_64_manager|  |
|                                                      +--------------+--------------------------+
|                                                      | arm64        | |Ubuntu_aarch64_manager| |
+------------------------------------------------------+--------------+--------------------------+

Wazuh dashboard
---------------

.. |Dashboard_x86_64_RPM| replace:: `wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_x64_RPM|.rpm.sha512>`__)
.. |Dashboard_AARCH64_RPM| replace:: `wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard-|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|.|WAZUH_DASHBOARD_AARCH64_RPM|.rpm.sha512>`__)
.. |Dashboard_AMD64_DEB| replace:: `wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-dashboard/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_x64_DEB|.deb.sha512>`__)
.. |Dashboard_ARM64_DEB| replace:: `wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-dashboard/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-dashboard_|WAZUH_CURRENT|-|WAZUH_DASHBOARD_CURRENT_REV|_|WAZUH_DASHBOARD_ARM64_DEB|.deb.sha512>`__)

+------------------------------------------------------+--------------+-------------------------+
| Distribution                                         | Architecture | Package                 |
+======================================================+==============+=========================+
| Amazon Linux 2023, Red Hat Enterprise Linux 9 and 10 | x86_64       | |Dashboard_x86_64_RPM|  |
|                                                      +--------------+-------------------------+
|                                                      | aarch64      | |Dashboard_AARCH64_RPM| |
+------------------------------------------------------+--------------+-------------------------+
| Ubuntu 24.04 and 26.04                               | amd64        | |Dashboard_AMD64_DEB|   |
|                                                      +--------------+-------------------------+
|                                                      | arm64        | |Dashboard_ARM64_DEB|   |
+------------------------------------------------------+--------------+-------------------------+

.. _wazuh_agent_packages_list:

Wazuh agent
-----------

.. _wazuh_agent_packages_list_linux:

Linux
^^^^^

.. |Amazon_x86_64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_x64_RPM|.rpm.sha512>`__)
.. |Amazon_aarch64_agent| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.|WAZUH_AGENT_AARCH64_RPM|.rpm.sha512>`__)
.. |Ubuntu_x86_64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-agent/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_x64_DEB|.deb.sha512>`__)
.. |Ubuntu_aarch64_agent| replace:: `wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/pool/main/w/wazuh-agent/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent_|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|_|WAZUH_AGENT_ARM64_DEB|.deb.sha512>`__)

One RPM package serves every RPM-based distribution, and one DEB package serves every Debian-based distribution. For the supported versions, see :doc:`Requirements </user-manual/agent/agent-enrollment/requirements>`. Pick the row for your CPU architecture. ``uname -m`` prints ``x86_64`` or ``aarch64``. On Debian and Ubuntu, ``dpkg --print-architecture`` prints ``amd64`` or ``arm64``.

+--------------+--------------+------------------------+
| Package type | Architecture | Package                |
+==============+==============+========================+
| RPM          | x86_64       | |Amazon_x86_64_agent|  |
|              +--------------+------------------------+
|              | aarch64      | |Amazon_aarch64_agent| |
+--------------+--------------+------------------------+
| DEB          | amd64        | |Ubuntu_x86_64_agent|  |
|              +--------------+------------------------+
|              | arm64        | |Ubuntu_aarch64_agent| |
+--------------+--------------+------------------------+

.. _packages_list_windows:

Windows
^^^^^^^

.. |Windows7Plus_32_64| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.msi <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/windows/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.msi>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.msi.sha512>`__)

+------------------------------------------------------------------------------------+-----------------------------------------------------+----------------------+
| Version                                                                            | Architecture                                        | Package              |
+====================================================================================+=====================================================+======================+
| See :doc:`Requirements </user-manual/agent/agent-enrollment/requirements>`         | 32-bit (i686) installer for 64-bit (x86_64) Windows | |Windows7Plus_32_64| |
+------------------------------------------------------------------------------------+-----------------------------------------------------+----------------------+

.. _packages_list_agent_macos:

macOS
^^^^^

.. |macOS_intel_64| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.intel64.pkg <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.intel64.pkg>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.intel64.pkg.sha512>`__)
.. |macOS_arm64| replace:: `wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.arm64.pkg <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/macos/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.arm64.pkg>`__ (`sha512 <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/checksums/wazuh/|WAZUH_CURRENT|/wazuh-agent-|WAZUH_CURRENT|-|WAZUH_AGENT_CURRENT_REV|.arm64.pkg.sha512>`__)

+---------------+------------------+
| Architecture  | Package          |
+===============+==================+
| Intel         | |macOS_intel_64| |
+---------------+------------------+
| Apple Silicon | |macOS_arm64|    |
+---------------+------------------+
