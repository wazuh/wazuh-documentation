.. Copyright (C) 2019 Wazuh, Inc.

.. _openscap_module:

OpenSCAP
========

The **OpenSCAP wodle** is an integration of `OpenSCAP <https://www.open-scap.org/>`_ with *Wazuh HIDS* that provides the ability to perform configuration and vulnerability scans of an agent. It is primarily used for:

- Verifying **security compliance**:  OpenSCAP policies define the requirements that all systems in an organization must meet in order to be in line with applicable *security policies* and/or *security benchmarks*.

- Performing **vulnerability assessments**: OpenSCAP identifies and classifies vulnerabilities in a system.

- Performing **specialized assessments**: OpenSCAP can perform specific custom system checks (i.e., checking for suspicious file names and suspicious file locations.)

You will find more further information in the next sections:

- `How it works`_
- `Configuration`_
- `FAQ`_

How it works
------------

The `Security Content Automation Protocol (SCAP) <https://scap.nist.gov/>`_ is a specification for expressing and manipulating security data in standardized ways. SCAP uses several specifications in order to automate continuous monitoring, vulnerability management, and reporting the results of security compliance scans.

Components of the security compliance evaluation process:

- **SCAP scanner**: This is an application that reads a SCAP policy and checks whether or not the system is compliant with it. There are many `tools <https://nvd.nist.gov/scapproducts.cfm>`_ to scan your systems against SCAP policies. This wodle is an integration with the NIST-certified scanner called **OpenSCAP**.

- **Security policies (SCAP content)**: These determine how a system must be set up and what to check for. These policies contain machine-readable descriptions of the rules which your system will be required to follow.

- **Profiles**: Each security policy can contain multiple profiles, which provide sets of rules and values in line with a specific security baseline. You can think of a profile as a particular subset of rules within the policy; the profile determines which rules defined in the policy will be actually used and what values will be used during the evaluation.

- **Evaluation (scan)**: This is the process performed by the OpenSCAP scanner on an agent according to a specific security policy and profile.  It usually takes only a few minutes, depending on the number of rules selected in the profile.


Requirements
^^^^^^^^^^^^

This wodle is executed on the agent, so each agent must meet the following requirements:

OpenSCAP
In order to perform SCAP evaluations, we need the scanner. As we mentioned above, we use OpenSCAP. You can install it with this command:

a) For RPM-based distributions:

  .. code-block:: console

    # yum install openscap-scanner

b) For Debian-based distributions:

  .. code-block:: console

    # apt-get install libopenscap8 xsltproc

Python 2.6+
Python is a core part of this wodle. Currently all Linux distributions come with python, so it should not be an inconvenience.

Default policies
^^^^^^^^^^^^^^^^

These are the Security Policy includes by default on Wazuh:

+----------+---------+------------------------+-----------------+-------------------------+
| SO       | Version | File name              | Main profiles   | Vulnerability assessment|
+==========+=========+========================+=================+=========================+
| CentOS   | 6       | ssg-centos-6-ds.xml    | Server, PCI     | N/A                     |
+          +---------+------------------------+-----------------+-------------------------+
|          | 7       | ssg-centos-7-ds.xml    | Common, PCI     | N/A                     |
+----------+---------+------------------------+-----------------+-------------------------+
| RedHat   | 6       | ssg-rhel-6-ds.xml      | Server, PCI     | N/A                     |
+          +         +------------------------+-----------------+-------------------------+
|          |         | cve-redhat-6-ds.xml    | N/A             | Y                       |
+          +---------+------------------------+-----------------+-------------------------+
|          | 7       | ssg-rhel-7-ds.xml      | Common , PCI    | N/A                     |
+          +         +------------------------+-----------------+-------------------------+
|          |         | cve-redhat-7-ds.xml    | N/A             | Y                       |
+----------+---------+------------------------+-----------------+-------------------------+
| Debian   | 8       | ssg-debian-8-ds.xml    | Common          | N/A                     |
+----------+---------+------------------------+-----------------+-------------------------+
| Ubuntu   | xenial  | ssg-ubuntu-1604-ds.xml | Common          | N/A                     |
+          +---------+------------------------+-----------------+-------------------------+
|          | trusty  | cve-debian-oval.xml    | N/A             | Y                       |
+          +---------+------------------------+-----------------+-------------------------+
|          | precise | cve-debian-oval.xml    | N/A             | Y                       |
+----------+---------+------------------------+-----------------+-------------------------+
| Fedora   | 24      | ssg-fedora-ds.xml      | Common          | N/A                     |
+----------+---------+------------------------+-----------------+-------------------------+

