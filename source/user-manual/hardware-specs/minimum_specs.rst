.. _hardware_specs:

Recommended Specs
=================

This section describes hardware recommendations as well as the recommended operating systems where Wazuh can be deployed. In order to deploy an elastic cluster with optimal performance, follow the guidelines described in https://www.elastic.co/guide/en/elasticsearch/guide/current/hardware.html.

CPUs
----

Wazuh doesn't currently paralyze processes, so if you need to choose between faster CPUs or more cores, choose faster CPUs. 

As you can see from the tables, the CPU is not the most important hardware feature to increase, only when the load is excessive is the processor used to a significant measure. Both managers and agents can work with a single core without even making high use of the resources it provides.

Memory
------

This feature does not have too high a consumption by the agents, in the case of the managers it is possible to give a more considerable use depending on the processes that are being carried out. In the case of managers, the amount (always indicative) suggested for an optimal operation has been 8 GB, while the consumption of less than 0.1% over 1 GB of RAM in agents makes this feature irrelevant for them.

Disk
----

Regarding the use of persistent storage, a considerable size is required in the master, since the generation of logs (and their constant rotation) can take up a lot of space on the hard disk and even more if you have activated the "logall" option in ossec.conf, since all the events that reach the manager will be stored, not just those that generate alerts. On the agent side, information is also stored but in no case in the same amount as in the manager. This is why a 256GB capacity on a solid state hard disk is recommended.

Network
-------

Regards the generation of network traffic, in the agents the incoming traffic is minimal since the manager barely sends information to the agent, beyond the control information, active responses, etc. All this generates an average incoming traffic of less than 0.1KB/s which can be considered insignificant, the outgoing traffic is somewhat higher since the log information is sent regularly to the manager, reaching 174.6 KB/s in extreme cases.  As is to be expected in the manager the traffic is mostly incoming, since all the agents report to it, only in the case of using a cluster with several managers these values can vary, although not in a very significant way.

Manager recommendations
-----------------------

To maintain a stable performance, the following features are recommended.

+------------------------------------------------------------------+------------------------------------------------------------------------+
| Type                                                             | Value                                                                  |
+==================================================================+========================================================================+
| CPU (1)                                                          | Dual-Core 2.5 GHz                                                      |
+------------------------------------------------------------------+------------------------------------------------------------------------+
| RAM                                                              | 4 GB DDR3 1066 MHz                                                     |
+------------------------------------------------------------------+------------------------------------------------------------------------+
| Hard disk (2)                                                    | 128 GB Solid State Drive                                               |
+------------------------------------------------------------------+------------------------------------------------------------------------+
| Recommended Distributions (3)                                    | * RPM Based:  Centos7, RHEL7                                           |
|                                                                  | * DEB Based:  Debian 9, ubuntu 16.04                                   |
+------------------------------------------------------------------+------------------------------------------------------------------------+

.. note::
	1) Preferably increase processor frequency rather than the number of processors.
	2) Disk size depends on the number of events generated per second, in the case of registering "archives" is necessary a bigger capacity.
	3) Older operating systems are supported, but the use of the newer stable operating systems within each distribution is recommended.

.. note::
	This manager performance depends on the Events per Second (EPS), so this values may vary a lot depending on this variable.
	With this settings, a manager receiving 400-600 EPS works well.

Agent recommendations
---------------------

Most significant values of consumption are shown in the following table (The specifications of the machine used are 1 processor at 3.0 GHz and 4 GB of memory):

+-------------------------------+---------------+---------------------+----------------+-----------------------+
| Type                          | Low (5 EPS)   | Medium (20 EPS)     | High (60 EPS)  | Very high (> 500 EPS) |
+===============================+===============+=====================+================+=======================+
| CPU usage                     | < 0.1 %       | 0.1 %               | 0.67 %         |    5.00 %             |
+-------------------------------+---------------+---------------------+----------------+-----------------------+
| RAM usage                     | < 0.1 %       | < 0.1 %             | < 0.1 %        |    0.7 %              |
+-------------------------------+---------------+---------------------+----------------+-----------------------+
| Outbound traffic              | 1.4 KB/s      | 4.9 KB/s            | 9.1 KB/s       |    50.6 KB/s          |
+-------------------------------+---------------+---------------------+----------------+-----------------------+
| Inbound traffic               | < 0.1 KB/s    | < 0.1 KB/s          | < 0.1 KB/s     |    < 0.1 KB/s         |
+-------------------------------+---------------+---------------------+----------------+-----------------------+
| I/O                           | < 1 KB/s      | < 1 KB/s            | < 1  KB/s      |    < 1 KB/s           |
+-------------------------------+---------------+---------------------+----------------+-----------------------+

This values are a bit higher in Windows agents because the Windows agents generate a greater number of events in a larger size.

It indicates that Wazuh agents can run on machines with very limited hardware.
