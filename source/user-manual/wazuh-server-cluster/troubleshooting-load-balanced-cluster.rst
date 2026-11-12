.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Troubleshoot HTTP and TLS errors that Wazuh agents get when they connect to a load-balanced Wazuh manager cluster.

.. _wazuh_manager_cluster_troubleshooting_a_load_balanced_cluster:

Troubleshooting a load-balanced cluster
=======================================

Wazuh agents that reach a Wazuh manager cluster through a load balancer report problems as HTTP status codes or TLS errors. Multiple errors are expected for a few seconds and clear on their own. Start from the status code the agents get, and act only on the symptoms that persist.

The commands that read metrics query the local admin socket of each node, ``/var/wazuh-manager/queue/sockets/remote-admin-http.sock``. Run them on the node that returns the error.

The commands that loop over the nodes with SSH use ``<NODE_1>`` and ``<NODE_2>``. Replace them with the addresses of your nodes, and add one address for each other node.

These commands use ``jq``. Install it if the node doesn't have it, for example with ``apt-get install jq`` or ``dnf install jq``.

Quick reference
---------------

Each symptom points to one likely cause. Check whether the symptom is expected before you change anything.

+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| **Symptom**                                                                                                                                                                                  | **Most likely cause**                                                                           | **Expected**                              |
+==============================================================================================================================================================================================+=================================================================================================+===========================================+
| :ref:`401 <wazuh_manager_cluster_agents_get_401_right_after_they_enroll>` :ref:`right after an agent enrolls <wazuh_manager_cluster_agents_get_401_right_after_they_enroll>`                 | The cluster has not copied the agent key to every node yet.                                     | Yes. It clears within about 25 seconds.   |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| :ref:`401 <wazuh_manager_cluster_agents_get_401_on_every_request>` :ref:`that persists <wazuh_manager_cluster_agents_get_401_on_every_request>`                                              | Clock drift on one node, or a key that didn't replicate.                                        | No.                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| :ref:`403 <wazuh_manager_cluster_agents_get_403_on_configuration_download_only>` :ref:`on configuration download only <wazuh_manager_cluster_agents_get_403_on_configuration_download_only>` | A node has not applied a group change yet.                                                      | Briefly, for one or two 10-second rounds. |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| :ref:`404 <wazuh_manager_cluster_agents_get_404_on_every_request>` :ref:`on every request <wazuh_manager_cluster_agents_get_404_on_every_request>`                                           | A different ``global_prefix`` on one node, or a proxy that rewrites the path.                   | No.                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| ``413``                                                                                                                                                                                      | An event batch above the 5 MiB limit of the Wazuh manager.                                      | Yes. The agent splits the batch.          |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| ``502``                                                                                                                                                                                      | A batch above the 10 MiB transport limit, or an unreachable node.                               | Check the batch size first.               |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| :ref:`503 <wazuh_manager_cluster_agents_get_503_errors>` :ref:`with error <wazuh_manager_cluster_agents_get_503_errors>` :ref:`9016 <wazuh_manager_cluster_agents_get_503_errors>`           | The master node is unreachable.                                                                 | Only during a master outage.              |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| ``503 dependency_unavailable``                                                                                                                                                               | The node has no database row for the agent yet, or its database doesn't answer.                 | Yes for a new agent. No if it persists.   |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| :ref:`503 <wazuh_manager_cluster_agents_get_503_errors>` :ref:`on events <wazuh_manager_cluster_agents_get_503_errors>`                                                                      | Back-pressure on the node.                                                                      | Yes, briefly.                             |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| :ref:`TLS error with no HTTP status <wazuh_manager_cluster_agents_get_tls_errors_with_no_http_status>`                                                                                       | Certificate authority (CA), validity dates, or subject alternative name (SAN) of a certificate. | No.                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+
| :ref:`Agents fail at random <wazuh_manager_cluster_agents_fail_at_random>`                                                                                                                   | One node is degraded.                                                                           | No.                                       |
+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+-------------------------------------------------------------------------------------------------+-------------------------------------------+

Every ``401`` carries the message ``Invalid client authentication``. Read the ``code`` field instead. The codes ``unknown_agent``, ``enrollment_key_unavailable``, and ``token_unknown`` mean the node hasn't received the agent key, the enrollment password, or the enrollment token yet. The code ``stale_token`` means that the clocks of the agent and the node differ. It persists until you synchronize the clocks, and the ``remoted.auth.reject.clock_skew`` metric counts it.

.. _wazuh_manager_cluster_agents_get_401_right_after_they_enroll:

Agents get 401 right after they enroll
--------------------------------------

This symptom is expected, not a misconfiguration. It clears on its own within about 25 seconds.

**Cause**: A new agent is known to the master node at once and to the workers a few seconds later. The cluster copies ``client.keys``, ``authd.pass``, and ``enrollment_tokens.json`` from the master every 9 seconds. Requests routed to a worker in between are rejected. An agent enrolling through a load balancer can also get a ``503`` and a TLS error in the same burst, from the same cause.

**Resolution**:

#. Wait about one minute. The agent retries and recovers without intervention.
#. If the error persists, check that the agent key reached every node:

   .. code-block:: console

      # for n in "<NODE_1>" "<NODE_2>"; do echo -n "$n: "; ssh "$n" "sudo grep -c '^<AGENT_ID> ' /etc/wazuh-manager/client.keys"; done

   -  Replace ``<NODE_1>`` and ``<NODE_2>`` with the addresses of your nodes, and ``<AGENT_ID>`` with the ID of the agent. Every node prints ``1``. The SSH user must be able to run sudo on each node without a password prompt.

#. If a node prints ``0`` after a few minutes, follow the steps for a persistent ``401``.

.. _wazuh_manager_cluster_agents_get_401_on_every_request:

Agents get 401 on every request
-------------------------------

A ``401`` that persists, including for agents that worked before, is a fault to fix.

**Cause**: The fault is on one node. Each node checks the agent token against its own clock, so a node with clock drift rejects tokens the others accept. A key that never replicated, or an agent registered with a fixed IP address, has the same effect.

**Resolution**:

#. Compare the clocks of the nodes. They must agree within a few seconds.

   .. code-block:: console

      # for n in "<NODE_1>" "<NODE_2>"; do echo -n "$n: "; ssh "$n" date -u +%s; done

#. Fix any drift with the Network Time Protocol (NTP). Keep the ``remoted.jwt_max_age`` and ``remoted.jwt_clock_skew`` internal options identical on every node, in ``/etc/wazuh-manager/wazuh-manager-internal-options.conf``.
#. If the key is missing on a worker, check the cluster connection on that worker:

   .. code-block:: console

      # /var/wazuh-manager/bin/cluster_control -l
      # tail -n 50 /var/wazuh-manager/logs/cluster.log

#. If the agent was registered with a fixed IP address, register it again with ``any``. The Wazuh manager sees the address of the load balancer, and counts the rejection in ``remoted.auth.reject.address_not_allowed``.

.. _wazuh_manager_cluster_agents_get_403_on_configuration_download_only:

Agents get 403 on configuration download only
---------------------------------------------

This symptom is expected only for a short time around a group change.

**Cause**: A node serves a configuration download only for the groups it has for that agent. The master sends group changes to the workers every 10 seconds, so nodes disagree for a short time after a change. A worker can also hold a new agent before its groups, and read it as ``default`` until the next round.

**Resolution**:

#. Check that the error affects configuration downloads only, because Wazuh agent upgrade package (WPK) downloads aren't gated this way.
#. On the node that refuses, check the download counters.

   .. code-block:: console

      # curl -s --unix-socket /var/wazuh-manager/queue/sockets/remote-admin-http.sock http://localhost/metrics | jq -r '.metrics[] | select(.name | test("^remoted[.]download[.]")) | "\(.name) \(.value)"'

   -  ``The remoted.download.denied counter`` increases while the node refuses.

#. Wait one or two rounds of 10 seconds after the group change.
#. If the error persists for an agent whose groups didn't change, check that the worker receives group updates from the master in ``/var/wazuh-manager/logs/cluster.log``.

.. _wazuh_manager_cluster_agents_get_404_on_every_request:

Agents get 404 on every request
-------------------------------

A ``404`` on every request is a configuration fault, and authentication plays no part in it.

**Cause**: One node has a different ``<remote><https><global_prefix>``, or the load balancer rewrites the path. The node discards the request before authentication, so it logs nothing and counts nothing. Under passthrough, every agent that lands on that node fails every request.

**Resolution**:

#. Compare the prefix that each node logged at startup.

   .. code-block:: console

      # for n in "<NODE_1>" "<NODE_2>"; do echo -n "$n: "; ssh "$n" "sudo grep 'served under the global prefix' /var/wazuh-manager/logs/wazuh-manager.log | tail -1"; done

   -  Every node reports the same prefix, ``'/wazuh-manager'`` by default. The SSH user must be able to run ``sudo`` on each node without a password prompt.

