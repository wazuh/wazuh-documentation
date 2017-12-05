Integration
===========

#. `How it works`_
#. `Use case: scanning a file with the VirusTotal integration`_

How it works
-------------

The VirusTotal integration bases its operation on an API provided by VirusTotal, this allows to detect malicious content in files monitored by **syscheck** following the flow below.

1. FIM allows to detect any addition, change or deletion of files in folders monitored by the **syscheck** module. This module works storing the hash of these files and triggering alerts when any change has been made.

2. When the VirusTotal integration is enabled, it is triggered when any FIM alert appears. From this alert, the module extracts the hash field of the file related to the alert.

3. After that, the module make a HTTP POST request to the VirusTotal database using the API. In that request, the extracted hash is searched for a match in VirusTotal.

4. A JSON response is received with the search result and the possible alerts triggered by that search are the following.

- Error: Public API request rate limit reached.
- Error: Check credentials.
- Alert: No records in VirusTotal database.
- Alert: No positives found.
- Alert: X engines detected this file.

These alerts are logged in the ``integration.log`` file and they are also stored in the ``alerts.log`` file with all other alerts.
In the `VirusTotal integration alerts`_ section is shown some examples of these alerts.


Use case: scanning a file with the VirusTotal integration
----------------------------------------------------------

In this section we can see the flow described above in a practical way.

Getting started
^^^^^^^^^^^^^^^^

- At first, we should configure the VirusTotal integration, as it is explained in the :doc:`Local configuration section <../../reference/ossec-conf/integration>`.

For doing this, we have to include in the ``ossec.conf`` file a section like that.

.. code-block:: xml

    <integration>
      <name>virustotal</name>
      <api_key>4548f9e04e6e5f83cf00746f9680805ca1cb3cff542da54297fb14fceceb4f04</api_key>   <!-- Replace with your key -->
      <group>syscheck</group>
    </integration>

- The second step is to enable the integrator daemon and restart Wazuh.

.. code-block:: console

    # /var/ossec/bin/ossec-control enable integrator
    # /var/ossec/bin/ossec-control restart

From this moment, any FIM alert will trigger the VirusTotal integration.

Using FIM to monitor a directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For this Probe of Concept, we will monitor the folder ``/media/user/software`` in an agent.

In the ``<syscheck>`` section of the configuration file we have to include a line like the following one.

.. code-block:: xml

  <syscheck>
  ...
    <directories check_all="yes" realtime="yes">/media/user/software</directories>
  ...
  </syscheck>

After restarting the syscheck module, the configuration is applied and the specified folder will be monitored in real-time.

The alert below appears when a file is added to the monitored directory.

.. code-block:: console
   :emphasize-lines: 4,10,11

   ** Alert 1510684983.55139: - ossec,syscheck,pci_dss_11.5,gpg13_4.11,
   2017 Nov 14 18:43:03 PC->syscheck
   Rule: 554 (level 5) -> 'File added to the system.'
   New file '/media/user/software/suspicious-file.exe' added to the file system.
   File: /media/user/software/suspicious-file.exe
   New size: 1568509
   New permissions: 100777
   New user: user (1000)
   New group: user (1000)
   New MD5: 9519135089d69ad7ae6b00a78480bb2b
   New SHA1: 68b92d885317929e5b283395400ec3322bc9db5e
   New date: Tue Nov 14 18:42:41 2017
   New inode: 104062

From this alert, the integrator daemon extracts the hash fields and sends the request to VirusTotal. In the following section the possible responses from VirusTotal are shown.

.. note::
    In the :doc:`FIM dedicated section.<../file-integrity/index>` you can see more information about using FIM, with normal scans or scanning directories in real-time.

VirusTotal integration alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When a request to VirusTotal is done by the integrator module, different alerts will be triggered depending on the situation.

- The API credentials are incorrect.

.. code-block:: console
   :emphasize-lines: 3

   ** Alert 1510676062.9653: - virustotal,
   2017 Nov 14 16:14:22 PC->virustotal
   Rule: 87102 (level 3) -> 'VirusTotal: Error: Check credentials'
   {"virustotal": {"description": "Error: Check credentials", "error": 403}, "integration": "virustotal"}
   virustotal.description: Error: Check credentials
   virustotal.error: 403
   integration: virustotal

