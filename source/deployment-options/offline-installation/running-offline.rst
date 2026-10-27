.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn what to expect when the Wazuh central components run without an Internet connection, how to update the detection content offline, and which outbound access to allow if the deployment goes online.

Running Wazuh offline
=====================

The Wazuh indexer loads the ruleset, the IOC data, and the vulnerability content from snapshots in its package. The Wazuh manager loads its GeoIP databases from its own package. So threat detection and vulnerability detection work without an Internet connection. The detection content isn't updated automatically while the deployment has no Internet access. To update it, see :ref:`Updating the content offline <offline_installation_updating_content>`.

-  The Wazuh manager discards incoming events until it logs ``Event processing is now active``. In tests, this took up to about 4 minutes on the first start, and a few seconds after a restart. Vulnerability detection starts when the Wazuh manager logs ``CVE feed fully loaded``. The first load takes from a few minutes to about 2 hours, depending on the host. Run the following command on a Wazuh manager node to check both:

   .. code-block:: console

      # grep -E 'Event processing is now active|CVE feed fully loaded' /var/wazuh-manager/logs/wazuh-manager.log

-  After each start, and then about every 7 minutes, the Wazuh manager tries to download a GeoIP manifest. Each failed try logs a ``Cannot download manifest`` warning.
-  The Wazuh indexer tries to update its content from Wazuh CTI when it starts and on its update schedule. It logs ``WARN`` and ``ERROR`` lines in ``/var/log/wazuh-indexer/wazuh-cluster.log``, such as ``Could not reach catalog URL``. These messages are expected. Don't turn the updates off with the ``plugins.content_manager.catalog`` settings, or the Wazuh indexer loads no content.
-  Optionally, set ``plugins.content_manager.telemetry.enabled: false`` in ``/etc/wazuh-indexer/opensearch.yml``. It stops only the daily update-check ping and its log lines.
-  If the deployment gets Internet access later, allow outbound HTTPS on port 443/TCP from the Wazuh indexer and Wazuh manager nodes to ``api.pre.cloud.wazuh.com``. The Wazuh indexer downloads ruleset, IOC, and vulnerability content updates from it, and the Wazuh manager downloads GeoIP database updates from it.

.. _offline_installation_updating_content:

Updating the content offline
----------------------------

The Wazuh indexer doesn't update its content automatically when the deployment has no Internet access. To update it, load newer snapshots from Wazuh CTI:

#. On a Wazuh indexer node, display the snapshot manifest. Each snapshot, such as ``vulnerabilities.zip``, has a ``resource`` value, which is the Wazuh CTI address you use in the next step:

   .. code-block:: console

      # cat /usr/share/wazuh-indexer/plugins/wazuh-indexer-content-manager/snapshots/manifest.json

   The ``resource`` line of each snapshot holds its address.

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      {
        "vulnerabilities.zip": {
          "name": "public-vulnerabilities-5",
          "context": "t1-vulnerabilities-5",
          "type": "cti:catalog:consumer:vulnerabilities",
          "resource": "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/t1-vulnerabilities-5/consumers/public-vulnerabilities-5",
          "is_public": true,
          "remote_offset": 1134726
        },
        "iocs.zip": {
          "name": "public-iocs-5",
          "context": "t1-iocs-5",
          "type": "cti:catalog:consumer:iocs",
          "resource": "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/t1-iocs-5/consumers/public-iocs-5",
          "is_public": true,
          "remote_offset": 1368060
        },
        "ruleset.zip": {
          "name": "t1-public-ruleset-5-rc2",
          "context": "rc2-t1-ruleset-5",
          "type": "cti:catalog:consumer:ruleset",
          "resource": "https://api.pre.cloud.wazuh.com/api/v1/catalog/contexts/rc2-t1-ruleset-5/consumers/public-ruleset-5",
          "is_public": true,
          "remote_offset": 1056
        }
      }

#. On a system with Internet access, download the latest snapshot of each content type you want to update. Replace ``<RESOURCE>`` with its ``resource`` value, and ``<FILE>`` with its name in the manifest, which is ``vulnerabilities.zip``, ``ruleset.zip``, or ``iocs.zip``:

   .. code-block:: console

      # curl -s -o <FILE> "$(curl -s "<RESOURCE>" | python3 -c 'import json,sys; print(json.load(sys.stdin)["data"]["last_snapshot_link"])')"

#. Copy the files to every Wazuh indexer node, and place them in the snapshots directory:

   .. code-block:: console

      # install -m 0640 -o wazuh-indexer -g wazuh-indexer <FILE> /usr/share/wazuh-indexer/plugins/wazuh-indexer-content-manager/snapshots/

#. On one Wazuh indexer node, request the update and enter the ``admin`` password:

   .. code-block:: console

      # curl -k -u admin -X POST "https://127.0.0.1:9200/_plugins/_content_manager/update?offline=true"

   The response shows ``"status":202`` when the Wazuh indexer accepts the request. A ``409`` response means another content update is still running, for example, right after the Wazuh indexer starts. Wait a few minutes and send the request again.

#. Check that each content type shows ``ready``. Loading the vulnerability content takes a few minutes:

   .. code-block:: console

      # curl -k -u admin "https://127.0.0.1:9200/.wazuh-cti-consumers/_search?filter_path=hits.hits._source.type,hits.hits._source.status,hits.hits._source.local_offset&pretty"

Next steps
----------

Once the Wazuh environment is ready, Wazuh agents can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` installation section.

To uninstall all the Wazuh central components, see the :doc:`Uninstalling the Wazuh central components </installation-guide/uninstalling-wazuh/central-components>` section.
