.. _wazuh_modules_openscap:


OpenScap
============

Introduction
--------------

The **OpenSCAP wodle** is an integration of *OpenScap* in *Wazuh HIDS* that gives the ability to perform configuration and vulnerability scans of an agent. Mainly it allows:

 - **Security compliance**: It is a state where computer systems are in line with a specific *security policy* or a *security benchmark*. These policies define security requirements which all systems used by the institution must meet.

 - **Vulnerability assessment**: It is a process that identifies and classifies vulnerabilities on a system.


Brief introduction to OpenSCAP
-----------------------------------------

The `Security Content Automation Protocol (SCAP) <https://scap.nist.gov/>`_ is a specification for expressing and manipulating security data in standardized ways. SCAP uses several individual specifications in concert to automate continuous monitoring, vulnerability management, and security policy compliance evaluation reporting.

Process of security compliance evaluation:
++++++++++++++++++++++++++++++++++++++++++++
 - **SCAP scanner**: it is an application that reads SCAP security policy and checks whether or not the system is compliant with it. It goes through all rules defined in the policy one by one and reports whether each rule is fulfilled. If all checks pass, the system is compliant with the security policy. OpenSCAP offers many tools to scan your systems. We use NIST-certified OpenSCAP Scanner: **oscap**.
 - **Security policies (SCAP content)**: They determine how a system must be set up and what to check for. These policies contain machine-readable descriptions of the rules which your system will be required to follow.

  - **Profiles**: Each security policy can contain multiple profiles, which provide sets of rules and values implemented according to a specific security baseline. You can think of a profile as a particular subset of rules within the policy; the profile determines which rules defined in the policy are selected (checked) and what values are used during the evaluation.

 - **Evaluation (scan)**: The process usually takes a few minutes, depending on the number of selected rules.


OpenSCAP integration with Wazuh HIDS
++++++++++++++++++++++++++++++++++++++++++++
The next sections will describe how to configure your environment in order to be able to run the wodle OpenSCAP.


Wodle Requirements
------------------------------

Each agent must meet the following requirements:

 - OSSEC Wazuh HIDS.
 - oscap.
 - Python 2.6+.
 - Scap Policies.

**ToDo**


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


Policies
---------

Policies are defined by 2 types of files:

 - Data Stream (files names end with -ds.xml): it is a format that packs other SCAP components into a single file ...
 - XCCDF: It is used to describe the security checklists. ...

  - OVAL: It is used to describe security vulnerabilities or desired configuration of systems. OVAL definitions define a secure state of some objects in a computer ....

Also, ... :

 - CPE
 - Variable

Link to policies...


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
