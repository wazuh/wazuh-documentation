.. Copyright (C) 2021 Wazuh, Inc.

.. _manual_command_monitoring:

Command monitoring
==================

Wazuh not only can watch log files or Windows events on its monitored hosts for applications and operating system log messages, or watch for messages of devices that are using Syslog, but it can also read the output of monitored commands to be run periodically on these hosts. These specifically authorized commands can be configured to check important system status data such as running processes, system load averages, or to detect USB storage, among other monitoring purposes.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        command-configuration
        command-faq
