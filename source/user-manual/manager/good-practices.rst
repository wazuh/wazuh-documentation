.. Copyright (C) 2020 Wazuh, Inc.

.. _good-practices:

Recommended practices
---------------------

When managing an environment, it is vital to know how to make sure it is healthy, safe and human error proved. On this guide, we will lay some of the best practices we should follow to have our Wazuh environment on its peak performance.


Disk space
----------

On common issue is running out of disk space. When maintaining an environment we should do regular check-ups on the available disk space. A very quick way of doing so is executing the following:

.. code-block:: console

  # df -h

A common cause of high disk space is to leave the ``<logall>`` option enabled. This option will store all logs, even those that did not trigger a Wazuh alert, in ``/var/ossec/logs/archives``.
This option is mainly used for testing purposes, leaving it enabled can cause unnecessary disk consumption. To disable it, go to:

.. code-block:: console

  /var/ossec/etc/ossec.conf

On that file, make sure the option is set to no:

.. code-block:: file

  <ossec_config>
  <global>
    <jsonout_output>yes</jsonout_output>
    <alerts_log>yes</alerts_log>
    <logall>no</logall>
    <logall_json>no</logall_json>


Then restart the Manager to apply the changes:

a) For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

b) For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart


If we have more than 80% of the disk space used, we should urgently fix the situation. Otherwise, there is risk of data loss.
To do so, there are only two available options, either to free space or to increase disk space. 

If adding disk space is an option that we prefer to avoid, to free space in Wazuh


Back-ups
--------

Taking care of a sensible system is not an easy task and you should always be ready for the worst. Therefore, it is a highly recommendable practice to have backups of important files and folders, especially before making changes or upgrading.

Before making any important changes or upgrading, always make a backup of these files::

  /var/ossec/api/configuration
  /var/ossec/etc
  /var/ossec/logs
  /var/ossec/queue/rootcheck
  /var/ossec/queue/agent-groups
  /var/ossec/queue/agent-info
  /var/ossec/queue/agents-timestamp
  /var/ossec/queue/agentless
  /var/ossec/queue/cluster
  /var/ossec/queue/rids
  /var/ossec/queue/fts
  /var/ossec/var/multigroups

These two folders must be copied with the manager service stopped::

  /var/ossec/var/db/global.db
  /var/ossec/queue/db


From this paths, the more critical are::

  /var/ossec/etc
  /var/ossec/logs

In ``/var/ossec/etc`` we can find our client.keys, customized configurations, customized rules and configurations of our agent groups.

In ``/var/ossec/logs`` we will find all our alerts, archives and logs from different Wazuh components.

The file ``/var/ossec/etc/client.key`` has the registration information of all our agents. Without it, the agents would not be able to connect to the Manager. For this reason and given that it is a very small file, it is recommendable that we make regular backups of it.
Therefore if it is accidentally deleted or edited, it will be possible to restore a recent back-up and avoid having to re-register all the agents given the case.


Processes
---------

When checking on our Wazuh environment, we should always start by looking at the service status with:

* For Systemd:

  .. code-block:: console

    # systemctl status wazuh-manager

* For SysV Init:

  .. code-block:: console

    # service wazuh-manager status


If the service is running but we suspect there might be some issue, it is recommendable to make sure all the Wazuh daemons are running:

  .. code-block:: console

    # ps aux | grep ossec

The most common processes running are the following:

.. code-block:: none
    :class: output

    [root@master ~]# ps aux | grep ossec
    ossec     2561  0.0  1.0 926524 41668 ?        Ssl  13:38   0:00 /bin/node /var/ossec/api/app.js
    root      3127  0.0  0.0 178072  3596 ?        Sl   13:38   0:01 /var/ossec/bin/ossec-authd
    ossec     3141  0.0  0.1 636768  4392 ?        Sl   13:38   0:17 /var/ossec/bin/wazuh-db
    root      3161  0.0  0.0  30476  1432 ?        Sl   13:38   0:00 /var/ossec/bin/ossec-execd
    ossec     3175  0.0  0.8 780188 32252 ?        Sl   13:38   0:13 /var/ossec/bin/ossec-analysisd
    root      3182  0.0  0.1 179936  4272 ?        Sl   13:38   0:08 /var/ossec/bin/ossec-syscheckd
    ossecr    3196  0.2  0.0 442052  2964 ?        Sl   13:38   0:49 /var/ossec/bin/ossec-remoted
    root      3207  0.1  0.0 399132  1964 ?        Sl   13:38   0:27 /var/ossec/bin/ossec-logcollector
    ossec     3236  0.0  0.0  30448  1428 ?        Sl   13:38   0:01 /var/ossec/bin/ossec-monitord
    root      3270  0.1  0.4 573292 17044 ?        Sl   13:38   0:35 /var/ossec/bin/wazuh-modulesd
    ossec     3332  0.1  0.5 209320 20120 ?        S    13:38   0:18 /var/ossec/framework/python/bin/python3 /var/ossec/framework/scripts/wazuh-clusterd.py
    root     31797  0.0  0.0 112712   964 pts/0    R+   18:44   0:00 grep --color=auto ossec

If any of these processes does not show up, the first thing to do will be to restart the Manager:

a) For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

b) For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart
