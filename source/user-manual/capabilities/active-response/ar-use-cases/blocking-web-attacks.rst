.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to use Active Response to block a web attack by blocking the attacker IP address.

Blocking web attacks with active response
==============================================

In this use case, we simulate a Cross-Site Scripting (XSS) attack against a web server running on an Ubuntu endpoint. Wazuh detects the attack and evaluates the resulting finding against the configured Alerting monitor. When the finding meets the monitor conditions, Wazuh runs the ``block-ip`` script on the Ubuntu endpoint to block the attacker's IP address.

Infrastructure
-----------------

+------------------+----------------------------------------------------------------------------------------------------+
| Endpoint         | Description                                                                                        |
+==================+====================================================================================================+
| **RHEL 9.0**     | This is the attacker endpoint that performs a cross-site scripting attack. Any Linux endpoint with |
|                  | ``curl`` installed works.                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| **Ubuntu 24.04** | This is the victim endpoint that receives the simulated cross-site scripting attack. This endpoint |
|                  | requires an installed Wazuh agent enrolled with the Wazuh manager.                                 |
+------------------+----------------------------------------------------------------------------------------------------+

Configuration
----------------

Ubuntu endpoint
^^^^^^^^^^^^^^^^

Perform the following steps to install an Apache web server and monitor its logs with the Wazuh agent.

#. Update local packages and install the Apache web server:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install apache2

#. If a firewall is enabled, modify it to allow external access to web ports. Skip this step if the firewall is disabled:

   .. code-block:: console

      $ sudo ufw app list
      $ sudo ufw allow 'Apache'
      $ sudo ufw status

#. Check that the Apache web server is running:

   .. code-block:: console

      $ sudo systemctl status apache2

#. Add the following lines to the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file. This sets the Wazuh agent to monitor the access logs of your Apache server:

   .. code-block:: xml

      <localfile>
        <log_format>syslog</log_format>
        <location>/var/log/apache2/access.log</location>
      </localfile>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
^^^^^^^^^^^^^^^^

Follow these steps to configure an active response that blocks the source IP address of a detected web attack.

On the Wazuh dashboard, create the active response configuration as described in :doc:`configuration <../configuration>`, with the following settings:

+----------------+-------------------+
| Field          | Value             |
+================+===================+
| **Name**       | ``web_attack_ar`` |
+----------------+-------------------+
| **Executable** | ``block-ip``      |
+----------------+-------------------+
| **Location**   | ``Local``         |
+----------------+-------------------+
| **Type**       | ``Stateless``     |
+----------------+-------------------+

.. thumbnail:: /images/manual/active-response/blocking-web-attacks-create-active-response.png
   :title: Create the web_attack_ar active response
   :alt: Create active response form with the web_attack_ar settings
   :align: center
   :width: 80%

Then create an Alerting monitor that runs the active response when a finding matches your conditions. This use case uses the Extraction query editor to match the rule title.

#. Navigate to **Explore** > **Alerting**, switch to the **Monitors** tab, then click **Create monitor**. Fill in the following parameters.

   +-------------------------+--------------------------------+
   | Field                   | Value                          |
   +=========================+================================+
   | Monitor name            | web_attack_ar_monitor          |
   +-------------------------+--------------------------------+
   | Monitor type            | Active Response monitor        |
   +-------------------------+--------------------------------+
   | Monitor defining method | Extraction query editor        |
   +-------------------------+--------------------------------+
   | Frequency               | By interval                    |
   +-------------------------+--------------------------------+
   | Run every               | 1 Minute(s)                    |
   +-------------------------+--------------------------------+
   | Index                   | wazuh-findings-v5-applications |
   +-------------------------+--------------------------------+

   .. thumbnail:: /images/manual/active-response/blocking-web-attacks-create-monitor.png
      :title: Create the web_attack_ar_monitor Active response monitor
      :alt: Create monitor form with the web_attack_ar_monitor details
      :align: center
      :width: 80%

#. Replace the content of the **Define extraction query** field with the following query:

   .. code-block:: json

      {
          "description": "Detects cross-site scripting findings",
          "queries": [
              {
                  "name": "web_attack_ar_query",
                  "query": "wazuh.rule.title:*scripting*",
                  "tags": []
              }
          ]
      }

   .. thumbnail:: /images/manual/active-response/blocking-web-attacks-extraction-query.png
      :title: Define the web_attack_ar_query extraction query
      :alt: Extraction query editor with the web_attack_ar_query query and its response
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters.

   +-------------------+---------------------------------+
   | Field             | Value                           |
   +===================+=================================+
   | Trigger name      | web_attack_ar_trigger           |
   +-------------------+---------------------------------+
   | Severity level    | 1 (Highest)                     |
   +-------------------+---------------------------------+
   | Trigger condition | query[name=web_attack_ar_query] |
   +-------------------+---------------------------------+

   .. thumbnail:: /images/manual/active-response/blocking-web-attacks-create-trigger.png
      :title: Create the web_attack_ar_trigger trigger
      :alt: Trigger form for web_attack_ar_trigger with the query[name=web_attack_ar_query] condition
      :align: center
      :width: 80%

