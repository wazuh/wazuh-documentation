.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to use Wazuh log collection and analysis capabilities to meet the following PCI DSS controls. 
  
.. _pci_dss_log_analysis:

Log collector
=============

In many cases, evidence of an attack can be found in the log messages of devices, systems, and applications. The Wazuh log collector can receive logs through text files or Windows event logs. It can also directly receive logs via remote syslog which is useful for firewalls and other such devices. This log data can then be used for management and analysis to accelerate threat detection. 

The log collector module can help meet the following PCI DSS requirement:

- **Requirement 10 - Log and Monitor All Access to System Components and Cardholder Data**: This control requires that user activities, including those by employees, contractors, consultants, internal and external vendors, and other third parties are logged and monitored, and the log data stored for a specified period of time.

To achieve this, the Wazuh agent can collect logs from the endpoints it is deployed on. Logs can also be collected via Syslog for network and other syslog enabled devices. Wazuh can also hold logs of events that do not generate an alert using the archive feature and the indexer long term storage. More information on configuring log collection can be found in the documentation :doc:`here </user-manual/capabilities/log-data-collection/index>`.


Use cases
---------

PCI DSS Requirement 10.2.2 requires that audit logs record the following details for each auditable event:

   - User identification.
   - Type of event.
   - Date and time.
   - Success and failure indication.
   - Origination of event.
   - Identity or name of affected data, system component, resource, or service (for example, name and protocol).

The following are some Wazuh rules that help achieve this requirement:

- **Rule 5710**: ``sshd`` attempt to login using a non-existent user. This rule generates an alert when a non-existent user tries to log in to a system via SSH. The generated alert contains the information required by requirement 10.2.2 (user identification, type of event, date and time, success and failure indication, origination of event and identity or name of affected data, system component, resource, or service). The screenshot below shows the alert generated on the dashboard:

	.. thumbnail:: ../images/pci/attempt-to-login-using-non-existent-user.png
		:title: Attempt to login using a non-existent user
		:align: center
		:width: 100%

 
- **Rule 5715**: ``sshd`` authentication success. This rule generates an alert when a user successfully logs into a system via SSH. The generated alert contains the information required by requirement 10.2.2 (user identification, type of event, date and time, success and failure indication, origination of event and identity or name of affected data, system component, resource, or service). The screenshot below shows the alert generated on the dashboard:

	.. thumbnail:: ../images/pci/user-successfully-logs-into-a-system-via-SSH.png
		:title: User successfully logs into a system via SSH
		:align: center
		:width: 100%


- PCI DSS requirement 10.5.1 requires that audit log history is retained for at least 12 months, with at least the most recent three months immediately available for analysis. This can be achieved by enabling Wazuh log archives and configuring `index management policies <https://wazuh.com/blog/wazuh-index-management/>`_. To enable Wazuh log archives, the following steps are taken:


**Enable archives monitoring in OpenSearch**:

#. Set ``<logall_json>yes</logall_json>`` in ``/var/ossec/etc/ossec.conf``
#. Set archives: enabled to true in ``/etc/filebeat/filebeat.yml``:

    .. code-block:: console

       archives:
       enabled: trusted

#. Restart the Wazuh manager: 

    .. code-block:: console 
      
       systemctl restart wazuh-manager


#. Go to the Wazuh dashboard URL in a browser, open the menu and select “Index Management” under “OpenSearch Plugins”.

	.. thumbnail:: ../images/pci/select-index-management.png
		:title: Select Index Management
		:align: center
		:width: 100%

#. Under “Index Management”, select indices and verify that ``wazuh-archives-x.x-xxxx.xx.xx`` is present.

	.. thumbnail:: ../images/pci/select-indices.png
		:title: Select indices
		:align: center
		:width: 100%

#. Go to open the dashboard menu and select “Stack Management” under “Management”.

	.. thumbnail:: ../images/pci/select-stack-management.png
		:title: Select Stack Management
		:align: center
		:width: 100%
    
#. Choose “Index Patterns” and select “Create index pattern”. Use ``wazuh-archives-*`` as the index pattern name.

	.. thumbnail:: ../images/pci/select-create-index-pattern.png
		:title: Select Create index pattern
		:align: center
		:width: 100%
    
#. Open the menu and select “Discover” under “OpenSearch Dashboards”. Events should be getting reported there.

	.. thumbnail:: ../images/pci/select-discover-1.png
		:title: Select Discover
		:align: center
		:width: 100%
		
	.. thumbnail:: ../images/pci/select-discover-2.png
		:title: Select Discover
		:align: center
		:width: 100%
    
