.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about the active response scripts included with the default Wazuh installation

Default active response scripts
================================

Wazuh agents ship with active response scripts for Linux, Unix, macOS, and Windows endpoints.

-  :ref:`Linux and Unix-based endpoints <active_response_default_scripts_linux_unix>`

-  :ref:`macOS endpoints <active_response_default_scripts_macos>`

-  :ref:`Windows endpoints <active_response_default_scripts_windows>`

In Wazuh 5.x, Wazuh consolidates the firewall-specific active response scripts used in Wazuh 4.x into a single ``block-ip`` executable for each supported platform.

The ``block-ip`` executable attempts to use the available firewall mechanisms in a predefined order. If a firewall method is unavailable or unsupported on the endpoint, the executable automatically proceeds to the next available method. This approach removes the need to select or configure a firewall-specific script for each endpoint.

Active responses act on finding fields, such as ``source.ip`` and ``user.name``, that can come from logs that local users or remote clients write. For example, any local user can run the ``logger`` command to write an authentication failure log for any user name, and the resulting finding carries that name in ``user.name``, which ``disable-account`` acts on. Keep monitor queries as narrow as possible, exclude trusted addresses with the ``allowlist`` option described in :ref:`Excluding IP addresses from active responses <active_response_allowlist>`, and prefer stateful active responses for ``block-ip`` and ``disable-account``, so that Wazuh reverts the action after the timeout.

.. _active_response_default_scripts_linux_unix:

Linux and Unix-based endpoints
--------------------------------

The table below lists the out-of-the-box active response scripts for Linux/Unix endpoints, located in the Wazuh agent ``/var/ossec/active-response/bin`` directory.

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

.. _active_response_default_scripts_macos:

macOS endpoints
-----------------

The table below lists the out-of-the-box active response scripts for macOS endpoints, located in the Wazuh agent ``/Library/Ossec/active-response/bin`` directory.

.. |block-ip-macos| replace:: `block-ip <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|/src/active-response/src/block-ip-macos.c>`__

+----------------------+----------------------------------------------------------------------------------------------------+
| Name of script       | Description                                                                                        |
+======================+====================================================================================================+
| |block-ip-macos|     | Blocks or unblocks an IP address. On macOS, it tries pf and then a blackhole route. It uses pf     |
|                      | only when pf is enabled and has a ``wazuh_fwtable`` table with rules that block the addresses in   |
|                      | it.                                                                                                |
+----------------------+----------------------------------------------------------------------------------------------------+
| |disable-account|    | Disables or re-enables a user account, using ``pwpolicy -disableuser``/``pwpolicy -enableuser`` on |
|                      | macOS.                                                                                             |
+----------------------+----------------------------------------------------------------------------------------------------+

.. _active_response_default_scripts_windows:

Windows endpoints
-------------------

The table below lists out-of-the-box scripts for Windows endpoints, located in the Wazuh agent ``C:\Program Files (x86)\ossec-agent\active-response\bin`` directory.

.. |block-ip-exe| replace:: `block-ip.exe <https://github.com/wazuh/wazuh/blob/v|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|/src/active-response/src/block-ip-windows.c>`__

+----------------------+----------------------------------------------------------------------------------------------------------------------------------+
| Name of script       | Description                                                                                                                      |
+======================+==================================================================================================================================+
| |block-ip-exe|       | Blocks or unblocks an IP address. It tries ``netsh advfirewall`` first, then falls back to a blackhole route if that fails.      |
+----------------------+----------------------------------------------------------------------------------------------------------------------------------+
