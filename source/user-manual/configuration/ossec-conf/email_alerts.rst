.. _reference_ossec_email_alerts:

Email alerts
============

.. topic:: XML section name

	.. code-block:: xml

		<email_alerts>

This extends the email options configured in the ``<global>`` section.

.. note::
  `Global  <./global>`_  email configuration is necessary to use granular email options.


+-------------------+--------------------------------------------------------------------------------+
| Options           | Allowed values                                                                 |
+===================+================================================================================+
| `email_to`_       | Any single valid email address                                                 |
+-------------------+--------------------------------------------------------------------------------+
| `level`_          | Any alert level from 0 to 16                                                   |
+-------------------+--------------------------------------------------------------------------------+
| `group`_          | One or more groups or categories                                               |
+-------------------+--------------------------------------------------------------------------------+
| `event_location`_ | Any single agent name, hostname, IP address, or log file                       |
+-------------------+--------------------------------------------------------------------------------+
| `format`_         | full,  sms                                                                     |
+-------------------+--------------------------------------------------------------------------------+
| `rule_id`_        | one or more rule id(s)                                                         |
+-------------------+--------------------------------------------------------------------------------+
| `do_not_delay`_   | XML tag with no value                                                          |
+-------------------+--------------------------------------------------------------------------------+
| `do_not_group`_   | XML tag with no value                                                          |
+-------------------+--------------------------------------------------------------------------------+



``email_to``
------------

This specifies a single email address to which to send email alerts. If you want to send alerts to multiple addresses, each address must be listed in a separate <email_to> section.  Lists are not allowed.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any valid email address is allowed.


``level``
---------

This is the minimum alert severity level for which emails will be sent.


.. note::
  The ``level`` option should be set at or above the `email_alert_level <./alerts.html#element-email_alert_level>`_ in the ``<alerts>`` section of the configuration.  


.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any alert level 0 to 16 is allowed.


``group``
---------

This limits the sending of emails to only when rules are tripped that belongs to one of the listed groups.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    One or more groups or categories can be used. Multiple groups can be separated with a pipe character (“|”).



``event_location``
------------------

The alert must match this event location to be forwarded.
Do not specify this option repeatedly, as only the last instance would be used.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any single agent name, hostname, IP address, or log file is allowed


``format``
----------

This specifies the email format.

.. topic:: Default value

  .. code-block:: xml

    <format>full</format>

.. topic:: Allowed values

  full: Send normal emails.

  sms: Use a compact format more suitable for SMS.


``rule_id``
-----------

This limits the sending of emails to only when rules are tripped that have one of the listed rule IDs.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    One or more rule IDs can be used here, separated by a comma and a space ( ", " ).


``do_not_delay``
----------------

This causes email alerts to be sent right away, rather than to be delayed for the purpose of batching multiple alerts together.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Using the tag as below:

  .. code-block:: xml

    <do_not_delay />


``do_not_group``
----------------

This disables grouping of multiple alerts into the same email.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Using the tag as below:

  .. code-block:: xml

    <do_not_group />

.. warning::
	Notice that **do_not_delay** and **do_not_group** are special empty-element XML tags, so they stand alone, not having a starting and ending version of the tag.  This is indicated by the tag name containing "/" at the end of the name.

