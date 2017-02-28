.. _reference_ossec_alerts:

Alerts
======

.. topic:: XML section name

	.. code-block:: xml

		<alerts>

Configure here the minimum alert levels for logging or sending alerts. You can also enable or disable the geolocation feature.

+----------------------+------------------------+
| Options              | Allowed values         |
+======================+========================+
| `email_alert_level`_ | Any level from 1 to 16 |
+----------------------+------------------------+
| `log_alert_level`_   | Any level from 1 to 16 |
+----------------------+------------------------+
| `use_geoip`_         | yes or no              |
+----------------------+------------------------+


``email_alert_level``
---------------------

This is the minimum severity level for an alert to generate an email notification.

.. warning::
	This is the minimum level for an alert to trigger an email.
	This overrides granular email alert levels.
	Setting this to 10 would prevent the sending of emails for alerts with levels lower than 10 even when there are settings in the granular email configuration referencing levels lower than 10.
	Individual rules can override this with the *alert_by_email* option, which forces an email alert regardless of global or granular alert level thresholds.


.. topic:: Default value

	.. code-block:: xml

	  <email_alert_level>7</email_alert_level>

.. topic:: Allowed values

  Any level from 1 to 16


``log_alert_level``
-------------------

This is the minimum severity level for alerts to be stored to alerts.log and/or alerts.json.  

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

  The options are **yes** or **no**.
