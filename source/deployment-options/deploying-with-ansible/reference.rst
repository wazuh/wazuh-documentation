.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :Description: Ansible is an open source platform designed for automating tasks. Learn more about the variable references in this section of the Wazuh documentation.
  
Variables references
--------------------

.. _wazuh_ansible_reference_indexer:

Wazuh indexer
=============

| **Variable**: ``indexer_cluster_name``
| **Description**: Name of the Indexer cluster.
| **Default value**: ``wazuh``
|
| **Variable**: ``indexer_node_name``
| **Description**: Name of the Indexer node.
| **Default value**: ``node-1``
|
| **Variable**: ``indexer_http_port``
| **Description**: Indexer listening port.
| **Default value**: ``9200``
|
| **Variable**: ``indexer_network_host``
| **Description**: Indexer listening IP address.
| **Default value**: ``127.0.0.1``
|
| **Variable**: ``indexer_jvm_xms``
| **Description**: JVM heap size.
| **Default value**: ``null``

.. _wazuh_ansible_reference_dashboard:

Wazuh dashboard
===============

| **Variable**: ``indexer_http_port``
| **Description**: Indexer node port.
| **Default value**: ``9200``
|
| **Variable**: ``indexer_network_host``
| **Description**: IP address or hostname of Indexer node.
| **Default value**: ``127.0.0.1``
|
| **Variable**: ``dashboard_server_host``
| **Description**: Listening IP address of the Wazuh dashboard.
| **Default value**: ``0.0.0.0``
|
| **Variable**: ``dashboard_server_port``
| **Description**: Listening port of the Wazuh dashboard.
| **Default value**: ``443``
|
| **Variable**: ``wazuh_version``
| **Description**: Wazuh APP compatible version to install.
| **Default value**: ``|WAZUH_CURRENT_ANSIBLE|``
|

.. _wazuh_ansible_reference_filebeat:

Filebeat
========

| **Variable**: ``filebeat_version``
| **Description**: Filebeat version to install.
| **Default value**: ``7.10.2``
|
| **Variable**: ``filebeat_create_config``
| **Description**: Generate or not Filebeat config.
| **Default value**: ``true``
|
| **Variable**: ``filebeat_output_indexer_hosts``
| **Description**: Indexer node(s) to send output.
| **Example**:

.. code-block:: yaml

    filebeat_output_indexer_hosts:
    - "localhost:9200"
    - "10.1.1.10:9200"

|
| **Variable**: ``filebeat_ssl_dir``
| **Description**: Set the folder containing SSL certs.
| **Default value**: ``/etc/pki/root``

.. _wazuh_ansible_reference_manager:

Wazuh Manager
=============

