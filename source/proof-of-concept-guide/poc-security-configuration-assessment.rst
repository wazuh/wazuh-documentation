.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: The Wazuh Security Configuration Assessment module evaluates monitored endpoints against hardening standards like CIS benchmarks. Learn more about this in this PoC.

Security Configuration Assessment
=================================

The :doc:`Wazuh Security Configuration Assessment (SCA) module </user-manual/capabilities/sec-config-assessment/index>` checks monitored endpoints against security policies and hardening standards, such as the `CIS benchmarks <https://www.cisecurity.org/cis-benchmarks>`__. It reports misconfigurations and weak settings, and gives remediation steps for each failed check. Regular assessments reduce your attack surface and support compliance with standards such as PCI DSS, HIPAA, and NIST.

In this use case, you review the default CIS policy results on the Ubuntu endpoint. Then you add a custom web server hardening policy, test it with insecure NGINX settings, and fix them.

Endpoints
---------

+--------------+----------------------------------------------------+
| Endpoint     | Role                                               |
+==============+====================================================+
| Ubuntu 24.04 | Wazuh evaluates the SCA policies on this endpoint. |
+--------------+----------------------------------------------------+

Configuration
-------------

SCA is enabled by default, and the built-in policies need no changes.

Check the default SCA policy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. On the Ubuntu endpoint, check that the ``<sca>`` block in ``/var/ossec/etc/ossec.conf`` has ``<enabled>yes</enabled>``:

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

      Optionally, change ``<interval>`` to scan more or less often.

#. Review the built-in CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0 policy:

   .. code-block:: console

      $ sudo cat /var/ossec/ruleset/sca/cis_ubuntu24-04.yml

#. In the Wazuh dashboard, go to **Endpoint security** > **Configuration Assessment** and select the Ubuntu endpoint to view the results of the default policy.

See the full list of :doc:`available SCA policies </user-manual/capabilities/sec-config-assessment/available-sca-policies>`.

Add a custom SCA policy
^^^^^^^^^^^^^^^^^^^^^^^

You can write :ref:`custom SCA policies <sca_creating_custom_policies>` for your own requirements. The following policy checks basic hardening settings of NGINX and Apache web servers.

#. Create a directory for custom policy files:

   .. code-block:: console

      $ sudo mkdir -p /var/ossec/etc/custom-sca-files

   .. note::

      Keep custom policies in their own directory instead of ``/var/ossec/ruleset/sca/``. Agent or ruleset updates can overwrite files in that directory, and a separate directory keeps your policies apart from the built-in ones.

#. Create the policy file ``/var/ossec/etc/custom-sca-files/custom-web-hardening.yml`` with the following content:

   .. code-block:: yaml

      # Security Configuration Assessment
      # Custom Web Server Hardening Policy

      policy:
        id: "custom_web_hardening"
        file: "custom-web-hardening.yml"
        name: "Custom Web Server Hardening"
        description: "Checks for basic secure configuration of web servers (Nginx/Apache)."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html

      requirements:
        name: "Check that a web server is present on the system"
        description: "This policy applies to endpoints with Nginx or Apache installed."
        condition: any
        rules:
          - 'c:dpkg-query -s nginx -> r:^Status: install ok installed'
          - 'c:dpkg-query -s apache2 -> r:^Status: install ok installed'

      checks:

        - id: 10010
          name: "Nginx - ensure worker processes are not running as root"
          description: "Nginx worker processes (not the master) must run under a dedicated non-privileged user."
          rationale: "Worker processes handle untrusted external requests directly; running them as root removes the privilege separation that the nginx architecture provides."
          remediation: "Set 'user www-data;' (or your intended non-root user) in /etc/nginx/nginx.conf, then run 'nginx -t && systemctl reload nginx'."
          condition: none
          rules:
            - 'c:ps -C nginx -o user=,args= -> r:^root\s+nginx: worker'

        - id: 10011
          name: "Nginx - ensure autoindex is not enabled"
          description: "Directory listing must be disabled to prevent information disclosure."
          rationale: "Exposing directory contents helps attackers map the filesystem and discover unintended files."
          remediation: "Set 'autoindex off;' in /etc/nginx/nginx.conf, then run 'nginx -t && systemctl reload nginx'."
          condition: none
          rules:
            - 'f:/etc/nginx/nginx.conf -> r:^\s*autoindex\s+on'

        - id: 10012
          name: "Nginx - ensure server_tokens is set to off"
          description: "Nginx must not disclose its version number in the Server header or default error pages."
          rationale: "Version disclosure aids attackers in fingerprinting the server for known CVEs. The Nginx default is 'on', so an absent directive is also insecure."
          remediation: "Set 'server_tokens off;' inside the http {} block in /etc/nginx/nginx.conf, then run 'nginx -t && systemctl reload nginx'."
          condition: all
          rules:
            - 'f:/etc/nginx/nginx.conf -> r:^\s*server_tokens\s+off;'

        - id: 10013
          name: "Apache - ensure directory indexing is not enabled"
          description: "Directory listing must be disabled to prevent information disclosure."
          rationale: "Exposing directory contents helps attackers map the filesystem and discover unintended files."
          remediation: "Remove 'Indexes' from the 'Options' directive in /etc/apache2/apache2.conf (for example, 'Options FollowSymLinks' instead of 'Options Indexes FollowSymLinks'), then reload Apache."
          condition: none
          rules:
            - 'f:/etc/apache2/apache2.conf -> r:Options\s+.*Indexes'

        - id: 10014
          name: "Apache - ensure ServerTokens is set to Prod"
          description: "Apache must not disclose detailed version/module/OS information in the Server header."
          rationale: "Non-'Prod' settings leak OS, module, and version details useful for targeted exploitation. The Apache default is 'Full', so an absent directive is also insecure."
          remediation: "Set 'ServerTokens Prod' in /etc/apache2/apache2.conf (or conf-enabled/security.conf), then reload Apache."
          condition: all
          rules:
            - 'f:/etc/apache2/apache2.conf -> r:^\s*ServerTokens\s+Prod\s*$'

        - id: 10015
          name: "Apache - ensure ServerSignature is set to Off"
          description: "Apache must not append version/OS info to auto-generated error pages and directory listings."
          rationale: "Even with ServerTokens minimized, ServerSignature can still leak version details on generated pages. The Apache default is 'On'."
          remediation: "Set 'ServerSignature Off' in /etc/apache2/apache2.conf (or conf-enabled/security.conf), then reload Apache."
          condition: all
          rules:
            - 'f:/etc/apache2/apache2.conf -> r:^\s*ServerSignature\s+Off\s*$'

