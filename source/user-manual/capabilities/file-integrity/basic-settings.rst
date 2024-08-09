.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: You can configure the FIM capability on the Wazuh server and the Wazuh agent. Learn more about it in this section of the Wazuh documentation. 
  
Basic settings
==============

You can configure the FIM capability on the Wazuh server and the Wazuh agent. A :ref:`default FIM configuration <reference_ossec_syscheck_default_configuration>` exists on both the Wazuh server and the Wazuh agent. You can modify these settings depending on your needs. 

You can configure the FIM module on the Wazuh server and the Wazuh agent :doc:`configuration </user-manual/reference/ossec-conf/index>`  file. You can also configure this capability remotely using the :doc:`centralized configuration </user-manual/reference/centralized-configuration>` file. The list of all FIM configuration options is available in the syscheck section.

In this guide, we show different configuration options that the Wazuh FIM module supports.

.. _real_time_monitoring:
 
Real-time monitoring
--------------------
  
The ``realtime`` attribute enables real-time/continuous monitoring of directories on Windows and Linux endpoints only.

To monitor files in real time, configure the FIM module with the ``realtime`` attribute of the :ref:`directories <reference_ossec_syscheck_directories>` option. The allowed values for the ``realtime`` attribute are ``yes`` and ``no``, and it only works with directories, not individual files. Real-time change detection is paused during scheduled FIM module scans and reactivates as soon as these scans are complete.

Below, you can see how to configure the FIM module to monitor a directory in real time. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own filepath. 

.. note::

   When specifying a directory for real time monitoring, it must exist before restarting the Wazuh agent. If not, the module ignores the directory until it finds it on a subsequent restart of the Wazuh agent.

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2
      
         <syscheck>
            <directories realtime="yes"><FILEPATH_OF_MONITORED_DIRECTORY></directories>
         </syscheck>


#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``

.. _record_file_attributes:

Record file attributes
----------------------

When you configure the FIM module to monitor specific files and directories, it records the metadata of the files and monitors them. You can use the :ref:`directories <reference_ossec_syscheck_directories>` option to set the specific file metadata that the FIM module must collect and ignore. The directories option supports several attributes. 

The table below describes the supported attributes the FIM module records.

  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | Attribute           | Default value | Allowed values | Description                                                                                                                                                                                        |
  +=====================+===============+================+====================================================================================================================================================================================================+
  | ``check_all``       | yes           | yes, no        | Records the values of all attributes below.                                                                                                                                                        |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_sum``       | yes           | yes, no        | Records the MD5, SHA-1 and SHA-256 hashes of the files. Same as using ``check_md5sum="yes"``, ``check_sha1sum="yes"``, and ``check_sha256sum="yes"`` at the same time.                             |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_sha1sum``   | yes           | yes, no        | Records the SHA-1 hash of the files.                                                                                                                                                               |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_md5sum``    | yes           | yes, no        | Records the MD5 hash of the files.                                                                                                                                                                 |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_sha256sum`` | yes           | yes, no        | Records the SHA-256 hash of the files.                                                                                                                                                             |  
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_size``      | yes           | yes, no        | Records the size of the files.                                                                                                                                                                     |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_owner``     | yes           | yes, no        | Records the owner of the files in Linux.                                                                                                                                                           |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_group``     | yes           | yes, no        | Records the group owner of the files/directories. On Windows, ``gid`` is always 0 and the group name is blank.                                                                                     |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_perm``      | yes           | yes, no        | Records the permission of the files/directories. On Windows, a list of denied and allowed permissions is recorded for each user or group. It works on Linux and Windows with NTFS partitions.      |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_attrs``     | yes           | yes, no        | Records the attributes of files in Windows.                                                                                                                                                        |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_mtime``     | yes           | yes, no        | Records the modification time of a file.                                                                                                                                                           |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  | ``check_inode``     | yes           | yes, no        | Records the file inode on Linux.                                                                                                                                                                   |
  +---------------------+---------------+----------------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+

When there is a conflict between options that modify the same attribute, the last one configured takes precedence. For instance, the following configuration sets the option ``check_mtime`` to ``yes``:

.. code-block:: xml

   <directories check_all="no" check_mtime="yes">/etc</directories>

While the following configuration disables recording of all attributes including the modification time check.

.. code-block:: xml
   
   <directories check_mtime="yes" check_all="no">/etc</directories>

You can see below an example configuration of how to disable the recording of SHA-1 hash of a monitored file. Replace ``<FILEPATH_OF_MONITORED_FILE>`` with your own filepath.

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2

         <syscheck>
            <directories check_sha1sum="no"><FILEPATH_OF_MONITORED_FILE></directories>
         </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ```` 

.. note::

   Specified files or directories created after the initial FIM scan will be added for monitoring during the next scheduled scan.

.. _scheduled_scans:

Scheduled scans
---------------

To modify the schedule of the FIM module scans, you can configure the ``<frequency>`` option of the Wazuh FIM module. This option defines the period between FIM scans. You can alternatively configure the scans to run at a specific time and day of the week using the :ref:`scan_time <reference_ossec_syscheck_scan_time>` and the :ref:`scan_day <reference_ossec_syscheck_scan_day>` options. Scheduled scans prevent alert flooding when monitoring frequently updated files such as log files.

The FIM module runs scans every 12 hours *(43200 seconds)* by default. In the following configuration example, you can see how to set the FIM module to run scans every 15 minutes *(900 seconds)*.

