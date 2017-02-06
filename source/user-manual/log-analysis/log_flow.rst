.. _log_flow:

How it works
===============================

This diagram is a basic ilustration of the log flow, It will help you to understand how it works.

.. image:: ../../images/manual/log_analysis/log_flow.png
    :align: center
    :width: 100%

Wazuh Agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
- **Collector** recopile all the logs from the server. The logs monitored logs are user defined.

Wazuh Manager
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Inside the manager, three phases can be distinguished:

- **Decode**: that extracts known fields from the log message, identifies key information (SRC IP, username...).
- **Analyze**: next step is to check if any of the rules that are internally stored, matches.
- **Alert**: once the rule is matched, the manager will create an alert.

.. note::
    More information about `Wazuh Ruleset <../ruleset/index.html>`_

Example
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Example of the alerts generated on a bruteforce attack:
::

  [root@manager logs]# tail -f /var/ossec/alerts/alerts.log
  ** Alert 1459515987.48334: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1, 2016 Apr 01 13:06:27 manager->/var/log/secure
  Rule: 5710 (level 5) -> 'Attempt to login using a non-existent user'
  Src IP: 212.186.126.139
  Apr 1 13:06:27 manager sshd[513]: Invalid user admin from 212.186.126.139
  ** Alert 1459515991.48672: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1, 2016 Apr 01 13:06:31 manager->/var/log/secure
  Rule: 5710 (level 5) -> 'Attempt to login using a non-existent user'
  Src IP: 212.186.126.139
  Apr 1 13:06:30 manager sshd[515]: Invalid user admin from 212.186.126.139
  ** Alert 1459516007.50362: - syslog,sshd,invalid_login,authentication_failed,pci_dss_10.2.4,pci_dss_10.2.5,pci_dss_10.6.1, 2016 Apr 01 13:06:47 manager->/var/log/secure
  Rule: 5710 (level 5) -> 'Attempt to login using a non-existent user'
  Src IP: 212.186.126.139
  Apr 1 13:06:47 manager sshd[535]: Invalid user admin from 212.186.126.139
  ** Alert 1459516011.50700: mail - syslog,sshd,authentication_failures,pci_dss_11.4,pci_dss_10.2.4,pci_dss_10.2.5,
  2016 Apr 01 13:06:51 manager->/ var/log/secure
  Rule: 5712 (level 10) -> 'SSHD brute force trying to get access to the system.'
  Src IP: 212.186.126.139
