.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to configure NGINX and HAProxy as load balancers for the Wazuh manager cluster.

.. _wazuh_manager_cluster_load_balancers_for_the_wazuh_manager_cluster:

Load balancers for the Wazuh manager cluster
============================================

A load balancer gives your Wazuh agents one address for the whole Wazuh manager cluster. It spreads agent connections across the nodes and keeps agents reporting when one node fails. You also add nodes without reconfiguring thousands of agents.

Every node serves the same agent API, so the load balancer sends agent traffic to every node, master included. The master node still owns every operation that creates or changes an agent identity. A worker forwards those requests to the master over the cluster connection.

Ports to balance
----------------

Wazuh agents 5.x use one HTTPS channel. Wazuh agents 4.x keep using the legacy channels during a migration.

+-----------+-----------------------------------------------------------+---------------------------------------------------------------------------------------+
| **Port**  | **Channel**                                               | **Send to**                                                                           |
+===========+===========================================================+=======================================================================================+
| ``1517``  | HTTPS agent API, the only channel a Wazuh 5.x agent uses. | Every node.                                                                           |
+-----------+-----------------------------------------------------------+---------------------------------------------------------------------------------------+
| ``1514``  | Legacy agent traffic of Wazuh 4.x agents.                 | Every node, while the legacy listener is on.                                          |
+-----------+-----------------------------------------------------------+---------------------------------------------------------------------------------------+
| ``1515``  | Legacy enrollment of Wazuh 4.x agents.                    | Every node, while legacy enrollment is on. Workers forward it to the master.          |
+-----------+-----------------------------------------------------------+---------------------------------------------------------------------------------------+
| ``1516``  | Cluster traffic between nodes.                            | Not balanced. Never expose it to agents.                                              |
+-----------+-----------------------------------------------------------+---------------------------------------------------------------------------------------+
| ``55000`` | Wazuh manager API.                                        | Not covered here. It runs on the master node only, with its own authentication model. |
+-----------+-----------------------------------------------------------+---------------------------------------------------------------------------------------+

Send port ``1515`` to every node, not to the master alone. A worker forwards the enrollment to the master, so a master-only backend only adds a single point of failure.

With the master node down, existing agents keep sending events and downloading configuration through the workers. Enrollment and group changes stop until the master is back.

Choose a TLS model
------------------

The Wazuh manager accepts TLS only, on every agent connection. The load balancer either forwards the encrypted bytes or decrypts them and opens a second TLS connection to the node.

+---------------------------------------------------+--------------------------------------------+--------------------------------------+
|                                                   | **TLS passthrough (layer 4)**              | **TLS termination (layer 7)**        |
+===================================================+============================================+======================================+
| Balances per                                      | Connection                                 | Request                              |
+---------------------------------------------------+--------------------------------------------+--------------------------------------+
| Certificate agents validate                       | The certificate of each Wazuh manager node | The certificate of the load balancer |
+---------------------------------------------------+--------------------------------------------+--------------------------------------+
| Agent client certificates reach the Wazuh manager | Yes                                        | No, they end at the load balancer    |
+---------------------------------------------------+--------------------------------------------+--------------------------------------+
| Load balancer can cap request size and log paths  | No                                         | Yes                                  |
+---------------------------------------------------+--------------------------------------------+--------------------------------------+
| AWS equivalent                                    | Network Load Balancer                      | Application Load Balancer            |
+---------------------------------------------------+--------------------------------------------+--------------------------------------+

We recommend TLS termination for its per-request balancing, request size limits, and single agent-facing certificate. The load balancer then decrypts agent traffic, so it becomes part of your security perimeter. Choose passthrough if you require agent client certificates, or if no device between the agents and the nodes is allowed to see decrypted traffic.

Rules for any load balancer
---------------------------

These rules come from the agent protocol, so they apply to NGINX, HAProxy, a cloud load balancer, or any other proxy.

