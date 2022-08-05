.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Wazuh uses three components to perform policy monitoring: Rootcheck, OpenSCAP and CIS-CAT. Learn more about these components here. 
    
.. _manual_policy_monitoring:

Monitoring security policies
============================

Policy monitoring is the process of verifying that all systems conform to a set of predefined rules regarding configuration settings and approved application usage.

Wazuh uses three components to perform this task: *Rootcheck*, *OpenSCAP*, and *CIS-CAT*.

.. note::
    Since OpenSCAP was deprecated from version 4.0, we recommend using :ref:`Security Configuration Assessment (SCA) <manual_sec_config_assessment>` instead. The SCA was specially created by Wazuh to overcome limitations inherent to the other integrations such as OpenSCAP.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        rootcheck/index
        openscap/index
        ciscat/ciscat
