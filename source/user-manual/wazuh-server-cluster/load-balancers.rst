.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to put a load balancer, such as NGINX or HAProxy, in front of a Wazuh manager cluster so Wazuh agents reach every node through one address.

Load balancers
==============

A load balancer gives Wazuh agents one address for the whole Wazuh manager cluster and distributes their connections across the nodes. When a node fails, the agents keep reporting to the other nodes.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Ports
-----

+-----------+--------------------------------------+------------------------------------------------------------------------------+
| Port      | Traffic                              | Send to                                                                      |
+===========+======================================+==============================================================================+
| ``1517``  | Wazuh 5.0 agents: enrollment, events | Every node                                                                   |
|           | and configuration, over HTTPS        |                                                                              |
+-----------+--------------------------------------+------------------------------------------------------------------------------+
| ``1514``  | Wazuh 4.x agents                     | Every node, only when the legacy listener (``<remote><legacy>``) is enabled  |
+-----------+--------------------------------------+------------------------------------------------------------------------------+
| ``1515``  | Wazuh 4.x agent enrollment           | Every node, only when legacy enrollment is enabled                           |
+-----------+--------------------------------------+------------------------------------------------------------------------------+
| ``1516``  | Cluster traffic                      | Never through the load balancer                                              |
+-----------+--------------------------------------+------------------------------------------------------------------------------+
| ``55000`` | Wazuh manager API                    | Not through the load balancer. It runs on the master node only.              |
+-----------+--------------------------------------+------------------------------------------------------------------------------+

Any node accepts enrollment requests on ports 1517 and 1515, and a worker node forwards them to the master node, so you don't need to send enrollment to the master node only. If the master node is down, the agents keep reporting, but enrollment stops. A worker node that can't reach the master node answers an enrollment request with HTTP 503 after about 9 seconds.

The certificates of the nodes
-----------------------------

Use a load balancer that passes the TLS connection through to the nodes, at layer 4, without decrypting it. The Wazuh agent then completes the TLS handshake with whichever node answers, and verifies that node's agent listener certificate against the agent address it dialed. So the load balancer address must be in the agent listener certificate of **every** node, and every node's certificate must come from the same CA. Otherwise, the agents that reach that node fail with a TLS error such as ``the certificate does not include that name``, and the node logs nothing.

-  Set the addresses before you install each node, in ``WAZUH_MANAGER_REMOTED_CERT_SANS`` in ``/etc/wazuh-manager/local.env``. Include the node's own address and the load balancer name or address. See :doc:`Adding new Wazuh server nodes </user-manual/wazuh-server-cluster/adding-new-server-nodes/index>`.
-  To add the load balancer to the certificate of an installed node, follow "Checking the agent listener certificate" in the :doc:`Wazuh manager installation </installation-guide/wazuh-manager/step-by-step>` guide on each node.

Check each node's certificate:

.. code-block:: console

   # openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

A load balancer that terminates TLS, at layer 7, presents its own certificate to the agents instead. It then needs a certificate with its address from the same CA as the nodes, and it must open a new TLS 1.3 connection to the nodes and verify their certificates. Without the same CA, Wazuh agents enrolled with a token don't trust it.

Configuring the load balancer
-----------------------------

Whatever load balancer you use, keep these rules:

-  Send port ``1517`` to port ``1517`` of every node, at layer 4.
-  Don't enable the PROXY protocol, such as ``proxy_protocol on`` in NGINX or ``send-proxy`` in HAProxy. The Wazuh manager doesn't read it, and every agent fails.
-  Set timeouts above 30 seconds, the time a node gives itself to answer a request.
-  Check the health of each node with an HTTPS request to ``/wazuh-manager/`` on port 1517. A healthy node answers ``200`` with ``{"status":"ok","module":"remoted"}``, with no authentication. A TCP connection check alone doesn't detect a node that stopped answering.

At layer 4, the nodes see the load balancer address as the IP address of every Wazuh agent, for example in ``cluster_control -a``.

A Wazuh 5.0 agent opens a new connection for each request, so its requests reach different nodes. To keep each agent on one node, balance by source address, for example with ``hash $remote_addr consistent`` in NGINX or ``balance source`` in HAProxy. It's optional.

NGINX
^^^^^

#. Install NGINX with the ``stream`` module. For example, on Ubuntu:

   .. code-block:: console

      # apt-get install nginx libnginx-mod-stream