-  **Forward the request path unchanged.** The Wazuh manager routes on the literal path, under the global prefix ``/wazuh-manager/`` by default. A rewritten path gets ``404`` on every request.
-  **Use TLS 1.3 to the Wazuh manager.** The Wazuh manager requires TLS 1.3 as its minimum. A proxy that offers TLS 1.2 only to the backend gets a failed handshake, and the agent sees ``502``.
-  **Never enable PROXY protocol toward the Wazuh manager.** The Wazuh manager doesn't parse it, and every agent connection fails with a TLS error.
-  **Allow 10 MiB request bodies.** Set the proxy limit at or above ``<remote><https><max_body_size>``, 10 MiB by default. NGINX defaults to 1 MB. A Wazuh manager node closes the connection on a larger body instead of answering 413.
-  **Wait more than 30 seconds for an answer.** The Wazuh manager gives each request 30 seconds. A shorter proxy timeout cuts off requests in progress.
-  **Keep idle backend connections under 10 seconds.** The Wazuh manager closes an idle connection after 10 seconds. A request on a closed connection fails with ``502``.
-  **Check health with** **``GET /wazuh-manager/``****.** Each node answers ``200`` without authentication.
-  **Retry only undelivered requests.** Retries on responses can deliver the same events to two nodes. Never retry ``400``, ``401``, or ``413``.
-  **Register agents with the address** **``any``****.** The Wazuh manager sees the address of the load balancer, not of the agent, and ignores ``X-Forwarded-For``.

.. note::

   The health check reports that the process is alive, not that every dependency works. A node whose database or analysis engine is down still answers ``200``. See :ref:`Troubleshooting a load-balanced cluster <wazuh_manager_cluster_troubleshooting_a_load_balanced_cluster>`.

.. _wazuh_manager_cluster_certificates_for_a_load_balanced_cluster:

Certificates for a load-balanced cluster
----------------------------------------

The cluster doesn't synchronize ``/etc/wazuh-manager/certs/``, so every node needs its own agent listener certificate from one certificate authority (CA). The certificate the agent validates must name the address the agent dials in its subject alternative name (SAN).

+-------------------------------------+--------------------------------------------+-----------------------------------------------------------------------------------------+
| **Certificate**                     | **TLS passthrough**                        | **TLS termination**                                                                     |
+=====================================+============================================+=========================================================================================+
| Load balancer certificate           | Not used.                                  | Its SAN contains the agent-facing address.                                              |
+-------------------------------------+--------------------------------------------+-----------------------------------------------------------------------------------------+
| Each Wazuh manager node certificate | Its SAN contains the agent-facing address. | Its SAN contains the name the load balancer dials.                                      |
+-------------------------------------+--------------------------------------------+-----------------------------------------------------------------------------------------+
| Signed by                           | The CA the agents trust.                   | The same CA as the nodes, so enrollment tokens and the agent trust anchor keep working. |
+-------------------------------------+--------------------------------------------+-----------------------------------------------------------------------------------------+

Under passthrough, the agent dials the load balancer but validates the certificate of the node that answers. A node certificate that names only the node fails TLS for every agent that verifies it.

If the master node of a step-by-step deployment holds ``root-ca.key`` in ``/etc/wazuh-manager/ca``, the agent listener certificates come from that CA. In that case, change their SAN list with the Wazuh manager package, as in :ref:`Subject alternative names <wazuh_manager_cluster_subject_alternative_names>`.

Issue the certificates with one of these methods:

**Certificates tool, passthrough**: Add the agent-facing address to the agent listener certificate of every node with ``--agent-san``. Run the tool on the endpoint that holds the root CA. The ``-wm`` option signs with the existing root CA in ``WAZUH_CA_DIR``, while ``-A`` and ``-ca`` create a new one where none exists. List every Wazuh manager node in ``/usr/share/wazuh-indexer/tools/config.yml``. Remove the indexer and dashboard entries with placeholder addresses, or replace the placeholders with your node addresses. The tool stops at the first placeholder.

.. code-block:: console

   # WAZUH_CA_DIR="<ROOT_CA_DIRECTORY>" bash /usr/share/wazuh-indexer/tools/wazuh-certs-tool.sh -wm --agent-san "<AGENT_FACING_ADDRESS>"

