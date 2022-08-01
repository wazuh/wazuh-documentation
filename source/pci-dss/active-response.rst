.. Copyright (C) 2015, Wazuh, Inc.

.. _pci_dss_active_response:

Active response
===============

Active response allows the execution of scripts whenever an event matches certain rules in your Wazuh ruleset. The actions executed could be a firewall block or drop, traffic shaping or throttling, account lockout, etc.

The active response module can help meet the following PCI DSS requirement:

- **Requirement 11 - Test Security of Systems and Networks Regularly**: Vulnerabilities are being discovered continually by malicious individuals and researchers, and being introduced by new software. System components, processes, and bespoke and custom software should be tested frequently to ensure security controls continue to reflect a changing environment. 

   The goal of this requirement is to ensure that systems and networks are regularly tested to confirm their security status and possible intrusions are detected and responded to. Response to intrusions and unauthorized file changes can be achieved with the active response module. More details on configuring the active response module can be found in the :doc:`active response </user-manual/capabilities/active-response/index>` documentation section.


Use cases
---------

PCI DSS 11.5 requires that network intrusions and unexpected file changes are detected and responded to. These intrusions can be responded to by configuring scripts to execute when certain actions occur. Wazuh comes with some preconfigured active response scripts. These scripts can be found :ref:`here <active_response_scripts>`.

In the example below, we configure the active response module to execute an IP block when an attempt to log in with a non-existent user via SSH occurs.

First, we configure the active response executable to be run (in this case it is firewall-drop) by adding the following block in the agent configuration file (ossec.conf):

   .. code-block:: xml

      <command>
         <name>firewall-drop</name>
         <executable>firewall-drop</executable>
         <timeout_allowed>yes</timeout_allowed>
      </command>

The active response is subsequently configured to execute the firewall drop command when the rule for attempts to log in to a non-existent user is triggered (rule 5710):

   .. code-block:: xml

      <active-response>
         <command>firewall-drop</command>
         <location>local</location>
         <rules_id>5710</rules_id>
         <timeout>100</timeout>
      </active-response>

When we attempt to SSH with a non-existent user, rule 5710 generates an alert followed by the active response getting triggered.

	.. thumbnail:: ../images/pci/rule-5710 generates-an-alert-01.png
		:title: Rule 5710 generates an alert
		:align: center
		:width: 100%

	.. thumbnail:: ../images/pci/rule-5710 generates-an-alert-02.png
		:title: Rule 5710 generates an alert
		:align: center
		:width: 100%

	.. thumbnail:: ../images/pci/rule-5710 generates-an-alert-03.png
		:title: Rule 5710 generates an alert
		:align: center
		:width: 100%

	.. thumbnail:: ../images/pci/rule-5710 generates-an-alert-04.png
		:title: Rule 5710 generates an alert
		:align: center
		:width: 100%

