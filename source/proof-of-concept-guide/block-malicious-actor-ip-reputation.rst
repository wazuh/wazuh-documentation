.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Use a Wazuh KVDB, custom decoders and rules, and Active Response to detect and automatically block a known malicious IP address from accessing a web server. Learn more about this in this PoC.

Blocking a known malicious actor
================================

In this use case, you block a malicious IP address from accessing web servers monitored by Wazuh. The RHEL endpoint simulates the attacker. You add its IP address to a :doc:`key-value database (KVDB) </user-manual/data-analysis/key-value-databases>` of malicious IP addresses. Then, you configure :doc:`Active Response </user-manual/capabilities/active-response/index>` to run the :doc:`block-ip </user-manual/capabilities/active-response/default-active-response-scripts>` script on the Ubuntu and Windows web servers to block the address.

How it works
------------

#. The Wazuh agents on the Ubuntu and Windows endpoints forward Apache access logs to the Wazuh manager.

#. A custom decoder parses each request and checks whether its source IP address exists in the ``malicious_IPs`` KVDB.

#. If the IP address exists in the KVDB, the ``http_detector`` detector generates a finding based on a custom rule.

#. An Active Response monitor checks for these findings every minute and triggers the ``block_traffic`` Active Response. The Active Response blocks the source IP address on the endpoint for 60 seconds after the last Active Response command.

#. A second decoder and rule convert the ``block-ip`` log messages into a finding that records the blocking action.

Endpoints
---------

+--------------+--------------------------------------------------------------------------------+
| Endpoint     | Role                                                                           |
+==============+================================================================================+
| RHEL 9.0     | Attacker. Its IP address is in the malicious IP KVDB.                          |
+--------------+--------------------------------------------------------------------------------+
| Ubuntu 24.04 | Victim running an Apache web server. Active Response blocks the attacker here. |
+--------------+--------------------------------------------------------------------------------+
| Windows 11   | Victim running an Apache web server. Active Response blocks the attacker here. |
+--------------+--------------------------------------------------------------------------------+

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

      $ sudo ufw status
      $ sudo ufw app list
      $ sudo ufw allow 'Apache'

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

Windows endpoint
^^^^^^^^^^^^^^^^

#. Install the latest `Visual C++ Redistributable package <https://aka.ms/vs/17/release/vc_redist.x64.exe>`__.

#. Download the `Apache web server <https://www.apachelounge.com/download/>`__ Win64 ZIP file. It contains precompiled binaries for Windows.

#. Unzip the file and copy the extracted ``Apache24`` folder to ``C:\``.

#. In a PowerShell terminal with administrator privileges, go to ``C:\Apache24\bin\`` and start Apache:

   .. code-block:: ps1con

      > .\httpd.exe

   The first time you run Apache, Windows Defender Firewall shows a notification.

#. Click **Allow Access**. This creates an inbound firewall rule that allows incoming traffic on port 80.

#. Open ``http://<WINDOWS_IP>`` in a browser to check that the Apache landing page loads. Also check that the RHEL endpoint can reach this URL.

#. Append the following lines to ``C:\Program Files (x86)\ossec-agent\ossec.conf`` so that the Wazuh agent monitors the Apache access logs:

   .. code-block:: xml

      <ossec_config>
        <localfile>
          <log_format>apache</log_format>
          <location>C:\Apache24\logs\access_log</location>
        </localfile>
      </ossec_config>

#. Open a second PowerShell terminal with administrator privileges, because Apache keeps the first one busy, and restart the Wazuh agent:

   .. code-block:: ps1con

      > Restart-Service -Name WazuhSvc

Wazuh dashboard
^^^^^^^^^^^^^^^

In the Wazuh dashboard, you create the custom decoders, KVDB, and rules in the **Draft** space and promote them to the **Custom** space. Then you create the detector, the Active Response, and the :ref:`monitor <alerting_active_response_monitors>` that runs it. See :doc:`Spaces </user-manual/data-analysis/space>`.

Create the decoders
~~~~~~~~~~~~~~~~~~~

