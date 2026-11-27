.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps you meet FedRAMP security controls, with use cases for access control, audit, configuration management, incident response, risk assessment, and system integrity.

.. _fedramp:

Using Wazuh for FedRAMP compliance
==================================

The Federal Risk and Authorization Management Program (FedRAMP) standardizes the security assessment, authorization, and continuous monitoring of cloud products and services that U.S. federal agencies use. Cloud service providers implement the security controls of a FedRAMP baseline and document them for an authorization.

This document outlines use cases that show how Wazuh helps you meet FedRAMP security controls. Each section describes a control, explains how Wazuh supports it, and shows one or more use cases with step-by-step instructions.

.. note::

   These rules and mappings are indicative and do not by themselves certify compliance. See :doc:`Regulatory compliance </compliance/index>` for more details.

FedRAMP controls use the identifiers of NIST SP 800-53, such as AC-6 and SI-4. Wazuh rules map findings to these identifiers in the ``fedramp`` field.

The Wazuh FedRAMP dashboard
---------------------------

To view the FedRAMP data on the Wazuh dashboard:

#. Open the menu (☰), go to **Security operations** > **Regulatory Compliance**, and click the **FedRAMP** tab. The **Dashboard** tab shows an overview of the FedRAMP requirements in your environment, the most active agents, and the requirements over time.

   .. thumbnail:: /images/compliance/fedramp/fedramp-dashboard-tab.png
      :title: FedRAMP Dashboard tab
      :alt: FedRAMP Dashboard tab
      :align: center
      :width: 80%

#. Switch to the **Controls** tab to see how many findings map to each FedRAMP requirement in the selected time range. Turn on **Hide requirements with no findings** to list only the requirements that have findings.

   .. thumbnail:: /images/compliance/fedramp/fedramp-controls-tab.png
      :title: FedRAMP Controls tab
      :alt: FedRAMP Controls tab
      :align: center
      :width: 80%

#. Switch to the **Findings** tab to see the individual findings mapped to FedRAMP requirements, regardless of their log source. The **Requirements** column shows the requirements of each finding.

   .. thumbnail:: /images/compliance/fedramp/fedramp-findings-tab.png
      :title: FedRAMP Findings tab
      :alt: FedRAMP Findings tab
      :align: center
      :width: 80%

Mapping custom rules to FedRAMP requirements
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh rules and Security Configuration Assessment (SCA) policies map findings to FedRAMP requirements. You can also map custom rules to one or more requirements. In Wazuh 5.0, rules use the Sigma format. To map a custom rule, add the requirement identifiers to the ``fedramp`` list under the ``compliance`` field of the rule. For example:

.. code-block:: yaml

   compliance:
     fedramp:
       - AC-6
       - IR-4
       - SI-4

Refer to the :doc:`Rules </user-manual/data-analysis/rules>` section for more information. To create a custom rule and put it into production, see :ref:`Create a custom rule <data_analysis_create_custom_rule>`.

Access Control (AC)
-------------------

AC-2(4) Automated Audit Actions
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AC-2(4) requires you to automatically audit account creation, modification, enabling, disabling, and removal actions.

Wazuh helps meet AC-2(4) by reporting each new local account that the authentication log records.

Use case: Detecting new local user accounts
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh detects a new local account on an Ubuntu 24.04 endpoint and records the account creation as a finding.

Ubuntu endpoint
"""""""""""""""

#. Create a local user on the Ubuntu endpoint:

   .. code-block:: console

      $ sudo useradd -m -s /bin/bash -c "Contractor account" contractor01

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"New user account created" and user.target.name:contractor01

   One finding matches. It comes from the authentication log (``system-auth``), and the ``user.target.name`` field holds the name of the new account.

   .. thumbnail:: /images/compliance/fedramp/new-account-finding-query.png
      :title: Finding for the new local account
      :alt: Finding for the new local account
      :align: center
      :width: 80%

#. Expand the finding. The ``event.original`` field shows the ``useradd`` log line with the user name, user ID, home directory, and shell.

   .. thumbnail:: /images/compliance/fedramp/new-account-finding-details.png
      :title: Details of the new local account finding
      :alt: Details of the new local account finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.fedramp`` field. The finding maps to AC-2(4).

   .. thumbnail:: /images/compliance/fedramp/new-account-fedramp-mapping.png
      :title: FedRAMP mapping of the new local account finding
      :alt: FedRAMP mapping of the new local account finding
      :align: center
      :width: 80%

After you finish this use case, delete the test user on the Ubuntu endpoint:

.. code-block:: console

   $ sudo userdel -r contractor01

AC-6 Least Privilege
^^^^^^^^^^^^^^^^^^^^

AC-6 requires you to employ least privilege, allowing users and their processes only the access they need for their tasks.

Wazuh helps meet AC-6 by generating a finding for each command that a user runs with ``sudo`` on a monitored Linux endpoint. Each finding records the user, the target user, and the command.

Use case: Detecting privileged commands run with sudo
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh detects a user who reads the ``/etc/shadow`` file with ``sudo`` on an Ubuntu 24.04 endpoint. This file stores the password hashes of the local accounts.

Ubuntu endpoint
"""""""""""""""

#. Run the following command on the Ubuntu endpoint as a user with ``sudo`` rights:

   .. code-block:: console

      $ sudo head -1 /etc/shadow

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab.

