.. _manual_remediation:

How it works
==========================

Wazuh came with some predefined active response configured, using included scripts. Those scripts are:

+--------------------------+---------------------------------------------------------------+
| Script name              |                          Description                          |
+==========================+===============================================================+
| dissable-account.sh      | dissables an account by setting ``passwd-l``                  |
+--------------------------+---------------------------------------------------------------+
| firewall-drop.sh         | adds an IP to the iptables deny list                          |
+--------------------------+---------------------------------------------------------------+
| firewalld-drop.sh        | adds an IP to  rewalld drop list                              |
+--------------------------+---------------------------------------------------------------+
| host-deny.sh             | adds an IP to the /etc/hosts.deny file                        |
+--------------------------+---------------------------------------------------------------+
| ip-customblock.sh        | Custom OSSEC block, easily modi cable for custom response     |
+--------------------------+---------------------------------------------------------------+
| ipfw_mac.sh              | Firewall-drop response script created for the Mac OS          |
+--------------------------+---------------------------------------------------------------+
| ipfw.sh                  | Firewall-drop response script created for ipfw                |
+--------------------------+---------------------------------------------------------------+
| npf.sh                   | Firewall-drop response script created for npf                 |
+--------------------------+---------------------------------------------------------------+
| ossec-slack.sh           | in order to post modifications                                |
+--------------------------+---------------------------------------------------------------+
| ossec-tweeter.sh         | in order to post modifications                                |
+--------------------------+---------------------------------------------------------------+
| pf.sh                    | Firewall-drop response script created for pf                  |
+--------------------------+---------------------------------------------------------------+
| restart-ossec.sh         | Automatically restarts Wazuh when ossec.conf has been changed |
+--------------------------+---------------------------------------------------------------+
| route-null.sh            | Adds an IP to null route                                      |
+--------------------------+---------------------------------------------------------------+

It's posible to define your own custom active response.

Active response has its own log ``/var/ossec/logs/active-response.log``

Stateful vs Stateless command
-------------------------------------

It's important to diference between both kind of commands:

- **Stateful command**: Those commands that can remove the applied active response after a certain time.
- **Stateless command**: Those commands that can not remove the changes.

Active Response Configuration
-----------------------------

Active Response is configured on :ref:`ossec.conf <reference_ossec_conf>`, we need to follow the next steps:

1. Create a command

	Scripts need a way to be referenced by the triggers to perform a particular active response. A **command** needs to be defined for this.
	Any custom script that can receive parameters from the command line can be used for Active Response.

	.. note::
		More information about all the options you can define for the :ref:`command <reference_ossec_commands>`

	Example::

		<command>
		  <name>host‐deny</name>
		  <executable>host‐deny.sh</executable>
		  <expect>srcip</expect>
		  <timeout_allowed>yes</timeout_allowed>
		</command>

	In this example, we are defining a command called ``host-deny``, that use the ``host-deny.sh`` script, that expect ``srcip`` as input, and It's configured with timeout allowed.

2. Create an active response

	Once we have a command created, we need to bind the command to one or more rules, a specific severity level or source. In the active response definition,it is declared when and where a command is going to be executed, meaning on which environment (Agent, Manager, Local, or everywhere).

	.. note::
		More information about all the options you can define for the :ref:`Active response <reference_ossec_active_response>`

	Example::

		<active‐response>
		  <command>host‐deny</command>
		  <location>local</location>
		  <level>7</level>
		  <timeout>600</timeout>
		</active‐response>

	Here, the active response is going to use the command that was defined in the previous step. It will afect only to the localhost, for triggered rules with level bigger than 6 and that after 600 seconds will be removed.
