.. _up_ossec_agent:

Migrating OSSEC agent installed from packages
===================================================

1. Backup your current configuration
------------------------------------

Stop OSSEC: ::

    $ /var/ossec/bin/ossec-control stop

Check if you have enough space to create a copy of ``/var/ossec``: ::

    $ du -h /var/ossec | tail -n1
    $ df -h /var

Backup ``/var/ossec``: ::

    $ cp -rp /var/ossec /var/ossec_backup


2. Remove your current installation
-----------------------------------

Debian and Ubuntu:
::

    $ apt-get remove ossec-hids-agent --purge

CentOS and Red Hat:
::

    $ yum remove ossec-hids-agent

Remove directory:

::

    $ rm -rf /var/ossec


3. Install Wazuh agent
------------------------

Follow the next guide in order to install Wazuh agent:

- :ref:`Install Wazuh agent with RPM packages <wazuh_agent_rpm>`
- :ref:`Install Wazuh agent with Deb packages <wazuh_agent_deb>`


4. Restore configuration
------------------------

Stop OSSEC: ::

    $ systemctl stop wazuh-agent

Restore files: ::

    $ cp -p /var/ossec_backup/etc/ossec.conf /var/ossec/etc/ossec.conf.orig
    $ cp -p /var/ossec_backup/etc/local_internal_options.conf /var/ossec/etc/local_internal_options.conf
    $ cp -p /var/ossec_backup/etc/client.keys /var/ossec/etc/
    $ cp -p /var/ossec_backup/queue/rids/* /var/ossec/queue/rids/


5. Review ossec.conf
--------------------

The previous configuration file is saved as ``/var/ossec/etc/ossec.conf.orig``. You should review the new configuration file ``/var/ossec/etc/ossec.conf`` with the old one in case that you want to add some setting from the previous configuration.

Do not forget to restore the IP of the manager:

``/var/ossec/etc/ossec.conf`` ::

    <ossec_config>
      <client>
        <server-ip>MANAGER_IP</server-ip>


6. Start Wazuh
--------------
::

    $ /var/ossec/bin/ossec-control start