This error means that the API key set in the configuration is invalid.

- The following alert is triggered when we have reached the request rate limit set by VirusTotal. See the :doc:`ToS section <terms-of-service>` for knowing more about this limitation.

.. code-block:: console
   :emphasize-lines: 3

    ** Alert 1510684990.60518: - virustotal,
    2017 Nov 14 18:43:10 PC->virustotal
    Rule: 87101 (level 3) -> 'VirusTotal: Error: Public API request rate limit reached'
    {"virustotal": {"description": "Error: Public API request rate limit reached", "error": 204}, "integration": "virustotal"}
    virustotal.description: Error: Public API request rate limit reached
    virustotal.error: 204
    integration: virustotal

Previous alerts represent the possible errors that we can get, if everything works fine we would receive alerts like the following ones.

- Alert received when there are no records in the VirusTotal database.

.. code-block:: console
   :emphasize-lines: 3

   ** Alert 1510684376.32386: - virustotal,
   2017 Nov 14 18:32:56 PC->virustotal
   Rule: 87103 (level 3) -> 'VirusTotal: Alert - No records in VirusTotal database'
   {"virustotal": {"found": 0, "malicious": 0, "source": {"alert_id": "1510684374.31421", "sha1": "e4450be2f9a1a97cf0c71ce3efc802cea274fe9a", "file": "/media/user/software/my-clean-program.exe", "agent": {"id": "006", "name": "agent_centos"}, "md5": "9c8a83c9f4c39e8200661c33e188e79b"}}, "integration": "virustotal"}
   virustotal.found: 0
   virustotal.malicious: 0
   virustotal.source.alert_id: 1510684374.31421
   virustotal.source.sha1: e4450be2f9a1a97cf0c71ce3efc802cea274fe9a
   virustotal.source.file: /media/user/software/my-clean-program.exe
   virustotal.source.agent.id: 006
   virustotal.source.agent.name: agent_centos
   virustotal.source.md5: 9c8a83c9f4c39e8200661c33e188e79b
   integration: virustotal

- Alert received when the scanned file has been found in the database and it has been detected as malware by the antivirus engines.

.. code-block:: console
   :emphasize-lines: 3

   ** Alert 1510684984.55826: mail  - virustotal,
   2017 Nov 14 18:43:04 PC->virustotal
   Rule: 87105 (level 12) -> 'VirusTotal: Alert - /media/user/software/suspicious-file.exe - 7 engines detected this file'
   {"virustotal": {"permalink": "https://www.virustotal.com/file/8604adffc091a760deb4f4d599ab07540c300a0ccb5581de437162e940663a1e/analysis/1510680277/", "sha1": "68b92d885317929e5b283395400ec3322bc9db5e", "malicious": 1, "source": {"alert_id": "1510684983.55139", "sha1": "68b92d885317929e5b283395400ec3322bc9db5e", "file": "/media/user/software/suspicious-file.exe", "agent": {"id": "006", "name": "agent_centos"}, "md5": "9519135089d69ad7ae6b00a78480bb2b"}, "positives": 7, "found": 1, "total": 67, "scan_date": "2017-11-14 17:24:37"}, "integration": "virustotal"}
   virustotal.permalink: https://www.virustotal.com/file/8604adffc091a760deb4f4d599ab07540c300a0ccb5581de437162e940663a1e/analysis/1510680277/
   virustotal.sha1: 68b92d885317929e5b283395400ec3322bc9db5e
   virustotal.malicious: 1
   virustotal.source.alert_id: 1510684983.55139
   virustotal.source.sha1: 68b92d885317929e5b283395400ec3322bc9db5e
   virustotal.source.file: /media/user/software/suspicious-file.exe
   virustotal.source.agent.id: 006
   virustotal.source.agent.name: agent_centos
   virustotal.source.md5: 9519135089d69ad7ae6b00a78480bb2b
   virustotal.positives: 7
   virustotal.found: 1
   virustotal.total: 67
   virustotal.scan_date: 2017-11-14 17:24:37
   integration: virustotal