#. Enter the following query in the search bar and press **Enter**:

   .. code-block:: none

      wazuh.integration.name:system-auth and process.command_line:*shadow*

   .. thumbnail:: /images/compliance/fedramp/sudo-command-query.png
      :title: Findings for the sudo command
      :alt: Findings for the sudo command
      :align: center
      :width: 80%

#. Expand the ``Sudo command executed`` finding. The ``event.original`` field shows the user who ran the command and the target user, and the ``process.command_line`` field shows the command.

   .. thumbnail:: /images/compliance/fedramp/sudo-command-details.png
      :title: Details of the sudo command finding
      :alt: Details of the sudo command finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.fedramp`` field. The finding maps to AC-6, AU-6, and IR-4.

   .. thumbnail:: /images/compliance/fedramp/sudo-command-fedramp-mapping.png
      :title: FedRAMP mapping of the sudo command finding
      :alt: FedRAMP mapping of the sudo command finding
      :align: center
      :width: 80%

AC-7 Unsuccessful Logon Attempts
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AC-7 requires you to limit consecutive invalid logon attempts and to act, such as by locking the account, when a user exceeds the limit.

Wazuh helps meet AC-7 with active responses. An active response runs a script on a monitored endpoint when Wazuh generates specific findings. For example, it can block the source IP address of an attack or lock a user account. You define an active response on the Wazuh dashboard and run it from an Alerting monitor.

Use case: Locking a local account under a password-guessing attack
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh locks a local account on a monitored Ubuntu 24.04 endpoint when someone tries to guess its password. Each failed login generates a ``Failed authentication attempt - <USERNAME>`` finding. The ``disable-account`` active response locks the password of the account in the ``user.name`` field of the finding. It locks the account on the first failed login. The Active Response monitor runs once for each finding, so it can't count failed attempts. To allow a set number of attempts before the lock, configure ``pam_faillock`` on the endpoint instead.

.. note::

   The ``disable-account`` active response locks the account of each matching finding, for any account on any Linux or macOS endpoint. Test this use case with a dedicated account in a test environment, and delete the monitor when you finish. You also need a second endpoint with SSH access to the Ubuntu endpoint to simulate the attack.

Ubuntu endpoint
"""""""""""""""

#. Create a test account named ``contractor02`` and set a password for it:

   .. code-block:: console

      $ sudo useradd -m -s /bin/bash contractor02
      $ sudo passwd contractor02

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Explore** > **Active Responses**.

#. Click **Create active response** and enter the following details. The ``disable-account`` executable is an out-of-the-box script that exists on every Wazuh agent. The **Local** location runs the script on the endpoint that generated the finding. The **Stateless** type runs the script once and never reverts its action.

   +----------------+------------------------+
   | **Field**      | **Value**              |
   +================+========================+
   | **Name**       | ``account_lockout_ar`` |
   +----------------+------------------------+
   | **Executable** | ``disable-account``    |
   +----------------+------------------------+
   | **Type**       | Stateless              |
   +----------------+------------------------+
   | **Location**   | Local                  |
   +----------------+------------------------+

   .. thumbnail:: /images/compliance/fedramp/create-account-lockout-active-response.png
      :title: Create the account lockout active response
      :alt: Create the account lockout active response
      :align: center
      :width: 80%

#. Click **Create** to save the active response.

#. Go to **Explore** > **Alerting**, switch to the **Monitors** tab, and then click **Create monitor**.

#. Fill in the following parameters. The **Active Response monitor** type runs the active response that you select in the **Actions** subsection when a finding matches the query. This filter selects failed login findings, such as those of the ``Failed authentication attempt - <USERNAME>`` rule. Don't filter on ``wazuh.rule.id``: rule IDs change when the Wazuh CTI ruleset is updated.

   +-----------------------------+---------------------------------------+
   | **Field**                   | **Value**                             |
   +=============================+=======================================+
   | **Monitor name**            | ``account_lockout_ar_monitor``        |
   +-----------------------------+---------------------------------------+
   | **Monitor type**            | Active Response monitor               |
   +-----------------------------+---------------------------------------+
   | **Monitor defining method** | Visual editor                         |
   +-----------------------------+---------------------------------------+
   | **Frequency**               | By interval                           |
   +-----------------------------+---------------------------------------+
   | **Run every**               | 1 Minute(s)                           |
   +-----------------------------+---------------------------------------+
   | **Index**                   | ``wazuh-findings-v5-system-activity`` |
   +-----------------------------+---------------------------------------+
   | **Query name**              | ``account_lockout_ar_query``          |
   +-----------------------------+---------------------------------------+
   | **Field**                   | ``event.action``                      |
   +-----------------------------+---------------------------------------+
   | **Operator**                | is                                    |
   +-----------------------------+---------------------------------------+
   | **Value**                   | ``authentication-failure``            |
   +-----------------------------+---------------------------------------+

   .. thumbnail:: /images/compliance/fedramp/account-lockout-monitor.png
      :title: Create the account lockout monitor
      :alt: Create the account lockout monitor
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters.

   +-----------------------------+--------------------------------+
   | **Field**                   | **Value**                      |
   +=============================+================================+
   | **Trigger name**            | ``account_lockout_ar_trigger`` |
   +-----------------------------+--------------------------------+
   | **Severity level**          | 1 (Highest)                    |
   +-----------------------------+--------------------------------+
   | **Specify queries or tags** | ``account_lockout_ar_query``   |
   +-----------------------------+--------------------------------+

#. In the **Actions** subsection, click **Add active response** and fill in the following parameters.

   +---------------------+-------------------------------+
   | **Field**           | **Value**                     |
   +=====================+===============================+
   | **Action name**     | ``account_lockout_ar_action`` |
   +---------------------+-------------------------------+
   | **Active response** | ``account_lockout_ar``        |
   +---------------------+-------------------------------+

   .. thumbnail:: /images/compliance/fedramp/account-lockout-trigger-action.png
      :title: Add the trigger and the active response action
      :alt: Add the trigger and the active response action
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

Attacker endpoint
"""""""""""""""""