#. Go to **Ruleset management** > **Decoders**.

#. Select the **Draft** space, then select **Actions** > **Create**.

#. If you haven't created it before, click **Create integration** and create an integration titled ``custom_http``. Select **Network Activity** as the **Category** and enter your name as the **Author**.

   .. thumbnail:: /images/poc/block-malicious-actor-create-integration.png
      :title: Create the custom_http integration
      :alt: Wazuh dashboard Create integration panel with the custom_http title and the Network Activity category
      :align: center
      :width: 80%

#. Switch to the YAML editor, select the ``custom_http`` integration, enter the following decoder, and click **Create decoder**. The decoder is a copy of the Wazuh message root decoder, ``decoder/core-wazuh-message/0``. Each space needs its own root decoder, and you set this one as the ``root`` decoder of the **Draft** space in a later step. It adds a check so that only events from the Apache access log and the Active Response log enter the ``custom_http`` integration. Without it, the Custom space indexes every other agent event a second time.

   .. code-block:: yaml

      name: "decoder/core-wazuh-message/0"
      metadata:
        author: "Wazuh, Inc."
        date: "2026-06-10T19:32:11Z"
        description: "Base decoder to process Wazuh message format, parses location part\
          \ and enriches the events that comes from a Wazuh agent with the host information."
        documentation: ""
        modified: "2026-06-10T19:32:11Z"
        references:
        - "https://documentation.wazuh.com/"
        supports: []
        title: "Wazuh message decoder"
      check: "regex_match($wazuh.protocol.location, 'access[.]log$|access_log$|active-responses[.]log$')"
      normalize:
      - map:
        - _tmp_json: "parse_json($event.original)"
      enabled: true

   .. thumbnail:: /images/poc/block-malicious-actor-root-decoder-yaml.png
      :title: Root decoder of the Draft space
      :alt: Wazuh dashboard Create decoder page in the YAML editor with the copy of the Wazuh message root decoder for the custom_http integration
      :align: center
      :width: 80%

#. Select **Actions** > **Create** again. Switch to the YAML editor, select the ``custom_http`` integration, enter the following decoder for Apache access logs, and click **Create decoder**. Its ``threat.indicator.description`` mapping looks up the source IP address in the ``malicious_IPs`` KVDB. It covers the Apache combined and common log formats.

   .. code-block:: yaml

      ---
      name: "decoder/apache-access/0"
      metadata:
        author: "Wazuh, Inc."
        date: "2026-07-09T13:25:54Z"
        description: "Decoder for Apache HTTP Server access logs."
        documentation: ""
        modified: "2026-07-10T13:49:08Z"
        references:
        - "https://httpd.apache.org/docs/2.4/logs.html"
        supports: []
        title: "Apache HTTP Server access logs decoder"
      parents:
      - "decoder/core-wazuh-message/0"
      parse|event.original:
      - "<source.address> - <user.name> [<event.start/HTTPDATE>] \"<_http_request>\" <http.response.status_code> <_ignore/literal/->?<http.response.body.bytes>(? \"<http.request.referrer>\" \"<user_agent.original>\")"
      normalize:
      - map:
        - event.category: "array_append(web)"
        - event.type: "array_append(access)"
        - event.action: "http-request"
        - event.dataset: "apache-access"
        - event.kind: "event"
        - service.type: "apache"
        - source.ip: "$source.address"
        - threat.indicator.description: "kvdb_lookup('malicious_IPs', $source.ip)"
        parse|_http_request:
        - "<http.request.method> <url.original> HTTP/<http.version>"
      - check: "number_lt($http.response.status_code, 400)"
        map:
        - event.outcome: "success"
      - check: "number_gte($http.response.status_code, 400)"
        map:
        - event.outcome: "failure"
      enabled: true

   .. thumbnail:: /images/poc/block-malicious-actor-decoder-config.png
      :title: Apache access decoder
      :alt: Wazuh dashboard Create decoder page in the YAML editor with the Apache access log decoder for the custom_http integration
      :align: center
      :width: 80%