#. Add the following settings to the Wazuh agent configuration file:
 
   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <frequency>900</frequency>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ````

   Alternatively, you can schedule the scans using the :ref:`scan_time <reference_ossec_syscheck_scan_time>` and the :ref:`scan_day <reference_ossec_syscheck_scan_day>` options. Configuring FIM using these options helps to set up FIM  scans outside business hours. 

   The configuration example below shows you how to run the scans of the specified directories every Saturday at *10 pm*.

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <syscheck>
         <scan_time>10pm</scan_time>
         <scan_day>saturday</scan_day>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ````

.. _report_changes_in_file_values:

Report changes in file values
-----------------------------

The ``report_changes`` attribute allows the FIM module to report the exact content changed in a text file. This records the text added to or deleted from a monitored file.  You can configure this functionality by enabling the ``report_changes`` attribute of the :ref:`directories <reference_ossec_syscheck_directories>` options. The allowed values for this attribute are ``yes`` and ``no``. It works with both directories and individual files on Windows, macOS, and Linux endpoints. 

You must use the ``report_changes`` attribute with caution when you enable this option.  Wazuh copies every monitored file to a private location increasing storage usage. You can find the copy of the files at: 

- ``/var/ossec/queue/diff/local/``  on Linux.
- ``Library/Ossec/queue/diff/local/`` on macOS.
- ``C:\Program Files (x86)\ossec-agent\queue\diff\local\`` on Windows.

Below, you can see how to configure the FIM module to report file changes. Replace ``<FILEPATH_OF_MONITORED_FILE>`` with your own filepath.

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
         <directories check_all="yes" report_changes="yes"><FILEPATH_OF_MONITORED_FILE></directories>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply the configuration changes:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ````

   In the configuration example below, you can see how to use the ``report_changes`` attribute for all files in the ``<FILEPATH_OF_MONITORED_DIRECTORY>`` directory. You can see how to prevent the FIM module from reporting the exact content changes to the ``<FILEPATH_OF_MONITORED_DIRECTORY>/private.txt`` file. Replace ``<FILEPATH_OF_MONITORED_DIRECTORY>`` with your own filepath.

   When using the ``report_changes`` option, you can use the :ref:`nodiff <reference_ossec_syscheck_nodiff>` option to create an exception. This option alerts modifications of the file  but it prevents the Wazuh FIM module from reporting the exact content changed in a text file. Using the nodiff option avoids data leakage that might occur by sending the file content changes through alerts.

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2,3

      <syscheck>
         <directories check_all="yes" report_changes="yes"><FILEPATH_OF_MONITORED_DIRECTORY></directories>
         <nodiff><FILEPATH_OF_MONITORED_DIRECTORY>/private.txt</nodiff>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply the configuration changes:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ````

Adding exclusions
-----------------

You can configure the FIM module to ignore alerting of certain files and directories using either of two methods:

Using the ignore option
^^^^^^^^^^^^^^^^^^^^^^^

You can use the :ref:`ignore <reference_ossec_syscheck_ignore>` option to ignore a path. It allows one entry of either file or directory per line. However, you can use multiple lines to add exclusions for multiple paths. 

In this example, you can see how to configure the FIM module to ignore a filepath. This also ignores the regex match for the file extensions ``.log`` and ``.tmp``. Replace ``<FILEPATH_OF_MONITORED_FILE>`` with your own filepaths. 

#. Add the following settings to the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml
      :emphasize-lines: 2

      <syscheck>
         <ignore><FILEPATH_OF_MONITORED_FILE></ignore>
         <ignore type="sregex">.log$|.tmp$</ignore>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows: ``Restart-Service -Name wazuh``
   - macOS: ````

Using custom rules
^^^^^^^^^^^^^^^^^^

An alternative method is using rules of alert level 0. This method ignores the alerting of specific files and directories scanned by the FIM module. Alerts for level 0 rules are silent and the Wazuh server doesn’t report them. 

In the configuration example below, you can see how to monitor the ``/var/www/htdocs/`` directory on a Linux endpoint and use silent alerts for the ``/var/www/htdocs/private.html`` file.

Linux endpoint
~~~~~~~~~~~~~~

#. Add the following settings to the Wazuh agent ``/var/ossec/etc/ossec.conf`` configuration file:

   .. code-block:: xml

      <syscheck>
         <directories>/var/www/htdocs</directories>
      </syscheck>

#. Restart the Wazuh agent with administrator privilege to apply any configuration change:

   .. code-block:: console

      # systemctl restart wazuh-agent

Wazuh server
~~~~~~~~~~~~

#. Create the ``fim_ignore.xml`` file in the ``/var/ossec/etc/rules/`` directory on the Wazuh server:

   .. code-block:: console

      # touch /var/ossec/etc/rules/fim_ignore.xml

#. Add the following rules to the ``fim_ignore.xml`` file:

   .. code-block:: xml
      :emphasize-lines: 2

      <group name="syscheck">
        <rule id="100345" level="0">
          <if_group>syscheck</if_group>
          <field name="file">/var/www/htdocs/private.html</field>
          <description>Ignore changes to $(file)</description>
        </rule>
      </group>

   The rule silences the FIM alert for the ``/var/www/htdocs/private.html`` file.

3. Restart the Wazuh manager to apply the configuration changes:

   .. code-block:: console

      # systemctl restart wazuh-manager


