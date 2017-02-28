.. _reference_ossec_maild:


Maild
=====

+--------------------------+----------------+----------------+
| Options                  | Default value  | Allowed values |
+==========================+================+================+
| `maild.strict_checking`_ | 1              | 0, 1           |
+--------------------------+----------------+----------------+
| `maild.groupping`_       | 1              | 0, 1           |
+--------------------------+----------------+----------------+
| `maild.full_subject`_    | 0              | 0, 1           |
+--------------------------+----------------+----------------+
| `maild.geoip`_           | 1              | 0, 1           |
+--------------------------+----------------+----------------+


``maild.strict_checking``
-------------------------
Toggle to enable or disable strict checking.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``maild.groupping``
-------------------

Toggle to enable or disable grouping of alerts into a single email.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``maild.full_subject``
----------------------

Toggle to enable or disable full subject in alert emails.

.. topic:: Default value

  0

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``maild.geoip``
---------------

Toggle to enable or disable GeoIP data in alert emails.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable
