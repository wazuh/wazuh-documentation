.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh detects a Cross-Site Scripting (XSS) attack by analyzing web server access logs for suspicious request patterns in a monitored endpoint. Learn more about this in this PoC.

Detecting a cross-site scripting (XSS) attack
=============================================

In an XSS attack, an attacker injects malicious scripts into the pages of a web application. Wazuh analyzes web server access logs to detect suspicious request patterns, such as injection attempts and known attack signatures in URLs and query parameters. In this use case, you send an XSS request from the RHEL endpoint to an Apache web server on the Ubuntu endpoint.

Endpoints
---------

+--------------+-----------------------------------------------------------------+
| Endpoint     | Role                                                            |
+==============+=================================================================+
| Ubuntu 24.04 | Victim running an Apache web server.                            |
+--------------+-----------------------------------------------------------------+
| RHEL 9.0     | Attacker that sends a malicious HTTP request to the web server. |
+--------------+-----------------------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Update the local packages and install the Apache web server:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install -y apache2

#. If the firewall is enabled, allow access to the web ports. Skip this step if the firewall is disabled:

   .. code-block:: console

      $ sudo ufw app list
      $ sudo ufw allow 'Apache'
      $ sudo ufw status

#. Check that the Apache service is running:

   .. code-block:: console

      $ sudo systemctl status apache2

#. Append the following lines to ``/var/ossec/etc/ossec.conf`` so that the Wazuh agent monitors the Apache access logs:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>apache</log_format>
          <location>/var/log/apache2/access.log</location>
        </localfile>
      </ossec_config>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

.. _poc_xss_verify_data_ingestion:

Verify data ingestion
---------------------

#. From the RHEL endpoint, request the landing page. This creates an access log event but no finding:

   .. code-block:: console

      $ curl http://<UBUNTU_IP>/

#. On the Ubuntu endpoint, check that Apache logged the request with status 200:

   .. code-block:: console

      $ sudo tail -n 1 /var/log/apache2/access.log

#. In the Wazuh dashboard, go to **Explore** > **Discover** and search for ``event.dataset: apache-access`` in the last 15 minutes. You see the request.

Attack emulation
----------------

Run the following command on the RHEL endpoint. Replace ``<UBUNTU_IP>`` with the IP address of the Ubuntu endpoint:

.. code-block:: console

   $ curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "http://<UBUNTU_IP>/index.html?q=<script>document.cookie</script>"

View the findings
-----------------

You see the finding ``Cross site scripting strings - <RHEL_IP>``.

#. In the Wazuh dashboard, go to **Threat intelligence** > **Threat Hunting** and select **Findings**.

#. Enter ``event.dataset:apache-access`` in the search bar. The finding title is ``Cross site scripting strings - <RHEL_IP>``, with level high.

   .. thumbnail:: /images/poc/xss-attack-findings.png
      :title: XSS attack findings
      :alt: Wazuh dashboard Threat Hunting Findings tab showing the Cross site scripting strings findings for the Ubuntu 24.04 agent
      :align: center
      :width: 80%

#. Expand the finding to see details from the malicious request, such as the URL path and query.

   .. thumbnail:: /images/poc/xss-attack-finding-details.png
      :title: XSS attack finding details
      :alt: Document details of the cross-site scripting finding, including the URL path and query of the malicious request
      :align: center
      :width: 80%

Troubleshooting
---------------

+--------------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
| Check                                      | How                                                                                                                     |
+============================================+=========================================================================================================================+
| Apache logs the request with status 200    | ``sudo tail -n 1 /var/log/apache2/access.log``. A 404 reply never raises this finding, so keep the Apache default page. |
+--------------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
| Events reach Wazuh                         | The **Discover** search from :ref:`Verify data ingestion <poc_xss_verify_data_ingestion>` returns the request.          |
+--------------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
| The agent reads the log                    | In **Explore** > **Discover**, search for ``wazuh.protocol.location: "/var/log/apache2/access.log"``.                   |
+--------------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
| The ``apache-http`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message.        |
+--------------------------------------------+-------------------------------------------------------------------------------------------------------------------------+
