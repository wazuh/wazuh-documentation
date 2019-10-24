.. Copyright (C) 2019 Wazuh, Inc.

.. _learning_wazuh_detect_fs_changes:

Detect filesystem changes
=========================

Wazuh's syscheck system is responsible for file integrity monitoring (FIM) and registry change monitoring.  Below we
will configure syscheck on windows-agent to monitor specific directories for changes and then make changes there and
observe the alerts that are generated.


Preparation
-----------

To turn on Wazuh agent and syscheck debug logging on windows-agent, start Notepad with the "Run as administrator" option and enter this text:

    .. code-block:: console

        windows.debug=2
        rootcheck.sleep=0
        syscheck.sleep=0

Save this as a new file called ``C:\Program Files (x86)\ossec-agent\local_internal_options.conf``, making sure under "Save as type:" to choose "All Files" so that the file does not get a .txt extension appended to it.

Open the Windows Command Prompt, using the "Run as administrator" option. Then create a couple of lab directories:

    .. code-block:: console

        mkdir c:\apple
        mkdir c:\orange


Configuring FIM
---------------

Run your Wazuh agent Manager shortcut (win32ui) on the desktop and click on View -> View Config, and replace the large
default ``<syscheck>`` section with this:

    .. code-block:: console

        <syscheck>
            <disabled>no</disabled>
            <scan_on_start>yes</scan_on_start>
            <frequency>300</frequency>
            <directories check_all="yes" realtime="yes" report_changes="yes">c:/apple</directories>
            <directories check_all="yes">c:/orange</directories>
        </syscheck>

The above enables syscheck FIM on windows-agent, such that a periodic scan of c:\\orange will take place shortly
after the start or restart of the Wazuh agent, and then every 300 seconds thereafter.  The c:\\apple directory will be monitored
in real time for file changes, while the c:\\orange directory will only be periodically scanned for
changes.  Changes to existing text files in c:\\apple will trigger an alert that includes the details of the actual text
that was changed, while changes to c:\\orange files will not include details of actual file content changes.

.. note::
    In Wazuh configuration files, Windows file and directory paths are always expressed with forward slashes
    rather than traditional Windows backslashes.  This is because the backslash tends to be interpreted as an escape
    character by Wazuh.  Wazuh will find your Windows paths just fine even though the slashes look backwards.

Close and save your modified config file.  Then restart Wazuh on windows-agent (Manage -> Restart).

In Wazuh agent Manager, click on View -> View Logs. You should see a couple of entries like this, accounting for
the new syscheck monitoring of your two test directories:

    .. code-block:: console

        2018/01/22 23:35:04 ossec-agent: INFO: Monitoring directory: 'c:/apple', with options perm | size | owner | group | md5sum | sha1sum | realtime | report_changes | mtime | inode.
        2018/01/22 23:35:04 ossec-agent: INFO: Monitoring directory: 'c:/orange', with options perm | size | owner | group | md5sum | sha1sum | mtime | inode.


Testing FIM
-----------

At this point, add, modify, and delete files in these two test directories on the Windows agent, and watch your search
results in Kibana for the query text "apple orange" (without quotes), to find syscheck events as they appear.  Notice
that alerts about changes in c:\\apple\\ show up promptly, while alerts about changes in c:\\orange\\ are not reported until
the next periodic (5 minute) syscheck scan.  You can force a periodic syscheck scan sooner by restarting the Windows agent, but
still expect to wait a minute or so before the scan actually runs.

.. note::
    When multiple terms are searched for in Kibana (like "apple orange") without being separated by a capitalized "AND", an "OR" relationship
    is assumed, resulting in a search for all records matching either of the terms included.


Inspecting the FIM events
-------------------------

Here are alerts produced by adding, editing, renaming, and deleting files in both directories:

.. thumbnail:: ../images/learning-wazuh/labs/syscheck-fim-various.png
    :title: fim various
    :align: center
    :width: 90%

Here is the full alert about the change of an existing file in c:\\apple\\.  Notice the "syscheck.diff" field accounting
for the actual content added to the file ("adding new line").  Also notice the many other file attribute changes accounted for.

.. thumbnail:: ../images/learning-wazuh/labs/syscheck-fim-change.png
    :title: fim change
    :align: center
    :width: 80%

FIM events in the Wazuh Kibana App
----------------------------------

Of course, the nicest way to look over file changes is via the Wazuh Kibana app.  You can get an overview of FIM events
for all agents by clicking on the Wazuh app icon, and then on the "FILE INTEGRITY" tab.  To focus in on just the FIM
events for windows-agent, click on Wazuh, then on the AGENTS tab, then on the record of your windows-agent, and then on
the FILE INTEGRITY tab, which would look something like this:

.. thumbnail:: ../images/learning-wazuh/labs/wazuh-app-agent-fim.png
    :title: fim app dash
    :align: center
    :width: 100%

.. note::
    The default time windows in Kibana is only "Last 15 minutes" which may be too small to encompass your activities in this lab.  Click on
    the time window value and change it to something broader if needed.

A look under the hood of syscheck
---------------------------------

What has actually happened in the background? How does Wazuh track file state between scans so it can know when a file has changed and what about that file changed? Each time a Wazuh agent runs a periodic syscheck FIM scan, the monitored file checksums and attributes are sent back to the Wazuh manager who stores them and looks for modifications by comparing the new values to the old values.

On the manager in the ``/var/ossec/queue/db/`` directory we see files like ``000.db``, ``001.db``, ``002.db``, ``003.db``.  These are SQLite files for the manager and each agent (by ID#), each containing multiple tables related to a system including one related to syscheck.

.. code-block:: console

    # sqlite3 /var/ossec/queue/db/000.db ".tables"
    ciscat_results  pm_event        sys_netaddr     sys_osinfo      sys_programs
    fim_entry       scan_info       sys_netiface    sys_ports
    metadata        sys_hwinfo      sys_netproto    sys_processes

The following command shows the schema of the ``fim_entry`` table where the manager stores syscheck scan results for itself and its agents:

.. code-block:: console

    # sqlite3 -header /var/ossec/queue/db/000.db "PRAGMA table_info(fim_entry);"
	cid|name|type|notnull|dflt_value|pk
	0|file|TEXT|0||1
	1|type|TEXT|1||0
	2|date|INTEGER|1|strftime('%s', 'now')|0
	3|changes|INTEGER|1|1|0
	4|size|INTEGER|0||0
	5|perm|TEXT|0||0
	6|uid|TEXT|0||0
	7|gid|TEXT|0||0
	8|md5|TEXT|0||0
	9|sha1|TEXT|0||0
	10|uname|TEXT|0||0
	11|gname|TEXT|0||0
	12|mtime|INTEGER|0||0
	13|inode|INTEGER|0||0
	14|sha256|TEXT|0||0
	15|attributes|INTEGER|0|0|0
	16|symbolic_path|TEXT|0||0

This file contains syscheck scan results including file hashes and other metadata, plus a count of how many times a given file has been seen to change.

The following command shows the syscheck-monitored files for the windows-agent (ID #006):

.. code-block:: console

    # sqlite3 /var/ossec/queue/db/006.db 'select * from fim_entry where file like "%apple%"';
