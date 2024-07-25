.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Optimize disk space on Windows, Linux, and macOS. Learn how to monitor partitions to maintain defined free space limits in this use case.

Disk space utilization
======================

This use case involves monitoring the partitions on Windows, Linux, and macOS endpoints to determine whether a defined amount of free space is not exceeded. We use a centralized configuration to perform this on all the endpoints.

Disk space utilization on Windows endpoint
------------------------------------------

We use the PowerShell command, ``Get-Volume``, to get the free space and size of the available volumes on the filesystem. Then create a rule to trigger an alert when the free space of the ``C:`` drive is less than ``20%``.

Configuration
^^^^^^^^^^^^^

Windows endpoint
~~~~~~~~~~~~~~~~

Perform the following steps on the Windows endpoint.

#. Enable remote command execution on the Windows endpoint by appending the following settings to the ``C:\Program Files (x86)\ossec-agent\local_internal_options.conf`` file:

   .. warning:: Enable remote command execution with caution as this gives the Wazuh user permission to run any command on the endpoint.

   .. code-block:: xml

      logcollector.remote_commands=1

#. Restart the Wazuh agent to apply the changes, using PowerShell with administrator privileges:

   .. code-block:: PowerShell

      > Restart-Service -Name wazuh

Wazuh server
~~~~~~~~~~~~

Perform the following steps on the Wazuh server.

#. Append the following configuration to the ``/var/ossec/etc/shared/default/agent.conf`` file on the Wazuh server:

   .. code-block:: xml

      <agent_config os="Windows">
        <localfile>
          <log_format>command</log_format>
          <command>Powershell -c "Get-Volume -DriveLetter C | Select-Object -Property @{'Name' = '% Free'; Expression = {'{0:P}' -f ($_.SizeRemaining / $_.Size)}}"</command>
          <alias>check_win_disk_space</alias>
        </localfile>
      </agent_config>

   Where:

   - The value ``command`` of the ``<log_format>`` tag specifies the output of the command is read as multiple events.

   - The value ``Powershell -c "Get-Volume -DriveLetter C | Select-Object -Property @{'Name' = '% Free'; Expression = {'{0:P}' -f ($_.SizeRemaining / $_.Size)}}"`` of the ``<command>`` tag is the command the Logcollector module executes to get the percentage of free space available in the ``C:`` drive.

   - The value ``check_win_disk_space`` of the ``<alias>`` tag is a string that represents the ``Powershell -c "Get-Volume -DriveLetter C | Select-Object -Property @{'Name' = '% Free'; Expression = {'{0:P}' -f ($_.SizeRemaining / $_.Size)}}"`` command for better identification in creating rules.

   - Notice the absence of the ``<frequency>`` tag. This implies the command is scheduled to run periodically using the default frequency value of 360 seconds.

#. Add the following rules to the ``/var/ossec/etc/rules/local_rules.xml`` file on the Wazuh server:

   .. code-block:: xml

      <group name="disk_space_utilization,">
        <rule id="100014" level="7">
          <if_sid>530</if_sid>
          <match>^ossec: output: 'check_win_disk_space': </match>
          <regex type="pcre2">[0-1]\d.\d+%$</regex>
          <description>C: Drive free space less than 20%.</description>
        </rule>
      </group>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Visualize the alerts
^^^^^^^^^^^^^^^^^^^^

Go to **Threat Hunting** module on the Wazuh dashboard to visualize the generated alert when the free disk space is less than 20%.

.. thumbnail:: /images/manual/command-monitoring/windows-low-free-space-alert.png
  :title: Drive free space less than 20% alert
  :alt: Drive free space less than 20% alert
  :align: center
  :width: 100%


Disk space utilization on Linux endpoint
----------------------------------------

For this endpoint, we monitor the disk space using the ``df -h`` command and create a rule to trigger an alert when the disk usage of the ``/dev`` partition is above ``80%``. We use the Command module to define the configuration in this scenario. You can also use the Logcollector module.

Configuration
^^^^^^^^^^^^^

Linux endpoint
~~~~~~~~~~~~~~

Perform the following steps on the Linux endpoint.

#. Enable remote command execution on the Linux endpoint by appending the following settings to the ``/var/ossec/etc/local_internal_options.conf`` file:

   .. warning:: Enable remote command execution with caution as this gives the Wazuh user permission to run any command on the endpoint.

   .. code-block:: xml

      wazuh_command.remote_commands=1

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh server
~~~~~~~~~~~~

Knowing the Command module does have a default decoder for its log format, we need to figure out a way to format the command output so that a custom decoder can parse it. So, we leverage the below script to format the command output.

#. Create a bash script named ``disk-usage.sh`` in the ``/var/ossec/etc/shared/default/`` directory of the Wazuh server and add the following content. Wazuh pushes the script to the ``/var/ossec/etc/shared/`` directory on the Linux endpoint where it is executed. The script adds a ``disk-usage`` header to the output of the ``df -h`` command:

   .. code-block:: console

      #!/bin/bash
      df -h | while IFS= read -r line;
      do
        echo "disk-usage: "$line
      done

