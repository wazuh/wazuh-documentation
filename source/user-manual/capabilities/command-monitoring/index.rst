.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
    :description: Explore Wazuh command monitoring: Learn its operation, setup, output analysis, and real-world applications.
    
.. _manual_command_monitoring:

Command monitoring
==================

Wazuh command monitoring capability allows you to monitor the output of specific commands and treat the output as log content. Command monitoring can be used to monitor a variety of things, such as disk space utilization, load average, a change in network listeners, and running processes to ensure all important processes are running.

Command monitoring can be used to detect a variety of anomalies and threats. For example, you could use it to monitor for a change in the output of the ``netstat`` command, which would indicate that a new network listener has been added or removed. You could also use it to monitor for the presence of specific strings in the output of the ``ps`` command, which could indicate that a malicious process is running.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        configuration
        use-cases/index   