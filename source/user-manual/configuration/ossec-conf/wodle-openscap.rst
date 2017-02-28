.. _wodle_openscap:

The OpenSCAP wodle
========================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="open-scap">

Configuration options of the OpenSCAP wodle.

+----------------------+-----------------------------+
| Options              | Allowed values              |
+======================+=============================+
| `timeout`_           | A positive number (seconds) |
+----------------------+-----------------------------+
| `interval`_          | A positive number           |
+----------------------+-----------------------------+
| `scan-on-start`_     | yes, no                     |
+----------------------+-----------------------------+
| `content`_           | N/A                         |
+----------------------+-----------------------------+


``timeout``
---------------------

Timeout for each evaluation.

.. topic:: Default value

    .. code-block:: xml

        <timeout>1800</timeout>

.. topic:: Allowed values

    A positive number (seconds)

``interval``
-------------------

Interval between OpenSCAP executions.

.. topic:: Default value

    .. code-block:: xml

        <interval>1d</interval>

.. topic:: Allowed values

    A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days).

``scan-on-start``
-------------------

Run evaluation immediately when service is started.

.. topic:: Default value

    .. code-block:: xml

        <scan-on-start>yes</scan-on-start>

.. topic:: Allowed values

    yes, no

``content``
-------------------

Define an evaluation.

.. topic:: Attributes

    type
        Select content type: xccdf or oval.
    path
        Use the specified policy file (DataStream, XCCDF or OVAL). Default path: /var/ossec/wodles/oscap/policies
    timeout
        Timeout for the evaluation (in seconds).  Use of this attribute overwrites the generic timeout.
    xccdf-id
        XCCDF id.
    oval-id
        OVAL id.
    datastream-id
        Datastream id.
    cpe
        CPE dictionary file. Default path: /var/ossec/wodles/oscap/policies
    profile
        Select profile.
