.. Copyright (C) 2019 Wazuh, Inc.

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

.. versionadded:: 3.9.0

There are multiple Wazuh integrations that perform configuration assessment scans (see :ref:`Policy monitoring section <manual_policy_monitoring>`) including OpenSCAP and CIS-CAT and more recently the Security Configuration Assessment (SCA). The SCA was created by the Wazuh development team to overcome limitations that were inherent to the other integrations, to name a few:

- The OpenSCAP integration is only available on Linux hosts, not Windows agents.
- The CIS-CAT tool is proprietary software which requires an external license for its use.
- The *Rootcheck* module depends on the *Syscheck* daemon and  its policies feeds are often outdated.

The Security Configuration Assessment (SCA) module aims to provide the user with the best possible experience when performing scans about hardening and configuration policies. Some of its key features include:

- The last state of each scanned check of every policy is stored in the manager and can be consulted by the SCA tab in the Wazuh App.
- To avoid alert flooding and repeated alerts in each scan. Now, only state changes and new checks are alerted, being those states updated in the manager database.
- Current policies used by *Rootcheck* have been enriched and updated to a new YAML format. CIS policies are based on CIS benchmarks.

Further information is available in the following sections:

.. toctree::
    :maxdepth: 2

    010_what_is_it
    020_how_it_works
    030_how_to_configure
    040_creating_custom_policies
    050_use-case
