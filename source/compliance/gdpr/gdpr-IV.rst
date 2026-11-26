.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out this section to learn more about how to use Wazuh for GDPR IV (The General Data Protection Regulation of the European Union).

GDPR IV, Controller and processor
===================================

In this chapter, the GDPR sets out requirements for managing, controlling, and processing personal data.

Chapter IV, Article 30, Head 1 (g)
------------------------------------

**Records of processing activities, Head 1 (g)**: *“Each controller and, where applicable, the controller's representative, shall maintain a record of processing activities under its responsibility. That record shall contain all of the following information: where possible, a general description of the technical and organizational security measures referred to in Article 32 (1).”*

This article requires that organizations document, inventory, and audit data processing activities. This helps keep a record of all data processing activities.

Wazuh stores information about system events. Decoded events are indexed whether or not a rule matches.

You can enable the **Index unclassified events** and **Index discarded events** settings of a :doc:`space </user-manual/data-analysis/space>` to store these events. A space is where Wazuh keeps its detection content, such as decoders, rules, and integrations. Unclassified events are events that no decoder accepts. Discarded events are events that a decoder marks as discarded. When **Index discarded events** is on, Wazuh replaces the content of each discarded event with the ``wazuh.space.event_discarded: true`` marker before indexing it. Events that a filter rejects are always dropped. When this is configured, Wazuh indexes unclassified events into the ``wazuh-events-v5-unclassified`` index. This gives you a record of events that no integration processes, including those that do not trigger a finding. These records help with activities such as data audits and threat hunting.

Use case: Store all logs generated from an endpoint
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you store all events from monitored endpoints whether they generate a finding or not.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Click the menu icon, then navigate to **Ruleset Management** > **Overview**.

#. Select **Standard** in **Space**, then select **Actions** > **Edit** at the top-right section.

#. Under **Settings**, toggle on **Index unclassified events** and **Index discarded events**.

#. Click **Save**.

   .. thumbnail:: /images/compliance/gdpr/index-unclassified-events-settings.png
      :title: Store all logs generated from an endpoint
      :alt: Edit Standard space panel with Index unclassified events turned on
      :align: center
      :width: 80%

#. View these events on the dashboard by navigating to **Explore** > **Discover**.

#. Change the **Index patterns** to ``wazuh-events-v5-unclassified*``.

   .. thumbnail:: /images/compliance/gdpr/unclassified-events-discover.png
      :title: Unclassified events under Discover
      :alt: Discover filtered to the wazuh-events-v5-unclassified data stream with unclassified events
      :align: center
      :width: 80%

#. Change the **Index patterns** accordingly to view other events of interest.

   .. thumbnail:: /images/compliance/gdpr/events-discover.png
      :title: Events under Discover
      :alt: Discover showing events from the wazuh-events-v5 data streams
      :align: center
      :width: 80%

Chapter IV, Article 32, Head 1 (b)
-----------------------------------

**Security of processing, Head 1 (b)**: *“Taking into account the state of the art, the costs of implementation and the nature, scope, context and purposes of processing as well as the risk of varying likelihood and severity for the rights and freedoms of natural persons, the controller and the processor shall implement appropriate technical and organisational measures to ensure a level of security appropriate to the risk, including inter alia as appropriate: the ability to ensure the ongoing confidentiality, integrity, availability and resilience of processing systems and services;”*

This article requires you to ensure the ongoing confidentiality, integrity, availability, and resilience of processing systems and services. Unauthorized access is one of the threats to confidentiality and integrity. The Wazuh log data analysis capability helps you meet this requirement. It collects and decodes authentication logs from your endpoints and evaluates them against the Wazuh ruleset. This lets you detect access attempts to systems that process personal data and identify who made them. The Wazuh :doc:`Security Configuration Assessment (SCA) </user-manual/capabilities/sec-config-assessment/index>` module performs configuration assessments to verify that endpoints comply with security policies, standards, and hardening guides. Refer to the :doc:`SCA documentation </user-manual/capabilities/sec-config-assessment/index>` for more information about configuring SCA checks.

