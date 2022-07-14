.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Check out how to configure syscheck on windows-agent to make changes to specific directories, monitor their behavior, and observe generated alerts. 
  
.. _learning_wazuh_detect_fs_changes:

Detect filesystem changes
=========================

Wazuh syscheck system is responsible for file integrity monitoring (FIM) and registry change monitoring. In this exercise, we will configure syscheck on the *windows-agent* to monitor specific directories, make changes within them and observe the alerts that are generated.


Preparation
-----------

To turn on the Wazuh agent and syscheck debug logging on the *windows-agent*. Start **Notepad** with the **Run as administrator** option and enter the following text:

    .. code-block:: none

        windows.debug=2
        rootcheck.sleep=0
        syscheck.sleep=0

Save this as a new file called ``C:\Program Files (x86)\ossec-agent\local_internal_options.conf``, making sure under **Save as type** to choose **All Files** so that the file does not get a ``.txt`` extension appended to it.

Open the **Windows Command Prompt** or a **PowerShell**, using the **Run as administrator** option. Then create a couple of lab directories:

    .. code-block:: none

        mkdir C:\apple
        mkdir C:\orange


Configuring FIM
---------------

Run the **Wazuh Agent Manager** (``C:\Program Files (x86)\ossec-agent\win32ui.exe``) and click on **View** > **View Config**, and replace the large default ``<syscheck>`` section with the following configuration:

    .. code-block:: xml

        <syscheck>
            <disabled>no</disabled>
            <scan_on_start>yes</scan_on_start>
            <frequency>300</frequency>
            <directories check_all="yes" realtime="yes" report_changes="yes">C:/apple</directories>
            <directories check_all="yes">C:/orange</directories>
        </syscheck>

The above enables syscheck FIM on the *windows-agent*, such that a periodic scan of ``C:\orange`` will take place shortly after the start or restart of the Wazuh agent, and then every 300 seconds thereafter.

The ``C:\apple`` directory will be monitored in real-time for file changes, while the ``C:\orange`` directory will only be periodically scanned for changes.  Changes to existing text files in ``C:\apple`` will trigger an alert that includes the details of the actual text that was changed, while changes to ``C:\orange`` files will not include details of actual file content changes.

.. note::
    In Wazuh configuration files, Windows file and directory paths are always expressed with forward slashes rather than traditional Windows backslashes.  This is because the backslash tends to be interpreted as an escape character by Wazuh.  Wazuh will find your Windows paths just fine even though the slashes look backwards.

Close and save your modified config file.  Then restart the Wazuh agent (**Manage** > **Restart**).

In the **Wazuh Agent Manager**, click on **View** > **View Logs**. You should see a couple of entries like this, accounting for the new syscheck monitoring of your two test directories:

    .. code-block:: none
       :class: output

       wazuh-agent[5348] syscheck.c:186 at Start_win32_Syscheck(): INFO: (6003): Monitoring path: 'c:\apple', with options 'size | permissions | owner | group | mtime | inode | hash_md5 | hash_sha1 | hash_sha256 | attributes | report_changes | realtime'.
       wazuh-agent[5348] syscheck.c:186 at Start_win32_Syscheck(): INFO: (6003): Monitoring path: 'c:\orange', with options 'size | permissions | owner | group | mtime | inode | hash_md5 | hash_sha1 | hash_sha256 | attributes | scheduled'.


Testing FIM
-----------

Add, modify, and delete files in these two test directories on the Windows agent, and watch your search results in the Wazuh dashboard for the query text "*apple orange*" (without quotes), to find syscheck events as they appear.  

Notice that alerts about changes in ``C:\apple\`` show up promptly, while alerts about changes in ``C:\orange\`` are not reported until the next periodic (5 minute) syscheck scan. You can force a periodic syscheck scan sooner by restarting the Windows agent, but still expect to wait a minute or so before the scan runs.

.. note::
    When multiple terms are searched for in the Wazuh dashboard (like "apple orange") without being separated by a capitalized "AND", an "OR" relationship is assumed, resulting in a search for all records matching either of the terms included.


Inspecting the FIM events
-------------------------

Here are alerts produced by adding, editing, renaming, and deleting files in both directories:

