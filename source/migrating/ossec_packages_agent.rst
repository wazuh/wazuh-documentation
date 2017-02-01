.. _upgrading_ossec_packages_agent:

Migrating OSSEC Agent installed from packages
===================================================

Step 1: Backup your current configuration.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stop OSSEC: ::

    $ /var/ossec/bin/ossec-control stop

Check if you have enough space to create a copy of */var/ossec*: ::

    $ du -h /var/ossec | tail -n1
    $ df -h /var

Backup */var/ossec*: ::

    $ cp -r /var/ossec /var/ossec_backup


Step 2: Remove your current installation.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Debian and Ubuntu:
::

    $ apt-get remove ossec-hids-agent --purge

CentOS and Red Hat:
::

    $ yum remove ossec-hids-agent

Remove directory:

::

    $ rm -rf /var/ossec


Step 3: Install Wazuh.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Follow the next guide in order to install Wazuh agent:

**Debian, Ubuntu, and other Debian-based systems**

.. toctree::
    :maxdepth: 1

    ../installation_guide/installing-agents/packages-installation/wazuh_agent_deb


**Red Hat, CentOS and other RPM-based systems**

.. toctree::
    :maxdepth: 1

    ../installation_guide/installing-agents/packages-installation/wazuh_agent_rpm


Step 4: Restore configuration.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Stop OSSEC: ::

    $ systemctl stop wazuh-agent

Restore files: ::

    $ cp /var/ossec_backup/etc/ossec.conf /var/ossec/etc/ossec.conf.orig
    $ cp /var/ossec_backup/etc/local_internal_options.conf /var/ossec/etc/local_internal_options.conf
    $ cp /var/ossec_backup/etc/client.keys /var/ossec/etc/
    $ cp /var/ossec_backup/queue/rids/* /var/ossec/queue/rids/


Step 5: Review ossec.conf.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The previous configuration file is saved as */var/ossec/etc/ossec.conf.orig*. You should review the new configuration file */var/ossec/etc/ossec.conf* with the old one in case that you want to add some setting from the previous configuration.

Do not forget to restore the IP of the manager:

*/var/ossec/etc/ossec.conf* ::

    <ossec_config>
      <client>
        <server-ip>MANAGER_IP</server-ip>


Step 6: Start Wazuh.
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
::

    $ /var/ossec/bin/ossec-control start
