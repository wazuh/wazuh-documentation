.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how Wazuh helps meet the CMMC Access Control (AC) requirements, with use cases for scheduled jobs, privileged commands, and unsuccessful logon attempts.

Access Control (AC)
===================

AC.L2-3.1.2 Transaction & Function Control
------------------------------------------

AC.L2-3.1.2 requires you to limit system access to the types of transactions and functions that authorized users are permitted to execute.

This practice restricts what authorized users can do on a system, not only whether they can log in. For example, only authorized users can schedule jobs on a server.

Wazuh helps meet AC.L2-3.1.2 with the Security Configuration Assessment (SCA) module, which checks the access control settings of your endpoints against the Center for Internet Security (CIS) benchmarks.

Use case: Restricting scheduled jobs to authorized users
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how to find and fix the failed CIS Ubuntu Linux 24.04 LTS Benchmark check 35600, **Ensure crontab is restricted to authorized users.**, on an Ubuntu 24.04 endpoint. The check fails when the ``/etc/cron.allow`` file doesn't exist or has insecure permissions.

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Endpoint security** > **Configuration Assessment**.

#. Click **Explore agent**, select the Ubuntu endpoint, and switch to the **Inventory** tab.

#. In **Check**, search for and select **Ensure crontab is restricted to authorized users.** The **check.result** column shows **Failed**.

   .. thumbnail:: /images/compliance/cmmc/sca-check-35600-failed.png
      :title: Failed SCA check 35600
      :alt: Failed SCA check 35600
      :align: center
      :width: 80%

#. Click the inspect icon of the check to open its details, including the rationale and the remediation. The ``check.compliance.cmmc`` field shows AC.L1-3.1.1, AC.L1-3.1.2, AC.L2-3.1.3, AC.L2-3.1.5, and MP.L2-3.8.2.

   .. thumbnail:: /images/compliance/cmmc/sca-check-35600-details.png
      :title: Details of SCA check 35600
      :alt: Details of SCA check 35600
      :align: center
      :width: 80%

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Run the following commands on the Ubuntu endpoint to create the ``/etc/cron.allow`` file with secure ownership and permissions:

   .. code-block:: console

      $ sudo touch /etc/cron.allow
      $ sudo chown root:root /etc/cron.allow
      $ sudo chmod 640 /etc/cron.allow

   With an empty ``/etc/cron.allow`` file, only the root user can use ``crontab``. Add one user name per line to allow other users.

#. Restart the Wazuh agent to run a new SCA scan:

   .. code-block:: console

      $ sudo systemctl restart wazuh-agent

Wazuh dashboard
~~~~~~~~~~~~~~~

#. In **Configuration Assessment**, switch to the **Findings** tab and enter the following query:

   .. code-block:: none

      wazuh.rule.title:"Wazuh SCA check passed - Ensure crontab is restricted to authorized users."

   The finding shows that check 35600 now passes.

   .. thumbnail:: /images/compliance/cmmc/sca-check-35600-passed.png
      :title: Passed SCA check 35600
      :alt: Passed SCA check 35600
      :align: center
      :width: 80%

AC.L2-3.1.6 Non-Privileged Account Use
--------------------------------------

AC.L2-3.1.6 requires you to use non-privileged accounts or roles when accessing non-security functions.

Users must work with non-privileged accounts and elevate their privileges only for the commands that need them. Recording each elevation shows whether users use privileged access as intended.

Wazuh helps meet AC.L2-3.1.6 by generating a finding for each command that a user runs with ``sudo`` on a monitored Linux endpoint. Each finding records the user, the target user, and the command. The ``Sudo command executed`` finding maps to AC.L1-3.1.1, AC.L2-3.1.5, and AU.L2-3.3.1, not to AC.L2-3.1.6. It still helps with AC.L2-3.1.6, because it shows each command that a user runs with elevated privileges.

Use case: Detecting privileged commands run with sudo
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh detects a user who reads the ``/etc/shadow`` file with ``sudo`` on an Ubuntu 24.04 endpoint. This file stores the password hashes of the local accounts.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Run the following command on the Ubuntu endpoint as a user with ``sudo`` rights:

   .. code-block:: console

      $ sudo head -1 /etc/shadow

