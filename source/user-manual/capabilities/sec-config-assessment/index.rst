.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Find out more about the Wazuh Security Configuration Assessment capability. What is SCA, how it works and how to configure it, a use case and more.

.. Section marks used on this document:
.. h0 ======================================
.. h1 --------------------------------------
.. h2 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
.. h3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. h4 ######################################
.. h5 ::::::::::::::::::::::::::::::::::::::

.. _manual_sec_config_assessment:

Security Configuration Assessment
=================================

There are multiple Wazuh integrations that perform configuration assessment scans (see :ref:`Policy monitoring section <manual_policy_monitoring>`), including CIS-CAT, and more recently the Security Configuration Assessment (SCA). The SCA was created by the Wazuh development team to overcome limitations that were inherent to the other integrations, to name a few:

- The CIS-CAT tool is proprietary software that requires an external license for its use.
- The *Rootcheck* module depends on the *Syscheck* daemon, and its policies feeds are often outdated.

The Security Configuration Assessment (SCA) module aims to provide the user with the best possible experience when performing scans about hardening and configuration policies. Some of its key features include:

-  State of the last SCA scan. The results of the checks for every enabled policy are stored in the Wazuh manager. They can be consulted at the SCA tab in the Wazuh dashboard.
-  Alerts on SCA state changes. Only state changes and new checks are alerted to avoid alert flooding and repeated alerts with every new scan. State changes are updated in the Wazuh manager database.
-  YAML format for policy files. CIS policies are based on CIS benchmarks.

Further information is available in the following sections:

.. toctree::
   :maxdepth: 2

   what-is-it
   how-it-works
   how-to-configure
   creating-custom-policies
   use-case
