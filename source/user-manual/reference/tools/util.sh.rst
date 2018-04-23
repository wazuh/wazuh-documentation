.. Copyright (C) 2018 Wazuh, Inc.

.. _util.sh:

util.sh
=======

The ``util.sh`` shell script can add a log file to be monitored by ossec-logcollector.  It can also add a ``full_command`` to check for changes to a website, or for changes to the nameserver of a domain.

A `blogpost <http://dcid.me/blog/2011/10/3woo-alerting-on-dns-ip-address-changes/>`_ from Daniel Cid (for 3WoO) introduced this utility.


+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **addfile <filename> [<format>]** | Add a log file to be monitored by :doc:`ossec-logtest <ossec-logtest>`                                                            |
|                                   |                                                                                                                                   |
|                                   | A local file will be added to the :ref:`ossec.conf <reference_ossec_conf>`                                                        |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **addsite <domain>**              | Monitor a website for changes.                                                                                                    |
|                                   |                                                                                                                                   |
|                                   | A ``full_command`` will be added to the :ref:`ossec.conf <reference_ossec_conf>` using lynx to dump the initial page.             |
|                                   |                                                                                                                                   |
|                                   | A rule can be written to monitor this output for changes.                                                                         |
|                                   |                                                                                                                                   |
|                                   | Requires `lynx <http://lynx.isc.org/current/>`_                                                                                   |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+
| **adddns <domain>**               | Monitor the nameserver of a domain for changes.                                                                                   |
|                                   |                                                                                                                                   |
|                                   | A ``full_command`` will be added to the :ref:`ossec.conf <reference_ossec_conf>` using the host command.                          |
+-----------------------------------+-----------------------------------------------------------------------------------------------------------------------------------+

.. note::
  ``addsite`` may not be useful on pages with dynamic content.

.. note::
  ``addns`` Requires the host command.
