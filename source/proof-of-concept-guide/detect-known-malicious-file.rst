.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Wazuh enriches events with the Wazuh CTI indicator of compromise feed and creates a finding when a file hash matches a known malicious indicator. Learn more about this in this PoC.

Detecting a known malicious file
================================

Wazuh enriches events with the :doc:`Wazuh CTI indicator of compromise (IoC) feed </user-manual/capabilities/malware-detection/threat-intelligence>`. When a file hash, address, or domain in an event matches a known indicator, Wazuh raises a threat intelligence finding. In this use case, you create the EICAR test file in a directory that Wazuh FIM monitors and check that Wazuh flags its hash. You need no custom rules, decoders, or lists.

.. note::

   The EICAR test file is a harmless standard string made for testing anti-malware tools. See the `EICAR test file <https://www.eicar.org/download-anti-malware-testfile/>`__ page for details.

Endpoints
---------

+---------------------+---------------------------------------------------------------------------------+
| Endpoint            | Role                                                                            |
+=====================+=================================================================================+
| Ubuntu 24.04        | FIM monitors ``/root``, where you create the EICAR file.                        |
+---------------------+---------------------------------------------------------------------------------+
| Windows Server 2022 | FIM monitors ``C:\Users\<USER_NAME>\Desktop``, where you create the EICAR file. |
+---------------------+---------------------------------------------------------------------------------+

Configuration
-------------

A restored lab snapshot no longer has the FIM configuration from earlier use cases. Complete the Configuration steps of the :doc:`File integrity monitoring <poc-file-integrity-monitoring>` use case on both endpoints, then wait for the ``(6009)`` message in the Wazuh agent log.

Test the configuration
----------------------

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Write the EICAR test file to ``/root`` and print its hash:

   .. code-block:: console

      $ sudo su
      # echo 'WDVPIVAlQEFQWzRcUFpYNTQoUF4pN0NDKTd9JEVJQ0FSLVNUQU5EQVJELUFOVElWSVJVUy1URVNULUZJTEUhJEgrSCo=' | base64 -d > /root/eicar.com
      # sha256sum /root/eicar.com
      # exit

The hash is ``275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f``.

Windows endpoint
^^^^^^^^^^^^^^^^

Microsoft Defender removes the EICAR file within seconds. Add a Defender exclusion for the monitored folder first.

.. warning::

   The exclusion stops Microsoft Defender from scanning the Desktop folder. Add it only on a lab endpoint, and remove it in :ref:`Clean up <poc_known_malicious_file_clean_up>`.

#. In PowerShell with administrator privileges, add the exclusion and wait for Defender to apply it:

   .. code-block:: ps1con

      > Add-MpPreference -ExclusionPath 'C:\Users\<USER_NAME>\Desktop'
      > Start-Sleep 20

#. Write the EICAR test file and print its hash:

   .. code-block:: ps1con

      > $b = 'WDVPIVAlQEFQWzRcUFpYNTQoUF4pN0NDKTd9JEVJQ0FSLVNUQU5EQVJELUFOVElWSVJVUy1URVNULUZJTEUhJEgrSCo='
      > $s = [Text.Encoding]::ASCII.GetString([Convert]::FromBase64String($b))
      > Set-Content -Path C:\Users\<USER_NAME>\Desktop\eicar.com -Value $s -NoNewline -Encoding ascii
      > (Get-FileHash C:\Users\<USER_NAME>\Desktop\eicar.com -Algorithm SHA256).Hash

The hash is the same, in uppercase. Defender can still log a detection for the file.

View the findings
-----------------

You see two findings in the Wazuh dashboard:

-  ``Malicious hash detected - <SHA256> <MD5>``, where ``<SHA256>`` and ``<MD5>`` are the file's SHA-256 and MD5 hashes, respectively.
-  ``Wazuh FIM - File created - <FILE_PATH>``, where ``<FILE_PATH>`` is the full path to ``eicar.com``.

In the Wazuh dashboard, go to **Threat intelligence** > **Threat Hunting**, select **Findings**, and add the filter ``file.hash.sha256: "275a021bbfb6489e54d471899f7db9d1663fc695ec2fe2a2c4538aabf651fd0f"``.

.. thumbnail:: /images/poc/known-malicious-file-findings.png
   :title: Known malicious file findings
   :alt: Wazuh dashboard Threat Hunting Findings tab filtered by the EICAR SHA-256 hash, showing the Malicious hash detected and Wazuh FIM File created findings for the Ubuntu and Windows endpoints
   :align: center
   :width: 80%

Troubleshooting
---------------

+------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Check                                    | How                                                                                                                                                                                                                                        |
+==========================================+============================================================================================================================================================================================================================================+
| The file exists with the EICAR hash      | The ``sha256sum`` or ``Get-FileHash`` command prints the hash above. On Windows, a missing file means Defender removed it. Check the exclusion with ``Get-MpPreference``.                                                                  |
+------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| FIM reported the file                    | The ``Wazuh FIM - File created`` finding for ``eicar.com`` is in the list.                                                                                                                                                                 |
+------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The IoC feed finished loading            | The Wazuh manager log, ``/var/wazuh-manager/logs/wazuh-manager.log``, has ``Synchronized IOC type 'hash_sha256'``. If it shows ``IOC synchronization skipped``, the feed is still loading. Wait, then delete the file and create it again. |
+------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| The ``wazuh-ioc`` integration is enabled | **Ruleset management** > **Overview** shows it enabled. With it off, Wazuh drops the events without any message.                                                                                                                           |
+------------------------------------------+--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

.. _poc_known_malicious_file_clean_up:

Clean up
--------

#. On the Ubuntu endpoint:

   .. code-block:: console

      $ sudo rm /root/eicar.com

#. On the Windows endpoint, in PowerShell with administrator privileges:

   .. code-block:: ps1con

      > Remove-Item C:\Users\<USER_NAME>\Desktop\eicar.com -Force
      > Remove-MpPreference -ExclusionPath 'C:\Users\<USER_NAME>\Desktop'
