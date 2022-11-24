.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: In this PoC, you learn how to block malicious IP addresses from accessing web resources on a web server. Learn more about this in our documentation.

Blocking a known malicious actor
================================

In this use case, we demonstrate how to block malicious IP addresses from accessing web resources on a web server. We set up Apache web servers on Ubuntu and Windows endpoints, and then try to access them from a RHEL endpoint.

We make use of a public IP reputation database that contains the IP addresses of some malicious actors. An IP reputation database is a collection of IP addresses that have been flagged as malicious. We consider the RHEL endpoint as the malicious actor, therefore we add its IP address to the reputation database.

We configure Wazuh to block the RHEL endpoint from accessing web resources on the Apache web servers for 60 seconds. It is a way of discouraging attackers from continuing to carry out their malicious activities.

In this use case, we make use of the Wazuh :doc:`CDB list </user-manual/ruleset/cdb-list>` and :doc:`active response </getting-started/use-cases/active-response>` capabilities.

Infrastructure
--------------

+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Endpoint  | Description                                                                                                                                                                |
+===========+============================================================================================================================================================================+
| RHEL      | This is the attacker endpoint that connects to the victim's web server. We make use of the Wazuh CDB list capability to flag its IP address as malicious.                  |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Ubuntu    | Victim endpoint running an Apache 2.4.54 web server. We make use of the Wazuh active response capabilities to automatically block connections from the attacker endpoint.  |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Windows   | Victim endpoint running an Apache 2.4.54 web server. We make use of the Wazuh active response capability to block connections from the attacker endpoint.                  |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

Configuration
-------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

Take the following steps to install and configure an Apache web server on the Ubuntu endpoint.

#. Install the Apache web server:

   #. Update local packages and install the Apache web server:

      .. code-block:: console

         $ sudo apt update
         $ sudo apt install apache2

   #. Modify the firewall to allow external access to web ports. Skip this step if the firewall is disabled:

      .. code-block:: console

         $ sudo ufw status
         $ sudo ufw app list
         $ sudo ufw allow 'Apache'

   #. Check the status of the Apache service to verify that the web server is running:

      .. code-block:: console

         $ sudo systemctl status apache2

   #. Verify the installation by opening ``http://<UBUNTU_IP>`` in a browser to view the Apache landing page or use the ``curl`` command:

   .. code-block:: console

      $ curl http://<UBUNTU_IP>

#. Configure the Wazuh agent to monitor the Apache access logs by adding the following to the configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <localfile>
        <log_format>syslog</log_format>
        <location>/var/log/apache2/access.log</location>
      </localfile>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Windows endpoint
^^^^^^^^^^^^^^^^

Take the following steps to install and configure an Apache web server on the Windows endpoint.

#. Install the Apache web server:

   #. Install the latest `Visual C++ Redistributable package <https://aka.ms/vs/17/release/vc_redist.x64.exe>`__.

   #. Download the Apache web server `ZIP installation file <https://www.apachelounge.com/download/VS16/binaries/httpd-2.4.54-win64-VS16.zip>`__. This is an already compiled binary for Windows operating systems.

   #. Unzip the contents of the Apache web server zip file.

   #. Copy the extracted ``Apache24`` folder to the ``C:`` directory.

   #. Navigate to the ``C:\Apache24\bin`` folder and run the following command in a PowerShell terminal with administrator privileges:

      .. code-block:: doscon

         > C:\Apache24\bin>httpd.exe
   
   #. There will be a Windows Defender Firewall pop-up the first time the Apache binary is run. Click on Allow Access to allow the Apache HTTP server to communicate on your private or public networks depending on your network setting. This creates an inbound rule in your firewall to allow incoming traffic on port 80.

   #. Verify the installation by opening ``http://<WINDOWS_IP>`` in a browser to view the Apache landing page. Also, verify that this URL can be reached from the attacker endpoint.

#. Configure the Wazuh agent to monitor the Apache access logs by adding the following to the configuration file ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

   .. code-block:: xml

      <localfile>
        <log_format>syslog</log_format>
        <location>C:\Apache24\logs\access.log</location>
      </localfile>

#. Restart the Wazuh agent in a PowerShell terminal with administrator privileges to apply the changes:

   .. code-block:: doscon

      > Restart-Service -Name wazuh

Wazuh server
^^^^^^^^^^^^

The following steps are performed on the Wazuh server to add the IP address of the RHEL endpoint to a CDB list, and then configure rules and active response.

#. Install the ``wget`` utility in order to download the necessary artifacts using the command line interface:

   .. code-block:: console

      $ sudo yum update && yum install -y wget

#. Download the Alienvault IP reputation database:

   .. code-block:: console

      $ sudo wget https://raw.githubusercontent.com/firehol/blocklist-ipsets/master/alienvault_reputation.ipset -O /var/ossec/etc/lists/alienvault_reputation.ipset

