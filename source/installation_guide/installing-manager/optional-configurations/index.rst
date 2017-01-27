.. _optional_configurations:

Optional configurations
===============================

This section advises on best practices related to get a Wazuh environment efficient, stable and secure.

.. topic:: Single-host architecture

    .. toctree::
        :maxdepth: 1

        singlehost_configuration

.. topic:: Servers communication encryption

    By default, the communications between Wazuh server (Filebeat) and Elastic Stack server (Logstash) are not encrypted. It’s strongly recommended to configure Logstash to use SSL encryption. Please follow the next guide to setting up SSL for Filebeat and Logstash.

    .. toctree::
        :maxdepth: 1

        elastic_ssl

.. topic:: Nginx SSL proxy for Kibana

    .. toctree::
        :maxdepth: 1

        nginx-kibana-deb
        nginx-kibana-rpm

Securing API
------------

    By default, the communications with the API are not encrypted. You should take the following actions to secure your API:

     - Change default user/password.
     - Enable HTTPS.

    You can change these options :ref:`manually <api_configuration>` or run the script ``/var/ossec/api/scripts/configure_api.sh`` in order to configure the basic settings.
