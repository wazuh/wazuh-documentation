.. _codeblocks:

Code-blocks
===================

----------
Attributes
----------

Linenos
-------

.. code-block::
  :linenos: 
  
  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

.. code-block::
  :linenos: 
  :class: output collapsed
  
  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

Emphasize lines
---------------

.. code-block::
  :emphasize-lines: 3,4
  :linenos: 
  
  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

.. code-block::
  :emphasize-lines: 3,4

  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

.. code-block::
  :emphasize-lines: 3,4
  :linenos: 
  :class: output
  
  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

.. code-block::
  :emphasize-lines: 3,4
  :class: output

  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

Caption
-------

.. code-block:: 
  :caption: This is a code-block of type ``console``.
  
  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

.. code-block:: 
  :caption: This is a code-block of type ``console``.
  :emphasize-lines: 3,4
  :linenos: 
  
  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

Name
----

.. code-block::
  :name: code-name
  
  This code-block
  only contains text,
  to test the 
  code-block attributes
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

------
Types
------

Console
-------

.. code-block:: console
  
  # /Library/Ossec/bin/ossec-control restart
  
  # Restart-Service -Name wazuh
  
  # apt-get install apt-transport-https zip unzip lsb-release curl gnupg2
  
  # curl -sL  https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/certificate_checker.sh | bash -
  
  # curl -so /etc/elasticsearch/elasticsearch.yml https://raw.githubusercontent.com/wazuh/wazuh-documentation/4.1/resources/elastic-stack/elasticsearch/7.x/elasticsearch_cluster_initial_node.yml

  # zip -d ~/certs.zip "ca/ca.key"
  # unzip ~/certs.zip -d ~/certs
  # mv /etc/filebeat/certs/filebeat-X.key /etc/filebeat/certs/filebeat.key
  # chmod -R 500 /etc/filebeat/certs
  # chmod 400 /etc/filebeat/certs/ca/ca.* /etc/filebeat/certs/filebeat.*
  
  # update-rc.d elasticsearch defaults 95 10
  
  # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list
  
  # sed -i "s/^deb/#deb/" /etc/apt/sources.list.d/elastic-7.x.list
  
  # WAZUH_MANAGER="10.0.0.2" WAZUH_REGISTRATION_PASSWORD="TopSecret" \
       WAZUH_AGENT_NAME="apt-agent" apt-get install wazuh-agent
  
  # cat > /etc/yum.repos.d/nginx.repo <<\EOF
  [nginx]
  name=nginx repo
  baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
  gpgcheck=0
  enabled=1
  EOF
  
  # &'C:\Program Files (x86)\ossec-agent\agent-auth.exe' -m <manager_IP>

.. code-block:: console
  
  # ssh blimey@13.56.124.147
  ssh blimey@13.56.124.147

.. code-block:: console

  ansible@ansible:~$ ssh-keygen
   
  [centos@localhost ~]$ chmod 700 .ssh/
  
  ansible@ansible:~$ cat .ssh/id_rsa.pub | ssh centos@192.168.0.180 "cat >> .ssh/authorized_keys"
  
  ansible@ansible:/etc/ansible/roles$ sudo git clone --branch v|WAZUH_LATEST_ANSIBLE| https://github.com/wazuh/wazuh-ansible.git
  
  [root@localhost centos]# /var/ossec/bin/agent_control -l
  
  $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b v|WAZUH_LATEST_KUBERNETES| --depth=1
  
  ":" Blowfish(<!-padding> Gzip(MD5(<Random> <Global> ":" <Local> ":" <Event>) <Random> <Global> ":" <Local> ":" <Event>))
  
  root@agent:~# cat personal_data/subject_data.txt
  
  <ossec_config>
    <client>
      <server>
        <address>172.16.1.17</address>
        <port>1514</port>
        <protocol>udp</protocol>
      </server>
  
  agent:id:001
  node:id:*
  
  sqlite> select * from sys_programs where name="wazuh-agent";
  # sqlite> select * from sys_programs where name="wazuh-agent";  
  
  # curl -k -X POST -u <username>:<user_password> "https://<elasticsearch_ip>:9200/_security/user/<username>/_password?pretty" -H 'Content-Type: application/json' -d '
  # {
  #   "password" : "<new_password>"
  # }
  # '
  
  verify-agent-conf [-f <agent.conf file>]

.. code-block:: console
  :class: output
  :emphasize-lines: 2

  Changed password for user apm_system
  PASSWORD apm_system = lLPZhZkB6oUOzzCrkLSF

  Changed password for user kibana_system
  PASSWORD kibana_system = TaLqVOnSoqKTYLIU0vDn

.. code-block:: console
  :class: output

  {
    "name" : "elasticsearch",
    "cluster_name" : "elasticsearch",
    "cluster_uuid" : "TLGcuHLRTL6PAyIRlxjtLg",
    "version" : {
      "number" : "7.11.2",
      "build_flavor" : "default",
      "build_type" : "rpm",
      "build_hash" : "3e5a16cfec50876d20ea77b075070932c6464c7d",
      "build_date" : "2021-03-06T05:54:38.141101Z",
      "build_snapshot" : false,
      "lucene_version" : "8.7.0",
      "minimum_wire_compatibility_version" : "6.8.0",
      "minimum_index_compatibility_version" : "6.0.0-beta1"
    },
    "tagline" : "You Know, for Search"
  }

