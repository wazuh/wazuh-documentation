.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Explore Log data collection use cases: Learn to forward Linux logs using rsyslog, detect Windows applications installation, and monitor PowerShell activity.

Use cases
=========

Forwarding Linux logs using rsyslog
-----------------------------------

In this use case, we configure a CentOS 7 endpoint to forward logs using rsyslog to the Wazuh server for analysis. On the CentOS 7 endpoint, we create and delete the user account ``Stephen``. Wazuh has default rules that generate alerts for the creation and deletion of user accounts.

CentOS endpoint
^^^^^^^^^^^^^^^

Perform the following steps to forward logs using rsyslog to the Wazuh server.

#. Edit the ``/etc/rsyslog.conf`` file and add the following configuration:

   .. code-block:: xml

      *.info@@<WAZUH_SERVER_IP_ADDRESS>:514

   Where:

      - ``<WAZUH_SERVER_IP_ADDRESS>`` represents the IP address of the Wazuh server.

#. Restart the rsyslog service to apply the change:

   .. code-block:: console

      # systemctl restart rsyslog

Wazuh server
^^^^^^^^^^^^

Perform the following steps to configure the Wazuh server to receive logs from the CentOS 7 endpoint.

#. Edit the ``/var/ossec/etc/ossec.conf`` file and add the following configuration in between the ``<ossec_config>`` tags:

   .. code-block:: xml

      <remote>
        <connection>syslog</connection>
        <port>514</port>
        <protocol>tcp</protocol>
        <allowed-ips><LINUX_ENDPOINT_IP_ADDRESS></allowed-ips>
      </remote>

   Where:

      - ``<LINUX_ENDPOINT_IP_ADDRESS>`` represents the IP address of the CentOS 7 endpoint.

#. Restart the Wazuh manager for the changes to take effect:

   .. code-block:: console

      # systemctl restart wazuh-manager

Test the configuration 
^^^^^^^^^^^^^^^^^^^^^^

Perform the following on the CentOS 7 endpoint to test the configuration.

#. Add the user ``Stephen``:

   .. code-block:: xml

      # useradd Stephen 

#. Delete the same user ``Stephen``:

   .. code-block:: xml

      # userdel Stephen

Navigate to **Threat Hunting** tab on the Wazuh dashboard to view the alerts.   

.. note:: 
   :class: not-long
   
   You can filter for only the CentOS endpoint events by taking the following steps.

   #. Click on the **Add filter** button.
   #. Search for “location” in the **Field** input, then select the ``is`` **Operator**. 
   #. Enter the IP address of the CentOS 7 endpoint as the **Value**, and click **save**.

The image below shows an alert for user creation.

.. thumbnail:: /images/manual/log-data-collection/new-user-added.png
    :title: New user added to the system
    :alt: New user added to the system
    :align: center
    :width: 80%

The image below shows an alert for user deletion.

.. thumbnail:: /images/manual/log-data-collection/user-deleted.png
    :title: User deleted from the system
    :alt: User deleted from the system
    :align: center
    :width: 80%

Detecting the installation of applications on Windows
-----------------------------------------------------

In this use case, we detect when an application is installed on a Windows endpoint. We test this use case by installing an application called Dr. Memory.

Dr. Memory is an open source memory monitoring tool capable of detecting invalid memory accesses, memory leaks, handle leaks, accesses to freed memory, and other memory-related issues.

Windows endpoint
^^^^^^^^^^^^^^^^

#. Download and install `Dr. Memory <https://drmemory.org/page_download.html>`_.

By default, the Wazuh agent monitors the installation of applications using the configuration below located in the Wazuh agent configuration file ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

   .. code-block:: xml

      <localfile>
        <location>Application</location>
        <log_format>eventchannel</log_format>
      </localfile>

Wazuh server
^^^^^^^^^^^^

Wazuh has a built-in rule ``60612`` to detect when an application is installed on a Windows endpoint. You can view this rule in the ``/var/ossec/ruleset/rules/0585-win-application_rules.xml`` file on the Wazuh server.

   .. code-block:: xml

      <rule id="60612" level="3">
        <if_sid>60609</if_sid>
        <field name="win.system.eventID">^11707$|^1033$</field>
        <options>no_full_log</options>
        <description>Application installed $(win.eventdata.data).</description>
      </rule>

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^

After installing Dr. Memory, navigate to **Threat Hunting** on the Wazuh dashboard and apply the filter ``rule.id:60612`` to view the alert.

.. thumbnail:: /images/manual/log-data-collection/application-installed.png
    :title: Application installed
    :alt: Application installed
    :align: center
    :width: 80%

Monitoring PowerShell activity
------------------------------

In this use case, we configure Wazuh to detect when PowerShell adds a new Windows registry key. 

Windows endpoint
^^^^^^^^^^^^^^^^
Perform the following steps to enable PowerShell logging on a Windows endpoint and configure the Wazuh agent to monitor logged PowerShell activities.

#. Press **Windows + R** keys on your keyboard to open the run dialog box.

#. Type **gpedit.msc** in the search box and click **OK** to open the local group policy editor.

#. Navigate to **Computer Configuration > Administrative Templates > Windows Components > Windows PowerShell > Turn on PowerShell Script Block Logging**.

   .. note:: Turning on **PowerShell Script Block Logging** will log a lot of PowerShell events in the ``Microsoft-Winndows-PowerShell/Operational`` event channel.

#. Select **Enabled**, and then click **OK**.

#. Add the following in between the ``<ossec_config>`` tags of the Wazuh agent configuration file ``C:\Program Files (x86)\ossec-agent\ossec.conf`` to monitor PowerShell logs:

   .. code-block:: xml

      <localfile>
        <location>Microsoft-Windows-PowerShell/Operational</location>
        <log_format>eventchannel</log_format>
      </localfile>

#. Restart the Wazuh agent via PowerShell with administrator privileges to apply the change:

   .. code-block:: PowerShell

      > Restart-Service -Name wazuh

Wazuh server
^^^^^^^^^^^^

Wazuh has a built-in rule ``91843`` to detect when a PowerShell adds a new Windows registry key. You can view this rule in the ``/var/ossec/ruleset/rules/0915-win-powershell_rules.xml`` file on the Wazuh server:

   .. code-block:: xml

      <rule id="91843" level="3">
        <if_sid>91802</if_sid>
        <field name="win.eventdata.scriptBlockText" type="pcre2">(?i)New-ItemProperty.+\-Path</field>
        <options>no_full_log</options>
        <description>Powershell executed "New-ItemProperty -Path". Possible addition of new item to registry</description>
        <mitre>
          <id>T1059.001</id>
          <id>T1112</id>
        </mitre>
      </rule>

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^

Perform the following steps to test the configuration:

#. On the Windows endpoint, run the following command via PowerShell with administrator privileges to add a registry entry ``NoofAlerts`` to the ``HKLM\Software\Microsoft\ADs`` registry key, and set the value to 2:

   .. code-block:: PowerShell

      > New-ItemProperty -Path "HKLM:\Software\Microsoft\ADs" -Name "NoofAlerts" -Value 2

   .. note:: We recommend running the above command in a sandbox environment, and not in a production environment.

#. Navigate to **Threat Hunting** on the Wazuh dashboard and apply the ``rule.id:91843`` filter to view the alert.

.. thumbnail:: /images/manual/log-data-collection/monitoring-Powershell.png
    :title: Monitoring PowerShell activity
    :alt: Monitoring PowerShell activity
    :align: center
    :width: 80%