#. Add the following block to ``/etc/nginx/nginx.conf``, outside the ``http`` block. Replace the addresses with those of your nodes:

   .. code-block:: nginx

      stream {
          upstream wazuh_agents {
              server <MASTER_NODE_IP>:1517 max_fails=3 fail_timeout=10s;
              server <WORKER_NODE1_IP>:1517 max_fails=3 fail_timeout=10s;
              server <WORKER_NODE2_IP>:1517 max_fails=3 fail_timeout=10s;
          }
          server {
              listen 1517;
              proxy_pass wazuh_agents;
              proxy_connect_timeout 5s;
              proxy_timeout 60s;
          }
      }

   For Wazuh 4.x agents, add an ``upstream`` and a ``server`` block for port 1514, and for port 1515 if they enroll through the load balancer, in the same way.

#. Check the configuration and restart NGINX:

   .. code-block:: console

      # nginx -t
      # systemctl restart nginx

The open source version of NGINX marks a node as down only after failed connections. It has no HTTPS health check.

HAProxy
^^^^^^^

#. Install HAProxy. For example, on Ubuntu:

   .. code-block:: console

      # apt-get install haproxy

#. Add the following to ``/etc/haproxy/haproxy.cfg``. Replace the addresses with those of your nodes:

   .. code-block:: haproxy

      defaults
          mode tcp
          timeout connect 5s
          timeout client  60s
          timeout server  60s

      frontend wazuh_agents
          bind :1517
          default_backend wazuh_agent_nodes

      backend wazuh_agent_nodes
          option httpchk
          http-check send meth GET uri /wazuh-manager/
          http-check expect status 200
          server master  <MASTER_NODE_IP>:1517 check check-ssl verify none
          server worker1 <WORKER_NODE1_IP>:1517 check check-ssl verify none
          server worker2 <WORKER_NODE2_IP>:1517 check check-ssl verify none

   The agent traffic stays at layer 4. Only the health check speaks HTTPS, and it carries no secret, so it doesn't verify the certificate. For Wazuh 4.x agents, add a ``frontend`` and a ``backend`` for port 1514, and for port 1515 if they enroll through the load balancer, without the ``httpchk`` lines.

#. Check the configuration and restart HAProxy:

   .. code-block:: console

      # haproxy -c -f /etc/haproxy/haproxy.cfg
      # systemctl restart haproxy

Checking the load balancer
--------------------------

Run these commands from a host that resolves the load balancer address as the Wazuh agents do. Use the Wazuh manager CA, ``/etc/wazuh-manager/certs/root-ca.pem`` from the master node.

#. Check the health of every node through the load balancer. Run the command several times, so the load balancer sends it to each node:

   .. code-block:: console

      # curl --cacert root-ca.pem https://<LOAD_BALANCER_ADDRESS>:1517/wazuh-manager/

   The output is ``{"status":"ok","module":"remoted"}``. ``no alternative certificate subject name matches target`` means that a node's certificate doesn't include the load balancer address.

#. Check which node answered:

   .. code-block:: console

      # openssl s_client -connect <LOAD_BALANCER_ADDRESS>:1517 </dev/null 2>/dev/null | openssl x509 -noout -subject

   Each node presents its own certificate, with its host name, or the ``WAZUH_MANAGER_NODE_NAME`` value, in the subject.

#. Check each node directly:

   .. code-block:: console

      # curl -s -o /dev/null -w '%{http_code}\n' --cacert root-ca.pem https://<NODE_IP>:1517/wazuh-manager/

What Wazuh agents see behind a load balancer
--------------------------------------------

The cluster synchronizes new agent keys and enrollment tokens from the master node every few seconds. Until then, the other nodes don't know them. Right after a Wazuh agent enrolls, its first requests can get HTTP ``401`` from the worker nodes, and a configuration download can get ``403``. The agent retries, and the errors stop within seconds. Don't change anything during that time.

Things the cluster doesn't synchronize must be the same on every node, by hand:

-  The ``<remote><https><global_prefix>`` option. A node with a different prefix answers ``404`` to every agent request.
-  The ``<cluster><name>`` option, and the ``fim.*_limit``, ``syscollector.*_limit`` and ``sca.checks_limit`` internal options.
-  A custom WPK package in ``/var/wazuh-manager/var/upgrade/``, before you upgrade Wazuh agents with it.

Also keep the clocks of the nodes synchronized, for example with NTP. Each node checks enrollment tokens against its own clock.
