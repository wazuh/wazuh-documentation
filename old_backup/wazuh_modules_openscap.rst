.. _wazuh_modules_openscap:


OpenScap
============

Introduction
--------------

The **OpenSCAP wodle** is an integration of `OpenScap <https://www.open-scap.org/>`_ in *Wazuh HIDS* that provides the ability to perform configuration and vulnerability scans of an agent. Mainly it allows:

 - **Security compliance**: It is a state where computer systems are in line with a specific *security policy* or a *security benchmark*. These policies define security requirements which all systems of an organization must comply with.

 - **Vulnerability assessment**: It is a process that identifies and classifies vulnerabilities on a system.

 - **Specialized assessment**: It is a process that performs a specific set of checks. For example, a policy to detect suspicious file names and suspicious location of files.


Brief introduction to SCAP
+++++++++++++++++++++++++++++++++++

The `Security Content Automation Protocol (SCAP) <https://scap.nist.gov/>`_ is a specification for expressing and manipulating security data in standardized ways. SCAP uses several individual specifications in concert, in order to automate continuous monitoring, vulnerability management, and security policy compliance evaluation reporting.

Process of security compliance evaluation:

 - **SCAP scanner**: It is an application that reads a SCAP policy and checks whether or not the system is compliant with it. There are many `tools <https://nvd.nist.gov/scapproducts.cfm>`_ to scan your systems. This wodle is an integration with the NIST-certified scanner: **OpenSCAP**.

 - **Security policies (SCAP content)**: They determine how a system must be set up and what to check for. These policies contain machine-readable descriptions of the rules which your system will be required to follow.

  - **Profiles**: Each security policy can contain multiple profiles, which provide sets of rules and values implemented according to a specific security baseline. You can think of a profile as a particular subset of rules within the policy; the profile determines which rules defined in the policy are selected (checked) and what values are used during the evaluation.

 - **Evaluation (scan)**: It is the process to evaluate a policy with a SCAP scanner. The process usually takes a few minutes, depending on the number of selected rules.


Wodle Requirements
------------------------------

This wodle is executed on the agent, so each one must meet the following requirements:

OSSEC Wazuh HIDS
+++++++++++++++++++++
Wodles are part of *OSSEC Wazuh fork*, so install it following these `instructions <ToDo_Link>`_.

OpenScap
+++++++++++++++++++++
In order to perform SCAP evaluations we need the scanner. As we mentioned above, we use OpenSCAP. You can install it on RedHat or CentOS versions 6 and 7 with this command: ::

  yum install openscap-scanner

Python 2.6+
+++++++++++++++++++++
Python is a core part of this wodle. Currently all Linux distributions come with python, so it should not be an inconvenience.


SCAP Policies
------------------------------

Usually a policy consists of different files:

 - **OVAL (Open Vulnerability and Assessment Language)**: It is a declarative language for making logical assertions on the state of system.
 - **XCCDF (Extensible Configuration Checklist Description Format)**: It is used to describe the security checklists. The language does not contain any commands to perform the scan and it is mostly descriptive. **Other component documents (OVAL) may be referred from the XCCDF**.
 - **CPE (Common Platform Enumeration)**: It serves to identify IT platforms and systems using unequivocally defined names.
 - **DataStream** (files names end with **-ds.xml**): It is a format that packs other SCAP components into a single file.

The wodle parses the OVAL, XCCDF or DataStream policies. Remember that if you use a XCCDF policy that references to an OVAL file, the OVAL file must be in the same directory as the XCCDF file. We strongly recommend using DataStream files because they are easier to use. Here you will find more information about `SCAP components <https://www.open-scap.org/features/scap-components/>`_.

Available policies:

 - `SCAP Security Guide (SSG) <https://www.open-scap.org/security-policies/scap-security-guide/>`_: An open source project creating and providing SCAP security policies for various platforms:

  - RedHat and CentOS 6 and 7.

 - `RedHat Security Data <http://www.redhat.com/security/data/metrics/>`_: The Red Hat Security Response Team provides OVAL definitions for all vulnerabilities (identified by CVE name) that affect Red Hat Enterprise Linux 3, 4, 5, 6 and 7. This enables users to perform a vulnerability scan and diagnose whether their system is vulnerable or not.

  - RedHat 6 and 7.