-  Replace ``<ROOT_CA_DIRECTORY>`` with the directory of the root CA. Install each ``<NAME>-remoted.pem`` and ``<NAME>-remoted-key.pem`` pair on its node as ``/etc/wazuh-manager/certs/remoted.pem`` and ``remoted-key.pem``, with owner ``root:wazuh-manager`` and mode ``0640``. Then restart the Wazuh manager on that node.
-  **Certificates tool, termination**: Declare the load balancer in the ``load_balancer`` section of ``/usr/share/wazuh-indexer/tools/config.yml``. Remove or fill in every entry that still holds a placeholder address. On the endpoint that holds the root CA, run the tool with ``-lb`` and ``WAZUH_CA_DIR`` set, as in the passthrough command. To issue the node certificates in the same run, add ``-lb`` to the ``-wm`` command. The tool stops if a ``wazuh-certificates`` directory from an earlier run exists, so move or remove that directory first. The tool writes the pair as ``<NAME>.pem`` and ``<NAME>-key.pem``.
-  ``nodes``**``:``**   ``manager``**``:``**     **``-``** ``name``**``:``** ``manager-1``       ``ip``**``:``** ``"10.0.0.21"``       ``node_type``**``:``** ``master``     **``-``** ``name``**``:``** ``manager-2``       ``ip``**``:``** ``"10.0.0.22"``       ``node_type``**``:``** ``worker``   ``load_balancer``**``:``**     **``-``** ``name``**``:``** ``lb``       ``dns``**``:``**         **``-``** ``"<AGENT_FACING_NAME>"``       ``ip``**``:``**         **``-``** ``"<AGENT_FACING_ADDRESS>"``
-  **Wazuh manager package, passthrough**: Before you install each node, set ``WAZUH_MANAGER_REMOTED_CERT_SANS`` in ``/etc/wazuh-manager/local.env``. The value replaces address discovery, so list the names and addresses of the node too.
-  ``WAZUH_MANAGER_REMOTED_CERT_SANS='DNS:<AGENT_FACING_NAME>,DNS:manager-1,IP:10.0.0.21'``

Replace ``<AGENT_FACING_NAME>`` and ``<AGENT_FACING_ADDRESS>`` with the name and IP address that agents use to connect to the load balancer.

Each node serves its pair as ``/etc/wazuh-manager/certs/remoted.pem`` and ``/etc/wazuh-manager/certs/remoted-key.pem``, with the CA in ``/etc/wazuh-manager/certs/root-ca.pem``. Run this check on every node. The SAN list must contain the agent-facing address under passthrough:

.. code-block:: console

   # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -subject -ext subjectAltName
   # openssl verify -CAfile /etc/wazuh-manager/certs/root-ca.pem /etc/wazuh-manager/certs/remoted.pem

Settings that must match on every node
--------------------------------------

The cluster doesn't compare these settings across nodes. A node with a different value answers agents differently from the other nodes.

+-----------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------+
| **Setting**                                                                                                                                         | **Effect of a mismatch**                                  |
+=====================================================================================================================================================+===========================================================+
| ``<remote><https><global_prefix>``                                                                                                                  | The node answers ``404`` to every agent request.          |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------+
| The ``limits`` internal options, such as ``fim.file_limit`` and ``sca.checks_limit``, in ``/etc/wazuh-manager/wazuh-manager-internal-options.conf`` | The node reports a different ``settings_hash`` to agents. |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------+
| ``<cluster><name>``                                                                                                                                 | The node reports a different ``settings_hash`` to agents. |
+-----------------------------------------------------------------------------------------------------------------------------------------------------+-----------------------------------------------------------+

Check the effective prefix on each node:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-conf get remote.https.global_prefix

Configure NGINX
---------------

NGINX serves passthrough with a ``stream`` block and termination with an ``http`` block. Use the block for the TLS model you chose.

Before you start, `install NGINX <https://nginx.org/en/linux_packages.html>`__ from the official NGINX packages, and :ref:`issue the certificates for your TLS model <wazuh_manager_cluster_certificates_for_a_load_balanced_cluster>`.

#. Add the configuration for your TLS model to NGINX.

TLS passthrough
^^^^^^^^^^^^^^^

Add this ``stream`` block to the end of the ``/etc/nginx/nginx.conf`` file, after the closing brace of the ``http`` block. Keep the existing content of the file:

.. code-block:: nginx
   :emphasize-lines: 3,4

   stream {
       upstream wazuh_manager_nodes {
           server <MANAGER_NODE_1_IP>:1517 max_fails=3 fail_timeout=10s;
           server <MANAGER_NODE_2_IP>:1517 max_fails=3 fail_timeout=10s;
       }

       server {
           listen 1517;
           proxy_pass wazuh_manager_nodes;
           proxy_connect_timeout 5s;
       }
   }

TLS termination
^^^^^^^^^^^^^^^

Install the certificate files that the configuration names. Run these commands in the directory that holds ``lb.pem``, ``lb-key.pem``, and ``root-ca.pem``:

.. code-block:: console

   # mkdir -p /etc/nginx/certs
   # install -m 0644 lb.pem /etc/nginx/certs/lb.pem
   # install -m 0600 lb-key.pem /etc/nginx/certs/lb-key.pem
   # install -m 0644 root-ca.pem /etc/nginx/certs/root-ca.pem
   # rm -f lb.pem lb-key.pem

Save these ``upstream`` and ``server`` blocks as a new file, ``/etc/nginx/conf.d/wazuh-manager.conf``. Don't edit ``nginx.conf``, and don't wrap the blocks in an ``http`` block. The NGINX packages load every file in ``/etc/nginx/conf.d/`` that ends in .conf inside the ``http`` block of ``nginx.conf``:

.. code-block:: nginx
   :emphasize-lines: 2,3,10,24

   upstream wazuh_manager_nodes {
       server <MANAGER_NODE_1_IP>:1517;
       server <MANAGER_NODE_2_IP>:1517;
       keepalive 32;
       keepalive_timeout 5s;
   }

   server {
       listen 1517 ssl;
       server_name <AGENT_FACING_NAME>;
       ssl_certificate     /etc/nginx/certs/lb.pem;
       ssl_certificate_key /etc/nginx/certs/lb-key.pem;
       ssl_protocols TLSv1.2 TLSv1.3;
       client_max_body_size 10m;

       location / {
           proxy_pass https://wazuh_manager_nodes;
           proxy_http_version 1.1;
           proxy_set_header Connection "";
           proxy_ssl_protocols TLSv1.3;
           proxy_ssl_trusted_certificate /etc/nginx/certs/root-ca.pem;
           proxy_ssl_verify on;
           proxy_ssl_verify_depth 2;
           proxy_ssl_name <AGENT_FACING_NAME>;
           proxy_ssl_server_name on;
           proxy_next_upstream error timeout http_502 http_503;
           proxy_connect_timeout 5s;
           proxy_read_timeout 60s;
       }
   }

-  Replace ``<MANAGER_NODE_1_IP>`` and ``<MANAGER_NODE_2_IP>`` with the addresses of your nodes, and add one ``server`` line per node. Replace ``<AGENT_FACING_NAME>`` with the name agents dial. NGINX accepts one ``http`` block and one ``stream`` block, so never add a second one.
-  In the termination blocks:

   -  ``proxy_pass`` has nothing after the group name. In a location other than ``/``, such as ``location /wazuh-manager/``, a URI after the group name replaces the matched prefix, and every request gets ``404``.
   -  ``proxy_ssl_protocols TLSv1.3`` matches the minimum the Wazuh manager accepts. Don't add ``proxy_ssl_ciphers``, because NGINX fails to start with TLS 1.3 suite names.
   -  ``proxy_ssl_name`` is the one name NGINX checks on every node certificate. Issue the node certificates with ``--agent-san <AGENT_FACING_NAME>`` so each one carries it.
   -  ``client_max_body_size`` matches the 10 MiB body limit of the Wazuh manager.
   -  ``keepalive_timeout 5s`` keeps idle backend connections under the 10-second limit of the Wazuh manager.
   -  ``proxy_read_timeout 60s`` waits longer than the 30-second request budget of the Wazuh manager.

#. Check the configuration for syntax errors:

   .. code-block:: console

      # nginx -t

#. Reload NGINX to apply the configuration:

   .. code-block:: console

      # nginx -s reload

NGINX Open Source has passive health checks only. It removes a node after a real agent request fails on it.

Configure HAProxy
-----------------

HAProxy serves passthrough with ``mode tcp`` and termination with ``mode http``. Set ``mode`` in every section, because a wrong inherited ``mode`` silently changes the TLS model.

Before you start, install HAProxy 2.2 or later, for example from the `HAProxy packages for Debian and Ubuntu <https://haproxy.debian.net/>`__. Also :ref:`issue the certificates for your TLS model <wazuh_manager_cluster_certificates_for_a_load_balanced_cluster>`.

#. Add these timeouts to the end of the ``/etc/haproxy/haproxy.cfg`` file, and add the configuration for your TLS model below them. Keep the ``global`` and ``defaults`` sections that the package wrote. The new ``defaults`` section applies only to the sections after it:

   .. code-block:: none

      defaults
          log global
          timeout connect 5s
          timeout client  60s
          timeout server  60s