#. Replace ``<UBUNTU_IP_ADDRESS>`` with the IP address of the Ubuntu endpoint and run the following command on the attacker endpoint. Enter a wrong password at each of the three prompts:

   .. code-block:: console

      $ ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no contractor02@<UBUNTU_IP_ADDRESS>

#. Wait three minutes, then run the following command on the Ubuntu endpoint to check the status of the account:

   .. code-block:: console

      $ sudo passwd -S contractor02

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      contractor02 L 2026-11-20 0 99999 7 -1

   The ``L`` in the second field means that the password of the account is locked, so nobody can log in to the account with its password.

Wazuh dashboard
"""""""""""""""

Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab. Enter the following query in the search bar to see all the findings for the account, including the failed logins:

.. code-block:: none

   user.name:contractor02

.. thumbnail:: /images/compliance/fedramp/account-findings-query.png
   :title: Findings for the locked account
   :alt: Findings for the locked account
   :align: center
   :width: 80%

Go to **Security operations** > **Incident Response** and switch to the **Responses** tab and enter ``wazuh.active_response.name:account_lockout_ar`` in the search bar. Each row shows a run of the ``account_lockout_ar`` active response with the ``disable-account`` executable on the Ubuntu endpoint.

.. thumbnail:: /images/compliance/fedramp/account-lockout-responses.png
   :title: Runs of the account lockout active response
   :alt: Runs of the account lockout active response
   :align: center
   :width: 80%

After you finish this use case, delete the ``account_lockout_ar_monitor`` monitor in **Explore** > **Alerting** and the ``account_lockout_ar`` active response in **Explore** > **Active Responses**. Then unlock the account on the Ubuntu endpoint with the following command, or delete it with ``sudo userdel -r contractor02``:

.. code-block:: console

   $ sudo passwd -u contractor02

Audit and Accountability (AU)
-----------------------------

AU-6 Audit Record Review, Analysis, and Reporting
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

AU-6 requires you to review and analyze system audit records for indications of inappropriate or unusual activity, and to report the findings.

Wazuh helps meet AU-6 by analyzing the logs and file integrity events of your endpoints and generating findings for unusual activity. For example, the File Integrity Monitoring (FIM) module reports changes to monitored files and shows what changed.

Use case: Detecting changes to the sudo configuration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to configure the Wazuh agent on an Ubuntu 24.04 endpoint to report changes to the files in the ``/etc/sudoers.d`` directory. Changes to these files grant or remove privileged access.

Ubuntu endpoint
"""""""""""""""

#. Add the following configuration to the ``<syscheck>`` block of the Wazuh agent configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml

      <directories report_changes="yes" realtime="yes">/etc/sudoers.d</directories>

#. Restart the Wazuh agent to apply the changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

#. Create a sudoers file that gives the ``contractor01`` user full privileges without a password:

   .. code-block:: console

      $ echo "contractor01 ALL=(ALL) NOPASSWD: ALL" | sudo tee /etc/sudoers.d/90-contractor
      $ sudo chmod 440 /etc/sudoers.d/90-contractor

#. Restrict the rule to a single command:

   .. code-block:: console

      $ sudo sed -i 's#NOPASSWD: ALL#/usr/bin/systemctl restart nginx#' /etc/sudoers.d/90-contractor

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰), go to **Endpoint security** > **File Integrity Monitoring**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      file.path:"/etc/sudoers.d/90-contractor"

   The ``Wazuh FIM - File modified`` finding reports the change to the file.

   .. thumbnail:: /images/compliance/fedramp/sudoers-fim-finding.png
      :title: FIM finding for the sudoers file
      :alt: FIM finding for the sudoers file
      :align: center
      :width: 80%

#. Expand the finding. The ``file.diff`` field shows the line that changed.

   .. thumbnail:: /images/compliance/fedramp/sudoers-fim-file-diff.png
      :title: Changed line of the sudoers file
      :alt: Changed line of the sudoers file
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.fedramp`` field. The finding maps to AU-6, CM-6, and SI-4.

   .. thumbnail:: /images/compliance/fedramp/sudoers-fim-fedramp-mapping.png
      :title: FedRAMP mapping of the sudoers file finding
      :alt: FedRAMP mapping of the sudoers file finding
      :align: center
      :width: 80%

After you finish this use case, remove the test file on the Ubuntu endpoint:

.. code-block:: console

   $ sudo rm /etc/sudoers.d/90-contractor

Configuration Management (CM)
-----------------------------

CM-7 Least Functionality
^^^^^^^^^^^^^^^^^^^^^^^^

CM-7 requires you to provide only mission-essential capabilities and restrict the functions, ports, protocols, software, and services you don't need.