Each agent must have its policies in ``/var/ossec/wodles/oscap/content``.

Wodle flow
^^^^^^^^^^

.. thumbnail:: ../../../images/manual/policy-compliance/openscap-flow.png
  :title: OpenSCAP
  :align: center
  :width: 100%

The agent will run *openscap-scanner* periodically according to the configuration. Each result of the scan will be sent to the Manager and it will generate an alert if the status of the result is fail. It is possible to tuning the rules to send the pass result too.

.. code-block:: json

    {
      "timestamp": "2017-03-20T15:59:43-0700",
      "rule": {
        "level": 7,
        "description": "OpenSCAP: Set Lockout Time For Failed Password Attempts (not passed)",
        "id": "81530",
        "firedtimes": 5,
        "groups": [
          "oscap",
          "oscap-result"
        ],
        "pci_dss": [
          "2.2"
        ]
      },
      "agent": {
        "id": "1040",
        "name": "ip-10-0-0-76",
        "ip": "10.0.0.76"
      },
      "manager": {
        "name": "vpc-ossec-manager"
      },
      "full_log": "oscap: msg: \"xccdf-result\", scan-id: \"10401490050781\", content: \"ssg-centos-7-ds.xml\", title: \"Set Lockout Time For Failed Password Attempts\", id: \"xccdf_org.ssgproject.content_rule_accounts_passwords_pam_faillock_unlock_time\", result: \"fail\", severity: \"medium\", description: \"To configure the system to lock out accounts after a number of incorrect login attempts and require an administrator to unlock the account using pam_faillock.so, modify the content of both /etc/pam.d/system-auth and /etc/pam.d/password-auth as follows: add the following line immediately before the pam_unix.so statement in the AUTH section: auth required pam_faillock.so preauth silent deny= unlock_time= fail_interval= add the following line immediately after the pam_unix.so statement in the AUTH section: auth [default=die] pam_faillock.so authfail deny= unlock_time= fail_interval= add the following line immediately before the pam_unix.so statement in the ACCOUNT section: account required pam_faillock.so\", rationale: \"Locking out user accounts after a number of incorrect attempts prevents direct password guessing attacks. Ensuring that an administrator is involved in unlocking locked accounts draws appropriate attention to such situations.\" references: \"AC-7(b) (http://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r4.pdf), 47 (http://iase.disa.mil/stigs/cci/Pages/index.aspx)\", identifiers: \"CCE-26884-7 (http://cce.mitre.org)\", oval-id: \"oval:ssg:def:166\", benchmark-id: \"xccdf_org.ssgproject.content_benchmark_RHEL-7\", profile-id: \"xccdf_org.ssgproject.content_profile_pci-dss\", profile-title: \"PCI-DSS v3 Control Baseline for CentOS Linux 7\".",
      "oscap": {
        "scan": {
          "id": "10401490050781",
          "content": "ssg-centos-7-ds.xml",
          "benchmark": {
            "id": "xccdf_org.ssgproject.content_benchmark_RHEL-7"
          },
          "profile": {
            "id": "xccdf_org.ssgproject.content_profile_pci-dss",
            "title": "PCI-DSS v3 Control Baseline for CentOS Linux 7"
          }
        },
        "check": {
          "title": "Set Lockout Time For Failed Password Attempts",
          "id": "xccdf_org.ssgproject.content_rule_accounts_passwords_pam_faillock_unlock_time",
          "result": "fail",
          "severity": "medium",
          "description": "To configure the system to lock out accounts after a number of incorrect login attempts and require an administrator to unlock the account using pam_faillock.so, modify the content of both /etc/pam.d/system-auth and /etc/pam.d/password-auth as follows: add the following line immediately before the pam_unix.so statement in the AUTH section: auth required pam_faillock.so preauth silent deny= unlock_time= fail_interval= add the following line immediately after the pam_unix.so statement in the AUTH section: auth [default=die] pam_faillock.so authfail deny= unlock_time= fail_interval= add the following line immediately before the pam_unix.so statement in the ACCOUNT section: account required pam_faillock.so",
          "rationale": "Locking out user accounts after a number of incorrect attempts prevents direct password guessing attacks. Ensuring that an administrator is involved in unlocking locked accounts draws appropriate attention to such situations.",
          "references": "AC-7(b) (http://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-53r4.pdf), 47 (http://iase.disa.mil/stigs/cci/Pages/index.aspx)",
          "identifiers": "CCE-26884-7 (http://cce.mitre.org)",
          "oval": {
            "id": "oval:ssg:def:166"
          }
        }
      },
      "decoder": {
        "parent": "oscap",
        "name": "oscap"
      },
      "location": "wodle_open-scap"
  }

