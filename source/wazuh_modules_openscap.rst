.. _wazuh_modules_openscap:


OpenScap
============

Introduction
--------------

The **OpenSCAP wodle** is an integration of `OpenScap <https://www.open-scap.org/>`_ in *Wazuh HIDS* that gives the ability to perform configuration and vulnerability scans of an agent. Mainly it allows:

 - **Security compliance**: It is a state where computer systems are in line with a specific *security policy* or a *security benchmark*. These policies define security requirements which all systems used by the institution must meet.

 - **Vulnerability assessment**: It is a process that identifies and classifies vulnerabilities on a system.

 - **Specialized assessment**: It is a process that performs a specific set of checks. For example, a policy to detect suspicious file names and suspicious location of files.


Brief introduction to SCAP
+++++++++++++++++++++++++++++++++++

The `Security Content Automation Protocol (SCAP) <https://scap.nist.gov/>`_ is a specification for expressing and manipulating security data in standardized ways. SCAP uses several individual specifications in concert to automate continuous monitoring, vulnerability management, and security policy compliance evaluation reporting.

Process of security compliance evaluation:

 - **SCAP scanner**: It is is an application that reads a SCAP policy and checks whether or not the system is compliant with it. There are many `tools <https://nvd.nist.gov/scapproducts.cfm>` to scan your systems. This wodle is an integration with the NIST-certified scanner: **OpenSCAP**.

 - **Security policies (SCAP content)**: They determine how a system must be set up and what to check for. These policies contain machine-readable descriptions of the rules which your system will be required to follow.

  - **Profiles**: Each security policy can contain multiple profiles, which provide sets of rules and values implemented according to a specific security baseline. You can think of a profile as a particular subset of rules within the policy; the profile determines which rules defined in the policy are selected (checked) and what values are used during the evaluation.

 - **Evaluation (scan)**: It is the process to evaluate a policy with a SCAP scanner. The process usually takes a few minutes, depending on the number of selected rules.


Wodle Requirements
------------------------------

This wodle is executed in the agent so each one must meet the following requirements:

OSSEC Wazuh HIDS
+++++++++++++++++++++
Wodles are part of *OSSEC Wazuh fork*, so install it following these `instructions <ToDo_Link>`_.

OpenScap
+++++++++++++++++++++
In order to perform SCAP evaluations we need the scanner. As we mentioned above, we use OpenSCAP. You can install it on RedHat or CentOS versions 6 and 7 with this command: ::

  yum install openscap-scanner

Python 2.6+
+++++++++++++++++++++
Python is a core part of this wodle. Currently all Linux distribution comes with python, so it should not be an inconvenient.


SCAP Policies
------------------------------

Usually a policy consists of different files:

 - OVAL (Open Vulnerability and Assessment Language): It is declarative language for making logical assertions about the state of system.
 - XCCDF (Extensible Configuration Checklist Description Format): It is used to describe the security checklists. The language contains no commands to perform the scan and it is mostly descriptive. **Other component documents (OVAL) may be referred from the XCCDF**.
 - CPE (Common Platform Enumeration): It serves to identify IT platforms and systems using unequivocally defined names.
 - DataStream (files names end with -ds.xml): It is a format that packs other SCAP components into a single file.

The wodle admits XCCDF or DataStream policies. Remember that if you use a XCCDF policy that references to an OVAL file, you must place the OVAL file on the same path that the XCCDF file. We strongly recommend using DataStream files because they are easier to use. Here you will find more information about `SCAP components <https://www.open-scap.org/features/scap-components/>`_.

Available policies:
 - `SCAP Security Guide (SSG) <https://www.open-scap.org/security-policies/scap-security-guide/>`_: An open source project creating and providing SCAP security policies for various platforms:
  - RedHat and CentOS 6 and 7.
 - `RedHat Security Data <http://www.redhat.com/security/data/metrics/>`_: The Red Hat Security Response Team provides OVAL definitions for all vulnerabilities (identified by CVE name) that affect Red Hat Enterprise Linux 3, 4, 5, 6 and 7. This enable users to perform a vulnerability scan and diagnose whether system is vulnerable or not.
  - RedHat 6 and 7.

**ToDo**:
 - By default with the wodle
 - Explain profiles


Configuration
-------------

Use *ossec.conf* (manager or agent) or *agent.conf* to configure the wodle.

First, specify the wodle name: ::

    <wodle name="open-scap">
    ...
    </wodle>

Now, use the proper tags to define the OpenSCAP evaluations: ::

    <wodle name="open-scap">
        <interval>1d</interval>

        <eval policy="ssg-centos7-ds.xml" timeout="300">
            <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
        </eval>

    </wodle>

These are the available tags:

=========================  ==============
 Tag                        Description