Use case: Detect invalid SSH login attempts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, the Wazuh agent on an Ubuntu 24.04 endpoint collects authentication logs from journald. When an invalid user attempts to log in over Secure Shell (SSH), the log is evaluated against the ruleset and generates a finding.

The Wazuh agent reads authentication events from journald by default through the Linux integration. No extra configuration is required to collect these events.

To generate a finding, attempt an SSH login to the monitored endpoint from a different host. Use a username that doesn't exist on the endpoint. Replace ``<INVALID_USER>`` with that username and ``<ENDPOINT_IP>`` with the IP address of the Ubuntu endpoint:

.. code-block:: console

   $ ssh <INVALID_USER>@<ENDPOINT_IP>

When Wazuh detects the invalid login attempt, two findings appear in **Threat intelligence** > **Threat Hunting** > **Findings** tab on the Wazuh dashboard: SSH authentication failure and Failed authentication attempt - ``<INVALID_USER>``.

.. thumbnail:: /images/compliance/gdpr/invalid-ssh-login-attempt1.png
   :title: Invalid SSH login attempts findings
   :alt: GDPR Findings tab listing failed authentication attempt findings for an invalid SSH user
   :align: center
   :width: 80%

.. thumbnail:: /images/compliance/gdpr/invalid-ssh-login-attempt2.png
   :title: Invalid SSH login attempts finding visualization - more information
   :alt: Document details of an invalid SSH login finding with the original log and message highlighted
   :align: center
   :width: 80%

Use case: Ensure that the shadow group is empty
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, Wazuh runs an SCA check to determine whether any users are assigned to the ``shadow`` group on an Ubuntu 24.04 endpoint. The ``/etc/shadow`` file in Linux systems stores encrypted user passwords. Any user in the ``shadow`` group can read the contents of the ``/etc/shadow`` file. Unauthorized access to this file can lead to system compromise by malicious actors. The SCA check ID is ``35774``. The check passes when the shadow group in ``/etc/group`` has no members.

The following image shows the result of the SCA check on the Wazuh dashboard.

.. thumbnail:: /images/compliance/gdpr/SCA-35774-no-alerts.png
   :title: Filtering SCA 35774 check finding
   :alt: Configuration Assessment Inventory tab filtered to check 35774, Ensure shadow group is empty, passed on all endpoints
   :align: center
   :width: 80%

.. thumbnail:: /images/compliance/gdpr/SCA-35774-full-info.png
   :title: SCA 35774 check finding full information
   :alt: Details panel of SCA check 35774 with its rationale, remediation, rules, and policy
   :align: center
   :width: 80%

Chapter IV, Article 33, Head 1
--------------------------------

**Notification of a personal data breach to the supervisory authority, Head 1**: *“In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority competent in accordance with Article 55, unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons.”*

This article requires you to notify the supervisory authority of a personal data breach without undue delay. Where feasible, you must send this notification within 72 hours of becoming aware of the breach. To meet this deadline, you must detect breach indicators quickly and alert the right people.

Wazuh provides an alerting capability that helps you meet this requirement. You can configure Wazuh to send an email notification when Wazuh generates a specific finding. Your data protection officer can then become aware of a potential breach in real time.

Wazuh sends email notifications through the Wazuh indexer. You configure an email notification channel with three components. A Simple Mail Transfer Protocol (SMTP) sender defines the outbound mail server, a recipient group defines who receives the email, and an email channel binds them together. You then create an alerting monitor that queries your findings and notifies the channel when it detects a match.

Use case: Email alert on failed login
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you configure Wazuh to send an email to your data protection officer when a failed authentication attempt occurs on a monitored endpoint. A failed authentication attempt is an early indicator of unauthorized access. It can precede a personal data breach, such as a brute force attack against an account that can access personal data.

