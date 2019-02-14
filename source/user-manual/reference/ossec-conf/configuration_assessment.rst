.. Copyright (C) 2018 Wazuh, Inc.

.. _reference_ossec_configuration_assessment:

configuration_assessment
========================

.. topic:: XML section name

	.. code-block:: xml

		<configuration_assessment>
		</configuration_assessment>

Configuration options for policy monitoring with the configuration assessment module.

Options
-------

- `scan_on_start`_
- `scan_wday`_
- `scan_day`_
- `interval`_
- `scan_time`_
- `skip_nfs`_
- `policies`_


scan_on_start
^^^^^^^^^^^^^

The configuration assessment module will perform the scans inmediately when started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

scan_wday
^^^^^^^^^

Day of the week to run the scans. **Not compatible** with the ``scan_day`` option.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the week:         |
|                    |   - sunday/sun           |
|                    |   - monday/mon           |
|                    |   - tuesday/tue          |
|                    |   - wednesday/wed        |
|                    |   - thursday/thu         |
|                    |   - friday/fri           |
|                    |   - saturday/sat         |
+--------------------+--------------------------+

scan_day
^^^^^^^^

The scans will be executed this day of the month. **Not compatible** with the ``scan_wday`` option.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

interval
^^^^^^^^

The scans will be executed between this range of time.

+--------------------+-----------------------------------------------------------------------------------------+
| **Default value**  | n/a                                                                                     |
+--------------------+-----------------------------------------------------------------------------------------+
| **Allowed values** | A number + unit suffix [s (second), m (minute), d (day), w (week), M (month), y (year)] |
+--------------------+-----------------------------------------------------------------------------------------+

scan_time
^^^^^^^^^

Time to run the scans. Times may be represented as 9pm or 8:30.

+--------------------+-------------+
| **Default value**  | n/a         |
+--------------------+-------------+
| **Allowed values** | Time of day |
+--------------------+-------------+


enabled
^^^^^^^

Enables the execution of rootcheck.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

skip_nfs
^^^^^^^^

Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD).
Currently, skip_nfs will exclude checking files on CIFS or NFS mounts.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

policies
^^^^^^^^

Specifies the check files to be run. Inside this block there can be various ``<policy>`` fields, as showed in the example.

+--------------------+----------------------+
| **Default value**  | n/a                  |
+--------------------+----------------------+
| **Allowed values** | Any policy YAML file |
+--------------------+----------------------+

Configuration example
---------------------

.. code-block:: xml

      <configuration_assessment>
        <enabled>yes</enabled>
        <scan_on_start>yes</scan_on_start>
        <interval>1m</interval>
        <skip_nfs>yes</skip_nfs>

        <policies>
          <policy>cis_debian_rcl.yml</policy>
          <policy>cis_apache2224_rcl.yml</policy>
        </policies>
      </configuration_assessment>
