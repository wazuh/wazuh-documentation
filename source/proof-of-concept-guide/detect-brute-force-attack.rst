.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This PoC shows how Wazuh provides out-of-the-box rules capable of identifying brute-force attacks. Learn more about it in this section of the documentation.

Detecting a brute-force attack
==============================

Brute-forcing is a common attack vector that threat actors use to gain unauthorized access to systems and services. Services like SSH on Linux systems and RDP on Windows systems are usually prone to brute-force attacks. Wazuh identifies brute-force attacks by correlating multiple authentication failure events.

In this use case, we show how Wazuh detects brute-force attacks on RHEL and Windows endpoints.

The section on :doc:`Blocking attacks with Active Response </user-manual/capabilities/active-response/ar-use-cases/blocking-attacks>` describes how to configure an active response to block the IP address of an attacker.

Infrastructure
--------------

+-----------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Endpoint  | Description                                                                                                                                       |
+===========+===================================================================================================================================================+
| Ubuntu    | This is the attacker endpoint that performs brute-force attacks. It is required to have an SSH client installed on this endpoint.                 |
+-----------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| RHEL      | We perform SSH brute-force attacks against this victim endpoint. It is required to have an SSH server installed and enabled on this endpoint.     |
+-----------+---------------------------------------------------------------------------------------------------------------------------------------------------+
| Windows   | We perform RDP brute-force attacks against this victim endpoint. It is required to enable RDP on this endpoint.                                   |
+-----------+---------------------------------------------------------------------------------------------------------------------------------------------------+

Configuration
-------------

Take the following steps to configure the Ubuntu endpoint in order to perform authentication failure attempts on the monitored RHEL and Windows endpoints.

#. On the attacker endpoint, install Hydra. This tool is used to execute the brute-force attack:

   .. code-block:: console

      $ sudo apt update 
      $ sudo apt install -y hydra

Attack emulation
----------------

#. Create a password list with 10 random passwords.

#. Run Hydra from the attacker endpoint to execute brute-force attacks against the RHEL endpoint. Replace ``<RHEL_IP>`` with the IP address of the RHEL endpoint and run the command below:

   .. code-block:: console

      $ sudo hydra -l badguy -P <PASSWD_LIST.txt> <RHEL_IP> ssh

#. Run Hydra from the attacker endpoint to execute brute-force attacks against the  Windows endpoint. Replace ``<WINDOWS_IP>`` with the IP address of the Windows endpoint and run the command below:

   .. code-block:: console

      $ sudo hydra -l badguy -P <PASSWD_LIST.txt> rdp://<WINDOWS_IP>

Visualize the alerts
--------------------

You can visualize the alert data in the Wazuh dashboard. To do this, go to the Security events module and add the filters in the search bar to query the alerts.

-  Linux - ``rule.id:(5551 or 5712)``. Other related rules are ``5710``, ``5711``, ``5716``, ``5720``, ``5503``, ``5504``.

   .. thumbnail:: /images/poc/brute-force-attack-alerts-ubuntu.png
         :title: Visualize Brute force attack to Ubuntu system alerts
         :align: center
         :width: 80%

-  Windows - ``rule.id:(60122 OR 60204)``

   .. thumbnail:: /images/poc/brute-force-attack-alerts-windows.png
         :title: Visualize Brute force attack to Windows system alerts
         :align: center
         :width: 80%
