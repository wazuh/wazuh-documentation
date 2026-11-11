.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Active Response module performs autonomous actions on endpoints to mitigate security threats. Learn more about it in this section of the documentation.

Active response
===============

The Wazuh Active Response module performs autonomous actions on endpoints to mitigate security threats. Wazuh can execute scripts automatically when specific alerting conditions are met. These scripts execute actions, such as a firewall block or drop, and account lockout.

The Wazuh Active Response module assists in meeting the following NIST 800-53 controls:

-  **IR-4 Incident handling:** "*Organizations recognize that incident response capabilities are dependent on the capabilities of organizational systems and the mission and business processes being supported by those systems. Organizations consider incident response as part of the definition, design, and development of mission and business processes and systems. Incident-related information can be obtained from a variety of sources, including audit monitoring, physical access monitoring, and network monitoring; user or administrator reports; and reported supply chain events. An effective incident handling capability includes coordination among many organizational entities (e.g., mission or business owners, system owners, authorizing officials, human resources offices, physical security offices, personnel security offices, legal departments, risk executive [function], operations personnel, procurement offices). Suspected security incidents include the receipt of suspicious email communications that can contain malicious code. Suspected supply chain incidents include the insertion of counterfeit hardware or malicious code into organizational systems or system components. For federal agencies, an incident that involves personally identifiable information is considered a breach. A breach results in unauthorized disclosure, the loss of control, unauthorized acquisition, compromise, or a similar occurrence where a person other than an authorized user accesses or potentially accesses personally identifiable information or an authorized user accesses or potentially accesses such information for other than authorized purposes.*"

-  **SI-4 System monitoring:** "*System monitoring includes external and internal monitoring. External monitoring includes the observation of events occurring at external interfaces to the system. Internal monitoring includes the observation of events occurring within the system. Organizations monitor systems by observing audit activities in real-time or by observing other system aspects such as access patterns, characteristics of access, and other actions. The monitoring objectives guide and inform the determination of the events. System monitoring capabilities are achieved through a variety of tools and techniques, including intrusion detection and prevention systems, malicious code protection software, scanning tools, audit record monitoring software, and network monitoring software.*"

The Wazuh Active Response module assists in meeting the above controls by responding to malicious sources. Wazuh includes out-of-the-box active response commands that drop traffic from a malicious IP address or disable a user account that is a victim of brute forcing.

Use case
--------

Block web attacks with Active Response
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh helps meet the IR-4 Incident handling and SI-4 System monitoring requirements by detecting web-based attacks through web server log analysis and automatically blocking the attacking source.

In this scenario, we initiate a Cross-Site Scripting (XSS) attack from a host with HTTP access to a monitored Ubuntu 24.04 endpoint. Active response automatically blocks an attacker's IP address after detecting an XSS attack. You can then track the findings for these events and actions on the Wazuh dashboard.

Configure the Ubuntu endpoint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Perform the following steps to install an Apache web server and monitor its logs with the Wazuh agent.

#. Update local packages and install the Apache web server:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install apache2

#. If a firewall is enabled, modify it to allow external access to web ports:

   .. code-block:: console

      $ sudo ufw app list
      $ sudo ufw allow 'Apache'
      $ sudo ufw status

#. Check that the Apache web server is running:

   .. code-block:: console

      $ sudo systemctl status apache2

#. Add the following lines to the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file.

   This sets the Wazuh agent to monitor the access logs of your Apache server:

   .. code-block:: xml

      <localfile>
        <log_format>syslog</log_format>
        <location>/var/log/apache2/access.log</location>
      </localfile>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Configure the Wazuh dashboard
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Follow these steps to configure an active response that blocks the source IP address of a detected web attack.

#. From the Wazuh dashboard main menu, navigate to **Explore** > **Active Responses**.

#. Click **Create active response** and complete the configuration form with the following details.

   +----------------+-------------------+
   | **Field**      | **Value**         |
   +================+===================+
   | **Name**       | ``web_attack_ar`` |
   +----------------+-------------------+
   | **Executable** | ``block-ip``      |
   +----------------+-------------------+
   | **Location**   | ``Local``         |
   +----------------+-------------------+
   | **Type**       | ``Stateless``     |
   +----------------+-------------------+

   .. thumbnail:: /images/compliance/nist/create-active-response.png
      :title: Create active response
      :alt: Create active response
      :align: center
      :width: 80%

#. Click **Create** to save the active response.

