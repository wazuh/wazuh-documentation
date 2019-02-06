.. Copyright (C) 2019 Wazuh, Inc.

Use case: Getting an alert when a check changes its result value
================================================================

The configuration is as follows:

.. code-block:: none

    <policy-monitoring>
        <enabled>no</enabled>
        <scan_on_start>yes</scan_on_start>
        <interval>1m</interval>
        <skip_nfs>yes</skip_nfs>

        <profile>cis_debian_linux_rcl.yml</profile>
    </policy-monitoring>
