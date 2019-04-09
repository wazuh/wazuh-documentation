.. Copyright (C) 2018 Wazuh, Inc.

.. _log-analysis-examples:

Configuration
==========================

#. `Basic usage`_
#. `Monitoring logs using regular expressions for file names`_
#. `Monitoring date-based logs`_
#. `Using environment variables`_
#. `Using multiple outputs`_


Basic usage
-----------

Log data collection is configured in the :ref:`ossec.conf <reference_ossec_conf>` file primarily in the :ref:`localfile <reference_ossec_localfile>`, :ref:`remote <reference_ossec_remote>` and :ref:`global <reference_ossec_global>` sections. Configuration of log data collection can also be completed in the :ref:`agent.conf <reference_agent_conf>` file to centralize the distribution of these configuration settings to relevant agents.

As in this basic usage example, provide the name of the file to be monitored and the format:

.. code-block:: xml

    <localfile>
        <location>/var/log/messages</location>
        <log_format>syslog</log_format>
    </localfile>

Monitoring logs using regular expressions for file names
--------------------------------------------------------

Wazuh supports posix regular expressions. For example, to analyze every file that ends with a .log inside the ``/var/log`` directory, use the following configuration:

.. code-block:: xml

    <localfile>
        <location>/var/log/*.log</location>
        <log_format>syslog</log_format>
    </localfile>

Monitoring date-based logs
--------------------------

For log files that change according to the date, you can also specify a **strftime** format to replace the day, month, year, etc. For example, to monitor the log files like ``C:\Windows\app\log-08-12-15.log``, where 08 is the year, 12 is the month and 15 the day (and it is rolled over every day), configuration is as follows:

.. code-block:: xml

    <localfile>
        <location>C:\Windows\app\log-%y-%m-%d.log</location>
        <log_format>syslog</log_format>
    </localfile>

Using environment variables
---------------------------

Environment variables like ``%WinDir%`` can be used in the location pattern. The following is an example of reading logs from an IIS server:

.. code-block:: xml

    <localfile>
        <location>%WinDir%\System32\LogFiles\W3SVC3\ex%y%m%d.log</location>
        <log_format>iis</log_format>
    </localfile>

Using multiple outputs
----------------------

Log data is sent to the agent socket by default, but it is also possible to specify other sockets as output. ``ossec-logcollector`` uses UNIX type sockets to communicate allowing TCP or UDP protocols.

To add a new output socket we need to specify it using the tag ``<socket>`` as shown in the following example configuration:

.. code-block:: xml

    <socket>
        <name>custom_socket</name>
        <location>/var/run/custom.sock</location>
        <mode>tcp</mode>
        <prefix>custom_syslog: </prefix>
    </socket>

    <socket>
        <name>test_socket</name>
        <location>/var/run/test.sock</location>
    </socket>

.. note::

	More information about defining a socket: :ref:`socket <reference_ossec_socket>`

Once the socket is defined, it's possible to add the destination socket for each *localfile*:

.. code-block:: xml

    <localfile>
        <log_format>syslog</log_format>
        <location>/var/log/messages</location>
        <target>agent,test_socket</target>
    </localfile>

    <localfile>
        <log_format>syslog</log_format>
        <location>/var/log/messages</location>
        <target>custom_socket,test_socket</target>
    </localfile>

.. warning::
    To keep the output to the default socket we need to specify it using 'agent' as target. Otherwise the output will be redirected only to the specified targets.
