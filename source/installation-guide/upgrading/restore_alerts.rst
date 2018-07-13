.. Copyright (C) 2018 Wazuh, Inc.

.. _restore_alerts:

Restore Wazuh alerts from Wazuh 2.x
===================================

.. versionadded:: 3.1.0

After upgrading Wazuh from 2.x to 3.x, your old alerts will not be lost, however, they cannot be visualized in Kibana due to a change in the Wazuh alerts' template. In order to access the old alerts and visualize them along with the new ones, the indices need to be reindexed to apply the new mapping.

To do so, download the ``restore_alerts.sh`` script `from this link <https://github.com/wazuh/wazuh/tree/master/extensions/elasticsearch/restore_alerts/restore_alerts.sh>`_ and Logstash's configuration file called ``restore_alerts.conf`` `from here <https://github.com/wazuh/wazuh/tree/master/extensions/elasticsearch/restore_alerts/restore_alerts.conf>`_.

    .. code-block:: console

        # curl -so restore_alerts.sh https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/restore_alerts/restore_alerts.sh
        # curl -so restore_alerts.conf https://raw.githubusercontent.com/wazuh/wazuh/master/extensions/elasticsearch/restore_alerts/restore_alerts.conf


Once the script and the configuration file are downloaded, you can restore your Wazuh alerts in two different ways:

- by **restoring them from Elasticsearch** to index them in Elasticsearch, or
- by **restoring from your Wazuh's manager** to index them in Elasticsearch.

Restore the alerts
^^^^^^^^^^^^^^^^^^

1. Stop Logstash.

    .. code-block:: console

        # systemctl stop logstash


2. Run the ``restore_alerts.sh`` script as **superuser** to reindex your old Wazuh alerts.

    .. code-block:: console

        # ./restore_alerts.sh


.. note::
    The script needs Logstash to be installed on the same machine. If the script can't find Logstash, it will install Logstash in order to complete the task. After the reindex has finished, you can then uninstall Logstash.

3. Insert the requested parameters into the prompts from the  script as defined below :

- ``reindex_type``: Store what kind of reindex do you want. It could be:
  - ``ELS2ELS``: from Elasticsearch to Elasticsearch.
  - ``WM2ELS``: from Wazuh's manager to Elasticsearch.

- ``elastic_ip``: Is the Elasticsearch IP address. By default, this is set to is `localhost`.
- ``dateFrom``: starting date as YYYY-MM-DD (2017-12-01).
- ``dateTo``: end date as YYYY-MM-DD (2017-12-11).

.. note::
    If you want to reindex only a single day, set ``dateFrom`` and ``dateTo`` to the same date.

Also, you can execute the script adding the values for the parameters as arguments:

    .. code-block:: console

        # ./restore_alerts.sh date_from(yyyy-mm-dd) date_to(yyyy-mm-dd) elasticsearch_ip ELS2ELS|WM2ELS

Once the script has finished, you can start Logstash again:

    .. code-block:: console

        # systemctl start logstash

Check that the reindex has worked
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Once the reindex of your alerts has finished, you can confirm that it was successful by asking Elasticsearch about the *indices*.

    .. code-block:: console

        $ curl "localhost:9200/_cat/indices?v"


If everything worked well, the output will appear something like this:

    .. code-block:: console

        $ curl "localhost:9200/_cat/indices?v"
        health status index                           uuid                   pri rep docs.count docs.deleted store.size pri.store.size
        green open   wazuh-alerts-3.x-2017.12.12     vQ4YXsTuQLSDMnLk_Lp2Kw   5   1         58            0    115.1kb        115.1kb
        green open   .kibana-6                       0jtvjQ4ERLmkKbCJ7Pl4Ww   1   1        241          110    226.5kb        226.5kb
        green open   .wazuh-version                  AqVHhREjSgCpx07LJ45Dkg   5   1          1            0      7.1kb          7.1kb
        green open   wazuh-alerts-2017.12.12         T3SZQRHGQEOBbVi79nDmhg   5   1         58            0    239.2kb        239.2kb
        green open   .wazuh                          GV7tVKXsSb-BocyjxC07Iw   5   1          0            0      1.2kb          1.2kb
