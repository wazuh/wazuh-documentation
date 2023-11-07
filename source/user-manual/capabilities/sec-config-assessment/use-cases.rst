.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Follow a use case to see how Wazuh runs SCA checks and triggers alerts in this section of the documentation.

Use cases
=========

This section shows some custom SCA use cases for various operating systems. We provide detailed steps on how to replicate these use cases. 

Prerequisites
-------------

You need the following deployment to test the use cases defined in this section:

- A Wazuh server: Follow the instructions in our :doc:`quickstart guide </quickstart>` to set up a Wazuh server.
- Monitored endpoint(s): Deploy any or all of the following endpoints, install a :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` on each of them and enroll them to the Wazuh server.

  - An Ubuntu 22.04 endpoint.
  - A Windows 11 endpoint.
  - A macOS 12 endpoint.

The use cases covered in this section include :ref:`Detecting keyword in a file <detecting_keyword_in_a_file>` and :ref:`Detecting a running process <detecting_a_running_process>`. 

.. _detecting_keyword_in_a_file:

Detecting keyword in a file
---------------------------

In this use case, we demonstrate how you can configure Wazuh SCA to detect the presence of a keyword in a file. We monitor a file ``testfile.txt`` for the phrase ``password_enabled: yes``. The Wazuh SCA module triggers an alert when it detects the pattern in the file.

Ubuntu endpoint
^^^^^^^^^^^^^^^

Take the following steps on your Ubuntu endpoint to create the file ``/usr/share/testfile.txt`` and monitor it with the Wazuh SCA module:

#. Create the test file and add some text to it, including the phrase ``password_enabled: yes``:

   .. code-block:: console

      # echo -e "config_file\nsecond line of configuration\npassword_enabled: yes" > /usr/share/testfile.txt

#. Verify that the file has been created:

   .. code-block:: console
   
      # cat /usr/share/testfile.txt

   You should get output similar to the following:


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
      :emphasize-lines: 13,14,15,23,24,25

      policy:
        id: "keyword_check"
        file: "keywordcheck.yml"
        name: "SCA use case: Keyword check"
        description: "Guidance for checking for a keyword or phrase in files on Ubuntu endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/creating-custom-policies.html

      requirements:
        title: "Check that the desired file exists on the monitored endpoints"
        description: "Requirements for running the SCA scans against endpoints with testfile.txt on them."
        condition: any
        rules:
          - 'f:/usr/share/testfile.txt'

      checks:
        - id: 10000
          title: "Ensure password is disabled in the test configuration file"
          description: "Password is enabled in the test configuration file."
          rationale: "Password is considered weak for the custom test application. Threat actors can brute-force your password."
          remediation: "Disable password by setting the value of the password_enabled option to no."
          condition: none
          rules:
            - 'f:/usr/share/testfile.txt -> r:^password_enabled: yes$'


   - We create a requirement to ensure that the policy runs only if the file ``/usr/share/testfile.txt`` exists on the endpoint.
   - Check ID ``10000`` scans the file ``/usr/share/testfile.txt`` to find any line that contains the string ``password_enabled: yes``. The ``none`` condition ensures that the check fails if a match is found.

#. Change the ownership of the file so Wazuh has permission to it:

   .. code-block:: console
   
      # chown wazuh:wazuh /var/ossec/etc/custom-sca-files/keywordcheck.yml

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

#. On your Wazuh dashboard, navigate to the **Configuration Assessment** module and select the Ubuntu endpoint to view the results of the custom SCA check you have created.

  .. thumbnail:: /images/sca/ubuntu-sca-check-results.png
     :title: Ubuntu results of the custom SCA check
     :alt: Ubuntu results of the custom SCA check
     :align: center
     :width: 80%

Windows endpoint
^^^^^^^^^^^^^^^^

Take the following steps on your Ubuntu endpoint to create the file ``C:\Program Files\testfile.txt`` and monitor it with the Wazuh SCA module:

#. Run PowerShell as an administrator and create the test file and add some text to it, including the keyword ``password_enabled: yes``:

   .. code-block:: console
   
      # New-Item "C:\Program Files\testfile.txt" -ItemType File -Value "config_file`nsecond line of configuration`npassword_enabled: yes"

#. Verify that the file has been created:

   .. code-block:: console
   
      # Get-Content "C:\Program Files\testfile.txt"

   You should get output similar to the following:

   .. code-block:: console
      :class: output

      config_file
      second line of configuration
      password_enabled: yes

#. Create a new directory to save your custom policy files:

   .. code-block:: console
   
      # New-Item "C:\Program Files (x86)\ossec-agent\custom-sca-files" -itemType Directory

#. Open Notepad as an administrator, create a new SCA policy file with the following content and save it as ``C:\Program Files (x86)\ossec-agent\custom-sca-files\keywordcheck.yml``:

   .. code-block:: YAML
      :emphasize-lines: 12,13,14,21,22,23

      policy:
        id: "keyword_check_windows"
        file: "keywordcheck.yml"
        name: "SCA use case: Keyword check"
        description: "Guidance for checking for a keyword or phrase in files on Windows."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/creating-custom-policies.html
      requirements:
        title: "Check that the desired file exists on the monitored endpoints"
        description: "Requirements for running the SCA scans against endpoints with testfile.txt on them."
        condition: any
        rules:
          - 'f:C:\Program Files\testfile.txt'
      checks:
        - id: 10001
          title: "Ensure password is disabled in the test configuration file"
          description: "Password is enabled in the test configuration file."
          rationale: "Password is considered weak for the custom test application. Threat actors can brute-force your password."
          remediation: "Disable password by setting the value of the password_enabled option to no."
          condition: none
          rules:
            - 'f:C:\Program Files\testfile.txt -> r:^password_enabled: yes$'


   - We create a requirement to ensure that the policy runs only if the file ``C:\Program Files\testfile.txt`` exists on the endpoint.
   - Check ID ``10001`` scans the file ``C:\Program Files\testfile.txt`` to find any line that contains the string ``password_enabled: yes``. The ``none`` condition ensures that the check fails if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/var/ossec/etc/ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">C:\Program Files (x86)\ossec-agent\custom-sca-files\keywordcheck.yml</policy>
           </policies>
         </sca>

#. Restart the Wazuh agent to apply the changes and to run the new SCA check:

   .. code-block:: console
   
      # Restart-Service -Name wazuh

#. On your Wazuh dashboard, navigate to the **Configuration Assessment** module and select the Windows endpoint to view the results of the custom SCA check you have created.

  .. thumbnail:: /images/sca/windows-sca-check-results.png
     :title: Windows results of the custom SCA check
     :alt: Windows results of the custom SCA check
     :align: center
     :width: 80%

macOS endpoint
^^^^^^^^^^^^^^

Take the following steps on your macOS endpoint to create the file ``/usr/local/testfile.txt`` and monitor it with the Wazuh SCA module:

#. Create the test file and add some text to it, including the phrase ``password_enabled: yes``:

   .. code-block:: console
   
      # echo "config_file\nsecond line of configuration\npassword_enabled: yes" > /usr/local/testfile.txt

#. Verify that the file has been created:

   .. code-block:: console
   
      # cat /usr/local/testfile.txt

   You should get output similar to the following:

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
      :emphasize-lines: 13,14,15,23,24,25
      
      policy:
        id: "keyword_check"
        file: "keywordcheck.yml"
        name: "SCA use case: Keyword check"
        description: "Guidance for checking for a keyword or phrase in files on macOS endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/creating-custom-policies.html

      requirements:
        title: "Check that the desired file exists on the monitored endpoints"
        description: "Requirements for running the SCA scans against endpoints with testfile.txt on them."
        condition: any
        rules:
          - 'f:/usr/local/testfile.txt'

      checks:
        - id: 10002
          title: "Ensure password is disabled in the test configuration file"
          description: "Password is enabled in the test configuration file."
          rationale: "Password is considered weak for the custom test application. Threat actors can brute-force your password."
          remediation: "Disable password by setting the value of the password_enabled option to no."
          condition: none
          rules:
            - 'f:/usr/local/testfile.txt -> r:^password_enabled: yes$'


   - We create a requirement to ensure that the policy runs only if the file ``/usr/local/testfile.txt`` exists on the endpoint.
   - Check ID ``10002`` scans the file ``/usr/local/testfile.txt`` to find any line that contains the string ``password_enabled: yes``. The ``none`` condition ensures that the check fails if a match is found.
      
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

#. On your Wazuh dashboard, navigate to the **Configuration Assessment** module and select the macOS endpoint to view the results of the custom SCA check you have created.

  .. thumbnail:: /images/sca/macos-sca-check-results.png
     :title: macOS results of the custom SCA check
     :alt: macOS results of the custom SCA check
     :align: center
     :width: 80%

.. _detecting_a_running_process:

Detecting a running process
---------------------------

In this use case, we demonstrate how to detect running processes with the Wazuh SCA module.

Ubuntu endpoint
^^^^^^^^^^^^^^^

Netcat is a utility that uses TCP and UDP to read and write data on an IP network. Netcat can open connections, send packets, or listen on TCP and UDP ports. Threat actors use netcat for malicious purposes such as creating backdoor access. Take the following steps to configure the Wazuh SCA module to detect netcat processes and to simulate an attack:

#. Create a new directory to save your custom policy files:

   .. code-block:: console
   
      # mkdir /var/ossec/etc/custom-sca-files/

#. Create a new SCA policy file ``/var/ossec/etc/custom-sca-files/processcheck.yml`` and add the following content to it:

   .. code-block:: YAML
      :emphasize-lines: 13,14,15,16,17,19,20,28,29,30,31

      policy:
        id: "process_check"
        file: "processcheck.yml"
        name: "SCA use case to detect running processes"
        description: "Guidance for checking running processes on Linux endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/creating-custom-policies.html

      requirements:
        title: "Check that the SSH service and password-related files are present on the system"
        description: "Requirements for running the SCA scan against the Unix based systems policy."
        condition: any
        rules:
          - "f:$sshd_file"
          - "f:/etc/passwd"
          - "f:/etc/shadow"

      variables:
        $sshd_file: /etc/ssh/sshd_config

      checks:
        - id: 10003
          title: "Ensure that netcat is not running on your endpoint"
          description: "Netcat is running on your endpoint."
          rationale: "Threat actors can use netcat to open ports on your endpoints or to connect to remote servers."
          remediation: "Kill the netcat process if confirmed to be malicious after further investigation."
          condition: none
          rules:
            - 'p:nc'
            - 'p:netcat'


   - We create a requirement to ensure that the policy runs only on Linux endpoints. The requirement checks for the presence of the ``/etc/ssh/sshd_config``, ``/etc/passwd``, and ``/etc/shadow`` files, and passes if any of them is found.
   - Check ID ``10003`` scans the endpoint for processes named ``nc`` or ``netcat``. The ``none`` condition ensures that the check fails if a match is found.

#. Change the ownership of the file so Wazuh has permission to it:

   .. code-block:: console
   
      # chown wazuh:wazuh /var/ossec/etc/custom-sca-files/processcheck.yml

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/var/ossec/etc/ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">/var/ossec/etc/custom-sca-files/processcheck.yml</policy>
           </policies>
         </sca>

#. Install netcat if you don’t have it on your endpoint:

   .. code-block:: console
   
      # apt install netcat

#. Run netcat on a new terminal and let the listener run:

   .. code-block:: console
   
      # netcat -l 4444

#. Restart the Wazuh agent to apply the changes and to run the new SCA check:

   .. code-block:: console
   
      # systemctl restart wazuh-agent

#. On your Wazuh dashboard, navigate to the **Configuration Assessment** module and select the Ubuntu endpoint to view the results of the custom SCA check you have created.

  .. thumbnail:: /images/sca/ubuntu-sca-use-case.png
     :title: Ubuntu Configuration Assessment use case to detect running processes
     :alt: Ubuntu Configuration Assessment use case to detect running processes
     :align: center
     :width: 80%     

Windows endpoint
^^^^^^^^^^^^^^^^

System administrators use PowerShell to configure systems. Standard users utilize PowerShell less frequently. Threat actors may take advantage of the living-off-the-land attack tactic via PowerShell. Take the following steps to configure the Wazuh SCA module to detect PowerShell processes and simulate an attack:

#. Run CMD as an administrator and create a new directory to save your custom policy files:

   .. code-block:: console
   
      > mkdir "C:\Program Files (x86)\ossec-agent\custom-sca-files"

#. Open Notepad as an administrator, create a new SCA policy file with the following content and save it as ``C:\Program Files (x86)\ossec-agent\custom-sca-files\processcheck.yml``:


   .. code-block:: YAML
      :emphasize-lines: 13,14,15,23,24,25

      policy:
        id: "process_check"
        file: "processcheck.yml"
        name: "SCA use case to detect running processes"
        description: "Guidance for checking running PowerShell processes on Windows 10 endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/creating-custom-policies.html

      requirements:
        title: "Check that the Windows platform is Windows 10"
        description: "Requirements to check if it's a Windows 10 (or Windows 11) machine"
        condition: all
        rules:
          - 'r:HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion -> ProductName -> r:^Windows 10'

      checks:
        - id: 10004
          title: "Ensure PowerShell is not running on the endpoint"
          description: "PowerShell is running on the endpoint."
          rationale: "PowerShell should be used by only the system administrators. Threat actors can leverage PowerShell for living-off-the-land attacks."
          remediation: "Disable PowerShell for non-admins."
          condition: none
          rules:
            - 'p:powershell.exe'


   - We create a requirement to ensure that the policy runs only on Windows 10 endpoints. The requirement checks the registry key ``HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion`` for the value ``Windows 10``.
   - Check ID ``10004`` scans the endpoint for processes named ``powershell.exe``. The ``none`` condition ensures that the check fails if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/var/ossec/etc/ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">C:\Program Files (x86)\ossec-agent\custom-sca-files\processcheck.yml</policy>
           </policies>
         </sca>

#. Open a second command prompt and run the following command to spawn a hidden PowerShell process. This is a dummy Powershell process that sleeps for 300 seconds (5 minutes), enough time for you to restart the Wazuh agent for the SCA scan to run.

   .. code-block:: console
   
      > powershell -windowstyle hidden -command Start-Sleep -Seconds 300

   .. note::
      
      The command prompt closes after you run this command and PowerShell runs in the background.

#. Run the following commands on CMD as an Administrator to restart the Wazuh agent:

   .. code-block:: console
   
      > NET STOP Wazuh
      > NET START Wazuh

#. On your Wazuh dashboard, navigate to the **Configuration Assessment** module and select the Windows endpoint to view the results of the custom SCA check you have created.

  .. thumbnail:: /images/sca/windows-sca-use-case.png
     :title: Windows Configuration Assessment use case to detect running processes
     :alt: Windows Configuration Assessment use case to detect running processes
     :align: center
     :width: 80%

macOS endpoint
^^^^^^^^^^^^^^

Netcat is a utility that uses TCP and UDP to read and write data on an IP network. Netcat can open connections, send packets, or listen on TCP and UDP ports. Threat actors use netcat for malicious purposes such as creating backdoor access. Take the following steps to configure the Wazuh SCA module to detect netcat processes and to simulate an attack:

#. Create a new directory to save your custom policy files:

   .. code-block:: console
   
      # mkdir /Library/Ossec/etc/custom-sca-files/

#. Create a new SCA policy file ``/Library/Ossec/etc/custom-sca-files/processcheck.yml`` and add the following content to it:

   .. code-block:: YAML
      :emphasize-lines: 13,14,15,23,24,25

      policy:
        id: "process_check"
        file: "processcheck.yml"
        name: "SCA use case to detect running processes"
        description: "Guidance for checking running processes on mac endpoints."
        references:
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/index.html
          - https://documentation.wazuh.com/current/user-manual/capabilities/sec-config-assessment/creating-custom-policies.html

      requirements:
        title: "Check macOS"
        description: "Requirements to verify that the endpoint is macOS."
        condition: any
        rules:
          - 'c:sw_vers -> r:^ProductName:\t*\s*macOS'

      checks:
        - id: 10005
          title: "Ensure that netcat is not running on your endpoint"
          description: "Netcat is running on your endpoint."
          rationale: "Threat actors can use netcat to open ports on your endpoints or to connect to remote servers."
          remediation: "Kill the netcat process if confirmed to be malicious after further investigation."
          condition: none
          rules:
            - 'c:sh -c "ps -e -o command | grep -E \"^(nc|netcat) .*((-.*l.+[0-9]{1,5})|([0-9]{1,5}.*-.*l))\"" -> r:nc'


   - We create a requirement to ensure that the policy runs only on macOS endpoints. The requirement runs the ``sw_vers`` command to check if the output contains the string ``ProductName: macOS``.
   - Check ID ``10005`` runs a command which spawns a shell to run the ``ps`` utility to view all running processes. The command uses the ``grep`` utility to filter the output of the ``ps`` command for patterns of the netcat process. The ``none`` condition ensures that the check fails if a match is found.

#. Enable the policy file by adding the following lines to the ``<ossec_config>`` block of the Wazuh agent configuration file at ``/Library/Ossec/etc/ossec.conf``:

     .. code-block:: xml

         <sca>
           <policies>
             <policy enabled="yes">/Library/Ossec/etc/custom-sca-files/processcheck.yml</policy>
           </policies>
         </sca>

#. Run netcat on a new terminal and let the listener run:

   .. code-block:: console
   
      # nc -l 4444

#. Restart the Wazuh agent to apply the changes and to run the new SCA check:

   .. code-block:: console
   
      # /Library/Ossec/bin/wazuh-control restart

#. On your Wazuh dashboard, navigate to the **Configuration Assessment** module and select the macOS endpoint to view the results of the custom SCA check you have created.

  .. thumbnail:: /images/sca/macos-sca-use-case.png
     :title: macOS Configuration Assessment use case to detect running processes
     :alt: macOS Configuration Assessment use case to detect running processes
     :align: center
     :width: 80%

