.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh helps meet the TSC common criteria CC6.8 requirement by detecting malicious files on monitored endpoints with the Wazuh CTI IOC list and custom hash blocklists.

Common criteria 6.8
=====================

The TSC common criteria CC6.8 states, “The entity implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software to meet the entity's objectives.” This means the entity should be able to detect malicious software on its systems and act on it.

Wazuh helps meet the CC6.8 requirement by detecting malicious files on monitored endpoints. Wazuh compares the SHA256 hash of each new or changed file with the Wazuh CTI IOC list and with your own hash blocklists and raises a finding when it finds a match. Security personnel can view these findings on the Wazuh dashboard.

Use case: Detecting a malicious file download on a monitored Ubuntu endpoint
--------------------------------------------------------------------------------

Follow the steps below to identify a malicious file downloaded to a monitored Ubuntu 24.04 endpoint. Wazuh matches the file hash against the Wazuh CTI IOC list.

Ubuntu endpoint
^^^^^^^^^^^^^^^^

#. Create the directory to monitor. Real-time monitoring only attaches to a directory that exists when the Wazuh agent starts, so create it before you restart the agent:

   .. code-block:: console

      $ mkdir -p /home/<USER>/Downloads

#. Add the following configuration to the ``<syscheck>`` block of the ``/var/ossec/etc/ossec.conf`` file:

   .. code-block:: xml

      <directories realtime="yes">/home/<USER>/Downloads</directories>

   Replace ``<USER>`` with the name of the user whose ``Downloads`` directory you monitor.

#. Restart the Wazuh agent:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

#. Go to the monitored directory and download the EICAR test file:

   .. code-block:: console

      $ cd /home/<USER>/Downloads
      $ curl -fL -o eicar.com.txt https://secure.eicar.org/eicar.com.txt

Wazuh dashboard
^^^^^^^^^^^^^^^^

#. Open the menu (**☰**) and go to **Threat intelligence** > **Threat Hunting**, and switch to the **Findings** tab.

   .. thumbnail:: /images/compliance/tsc/common-criteria/overview-threat-hunting-malware.png
      :title: Wazuh Overview dashboard - Threat Hunting
      :alt: Wazuh Overview dashboard - Threat Hunting
      :align: center
      :width: 80%

#. Apply the filter ``wazuh.integration.name:wazuh-fim and wazuh.rule.title:Malicious*`` and select the finding to view its details. This filter selects the findings of the ``Malicious hash detected`` rule by its title. Don't filter on ``wazuh.rule.id``: rule IDs change when the Wazuh CTI ruleset is updated. The finding can take a few minutes to appear.

   .. thumbnail:: /images/compliance/tsc/common-criteria/threat-hunting-findings-list.png
      :title: Threat Hunting findings list
      :alt: Threat Hunting findings list
      :align: center
      :width: 80%

   The finding details show the hashes and the path of the downloaded file. Wazuh matches the file hash against the Wazuh CTI IOC list, which contains the EICAR test file, and the ``Malicious hash detected`` rule raises the finding at high severity.

   .. thumbnail:: /images/compliance/tsc/common-criteria/malicious-hash-finding-details.png
      :title: Malicious hash detected finding details
      :alt: Malicious hash detected finding details
      :align: center
      :width: 80%

Use case: Detecting a known malicious file on a monitored Ubuntu endpoint
----------------------------------------------------------------------------

In this use case, you add the SHA256 hash of a test file to a custom blocklist. Wazuh then raises a finding when the file appears in a monitored directory of an Ubuntu 24.04 endpoint. The test file is harmless and stands in for a malware sample.

On the Wazuh dashboard, you create five items in the **Draft** space: an integration, a KVDB that stores the hashes, two decoders, and a detection rule. Then you promote them to the **Custom** space and create a detector that runs the rule.

Ubuntu endpoint
^^^^^^^^^^^^^^^^

#. Get the SHA256 hash of the test file content. You add this hash to the blocklist later:

   .. code-block:: console

      $ echo "Wazuh custom malware hash test" | sha256sum

   The output is ``20027df32310861b6deaab6cc5cd41ded2980b2462296131353c0b98f8bccb4c``.

#. Create the directory to monitor. Real-time monitoring only attaches to a directory that exists when the Wazuh agent starts, so create it before you restart the agent:

   .. code-block:: console

      $ mkdir -p /home/<USER>/Downloads

#. Add the following configuration to the ``<syscheck>`` block of the ``/var/ossec/etc/ossec.conf`` file:

   .. code-block:: xml

      <directories check_all="yes" realtime="yes">/home/<USER>/Downloads</directories>

   Replace ``<USER>`` with the name of the user whose ``Downloads`` directory you monitor.

#. Restart the Wazuh agent:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
^^^^^^^^^^^^^^^^

Make sure the space selector reads **Draft**, then perform the following steps.

#. Go to **Ruleset management** > **Overview** > **Integrations** > **Actions** > **Create**. Set **Title** to ``fim-hash-blocklist``, **Category** to System Activity, and **Author** to Security Team. Click **Create integration**.

#. Go to **Ruleset management** > **Normalization** > **KVDBs** > **Actions** > **Create** and select the ``fim-hash-blocklist`` integration. Set **Title** to ``malware_hashes`` and **Author** to Security Team. Under **Content**, add an entry with the key ``20027df32310861b6deaab6cc5cd41ded2980b2462296131353c0b98f8bccb4c`` and the value ``Custom malware hash test file``. Click **Create KVDB**.

