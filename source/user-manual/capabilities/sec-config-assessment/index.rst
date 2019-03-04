.. Copyright (C) 2019 Wazuh, Inc.

.. _manual_sec_config_assessment:

Security Configuration assessment
=================================

.. versionadded:: 3.9.0

There exist multiple integrations in Wazuh which perform configuration assessment scans (see :ref:`Policy monitoring section <manual_policy_monitoring>`) such as the OpenScap integration.
However, many reasons had led us to create a new Wazuh plugin to support Security Configuration Assessment natively. Here we can see a brief summary of these reasons:

- The OpenSCAP integration is only available on Linux hosts, not Windows agents.
- The CIS-CAT tool is proprietary software which requires an external license for its use.
- The *Rootcheck* module has limitations like its dependency of the *Syscheck* daemon and the outdated policies used as feed.

Since Wazuh v3.9.0, a new module called SCA has been created to avoid that inconveniences and provide the user with the best possible experience when performing scans about hardening and configuration policies. 

This new module includes many improvements you can find out with more details in the next sections. More highlighted ones are the following:

- The last state of each scanned check of every policy is stored in the manager and can be consulted by a new SCA tab in the Wazuh App.
- To avoid alert flooding and repeated alerts in each scan. Now, only state changes and new checks are alerted, being those states updated in the manager database.
- Current policies used by *Rootcheck* have been enriched and updated to a new YAML format. CIS policies are based in the latest CIS benchmarks available.

.. toctree::
   :maxdepth: 2

   security-configuration-assessment
   how-it-works
   use-case