Wazuh dashboard
~~~~~~~~~~~~~~~

#. Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab.

#. Enter the following query in the search bar and press **Enter**:

   .. code-block:: none

      wazuh.integration.name:system-auth and process.command_line:*shadow*

   .. thumbnail:: /images/compliance/cmmc/sudo-command-finding-query.png
      :title: Sudo command executed finding
      :alt: Sudo command executed finding
      :align: center
      :width: 80%

#. Expand the ``Sudo command executed`` finding. The ``event.original`` field shows the user who ran the command and the target user, and the ``process.command_line`` field shows the command.

   .. thumbnail:: /images/compliance/cmmc/sudo-command-finding-details.png
      :title: Details of the Sudo command executed finding
      :alt: Details of the Sudo command executed finding
      :align: center
      :width: 80%

AC.L2-3.1.8 Unsuccessful Logon Attempts
---------------------------------------

AC.L2-3.1.8 requires you to limit unsuccessful logon attempts.

Wazuh helps meet AC.L2-3.1.8 with active responses. An active response runs a script on a monitored endpoint when Wazuh generates specific findings. You define an active response on the Wazuh dashboard and run it from an Alerting monitor.

Use case: Locking a local account under a password-guessing attack
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This use case shows how Wazuh locks a local account on a monitored Ubuntu 24.04 endpoint when someone tries to guess its password. Each failed login generates a ``Failed authentication attempt - <USERNAME>`` finding. The ``disable-account`` active response locks the password of the account in the ``user.name`` field of the finding.

.. note::

   The ``disable-account`` active response locks the account of each matching finding, for any account on any Linux or macOS endpoint. Test this use case with a dedicated account in a test environment, and delete the monitor when you finish. You also need a second endpoint with SSH access to the Ubuntu endpoint to simulate the attack.

Ubuntu endpoint
~~~~~~~~~~~~~~~

#. Create a test account named ``contractor02`` and set a password for it:

   .. code-block:: console

      $ sudo useradd -m -s /bin/bash contractor02
      $ sudo passwd contractor02

Wazuh dashboard
~~~~~~~~~~~~~~~

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

   .. thumbnail:: /images/compliance/cmmc/account-lockout-active-response.png
      :title: Create the account_lockout_ar active response
      :alt: Create the account_lockout_ar active response
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

   .. thumbnail:: /images/compliance/cmmc/account-lockout-monitor.png
      :title: Create the account_lockout_ar_monitor monitor
      :alt: Create the account_lockout_ar_monitor monitor
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

   .. thumbnail:: /images/compliance/cmmc/account-lockout-trigger-action.png
      :title: Add the trigger and action of the account lockout monitor
      :alt: Add the trigger and action of the account lockout monitor
      :align: center
      :width: 80%

#. Click **Create** to save the monitor.

Attacker endpoint
~~~~~~~~~~~~~~~~~

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
~~~~~~~~~~~~~~~

Open the menu (☰) and go to **Threat intelligence** > **Threat Hunting**, then switch to the **Findings** tab. Enter the following query in the search bar to see all the findings for the account, including the failed logins:

.. code-block:: none

   user.name:contractor02

.. thumbnail:: /images/compliance/cmmc/account-lockout-findings.png
   :title: Findings for the contractor02 account
   :alt: Findings for the contractor02 account
   :align: center
   :width: 80%

Go to **Security operations** > **Incident Response** and switch to the **Responses** tab, and enter ``wazuh.active_response.name:account_lockout_ar`` in the search bar. Each row shows a run of the ``account_lockout_ar`` active response with the ``disable-account`` executable on the Ubuntu endpoint.

.. thumbnail:: /images/compliance/cmmc/account-lockout-responses.png
   :title: Runs of the account_lockout_ar active response
   :alt: Runs of the account_lockout_ar active response
   :align: center
   :width: 80%

After you finish this use case, delete the ``account_lockout_ar_monitor`` monitor in **Explore** > **Alerting** and the ``account_lockout_ar`` active response in **Explore** > **Active Responses**. Then unlock the account on the Ubuntu endpoint with the following command, or delete it with ``sudo userdel -r contractor02``:

.. code-block:: console

   $ sudo passwd -u contractor02