Wazuh helps meet CM-7 by generating a finding each time a service is installed on a Windows endpoint. The IT Hygiene module also keeps an inventory of the installed packages and services on each endpoint.

Use case: Detecting a new service on a Windows endpoint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh detects a new service on a Windows 11 endpoint.

Windows endpoint
""""""""""""""""

#. Run the following command in PowerShell as an administrator to create a service named ``RemoteSupportAgent``:

   .. code-block:: ps1con

      > sc.exe create RemoteSupportAgent binPath= "C:\Windows\System32\notepad.exe" start= demand DisplayName= "Remote Support Agent"

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, click **Explore agent**, and select the Windows endpoint. Then switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"System service installed - Remote Support Agent"

   One finding matches. It comes from the Windows System event log, which records event ID 7045 when a service is installed.

   .. thumbnail:: /images/compliance/fedramp/new-service-finding.png
      :title: Finding for the new Windows service
      :alt: Finding for the new Windows service
      :align: center
      :width: 80%

#. Expand the finding. The ``service.name`` and ``process.executable`` fields describe the new service, and ``event.code`` shows the Windows event ID.

   .. thumbnail:: /images/compliance/fedramp/new-service-details.png
      :title: Details of the new Windows service finding
      :alt: Details of the new Windows service finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.fedramp`` field. The finding maps to CM-7, AU-6, and IR-4.

   .. thumbnail:: /images/compliance/fedramp/new-service-fedramp-mapping.png
      :title: FedRAMP mapping of the new Windows service finding
      :alt: FedRAMP mapping of the new Windows service finding
      :align: center
      :width: 80%

#. Open the menu (☰) and go to **Security operations** > **IT Hygiene**. Click **Explore agent**, select the Windows endpoint, and switch to the **Services** tab. Turn on **Advanced filters** and enter the following query:

   .. code-block:: none

      service.name:"Remote Support Agent"

   The **Remote Support Agent** service appears in the services inventory of the Windows endpoint.

   .. thumbnail:: /images/compliance/fedramp/it-hygiene-new-service.png
      :title: New service in the IT Hygiene inventory
      :alt: New service in the IT Hygiene inventory
      :align: center
      :width: 80%

After you finish this use case, delete the test service on the Windows endpoint:

.. code-block:: ps1con

   > sc.exe delete RemoteSupportAgent

Incident Response (IR)
----------------------

IR-4 Incident Handling
^^^^^^^^^^^^^^^^^^^^^^

IR-4 requires incident handling consistent with the incident response plan and includes preparation, detection and analysis, containment, eradication, and recovery.

Wazuh helps meet IR-4 with active responses, which contain an attack when Wazuh detects it. For example, an active response can block the attacker's IP address.

Use case: Blocking SSH brute-force attacks on an Ubuntu endpoint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to block the source IP address of failed SSH logins on a monitored Ubuntu 24.04 endpoint with the ``block-ip`` active response. Each SSH connection with failed logins generates one ``Failed authentication attempt`` finding, which maps to AC-2, AU-2, and IA-2. The finding doesn't map to IR-4. The active response supports IR-4 because it contains the attack. The active response adds firewall rules that drop the traffic from the attacker.

.. note::

   You need a second endpoint with SSH access to the Ubuntu endpoint to simulate the attack. Don't use the Wazuh manager or the computer you manage the Ubuntu endpoint from, because the active response blocks the attacker's IP address.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Explore** > **Active Responses**.

#. Click **Create active response** and enter the following details. The ``block-ip`` executable is an out-of-the-box script that exists on every Wazuh agent.

   +----------------+------------------------+
   | **Field**      | **Value**              |
   +================+========================+
   | **Name**       | ``ssh_brute_force_ar`` |
   +----------------+------------------------+
   | **Executable** | ``block-ip``           |
   +----------------+------------------------+
   | **Type**       | Stateless              |
   +----------------+------------------------+
   | **Location**   | Local                  |
   +----------------+------------------------+

   .. thumbnail:: /images/compliance/fedramp/create-ssh-brute-force-active-response.png
      :title: Create the SSH brute-force active response
      :alt: Create the SSH brute-force active response
      :align: center
      :width: 80%

#. Click **Create** to save the active response.

#. Go to **Explore** > **Alerting**, switch to the **Monitors** tab, and then click **Create monitor**.

#. Fill in the following parameters. This filter selects the findings of the ``Failed authentication attempt`` rule by its title. Don't filter on ``wazuh.rule.id``: rule IDs change when the Wazuh CTI ruleset is updated.

   +-----------------------------+---------------------------------------+
   | **Field**                   | **Value**                             |
   +=============================+=======================================+
   | **Monitor name**            | ``ssh_brute_force_ar_monitor``        |
   +-----------------------------+---------------------------------------+
   | **Monitor type**            | Active Response monitor               |
   +-----------------------------+---------------------------------------+
   | **Monitor defining method** | Visual editor                         |
   +-----------------------------+---------------------------------------+
   | **Frequency**               | By interval                           |
   +-----------------------------+---------------------------------------+
   | **Run every**               | 1 Minute(s)                           |
   +-----------------------------+---------------------------------------+
   | **Index**                   | ``wazuh-findings-v5-system-activity`` |
   +-----------------------------+---------------------------------------+
   | **Query name**              | ``ssh_brute_force_ar_query``          |
   +-----------------------------+---------------------------------------+
   | **Field**                   | ``wazuh.rule.title``                  |
   +-----------------------------+---------------------------------------+
   | **Operator**                | is                                    |
   +-----------------------------+---------------------------------------+
   | **Value**                   | ``Failed authentication attempt``     |
   +-----------------------------+---------------------------------------+

   .. thumbnail:: /images/compliance/fedramp/ssh-brute-force-monitor.png
      :title: Create the SSH brute-force monitor
      :alt: Create the SSH brute-force monitor
      :align: center
      :width: 80%

#. In the **Triggers** section, click **Add trigger** and fill in the following parameters.

   +-----------------------------+--------------------------------+
   | **Field**                   | **Value**                      |
   +=============================+================================+
   | **Trigger name**            | ``ssh_brute_force_ar_trigger`` |
   +-----------------------------+--------------------------------+
   | **Severity level**          | 1 (Highest)                    |
   +-----------------------------+--------------------------------+
   | **Specify queries or tags** | ``ssh_brute_force_ar_query``   |
   +-----------------------------+--------------------------------+

#. In the **Actions** subsection, click **Add active response** and fill in the following parameters.

   +---------------------+-------------------------------+
   | **Field**           | **Value**                     |
   +=====================+===============================+
   | **Action name**     | ``ssh_brute_force_ar_action`` |
   +---------------------+-------------------------------+
   | **Active response** | ``ssh_brute_force_ar``        |
   +---------------------+-------------------------------+

   .. thumbnail:: /images/compliance/fedramp/ssh-brute-force-trigger-action.png
      :title: Add the trigger and the active response action
      :alt: Add the trigger and the active response action
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

Attacker endpoint
"""""""""""""""""

