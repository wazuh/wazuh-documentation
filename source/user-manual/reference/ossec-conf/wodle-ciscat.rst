.. _wodle_ciscat:

wodle name="cis-cat"
========================

.. versionadded:: 3.1.0

.. topic:: XML section name

	.. code-block:: xml

		<wodle name="cis-cat">
		</wodle>

Configuration options of the CIS-CAT wodle.

.. warning::
    CIS-CAT is not installed by default. It is a proprietary software that you have to obtain for using this module.

Options
-------

- `disabled`_
- `timeout`_
- `interval`_
- `scan-on-start`_
- `java_path`_
- `ciscat_path`_
- `content`_


+----------------------+-----------------------------+
| Options              | Allowed values              |
+======================+=============================+
| `disabled`_          | yes, no                     |
+----------------------+-----------------------------+
| `timeout`_           | A positive number (seconds) |
+----------------------+-----------------------------+
| `interval`_          | A positive number           |
+----------------------+-----------------------------+
| `scan-on-start`_     | yes, no                     |
+----------------------+-----------------------------+
| `java_path`_         | Any valid path              |
+----------------------+-----------------------------+
| `ciscat_path`_       | Any valid path              |
+----------------------+-----------------------------+
| `content`_           | N/A                         |
+----------------------+-----------------------------+


disabled
^^^^^^^^

Disables the CIS-CAT wodle.

+--------------------+-----------------------------+
| **Default value**  | no                          |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

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

Interval between CIS-CAT executions.

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

java_path
^^^^^^^^^^

Define where Java is located. If this parameter is not set, the wodle will search for the Java location in the default environment variable ``$PATH``.

+--------------------+------------------+
| **Default value**  | /usr/bin         |
+--------------------+------------------+
| **Allowed values** | Any valid path.  |
+--------------------+------------------+

.. warning::
    For Windows environments, the ``java_path`` has to include the executable as follows: ``C:\path\to\java\java.exe``. On the other hand, for Unix agents the path should not include the Java binary.

ciscat_path
^^^^^^^^^^^^

Define where CIS-CAT is located.

+--------------------+----------------------------+
| **Default value**  | /var/ossec/wodles/ciscat   |
+--------------------+----------------------------+
| **Allowed values** | Any valid path.            |
+--------------------+----------------------------+

content
^^^^^^^

Define an evaluation. At present, you can only run assessments for XCCDF policy files.

Attributes

+-------------------+-------------------------------------------------------------+
| **type**          | Select content type.                                        |
+-------------------+-------------------------------------------------------------+
| **path**          | Use the specified policy file.                              |
|                   |                                                             |
|                   | Default path: ``ciscat_path``/benchmarks                    |
+-------------------+-------------------------------------------------------------+
| **timeout**       | Timeout for the evaluation (in seconds).                    |
|                   |                                                             |
|                   | Use of this attribute overwrites the generic timeout.       |
+-------------------+-------------------------------------------------------------+
| **profile**       | Select profile.                                             |
+-------------------+-------------------------------------------------------------+

Example of configuration
------------------------

.. code-block:: xml

  <wodle name="cis-cat">

    <disabled>no</disabled>
    <timeout>1800</timeout>
    <interval>1d</interval>
    <scan-on-start>yes</scan-on-start>

    <java_path>/usr/bin</java_path>
    <ciscat_path>/var/ossec/wodles/ciscat</ciscat_path>

    <content type="xccdf" path="/var/ossec/wodles/ciscat/benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml">
      <profile>xccdf_org.cisecurity.benchmarks_profile_Level_2_-_Server</profile>
    </content>

  </wodle>