#. Navigate to **Explore** > **Alerting**.

#. Switch to the **Monitors** tab, then click **Create Monitor**.

   Fill in the following parameters.

   +-----------------------------+-----------------------------------------------------------+
   | **Field**                   | **Value**                                                 |
   +=============================+===========================================================+
   | **Monitor name**            | ``web_attack_ar_monitor``                                 |
   +-----------------------------+-----------------------------------------------------------+
   | **Monitor type**            | ``Active Response monitor``                               |
   +-----------------------------+-----------------------------------------------------------+
   | **Monitor defining method** | ``Visual editor``                                         |
   +-----------------------------+-----------------------------------------------------------+
   | **Frequency**               | ``By interval``                                           |
   +-----------------------------+-----------------------------------------------------------+
   | **Run every**               | ``1 Minute(s)``                                           |
   +-----------------------------+-----------------------------------------------------------+
   | **Index**                   | ``wazuh-findings-v5-applications``                        |
   +-----------------------------+-----------------------------------------------------------+
   | **Query name**              | ``web_attack_ar_query``                                   |
   +-----------------------------+-----------------------------------------------------------+
   | **Field**                   | ``wazuh.rule.id is b04f7630-f428-5209-89f6-d640238bceac`` |
   +-----------------------------+-----------------------------------------------------------+

   .. thumbnail:: /images/compliance/nist/create-active-response-monitor.png
      :title: Create an Active Response monitor
      :alt: Create an Active Response monitor
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters.

   +-----------------------------+---------------------------+
   | **Field**                   | **Value**                 |
   +=============================+===========================+
   | **Trigger name**            | ``web_attack_ar_trigger`` |
   +-----------------------------+---------------------------+
   | **Severity level**          | ``1 (Highest)``           |
   +-----------------------------+---------------------------+
   | **Specify queries or tags** | ``web_attack_ar_query``   |
   +-----------------------------+---------------------------+

   .. thumbnail:: /images/compliance/nist/create-active-response-monitor-trigger.png
      :title: Create an Active Response monitor trigger
      :alt: Create an Active Response monitor trigger
      :align: center
      :width: 80%

#. In the **Actions** subsection, click **Add active response** and fill in the following parameters.

   +---------------------+--------------------------+
   | **Field**           | **Value**                |
   +=====================+==========================+
   | **Action name**     | ``web_attack_ar_action`` |
   +---------------------+--------------------------+
   | **Active response** | ``web_attack_ar``        |
   +---------------------+--------------------------+

   .. thumbnail:: /images/compliance/nist/create-active-response-monitor-action.png
      :title: Create an Active Response monitor action
      :alt: Create an Active Response monitor action
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

Simulate the attack
~~~~~~~~~~~~~~~~~~~

Perform the following steps from another endpoint.

#. Replace ``<WEBSERVER_IP_ADDRESS>`` with the Ubuntu IP address and execute the following command from the attacker endpoint:

   .. code-block:: console

      $ curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "http://<WEBSERVER_IP_ADDRESS>/index.html?q=<script>document.cookie</script>"

   The attacker endpoint connects to the victim's web server the first time. This triggers a web attack finding and then triggers the ``block-ip`` active response to block any successive connections.

#. Wait three minutes, then run the attack command again to confirm that the attacker IP is blocked:

   .. code-block:: console

      $ curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "http://<WEBSERVER_IP_ADDRESS>/index.html?q=<script>document.cookie</script>"

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      curl: (28) Failed to connect to <WEBSERVER_IP_ADDRESS> port 80 after 134781 ms: Couldn't connect to server

Visualize the findings
~~~~~~~~~~~~~~~~~~~~~~

You can visualize the findings in the Wazuh dashboard. Click the upper-left menu icon (**☰**) and go to **Threat intelligence** > **Threat Hunting**. Add the following filter in the search bar.

-  ``event.dataset:apache-access``

.. thumbnail:: /images/compliance/nist/active-response-apache-findings.png
   :title: Apache access findings in Threat Hunting
   :alt: Apache access findings in Threat Hunting
   :align: center
   :width: 80%

The ``block-ip`` active response triggers to block the attacker IP. Navigate to **Security operations** > **Incident Response**. Switch to the **Responses** tab to see details about the triggered Active response.

.. thumbnail:: /images/compliance/nist/active-response-incident-response.png
   :title: Triggered active response in Incident Response
   :alt: Triggered active response in Incident Response
   :align: center
   :width: 80%
