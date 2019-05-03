.. Copyright (C) 2019 Wazuh, Inc.

.. _amazon_instances:

Monitoring AWS instances
========================

Installing the Wazuh agent on the AWS EC2 instances provides information and monitorization about what's going on inside of them.

The agent runs as a service on the instance, and collects different types of system and application data that forwards to the Wazuh manager through an encrypted and authenticated channel.

Thanks to the Wazuh agent, there are some capabilities available to monitor the instances:

- :ref:`Log data collection <manual_log_analysis>`
- :ref:`File integrity monitoring <manual_file_integrity>`
- :ref:`Anomaly and malware detection <manual_anomaly_detection>`
- :ref:`Security policy monitoring <manual_policy_monitoring>`
- :ref:`System inventory <syscollector>`
- :ref:`Vulnerability detection <vulnerability-detection>`

To learn more about the different Wazuh capabilities, check out :ref:`this section <user_manual>`.

.. note::
  To install the Wazuh agent, follow the instructions available on the :ref:`agent installation guide <installation_agents>`.
