.. Copyright (C) 2019 Wazuh, Inc.

How it works
============

.. thumbnail:: ../../../images/manual/automatic-remediation/automatic-remediation.png
  :title: Command monitoring
  :align: center
  :width: 100%


When is an active response triggered?
-------------------------------------

An **active response** is a script that is configured to execute when a specific alert, alert level or rule group has been triggered.  Active responses are either stateful or stateless responses.  Stateful responses are configured to undo the action after a specified period of time while stateless responses are configured as one-time actions.

Where are active response actions executed?
-------------------------------------------

Each active response specifies where its associated command will be executed: on the agent that triggered the alert, on the manager, on another specified agent or on all agents, which also includes the manager(s).

Active response configuration
-----------------------------

Active responses are configured in the manager by modifying the :ref:`ossec.conf <reference_ossec_conf>` file as follows:

1. Create a command

	In order to configure an active response, a **command** must be defined that will initiate a certain script in response to a trigger.

	To configure the active response, define the name of a command using the pattern below and then reference the script to be initiated. Next, define what data element(s) will be passed to the script.

	Custom scripts that have the ability to receive parameters from the command line may also be used for an **active response**.

	Example::

		<command>
		  <name>host-deny</name>
		  <executable>host-deny.sh</executable>
		  <expect>srcip</expect>
		  <timeout_allowed>yes</timeout_allowed>
		</command>

	In this example, the command is called ``host-deny`` and initiates the ``host-deny.sh`` script.  The data element is defined as ``srcip``. This command is configured to allow a timeout after a specified period of time, making it a stateful response.

	.. note::
		More information and options to create a command here: :ref:`command <reference_ossec_commands>`

2. Define the **active response**

	The active response configuration defines when and where a command is going to be executed. A command will be triggered when a specific rule with a specific id, severity level or source matches the active response criteria.  This configuration will further define where the action of the command will be initiated, meaning in which environment (agent, manager, local, or everywhere).

	Example::

		<active-response>
		  <command>host-deny</command>
		  <location>local</location>
		  <level>7</level>
		  <timeout>600</timeout>
		</active-response>

	In this example, the active response is configured to execute the command that was defined in the previous step. The *where* of the action is defined as the local host and the *when* is defined as any time the rule has a level higher than 6.  The timeout that was allowed in the command configuration is also defined in the above example.

.. note::
	More information about active response options: :ref:`Active response <reference_ossec_active_response>`


The active response log can be viewed at ``/var/ossec/logs/active-responses.log``.

Default Active response scripts
-------------------------------

Wazuh is pre-configured with the following scripts for Linux:

+--------------------------+---------------------------------------------------------------+
| Script name              |                          Description                          |
+==========================+===============================================================+
| disable-account.sh       | Disables an account by setting ``passwd-l``                   |
+--------------------------+---------------------------------------------------------------+
| firewall-drop.sh         | Adds an IP to the iptables deny list                          |
+--------------------------+---------------------------------------------------------------+
| firewalld-drop.sh        | Adds an IP to the firewalld drop list                         |
+--------------------------+---------------------------------------------------------------+
| host-deny.sh             | Adds an IP to the /etc/hosts.deny file                        |
+--------------------------+---------------------------------------------------------------+
| ip-customblock.sh        | Custom OSSEC block, easily modifiable for custom response     |
+--------------------------+---------------------------------------------------------------+
| ipfw_mac.sh              | Firewall-drop response script created for the Mac OS          |
+--------------------------+---------------------------------------------------------------+
| ipfw.sh                  | Firewall-drop response script created for ipfw                |
+--------------------------+---------------------------------------------------------------+
| npf.sh                   | Firewall-drop response script created for npf                 |
+--------------------------+---------------------------------------------------------------+
| ossec-slack.sh           | Posts modifications on Slack                                  |
+--------------------------+---------------------------------------------------------------+
| ossec-tweeter.sh         | Posts modifications on Twitter                                |
+--------------------------+---------------------------------------------------------------+
| pf.sh                    | Firewall-drop response script created for pf                  |
+--------------------------+---------------------------------------------------------------+
| restart-ossec.sh         | Automatically restarts Wazuh when ossec.conf has been changed |
+--------------------------+---------------------------------------------------------------+
| route-null.sh            | Adds an IP to null route                                      |
+--------------------------+---------------------------------------------------------------+

