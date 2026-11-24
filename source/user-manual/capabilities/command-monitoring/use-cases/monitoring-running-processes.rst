.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Configure the Wazuh Command module to monitor running processes on Windows and Linux endpoints and generate a finding when a process is running.

Monitoring running processes
=============================

In this use case, you configure the Command module locally to run a script that monitors running processes on Windows and Linux endpoints. Then, you create a detection rule to generate a finding when a particular process is running. The default ``decoder/wazuh-command-monitoring/0`` decoder decodes the script output.

Configuration
--------------

Wazuh generates a finding when notepad.exe runs on the Windows endpoint or when nc (netcat) runs on the Linux endpoint.

Windows endpoint
^^^^^^^^^^^^^^^^^

Perform the following steps to configure the Command module to run a batch script on the Windows endpoint.

#. Create a batch script named ``process-check.bat`` in the ``C:\Program Files\`` folder and add the content below. The script lists running processes on Windows endpoints and prints the output ``process-check: WARNING notepad.exe is running`` when Notepad is running.

   .. code-block:: batch

      @echo off
      set "PROCESS=notepad.exe"

      tasklist /FI "IMAGENAME eq %PROCESS%" 2>NUL | find /I "%PROCESS%" >NUL
      if %ERRORLEVEL%==0 (
          echo process-check: WARNING %PROCESS% is running
      )

#. Get the SHA256 hash of the ``C:\Program Files\process-check.bat`` script by running the ``certutil`` utility in PowerShell:

   .. code-block:: powershell

      > certutil -hashfile "C:\Program Files\process-check.bat" SHA256

#. Append the configuration below to the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file. Replace ``<SHA256_HASH>`` with the hash of the script.

   .. code-block:: xml
      :emphasize-lines: 9

      <ossec_config>
        <wodle name="command">
          <disabled>no</disabled>
          <tag>process-check</tag>
          <command>"C:\Program Files\process-check.bat"</command>
          <interval>2m</interval>
          <run_on_start>yes</run_on_start>
          <timeout>10</timeout>
          <verify_sha256><SHA256_HASH></verify_sha256>
        </wodle>
      </ossec_config>

   Where:

   -  The ``"C:\Program Files\process-check.bat"`` value in the ``<command>`` option is the command the Command module executes.
   -  The ``2m`` value in the ``<interval>`` option specifies that the Command module executes the configured command every 2 minutes.

#. Restart the Wazuh agent to apply the changes using PowerShell with administrator privileges:

   .. code-block:: powershell

      > Restart-Service -Name wazuh

Linux endpoint
^^^^^^^^^^^^^^^

Perform the following steps to configure the Command module to run a Bash script on the Linux endpoint.

#. Create a Bash script named process-check.sh in the ``/usr/local/bin/`` directory with the command below. The script prints the output ``process-check: WARNING nc is running`` when the nc (netcat) process is running:

   .. code-block:: bash

      # tee /usr/local/bin/process-check.sh > /dev/null << 'EOF'
      #!/bin/bash
      PROCESS=nc
      if pgrep -x "$PROCESS" > /dev/null; then
        echo "process-check: WARNING $PROCESS is running"
      fi
      EOF

#. Make the ``/usr/local/bin/process-check.sh`` script executable:

   .. code-block:: console

      # chmod +x /usr/local/bin/process-check.sh

#. Get the SHA256 hash of the ``/usr/local/bin/process-check.sh`` script:

   .. code-block:: console

      # sha256sum /usr/local/bin/process-check.sh

#. Append the configuration below to the Wazuh agent ``/var/ossec/etc/ossec.conf`` file. Replace ``<SHA256_HASH>`` with the value from the previous step:

   .. code-block:: xml
      :emphasize-lines: 9

      <ossec_config>
        <wodle name="command">
          <disabled>no</disabled>
          <tag>process-check</tag>
          <command>/usr/local/bin/process-check.sh</command>
          <interval>2m</interval>
          <run_on_start>yes</run_on_start>
          <timeout>10</timeout>
          <verify_sha256><SHA256_HASH></verify_sha256>
        </wodle>
      </ossec_config>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Wazuh dashboard