#. Alternatively, query the effective value on each node:

   .. code-block:: console

      # /var/wazuh-manager/bin/wazuh-manager-conf get remote.https.global_prefix

#. Set the same ``global_prefix`` on every node and on every agent, and restart the node that differs.
#. Check that the load balancer forwards the path unchanged. In NGINX, keep ``proxy_pass`` without a URI after the group name.

Agents get 413 errors
---------------------

A ``413`` from the Wazuh manager is a working control, not a fault. Act only when it is frequent.

**Cause**: An agent sent an event batch above the 5 MiB limit for authenticated requests. The agent splits the batch and retries without losing events. A single event above the limit can't be split, so the agent drops it and logs a warning. If the ``413`` comes from the load balancer instead, its own body limit is below the limit of the Wazuh manager.

**Resolution**:

#. Check the counter on the node.

   .. code-block:: console

      # curl -s --unix-socket /var/wazuh-manager/queue/sockets/remote-admin-http.sock http://localhost/metrics | jq -r '.metrics[] | select(.name | test("body_too_large|stateless[.]responses[.]413")) | "\(.name) \(.value)"'

   -  The ``body_too_large`` counter increases. The ``remoted.http.stateless.responses.413`` counter stays at zero, because authentication answers before the route runs.

#. If the error is frequent, lower ``<agent><batch><size>`` on the agents.
#. If the load balancer answers ``413``, raise its limit to at least 10 MiB. In NGINX, set ``client_max_body_size 10m;``.

Agents get 502 errors
---------------------

A ``502`` has two different causes. Rule out an oversized batch before you declare a node outage.

**Cause**: Under TLS termination with HAProxy, a batch above the 10 MiB transport limit makes the Wazuh manager close the connection, and HAProxy reports ``502``. The agent does not split the batch after a ``502``. Otherwise, the load balancer can't reach or validate a node.

**Resolution**:

#. Correlate the errors with batch size before you look at the nodes.
#. On HAProxy, check the backend status on the statistics page, if you enabled it:

   .. code-block:: console

      # curl -s "http://<LOAD_BALANCER>:8404/stats;csv" | awk -F, '{print $1,$2,$18}'

   -  Replace ``<LOAD_BALANCER>`` with the address of the load balancer, and ``8404`` with the port of your HAProxy statistics frontend.

#. If a node shows ``DOWN`` right after a certificate change, follow the steps for TLS errors with no HTTP status.
#. Check that the load balancer uses TLS 1.3 to the nodes.

.. _wazuh_manager_cluster_agents_get_503_errors:

Agents get 503 errors
---------------------

A ``503`` is often transient. The response body tells the causes apart.

**Cause**: The response body names the cause. ``{"error":{"code":9016,"message":"Cannot communicate with master node"}}`` means a worker failed to reach the master to create an agent identity. ``{"error":"dependency_unavailable","dependency":"wazuh-db"}`` means the node failed to read the agent groups from its local database. A ``503`` on event routes means back-pressure on the node.

**Resolution**:

#. For error ``9016``, check that the master node is in the cluster.

   .. code-block:: console

      # /var/wazuh-manager/bin/cluster_control -l

   -  The worker answers after about 9 seconds. Set the agent and load balancer timeouts above that value.

#. For ``dependency_unavailable`` on a new agent, wait until ``client.keys`` reaches the node. The agent retries, and is never served the ``default`` group meanwhile.
#. If ``dependency_unavailable`` persists on one node, follow the steps for a degraded node.
#. For back-pressure, check the pipeline counters on the node.

   .. code-block:: console

      # curl -s --unix-socket /var/wazuh-manager/queue/sockets/remote-admin-http.sock http://localhost/metrics | jq -r '.metrics[] | select(.name | test("forwarder|budget[.]rejected")) | "\(.name) \(.value)"'

   -  A sustained ``503`` from one node means its pipeline is degraded.

.. _wazuh_manager_cluster_agents_get_tls_errors_with_no_http_status:

Agents get TLS errors with no HTTP status
-----------------------------------------

A TLS error that persists is a certificate fault to fix.

**Cause**: The failure happens before HTTP. The agent rejected the certificate of a node or of the load balancer, or the load balancer rejected the certificate of a node. A new node issued with its own name only is the usual source under passthrough, because agents dial the load balancer address.

**Resolution**:

#. Read the agent log. The agent names the failed check, for example ``the certificate does not include that name``, followed by the SAN list of the certificate.
#. Check the certificate that the agent-facing address presents:

   .. code-block:: console

      # openssl s_client -connect "<AGENT_FACING_ADDRESS>:1517" -servername "<AGENT_FACING_ADDRESS>" </dev/null 2>&1 | head -20

   -  Replace ``<AGENT_FACING_ADDRESS>`` with the address agents dial on the load balancer.

