.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Active Response module assists in meeting HIPAA compliance. Learn more about it in this section of the Wazuh documentation.

Active Response
===============

The Wazuh Active Response module is configured to automatically execute scripts when events match specified rules in the Wazuh ruleset. These scripts may perform a firewall block or drop, traffic shaping or throttling, account lockout, or any other user defined action.

The Active Response module assists in meeting the following HIPAA section:

- **Security Incident Procedures §164.308(a)(6)(i) - Response and Reporting**: *“Identify and respond to suspected or known security incidents; mitigate, to the extent practicable, harmful effects of security incidents that are known to the covered entity or business associate; and document security incidents and their outcomes.”*

  The goal of this section is to make sure that you detect and respond to security incidents in your environment. The Active Response module assists in meeting this HIPAA section by responding to intrusions and unauthorized file changes. For more information on configuring Active Response, see the :doc:`Active Response  </user-manual/capabilities/active-response/index>` section of our documentation.

Use case: Block an IP address
-----------------------------

In this use case, you configure the Active Response module to block an IP address when someone attempts to log in to an Ubuntu 22.04 endpoint with a non-existent user via SSH. To implement this, follow the steps below:

#. Add the following block to the Wazuh server configuration file (``/var/ossec/etc/ossec.conf``).

    .. code-block:: console

        <active-response>
          <command>firewall-drop</command>
          <location>local</location>
          <rules_id>5710</rules_id>
          <timeout>100</timeout>
        </active-response>

   This configures the Active Response to execute the ``firewall-drop`` command when there is an attempt to log in to a non-existent user (rule ``5710``).

   .. note::

      The Wazuh server configuration file includes the ``firewall-drop`` command by default.

#. Restart the Wazuh server to apply the configuration:

   .. include:: /_templates/common/restart_manager.rst

   When you attempt to SSH with a non-existent user, rule ``5710`` generates an alert followed by an Active Response event.

   .. thumbnail:: /images/compliance/hipaa/08-active-response.png    
      :title: Rule 5710 generates an alert followed by an Active Response event
      :align: center
      :width: 80%

   .. thumbnail:: /images/compliance/hipaa/09-active-response.png    
      :title: Rule 5710 generates an alert followed by an Active Response event
      :align: center
      :width: 80%      