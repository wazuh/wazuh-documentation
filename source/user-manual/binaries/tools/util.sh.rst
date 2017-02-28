
.. _util.sh:

util.sh
=======

The ``util.sh`` shell script can add a log file to be monitored by ossec-logcollector.  It can also add a ``full_command`` to check for changes to a website, or for changes to the nameserver of a domain.

A `blogpost <http://dcid.me/blog/2011/10/3woo-alerting-on-dns-ip-address-changes/>`_ from Daniel Cid (for 3WoO) introduced this utility.

+------------+---------------------------------------------------+
| Options    | Descriptions                                      |
+============+===================================================+
| `addfile`_ | Adds a file to be monitored by ossec-logcollector |
+------------+---------------------------------------------------+
| `addsite`_ | Monitor a website for changes                     |
+------------+---------------------------------------------------+
| `adddns`_  | Monitor the name server of a domain for changes   |
+------------+---------------------------------------------------+


``addfile``
-----------

Add a log file to be monitored by :ref:`ossec-logtest`. A local file will be added to the :ref:`ossec.conf <reference_ossec_conf>`.

.. topic:: Arguments

  addfile <filename> [<format>]

``addsite``
-----------

Monitor a website for changes. A ``full_command`` will be added to the :ref:`ossec.conf <reference_ossec_conf>` using lynx to dump the initial page.

A rule can be written to monitor this output for changes.

.. note::
   Requires `lynx <http://lynx.isc.org/current/>`_.

.. warning::
   This may not be useful on pages with dynamic content.

.. topic:: Arguments

  addsite ``<domain>``


``adddns``
----------

Monitor the nameserver of a domain for changes. A ``full_command`` will be added to the :ref:`ossec.conf <reference_ossec_conf>` using the host command.

.. note::
   Requires the host command.

.. topic:: Arguments

  adddns ``<domain>``
