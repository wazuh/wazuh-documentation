.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the configuration of the Configuration Assessment application. Check out the options and a sample configuration in this section.
  
.. _reference_sec_config_assessment:

Configuration assessment 
===

This section covers the configuration for the :ref:`manual_sec_config_assessment` module.

.. topic:: XML section name

	.. code-block:: xml

		<sca>
		</sca>

Settings to run Configuration Assessment scans.

Options
-------

Main options
^^^^^^^^^^^^

- `enabled`_
- `skip_nfs`_
- `policies`_


+----------------------+-----------------------------+
| Main options         | Allowed values              |
+======================+=============================+
| `enabled`_           | yes, no                     |
+----------------------+-----------------------------+
| `skip_nfs`_          | yes, no                     |
+----------------------+-----------------------------+
| `policies`_          | N/A                         |
+----------------------+-----------------------------+

Scheduling options
^^^^^^^^^^^^^^^^^^

- `scan_on_start`_
- `interval`_
- `day`_
- `wday`_
- `time`_


+----------------------+-----------------------------+
| Scheduling options   | Allowed values              |
+======================+=============================+
| `scan_on_start`_     | yes, no                     |
+----------------------+-----------------------------+
| `interval`_          | A positive number + suffix  |
+----------------------+-----------------------------+
| `day`_               | A day of the month          |
+----------------------+-----------------------------+
| `wday`_              | A day of the week           |
+----------------------+-----------------------------+
| `time`_              | A time of the day *[hh:mm]* |
+----------------------+-----------------------------+

+-------------------+------------+
| Interval suffixes | Time scale |
+===================+============+
| `s`               | seconds    |
+-------------------+------------+
| `m`               | minutes    |
+-------------------+------------+
| `d`               | days       |
+-------------------+------------+
| `w`               | weeks      |
+-------------------+------------+
| `M`               | months     |
+-------------------+------------+

Some examples of usage of these options are included in the
:doc:`SCA documentation<../../capabilities/sec-config-assessment/index>`.

enabled
^^^^^^^

Enables the module.

+--------------------+-----------------------------+
| **Default value**  | yes                         |
+--------------------+-----------------------------+
| **Allowed values** | yes, no                     |
+--------------------+-----------------------------+

skip_nfs
^^^^^^^^

Enable or disable the scanning of network mounted filesystems (Works on Linux and FreeBSD).
Currently, ``skip_nfs`` will exclude checking files on CIFS or NFS mounts.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

policies
^^^^^^^^

Between ``<policy>`` tags, in this section it can be included policy files to run assessments.

+--------------------+----------------------+
| **Default value**  | n/a                  |
+--------------------+----------------------+
| **Allowed values** | Any YAML policy file |
+--------------------+----------------------+

Attributes

+----------------+---------------------------------------------------------------------------------+
| **enabled**    | Offers the possibility to disable a policy when it has been enabled previously. |
+----------------+---------------------------------------------------------------------------------+

.. note::
  Since Wazuh v3.10.0, although this section is missing, the Wazuh Agent will run scans for every policy (.yaml or .yml files) present in their ruleset folder.

.. warning::
  Since Wazuh v4.2.0, when a policy is defined by a relative path, this path is relative to the Wazuh installation directory. If the policy is located outside the installation directory, a full path can be used.

Example

.. code-block:: xml

  <policies>
    <policy>etc/shared/cis_debian10.yml</policy>
    <policy>/path/to/my/policy.yml</policy>
  </policies>


scan_on_start
^^^^^^^^^^^^^

The SCA module will perform the scan immediately when started.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

interval
^^^^^^^^

The interval between module executions.

+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Default value**  | 12h                                                                                                                                                            |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number that should contain a suffix character indicating a time unit, such as, s (seconds), m (minutes), h (hours), d (days), w (weeks), M (months) |
+--------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+

The interval option is conditioned by the following described options ``day``, ``wday`` and ``time``. If none of these options are set, the interval can take any allowed value.

day
^^^

Day of the month to run the scan.

+--------------------+--------------------------+
| **Default value**  | n/a                      |
+--------------------+--------------------------+
| **Allowed values** | Day of the month [1..31] |
+--------------------+--------------------------+

.. note::

	When the ``day`` option is set, the interval value must be a multiple of months. By default, the interval is set to a month.

wday
^^^^

Day of the week to run the scan. This option is **not compatible** with the ``day`` option.

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

.. note::

	When the ``wday`` option is set, the interval value must be a multiple of weeks. By default, the interval is set to a week.

time
^^^^

Time of the day to run the scan. It has to be represented in the format *hh:mm*.

+--------------------+-----------------------+
| **Default value**  | n/a                   |
+--------------------+-----------------------+
| **Allowed values** | Time of day *[hh:mm]* |
+--------------------+-----------------------+

.. note::

	When only the ``time`` option is set, the interval value must be a multiple of days or weeks. By default, the interval is set to a day.


Configuration example
---------------------

.. code-block:: xml

      <sca>
        <enabled>yes</enabled>
        <scan_on_start>yes</scan_on_start>
        <time>04:00</time>
        <skip_nfs>yes</skip_nfs>

        <policies>
          <policy>etc/shared/cis_debian10.yml</policy>
          <policy enabled="no">ruleset/sca/cis_debian9.yml</policy>
          <policy>/my/custom/policy/path/my_policy.yaml</policy>
        </policies>
      </sca>
