.. _reference_ossec_conf_alerts:

alerts
================

Text

+----------------------+------------------------+----------------+
| Option               | Allowed values         | Default values |
+======================+========================+================+
| `email_alert_level`_ | Any level from 1 to 16 | 7              |
+----------------------+------------------------+----------------+
| `log_alert_level`_   | Any level from 1 to 16 | 1              |
+----------------------+------------------------+----------------+
| `use_geoip`_         | yes/no                 | Disabled       |
+----------------------+------------------------+----------------+


email_alert_level
-------------------------

Minimum alert level to send e-mail notifications.

This is the minumum level for an alert to trigger an email.
This overrides granular email alert levels.
Setting this to 10 would prevent emails for alerts at levels
lower than 10 to be sent despite settings in the granular email configuration.
Individual rules can override this with the *alert_by_email* option.

log_alert_level
-------------------------

Minimum alert level to store the log messages.



use_geoip
-------------------------

Enable or disable GeoIP lookups.