| **Variable**: ``wazuh_manager_fqdn``
| **Description**: Set Wazuh Manager fqdn hostname.
| **Default value**: ``wazuh-manager``
|
| **Variable**: ``wazuh_manager_config_overlay``
| **Description**: Indicates if the role(s) should perform a ``hash_behaviour=merge`` at role runtime, similar to role-distributed ansible.cfg. This provides support for a partially defined wazuh_manager_config while also moving on from the `deprecated hash_behaviour <https://docs.ansible.com/ansible/latest/reference_appendices/config.html#default-hash-behaviour>`_.
| **Default value**: ``true``
|
| **Variable**: ``wazuh_manager_json_output``
| **Description**: Configures the :doc:`jsonout_output </user-manual/reference/ossec-conf/global>` section in  ``ossec.conf``. This is a string, not a bool.
| **Default value**: ``yes``
|
| **Variable**: ``wazuh_manager_alerts_log``
| **Description**: Configures the :doc:`alerts_log </user-manual/reference/ossec-conf/global>` section in ``ossec.conf``. This is a string, not a bool.
| **Default value**: ``yes``
|
| **Variable**: ``wazuh_manager_logall``
| **Description**: Configures the :doc:`logall </user-manual/reference/ossec-conf/global>` section in ``ossec.conf``. This is a string, not a bool.
| **Default value**: ``yes``
|
| **Variable**: ``wazuh_manager_email_notification``
| **Description**: Configures the :doc:`email_notification </user-manual/reference/ossec-conf/global>` section in ``ossec.conf``. This is a string, not a bool.
| **Default value**: ``yes``
|
| **Variable**: ``wazuh_manager_mailto``
| **Description**: Configures the :doc:`email_to </user-manual/reference/ossec-conf/global>` items in ``ossec.conf``.
| **Default value**: ``[‘admin@example.net’]``
|
| **Variable**: ``wazuh_manager_email_smtp_server``
| **Description**: Configures the :doc:`smtp_server </user-manual/reference/ossec-conf/global>` section in ``ossec.conf``.
| **Default value**: ``smtp.example.wazuh.com``
|
| **Variable**: ``wazuh_manager_email_from``
| **Description**: Configures the :doc:`email_from </user-manual/reference/ossec-conf/global>` section in ``ossec.conf``.
| **Default value**: ``wazuh@example.wazuh.com``
|
| **Variable**: ``wazuh_manager_email_maxperhour``
| **Description**: Configures the :doc:`email_maxperhour </user-manual/reference/ossec-conf/global>` section in ``ossec.conf``.
| **Default value**: ``12``
|
| **Variable**: ``wazuh_manager_email_queue_size``
| **Description**: Configures the :doc:`queue_size </user-manual/reference/ossec-conf/remote>` section from ``ossec.conf``.
| **Default value**: ``131072``
|
| **Variable**: ``wazuh_manager_email_log_source``
| **Description**: Configures the :doc:`email_log_source </user-manual/reference/ossec-conf/global>` section from ``ossec.conf``.
| **Default value**: ``alerts.log``
|
| **Variable**: ``wazuh_manager_globals``
| **Description**: Configures the :doc:`white_list </user-manual/reference/ossec-conf/global>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_globals:
      - '127.0.0.1'
      - '^localhost.localdomain$'
      - '127.0.0.53'

|
| **Variable**: ``wazuh_manager_log_level``
| **Description**: Configures the :doc:`log_alert_level </user-manual/reference/ossec-conf/alerts>` section from ``ossec.conf``.
| **Default value**: ``3``
|
| **Variable**: ``wazuh_manager_email_level``
| **Description**: Configures the :doc:`email_alert_level </user-manual/reference/ossec-conf/alerts>` section from ``ossec.conf``.
| **Default value**: ``12``
|
| **Variable**: ``wazuh_manager_log_format``
| **Description**: Configures :doc:`log_format</user-manual/reference/ossec-conf/logging>` inside logging section from ``ossec.conf``.
| **Default value**: ``plain``
|
| **Variable**: ``wazuh_manager_extra_emails``
| **Description**: Configures one or more :doc:`email_alerts </user-manual/reference/ossec-conf/email-alerts>` sections from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_extra_emails:
      - enable: false
        mail_to: 'recipient@example.wazuh.com'
        format: full
        level: 7
        event_location: null
        group: null
        do_not_delay: false
        do_not_group: false
        rule_id: null

|
| **Variable**: ``wazuh_manager_connection``
| **Description**: Configures one or more :doc:`remote </user-manual/reference/ossec-conf/remote>` sections from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_connection:
      - type: 'secure'
        port: '1514'
        protocol: 'tcp'
        queue_size: 131072

|
| **Variable**: ``wazuh_manager_reports``
| **Description**: Configures one or more :doc:`reports </user-manual/reference/ossec-conf/reports>` sections from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_reports:
      - enable: false
        category: 'syscheck'
        title: 'Daily report: File changes'
        email_to: 'recipient@example.wazuh.com'
        location: null
        group: null
        rule: null
        level: null
        srcip: null
        user: null
        showlogs: null

|
| **Variable**: ``wazuh_manager_rootcheck``
| **Description**: Configures the :doc:`rootcheck </user-manual/reference/ossec-conf/rootcheck>` section from ``ossec.conf``.
| **Default value**:

.. code-block:: yaml

    wazuh_manager_rootcheck:
      frequency: 43200

|
| **Variable**: ``wazuh_manager_openscap``
| **Description**: Configures the :doc:`wodle </user-manual/reference/ossec-conf/wodle-openscap>` item named ``open-scap`` from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_openscap:
      disable: 'yes'
      timeout: 1800
      interval: '1d'
      scan_on_start: 'yes'

|
| **Variable**: ``wazuh_manager_ciscat``
| **Description**: Configures the :doc:`wodle </user-manual/reference/ossec-conf/wodle-ciscat>` item named ``cis-cat`` from ``ossec.conf``.
| **Default value**:

.. code-block:: yaml

    wazuh_manager_ciscat:
      disable: 'yes'
      install_java: 'yes'
      timeout: 1800
      interval: '1d'
      scan_on_start: 'yes'
      java_path: '/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre/bin'
      ciscat_path: 'wodles/ciscat'

|
| **Variable**: ``wazuh_manager_osquery``
| **Description**: Configures the :doc:`wodle</user-manual/reference/ossec-conf/wodle-osquery>` item named ``osquery`` from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_osquery:
      disable: 'yes'
      run_daemon: 'yes'
      log_path: '/var/log/osquery/osqueryd.results.log'
      config_path: '/etc/osquery/osquery.conf'
      ad_labels: 'yes'

|
| **Variable**: ``wazuh_manager_syscollector``
| **Description**: Configures the :doc:`wodle </user-manual/reference/ossec-conf/wodle-syscollector>` item named ``syscollector`` from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_syscollector:
      disable: 'no'
      interval: '1h'
      scan_on_start: 'yes'
      hardware: 'yes'
      os: 'yes'
      network: 'yes'
      packages: 'yes'
      ports_no: 'yes'
      processes: 'yes'

|
| **Variable**: ``wazuh_manager_monitor_aws``
| **Description**: Configures the :doc:`AWS S3 module </user-manual/reference/ossec-conf/wodle-s3>` item named ``aws-s3`` from ``ossec.conf``.
| **Default values**:  

.. code-block:: yaml

    wazuh_manager_monitor_aws:
      disabled: 'yes'
      interval: '10m'
      run_on_start: 'yes'
      skip_on_error: 'yes'
      s3:
        - name: null
          bucket_type: null
          path: null
          only_logs_after: null
          access_key: null
          secret_key: null

|
| **Variable**: ``wazuh_manager_sca``
| **Description**: Configures the :doc:`sca </user-manual/reference/ossec-conf/sca>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_sca:
      enabled: 'yes'
      scan_on_start: 'yes'
      interval: '12h'
      skip_nfs: 'yes'
      day: ''
      wday: ''
      time: ''