#. Make sure that the ``testuser`` account doesn't exist on the Ubuntu endpoint. Replace ``<UBUNTU_IP_ADDRESS>`` with the IP address of the Ubuntu endpoint and run the following command. Enter a wrong password at each of the three prompts:

   .. code-block:: console

      $ ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no testuser@<UBUNTU_IP_ADDRESS>

#. Wait three minutes, then run the command again to confirm that the Ubuntu endpoint blocks the attacker endpoint:

   .. code-block:: console

      $ ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no testuser@<UBUNTU_IP_ADDRESS>

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      ssh: connect to host <UBUNTU_IP_ADDRESS> port 22: Connection timed out

Ubuntu endpoint
"""""""""""""""

#. Run the following command to check the block. Replace ``<ATTACKER_IP>`` with the IP address of the attacker endpoint. The output shows one DROP rule for each blocked SSH connection:

   .. code-block:: console

      $ sudo iptables -S INPUT | grep <ATTACKER_IP>

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      -A INPUT -s <ATTACKER_IP>/32 -j DROP

Wazuh dashboard
"""""""""""""""

Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab. Enter the following query in the search bar to see the findings that triggered the active response:

.. code-block:: none

   wazuh.rule.title:"Failed authentication attempt"

.. thumbnail:: /images/compliance/fedramp/failed-authentication-findings.png
   :title: Findings that triggered the active response
   :alt: Findings that triggered the active response
   :align: center
   :width: 80%

Go to **Security operations** > **Incident Response** and switch to the **Responses** tab. Each row shows a run of the ``ssh_brute_force_ar`` active response with the ``block-ip`` executable on the Ubuntu endpoint.

.. thumbnail:: /images/compliance/fedramp/ssh-brute-force-responses.png
   :title: Runs of the SSH brute-force active response
   :alt: Runs of the SSH brute-force active response
   :align: center
   :width: 80%

After you finish this use case, delete the ``ssh_brute_force_ar_monitor`` monitor in **Explore** > **Alerting** and the ``ssh_brute_force_ar`` active response in **Explore** > **Active Responses**. Then remove the firewall rules on the Ubuntu endpoint so that the attacker endpoint can connect again. The ``block-ip`` active response adds a rule to the ``INPUT`` and ``FORWARD`` chains for each finding, and the **Stateless** type never removes them:

.. code-block:: console

   $ while sudo iptables -D INPUT -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done
   $ while sudo iptables -D FORWARD -s <ATTACKER_IP> -j DROP 2>/dev/null; do :; done

IR-6 Incident Reporting
^^^^^^^^^^^^^^^^^^^^^^^

IR-6 requires personnel to report suspected incidents within a defined time period and requires you to report incident information to designated authorities.

Cloud service providers report incidents to FedRAMP and affected agencies, so evidence must be collected quickly.

Wazuh helps meet IR-6 by exporting incident findings to a CSV file from the Wazuh dashboard.

Use case: Exporting the findings of an incident for a report
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to export the high and critical findings of an Ubuntu endpoint to attach them to an incident report.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, click **Explore agent**, and select the endpoint. Then switch to the **Findings** tab.

#. Set the time picker to the period of the incident, for example **Last 1 hour**, and enter the following query to keep the high and critical findings:

   .. code-block:: none

      wazuh.rule.level:(high or critical)

   .. thumbnail:: /images/compliance/fedramp/high-critical-findings-query.png
      :title: High and critical findings of the endpoint
      :alt: High and critical findings of the endpoint
      :align: center
      :width: 80%