The following pre-configured scripts are for Windows:

+--------------------------+---------------------------------------------------------------+
| Script name              |                          Description                          |
+==========================+===============================================================+
| netsh.cmd                | Blocks an ip using netsh                                      |
+--------------------------+---------------------------------------------------------------+
| restart-ossec.cmd        | Restarts ossec agent                                          |
+--------------------------+---------------------------------------------------------------+
| route-null.cmd           | Adds an IP to null route                                      |
+--------------------------+---------------------------------------------------------------+


Create a custom script
----------------------

You can create your own scripts for active-responses in any language you consider (e.g. Python), but a bash script must lead the execution acting as a runway. This bash script is the one that will later be executed by the active-response. Also check that the agent is ready to  execute that programming language.

Parameters
^^^^^^^^^^
Active-response collects some parameters from the alert that triggered it that will be passed as arguments to the configured script. Those are:

.. code-block:: none

  <SCRIPT-NAME> <ACTION> <USER> <IP> <ALERT-ID> <RULE-ID> <AGENT> <FILENAME>


Some considerations:

* ``<SCRIPT_NAME>`` It is the name of the script to be executed.

* ``<ACTION>`` Can be either *add* or *delete*. This can be used to add/remove an IP from a blacklist just using the same script for both actions, disable/enable an account, etc. 

* ``<USER>`` Defines the username (e.g. root). Will be ``-`` if not set. This field can be used for example for denying a specific user to access a resource.

* ``<IP>`` Will be ``-`` if not set. This field can be used for example to deny requests coming from this IP after a possible brute force attack.

* ``<ALERT-ID>`` The ID of the alert that launched the AR.

* ``<RULE-ID>`` The rule ID that triggered the alert.

* ``<AGENT>`` The agent ID or hostname.

* ``<FILENAME>`` It is the source path file of the log that triggered the alert if that is the case.

These arguments give us many possibilities to customize the proper response after a rule is triggered. They are numbered from 0 to 7, so we can reference them in the bash script using ``$[0-7]``.

Configuration
^^^^^^^^^^^^^
Remember to compile the main script if it is needed. It also requires the right permissions to be executed.
	
	.. code-block:: yaml

      		chown root:ossec /var/ossec/active-response/bin/script_name.sh
		chmod ug+x /var/ossec/active-response/bin/script_name.sh

Configure ``<command>`` and ``<active-response>`` blocks, both of them at ``/var/ossec/etc/ossec.conf``.

    Example::

     <command>
       <name>block-IP</name>
       <executable>blocking_IP.sh</executable>
       <expect>srcip</expect>
       <timeout_allowed>yes</timeout_allowed>
     </command>

This will be used by ``<active-response>`` to gather information about the script that will be ran, and if it will be stateless (non-revertible) or stateful (revertible).

    Example::

     <active-response>
       <command>block-IP</command>
       <location>defined-agent</location>
       <agent_id>008</agent_id>
       <level>8</level>
       <timeout>900</timeout>
     </active-response>

This active response will be launched only in case an alert is triggered with a level equal or higher than 8, so the agent with ID 008 will execute the command, denying access to the IP given. Then, after a period of 900 seconds, the action will be undone, letting that IP access the system again. 

The field ``<timeout>`` will make the system execute the script twice, the first one to perform the action (e.g. write an IP in a blacklist file to block it) when the rule is triggered and the second one to undo it (e.g. deleting the IP from the blacklist). In this way, in case of being interested in having this timeout working, the script must be developed in such a way that its execution depends on the value of ``ACTION`` parameter. For example, an ``if`` condition could be an easy solution for that.
