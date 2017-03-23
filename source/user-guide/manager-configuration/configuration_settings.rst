.. _configuration_settings:

Configuration settings
======================

The ``ossec.conf`` file is the main configuration file on the Wazuh manager. It is located at ``/var/ossec/etc/ossec.conf``. It is recommended you back up this file before making changes to it, as an error in the configuration can completely prevent Wazuh services from starting up.

The ``ossec.conf`` file is in XML format, and all configuration options are nested in their appropriate section of the file.  In this file, the outermost XML tag is ``<ossec_config>``.  For example, here is an example of the proper location of the *alerts* configuration section:

.. code-block:: xml

  <ossec_config>
      <alerts>
          <!--
          alerts options here
          -->
      </alerts>
  </ossec_config>

Wazuh manager configuration sections
------------------------------------

Below is a comprehensive list of configuration sections, listed in two different tables to clearly differentiate configuration options that do apply to the manager or to the agent which usually runs in the monitored host, but also runs locally in the Wazuh manager system. All of these sections must be located within the top-level ``<ossec_config>`` tag.

+--------------------------------------------------+----------------------------------------------------------+
| Manager specific configuration options           | Description                                              |
+==================================================+==========================================================+
| `global  <global.html>`_                         | Global configuration options (output and email settings) |
+--------------------------------------------------+----------------------------------------------------------+
| `alerts <alerts.html>`_                          | Log alert and email settings                             |
+--------------------------------------------------+----------------------------------------------------------+
| `email_alerts <email_alerts.html>`_              | Granular email alert settings                            |
+--------------------------------------------------+----------------------------------------------------------+
| `remote <remote.html>`_                          | Configuration settings for remote connections            |
+--------------------------------------------------+----------------------------------------------------------+
| `ruleset <rules.html>`_                          | Rules and decoders options                               |
+--------------------------------------------------+----------------------------------------------------------+
| `command <commands.html>`_                       | Command configuration for active responses               |
+--------------------------------------------------+----------------------------------------------------------+
| `agentless <agentless.html>`_                    | Configuration options for agentless monitoring           |
+--------------------------------------------------+----------------------------------------------------------+
| `database_output <database-output.html>`_        | Database output configuration settings                   |
+--------------------------------------------------+----------------------------------------------------------+
| `integration  <integration.html>`_               | Integration options for third party tools                |
+--------------------------------------------------+----------------------------------------------------------+
| `reports <reports.html>`_                        | Options for alert reports                                |
+--------------------------------------------------+----------------------------------------------------------+
| `syslog_output <syslog-output.html>`_            | Syslog output configuration settings                     |
+--------------------------------------------------+----------------------------------------------------------+

+--------------------------------------------------+----------------------------------------------------------+
| Agent specific configuration options             | Description                                              |
+==================================================+==========================================================+
| `client <client.html>`_                          | Configuration settings for agent communications          |
+--------------------------------------------------+----------------------------------------------------------+
| `localfile <localfile.html>`_                    | Configuration options to monitor log files and events    |
+--------------------------------------------------+----------------------------------------------------------+
| `syscheck <syscheck.html>`_                      | Configuration options for file integrity monitoring      |
+--------------------------------------------------+----------------------------------------------------------+
| `rootcheck <rootcheck.html>`_                    | Configuration options for anomalies detection            |
+--------------------------------------------------+----------------------------------------------------------+
| `wodle name="open-scap" <wodle-openscap.html>`_  | Configuration settings for security policy monitoring    |
+--------------------------------------------------+----------------------------------------------------------+

Wazuh manager configuration example
-----------------------------------

.. code-block:: xml

  <!--
  Wazuh - Manager - Default configuration
  More info at: https://documentation.wazuh.com
  Mailing list: https://groups.google.com/forum/#!forum/wazuh
  -->

  <ossec_config>

    <!-- Global settings -->
    <global>
      <jsonout_output>yes</jsonout_output>
      <alerts_log>yes</alerts_log>
      <logall>no</logall>
      <logall_json>no</logall_json>
      <email_notification>no</email_notification>
      <smtp_server>smtp.example.wazuh.com</smtp_server>
      <email_from>wazuh_manager@example.wazuh.com</email_from>
      <email_to>recipient@example.wazuh.com</email_to>
      <email_maxperhour>12</email_maxperhour>
    </global>

    <!-- Alert levels  -->
    <alerts>
      <log_alert_level>3</log_alert_level>
      <email_alert_level>12</email_alert_level>
    </alerts>

    <!-- Settings to collect remote Syslog data -->
    <remote>
      <connection>syslog</connection>
      <port>514</port>
      <protocol>udp</protocol>
    </remote>

    <!-- Settings for agent connections -->
    <remote>
      <connection>secure</connection>
      <port>1514</port>
      <protocol>udp</protocol>
    </remote>

    <!-- Rules and decoders -->
    <ruleset>
      <!-- Default ruleset -->
      <decoder_dir>ruleset/decoders</decoder_dir>
      <rule_dir>ruleset/rules</rule_dir>
      <rule_exclude>0215-policy_rules.xml</rule_exclude>
      <list>etc/lists/audit-keys</list>

      <!-- User-defined ruleset -->
      <decoder_dir>etc/decoders</decoder_dir>
      <rule_dir>etc/rules</rule_dir>
    </ruleset>

    <!-- Active response commands -->
    <command>
      <name>firewall-drop</name>
      <executable>firewall-drop.sh</executable>
      <expect>srcip</expect>
      <timeout_allowed>yes</timeout_allowed>
    </command>

    <!-- File integrity monitoring -->
    <syscheck>
      <frequency>43200</frequency>
      <scan_on_start>yes</scan_on_start>
      <alert_new_files>yes</alert_new_files>
      <auto_ignore>no</auto_ignore>

      <!-- Directories to check  (perform all possible verifications) -->
      <directories check_all="yes">/etc,/usr/bin,/usr/sbin</directories>
      <directories check_all="yes">/bin,/sbin,/boot</directories>
      <directories check_all="yes" realtime="yes">/root/algo</directories>

      <!-- Files/directories to ignore -->
      <ignore>/etc/mtab</ignore>
      <ignore>/etc/hosts.deny</ignore>
      <ignore>/etc/mail/statistics</ignore>
      <ignore>/etc/random-seed</ignore>
      <ignore>/etc/random.seed</ignore>
      <ignore>/etc/adjtime</ignore>
      <ignore>/etc/httpd/logs</ignore>
      <ignore>/etc/utmpx</ignore>
      <ignore>/etc/wtmpx</ignore>
      <ignore>/etc/cups/certs</ignore>
      <ignore>/etc/dumpdates</ignore>
      <ignore>/etc/svc/volatile</ignore>

      <!-- Check the file, but never compute the diff -->
      <nodiff>/etc/ssl/private.key</nodiff>

      <skip_nfs>yes</skip_nfs>
    </syscheck>
  </ossec_config>
