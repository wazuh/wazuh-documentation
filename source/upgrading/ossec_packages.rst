.. _upgrading_ossec_packages:

Packages
===================================================

This section describes how to upgrade from OSSEC to Wazuh in case that OSSEC was installed using official OSSEC packages. Follow the next steps according to your system distribution.


Debian and Ubuntu based Linux distributions
---------------------------------------------------

Follow the normal procedure to :ref:`install Wazuh <installation>` and it will be automatically updated.

.. warning::
    The configuration file **/var/ossec/etc/ossec.conf will be overwritten**. The *old* configuration file from the current installation is saved as *ossec.conf.deborig*. You should compare the new file with the old one.

.. note::
    A backup of your previous ruleset will be saved at */var/ossec/etc/backup_ruleset*. You need to review it in case you have created new rules/decoders in other file than *local_rules.xml* or *local_decoder.xml*.


Red Hat and CentOS
---------------------------------------------------

In this case, it is necessary to backup the configuration, remove the current package and install wazuh.

Manager
^^^^^^^^^^^^^^^^^^

Step 1: Backup your current configuration.

Stop OSSEC: ::

    $ /var/ossec/bin/ossec-control stop

Check if you have enough space to create a copy of */var/ossec*: ::

    $ du -h /var/ossec | tail -n1
    $ df -h /var

Backup */var/ossec*: ::

    $ cp -r /var/ossec /var/ossec_backup

Step 2: Remove your current installation. ::

    $ yum remove wazuh-hids
    $ rm -rf /var/ossec

Step 3: :ref:`Install Wazuh <installation>`.

Step 4: Restore configuration.

Stop OSSEC: ::

    $ systemctl stop wazuh-manager

Restore main files: ::

    $ cp /var/ossec_backup/agentless/.passlist /var/ossec/agentless/
    $ cp /var/ossec_backup/etc/client.keys /var/ossec/etc/
    $ cp /var/ossec_backup/etc/ossec.conf /var/ossec/etc/ossec.conf.orig
    $ cp /var/ossec_backup/etc/local_internal_options.conf /var/ossec/etc/local_internal_options.conf
    $ cp /var/ossec_backup/etc/local_decoder.xml /var/ossec/etc/decoders/local_decoder.xml
    $ cp /var/ossec_backup/etc/shared/agent.conf /var/ossec/etc/shared/agent.conf
    $ cp /var/ossec_backup/rules/local_rules.xml /var/ossec/etc/rules/local_rules.xml
    $ cp /var/ossec_backup/queue/rids/sender_counter /var/ossec/queue/rids/sender_counter

Restore optional files: ::

    $ cp -r /var/ossec_backup/logs/archives/* /var/ossec/logs/archives
    $ cp -r /var/ossec_backup/logs/alerts/* /var/ossec/logs/alerts
    $ cp -r /var/ossec_backup/queue/rootcheck/* /var/ossec/queue/rootcheck
    $ cp -r /var/ossec_backup/queue/syscheck/* /var/ossec/queue/syscheck

Step 5: Compare ossec.conf.

Compare the old configuration file (/var/ossec/etc/ossec.conf.orig) with the new one (/var/ossec/etc/ossec.conf).

Step 6: Start Wazuh. ::

    $ /var/ossec/bin/ossec-control start

Agent
^^^^^^^^^^^^^^^^^^

Step 1: Backup your current configuration.

Stop OSSEC: ::

    $ /var/ossec/bin/ossec-control stop

Check if you have enough space to create a copy of */var/ossec*: ::

    $ du -h /var/ossec | tail -n1
    $ df -h /var

Backup */var/ossec*: ::

    $ cp -r /var/ossec /var/ossec_backup


Step 2: Remove your current installation. ::

    $ yum remove ossec-hids-agent.x86_64
    $ rm -rf /var/ossec

Step 3: :ref:`Install Wazuh <installation>`.

Step 4: Restore configuration.

Stop OSSEC: ::

    $ systemctl stop wazuh-agent

Restore main files: ::

    $ cp /var/ossec_backup/etc/ossec.conf /var/ossec/etc/ossec.conf.orig
    $ cp /var/ossec_backup/etc/local_internal_options.conf /var/ossec/etc/local_internal_options.conf
    $ cp /var/ossec_backup/etc/client.keys /var/ossec/etc/
    $ cp /var/ossec_backup/queue/rids/* /var/ossec/queue/rids/

Step 5: Compare ossec.conf.

Compare the old configuration file (/var/ossec/etc/ossec.conf.orig) with the new one (/var/ossec/etc/ossec.conf).

Step 6: Start Wazuh. ::

    $ /var/ossec/bin/ossec-control start
