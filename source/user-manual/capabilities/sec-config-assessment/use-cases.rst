.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Follow a use case to see how Wazuh runs SCA checks and reports their results in this section of the documentation.

Use cases
=========

The following use cases create custom SCA policies on Ubuntu, Windows, and macOS endpoints. The results of a new policy appear in the **Inventory** tab at the next SCA synchronization, usually 5 to 15 minutes after a restart. A finding appears in the **Findings** tab when a check result changes in a later scan. To confirm that the synchronization ran, look for ``SCA synchronization finished successfully`` in the Wazuh agent log.

Prerequisites
-------------

You need the following deployment to test the use cases:

- A Wazuh manager: Follow the instructions in the :doc:`quickstart guide </quickstart>` to set up a Wazuh manager.
- Monitored endpoint(s): One or more of the following endpoints, each with a :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` enrolled to the Wazuh manager:

  - An Ubuntu 24.04 endpoint.
  - A Windows 11 endpoint.
  - A macOS 12 endpoint.

.. _detecting_keyword_in_a_file:

Detecting a keyword in a file
-----------------------------

This use case detects a keyword in a file. The policy checks ``testfile.txt`` for the line ``password_enabled: yes`` and marks the check as **Failed** if it finds it.

Ubuntu endpoint
^^^^^^^^^^^^^^^

Take the following steps on your Ubuntu endpoint to create the file ``/usr/share/testfile.txt`` and monitor it with the Wazuh SCA module:

#. Create the test file with the keyword ``password_enabled: yes``:

   .. code-block:: console

      # printf "config_file\nsecond line of configuration\npassword_enabled: yes\n" > /usr/share/testfile.txt

#. Verify that the file has been created:

   .. code-block:: console

      # cat /usr/share/testfile.txt

   The output is similar to the following:

   .. code-block:: console
      :class: output

      config_file
      second line of configuration
      password_enabled: yes

#. Create a new directory to save your custom policy files:

   .. code-block:: console

      # mkdir /var/ossec/etc/custom-sca-files/

#. Create a new SCA policy file ``/var/ossec/etc/custom-sca-files/keywordcheck.yml`` and add the following content to it:

   .. code-block:: YAML

      policy:
        id: "keyword_check"
        file: "keywordcheck.yml"
        name: "SCA use case: Keyword check"
        description: "Guidance for checking for a keyword or phrase in files on Ubuntu endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/how-to-configure.html#creating-custom-sca-policies

      requirements:
        name: "Check that the desired file exists on the monitored endpoints"
        description: "Requirements for running the SCA scans against endpoints with testfile.txt on them."
        condition: any
        rules:
          - 'f:/usr/share/testfile.txt'

      checks:
        - id: 100000
          name: "Ensure password is disabled in the test configuration file"
          description: "Password is enabled in the test configuration file."
          rationale: "Password is considered weak for the custom test application. Threat actors can brute-force your password."
          remediation: "Disable password by setting the value of the password_enabled option to no."
          condition: none
          rules:
            - 'f:/usr/share/testfile.txt -> r:^password_enabled: yes$'


   - The requirement ensures that the policy runs only if the file ``/usr/share/testfile.txt`` exists on the endpoint.
   - Check ID ``100000`` scans the file ``/usr/share/testfile.txt`` to find a line that is exactly ``password_enabled: yes``. The ``none`` condition ensures that the check fails if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/var/ossec/etc/ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">/var/ossec/etc/custom-sca-files/keywordcheck.yml</policy>
           </policies>
         </sca>

#. Restart the Wazuh agent to apply the changes and to run the new SCA check:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration Assessment** > **Inventory** and select the Ubuntu endpoint to view the custom SCA check result. Check ``100000`` shows **Failed** because the file contains the phrase.

  .. thumbnail:: /images/sca/ubuntu-sca-check-results.png
     :title: Ubuntu results of the custom SCA check
     :alt: Ubuntu results of the custom SCA check
     :align: center
     :width: 80%

To clean up the endpoint, remove the ``<sca>`` block added to ``/var/ossec/etc/ossec.conf``. Then delete the test file and the policy file, and restart the Wazuh agent:

.. code-block:: console

   # rm /usr/share/testfile.txt /var/ossec/etc/custom-sca-files/keywordcheck.yml
   # systemctl restart wazuh-agent

Windows endpoint
^^^^^^^^^^^^^^^^

Take the following steps on your Windows endpoint to create the file ``C:\Program Files\testfile.txt`` and monitor it with the Wazuh SCA module:

#. Run PowerShell as an administrator and create the test file with the keyword ``password_enabled: yes``:

   .. code-block:: pwsh-session

      > New-Item "C:\Program Files\testfile.txt" -ItemType File -Value "config_file`nsecond line of configuration`npassword_enabled: yes"

#. Verify that the file has been created:

   .. code-block:: pwsh-session

      > Get-Content "C:\Program Files\testfile.txt"

   The output is similar to the following:

   .. code-block:: console
      :class: output

      config_file
      second line of configuration
      password_enabled: yes

#. Create a new directory to save your custom policy files:

   .. code-block:: pwsh-session

      > New-Item "C:\Program Files (x86)\ossec-agent\custom-sca-files" -itemType Directory

#. Open Notepad as an administrator, create a new SCA policy file with the following content and save it as ``C:\Program Files (x86)\ossec-agent\custom-sca-files\keywordcheck.yml``:

   .. code-block:: YAML

      policy:
        id: "keyword_check_windows"
        file: "keywordcheck.yml"
        name: "SCA use case: Keyword check"
        description: "Guidance for checking for a keyword or phrase in files on Windows."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/how-to-configure.html#creating-custom-sca-policies
      requirements:
        name: "Check that the desired file exists on the monitored endpoints"
        description: "Requirements for running the SCA scans against endpoints with testfile.txt on them."
        condition: any
        rules:
          - 'f:C:\Program Files\testfile.txt'
      checks:
        - id: 100001
          name: "Ensure password is disabled in the test configuration file"
          description: "Password is enabled in the test configuration file."
          rationale: "Password is considered weak for the custom test application. Threat actors can brute-force your password."
          remediation: "Disable password by setting the value of the password_enabled option to no."
          condition: none
          rules:
            - 'f:C:\Program Files\testfile.txt -> r:^password_enabled: yes$'


   - The requirement ensures that the policy runs only if the file ``C:\Program Files\testfile.txt`` exists on the endpoint.
   - Check ID ``100001`` scans the file ``C:\Program Files\testfile.txt`` to find a line that is exactly ``password_enabled: yes``. The ``none`` condition ensures that the check fails if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">C:\Program Files (x86)\ossec-agent\custom-sca-files\keywordcheck.yml</policy>
           </policies>
         </sca>

#. Restart the Wazuh agent to apply the changes and to run the new SCA check:

   .. code-block:: pwsh-session

      > Restart-Service -Name WazuhSvc

#. On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration Assessment** > **Inventory** and select the Windows endpoint to view the custom SCA check result. Check ``100001`` shows **Failed** because the file contains the phrase.

  .. thumbnail:: /images/sca/windows-sca-check-results.png
     :title: Windows results of the custom SCA check
     :alt: Windows results of the custom SCA check
     :align: center
     :width: 80%

To clean up the endpoint, remove the ``<sca>`` block added to ``C:\Program Files (x86)\ossec-agent\ossec.conf``. Then run PowerShell as an administrator to delete the test file and the policy file, and restart the Wazuh agent:

.. code-block:: pwsh-session

   > Remove-Item "C:\Program Files\testfile.txt", "C:\Program Files (x86)\ossec-agent\custom-sca-files\keywordcheck.yml"
   > Restart-Service -Name WazuhSvc

macOS endpoint
^^^^^^^^^^^^^^

Take the following steps on your macOS endpoint to create the file ``/usr/local/testfile.txt`` and monitor it with the Wazuh SCA module:

#. Create the test file with the keyword ``password_enabled: yes``:

   .. code-block:: console

      # printf "config_file\nsecond line of configuration\npassword_enabled: yes\n" > /usr/local/testfile.txt

#. Verify that the file has been created:

   .. code-block:: console

      # cat /usr/local/testfile.txt

   The output is similar to the following:

   .. code-block:: console
      :class: output

      config_file
      second line of configuration
      password_enabled: yes

#. Create a new directory to save your custom policy files:

   .. code-block:: console

      # mkdir /Library/Ossec/etc/custom-sca-files/

#. Create a new SCA policy file ``/Library/Ossec/etc/custom-sca-files/keywordcheck.yml`` and add the following content to it:

   .. code-block:: YAML

      policy:
        id: "keyword_check"
        file: "keywordcheck.yml"
        name: "SCA use case: Keyword check"
        description: "Guidance for checking for a keyword or phrase in files on macOS endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/how-to-configure.html#creating-custom-sca-policies

      requirements:
        name: "Check that the desired file exists on the monitored endpoints"
        description: "Requirements for running the SCA scans against endpoints with testfile.txt on them."
        condition: any
        rules:
          - 'f:/usr/local/testfile.txt'

      checks:
        - id: 100002
          name: "Ensure password is disabled in the test configuration file"
          description: "Password is enabled in the test configuration file."
          rationale: "Password is considered weak for the custom test application. Threat actors can brute-force your password."
          remediation: "Disable password by setting the value of the password_enabled option to no."
          condition: none
          rules:
            - 'f:/usr/local/testfile.txt -> r:^password_enabled: yes$'


   - The requirement ensures that the policy runs only if the file ``/usr/local/testfile.txt`` exists on the endpoint.
   - Check ID ``100002`` scans the file ``/usr/local/testfile.txt`` to find a line that is exactly ``password_enabled: yes``. The ``none`` condition ensures that the check fails if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/Library/Ossec/etc/ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">/Library/Ossec/etc/custom-sca-files/keywordcheck.yml</policy>
           </policies>
         </sca>

#. Restart the Wazuh agent to apply the changes and to run the new SCA check:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control restart

#. On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration Assessment** > **Inventory** and select the macOS endpoint to view the custom SCA check result. Check ``100002`` shows **Failed** because the file contains the phrase.

  .. thumbnail:: /images/sca/macos-sca-check-results.png
     :title: macOS results of the custom SCA check
     :alt: macOS results of the custom SCA check
     :align: center
     :width: 80%

To clean up the endpoint, remove the ``<sca>`` block added to ``/Library/Ossec/etc/ossec.conf``. Then delete the test file and the policy file, and restart the Wazuh agent:

.. code-block:: console

   # rm /usr/local/testfile.txt /Library/Ossec/etc/custom-sca-files/keywordcheck.yml
   # /Library/Ossec/bin/wazuh-control restart

.. _detecting_a_running_process:

Detecting a running process
---------------------------

This use case shows how to detect running processes with the Wazuh SCA module.

Ubuntu endpoint
^^^^^^^^^^^^^^^

Netcat is a networking utility that can open connections, transfer data, and listen on TCP and UDP ports. Because it can be used to establish backdoor access or unauthorized network listeners, threat actors often abuse it after compromising a system.

The following steps show how to configure the Wazuh SCA module to detect running Netcat processes and simulate this activity:

#. Create a new directory to save your custom policy files:

   .. code-block:: console

      # mkdir -p /var/ossec/etc/custom-sca-files/

#. Create a new SCA policy file ``/var/ossec/etc/custom-sca-files/processcheck.yml`` and add the following content to it:

   .. code-block:: YAML

      policy:
        id: "process_check"
        file: "processcheck.yml"
        name: "SCA use case to detect running processes"
        description: "Guidance for checking running processes on Linux endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/how-to-configure.html#creating-custom-sca-policies

      requirements:
        name: "Check that the SSH service and password-related files are present on the system"
        description: "Requirements for running the SCA scan against the Unix based systems policy."
        condition: any
        rules:
          - "f:$sshd_file"
          - "f:/etc/passwd"
          - "f:/etc/shadow"

      variables:
        $sshd_file: /etc/ssh/sshd_config

      checks:
        - id: 100003
          name: "Ensure that netcat is not running on your endpoint"
          description: "Netcat is running on your endpoint."
          rationale: "Threat actors can use netcat to open ports on your endpoints or to connect to remote servers."
          remediation: "Kill the netcat process if confirmed to be malicious after further investigation."
          condition: none
          rules:
            - 'p:nc'
            - 'p:netcat'


   - The requirement limits the policy to Unix-like endpoints that have ``/etc/ssh/sshd_config``, ``/etc/passwd``, or ``/etc/shadow``. macOS endpoints also have these files. On macOS endpoints, use the policy in the macOS endpoint section instead.
   - Check ID ``100003`` scans the endpoint for processes named ``nc`` or ``netcat``. The ``none`` condition ensures that the check fails if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/var/ossec/etc/ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">/var/ossec/etc/custom-sca-files/processcheck.yml</policy>
           </policies>
         </sca>

#. Install ``netcat`` if you don't have it on your endpoint:

   .. code-block:: console

      # apt install netcat-openbsd

#. Run ``netcat`` in a new terminal and let the listener run:

   .. code-block:: console

      # netcat -l 4444

#. Restart the Wazuh agent to apply the changes and to run the new SCA check:

   .. code-block:: console

      # systemctl restart wazuh-agent

#. On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration Assessment** > **Inventory** and select the Ubuntu endpoint to view the custom SCA check result. Check ``100003`` shows **Failed** while netcat is running.

  .. thumbnail:: /images/sca/ubuntu-sca-use-case.png
     :title: Detecting a running process on Ubuntu
     :alt: Detecting a running process on Ubuntu
     :align: center
     :width: 80%

To clean up the endpoint, stop the netcat listener. Remove the ``<sca>`` block added to ``/var/ossec/etc/ossec.conf``. Then delete the policy file and restart the Wazuh agent:

.. code-block:: console

   # rm /var/ossec/etc/custom-sca-files/processcheck.yml
   # systemctl restart wazuh-agent

Windows endpoint
^^^^^^^^^^^^^^^^

Standard users rarely run PowerShell, but threat actors often use it in living-off-the-land attacks. Take the following steps to detect PowerShell processes:

#. Create the ``custom-sca-files`` directory for your custom policy files if it doesn't exist. Run the command in CMD as an administrator:

   .. code-block:: powershell

      > mkdir "C:\Program Files (x86)\ossec-agent\custom-sca-files"

#. Open Notepad as an administrator, create a new SCA policy file with the following content and save it as ``C:\Program Files (x86)\ossec-agent\custom-sca-files\processcheck.yml``:


   .. code-block:: YAML

      policy:
        id: "process_check"
        file: "processcheck.yml"
        name: "SCA use case to detect running processes"
        description: "Guidance for checking running PowerShell processes on Windows 10 and Windows 11 endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/how-to-configure.html#creating-custom-sca-policies

      requirements:
        name: "Check that the Windows platform is Windows 10"
        description: "Requirements to check if it's a Windows 10 (or Windows 11) machine"
        condition: all
        rules:
          - 'r:HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion -> ProductName -> r:^Windows 10'

      checks:
        - id: 100004
          name: "Ensure PowerShell is not running on the endpoint"
          description: "PowerShell is running on the endpoint."
          rationale: "PowerShell should be used by only the system administrators. Threat actors can leverage PowerShell for living-off-the-land attacks."
          remediation: "Disable PowerShell for non-admins."
          condition: none
          rules:
            - 'p:powershell.exe'


   - The requirement limits the policy to Windows 10 and Windows 11 endpoints. It checks the registry key ``HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion`` for the value ``Windows 10``. On Windows 11, ``ProductName`` still starts with ``Windows 10``, for example, ``Windows 10 Pro``. The requirement matches both.
   - Check ID ``100004`` scans the endpoint for processes named ``powershell.exe``. The ``none`` condition ensures that the check fails if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``C:\Program Files (x86)\ossec-agent\ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">C:\Program Files (x86)\ossec-agent\custom-sca-files\processcheck.yml</policy>
           </policies>
         </sca>

#. Open a second command prompt and run the following command to spawn a hidden PowerShell process that sleeps for 300 seconds:

   .. code-block:: powershell

      > powershell -windowstyle hidden -command Start-Sleep -Seconds 300

   .. note::

      The ``-windowstyle hidden`` option hides the PowerShell window, and the process keeps running for 300 seconds. Restart the Wazuh agent within these 5 minutes. The SCA scan at startup then finds the PowerShell process.

#. Run the following command in PowerShell as an administrator to restart the Wazuh agent:

   .. code-block:: pwsh-session

      > Restart-Service -Name WazuhSvc

#. On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration Assessment** > **Inventory** and select the Windows endpoint to view the custom SCA check result. Check ``100004`` shows **Failed** while the PowerShell process is running.

  .. thumbnail:: /images/sca/windows-sca-use-case.png
     :title: Detecting a running process on Windows
     :alt: Detecting a running process on Windows
     :align: center
     :width: 80%

To clean up the endpoint, remove the ``<sca>`` block added to ``C:\Program Files (x86)\ossec-agent\ossec.conf``. Then run PowerShell as an administrator to delete the policy file and restart the Wazuh agent:

.. code-block:: pwsh-session

   > Remove-Item "C:\Program Files (x86)\ossec-agent\custom-sca-files\processcheck.yml"
   > Restart-Service -Name WazuhSvc

macOS endpoint
^^^^^^^^^^^^^^

Netcat is a networking utility that can open connections, transfer data, and listen on TCP and UDP ports. Because it can be used to establish backdoor access or unauthorized network listeners, threat actors often abuse it after compromising a system.

The following steps show how to configure the Wazuh SCA module to detect running Netcat processes and simulate this activity:

#. Create a new directory to save your custom policy files:

   .. code-block:: console

      # mkdir -p /Library/Ossec/etc/custom-sca-files/

#. Create a new SCA policy file ``/Library/Ossec/etc/custom-sca-files/processcheck.yml`` and add the following content to it:

   .. code-block:: YAML

      policy:
        id: "process_check"
        file: "processcheck.yml"
        name: "SCA use case to detect running processes"
        description: "Guidance for checking running processes on mac endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/how-to-configure.html#creating-custom-sca-policies

      requirements:
        name: "Check macOS"
        description: "Requirements to verify that the endpoint is macOS."
        condition: any
        rules:
          - 'c:sw_vers -> r:^ProductName:\t*\s*macOS'

      checks:
        - id: 100005
          name: "Ensure that netcat is not running on your endpoint"
          description: "Netcat is running on your endpoint."
          rationale: "Threat actors can use netcat to open ports on your endpoints or to connect to remote servers."
          remediation: "Kill the netcat process if confirmed to be malicious after further investigation."
          condition: none
          rules:
            - 'c:sh -c "ps -e -o command | grep -E \"^(nc|netcat) .*((-.*l.+[0-9]{1,5})|([0-9]{1,5}.*-.*l))\"" -> r:nc'


   - The requirement ensures that the policy runs only on macOS endpoints. The requirement runs the ``sw_vers`` command to check if the output contains the string ``ProductName: macOS``.
   - Check ID ``100005`` lists the running processes with ``ps`` and filters them with ``grep``. The regular expression matches ``nc``, or ``netcat`` started with the ``-l`` (listen) option and a port number. The ``none`` condition makes the check fail if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/Library/Ossec/etc/ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">/Library/Ossec/etc/custom-sca-files/processcheck.yml</policy>
           </policies>
         </sca>

#. Run ``netcat`` in a new terminal and let the listener run:

   .. code-block:: console

      # nc -l 4444

#. Restart the Wazuh agent to apply the changes and to run the new SCA check:

   .. code-block:: console

      # /Library/Ossec/bin/wazuh-control restart

#. On the Wazuh dashboard, navigate to **Endpoint security** > **Configuration Assessment** > **Inventory** and select the macOS endpoint to view the custom SCA check result. Check ``100005`` shows **Failed** while netcat is running.

  .. thumbnail:: /images/sca/macos-sca-use-case.png
     :title: Detecting a running process on macOS
     :alt: Detecting a running process on macOS
     :align: center
     :width: 80%

To clean up the endpoint, stop the netcat listener with Ctrl+C. Remove the ``<sca>`` block that you added to ``/Library/Ossec/etc/ossec.conf``. Then delete the policy file and restart the Wazuh agent:

.. code-block:: console

   # rm /Library/Ossec/etc/custom-sca-files/processcheck.yml
   # /Library/Ossec/bin/wazuh-control restart

