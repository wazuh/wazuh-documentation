.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet ISO 27001 Annex A organizational controls A.5.7, A.5.25, and A.5.26 with threat intelligence, MITRE ATT&CK, and active response use cases.

Organizational controls
=======================

A.5.7 Threat intelligence
-------------------------

Control A.5.7 requires the organization to collect and analyze information about information security threats to produce threat intelligence.

Wazuh helps meet the A.5.7 control with Wazuh Cyber Threat Intelligence (CTI). Wazuh CTI delivers the rules, indicators of compromise (IOCs), and vulnerability records that Wazuh uses for detection. The CTI Explorer lets you check a domain, URL, IP address, file hash, or CVE identifier against this content.

Use case: Checking a suspicious domain against Wazuh CTI
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to check a domain you find during an investigation against Wazuh CTI IOCs.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Threat intelligence** > **CTI Explorer**.

#. Enter the value in the search bar and click **Check**. For example, enter the domain ``ackeamann.xyz``. The result shows the indicator type, the providers that reported it, and the report confidence.

   .. thumbnail:: /images/compliance/iso-27001/cti-explorer-domain-check.png
      :title: CTI Explorer domain check
      :alt: CTI Explorer domain check
      :align: center
      :width: 80%

#. Click **Open the record** to see the details of the IOC, such as the malware family, the first and last seen dates, and the references.

   .. thumbnail:: /images/compliance/iso-27001/cti-ioc-record.png
      :title: CTI Explorer IOC record
      :alt: CTI Explorer IOC record
      :align: center
      :width: 80%

#. Click **Hunt in Threat Hunting** to search the findings of your endpoints for the value. A match in Wazuh CTI tells you that the value is malicious. Only a finding shows that the value appeared on one of your endpoints.

A.5.25 Assessment and decision on information security events
-------------------------------------------------------------

Control A.5.25 requires the organization to assess information security events and decide whether to categorize them as information security incidents.

To assess an event, you need context, such as the adversary technique it represents, the groups that use it, and how to mitigate it.

Wazuh helps meet the A.5.25 control by mapping findings to MITRE ATT&CK tactics and techniques. The Wazuh MITRE ATT&CK module shows the techniques detected in your environment and the MITRE intelligence on each technique.

Use case: Investigating the technique behind failed SSH logins
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to review the **Brute Force** technique behind failed SSH logins on a monitored Ubuntu endpoint. To generate failed SSH logins, run ``ssh testuser@<UBUNTU_IP_ADDRESS>`` from another endpoint and enter a wrong password at each prompt.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Threat intelligence** > **MITRE ATT&CK**. The **Dashboard** tab shows the top tactics and techniques of your findings, overall and by agent.

   .. thumbnail:: /images/compliance/iso-27001/mitre-attack-dashboard.png
      :title: MITRE ATT&CK Dashboard tab
      :alt: MITRE ATT&CK Dashboard tab
      :align: center
      :width: 80%

#. Switch to the **Findings** tab and enter the following query in the search bar:

   .. code-block:: none

      wazuh.rule.mitre.technique.id:T1110

   The failed SSH logins map to the **Credential Access** and **Initial Access** tactics, and to the **Brute Force** and **Valid Accounts** techniques.

   .. thumbnail:: /images/compliance/iso-27001/mitre-attack-findings-t1110.png
      :title: MITRE ATT&CK Findings tab
      :alt: MITRE ATT&CK Findings tab
      :align: center
      :width: 80%

#. Switch to the **Intelligence** tab, select **Techniques**, search for ``Brute Force``, and click **T1110**. The details show the technique description and the related groups, mitigations, software, and tactics. Use the mitigations to decide how to treat the event, for example, with multi-factor authentication or an account lockout policy.

   .. thumbnail:: /images/compliance/iso-27001/mitre-attack-intelligence-t1110.png
      :title: MITRE ATT&CK technique details
      :alt: MITRE ATT&CK technique details
      :align: center
      :width: 80%

A.5.26 Response to information security incidents
-------------------------------------------------

Control A.5.26 requires the organization to respond to information security incidents in accordance with its documented procedures.

Wazuh helps meet the A.5.26 control with active responses. An active response runs a script on a monitored endpoint when Wazuh generates specific findings. You define an active response on the Wazuh dashboard and run it from an Alerting monitor.

Use case: Blocking SSH brute-force attacks on an Ubuntu endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to block the source IP address of failed SSH logins on a monitored Ubuntu 24.04 endpoint. Each SSH connection with failed logins generates one ``Failed authentication attempt`` finding, which maps to A.5.16 Identity management, A.8.5 Secure authentication, and A.8.15 Logging. The ``block-ip`` active response then adds firewall rules that drop the traffic from the attacker.

.. note::

   You need a second endpoint with SSH access to the Ubuntu endpoint to simulate the attack. Don't use the Wazuh manager or the computer you manage the Ubuntu endpoint from, because the active response blocks the attacker's IP address.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (**☰**) and go to **Explore** > **Active Responses**.

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

   .. thumbnail:: /images/compliance/iso-27001/create-active-response.png
      :title: Create active response
      :alt: Create active response
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

   .. thumbnail:: /images/compliance/iso-27001/create-active-response-monitor.png
      :title: Create active response monitor
      :alt: Create active response monitor
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

   .. thumbnail:: /images/compliance/iso-27001/create-active-response-monitor-trigger-action.png
      :title: Create active response monitor trigger and action
      :alt: Create active response monitor trigger and action
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

   Output:

   .. code-block:: none
      :class: output

      ssh: connect to host <UBUNTU_IP_ADDRESS> port 22: Connection timed out

   On the Ubuntu endpoint, run ``sudo iptables -S INPUT | grep <ATTACKER_IP>`` to check the block. Replace ``<ATTACKER_IP>`` with the IP address of the attacker endpoint. The output shows a ``DROP`` rule for each finding, one for each blocked SSH connection.

Wazuh dashboard
~~~~~~~~~~~~~~~

Open the menu (**☰**) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab. Enter the following query in the search bar to see the findings that triggered the active response:

.. code-block:: none

   wazuh.rule.title:"Failed authentication attempt"

.. thumbnail:: /images/compliance/iso-27001/threat-hunting-failed-authentication-findings.png
   :title: Threat Hunting findings
   :alt: Threat Hunting findings
   :align: center
   :width: 80%

Go to **Security operations** > **Incident Response** and switch to the **Responses** tab. Each row shows a run of the ``ssh_brute_force_ar`` active response with the ``block-ip`` executable on the Ubuntu endpoint.

.. thumbnail:: /images/compliance/iso-27001/incident-response-responses-tab.png
   :title: Incident Response Responses tab
   :alt: Incident Response Responses tab
   :align: center
   :width: 80%

After you finish this use case, remove the firewall rules on the Ubuntu endpoint so that the attacker endpoint can connect again. The ``block-ip`` active response adds a rule to the ``INPUT`` and ``FORWARD`` chains for each finding, and the **Stateless** type never removes them:

.. code-block:: console

   $ while sudo iptables -D INPUT -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done
   $ while sudo iptables -D FORWARD -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done
