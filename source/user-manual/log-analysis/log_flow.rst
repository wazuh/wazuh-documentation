.. _log_flow:

Log Flow
===============================

Wazuh can log everything that is received by remote syslog and store it permanently. The memory and CPU usage of the agent is insignificant because it only forwards events to the manager, however on the master CPU and memory consumption can increase quickly depending on the events per second (EPS) that the master has to analyse.

This diagram is a basic ilustration of the log flow, It will help you to understand how it works.

.. image:: ../images/manual/log_analysis/log_flow.png
    :align: center
    :width: 100%

Wazuh Agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- **Collector** recopile all the logs from the server. The logs monitored logs are user defined.

Wazuh Manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Inside the manager, three phases can be distinguished:

- **Decode**, that extracts known fields from the log message, identifies key information (SRC IP, username...).
- **Analyze** Next step is to check if any of the rules that are internally stored, matches.
- **Alert** Once the rule is matched, the manager will create an alert.

*Log Example*
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

pam/ squid /apache log sample::

  2016-03-15T15:22:10.078830+01:00 tron su:pam_unix(su-l:auth):authentication failure;logname=tm uid=500 euid=0 tty=pts/0 ruser=tm rhost= user=root

  1265939281.764 1 172.16.167.228 TCP_DENIED /403 734 POST http://lbcore1.metacafe.com/test/SystemInfoManager.php - NONE/- text/html

  [Sun Mar 06 08:52:16 2016] [error] [client 187.172.181.57] Invalid URI in request GET: index.php HTTP/1.0



.. note::
    More information about `Wazuh Ruleset <ruleset>`