#. Create the following decoder for the ``block-ip`` Active Response logs the same way, in the ``custom_http`` integration:

   .. code-block:: yaml

      ---
      name: "decoder/active-response-block-ip/0"
      metadata:
        author: "Custom"
        date: "2026-07-11T02:03:54Z"
        description: "Decoder for active-response block-ip script logs."
        documentation: ""
        modified: "2026-07-11T02:27:29Z"
        references:
        - ""
        supports: []
        title: "Active response block-ip decoder"
      parents:
      - "decoder/core-wazuh-message/0"
      parse|event.original:
      - "<_raw_timestamp> active-response/bin/block-ip: [<log.level>] Method=<_method> Action=<_action>\
        \ Details=IP <source.ip> successfully blocked"
      - "<_raw_timestamp> active-response/bin/block-ip.exe: [<log.level>] Method=<_method> Action=<_action>\
        \ Details=IP <source.ip> successfully blocked"
      normalize:
      - map:
        - event.start: "parse_date($_raw_timestamp, '%Y/%m/%d %H:%M:%S')"
        - event.category: "array_append(network)"
        - event.type: "array_append(denied)"
        - event.action: "block-ip"
        - event.dataset: "active-response-block-ip"
        - event.kind: "alert"
        - event.module: "active-response"
        - service.type: "active-response"
        - network.protocol: "$_method"
      - check:
        - _action: "success"
        map:
        - event.outcome: "success"
      - check:
        - _action: "regex_not_match(success)"
        map:
        - event.outcome: "failure"
      enabled: true

   .. thumbnail:: /images/poc/block-malicious-actor-block-ip-decoder-config.png
      :title: Active Response block-ip decoder
      :alt: Wazuh dashboard Create decoder page in the YAML editor with the block-ip Active Response decoder for the custom_http integration
      :align: center
      :width: 80%

Create the KVDB
~~~~~~~~~~~~~~~

#. Go to **Ruleset management** > **KVDBs**. In the **Draft** space, click **Actions** and select **Create**.

#. Fill in the following fields.

   +-------------+-----------------------------+
   | Field       | Value                       |
   +=============+=============================+
   | Integration | ``custom_http``             |
   +-------------+-----------------------------+
   | Title       | ``malicious_IPs``           |
   +-------------+-----------------------------+
   | Author      | ``Custom``                  |
   +-------------+-----------------------------+
   | Description | ``A list of malicious IPs`` |
   +-------------+-----------------------------+

#. Under **Content**, click **Add**. Enter ``<RHEL_IP>`` as the **Key** and ``malicious`` as the **Value**.

#. Click **Create KVDB**.

   .. thumbnail:: /images/poc/block-malicious-actor-kvdb-config.png
      :title: KVDB configuration
      :alt: Wazuh dashboard Create KVDB page with the malicious_IPs KVDB and the RHEL IP address with the value malicious
      :align: center
      :width: 80%

Create the rules
~~~~~~~~~~~~~~~~

#. Go to **Ruleset management** > **Rules**. Select the **Draft** space, then select **Actions** > **Create**.

#. Switch to the YAML editor, select the ``custom_http`` integration, enter the following rule, and click **Create rule**. It detects successful HTTP requests from an IP address in the KVDB:

   .. code-block:: yaml

      logsource:
        product: custom_http
      tags: []
      falsepositives:
        - Normal web traffic
      level: high
      status: stable
      enabled: true
      detection:
        condition: selection
        selection:
          event.dataset:
            - apache-access
          event.outcome:
            - success
          threat.indicator.description:
            - malicious
      metadata:
        title: 'Apache: Successful HTTP connection from malicious IP'
        author: Custom
        description: >-
          Detects a successful HTTP request/response cycle on the Apache web server,
          where the response status code is below 400 and the source IP is contained in the malicious IP KVDB.
        references:
          - ''
        documentation: ''
        supports:
          - ''
        modified: '2026-07-10T14:24:11Z'

