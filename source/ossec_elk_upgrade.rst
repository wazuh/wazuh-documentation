.. _ossec_elk_upgrade:

Upgrading from the previous version
===================================

After finally finishing your ELK stack installation, you might also want to upgrade it to a higher version from time to time. Either just because you want to take advantage of new features or for safety reasons/bug fixes. We have summarized the following steps what is necessary in order to upgrade your ELK stack environment.

Backing up
^^^^^^^^^^

Make sure you back up the following files, so that you won't lose your valuable config files. Make backups of the current Logstash, Elasticsearch and Kibana configuration files.
Here's a list of most important files:

1. The Logstash-Server config is located in /etc/logstash/conf.d/01-ossec.conf
2. **Most importantly**: backup the certificate and the key, this PATH files are referenced in the line 5 and 6 from the file /etc/logstash/conf.d/01-ossec.conf.

::

  "ssl_certificate => "/etc/logstash/logstash-forwarder.crt"
  "ssl_key => "/etc/logstash/logstash-forwarder.key"

3. Backup the elasticsearch template for logstash. ``/etc/logstash/elastic-ossec-template.json``
4. Backup the elasticsearch config yaml file: ``elastisearch.yml``
5. **Important: Backup the Elasticsearch Index** everything in /var/lib/elasticsearch/ossec/*
6. Rename the old directory /opt/kibana to /opt/kibana_old (in case something goes terribly wrong)

Updating Logstash
^^^^^^^^^^^^^^^^^

The following steps describe how to update the Logstash server:

1. Update the Yum Repo with the latest logstash version. Current version recommended by WAZUH is Logstash 2.1

**On Debian**, delete the previous version from the repository to the **/etc/apt/sources.list** and add the new version::

  $ sed '/logstash/d' /etc/apt/sources.list
  $ wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -
  $ echo "deb http://packages.elasticsearch.org/logstash/2.1/debian stable main" | sudo tee -a /etc/apt/sources.list

**On CentOS**, delete the previous version from the repository ``/etc/yum.repos.d/logstash.repo`` ::

  $ rm /etc/yum.repos.d/logstash.repo
  $ sudo tee /etc/yum.repos.d/logstash.repo <<-'EOF'
    [logstash-2.1]
    name=Logstash repository for 2.1.x packages
    baseurl=http://packages.elastic.co/logstash/2.1/centos
    gpgcheck=1
    gpgkey=http://packages.elastic.co/GPG-KEY-elasticsearch
    enabled=1
   EOF
  $

2. Run the repository update.

**On Debian**::

  $ sudo apt-get udpate && apt-get upgrade

**On CentOS**::

  $ sudo yum makecache && yum upgrade

3. Clone the latest stable version of the WAZUH ossec repository from https://github.com/wazuh/wazuh into the home directory.

::

  $ cd ~
  $ mkdir ossec_tmp && cd ossec_tmp
  $ git clone -b stable https://github.com/wazuh/wazuh.git

4. Copy the new 01-ossec.conf (Logstash Config File) into /etc/logstash/conf.d/ from the cloned git repository.

::

  $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/logstash/01-ossec.conf  /etc/logstash/conf.d/

5. Copy the backed up Key & Certificate into /etc/logstash
6. Copy the new Elasticsearch template for Logstash into /etc/logstash/ from the cloned git repository.

::

  $ sudo cp ~/ossec_tmp/ossec-wazuh/extensions/elasticsearch/elastic-ossec-template.json  /etc/logstash/

7. Start the Logstash service & verify that the logstash process is running and check the logstash log /var/log/logstash/logstash.log

Updating Elasticsearch
^^^^^^^^^^^^^^^^^^^^^^

The following steps seem a bit tricky at first, please pay attention to the backup steps, especially when backing up the Elasticsearch Index.

1. Stop the Elasticsearch service

::

  $ sudo service elasticsearch stop

2. Update the Yum Repo with the latest Elasticsearch version. Current version recommended by WAZUH is Elasticsearch

**On Debian**, delete the previous version from the repository to the **/etc/apt/sources.list** and add the new version::

  $ sed '/elasticsearch/d' /etc/apt/sources.list
  $ wget -qO - https://packages.elasticsearch.org/GPG-KEY-elasticsearch | sudo apt-key add -
  $ echo "deb http://packages.elastic.co/elasticsearch/2.x/debian stable main" | sudo tee -a /etc/apt/sources.list.d/elasticsearch-2.x.list

**On CentOS**, delete the previous version from the repository ``/etc/yum.repos.d/logstash.repo`` ::

  $ rm /etc/yum.repos.d/elasticsearch.repo
  $ sudo tee /etc/yum.repos.d/elasticsearch.repo <<-'EOF'
   [elasticsearch-2.x]
   name=Elasticsearch repository for 2.x packages
   baseurl=http://packages.elastic.co/elasticsearch/2.x/centos
   gpgcheck=1
   gpgkey=http://packages.elastic.co/GPG-KEY-elasticsearch
   enabled=1
   EOF
  $


