.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Learn to monitor network changes with the Linux netstat command and generate alerts when TCP socket changes occur.

Check if the output changed
===========================

In this use case, we use the Linux ``netstat`` command with the ``check_diff`` option to monitor for changes by listening to the network ``tcp`` sockets. Then, we create rules to generate alerts when there is a change in the ``tcp`` socket output.

Configuration
-------------

Linux endpoint
^^^^^^^^^^^^^^

For this endpoint, we configure Wazuh to monitor the output of the Linux ``netstat`` command and alert when a change is detected.

Perform the following steps on the Linux endpoint.

#. Install ``netstat`` on the Linux endpoint:

   .. code-block:: console

      $ sudo apt install net-tools

#. Append the following configuration to the Wazuh agent ``/var/ossec/etc/ossec.conf`` file:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>full_command</log_format>
          <command>netstat -tulpn | sed 's/\([[:alnum:]]\+\)\ \+[[:digit:]]\+\ \+[[:digit:]]\+\ \+\(.*\):\([[:digit:]]*\)\ \+\([0-9\.\:\*]\+\).\+\ \([[:digit:]]*\/[[:alnum:]\-]*\).*/\1 \2 == \3 == \4 \5/' | sort -k 4 -g | sed 's/ == \(.*\) ==/:\1/' | sed 1,2d</command>
          <alias>netstat listening ports</alias>
          <frequency>360</frequency>
        </localfile>
      </ossec_config>

   Where:

   - The ``full_command`` value of the ``<log_format>`` tag specifies the output of the command is read as multiple events.

   - The value of the ``<command>`` tag specifies the output of the command is read as a single event.

#. Restart the Wazuh agent service to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh server
^^^^^^^^^^^^

Wazuh has an out-of-the-box rule with ID ``533`` that generates an alert when there is a change in the ``netstat`` listening ports. The rule is defined below and is found in the `Wazuh GitHub repository <https://github.com/wazuh/wazuh-ruleset/blob/master/rules/0015-ossec_rules.xml>`__.

   .. code-block:: xml

      <rule id="533" level="7">
          <if_sid>530</if_sid>
          <match>ossec: output: 'netstat listening ports</match>
          <check_diff />
          <description>Listened ports status (netstat) changed (new port opened or closed).</description>
          <group>pci_dss_10.2.7,pci_dss_10.6.1,gpg13_10.1,gdpr_IV_35.7.d,hipaa_164.312.b,nist_800_53_AU.14,nist_800_53_AU.6,tsc_CC6.8,tsc_CC7.2,tsc_CC7.3,</group>
      </rule>

Test the configuration
----------------------

We trigger a port change in the Linux endpoint by changing the default ``ssh`` port from ``22`` to ``2021``. Follow the steps below to simulate this.

#. Edit the ``ssh_config`` file:

   .. code-block:: console

      # nano /etc/ssh/ssh_config

#. Add port ``2021`` as the new ``ssh`` port:

   .. code-block:: console
      :emphasize-lines: 2

      #Port 22
      Port 2021
      #AddressFamily any
      #ListenAddress 0.0.0.0
      #ListenAddress ::

#. Restart the ssh service:

   .. code-block:: console

      # systemctl restart ssh

Visualize the alerts
--------------------

Go to **Modules > Security events** tab on the Wazuh dashboard to visualize the alert showing the changes in the network.

.. thumbnail:: /images/manual/command-monitoring/ports-status-changed-alert.png
  :title: Listened ports status (netcat) changed alert
  :alt: Listened ports status (netcat) changed alert
  :align: center
  :width: 100%