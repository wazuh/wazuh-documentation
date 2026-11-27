.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps meet the CMMC Incident Response (IR) requirements, with use cases for blocking SSH brute-force attacks and exporting the findings of an incident.

Incident Response (IR)
======================

IR.L2-3.6.1 Incident Handling
-----------------------------

IR.L2-3.6.1 requires you to establish an operational incident-handling capability that includes preparation, detection, analysis, containment, recovery, and user response activities.

Wazuh helps meet IR.L2-3.6.1 with active responses.

Use case: Blocking SSH brute-force attacks on an Ubuntu endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to block the source IP address of failed SSH logins on a monitored Ubuntu 24.04 endpoint with the ``block-ip`` active response. Each SSH connection with failed logins generates one ``Failed authentication attempt`` finding, which maps to AC.L2-3.1.1, AU.L2-3.3.1, and IA.L2-3.5.1. The active response adds firewall rules that drop the traffic from the attacker.

.. note::

   You need a second endpoint with SSH access to the Ubuntu endpoint to simulate the attack. Don't use the Wazuh manager or the computer that you manage the Ubuntu endpoint from, because the active response blocks the IP address of the attacker.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Explore** > **Active Responses**.

#. Click **Create active response** and enter the following details. The ``block-ip`` executable is an out-of-the-box script that exists on every Wazuh agent. The **Local** location runs the script on the endpoint that generated the finding. The **Stateless** type runs the script once and never reverts its action.

   +----------------+------------------------+
   | **Field**      | **Value**              |
   +================+========================+
   | **Name**       | ``ssh_brute_force_ar`` |
   +----------------+------------------------+
   | **Executable** | ``block-ip``           |
   +----------------+------------------------+
   | **Type**       | Stateless              |
   +----------------+------------------------+
   | **Location**   | Local                  |
   +----------------+------------------------+

   .. thumbnail:: /images/compliance/cmmc/ssh-brute-force-active-response.png
      :title: Create the ssh_brute_force_ar active response
      :alt: Create the ssh_brute_force_ar active response
      :align: center
      :width: 80%

#. Click **Create** to save the active response.

#. Go to **Explore** > **Alerting**, switch to the **Monitors** tab, and then click **Create monitor**.

#. Fill in the following parameters. The **Active Response monitor** type runs the active response that you select in the **Actions** subsection when a finding matches the query. This filter selects the findings of the ``Failed authentication attempt`` rule by its title. Don't filter on ``wazuh.rule.id``: rule IDs change when the Wazuh CTI ruleset is updated.

   +-----------------------------+---------------------------------------+
   | **Field**                   | **Value**                             |
   +=============================+=======================================+
   | **Monitor name**            | ``ssh_brute_force_ar_monitor``        |
   +-----------------------------+---------------------------------------+
   | **Monitor type**            | Active Response monitor               |
   +-----------------------------+---------------------------------------+
   | **Monitor defining method** | Visual editor                         |
   +-----------------------------+---------------------------------------+
   | **Frequency**               | By interval                           |
   +-----------------------------+---------------------------------------+
   | **Run every**               | 1 Minute(s)                           |
   +-----------------------------+---------------------------------------+
   | **Index**                   | ``wazuh-findings-v5-system-activity`` |
   +-----------------------------+---------------------------------------+
   | **Query name**              | ``ssh_brute_force_ar_query``          |
   +-----------------------------+---------------------------------------+
   | **Field**                   | ``wazuh.rule.title``                  |
   +-----------------------------+---------------------------------------+
   | **Operator**                | is                                    |
   +-----------------------------+---------------------------------------+
   | **Value**                   | ``Failed authentication attempt``     |
   +-----------------------------+---------------------------------------+

   .. thumbnail:: /images/compliance/cmmc/ssh-brute-force-monitor.png
      :title: Create the ssh_brute_force_ar_monitor monitor
      :alt: Create the ssh_brute_force_ar_monitor monitor
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters.

   +-----------------------------+--------------------------------+
   | **Field**                   | **Value**                      |
   +=============================+================================+
   | **Trigger name**            | ``ssh_brute_force_ar_trigger`` |
   +-----------------------------+--------------------------------+
   | **Severity level**          | 1 (Highest)                    |
   +-----------------------------+--------------------------------+
   | **Specify queries or tags** | ``ssh_brute_force_ar_query``   |
   +-----------------------------+--------------------------------+