.. code-block:: console
  :class: output

  diamorphine            13155  0
  
  "version": "7.10.2",
  
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current Dload  Upload   Total   Spent    Left  Speed
  100   271  100   271    0     0    879      0 --:--:-- --:--:-- --:--:--   882 {"data": {"title": "Wazuh API REST", "api_version": "4.1.1", "revision": 40110, "license_name": "GPL 2.0", "license_url": "https://github.com/wazuh/wazuh/blob/4.1/LICENSE", "hostname": "localhost.localdomain", "timestamp": "2021-03-03T10:01:18+0000"}, "error": 0}
  
  hosts:
   - production:
       url: https://localhost
       port: 55000
       username: wazuh-wui
       password: wazuh-wui
       run_as: false

XML
---

.. code-block:: xml
 
 <cluster>
   <name>wazuh</name>
   <node_name>master-node</node_name>
   <key>c98b62a9b6169ac5f67dae55ae4a9088</key>
   <node_type>master</node_type>
   <port>1516</port>
   <bind_addr>0.0.0.0</bind_addr>
   <nodes>
     <node>wazuh-master-address</node>
   </nodes>
   ...
   <disabled>no</disabled>
 </cluster>

.. code-block:: xml

  <wodle name="aws-s3">
    <!-- Inspector, two regions, and logs after January 2018 -->
    <service type='inspector'>
      <aws_profile>default</aws_profile>
      <regions>us-east-1,us-east-2</regions>
      <only_logs_after>2018-JAN-01</only_logs_after>
    </service>
    . . .
  </wodle>   
  
  <iam_role_arn>arn:aws:iam::xxxxxxxxxxx:role/wazuh-role</iam_role_arn>

.. code-block:: xml

  {
    "Sid": "VisualEditor0",
    "Effect": "Allow",
    "Action": "ec2:DescribeFlowLogs",
    "Resource": "*"
  }

.. code-block:: xml
  :emphasize-lines: 2

  <rule id="87802" level="3">
    <decoded_as>json</decoded_as>
    <field name="azure_tag">azure-ad-graph</field>
    <description>Azure: AD $(activity)</description>
  </rule>
  
  <localfile>
      <location>C:\Users\user\Desktop\*test*</location>
      <log_format>syslog</log_format>
      <exclude>C:\Users\user\Desktop\*test*.json</log_format>
  </localfile>
  
  <rootcheck>
    <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
    <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>
  </rootcheck>
  
  <email_alerts>
    <email_to>you@example.com</email_to>
    <rule_id>515, 516</rule_id>
    <do_not_delay />
  </email_alerts>
  
  <syslog_output>
    <server>192.168.1.3</server>
    <level>7</level>
    <format>json</format>
  </syslog_output>
  
  <regex> [+-]?(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)? </regex>

.. code-block:: xml

  [indexer_discovery:cluster1]
  pass4SymmKey = changeme
  master_uri = https://<master_ip>:<management_port>
  
  # kill -31 $(pidof rsyslogd)
  # ps auxw | grep rsyslog | grep -v grep

.. code-block:: xml
  :class: output

  <rootkit_files>/var/ossec/etc/shared/rootkit_files.txt</rootkit_files>
  <rootkit_trojans>/var/ossec/etc/shared/rootkit_trojans.txt</rootkit_trojans>

None
----

.. code-block:: none

  application_id = 317...764
  application_key = wUj...9cj
  
  [settings]
  root_endpoint=/splunk