TLS passthrough
^^^^^^^^^^^^^^^

.. code-block:: none
   :emphasize-lines: 9,10

   frontend wazuh_agents
       mode tcp
       bind :1517
       option tcplog
       default_backend wazuh_manager_nodes

   backend wazuh_manager_nodes
       mode tcp
       server node1 <MANAGER_NODE_1_IP>:1517 check
       server node2 <MANAGER_NODE_2_IP>:1517 check

TLS termination
^^^^^^^^^^^^^^^

Install the certificate files that the configuration names. Run these commands in the directory that holds ``lb.pem``, ``lb-key.pem``, and ``root-ca.pem``:

.. code-block:: console

   # mkdir -p /etc/haproxy/certs
   # cat lb.pem lb-key.pem > lb-combined.pem
   # install -m 0640 -o root -g haproxy lb-combined.pem /etc/haproxy/certs/lb-combined.pem
   # install -m 0644 root-ca.pem /etc/haproxy/certs/root-ca.pem
   # rm -f lb.pem lb-key.pem lb-combined.pem

Then add this configuration below the timeouts:

.. code-block:: none
   :emphasize-lines: 15,16

   frontend wazuh_agents
       mode http
       option httplog
       bind :1517 ssl crt /etc/haproxy/certs/lb-combined.pem ssl-min-ver TLSv1.2
       default_backend wazuh_manager_nodes

   backend wazuh_manager_nodes
       mode http
       option httpchk
       http-check send meth GET uri /wazuh-manager/
       http-check expect status 200
       retries 3
       option redispatch
           http-reuse never
       server node1 <MANAGER_NODE_1_IP>:1517 ssl ssl-min-ver TLSv1.3 verify required ca-file /etc/haproxy/certs/root-ca.pem verifyhost <MANAGER_NODE_1_NAME> sni str(<MANAGER_NODE_1_NAME>) check
       server node2 <MANAGER_NODE_2_IP>:1517 ssl ssl-min-ver TLSv1.3 verify required ca-file /etc/haproxy/certs/root-ca.pem verifyhost <MANAGER_NODE_2_NAME> sni str(<MANAGER_NODE_2_NAME>) check

-  Replace ``<MANAGER_NODE_1_IP>`` and ``<MANAGER_NODE_2_IP>`` with the addresses of your nodes, and add one ``server`` line per node. Replace ``<MANAGER_NODE_1_NAME>`` and ``<MANAGER_NODE_2_NAME>`` with a DNS name in the SAN of each node certificate.
-  In the termination configuration:

   -  ``crt`` takes one file with the certificate and its key. The commands above build it as ``lb-combined.pem``, with mode ``640``.
   -  ``verify required`` turns on backend certificate validation, which HAProxy doesn't do by default.
   -  ``http-check send meth GET uri /wazuh-manager/`` probes the health endpoint every 2 seconds and removes a failed node before agent traffic reaches it.
   -  Each ``server`` line stays on one physical line. HAProxy has no line continuation.
   -  Don't add ``send-proxy`` or ``send-proxy-v2`` to a ``server`` line.
   -  ``http-reuse never`` opens a new connection to the node for each request. The Wazuh manager closes an idle connection after 10 seconds, so a reused connection can fail with ``502``.

#. Check the configuration for errors:

   .. code-block:: console

      # haproxy -c -f /etc/haproxy/haproxy.cfg

#. Restart HAProxy to apply the configuration:

   .. code-block:: console

      # systemctl restart haproxy

.. _wazuh_manager_cluster_balance_the_legacy_channels_for_wazuh_4_x_agents:

Balance the legacy channels for Wazuh 4.x agents
------------------------------------------------

A cluster that still serves Wazuh 4.x agents needs ports ``1514`` and ``1515`` balanced too. Both channels can run behind the same load balancer as port ``1517`` during a migration.

#. Enable the legacy listener on every Wazuh manager node, in the ``/etc/wazuh-manager/wazuh-manager.conf`` file:

   .. code-block:: xml

      <remote>
        <legacy>
          <enabled>yes</enabled>
        </legacy>
      </remote>

   -  The installer writes this block with ``<enabled>yes</enabled>``. Without a ``<legacy>`` block, the legacy listener is off. Legacy enrollment follows the listener unless you set :doc:`<auth> </user-manual/reference/wazuh-manager-conf/auth>`\ ``<legacy_enrollment>``.

