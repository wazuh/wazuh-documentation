.. _reference_ossec_alerts:

alerts
======

.. topic:: XML section name

	.. code-block:: xml

		<alerts>

Configure here the minimum alert levels for logging or sending alerts. You can also enable or disable the geolocation feature.

Options
-------

- `email_alert_level`_
- `log_alert_level`_
- `use_geoip`_

.. _reference_ossec_alerts_ea:

email_alert_level
^^^^^^^^^^^^^^^^^

This is the minimum severity level for an alert to generate an email notification.

.. warning::
	This is the minimum level for an alert to trigger an email.
	This overrides granular email alert levels.
	Setting this to 10 would prevent the sending of emails for alerts with levels lower than 10 even when there are settings in the granular email configuration referencing levels lower than 10.
	Individual rules can override this with the *alert_by_email* option, which forces an email alert regardless of global or granular alert level thresholds.

+--------------------+-------------------------+
| **Default Value**  | 7                       |
+--------------------+-------------------------+
| **Allowed values** | Any level from 1 to 16  |
+--------------------+-------------------------+


log_alert_level
^^^^^^^^^^^^^^^^

This is the minimum severity level for alerts to be stored to alerts.log and/or alerts.json.

+--------------------+------------------------+
| **Default Value**  | 1                      |
+--------------------+------------------------+
| **Allowed values** | Any level from 1 to 16 |
+--------------------+------------------------+


use_geoip
^^^^^^^^^

Enable or disable GeoIP lookups.

+--------------------+------------------------------------+
| **Default Value**  | no                                 |
+--------------------+------------------------------------+
| **Allowed values** | The options are **yes** or **no**. |
+--------------------+------------------------------------+
