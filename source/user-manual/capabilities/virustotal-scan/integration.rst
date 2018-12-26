.. Copyright (C) 2018 Wazuh, Inc.

Integration
===========

#. `How it works`_
#. `Use case: scanning a file with the VirusTotal integration`_

How it works
------------

This integration utilizes the VirusTotal API to detect malicious content within the files monitored by **syscheck**. This integration functions as described below:

1. FIM looks for any addition, change or deletion of files in the folders monitored by the **syscheck** module. This module stores the hash of the monitored files and triggers alerts when any change has been made.

2. When the VirusTotal integration is enabled, it is triggered when a FIM alert occurs. From this alert, the module extracts the hash field of the file.

3. The module then makes an HTTP POST request to the VirusTotal database using the VirusTotal API for comparison between the extracted hash and the information contained in the database.

4. A JSON response is then received that is the result of this search which will trigger one of the following alerts:

- Error: Public API request rate limit reached.
- Error: Check credentials.
- Alert: No records in VirusTotal database.
- Alert: No positives found.
- Alert: X engines detected this file.

The triggered alert is logged in the ``integration.log`` file and stored in the ``alerts.log`` file with all other alerts.

In the `VirusTotal integration alerts`_ section below you will find examples of these alerts.

Use case: scanning a file with the VirusTotal integration
---------------------------------------------------------

Getting started
^^^^^^^^^^^^^^^

In order for this integration to function, the first thing that must be completed is the configuration of the VirusTotal integration as explained in the :doc:`Local configuration section <../../reference/ossec-conf/integration>` and as shown below:

1. Install python ``requests`` module:

.. code-block:: xml

    # pip install requests

2. The following section must be added to the ``ossec.conf`` file:

.. code-block:: xml

    <integration>
      <name>virustotal</name>
      <api_key>API_KEY</api_key> <!-- Replace with your VirusTotal API key -->
      <group>syscheck</group>
      <alert_format>json</alert_format>
    </integration>

3. The integrator daemon must be enabled and followed by a restart of Wazuh, as shown below:

.. code-block:: console

    # /var/ossec/bin/ossec-control enable integrator

To restart the Wazuh manager:

a. For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

b. For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

After this is complete, and FIM alert automatically triggers the VirusTotal integration.

Using FIM to monitor a directory
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For this use case, we will show how to monitor the folder ``/media/user/software`` with an agent.

1. The following must be added to the ``<syscheck>`` section of the configuration file:

.. code-block:: xml

  <syscheck>
  ...
    <directories check_all="yes" realtime="yes">/media/user/software</directories>
  ...
  </syscheck>

2. The **syscheck** module must then be restarted.

After restarting the **syscheck** module, the configuration is applied and the specified folder will be monitored in real-time.

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

From this alert, the integrator daemon extracts the hash fields, sending the request to VirusTotal for comparison.

.. note::
    In the :doc:`FIM dedicated section.<../file-integrity/index>` you will find more information about using FIM with normal scans or real-time scans of directories.

VirusTotal integration alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

When a request to VirusTotal is sent by the integrator module, as noted above, different alerts will be triggered depending on the situation. Below are examples and explanations of these alerts:

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

- The API has reached the set rate limit.


.. code-block:: console
   :emphasize-lines: 3

    ** Alert 1510684990.60518: - virustotal,
    2017 Nov 14 18:43:10 PC->virustotal
    Rule: 87101 (level 3) -> 'VirusTotal: Error: Public API request rate limit reached'
    {"virustotal": {"description": "Error: Public API request rate limit reached", "error": 204}, "integration": "virustotal"}
    virustotal.description: Error: Public API request rate limit reached
    virustotal.error: 204
    integration: virustotal

This error is triggered when the request rate limit set by VirusTotal has been reached. See the :doc:`ToS section <terms-of-service>` for more information on this limitation.

While the two previous alerts represent errors that may occur, the following are samples of alerts returned from a successful request:

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

- Alert received when the scanned file was found and identified by the database as malware.

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
