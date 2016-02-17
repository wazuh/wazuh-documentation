.. _ossec_elk_upgrade:

Upgrading from the previous version
===================================

After finally finishing your ELK stack installation, you might also want to upgrade it to a higher version from time to time. Either just because you want to take advantage of new features or for safety reasons/bug fixes. We have summarized the following steps what is necessary in order to upgrade your ELK stack environment.

Backing up
----------

Make sure you back up the following files, so that you won't lose your valuable config files. Make backups of the current Logstash, Elasticsearch and Kibana configuration files.
Here's a list of most important files:

1. the Logstash-Server config is located in /etc/logstash/conf.d/01-ossec.conf
2. *most importantly*: backup the certificate and the key!
3. the certificate is located in /etc/logstash/logstash-forwarder.crt (if you're running an older version the location could be /etc/pki/tls/certs/logstash-forwarder.crt)
4. the key is located in /etc/logstash/logstash-forwarder.key (if you're running an older version the location could be /etc/pki/tls/private/logstash-forwarder.key)
5. backup the elasticsearch template for logstash. /etc/logstash/elastic-ossec-template.json

Updating Logstash
^^^^^^^^^^^^^^^^^

The following steps describe how to update the Logstash server:

1. Update the Yum Repo with the latest logstash version. Current version recommended by WAZUH is Logstash 2.1
2. run “yum update logstash”
3. Clone the latest stable version of the WAZUH ossec repository from https://github.com/wazuh/ossec-wazuh into the home directory
4. Copy the new 01-ossec.conf (Logstash Config File) into /etc/logstash/conf.d/ from the cloned git repository.
5. Copy the backed up Key & Certificate into /etc/logstash
6. Copy the new Elasticsearch template for Logstash into /etc/logstash/ from the cloned git repository.
7. Start the Logstash service & verify that the logstash process is running and check the logstash log /var/log/logstash/logstash.log

Updating Elastisearch
^^^^^^^^^^^^^^^^^^^^^

The following steps seem a bit tricky at first, please pay attention to the backup steps, especially when backing up the Elasticsearch Index.

1. Backup the elasticsearch config yaml files: elastisearch.yml and logging.yml
2. relevant lines in the elasticsearch.yml are:
   cluster.name: ossec
   node.name: ossec_node1
3. **Important: Backup the Elasticsearch Index** everything in /var/lib/elasticsearch/ossec/*
4. stop the Elasticsearch service
5. Update the Yum Repo with the latest Elasticsearch version. Current version recommended by WAZUH is Elasticsearch
6. run “yum update elasticsearch”
7. Replace the elasticsearch.yml file with the new. Check if the relevant lines from above are still there (cluster.name and node.name)
8. Verify that Elasticsearch is running by issuing in your terminal:
   curl -XGET localhost:9200
   curl -XGET 'http://localhost:9200/_cluster/health?pretty=true'

finally run: ~/ossec-wazuh/extensions/elasticsearch/ && curl -XPUT “http://localhost:9200/_template/ossec/” -d “@elastic-ossec-template.json”
   curl -XGET http://localhost:9200/_template/ossec?pretty

if all of those commands return without any error, everything went well!

9. Start the Elasticsearch service & verify if the elasticsearch process is running and check the elasticsearch log /var/log/elasticsearch/ (run systemctl daemon-reload if necessary!)


Updating Kibana
^^^^^^^^^^^^^^^

Almost there... the final steps just quickly describe how you upgrade Kibana to the latest version. Basically you just download it, extract the tarball, start the Kibana service and make sure that you do a *fresh* import of the Kibana dashboards.

1. Rename the old directory /opt/kibana to /opt/kibana_old (in case something goes terribly wrong)
2. Download the latest Kibana version to your home directory (e.g. ossec_tmp)

latest recommended version by WAZUH is Kibana 4.3.1 ::

 $ sudo wget https://download.elastic.co/kibana/kibana/kibana-4.3.1-linux-x64.tar.gz
 $ sudo tar xvf kibana-4.3.1-linux-x64.tar.gz && sudo mkdir -p /opt/kibana && sudo cp -R kibana-4*/ /opt/kibana/

3. Check if the Kibana Systemd service is fully operational: /etc/systemd/system/kibana4.service
4. Kibana Config file is located in:
  
  	/opt/kibana/config/kibana.yml (leave this as is!!)

5. Start the Kibana service & verify if the process is running. Check the Kibana Log:: 

 	$ less /var/log/nginx/kibana.access.log

6. Open Kibana in the Browser
7. Go to Settings/Objects and delete all Dashboards, Searches and Visualizations
8. Download the kibana-ossecwazuh-dashboards.json to your workstation and import it through the Kibana Web-Interface
9. Verify that the Elasticsearch Indices is working correctly! 


.. note:: Last but not least it also wouldn't hurt to update the latest OS packages by running “yum update” or “apt-get update && apt-get upgrade”. 


What's next
-----------

Now you have finished your ELK cluster installation and we recommend you to go to your OSSEC Wazuh manager and install OSSEC Wazuh RESTful API and OSSEC Wazuh Ruleset modules:

* :ref:`OSSEC Wazuh RESTful API <ossec_api>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
