.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about the active response scripts included with the default Wazuh installation

Default active response scripts
================================

Wazuh agents ship with active response scripts for Linux, Unix, macOS, and Windows endpoints.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

In Wazuh 5.x, Wazuh consolidates the firewall-specific active response scripts used in Wazuh 4.x into a single ``block-ip`` executable for each supported platform.

The ``block-ip`` executable attempts to use the available firewall mechanisms in a predefined order. If a firewall method is unavailable or unsupported on the endpoint, the executable automatically proceeds to the next available method. This approach removes the need to select or configure a firewall-specific script for each endpoint.

Linux and Unix-based endpoints
--------------------------------

The table below lists out-of-the-box active response scripts for:

-  Linux/Unix endpoints, located in the Wazuh agent ``/var/ossec/active-response/bin`` directory.

.. |block-ip| replace:: `block-ip <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|/src/active-response/src/block-ip-unix.c>`__
.. |disable-account| replace:: `disable-account <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|/src/active-response/src/disable-account.c>`__

+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| Name of script       | Description                                                                                                                                     |
+======================+=================================================================================================================================================+
| |block-ip|           | Blocks or unblocks an IP address. The order depends on the platform. On Linux: ``firewalld``, ``iptables`` or ``ip6tables``,                    |
|                      | ``/etc/hosts.deny``, then a null route. On FreeBSD: ``ipfw``, ``pf``, ``/etc/hosts.deny``, then a null route. On OpenBSD: ``pf``,               |
|                      | ``/etc/hosts.deny``, then a null route. On NetBSD: ``npf``, ``/etc/hosts.deny``, then a null route.                                             |
+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+
| |disable-account|    | Disables or re-enables a user account, using ``passwd -l/passwd -u`` on Linux.                                                                  |
+----------------------+-------------------------------------------------------------------------------------------------------------------------------------------------+

macOS endpoints
-----------------

The table below lists out-of-the-box active response scripts for:

-  macOS endpoints, located in the Wazuh agent ``/Library/Ossec/active-response/bin`` directory.

.. |block-ip-macos| replace:: `block-ip <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|/src/active-response/src/block-ip-macos.c>`__

+----------------------+----------------------------------------------------------------------------------------------------+
| Name of script       | Description                                                                                        |
+======================+====================================================================================================+
| |block-ip-macos|     | Blocks or unblocks an IP address. On macOS, it tries pf and then ``/etc/hosts.deny``.              |
+----------------------+----------------------------------------------------------------------------------------------------+

Windows endpoints
-------------------

The table below lists out-of-the-box scripts for Windows endpoints, located in the Wazuh agent ``C:\Program Files (x86)\ossec-agent\active-response\bin`` directory.

.. |block-ip-exe| replace:: `block-ip.exe <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|/src/active-response/src/block-ip-windows.c>`__

+----------------------+----------------------------------------------------------------------------------------------------------------------------------+
| Name of script       | Description                                                                                                                      |
+======================+==================================================================================================================================+
| |block-ip-exe|       | Blocks or unblocks an IP address. It tries ``netsh advfirewall`` first, then falls back to a blackhole route if that fails.      |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------+
