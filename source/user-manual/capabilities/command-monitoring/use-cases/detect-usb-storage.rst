.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Discover how to use Wazuh command monitoring capability to detect USB storage device connections on Windows endpoints.

Detect USB Storage
==================

In this use case, we configured the Wazuh agent to detect when a USB storage device is connected to a Windows endpoint. Then we create rules to generate alerts when the USB device is detected.

Configuration
-------------

Windows endpoint
^^^^^^^^^^^^^^^^

On the Windows endpoint, we want to monitor the output of the ``USBSTOR`` registry entry using the ``reg Query`` command. Then, we create a rule to trigger an alert when the command output contains a value.

Perform the following steps on the Windows endpoint.

#. Enable remote command execution on the Windows endpoint by appending the following settings to the ``C:\Program Files (x86)\ossec-agent\local_internal_options.conf`` file:

   .. warning:: Enable remote command execution with caution as this gives the Wazuh user permission to run any command on the endpoint.

   .. code-block:: xml

      logcollector.remote_commands=1

#. Restart the Wazuh agent to apply the changes, using PowerShell with administrator privileges:

   .. code-block:: PowerShell

      > Restart-Service -Name wazuh

Wazuh server
^^^^^^^^^^^^

Perform the following steps on the Wazuh server.

#. Append the following configuration to the ``/var/ossec/etc/shared/default/agent.conf`` file on the Wazuh server:

   .. code-block:: xml

      <agent_config os="Windows">
        <localfile>
          <log_format>command</log_format>
          <command>reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR</command>
          <alias>check_usb_connetivity</alias>
        </localfile>
      </agent_config>

   Where:

   - The value ``command`` of the ``<log_format>`` tag specifies the output of the command is read as multiple events.

   - The value ``reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR`` of the ``<command>`` tag is the command the Logcollector module executes to know if a USB device is attached to the endpoint.

   - The value ``check_usb_connetivity`` of the ``<alias>`` tag is a string that represents the ``reg QUERY HKLM\SYSTEM\CurrentControlSet\Enum\USBSTOR`` command for better identification in creating rules.   

#. Add the following rules to the ``/var/ossec/etc/rules/local_rules.xml`` file on the Wazuh server:

   .. code-block:: xml

      <group name="detect_usb_storage,">
        <rule id="100016" level="7">
          <if_sid>530</if_sid>
          <match>^ossec: output: 'check_usb_connetivity':</match>
          <description>New USB device connected</description>
        </rule>
      </group>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Test the configuration
----------------------

Trigger the alert by plugging a USB storage to the Windows endpoint.

Visualize the alerts
--------------------

Go to **Modules > Security events** tab on the Wazuh dashboard to visualize the generated alert when a USB device is connected to the Windows endpoint.

.. thumbnail:: /images/manual/command-monitoring/new-usb-device-alert.png
  :title: New USB device connected alert
  :alt: New USB device connected alert
  :align: center
  :width: 100%