When the scan finishes, a report event is sent which generates an alert:

.. code-block:: json

  {
      "timestamp": "2017-03-20T15:59:43-0700",
      "rule": {
        "level": 5,
        "description": "OpenSCAP Report overview: Score less than 80",
        "id": "81542",
        "firedtimes": 2,
        "groups": [
          "oscap",
          "oscap-report"
        ],
        "pci_dss": [
          "2.2"
        ]
      },
      "agent": {
        "id": "1040",
        "name": "ip-10-0-0-76",
        "ip": "10.0.0.76"
      },
      "manager": {
        "name": "vpc-ossec-manager"
      },
      "full_log": "oscap: msg: \"xccdf-overview\", scan-id: \"10401490050797\", content: \"ssg-centos-7-ds.xml\", benchmark-id: \"xccdf_org.ssgproject.content_benchmark_RHEL-7\", profile-id: \"xccdf_org.ssgproject.content_profile_common\", profile-title: \"Common Profile for General-Purpose Systems\", score: \"75.000000\".",
      "oscap": {
        "scan": {
          "id": "10401490050797",
          "content": "ssg-centos-7-ds.xml",
          "benchmark": {
            "id": "xccdf_org.ssgproject.content_benchmark_RHEL-7"
          },
          "profile": {
            "id": "xccdf_org.ssgproject.content_profile_common",
            "title": "Common Profile for General-Purpose Systems"
          },
          "score": "75.000000"
        }
      },
      "decoder": {
        "parent": "oscap",
        "name": "oscap"
      },
      "location": "wodle_open-scap"
  }


.. _oscap-examples:

Configuration
-------------

#. `Basic usage`_
#. `Evaluate PCI-DSS compliance on RHEL7`_
#. `Auditing Security Vulnerabilities of Red Hat Products`_
#. `Overwriting the timeout`_
#. `Using profiles`_
#. `Using CPE dictionary`_
#. `Using IDs`_


Basic usage
^^^^^^^^^^^

To configure the options for OpenSCAP go to :ref:`ossec.conf <reference_ossec_conf>`, or for more details about specific options, see the :ref:`OpenSCAP section <wodle_openscap>`.

In this example, we configure Wazuh to run OpenSCAP each day, with a timeout of 30 minutes. ::

  <wodle name="open-scap">
    <disabled>no</disabled>
    <timeout>1800</timeout>
    <interval>1d</interval>
    <scan-on-start>yes</scan-on-start>

    <content type="xccdf" path="ssg-centos-7-ds.xml">
      <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
      <profile>xccdf_org.ssgproject.content_profile_common</profile>
    </content>
  </wodle>

Evaluate PCI-DSS compliance on RHEL7
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
This section describes how to evaluate the Payment Card Industry Data Security Standard (PCI-DSS) compliance on Red Hat Enterprise Linux 7 agents.

**Step 1: Configure agents**

Each agent must be properly identified in order to know which policy and profile to execute.

Agent ``ossec.conf`` file:

::

  <client>
    <server>
      <address>10.0.1.4</address>
      <port>1514</port>
      <protocol>tcp</protocol>
    </server>
    <config-profile>redhat7</config-profile>
  </client>

**Step 2: Configure manager**

We want to execute the PCI-DSS profile of the SSG RH7 policy only on Red Hat 7 servers.

Manager ``/var/ossec/etc/shared/default/agent.conf`` file (assuming that the agent is on the ``default`` group):

::

  <agent_config profile="redhat7">

    <wodle name="open-scap">
      <content type="xccdf" path="ssg-rhel7-ds.xml">
        <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
      </content>
    </wodle>

  </agent_config>

**Step 3: Restart manager and agents**

To apply the new configuration, restart the manager:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart

