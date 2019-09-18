.. Copyright (C) 2019 Wazuh, Inc.

.. _securing_api:

Securing the Wazuh API
======================

By default, the communications between the Wazuh Kibana App and the Wazuh API are not encrypted. It is highly recommended that you secure the Wazuh API by following the steps below:

1. Enable HTTPS:

  In order to enable HTTPS, you can generate your own certificate or generate it automatically by using the script ``/var/ossec/api/scripts/configure_api.sh``.
  
  .. note::
    This script allows you to change the port used by the Wazuh API to handle the incoming HTTP requests. The port 55000 is used by default.

    **Change the default credentials:**

    The ``configure_api.sh`` script allows you to change the API's user. If you did not use the script you can still change it as follows:
    
    .. code-block:: console

      # cd /var/ossec/api/configuration/auth
      # node htpasswd -Bc -C 10 user myUserName
      
    By default, you can access the Wazuh API by typing user "foo" and password "bar".
 
You will then need to restart the ``wazuh-api`` and ``wazuh-manager`` services for the change to take effect.

3. Bind to localhost:

  If you do not need to access to the API externally, you should bind the API to ``localhost`` using the option ``config.host`` in the configuration file ``/var/ossec/api/configuration/config.js``.
