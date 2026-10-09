.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn what to expect when the Wazuh central components run without an Internet connection, and which outbound access to allow if the deployment goes online.

Running Wazuh offline
=====================

The Wazuh manager loads its ruleset, its vulnerability feed, and its GeoIP databases from snapshots included in the packages, so detection works without an Internet connection. Loading takes longest on the first start after the installation, and its time depends on the host. Run the following command on a Wazuh manager node to check its progress:

.. code-block:: console

   # grep -E 'Event processing is now active|CVE feed fully loaded' /var/wazuh-manager/logs/wazuh-manager.log

-  The Wazuh manager discards incoming events until it logs ``Event processing is now active``. In tests, this took up to about 4 minutes on the first start, and a few seconds after a restart.
-  Vulnerability detection starts when the Wazuh manager logs ``CVE feed fully loaded``. In tests, the first load took from about 6 to about 18 minutes. If the Wazuh manager restarts before the first load completes, the load starts over. After that, the Wazuh manager logs ``CVE feed fully loaded`` within seconds of a restart.
-  The Wazuh manager tries to download a GeoIP manifest after each start and then about every 7 minutes, and logs a ``Cannot download manifest`` warning each time.
-  Every hour, the Wazuh indexer tries to synchronize its content catalog and logs a burst of ``ERROR`` and ``WARN`` lines in ``/var/log/wazuh-indexer/wazuh-cluster.log``, ending with ``Immediate retry also failed; waiting for the next scheduled run.``
-  The detection content is not updated while the deployment has no Internet connection. Wazuh 5.0 doesn't support loading a newer vulnerability feed offline. See :ref:`Unsupported offline feed <vulnerability_detection_unsupported_offline_feed>`.
-  If the deployment gets Internet access later, allow outbound HTTPS on port 443/TCP from the Wazuh indexer and Wazuh manager nodes to ``api.pre.cloud.wazuh.com``. The Wazuh indexer downloads ruleset, IOC, and vulnerability content updates from it, and the Wazuh manager downloads GeoIP database updates from it. The CVE links in the Wazuh dashboard open ``cti.wazuh.com`` in your browser, so the hosts that run the Wazuh central components don't need access to it.

Next steps
----------

Once the Wazuh environment is ready, Wazuh agents can be installed on every endpoint to be monitored. To install the Wazuh agents and start monitoring the endpoints, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` installation section.

To uninstall all the Wazuh central components, see the :doc:`Uninstalling the Wazuh central components </installation-guide/uninstalling-wazuh/central-components>` section.
