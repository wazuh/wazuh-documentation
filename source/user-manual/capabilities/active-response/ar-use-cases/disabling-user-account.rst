.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to disable a user account on Linux using active response in this use case.

Disabling a Linux user account with active response
===================================================

Without knowledge of the password for an account, an adversary might opt to systematically guess the password using a repetitive or iterative mechanism. In this use case, we configure the ``disable-account`` active response to disable a Linux/Unix account subject to brute-force attacks. Wazuh uses the ``disable-account`` active response on Linux/Unix endpoints to disable the account for the user in the ``dstuser`` field of a Wazuh alert.

Infrastructure
--------------

================ ===========
Endpoint         Description
================ ===========
**Ubuntu 22.04** The endpoint to monitor for brute-force attacks.
================ ===========

Wazuh server
------------

#. Add the rule below to the Wazuh server ``/var/ossec/etc/rules/local_rules.xml`` file:

   .. code-block:: xml

      <group name="pam,syslog,">
        <rule id="120100" level="10" frequency="3" timeframe="120">
          <if_matched_sid>5503</if_matched_sid>
          <description>Possible password guess on $(dstuser): 3 failed logins in a short period of time</description>
          <mitre>
            <id>T1110</id>
          </mitre>
        </rule>
      </group>

   This rule checks for 3 failed authentication logins on the same user account within 2 minutes.

#. Open the Wazuh server ``/var/ossec/etc/ossec.conf`` file and verify that a ``<command>`` block called ``disable-account`` with the following configuration is present within the ``<ossec_config>`` block:

   .. code-block:: xml

      <command>
        <name>disable-account</name>
        <executable>disable-account</executable>
        <timeout_allowed>yes</timeout_allowed>
      </command>

   The ``<command>`` block contains information about the action to be executed on the Wazuh agent.

   -  ``<name>``: Sets a name for the command. In this case, ``disable-account``.
   -  ``<executable>``: Specifies the active response script that must run after a trigger. In this case, it’s the ``disable-account`` executable.
   -  ``<timeout_allowed>``: Allows a timeout after a period of time. This tag is set to ``yes`` here, which represents a stateful active response.

#. Add the ``<active-response>`` block below to the Wazuh server ``/var/ossec/etc/ossec.conf`` configuration file:

   .. code-block:: xml

      <ossec_config>
        <active-response>
          <command>disable-account</command>
          <location>local</location>
          <rules_id>100100</rules_id>
          <timeout>300</timeout>
        </active-response>
      </ossec_config>

   -  ``<command>``: Specifies the command to configure. This is the command name ``disable-account`` defined in the previous step.
   -  ``<location>``: Specifies where the command executes. Using the ``local`` value here means that the command executes on the monitored endpoint where the trigger event occurs.
   -  ``<rules_id>``: The active response module executes the command if rule ID ``100100``: ``Possible password guess on $(dstuser): 3 failed logins in a short period of time`` fires.
   -  ``<timeout>``: Specifies how long the active response action must last. In this use case, we configure it to last for 300 seconds. After that period, the active response reverts its action and re-enables the account.

#. Restart the Wazuh manager service to apply changes:

   .. code-block:: console

      $ sudo systemctl restart wazuh-manager

Ubuntu endpoint
---------------

#. Create two users for testing purposes:

   .. code-block:: console

      $ sudo adduser user1
      $ sudo adduser user2

Test the configuration
----------------------

To test our use case, sign in to the ``user1`` account and attempt to switch to ``user2`` using a wrong password. Then verify that the ``user2`` account is disabled, and the related alerts are displayed on the Wazuh dashboard.

#. Switch to ``user1`` using the correct password:

   .. code-block:: console

      $ su user1

#. As ``user1``, run the following commands three(3) times and type in any wrong password for ``user2`` when prompted to enter the password:

   .. code-block:: console

      $ su user2

#. Check that the account was successfully locked using the ``passwd`` command:

   .. code-block:: console

      $ sudo passwd --status user2

   .. code-block:: none
      :class: output

      user2 L 02/20/2023 0 99999 7 -1

   The ``L`` flag indicates the account is locked.

Visualize the alerts
--------------------

You can visualize the alert data on the Wazuh dashboard. In the image below, you can see that the active response triggers just after rule ID ``120100`` fires to disable the account. Then re-enables it again after 5 minutes.

.. thumbnail:: /images/manual/active-response/ar-alert-fired3.png
   :title: Active response alert: User account disabled
   :alt: Active response alert: User account disabled
   :align: center
   :width: 80%
