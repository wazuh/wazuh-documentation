.. Copyright (C) 2020 Wazuh, Inc.

.. _good-practices:

Recommended practices
---------------------

When managing an environment, it is vital to make sure it is healthy, safe and human error proved. On this guide, we will lay some of the best practices we should follow to have our Wazuh environment on its peak performance.


Disk space
----------

One common issue is running out of disk space. When maintaining an environment we should do regular check-ups on the available disk space. A very quick way of doing so is executing the following:

.. code-block:: console

  # df -h

A common cause of high disk space is leaving the ``<logall>`` option enabled. This option will store all the collected logs, even those that did not trigger a Wazuh alert, in ``/var/ossec/logs/archives``.
This option is mainly used for testing purposes, leaving it enabled can cause unnecessary disk consumption. To disable it, go to:

.. code-block:: console

  /var/ossec/etc/ossec.conf

Make sure the logall option is set to no:

.. code-block:: xml

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

If adding disk space is an option that we would rather avoid, we can try and free some space from Wazuh's logs. For these steps is important to be thorough and careful, to avoid deleting anything we do not wish to delete.

First, execute this command to check how much space do we have occupied:

.. code-block:: console

  # du -h -d1 /var/ossec/logs/

This command will tell us how much disk space each subfolder takes. From these results, we are only interested in ``/var/ossec/logs/alerts`` and ``/var/ossec/logs/archives``. Especially this second one. If ``archives`` is occupying a lot of space,
that means that we have ``logall`` enabled, it will be recommendable to disable it if you have not done it already. This folder will be the first one we can use to free space. It follows the following structure:


.. code-block:: console

    ├── archives
    │   ├── 2019
    │   │   ├── Dec
    │   │   ├── Nov
    │   │   └── Oct
    │   ├── 2020
    │   │   ├── Feb
    │   │   ├── Jan
    │   │   └── Mar
    │   ├── archives.json
    │   └── archives.log

There is a subfolder for each year, one for each month and inside there will be files for each day. Given that this is archives, it will be possible to delete the entire month if we do not wish to keep any of the data. Do not delete the anual folder nor the ``archives.json`` or the ``archives.log``, in case we decide to use them in te future for testing.

If these steps did not free enough disk space, we could have to take a look at the ``alerts`` folder. Here we must be extremely careful. The first step would be to decide our retention policy, depending on it we can decide which files to delete. It is not the same to have a one year retention policy than to have a 90 days retention policy.

``Alerts`` follows the same structure as ``Archives``:

.. code-block:: console

    ├── alerts
    │   ├── 2019
    │   │   ├── Dec
    │   │   ├── Nov
    │   │   └── Oct
    │   ├── 2020
    │   │   ├── Feb
    │   │   ├── Jan
    │   │   └── Mar
    │   ├── alerts.json
    │   └── alerts.log

Once the retention policy has been established, we can proceed to delete the chosen files. Remember to do so carefully, preferably one by one, to avoid deleting something accidentally. In each folder, each compressed file will have the alerts of each day, you may have up to 4 files for each day, corresponding to the compressed logs ``.json.gz`` and ``.log.gz`` plus the checksum file for each of them, which ensures their integrity. Do not delete the ``alerts.json`` or the ``alerts.log`` file. Delete the files you no longer need at your own risk.

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

These two folders must be copied with the manager service stopped:

.. code-block:: console

  /var/ossec/var/db/global.db
  /var/ossec/queue/db


From this paths, the more critical are::

  /var/ossec/etc
  /var/ossec/logs

In ``/var/ossec/etc`` we can find our client.keys, customized configurations, customized rules and configurations of our agent groups.

In ``/var/ossec/logs`` we will find all our alerts, archives and logs from different Wazuh components. This will be the heaviest folder in Wazuh, as it will contain all the alerts the Manager has detected.

The file ``/var/ossec/etc/client.keys`` has the registration information of all our agents. Without it, the agents would not be able to connect to the Manager. For this reason and given that it is a very small file, it is good practice to make regular backups of it.
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

For more detailed information, go to our `daemons page <../reference/daemons/index.html>`_

If any of these processes does not show up, the first thing to do will be to restart the Manager and check again.

a) For Systemd:

  .. code-block:: console

    # systemctl restart wazuh-manager

b) For SysV Init:

  .. code-block:: console

    # service wazuh-manager restart

For further help troubleshooting do not hesitate to visit our community channels where our team will be happy to help you. You can find us in `Slack <https://wazuh.com/community/join-us-on-slack/>`_ and in our `Google mailing list <https://groups.google.com/group/wazuh>`_.