#. Click **Export Formatted**. The Wazuh dashboard downloads a CSV file with the findings and confirms the number of exported rows.

   .. thumbnail:: /images/compliance/fedramp/export-formatted-csv.png
      :title: Export of the findings to a CSV file
      :alt: Export of the findings to a CSV file
      :align: center
      :width: 80%

Use the CSV file to describe the affected endpoint, the timeline, and the detected techniques in your report.

Risk Assessment (RA)
--------------------

RA-5 Vulnerability Monitoring and Scanning
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

RA-5 requires you to scan the system and hosted applications for vulnerabilities periodically, and when new vulnerabilities that can affect them are identified.

FedRAMP requires monthly scans and remediation within fixed time frames, so you must know which vulnerabilities are critical and fixable.

Wazuh helps meet RA-5 with the Vulnerability Detection module. It correlates each endpoint's software inventory with Wazuh CTI vulnerability data.

Use case: Prioritizing critical vulnerabilities that have a fix
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to find the critical vulnerabilities of an Ubuntu endpoint that a package upgrade fixes.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Vulnerability Detection**.

#. Click **Explore agent** and select the Ubuntu endpoint. The **Dashboard** tab shows the vulnerabilities by severity, the top vulnerable packages, and the most common vulnerability scores.

   .. thumbnail:: /images/compliance/fedramp/vulnerability-detection-dashboard.png
      :title: Vulnerability Detection dashboard of the Ubuntu endpoint
      :alt: Vulnerability Detection dashboard of the Ubuntu endpoint
      :align: center
      :width: 80%

#. Switch to the **Inventory** tab. In **Severity**, select **Critical**.

#. Check the ``vulnerability.scanner.condition`` column. A condition such as ``Fixed in 157.0`` means that a fixed version exists, so upgrading the package removes the vulnerability.

   .. thumbnail:: /images/compliance/fedramp/critical-vulnerabilities-inventory.png
      :title: Critical vulnerabilities in the inventory
      :alt: Critical vulnerabilities in the inventory
      :align: center
      :width: 80%

Ubuntu endpoint
"""""""""""""""

#. Upgrade the vulnerable package on the endpoint. For example, for a Debian package:

   .. code-block:: console
      :emphasize-lines: 2

      $ sudo apt-get update
      $ sudo apt-get install --only-upgrade <PACKAGE_NAME>

   Replace ``<PACKAGE_NAME>`` with the name of the vulnerable package. After the next inventory scan, Wazuh generates a ``Wazuh VD - Vulnerability <CVE_ID> remediated`` finding for each vulnerability that the upgrade resolves. To see these findings, follow the SI-2 use case.

System and Communications Protection (SC)
-----------------------------------------

SC-7 Boundary Protection
^^^^^^^^^^^^^^^^^^^^^^^^

SC-7 requires you to monitor and control communications at the external managed interfaces of the system and at key internal managed interfaces.

Wazuh helps meet SC-7 with the Security Configuration Assessment (SCA) module, which checks that the host firewall of your endpoints is enabled.

Use case: Enabling the host firewall on an Ubuntu endpoint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to find and fix the failed CIS Ubuntu Linux 24.04 LTS Benchmark check 35622, **Ensure ufw service is enabled.**, on an Ubuntu 24.04 endpoint. When you enable UFW, it denies incoming connections by default and allows only the connections that you permit.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Endpoint security** > **Configuration Assessment**.

#. Click **Explore agent**, select the Ubuntu endpoint, and switch to the **Inventory** tab.

#. In **Check**, search for and select **Ensure ufw service is enabled.** The **check.result** column shows **Failed** while UFW is inactive.

   .. thumbnail:: /images/compliance/fedramp/ufw-check-failed.png
      :title: Failed UFW check
      :alt: Failed UFW check
      :align: center
      :width: 80%

#. Click the inspect icon of the check to open its details, including the rationale and the remediation. The ``check.compliance.fedramp`` field shows SC-7.

   .. thumbnail:: /images/compliance/fedramp/ufw-check-details.png
      :title: Details of the UFW check
      :alt: Details of the UFW check
      :align: center
      :width: 80%

Ubuntu endpoint
"""""""""""""""

#. Run the following commands on the Ubuntu endpoint to allow SSH connections and enable UFW. Allow SSH first, so that enabling UFW doesn't close your SSH session:

   .. code-block:: console

      $ sudo ufw allow 22/tcp
      $ sudo systemctl unmask ufw.service
      $ sudo systemctl --now enable ufw.service
      $ sudo ufw --force enable

#. Restart the Wazuh agent to run a new SCA scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
"""""""""""""""

#. In **Configuration Assessment**, switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Wazuh SCA check passed - Ensure ufw service is enabled."

   The finding shows that check 35622 now passes.

   .. thumbnail:: /images/compliance/fedramp/ufw-check-passed.png
      :title: Passed UFW check
      :alt: Passed UFW check
      :align: center
      :width: 80%

System and Information Integrity (SI)
-------------------------------------

SI-2 Flaw Remediation
^^^^^^^^^^^^^^^^^^^^^

SI-2 requires you to identify, report, and correct system flaws.

Wazuh helps meet SI-2 by generating a finding when a vulnerability is remediated.

Use case: Tracking the remediation of vulnerabilities
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh records each vulnerability that you remediate. You remove an old Linux kernel from an Ubuntu 24.04 endpoint. Ubuntu keeps the previous kernel after a kernel upgrade, and its vulnerabilities stay on the endpoint until you remove it.

Ubuntu endpoint
"""""""""""""""

