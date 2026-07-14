.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Security Configuration Assessment module evaluates monitored endpoints against hardening standards like CIS benchmarks. Learn more about this in this PoC.

Security configuration assessment
=================================

The Wazuh Security Configuration Assessment (SCA) module continuously evaluates monitored endpoints against security policies and hardening standards (such as CIS benchmarks). It identifies misconfigurations, missing patches, weak settings, and policy violations, then provides remediation guidance. This guide demonstrates how to view the result of the default SCA policy on a Linux endpoint, create and deploy a custom SCA policy, test the policy with simulated insecure configurations, and review results and remediation steps in the Wazuh dashboard. Regular configuration assessments help reduce your attack surface and support compliance with standards like PCI DSS, HIPAA, or NIST.

Infrastructure
--------------

+--------------+------------------------------------------------------+
| Endpoint     | Description                                          |
+==============+======================================================+
| Ubuntu 24.04 | Monitored endpoint where SCA policies are evaluated. |
+--------------+------------------------------------------------------+

Configuration
-------------

SCA is enabled by default in Wazuh |WAZUH_CURRENT_MAJOR|. No changes are typically required for built-in policies.

Ubuntu endpoint
^^^^^^^^^^^^^^^

Default SCA policy
~~~~~~~~~~~~~~~~~~

#. On the Ubuntu endpoint, check ``/var/ossec/etc/ossec.conf`` to validate that SCA is enabled:

   .. code-block:: xml

      <sca>
        <enabled>yes</enabled>
        <scan_on_start>yes</scan_on_start>
        <interval>12h</interval>

        <!-- Database synchronization settings -->
        <synchronization>
          <enabled>yes</enabled>
          <interval>5m</interval>
          <integrity_interval>24h</integrity_interval>
          <max_eps>75</max_eps>
        </synchronization>
      </sca>

   .. note::

      You can adjust the interval to reduce or increase the scan frequency. This is optional.

#. Explore the built-in policy. Wazuh provides a CIS Check for Ubuntu Linux 24.04 LTS policy out of the box:

   .. code-block:: console

      # cat /var/ossec/ruleset/sca/cis_ubuntu24-04.yml

   On your Wazuh dashboard, navigate to the Configuration Assessment module and select the Ubuntu endpoint to view the results of the default SCA check.

Custom SCA policy
~~~~~~~~~~~~~~~~~

You can also configure custom SCA policies to meet your individual use cases. Follow the steps below to configure a custom SCA policy.

#. Create a new directory ``/var/ossec/etc/custom-sca-files/`` to save your custom policy files:

   .. code-block:: console

      # mkdir -p /var/ossec/etc/custom-sca-files

   .. note::

      We recommend placing custom SCA policies in a dedicated directory (instead of ``/var/ossec/ruleset/sca/``) to prevent them from being overwritten during agent or ruleset updates, and to keep your custom policies cleanly separated from the built-in ones.