.. thumbnail:: ../images/learning-wazuh/labs/syscheck-fim-various.png
    :title: fim various
    :align: center
    :width: 80%

Here is the full alert about the change of an existing file in ``C:\apple\``.  Notice the **syscheck.diff**
field accounting for the actual content changed on the file (where "1 apple" was changed to "2 apples").
Also notice the many other file attribute changes accounted for.

.. thumbnail:: ../images/learning-wazuh/labs/syscheck-fim-change.png
    :title: fim change
    :align: center
    :width: 80%

FIM events in the Wazuh dashboard
---------------------------------

You can get an overview of FIM events for all agents by clicking on the Wazuh menu, and then on **Dashboards** > **Integrity monitoring**. To focus on just the FIM events for the *windows-agent*, click on **Wazuh**, then on the **Agents** tab, then on the record of your *windows-agent*, and then on the **Integrity monitoring** dashboard, which would look similar to this:

.. thumbnail:: ../images/learning-wazuh/labs/wazuh-app-agent-fim.png
    :title: fim app dash
    :align: center
    :width: 80%


A look under the hood of syscheck
---------------------------------

Each time a Wazuh agent runs a periodic syscheck FIM scan, the monitored file checksums and attributes
are sent back to the Wazuh manager who stores them and looks for modifications by comparing the new values
to the old values.

On the manager in the ``/var/ossec/queue/db/`` directory we may find a ``.db`` file for each agent ID
including the manager (``000.db``, ``001.db``, ``002.db``, ``003.db``).  These are SQLite files each containing
multiple tables including one related to syscheck.

.. code-block:: console

   # sqlite3 /var/ossec/queue/db/000.db ".tables"

.. code-block:: none
   :class: output

   ciscat_results        sca_scan_info         sys_osinfo          
   fim_entry             scan_info             sys_ports           
   metadata              sync_info             sys_processes       
   pm_event              sys_hotfixes          sys_programs        
   sca_check             sys_hwinfo            vuln_cves           
   sca_check_compliance  sys_netaddr           vuln_metadata       
   sca_check_rules       sys_netiface        
   sca_policy            sys_netproto    

The following command shows the schema of the ``fim_entry`` table where the manager stores syscheck scan results for itself and its agents:

.. code-block:: console

   # sqlite3 -header /var/ossec/queue/db/000.db "PRAGMA table_info(fim_entry);"

.. code-block:: none
   :class: output

   0|full_path|TEXT|1||1
   1|file|TEXT|0||0
   2|type|TEXT|1||0
   3|date|INTEGER|1|strftime('%s', 'now')|0
   4|changes|INTEGER|1|1|0
   5|arch|TEXT|0||0
   6|value_name|TEXT|0||0
   7|value_type|TEXT|0||0
   8|size|INTEGER|0||0
   9|perm|TEXT|0||0
   10|uid|TEXT|0||0
   11|gid|TEXT|0||0
   12|md5|TEXT|0||0
   13|sha1|TEXT|0||0
   14|uname|TEXT|0||0
   15|gname|TEXT|0||0
   16|mtime|INTEGER|0||0
   17|inode|INTEGER|0||0
   18|sha256|TEXT|0||0
   19|attributes|TEXT|0||0
   20|symbolic_path|TEXT|0||0
   21|checksum|TEXT|0||0



This file contains syscheck scan results including file hashes and other metadata, plus a count of how many times a given file has been seen to change.

