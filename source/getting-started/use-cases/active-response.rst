.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out a use case about Incident Response, one of the key capabilities of the Wazuh platform. Learn more about it in this section of our documentation.

Active response
===============

:doc:`Wazuh agent <../components/wazuh-agent>` automates the response to threats by running actions when these are detected. The agent has the ability to block network connections, stop running processes, and delete malicious files, among other actions. In addition, it can also run customized scripts developed by the user (e.g., Python, Bash, or PowerShell).

To use this feature, users define the conditions that trigger the scripted actions, which usually involve threat detection and assessment. For example, a user can use log analysis rules to detect an intrusion attempt and an IP address reputation database to assess the threat by looking for the source IP address of the attempted connection.

In the scenario described above, when the source IP address is recognized as malicious (low reputation), the monitored system is protected by automatically setting up a firewall rule to drop all traffic from the attacker. Depending on the active response, this firewall rule is temporary or permanent.

On Linux systems, the Wazuh agent usually integrates with the local Iptables firewall for this purpose. On Windows systems, instead, it uses the null routing technique (also known as blackholing). Below you can find the configuration to define two scripts that are used for automated connection blocking:

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

On top of the defined commands, active responses set the conditions that need to be met to trigger them. Below is an example of a configuration that triggers the ``firewall-drop`` command when the log analysis rule ``100100`` is matched.

.. code-block:: xml

    <active-response>
      <command>firewall-drop</command>
      <location>local</location>
      <rules_id>100100</rules_id>
      <timeout>60</timeout>
    </active-response>

In this case, rule ``100100`` is used to look for alerts where the source IP address is part of a well-known IP address reputation database.

.. code-block:: xml

   <rule id="100100" level="10">
     <if_group>web|attack|attacks</if_group>
     <list field="srcip" lookup="address_match_key">etc/lists/blacklist-alienvault</list>
     <description>IP address found in AlienVault reputation database.</description>
   </rule>

Below you can find a screenshot with two Wazuh alerts: one that is triggered when a web attack is detected trying to exploit a PHP server vulnerability, and one that informs that the malicious actor has been blocked.

.. thumbnail:: /images/getting-started/active-response.png
   :title: Active response
   :alt: Active response
   :align: center
   :width: 80%
   :wrap_image: No    
    
You can find more information on how Wazuh protects systems using the active response feature in the :doc:`user manual </user-manual/capabilities/active-response/index>`.