#. Add the legacy ports to the load balancer.

NGINX
^^^^^

Add these ``upstream`` and ``server`` blocks to the ``/etc/nginx/nginx.conf`` file, and keep its existing content. With TLS passthrough on port ``1517``, paste them inside the existing ``stream`` block, before its closing brace. Otherwise, wrap them in a new ``stream { }`` block, and add it to the end of the file, after the closing brace of the ``http`` block:

.. code-block:: nginx
   :emphasize-lines: 2,3,6,7

   upstream enrollment {
       server <MASTER_NODE_IP>:1515;
       server <WORKER_NODE_IP>:1515;
   }
   upstream agents {
       server <MASTER_NODE_IP>:1514;
       server <WORKER_NODE_IP>:1514;
   }
   server {
       listen 1515;
       proxy_pass enrollment;
   }
   server {
       listen 1514;
       proxy_pass agents;
   }

HAProxy
^^^^^^^

Add these sections to the end of the ``/etc/haproxy/haproxy.cfg`` file, below the sections for port ``1517``. Keep the existing content of the file:

.. code-block:: none
   :emphasize-lines: 8,9,19,20

   frontend enrollment
       bind :1515
       mode tcp
       default_backend enrollment_nodes

   backend enrollment_nodes
       mode tcp
       server master  <MASTER_NODE_IP>:1515 check
       server worker1 <WORKER_NODE_IP>:1515 check

   frontend agents
       bind :1514
       mode tcp
       default_backend agent_nodes

   backend agent_nodes
       mode tcp
       balance leastconn
       server master  <MASTER_NODE_IP>:1514 check
       server worker1 <WORKER_NODE_IP>:1514 check

Replace ``<MASTER_NODE_IP>`` and ``<WORKER_NODE_IP>`` with the addresses of your nodes, and add one ``server`` line per worker.

3. Restart the Wazuh manager on every node, then apply the load balancer configuration with ``nginx -s reload`` for NGINX or ``systemctl restart haproxy`` for HAProxy:

   .. code-block:: console

      # systemctl restart wazuh-manager

#. On each Wazuh manager node, check that the legacy listeners are open:

   .. code-block:: console

      # ss -ltn '( sport = :1514 or sport = :1515 )'

   -  The output lists one listening socket on port ``1514`` and one on port ``1515``.

An agent upgraded from Wazuh 4.x keeps its identity and doesn't enroll again. It reads the address of its 4.x ``<client><server>`` block and connects on port ``1517``. Without a trust anchor, it runs with TLS verification disabled and doesn't receive CA bundle updates. To give it one, run ``wazuh-agent-auth`` with ``--certs-only``, as in :ref:`Move an enrolled Wazuh agent <wazuh_manager_cluster_move_an_enrolled_wazuh_agent>`.

Verify the load balancer
------------------------

Check the load balancer, then test each node directly at its own address. The responses don't identify the serving node, so a successful check through the load balancer doesn't confirm that every node works.

#. Request the health endpoint through the load balancer:

   .. code-block:: console

      # curl --cacert root-ca.pem "https://<AGENT_FACING_ADDRESS>:1517/wazuh-manager/"

   -  The answer is ``{"status":"ok","module":"remoted"}``. The message ``no alternative certificate subject name matches target`` means a node certificate lacks the agent-facing address.

#. Request the health endpoint on each node directly:

   .. code-block:: console

      # for n in "<NODE_1_ADDRESS>" "<NODE_2_ADDRESS>"; do echo -n "$n: "; curl -s -o /dev/null -w '%{http_code}\n' --cacert root-ca.pem "https://$n:1517/wazuh-manager/"; done

   -  Every node prints ``200``.

#. On any Wazuh manager node, check that every node is in the cluster:

   .. code-block:: console

      # /var/wazuh-manager/bin/cluster_control -l

Replace ``<AGENT_FACING_ADDRESS>`` with the address agents dial, and ``<NODE_1_ADDRESS>`` and ``<NODE_2_ADDRESS>`` with the addresses of your nodes. The ``root-ca.pem`` file is the CA that signed the node certificates.

.. _wazuh_manager_cluster_point_the_wazuh_agents_at_the_load_balancer:

Point the Wazuh agents at the load balancer
-------------------------------------------

