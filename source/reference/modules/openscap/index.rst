.. _openscap_reference:


OpenSCAP
========================

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
------------------------------------------------------------------

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
------------------------------------------------------------------
It is possible to overwrite the timeout for a specific evaluation: ::

    <wodle name="open-scap">

        <timeout>1800</timeout>

        <content type="xccdf" path="ssg-centos7-ds.xml">
            <timeout>120</timeout>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml"/>

    </wodle>

Profiles
------------------------------------------------------------------
We can evaluate only specific profiles of a policy: ::

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos7-ds.xml">
            <profile>xccdf_org.ssgproject.content_profile_standard</profile>
            <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml"/>

    </wodle>

CPE dictionary
------------------------------------------------------------------

If necessary, you can also specify the CPE file. ::

    <wodle name="open-scap">

        <content type="xccdf" path=policy="ssg-centos7-ds.xml">
            <cpe>file.xml</cpe>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml" />

    </wodle>

IDs
------------------------------------------------------------------
You can select a specific ID of the datastream file:  ::

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos7-ds.xml">
            <datastream-id>id</datastream-id>
            <xccdf-id>id</xccdf-id>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml" />

    </wodle>
