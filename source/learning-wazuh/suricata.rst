.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Suricata integrates with Wazuh. Learn more about how to set up Suricata and how Wazuh decodes Suricata events in this section of the documentation.
  
.. _learning_wazuh_suricata:

Catch suspicious network traffic
================================

Suricata a NIDS solution, which is open source and can be quickly deployed either on dedicated hardware for
monitoring one or more transit points on your network, or directly on existing Unix-like hosts to monitor just their own network
traffic.  Because Suricata is capable of generating JSON logs of NIDS events, it can be easily integrated with Wazuh.

In this lab, we will deploy Suricata on the Linux agent such that Wazuh picks up the Suricata NIDS events
so they can be seen in the Wazuh dashboard.  We will make use of Wazuh centralized configuration feature to push out the extra Suricata-related Wazuh configuration to the agent. Lastly, we will do a little GeoIP enrichment of the Suricata NIDS events, showing
how easily we can augment existing log records with additional context information to make them more valuable.


Set up Suricata on your Linux agent
-----------------------------------

#. On your Linux agent, install Suricata and its dependencies, along with the Emerging Threats Open ruleset.

   .. code-block:: console
   
       # cd /root
       # yum -y install epel-release wget jq
       # curl -O https://copr.fedorainfracloud.org/coprs/jasonish/suricata-6.0/repo/epel-7/jasonish-suricata-6.0-epel-7.repo
       # yum -y install suricata
       # wget https://rules.emergingthreats.net/open/suricata-6.0.3/emerging.rules.tar.gz
       # tar zxvf emerging.rules.tar.gz
       # rm /etc/suricata/rules/* -f
       # mv rules/*.rules /etc/suricata/rules/
       # rm -f /etc/suricata/suricata.yaml
       # wget -O /etc/suricata/suricata.yaml http://www.branchnetconsulting.com/wazuh/suricata.yaml
       # systemctl daemon-reload
       # systemctl enable suricata
       # systemctl start suricata


Trigger NIDS alerts on your Linux agent
---------------------------------------

#. Generate a specific web request known to trip NIDS rules:

    .. code-block:: console

        # curl -sSL https://raw.githubusercontent.com/3CORESec/testmynids.org/master/tmNIDS -o /tmp/tmNIDS && chmod +x /tmp/tmNIDS && /tmp/tmNIDS -1

#. On the agent, look at the latest alert in both the standard Suricata alert log and also in the JSON alert log.

    .. code-block:: console

        # tail -n1 /var/log/suricata/fast.log
        # tail -n1 /var/log/suricata/eve.json | jq .

#. Observe that the standard log is fairly simple with limited information.

    .. code-block:: none
        :class: output

        06/20/2022-09:11:17.443744  [**] [1:2100498:7] GPL ATTACK_RESPONSE id check returned root [**] [Classification: Potentially Bad Traffic] [Priority: 2] {TCP} 108.157.96.34:80 -> 172.30.0.30:38958

#. See how much more data is provided in the JSON output, and how field names are provided.

   .. code-block:: json
      :class: output

      {
        "timestamp": "2022-06-20T09:11:17.443744+0000",
        "flow_id": 2243159307670730,
        "in_iface": "eth0",
        "event_type": "alert",
        "src_ip": "108.157.96.34",
        "src_port": 80,
        "dest_ip": "172.30.0.30",
        "dest_port": 38958,
        "proto": "TCP",
        "alert": {
          "action": "allowed",
          "gid": 1,
          "signature_id": 2100498,
          "rev": 7,
          "signature": "GPL ATTACK_RESPONSE id check returned root",
          "category": "Potentially Bad Traffic",
          "severity": 2,
          "metadata": {
            "updated_at": [
              "2010_09_23"
            ],
            "created_at": [
              "2010_09_23"
            ]
          }
        },
        "http": {
          "hostname": "testmynids.org",
          "url": "/uid/index.html",
          "http_user_agent": "curl/7.29.0",
          "http_content_type": "text/html",
          "http_method": "GET",
          "protocol": "HTTP/1.1",
          "status": 200,
          "length": 39
        },
        "app_proto": "http",
        "flow": {
          "pkts_toserver": 5,
          "pkts_toclient": 4,
          "bytes_toserver": 382,
          "bytes_toclient": 772,
          "start": "2022-06-20T09:11:17.349386+0000"
        }
      }


   Not only do we get the basic NIDS alert details, but Suricata also includes http metadata and flow details that can be very helpful for alert assessment.

#. You might also be interested to see the actual NIDS rule, found in ``/etc/suricata/rules/emerging-attack_response.rules``, that we triggered:

   .. code-block:: none

      alert ip any any -> any any (msg:"GPL ATTACK_RESPONSE id check returned root"; content:"uid=0|28|root|29|"; classtype:bad-unknown; sid:2100498; rev:7; metadata:created_at 2010_09_23, updated_at 2010_09_23;)