Every agent connects to the load balancer, not to a node. Use an enrollment token minted for the agent-facing address to enroll new agents and to move enrolled ones. The token sets the endpoint and the trust anchor of the agent. To configure an agent by hand instead, see :ref:`Configure a Wazuh agent by hand <wazuh_manager_cluster_configure_a_wazuh_agent_by_hand>`.

To mint an enrollment token for the agent-facing address, run this command on the master node. The address must be in the SAN of the agent listener certificate of the master node. Under TLS termination, the agent-facing address is in the load balancer certificate, so also issue the node certificates with ``--agent-san <AGENT_FACING_NAME>``:

.. code-block:: console

   # /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address "<AGENT_FACING_NAME>"

Wait about 10 seconds after you mint a token before you enroll a Wazuh agent through the load balancer. The token reaches the workers on the next synchronization cycle, and :doc:`wazuh-agent-auth </user-manual/reference/tools/wazuh-agent-auth>` doesn't retry a refused enrollment.

Enroll a new Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^

Pass the token in the ``WAZUH_ENROLLMENT_TOKEN`` variable of the install command, as described in the :doc:`Wazuh agent installation guide </installation-guide/wazuh-agent/index>`. Or save the token to a file on the agent and enroll the agent from it. The first command waits for the token. Paste it, press Enter, and then press Ctrl+D:

.. code-block:: console

   # (umask 077 && cat > <TOKEN_FILE_PATH>)
   # /var/ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE_PATH>
   # rm -f <TOKEN_FILE_PATH>
   # systemctl start wazuh-agent

Replace ``<TOKEN_FILE_PATH>`` with a file path, for example, ``/root/wazuh-token``. The enrollment sets ``<endpoint>`` to the token address and installs the CA of the cluster as the trust anchor of the agent.

.. _wazuh_manager_cluster_move_an_enrolled_wazuh_agent:

Move an enrolled Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Mint a token for the agent-facing address, and run these commands on the agent. The agent must be stopped, or ``wazuh-agent-auth`` refuses to run:

.. code-block:: console

   # systemctl stop wazuh-agent
   # (umask 077 && cat > <TOKEN_FILE_PATH>)
   # /var/ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE_PATH> --certs-only
   # rm -f <TOKEN_FILE_PATH>
   # systemctl start wazuh-agent

The ``--certs-only`` option keeps the agent ID and key, and it doesn't use up the token. It sets ``<endpoint>`` to the token address and replaces the trust anchor only when the CA differs. Don't use ``--force-enroll`` for this, because it registers the agent again with a new ID.

.. _wazuh_manager_cluster_configure_a_wazuh_agent_by_hand:

Configure a Wazuh agent by hand
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Instead of a token, you can set the ``<agent>`` block in the configuration file of the agent.

.. code-block:: xml

   <agent>
     <manager>
       <endpoint><AGENT_FACING_NAME>:1517/wazuh-manager</endpoint>
     </manager>
     <ssl>
       <certificate_authorities>/var/ossec/etc/root-ca.pem</certificate_authorities>
       <verification_mode>full</verification_mode>
     </ssl>
   </agent>

Where:

-  ``<endpoint>`` is the agent-facing address, port, and prefix. The prefix must equal the ``global_prefix`` of the Wazuh manager nodes. A mismatch gets ``404``.
-  ``<certificate_authorities>`` is the path of the CA that signed the certificates agents validate. Copy that CA file to this path on the agent first, or the agent refuses to start. The file can hold more than one CA, which allows a CA rotation without downtime. The Wazuh agent keeps a CA file whose path you set by hand. A CA bundle that the Wazuh manager publishes doesn't replace it, so you update the file yourself. The Wazuh agent replaces only its default trust anchor, ``/var/ossec/etc/certs/root-ca.pem``, during a CA rotation. For the rotation procedure, see :ref:`Replace a lost root CA <wazuh_manager_cluster_replace_a_lost_root_ca>`.
-  ``<verification_mode>`` set to ``full`` also checks the agent-facing address against the SAN of the certificate.

Check the agent connection
^^^^^^^^^^^^^^^^^^^^^^^^^^

Run this command on the master node:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -a

The output lists the agent with the active status.

Right after an agent enrolls, workers reject its requests for a few seconds with ``401`` until the cluster copies its key. The agent recovers on its own. For this and other symptoms, see :ref:`Troubleshooting a load-balanced cluster <wazuh_manager_cluster_troubleshooting_a_load_balanced_cluster>`.

