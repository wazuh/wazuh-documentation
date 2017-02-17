.. _reference_ossec_reports:

Reports
=======

.. topic:: XML section name

	.. code-block:: xml

		<reports>

Options to configure reports about the generated alerts.

+----------------+---------------------------------------------------------+
| Options        | Allowed values                                          |
+================+=========================================================+
| `group`_       | Any category used                                       |
+----------------+---------------------------------------------------------+
| `categories`_  | Any category used                                       |
+----------------+---------------------------------------------------------+
| `rule`_        | Any Rule ID                                             |
+----------------+---------------------------------------------------------+
| `level`_       | Any Alert level from 1 to 16                            |
+----------------+---------------------------------------------------------+
| `location`_    | Any file path or hostname or network                    |
+----------------+---------------------------------------------------------+
| `srcip`_       | Any hostname or network                                 |
+----------------+---------------------------------------------------------+
| `user`_        | Any username                                            |
+----------------+---------------------------------------------------------+
| `title`_       | Any text                                                |
+----------------+---------------------------------------------------------+
| `email_to`_    | Any email address                                       |
+----------------+---------------------------------------------------------+
| `showlogs`_    | yes, no                                                 |
+----------------+---------------------------------------------------------+


``group``
---------

Filter by group/category.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any category used, is allowed.

``categories``
--------------

Filter by group/category.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any category used, is allowed.

``rule``
--------

Rule ID to Filter for.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any Rule ID in OSSEC Rules is allowed

``level``
---------

Alert level to filter for. This is an inclusive option so all higher level alerts will also match.

.. topic:: Default value

	n/a

.. topic:: Allowed values

  Any Alert level from 1 to 16 can be used

``location``
------------

Filter by the log location or agent name.


.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any file path or hostname or network is allowed

``srcip``
---------

Filter by the source ip of the event.


.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any hostname or network can be used.

``user``
--------

Filter by the user name. This will match on either srcuser or dstuser

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any username


``title``
---------

The name of the report. This is a required field for reports to function.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any text


``email_to``
------------

The email address to send the completed report. This is a required field for a report to function.

.. topic:: Default value

  n/a

.. topic:: Allowed values

  Any email address


``showlogs``
------------

Include logs when creating the report.

.. topic:: Default value

  .. code-block:: xml

    <showlogs>no</showlogs>

.. topic:: Allowed values

  The option accepted are: yes, no