#. Change the file ownership so that the Wazuh agent can read it:

   .. code-block:: console

      $ sudo chown wazuh:wazuh /var/ossec/etc/custom-sca-files/custom-web-hardening.yml

#. Enable the policy. Add the following lines inside the ``<sca>`` block of ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <policies>
        <policy enabled="yes">/var/ossec/etc/custom-sca-files/custom-web-hardening.yml</policy>
      </policies>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

The policy runs only on endpoints where the ``nginx`` or ``apache2`` package is installed. The following table lists its checks.

+----------+------------------------------------------------------------------------------------------+
| Check ID | Fails when                                                                               |
+==========+==========================================================================================+
| 10010    | NGINX worker processes run as the root user.                                             |
+----------+------------------------------------------------------------------------------------------+
| 10011    | NGINX directory listing is enabled.                                                      |
+----------+------------------------------------------------------------------------------------------+
| 10012    | NGINX exposes version details in HTTP response headers.                                  |
+----------+------------------------------------------------------------------------------------------+
| 10013    | Apache directory listing is enabled.                                                     |
+----------+------------------------------------------------------------------------------------------+
| 10014    | Apache exposes version details in HTTP response headers.                                 |
+----------+------------------------------------------------------------------------------------------+
| 10015    | Apache adds version and OS details to auto-generated error pages and directory listings. |
+----------+------------------------------------------------------------------------------------------+

In this test, only NGINX is installed, so the Apache checks (10013 to 10015) don't evaluate an Apache configuration.

Verify data ingestion
---------------------

SCA scans when the agent starts. NGINX isn't installed yet, so the agent skips the custom policy because its requirements aren't met. Check that the agent loaded the policy:

.. code-block:: console

   $ sudo grep 'Policy "custom_web_hardening" skipped' /var/ossec/logs/ossec.log

.. note::

   If Apache is installed on the endpoint, for example from a web attack use case, the agent doesn't skip the custom policy and the command prints nothing. Apache also uses port 80, which NGINX needs. Restore the lab snapshot, or remove Apache with ``sudo apt purge -y apache2`` and restart the Wazuh agent with ``sudo systemctl restart wazuh-agent``.

Test the configuration
----------------------

#. Install NGINX on the Ubuntu endpoint:

   .. code-block:: console

      $ sudo apt update
      $ sudo apt install -y nginx

#. Apply insecure NGINX settings. These commands expose the NGINX version, enable directory listing, and run the worker processes as root:

   .. code-block:: console

      $ sudo sed -i 's/# server_tokens off;/server_tokens on;/' /etc/nginx/nginx.conf 2>/dev/null || true
      $ sudo sed -i '/^http {/a\    autoindex on;' /etc/nginx/nginx.conf
      $ sudo sed -i 's/^user .*/user root;/' /etc/nginx/nginx.conf
      $ sudo systemctl restart nginx

#. Restart the Wazuh agent to run a new SCA scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

View the findings
-----------------

