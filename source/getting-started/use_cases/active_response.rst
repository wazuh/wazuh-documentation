.. Copyright (C) 2020 Wazuh, Inc.

.. _active_response:

Active response
===============

:ref:`Wazuh agent <wazuh_agent>` automates the response to threats by running actions when those are detected. Among other things, the agent can block a network connection, stop a running process, or delete a malicious file. It can also run custom scripts developed by the user (e.g. Python, Bash, or PowerShell).

In order to use this feature, users do define the conditions that will trigger the scripted actions. These conditions usually involve threat detection and assessment. For example, a user could use log analysis rules to detect an intrusion attempt, and an IP reputation database to assess the threat by looking for the source IP address of the attempted connection.

In the scenario described above, when the source IP address is recognized as malicious (low reputation), the monitored system is protected by automatically setting up a firewall rule to drop all traffic from the attacker. Depending on the active response, this firewall rule is temporary or permanent.

Below you can find the configuration used to define two scripts that are used for automated connection blocking. On Linux systems, the Wazuh agent usually integrates with the local Iptables firewall for this purpose. On Windows systems, it instead uses the null routing technique (also known as blackholing):

  .. code-block:: xml

    <command>
      <name>firewall-drop</name>
      <executable>firewall-drop.sh</executable>
      <expect>srcip</expect>
      <timeout_allowed>yes</timeout_allowed>
    </command>

  .. code-block:: xml

    <command>
      <name>win_route-null</name>
      <executable>route-null.cmd</executable>
      <expect>srcip</expect>
      <timeout_allowed>yes</timeout_allowed>
    </command>

On top of the defined commands, active responses set the conditions that need to be met to trigger them. Below is an example of configuration that would trigger the ``firewall-drop`` command when the log analysis rule ``100100`` is matched.

  .. code-block:: xml

    <active-response>
      <command>firewall-drop</command>
      <location>local</location>
      <rules_id>100100</rules_id>
      <timeout>60</timeout>
    </active-response>

In this case, rule ``100100`` is used to look for alerts where the source IP address is part of a well-known IP reputation database:

  .. code-block:: xml

    <rule id="100100" level="10">
      <if_group>web|attack|attacks</if_group>
      <list field="srcip" lookup="address_match_key">etc/lists/blacklist-alienvault</list>
      <description>IP address found in AlienVault reputation database.</description>
    </rule>

Below is a screenshot with two Wazuh alerts: the one triggered when a web attack is detected (trying to exploit a PHP server vulnerability), and the one that informs that the malicious actor has been blocked.

.. thumbnail:: ../../images/getting_started/use_case_active_response.png
   :align: center
   :wrap_image: No

More information about how does Wazuh protect systems using active response feature can be found at the :ref:`user manual <automatic_remediation>`.
