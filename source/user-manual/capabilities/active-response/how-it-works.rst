.. Copyright (C) 2015, Wazuh, Inc.
.. meta::
  :description: Learn more about the Active Response capability, how it works, and how to configure it in this section of the Wazuh documentation. 

How it works
============

.. thumbnail:: ../../../images/manual/automatic-remediation/automatic-remediation.png
  :title: Active response workflow 
  :align: center
  :width: 100%


When is an active response triggered?
-------------------------------------

An **active response** is a script that is configured to execute when a specific alert, alert level, or rule group has been triggered. Active responses are either stateful or stateless responses. 

- ``Stateful``. Are configured to undo the action after a specified period of time. 

- ``Stateless``.  Are configured as one-time actions without an event to revert the original effect.

Where are active response actions executed?
-------------------------------------------

Each active response specifies where its associated command will be executed: on the agent that triggered the alert, on the manager, on another specified agent, or on all agents, which also includes the manager(s). The ``location`` options are: 

- ``Local``. It runs the script on the agent that generated the alert.

- ``Server``. It runs the script on the Wazuh manager.

- ``Defined agent``. It specifies the IDs of the agents that run the script regardless of where the event has been observed.

- ``All``. Every agent in the environment will run the script. Use with caution.


Active response configuration
-----------------------------

Active responses are configured in the manager by modifying the :ref:`manager.conf <reference_manager_conf>` file as follows:

1. Create a command

	In order to configure an active response, a **command** must be defined that will initiate a certain script in response to a trigger.

	To configure the active response, define the name of a command using the pattern below and then reference the script to be initiated. 

	Example::

		<command>
		  <name>host-deny</name>
		  <executable>host-deny</executable>
		  <timeout_allowed>yes</timeout_allowed>
		</command>

	In this example, the command is called ``host-deny`` and initiates the ``host-deny`` script.  This command is configured to allow a timeout after a specified period of time, making it a stateful response.

	.. note::
		More information and options to create a command here: :ref:`command <reference_ossec_commands>`

2. Define the **active response**

	The active response configuration defines when and where a command is going to be executed. A command will be triggered when a specific rule with a specific id, severity level, or source matches the active response criteria.  This configuration will further define where the action of the command will be initiated, meaning in which environment (agent, manager, local, or everywhere).

	Example::

		<active-response>
		  <command>host-deny</command>
		  <location>local</location>
		  <level>7</level>
		  <timeout>600</timeout>
		</active-response>

	In this example, the active response is configured to execute the command that was defined in the previous step. The *where* of the action is defined as the local host and the *when* is defined as any time the rule has a level higher than 6.  The timeout that was allowed in the command configuration is also defined in the above example.

.. note::
	For more information about active response configuration, see the :ref:`Active response <reference_ossec_active_response_manager>` section.


The active response log can be viewed at ``/var/ossec/logs/active-responses.log``.

.. _active_response_scripts:

Default Active response scripts
-------------------------------

Wazuh is preconfigured with the following scripts for Linux, located at ``/var/ossec/active-response/bin``. Click each script name to see its source code.

+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| Script name                                                                                                                           |                          Description                          |
+=======================================================================================================================================+===============================================================+
| `disable-account <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/disable-account.c>`_                                    | Disables an account by setting ``passwd-l``                   |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `firewall-drop <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalls/default-firewall-drop.c>`_                      | Adds an IP to the iptables deny list                          |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `firewalld-drop <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalld-drop.c>`_                                      | Adds an IP to the firewalld drop list                         |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `host-deny <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/host-deny.c>`_                                                | Adds an IP to the /etc/hosts.deny file                        |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `ip-customblock <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/ip-customblock.c>`_                                      | Custom OSSEC block, easily modifiable for custom response     |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `ipfw <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalls/ipfw.c>`_                                                | Firewall-drop response script created for ipfw                |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `npf <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalls/npf.c>`_                                                  | Firewall-drop response script created for npf                 |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `wazuh-slack <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/wazuh-slack.c>`_                                            | Posts modifications on Slack                                  |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `pf <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/firewalls/pf.c>`_                                                    | Firewall-drop response script created for pf                  |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `restart-wazuh <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/restart-wazuh.c>`_                                        | Automatically restarts Wazuh when ossec.conf has been changed |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `route-null <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/route-null.c>`_                                              | Adds an IP address to null route                              |
+---------------------------------------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+

The following preconfigured scripts for Windows are located at ``C:\Program Files\ossec-agent\active-response\bin``. Click each script name to see its source code.

+--------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| Script name                                                                                            |                          Description                          |
+========================================================================================================+===============================================================+
| `netsh.exe <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/netsh.c>`_                     | Blocks an ip using netsh                                      |
+--------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `restart-wazuh.exe <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/restart-wazuh.c>`_     | Restarts wazuh agent                                          |
+--------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
| `route-null.exe <https://github.com/wazuh/wazuh/blob/|WAZUH_CURRENT_MINOR|/src/active-response/route-null.c>`_           | Adds an IP to null route                                      |
+--------------------------------------------------------------------------------------------------------+---------------------------------------------------------------+
