.. _reference_ossec_alerts:

Alerts
======

.. topic:: XML section name

	.. code-block:: xml

		<alerts>

Configure here minimum alert level for logging or sending alerts. Also enable or disabled Geolocation features.

+----------------------+------------------------+
| Options              | Allowed values         |
+======================+========================+
| `email_alert_level`_ | Any level from 1 to 16 |
+----------------------+------------------------+
| `log_alert_level`_   | Any level from 1 to 16 |
+----------------------+------------------------+
| `use_geoip`_         | yes, no                |
+----------------------+------------------------+


``email_alert_level``
---------------------

Minimum alert level to send e-mail notifications.

.. warning::
	This is the minumum level for an alert to trigger an email.
	This overrides granular email alert levels.
	Setting this to 10 would prevent emails for alerts at levels
	lower than 10 to be sent despite settings in the granular email configuration.
	Individual rules can override this with the *alert_by_email* option.


.. topic:: Default value

	.. code-block:: xml

	  <email_alert_level>7</email_alert_level>

.. topic:: Allowed values

  Any level from 1 to 16


``log_alert_level``
-------------------

Minimum alert level to store the log messages.

.. topic:: Default value

	.. code-block:: xml

		<log_alert_level>1</log_alert_level>

.. topic:: Allowed values

  Any level from 1 to 16



``use_geoip``
-------------

Enable or disable GeoIP lookups.

.. topic:: Default value

	.. code-block:: xml

	    <use_geoip>no</use_geoip>

.. topic:: Allowed values

  The options are: yes or no
