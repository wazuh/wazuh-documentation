.. Copyright (C) 2021 Wazuh, Inc.

.. meta::
  :description: Learn about the variables that facilitate the deployment of the Wazuh agent on Linux, macOS, Windows and AIX operating systems.

.. _deployment_variables:

Deployment variables
====================

For an agent to be fully deployed and connected to the Wazuh server it needs to be installed, registered and configured. To make the process simple, the installers can use variables that allow the configuration provisioning.

Below you can find a table showing the different operating systems with which you can make an automatic deployment using these variables.

+---------------------------------------------------------------------+-------------------------------------------------------------+
| Type                                                                | Description                                                 |
+=====================================================================+=============================================================+
| :ref:`AIX deployment variables <deployment_variables_aix>`          | Install Wazuh agent on AIX using deployment variables.      |
+---------------------------------------------------------------------+-------------------------------------------------------------+
| :ref:`Linux deployment variables <deployment_variables_linux>`      | Install Wazuh agent on Linux using deployment variables.    |
+---------------------------------------------------------------------+-------------------------------------------------------------+
| :ref:`macOS deployment variables <deployment_variables_macos>`      | Install Wazuh agent on macOS using deployment variables.    |
+---------------------------------------------------------------------+-------------------------------------------------------------+
| :ref:`Windows deployment variables <deployment_variables_windows>`  | Install Wazuh agent on Windows using deployment variables.  |
+---------------------------------------------------------------------+-------------------------------------------------------------+


.. rst-class:: d-none

.. toctree::
    :hidden:
    :maxdepth: 2

    deployment_variables_aix
    deployment_variables_linux
    deployment_variables_macos
    deployment_variables_windows

