.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh is capable of detecting an SQL Injection attack from web server logs showing common SQL patterns of attack in a monitored endpoint. Learn more about this in this PoC.

Detecting an SQL injection attack
=================================

You can use Wazuh to detect SQL injection attacks in web server logs by analyzing patterns such as ``select``, ``union``, and other common SQL injection patterns. SQL injection is an attack in which a threat actor inserts malicious code into strings transmitted to a database server for parsing and execution. A successful SQL injection attack gives unauthorized access to confidential information contained in the database. In this use case, you simulate an SQL injection attack against an Ubuntu endpoint and detect it with Wazuh.

Infrastructure
--------------

+--------------+---------------------------------------------------------------+
| Endpoint     | Description                                                   |
+==============+===============================================================+
| Ubuntu 24.04 | Victim endpoint running an Apache 2.4.54 web server or later. |
+--------------+---------------------------------------------------------------+
| RHEL 9.0     | Attacker endpoint that launches the SQL injection attack.     |
+--------------+---------------------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

Perform the following steps to install Apache and configure the Wazuh agent to monitor the Apache logs.

#. Update the local packages and install the Apache web server:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install apache2

#. If the firewall is enabled, modify it to allow external access to web ports. Skip this step if the firewall is disabled:

   .. code-block:: console

      $ sudo ufw app list
      $ sudo ufw allow 'Apache'
      $ sudo ufw status

#. Check the status of the Apache service to verify that the web server is running:

   .. code-block:: console

      $ sudo systemctl status apache2

#. Use the ``curl`` command or open ``http://<UBUNTU_IP>`` in a browser to view the Apache landing page and verify the installation:

   .. code-block:: console

      $ curl http://<UBUNTU_IP>

#. Add the following lines to the Wazuh agent ``/var/ossec/etc/ossec.conf`` file. This allows the Wazuh agent to monitor the access logs of your Apache server:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>apache</log_format>
          <location>/var/log/apache2/access.log</location>
        </localfile>
      </ossec_config>

#. Restart the Wazuh agent to apply the configuration changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Attack emulation
----------------

Replace ``<UBUNTU_IP>`` with the appropriate IP address and run the following command from the attacker endpoint:

.. code-block:: console

   $ curl -v "http://<UBUNTU_IP>?id=1%20UNION%20SELECT%201,2,3--"

The default Wazuh ruleset detects the SQL injection attempt, so no custom rules are required. The expected result is a finding with an ``event.dataset`` of ``apache-access``.

Visualize the findings
----------------------

You can visualize the findings on the Wazuh dashboard. Perform the following:

#. Go to **Threat intelligence** > **Threat Hunting** and select **Findings**.

#. Click **+ Add filter**. Then filter by **event.dataset**.

#. In the **Operator** field, select **is**.

#. Input ``apache-access``.

.. thumbnail:: /images/poc/sql-injection-findings.png
   :title: SQL injection attack findings
   :align: center
   :width: 80%