The following command shows the syscheck-monitored files for the windows-agent (ID #003):

.. code-block:: console

   # sqlite3 /var/ossec/queue/db/003.db 'select * from fim_entry where file like "%apple%"';



Change your configuration back to default
-----------------------------------------


Before moving on to the next Lab, we need to change ``<syscheck>`` configuration back to the way it was.

Run the **Wazuh Agent Manager** (``C:\Program Files (x86)\ossec-agent\win32ui.exe``) and click on **View** > **View Config**, and replace the ``<syscheck>`` section with this:


.. code-block:: xml

   <syscheck>
 
     <disabled>no</disabled>
 
     <!-- Frequency that syscheck is executed default every 12 hours -->
     <frequency>43200</frequency>
 
     <!-- Default files to be monitored. -->
     <directories recursion_level="0" restrict="regedit.exe$|system.ini$|win.ini$">%WINDIR%</directories>
 
     <directories recursion_level="0" restrict="at.exe$|attrib.exe$|cacls.exe$|cmd.exe$|eventcreate.exe$|ftp.exe$|lsass.exe$|net.exe$|net1.exe$|netsh.exe$|reg.exe$|regedt32.exe|regsvr32.exe|runas.exe|sc.exe|schtasks.exe|sethc.exe|subst.exe$">%WINDIR%\SysNative</directories>
     <directories recursion_level="0">%WINDIR%\SysNative\drivers\etc</directories>
     <directories recursion_level="0" restrict="WMIC.exe$">%WINDIR%\SysNative\wbem</directories>
     <directories recursion_level="0" restrict="powershell.exe$">%WINDIR%\SysNative\WindowsPowerShell\v1.0</directories>
     <directories recursion_level="0" restrict="winrm.vbs$">%WINDIR%\SysNative</directories>
 
     <!-- 32-bit programs. -->
     <directories recursion_level="0" restrict="at.exe$|attrib.exe$|cacls.exe$|cmd.exe$|eventcreate.exe$|ftp.exe$|lsass.exe$|net.exe$|net1.exe$|netsh.exe$|reg.exe$|regedit.exe$|regedt32.exe$|regsvr32.exe$|runas.exe$|sc.exe$|schtasks.exe$|sethc.exe$|subst.exe$">%WINDIR%\System32</directories>
     <directories recursion_level="0">%WINDIR%\System32\drivers\etc</directories>
     <directories recursion_level="0" restrict="WMIC.exe$">%WINDIR%\System32\wbem</directories>
     <directories recursion_level="0" restrict="powershell.exe$">%WINDIR%\System32\WindowsPowerShell\v1.0</directories>
     <directories recursion_level="0" restrict="winrm.vbs$">%WINDIR%\System32</directories>
 
     <directories realtime="yes">%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\Startup</directories>
 
     <ignore>%PROGRAMDATA%\Microsoft\Windows\Start Menu\Programs\Startup\desktop.ini</ignore>
 
     <ignore type="sregex">.log$|.htm$|.jpg$|.png$|.chm$|.pnf$|.evtx$</ignore>
 
     <!-- Windows registry entries to monitor. -->
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\batfile</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\cmdfile</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\comfile</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\exefile</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\piffile</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\AllFilesystemObjects</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\Directory</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Classes\Folder</windows_registry>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Classes\Protocols</windows_registry>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Policies</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Security</windows_registry>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Internet Explorer</windows_registry>
 
     <windows_registry>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\KnownDLLs</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\SecurePipeServers\winreg</windows_registry>
 
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run</windows_registry>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnce</windows_registry>
     <windows_registry>HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnceEx</windows_registry>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\URL</windows_registry>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies</windows_registry>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Windows</windows_registry>
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\Winlogon</windows_registry>
 
     <windows_registry arch="both">HKEY_LOCAL_MACHINE\Software\Microsoft\Active Setup\Installed Components</windows_registry>
 
     <!-- Windows registry entries to ignore. -->
     <registry_ignore>HKEY_LOCAL_MACHINE\Security\Policy\Secrets</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\Security\SAM\Domains\Account\Users</registry_ignore>
     <registry_ignore type="sregex">\Enum$</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\AppCs</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\DHCP</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\IPTLSIn</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\IPTLSOut</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\RPC-EPMap</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\MpsSvc\Parameters\PortKeywords\Teredo</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\PolicyAgent\Parameters\Cache</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnceEx</registry_ignore>
     <registry_ignore>HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\ADOVMPPackage\Final</registry_ignore>
 
     <!-- Frequency for ACL checking (seconds) -->
     <windows_audit_interval>60</windows_audit_interval>
 
     <!-- Nice value for Syscheck module -->
     <process_priority>10</process_priority>
 
     <!-- Maximum output throughput -->
     <max_eps>100</max_eps>
 
     <!-- Database synchronization settings -->
     <synchronization>
       <enabled>yes</enabled>
       <interval>5m</interval>
       <max_interval>1h</max_interval>
       <max_eps>10</max_eps>
     </synchronization>
   </syscheck>