|
| **Variable**: ``wazuh_manager_vulnerability_detector``
| **Description**: Configures the :doc:`vulnerability-detector </user-manual/reference/ossec-conf/vuln-detector>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_vulnerability_detector:
      enabled: 'no'
      interval: '5m'
      min_full_scan_interval: '6h'
      run_on_start: 'yes'
      providers:
        - enabled: 'no'
          os:
            - 'trusty'
            - 'xenial'
            - 'bionic'
          update_interval: '1h'
          name: '"canonical"'
        - enabled: 'no'
          os:
            - 'wheezy'
            - 'stretch'
            - 'jessie'
            - 'buster'
          update_interval: '1h'
          name: '"debian"'
        - enabled: 'no'
          update_interval: '1h'
          name: '"redhat"'
        - enabled: 'no'
          update_interval: '1h'
          name: '"nvd"'

|
| **Variable**: ``wazuh_manager_syscheck``
| **Description**: Configures the :doc:`syscheck </user-manual/reference/ossec-conf/syscheck>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_syscheck:
      disable: 'no'
      frequency: 43200
      scan_on_start: 'yes'
      auto_ignore: 'no'
      ignore:
        - /etc/mtab
        - /etc/hosts.deny
        - /etc/mail/statistics
        - /etc/random-seed
        - /etc/random.seed
        - /etc/adjtime
        - /etc/httpd/logs
        - /etc/utmpx
        - /etc/wtmpx
        - /etc/cups/certs
        - /etc/dumpdates
        - /etc/svc/volatile
      ignore_linux_type:
        - '.log$|.swp$'
      no_diff:
        - /etc/ssl/private.key
      directories:
        - dirs: /etc,/usr/bin,/usr/sbin
          checks: ''
        - dirs: /bin,/sbin,/boot
          checks: ''
      auto_ignore_frequency:
        frequency: 'frequency="10"'
        timeframe: 'timeframe="3600"'
        value: 'no'
      skip_nfs: 'yes'
      skip_dev: 'yes'
      skip_proc: 'yes'
      skip_sys: 'yes'
      process_priority: 10
      max_eps: 100
      sync_enabled: 'yes'
      sync_interval: '5m'
      sync_max_interval: '1h'
      sync_max_eps: 10

|
| **Variable**: ``wazuh_manager_commands``
| **Description**: Configures the :doc:`command </user-manual/reference/ossec-conf/commands>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_commands:
      - name: 'disable-account'
        executable: 'disable-account'
        timeout_allowed: 'yes'
      - name: 'restart-wazuh'
        executable: 'restart-wazuh'
      - name: 'firewall-drop'
        executable: 'firewall-drop'
        timeout_allowed: 'yes'
      - name: 'host-deny'
        executable: 'host-deny'
        timeout_allowed: 'yes'
      - name: 'route-null'
        executable: 'route-null'
        timeout_allowed: 'yes'
      - name: 'win_route-null'
        executable: 'route-null.exe'
        timeout_allowed: 'yes'
      - name: 'netsh'
        executable: 'netsh.exe'
        timeout_allowed: 'yes'
      - name: 'netsh-win-2016'
        executable: 'netsh-win-2016.cmd'
        timeout_allowed: 'yes'

|
| **Variable**: ``wazuh_manager_localfiles``
| **Description**: Configures the :doc:`localfile </user-manual/reference/ossec-conf/localfile>` section from ``ossec.conf`` for each platform.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_localfiles:
      common:
        - format: 'command'
          command: df -P
          frequency: '360'
        - format: 'full_command'
          command: netstat -tulpn | sed 's/\([[:alnum:]]\+\)\ \+[[:digit:]]\+\ \+[[:digit:]]\+\ \+\(.*\):\([[:digit:]]*\)\ \+\([0-9\.\:\*]\+\).\+\ \([[:digit:]]*\/[[:alnum:]\-]*\).*/\1 \2 == \3 == \4 \5/' | sort -k 4 -g | sed 's/ == \(.*\) ==/:\1/' | sed 1,2d
          alias: 'netstat listening ports'
          frequency: '360'
        - format: 'full_command'
          command: 'last -n 20'
          frequency: '360'
        - format: 'syslog'
          location: '/var/ossec/logs/active-responses.log'
      debian:
        - format: 'syslog'
          location: '/var/log/auth.log'
        - format: 'syslog'
          location: '/var/log/syslog'
        - format: 'syslog'
          location: '/var/log/dpkg.log'
        - format: 'syslog'
          location: '/var/log/kern.log'
      centos:
        - format: 'syslog'
          location: '/var/log/messages'
        - format: 'syslog'
          location: '/var/log/secure'
        - format: 'syslog'
          location: '/var/log/maillog'
        - format: 'audit'
          location: '/var/log/audit/audit.log'

|
| **Variable**: ``wazuh_manager_syslog_outputs``
| **Description**: Configures the :doc:`syslog_output </user-manual/reference/ossec-conf/syslog-output>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_syslog_outputs:
      - server: null
        port: null
        format: null

