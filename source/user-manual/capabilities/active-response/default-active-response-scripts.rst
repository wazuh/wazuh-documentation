.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about the active response scripts included with the default Wazuh installation

Default active response scripts
================================

This section lists out-of-the-box active response scripts for the following operating systems:

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Linux, macOS, and Unix-based endpoints
--------------------------------------

The table below lists out-of-the-box active response scripts for:

-  Linux/Unix endpoints located in the Wazuh agent ``/var/ossec/active-response/bin`` directory. 
-  macOS endpoints located in the Wazuh agent ``/Library/Ossec/active-response/bin`` directory.

Click on the name of each active response to open its source code. 

.. |disable-account| replace:: `disable-account <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/disable-account.c>`__
.. |firewall-drop| replace:: `firewall-drop <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalls/default-firewall-drop.c>`__
.. |firewalld-drop| replace:: `firewalld-drop <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalld-drop.c>`__
.. |host-deny| replace:: `host-deny <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/host-deny.c>`__
.. |ip-customblock| replace:: `ip-customblock <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/ip-customblock.c>`__
.. |ipfw| replace:: `ipfw <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalls/ipfw.c>`__
.. |npf| replace:: `npf <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalls/npf.c>`__
.. |wazuh-slack| replace:: `wazuh-slack <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/wazuh-slack.c>`__
.. |pf| replace:: `pf <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalls/pf.c>`__
.. |restart.sh| replace:: `restart.sh <https://github.com/wazuh/wazuh/blob/master/src/active-response/restart.sh>`__
.. |restart-wazuh| replace:: `restart-wazuh <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/restart-wazuh.c>`__
.. |route-null| replace:: `route-null <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/route-null.c>`__
.. |kaspersky| replace:: `kaspersky <https://github.com/wazuh/wazuh/blob/master/src/active-response/kaspersky.c>`__

+---------------------------+-------------------------------------------------------------------------------------------------------------+
| Name of script            | Description                                                                                                 |
+===========================+=============================================================================================================+
| |disable-account|         | Disables a user account                                                                                     |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |firewall-drop|           | Adds an IP address to the iptables deny list.                                                               |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |firewalld-drop|          | Adds an IP address to the firewalld drop list. Requires firewalld installed on the endpoint.                |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |host-deny|               | Adds an IP address to the ``/etc/hosts.deny`` file.                                                         |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |ip-customblock|          | Custom Wazuh block, easily modifiable for a custom response.                                                |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |ipfw|                    | Firewall-drop response script created for IPFW. Requires IPFW installed on the endpoint.                    |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |npf|                     | Firewall-drop response script created for NPF. Requires NPF installed on the endpoint.                      |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |wazuh-slack|             | Posts notifications on Slack. Requires a slack hook URL passed as an ``extra_args``.                        |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |pf|                      | Firewall-drop response script created for PF. Requires PF installed on the endpoint.                        |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |restart.sh|              | Restarts the Wazuh agent or manager.                                                                        |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |restart-wazuh|           | Restarts the Wazuh agent or manager.                                                                        |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |route-null|              | Adds an IP address to a null route.                                                                         |
+---------------------------+-------------------------------------------------------------------------------------------------------------+
| |kaspersky|               | Integration of Wazuh agents with Kaspersky endpoint security. This uses Kaspersky Endpoint Security for     |
|                           | Linux CLI to execute relevant commands based on a trigger.                                                  |
+---------------------------+-------------------------------------------------------------------------------------------------------------+

Windows endpoints
-----------------

The table below lists out-of-the-box scripts for Windows endpoints, located in the Wazuh agent ``C:\Program Files (x86)\ossec-agent\active-response\bin`` directory. Click on the name of each script to see its source code.

.. |netsh.exe| replace:: `netsh.exe <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/netsh.c>`__
.. |restart-wazuh.exe| replace:: `restart-wazuh.exe <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/restart-wazuh.c>`__
.. |route-null.exe| replace:: `route-null.exe <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/route-null.c>`__

+-------------------------+---------------------------------------------------------------+
| Name of script          |                          Description                          |
+=========================+===============================================================+
| |netsh.exe|             | Blocks an IP address using ``netsh``.                         |
+-------------------------+---------------------------------------------------------------+
| |restart-wazuh.exe|     | Restarts the Wazuh agent.                                     |
+-------------------------+---------------------------------------------------------------+
| |route-null.exe|        | Adds an IP address to null route.                             |
+-------------------------+---------------------------------------------------------------+

