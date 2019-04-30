.. Copyright (C) 2019 Wazuh, Inc.

.. _release_3_9_0:

3.9.0 Release Notes
===================

This section shows the most relevant improvements and fixes in version 3.9.0. More details about these changes are provided in each component changelog:

- `wazuh/wazuh <https://github.com/wazuh/wazuh/blob/3.9/CHANGELOG.md>`_
- `wazuh/wazuh-api <https://github.com/wazuh/wazuh-api/blob/3.9/CHANGELOG.md>`_
- `wazuh/wazuh-ruleset <https://github.com/wazuh/wazuh-ruleset/blob/3.9/CHANGELOG.md>`_
- `wazuh/wazuh-kibana-app <https://github.com/wazuh/wazuh-kibana-app/blob/3.9-6.7/CHANGELOG.md>`_
- `wazuh/wazuh-splunk <https://github.com/wazuh/wazuh-splunk/blob/3.9/CHANGELOG.md>`_

Wazuh core
----------

**Security Configuration Assessment (SCA)**

Added a new module named Security Configuration Assessment (SCA), this module enriches our hardening features. Policy files are now in YAML format so you can read or edit them in a painless way. Each policy is used to perform a different scan, the result is then stored, so the user can look at the results using the Wazuh API or the Wazuh app.

Every time a scan is done, Wazuh looks for the differences between the last scan and the current scan, if they differ, then Wazuh generates the proper alert. Also, every scan generates another kind of alerts with statistical information about the scan itself and its results.

Here is an example that runs a scan the 15th of every month:

.. code-block:: xml

    <sca>
        <enabled>yes</enabled>
        <scan_on_start>yes</scan_on_start>
        <scan_day>15</scan_day>
        <skip_nfs>yes</skip_nfs>
        <policies>
            <policy>cis_debian_linux_rcl.yml</policy>
        </policies>
    </sca>

.. thumbnail:: ../images/release-notes/3.9.0/app-01.png
  :title: Security configuration assessment alert
  :align: center
  :width: 100%

**Syscollector improvements** 

- Get network and open ports inventory for Windows XP and Windows Server 2003 systems.
- Events information can be decoded into dynamic fields, so we can define rules based on *Syscollector* events. Decoders now accept ``syscollector`` as value for ``<decoded_as>`` tags.
- Get the real MAC address of each interface in `/sys/class/net/address` instead of getting it from interfaces with *AF_PACKET* sockets, avoiding this way problems with bonded interfaces that share the same MAC address at software level.


**FIM who-data changes**

Since Wazuh 3.8.0, Wazuh has a health check for FIM who-data, it checks if the Audit events socket is working before starting the who-data engine in order to avoid start listening to it when it's blocked or disabled. Now it can be disabled as follow:

.. code-block:: xml

    <syscheck>
        ...
        <whodata>
            <startup_healthcheck>yes</startup_healthcheck>
        </whodata>
        ...
    </syscheck>

- FIM who-data now supports hot added symbolic link events.

- Added support for *Fedora 29* systems that use *Audit 3.0 (beta)*.

**AWS organizations in CloudTrail**

With this enhancement, it is possible getting logs for created organizations by adding ``<aws_organization_id>ORGANIZATION</aws_organization_id>`` in the wodle configuration. 

Here is an example of how to configure this new AWS capability:

.. code-block:: xml

    <wodle name="aws-s3">
        <disabled>no</disabled>
        <bucket type="cloudtrail">
            <name>cloudtrail</name>
            <aws_organization_id>wazuh</aws_organization_id>
            <aws_profile>default</aws_profile>
        </bucket>
        <remove_from_bucket>no</remove_from_bucket>
        <interval>20m</interval>
        <run_on_start>yes</run_on_start>
        <skip_on_error>no</skip_on_error>
    </wodle>

**Wazuh cluster enhancements**

Since 3.9.0, Wazuh has its own Python 3 interpreter, so it's no longer needed to install Python and its dependencies externally. The communication between the cluster nodes has been improved thanks to *asyncio library* (`Asynchronous I/O <https://docs.python.org/3/library/asyncio.html>`_) which increases the performance.

Added *-t* and *-c* options for the Wazuh cluster daemon. Those options allow the user to test an isolated configuration file or to test the existing one configuration file.


**Other Wazuh core fixes and improvements**

- Added extra information in the agents' alerts to show IDs of each agent when they change their status (disconnect or remove).
- Fixed an error in the OSquery configuration validation. The ``osqueryd`` daemon started no matter the string it received, whether it was yes, no or anything else.
- Wazuh manager starts regardless of the contents of ``local_decoder.xml``. 
- Fixed memory leak and crash in *Vulnerability Detector*.
- Prevent *Integrator, Syslog Client and Mail forwarded* from getting stuck while reading ``alerts.json``.
- Vulnerability detector module now checks that the severity of the alerts has been unified and it also checks if the database is empty before starting a new scan.
- Labels starting with ``_`` are now reserved for internal use only.
- Make the Windows installer to choose the appropriate ``ossec.conf`` file based on the system version. 

Wazuh API
---------

- Edit the ``ossec.conf`` configuration file of a Wazuh manager.
- Create or modify custom rules, custom decoders and CDB lists.
- Restart the Wazuh manager. If Wazuh cluster is enabled, you can restart a single node at a time or all the nodes at the same time.
- List the SCA policies being applied, list the scan result of each policy.