#. Check the running kernel and the installed kernel packages on the Ubuntu endpoint:

   .. code-block:: console

      $ uname -r
      $ dpkg -l 'linux-image-*' | grep ^ii

   Don't remove the kernel that ``uname -r`` shows. If the endpoint has only one kernel, remove another vulnerable package that you don't need instead. The **Inventory** tab of **Vulnerability Detection** lists the vulnerable packages.

#. Remove the packages of the old kernel:

   .. code-block:: console

      $ sudo apt-get purge -y linux-image-<OLD_KERNEL_VERSION> linux-modules-<OLD_KERNEL_VERSION> linux-headers-<OLD_KERNEL_VERSION>

   Replace ``<OLD_KERNEL_VERSION>`` with the version of the old kernel, for example ``7.0.0-42-generic``.

#. Restart the Wazuh agent to run a new inventory scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

   The new inventory scan can take a few minutes.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰), go to **Threat intelligence** > **Vulnerability Detection**, click **Explore agent**, and select the Ubuntu endpoint. Then switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:*remediated* and package.name:linux-image-<OLD_KERNEL_VERSION>

   Wazuh generates a ``Wazuh VD - Vulnerability <CVE_ID> remediated`` finding for each vulnerability of the removed package. If you removed another package, use its name in the query.

   .. thumbnail:: /images/compliance/fedramp/remediated-vulnerability-findings.png
      :title: Findings for the remediated vulnerabilities
      :alt: Findings for the remediated vulnerabilities
      :align: center
      :width: 80%

#. Expand a finding and scroll down to the ``wazuh.rule.compliance.fedramp`` field. The finding maps to CA-7, RA-5, SI-2, and SI-4.

   .. thumbnail:: /images/compliance/fedramp/remediated-vulnerability-fedramp-mapping.png
      :title: FedRAMP mapping of the remediated vulnerability finding
      :alt: FedRAMP mapping of the remediated vulnerability finding
      :align: center
      :width: 80%

SI-3 Malicious Code Protection
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SI-3 requires you to implement malicious code protection mechanisms at system entry and exit points to detect and eradicate malicious code.

Wazuh helps meet SI-3 by turning the detections of antivirus engines, such as ClamAV, into findings.

Use case: Detecting malware with ClamAV
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh generates findings from the detections of ClamAV, an open source antivirus engine, on an Ubuntu 24.04 endpoint. ClamAV scans a file of the ``clamav-testfiles`` package. The ClamAV project provides these harmless files to test detection.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Ruleset management** > **Overview**, and select the **Standard** space. Search for ``clamav`` in the **Integrations** table and click the integration title. Then click **Actions** and select **Enable**. The ``clamav`` integration decodes the ClamAV logs, and it's disabled by default.

Ubuntu endpoint
"""""""""""""""

#. Install ClamAV and its test files on the Ubuntu 24.04 endpoint:

   .. code-block:: console

      $ sudo apt-get update
      $ sudo apt-get install -y clamav clamav-daemon clamav-testfiles

   On a new installation, wait until ``freshclam`` downloads the signature databases. The ClamAV daemon doesn't start without them. To check, run ``ls /var/lib/clamav``. The download is done when the output lists the main, daily, and bytecode database files.

#. Edit the ``/etc/clamav/clamd.conf`` file and set ``LogSyslog`` to ``true``, so that the ClamAV daemon writes its detections to the system journal. The Wazuh agent reads the system journal by default.

   .. code-block:: ini

      LogSyslog true

#. Restart the ClamAV daemon to apply the change:

   .. code-block:: console

      $ sudo systemctl restart clamav-daemon

#. Scan a test file:

   .. code-block:: console

      $ sudo clamdscan --fdpass /usr/share/clamav-testfiles/clam.exe

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      /usr/share/clamav-testfiles/clam.exe: Clamav.Test.File-6 FOUND

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.integration.name:clamav and wazuh.rule.title:"Malware file detected - /usr/share/clamav-testfiles/clam.exe"

   .. thumbnail:: /images/compliance/fedramp/clamav-finding-query.png
      :title: Finding for the ClamAV detection
      :alt: Finding for the ClamAV detection
      :align: center
      :width: 80%

#. Expand the finding. The ``event.original`` field shows the ClamAV detection, and the ``file.path`` field shows the detected file.

   .. thumbnail:: /images/compliance/fedramp/clamav-finding-details.png
      :title: Details of the ClamAV finding
      :alt: Details of the ClamAV finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.fedramp`` field. The finding maps to SI-3.

   .. thumbnail:: /images/compliance/fedramp/clamav-fedramp-mapping.png
      :title: FedRAMP mapping of the ClamAV finding
      :alt: FedRAMP mapping of the ClamAV finding
      :align: center
      :width: 80%

SI-4 System Monitoring
^^^^^^^^^^^^^^^^^^^^^^

SI-4 requires you to monitor the system to detect attacks and indicators of potential attacks, and unauthorized local, network, and remote connections.

Indicators of attack include actions such as loading kernel modules, which rootkits use to hide their activity.

Wazuh helps meet SI-4 with detection rules that analyze the process events of your endpoints.

Use case: Detecting kernel module loading on an Ubuntu endpoint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how Wazuh detects a user who loads a kernel module with ``insmod`` or ``modprobe`` on an Ubuntu 24.04 endpoint. The detection uses the process creation events of Sysmon for Linux. You load the ``dummy`` network driver, a harmless module that ships with the Ubuntu kernel.

Ubuntu endpoint
"""""""""""""""

