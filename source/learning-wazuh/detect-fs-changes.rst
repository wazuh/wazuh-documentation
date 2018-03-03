.. _learning_wazuh_detect_fs_changes:

Detect filesystem changes
=========================

Wazuh's syscheck system is responsible for file integrity monitoring (FIM) and registry change monitoring.  Below we 
will configure syscheck on windows-agent to monitor specific directories for changes and then make changes there and
observe the alerts that are generated.


Preparation
-----------

To turn on Wazuh agent and syscheck debug logging on windows-agent, start Notepad with the "Run as administrator" option and enter this text

    .. code-block:: console

        windows.debug=2
        syscheck.debug=2
        rootcheck.sleep=0
        syscheck.sleep=0

Save this as a new file called "C:\\Program Files (x86)\\ossec-agent\\local_internal_options.conf", making sure under "Save as type:" to choose "All Files" so that the file does not get a .txt extension appended to it.
 
Open the Windows Command Prompt, using the "Run as administrator" option. Then create a couple of lab directories:

    .. code-block:: console

        mkdir c:\apple
        mkdir c:\orange


Configuring FIM
---------------

Run your Wazuh Agent Manager shortcut (win32ui) on the desktop and click on View -> View Config, and replace the large 
default <syscheck> section with this:

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

In Wazuh Agent Manager, click on View -> View Logs. You should see a couple of entries like this, accounting for 
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

Where FIM data is stored
------------------------

Each time a Wazuh agent runs a periodic syscheck FIM scan, the monitored file attributes are sent back to the Wazuh 
Manager where they are stored in an agent-specific flat file so that the results of the next scan can be compared to 
the results of the previous scan in order to detect changes.  Change history is also stored in the same flat flat.  
A real-time monitoring event on an agent conveys the same kind of information about an individual changed file back 
to the Wazuh Manager.

On wazuh-manager, use the text viewer of your choice to peruse the FIM history file for windows-agent.  The file
will be called "/var/ossec/queue/syscheck/(windows-agent) any->syscheck", and if you look at the end of the file
you should see records relevant to the c:\\apple and c:\\orange lab activities you just went through, looking like
this:

.. code-block:: console

    #++17:33206:0:0:ccdec1000582555c84420bbddcdd2cf5:4f6e15564d234f8d0f101699076716fed2755d34:Administrators::1516855210:0 !1516855210 c:/apple/gala.txt
    #++17:33206:0:0:ccdec1000582555c84420bbddcdd2cf5:4f6e15564d234f8d0f101699076716fed2755d34:Administrators::1516855213:0 !1516855213 c:/apple/gala.txt
    #!+34:33206:0:0:e4d6f3b0b20976413417dbf5c1242e94:d30cd5fa0ef7515d943864a86c2b7baa0861a2c4:Administrators::1516855660:0 !1516855662 c:/apple/gala.txt
    +++4:33206:0:0:098f6bcd4621d373cade4e832627b4f6:a94a8fe5ccb19ba61c4c0873d391e987982fbbd3:Administrators::1516855730:0 !1516855964 c:/orange/mandarin.txt
    !!!-1 !1516856176 c:/apple/gala.txt
    +++34:33206:0:0:e4d6f3b0b20976413417dbf5c1242e94:d30cd5fa0ef7515d943864a86c2b7baa0861a2c4:Administrators::1516855660:0 !1516856177 c:/apple/mcintosh.txt
    #++8:33206:0:0:fd33e2e8ad3cb1bdd3ea8f5633fcf5c7:56170f5429b35dea081bb659b884b475ca9329a9:Administrators::1516856328:0 !1516856354 c:/orange/navel.txt
    !++111:33206:0:0:07d8a44e6b114be112d9f72b6fd0482e:3f6229df0cf025b93bb8a8648944c794159958e0:Administrators::1516856438:0 !1516856514 c:/orange/navel.txt
