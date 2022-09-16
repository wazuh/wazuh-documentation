.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This section of the Wazuh documentation lists the common installation or usage issues with the Wazuh dashboard and how to resolve them. 
  
.. _wazuh_dashboard_troubleshooting:

Troubleshooting
===============

This section collects common installation or usage issues on the Wazuh dashboard, and some basic steps to solve them.

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


If the Wazuh API is running, try to fetch data using the CLI from the Wazuh dashboard server:

.. code-block:: console

  # curl -k -X GET "https://<api_url>:55000/" -H "Authorization: Bearer $(curl -u <api_user>:<api_password> -k -X POST 'https://<api_url>:55000/security/user/authenticate?raw=true')"

.. code-block:: console
  :class: output

    % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
    100   271  100   271    0     0    879      0 --:--:-- --:--:-- --:--:--   882
    {"data": {"title": "Wazuh API REST", "api_version": "4.1.1", "revision": 40110, "license_name": "GPL 2.0", "license_url": "https://github.com/wazuh/wazuh/blob/4.1/LICENSE", "hostname": "localhost.localdomain", "timestamp": "2021-03-03T10:01:18+0000"}, "error": 0}



I do not see alerts in the Wazuh dashboard
------------------------------------------

The first step is to check if there are alerts in Wazuh indexer.

.. code-block:: console

  # curl https://<WAZUH_INDEXER_IP>:9200/_cat/indices/wazuh-alerts-* -u <wazuh_indexer_user>:<wazuh_indexer_password> -k

.. code-block:: none
    :class: output

     green open wazuh-alerts-4.x-2021.03.03 xwFPX7nFQxGy-O5aBA3LFQ 3 0 340 0 672.6kb 672.6kb

If you do not see any Wazuh related index, it means you have no alerts stored in Wazuh indexer.

To ensure that Filebeat is correctly configured, run the following command:

.. code-block:: console

  # filebeat test output

.. code-block:: none
          :class: output

          elasticsearch: https://127.0.0.1:9200...
            parse url... OK
            connection...
              parse host... OK
              dns lookup... OK
              addresses: 127.0.0.1
              dial up... OK
            TLS...
              security: server's certificate chain verification is enabled
              handshake... OK
              TLS version: TLSv1.3
              dial up... OK
            talk to server... OK
            version: 7.10.2



Could not connect to API with id: default: 3003 - Missing param: API USERNAME
-----------------------------------------------------------------------------

Starting Wazuh 4.0 the Wazuh API username variable changed from ``user`` to ``username``. It's necessary to change the credentials (foo:bar are no longer accepted) as well as the name of the variable in the ``/usr/share/wazuh-dashboard/data/wazuh/config/wazuh.yml`` configuration file. For example, the configuration can be: 

.. code-block:: console
   
   hosts:
    - production:
        url: https://localhost
        port: 55000
        username: wazuh-wui
        password: wazuh-wui
        run_as: false


Wazuh API and Wazuh dashboard version mismatch
----------------------------------------------

This error means that the Wazuh manager and Wazuh dashboard versions do not match. To work properly, the Wazuh dashboard and Wazuh manager versions should coincide at least in the major and minor. I.e.: Wazuh dashboard 4.3.x is only compatible with Wazuh manager 4.3.x.

To solve this issue, you need to either upgrade the component with the lower version or downgrade the component with the higher version. You can see more information about upgrading in our :doc:`upgrade guide</upgrade-guide/index>`.

None of the above solutions are fixing my problem
-------------------------------------------------

We have a welcoming community which can help you with most of the problems you might have regarding Wazuh deployment and usage `<https://wazuh.com/community>`_.

Also, you can contact us opening issues in our GitHub repositories under the `organization <https://github.com/wazuh>`_.

We will  be interested in the log files of your deployment. You can check them out on each component:

Check the following log files:

      - Wazuh indexer:

      .. code-block:: console

          # cat /var/log/wazuh-indexer/wazuh-cluster.log | grep -i -E "error|warn"

      - Wazuh manager:

      .. code-block:: console

          # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"

          # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

      - Wazuh dashboard:

      .. code-block:: console

          # journalctl -u wazuh-dashboard

          # cat /usr/share/wazuh-dashboard/data/wazuh/logs/wazuhapp.log | grep -i -E "error|warn"

    .. note::
      The Wazuh indexer uses the ``/var/log`` folder to store logs by default.

    .. warning::
      By default, Wazuh dashboard doesn't store logs on a file. You can change this by configuring ``logging.dest`` setting in the ``opensearch_dashboard.yml`` configuration file.



    
