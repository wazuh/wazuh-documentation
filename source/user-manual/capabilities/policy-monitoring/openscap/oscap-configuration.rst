.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the OpenSCAP wodle, an integration of OpenSCAP with Wazuh HIDS that provides the ability to perform configuration and vulnerability scans of an agent. 
  
.. _oscap-examples:

Configuration
=============

#. `Basic usage`_
#. `Evaluate PCI-DSS compliance on RHEL7`_
#. `Auditing Security Vulnerabilities of Red Hat Products`_
#. `Overwriting the timeout`_
#. `Using profiles`_
#. `Using CPE dictionary`_
#. `Using IDs`_


Basic usage
-----------

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
------------------------------------
This section describes how to evaluate the Payment Card Industry Data Security Standard (PCI-DSS) compliance on Red Hat Enterprise Linux 7 agents.

**Step 1: Configure the agents**

Each agent must be properly identified in order to know which policy and profile to execute. To do this, configure ``<config-profile>`` with the desired identifier.

Modify the ``ossec.conf`` file in the agent side to apply the desired profile:

.. code-block:: xml

  <client>
    <server>
      <address>10.0.1.4</address>
      <port>1514</port>
      <protocol>tcp</protocol>
    </server>
    <config-profile>redhat7</config-profile>
  </client>

After this, restart the agents to apply the configuration.

.. code-block:: console

    # 

If you prefer, you can restart a specific agent with option ``-u <id>``.

**Step 2: Configure shared settings**

We want to execute the PCI-DSS profile of the SSG RH7 policy only on Red Hat 7 agents.

To do this, modify the ``/var/ossec/etc/shared/default/agent.conf`` file in the manager (assuming that the agent is on the ``default`` group):

.. code-block:: xml

  <agent_config profile="redhat7">

    <wodle name="open-scap">
      <content type="xccdf" path="ssg-rhel7-ds.xml">
        <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
      </content>
    </wodle>

  </agent_config>

When the agents receive this configuration, they will restart to apply the changes and start the evaluation.

**Step 3: See alerts**

When the evaluation is complete, you will see the results as OSSEC alerts:

``/var/ossec/logs/alerts/alerts.log``

.. code-block:: none
  :class: output

  ** Alert 1463752181.32768: - oscap,rule-result,pci_dss_2.2,
  2016 May 20 13:49:41 (RH_Agent) 10.0.1.7->wodle_open-scap
  Rule: 81529 (level 5) -> 'OpenSCAP rule failed (severity low).'
  oscap: msg: "rule-result", id: "47T7_Qd08gm4y8TSoD53", policy: "ssg-rhel7-ds.xml", profile: "xccdf_org.ssgproject.content_profile_pci-dss", rule_id: "xccdf_org.ssgproject.content_rule_sshd_set_idle_timeout", result: "fail", title: "Set SSH Idle Timeout Interval", ident: "CCE-26611-4", severity: "low".

.. code-block:: none
  :class: output

  ** Alert 1463752181.33254: - oscap,report-overview,pci_dss_2.2,
  2016 May 20 13:49:41 (RH_Agent) 10.0.1.7->wodle_open-scap
  Rule: 81542 (level 4) -> 'OpenSCAP Report overview: Score less than 80'
  oscap: msg: "report-overview", id: "47T7_Qd08gm4y8TSoD53", policy: "ssg-rhel7-ds.xml", profile: "xccdf_org.ssgproject.content_profile_pci-dss", score: "56.835060" / "100.000000", severity of failed rules: "high": "1", "medium": "9", "low": "34", "n/a": "0".

``Wazuh dashboard``

You can see the logs in **Threat Hunting** by adding the filter ``rule.groups:oscap``. Note that each field is extracted to facilitate searches and analysis.

.. thumbnail:: ../../../../images/wodles-oscap/pci-oscap.png
    :title: PCI OpenSCAP alert
    :alt: PCI OpenSCAP alert
    :align: center
    :width: 100%



Auditing Security Vulnerabilities of Red Hat Products
-----------------------------------------------------
The Red Hat Security Response Team provides OVAL definitions for all vulnerabilities (identified by CVE name) that affect Red Hat Enterprise Linux 3, 4, 5, 6, and 7. This enables users to perform a vulnerability scan and diagnose whether a system is vulnerable or not.

**Step 1: Configure the agents**

Each agent must be properly identified in order to know which policy and profile to execute. To do this, configure ``<config-profile>`` with the desired identifier.

Modify the ``ossec.conf`` file in the agent side to apply the desired profile:

.. code-block:: xml

  <client>
    <server>
      <address>10.0.1.4</address>
      <port>1514</port>
      <protocol>tcp</protocol>
    </server>
    <config-profile>redhat7</config-profile>
  </client>