You will find a wide variety of profiles in each policy, some of them are:

 - **Common Profile for General-Purpose Systems (common)**: It contains items common to general-purpose desktop and server installations.
 - **Server Baseline (server)**: It is a profile for systems acting as servers.
 - **United States Government Configuration Baseline (usgcb)**: profile for USGCB.
 - **Red Hat Corporate Profile for Certified Cloud Providers (rht-ccp)**: SCAP profile for Red Hat Certified Cloud Providers.
 - **PCI-DSS v3 Control Baseline (pci-dss)**: profile for PCI-DSS v3.
 - **Standard System Security Profile (standard)**: This profile contains rules to ensure a standard security base of a system.

The policies are located in ``/var/ossec/wodles/oscap/policies``.

Configuration
-------------

Use *ossec.conf* (manager or agent) or *agent.conf* to configure the wodle.

First, specify the wodle name: ::

    <wodle name="open-scap">
    ...
    </wodle>

Now, use the proper tags to define the OpenSCAP evaluations: ::

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos7-ds.xml">
            <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
        </content>

    </wodle>

These are the available tags:

==========================  ==============
 Tag                         Description
==========================  ==============
``timeout``                  Timeout for each evaluation (in seconds). Default value: 1800 seconds (30 minutes).
``interval``                 Space of time between OpenSCAP executions (in seconds). It can contain a prefix character: s (seconds), m (minutes), h (hours), d (days). Default value: 1d (one day).
``scan-on-start``            Run evaluation when on service start without waiting for interval. Values: yes, no. Default: yes.
``content``                  Define an evaluation.
``content:type``             Select content type: xccdf or oval.
``content:path``             Use the specified policy file (DataStream, XCCDF or OVAL).
``content->timeout``         Timeout for the evaluation (in seconds). It overwrites the generic timeout.
``content->xccdf-id``        XCCDF id.
``content->oval-id``         OVAL id.
``content->datastream-id``   Datastream id.
``content->cpe``             CPE dictionary file. Default path: /var/ossec/wodles/oscap/policies
``content->profile``         Select profile.
==========================  ==============


Basic configuration
++++++++++++++++++++++++++++++++++++++++++++

In this example, we configure OSSEC to run OpenSCAP each day. Each evaluation has a timeout of 30 minutes.

::

    <wodle name="open-scap">

        <timeout>1800</timeout>
        <interval>1d</interval>
        <scan-on-start>yes</scan-on-start>

        <content type="xccdf" path="ssg-centos7-ds.xml"/>
        <content type="xccdf" path="ssg-centos6-ds.xml"/>

    </wodle>


Overwriting timeout
++++++++++++++++++++++++++++++++++++++++++++
It is possible to overwrite the timeout for a specific evaluation: ::

    <wodle name="open-scap">

        <timeout>1800</timeout>

        <content type="xccdf" path="ssg-centos7-ds.xml">
            <timeout>120</timeout>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml"/>

    </wodle>

Profiles
++++++++++++++++++++++++++++++++++++++++++++
We can evaluate only specific profiles of a policy: ::

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos7-ds.xml">
            <profile>xccdf_org.ssgproject.content_profile_standard</profile>
            <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml"/>

    </wodle>

CPE dictionary
++++++++++++++++++++++++++++++++++++++++++++

If necessary, you can also specify the CPE file. ::

    <wodle name="open-scap">

        <content type="xccdf" path=policy="ssg-centos7-ds.xml">
            <cpe>file.xml</cpe>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml" />

    </wodle>

IDs
++++++++++++++++++++++++++++++++++++++++++++
You can select a specific ID of the datastream file:  ::

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos7-ds.xml">
            <datastream-id>id</datastream-id>
            <xccdf-id>id</xccdf-id>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml" />

    </wodle>


Frequently Asked Questions (FAQ)
-----------------------------------

Is there a noticeable performance impact when OpenSCAP wodle is enabled on an agent?
+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
The OpenSCAP wodle is designed to be very efficient, however the perfomance will depend on how fast oscap is (the scanner). Depending on the chosen policy, oscap can consume many resources. We recommend to test your policies in a test agent before deploying it in production.

