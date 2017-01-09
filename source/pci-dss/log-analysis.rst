.. _pci_dss_log_analysis:

Log analysis
============

Here we will use Wazuh log analysis collection and analysis capabilities to meet the following PCI DSS controls:

+ *10.2.4*: Invalid logical access attempts.

+ *10.2.5*: Use of and changes to identification and authentication mechanisms —including but not limited to creation of new accounts and escalation of privileges— and all changes, additions, or deletions to accounts with root or administrative privileges.

These controls require us to log invalid logical access attempts, multiple invalid login attempts (possible brute force attacks), escalation privileges, changes in accounts, etc. In order to achieve this, we have added PCI DSS tags to OSSEC log analysis rules, mapping them to the corresponding requirement. This way, it will be easy to analyze and visualize our PCI DSS related alerts.

The syntax used for rule tagging is **pci_dss_** followed by the number of the requirement. In this case those would be: pci_dss_10.2.4 and pci_dss_10.2.5.

See below examples of OSSEC rules tagged for PCI requirements 10.2.4 and 10.2.5:

::

    <!--apache: access attempt -->
    <rule id="30105" level="5">
        <if_sid>30101</if_sid>
        <match>denied by server configuration</match>
        <description>Attempt to access forbidden file or directory.</description>
        <group>access_denied,pci_dss_6.5.8,pci_dss_10.2.4,</group>
    </rule>

    <!-- syslog-sudo: elevation of privileges -->
    <rule id="5401" level="5">
        <if_sid>5400</if_sid>
        <match>incorrect password attempt</match>
        <description>Failed attempt to run sudo</description>
        <group>pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="5402" level="3">
        <if_sid>5400</if_sid>
        <regex> ; USER=root ; COMMAND=| ; USER=root ; TSID=\S+ ; COMMAND=</regex>
        <description>Successful sudo to ROOT executed</description>
        <group>pci_dss_10.2.5,pci_dss_10.2.2,</group>
    </rule>

    <!-- ssh: identification and authentication mechanisms -->
    <rule id="5712" level="10" frequency="6" timeframe="120" ignore="60">
        <if_matched_sid>5710</if_matched_sid>
        <description>SSHD brute force trying to get access to </description>
        <description>the system.</description>
        <same_source_ip />
        <group>authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,</group>
    </rule>

    <rule id="5720" level="10" frequency="6">
        <if_matched_sid>5716</if_matched_sid>
        <same_source_ip />
        <description>Multiple SSHD authentication failures.</description>
        <group>authentication_failures,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_11.4,</group>
    </rule>


Use cases
---------

In this scenario, we try to open the file *cardholder_data.txt*. Since our current user doesn't have read access to the file, we run *sudo* to elevate privileges.

.. thumbnail:: ../images/pci/log_analysis_1.png
    :title: Sudo command on agent
    :align: center
    :width: 75%

Using *sudo* log analysis decoder and rules, OSSEC will generate an alert for this particular action. Since we have JSON output enabled, we can see the alert in both files *alerts.log* and *alerts.json*. Using the rule tags we can also see which PCI DSS requirements are specifically related to this alert.

.. thumbnail:: ../images/pci/log_analysis_2.png
    :title: Alert on Wazuh Manager
    :align: center
    :width: 100%

.. thumbnail:: ../images/pci/log_analysis_3.png
    :title: JSON alert output
    :align: center
    :width: 100%

Kibana displays information in an organized way, allowing filtering by different type of alert fields, including compliance controls. We have also developed some specific dashboards to display the PCI DSS related alerts.

.. thumbnail:: ../images/pci/log_analysis_4.png
    :title: Alert visualization on Kibana discover
    :align: center
    :width: 100%

.. thumbnail:: ../images/pci/log_analysis_5.png
    :title: Wazuh PCI DSS dashboard for Kibana
    :align: center
    :width: 100%
