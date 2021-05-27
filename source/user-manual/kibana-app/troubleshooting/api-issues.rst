.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_api_issues:

Possible problems with the Wazuh API
====================================

Wazuh API seems to be down
--------------------------

This issue means that your Wazuh API might be unavailable. Check the status of the Wazuh manager to check if the service is active: 

.. tabs::


  .. group-tab:: Systemd


    .. code-block:: console

      # systemctl status wazuh-manager



  .. group-tab:: SysV init

    .. code-block:: console

      # service wazuh-manager status


If the Wazuh API is running, try to fetch data using the CLI from the Kibana server:

.. code-block:: console

  # curl -k -X GET "https://<api_url>:55000/" -H "Authorization: Bearer $(curl -u <api_user>:<api_password> -k -X GET 'https://<api_url>:55000/security/user/authenticate?raw=true')"

.. code-block:: console
  :class: output

    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
    100   271  100   271    0     0    879      0 --:--:-- --:--:-- --:--:--   882
    {"data": {"title": "Wazuh API REST", "api_version": "4.1.1", "revision": 40110, "license_name": "GPL 2.0", "license_url": "https://github.com/wazuh/wazuh/blob/4.1/LICENSE", "hostname": "localhost.localdomain", "timestamp": "2021-03-03T10:01:18+0000"}, "error": 0}

Could not connect to API with id: default: 3003 - Missing param: API USERNAME
-----------------------------------------------------------------------------

Starting Wazuh 4.0 the Wazuh API username variable changed from ``user`` to ``username``. It's necessary to change the credentials (foo:bar are no longer accepted) as well as the name of the variable in the ``/usr/share/kibana/data/wazuh/config/wazuh.yml`` configuration file. For example, the configuration can be: 

.. code-block:: console
   
   hosts:
    - production:
        url: https://localhost
        port: 55000
        username: wazuh-wui
        password: wazuh-wui
        run_as: false
