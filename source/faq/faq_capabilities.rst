.. Copyright (C) 2019 Wazuh, Inc.

.. _faq_capabilities:

Capabilities
============


Can the wazuh-agent process any kind of hardware related events?
----------------------------------------------------------------

Wazuh agents can collect system information related to hardware and store it into a SQLite database on the manager side, producing alerts. Syscollector module is in charge of this task, you may find further information related to syscollector/hardware scan here. We also have rules related to external devices like USB.

How to monitor network devices?
-------------------------------

Most network devices can use Syslog protocol to forward log messages to a remote host. To monitor a network device it should be configured to forward logs to Wazuh manager Syslog server IP on port 514. These logs will be check against Wazuh ruleset. 

1.- Have Wazuh server syslog daemon (Rsyslog), write to a log file, and configure logcollector component to parse that file.

This option is pretty good, as it allows you to use Rsyslog templates to modify your logs format if needed. It also allows you to use Rsyslog filters to decide what you want to write to the file. 

On the other hand, this option can be expensive for the hard drive, as it needs to write logs to a file and maybe causing read/write overhead. This can be avoided using some other options below.

2.- Have Wazuh remote daemon (remoted) listening directly for incoming Syslog data.

A Remote daemon socket be set to listen for incoming Syslog data. This data will be processed and analyzed by decoders and rules.

To do so you would need to add another configuration stanza like this:
.. code-block:: XML

    <remote>
    <connection>syslog</connection>
    <port>1513</port>
    <allowed-ips>0.0.0.0/0</allowed-ips>
    </remote>

More info here: https://documentation.wazuh.com/current/user-manual/reference/ossec-conf/remote.html

This way Rsyslog isn't needed, and the network devices can directly point to Remoted socket (listening on port 1513/UDP in this case).

This option does not require to write/read events from a log file so it does not make use of the hard disk (saving disk resources). On the contrary custom filters or templates can be used(which are features provided by Rsyslog).

3.- Using Wazuh server syslog daemon (Rsyslog) and writing the output locally to the Remoted syslog socket.

This is a really useful choice, as all Rsyslog features can be used and still not write events to a file. You can add a Syslog rule for example to ``/etc/rsyslog.d/wazuh.conf`` like this one:

``if ($fromhost-ip == '10.10.10.1' or $fromhost-ip == '10.10.10.2') then @127.0.0.1:1513``

This rule would redirect data from source IPs 10.10.10.1 and 10.10.10.2 to the local Remoted socket (filtering out everything else). In this scenario those IPs could be your network devices.

4.- Collecting Syslog using a Wazuh agent.

There are scenarios where is useful to collect syslog data through an agent. It is possible to use Rsyslog and redirect the output to a file, monitored by the agent.

