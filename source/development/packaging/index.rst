.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This guide describes how to generate Wazuh packages for different operating systems and platforms.

Wazuh package generation
========================

Package generation involves compiling code, bundling necessary files and dependencies that can be distributed and installed in various operating environments. This guide describes how to generate Wazuh packages for different operating systems and platforms. The Wazuh server, indexer, and dashboard components can be deployed on a virtual machine and converted into an OVA-formatted VM using an automated script. You can also individually compile the Wazuh server, indexer, and dashboard packages into DEB and RPM Linux packages.

You can generate the Wazuh agent package for Linux, macOS, and Windows operating systems. It can also be generated as a Wazuh signed package (WPK) file for Linux, macOS, and Windows operating systems, which allows for remote upgrade of the Wazuh agents.

The Wazuh package generation guide is useful for developers who need to customize the Wazuh components to suit their needs. Wazuh is open source, so the package creation process is publicly available for anyone who requires it. However, most Wazuh users do not need to build packages because the official releases provide everything needed for standard use.

.. topic:: Contents

   .. toctree::

      generate-ova
      generate-server-package
      generate-indexer-package
      generate-dashboard-package
      generate-agent-package
