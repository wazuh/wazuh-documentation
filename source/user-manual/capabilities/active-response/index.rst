.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Active response executes scripts in response to specific alerts. Learn more about it here.

Active response
===============

Security teams often encounter problems in incident response such as addressing high severity events in a timely manner or providing complete mitigation actions. They might struggle to collect relevant information in real time, which makes it difficult to understand the full scope of an incident. These problems increase the difficulty to contain and mitigate the impact of a cyberattack.

Wazuh SIEM and XDR platform improves incident response by:

-  Providing real-time visibility into security events.
-  Reducing alert fatigue.
-  Automating response actions to threats.
-  Providing out-of-the-box response scripts.

Wazuh has an active response module that helps security teams automate response actions based on specific triggers, enabling them to effectively manage security incidents.

Automating response actions ensures that high-priority incidents are addressed and remediated in a timely and consistent manner. This is especially valuable in environments where security teams are resource constrained and need to prioritize their response efforts.

In addition, the module includes a range of out-of-the-box response scripts that help respond to threats and mitigate them. For example, some scripts block malicious network access and delete malicious files on monitored endpoints. These actions reduce the workload on security teams and enable them to effectively manage incidents.

The Wazuh active response module executes these scripts on monitored endpoints when an alert of a specific rule ID, level, or rule group triggers. You can set any number of scripts to initiate in response to a trigger; however, you must consider these responses carefully. Poor implementation of rules and responses might increase the vulnerability of an endpoint.

The image below shows the active response workflow.

.. thumbnail:: /images/manual/active-response/active-response-workflow.png
   :title: Active response workflow
   :align: center
   :width: 100%


.. rubric:: Types of active response
    :class: h2

An active response can either be:

-  Stateless
-  Stateful

Stateless active responses are one-time actions without an event definition to revert or stop them. Stateful responses revert or stop their actions after a period of time.


.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      how-to-configure
      default-active-response-scripts
      custom-active-response-scripts
      ar-use-cases/index
      additional-information