You see a ``Wazuh SCA check failed - <CHECK_TITLE>`` finding for checks 10010, 10011, and 10012. After you fix the settings in :ref:`Clean up <poc_sca_clean_up>`, you see a ``Wazuh SCA check passed - <CHECK_TITLE>`` finding for each one. ``<CHECK_TITLE>`` is the ``name`` value of the check in the policy file.

#. In the Wazuh dashboard, go to **Endpoint security** > **Configuration Assessment**.

#. Select the Ubuntu agent. The list shows the default ``CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0.`` policy and the ``Custom Web Server Hardening`` policy.

   .. thumbnail:: /images/poc/sca-checks-overview.png
      :title: SCA checks overview
      :alt: Wazuh dashboard Configuration Assessment dashboard for the Ubuntu agent showing the results of the CIS Ubuntu Linux 24.04 LTS Benchmark and Custom Web Server Hardening policies
      :align: center
      :width: 80%

#. Click **+ Add filter** and filter by ``policy.name``. Set **Operator** to ``is`` and **Value** to ``CIS Ubuntu Linux 24.04 LTS Benchmark v1.0.0.`` (the final period is part of the policy name). Review the **Dashboard** and **Inventory** tabs.

   .. thumbnail:: /images/poc/sca-cis-ubuntu-dashboard.png
      :title: CIS Ubuntu Linux 24.04 LTS Benchmark dashboard
      :alt: Wazuh dashboard Configuration Assessment dashboard filtered by the CIS Ubuntu Linux 24.04 LTS Benchmark policy
      :align: center
      :width: 80%

#. Change the filter value to ``Custom Web Server Hardening`` and review the **Dashboard** and **Inventory** tabs.

   .. thumbnail:: /images/poc/sca-custom-policy-dashboard.png
      :title: Custom Web Server Hardening dashboard
      :alt: Wazuh dashboard Configuration Assessment dashboard filtered by the Custom Web Server Hardening policy, with three failed checks
      :align: center
      :width: 80%

   .. thumbnail:: /images/poc/sca-custom-policy-inventory.png
      :title: Custom Web Server Hardening inventory
      :alt: Wazuh dashboard Configuration Assessment inventory listing the six checks of the Custom Web Server Hardening policy and their results
      :align: center
      :width: 80%

Each failed check shows why it failed and how to fix it. Expand a failed check to see the remediation steps in the ``check.remediation`` field.

.. thumbnail:: /images/poc/sca-custom-policy-details.png
   :title: Custom Web Server Hardening check details
   :alt: Details panel of a failed Custom Web Server Hardening check showing the remediation steps in the check.remediation field
   :align: center
   :width: 80%

Troubleshooting
---------------

+------------------------------------------+------------------------------------------------------------------------------------------------------------------------+
| Check                                    | How                                                                                                                    |
+==========================================+========================================================================================================================+
| The scan ran after the change            | A ``sca: INFO: Scan ended`` message is newer than the agent restart.                                                   |
+------------------------------------------+------------------------------------------------------------------------------------------------------------------------+
| The policy loaded before the change      | Run the steps in order. If NGINX already had the insecure settings when the policy loaded, the scan raises no finding. |
+------------------------------------------+------------------------------------------------------------------------------------------------------------------------+
| The policy is loaded                     | The ``<policies>`` block is in the ``<sca>`` block, and the policy file is owned by ``wazuh``.                         |
+------------------------------------------+------------------------------------------------------------------------------------------------------------------------+
| NGINX runs                               | ``systemctl is-active nginx`` prints ``active``. If not, check that port 80 is free.                                   |
+------------------------------------------+------------------------------------------------------------------------------------------------------------------------+
| The ``wazuh-sca`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message.       |
+------------------------------------------+------------------------------------------------------------------------------------------------------------------------+

.. _poc_sca_clean_up:

Clean up
--------

Fix the insecure settings and check that the SCA results change:

#. Restore secure NGINX settings:

   .. code-block:: console

      $ sudo sed -i 's/server_tokens on;/server_tokens off;/' /etc/nginx/nginx.conf 2>/dev/null || true
      $ sudo sed -i 's/autoindex on;/autoindex off;/' /etc/nginx/nginx.conf
      $ sudo sed -i 's/^user .*/user www-data;/' /etc/nginx/nginx.conf
      $ sudo systemctl restart nginx

#. Restart the Wazuh agent to run a new SCA scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

#. Go to **Endpoint security** > **Configuration Assessment**, select the Ubuntu agent, and filter by the ``Custom Web Server Hardening`` policy. Checks 10010, 10011, and 10012 now pass.

   .. thumbnail:: /images/poc/sca-custom-policy-resolved.png
      :title: Custom Web Server Hardening resolved checks
      :alt: Wazuh dashboard Configuration Assessment inventory where the NGINX checks of the Custom Web Server Hardening policy pass
      :align: center
      :width: 80%
