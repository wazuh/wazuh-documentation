.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the wodle name="syscollector" configuration section of ossec.conf, which configures system inventory data collection.

.. _reference_ossec_wodle_syscollector:

wodle name="syscollector"
============================

.. topic:: XML section name

   .. code-block:: xml

      <wodle name="syscollector">
      </wodle>

Configuration options of the Syscollector wodle for `system inventory <https://documentation.wazuh.com/5.0-beta/user-manual/capabilities/system-inventory/index.html>`__.

Options
-------

- `disabled`_
- `interval`_
- `scan_on_start`_
- `max_eps`_
- `notify_first_scan`_
- `hardware`_
- `os`_
- `network`_
- `packages`_
- `ports`_
- `processes`_
- `hotfixes`_
- `users`_
- `groups`_
- `services`_
- `browser_extensions`_
- `synchronization`_

disabled
^^^^^^^^

Disable the Syscollector wodle.

+----------------------+-----------+
| **Default value**    | no        |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

interval
^^^^^^^^

Time between system scans.

+----------------------+----------------------------------------------------------------------------------------------+
| **Default value**    | 1h                                                                                           |
+----------------------+----------------------------------------------------------------------------------------------+
| **Allowed values**   | A positive number with a suffix character for the time unit. Use s for seconds, m for        |
|                      | minutes, h for hours, and d for days. If the configured value is lower than 60 seconds, it   |
|                      | automatically adjusts it to 60 seconds.                                                      |
+----------------------+----------------------------------------------------------------------------------------------+

scan_on_start
^^^^^^^^^^^^^^

Run a system scan immediately when the service is started

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

max_eps
^^^^^^^

Maximum number of events per second the Syscollector wodle sends.

+--------------------+---------------------------+
| **Default value**  | 50                        |
+--------------------+---------------------------+
| **Allowed values** | Integer from 0 to 1000000 |
+--------------------+---------------------------+

notify_first_scan
^^^^^^^^^^^^^^^^^

Specifies whether the first scan reports stateless events.

+--------------------+---------+
| **Default value**  | no      |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

hardware
^^^^^^^^

Enables the hardware scan.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

os
^^

Enables the OS scan.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

network
^^^^^^^

Enables the network scan.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

packages
^^^^^^^^

Enables the scan of the packages.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

ports
^^^^^

Enables the ports scan.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

With option ``all='no'`` it will only scan listening ports.

+-----------+------------------+
| Options   | Allowed values   |
+===========+==================+
| all       | yes, no          |
+-----------+------------------+

processes
^^^^^^^^^^

Enables the scan of the processes.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

hotfixes
^^^^^^^^

Enables the hotfixes scan. It reports the Windows updates installed.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

.. note::
   This option is enabled by default but not included in the initial configuration.

users
^^^^^

Enables the user account information scan

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

groups
^^^^^^

Enables the user account groups scan

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

services
^^^^^^^^

Enables the services scan

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

browser_extensions
^^^^^^^^^^^^^^^^^^^^

Enables the browser extensions scan

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

synchronization
^^^^^^^^^^^^^^^^

The database synchronization settings are configured inside this tag.

.. code-block:: xml

   <wodle name="syscollector">
     <synchronization>
       <enabled>yes</enabled>
       <interval>5m</interval>
       <integrity_interval>24h</integrity_interval>
     </synchronization>
   </wodle>

``enabled`` — Enables periodic inventory synchronization.

+--------------------+---------+
| **Default value**  | yes     |
+--------------------+---------+
| **Allowed values** | yes, no |
+--------------------+---------+

``interval`` — Time between inventory synchronizations.

+--------------------+--------------------------------------------------------------------------+
| **Default value**  | 5m (300 seconds)                                                         |
+--------------------+--------------------------------------------------------------------------+
| **Allowed values** | Positive time value with optional suffix s, m, h or d. 0 is not allowed. |
+--------------------+--------------------------------------------------------------------------+

``integrity_interval`` — Sets the time interval for periodic database integrity validation.

+--------------------+------------------------------------------------------------+
| **Default value**  | 24h                                                        |
+--------------------+------------------------------------------------------------+
| **Allowed values** | Non-negative time value with optional suffix s, m, h or d. |
+--------------------+------------------------------------------------------------+

.. deprecated:: 5.0.0

   ``<synchronization><max_eps>`` has no effect in Wazuh 5.0. It is still accepted so configurations from Wazuh 4.x agents don't fail. Use the top-level ``max_eps`` option instead.

Example of configuration
----------------------------

.. code-block:: xml

   <!-- System inventory -->
   <wodle name="syscollector">
     <disabled>no</disabled>
     <interval>1h</interval>
     <scan_on_start>yes</scan_on_start>
     <hardware>yes</hardware>
     <os>yes</os>
     <network>yes</network>
     <packages>yes</packages>
     <ports all="no">yes</ports>
     <processes>yes</processes>
     <users>yes</users>
     <groups>yes</groups>
     <services>yes</services>
     <browser_extensions>yes</browser_extensions>
     <!-- Database synchronization settings -->
     <synchronization>
       <enabled>yes</enabled>
       <interval>5m</interval>
       <integrity_interval>24h</integrity_interval>
     </synchronization>
   </wodle>