#. Go to **Ruleset management** > **Normalization** > **Decoders** > **Actions** > **Create** and select the ``fim-hash-blocklist`` integration. Paste the following root decoder in the **YAML Editor** and click **Create decoder**. A new installation has no root decoder in the custom space. Skip this step only if your custom space already has the ``decoder/core-wazuh-message/0`` root decoder.

   .. code-block:: yaml

      name: "decoder/core-wazuh-message/0"
      metadata:
        author: "Wazuh, Inc."
        description: "Base decoder to process Wazuh message format, parses location part\
          \ and enriches the events that comes from a Wazuh agent with the host information."
        documentation: ""
        references:
        - "https://documentation.wazuh.com/"
        supports: []
        title: "Wazuh message decoder"
      normalize:
      - map:
        - _tmp_json: "parse_json($event.original)"
      enabled: true

#. Create a second decoder in the same integration with the following content. It reads FIM events and, when the file hash is a key in the ``malware_hashes`` KVDB, adds the ``threat.feed`` fields:

   .. code-block:: yaml

      name: "decoder/fim-hash-blocklist/0"
      metadata:
        title: "FIM hash blocklist decoder"
        author: "Security Team"
        description: "Decodes Wazuh FIM events and flags files whose SHA256 hash is in the malware_hashes KVDB."
        references: []
        documentation: ""
        supports: []
      parents:
      - "decoder/core-wazuh-message/0"
      check: "$_tmp_json.module == \"fim\""
      normalize:
      - map:
        - event.kind: "event"
        - event.category: "array_append_unique(file)"
        - event.dataset: "wazuh.fim"
        - file.path: "$_tmp_json.data.file.path"
        - file.hash.sha256: "$_tmp_json.data.file.hash.sha256"
      - check:
        - file.hash.sha256: "in_kvdb('malware_hashes')"
        map:
        - threat.feed.name: "malware_hashes"
        - threat.feed.description: "kvdb_lookup('malware_hashes', $file.hash.sha256)"
      - map:
        - _tmp_json: "delete()"
      enabled: true

#. Go to **Ruleset management** > **Overview** > **Space actions** > **Edit**. Confirm the status is **Enabled**, select ``decoder/core-wazuh-message/0`` under **Root decoder**, and click **Save**.

#. Go to **Ruleset management** > **Detection** > **Rules** > **Actions** > **Create**, select **YAML Editor**, and choose the ``fim-hash-blocklist`` integration. Paste the following rule and click **Create rule**. The ``compliance`` section maps the finding to CC6.8:

   .. code-block:: yaml

      logsource:
        product: fim-hash-blocklist
      level: high
      status: experimental
      enabled: true
      detection:
        condition: selection
        selection:
          event.dataset: wazuh.fim
          threat.feed.name: malware_hashes
      metadata:
        title: Known malicious file detected - {{file.path}}
        author: Security Team
        description: Detects a file whose SHA256 hash is listed in the malware_hashes KVDB.
        references: []
        documentation: ''
        supports: []
      mitre:
        tactic:
          id:
            - TA0002
          name:
            - Execution
        technique:
          id:
            - T1204
          name:
            - User Execution
      compliance:
        tsc:
          - CC6.8

#. Go to **Ruleset management** > **Overview**, click **Space actions** > **Promote**, type the confirmation message, and click **Promote**. This moves the content from **Draft** to **Test**. Switch the space selector to **Test** and repeat to move the content to **Custom**.

#. Go to **Ruleset management** > **Detection** > **Detectors** > **Create detector**. Set **Name** to ``fim-hash-blocklist-detector``, **Select indexes/aliases** to ``wazuh-events-v5-system-activity``, **Space** to Custom, **Integration** to ``fim-hash-blocklist``, and **Run every** to 1 minute. Click **Create detector**.

Wait about two minutes after the promotion before you test. The Wazuh manager loads the custom space content periodically.

Test the configuration
^^^^^^^^^^^^^^^^^^^^^^^^

Create the test file in the monitored directory of the Ubuntu endpoint:

.. code-block:: console

   $ echo "Wazuh custom malware hash test" > /home/<USER>/Downloads/malware_test.txt

Visualize the findings
^^^^^^^^^^^^^^^^^^^^^^^^

#. Open the menu (**☰**) and go to **Threat intelligence** > **Threat Hunting**. Switch to the **Findings** tab.

#. Apply the filter ``wazuh.integration.name: fim-hash-blocklist``. A ``Known malicious file detected - /home/<USER>/Downloads/malware_test.txt`` finding appears with level ``high``. The finding can take a few minutes to appear.

   .. thumbnail:: /images/compliance/tsc/common-criteria/threat-hunting-hash-blocklist-findings.png
      :title: Threat Hunting findings for the hash blocklist
      :alt: Threat Hunting findings for the hash blocklist
      :align: center
      :width: 80%

#. Select the finding to view its details. The ``threat.feed.name`` and ``threat.feed.description`` fields come from the KVDB entry.

   .. thumbnail:: /images/compliance/tsc/common-criteria/hash-blocklist-finding-details.png
      :title: Hash blocklist finding details
      :alt: Hash blocklist finding details
      :align: center
      :width: 80%

After the test, delete the ``malware_test.txt`` file.
