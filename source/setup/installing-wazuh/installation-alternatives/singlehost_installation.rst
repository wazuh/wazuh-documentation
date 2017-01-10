.. _singlehost_installation:

Single-host arquitecture installation
==============================================

In order to install all components of Wazuh in the same server, performs all the steps described in the :ref:`main guide <installation_main>` **except**:

 - Install Filebeat: It is no necessary due to we do not need send the alerts to another server.
 - Encrypting communications between Wazuh server and Elastic Stack server: It is no necessary due to the same reasons than the previous one.

After performing the installation steps, we configure Logstash to read Wazuh alerts:

1. Edit file ``/etc/logstash/conf.d/01-wazuh.conf``, comment the lines related to SSL at ``input/beats`` and uncomment the lines related to Local Wazuh Manager in ``input/file``. The file should remain such this::

    input {
       file {
           type => "wazuh-alerts"
           path => "/var/ossec/logs/alerts/alerts.json"
           codec => "json"
       }
    }

2. Restart Logstash. The command depends on the OS init system:

	a. For Systemd::

		systemctl restart logstash.service

	b. For legacy SysV Init::

		service logstash restart
