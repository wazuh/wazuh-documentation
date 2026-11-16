.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Security Configuration Assessment module evaluates monitored endpoints against hardening standards like CIS benchmarks. Learn more about this in this PoC.

Security configuration assessment
=================================

The Wazuh Security Configuration Assessment (SCA) module continuously evaluates monitored endpoints against security policies and hardening standards (such as CIS benchmarks). It identifies misconfigurations, missing patches, weak settings, and policy violations, then provides remediation guidance. This use case shows how to view the results of the default SCA policy on a Linux endpoint, create and deploy a custom SCA policy, test the policy with simulated insecure configurations, and review results and remediation steps in the Wazuh dashboard. Regular configuration assessments help reduce your attack surface and support compliance with standards such as PCI DSS, HIPAA, or NIST.

Infrastructure
--------------

+--------------+------------------------------------------------------+
| Endpoint     | Description                                          |
+==============+======================================================+
| Ubuntu 24.04 | Monitored endpoint where SCA policies are evaluated. |
+--------------+------------------------------------------------------+

Configuration
-------------

SCA is enabled by default in Wazuh |WAZUH_CURRENT_MAJOR|. Built-in policies typically need no changes.

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
        </synchronization>
      </sca>

   .. note::

      You can adjust the interval to reduce or increase the scan frequency. This is optional.

#. Explore the built-in policy. Wazuh provides the CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0 policy out of the box:

   .. code-block:: console

      # cat /var/ossec/ruleset/sca/cis_ubuntu24-04.yml

   You can view the full list of :doc:`available SCA policies </user-manual/capabilities/sec-config-assessment/available-sca-policies>` in the Wazuh documentation. On your Wazuh dashboard, go to **Endpoint security** > **Configuration Assessment** and select the Ubuntu endpoint to view the results of the default SCA check.

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
        description: "This policy applies to endpoints with Nginx or Apache installed."
        condition: any
        rules:
          - 'c:dpkg-query -s nginx -> r:^Status: install ok installed'
          - 'c:dpkg-query -s apache2 -> r:^Status: install ok installed'

      checks:

        - id: 10010
          title: "Nginx - ensure worker processes are not running as root"
          description: "Nginx worker processes (not the master) must run under a dedicated non-privileged user."
          rationale: "Worker processes handle untrusted external requests directly; running them as root removes the privilege separation nginx's architecture is designed to provide."
          remediation: "Set 'user www-data;' (or your intended non-root user) in /etc/nginx/nginx.conf, then run 'nginx -t && systemctl reload nginx'."
          condition: none
          rules:
            - 'c:ps -C nginx -o user=,args= -> r:^root\s+nginx: worker'


        - id: 10011
          title: "Nginx - ensure autoindex is not enabled"
          description: "Directory listing must be disabled to prevent information disclosure."
          rationale: "Exposing directory contents helps attackers map the filesystem and discover unintended files."
          remediation: "Set 'autoindex off;' in /etc/nginx/nginx.conf, then run 'nginx -t && systemctl reload nginx'."
          condition: none
          rules:
            - 'f:/etc/nginx/nginx.conf -> r:^\s*autoindex\s+on'

        - id: 10013
          title: "Apache - ensure directory indexing is not enabled"
          description: "Directory listing must be disabled to prevent information disclosure."
          rationale: "Exposing directory contents helps attackers map the filesystem and discover unintended files."
          remediation: "Remove 'Indexes' from the 'Options' directive in /etc/apache2/apache2.conf (e.g. 'Options FollowSymLinks' instead of 'Options Indexes FollowSymLinks'), then reload Apache."
          condition: none
          rules:
            - 'f:/etc/apache2/apache2.conf -> r:Options\s+.*Indexes'


        - id: 10012
          title: "Nginx - ensure server_tokens is set to off"
          description: "Nginx must not disclose its version number in the Server header or default error pages."
          rationale: "Version disclosure aids attackers in fingerprinting the server for known CVEs. Nginx's own default is 'on', so an absent directive is also insecure."
          remediation: "Set 'server_tokens off;' inside the http {} block in /etc/nginx/nginx.conf, then run 'nginx -t && systemctl reload nginx'."
          condition: all
          rules:
            - 'f:/etc/nginx/nginx.conf -> r:^\s*server_tokens\s+off;'

        - id: 10014
          title: "Apache - ensure ServerTokens is set to Prod"
          description: "Apache must not disclose detailed version/module/OS information in the Server header."
          rationale: "Non-'Prod' settings leak OS, module, and version details useful for targeted exploitation. Apache's default is 'Full', so an absent directive is also insecure."
          remediation: "Set 'ServerTokens Prod' in /etc/apache2/apache2.conf (or conf-enabled/security.conf), then reload Apache."
          condition: all
          rules:
            - 'f:/etc/apache2/apache2.conf -> r:^\s*ServerTokens\s+Prod\s*$'

        - id: 10015
          title: "Apache - ensure ServerSignature is set to Off"
          description: "Apache must not append version/OS info to auto-generated error pages and directory listings."
          rationale: "Even with ServerTokens minimized, ServerSignature can still leak version details on generated pages. Apache's default is 'On'."
          remediation: "Set 'ServerSignature Off' in /etc/apache2/apache2.conf (or conf-enabled/security.conf), then reload Apache."
          condition: all
          rules:
            - 'f:/etc/apache2/apache2.conf -> r:^\s*ServerSignature\s+Off\s*$'

   The policy targets endpoints with NGINX or Apache installed. It runs only on a system where the nginx or apache2 package is installed.

   -  Check ID ``10010`` flags a FAIL if the NGINX worker processes run as the root user.
   -  Check ID ``10011`` flags a FAIL if NGINX directory listing is enabled.
   -  Check ID ``10012`` flags a FAIL if the NGINX server exposes version details in HTTP response headers.
   -  Check ID ``10013`` flags a FAIL if the Apache directory listing is enabled.
   -  Check ID ``10014`` flags a FAIL if the Apache server exposes version details in HTTP response headers.
   -  Check ID ``10015`` flags a FAIL if the Apache server adds version and OS details to auto-generated error pages and directory listings.