#. In the **Actions** subsection, click **Add active response**. Set **Action name** to ``web_attack_ar_action`` and select ``web_attack_ar`` as the **Active response**.

   .. thumbnail:: /images/manual/active-response/blocking-web-attacks-create-action.png
      :title: Create the web_attack_ar_action active response action
      :alt: Active response action form for web_attack_ar_action
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

.. note::

   Extraction queries use the query string syntax. The ``*`` wildcard matches any sequence of characters. For example, ``wazuh.rule.title:*scripting*`` matches any rule title that contains scripting. Matching is case-sensitive, so ``*Scripting*`` doesn't match the same findings. Use ``AND``, ``OR``, and ``NOT`` to combine conditions.

Attack emulation
-------------------

Perform the following attack emulation from the RHEL 9.0 endpoint:

Replace ``<WEBSERVER_IP_ADDRESS>`` with the Ubuntu IP address and execute the following command from the attacker endpoint:

.. code-block:: console

   $ curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "http://<WEBSERVER_IP_ADDRESS>/index.html?q=<script>document.cookie</script>"

The attacker endpoint connects to the victim's web servers the first time. This triggers a web attack finding and then triggers the ``block-ip`` active response to block any successive connections.

Run the attack command again after two minutes. The attacker IP is now blocked:

.. code-block:: console

   $ curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "http://<WEBSERVER_IP_ADDRESS>/index.html?q=<script>document.cookie</script>"

The command output looks similar to this:

.. code-block:: none
   :class: output

   curl: (28) Failed to connect to 192.168.56.118 port 80 after 134781 ms: Couldn't connect to server

Visualize the findings
--------------------------

You can visualize the findings in the Wazuh dashboard. To do this, go to the **Threat Hunting** module and add the filters below in the search bar to query the findings.

-  ``event.dataset:apache-access``

.. thumbnail:: /images/manual/active-response/blocking-web-attacks-threat-hunting.png
   :title: Web attack finding in Threat Hunting
   :alt: Threat Hunting findings of the cross-site scripting attack
   :align: center
   :width: 80%

The ``block-ip`` active response triggers to block the attacker IP. Navigate to **Security operations** > **Incident Response**. Switch to the **Responses** tab to see details about the triggered Active response.

.. thumbnail:: /images/manual/active-response/blocking-web-attacks-incident-response.png
   :title: Triggered Active response in Incident Response
   :alt: Incident Response Responses tab showing the triggered block-ip active response
   :align: center
   :width: 80%

Check the ``/var/ossec/logs/active-responses.log`` file to see the following similar log entry confirming the attacker IP was blocked:

.. code-block:: none
   :class: output

   2026/08/06 12:50:47 active-response/bin/block-ip: [INFO] Method=firewalld Action=start Details=Attempting method: firewalld (lock=yes)
   2026/08/06 12:50:47 active-response/bin/block-ip: Binary 'firewall-cmd' not found in default paths: firewall-cmd (2)
   2026/08/06 12:50:47 active-response/bin/block-ip: [WARNING] Method=firewalld Action=skipped Details=Method not available on this system - trying next
   2026/08/06 12:50:47 active-response/bin/block-ip: [INFO] Method=iptables Action=start Details=Attempting method: iptables (lock=yes)
   2026/08/06 12:50:47 active-response/bin/block-ip: [INFO] Method=iptables Action=success Details=IP 192.168.56.122 successfully blocked
   2026/08/06 12:50:47 active-response/bin/block-ip: Ended

In this use case, ``web_attack_ar`` is a stateless active response, so the attacker IP address stays blocked. To unblock it automatically instead, set **Type** to Stateful in the ``web_attack_ar`` active response, with a **Stateful timeout** longer than the test, such as 600 seconds. To remove the block manually, run the following commands on the Ubuntu endpoint. Replace ``<ATTACKER_IP>`` with the IP address of the RHEL endpoint. These commands apply when ``block-ip`` uses iptables, as in the log above. block-ip adds one INPUT rule and one FORWARD rule every time it runs, so the commands repeat each deletion until no matching rule is left:

.. code-block:: console

   $ while sudo iptables -D INPUT -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done
   $ while sudo iptables -D FORWARD -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done
