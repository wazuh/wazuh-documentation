.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Enrich selected Wazuh alert indicators with IsMalicious API evidence, separate risk and confidence, and explicit unknown or failed lookup outcomes.

IsMalicious indicator enrichment
================================

This example connects the custom Integrator module to the `IsMalicious API <https://ismalicious.com/api-docs>`__. It enriches selected public IP addresses, Sysmon DNS query names, and file integrity monitoring hashes. The integration sends the observable to the provider and adds the selected response fields to a new Wazuh alert.

This example provides advisory enrichment. It does not configure active response or automatic blocking. An unknown hash, missing evidence, or failed lookup is not a clean verdict.

Requirements
------------

-  A Wazuh 4.14 manager with the bundled Python interpreter and ``requests`` package.
-  An IsMalicious account with API access and sufficient lookup quota.
-  The complete ``X-API-KEY`` credential from IsMalicious: Base64 of ``apiKey:apiSecret``. The raw API key alone is insufficient.
-  Alerts containing one of the selected observable fields described below.

Configure the Wazuh server
--------------------------

#. Download the :download:`custom-ismalicious script </_static/integrations/custom-ismalicious>` and save it as ``/var/ossec/integrations/custom-ismalicious`` on the Wazuh server. Review the script before installing it.

#. Assign the script permissions and confirm the HTTP library is available:

   .. code-block:: console

      chown root:wazuh /var/ossec/integrations/custom-ismalicious
      chmod 750 /var/ossec/integrations/custom-ismalicious
      /var/ossec/framework/python/bin/python3 -c "import requests"

#. Add the configuration below inside ``<ossec_config>`` in ``/var/ossec/etc/ossec.conf``. Replace ``<ENCODED_CREDENTIAL>`` with your complete credential. Keep the file and backups restricted to authorized administrators.

   .. code-block:: xml

      <integration>
        <name>custom-ismalicious</name>
        <api_key><ENCODED_CREDENTIAL></api_key>
        <alert_format>json</alert_format>
        <group>syscheck,sysmon,sshd</group>
        <level>5</level>
      </integration>

   Adapt the groups and level to the alerts you intend to enrich. Use narrow filters first. The script limits each alert to five distinct observable lookups, although the documented fields normally yield fewer.

#. Add these rules to ``/var/ossec/etc/rules/local_rules.xml``. Choose unused rule IDs in your environment if these IDs are already assigned:

   .. code-block:: xml

      <group name="ismalicious,">
        <rule id="100500" level="3">
          <decoded_as>json</decoded_as>
          <field name="integration">^ismalicious$</field>
          <description>IsMalicious indicator enrichment result.</description>
        </rule>
        <rule id="100501" level="10">
          <if_sid>100500</if_sid>
          <field name="ismalicious.status">^ok$</field>
          <field name="ismalicious.verdict">^malicious$</field>
          <description>IsMalicious reports malicious evidence for $(ismalicious.indicator).</description>
        </rule>
        <rule id="100502" level="5">
          <if_sid>100500</if_sid>
          <field name="ismalicious.status">^error$</field>
          <description>IsMalicious lookup failed. Check authentication, quota or provider availability.</description>
        </rule>
      </group>

#. Validate the configuration and restart the manager:

   .. code-block:: console

      /var/ossec/bin/wazuh-analysisd -t
      systemctl restart wazuh-manager

Observable mapping
------------------

The script extracts the following fields from the original alert:

-  Public IPs: ``data.srcip``, ``data.dstip``, and ``data.win.eventdata.destinationIp``. Private and non-global IPs are skipped.
-  DNS names: ``data.win.eventdata.queryName`` when it is a valid domain name.
-  File hashes: ``syscheck.sha256_after``, falling back to ``sha1_after`` or ``md5_after``. Only one hash per file is checked.

Other fields and full URLs are not sent. Adapt this allowlist explicitly if your decoders use different field names. The script does not search arbitrary alert text for indicators. It ignores alerts in the ``ismalicious`` rule group to avoid recursive enrichment.

Each lookup uses HTTPS, a 25-second timeout, encoded query parameters, and disabled redirects. Authentication failures (401/403), rate limits (429), server errors, timeouts, and invalid JSON become error alerts. The example does not retry automatically.

Interpret the result
--------------------

The new alert retains the original agent and ``original_alert_id``. The ``ismalicious`` object includes the server verdict, separate risk score and confidence, blocklist hit count, reasons, source summary, contradictions, observed time, freshness, review flags, and a report link.

Missing scores remain ``null``. Raw contextual source rows are not counted as detections. An unknown hash remains ``unknown`` even if the API returns ``malicious: false`` or a risk score of zero. A reviewed delisting also produces an unclassified enrichment result rather than a malicious alert.

Inspect ``ismalicious.reasons`` and ``ismalicious.contradictions`` before deciding on a response. The example does not declare an indicator safe solely because it lacks detections.

Test the example
----------------

Use ``/var/ossec/bin/wazuh-logtest`` to check the JSON rules with a synthetic message. This tests rule matching only; it is not a live reputation result:

.. code-block:: json

   {"integration":"ismalicious","original_alert_id":"synthetic","ismalicious":{"indicator":"example.invalid","status":"ok","verdict":"malicious","risk_score":90,"confidence":60,"reasons":["synthetic fixture, not a real detection"]}}

The expected rule is ``100501``. Replace ``status`` with ``error`` and ``verdict`` with ``unknown`` to test rule ``100502``. A successful unknown lookup matches the base rule ``100500``.

Generate a test alert from a monitored lab agent using an actual configured decoder, then inspect the resulting alert in the Wazuh dashboard. Confirm the observable mapping, original agent, error outcomes, and API quota usage before enabling the integration for wider alert groups.

The downloadable :download:`unit tests </_static/integrations/tests/test_custom_ismalicious.py>` exercise synthetic HTTP responses and the queue message format. Place the test file in a ``tests`` directory next to the downloaded script and run:

.. code-block:: console

   python3 -m unittest discover -s tests -v

These tests do not require a real API key. They do not replace a live Wazuh manager, queue, and ``wazuh-logtest`` verification.
