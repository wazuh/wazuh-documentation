.. Copyright (C) 2018 Wazuh, Inc.

.. _securing_api:

Securing the Wazuh API
======================

By default, the communications between the Wazuh Kibana App and the Wazuh API are not encrypted. It is highly recommended that you secure the Wazuh API by following the steps below:

1. Change the default credentials:

  By default, you can access the Wazuh API by typing user "foo" and password "bar", however, you can create new credentials as follows:

  .. code-block:: console

    # cd /var/ossec/api/configuration/auth
    # node htpasswd -c user myUserName
 
You will then need to restart the ``wazuh-api`` and ``wazuh-manager`` services for the change to take effect.

2. Enable HTTPS:

  In order to enable HTTPS, you need to generate or provide a certificate. You can learn how to generate your own certificate or generate it automatically using the script ``/var/ossec/api/scripts/configure_api.sh``.

3. Bind to localhost:

  If you do not need to access to the API externally, you should bind the API to ``localhost`` using the option ``config.host`` in the configuration file ``/var/ossec/api/configuration/config.js``.
