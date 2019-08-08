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