|
| **Variable**: ``wazuh_manager_integrations``
| **Description**: Configures the :doc:`integration </user-manual/reference/ossec-conf/integration>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_integrations:
      # slack
      - name: null
        hook_url: '<hook_url>'
        alert_level: 10
        alert_format: 'json'
        rule_id: null
      # pagerduty
      - name: null
        api_key: '<api_key>'
        alert_level: 12

|
| **Variable**: ``wazuh_manager_labels``
| **Description**: Configures the :doc:`labels </user-manual/reference/ossec-conf/labels>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_labels:
      enable: false
      list:
        - key: Env
          value: Production

|
| **Variable**: ``wazuh_manager_ruleset``
| **Description**: Configures the :doc:`ruleset </user-manual/reference/ossec-conf/ruleset>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_ruleset:
      rules_path: 'custom_ruleset/rules/'
      decoders_path: 'custom_ruleset/decoders/'
      cdb_lists:
        - 'audit-keys'
        - 'security-eventchannel'
        - 'amazon/aws-eventnames'

|
| **Variable**: ``wazuh_manager_rule_exclude``
| **Description**: Configures the :doc:`rule_exclude </user-manual/reference/ossec-conf/ruleset>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_rule_exclude:
      - '0215-policy_rules.xml'

|
| **Variable**: ``wazuh_manager_authd``
| **Description**: Configures the :doc:`auth </user-manual/reference/ossec-conf/auth>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_authd:
      enable: true
      port: 1515
      use_source_ip: 'no'
      force_insert: 'yes'
      force_time: 0
      purge: 'yes'
      use_password: 'no'
      limit_maxagents: 'yes'
      ciphers: 'HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH'
      ssl_agent_ca: null
      ssl_verify_host: 'no'
      ssl_manager_cert: 'sslmanager.cert'
      ssl_manager_key: 'sslmanager.key'
      ssl_auto_negotiate: 'no'

|
| **Variable**: ``wazuh_manager_cluster``
| Configures the :doc:`cluster </user-manual/reference/ossec-conf/cluster>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_cluster:
      disable: 'yes'
      name: 'wazuh'
      node_name: 'manager_01'
      node_type: 'master'
      key: 'ugdtAnd7Pi9myP7CVts4qZaZQEQcRYZa'
      port: '1516'
      bind_addr: '0.0.0.0'
      nodes:
        - 'manager'
      hidden: 'no'

|
| **Variable**: ``wazuh_manager_api``
| **Description**: Configures the :doc:`Wazuh API </user-manual/api/configuration>` file called ``api.yaml``.
| **Default values**:

.. code-block:: yaml

    wazuh_manager_api:
      bind_addr: 0.0.0.0
      port: 55000
      https: yes
      https_key: "server.key"
      https_cert: "server.crt"
      https_use_ca: False
      https_ca: "ca.crt"
      logging_level: "info"
      cors: no
      cors_source_route: "*"
      cors_expose_headers: "*"
      cors_allow_headers: "*"
      cors_allow_credentials: no
      cache: yes
      cache_time: 0.750
      access_max_login_attempts: 5
      access_block_time: 300
      access_max_request_per_minute: 300
      drop_privileges: yes
      experimental_features: no

|
| **Variable**: ``wazuh_api_user``
| **Description**: Wazuh API credentials.
| **Example**:

.. code-block:: yaml

    wazuh_api_user:
    - foo:$apr1$/axqZYWQ$Xo/nz/IG3PdwV82EnfYKh/
    - bar:$apr1$hXE97ag.$8m0koHByattiGKUKPUgcZ1

.. warning::

    We recommend the use of `Ansible Vault <https://docs.ansible.com/ansible/latest/user_guide/vault.html>`_ to protect Wazuh agentless and authd credentials.

|
| **Variable**: ``wazuh_manager_config``
| **Description**: Stores the Wazuh Manager configuration. This variable is provided for backward compatibility. Newer deployments should use the newly introduced variables described above.
| **Example**:

.. code-block:: yaml

    wazuh_manager_config:
      json_output: 'yes'
      alerts_log: 'yes'
      logall: 'no'
      log_format: 'plain'
      cluster:
        disable: 'yes'
        name: 'wazuh'
        node_name: 'manager_01'
        node_type: 'master'
        key: 'ugdtAnd7Pi9myP7CVts4qZaZQEQcRYZa'
        interval: '2m'
        port: '1516'
        bind_addr: '0.0.0.0'
        nodes:
          - '172.17.0.2'
          - '172.17.0.3'
          - '172.17.0.4'
        hidden: 'no'
      connection:
        - type: 'secure'
          port: '1514'
          protocol: 'tcp'
      authd:
        enable: true
        port: 1515
        use_source_ip: 'no'
        force_insert: 'yes'
        force_time: 0
        purge: 'no'
        use_password: 'no'
        ssl_agent_ca: null
        ssl_verify_host: 'no'
        ssl_manager_cert: 'etc/sslmanager.cert'
        ssl_manager_key: 'etc/sslmanager.key'
        ssl_auto_negotiate: 'no'
      email_notification: 'no'
      mail_to:
        - 'admin@example.net'
      mail_smtp_server: localhost
      mail_from: wazuh-manager@example.com
      extra_emails:
        - enable: false
          mail_to: 'admin@example.net'
          format: full
          level: 7
          event_location: null
          group: null
          do_not_delay: false
          do_not_group: false
          rule_id: null
      reports:
        - enable: false
          category: 'syscheck'
          title: 'Daily report: File changes'
          email_to: 'admin@example.net'
          location: null
          group: null
          rule: null
          level: null
          srcip: null
          user: null
          showlogs: null
      syscheck:
        frequency: 43200
        scan_on_start: 'yes'
        auto_ignore: 'no'
        alert_new_files: 'yes'
        ignore:
          - /etc/mtab
          - /etc/mnttab
          - /etc/hosts.deny
          - /etc/mail/statistics
          - /etc/random-seed
          - /etc/random.seed
          - /etc/adjtime
          - /etc/httpd/logs
          - /etc/utmpx
          - /etc/wtmpx
          - /etc/cups/certs
          - /etc/dumpdates
          - /etc/svc/volatile
        no_diff:
          - /etc/ssl/private.key
        directories:
          - dirs: /etc,/usr/bin,/usr/sbin
            checks: 'check_all="yes"'
          - dirs: /bin,/sbin
            checks: 'check_all="yes"'
      rootcheck:
        frequency: 43200
      openscap:
        disable: 'no'
        timeout: 1800
        interval: '1d'
        scan_on_start: 'yes'
      cis_cat:
        disable: 'yes'
        install_java: 'yes'
        timeout: 1800
        interval: '1d'
        scan_on_start: 'yes'
        java_path: '/usr/lib/jvm/java-1.8.0-openjdk-amd64/jre/bin'
        ciscat_path: '/var/ossec/wodles/ciscat'
        content:
          - type: 'xccdf'
            path: 'benchmarks/CIS_Ubuntu_Linux_16.04_LTS_Benchmark_v1.0.0-xccdf.xml'
            profile: 'xccdf_org.cisecurity.benchmarks_profile_Level_1_-_Server'
      log_level: 1
      email_level: 12
      localfiles:
        - format: 'syslog'
          location: '/var/log/messages'
        - format: 'syslog'
          location: '/var/log/secure'
        - format: 'command'
          command: 'df -P'
          frequency: '360'
        - format: 'full_command'
          command: 'netstat -tln | grep -v 127.0.0.1 | sort'
          frequency: '360'
        - format: 'full_command'
          command: 'last -n 20'
          frequency: '360'
      globals:
        - '127.0.0.1'
        - '192.168.2.1'
      commands:
        - name: 'disable-account'
          executable: 'disable-account'
          timeout_allowed: 'yes'
        - name: 'restart-wazuh'
          executable: 'restart-wazuh'
          timeout_allowed: 'no'
        - name: 'win_restart-wazuh'
          executable: 'restart-wazuh.exe'
          timeout_allowed: 'no'
        - name: 'firewall-drop'
          executable: 'firewall-drop'
          timeout_allowed: 'yes'
        - name: 'host-deny'
          executable: 'host-deny'
          timeout_allowed: 'yes'
        - name: 'route-null'
          executable: 'route-null'
          timeout_allowed: 'yes'
        - name: 'win_route-null'
          executable: 'route-null.exe'
          timeout_allowed: 'yes'
      active_responses:
        - command: 'restart-wazuh'
          location: 'local'
          rules_id: '100002'
        - command: 'win_restart-wazuh'
          location: 'local'
          rules_id: '100003'
        - command: 'host-deny'
          location: 'local'
          level: 6
          timeout: 600
      syslog_outputs:
        - server: null
          port: null
          format: null

|
| **Variable**: ``wazuh_agent_configs``
| **Description**: This stores the different settings and profiles for centralized agent configuration via Wazuh Manager.
| **Example**:

.. code-block:: yaml

    - type: os
      type_value: Linux
      syscheck:
        frequency: 43200
        scan_on_start: 'yes'
        auto_ignore: 'no'
        alert_new_files: 'yes'
        ignore:
        - /etc/mtab
        - /etc/mnttab
        - /etc/hosts.deny
        - /etc/mail/statistics
        - /etc/svc/volatile
        no_diff:
          - /etc/ssl/private.key
        directories:
          - dirs: /etc,/usr/bin,/usr/sbin
            checks: 'check_all="yes"'
          - dirs: /bin,/sbin
            checks: 'check_all="yes"'
      rootcheck:
        frequency: 43200
        cis_distribution_filename: null
      localfiles:
        - format: 'syslog'
          location: '/var/log/messages'
        - format: 'syslog'
          location: '/var/log/secure'
        - format: 'syslog'
          location: '/var/log/maillog'
        - format: 'apache'
          location: '/var/log/httpd/error_log'
        - format: 'apache'
          location: '/var/log/httpd/access_log'
        - format: 'apache'
          location: '/var/ossec/logs/active-responses.log'
    - type: os
      type_value: Windows
      syscheck:
        frequency: 43200
        scan_on_start: 'yes'
        auto_ignore: 'no'
        alert_new_files: 'yes'
        windows_registry:
          - key: 'HKEY_LOCAL_MACHINE\Software\Classes\batfile'
            arch: 'both'
          - key: 'HKEY_LOCAL_MACHINE\Software\Classes\Folder'
      localfiles:
        - format: 'Security'
          location: 'eventchannel'
        - format: 'System'
          location: 'eventlog'

|
| **Variable**: ``cdb_lists``
| **Description**: Configure CDB lists used by the Wazuh Manager.
| **Example**:

.. code-block:: yaml

    cdb_lists:
    - name: 'audit-keys'
      content: |
        audit-wazuh-w:write
        audit-wazuh-r:read
        audit-wazuh-a:attribute
        audit-wazuh-x:execute
        audit-wazuh-c:command

.. warning::

    We recommend the use of `Ansible Vault <https://docs.ansible.com/ansible/latest/user_guide/vault.html>`_ to protect Wazuh agentless and authd credentials.

|
| **Variable**: ``agentless_creds``
| **Description**: Credentials and host(s) to be used by agentless feature.
| **Example**:

.. code-block:: yaml

    agentless_creds:
      - type: ssh_integrity_check_linux
        frequency: 3600
        host: root@example.net
        state: periodic
        arguments: '/bin /etc/ /sbin'
        passwd: qwerty

.. warning::

    We recommend the use of `Ansible Vault <https://docs.ansible.com/ansible/latest/user_guide/vault.html>`_ to protect Wazuh agentless and authd credentials.

|
| **Variable**: ``authd_pass``
| **Description**: Wazuh authd service password.
| **Example**:

.. code-block:: yaml

    authd_pass: foobar


.. _wazuh_ansible_reference_agent:

Wazuh Agent
===========

| **Variable**: ``wazuh_managers``
| **Description**: Set the Wazuh Manager servers IP address, protocol, and port to be used by the agent. If a specific manager is used for registration, we can indicate which one it is by adding the register option set to true. If the register option is missing, the first manager on the list will be used for registration.
| **Example**:

.. code-block:: yaml

    wazuh_managers:
    - address: 172.16.24.56
      protocol: udp
    - address: 192.168.10.15
      port: 1514
      protocol: tcp
      register: yes

|
| **Variable**: ``wazuh_agent_nolog_sensible``:
| **Description**: This variable indicates if the `nolog option <https://docs.ansible.com/ansible/latest/reference_appendices/logging.html>`_ should be added to tasks which output sensitive information (like tokens).
| **Default value**: ``true``
|
| **Variable**: ``wazuh_agent_api_validate``
| **Description**: After registering the agent through the REST API, validate that registration is correct.
| **Default value**: ``true``
|
| **Variable**: ``wazuh_agent_address``
| **Description**: Establish which IP address we want to associate with this agent. It can be an address or “any” This variable will supersede wazuh_agent_nat.
| **Default value**: ``ansible_default_ipv4.address``
|
| **Variable**: ``wazuh_profile``
| **Description**: Configure what profiles this agent will have.
| **Default value**: ``null``
| Multiple profiles can be included, separated by a comma and a space, for example:

.. code-block:: yaml

    wazuh_profile: "centos7, centos7-web"

|
| **Variable**: ``wazuh_agent_authd``
| **Description**: Set the agent-authd facility. This will enable or not the automatic agent registration, you could set various options in accordance with the authd service configured in the Wazuh Manager. This Ansible role will use the address defined on ``registration_address`` as the authd registration server.
| **Example**:

    .. code-block:: yaml

        wazuh_agent_authd:
          registration_address: 10.1.1.12
          enable: false
          port: 1515
          ssl_agent_ca: null
          ssl_agent_cert: null
          ssl_agent_key: null
          ssl_auto_negotiate: 'no'

|
| **Variable**: ``wazuh_notify_time``
| **Description**: Set the ``<notify_time>`` option in the agent.
| **Default value**: ``null``
|
| **Variable**: ``wazuh_time_reconnect``
| **Description**: Set ``<time-reconnect>`` option in the agent.
| **Default value**: ``null``
|
| **Variable**: ``wazuh_winagent_config``
| **Description**: Set the Wazuh Agent installation regarding Windows hosts.
| **Example**:

.. code-block:: yaml

    install_dir: 'C:\wazuh-agent\'
    version: '2.1.1'
    revision: '2'
    repo: https://packages.wazuh.com/windows/
    md5: fd9a3ce30cd6f9f553a1bc71e74a6c9f

|
| **Variable**: ``wazuh_agent_enrollment``
| **Description**: Configures the :doc:`enrollment </user-manual/reference/ossec-conf/client>` section in the agent ``ossec.conf``.
| **Example**:

.. code-block:: yaml

    wazuh_agent_enrollment:
      enabled: ''
      manager_address: ''
      port: 1515
      agent_name: 'testname'
      groups: ''
      agent_address: ''
      ssl_cipher: HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH
      server_ca_path: ''
      agent_certificate_path: ''
      agent_key_path: ''
      authorization_pass_path: /var/ossec/etc/authd.pass
      auto_method: 'no'
      delay_after_enrollment: 20
      use_source_ip: 'no'

|
| **Variable**: ``wazuh_agent_client_buffer``
| **Description**: Configures the :doc:`client_buffer </user-manual/reference/ossec-conf/client-buffer>` section from agent ``ossec.conf``.
| **Example**:

.. code-block:: yaml

    wazuh_agent_client_buffer:
      disable: 'no'
      queue_size: '5000'
      events_per_sec: '500'

|
| **Variable**: ``wazuh_agent_rootcheck``
| **Description**: Configures the :doc:`rootcheck </user-manual/reference/ossec-conf/rootcheck>` section from agent ``ossec.conf``.
| **Example**:

.. code-block:: yaml

    wazuh_agent_rootcheck:
      frequency: 43200

|
| **Variable**: ``wazuh_agent_openscap``
| **Description**: Configures the :doc:`wodle </user-manual/reference/ossec-conf/wodle-openscap>` item named ``open-scap`` from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_openscap:
      disable: 'yes'
      timeout: 1800
      interval: '1d'
      scan_on_start: 'yes'

|
| **Variable**: ``wazuh_agent_cis_cat``
| **Description**: Configures the :doc:`wodle </user-manual/reference/ossec-conf/wodle-ciscat>` item named ``cis-cat`` from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_cis_cat:
      disable: 'yes'
      install_java: 'no'
      timeout: 1800
      interval: '1d'
      scan_on_start: 'yes'
      java_path: 'wodles/java'
      java_path_win: '\\server\jre\bin\java.exe'
      ciscat_path: 'wodles/ciscat'
      ciscat_path_win: 'C:\cis-cat'

|
| **Variable**: ``wazuh_agent_osquery``
| **Description**: Configures the :doc:`wodle</user-manual/reference/ossec-conf/wodle-osquery>` item named ``osquery`` from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_osquery:
      disable: 'yes'
      run_daemon: 'yes'
      bin_path_win: 'C:\Program Files\osquery\osqueryd'
      log_path: '/var/log/osquery/osqueryd.results.log'
      log_path_win: 'C:\Program Files\osquery\log\osqueryd.results.log'
      config_path: '/etc/osquery/osquery.conf'
      config_path_win: 'C:\Program Files\osquery\osquery.conf'
      add_labels: 'yes'

|
| **Variable**: ``wazuh_agent_syscollector``
| **Description**: Configures the :doc:`wodle </user-manual/reference/ossec-conf/wodle-syscollector>` item named ``syscollector`` from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_syscollector:
      disable: 'no'
      interval: '1h'
      scan_on_start: 'yes'
      hardware: 'yes'
      os: 'yes'
      network: 'yes'
      packages: 'yes'
      ports_no: 'yes'
      processes: 'yes'

|
| **Variable**: ``wazuh_agent_sca``
| **Description**: Configures the :doc:`sca </user-manual/reference/ossec-conf/sca>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_sca:
      enabled: 'yes'
      scan_on_start: 'yes'
      interval: '12h'
      skip_nfs: 'yes'
      day: ''
      wday: ''
      time: ''

|
| **Variable**: ``wazuh_agent_syscheck``
| **Description**: Configures the :doc:`syscheck </user-manual/reference/ossec-conf/syscheck>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_syscheck:
      frequency: 43200
      scan_on_start: 'yes'
      auto_ignore: 'no'
      win_audit_interval: 60
      skip_nfs: 'yes'
      skip_dev: 'yes'
      skip_proc: 'yes'
      skip_sys: 'yes'
      process_priority: 10
      max_eps: 100
      sync_enabled: 'yes'
      sync_interval: '5m'
      sync_max_interval: '1h'
      sync_max_eps: 10
      ignore:
        - /etc/mtab
        - /etc/hosts.deny
        - /etc/mail/statistics
        - /etc/random-seed
        - /etc/random.seed
        - /etc/adjtime
        - /etc/httpd/logs
        - /etc/utmpx
        - /etc/wtmpx
        - /etc/cups/certs
        - /etc/dumpdates
        - /etc/svc/volatile
      ignore_linux_type:
        - '.log$|.swp$'
      ignore_win:
        - '.log$|.htm$|.jpg$|.png$|.chm$|.pnf$|.evtx$'
      no_diff:
        - /etc/ssl/private.key