Configure the SMTP sender
~~~~~~~~~~~~~~~~~~~~~~~~~~

The SMTP sender defines the mail server that sends the notifications.

#. Click the menu icon, then navigate to **Explore** > **Notifications**.

#. Click **Email senders** > **Create SMTP sender**.

#. Type a unique name in **Sender name**.

#. Type the address that sends the notifications in **Email address**.

#. Type the hostname or IP address of your SMTP server in **Host**.

#. Type the port of your SMTP server in **Port**. The default value is 465.

#. Select **SSL/TLS** (usually port 465) or **STARTTLS** (usually port 587) in **Encryption method**. Select **None** only in a test environment.

#. Click **Create**.

   .. thumbnail:: /images/compliance/gdpr/configure-smtp-sender.png
      :title: Configure the SMTP sender
      :alt: Create SMTP sender page with the sender name, email address, host, and port
      :align: center
      :width: 80%

   .. note::

      SSL/TLS and STARTTLS require you to add the sender account credentials to the Wazuh indexer keystore.

Configure the recipient group
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The recipient group defines who receives the email notifications.

#. Click the menu icon, then navigate to **Explore** > **Notifications**.

#. Click **Email recipient groups** > **Create recipient group**.

#. Type a name for the group in **Name**.

#. Describe the purpose of the group in **Description**. This field is optional.

#. Type one or more email addresses in **Emails**. For this use case, add the address of your data protection officer.

#. Click **Create**.

   .. thumbnail:: /images/compliance/gdpr/configure-recipient-group.png
      :title: Configure the recipient group
      :alt: Create recipient group page with the group name GDPR-notification and a recipient email
      :align: center
      :width: 80%

   .. note::

      You can also add recipient addresses directly to the channel. A recipient group is useful when you send notifications to the same addresses from more than one channel.

Configure the email channel
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The email channel binds the sender and the recipients. The alerting monitor sends its notifications to this channel.

#. Click the menu icon, then navigate to **Explore** > **Notifications**.

#. Click **Channels** > **Create channel**.

#. Type a name for the channel in **Name**.

#. Describe the purpose of the channel in **Description**. This field is optional.

#. Select **Email** in **Channel type**. You cannot change the channel type after you create the channel.

#. Select **SMTP sender** in **Sender type**.

#. Select the sender you created in **SMTP sender**.

#. Select the recipient group you created in **Default recipients**. You can also type an email address directly.

#. Click **Send test message** to confirm the configuration. A success message confirms that the channel works.

#. Click **Create**.

   .. thumbnail:: /images/compliance/gdpr/configure-email-channel.png
      :title: Configure the email channel
      :alt: Create channel page with an Email channel using the SMTP sender and the GDPR-notification recipient group
      :align: center
      :width: 80%

Create the alerting monitor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The alerting monitor watches your findings for failed authentication attempts. When the monitor detects a match, it triggers the action that sends the email.

#. Click the menu icon, then navigate to **Explore** > **Alerting**.

#. Switch to the **Monitors** tab and click **Create monitor**.

#. Type a name for the monitor in **Monitor name**.

#. Select **Per document monitor** in **Monitor type**.

#. Select **Visual editor** in **Monitor defining method**.

#. Set **Frequency** to **By interval** and set **Run every** to 1 minute under **Schedule**.

#. Under **Select data**, select ``wazuh-findings-v5-system-activity`` in **Index**.

#. Under **Query**, in **Query name**, type a name.

#. Set the query condition. In **Field**, select ``event.action``. In the operator list, select **is**. In the value field, type ``authentication-failure``.

   .. note::

      You can also match the finding by its rule identifier. In **Field**, select ``wazuh.rule.sigma_id`` and type the rule identifier. The ``event.action`` field is more stable, because it does not change when the rule identifier changes.

#. Click **Add trigger** under **Triggers**.

#. Type a name in **Trigger name**.

#. Select a level in **Severity level**. Level 1 is the highest.

#. Under **Trigger conditions**, in **Specify queries or tags**, select the name of the query.

