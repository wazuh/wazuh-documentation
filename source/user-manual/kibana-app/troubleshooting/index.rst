.. Copyright (C) 2021 Wazuh, Inc.

.. _kibana_troubleshooting:

Troubleshooting
===============

This section collects common installation or usage issues on the Wazuh Kibana plugin, and some basic steps to solve them.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        setup-issues
        api-issues
        usage-issues

None of the above solutions are fixing my problem
-------------------------------------------------

All the components we use have their own log files, you can check them and look for error and warning messages.

1. Check the Elastic Stack log files:

    .. code-block:: console

      # cat /var/log/elasticsearch/<elasticsearch-cluster-name>.log | grep -i -E "error|warn"
      # cat /var/log/filebeat/filebeat | grep -i -E "error|warn"

    .. note::
      The Elastic Stack uses the ``/var/log`` folder to store logs by default. This setting can be customized following the documentation for `Elasticsearch <https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html>`_ or `Filebeat <https://www.elastic.co/guide/en/beats/filebeat/current/configuration-logging.html>`_.

    .. warning::
      By default, Kibana doesn't store logs on a file. You can change this by configuring ``logging.dest`` setting in the ``kibana.yml`` configuration file. Check the `Kibana documentation <https://www.elastic.co/guide/en/kibana/current/settings.html>`_ for more details.

2. Check the Wazuh Kibana plugin log file:

    .. code-block:: console

      # cat /usr/share/kibana/data/wazuh/logs/wazuhapp.log | grep -i -E "error|warn"

3. Check the Wazuh manager log file:

    .. code-block:: console

      # cat /var/ossec/logs/ossec.log | grep -i -E "error|warn"

You can reach out through the `community channels with your questions <https://wazuh.com/community/>`_