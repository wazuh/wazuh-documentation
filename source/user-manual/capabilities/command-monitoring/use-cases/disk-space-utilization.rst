.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Configure the Wazuh Command module to check the root partition usage on a Linux endpoint and generate a finding when usage reaches 80%.

Monitoring disk space utilization
==================================

In this use case, we configure the Command module to check the usage of the root partition on a Linux endpoint every five minutes. Wazuh generates a finding when usage reaches 80%.

Configuration
--------------

Linux endpoint
^^^^^^^^^^^^^^^

#. Create a Bash script named ``disk-usage.sh`` in the ``/usr/local/bin/`` directory. The script prints a warning line only when the root partition usage reaches the threshold of 80%:

   .. code-block:: bash

      # tee /usr/local/bin/disk-usage.sh > /dev/null << 'EOF'
      #!/bin/bash
      THRESHOLD=80
      USAGE=$(df -P / | awk 'NR==2 {gsub("%",""); print $5}')
      if [ "$USAGE" -ge "$THRESHOLD" ]; then
        echo "disk-usage: WARNING root partition at ${USAGE}%"
      fi
      EOF

#. Make the ``/usr/local/bin/disk-usage.sh`` script executable:

   .. code-block:: console

      # chmod +x /usr/local/bin/disk-usage.sh

#. Get the SHA256 hash of the ``/usr/local/bin/disk-usage.sh`` script:

   .. code-block:: console

      # sha256sum /usr/local/bin/disk-usage.sh

#. Append the configuration below to the Wazuh agent ``/var/ossec/etc/ossec.conf`` file. Replace ``<SHA256_HASH>`` with the value from the previous step:

   .. code-block:: xml
      :emphasize-lines: 9

      <ossec_config>
        <wodle name="command">
          <disabled>no</disabled>
          <tag>disk-usage</tag>
          <command>/usr/local/bin/disk-usage.sh</command>
          <interval>5m</interval>
          <run_on_start>yes</run_on_start>
          <timeout>10</timeout>
          <verify_sha256><SHA256_HASH></verify_sha256>
        </wodle>
      </ossec_config>

   Where:

   -  The value ``/usr/local/bin/disk-usage.sh`` of the ``<command>`` option is the script the Command module executes. The script is the first argument, so the checksum verification applies to the script itself.
   -  The value ``5m`` of the ``<interval>`` option specifies that the script runs every five minutes.
   -  The value of the ``<verify_sha256>`` option is the hash the Command module compares against the script before every execution. When the hashes don't match, the module ignores the command.

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Wazuh dashboard
^^^^^^^^^^^^^^^^

Perform the steps below to create a rule to analyze the event received from the monitored Linux endpoint. The default ``decoder/wazuh-wodle/0`` decoder decodes the command output, including its ``tags`` and ``process.io.text``. If you haven't already done so, perform step 1 of the :ref:`Wazuh dashboard <command_monitoring_configuration_example_wazuh_dashboard>` section under Example configuration.

#. Navigate to **Ruleset management** > **Detection** > **Rules** and perform the following to create a detection rule.

   -  Select the space **Draft**
   -  Click **Actions** > **Create**, select the **YAML Editor**, choose the integration ``command-integration``, paste the detection rule shown below, and click **Create rule**:

      .. code-block:: yaml
         :emphasize-lines: 15,16

         id: 4d5d86bb-6b00-4ded-81d2-f06becaff812
         logsource:
           product: command-integration
         tags: []
         falsepositives: []
         level: critical
         status: experimental
         enabled: true
         detection:
           condition: Selection_1 and Selection_2
           Selection_2:
             process.io.text|contains:
               - 'disk-usage: WARNING'
           Selection_1:
             tags|re:
               - disk-usage
         metadata:
           title: Wazuh CM - Disk usage of the root partition exceeds 80%
           author: Security team lead
           description: Detects when the disk usage of the root partition reaches 80%
           references:
             - ''
           documentation: ''
           supports:
             - ''
           modified: '2026-07-15T17:47:25Z'
         compliance:
           pci_dss:
             - 10.6.1
           hipaa:
             - 164.312.b
           nist_800_53:
             - AU-6