And now, restart all the agents:

  .. code-block:: console

    # /var/ossec/bin/agent_control -R -a

If you prefer, you can restart a specific agent with the option ``-u <id>`` where **id** is the agent's id number.


**Step 4: See alerts**

When the evaluation is complete you will see the results as OSSEC alerts:

``/var/ossec/logs/alerts/alerts.log``

::

  ** Alert 1463752181.32768: - oscap,rule-result,pci_dss_2.2,
  2016 May 20 13:49:41 (RH_Agent) 10.0.1.7->wodle_open-scap
  Rule: 81529 (level 5) -> 'OpenSCAP rule failed (severity low).'
  oscap: msg: "rule-result", id: "47T7_Qd08gm4y8TSoD53", policy: "ssg-rhel7-ds.xml", profile: "xccdf_org.ssgproject.content_profile_pci-dss", rule_id: "xccdf_org.ssgproject.content_rule_sshd_set_idle_timeout", result: "fail", title: "Set SSH Idle Timeout Interval", ident: "CCE-26611-4", severity: "low".


::

  ** Alert 1463752181.33254: - oscap,report-overview,pci_dss_2.2,
  2016 May 20 13:49:41 (RH_Agent) 10.0.1.7->wodle_open-scap
  Rule: 81542 (level 4) -> 'OpenSCAP Report overview: Score less than 80'
  oscap: msg: "report-overview", id: "47T7_Qd08gm4y8TSoD53", policy: "ssg-rhel7-ds.xml", profile: "xccdf_org.ssgproject.content_profile_pci-dss", score: "56.835060" / "100.000000", severity of failed rules: "high": "1", "medium": "9", "low": "34", "n/a": "0".

``Kibana``

Note that each field is extracted to facilitate searches and analysis.

.. image:: ../../../images/wodles-oscap/pci-oscap.png
    :align: center
    :width: 100%

**Step 5: Dashboards**

Finally, you can explore all results using the OpenSCAP dashboards for Kibana.

.. image:: ../../../images/wodles-oscap/pci-dashboard.png
    :align: center
    :width: 100%


Auditing Security Vulnerabilities of Red Hat Products
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
The Red Hat Security Response Team provides OVAL definitions for all vulnerabilities (identified by CVE name) that affect Red Hat Enterprise Linux 3, 4, 5, 6 and 7. This enables users to perform a vulnerability scan and diagnose whether a system is vulnerable or not.

**Step 1: Configure agents**

Each agent must be properly identified in order to know which policy and profile to execute.

Agent ``ossec.conf``:

::

  <client>
    <server-ip>10.0.1.4</server-ip>
    <config-profile>redhat7</config-profile>
  </client>

**Step 2: Configure manager**

We want to execute the RedHat security policy only on Red Hat 7 servers.

Manager ``shared/agent.conf``:

::

  <agent_config profile="redhat7">

    <wodle name="open-scap">
      <content type="xccdf" path="com.redhat.rhsa-RHEL7.ds.xml"/>
    </wodle>

  </agent_config>

**Step 3: Restart manager and agents**

To apply the new configuration, restart the manager:

  a. For Systemd:

    .. code-block:: console

      # systemctl restart wazuh-manager

  b. For SysV Init:

    .. code-block:: console

      # service wazuh-manager restart

And now, restart all the agents:

  .. code-block:: console

    # /var/ossec/bin/agent_control -R -a

If you prefer, you can restart a specific agent with option ``-u <id>``.


**Step 4: See alerts**

When the evaluation is completed you will see the results as OSSEC alerts:

``/var/ossec/logs/alerts/alerts.log``

::

  ** Alert 1463757700.70731: mail  - oscap,rule-result,pci_dss_2.2,
  2016 May 20 15:21:40 (RH_Agent) 10.0.1.7->wodle_open-scap
  Rule: 81531 (level 9) -> 'OpenSCAP rule failed (severity high).'
  oscap: msg: "rule-result", id: "I0iLEGFi4iTkxjnL9LWQ", policy: "com.redhat.rhsa-RHEL7.ds.xml", profile: "no-profiles", rule_id: "xccdf_com.redhat.rhsa_rule_oval-com.redhat.rhsa-def-20160722", result: "fail", title: "RHSA-2016:0722: openssl security update (Important)", ident: "RHSA-2016-0722, CVE-2016-0799, CVE-2016-2105, CVE-2016-2106, CVE-2016-2107, CVE-2016-2108, CVE-2016-2109, CVE-2016-2842", severity: "high".



