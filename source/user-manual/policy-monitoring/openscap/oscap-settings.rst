.. _oscap_settings:


Settings
========================


To configure the options for OpenSCAP go to :ref:`ossec.conf <reference_ossec_conf>`, or for more details about specific options, see the :ref:`OpenSCAP section <wodle_openscap>`.

Below are some configuration examples.


Basic configuration
------------------------------------------------------------------

In this example, we configure Wazuh to run OpenSCAP each day, with a timeout of 30 minutes. ::

    <wodle name="open-scap">

        <timeout>1800</timeout>
        <interval>1d</interval>
        <scan-on-start>yes</scan-on-start>

        <content type="xccdf" path="ssg-centos7-ds.xml"/>
        <content type="xccdf" path="ssg-centos6-ds.xml"/>

    </wodle>


Overwriting the timeout
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
We can limit the evaluation to only specific profiles of a policy: ::

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos7-ds.xml">
            <profile>xccdf_org.ssgproject.content_profile_standard</profile>
            <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
        </content>

        <content type="xccdf" path="ssg-centos6-ds.xml"/>

    </wodle>

CPE dictionary
------------------------------------------------------------------

You can also optionally specify the CPE dictionary file, which is used to determine which checks are relevant to specific platforms. ::

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