#. Navigate to **Ruleset management** > **Overview**, select the space **Draft** and click **Actions** > **Promote** to promote the rule to the ``Test`` space.

   .. thumbnail:: /images/manual/command-monitoring/promote-draft-disk.png
      :title: Promoting the detection rule to Test
      :alt: Promoting the detection rule to Test
      :align: center
      :width: 80%

#. Navigate to **Ruleset management** > **Overview**, select the space **Test** and click **Actions** > **Promote** to promote the rule to the ``Custom`` space.

   .. thumbnail:: /images/manual/command-monitoring/promote-test-disk.png
      :title: Promoting the detection rule to Custom
      :alt: Promoting the detection rule to Custom
      :align: center
      :width: 80%

#. Navigate to **Ruleset management** > **Detection** > **Detectors** to create a detector that applies the detection rule and generates findings.

   -  Click **Create detector**, fill the required fields, and click **Create detector**:

      -  **Name**: wazuh-cm-detector
      -  **Select indexes/aliases**: wazuh-events-v5-system-activity (this must match the integration category you configured earlier, ``System Activity``)
      -  **Space**: Custom
      -  **Integration**: command-integration
      -  **Run every**: 2 minutes.

   .. thumbnail:: /images/manual/command-monitoring/create-detector-disk.png
      :title: Creating a detector
      :alt: Creating a detector
      :align: center
      :width: 80%

Test the configuration
------------------------

Perform the steps below on the monitored Ubuntu endpoint.

#. Check the size of the root partition:

   .. code-block:: console

      # df -P

   The command output looks similar to this:

   .. code-block:: none
      :class: output
      :emphasize-lines: 3

      Filesystem                        1024-blocks      Used Available Capacity Mounted on
      tmpfs                                  201500      1012    200488       1% /run
      /dev/mapper/ubuntu--vg-ubuntu--lv    31811408   4745136  25424800      16% /
      tmpfs                                 1007484         0   1007484       0% /dev/shm
      tmpfs                                    5120         0      5120       0% /run/lock
      /dev/sda2                             1992552    104804   1766508       6% /boot
      vagrant                             732556284 244033372 488522912      34% /vagrant
      tmpfs                                  201496        16    201480       1% /run/user/1000

#. Fill the disk to cross the threshold with the command below. Replace ``<SIZE>`` with enough space to raise the usage of the ``/`` partition above 80%, based on the output of the previous step. For example, ``20G`` for the disk shown above:

   .. code-block:: console

      # fallocate -l <SIZE> /tmp/big_file

#. Verify the size of the root partition has increased above the threshold:

   .. code-block:: console

      # df -P

   The command output looks similar to this:

   .. code-block:: none
      :class: output
      :emphasize-lines: 3

      Filesystem                        1024-blocks      Used Available Capacity Mounted on
      tmpfs                                  201500      1012    200488       1% /run
      /dev/mapper/ubuntu--vg-ubuntu--lv    31811408  25717728   4452208      86% /
      tmpfs                                 1007484         0   1007484       0% /dev/shm
      tmpfs                                    5120         0      5120       0% /run/lock
      /dev/sda2                             1992552    104804   1766508       6% /boot
      vagrant                             732556284 244031132 488525152      34% /vagrant
      tmpfs                                  201496        16    201480       1% /run/user/1000

Visualize the findings
------------------------

Navigate to **Threat Intelligence** > **Threat Hunting** > **Findings** on the Wazuh dashboard to view the generated finding when the disk usage of the ``/`` partition exceeds 80%.

.. thumbnail:: /images/manual/command-monitoring/dashboard-disk-usage-finding.png
   :title: Generated finding
   :alt: Generated finding
   :align: center
   :width: 80%

After visualizing the findings, remove the ``/tmp/big_file`` file on the monitored endpoint to regain your disk space:

.. code-block:: console

   # rm /tmp/big_file