Get the Suricata JSON data to Wazuh
-----------------------------------

Suricata is configured to write alerts to ``/var/log/suricata/eve.json`` which Wazuh does not monitor by default.  Your
Linux agent need an additional ``<localfile>`` config section like this:

.. code-block:: xml

        <localfile>
            <log_format>json</log_format>
            <location>/var/log/suricata/eve.json</location>
        </localfile>

Instead of adding the above directly to ``ossec.conf`` on the Linux agent, this time let's use the Wazuh manager centralized agent
configuration facility.  This is a powerful feature that makes it feasible to manage the varied configurations of a diverse fleet of systems running Wazuh agents. To learn more, see the :doc:`centralized configuration </user-manual/reference/centralized-configuration>` documentation.  In short, groups of agents share common configuration content served up to them by the Wazuh manager.  Agents automatically pick up and apply changes made to this content on the manager, and merge the shared configuration with their local configuration.

#. On your Wazuh manager, add your Linux agent to a new group called "Suricata". 

   - Create an agent group called "Suricata". 
   
      .. code-block:: console

         # /var/ossec/bin/agent_groups -a -g Suricata -q

      .. code-block:: none
         :class: output

         Group 'Suricata' created.


   - List the registered agents on the Wazuh manager with the ``manage_agents -l`` command.  Note the ID number of the Linux agent.

      .. code-block:: console

         # /var/ossec/bin/manage_agents -l

      .. code-block:: none
         :class: output

         Available agents: 
         ID: 001, Name: linux-agent, IP: any
         ID: 002, Name: windows-agent, IP: any

   - Add the Linux agent to this new agent group by its ID number:

      .. code-block:: console

         # /var/ossec/bin/agent_groups -a -i 001 -g Suricata -q

      .. code-block:: none
         :class: output

         Group 'Suricata' added to agent '001'


#. Put our Suricata-specific Wazuh agent config into the shared ``agent.conf`` file belonging to the "Suricata" agent group.  On the Wazuh manager, edit the ``/var/ossec/etc/shared/Suricata/agent.conf`` and add the following configuration:

    .. code-block:: xml

        <agent_config>
            <localfile>
                <log_format>json</log_format>
                <location>/var/log/suricata/eve.json</location>
            </localfile>
        </agent_config>

#. Confirm this shared config is valid by running ``verify-agent-conf`` on the Wazuh manager. 

   .. code-block:: console

      # /var/ossec/bin/verify-agent-conf

   .. code-block:: none
      :class: output

      verify-agent-conf: Verifying [etc/shared/default/agent.conf]
      verify-agent-conf: OK

      verify-agent-conf: Verifying [etc/shared/Suricata/agent.conf]
      verify-agent-conf: OK


   Each agent should pull down and apply this additional configuration almost immediately. You can find the fetched configuration on each agent at ``/var/ossec/etc/shared/agent.conf``.

See Suricata NIDS events in the Wazuh dashboard
-----------------------------------------------

#. On your Linux agent, rerun the NIDS-tripping command again: ``/tmp/tmNIDS -1``

#. Search the Wazuh dashboard for ``rule.id:86601``.  That is the rule that notices Suricata alerts.  Pick these fields for readability:

    - agent.name
    - data.alert.signature
    - data.proto
    - data.src_ip
    - data.dest_ip
    - data.dest_port
    - data.http.hostname

#. Expand one of the events and look over the vast amount of information available.


Observe how Wazuh decodes Suricata events
-----------------------------------------

#. Find the full log of the event you just triggered. You can do so like this:

   .. code-block:: console

      # tail -n1 /var/log/suricata/eve.json

   .. code-block:: json
      :class: output

      {"timestamp":"2022-06-20T10:12:02.432740+0000","flow_id":957340827435540,"in_iface":"eth0","event_type":"alert","src_ip":"108.157.96.13","src_port":80,"dest_ip":"172.30.0.30","dest_port":60124,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2100498,"rev":7,"signature":"GPL ATTACK_RESPONSE id check returned root","category":"Potentially Bad Traffic","severity":2,"metadata":{"updated_at":["2010_09_23"],"created_at":["2010_09_23"]}},"http":{"hostname":"testmynids.org","url":"\/uid\/index.html","http_user_agent":"curl\/7.29.0","http_content_type":"text\/html","http_method":"GET","protocol":"HTTP\/1.1","status":200,"length":39},"app_proto":"http","flow":{"pkts_toserver":5,"pkts_toclient":4,"bytes_toserver":382,"bytes_toclient":772,"start":"2022-06-20T10:12:02.377364+0000"}}

