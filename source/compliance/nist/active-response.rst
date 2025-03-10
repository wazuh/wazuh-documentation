.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Active Response module performs autonomous actions on endpoints to mitigate security threats. Learn more about it in this section of the documentation.

Active Response
===============

The Wazuh Active Response module performs autonomous actions on endpoints to mitigate security threats. You can  configure the module to automatically execute scripts when specific alerts trigger. These scripts execute actions, such as a firewall block or drop, traffic shaping or throttling, and account lockout.

The Wazuh :doc:`Active Response </user-manual/capabilities/active-response/index>` module assists in meeting the following NIST 800-53 controls:

- **AC-7 Unsuccessful logon attempts**: *“The need to limit unsuccessful logon attempts and take subsequent action when the maximum number of attempts is exceeded applies regardless of whether the logon occurs via a local or network connection. Due to the potential for denial of service, automatic lockouts initiated by systems are usually temporary and automatically released after a predetermined, organization-defined time period. If a delay algorithm is selected, organizations may employ different algorithms for different components of the system based on the capabilities of those components. Responses to unsuccessful logon attempts may be implemented at the operating system and the application levels. Organization-defined actions that may be taken when the number of allowed consecutive invalid logon attempts is exceeded include prompting the user to answer a secret question in addition to the username and password, invoking a lockdown mode with limited user capabilities (instead of full lockout), allowing users to only logon from specified Internet Protocol (IP) addresses, requiring a CAPTCHA to prevent automated attacks, or applying user profiles such as location, time of day, IP address, device, or Media Access Control (MAC) address. If automatic system lockout or execution of a delay algorithm is not implemented in support of the availability objective, organizations consider a combination of other actions to help prevent brute force attacks. In addition to the above, organizations can prompt users to respond to a secret question before the number of allowed unsuccessful logon attempts is exceeded. Automatically unlocking an account after a specified period of time is generally not permitted. However, exceptions may be required based on operational mission or need.”*

- **SC-5 Denial-of-service protection**: *“Denial-of-service events may occur due to a variety of internal and external causes, such as an attack by an adversary or a lack of planning to support organizational needs with respect to capacity and bandwidth. Such attacks can occur across a wide range of network protocols (e.g., IPv4, IPv6). A variety of technologies are available to limit or eliminate the origination and effects of denial-of-service events. For example, boundary protection devices can filter certain types of packets to protect system components on internal networks from being directly affected by or the source of denial-of-service attacks. Employing increased network capacity and bandwidth combined with service redundancy also reduces the susceptibility to denial-of-service events.”*

The Wazuh Active Response module assists in meeting the above controls by responding to brute force and denial of service attacks. Wazuh includes out-of-the-box active response commands that drop traffic from a malicious IP address or disable a user account that is a victim of brute forcing.

Use case: Automatically disable an account
------------------------------------------

This use case shows how Wazuh helps meet the NIST **AC-7 Unsuccessful logon attempts** requirement by identifying and taking precautionary responses to failed login attempts.

In this scenario, the Wazuh Active Response module automatically disables a user account on a monitored Ubuntu 22.04 endpoint when events analysis detects multiple failed terminal login attempts. You can then track the alerts for these events and actions on the Wazuh dashboard.

Wazuh server
^^^^^^^^^^^^

#. Add the following configuration to the ``<ossec-config>`` block of the Wazuh server configuration file ``/var/ossec/etc/ossec.conf``:

   .. code-block:: xml
       
      <ossec-config> 
        <active-response>
          <command>disable-account</command>
          <location>local</location>
          <rules_id>5503</rules_id>
        </active-response>
      <ossec-config>

   - ``command``: The active response script for the ``disable-account`` command disables a user account when triggered.
   - ``location``: This specifies where to execute the active response command. The ``local`` option executes the script on the monitored endpoint where the event occurred. 
   - ``rules_id``:  This active response script runs when an alert for rule ID ``5503`` is generated. Rule ID ``5503`` detects multiple failed terminal login attempts and generates alerts. You can define multiple rules by separating them with a comma.

#. Restart the Wazuh server to apply the configuration changes:

   .. include:: /_templates/common/restart_manager.rst

Ubuntu endpoint
^^^^^^^^^^^^^^^

#. Create two users for this use case:

   .. code-block:: console
       
      # useradd <USER1>
      # useradd <USER2>

   In our use case, ``<USER1>`` is ``kon``, while ``<USER2>`` is ``jon``.

#. Attempt to log in with the wrong credentials to the ``<USER2>`` account using ``<USER1>`` account:

   .. code-block:: console
       
      <USER1>:$ su <USER2>

   The image below shows the related alerts on the Wazuh dashboard:  

      .. thumbnail:: /images/compliance/nist/alerts-on-the-wazuh-dashboard.png    
         :title: Alerts on the Wazuh dashboard
         :alt: Alerts on the Wazuh dashboard
         :align: center
         :width: 80%

      .. thumbnail:: /images/compliance/nist/users-alerts.png    
         :title: Users 1 and 2 alerts
         :alt: Users 1 and 2 alerts
         :align: center
         :width: 80%


#. Check that the account was successfully locked using the ``passwd`` command on the Ubuntu endpoint:

   .. code-block:: console
       
      # passwd --status <USER2>



   .. code-block:: none
      :class: output

      jon L 11/24/2022 0 99999 7 -1

The ``L`` flag indicates the account is locked.