#. Add the Microsoft package repository to the Ubuntu 24.04 endpoint and install the ``sysmonforlinux`` package:

   .. code-block:: console

      $ curl -fsSL https://packages.microsoft.com/config/ubuntu/24.04/packages-microsoft-prod.deb -o /tmp/packages-microsoft-prod.deb
      $ sudo dpkg -i /tmp/packages-microsoft-prod.deb
      $ sudo apt-get update
      $ sudo apt-get install -y sysmonforlinux

#. Create a ``/tmp/sysmon-config.xml`` file with the following content. It logs every process creation:

   .. code-block:: xml

      <Sysmon schemaversion="4.81">
        <EventFiltering>
          <RuleGroup name="" groupRelation="or">
            <ProcessCreate onmatch="exclude"/>
          </RuleGroup>
        </EventFiltering>
      </Sysmon>

#. Install Sysmon for Linux with the configuration file:

   .. code-block:: console

      $ sudo sysmon -accepteula -i /tmp/sysmon-config.xml

   The Wazuh agent reads the system journal by default, which includes the Sysmon for Linux events. To also detect persistence techniques with Sysmon for Linux, see :doc:`Detecting reverse shells and persistence on Linux </user-manual/capabilities/malware-detection/use-cases/reverse-shells-persistence>`.

#. Load the ``dummy`` kernel module and check that it is loaded:

   .. code-block:: console

      $ sudo modprobe dummy
      $ lsmod | grep dummy

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, switch to the **Findings** tab, and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Linux kernel module loaded via insmod/modprobe - modprobe dummy"

   .. thumbnail:: /images/compliance/fedramp/kernel-module-finding.png
      :title: Finding for the kernel module loading
      :alt: Finding for the kernel module loading
      :align: center
      :width: 80%

#. Expand the finding. The ``process.command_line`` field shows the ``modprobe dummy`` command, and the ``process.parent.name`` field shows that the command ran with ``sudo``.

   .. thumbnail:: /images/compliance/fedramp/kernel-module-details.png
      :title: Details of the kernel module finding
      :alt: Details of the kernel module finding
      :align: center
      :width: 80%

#. Scroll down to the ``wazuh.rule.compliance.fedramp`` field. The finding maps to AU-6, CM-6, SI-3, and SI-4.

   .. thumbnail:: /images/compliance/fedramp/kernel-module-fedramp-mapping.png
      :title: FedRAMP mapping of the kernel module finding
      :alt: FedRAMP mapping of the kernel module finding
      :align: center
      :width: 80%

After you finish this use case, unload the dummy kernel module and remove Sysmon for Linux from the Ubuntu endpoint:

.. code-block:: console

   $ sudo modprobe -r dummy
   $ sudo sysmon -u
   $ sudo apt-get remove -y sysmonforlinux

SI-5 Security Alerts, Advisories, and Directives
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

SI-5 requires you to receive system security alerts, advisories, and directives from designated external organizations on an ongoing basis, and to act on them.

Wazuh helps meet SI-5 with Wazuh Cyber Threat Intelligence (CTI). The CTI Feed page shows the sync state of each feed, and the CTI Explorer shows the details of each IOC and vulnerability record.

Use case: Confirming that threat intelligence feeds are up to date
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to check that the Wazuh CTI feeds are current.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **CTI Feed**.

#. In **Feed sync**, check that each feed shows **Up to date**. The feeds are the **Ruleset**, the **Indicators of compromise**, and the **Vulnerabilities**. Click **Check for updates** to sync the feeds now.

   .. thumbnail:: /images/compliance/fedramp/cti-feed-sync.png
      :title: Feed sync state of the CTI feeds
      :alt: Feed sync state of the CTI feeds
      :align: center
      :width: 80%

#. Scroll down to **Feed content** to see how many rules, decoders, integrations, KVDBs, IOCs, and CVE records the feed delivered to your environment.

   .. thumbnail:: /images/compliance/fedramp/cti-feed-content.png
      :title: Content of the CTI feeds
      :alt: Content of the CTI feeds
      :align: center
      :width: 80%

Use case: Assessing a vulnerability advisory with Wazuh CTI
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This use case shows how to look up a CVE in the CTI Explorer when you receive a new advisory.

Wazuh dashboard
"""""""""""""""

#. Open the menu (☰) and go to **Threat intelligence** > **CTI Explorer**.

#. Enter a CVE identifier in the search bar and click **Check**. For example, enter ``CVE-2026-76312``. The result shows the CVSS score, the publication date, and the assigner of the record.

   .. thumbnail:: /images/compliance/fedramp/cti-explorer-search.png
      :title: CVE search in the CTI Explorer
      :alt: CVE search in the CTI Explorer
      :align: center
      :width: 80%

#. Click **Open the record**. The details include the description, affected products, scores, and vulnerability references. Click **Vulnerability Detection** in the record to see which of your endpoints the CVE affects.

   .. thumbnail:: /images/compliance/fedramp/cti-explorer-record.png
      :title: CVE record in the CTI Explorer
      :alt: CVE record in the CTI Explorer
      :align: center
      :width: 80%
