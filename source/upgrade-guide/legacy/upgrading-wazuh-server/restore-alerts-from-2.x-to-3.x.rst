.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section of the Wazuh documentation guides through the process of restoring the Wazuh alerts after upgrading Wazuh from 2.x to 3.x.

.. _restore_alerts_2.x_3.x:

Restore the Wazuh alerts from Wazuh 2.x
=======================================

After upgrading Wazuh from 2.x to 3.x, the old alerts will not be lost. However, they cannot be visualized in Kibana due to a change in the Wazuh alerts template. In order to access the old alerts and visualize them along with the new ones, the indices need to be reindexed to apply the new mapping.

To do so, download the `restore_alerts.sh <https://github.com/wazuh/wazuh/blob/3.13/extensions/elasticsearch/restore_alerts/restore_alerts.sh>`_ script and the Logstash configuration file called `restore_alerts.conf <https://github.com/wazuh/wazuh/blob/3.13/extensions/elasticsearch/restore_alerts/restore_alerts.conf>`_:

    .. code-block:: console

        # curl -so restore_alerts.sh https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/restore_alerts/restore_alerts.sh
        # curl -so restore_alerts.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/restore_alerts/restore_alerts.conf

The Wazuh alerts can be restored in two different ways:

- By ``restoring them from Elasticsearch`` to index them in Elasticsearch.
- By ``restoring them from the Wazuh manager`` to index them in Elasticsearch.

Restoring the Wazuh alerts
^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Stop Logstash:

    .. code-block:: console

        # systemctl stop logstash


#. Run the ``restore_alerts.sh`` script as ``superuser`` to reindex the old Wazuh alerts:

    .. code-block:: console

        # ./restore_alerts.sh


.. note::
        The script needs Logstash to be installed on the same machine. If the script can not find Logstash, it will install Logstash to complete the task. After the reindexing has finished, Logstash can be uninstalled.

#. Insert the requested parameters into the prompts from the  script as defined below :

      - ``reindex_type``: Indicates the reindexing type. It can be either set to ``ELS2ELS``, for reindexing from Elasticsearch to Elasticsearch, or ``WM2ELS``, for reindexing from the Wazuh manager to Elasticsearch.
      - ``elastic_ip``: Is the Elasticsearch IP address. By default, set to ``localhost``.
      - ``dateFrom``: Start date as YYYY-MM-DD.
      - ``dateTo``: End date as YYYY-MM-DD.

    .. note::
        If the user wants to reindex only a single day, the ``dateFrom`` and the ``dateTo`` should be set to the same date.

    The user can also execute the script and add the values for the parameters as arguments:

      .. code-block:: console

          # ./restore_alerts.sh date_from(yyyy-mm-dd) date_to(yyyy-mm-dd) elasticsearch_ip ELS2ELS|WM2ELS


#. Once the script has finished, Logstash can be started again:

    .. code-block:: console

        # systemctl start logstash

Verifying the reindexing process
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the reindexing of the alerts is completed, the user can confirm that the process was successful by querying the Elasticsearch indices:

    .. code-block:: console

        # curl "http://localhost:9200/_cat/indices?v"


If the process was successful, the example output of the command looks as follows:

    .. code-block:: none
        :class: output

        health status index                           uuid                   pri rep docs.count docs.deleted store.size pri.store.size
        green open   wazuh-alerts-3.x-2017.12.12     vQ4YXsTuQLSDMnLk_Lp2Kw   5   1         58            0    115.1kb        115.1kb
        green open   .kibana-6                       0jtvjQ4ERLmkKbCJ7Pl4Ww   1   1        241          110    226.5kb        226.5kb
        green open   .wazuh-version                  AqVHhREjSgCpx07LJ45Dkg   5   1          1            0      7.1kb          7.1kb
        green open   wazuh-alerts-2017.12.12         T3SZQRHGQEOBbVi79nDmhg   5   1         58            0    239.2kb        239.2kb
        green open   .wazuh                          GV7tVKXsSb-BocyjxC07Iw   5   1          0            0      1.2kb          1.2kb
