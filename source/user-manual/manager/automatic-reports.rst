.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn how to configure your own customized reports in Wazuh by using the report option in the ossec.conf file. 
  
.. _automatic-reports:

Generating automatic reports
-----------------------------

Daily reports are summaries of the alerts that were triggered each day. You can configure your own customized report by using the ``report`` option in the ``ossec.conf`` file. See the :ref:`report <reference_ossec_reports>` documentation to learn more. 

For information on configuring email alerts, see the :ref:`Configuring email alerts <manual_email_report>` and :doc:`SMTP server with authentication <manual-email-report/smtp-authentication>` sections. 

.. code-block:: xml

 <ossec_config>
   <reports>
       <category>syscheck</category>
       <title>Daily report: File changes</title>
       <email_to>example@test.com</email_to>
   </reports>
 </ossec_config>

The above configuration will send a daily report of all :ref:`syscheck <manual_file_integrity>` alerts to ``example@test.com``.

Rules may also be filtered by level, source, username, rule id, etc.

For example:

.. code-block:: xml

 <ossec_config>
   <reports>
       <level>10</level>
       <title>Daily report: Alerts with level higher than 10</title>
       <email_to>example@test.com</email_to>
   </reports>
 </ossec_config>

The above configuration will send a report with all rules that fired with a level higher than 10.


**Example of the generated report**

.. code-block:: none
 :class: output

 From: Wazuh                      12:01 AM (10 hours ago)
 to me
 ------------------------------------------------

 Report 'Daily report: File changes' completed.
 ------------------------------------------------
 ->Processed alerts: 368
 ->Post-filtering alerts: 58
 ->First alert: 2017 Mar 08 06:31:26
 ->Last alert: 2017 Mar 08 13:11:42

 Top entries for 'Level':
 ------------------------------------------------
 Severity 5                                                                    |47      |
 Severity 7                                                                    |11      |

 Top entries for 'Group':
 ------------------------------------------------
 ossec                                                                         |58      |
 pci_dss_11.5                                                                  |58      |
 syscheck                                                                      |58      |

 Top entries for 'Location':
 ------------------------------------------------
 localhost->syscheck                                                           |51      |
 (ubuntu) 192.168.1.242->syscheck                                              |7       |

 Top entries for 'Rule':
 ------------------------------------------------
 554 - File added to the system.                                               |47      |
 550 - Integrity checksum changed.                                             |11      |

 Top entries for 'Filenames':
 ------------------------------------------------
 /boot/grub/grub.cfg                                                           |1       |
 /etc/apt/apt.conf.d/01autoremove-kernels                                      |1       |
 /etc/group                                                                    |1       |
 /etc/group-                                                                   |1       |
 /etc/gshadow                                                                  |1       |
 /etc/gshadow-                                                                 |1       |
 /etc/passwd                                                                   |1       |
 /etc/passwd-                                                                  |1       |
 /etc/postfix/main.cf                                                          |1       |
 /etc/shadow                                                                   |1       |
 /etc/shadow-                                                                  |1       |
