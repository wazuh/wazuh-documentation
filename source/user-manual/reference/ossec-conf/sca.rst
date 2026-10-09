.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the sca configuration section of ossec.conf, which configures Security Configuration Assessment scans and policies.

.. _reference_ossec_sca:

sca
===

This section covers the configuration for the `Security Configuration Assessment <https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html#manual-sec-config-assessment>`__ module.

.. topic:: XML section name

   .. code-block:: xml

      <sca>
      </sca>

Settings to run Security Configuration Assessment scans.

Options
-------

Main options
^^^^^^^^^^^^^

- `enabled`_
- `policies`_
- `max_eps`_
- `synchronization`_
- `skip_nfs`_ (deprecated)

Scheduling options
^^^^^^^^^^^^^^^^^^^^

- `scan_on_start`_
- `interval`_
- `day, wday, time`_ (deprecated)

enabled
^^^^^^^

Enables the module.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

policies
^^^^^^^^

Between ``<policy>`` tags, in this section it can be included policy files to run assessments.

+----------------------+------------------------+
| **Default value**    | n/a                    |
+----------------------+------------------------+
| **Allowed values**   | Any YAML policy file   |
+----------------------+------------------------+

Attributes

+-----------+-----------------------------------------------------------------------------------+
| enabled   | Offers the possibility to disable a policy when it has been enabled previously.   |
+-----------+-----------------------------------------------------------------------------------+

.. note::
   Since Wazuh v3.10.0, although this section is missing, the Wazuh Agent will run scans for every policy (``.yaml`` or ``.yml`` files) present in their ruleset folder.

.. note::
   Since Wazuh v4.2.0, when a policy is defined by a relative path, this path is relative to the Wazuh installation directory. If the policy is located outside the installation directory, a full path can be used.

Example

.. code-block:: xml

   <policies>
     <policy>etc/shared/cis_debian10.yml</policy>
     <policy>/path/to/my/policy.yml</policy>
   </policies>

max_eps
^^^^^^^

Maximum number of events per second the SCA module sends.

+--------------------+---------------------------+
| **Default value**  | 50                        |
+--------------------+---------------------------+
| **Allowed values** | Integer from 0 to 1000000 |
+--------------------+---------------------------+

synchronization
^^^^^^^^^^^^^^^

Settings for synchronizing the SCA results database with the Wazuh manager.

.. code-block:: xml

   <synchronization>
     <enabled>yes</enabled>
     <interval>5m</interval>
     <integrity_interval>24h</integrity_interval>
   </synchronization>

+------------------------+---------------------------------------------------+---------------------+----------------------------------------------------+
| Option                 | Description                                       | Default             | Allowed values                                     |
+========================+===================================================+=====================+====================================================+
| ``enabled``            | Enables periodic synchronization.                 | yes                 | yes, no                                            |
+------------------------+---------------------------------------------------+---------------------+----------------------------------------------------+
| ``interval``           | Time between synchronizations.                    | 5m (300 seconds)    | Positive time value with optional suffix s, m, h   |
|                        |                                                   |                     | or d. 0 is not allowed.                            |
+------------------------+---------------------------------------------------+---------------------+----------------------------------------------------+
| ``integrity_interval`` | Time between integrity checks of the synchronized | 24h (86400 seconds) | Non-negative time value with optional suffix s, m, |
|                        | data.                                             |                     | h or d.                                            |
+------------------------+---------------------------------------------------+---------------------+----------------------------------------------------+

skip_nfs
^^^^^^^^

.. deprecated:: 5.0.0

   This option has no effect in Wazuh 5.0. The SCA module still accepts it so configurations from Wazuh 4.x agents don't fail, and logs a deprecation warning when it finds it.

scan_on_start
^^^^^^^^^^^^^^

The SCA module will perform the scan immediately when started.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

interval
^^^^^^^^

The interval between module executions.

+--------------------+---------------------------------------------------------------------------------------------+
| **Default value**  | 1d (86400 seconds)                                                                          |
+--------------------+---------------------------------------------------------------------------------------------+
| **Allowed values** | A positive number with an optional suffix: s (seconds), m (minutes), h (hours) or d (days). |
|                    | A number without a suffix is in seconds.                                                    |
+--------------------+---------------------------------------------------------------------------------------------+

day, wday, time
^^^^^^^^^^^^^^^

.. deprecated:: 5.0.0

   These scheduling options have no effect in Wazuh 5.0. The SCA module runs on ``interval`` only. It still accepts them so configurations from Wazuh 4.x agents don't fail, and logs a deprecation warning when it finds one.

Sample configuration
---------------------

.. code-block:: xml

   <sca>
     <enabled>yes</enabled>
     <scan_on_start>yes</scan_on_start>
     <policies>
       <policy>etc/shared/cis_debian10.yml</policy>
       <policy enabled="no">ruleset/sca/cis_debian9.yml</policy>
       <policy>/my/custom/policy/path/my_policy.yaml</policy>
     </policies>
   </sca>