.. code-block:: js

    GET /sca/001
    {
        "error": 0,
        "data": {
            "totalItems": 3,
            "items": [
                {
                    "pass": 2,
                    "references": "https://www.ssh.com/ssh/",
                    "invalid": 0,
                    "description": "Guidance for establishing a secure configuration for SSH service vulnerabilities.",
                    "end_scan": "2019-04-30 05:29:50",
                    "score": 22,
                    "fail": 7,
                    "hash_file": "4c7d05c9501ea38910e20ae22b1670b4f778669bd488482b4a19d179da9556ea",
                    "start_scan": "2019-04-30 05:29:50",
                    "total_checks": 9,
                    "name": "System audit for SSH hardening",
                    "policy_id": "system_audit_ssh"
                },
                ...
            ]
        }
    }


- Dive into your SCA scan results using the Wazuh API. 

.. code-block:: js

    GET /sca/001/checks/system_audit_ssh
    {
        "error": 0,
        "data": {
            "totalItems": 76,
            "items": [
                {
                    "description": "The option MaxAuthTries should be set to 4.",
                    "file": "/etc/ssh/sshd_config",
                    "remediation": "Change the MaxAuthTries option value in the sshd_config file.",
                    "policy_id": "system_audit_ssh",
                    "rationale": "The MaxAuthTries parameter specifies the maximum number of authentication attempts permitted per connection. Once the number of failures reaches half this value, additional failures are logged. This should be set to 4.",
                    "id": 1508,
                    "title": "SSH Hardening - 9: Wrong Maximum number of authentication attempts",
                    "result": "failed",
                    "compliance": [
                    {
                        "key": "pci_dss",
                        "value": "2.2.4"
                    }
                    ],
                    "rules": [
                    {
                        "type": "file",
                        "rule": "f:$sshd_file -> !r:^\s*MaxAuthTries\s+4\s*$;"
                    }
                    ]
                },
                ...
            ]
        }
    }

Wazuh app
---------

**Edit the configuration of the Wazuh manager**

Now you can edit the content of the configuration from the manager using this new editor, it shows the content of the *ossec.conf* file as it.

The configuration is validated before restarting the manager to prevent from crashing the service if the given configuration is wrong. It will tell you which line is causing errors.

.. thumbnail:: ../images/release-notes/3.9.0/app-03.png
  :title: Security configuration assessment alert
  :align: center
  :width: 100%


**Create and modify rules, decoders and CDB lists**

Thanks to the recently added Wazuh API endpoints, the app comes with multiple improvements for the ruleset section.

.. thumbnail:: ../images/release-notes/3.9.0/app-04.png
  :title: Security configuration assessment alert
  :align: center
  :width: 100%

**Expand visualizations**

For those cases you want to see a visualization bigger than it is, you can click the expand icon.

.. thumbnail:: ../images/release-notes/3.9.0/app-02.png
  :title: Security configuration assessment alert
  :align: center
  :width: 100%

**Other additions and improvements**

- Added new dashboards for SCA and Docker modules.
- Added support for more than one Wazuh monitoring pattern.
- Added a cron job for fetching missing fields of all valid index patterns, also merging dynamic fields every time an index pattern is refreshed by the app.
- Added a new way to view logs from the ossec.log file using a new log viewer component.
- Added resizable columns by dragging in tables.

Wazuh ruleset
-------------

- Added new options ``<same_field>`` and ``<not_same_field>`` to correlate dynamic fields in rules.

.. code-block:: xml

    <rule id="100002" level="7" frequency="3" timeframe="300">
        <if_matched_sid>100001</if_matched_sid>
        <same_field>netinfo.iface.name</same_field>
        <same_field>netinfo.iface.mac</same_field>
        <not_same_field>netinfo.iface.rx_bytes</not_same_field>
        <options>no_full_log</options>
        <description>Testing options for correlating repeated fields</description>
    </rule>

- Improved rules for Docker to prevent the activation of certain rules that should not be activated.
- Modified the structure and the names for Windows EventChannel fields in all the related rules.
- Fixed the brute-force attack rules for Windows Eventchannel by adding the new ``<same_field>`` option and changing some rules.
- Added *Sysmon rules* for Windows.


.. code-block:: xml

    <rule id="20351" level="0">
        <if_sid>20350</if_sid>
        <field name="EventChannel.EventData.ParentImage">\\services.exe</field>
        <description>Sysmon - Legitimate Parent Image - svchost.exe</description>
    </rule>


    <rule id="20352" level="12">
        <if_group>sysmon_event1</if_group>
        <field name="EventChannel.EventData.Image">lsm.exe</field>
        <description>Sysmon - Suspicious Process - lsm.exe</description>
        <group>pci_dss_10.6.1,pci_dss_11.4,gdpr_IV_35.7.d,</group>
    </rule>

- Added a new rule to catch logon success from a Windows workstation.

    .. code-block:: xml

        <rule id="20019" level="3">
            <if_sid>20007</if_sid>
            <field name="win.eventdata.workstationName">\.+</field>
            <field name="win.eventdata.logonType">^2$</field>
            <description>Windows Workstation Logon Success</description>
            <options>no_full_log</options>
            <group>authentication_success,pci_dss_10.2.5,gpg13_7.1,gpg13_7.2,gdpr_IV_32.2,</group>
        </rule>