#. Change the file ownership so that the Wazuh agent can read it:

   .. code-block:: console

      # chown wazuh:wazuh /var/ossec/etc/custom-sca-files/custom-web-hardening.yml

#. Enable the policy file by adding the following lines within the ``<sca>`` block of the Wazuh agent configuration file at ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <policies>
        <policy enabled="yes">/var/ossec/etc/custom-sca-files/custom-web-hardening.yml</policy>
      </policies>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

Test the configuration
----------------------

#. Install NGINX on the monitored Ubuntu endpoint:

   .. code-block:: console

      # apt update
      # apt install nginx

#. Run the following commands to simulate insecure configurations:

   .. code-block:: console

      # sed -i 's/# server_tokens off;/server_tokens on;/' /etc/nginx/nginx.conf 2>/dev/null || true
      # sed -i '/^http {/a\    autoindex on;' /etc/nginx/nginx.conf
      # sed -i 's/^user .*/user root;/' /etc/nginx/nginx.conf
      # systemctl restart nginx

#. Restart the Wazuh agent to force a fresh SCA scan:

   .. code-block:: console

      # systemctl restart wazuh-agent

Visualize the SCA checks
------------------------

You can visualize the SCA checks on the Wazuh dashboard. To see the SCA check results, perform the following on the Wazuh dashboard:

#. Navigate to **Endpoint security** > **Configuration Assessment**.

#. Select the Ubuntu agent and inspect both the default ``CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0.`` and ``Custom Web Server Hardening`` SCA policies.

   .. thumbnail:: /images/poc/sca-checks-overview.png
      :title: SCA checks overview
      :alt: Wazuh dashboard Configuration Assessment Inventory tab for the Ubuntu agent listing CIS Ubuntu Linux 24.04 LTS Benchmark checks and their results
      :align: center
      :width: 80%

#. Click **+ Add filter**. Then filter by ``policy.name``.

#. In the **Operator** field, select ``is``.

#. In the **Value** field, select ``CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0.``. Inspect the information under **Dashboard** and **Inventory**.

   .. thumbnail:: /images/poc/sca-cis-ubuntu-dashboard.png
      :title: CIS Ubuntu Linux 24.04 LTS Benchmark dashboard
      :alt: Wazuh dashboard Configuration Assessment Dashboard tab filtered by the CIS Ubuntu Linux 24.04 LTS Benchmark policy, showing passed, failed, and not applicable checks
      :align: center
      :width: 80%

   .. thumbnail:: /images/poc/sca-cis-ubuntu-inventory.png
      :title: CIS Ubuntu Linux 24.04 LTS Benchmark inventory
      :alt: Wazuh dashboard Configuration Assessment Inventory tab filtered by the CIS Ubuntu Linux 24.04 LTS Benchmark policy, listing its checks
      :align: center
      :width: 80%

#. Remove the previous ``policy.name`` filter. Click **+ Add filter**. Then filter by ``policy.name``.

#. In the **Operator** field, select ``is``.

#. In the **Value** field, select ``Custom Web Server Hardening``. Inspect the information under **Dashboard** and **Inventory**.

   .. thumbnail:: /images/poc/sca-custom-policy-dashboard.png
      :title: Custom Web Server Hardening dashboard
      :alt: Wazuh dashboard Configuration Assessment Dashboard tab filtered by the Custom Web Server Hardening policy, showing failed and not applicable checks
      :align: center
      :width: 80%

   .. thumbnail:: /images/poc/sca-custom-policy-inventory.png
      :title: Custom Web Server Hardening inventory
      :alt: Wazuh dashboard Configuration Assessment Inventory tab filtered by the Custom Web Server Hardening policy, listing checks 10010 to 10015 and their results
      :align: center
      :width: 80%

The custom policy appears alongside the built-in CIS policies. Failed checks clearly show why they failed and how to fix them, which demonstrates the value of tailoring assessments to your environment. Expand a failed check to see the remediation steps in the ``check.remediation`` field.

.. thumbnail:: /images/poc/sca-custom-policy-details.png
   :title: Custom Web Server Hardening check details
   :alt: Wazuh dashboard check details panel for a failed Custom Web Server Hardening check, with the check.remediation field highlighted
   :align: center
   :width: 80%

Follow the steps below to remediate the findings and update the SCA check:

#. Run the following commands to remediate the insecure configurations:

   .. code-block:: console

      # sed -i 's/server_tokens on;/server_tokens off;/' /etc/nginx/nginx.conf 2>/dev/null || true
      # sed -i 's/autoindex on;/autoindex off;/' /etc/nginx/nginx.conf
      # sed -i 's/^user .*/user www-data;/' /etc/nginx/nginx.conf
      # systemctl restart nginx

#. Restart the Wazuh agent to force a fresh SCA scan:

   .. code-block:: console

      # systemctl restart wazuh-agent

Check that the remediation worked. Go to **Endpoint security** > **Configuration Assessment**, select the Ubuntu agent, and filter by the ``Custom Web Server Hardening`` policy. Checks ``10010``, ``10011``, and ``10012`` now pass.

.. thumbnail:: /images/poc/sca-custom-policy-resolved.png
   :title: Custom Web Server Hardening resolved checks
   :alt: Wazuh dashboard Configuration Assessment Inventory tab showing the Custom Web Server Hardening checks 10010, 10011, and 10012 as passed after remediation
   :align: center
   :width: 80%