.. code-block:: none
  :emphasize-lines: 2,4

  [script:///opt/splunk/etc/apps/SplunkAppForWazuh/bin/get_agents_status.py]
  disabled = false
  index = wazuh-monitoring
  interval = 0 * * * *
  sourcetype = _json

.. code-block:: none
   :class: output

   Generating public/private rsa key pair.
   Enter file in which to save the key (/home/ansible/.ssh/id_rsa):
   Enter passphrase (empty for no passphrase):
   Enter same passphrase again:
   Your identification has been saved in /home/ansible/.ssh/id_rsa.
   Your public key has been saved in /home/ansible/.ssh/id_rsa.pub.
   The key fingerprint is:
   SHA256:Z2nkI+fOVMa21NxP8YZaKpQWFqbm4cnAKXZezkuG/0g ansible@ansible
   The key's randomart image is:
   +---[RSA 2048]----+
   |          o      |
   |     . . o .     |
   |    o = = +    . |
   |   . + @ * = o oo|
   |      o S % * = =|
   |       + @ * = o.|
   |        E + +   .|
   |       . * .     |
   |        . +      |
   +----[SHA256]-----+

.. code-block:: none
  :class: output

    NAME         TYPE    VERSION  ADDRESS
    master-node  master  4.0.0    10.0.0.3
    worker-node1 worker  4.0.0    10.0.0.4
    worker-node2 worker  4.0.0    10.0.0.5

.. code-block:: none
    :class: output

    2019/10/28 13:58:10 wazuh-modulesd:aws-s3[8184] wm_aws.c:48 at wm_aws_main(): INFO: Module AWS started
    019/10/28 13:58:10 wazuh-modulesd:aws-s3: INFO: Starting fetching of logs.
    
    # 2019/10/28 14:08:28 wazuh-modulesd:aws-s3[2557] wm_aws.c:409 at wm_aws_run_s3(): DEBUG: Launching S3 Command: /var/ossec/wodles/aws/aws-s3 --bucket wazuh-cloudtrail --access_key XXXXXXXX --secret_key XXXXXXXX --type cloudtrail --debug 2 --skip_on_error

    drwx------  2 ansible ansible 4,0K sep 12 13:37 .
    -rw-------  1 ansible ansible 1,7K sep 12 13:37 id_rsa
    -rw-r--r--  1 ansible ansible  397 sep 12 13:37 id_rsa.pub
    drwxr-xr-x 15 ansible ansible 4,0K sep 12 13:32 ..
    
    centos@192.168.0.180's password:
    
    ssh-rsa AAA...60V ansible@ansible

.. code-block:: none
  :class: output

  192.168.0.108 | SUCCESS => {
      "changed": false,
      "ping": "pong"
  }
  192.168.0.180 | SUCCESS => {
      "changed": false,
      "ping": "pong"
  }
  
  roles
  ├── ansible-galaxy
  │   └── meta
  └── elastic-stack
      ├── ansible-elasticsearch
      │   ├── defaults
      │   ├── handlers
      │   ├── meta
      │   ├── tasks
      │   └── templates
      └── ansible-kibana

  ● elasticsearch.service - Elasticsearch
     Loaded: loaded (/usr/lib/systemd/system/elasticsearch.service; enabled; vendor preset: enabled)
  
  [root@localhost centos]# systemctl status filebeat

  Password for user puppetdb:
  psql (9.4.11)
  Type "help" for help.
  puppetdb=> \q
  
  docker-compose version |DOCKER_COMPOSE_VERSION|
  
  Apps -> Manage apps -> Install app from file

YAML
-----

.. code-block:: yaml
  :emphasize-lines: 18

  server.host: <kibana_ip>
  elasticsearch.hosts: "https://<elasticsearch_DN>:9200"
  
  output.elasticsearch.hosts: <elasticsearch_ip>:9200
  output.elasticsearch.password: <elasticsearch_password>
  
  output.elasticsearch.ssl.certificate: /etc/filebeat/certs/filebeat-X.crt
  output.elasticsearch.ssl.key: /etc/filebeat/certs/filebeat-X.key
  
  output.elasticsearch.hosts: ["<elasticsearch_ip>:9200"]
  output.elasticsearch.hosts: ["<elasticsearch_ip_node_1>:9200", "<elasticsearch_ip_node_2>:9200", "<elasticsearch_ip_node_3>:9200"]
  
  network.host: <elasticsearch_ip>
  node.name: elasticsearch-1
  cluster.name: elasticsearch_cluster
  cluster.initial_master_nodes:
          - elasticsearch-1
          - elasticsearch-2
          - elasticsearch-3
  discovery.seed_hosts:
          - <elasticsearch_ip_node1>
          - <elasticsearch_ip_node2>
          - <elasticsearch_ip_node3>

.. code-block:: yaml

  # Nodes certificates
  nodes:
    - name: node-1
      dn: CN=node-1,OU=Docu,O=Wazuh,L=California,C=US
      ip:
        - <elasticsearch_1_IP>
    - name: node-2
      dn: CN=node-2,OU=Docu,O=Wazuh,L=California,C=US
      ip:
        - <elasticsearch_2_IP>
    - name: node-3
      dn: CN=node-3,OU=Docu,O=Wazuh,L=California,C=US
      ip:
        - <elasticsearch_3_IP>
    - name: kibana
      dn: CN=kibana,OU=Docu,O=Wazuh,L=California,C=US      
      ip:
        - <kibana_ip>

.. code-block:: yaml

  # Here's another example of host ranges, this time there are no
  # leading 0s:

  ## db-[99:101]-node.example.com

  192.168.0.180 ansible_ssh_user=centos
  
  wazuh_manager_globals:
    - '^localhost.localdomain$'
  
  wazuh_manager_extra_emails:
    - enable: false
      mail_to: 'recipient@example.wazuh.com'
      format: full
      level: 7
      event_location: null
      
  wazuh_api_user:
  - foo:$apr1$/axqZYWQ$Xo/nz/IG3PdwV82EnfYKh/
  - bar:$apr1$hXE97ag.$8m0koHByattiGKUKPUgcZ1
  
  mail_from: wazuh-manager@example.com
  
  wazuh_agent_enrollment:
    ssl_cipher: HIGH:!ADH:!EXP:!MD5:!RC4:!3DES:!CAMELLIA:@STRENGTH
  
  windows_registry_ignore:
    - key: '\Enum$'
      type: "sregex"
  
  # Kibana-instance
  - <kibana_ip>
  
  hosts:
    - <id>:
       url: http(s)://<api_url>
       port: <api_port>
       
  $list_of_files: /etc/ssh/sshd_config,/etc/sysctl.conf,/var/log/dmesg
  $list_of_folders: /etc,/var,/tmp
  
  - name: <certificate_name>
  dn: CN=<common-name>,OU=<operational-unit>,O=<organization>,L=<locality>,C=<country-code>

.. code-block:: yaml

  - hosts: <your elasticsearch host>
    roles:
      - { role: /etc/ansible/roles/wazuh-ansible/roles/elastic-stack/ansible-elasticsearch, elasticsearch_network_host: 'your elasticsearch IP' }

.. code-block:: yaml

  - hosts: 192.168.0.102
    roles:
      - /etc/ansible/roles/wazuh-ansible/roles/wazuh/ansible-wazuh-agent
    vars:
      wazuh_managers:
        - address: 192.168.0.180
          port: 1514
          protocol: udp
          api_port: 55000
          api_proto: 'http'
          api_user: ansible
      wazuh_agent_authd:
      registration_address: 192.168.0.180
        enable: true
        port: 1515
        ssl_agent_ca: null
        ssl_auto_negotiate: 'no'

.. code-block:: yaml

    services:
      wazuh:
        . . .
        volumes:
          - ossec_api_configuration:/var/ossec/api/configuration
          - ossec_etc:/var/ossec/etc
    volumes:
      ...
      ossec_api_configuration:
      ossec_etc:

.. code-block:: yaml

  cat > /usr/share/elasticsearch/instances.yml <<\EOF
  instances:
    - name: "elasticsearch-1"
      ip:
      - "10.0.0.2"
    - name: "elasticsearch-2"
      ip:
      - "10.0.0.3"
    - name: "elasticsearch-3"
      ip:
      - "10.0.0.4"
    - name: "filebeat"
      ip:
      - "10.0.0.5"
    - name: "kibana"
      ip:
      - "10.0.0.6"  
    EOF  

.. code-block:: yaml

  $ cd /etc/ansible/roles
  $ git clone --branch v|WAZUH_LATEST_ANSIBLE| https://github.com/wazuh/wazuh-ansible.git

.. code-block:: yaml
  :class: output

  - hosts: 192.168.0.108
    roles:
        - { role: /etc/ansible/roles/wazuh-ansible/roles/elastic-stack/ansible-elasticsearch, elasticsearch_network_host: 'localhost' }
        - { role: /etc/ansible/roles/wazuh-ansible/roles/elastic-stack/ansible-kibana, elasticsearch_network_host: 'localhost' }

JSON, JS and JavaScript
-----------------------

JSON
^^^^

.. code-block:: json

        {
            "MATCH$": {
                "auth": {
                    "office": ["20", "21", "30"]
                }
            }
        }

.. code-block:: json

    {
        "options": {
            "config_plugin": "filesystem",
            "logger_plugin": "filesystem",
            "utc": "true"
        },

        "schedule": {
            "system_info": {
            "query": "SELECT hostname, cpu_brand, physical_memory FROM system_info;",
            "interval": 3600
            },
            "high_load_average": {
            "query": "SELECT period, average, '70%' AS 'threshold' FROM load_average WHERE period = '15m' AND average > '0.7';",
            "interval": 900,
            "description": "Report if load charge is over 70 percent."
            },
            "low_free_memory": {
            "query": "SELECT memory_total, memory_free, CAST(memory_free AS real) / memory_total AS memory_free_perc, '10%' AS threshold FROM memory_info WHERE memory_free_perc < 0.1;",
            "interval": 1800,
            "description": "Free RAM is under 10%."
            }
        },

        "packs": {
            "osquery-monitoring": "/usr/share/osquery/packs/osquery-monitoring.conf",
            "incident-response": "/usr/share/osquery/packs/incident-response.conf",
            "it-compliance": "/usr/share/osquery/packs/it-compliance.conf",
            "vuln-management": "/usr/share/osquery/packs/vuln-management.conf",
            "hardware-monitoring": "/usr/share/osquery/packs/hardware-monitoring.conf",
            "ossec-rootkit": "/usr/share/osquery/packs/ossec-rootkit.conf"
        }
    }

.. code-block:: json
  :emphasize-lines: 11,19,29,40
  :class: output

  {
    "agent": {
        "id": "000",
        "name": "wazuh-manager-master"
    },
    "data": {
        "aws": {
            "awsRegion": "us-west-1",
            "aws_account_id": "1234567890",
            "eventID": "12ab34c-1234-abcd-1234-123456789",
            "eventName": "DeleteSecurityGroup",
            "eventSource": "ec2.amazonaws.com",
            "eventTime": "2020-08-06T15:13:07Z",
            "eventType": "AwsApiCall",
            "eventVersion": "1.05",
            "recipientAccountId": "0987654321",
            "requestID": "12345678-abcd-efgh-1234-123456789",
            "requestParameters": {
                "groupId": "sg-12345678901234567"
            },
            "responseElements": {
                "_return": "true",
                "requestId": "12345678-abcd-efgh-1234-123456789"
            },
            "source": "cloudtrail",
            "sourceIPAddress": "cloudformation.amazonaws.com",
            "userAgent": "cloudformation.amazonaws.com",
            "userIdentity": {
                "accountId": "1234567890",
                "arn": "arn:aws:iam::1234567890:user/john.doe",
                "invokedBy": "cloudformation.amazonaws.com",
                "principalId": "ABCDEFGHIJKLMNH",
                "sessionContext": {
                    "attributes": {
                        "creationDate": "2020-08-06T09:08:14Z",
                        "mfaAuthenticated": "false"
                    }
                },
                "type": "IAMUser",
                "userName": "john.doe"
            }
        },
        "integration": "aws"
    },
    "rule": {
        "description": "AWS Cloudtrail: ec2.amazonaws.com - DeleteSecurityGroup.",
        "id": "80202",
        "level": 3
    }
    "timestamp": "2020-08-06T15:47:14.334+0000"
  }

Js
^^^

.. code-block:: js

    GET /sca/001

.. code-block:: js
    :class: output

    {
        "error": 0,
        'data': {
            "totalItems": 3,
            "items": [
                {
                    "pass": 2,
                    "references": "https://www.ssh.com/ssh/",
                    "invalid": 0,
                    "description": "Guidance for establishing a secure configuration for SSH service vulnerabilities.",
                    "end_scan": "2019-04-30 05:29:50",
                    "score": 22,
                    "fail": 7,
                    "hash_file": "4c7d05c9501ea38910e20ae22b1670b4f778669bd488482b4a19d179da9556ea",
                    "start_scan": "2019-04-30 05:29:50",
                    "total_checks": 9,
                    "name": "System audit for SSH hardening",
                    "policy_id": "system_audit_ssh"
                },
                ...
            ]
        }
    }

JavaScript
^^^^^^^^^^

.. code-block:: javascript
  :class: output

  {
    "timestamp": "2017-03-07T13:31:41-0800",
    "rule": {
      "level": 7,
      "description": "Integrity checksum changed.",
      "id": "550",
      "firedtimes": 1,
      "groups": [
        "ossec",
        "syscheck"
      ],
      "pci_dss": [
        "11.5"
      ]
    },
    'agent': {
      "id": "001",
      "name": "92603de31548",
      "ip": "192.168.66.1",
      "labels": {
        "aws": {
          "instance-id": "i-052a1838c",
          "sec-group": "sg-1103"
        },
        "network": {
          "ip": "172.17.0.0",
          "mac": "02:42:ac:11:00:02"
        }
      }
    },
    "manager": {
      "name": "ubuntu"
    },
    "full_log": "Integrity checksum changed for: '/var/ossec/etc/ossec.conf' Size changed from '3663' to '3664' Old md5sum was: '98b351df146410f174a967d726f9965e' New md5sum is : '7f4f5846dcaa0013a91bd6d3ac4a1915' Old sha1sum was: 'c6368b866a835b15baf20976ae5ea7ea2788a30e' New sha1sum is : 'c959321244bdcec824ff0a32cad6d4f1246f53e9'",
    "syscheck": {
      "path": "/var/ossec/etc/ossec.conf",
      "size_before": "3663",
      "size_after": "3664",
      "perm_after": "100640",
      "uid_after": "0",
      "gid_after": "999",
      "md5_before": "98b351df146410f174a967d726f9965e",
      "md5_after": "7f4f5846dcaa0013a91bd6d3ac4a1915",
      "sha1_before": "c6368b866a835b15baf20976ae5ea7ea2788a30e",
      "sha1_after": "c959321244bdcec824ff0a32cad6d4f1246f53e9",
      "event": "modified"
    },
    "decoder": {
      "name": "syscheck_integrity_changed"
    },
    "location": "syscheck"
  }
  
.. code-block:: javascript

  "index_patterns": ["wazuh-alerts-*"],
  
Bash
----

.. code-block:: bash

  $ ansible-playbook wazuh-manager.yml -e@vars-production.yml
  
  $ ansible -m setup all -u foo -k -b -K

  $ sudo du -h /var/ossec | tail -n1
  $ sudo df -h /var

  # sudo rm -f /etc/ossec-init.conf
  # sudo rm -rf /var/ossec

.. code-block:: bash

    /var/ossec/api/configuration
    /var/ossec/etc
    /var/ossec/logs
    /var/ossec/queue
    /var/ossec/var/multigroups
    /var/ossec/integrations
    /var/ossec/active-response/bin
    /var/ossec/agentless
    /var/ossec/wodles
    /etc/filebeat
    /var/lib/filebeat

.. code-block:: bash

  curl -X PUT "https://127.0.0.1:9200/_cluster/settings"  -u <username>:<password> -k -H 'Content-Type: application/json' -d'
  {
    "persistent": {
      "cluster.routing.allocation.enable": "primaries"
    }
  }
  '

.. code-block:: bash

  msiexec /qn /norestart /i puppet-agent-<VERSION>-x64.msi
  
  sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

  root@wazuh-manager:/var/ossec/logs/archives/2020/Jan# ls -l
  total 176
  -rw-r----- 1 ossec ossec 234350 Jan  2 00:00 ossec-archive-01.json.gz
  -rw-r----- 1 ossec ossec    350 Jan  2 00:00 ossec-archive-01.json.sum
  -rw-r----- 1 ossec ossec 176221 Jan  2 00:00 ossec-archive-01.log.gz
  -rw-r----- 1 ossec ossec    346 Jan  2 00:00 ossec-archive-01.log.sum
  -rw-r----- 1 ossec ossec 224320 Jan  2 00:00 ossec-archive-02.json.gz
  -rw-r----- 1 ossec ossec    350 Jan  2 00:00 ossec-archive-02.json.sum
  -rw-r----- 1 ossec ossec 151642 Jan  2 00:00 ossec-archive-02.log.gz
  -rw-r----- 1 ossec ossec    346 Jan  2 00:00 ossec-archive-02.log.sum
  -rw-r----- 1 ossec ossec 315251 Jan  2 00:00 ossec-archive-03.json.gz
  -rw-r----- 1 ossec ossec    350 Jan  2 00:00 ossec-archive-03.json.sum
  -rw-r----- 1 ossec ossec 156296 Jan  2 00:00 ossec-archive-03.log.gz
  -rw-r----- 1 ossec ossec    346 Jan  2 00:00 ossec-archive-03.log.sum

.. code-block:: bash

    #!/bin/bash
    IP=`ip -o -4 addr show dev eth0 | cut -d ' ' -f 7 | cut -f 1 -d '/'`
    if [ "$IP" == "172.30.0.10" ]; then
      hostnamectl set-hostname --static wazuh-manager
    fi
    if [ "$IP" == "172.30.0.20" ]; then
      hostnamectl set-hostname --static elastic-server
    fi
    if [ "$IP" == "172.30.0.30" ]; then
      hostnamectl set-hostname --static linux-agent
    fi
    echo "preserve_hostname: true" >> /etc/cloud/cloud.cfg
    echo "172.30.0.10 wazuh-manager" >> /etc/hosts
    echo "172.30.0.20 elastic-server" >> /etc/hosts
    echo "172.30.0.30 linux-agent" >> /etc/hosts
    echo "172.30.0.40 windows-agent" >> /etc/hosts
    echo "PATH=$PATH:$HOME/bin:/var/ossec/bin" >> /root/.bashrc

.. code-block:: bash

    #!/bin/bash

    echo -e "\n- Getting token...\n"

    TOKEN=$(curl -u wazuh:wazuh -k -X GET "https://localhost:55000/security/user/authenticate?raw=true")

    echo -e "\n- API calls with TOKEN environment variable ...\n"

    echo -e "Getting default information:\n"

    curl -k -X GET "https://localhost:55000/?pretty=true" -H  "Authorization: Bearer $TOKEN"

    echo -e "\n\nGetting /agents/summary/os:\n"

    curl -k -X GET "https://localhost:55000/agents/summary/status?pretty=true" -H  "Authorization: Bearer $TOKEN"

    echo -e "\n\nEnd of the script.\n"

.. code-block:: bash

    DRIVER              VOLUME NAME
    local               wazuh-docker_filebeat_etc
    local               wazuh-docker_filebeat_var
    local               wazuh-docker_ossec_active_response
    local               wazuh-docker_ossec_agentless
    local               wazuh-docker_ossec_api_configuration
    local               wazuh-docker_ossec_etc
    local               wazuh-docker_ossec_integrations
    local               wazuh-docker_ossec_logs
    local               wazuh-docker_ossec_queue
    local               wazuh-docker_ossec_var_multigroups
    local               wazuh-docker_ossec_wodles

.. code-block:: bash
  :class: output

  Notice: Preparing to install into /etc/puppet/modules ...
  Notice: Downloading from https://forgeapi.puppetlabs.com ...
  Notice: Installing -- do not interrupt ...
  /etc/puppet/modules
  └─┬ wazuh-wazuh (v|WAZUH_LATEST_PUPPET|)
    ├── puppet-nodejs (v7.0.1)
    ├── puppet-selinux (v3.2.0)
    ├── puppetlabs-apt (v7.7.0)
    ├── puppetlabs-concat (v6.3.0)
    ├── puppetlabs-firewall (v2.7.0)
    ├── puppetlabs-powershell (v2.3.0)
    └── puppetlabs-stdlib (v6.5.0)


Pkgconfig
---------

.. code-block:: pkgconfig

  # IPv4 local connections:
  host    all             all             127.0.0.1/32            md5
  # IPv6 local connections:
  host    all             all             ::1/128                 md5

.. code-block:: pkgconfig

  output {
    elasticsearch {
    hosts => ["localhost:9200"]
    index => "wazuh-alerts-%{+YYYY.MM.dd}"
    document_type => "wazuh"
          #      template => "/etc/logstash/wazuh-elastic5-template.json"
          template => "/etc/logstash/wazuh-elastic2-template.json"
          template_name => "wazuh"
          template_overwrite => true
    }
  }

.. code-block:: pkgconfig

  USER_LANGUAGE="en"
  USER_NO_STOP="y"
  USER_UPDATE="y"
  
  # State file for ossec-agentd
  
  # Agent status:
  # - pending:      waiting for get connected.
  # - connected:    connection established with manager in the last 10 seconds.
  # - disconnected: connection lost or no ACK received in the last 60 seconds.
  status='connected'
  
  # Last time a keepalive was sent
  last_keepalive='2019-02-05 12:18:37'
  
  # Last time a control message was received
  last_ack='2019-02-05 12:18:37'
  
  # Number of generated events
  msg_count='12579'
  
  # Number of messages (events + control messages) sent to the manager
  msg_sent='12928'

.. code-block:: pkgconfig

  # Logcollector - Whether or not to accept remote commands from the manager
  logcollector.remote_commands=1

.. code-block:: pkgconfig

 # PermitRootLogin not allowed
 # PermitRootLogin indicates if the root user can log in via ssh.
 $sshd_file=/etc/ssh/sshd_config;

 [SSH Configuration - 1: Root can log in] [any] [1]
 f:$sshd_file -> !r:^# && r:PermitRootLogin\.+yes;
 f:$sshd_file -> r:^#\s*PermitRootLogin;

Shell
------

.. code-block:: shell

  # /var/ossec/bin/agent_control -l

  Wazuh agent_control. List of available agents:
     ID: 000, Name: wazuh-manager (server), IP: 127.0.0.1, Active/Local
     ID: 001, Name: debian-agent, IP: any, Active
     ID: 002, Name: centos7-agent, IP: any, Active

.. code-block:: shell

    wazuh_command.remote_commands=1

.. code-block:: shell

    application_id = 8b7...c14
    application_key = w22...91x
    'application_test' = 'w22...91x'
    "application_test2" = "w22...91x"



SQL
------

.. code-block:: sql

    SELECT * FROM users;

    SELECT DISTINCT processes.name, listening_ports.port, processes.pid
    FROM listening_ports JOIN processes USING (pid)
    WHERE listening_ports.address = '0.0.0.0';

    SELECT * FROM processes WHERE on_disk = 0;
    
    SELECT * FROM my_table where `name` like '%whatever%';

.. code-block:: sql

  mysql> CREATE DATABASE Alerts_DB;
  Query OK, 0 rows affected (0.00 sec)

  mysql> CREATE USER 'MySQLadmin'@'<MANAGER_IP>' IDENTIFIED BY 'secret1234';
  Query OK, 0 rows affected (0.00 sec)

  mysql> GRANT INSERT,SELECT,UPDATE,CREATE,DELETE,EXECUTE on Alerts_DB.* to 'MySQLadmin'@'<MANAGER_IP>';
  Query OK, 0 rows affected (0.00 sec)

  mysql> FLUSH PRIVILEGES;
  Query OK, 0 rows affected (0.00 sec)

  mysql> quit;

Python
------

.. code-block:: python

  import sys
  import json
  import mysql.connector
  from mysql.connector import Error

  def main():

      if len(sys.argv) < 3:
          print json.dumps({"error": 1, "message": "Too few arguments"})
          return

      try:
          conn = mysql.connector.connect(host='localhost',
                                      database='your_database',
                                      user='user',
                                      password='secret')
      except Error as e:
          print json.dumps({"error": 2, "message": str(e)})
          return

      cursor = conn.cursor()
      data = sys.argv[2]

      if sys.argv[1] == "id":
          cursor.execute("SELECT id,name,ip,`agent_key` FROM agent WHERE id = '{}'".format(data))
      elif sys.argv[1] == "ip":
          cursor.execute("SELECT id,name,ip,`agent_key` FROM agent WHERE ip = '{}'".format(data))
      else:
          print json.dumps({"error": 3, "message": "Bad arguments given"})
          return

      row = cursor.fetchone()

      if row:
          print json.dumps({"error": 0, "data": {"id" : row[0], "name": row[1], "ip": row[2], "key": row[3]}},sort_keys=False)
      else:
          print json.dumps({"error": 4, "message": "No agent key found"},sort_keys=False)


  if __name__ == '__main__':
      main()
  
.. code-block:: python

  import sys
  import json
  import mysql.connector
  from mysql.connector import Error

  def main():

      if len(sys.argv) < 3:
          print json.dumps({"error": 1, "message": "Too few arguments"})
          return

      try:
          conn = mysql.connector.connect(host='localhost',
                                      database='your_database',
                                      user='user',
                                      password='secret')
      except Error as e:
          print json.dumps({"error": 2, "message": str(e)})
          return

      cursor = conn.cursor()
      data = sys.argv[2]

      if sys.argv[1] == "id":
          cursor.execute("SELECT id,name,ip,`agent_key` FROM agent WHERE id = '{}'".format(data))
      elif sys.argv[1] == "ip":
          cursor.execute("SELECT id,name,ip,`agent_key` FROM agent WHERE ip = '{}'".format(data))
      else:
          print json.dumps({"error": 3, "message": "Bad arguments given"})
          return

      row = cursor.fetchone()

      if row:
          print json.dumps({"error": 0, "data": {"id" : row[0], "name": row[1], "ip": row[2], "key": row[3]}},sort_keys=False)
      else:
          print json.dumps({"error": 4, "message": "No agent key found"},sort_keys=False)


  if __name__ == '__main__':
      main()

Puppet
------

.. code-block:: puppet

  apt::key { 'wazuh':
      id     => '0DCFCA5547B19D2A6099506096B3EE5F29111145',
      source => 'https://packages.wazuh.com/key/GPG-KEY-WAZUH',
      server => 'pgp.mit.edu'
    }
    
  node "server.yourhost.com" {
    class { 'wazuh::manager':
      ossec_smtp_server => 'localhost',
      ossec_emailto => ['user@mycompany.com'],
    }

    wazuh::command { 'firewallblock':
      command_name       => 'firewall-drop',
      command_executable => 'firewall-drop.sh',
      command_expect     => 'srcip'
    }

    wazuh::activeresponse { 'blockWebattack':
        command_name => 'firewall-drop',
        ar_level     => 9,
        ar_agent_id  => 123,
        ar_rules_id  => [31153,31151],
        ar_repeated_offenders => '30,60,120'
    }

    wazuh::addlog { 'monitorLogFile':
      logfile => '/var/log/secure',
      logtype => 'syslog'
    }
  }

Powershell
----------

.. code-block:: powershell

  function Ignore-SelfSignedCerts {
      add-type @"
          using System.Net;
          using System.Security.Cryptography.X509Certificates;

          public class PolicyCert : ICertificatePolicy {
              public PolicyCert() {}
              public bool CheckValidationResult(
                  ServicePoint sPoint, X509Certificate cert,
                  WebRequest wRequest, int certProb) {
                  return true;
              }
          }
  "@
      [System.Net.ServicePointManager]::CertificatePolicy = new-object PolicyCert
  }


  # Configuration
  $endpoint = "/agents?select=lastKeepAlive&select=id&status=disconnected"
  $method = "get"

  $protocol = "https"
  $host_name = "API_IP"
  $port = "API_PORT"
  $username = "wazuh"
  $password = "wazuh"

  # Variables
  $base_url = $protocol + "://" + $host_name + ":" + $port
  $login_url = $base_url + "/security/user/authenticate"
  $endpoint_url = $base_url + $endpoint
  $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("{0}:{1}" -f $username, $password)))
  $headers = New-Object "System.Collections.Generic.Dictionary[[String],[String]]"
  $headers.Add("Content-Type", 'application/json')
  $headers.Add("Authorization", "Basic " + $base64AuthInfo)

  Ignore-SelfSignedCerts
  $token_response = Invoke-RestMethod -Uri $login_url -Headers $headers
  $headers["Authorization"] = "Bearer " + $token_response.data.token

  # Request
  try{
      $response = Invoke-RestMethod -Method $method -Uri $endpoint_url -Headers $headers
  }catch{
      $response = $_.Exception.Response
  }

  # WORK WITH THE RESPONSE AS YOU LIKE
  Write-Output $response.data
  
  > function Ignore-SelfSignedCerts {
      add-type @"
          using System.Net;
          using System.Security.Cryptography.X509Certificates;
          public class PolicyCert : ICertificatePolicy {
              public PolicyCert() {}
              public bool CheckValidationResult(
                  ServicePoint sPoint, X509Certificate cert,
                  WebRequest wRequest, int certProb) {
                  return true;
              }
          }
  "@
      [System.Net.ServicePointManager]::CertificatePolicy = new-object PolicyCert
      [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12;
  }

  > Ignore-SelfSignedCerts

CFG
----

.. code-block:: cfg

  relayhost = [smtp.gmail.com]:587
  smtp_sasl_auth_enable = 'yes'
  smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
  smtp_sasl_security_options = "noanonymous"
  smtp_tls_CAfile = /etc/ssl/certs/thawte_Primary_Root_CA.pem
  smtp_use_tls = 1

INI
----

.. code-block:: ini

  [default]
  aws_access_key_id="foo"
  aws_secret_access_key='bar'
  region=us-east-1
  number=4

  [dev]
  aws_access_key_id=foo2
  aws_secret_access_key=bar2
  region=us-east-1

  [prod]
  aws_access_key_id=foo3
  aws_secret_access_key=bar3
  region=us-east-1

Perl
-----

.. code-block:: perl

  use strict;
  use warnings;
  use DBI;

  my $num_args = $#ARGV + 1;

  if ($num_args < 2) {
      print "{\"error\": 1, \"message\": \"Too few arguments\"}\n";
      exit;
  }

  my $data = $ARGV[1];
  my $dbh = DBI->connect('DBI:mysql:database=your_database;host=localhost',
                      "user", "secret",
                      {'RaiseError' => 1});

  my $sql = "";

  if ($ARGV[0] eq "id") {
      $sql = "SELECT * FROM agent WHERE id = '$data'";
  } elsif ($ARGV[0] eq "ip") {
      $sql = "SELECT * FROM agent WHERE ip = '$data'";
  }

  my $sth = $dbh->prepare($sql);
  $sth->execute();
  my $rows = $sth->rows;

  if ($rows) {
      my $row = $sth->fetchrow_hashref();
      print "{\"error\": 0, \"data\": {\"id\" : \"$row->{'id'}\", \"name\": \"$row->{'name'}\", \"ip\": \"$row->{'ip'}\", \"key\": \"$row->{'agent_key'}\"}}\n";
  } else{
      print "{\"error\": 4, \"message\": \"No agent key found\"}\n";
  }

  $sth->finish();
  $dbh->disconnect();

PHP
-----

.. code-block:: php
  
  <?php
      $servername = "localhost";
      $username = "user";
      $password = "secret";
      $dbname = "your_database";

      if($argc < 3){
          echo json_encode(array('error' => 1, 'message' => 'To few arguments'));
          exit;
      }

      $conn = new mysqli($servername, $username, $password, $dbname);
      if ($conn->connect_error) {
          echo json_encode(array('error' => 2, 'message' => 'Could not connect to database'));
          exit;
      }

      $data = $argv[2];

      if($argv[1] == "id"){
          $sql = "SELECT id,name,ip,`agent_key` FROM agent WHERE id = '$data'";
      } else if ($argv[1] == "ip") {
          $sql = "SELECT id,name,ip,`agent_key` FROM agent WHERE ip = '$data'";
      } else {
          echo json_encode(array('error' => 3, 'message' => 'Bad arguments given'));
          exit;
      }

      $result = $conn->query($sql);

      if ($result->num_rows > 0) {
          $row = $result->fetch_assoc();
          echo json_encode(array('error' => 0, 'data' => array( "id" => $row["id"], "ip" => $row["ip"],"key" => $row["agent_key"],"name" => $row["name"])));
      } else {
          echo json_encode(array('error' => 4, 'message' => 'No agent key found'));
      }
      $conn->close();
  ?>

NGINX
-----

.. code-block:: nginx

  stream {
      upstream cluster {
          hash $remote_addr consistent;
          server <WAZUH-MASTER-IP>:1514;
          server <WAZUH-WORKER1-IP>:1514;
          server <WAZUH-WORKER2-IP>:1514;
      }
      upstream master {
          server <WAZUH-MASTER-IP>:1515;
      }
      server {
          listen 1514;
          proxy_pass cluster;
      }
      server {
          listen 1515;
          proxy_pass master;
      }
  } 

Default
-------

::

   <rootcheck>
      <system_audit>/var/ossec/etc/shared/audit_test.txt</system_audit>
   </rootcheck>
   
.. code-block:: 

   <rootcheck>
      <system_audit>/var/ossec/etc/shared/audit_test.txt</system_audit>
   </rootcheck>
