.. _singlehost_installation:

Single-host architecture installation
==============================================

Usally, Wazuh is installed using a distributed architecture but in case you need it, you can install Wazuh in a single-host architecture. That means you will setup the Wazuh Manager and the Elastic Stack on the same server:

.. thumbnail:: ../../../images/installation/installing_wazuh_singlehost.png
    :title: Installing Wazuh Manager - Single-host
    :align: center
    :width: 100%

In order to install Wazuh Manager in the same server, you must follow all the steps decribed in the guide :ref:`Installation via packages <installation_main>`

.. Warning::
  You don't need to install Filebeat

After performing the previous steps, we configure Logstash to read Wazuh alerts:

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
