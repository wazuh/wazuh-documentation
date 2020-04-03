.. Copyright (C) 2019 Wazuh, Inc.

.. _fim-faq:

FAQ
===

#. `Where are all the checksums stored?`_
#. `Does Syscheck start when Wazuh starts?`_
#. `How FIM manages historical records in his database?`_
#. `Can I hot-swap monitored directories?`_
#. `How to tune audit to deal with a huge amount of who-data events at the same time.`_



Where are all the checksums stored?
-----------------------------------

The data collected by the FIM daemon is sent to Analysisd to analyze if we should send an alert. Analysisd sends a query to Wazuh-db to collect old data from that file. When we receive a response the checksum is compared with the string sent by the agent and if the checksum changes, we report an alert.

For Wazuh 3.7.0 the FIM decoder communicates with Wazuh-DB and stores all the data in an SQL database. A DB is created for each agent, which stores information related to it. On every database, we can find the ``fim_entry`` table, which contains the FIM records.

Does Syscheck start when Wazuh starts?
--------------------------------------

By default, syscheck scans when Wazuh starts, however, this behavior can be changed with the :ref:`scan_on_start option<reference_ossec_syscheck_scan_start>`

How FIM manages historical records in his database?
---------------------------------------------------

Since Wazuh 3.7.0, FIM deletes the old records from the database. Every record that is no longer monitored is cataloged as historical. The deletion of the database is done, for security reasons, after the agent has been restarted 3 times.

Can I hot-swap monitored directories?
--------------------------------------

Yes, this can be done for Linux in both agents and manager by setting the monitoring of symbolic links to directories. To set the refresh interval, use option :doc:`syscheck.symlink_scan_interval <../../reference/internal-options>`.

How to tune audit to deal with a huge amount of who-data events at the same time.
---------------------------------------------------------------------------------

It is possible to lose who-data events when a flood of events appears. The following options help the audit socket and dispatcher to deal with big amounts of events:
::

  /etc/audisp/audisp.conf  -> disp_qos = ["lossy", "lossless"]
  /etc/audit/audit.conf    -> q_dephs = [<Numerical value>]

The first one (disp_qos) controls whether you want blocking/lossless or non-blocking/lossy communication between the audit daemon and the dispatcher. There is a 128k buffer between the audit daemon and dispatcher. This is good enough for most uses. If lossy is chosen, incoming events going to the dispatcher are discarded when this queue is full. (Events are still written to disk if log_format is not nolog.) Otherwise the auditd daemon will wait for the queue to have an empty spot before logging to disk. The risk is that while the daemon is waiting for network IO, an event is not being recorded to disk.
Recommended value is lossless.

The other one (q_dephs) is a numeric value that tells how big will the internal queue of the audit event dispatcher be. A bigger queue handles flood of events better, but could hold events that are not processed when the daemon is terminated. If you get messages in syslog about events getting dropped, increase this value.
The default value is 80.

On the Wazuh side, the rt_delay variable from the internal FIM configuration can help to prevent the loss of events:
::

  /var/ossec/etc/internal_options.conf -> rt_delay = [Numerical value]

It sets a delay between real-time alerts in milliseconds. Decrease its value to process who-data events faster.
