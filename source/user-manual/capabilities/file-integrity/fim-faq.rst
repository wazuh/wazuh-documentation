.. Copyright (C) 2018 Wazuh, Inc.

.. _fim-faq:

FAQ
===

#. `How often does syscheck run?`_
#. `What is the CPU usage like on the agents?`_
#. `Where are all the checksums stored?`_
#. `Can I ignore files in a directory?`_
#. `Can Wazuh report changes in the content of a text file?`_
#. `How does Wazuh verify the integrity of files?`_
#. `Does Wazuh monitor any directories by default?`_
#. `Can I force an immediate syscheck scan?`_
#. `Does Syscheck start when Wazuh starts?`_
#. `Does Wazuh alert when a new file is created?`_
#. `How FIM manages historical records in his database?`_
#. `How can I migrate my old DB information into a new SQLite database?`_
#. `Can I hot-swapp monitored directories?`_

How often does syscheck run?
--------------------------------

By default, **Syscheck** runs every 12 hours, but the interval between scans can be user-defined with the :ref:`frequency <reference_ossec_syscheck_frequency>` option.

What is the CPU usage like on the agents?
-----------------------------------------

**Syscheck** scans are designed to run slowly to avoid too much CPU or memory use.

Where are all the checksums stored?
-----------------------------------

The data collected by the FIM daemon is sent to Analysisd to analyze if we should send an alert. Analysisd sends a query to Wazuh-db to collect old data from that file. When we receive a response the checksum is compared with the string sent by the agent and if the checksum changes, we report an alert.

For Wazuh 3.7.0 the FIM decoder communicates with Wazuh-DB and stores all the data in an SQL database. A DB is created for each agent, which stores information related to it. On every database, we can find the ``fim_entry`` table, which contains the FIM records.

Can I ignore files in a directory?
----------------------------------

Yes, you can use the :ref:`ignore <reference_ossec_syscheck_ignore>` option to avoid false positives. See an example of this configuration by clicking on :ref:`ignore-false-positives <how_to_fim_ignore>`

Can Wazuh report changes in the content of a text file?
-------------------------------------------------------

Yes, this is possible when monitoring directories.  Using the ``report_changes`` option gives the exact content that has been changed in text files within the directory being monitored. Be selective about which folders you use ``report_changes`` on, because this requires **syscheck** to copy every single file you want to monitor with ``report_changes`` to a private location for comparison purposes.

See an example of this configuration by clicking on :ref:`report changes <how_to_fim_report_changes>`

How does Wazuh verify the integrity of files?
---------------------------------------------

The Wazuh manager stores and looks for modifications to all the checksums and file attributes received from the agents for the monitored files. It then compares the new checksums and attributes against the stored ones, generating an alert when changes are detected.

Does Wazuh monitor any directories by default?
----------------------------------------------

Yes. By default Wazuh monitors ``/etc``, ``/usr/bin``, ``/usr/sbin``, ``/bin`` and ``/sbin`` on Unix-like systems and ``C:\Windows\System32`` on Windows systems.

Can I force an immediate syscheck scan?
---------------------------------------

Yes, you can force an agent to perform a system integrity check with:

::

  /var/ossec/bin/agent_control -r -a
  /var/ossec/bin/agent_control -r -u <agent_id>

See the :ref:`Ossec control section <ossec-control>` for more information.

Does Syscheck start when Wazuh starts?
--------------------------------------

By default, syscheck scans when Wazuh starts, however, this behavior can be changed with the :ref:`scan_on_start option<reference_ossec_syscheck_scan_start>`

Does Wazuh alert when a new file is created?
--------------------------------------------

Wazuh can send an alert when a new file is created, however, this configuration option would need to be set up by the user. Use the :ref:`alert_new_files option<reference_ossec_syscheck_alert_new_files>` for this configuration.

How FIM manages historical records in his database?
---------------------------------------------------

Since Wazuh 3.7.0, FIM deletes the old records from the database. Every record that is no longer monitored is cataloged as historical. The deletion of the database is done, for security reasons, after the agent has been restarted 3 times.

How can I migrate my old DB information into a new SQLite database?
-------------------------------------------------------------------

We provide a tool to migrate all registries to the new database. You can checkit in :ref:`fim upgrade tool <fim_migrate>` section.

Can I hot-swapp monitored directories?
--------------------------------------

Yes, this can be done in agents and managers Linux by setting the monitoring of symbolic links to directories. To set the refresh interval, use option :doc:`syscheck.symlink_scan_interval <../../reference/internal-options>`.