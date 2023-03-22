.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Active response allows the execution of scripts when an event matches certain rules in the Wazuh ruleset. Learn more about it in this section.

.. _pci_dss_active_response:

Active response
===============

Active response allows the execution of scripts whenever an event matches certain rules in your Wazuh ruleset. The actions executed could be a firewall block or drop, traffic shaping or throttling, or account lockout, among others.

The active response module helps to meet the following PCI DSS requirement:

-  **Requirement 11 - Test Security of Systems and Networks Regularly**: Vulnerabilities are being discovered continually by malicious individuals and researchers, and being introduced by new software. System components, processes, and bespoke and custom software should be tested frequently to ensure security controls continue to reflect a changing environment. 

This requirement aims to ensure that you test your systems and networks regularly. Testing allows you to detect and respond to security status and possible intrusions. With the active response module, you can respond to intrusions and unauthorized file changes. You can find more details on configuring the active response module in the :doc:`active response </user-manual/capabilities/active-response/index>` documentation section.


Use cases
---------

-  PCI DSS 11.5 requires that you detect and respond to network intrusions and unexpected file changes. You can configure scripts to run when specific actions occur to respond to these intrusions. Wazuh comes with preconfigured active response scripts. Refer to the :doc:`Default Active response scripts section </user-manual/capabilities/active-response/default-active-response-scripts>` to access these scripts.

   Using the steps below, we configure the active response module to execute an IP block when an attempt to log in with a non-existent user via SSH occurs.

   #. Configure the active response to execute the ``firewall-drop`` command when the rule for attempts to log in to a non-existent user is triggered (rule 5710) by adding the following block in the manager configuration file (``/var/ossec/etc/ossec.conf``):

      .. code-block:: xml
         :emphasize-lines: 4

         <active-response>
            <command>firewall-drop</command>
            <location>local</location>
            <rules_id>5710</rules_id>
            <timeout>100</timeout>
         </active-response>

      .. note::      
         The ``firewall-drop`` command is included in the manager configuration file by default.

   #. Restart the Wazuh manager to apply the configuration:

      .. include:: /_templates/common/restart_manager.rst

      When we attempt to SSH with a non-existent user, rule 5710 generates an alert followed by the active response getting triggered.

   .. thumbnail:: ../images/pci/rule-5710-generates-an-alert-01.png
   	:title: Attempt to login using a non-existent user and Host blocked by firewall-drop alerts
   	:align: center
   	:width: 80%

   .. thumbnail:: ../images/pci/rule-5710-generates-an-alert-02.png
   	:title: Rule 651 Host Blocked by firewall-drop Active Response
   	:align: center
   	:width: 80%

   .. thumbnail:: ../images/pci/rule-5710-generates-an-alert-03.png
   	:title: Rule 651 Host Blocked by firewall-drop Active Response
   	:align: center
   	:width: 80%

   .. thumbnail:: ../images/pci/rule-5710-generates-an-alert-04.png
   	:title: Rule 651 Host Blocked by firewall-drop Active Response
   	:align: center
   	:width: 80%