#. Append the IP address of the attacker endpoint to the IP reputation database. Replace ``<ATTACKER_IP>`` with the RHEL IP address in the command below:

   .. code-block:: console

      $ sudo echo "<ATTACKER_IP>" >> /var/ossec/etc/lists/alienvault_reputation.ipset

#. Download a script to convert from the ``.ipset`` format to the ``.cdb`` list format:

   .. code-block:: console

      $ sudo wget https://wazuh.com/resources/iplist-to-cdblist.py -O /tmp/iplist-to-cdblist.py

#. Convert the ``alienvault_reputation.ipset`` file to a ``.cdb`` format using the previously downloaded script:

   .. code-block:: console

      $ sudo /var/ossec/framework/python/bin/python3 /tmp/iplist-to-cdblist.py /var/ossec/etc/lists/alienvault_reputation.ipset /var/ossec/etc/lists/blacklist-alienvault

#. Optional: Remove the ``alienvault_reputation.ipset`` file and the ``iplist-to-cdblist.py`` script, as they are no longer needed:

   .. code-block:: console

      $ sudo rm -rf /var/ossec/etc/lists/alienvault_reputation.ipset
      $ sudo rm -rf /tmp/iplist-to-cdblist.py

#. Assign the right permissions and ownership to the generated file:

   .. code-block:: console

      $ sudo chown wazuh:wazuh /var/ossec/etc/lists/blacklist-alienvault

#. Add a custom rule to trigger a Wazuh :doc:`active response </user-manual/capabilities/active-response/how-it-works>` script. Do this in the Wazuh server ``/var/ossec/etc/rules/local_rules.xml`` custom ruleset file:

   .. code-block:: xml

      <group name="attack,">
        <rule id="100100" level="10">
          <if_group>web|attack|attacks</if_group>
          <list field="srcip" lookup="address_match_key">etc/lists/blacklist-alienvault</list>
          <description>IP address found in AlienVault reputation database.</description>
        </rule>
      </group>

#. Edit the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file and add the ``etc/lists/blacklist-alienvault`` list to the ``<ruleset>`` section:

   .. code-block:: xml
      :emphasize-lines: 8

      <ossec_config>
        <ruleset>
          <!-- Default ruleset -->
          <decoder_dir>ruleset/decoders</decoder_dir>
          <rule_dir>ruleset/rules</rule_dir>
          <rule_exclude>0215-policy_rules.xml</rule_exclude>
          <list>etc/lists/audit-keys</list>
          <list>etc/lists/blacklist-alienvault</list>
 
          <!-- User-defined ruleset -->
          <decoder_dir>etc/decoders</decoder_dir>
          <rule_dir>etc/rules</rule_dir>
        </ruleset>

      </ossec_config>

#. There are two active response blocks below depending on the configured endpoint. Add the respective active response block to the Wazuh server ``/var/ossec/etc/ossec.conf`` file:

   **For the Ubuntu endpoint**

   The ``firewall-drop`` command integrates with the Ubuntu local iptables firewall and drops incoming network connection from the attacker endpoint for 60 seconds:

      .. code-block:: xml
         :emphasize-lines: 3

         <ossec_config>
           <active-response>
             <command>firewall-drop</command>
             <location>local</location>
             <rules_id>100100</rules_id>
             <timeout>60</timeout>
           </active-response>
         </ossec_config>

   **For the Windows endpoint**

   The ``netsh`` command is used to block the attacker IP address on the Windows endpoint. The active response script is set to run for 60 seconds:

      .. code-block:: xml
         :emphasize-lines: 3

         <ossec_config>
           <active-response>
             <command>netsh</command>
             <location>local</location>
             <rules_id>100100</rules_id>
             <timeout>60</timeout>
           </active-response>
         </ossec_config>

#. Restart the Wazuh server to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Attack Emulation
----------------

#. Access any of the web servers from the RHEL endpoint using the corresponding IP address. Replace ``<WEBSERVER_IP>`` with the appropriate value and execute the following command from the attacker endpoint:

   .. code-block:: console

      $ curl http://<WEBSERVER_IP>

The attacker endpoint will be able to connect to the victim web servers the first time. After the first connection, the Wazuh active response temporarily blocks any successive connection to the web servers for 60 seconds.

Visualize the alerts
--------------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the Security events module and add the filters in the search bar to query the alerts.

-  Ubuntu - ``rule.id:(651 OR 100100)``

   .. thumbnail:: /images/poc/block-malicious-actor-ubuntu-alerts.png
         :title: Visualize block malicious actor Ubuntu alerts 
         :align: center
         :width: 80%

-  Windows - ``rule.id:(657 OR 100100)``

   .. thumbnail:: /images/poc/block-malicious-actor-windows-alerts.png
         :title: Visualize block malicious actor Windows alerts 
         :align: center
         :width: 80%
