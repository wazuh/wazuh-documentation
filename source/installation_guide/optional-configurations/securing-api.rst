.. _securing_api:

Securing the Wazuh API
========================================

By default, the communications between the Wazuh Kibana App and the Wazuh API are not encrypted. If you are using a distributed architecture, you should take the following actions to secure the Wazuh API:

 - Change default username/password.
 - Enable HTTPS.

You can change these options :ref:`manually <api_configuration>` or by running the script ``/var/ossec/api/scripts/configure_api.sh``.