#. In the **Actions** subsection, click **Add active response** and fill in the following parameters.

   +---------------------+-------------------------------+
   | **Field**           | **Value**                     |
   +=====================+===============================+
   | **Action name**     | ``ssh_brute_force_ar_action`` |
   +---------------------+-------------------------------+
   | **Active response** | ``ssh_brute_force_ar``        |
   +---------------------+-------------------------------+

   .. thumbnail:: /images/compliance/cmmc/ssh-brute-force-trigger-action.png
      :title: Add the trigger and action of the SSH brute-force monitor
      :alt: Add the trigger and action of the SSH brute-force monitor
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

Attacker endpoint
~~~~~~~~~~~~~~~~~

#. Make sure that the ``testuser`` account doesn't exist on the Ubuntu endpoint. Replace ``<UBUNTU_IP_ADDRESS>`` with the IP address of the Ubuntu endpoint and run the following command. Enter a wrong password at each of the three prompts:

   .. code-block:: console

      $ ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no testuser@<UBUNTU_IP_ADDRESS>

   The monitor runs every minute and triggers the ``block-ip`` active response for the new findings.

#. Wait three minutes, then run the command again to confirm that the Ubuntu endpoint blocks the attacker endpoint:

   .. code-block:: console

      $ ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no testuser@<UBUNTU_IP_ADDRESS>

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      ssh: connect to host <UBUNTU_IP_ADDRESS> port 22: Connection timed out

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Run the following command to check the block. Replace ``<ATTACKER_IP>`` with the IP address of the attacker endpoint. The output shows one DROP rule for each blocked SSH connection:

   .. code-block:: console

      $ sudo iptables -S INPUT | grep <ATTACKER_IP>

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      -A INPUT -s <ATTACKER_IP>/32 -j DROP

Wazuh dashboard
~~~~~~~~~~~~~~~

Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab. Enter the following query in the search bar to see the findings that triggered the active response:

.. code-block:: none

   wazuh.rule.title:"Failed authentication attempt"

.. thumbnail:: /images/compliance/cmmc/ssh-brute-force-findings.png
   :title: Findings that triggered the active response
   :alt: Findings that triggered the active response
   :align: center
   :width: 80%

Go to **Security operations** > **Incident Response** and switch to the **Responses** tab. Each row shows a run of the ``ssh_brute_force_ar`` active response with the ``block-ip`` executable on the Ubuntu endpoint.

.. thumbnail:: /images/compliance/cmmc/ssh-brute-force-responses.png
   :title: Runs of the ssh_brute_force_ar active response
   :alt: Runs of the ssh_brute_force_ar active response
   :align: center
   :width: 80%

After you finish this use case, delete the ``ssh_brute_force_ar_monitor`` monitor in **Explore** > **Alerting** and the ``ssh_brute_force_ar`` active response in **Explore** > **Active Responses**. Then remove the firewall rules on the Ubuntu endpoint so that the attacker endpoint can connect again. The ``block-ip`` active response adds a rule to the ``INPUT`` and ``FORWARD`` chains for each finding, and the **Stateless** type never removes them:

.. code-block:: console

   $ while sudo iptables -D INPUT -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done
   $ while sudo iptables -D FORWARD -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done

IR.L2-3.6.2 Incident Reporting
------------------------------

IR.L2-3.6.2 requires you to track, document, and report incidents to designated officials and authorities, inside and outside your organization.

Wazuh helps meet IR.L2-3.6.2 by exporting the findings of an incident to a CSV file from the Wazuh dashboard.

Use case: Exporting the findings of an incident for a report
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to export the high and critical findings of an Ubuntu endpoint for the last hour, so that you can attach them to an incident report.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, click **Explore agent**, and select the endpoint. Then switch to the **Findings** tab.

#. Set the time picker to the period of the incident, for example **Last 1 hour**, and enter the following query to keep the high and critical findings:

   .. code-block:: none

      wazuh.rule.level:(high or critical)

   .. thumbnail:: /images/compliance/cmmc/export-findings-query.png
      :title: Query for the high and critical findings
      :alt: Query for the high and critical findings
      :align: center
      :width: 80%

#. Click **Export Formatted**. The Wazuh dashboard downloads a CSV file with the findings and confirms the number of exported rows.

   .. thumbnail:: /images/compliance/cmmc/export-findings-csv.png
      :title: Export the findings to a CSV file
      :alt: Export the findings to a CSV file
      :align: center
      :width: 80%

Use the CSV file to describe the affected endpoint, the timeline, and the detected techniques in your report.
