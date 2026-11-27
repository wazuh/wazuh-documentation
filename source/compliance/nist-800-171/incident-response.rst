.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet the NIST SP 800-171 Incident Response requirements 3.6.1 and 3.6.2 with active response and findings export use cases.

Incident Response (3.6)
=======================

3.6.1 Establish an operational incident-handling capability
-----------------------------------------------------------

Requirement 3.6.1 states, "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities."

Wazuh helps meet requirement 3.6.1 with active responses.

Use case: Blocking SSH brute-force attacks on an Ubuntu endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to block the source IP address of failed SSH logins on a monitored Ubuntu 24.04 endpoint with the ``block-ip`` active response. Each SSH connection with failed logins generates one ``Failed authentication attempt`` finding, which maps to 3.1.1, 3.3.1, and 3.5.1. The active response adds firewall rules that drop the traffic from the attacker.

.. note::

   You need a second endpoint with SSH access to the Ubuntu endpoint to simulate the attack. Don't use the Wazuh manager or the computer that you manage the Ubuntu endpoint from. The active response blocks the IP address of the attacker.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Explore** > **Active Responses**.

#. Click **Create active response** and enter the following details.

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

   .. thumbnail:: /images/compliance/nist-800-171/create-active-response-ssh-brute-force.png
      :title: Create active response
      :alt: Create active response
      :align: center
      :width: 80%

#. Click **Create** to save the active response.

#. Go to **Explore** > **Alerting**, switch to the **Monitors** tab, and then click **Create monitor**.

#. Fill in the following parameters. This filter selects the findings of the ``Failed authentication attempt`` rule by its title. Don't filter on ``wazuh.rule.id``: rule IDs change when the Wazuh CTI ruleset is updated.

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

   .. thumbnail:: /images/compliance/nist-800-171/create-monitor-ssh-brute-force.png
      :title: Create an Active Response monitor
      :alt: Create an Active Response monitor
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

   .. thumbnail:: /images/compliance/nist-800-171/create-trigger-action-ssh-brute-force.png
      :title: Create an Active Response monitor trigger and action
      :alt: Create an Active Response monitor trigger and action
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

Attacker endpoint
~~~~~~~~~~~~~~~~~

#. Make sure that the ``testuser`` account doesn't exist on the Ubuntu endpoint. Replace ``<UBUNTU_IP_ADDRESS>`` with the IP address of the Ubuntu endpoint and run the following command. Enter a wrong password at each of the three prompts:

   .. code-block:: console

      $ ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no testuser@<UBUNTU_IP_ADDRESS>

   Each SSH connection generates one ``Failed authentication attempt`` finding. The monitor runs every minute and triggers the ``block-ip`` active response for the new findings.

#. Wait three minutes, then run the command again to confirm that the Ubuntu endpoint blocks the attacker endpoint:

   .. code-block:: console

      $ ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no testuser@<UBUNTU_IP_ADDRESS>

   Output:

   .. code-block:: none
      :class: output

      ssh: connect to host <UBUNTU_IP_ADDRESS> port 22: Connection timed out

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Run ``sudo iptables -S INPUT | grep <ATTACKER_IP>`` to check the block. Replace ``<ATTACKER_IP>`` with the IP address of the attacker endpoint. The output shows a ``DROP`` rule for each finding, one for each blocked SSH connection.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab. Enter the following query in the search bar to see the findings that triggered the active response:

   .. code-block:: none

      wazuh.rule.title:"Failed authentication attempt"

   .. thumbnail:: /images/compliance/nist-800-171/failed-authentication-attempt-findings.png
      :title: Failed authentication attempt findings
      :alt: Failed authentication attempt findings
      :align: center
      :width: 80%

#. Go to **Security operations** > **Incident Response** and switch to the **Responses** tab. Each row shows a run of the ``ssh_brute_force_ar`` active response with the ``block-ip`` executable on the Ubuntu endpoint.

   .. thumbnail:: /images/compliance/nist-800-171/active-response-runs-block-ip.png
      :title: Runs of the block-ip active response
      :alt: Runs of the block-ip active response
      :align: center
      :width: 80%

After you finish this use case, delete the ``ssh_brute_force_ar_monitor`` monitor in **Explore** > **Alerting** and the ``ssh_brute_force_ar`` active response in **Explore** > **Active Responses**. Then remove the firewall rules on the Ubuntu endpoint so that the attacker endpoint can connect again. The ``block-ip`` active response adds a rule to the ``INPUT`` and ``FORWARD`` chains for each finding, and the **Stateless** type never removes them:

.. code-block:: console

   $ while sudo iptables -D INPUT -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done
   $ while sudo iptables -D FORWARD -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done

3.6.2 Track, document, and report incidents
-------------------------------------------

Requirement 3.6.2 states, "Track, document, and report incidents to designated officials and/or authorities both internal and external to the organization."

Wazuh helps meet requirement 3.6.2 by exporting the findings of an incident to a CSV file from the Wazuh dashboard.

Use case: Exporting the findings of an incident for a report
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to export the high and critical findings of an Ubuntu endpoint for an incident report.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, click **Explore agent**, and select the endpoint. Then switch to the **Findings** tab.

#. Set the time picker to the period of the incident, for example **Last 1 hour**, and enter the following query to keep the high and critical findings:

   .. code-block:: none

      wazuh.rule.level:(high or critical)

   .. thumbnail:: /images/compliance/nist-800-171/threat-hunting-high-critical-findings.png
      :title: High and critical findings
      :alt: High and critical findings
      :align: center
      :width: 80%

#. Click **Export Formatted**. The Wazuh dashboard downloads a CSV file with the findings and confirms the number of exported rows.

   .. thumbnail:: /images/compliance/nist-800-171/export-formatted-findings.png
      :title: Export of the findings to a CSV file
      :alt: Export of the findings to a CSV file
      :align: center
      :width: 80%

Use the CSV file to describe the affected endpoint, the timeline, and the detected techniques in your report.