#. Click **Add notification** under **Actions**.

#. Type a name in **Action name**.

#. Select the email channel you created in **Channel**.

#. Type a subject such as “Wazuh alert - failed authentication” in **Message subject**.

#. In **Message**, type the notification body. You can embed variables with Mustache templates.

   .. code-block:: none

      A failed authentication attempt was detected on a monitored endpoint.
      Trigger: {{ctx.trigger.name}}
      Severity: {{ctx.trigger.severity}}
      Monitor: {{ctx.monitor.name}}
      Detected between {{ctx.periodStart}} and {{ctx.periodEnd}} UTC.
      Review the finding in the Wazuh dashboard for the source IP, user, and host details.

#. Select **Per alert** in **Perform action**.

#. Click **Create**.

   .. thumbnail:: /images/compliance/gdpr/create-alerting-monitor.gif
      :title: Create the alerting monitor
      :alt: failed-authentication-email alerting monitor overview with its trigger and alert history
      :align: center
      :width: 80%

.. note::

   On a busy endpoint, the **Per alert** option can generate frequent emails. To reduce the volume, use a **Per query monitor** with a threshold instead. With **Per alert** selected, **Send test message** in the action reports success but doesn't send an email unless a finding matches the monitor's query. To test email delivery, use **Send test message** on the email channel instead. For the other monitor types, triggers, and channel options, see :doc:`Alerting module </user-manual/wazuh-indexer/modules/alerting>` and :doc:`Notifications module </user-manual/wazuh-indexer/modules/notifications>`.

Verify the configuration
~~~~~~~~~~~~~~~~~~~~~~~~~

Verify that Wazuh sends the email when a failed authentication occurs.

#. From a different host, attempt a Secure Shell (SSH) login to a monitored endpoint with a username that doesn't exist on that endpoint. Replace ``<INVALID_USER>`` with that username and ``<ENDPOINT_IP>`` with the IP address of the monitored endpoint:

   .. code-block:: console

      $ ssh <INVALID_USER>@<ENDPOINT_IP>

#. Wait for one monitor interval.

**Expected result:** The login fails because the user doesn't exist. Wazuh detects the finding, the trigger fires, and the action sends an email to the recipient group. The data protection officer receives an email similar to the following:

.. thumbnail:: /images/compliance/gdpr/sample-email-alert-notification.png
   :title: Sample email alert notification
   :alt: Sample email alert notification sent for a failed authentication attempt
   :align: center
   :width: 80%

The email identifies the trigger, the severity, the monitor, and the detection window. To view more details, such as the source IP address, the recipient opens the finding on the Wazuh dashboard.

.. thumbnail:: /images/compliance/gdpr/email-notification-dashboard-findings.png
   :title: Email notification dashboard findings
   :alt: Threat Hunting Findings tab listing the failed authentication attempt findings that triggered email notifications
   :align: center
   :width: 80%

Chapter IV, Article 35, Head 1
--------------------------------

**Data protection impact assessment, Head 1**: *“Where a type of processing in particular using new technologies, and taking into account the nature, scope, context and purposes of the processing, is likely to result in a high risk to the rights and freedoms of natural persons, the controller shall, prior to the processing, carry out an assessment of the impact of the envisaged processing operations on the protection of personal data. A single assessment may address a set of similar processing operations that present similar high risks.”*

This article recommends conducting a risk assessment of data processing channels and assessing the impact of the identified risks on data protection. Wazuh supports the risk assessment outcome by categorizing FIM findings for specific files or directories and raising severity levels based on the risk assessment reports.

Use case: Increase the severity level of a file modification finding
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

In this use case, you set a critical severity for a file modification event when the file is in a specific directory. You configure the agent to monitor ``/customers/personal_data``, and you create a rule that raises the severity for changes in that directory.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Create the directory ``/customers``:

   .. code-block:: console

      # mkdir /customers