#. On each node, check the SAN list and the validity dates of the agent listener certificate:

   .. code-block:: console

      # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -subject -issuer -dates -ext subjectAltName

#. On each node, check that the certificate chains to the CA:

   .. code-block:: console

      # openssl verify -CAfile /etc/wazuh-manager/certs/root-ca.pem /etc/wazuh-manager/certs/remoted.pem

#. If the SAN lacks the agent-facing address, issue the certificate again. Use ``--agent-san`` for passthrough, or a ``load_balancer`` entry in ``config.yml`` for termination.

The TLS metrics of the Wazuh manager do not detect a SAN mismatch. The ``remoted.server.tls.ca_matches_leaf`` metric reports a wrong CA, and the ``remoted.server.tls.cert_expiry_days`` metric reports an expired certificate.

.. _wazuh_manager_cluster_agents_fail_at_random:

Agents fail at random
---------------------

When part of the fleet fails with no pattern, one node is usually degraded. No central view reports it.

**Cause**: One node is degraded while the load balancer still considers it healthy. With its database down, a node still answers the health check and accepts events. Its agents stay connected, but the node can't read or update their groups, so group and configuration changes don't reach them. Its ``remoted.control.wdb_error`` metric grows. The load balancer, ``cluster_control -l``, and the agent list show nothing wrong.

**Resolution**:

#. Ask every node directly for the state of its database.

   .. code-block:: console

      # for n in "<NODE_1>" "<NODE_2>"; do echo "== $n"; ssh "$n" "ps -eo args | grep -c '[w]azuh-manager-db'"; ssh "$n" "sudo tail -n 50 /var/wazuh-manager/logs/wazuh-manager.log | grep -i 'wdb\|wazuh-manager-db'"; done

   -  A node that logs ``wazuh-manager-db is not answering``, or ``Cannot connect to 'queue/sockets/wdb.sock'`` in a loop, is the degraded one. The SSH user must be able to run sudo on each node without a password prompt.

#. On each node, list the running daemons:

   .. code-block:: console

      # ps -eo args | grep -oE 'wazuh[-_]manager[-_][a-z]+' | sort -u

   -  The Python daemons appear with underscores, such as ``wazuh_manager_clusterd``. Every node runs ``analysisd``, ``clusterd``, ``db``, ``modulesd``, and ``remoted``. Every node also runs ``authd`` unless ``auth.disabled`` is set, and the master runs ``apid``.

#. Remove the degraded node from the load balancer backend.
#. Restart the Wazuh manager on that node:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Add the node back to the backend once its daemons run.

To check when each worker node last completed each synchronization task, run ``/var/wazuh-manager/bin/cluster_control -i`` on any node. In its output, the count in parentheses is the number of connected worker nodes. A field shows ``n/a`` when the task has not completed since the worker node connected.

Find cluster errors in the logs
-------------------------------

All cluster components of a node write to ``/var/wazuh-manager/logs/cluster.log``. Each line carries a node tag and a task tag, so you can follow one task across the log. The following lines come from the log of a master node.

.. code-block:: none

   2026/10/26 10:15:01 INFO: [Master] [Local integrity] Starting.
   2026/10/26 10:15:01 INFO: [Master] [Local integrity] Finished in 0.009s. Calculated metadata of 11 files.
   2026/10/26 10:15:02 INFO: [Worker worker-node-01] [Integrity check] Starting.
   2026/10/26 10:15:02 INFO: [Worker worker-node-01] [Integrity check] Finished in 0.012s. Received metadata of 11 files. Sync not required.

Errors appear with the ``ERROR`` level. To find them, run this command:

.. code-block:: console

   # grep -i error /var/wazuh-manager/logs/cluster.log

When an error message does not give enough detail, raise the debug level to ``2``. At this level, the log adds the traceback to most error messages.

#. Add the following line to ``/etc/wazuh-manager/wazuh-manager-internal-options.conf``:

   .. code-block:: ini

      wazuh_clusterd.debug=2

#. Restart the Wazuh manager:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. Search the log again, with the lines that follow each error:

   .. code-block:: console

      # grep -i error -A 10 /var/wazuh-manager/logs/cluster.log

For the ``-d`` option of the daemon, see the :doc:`wazuh-manager-clusterd </user-manual/reference/daemons/wazuh-manager-clusterd>` reference.