3. Run the repository update

**On Debian**::

  $ sudo apt-get udpate && apt-get upgrade

**On CentOS**::

  $ sudo yum makecache && yum upgrade

4. Replace the elasticsearch.yml file with the new. Check the relevant lines from the elasticsearch.yml saved.

5. Verify that Elasticsearch is running by issuing in your terminal:

::

  $ curl -XGET localhost:9200

Expected result::

  {
    "name": "node1",
    "cluster_name": "ossec",
    "version": {
      "number": "2.1.1",
      "build_hash": "40e2c53a6b6c2972b3d13846e450e66f4375bd71",
      "build_timestamp": "2015-12-15T13:05:55Z",
      "build_snapshot": false,
      "lucene_version": "5.3.1"
    },
    "tagline": "You Know, for Search"
  }

Elasticsearch cluster health status::

  $ curl -XGET 'http://localhost:9200/_cluster/health?pretty=true'

Expected result::

  {
    "cluster_name": "ossec",
    "status": "green",
    "timed_out": false,
    "number_of_nodes": 2,
    "number_of_data_nodes": 2,
    "active_primary_shards": 281,
    "active_shards": 562,
    "relocating_shards": 0,
    "initializing_shards": 0,
    "unassigned_shards": 0,
    "delayed_unassigned_shards": 0,
    "number_of_pending_tasks": 0,
    "number_of_in_flight_fetch": 0,
    "task_max_waiting_in_queue_millis": 0,
    "active_shards_percent_as_number": 100
  }

It's time to integrate the OSSEC Wazuh custom mapping::

  $ cd ~/ossec_tmp/ossec-wazuh/extensions/elasticsearch/ && curl -XPUT "http://localhost:9200/_template/ossec/" -d "@elastic-ossec-template.json"
  $ curl -XGET http://localhost:9200/_template/ossec?pretty

If everything was okay, the API response should be::

  {"acknowledged":true}

if all of those commands return without any error, everything went well!

6. Start the Elasticsearch service & verify if the elasticsearch process is running and check the elasticsearch log /var/log/elasticsearch/ (run systemctl daemon-reload if necessary!)


Updating Kibana
^^^^^^^^^^^^^^^

Almost there... the final steps just quickly describe how you upgrade Kibana to the latest version. Basically you just download it, extract the tarball, start the Kibana service and make sure that you do a *fresh* import of the Kibana dashboards.

1. Rename the old directory /opt/kibana to /opt/kibana_old (in case something goes terribly wrong)
2. Download the latest Kibana version to your home directory (e.g. ossec_tmp)

latest recommended version by WAZUH is Kibana 4.3.1 ::

 $ sudo wget https://download.elastic.co/kibana/kibana/kibana-4.3.1-linux-x64.tar.gz
 $ sudo tar xvf kibana-4.3.1-linux-x64.tar.gz && sudo mkdir -p /opt/kibana && sudo cp -R kibana-4*/ /opt/kibana/

3. Kibana Config file is located in:

::

  $ /opt/kibana/config/kibana.yml

Copy the same configuration from you old kibana.yml to this new kibana.yml.

4. Start the Kibana service & verify if the process is running. Check the Kibana Log.

::

  $ less /var/log/nginx/kibana.access.log

5. To dd the new index to Kibana, access your Kibana interfac, go to ``Settings`` and ``Indices``, set it up following these steps.

::

  - Check "Index contains time-based events".
  - Insert Index name or pattern: ossec-*
  - On "Time-field name" list select @timestamp option.
  - Click on "Create" button.
  - You should see the fields list with about ~72 fields.
  - Go to "Discover" tap on top bar buttons.

.. note:: Kibana will search Elasticsearch index name pattern ``ossec-yyyy.mm.dd``. You need to have at least an OSSEC alert before you set up the index pattern on Kibana. Otherwise it won't find any index on Elasticsearch. If you want to generate one, for example you could try a ``sudo -s`` and miss the password on purpose several times.

6. Download the kibana-ossecwazuh-dashboards.json to your workstation and import it through the Kibana Web-Interface
7. Verify that the Elasticsearch Indices is working correctly!


.. note:: Last but not least it also wouldn't hurt to update the latest OS packages by running "yum update" or "apt-get update && apt-get upgrade".


What's next
^^^^^^^^^^^

Now you have finished your ELK cluster installation and we recommend you to go to your OSSEC Wazuh manager and install OSSEC Wazuh RESTful API and OSSEC Wazuh Ruleset modules:

* :ref:`OSSEC Wazuh RESTful API <ossec_api>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