Are evaluations executed in parallel?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
No, each evaluation is executed sequentially. That means when an evaluation is finished, the next is executed. Also, each profile of an evaluation is executed sequentially.

How does the interval work?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
The interval is the space of time between OpenSCAP executions. There are 2 scenarios:

 - Execution time less than interval: If you set an interval of 30 minutes, OpenSCAP will be executed each 30 minutes. So, if the evaluation takes 20 minutes, it will be executed again after 10 minutes.

 - Execution time more than interval: In this case, the log "interval overtaken" at /var/ossec/log/ossec.log will be generated and when the execution is finished, it will start again immediately.

Are the policies evaluated when OSSEC starts?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Yes, by default policies are evaluated when the wodle starts. Unless, you set <scan-on-start> to 'no'. In this case, the next evaluation will be executed after the interval specified. The wodle state is saved when OSSEC is stopped.

Where are the policies?
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Each agent must have its policies in ``/var/ossec/wodles/oscap/policies``.


Use cases
--------------

How to Evaluate PCI-DSS on RHEL7
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
This section describes how to evaluate the Payment Card Industry Data Security Standard (PCI-DSS) on Red Hat Enterprise Linux 7.

**Step 1: Configure agents**

Each agent must be properly identified in order to know which policy and profile to execute.

Agent ``ossec.conf``:

::

  <client>
    <server-ip>10.0.1.4</server-ip>
    <config-profile>redhat7</config-profile>
  </client>

**Step 2: Configure manager**

We want to execute the PCI-DSS profile of SSG RH7 policy only on Red Hat 7 servers.

Manager ``shared/agent.conf``:

::

  <agent_config profile="redhat7">

    <wodle name="open-scap">
      <content type="xccdf" path="ssg-rhel7-ds.xml">
        <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
      </content>
    </wodle>

  </agent_config>

**Step 3: Restart manager and agents**

To apply the new configuration restart the manager and agents:

::

  $ /var/ossec/bin/ossec-control restart
  $ /var/ossec/bin/agent_control -R -a

If you prefer, you can restart a specific agent with option ``-u <id>``.


**Step 4: See alerts**

When the evaluation is completed you will see the results as OSSEC alerts:

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

Note that each field is removed to facilitate searches.

.. image:: images/wodles-oscap/e1-alert1.png
    :align: center
    :width: 100%

.. image:: images/wodles-oscap/e1-alert2.png
    :align: center
    :width: 100%

**Step 5: Dashbaords**

Finally, you can explore all results using the OpenSCAP dashboards for Kibana.

.. image:: images/wodles-oscap/e1-dashboards.png
    :align: center
    :width: 100%

Auditing Security Vulnerabilities of Red Hat Products
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
The Red Hat Security Response Team provides OVAL definitions for all vulnerabilities (identified by CVE name) that affect Red Hat Enterprise Linux 3, 4, 5, 6 and 7. This enables users to perform a vulnerability scan and diagnose whether a system is vulnerable or not.

**Step 1: Configure agents**

Each agent must be properly identified in order to know which policy and profile execute.

Agent ``ossec.conf``:

::

  <client>
    <server-ip>10.0.1.4</server-ip>
    <config-profile>redhat7</config-profile>
  </client>

**Step 2: Configure manager**

We want to execute the RedHat secutiy policy only on Red Hat 7 servers.

Manager ``shared/agent.conf``:

::

  <agent_config profile="redhat7">

    <wodle name="open-scap">
      <content type="xccdf" path="com.redhat.rhsa-RHEL7.ds.xml"/>
    </wodle>

  </agent_config>

**Step 3: Restart manager and agents**

To apply the new configuration restart the manager and agents:

::

  $ /var/ossec/bin/ossec-control restart
  $ /var/ossec/bin/agent_control -R -a

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

Note that each field is removed to facilitate searches.

.. image:: images/wodles-oscap/e2-alert1.png
    :align: center
    :width: 100%

.. image:: images/wodles-oscap/e2-alert2.png
    :align: center
    :width: 100%

**Step 5: Dashbaords**

Finally, you can explore all results using the OpenSCAP dashboards for Kibana.

.. image:: images/wodles-oscap/e2-dashboards.png
    :align: center
    :width: 100%
