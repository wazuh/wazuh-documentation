.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: 

Configuration for monitoring log files
======================================

You can use a local configuration file on the Wazuh agent or Wazuh server to monitor log files. There is also a centralized configuration file on the Wazuh server to monitor log files across multiple endpoints. These two configuration options for monitoring log files are explained below.

- Local configuration: The :doc:`ossec.conf </user-manual/reference/ossec-conf/index>` file is the main configuration file on the Wazuh server and the Wazuh agent. The Wazuh agent collects logs from monitored endpoints and forwards these logs to the Wazuh server for analysis. You can configure the Wazuh agent ossec.conf file to collect logs from specific log files on a monitored endpoint. The table below shows the location of the ossec.conf file on different operating systems.


=================  ==================================================
Operating systems  Location of the ossec.conf file
=================  ==================================================
Windows            ``C:\Program Files (x86)\ossec-agent\ossec.conf``
Linux/Unix         ``/var/ossec/etc/ossec.conf``
macOS              ``/Library/Ossec/etc/ossec.conf``
=================  ==================================================

- Centralized configuration: The :doc:`agent.conf </user-manual/reference/centralized-configuration>` file on the Wazuh server enables centralized distribution of configuration settings to multiple monitored endpoints in the same operating system or group. For example, you can configure the ``agent.conf`` file to distribute configuration settings to all monitored Windows endpoints.  Configuration settings in the ``agent.conf`` file take precedence over the settings in the ``ossec.conf`` file.

.. note:: The Wazuh agent is designed to be a lightweight application that minimizes RAM and CPU usage on the endpoint where it is installed. On the Wazuh server side, the CPU and memory consumption is influenced by the number of events per second (EPS) that the server needs to analyze.

Monitoring basic log files
--------------------------

You can configure the Wazuh agent ``ossec.conf`` file on Windows, Linux, and macOS endpoints to monitor basic log files. For example, perform the following steps to monitor the file ``file.log``.

#. Add the following settings in between the ``<ossec_config>`` tags of the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <localfile>
        <location>/<FILE_PATH>/file.log</location>
        <log_format>syslog</log_format>
      </localfile>
   
   Where:

   - ``location``: is the full path of the monitored file.
   - ``log_format``: represents the format of the log. Refer to the :ref:`log format documentation <log_format>` to learn more about the different types of ``log_format`` you can configure.

   Refer to the :doc:`localfile documentation </user-manual/reference/ossec-conf/localfile>` to learn more about the options of the ``<localfile>`` configuration block.


#. Restart the Wazuh agent with administrator privileges to apply the configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows (PowerShell): ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``


Monitoring date-based log files   
-------------------------------

You can configure Wazuh to  dynamically monitor log files on endpoints, adapting to changes based on the date. It employs the ``strftime`` format to accurately represent date-based log files, encompassing day, month, year, and other relevant information. Perform the following steps to monitor a date-based log file ``file-23-06-15.log``.

#. Add the following settings in between the ``<ossec_config>`` tags of the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <localfile>
        <location>/<FILE_PATH>/file-%y-%m-%d.log</location>
        <log_format>syslog</log_format>
      </localfile>

   .. note:: In the file name ``file-23-06-15.log``, ``23`` is the last two digits of the year, ``06`` is the month, and ``15`` is the day.

#. Restart the Wazuh agent with administrator privileges to apply the configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows (PowerShell): ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``

Monitoring log files using wildcard patterns
--------------------------------------------

Wazuh offers support for wildcard patterns when monitoring log files, allowing for flexible file selection. For example, you can monitor all files ending with ``.log`` within a monitored endpoint’s directory. Perform the following steps to monitor every log file that starts with ``file`` and ends with ``.log`` in a directory of a monitored endpoint.

#. Add the following settings in between the ``<ossec_config>`` tags of the Wazuh agent configuration file:

   - Linux: ``/var/ossec/etc/ossec.conf``
   - Windows: ``C:\Program Files (x86)\ossec-agent\ossec.conf``
   - macOS: ``/Library/Ossec/etc/ossec.conf``

   .. code-block:: xml

      <localfile>
        <location>/<FILE_PATH>/file*.log</location>
        <log_format>syslog</log_format>
      </localfile>

#. Restart the Wazuh agent with administrator privileges to apply the configuration change:

   - Linux: ``systemctl restart wazuh-agent``
   - Windows (PowerShell): ``Restart-Service -Name wazuh``
   - macOS: ``/Library/Ossec/bin/wazuh-control restart``

Monitoring log files with environment variables
-----------------------------------------------

.. note:: You can use environment variables in the log file path only on Windows endpoints.

Wazuh leverages Windows environment variables like ``%WINDIR%`` and ``%ProgramFiles%`` to monitor log files. For example, perform the following steps to monitor ``C:\Windows\Logs\StorGroupPolicy.log`` file.

#. Add the following configuration in between the ``<ossec_config>`` tags of the Wazuh agent ``C:\Program Files (x86)\ossec-agent\ossec.conf`` file:

   .. code-block:: xml

      <localfile>
        <location>%WINDIR%\Logs\StorGroupPolicy.log</location>
        <log_format>syslog</log_format>
      </localfile>

   .. note:: ``%WINDIR%`` in ``%WINDIR%\Logs\StorGroupPolicy.log`` represents ``C:\Windows``. Hence, ``%WINDIR%\Logs\StorGroupPolicy.log`` is equivalent to ``C:\Windows\Logs\StorGroupPolicy.log``.

#. Restart the Wazuh agent via PowerShell with administrator privileges to apply the configuration change:    

   .. code-block:: xml

      > Restart-Service -Name wazuh

 
