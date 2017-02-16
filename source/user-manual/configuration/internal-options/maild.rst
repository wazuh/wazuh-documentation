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
If it is set to 1, sctrict checking is enabled.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``maild.groupping``
-------------------

If it is set to 1 alerts will be grouped together in one email.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``maild.full_subject``
----------------------

If set to 1 maild will use  full subject when sends alert emails.

.. topic:: Default value

  0

.. topic:: Allowed values

	1
		To enable
	0
		To disable


``maild.geoip``
---------------

If set to 1 mails will display GeoIP data in alert emails.

.. topic:: Default value

  1

.. topic:: Allowed values

	1
		To enable
	0
		To disable
