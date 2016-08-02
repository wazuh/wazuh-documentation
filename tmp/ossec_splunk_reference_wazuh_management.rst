.. _ossec_splunk_reference_wazuh_management:

Wazuh Management Reference
==========================

Reference List
--------------

* `Wazuh Management`_
    * `Agents`_
    * `Manager`_
    * `Rootcheck`_ 
    * `Syscheck`_ 

Wazuh Management
----------------

Agents
++++++

.. image:: images/splunk/wazuh-api-agent-management.png
   :align: center
   :width: 80%

* **Use case**: To perform everyday operations over agents.
* **Description**: A panel where it's possible to perform the following operations over agents:
    * List agents for a manager.
    * Get info.
    * Extract key.
    * Add new.
    * Remove.
    * Restart.
* **Anotations**: For more information see `OSSEC Wazuh RESTful API Reference -> Agents <http://documentation.wazuh.com/en/latest/ossec_api_reference.html#agents>`_.

Manager
+++++++

.. image:: images/splunk/wazuh-api-manager-management.png
   :align: center
   :width: 80%

* **Use case**: To perform everyday operations over managers.
* **Description**: A panel where it's possible to perform the following operations over managers:
    * Get configuration file (Entire or filtered by section and field).
    * Test configuration file.
    * Get status.
    * Restart.
    * Start.
    * Stop.
* **Anotations**: For more information see `OSSEC Wazuh RESTful API Reference -> Manager <http://documentation.wazuh.com/en/latest/ossec_api_reference.html#manager>`_.

Rootcheck
+++++++++

.. image:: images/splunk/wazuh-api-rootcheck-management.png
   :align: center
   :width: 80%

* **Use case**: To perform everyady operations over the rootcheck of the agents.
* **Description**: A panel where it's possible to perform the following operations over agents' rootcheck:
    * Get database.
    * Get last scan date.
    * Start scan.
    * Clear database.
* **Anotations**: For more information see `OSSEC Wazuh RESTful API Reference -> Rootcheck <http://documentation.wazuh.com/en/latest/ossec_api_reference.html#rootcheck>`_.

Syscheck
++++++++

.. image:: images/splunk/wazuh-api-syscheck-management.png
   :align: center
   :width: 80%

* **Use case**: To perform everyday operations over the syscheck of the agents.
* **Description**: A panel where it's possible to perform the following operations over agents' syscheck:
    * Get database.
    * Get changes in a file.
    * Get last scan date.
    * Start scan.
    * Clear database.
* **Anotations**: For more information see `OSSEC Wazuh RESTful API Reference -> Syscheck <http://documentation.wazuh.com/en/latest/ossec_api_reference.html#syscheck>`_.