#. Create the following rule the same way, in the ``custom_http`` integration. It detects when Active Response blocks an IP address:

   .. code-block:: yaml

      logsource:
        product: custom_http
      tags: []
      falsepositives: []
      level: low
      status: stable
      enabled: true
      detection:
        condition: Selection_1
        Selection_1:
          event.dataset:
            - active-response-block-ip
          event.outcome:
            - success
      metadata:
        title: Active response blocked IP - {{source.ip}}
        author: Custom
        description: >-
          Detects when Active response successfully blocks an IP.
        references:
          - ''
        documentation: ''
        supports:
          - ''
        modified: '2026-07-11T03:24:01Z'

   .. thumbnail:: /images/poc/block-malicious-actor-rules-config.png
      :title: Rules configuration
      :alt: Wazuh dashboard Ruleset management Rules page in the Draft space listing the two custom_http rules
      :align: center
      :width: 80%

Set the root decoder and promote the content
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Go to **Ruleset management** > **Overview**, select the **Draft** space, and select **Space actions** > **Edit**. Turn on **Status**, select ``decoder/core-wazuh-message/0`` in the **Root Decoder** field, and click **Save**.

   .. thumbnail:: /images/poc/block-malicious-actor-root-decoder-config.png
      :title: Root decoder configuration
      :alt: Wazuh dashboard Draft space Overview page with the Space actions menu open and the Edit option
      :align: center
      :width: 80%

#. Go to **Ruleset management** > **Overview** and select **Space actions** > **Promote**. The Promote page lists the changes to promote. Click **Promote**, type ``promote`` in the confirmation dialog, and click **Promote**. This moves the assets from the **Draft** space to the **Test** space.

   .. thumbnail:: /images/poc/block-malicious-actor-promote-page.png
      :title: Promote page of the Draft space
      :alt: Wazuh dashboard Promote page listing the integration, decoders, KVDB, and rules to promote from the Draft space to the Test space
      :align: center
      :width: 80%

   .. thumbnail:: /images/poc/block-malicious-actor-promote-dialog.png
      :title: Promote confirmation dialog
      :alt: Wazuh dashboard confirmation dialog to promote the entities to the Test space, with promote typed in the confirmation field
      :align: center
      :width: 80%

#. Select the **Test** space, select **Space actions** > **Promote**, and confirm the promotion to move the assets to the **Custom** space. Wait a few minutes for the changes to apply.

   .. thumbnail:: /images/poc/block-malicious-actor-promote-test-page.png
      :title: Promote page of the Test space
      :alt: Wazuh dashboard Promote page listing the integration, decoders, KVDB, and rules to promote from the Test space to the Custom space
      :align: center
      :width: 80%

   .. thumbnail:: /images/poc/block-malicious-actor-promote-test-dialog.png
      :title: Promote to the Custom space dialog
      :alt: Wazuh dashboard confirmation dialog to promote the entities to the Custom space, with promote typed in the confirmation field
      :align: center
      :width: 80%

Create the detector
~~~~~~~~~~~~~~~~~~~

#. Go to **Ruleset management** > **Detectors** and click **Create detector**.

#. Enter ``http_detector`` as the **Name**. In the **Data source** drop-down, select ``wazuh-events-v5-network-activity``.

#. In the **Rules** section, change the space to **Custom** and select ``custom_http`` in the **Integration** drop-down.

#. Click **Create detector**.

   .. thumbnail:: /images/poc/block-malicious-actor-detector-config.png
      :title: Detector configuration
      :alt: Wazuh dashboard http_detector page showing the detector details and its two active rules
      :align: center
      :width: 80%

Create the Active Response
~~~~~~~~~~~~~~~~~~~~~~~~~~

#. Go to **Explore** > **Active Responses** and click **Create active response**.