#. Create the directory ``personal_data`` in the ``/customers`` directory, then create the files ``regular_data.txt`` and ``personal_data/sensitive_data.txt`` in ``/customers``:

   .. code-block:: console

      # mkdir /customers/personal_data
      # touch /customers/regular_data.txt /customers/personal_data/sensitive_data.txt

#. Add the highlighted configuration to the ``<syscheck>`` block of the agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
        <directories realtime="yes" check_all="yes" report_changes="yes">/customers/</directories>
      </syscheck>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. Add some content to the file ``regular_data.txt`` in the ``/customers`` directory to modify it:

   .. code-block:: console

      # echo "this is regular data" >> /customers/regular_data.txt

A medium severity finding on the Wazuh dashboard shows that a file was modified in the monitored directory.

.. thumbnail:: /images/compliance/gdpr/file-modification-medium-finding.png
   :title: File modification medium finding visualization
   :alt: GDPR Findings tab with a medium level Wazuh FIM file modified finding highlighted
   :align: center
   :width: 80%

Wazuh dashboard
~~~~~~~~~~~~~~~

Create a custom rule that raises file modification findings in ``/customers/personal_data`` from medium to critical. The standard FIM decoders already extract the file path and the type of change, so you only need a custom integration, the rule, and a detector. Make sure the space selector reads **Draft**.

#. Go to **Ruleset management** > **Overview** > **Integrations** > **Actions** > **Create**. Enter ``gdpr-personal-data`` in **Title**, select **System Activity** in **Category**, type an author name, and click **Create integration**.

#. Go to **Ruleset management** > **Rules** > **Actions** > **Create**, select **YAML Editor**, choose the ``gdpr-personal-data`` integration, paste the following rule, and click **Create rule**:

   .. code-block:: yaml

      logsource:
        product: gdpr-personal-data
      level: critical
      status: experimental
      enabled: true
      detection:
        condition: selection
        selection:
          event.dataset: wazuh.fim
          event.action: modified
          file.path|contains: /customers/personal_data
      metadata:
        title: Personal data file modified - {{file.path}}
        author: Security Team
        description: Detects changes to files in the /customers/personal_data directory.
      compliance:
        gdpr:
          - IV_35.1

#. Promote the content from **Draft** to **Test**, then from **Test** to **Custom**, and create a detector for the ``gdpr-personal-data`` integration on the ``wazuh-events-v5-system-activity`` index in the **Custom** space.

For details on each step, see :ref:`Create a security analytics detection workflow <data_analysis_detection_workflow>`.

Ubuntu endpoint
~~~~~~~~~~~~~~~

Add some content to the file ``sensitive_data.txt`` in the ``/customers/personal_data`` directory to modify it:

.. code-block:: console

   # echo "User01= user03_ID" >> /customers/personal_data/sensitive_data.txt

A critical finding shows that a sensitive file was modified in the monitored directory. The standard medium severity finding for the same change also appears.

.. thumbnail:: /images/compliance/gdpr/file-modification-critical-finding.png
   :title: File modification critical finding visualization
   :alt: GDPR Findings tab with a critical Wazuh FIM file modified finding from the custom rule
   :align: center
   :width: 80%

Chapter IV, Article 35, Head 7 (d)
------------------------------------

**Data protection impact assessment, Head 7 (d)**: *“The assessment shall contain at least the measures envisaged to address the risks, including safeguards, security measures and mechanisms to ensure the protection of personal data and to demonstrate compliance with this Regulation taking into account the rights and legitimate interests of data subjects and other persons concerned.”*

This article recommends implementing the necessary security measures to protect subject data. These security measures include threat detection and response on endpoints that contain personal user data.

Wazuh helps meet this article of the GDPR by providing security measures such as:

-  :doc:`Vulnerability detection </user-manual/capabilities/vulnerability-detection/index>`.
-  :doc:`Security configuration assessment </user-manual/capabilities/sec-config-assessment/index>`.
-  Malware detection.
-  Active response.