|
| **Variable**: ``wazuh_agent_localfiles``
| **Description**: Configures the :doc:`localfile </user-manual/reference/ossec-conf/localfile>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_localfiles:
      debian:
        - format: 'syslog'
          location: '/var/log/auth.log'
        - format: 'syslog'
          location: '/var/log/syslog'
        - format: 'syslog'
          location: '/var/log/dpkg.log'
        - format: 'syslog'
          location: '/var/log/kern.log'
      centos:
        - format: 'syslog'
          location: '/var/log/messages'
        - format: 'syslog'
          location: '/var/log/secure'
        - format: 'syslog'
          location: '/var/log/maillog'
        - format: 'audit'
          location: '/var/log/audit/audit.log'
      linux:
        - format: 'syslog'
          location: '/var/ossec/logs/active-responses.log'
        - format: 'full_command'
          command: 'last -n 20'
          frequency: '360'
        - format: 'command'
          command: df -P
          frequency: '360'
        - format: 'full_command'
          command: netstat -tulpn | sed 's/\([[:alnum:]]\+\)\ \+[[:digit:]]\+\ \+[[:digit:]]\+\ \+\(.*\):\([[:digit:]]*\)\ \+\([0-9\.\:\*]\+\).\+\ \([[:digit:]]*\/[[:alnum:]\-]*\).*/\1 \2 == \3 == \4 \5/' | sort -k 4 -g | sed 's/ == \(.*\) ==/:\1/' | sed 1,2d
          alias: 'netstat listening ports'
          frequency: '360'
      windows:
        - format: 'eventlog'
          location: 'Application'
        - format: 'eventchannel'
          location: 'Security'
          query: 'Event/System[EventID != 5145 and EventID != 5156 and EventID != 5447 and EventID != 4656 and EventID != 4658 and EventID != 4663 and EventID != 4660 and EventID != 4670 and EventID != 4690 and EventID != 4703 and EventID != 4907]'
        - format: 'eventlog'
          location: 'System'
        - format: 'syslog'
          location: 'active-response\active-responses.log'

|
| **Variable**: ``wazuh_agent_labels``
| **Description**: Configures the :doc:`labels </user-manual/reference/ossec-conf/labels>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_labels:
      enable: false
      list:
        - key: Env
          value: Production

|
| **Variable**: ``wazuh_agent_active_response``
| **Description**: Configures the :doc:`active-response </user-manual/reference/ossec-conf/active-response>` section from ``ossec.conf``.
| **Default values**:

.. code-block:: yaml

    wazuh_agent_active_response:
      ar_disabled: 'no'
      ca_store: '/var/ossec/etc/wpk_root.pem'
      ca_store_win: 'wpk_root.pem'
      ca_verification: 'yes'

|
| **Variable**: ``wazuh_agent_log_format``
| **Description**: Configures the :doc:`log_format </user-manual/reference/ossec-conf/logging>` section from ``ossec.conf``.
| **Default value**: ``plain``
|
| **Variable**: ``wazuh_agent_config``
| **Description**: Wazuh Agent related configuration. This variable is provided for backward compatibility. Newer deployments should use the newly introduced variables described above.
| **Example**:

.. code-block:: yaml

    wazuh_agent_config:
      log_format: 'plain'
      syscheck:
        frequency: 43200
        scan_on_start: 'yes'
        auto_ignore: 'no'
        alert_new_files: 'yes'
        ignore:
          - /etc/mtab
          - /etc/mnttab
          - /etc/hosts.deny
          - /etc/mail/statistics
          - /etc/random-seed
          - /etc/random.seed
          - /etc/adjtime
          - /etc/httpd/logs
          - /etc/utmpx
          - /etc/wtmpx
          - /etc/cups/certs
          - /etc/dumpdates
          - /etc/svc/volatile
        no_diff:
          - /etc/ssl/private.key
        directories:
          - dirs: /etc,/usr/bin,/usr/sbin
            checks: 'check_all="yes"'
          - dirs: /bin,/sbin
            checks: 'check_all="yes"'
        windows_registry:
          - key: 'HKEY_LOCAL_MACHINE\Software\Classes\batfile'
            arch: 'both'
          - key: 'HKEY_LOCAL_MACHINE\Software\Classes\Folder'
      rootcheck:
        frequency: 43200

|

.. Warning::
  
    We recommend the use of `Ansible Vault <https://docs.ansible.com/ansible/latest/user_guide/vault.html>`_ to protect authd credentials.

| **Variable**: ``authd_pass``
| **Description**: Wazuh authd credentials for agent registration.
| **Example**:

.. code-block:: yaml

    authd_pass: foobar