#. Append the following configuration to the ``/var/ossec/etc/shared/default/agent.conf`` file on the Wazuh server. Replace ``<MD5_HASH>``, ``<SHA1_HASH>``, and ``<SHA256_HASH>`` with the appropriate hashes of the ``/bin/bash`` shell binary on the Linux endpoint:

   .. code-block:: xml
      :emphasize-lines: 9,10,11

      <agent_config os="Linux">
        <wodle name="command">
          <disabled>no</disabled>
          <tag>disk-usage</tag>
          <command>/bin/bash /var/ossec/etc/shared/disk-usage.sh</command>
          <interval>2m</interval>
          <run_on_start>yes</run_on_start>
          <timeout>10</timeout>
          <verify_md5><MD5_HASH></verify_md5>
          <verify_sha1><SHA1_HASH></verify_sha1>
          <verify_sha256><SHA256_HASH></verify_sha256>
        </wodle>
      </agent_config>

   Where:

   - The value ``/bin/bash /var/ossec/etc/shared/disk-usage.sh`` of the ``<command>`` tag specifies the Command module uses the ``/bin/bash`` binary to execute the ``/var/ossec/etc/shared/disk-usage.sh`` script.

   - The value ``2m`` of the ``<interval>`` tag indicates that the command module runs the command every 2 minutes.

#. Add the following decoder to the ``/var/ossec/etc/decoders/local_decoder.xml`` file on the Wazuh server:

   .. code-block:: xml

      <decoder name="disk-usage">
        <prematch>^disk-usage: </prematch>
        <regex offset="after_prematch">(\S+)\s*(\S+)\s*(\S+)\s*(\S+)\s*(\S+)%\s*(\S+)</regex>
        <order>filesystem, size, used, available, usage, mnt</order>
      </decoder>

#. Add the following rules to the ``/var/ossec/etc/rules/local_rules.xml`` file on the Wazuh server. The rule generates an alert when the disk usage of the ``/dev`` partition exceeds ``80%``:

   .. code-block:: xml

      <group name="disk_space_utilization,">
        <rule id="100015" level="7">
          <decoded_as>disk-usage</decoded_as>
          <field name="filesystem">^/dev/</field>
          <field name="usage">^9\d|^8\d</field>
          <description>Usage $(usage)% of $(filesystem) partition exceeded 80%.</description>
        </rule>
      </group>

#. Restart the Wazuh manager to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Visualize the alerts
^^^^^^^^^^^^^^^^^^^^

Go to **Threat Hunting** module on the Wazuh dashboard to visualize the generated alerts when the disk usage of the ``/dev`` partition exceeds ``80%``.

.. thumbnail:: /images/manual/command-monitoring/partition-exceeded-80-alert.png
  :title: Partition exceeds 80% usage alert
  :alt: Partition exceeds 80% usage alert
  :align: center
  :width: 100%

Disk space utilization on macOS endpoint
----------------------------------------

For this endpoint, we monitor the disk space using the ``df -P`` command. Wazuh triggers a rule to generate an alert when the disk usage of the ``/dev`` partition is ``100%``. We use the Logcollector module to demonstrate this use case. You can also use the Command module.

Configuration
^^^^^^^^^^^^^

macOS endpoint
~~~~~~~~~~~~~~

Perform the following steps on the macOS endpoint.

#. Enable remote command execution on the macOS endpoint by appending the following settings to the ``/Library/Ossec/etc/local_internal_options.conf`` file:

   .. warning:: Enable remote command execution with caution as this gives the Wazuh user permission to run any command on the endpoint.

   .. code-block:: xml

      logcollector.remote_commands=1

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # 

Wazuh server
~~~~~~~~~~~~

Wazuh has an out-of-the-box rule with ID ``531`` that generates an alert when the disk usage of the ``/dev`` partition is ``100%``. The rule is defined below and is found in the `Wazuh GitHub repository <https://github.com/wazuh/wazuh-ruleset/blob/master/rules/0015-ossec_rules.xml>`__.

.. code-block:: xml

   <rule id="531" level="7" ignore="7200">
     <if_sid>530</if_sid>
     <match>ossec: output: 'df -P': /dev/</match>
     <regex>100%</regex>
     <description>Partition usage reached 100% (disk space monitor).</description>
     <group>low_diskspace,pci_dss_10.6.1,gpg13_10.1,gdpr_IV_35.7.d,hipaa_164.312.b,nist_800_53_AU.6,tsc_CC7.2,tsc_CC7.3,</group>
   </rule>

Perform the following steps on the Wazuh server.

#. Append the following configuration to the ``/var/ossec/etc/shared/default/agent.conf`` file on the Wazuh server:

   .. code-block:: xml

      <agent_config os="macOS">
        <localfile>
          <log_format>command</log_format>
          <command>df -P</command>
          <frequency>180</frequency>
        </localfile>
      </agent_config>

   Where:

   - The value ``command`` of the ``<log_format>`` tag specifies the output of the command is read as multiple events.

   - The value ``df -P`` of the ``<command>`` tag specifies the command the Logcollector module executes.

   - The value ``180`` of the ``<frequency>`` tag specifies the command runs every 180 seconds (3 minutes).

Test the configuration
~~~~~~~~~~~~~~~~~~~~~~

Run the following command on the macOS endpoint to fill the disk space with random data of ``10GB``. This action can take approximately 45 seconds:

   .. code-block:: console

      # df -h .; date; dd if=/dev/zero of=big_file count=10240000 bs=1024 ; date; df -h .

.. note::

   - Depending on the size of your disk, you can increase the value of ``count`` to fill up more disk space.

   - After viewing the generated alert on the Wazuh dashboard, you can remove the file ``big_file`` to regain your disk space.

Visualize the alerts
^^^^^^^^^^^^^^^^^^^^

Go to **Threat Hunting** module on the Wazuh dashboard to visualize the generated alert when the disk usage of the ``/dev`` partition is ``100%``.

.. thumbnail:: /images/manual/command-monitoring/macos-partition-usage-reached-100.png
  :title: Partition exceeds 80% usage alert
  :alt: Partition exceeds 80% usage alert
  :align: center
  :width: 100%
