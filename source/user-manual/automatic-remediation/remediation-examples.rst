.. _remediation-examples:

Examples
========

#. `Windows automatic remediation`_
#. `Linux automatic remediation`_
#. `Block an IP with PF`_
#. `Add an IP to the iptables deny list`_
#. `Stateful command`_
#. `Stateless command`_

Windows automatic remediation
-----------------------------

Command::

  <command>
    <name>win_route-null</name>
    <executable>route-null.cmd</executable>
    <expect>srcip</expect>
    <timeout_allowed>yes</timeout_allowed>
  </command>

We allow the command to use timeout option.

Active response::

  <active‐response>
    <command>win_route‐null</command>
    <location>local</location>
    <level>8</level>
    <timeout>900</timeout>
  </active‐response>

Linux automatic remediation
---------------------------

For this example we are going to use the ``restart-ossec.sh`` script.

Command::

  <command>
    <name>restart-ossec</name>
    <executable>restart-ossec.sh</executable>
    <expect></expect>
  </command>

Active response::

  <active-response>
    <command>restart-ossec</command>
    <location>local</location>
    <rules_id>10005</rules_id>
  </active-response>

Active response will be triggered by rule with id 10005.

Block an IP with PF
-------------------

In this example we are going to use the default script ``pf.sh``

Command::

  <command>
    <name>pf-block</name>
    <executable>pf.sh</executable>
    <expect>srcip</expect>
  </command>

Active response::

  <active-response>
    <command>pf-block</command>
    <location>defined-agent</location>
    <agent_id>001</agent_id>
    <rules_group>authentication_failed,authentication_failures</rules_group>
  </active-response>

Add an IP to the iptables deny list
-----------------------------------

Using the default ``firewall-drop.sh``, configure the command and the active response:

Command::

  <command>
    <name>firewall-drop</command>
    <executable>firewall-drop.sh</executable>
    <expect>srcip</expect>
  </command>

Active response::

  <active-response>
    <command>firewall-block</command>
    <location>all</location>
    <rules_group>authentication_failed,authentication_failures</rules_group>
    <timeout>700</timeout>
    <repeated_offenders>30,60,120</repeated_offenders>
  </active-response>

Stateful command
----------------

Use the ``timeout_allowed`` option. More info: :ref:`command <reference_ossec_commands>`, his option will remove the action after a configured time.

We are going to use a defined script. ``host-deny.sh``

Command::

  <command>
    <name>host-deny</name>
    <executable>host-deny.sh</executable>
    <expect>srcip</expect>
    <timeout_allowed>yes</timeout_allowed>
  </command>

Active response::

  <active-response>
    <command>host-deny</command>
    <location>local</location>
    <level>7</level>
    <timeout>600</timeout>
  </active-response>

Active response triggered by alerts higher than 7 and action removed after 600 seconds.

Stateless command
-----------------

The action will not be removed. Example script called "mail-test.sh"

Define the command::

  <command>
    <name>mail-test</name>
    <executable>mail-test.sh</executable>
    <timeout_allowed>no</timeout_allowed>
    <expect />
  </command>

Timeout_allowed configured to "no", so the action will not be removed.

Define the active response::

  <active-response>
      <command>mail-test</command>
      <location>server</location>
      <rules_id>1002</rules_id>
   </active-response>
