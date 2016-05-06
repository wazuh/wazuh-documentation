.. _wazuh_modules_virustotal:

VirusTotal
==========================

(adapt to wodles...)

Introduction
--------------

VirusTotal module for Wazuh consists in a Python script that integrates OSSEC with Virustotal, the main goal is to consult all hashes obtained by Syscheck daemon against the Virustotal global database, a free service that analyzes files from malwares.

Check if any new or changed file was infected with Malware or Virus in order to avoid unexpected system downtime, technical difficulties, or other interruptions.

Requisites
--------------

You need to get an API key to use the VirusTotal Public API 2.0. To do so, just sign-up on the service, go to your profile and click on API Key.

.. note:: Virustotal Public Key is limited to at most 4 requests per minute.

You also need to have installed manager `Wazuh HIDS. <https://github.com/wazuh/ossec-wazuh>`_

And finally you need at least up Python 2.7 in order to execute VirusTotal module.


Install
--------------

Clone the repository: ::

 $ cd ~
 $ git clone http://github.com/wazuh/wazuh-virustotal
 
Copy the following files into ``/var/ossec/modules/virustotal`` folder in your machine: ::

 $ sudo mkdir -p /var/ossec/modules/virustotal
 $ sudo cp -pr wazuh-virustotal/wazuh_modules_virustotal.py /var/ossec/modules/virustotal
 $ sudo cp -pr wazuh-virustotal/config.py /var/ossec/modules/virustotal
 
Copy rules/decoders into the right OSSEC folder: ::

 $ sudo cp wazuh-virustotal/decoders_rules/virustotal_rules.xml /var/ossec/rules/
 $ sudo cp wazuh-virustotal/decoders_rules/virustotal_decoders.xml /var/ossec/etc/wazuh_decoders/

Update your ossec.conf file in ``/var/ossec/etc/ossec.conf``, include new rules file inside <rules></rules> section : ::

  <include>virustotal_rules.xml</include>

And add Virustotal log file as localfile to monitor: ::


  <localfile>
    <log_format>syslog</log_format>
    <location>/var/ossec/modules/virustotal/virustotal_log</location>
  </localfile>

Restart OSSEC Manager to apply changes ::

 $ sudo /var/ossec/bin/ossec-control restart

Configuration
--------------
You will need to configure some parameters into configuration file config.py.

Replace your API KEY:  :: 

 personal_API_Key = "your_key"

Then, if you wish, you can configure others parameters: ::

 log_file: Log module file (Absolute or relative path)
 db_file: Agents module data base (Absolute or relative path)
 sleep_time: Time (in seconds) between scans in syscheck folder


Running
--------------
To run VirusTotal for OSSEC you just need to execute the file wazuh_modules_virustotal.py with Python ::

 $ python wazuh_modules_virustotal.py

Run the module in background: ::

 $ python wazuh_modules_virustotal.py &> /dev/null

Alerts
--------------

By default it is included a certain range of rules and decoders, we encourage you to develop your own rules and decoders and configure the existing ones according to your needs. ::

Some pre-built rules:

=======  =====  =========================================================
  ID     Level  Description
=======  =====  =========================================================
113423   0      VirusTotal module has finished to scan Syscheck databases 
113431   4      Very low risk file 
113433   6      Medium risk file 
113400   7      High risk file
113435   11     High risk file - EXE
=======  =====  =========================================================
             

What's next
-----------

Once you have VirusTotal module installed, we encourage you to move forward and try out other modules, check them on:


* :ref:`ELK Stack integration guide <ossec_elk>`
* :ref:`OSSEC Wazuh RESTful API installation Guide <ossec_api>`
* :ref:`OSSEC Wazuh ruleset <ossec_ruleset>`