^^^^^^^^^^^^^^^^

Perform the steps below to create a rule to analyze the event received from the monitored Windows and Linux endpoints. If you haven't already done so, perform step 1 of the :ref:`Wazuh dashboard <command_monitoring_configuration_example_wazuh_dashboard>` section under :ref:`Example configuration <command_monitoring_example_configuration>`.

#. Navigate to **Ruleset management** > **Detection** > **Rules** and perform the following to create a detection rule.

   -  Select the space **Draft**
   -  Click **Actions** > **Create**, select the **YAML Editor**, choose the integration ``command-integration``, paste the detection rule shown below, and click **Create rule**:

      .. code-block:: yaml

         id: fe516c10-998f-4c62-9f8a-c2889716be6b
         logsource:
           product: command-integration
         tags: []
         falsepositives: []
         level: medium
         status: experimental
         enabled: true
         detection:
           condition: Selection_1
           Selection_1:
             process.io.text|contains:
               - 'process-check: WARNING notepad.exe is running'
               - 'process-check: WARNING nc is running'
         metadata:
           title: Wazuh CM - A monitored process is running
           author: Security team
           description: Detects if the notepad.exe process (Windows) or the nc process (Linux) is running
           references:
             - ''
           documentation: ''
           supports:
             - ''
           modified: '2026-07-16T11:24:38Z'

   .. thumbnail:: /images/manual/command-monitoring/create-rule-process.png
      :title: Creating a detection rule
      :alt: Creating a detection rule
      :align: center
      :width: 80%

#. Navigate to **Ruleset management** > **Overview**, select the space **Draft** and click **Space actions** > **Promote** to promote the detection rule to the ``Test`` space. On the **Promote** page, click **Promote**. In the confirmation dialog, type ``promote`` and click **Promote**.

   .. thumbnail:: /images/manual/command-monitoring/promote-rule-draft-process.png
      :title: Promoting the detection rule to Test
      :alt: Promoting the detection rule to Test
      :align: center
      :width: 80%

#. Navigate to **Ruleset management** > **Overview**, select the space **Test**, and click **Space actions** > **Promote** to promote the detection rule to the ``Custom`` space. On the **Promote** page, click **Promote**. In the confirmation dialog, type ``promote`` and click **Promote**.

   .. thumbnail:: /images/manual/command-monitoring/promote-rule-test-process.png
      :title: Promoting the detection rule to Custom
      :alt: Promoting the detection rule to Custom
      :align: center
      :width: 80%

#. Navigate to **Ruleset management** > **Detection** > **Detectors** to create a detector that applies the detection rule and generates findings. A detector applies only the Custom-space rules that exist when you create it. To use an existing command-integration detector instead, edit it and add this rule under **Selected rules** > **Manage**.

   -  Click **Create detector**, fill the required fields, and click **Create detector**:

      -  **Name**: wazuh-process-detector
      -  **Select indexes/aliases**: wazuh-events-v5-system-activity (this must match the integration category you configured earlier, ``System Activity``)
      -  **Space**: Custom
      -  **Integration**: command-integration
      -  **Run every**: 2 minutes

   .. thumbnail:: /images/manual/command-monitoring/create-detector-process.png
      :title: Creating a detector
      :alt: Creating a detector
      :align: center
      :width: 80%

Test the configuration
------------------------

Launch the Notepad application on the monitored Windows endpoint to trigger the detection of the process. On the monitored Linux endpoint, start a netcat listener, for example with nc -l 4444, and leave it running for at least 2 minutes.

View the findings
-------------------

Navigate to **Threat intelligence** > **Threat Hunting**, then select the **Findings** tab on the Wazuh dashboard to view the generated finding:

.. thumbnail:: /images/manual/command-monitoring/wazuh-dashboard-process.png
   :title: Generated finding
   :alt: Generated finding
   :align: center
   :width: 80%
