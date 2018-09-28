.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_alerts:

alerts
======

.. topic:: XML section name

	.. code-block:: xml

		<alerts>
		</alerts>

Here is how to configure the severity level threshold for logging or sending alerts and the geolocation feature.

Options
-------

- `log_alert_level`_
- `email_alert_level`_
- `use_geoip`_

.. _reference_ossec_alerts_ea:


log_alert_level
^^^^^^^^^^^^^^^^

Sets the minimum severity level for alerts that will be stored to alerts.log and/or alerts.json.

+--------------------+------------------------+
| **Default value**  | 3                      |
+--------------------+------------------------+
| **Allowed values** | Any level from 1 to 16 |
+--------------------+------------------------+

email_alert_level
^^^^^^^^^^^^^^^^^

Sets the minimum severity level for an alert to generate an email notification.

.. warning::
	This is the minimum level for an alert to trigger an email.
	This setting overrides granular email alert configuration.
	Setting this to 10 will prevent the sending of emails for alerts with levels lower than 10, even when there are settings in the granular email configuration referencing levels lower than 10.
	Individual rules can override this with the *alert_by_email* option which forces an email alert regardless of global or granular alert level thresholds.

+--------------------+-------------------------+
| **Default value**  | 12                      |
+--------------------+-------------------------+
| **Allowed values** | Any level from 1 to 16  |
+--------------------+-------------------------+

use_geoip
^^^^^^^^^

Toggles GeoIP lookups on or off.

+--------------------+-------------+
| **Default value**  | no          |
+--------------------+-------------+
| **Allowed values** | yes, no     |
+--------------------+-------------+

.. note::
    This option is only available when wazuh has been compiled with
    [`LIBGEOIP_ENABLED`](https://github.com/wazuh/wazuh/blob/master/src/config/alerts-config.c#L61).
    Otherwise, use of this option will result in an
    [Invalid element](https://github.com/wazuh/wazuh/blob/master/src/error_messages/error_messages.h#L84)
    error and prevent wazuh from starting.

Default configuration
---------------------

.. code-block:: xml

    <alerts>
      <log_alert_level>3</log_alert_level>
      <email_alert_level>12</email_alert_level>
    </alerts>

