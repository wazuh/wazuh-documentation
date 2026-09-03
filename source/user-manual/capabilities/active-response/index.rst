.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Active response automates response actions on monitored endpoints when security findings match configured Alerting monitor conditions. Learn more about it here.

Active response
================

The Wazuh Active Response module supports incident response by automating response actions when security findings meet configured conditions. It executes predefined or custom scripts on monitored endpoints to respond to detected threats.

Wazuh provides out-of-the-box active response scripts for common response actions. For example, these scripts can block malicious network access or disable user accounts. You can also create custom scripts to implement response actions specific to your environment. Automated response actions help security teams respond consistently and reduce manual intervention.

.. topic:: Contents

   .. toctree::
      :maxdepth: 2

      how-it-works
      types-of-active-response
      configuration
      default-active-response-scripts
      custom-active-response-scripts
      migrating-active-response-scripts
      ar-use-cases/index