::

  ** Alert 1463757700.71339: - oscap,report-overview,pci_dss_2.2,
  2016 May 20 15:21:40 (RH_Agent) 10.0.1.7->wodle_open-scap
  Rule: 81540 (level 1) -> 'OpenSCAP Report overview.'
  oscap: msg: "report-overview", id: "I0iLEGFi4iTkxjnL9LWQ", policy: "com.redhat.rhsa-RHEL7.ds.xml", profile: "no-profiles", score: "92.617447" / "100.000000", severity of failed rules: "high": "8", "medium": "14", "low": "0", "n/a": "0".


``Kibana``

Note that each field is extracted to facilitate searches and analysis.

.. image:: ../../../images/wodles-oscap/oscap_example.png
    :align: center
    :width: 100%

.. image:: ../../../images/wodles-oscap/overview.png
    :align: center
    :width: 100%


**Step 5: Dashboards**

Finally, you can explore all scan results using the OpenSCAP dashboards for Kibana.

.. image:: ../../../images/wodles-oscap/dashboard.png
    :align: center
    :width: 100%

Overwriting the timeout
^^^^^^^^^^^^^^^^^^^^^^^

It is possible to overwrite the timeout for a specific evaluation: ::

    <wodle name="open-scap">

        <timeout>1800</timeout>

        <content type="xccdf" path="ssg-centos-7-ds.xml">
            <timeout>120</timeout>
        </content>

        <content type="xccdf" path="ssg-centos-6-ds.xml"/>

    </wodle>

Using profiles
^^^^^^^^^^^^^^

We can limit the evaluation to only specific profiles of a policy: ::

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos-7-ds.xml">
            <profile>xccdf_org.ssgproject.content_profile_standard</profile>
            <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
        </content>

        <content type="xccdf" path="ssg-centos-6-ds.xml"/>

    </wodle>

Using CPE dictionary
^^^^^^^^^^^^^^^^^^^^

You can also optionally specify the CPE dictionary file, which is used to determine which checks are relevant to specific platforms. ::

    <wodle name="open-scap">

        <content type="xccdf" path=policy="ssg-centos-7-ds.xml">
            <cpe>file.xml</cpe>
        </content>

        <content type="xccdf" path="ssg-centos-6-ds.xml" />

    </wodle>

Using IDs
^^^^^^^^^

You can select a specific ID of the datastream file:  ::

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos-7-ds.xml">
            <datastream-id>id</datastream-id>
            <xccdf-id>id</xccdf-id>
        </content>

        <content type="xccdf" path="ssg-centos-6-ds.xml" />

    </wodle>


.. _oscap-faq:

FAQ
---

#. `Is there a noticeable performance impact when the OpenSCAP wodle is enabled on an agent?`_
#. `Are evaluations executed in parallel?`_
#. `How does the interval work?`_
#. `Are the policies evaluated when OSSEC starts?`_
#. `Where are the policies?`_

Is there a noticeable performance impact when the OpenSCAP wodle is enabled on an agent?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The OpenSCAP wodle is designed to be very efficient, but the performance will depend on how fast oscap is (the scanner). Depending on the chosen policy, oscap can consume significant resources. We recommend you test your policies on a test agent before deploying them to production systems.


Are evaluations executed in parallel?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

No, each evaluation is executed sequentially.  Also, each profile of an evaluation is executed sequentially.  This makes scans take somewhat longer but also reduces the load on agents caused by those scans.


How does the interval work?
^^^^^^^^^^^^^^^^^^^^^^^^^^^

The interval is the intended amount of time between the commencements of subsequent OpenSCAP scans on an agent.  If a scan takes longer than the configured interval, an "interval overtaken" log message will be written to ``/var/ossec/log/ossec.log``, and when the scan is finished, it will start again immediately.


Are the policies evaluated when OSSEC starts?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Yes, by default, policies are evaluated when the wodle starts. You can change this by setting <scan-on-start> to 'no'. In this case, the next evaluation will be executed after the interval specified. The wodle state is saved when OSSEC is stopped.


Where are the policies?
^^^^^^^^^^^^^^^^^^^^^^^

Each agent must have its policies in ``/var/ossec/wodles/oscap/content``.
