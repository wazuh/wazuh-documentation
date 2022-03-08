.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Check out a use case about Active Response, one of the key capabilities of the Wazuh platform. Learn more about it in this section of our documentation. 
  
.. _active_response:

Active response
===============

:ref:`Wazuh agent <wazuh_agent>` automates the response to threats by running actions when they are detected. The agent has the ability to block network connections, stop running processes or delete malicious files, among other actions. In addition, it can also run customized scripts developed by the user (for example, Python, Bash or PowerShell).

In order to use this feature, users define the conditions that will trigger the scripted actions, which usually involve threat detection and assessment. For example, a user could use log analysis rules to detect an intrusion attempt, and an IP address reputation database to assess the threat by looking for the source IP address of the attempted connection.

In the scenario described above, when the source IP address is recognized as malicious (low reputation), the monitored system is protected by automatically setting up a firewall rule to drop all traffic from the attacker. Depending on the active response, this firewall rule is temporary or permanent.

Below you can find the configuration used to define two scripts that are used for automated connection blocking. On Linux systems, the Wazuh agent usually integrates with the local Iptables firewall for this purpose. On Windows systems, instead, it uses the null routing technique (also known as blackholing):

  .. code-block:: xml

    <command>
      <name>firewall-drop</name>
      <executable>firewall-drop</executable>
      <timeout_allowed>yes</timeout_allowed>
    </command>

  .. code-block:: xml

    <command>
      <name>win_route-null</name>
      <executable>route-null.exe</executable>
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

In this case, rule ``100100`` is used to look for alerts where the source IP address is part of a well-known IP address reputation database:

  .. code-block:: xml

    <rule id="100100" level="10">
      <if_group>web|attack|attacks</if_group>
      <list field="srcip" lookup="address_match_key">etc/lists/blacklist-alienvault</list>
      <description>IP address found in AlienVault reputation database.</description>
    </rule>

Below is a screenshot with two Wazuh alerts: the one triggered when a web attack is detected (trying to exploit a PHP server vulnerability), and the one that informs that the malicious actor has been blocked.

.. thumbnail:: ../../images/getting-started/use-case-active-response.png
   :align: center
   :wrap_image: No

More information on how Wazuh protects systems using the active response feature can be found in the :ref:`user manual <automatic_remediation>`.