#. Run ``/var/ossec/bin/wazuh-logtest`` on your Wazuh manager and paste in the Suricata alert record, observing how it is analyzed:

   .. code-block:: none

      Type one log per line
      
      {"timestamp":"2022-06-20T10:12:02.432740+0000","flow_id":957340827435540,"in_iface":"eth0","event_type":"alert","src_ip":"108.157.96.13","src_port":80,"dest_ip":"172.30.0.30","dest_port":60124,"proto":"TCP","alert":{"action":"allowed","gid":1,"signature_id":2100498,"rev":7,"signature":"GPL ATTACK_RESPONSE id check returned root","category":"Potentially Bad Traffic","severity":2,"metadata":{"updated_at":["2010_09_23"],"created_at":["2010_09_23"]}},"http":{"hostname":"testmynids.org","url":"\/uid\/index.html","http_user_agent":"curl\/7.29.0","http_content_type":"text\/html","http_method":"GET","protocol":"HTTP\/1.1","status":200,"length":39},"app_proto":"http","flow":{"pkts_toserver":5,"pkts_toclient":4,"bytes_toserver":382,"bytes_toclient":772,"start":"2022-06-20T10:12:02.377364+0000"}}
      
      **Phase 1: Completed pre-decoding.
      
      **Phase 2: Completed decoding.
      	name: 'json'
      	alert.action: 'allowed'
      	alert.category: 'Potentially Bad Traffic'
      	alert.gid: '1'
      	alert.metadata.created_at: '['2010_09_23']'
      	alert.metadata.updated_at: '['2010_09_23']'
      	alert.rev: '7'
      	alert.severity: '2'
      	alert.signature: 'GPL ATTACK_RESPONSE id check returned root'
      	alert.signature_id: '2100498'
      	app_proto: 'http'
      	dest_ip: '172.30.0.30'
      	dest_port: '60124'
      	event_type: 'alert'
      	flow.bytes_toclient: '772'
      	flow.bytes_toserver: '382'
      	flow.pkts_toclient: '4'
      	flow.pkts_toserver: '5'
      	flow.start: '2022-06-20T10:12:02.377364+0000'
      	flow_id: '957340827435540.000000'
      	http.hostname: 'testmynids.org'
      	http.http_content_type: 'text/html'
      	http.http_method: 'GET'
      	http.http_user_agent: 'curl/7.29.0'
      	http.length: '39'
      	http.protocol: 'HTTP/1.1'
      	http.status: '200'
      	http.url: '/uid/index.html'
      	in_iface: 'eth0'
      	proto: 'TCP'
      	src_ip: '108.157.96.13'
      	src_port: '80'
      	timestamp: '2022-06-20T10:12:02.432740+0000'
      
      **Phase 3: Completed filtering (rules).
      	id: '86601'
      	level: '3'
      	description: 'Suricata: Alert - GPL ATTACK_RESPONSE id check returned root'
      	groups: '['ids', 'suricata']'
      	firedtimes: '1'
      	mail: 'False'
      **Alert to be generated.
      
Notice the decoder used is just called "json".  This decoder is used whenever Wazuh detects JSON records.  With Wazuh ability to natively decode incoming JSON log records, you do not have to build your own decoders for applications that support JSON logging.


Spice things up with a little GeoIP
-----------------------------------

You may have noticed that there were no Geolocation fields in the Wazuh dashboard records for Suricata events.  In Wazuh default configuration, Geolocation is only performed on fields ``data.srcip``, ``data.win.eventdata.ipAddress`` and ``data.aws.sourceIPAddress`` , while with Suricata events we would need to act on fields
``data.src_ip`` and ``data.dest_ip``.  We are going to change our configuration to show more information from ``data.src_ip``:

#. On the Wazuh manager, edit ``/usr/share/filebeat/module/wazuh/alerts/ingest/pipeline.json`` adding the new IP address field inside ``processors``, along the other Geolocation fields:

    .. code-block:: json

        {
           "geoip": {
             "field": "data.src_ip",
             "target_field": "GeoLocation",
             "properties": ["city_name", "country_name", "region_name", "location"],
             "ignore_missing": true,
             "ignore_failure": true
           }
         }


#. Load the ingest pipelines:

   .. code-block:: none

      # filebeat setup --pipelines


#. On your Linux agent, trigger some more NIDS events:

    .. code-block:: console

        # /tmp/tmNIDS -1

#. Look through the new Suricata events in the Wazuh dashboard, observing they now have source geoip fields populated.  Private IP addresses of course cannot be geolocated.

.. thumbnail:: ../images/learning-wazuh/labs/suricata-geoip.png
    :title: Suricata alert enriched with GeoIP information
    :align: center
    :width: 80%


If you have time, you could also...
-----------------------------------

#. Build a CDB list of the the signature_id values of Suricata rules that call for immediate attention.  Maybe these would be special NIDS events you would want to get SMS alerted about in real time.  Create a custom child rule to 86601 that looks for matches in your CDB and has a high severity level like 12.

#. Build another CDB list of signature_id values of rules you choose to classify as "noise" and want to suppress entirely.  Then make another child rule with a severity level of 0.

#. Experiment with making Suricata-specific visualization in the Wazuh dashboard.  Create a new dashboard to pull them all together.
