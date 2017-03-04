.. _upgrading_lf_to_filebeat:

Change from Logstash forwarder to Filebeat
==========================================

Remove logstash-forwarder
-------------------------

Logstash-forwarder was the old system to ship logs from our host to our Logstash server. This system is now deprecated and replaced by Filebeat.

Remove logstash-forwarder:

Deb systems::

	apt-get remove logstash-forwarder

RPM systems::

	yum remove logstash-forwarder

Install Filebeat
----------------
In order to install Filebeat on your Wazuh Server, follow the next guide:

- :ref:`Filebeat Deb Packages <wazuh_server_deb_filebeat>`
- :ref:`Filebeat RPM Packages <wazuh_server_rpm_filebeat>`