#. Fill in the following fields.

   +------------------+--------------------------------------------------------------+
   | Field            | Value                                                        |
   +==================+==============================================================+
   | Name             | ``block_traffic``                                            |
   +------------------+--------------------------------------------------------------+
   | Description      | ``Adds a referenced IP address to the firewall's blocklist`` |
   +------------------+--------------------------------------------------------------+
   | Executable       | ``block-ip``                                                 |
   +------------------+--------------------------------------------------------------+
   | Type             | Stateful                                                     |
   +------------------+--------------------------------------------------------------+
   | Stateful timeout | ``60`` (seconds)                                             |
   +------------------+--------------------------------------------------------------+
   | Location         | Local                                                        |
   +------------------+--------------------------------------------------------------+

   .. thumbnail:: /images/poc/block-malicious-actor-active-response-form.png
      :title: Active response form
      :alt: Wazuh dashboard Create active response form with the block_traffic name, the block-ip executable, and a stateful timeout of 60 seconds
      :align: center
      :width: 80%

#. Click **Create**.

   .. thumbnail:: /images/poc/block-malicious-actor-active-response-config.png
      :title: Active response configuration
      :alt: Wazuh dashboard Active responses list showing the block_traffic active response
      :align: center
      :width: 80%

Create the Active Response monitor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The monitor needs at least one ``custom_http`` finding, because its **Field** list offers ``service.type`` only after such a finding exists.

#. From the RHEL endpoint, send one request to a web server. Replace ``<WEBSERVER_IP>`` with the IP address of the Ubuntu or Windows endpoint:

   .. code-block:: console

      $ curl http://<WEBSERVER_IP>

#. Wait about two minutes. Then go to **Threat intelligence** > **Threat Hunting** > **Findings** and check that a finding with ``wazuh.integration.name: custom_http`` appears.

   If no finding appears, check that the assets are in the **Custom** space and that ``http_detector`` is active in **Ruleset management** > **Detectors**.

#. Go to **Explore** > **Alerting**, select the **Monitors** tab, and click **Create monitor**.

#. Fill in the following fields.

   +-------------------------+----------------------------------------+
   | Field                   | Value                                  |
   +=========================+========================================+
   | Monitor name            | ``apache_malicious_ip_monitor``        |
   +-------------------------+----------------------------------------+
   | Monitor type            | Active Response monitor                |
   +-------------------------+----------------------------------------+
   | Monitor defining method | Visual editor                          |
   +-------------------------+----------------------------------------+
   | Frequency               | By interval                            |
   +-------------------------+----------------------------------------+
   | Run every               | 1 Minute(s)                            |
   +-------------------------+----------------------------------------+
   | Index                   | ``wazuh-findings-v5-network-activity`` |
   +-------------------------+----------------------------------------+
   | Query name              | ``apache_malicious_ip_query``          |
   +-------------------------+----------------------------------------+
   | Field                   | ``service.type`` is ``apache``         |
   +-------------------------+----------------------------------------+

   .. thumbnail:: /images/poc/block-malicious-actor-monitor-type.png
      :title: Monitor type
      :alt: Wazuh dashboard Create monitor page with the Active Response monitor type selected
      :align: center
      :width: 80%

   .. thumbnail:: /images/poc/block-malicious-actor-monitor-form.png
      :title: Monitor configuration form
      :alt: Wazuh dashboard Create monitor page with the apache_malicious_ip_monitor details filled in
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following fields.

   +-------------------------+---------------------------------+
   | Field                   | Value                           |
   +=========================+=================================+
   | Trigger name            | ``apache_malicious_ip_trigger`` |
   +-------------------------+---------------------------------+
   | Severity level          | 1 (Highest)                     |
   +-------------------------+---------------------------------+
   | Specify queries or tags | ``apache_malicious_ip_query``   |
   +-------------------------+---------------------------------+

#. In the **Actions** subsection, click **Add active response** and fill in the following fields.

   +-----------------+--------------------------------+
   | Field           | Value                          |
   +=================+================================+
   | Action name     | ``apache_malicious_ip_action`` |
   +-----------------+--------------------------------+
   | Active response | ``block_traffic``              |
   +-----------------+--------------------------------+

#. Click **Create**.

   .. thumbnail:: /images/poc/block-malicious-actor-monitor-config.png
      :title: Monitor configuration
      :alt: Wazuh dashboard page of the apache_malicious_ip_monitor Active Response monitor with its trigger
      :align: center
      :width: 80%

.. _poc_block_attack_emulation:

Attack emulation
----------------

#. From the RHEL endpoint, send a request to one of the web servers:

   .. code-block:: console

      $ curl http://<WEBSERVER_IP>

   The first requests succeed. Within about two minutes, the Active Response monitor runs. Wazuh then blocks further connections from the RHEL endpoint to the web server.

#. Wait about one minute, then send the request again:

   .. code-block:: console

      $ curl --max-time 10 http://<WEBSERVER_IP>

   While the block is active, the request fails with ``curl: (28) Connection timed out after 10001 milliseconds``. If the request succeeds, the monitor hasn't run yet. Wait 30 seconds and send it again.

#. Check the block on the victim endpoint with the command in the following table.

   +----------+----------------------------------------------------------------------------------+----------------------------------------------------+
   | Endpoint | Command                                                                          | Result                                             |
   +==========+==================================================================================+====================================================+
   | Ubuntu   | ``sudo iptables -L INPUT -n | grep <RHEL_IP>``                                   | A ``DROP`` rule for the RHEL IP address.           |
   +----------+----------------------------------------------------------------------------------+----------------------------------------------------+
   | Windows  | ``netsh advfirewall firewall show rule name="WAZUH ACTIVE RESPONSE BLOCKED IP"`` | The firewall rule that blocks the RHEL IP address. |
   +----------+----------------------------------------------------------------------------------+----------------------------------------------------+

When the block expires, the Wazuh agent removes the rule and requests succeed again. The block lasts 60 seconds, the Active Response stateful timeout, after the last Active Response command. Each new finding for the same IP address sends the command again and restarts the timer. The block lasts longer while the RHEL endpoint keeps sending requests.

View the findings
-----------------

You see the finding ``Apache: Successful HTTP connection from malicious IP`` for requests from the RHEL endpoint, and ``Active response blocked IP - <RHEL_IP>`` when Active Response blocks it.

In the Wazuh dashboard, go to **Threat intelligence** > **Threat Hunting**, select **Findings**, and enter ``wazuh.integration.name: custom_http`` in the search bar.

-  Ubuntu endpoint

   .. thumbnail:: /images/poc/block-malicious-actor-ubuntu-findings.png
      :title: Findings for the Ubuntu endpoint
      :alt: Wazuh dashboard Threat Hunting Findings tab showing the Apache: Successful HTTP connection from malicious IP and Active response blocked IP findings for the Ubuntu 24.04 agent
      :align: center
      :width: 80%

-  Windows endpoint

   .. thumbnail:: /images/poc/block-malicious-actor-windows-findings.png
      :title: Findings for the Windows endpoint
      :alt: Wazuh dashboard Threat Hunting Findings tab showing the Apache: Successful HTTP connection from malicious IP and Active response blocked IP findings for the Windows 11 agent
      :align: center
      :width: 80%

Troubleshooting
---------------

+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| Check                              | How                                                                                                                          |
+====================================+==============================================================================================================================+
| The assets are in the Custom space | **Ruleset management** > **Decoders**, **KVDBs**, and **Rules** list them in the **Custom** space.                           |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| The detector is active             | ``http_detector`` is active in **Ruleset management** > **Detectors**.                                                       |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| The KVDB has the attacker          | The ``malicious_IPs`` KVDB has ``<RHEL_IP>`` with the value ``malicious``.                                                   |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| The monitor runs                   | ``apache_malicious_ip_monitor`` is enabled in **Explore** > **Alerting** > **Monitors**.                                     |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+
| The block is active                | Ubuntu: ``sudo iptables -L INPUT -n``. Windows: the netsh command from :ref:`Attack emulation <poc_block_attack_emulation>`. |
+------------------------------------+------------------------------------------------------------------------------------------------------------------------------+

Clean up
--------

Each block expires 60 seconds after the last Active Response command.

To stop blocking the RHEL endpoint, delete the ``apache_malicious_ip_monitor`` monitor in **Explore** > **Alerting** > **Monitors**.

To stop Apache on the Windows endpoint, press **Ctrl** + **C** in the PowerShell terminal where it runs.
