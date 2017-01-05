.. _installation_single:

Introduction
---------------------------------------------

This installation guide describes the installation and configuration of all components of Wazuh in the same host:

.. image:: ../../images/installation/ins_option2.png
    :align: center
    :width: 100%


Installing Wazuh server
---------------------------------------------

Follow the proper guide in order to install Wazuh server **ignoring the section of Filebeat**:

 - :ref:`Install Wazuh server on CentOS <wazuh_server_centos>`
 - :ref:`Install Wazuh server on Debian <wazuh_server_debian>`

Installing Elastic Stack server
---------------------------------------------

Follow the proper guide in order to install Elastic server:

 - :ref:`Install Elastic server on CentOS <elastic_server_centos>`
 - :ref:`Install Elastic server on Debian <elastic_server_debian>`


Configuring Logstash
---------------------------------------------

Now we'll configure Logstash to use it on connections with Wazuh Manager.

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


Connecting the Wazuh App with the API
---------------------------------------------

Follow the next guide in order to connect the Wazuh App with the API:

 - :ref:`Connect the Wazuh App with the API <connect_wazuh_app>`