#. Create a new SCA policy file ``custom-web-hardening.yml`` in the ``/var/ossec/etc/custom-sca-files/`` directory and add the following policy to it:

   .. code-block:: yaml

      # Security Configuration Assessment
      # Custom Web Server Hardening Policy
      # Copyright (C) 2026, Your Organization / Wazuh Inc.

      policy:
        id: "custom_web_hardening"
        file: "custom-web-hardening.yml"
        name: "Custom Web Server Hardening"
        description: "Checks for basic secure configuration of web servers (Nginx/Apache)."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html

      requirements:
        title: "Check that a web server is present on the system"
        description: "This policy applies to endpoints running Nginx or Apache."
        condition: any
        rules:
          - 'p:nginx'
          - 'p:httpd'
          - 'p:apache2'

      checks:
        - id: 10010
          title: "Ensure Nginx/Apache is not running as root"
          description: "Web servers should run with least privileges."
          rationale: "Running web servers as root increases the impact of a potential compromise."
          remediation: "Configure the web server user to a non-root account (e.g., www-data)."
          condition: none
          rules:
            - 'c:ps -eo user,comm | grep -E "nginx|httpd|apache2" -> r:^root'

        - id: 10011
          title: "Ensure directory listing is disabled in web server config"
          description: "Directory listing should be disabled to prevent information disclosure."
          rationale: "Exposing directory contents helps attackers map the filesystem."
          remediation: "Set 'autoindex off;' in nginx.conf or 'Options -Indexes' in Apache config."
          condition: none
          rules:
            - 'f:/etc/nginx/nginx.conf -> r:autoindex on'
            - 'f:/etc/apache2/apache2.conf -> r:Options.*Indexes'

        - id: 10012
          title: "Ensure server tokens are minimized"
          description: "Web server should not expose detailed version information."
          rationale: "Version disclosure aids attackers in crafting targeted exploits."
          remediation: "Set 'server_tokens off;' in nginx or 'ServerTokens Prod' in Apache."
          condition: none
          rules:
            - 'f:/etc/nginx/nginx.conf -> r:server_tokens off'
            - 'f:/etc/apache2/apache2.conf -> r:ServerTokens Prod'

   The policy targets endpoints running NGINX or Apache web servers. It runs only on a system where at least one of the processes NGINX, httpd, or apache2 is present.

   -  Check ID 10010 flags a FAIL if NGINX or Apache runs under the root user.
   -  Check ID 10011 flags a FAIL if directory listing is enabled.
   -  Check ID 10012 flags a FAIL if the server exposes version details in HTTP response headers.

#. Change the file ownership to ensure Wazuh has permission to it:

   .. code-block:: console

      # chown wazuh:wazuh /var/ossec/etc/custom-sca-files/custom-web-hardening.yml

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <sca>
        <policies>
          <policy enabled="yes">/var/ossec/etc/custom-sca-files/custom-web-hardening.yml</policy>
        </policies>
      </sca>

#. Restart the Wazuh agent to implement changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Test the configuration
----------------------

#. Install NGINX on the monitored Ubuntu endpoint:

   .. code-block:: console

      # apt install nginx

#. Run the following commands to simulate insecure configurations:

   .. code-block:: console

      # sed -i 's/# server_tokens off;/server_tokens on;/' /etc/nginx/nginx.conf 2>/dev/null || true
      # sed -i '/^http {/a\    autoindex on;' /etc/nginx/nginx.conf
      # systemctl restart nginx

#. Restart the agent to force a fresh SCA scan:

   .. code-block:: console

      # systemctl restart wazuh-agent

Visualize the SCA checks
------------------------

You can visualize the SCA checks on the Wazuh dashboard. To see the SCA check results, perform the following on the Wazuh dashboard:

#. Navigate to **Endpoint security** > **Configuration Assessment**.

#. Select the Ubuntu agent and inspect both the default ``CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0`` and ``Custom Web Server Hardening`` SCA policies.

   .. thumbnail:: /images/poc/sca-checks-overview.png
      :title: SCA checks overview
      :align: center
      :width: 80%

#. Click **+ Add filter**. Then filter by ``policy.name``.

#. In the **Operator** field, select **is**.

#. In the **Values** field, select ``CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0``. Inspect the information under **Dashboard** and **Inventory**.

   .. thumbnail:: /images/poc/sca-cis-ubuntu-dashboard.png
      :title: CIS Ubuntu Linux 24.04 LTS Benchmark dashboard
      :align: center
      :width: 80%

   .. thumbnail:: /images/poc/sca-cis-ubuntu-inventory.png
      :title: CIS Ubuntu Linux 24.04 LTS Benchmark inventory
      :align: center
      :width: 80%

#. Click **+ Add filter**. Then filter by ``policy.name``.

#. In the **Operator** field, select **is**.

#. In the **Values** field, select ``Custom Web Server Hardening``. Inspect the information under **Dashboard** and **Inventory**.

   .. thumbnail:: /images/poc/sca-custom-policy-dashboard.png
      :title: Custom Web Server Hardening dashboard
      :align: center
      :width: 80%

   .. thumbnail:: /images/poc/sca-custom-policy-inventory.png
      :title: Custom Web Server Hardening inventory
      :align: center
      :width: 80%

Expanding the Findings details also shows the remediation guidance. The custom policy appears alongside the built-in CIS policies. Failed checks clearly show why they failed and how to fix them, which demonstrates the value of tailoring assessments to your environment.
