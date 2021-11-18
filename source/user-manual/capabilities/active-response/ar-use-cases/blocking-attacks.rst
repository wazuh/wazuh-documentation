.. Copyright (C) 2021 Wazuh, Inc.

.. _blocking_attacks_active_response:

Blocking attacks with Active Response
=====================================

.. meta::
  :description: Active Response allows to run commands on an agent in response to certain triggers. Learn how to block an sshd brute force attack using Wazuh.

Active response allows Wazuh to run commands on an agent in response to certain triggers. In this use case, we simulate an SSH Brute Force attack and configure an active response to block the IP address of the attacker. 

Detecting the attack
--------------------

First of all, we need to know when to execute the response. We can use one of the following options:

- Rule ID: The response will be executed on any event with the defined ID.
- Rule group: The response will be executed on any event in the defined group.
- Level: The response will be executed on any event with this level or higher.

In this use case, we want to prevent ``SSH brute force attacks`` so when the rule ``5712 - SSHD brute force trying to get access to the system`` is triggered, it will execute the proper active response to block the IP address of the attacker.

Defining the command
--------------------

We know when the active response will be executed, now we have to define what it will do. You can create your own script to block an IP, or any other action, but Wazuh comes with a set of common scripts used in active response. These scripts are in ``/var/ossec/active-response/bin/``. We are going to use the ``firewall-drop`` script that works with common Linux/Unix operating systems and it allows blocking of a malicious IP address using the local firewall.

Define the command in the ``ossec.conf`` of your Wazuh manager:

.. code-block:: none

  <command>
    <name>firewall-drop</name>
    <executable>firewall-drop</executable>
    <timeout_allowed>yes</timeout_allowed>
  </command>


Set the command name and the path of the script to execute. It's also possible to set a defined timeout to unblock the IP address.


Defining the active response
----------------------------

Configure Wazuh to run the active response. The main fields are:

- ``command``: The command previously defined (firewall-drop).
  
- ``location``: Where the command should be executed. We want to execute the command on the agent that reported the event. So, we use local.

- ``rules_id``: The command is executed if the rule 5712 is fired.

- ``timeout``: Block the IP address for 1800 seconds on the firewall (iptables, ipfilter, etc).

Define the active response in the ``ossec.conf`` of your Wazuh manager:

.. code-block:: none

  <active-response>
    <command>firewall-drop</command>
    <location>local</location>
    <rules_id>5712</rules_id>
    <timeout>1800</timeout>
  </active-response>


Restart the Wazuh manager to apply changes.

Proof of concept
----------------

We are going to simulate an SSH attack, the attack will be executed from 10.0.0.6 to our agent running on 10.0.0.5.
First, we check if there is connectivity between the attacker and the agent:

.. code-block:: none

  [ec2-user@ip-10-0-0-6 ~]$ ping 10.0.0.5
  PING 10.0.0.5 (10.0.0.5) 56(84) bytes of data.
  64 bytes from 10.0.0.5: icmp_seq=1 ttl=64 time=0.602 ms
  64 bytes from 10.0.0.5: icmp_seq=2 ttl=64 time=0.774 ms


Now, we attempt to connect to the agent by SSH several times using an invalid user:

.. code-block:: none

  $ ssh 10.0.0.5
  Permission denied (publickey).
  $ ssh 10.0.0.5
  Permission denied (publickey).
  $ ssh 10.0.0.5
  Permission denied (publickey).
  $ ssh 10.0.0.5
  Permission denied (publickey).
  $ ssh 10.0.0.5
  Permission denied (publickey).
  $ ssh 10.0.0.5
  Permission denied (publickey).
  $ ssh 10.0.0.5
  Permission denied (publickey).
  $ ssh 10.0.0.5
  Permission denied (publickey).

After 8 attempts, we can see in the manager how the rule is fired:

.. thumbnail:: ../../../../images/manual/automatic-remediation/5712_sshd_brute_force.png
  :title: Rule 5712 - SSHD brute force trying to get access to the system
  :align: center
  :width: 100%

If we try to ping the agent from the attacker, we see that it's not possible:

.. code-block:: none

  [ec2-user@ip-10-0-0-6 ~]$ ping 10.0.0.5
  PING 10.0.0.5 (10.0.0.5) 56(84) bytes of data.
  ^C
  --- 10.0.0.5 ping statistics ---
  12 packets transmitted, 0 received, 100% packet loss, time 11000ms


Active response has blocked the IP address so it is working properly.

Generating an alert when an active response is fired
----------------------------------------------------

Every agent has a log file at ``/var/ossec/logs/active-responses.log`` where the active response activities are registered. By default, this file is being monitored. 

.. code-block:: none

  <ossec_config>
    <localfile>
        <log_format>syslog</log_format>
        <location>/var/ossec/logs/active-responses.log</location>
    </localfile>
  </ossec_config>

When the active response is triggered we can see the corresponding alert: 

.. thumbnail:: ../../../../images/manual/automatic-remediation/561_host_blocked_by_firewall_drop.png
  :title: Rule 561 - host blocked by firewall drop 
  :align: center
  :width: 100%

This is possible because rule 651 is defined in ``ossec_rules.xml``. If you create your own script, you must add the proper rule.

White list
----------

We can also set a list of IP addresses that should never be blocked by the active response. In global section of ``ossec.conf`` in the Manager, use the field ``white_list``. It allows IP address or netblock.

.. code-block:: none

  <ossec_config>
    <global>
      <jsonout_output>yes</jsonout_output>
      <email_notification>no</email_notification>
      <logall>yes</logall>
      <white_list>10.0.0.6</white_list>
    </global>

Increasing blocking time for repeated offenders
-----------------------------------------------

We set up a blocking time of 30 minutes for our active response, but in case you need to increase this blocking time for repeated offenders you can add the following configuration in the ``ossec.conf`` of each agent:

.. code-block:: none

  <active-response>
    <repeated_offenders>60,120,180</repeated_offenders>
  </active-response>

The first time that the active response is triggered, it will block the IP address for 30 minutes, the second time for 60 minutes, the third time for 120 minutes, and finally the fourth time for 180 minutes.

Thanks to active response you can perform actions responding to several scenarios and restricting malicious activities and blocking attacks. Be aware any automated response has an implicit risk, so define your responses carefully.