After this, restart the agents to apply the configuration.

.. code-block:: console

  # 

If you prefer, you can restart a specific agent with option ``-u <id>``.

**Step 2: Configure the manager**

We only want to execute the RedHat security policy on Red Hat 7 agents.

To do this, modify the ``/var/ossec/etc/shared/default/agent.conf`` file in the manager (assuming that the agent is on the ``default`` group):

.. code-block:: xml

  <agent_config profile="redhat7">

    <wodle name="open-scap">
      <content type="xccdf" path="com.redhat.rhsa-RHEL7.ds.xml"/>
    </wodle>

  </agent_config>

When the agents receive this configuration, they will restart to apply the changes and start the auditing.

**Step 3: See alerts**

When the evaluation is completed, you will see the results as OSSEC alerts:

``/var/ossec/logs/alerts/alerts.log``

..  code-block:: none
  :class: output


  ** Alert 1463757700.70731: mail  - oscap,rule-result,pci_dss_2.2,
  2016 May 20 15:21:40 (RH_Agent) 10.0.1.7->wodle_open-scap
  Rule: 81531 (level 9) -> 'OpenSCAP rule failed (severity high).'
  oscap: msg: "rule-result", id: "I0iLEGFi4iTkxjnL9LWQ", policy: "com.redhat.rhsa-RHEL7.ds.xml", profile: "no-profiles", rule_id: "xccdf_com.redhat.rhsa_rule_oval-com.redhat.rhsa-def-20160722", result: "fail", title: "RHSA-2016:0722: openssl security update (Important)", ident: "RHSA-2016-0722, CVE-2016-0799, CVE-2016-2105, CVE-2016-2106, CVE-2016-2107, CVE-2016-2108, CVE-2016-2109, CVE-2016-2842", severity: "high".


..  code-block:: none
  :class: output


  ** Alert 1463757700.71339: - oscap,report-overview,pci_dss_2.2,
  2016 May 20 15:21:40 (RH_Agent) 10.0.1.7->wodle_open-scap
  Rule: 81540 (level 1) -> 'OpenSCAP Report overview.'
  oscap: msg: "report-overview", id: "I0iLEGFi4iTkxjnL9LWQ", policy: "com.redhat.rhsa-RHEL7.ds.xml", profile: "no-profiles", score: "92.617447" / "100.000000", severity of failed rules: "high": "8", "medium": "14", "low": "0", "n/a": "0".


``Wazuh dashboard``

You can see the logs in **Threat Hunting** by adding the filter ``rule.groups:oscap``. Note that each field is extracted to facilitate searches and analysis.

.. thumbnail:: ../../../../images/wodles-oscap/oscap-example.png
    :title: OpenSCAP alert example
    :alt: OpenSCAP alert example
    :align: center
    :width: 100%

.. thumbnail:: ../../../../images/wodles-oscap/oscap-overview.png
    :title: OpenSCAP alert overview
    :alt: OpenSCAP alert overview
    :align: center
    :width: 100%



Overwriting the timeout
-----------------------

It is possible to overwrite the timeout for a specific evaluation:

..  code-block:: xml

    <wodle name="open-scap">

        <timeout>1800</timeout>

        <content type="xccdf" path="ssg-centos-7-ds.xml">
            <timeout>120</timeout>
        </content>

        <content type="xccdf" path="ssg-centos-6-ds.xml"/>

    </wodle>

Using profiles
--------------

We can limit the evaluation to only specific profiles of a policy:

..  code-block:: xml

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos-7-ds.xml">
            <profile>xccdf_org.ssgproject.content_profile_standard</profile>
            <profile>xccdf_org.ssgproject.content_profile_pci-dss</profile>
        </content>

        <content type="xccdf" path="ssg-centos-6-ds.xml"/>

    </wodle>

Using CPE dictionary
--------------------

You can also optionally specify the CPE dictionary file, which is used to determine which checks are relevant to specific platforms.

..  code-block:: xml

    <wodle name="open-scap">

        <content type="xccdf" path=policy="ssg-centos-7-ds.xml">
            <cpe>file.xml</cpe>
        </content>

        <content type="xccdf" path="ssg-centos-6-ds.xml" />

    </wodle>

Using IDs
---------

You can select a specific ID of the datastream file:

..  code-block:: xml

    <wodle name="open-scap">

        <content type="xccdf" path="ssg-centos-7-ds.xml">
            <datastream-id>id</datastream-id>
            <xccdf-id>id</xccdf-id>
        </content>

        <content type="xccdf" path="ssg-centos-6-ds.xml" />

    </wodle>