=========================  ==============
``timeout``                 Timeout for each evaluation (in seconds). Default value: 300 seconds (5 minutes).
``interval``                Space of time between OpenSCAP executions (in seconds). It can contain a prefix character: s (seconds), m (minutes), h (hours), d (days). Default value: 1d (one day).
``scan-on-start``           Run evaluation when on service start without waiting for interval. Values: yes, no. Default: yes.
``skip-result``             Do not read results with the specified result value. Values: pass, fail, notchecked, notapplicable, fixed, informational, error, unknown, notselected. Default: pass, notchecked, notapplicable, notselected.
``skip-severity``           Do not read results with the specified severity value. Values: low, medium, high.
``eval``                    Define an evaluation.
``eval:policy``             Use the specified policy (DataStream or XCCDF).
``eval:timeout``            Timeout for the evaluation (in seconds). It overwrites generic timeout.
``eval->xccdf-id``          XCCDF id.
``eval->datastream-id``     Datastream id.
``eval->cpe``               CPE dictionary file. Default path: /var/ossec/wodles/oscap/policies
``eval->profile``           Select profile.
``eval->skip-result``       skip-result for the scan. It overwrites generic skip-result.
``eval->skip-severity``     skip-severity for the scan. It overwrites generic skip-severity.
=========================  ==============

Basic configuration
++++++++++++++++++++++++++++++++++++++++++++
In this example, we configure OSSEC to run OpenSCAP each day. Each evaluation has a timeout of 300 seconds. We do not receive results with *notchecked* or *notapplicable* status or with *low* severity. The policies to evalute are for Centos 6 and 7.

::

    <wodle name="open-scap">

        <timeout>300</timeout>
        <interval>1d</interval>
        <scan-on-start>yes</scan-on-start>
        <skip-result>pass,notchecked,notapplicable,notselected</skip-result>
        <skip-severity>low</skip-severity>

        <eval policy="ssg-centos7-ds.xml"/>
        <eval policy="ssg-centos6-ds.xml"/>

    </wodle>


Overwriting timeout
++++++++++++++++++++++++++++++++++++++++++++
It is possible to overwrite the timeout for a specific evaluation: ::

    <wodle name="open-scap">

        <timeout>600</timeout>

        <eval policy="ssg-centos7-ds.xml" timeout="120"/>

        <eval policy="ssg-centos6-ds.xml"/>

    </wodle>

Profiles
++++++++++++++++++++++++++++++++++++++++++++
We can evaluate only a specific profile of a policy: ::

    <wodle name="open-scap">

        <eval policy="ssg-centos7-ds.xml">
            <profile>xccdf_org.ssgproject.content_profile_standard</profile>
            <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
        </eval>

        <eval policy="ssg-centos6-ds.xml"/>

    </wodle>

Skips
++++++++++++++++++++++++++++++++++++++++++++
In this example, we skip the results with low severity, but in case of the Centos 7 policy we want to skip the results with low and medium severity. However, for Centos 6 policy we do not want to skip any result.
::

    <wodle name="open-scap">

        <skip-result>notchecked,notapplicable,notselected</skip-result>
        <skip-severity>low</skip-severity>

        <eval policy="ssg-centos7-ds.xml">
            <skip-result>notchecked,notapplicable,notselected,pass</skip-result>
            <skip-severity>low,medium</skip-result>
        </eval>

        <eval policy="ssg-centos6-ds.xml">
            <skip-severity></skip-severity>
        </eval>

        <eval policy="ssg-centos5-ds.xml"/>

    </wodle>

CPE dictionary
++++++++++++++++++++++++++++++++++++++++++++

If necessary, you can specify CPE and variable files. ::

    <wodle name="open-scap">

        <eval policy="ssg-centos7-ds.xml">
            <cpe>file.xml</cpe>
        </eval>

        <eval policy="ssg-centos6-ds.xml" />

    </wodle>

IDs
++++++++++++++++++++++++++++++++++++++++++++
You can select a specific IDs of the datastrem file:  ::

    <wodle name="open-scap">

        <eval policy="ssg-centos7-ds.xml">
            <datastream-id>id</datastream-id>
            <xccdf-id>id</xccdf-id>
        </eval>

        <eval policy="ssg-centos6-ds.xml" />

    </wodle>



Use cases
--------------

Make a RHEL7 machine PCI-DSS compliant

JSON ALERTS, KIBANA...


How to Evaluate a DISA STIG


...info:
Security compliance
Vulnerability assessment:
https://www.open-scap.org/tools/openscap-base/
Make a RHEL7 machine PCI-DSS compliant
https://www.open-scap.org/resources/documentation/make-a-rhel7-server-compliant-with-pci-dss/
How to Evaluate a DISA STIG
https://www.open-scap.org/resources/documentation/perform-vulnerability-scan-of-rhel-6-machine/


Reference
--------------
https://www.open-scap.org/features/security-compliance/
https://www.open-scap.org/features/vulnerability-assessment/
https://www.open-scap.org/features/scap-components/
