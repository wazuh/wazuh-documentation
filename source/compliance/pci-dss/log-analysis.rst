.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to use Wazuh log collection and analysis capabilities to meet the following PCI DSS controls. 
  
.. _pci_dss_log_analysis:

Log data analysis
=================

In many cases, you can find evidence of an attack in the log messages of devices, systems, and applications. The Wazuh log data analysis module receives logs through text files or Windows event logs. It can also directly receive logs via remote syslog, which is useful for firewalls and other such devices.

Additionally, the log data analysis module analyzes the log data received from agents. It performs decoding and rule matching on the received data to process it. You can then use this processed log data for threat detection, prevention, and active response. 

The log collector module helps to meet the following PCI DSS requirement:

-  **Requirement 10 - Log and Monitor All Access to System Components and Cardholder Data**: This control requires that user activities, including those by employees, contractors, consultants, internal and external vendors, and other third parties are logged and monitored, and the log data stored for a specified period of time.

To help meet this requirement, the Wazuh agent collects logs from the endpoints it is deployed on. The log analysis module also receives logs via syslog for network and other syslog-enabled devices. It decodes the logs received to extract relevant information from its fields. After that, it compares the extracted information to the ruleset to look for matches. When the extracted information matches a rule, Wazuh generates an alert. Refer to the :doc:`ruleset section  </user-manual/ruleset/index>` for more information.

Wazuh also holds logs of events that don't generate an alert. For this it uses its archive feature and the indexer long term storage. For more information on configuring log collection, see the :doc:`Log data collection section </user-manual/capabilities/log-data-collection/index>`.

Use cases
---------

-  PCI DSS 10.2.2 requires that audit logs record the following details for each auditable event:

   -  User identification.
   -  Type of event.
   -  Date and time.
   -  Success and failure indication.
   -  Origination of event.
   -  Identity or name of affected data, system component, resource, or service (for example, name and protocol).

	The following are some Wazuh rules that help achieve this requirement:

   -  **Rule 5710 - sshd: attempt to login using a non-existent user**: This rule generates an alert when a non-existent user tries to log in to a system via SSH. The generated alert contains the information required by requirement 10.2.2 (user identification, type of event, date and time, success and failure indication, origination of event, and identity or name of affected data, system component, resource, or service). The screenshot below shows the alert generated on the dashboard:

  	.. thumbnail:: /images/compliance/pci/attempt-to-login-using-non-existent-user.png
  		:title: Attempt to login using a non-existent user
  		:align: center
  		:width: 80%

   
   -  **Rule 5715 - sshd: authentication success**: This rule generates an alert when a user successfully logs into a system via SSH. The generated alert contains the information required by requirement 10.2.2 (user identification, type of event, date and time, success and failure indication, origination of event, and identity or name of affected data, system component, resource, or service). The screenshot below shows the alert generated on the dashboard:

  	.. thumbnail:: /images/compliance/pci/user-successfully-logs-into-a-system-via-SSH.png
  		:title: User successfully logs into a system via SSH
  		:align: center
  		:width: 80%

-  PCI DSS 10.5.1 requires that you retain audit log history for at least 12 months, with at least the most recent three months immediately available for analysis. You can achieve this by enabling Wazuh log archives and configuring `index management policies <https://wazuh.com/blog/wazuh-index-management/>`_. To enable Wazuh log archives, take the following steps: 

	**Enable archives monitoring in the Wazuh indexer**:

	#. Set ``<logall_json>yes</logall_json>`` in ``/var/ossec/etc/ossec.conf``.

	#. Set ``archives:`` ``enabled`` to true in ``/etc/filebeat/filebeat.yml``:

		.. code-block:: console

			archives:
			enabled: true

	#. Restart Filebeat: 

		.. include:: /_templates/common/restart_filebeat.rst


	#. Restart the Wazuh manager:

		.. include:: /_templates/common/restart_manager.rst

	#. Select **☰** > **Indexer/dashboard management** > **Dashboard Management** in the Wazuh dashboard.

		.. thumbnail:: /images/compliance/pci/select-stack-management.png
			:title: Select Stack Management
			:align: center
			:width: 80%
		
	#. Choose **Index Patterns** and select **Create index pattern**. Use ``wazuh-archives-*`` as the index pattern name.

		.. thumbnail:: /images/compliance/pci/select-create-index-pattern.png
			:title: Select Create index pattern
			:align: center
			:width: 80%

		.. thumbnail:: /images/compliance/pci/define-an-index-pattern.png
			:title: Select Create index pattern
			:align: center
			:width: 80%
			
	#. Select **timestamp** as the primary time field for use with the global time filter, then proceed to create the index pattern.

		.. thumbnail:: /images/compliance/pci/configure-settings.png
			:title: Select Create index pattern
			:align: center
			:width: 80%

	#. Open the menu and select **Discover** under **Explore**. Events should be getting reported there.

		.. thumbnail:: /images/compliance/pci/select-discover-1.png
			:title: Select Discover
			:align: center
			:width: 80%
			
		.. thumbnail:: /images/compliance/pci/select-discover-2.png
			:title: Select Discover
			:align: center
			:width: 80%
		
- PCI DSS requirement 10.4.1 requires to review the following audit logs at least once daily:
  
   -  All security events.
   -  Logs of all system components that store, process, or transmit cardholder data (CHD) and/or sensitive authentication data (SAD).
   -  Logs of all critical system components.
   -  Logs of all servers and system components that perform security functions (for example, network security controls, intrusion-detection systems/intrusion-prevention systems (IDS/IPS), and authentication servers).

   This requirement ensures analyzing logs for indicators of compromise at least once daily. The following are some Wazuh rules that may help in achieving this requirement:

   -  **Rule 61138**: New Windows Service Created. The analysis engine analyzes the Windows system logs to find out if a new service was created generating an alert from this rule.

    	.. thumbnail:: /images/compliance/pci/pci-dss-requirement-10.4.1-1.png
    		:title: PCI DSS requirement 10.4.1
    		:align: center
    		:width: 80%

   -  **Rule 31168**: Shellshock attack detected. The analysis engine analyzes logs to find out about shellshock attacks from a WAF or web application generating an alert.
      
    	.. thumbnail:: /images/compliance/pci/pci-dss-requirement-10.4.1-2.png
    		:title: PCI DSS requirement 10.4.1
    		:align: center
    		:width: 80%