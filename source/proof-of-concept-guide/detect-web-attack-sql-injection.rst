.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh can detect an SQL Injection attack from web server logs showing common attack patterns on a monitored endpoint.

Detecting an SQL injection attack
=================================

SQL injection is an attack in which a threat actor inserts malicious code into strings that an application passes to its database. A successful attack can give unauthorized access to confidential data. Wazuh detects SQL injection attempts in web server logs by looking for patterns such as ``select`` and ``union``. In this use case, you send an SQL injection request from the RHEL endpoint to an Apache web server on the Ubuntu endpoint.

Endpoints
---------

+--------------+------------------------------------------------+
| Endpoint     | Role                                           |
+==============+================================================+
| Ubuntu 24.04 | Victim running an Apache web server.           |
+--------------+------------------------------------------------+
| RHEL 9.0     | Attacker that sends the SQL injection request. |
+--------------+------------------------------------------------+

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

#. Check that the Apache landing page loads. Run the following command, or open ``http://<UBUNTU_IP>`` in a browser:

   .. code-block:: console

      $ curl http://<UBUNTU_IP>

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

.. _poc_sql_injection_verify_data_ingestion:

Verify data ingestion
---------------------

#. From the RHEL endpoint, request the landing page. This creates an access log event but no finding:

   .. code-block:: console

      $ curl http://<UBUNTU_IP>/

#. On the Ubuntu endpoint, check that Apache logged the request with status 200:

   .. code-block:: console

      $ sudo tail -n 1 /var/log/apache2/access.log

#. In the Wazuh dashboard, go to **Explore** > **Discover** and search for ``event.dataset: apache-access`` in the last 15 minutes. You see the request.

   .. thumbnail:: /images/poc/apache-access-discover.png
      :title: Apache access log event in Discover
      :alt: Wazuh dashboard Discover page showing an Apache access log event found with the event.dataset: apache-access search
      :align: center
      :width: 80%

Attack emulation
----------------

Run the following command on the RHEL endpoint. Replace ``<UBUNTU_IP>`` with the IP address of the Ubuntu endpoint:

.. code-block:: console

   $ curl -v "http://<UBUNTU_IP>?id=1%20UNION%20SELECT%201,2,3--"

The default Wazuh ruleset detects SQL injection attempts, so you don't need custom rules.

View the findings
-----------------

You see the finding ``SQL injection strings in URI - <RHEL_IP>``.

#. In the Wazuh dashboard, go to **Threat intelligence** > **Threat Hunting** and select **Findings**.

#. Enter ``event.dataset: apache-access`` in the search bar and click **Update**. You see a finding for the SQL injection request.

   .. thumbnail:: /images/poc/sql-injection-findings.png
      :title: SQL injection attack findings
      :alt: Wazuh dashboard Threat Hunting Findings tab showing the SQL injection strings in URI finding for the Ubuntu 24.04 agent
      :align: center
      :width: 80%

Troubleshooting
---------------

+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------+
| Check                                      | How                                                                                                                      |
+============================================+==========================================================================================================================+
| Apache logs the request with status 200    | ``sudo tail -n 1 /var/log/apache2/access.log``. A 404 reply never raises this finding, so keep the Apache default page.  |
+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------+
| Events reach Wazuh                         | The **Discover** search from :ref:`Verify data ingestion <poc_sql_injection_verify_data_ingestion>` returns the request. |
+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------+
| The agent reads the log                    | In **Explore** > **Discover**, search for ``wazuh.protocol.location: "/var/log/apache2/access.log"``.                    |
+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------+
| The ``apache-http`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message.         |
+--------------------------------------------+--------------------------------------------------------------------------------------------------------------------------+
