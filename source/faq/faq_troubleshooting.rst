.. Copyright (C) 2019 Wazuh, Inc.

.. _faq_troubleshooting:

Troubleshooting
===============

How to debug Wazuh?
-------------------

.. note:: Only read this section if you tried to troubleshoot ossec already, but didn’t have lucky solving your problem. Most of the users will never need to enable debugging, since it can significantly hurt performance.


You can also enable debugging mode on ossec to extract more data about what is going on. To do so, you will need to modify the file /var/ossec/etc/internal_options.conf (or C:\Program Files\ossec-agent\internal_options.conf on Windows) and change the debug level from the default “0” to “1” or “2”.

For example, if you wish to debug your windows agent, just change the option windows.debug from 0 to 2. Bellow is the list of a few debug options:

.. code-block:: xml

  # Debug options.
  # Debug 0 -> no debug
  # Debug 1 -> first level of debug
  # Debug 2 -> full debugging

  # Windows debug (used by the Windows agent)
  windows.debug=0

  # Syscheck (local, server and Unix agent)
  syscheck.debug=0

  # Remoted (server debug)
  remoted.debug=0

  # Analysisd (server or local)
  analysisd.debug=0

  # Auth daemon debug (server)
  authd.debug=0

  # Exec daemon debug (server, local or Unix agent)
  execd.debug=0

  # Monitor daemon debug (server, local or Unix agent)
  monitord.debug=0

  # Log collector (server, local or Unix agent)
  logcollector.debug=0




Agent event queue is full. Events may be lost
---------------------------------------------

https://documentation.wazuh.com/3.x/user-manual/capabilities/antiflooding.html


ossec-agentd: CRITICAL: (1751): File client.keys not found or empty
-------------------------------------------------------------------
Did you register the Agent against the Manager? The Agent has to be connected to a Manager in order to work. To register the Agent you may follow the steps that our documentation provide: https://documentation.wazuh.com/current/user-manual/registering/linux-unix-simple-registration.html


Agent-auth registration timeout
-------------------------------
In this case is worth to check ports, firewall and iptables.



How can i find out if an agent is in a broken state?
----------------------------------------------------
Agent's ossec-agentd.state file will let you see the current state and the latest keepalive and ack signals.
This file may be found in C:\Program Files(x86)\ossec-agent\ on Windows an /var/ossec/var/run/ on Linux agents




{"error":0,"data":[{"id":"000","name":"nanoPill","ip":"127.0.0.1","status":"Active"},{"id":"003","name":"SERV2016","ip":"192.168.75.131","status":"Disconnected"},{"id":"<na>","name":"(ssh_integrity_check_linux) vagrant@192.168.33.32","ip":"192.168.33.32","status":"agentless"},{"id":"<na>","name":"(ssh_generic_diff) vagrant@192.168.33.32","ip":"192.168.33.32","status":"agentless"}]}