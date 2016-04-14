.. _ossec_splunk_reference_wazuh_dashboards:

Wazuh Dashboards Reference
==========================

Reference List
--------------

* `Wazuh Dashboards`_
    * `Wazuh Overview`_
    * `Wazuh PCI Compliance`_
    * `Wazuh File Integrity`_   
    * `Wazuh Dashboard`_

Wazuh Dashboards
----------------

Wazuh Overview
++++++++++++++

.. image:: images/splunk/wazuh-overview.png
   :align: center
   :width: 80%

* **Use case**: To have an overview of the agents and managers status, perform frequent actions and detect inusual alerts peak.
* **Description**: A dashboard with the following elements:
    * A panel with the agents' status for a manager.
    * A panel where for each agent it's possible to perform the following operations: Get info, get key, reset syscheck and remove.
    * A panel where for each agent it's possible to know the files that are being monitored, and the number of changes for each file.
    * A panel for adding new agents.
    * A panel for restarting syscheck on all the agents.
    * A panel with the manager status.
    * A panel with the rules loaded in the manager.
    * A chart displaying the alerts count by time.
* **Anotations**: To add a new agent or restart syscheck, be sure the corresponding security check is enabled.

Wazuh PCI Compliance
++++++++++++++++++++

.. image:: images/splunk/wazuh-pci-compliance.png
   :align: center
   :width: 80%

* **Use case**: To know the PCI compliance requirements for managers and agents.
* **Description**: A dashboard with the following elements:
    * A chart displaying the percent of each requirement.
    * A panel with the requirements for each agent.
    * A chart displaying the OSSEC alert groups.
    * A chart displaying the requirements by time.
    * A char displaying the OSSEC alert signatures by time.

Wazuh File Integrity
++++++++++++++++++++

.. image:: images/splunk/wazuh-file-integrity.png
   :align: center
   :width: 80%

* **Use case**: To know the last file integrity check reports.
* **Description**: A dashboard with the following elements:
    * A chart displaying the count of changes over time. It's possible to filter the chart by agent name, registry key name, file name or type of change (File or registry).
    * A chart displaying the files that have changed.
    * A panel with the ordered count of changes for files or registry keys.
    * A panel with the last file changes. It displays the file name, date of change, old checksum and the new checksum.

Wazuh Dashboard
+++++++++++++++

.. image:: images/splunk/wazuh-dashboard.png
   :align: center
   :width: 80%

* **Use case**:
* **Description**: