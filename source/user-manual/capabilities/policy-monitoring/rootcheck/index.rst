.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
    :description: The new SCA module replaces Rootcheck when performing policy monitoring. Learn more about how the rootcheck works and its configuration. 
    
.. _rootcheck_introduction:

Rootcheck
=========

Since Wazuh v3.9.0, the new :ref:`SCA module <manual_sec_config_assessment>` replaces *Rootcheck* when performing policy monitoring.

Wazuh monitors configuration files to ensure they are compliant with your security policies, standards, or hardening guides. Agents perform periodic scans to detect applications that are known to be vulnerable, unpatched, or misconfigured.

.. toctree::
    :maxdepth: 2

    how-it-works
    rootcheck-configuration
    rootcheck-faq
