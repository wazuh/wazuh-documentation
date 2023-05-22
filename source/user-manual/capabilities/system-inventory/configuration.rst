.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the Syscollector configuration in this section of the Wazuh documentation.

Configuration
=============

The Syscollector module is enabled by default on all endpoints where the Wazuh agent is installed. You can find the Syscollector configuration in the Wazuh agent configuration file at:

- ``/var/ossec/etc/ossec.conf`` for Linux endpoints.
- ``C:\Program Files (x86)\ossec-agent\ossec.conf`` for Windows endpoints.
- ``/Library/Ossec/ossec.conf`` for macOS endpoints.

You can also use the :doc:`centralized configuration </user-manual/reference/centralized-configuration>` file to make changes to the Syscollector module across multiple monitored endpoints that belong to the same agent group. For example, the ``default`` group uses the configuration file, which you can find at ``/var/ossec/etc/shared/default/agent.conf`` on the Wazuh server. Any setting done with the centralized configuration will take precedence over the local agent configuration.

The block below is the default Syscollector configuration present in the Wazuh agent configuration file:

.. code-block:: xml
   :emphasize-lines: 3,4,5,6,7,8,9,10,11,15
      
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

        <!-- Database synchronization settings -->
        <synchronization>
          <max_eps>10</max_eps>
        </synchronization>
      </wodle>

Where:

- ``<disabled>`` specifies whether the Syscollector module is enabled or not. The default value is ``no``. The allowed values are ``yes`` and ``no``.

.. _interval_syscollector:

- ``<interval>`` specifies the time between system scans. The default value is 1 hour. The allowed value is a positive number that should contain a suffix character indicating a time unit, such as ``s`` (seconds), ``m`` (minutes), ``h`` (hours), and ``d`` (days).
- ``<scan_on_start>`` initiates a system scan immediately after you restart the Wazuh service on the endpoint. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<hardware>`` option enables or disables the hardware information collection by Syscollector. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<os>`` option enables or disables the operating system scan. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<network>`` enables or disables the network scan. The default value is ``yes``. The allowed values are ``yes`` and ``no``.
- ``<packages>`` enables or disables the scanning of packages with a default value of ``yes``. The allowed values are ``yes`` and ``no``.
- ``<ports all="no">`` enables or disables the port scan. The default value is ``yes``. You can configure two allowed values of ``yes`` and ``no``. This option also accepts an additional parameter ``all``, with which you can restrict the scan to only listening ports using ``<ports all="no">``. If you want Syscollector to scan all ports, then you change the value to ``yes``.
- ``<processes>`` enables or disables the scanning for running processes on a monitored endpoint. The default value of ``yes``. The allowed values are ``yes`` and ``no``.
- ``<max_eps>`` allows you to set the maximum event reporting throughput. The default value is 10, which signifies 10 events per second. The allowed value is an Integer number between 0 and 1000000.
