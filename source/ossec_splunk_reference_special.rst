.. _ossec_splunk_reference_special:

Special Search Commands Reference
=================================

Reference List
--------------

* `Special Search Commands`_
    * `Initialize OSSEC Server Lookup Table`_
    * `Rebuild OSSEC Server Lookup Table`_
    * `Track Expected Hosts`_   
    * `Track Last Checkin`_

Special Search Commands
-----------------------

Initialize OSSEC Server Lookup Table
++++++++++++++++++++++++++++++++++++

* **Use case**: To remove the CSV file where managers are listed, and create a new file.
* **Description**: Removes the CSV file where managers are listed, and create a new CSV that contains the entry "All OSSEC Managers". 
* **Anotations**: This command is registered as a cron task. However, it's possible to execute it manually.

Rebuild OSSEC Server Lookup Table
+++++++++++++++++++++++++++++++++

* **Use case**: To populate the CSV file where managers are listed.
* **Description**: Populates the CSV file where managers are listed, looking for managers in the events.
* **Anotations**: This command is registered as a cron task. However, it's possible to execute it manually.

Track Expected Hosts
++++++++++++++++++++

* **Use case**: To populate the CSV file where expected agents are listed.
* **Description**: Populates the CSV file where expected agents are listed, looking for agents in the events.
* **Anotations**: This command is registered as a cron task. However, it's possible to execute it manually.

Track Last Checkin
++++++++++++++++++

* **Use case**: To populate the CSV file where the time of the last event of an agent is registered.
* **Description**: Populates the CSV file where expected agents are listed with the time of the last event of each agent.
* **Anotations**: This command is registered as a cron task. However, it's possible to execute it manually.