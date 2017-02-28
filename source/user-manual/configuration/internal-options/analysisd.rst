.. _reference_ossec_analysisd:


Analysisd
=========

+-----------------------------------+----------------+-----------------+
| Options                           | Default value  | Allowed values  |
+===================================+================+=================+
| `analysisd.default_timeframe`_    | 360            | Any integer     |
+-----------------------------------+----------------+-----------------+
| `analysisd.stats_maxdiff`_        | 999000         | Any integer     |
+-----------------------------------+----------------+-----------------+
| `analysisd.stats_mindiff`_        | 1250           | Any integer     |
+-----------------------------------+----------------+-----------------+
| `analysisd.stats_percent_diff`_   | 150            | Any integer     |
+-----------------------------------+----------------+-----------------+
| `analysisd.fts_list_size`_        | 32             | Any integer     |
+-----------------------------------+----------------+-----------------+
| `analysisd.fts_min_size_for_str`_ | 14             | Any integer     |
+-----------------------------------+----------------+-----------------+
| `analysisd.log_fw`_               | 1              | 0, 1            |
+-----------------------------------+----------------+-----------------+
| `analysisd.decoder_order_size`_   | 64             | Any integer     |
+-----------------------------------+----------------+-----------------+
| `analysisd.geoip_jsonout`_        | 0              | 0, 1            |
+-----------------------------------+----------------+-----------------+
| `analysisd.debug`_                | 0              | 0, 1, 2         |
+-----------------------------------+----------------+-----------------+


``analysisd.default_timeframe``
-------------------------------

Analysisd default rule timeframe.

.. topic:: Default value

  360

.. topic:: Allowed values

  Any integer


``analysisd.stats_maxdiff``
---------------------------

Analysisd stats maximum diff.

.. topic:: Default value

  999000

.. topic:: Allowed values

  Any integer


``analysisd.stats_mindiff``
---------------------------

Analysisd stats minimum diff.

.. topic:: Default value

  1250

.. topic:: Allowed values

  Any integer


``analysisd.stats_percent_diff``
--------------------------------

Analysisd stats percentage (how much to differ from average).

.. topic:: Default value

  150

.. topic:: Allowed values

  Any integer



``analysisd.fts_list_size``
---------------------------

Analysisd FTS list size.

.. topic:: Default value

  32

.. topic:: Allowed values

  Any integer


``analysisd.fts_min_size_for_str``
----------------------------------

Analysisd FTS minimum string size.

.. topic:: Default value

  14

.. topic:: Allowed values

  Any integer


``analysisd.log_fw``
--------------------

Analysisd Enable the firewall log (at logs/firewall/firewall.log).

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable



``analysisd.decoder_order_size``
--------------------------------

Maximum number of fields in a decoder (order tag).

.. topic:: Default value

  64

.. topic:: Allowed values

  Any integer


``analysisd.geoip_jsonout``
---------------------------

Output GeoIP data at JSON alerts.

.. topic:: Default value

  0

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``analysisd.debug``
-------------------

Debug level (in server or local installations).


.. topic:: Default value

  0

.. topic:: Allowed values

	0
		No debug output
	1
		Standard debug output
	2
		Verbose debug output
