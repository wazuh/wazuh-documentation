.. _reference_ossec_email_alerts:

Email alerts
============

.. topic:: XML section name

	.. code-block:: xml

		<email_alerts>

Extend the e-mail options configured in ``<global>`` section.

.. note::
  `Global  <./global>`_  email configuration is necessary to use granular email options.


+-------------------+--------------------------------------------------------------------------------+
| Options           | Allowed values                                                                 |
+===================+================================================================================+
| `email_to`_       | Any valid e-mail address                                                       |
+-------------------+--------------------------------------------------------------------------------+
| `level`_          | Any alert level from 0 to 16                                                   |
+-------------------+--------------------------------------------------------------------------------+
| `group`_          | One or more groups or categories                                               |
+-------------------+--------------------------------------------------------------------------------+
| `event_location`_ | Any single agent name, hostname, ip address, or log file                       |
+-------------------+--------------------------------------------------------------------------------+
| `format`_         | full,  sms                                                                     |
+-------------------+--------------------------------------------------------------------------------+
| `rule_id`_        | Id rules                                                                       |
+-------------------+--------------------------------------------------------------------------------+
| `do_not_delay`_   | Using the tag                                                                  |
+-------------------+--------------------------------------------------------------------------------+
| `do_not_group`_   | Using the tag                                                                  |
+-------------------+--------------------------------------------------------------------------------+




``email_to``
------------

E-Mail recipients of alerts.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any valid e-mail address is allowed.

``level``
---------

Minimum alerting level to forward the e-mails.


.. note::
  The option  ``level`` should be set at or above the `email_alert_level <./alerts.html#element-email_alert_level>`_ in the ``<alerts>`` section of the configuration.


.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any alert level 0 to 16 is allowed.

``group``
---------

The alert that must match this group to be forwarded.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    One or more groups or categories can be used. Multiple groups can be separated with a pipe character (“|”).



``event_location``
------------------

The alert must match this event location to be forwarded.
If this option is specified multiple times, the last will be used.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    Any single agent name, hostname, ip address, or log file is allowed

``format``
----------

Specifies the format of the e-mail

.. topic:: Default value

  .. code-block:: xml

    <format>full</format>

.. topic:: Allowed values

  full: for normal e-mails

  sms: for reduced size suitable for SMS

``rule_id``
-----------

Option to send granular emails based on rule id.

.. topic:: Default value

	n/a

.. topic:: Allowed values

    One or more rule IDs can be used here,  separated by a comma and a space ( ", " ).

``do_not_delay``
----------------

Option to send the e-mail right away (no delay).

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Using the tag as below:

  .. code-block:: xml

    <do_not_delay />

``do_not_group``
----------------

Option to do not group alerts for this e-mail.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Using the tag as below:

  .. code-block:: xml

    <do_not_group />
