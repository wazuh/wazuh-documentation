.. _wazuh_ansible_reference:

Variables references
--------------------

Elasticseach
===================

elasticsearch_cluster_name
  Name of the Elasticsearch cluster

  *Default wazuh*

elasticsearch_node_name
  Name of the Elasticsearch node

  *Default node-1*

elasticsearch_network_host
  Listen ip address of Elasticsearch

  *Default 127.0.0.1*

elasticsearch_http_port
  Listen port of Elasticsearch

  *Default 9200*

elasticsearch_jvm_xms
  JVM heap size

  *Default 1g*

elastic_stack_version
  Version of Elasticsearch to install

  *Default 5.4.0*

Kibana
=========

elasticsearch_network_host
  Ip address or hostname of Elasticsearch node.

  *Default 127.0.0.1*

elasticsearch_http_port
  Port of Elasticsearch node.

  *Default 9200*

kibana_server_host
  Listen ip address of Kibana.

  *Default 0.0.0.0*

kibana_server_port
  Listen port of Kibana.

  *Default 5601*

elastic_stack_version
  Version of Kibana to install

  *Default 5.4.0*

Logstash
===================

elasticsearch_network_host
  Ip address or hostname of Elasticsearch node.

  *Default 127.0.0.1*

elasticsearch_http_port
  Port of Elasticsearch node.

  *Default 9200*

elastic_stack_version
  Version of Logstash to install

  *Default 5.4.0*

logstash_ssl
  Using ssl between filebeat and logstash

  *Default false*

logstash_ssl_dir
  Folder where the SSL key and cert will be stored.

  *Default /etc/pki/logstash*

logstash_ssl_certificate_file
  SSL cert file to be copied from Ansible server to logstash server.

  *Default null*

logstash_ssl_key_file
  SSL key file to be copied from Ansible server to logstash server.

  *Default null*

Filebeat
===================

filebeat_create_config:
  Generate or not Filebeat config.

  *Default true*

filebeat_prospectors:
  Set filebeat propectors to fetch data.

  *Example:* ::

    filebeat_prospectors:
    - input_type: log
      paths:
        - "/var/ossec/logs/alerts/alerts.json"
      document_type: json
      json.message_key: log
      json.keys_under_root: true
      json.overwrite_keys: true

filebeat_output_elasticsearch_enabled:
  Send output to Elasticsearch node(s).

  *Default false*

filebeat_output_elasticsearch_hosts:
  Elasticsearch node(s) to send output.

  *Example:* ::

    filebeat_output_elasticsearch_hosts:
    - "localhost:9200"
    - "10.1.1.10:9200"

filebeat_output_logstash_enabled:
  Send output to Logstash node(s).

  *Default true*

filebeat_output_logstash_hosts:
  Logstash node(s) to send output.

  *Example:* ::

    filebeat_output_logstash_hosts:
    - "10.1.1.10:5000"
    - "10.1.1.11:5000"

filebeat_enable_logging:
  Enable/disable logging.

  *Default true*

filebeat_log_level:
  Set filebeat log level.

  *Default debug*

filebeat_log_dir:
  Set filebeat log directory.

  *Default: /var/log/mybeat*

filebeat_log_filename:
  Set filebeat log filename.

  *Default mybeat.log*

filebeat_ssl_dir:
  Set the folder containing SSL certs.

  *Default /etc/pki/logstash*

filebeat_ssl_certificate_file:
  Set certificate filename.

  *Default null*

filebeat_ssl_key_file:
  Set certificate key filename.

  *Default null*

filebeat_ssl_insecure:
  Verify validity of the server certificate hostname.

  *Default false*

Wazuh Manager
===================

wazuh_manager_fqdn:
  Set Wazuh Manager fqdn hostname.

  *Default wazuh-server*

