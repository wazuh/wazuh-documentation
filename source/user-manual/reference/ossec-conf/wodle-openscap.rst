.. _wodle_openscap:

wodle name="open-scap"
========================

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="open-scap">

Configuration options of the OpenSCAP wodle.

Options
-------

- `timeout`_
- `interval`_
- `scan-on-start`_
- `content`_


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


timeout
^^^^^^^

Timeout for each evaluation.

+--------------------+-----------------------------+
| **Default value**  | 1800                        |
+--------------------+-----------------------------+
| **Allowed values** | A positive number (seconds) |
+--------------------+-----------------------------+

interval
^^^^^^^^

Interval between OpenSCAP executions.

+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 1d                                                                                                                                       |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days). |
+--------------------+------------------------------------------------------------------------------------------------------------------------------------------+

scan-on-start
^^^^^^^^^^^^^

Run evaluation immediately when service is started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

content
^^^^^^^

Define an evaluation.

Attributes

+-------------------+-------------------------------------------------------------+
| **type**          | Select content type: xccdf or oval.                         |
+-------------------+-------------------------------------------------------------+
| **path**          | Use the specified policy file (DataStream, XCCDF or OVAL).  |
|                   |                                                             |
|                   | Default path: /var/ossec/wodles/oscap/policies              |
+-------------------+-------------------------------------------------------------+
| **timeout**       | Timeout for the evaluation (in seconds).                    |
|                   |                                                             |
|                   | Use of this attribute overwrites the generic timeout.       |
+-------------------+-------------------------------------------------------------+
| **xccdf-id**      | XCCDF id.                                                   |
+-------------------+-------------------------------------------------------------+
| **oval-id**       | OVAL id.                                                    |
+-------------------+-------------------------------------------------------------+
| **datastream-id** | Datastream id.                                              |
+-------------------+-------------------------------------------------------------+
| **cpe**           | CPE dictionary file.                                        |
|                   |                                                             |
|                   | Default path: /var/ossec/wodles/oscap/policies              |
+-------------------+-------------------------------------------------------------+
| **profile**       | Select profile.                                             |
+-------------------+-------------------------------------------------------------+

Example
-------

.. code-block:: xml

	<wodle name="open-scap">

	    <timeout>1800</timeout>
	    <interval>1d</interval>
	    <scan-on-start>yes</scan-on-start>

	    <content type="xccdf" path="ssg-centos7-ds.xml"/>
	    <content type="xccdf" path="ssg-centos6-ds.xml"/>

	</wodle>
