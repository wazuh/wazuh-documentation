.. Copyright (C) 2019 Wazuh, Inc.

.. _rootcheck_introduction:

Rootcheck
=========

Since Wazuh v3.9.0, the new :ref:`SCA module <manual_sec_config_assessment>` replaces *Rootcheck* when performing policy monitoring.

Wazuh monitors configuration files to ensure they are compliant with your security policies, standards or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, misconfigured.


.. toctree::
   :maxdepth: 2

   how-it-works
   rootcheck-configuration
   rootcheck-faq