wazuh_manager_config:
  Wazuh Manager related server config.

  *Example:*

  .. code-block:: yaml

    wazuh_manager_config:
      email_notification: no
      mail_to:
        - admin@example.net
      mail_smtp_server: localhost
      mail_from: wazuh-server@example.com
      frequency_check: 43200
      syscheck_scan_on_start: 'yes'
      log_level: 1
      email_level: 12
      ignore_files:
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
        - check_all: 'yes'
          dirs: /etc,/usr/bin,/usr/sbin
        - check_all: 'yes'
          dirs: /bin,/sbin
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
      connection:
        - type: 'secure'
          port: '1514'
          protocol: 'tcp'
      commands:
        - name: 'disable-account'
          executable: 'disable-account.sh'
          expect: 'user'
          timeout_allowed: 'yes'
        - name: 'restart-ossec'
          executable: 'restart-ossec.sh'
          expect: ''
          timeout_allowed: 'no'
        - name: 'firewall-drop'
          executable: 'firewall-drop.sh'
          expect: 'srcip'
          timeout_allowed: 'yes'
        - name: 'host-deny'
          executable: 'host-deny.sh'
          expect: 'srcip'
          timeout_allowed: 'yes'
        - name: 'route-null'
          executable: 'route-null.sh'
          expect: 'srcip'
          timeout_allowed: 'yes'
        - name: 'win_route-null'
          executable: 'route-null.cmd'
          expect: 'srcip'
          timeout_allowed: 'yes'
      active_responses:
        - command: 'host-deny'
          location: 'local'
          level: 6
          timeout: 600

wazuh_agent_configs:
  Wazuh Manager agents centralized configuration related server config.

  *Example:*

  .. code-block:: yaml

    - type: os
      type_value: linux
      frequency_check: 79200
      ignore_files:
        - /etc/mtab
        - /etc/mnttab
        - /etc/hosts.deny
        - /etc/mail/statistics
        - /etc/svc/volatile
      directories:
        - check_all: yes
          dirs: /etc,/usr/bin,/usr/sbin
        - check_all: yes
          dirs: /bin,/sbin
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

.. warning:: We recommend the use of `Ansible Vault <http://docs.ansible.com/ansible/playbooks_vault.html>`_ to protect Wazuh API and agentless credentials.

agentless_creeds:
  Credentials and host(s) to be used by agentless feature.

  *Example:*

  .. code-block:: yaml

    agentless_creeds:
      - type: ssh_integrity_check_linux
        frequency: 3600
        host: root@example.net
        state: periodic
        arguments: '/bin /etc/ /sbin'
        passwd: qwerty

.. warning:: We recommend the use of `Ansible Vault <http://docs.ansible.com/ansible/playbooks_vault.html>`_ to protect Wazuh API and agentless credentials.

wazuh_api_user:
  Wazuh API credentials.

  *Example:*

  .. code-block:: yaml

    wazuh_api_user:
    - foo:$apr1$/axqZYWQ$Xo/nz/IG3PdwV82EnfYKh/
    - bar:$apr1$hXE97ag.$8m0koHByattiGKUKPUgcZ1

Wazuh Agent
===================

wazuh_manager_ip:
  Set Wazuh Manager server to be used by the agent.

  *Default 127.0.0.1*

wazuh_authd_port:
  Set the port of the ossec-authd daemon to be used.

  *Default 1515*

wazuh_register_client:
  Enable or not client registration via ossec-authd.

  *Default true*

wazuh_register_client:
  Wazuh Agent related configuration.

  *Example:*

  .. code-block:: yaml

    ---
    wazuh_manager_ip: 127.0.0.1
    wazuh_authd_port: 1515
    wazuh_register_client: true
    wazuh_agent_config:
    frequency_check: 43200
    syscheck_scan_on_start: 'yes'
    ignore_files:
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
      - check_all: 'yes'
        dirs: /etc,/usr/bin,/usr/sbin
      - check_all: 'yes'
        dirs: /bin,/sbin
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
