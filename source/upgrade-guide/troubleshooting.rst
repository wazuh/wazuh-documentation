.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: This section collects common issues that may occur when upgrading central components, along with basic steps to solve them.

.. _central_components_troubleshooting:

Troubleshooting
===============

This section collects common issues that may occur when upgrading central components, along with basic steps to solve them.

The 'vulnerability-detector' configuration is deprecated
--------------------------------------------------------

This warning appears because when updating the manager, the ``/var/ossec/etc/ossec.conf`` is not modified, so the previous configuration of Vulnerability detector is set. In addition, invalid configuration warnings can also be found for the ``interval``, ``min_full_scan_interval``, ``run_on_start`` and ``provider`` elements. To fix this, please modify the configuration as specified in the :doc:`Vulnerability detection documentation </user-manual/capabilities/vulnerability-detection/configuring-scans>`..


No username and password found in the keystore
----------------------------------------------

For alerts and vulnerabilities detected by Vulnerability detection to be indexed and displayed on the dashboard, it is necessary to add the credentials of the indexer in the manager keystore. These credentials are those obtained at the time of installation.


.. code-block:: console

   # /var/ossec/bin/wazuh-keystore -f indexer -k username -v <INDEXER_USERNAME>
   # /var/ossec/bin/wazuh-keystore -f indexer -k password -v <INDEXER_PASSWORD>


IndexerConnector initialization failed
--------------------------------------

This warning may be due to incorrect keystore credentials, as mentioned in the previous section, or there may be a configuration or certificate error. To solve this it is necessary to check that the :doc:`indexer section</user-manual/reference/ossec-conf/indexer>` is correctly configured in ``/var/ossec/etc/ossec.conf`` by checking that the IP, port and certificates path are as expected.

Once the error has been fixed and it has been possible to connect to the indexer, we will be able to see a log like the following one:

.. code-block:: console

   INFO: IndexerConnector initialized successfully for index: ...

If the error persists, temporarily enable ``wazuh_modules.debug=2`` in ``/var/ossec/etc/local_internal_options.conf`` to get more information on what may be causing the issue.


Vulnerability detection seems to be disabled or has a problem
-------------------------------------------------------------

This warning shows that Vulnerability detection may be disabled or there is an error in the configuration. To check what may be happening, we must first check that ``vulnerability-detection`` is enabled in ``/var/ossec/etc/ossec.conf``. If it is enabled, we have to check that the vulnerability index ``wazuh-states-vulnerabilities-*`` has been created correctly. This can be checked in ``Indexer Management > Index Management > Indices``.

If the index has not been created, check the manager logs for any errors or warnings, as this may be due to an error mentioned in the previous sections:

.. code-block:: console

    # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"


Application Not Found
---------------------

If after updating, when accessing the dashboard we find the message ``Application Not Found``, this may be because after the update the file ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` has not been overwritten with the new changes. To fix this, please add the following line to the configuration file:

.. code-block:: console

    uiSettings.overrides.defaultRoute: /app/wz-home


None of the above solutions are fixing my problem
-------------------------------------------------

We have a welcoming community that can help you with most of the problems you might have regarding Wazuh deployment and usage `<https://wazuh.com/community>`_.

Also, you can contact us for opening issues in our GitHub repositories under the `organization <https://github.com/wazuh>`_.

We will be interested in the log files of your deployment. You can check them out on each component:

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
 By default, the Wazuh dashboard doesn't store logs on a file. You can change this by configuring ``logging.dest`` setting in the ``opensearch_dashboard.yml`` configuration file.
