.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Install the Wazuh manager, which analyzes event data from Wazuh agents, forwards it to the Wazuh indexer, and remotely manages agent configurations.

Wazuh manager
=============

The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer. It is also used to remotely manage the configurations of Wazuh agents and monitor their status. If you want to learn more about the Wazuh components, check the :doc:`Getting started </getting-started/index>` section. The Wazuh manager doesn't monitor its own host. To monitor it, install a Wazuh agent on the same host and enroll it with a token for the host's own address.

You can install the Wazuh manager on a single host or distribute it across multiple nodes in a cluster configuration. Multi-node configurations provide high availability and improved performance when Wazuh agents connect through a network load balancer. Each Wazuh agent connects to one address only, as :ref:`Agent connection address <wazuh_manager_agent_connection_address>` describes.

Check the requirements below and choose an installation method to start installing the Wazuh manager.

-  :doc:`Assisted installation <installation-assistant>`: Install this component by running an assistant that automates the installation and configuration process.

-  :doc:`Step-by-step installation <step-by-step>`: Install this component following detailed step-by-step instructions.

.. raw:: html

  <div class="link-boxes-group layout-3" data-step="2">
    <div class="steps-line">
      <div class="steps-number past-step">1</div>
      <div class="steps-number current-step">2</div>
      <div class="steps-number future-step">3</div>
    </div>
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-indexer/index.html">
        <p class="link-boxes-label">Install the Wazuh indexer</p>

.. image:: ../../images/installation/Indexer-Circle.png
     :alt: Wazuh indexer logo
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  
    <div class="link-boxes-item current-step">
      <div class="link-boxes-link" href="#">
        <p class="link-boxes-label">Install the Wazuh manager</p>

.. image:: ../../images/installation/Server-Circle.png
     :alt: Wazuh manager logo
     :align: center
     :height: 61px

.. raw:: html

      </div>
    </div>
  
    <div class="link-boxes-item future-step">
      <a class="link-boxes-link" href="../wazuh-dashboard/index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-noBG.png
     :alt: Wazuh dashboard logo
     :align: center
     :height: 61px
     
.. raw:: html

      </a>
    </div>
  </div>

Requirements
------------

Check the recommended operating systems and hardware requirements for the Wazuh manager installation. Make sure that your system environment meets all requirements and that you have root user privileges.

The Wazuh manager package doesn't install on a host that has a Wazuh manager 4.x, even a fresh one: :doc:`migrate </migration-to-5x/index>` instead. The Wazuh manager doesn't start until it has the Wazuh indexer password and certificates.

.. _supported_operating_systems:

Recommended operating systems
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh manager requires a 64-bit Intel, AMD, or ARM Linux processor (x86_64/AMD64 or AARCH64/ARM64 architecture). Wazuh recommends the following operating system versions:

.. include:: /_templates/installations/wazuh/recommended-operating-systems.rst

Hardware requirements
^^^^^^^^^^^^^^^^^^^^^

You can install the Wazuh manager as a single-node or multi-node cluster.

-  Hardware requirements for each node:

   +-------------------------+-------------------------+-------------------------------+
   |                         |  Minimum                |   Recommended                 |
   +-------------------------+----------+--------------+--------------+----------------+
   | Component               |  RAM (GB)|  CPU (cores) |  RAM (GB)    |   CPU (cores)  |
   +=========================+==========+==============+==============+================+
   | Wazuh manager           |     8    |     4        |     16       |       8        |
   +-------------------------+----------+--------------+--------------+----------------+

   An all-in-one host runs the Wazuh indexer, Wazuh manager, and Wazuh dashboard together. For up to 25 agents, it needs 4 CPU cores and 8 GB of RAM, as in the :doc:`Quickstart </quickstart>`. Two or more Wazuh central components on one host need at least 8 GB of RAM and 4 CPU cores.

-  Disk space requirements

   The Wazuh manager doesn't store the events or findings of monitored endpoints, which the Wazuh indexer stores. Instead, it stores the content and databases required by its server-side modules. The Vulnerability Scanner feed needs at least 15 GB of storage, so give a Wazuh manager at least 20 GB of disk space.

.. _wazuh_manager_required_ports:

Required ports
^^^^^^^^^^^^^^

The Wazuh manager uses the following ports.

+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| Port               | From                                                                              | Purpose                                    |
+====================+===================================================================================+============================================+
| 1517/TCP           | Wazuh 5.x agents, load balancer                                                   | Agent enrollment and connection over HTTPS |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 1516/TCP           | Other Wazuh manager nodes                                                         | Cluster communication, multi-node only     |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 55000/TCP          | Wazuh dashboard, API clients, and agents removing themselves under anti-tampering | Wazuh manager API, master node             |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 1514/TCP           | Wazuh 4.x agents                                                                  | Legacy agent connection                    |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 1515/TCP           | Wazuh 4.x agents                                                                  | Legacy enrollment                          |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+
| 9200/TCP, outbound | This Wazuh manager                                                                | Connection to the Wazuh indexer            |
+--------------------+-----------------------------------------------------------------------------------+--------------------------------------------+

If no Wazuh 4.x agents connect to this Wazuh manager, you can keep 1514 and 1515 closed. You can also disable them in ``/etc/wazuh-manager/wazuh-manager.conf`` with ``<remote><legacy><enabled>`` and ``<auth><disabled>``.

The Wazuh manager API listens on 55000/TCP of the master node. After the Quickstart, and after an offline all-in-one installation with the installation assistant, it listens only on ``127.0.0.1`` and ``::1``. After the assisted and step-by-step installations of this guide, it listens on all network interfaces. To restrict it, set ``host`` in ``/var/wazuh-manager/api/configuration/api.yaml`` and restart the Wazuh manager.

.. _wazuh_manager_agent_connection_address:

Agent connection address
^^^^^^^^^^^^^^^^^^^^^^^^

Wazuh agents connect to a Wazuh manager node only through an address in its agent listener certificate, ``remoted.pem``. You can create enrollment tokens only for those addresses. To add an address, such as a load balancer, a NAT address, or a public name, follow your installation method:

-  **Assisted installation:** The certificate lists the node's name and its addresses from ``config.yml``. To add an address, use ``-as <ALTERNATE_ADDRESS>`` when you generate the configuration files. The tool adds it to the certificate of every Wazuh manager node.

-  **Step-by-step installation:** The Wazuh manager package issues the certificate with the node's host name and addresses. To use other addresses, set ``WAZUH_MANAGER_REMOTED_CERT_SANS`` in ``/etc/wazuh-manager/local.env`` before you install the package, as :ref:`Deploying certificates and passwords <wazuh_manager_deploying_certificates>` describes. The list replaces the addresses that the package finds, so include this node's own address.

With ``-as``, pass every address in the same run, because the certificate holds only the ``-as`` values of that run. With ``WAZUH_MANAGER_REMOTED_CERT_SANS``, list every address too. For a cluster behind a load balancer, use a TCP passthrough load balancer on 1517/TCP. Add its address to the certificate of every Wazuh manager node. Create enrollment tokens on the master node. A worker node refuses the command, and the master node accepts only addresses in its own certificate. Agents therefore enroll through the load balancer or the master node's address. To create a token for a worker node's address, add that address to the master node's certificate too.

A Wazuh agent connects to one address only: the address of its enrollment token, saved as ``<agent><manager><endpoint>`` in ``ossec.conf``. It doesn't switch to another node if that node stops. In a Wazuh manager cluster, an agent enrolled with a token for the master node's address sends all its data to the master node. To spread agents across the nodes and keep them connected when a node stops, use a load balancer as described above. Without a load balancer, add the address of each worker node to the master node's certificate, and create tokens for the worker addresses on the master node. To see which node processes an agent's data, check the ``wazuh.cluster.node`` field of its events.

.. toctree::
   :hidden:
   :maxdepth: 1

   Assisted installation <installation-assistant>
   Step-by-step installation <step-by-step>

Adding the address after the installation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

These steps are for an all-in-one server installed with the :doc:`Quickstart </quickstart>`. The Wazuh manager reissues the certificates from its own certificate authority, so agents enrolled before the change keep trusting it. Run the following steps on this server:

#. Stop the Wazuh manager and check that none of its processes are still running:

   .. code-block:: console

      $ sudo systemctl stop wazuh-manager
      $ sudo /var/wazuh-manager/bin/wazuh-manager-control status

   If any line ends in ``is running...``, run ``sudo /var/wazuh-manager/bin/wazuh-manager-control stop``.

#. List the current addresses of the agent listener certificate. For a Wazuh manager API address, use ``/etc/wazuh-manager/certs/apid.pem`` instead:

   .. code-block:: console

      $ sudo openssl x509 -in /etc/wazuh-manager/certs/remoted.pem -noout -ext subjectAltName

#. Create ``/etc/wazuh-manager/local.env`` with the following line, or change the line if the file already has it. Replace ``<HOSTNAME>`` and ``<SERVER_IP_ADDRESS>`` with the addresses from the previous step, and ``<NEW_ADDRESS>`` with the new address:

   .. code-block:: ini

      WAZUH_MANAGER_REMOTED_CERT_SANS=DNS:<HOSTNAME>,IP:<SERVER_IP_ADDRESS>,IP:<NEW_ADDRESS>

   List every address from the previous step except ``localhost``, ``127.0.0.1``, and ``::1``, which are always added. The list replaces the addresses the Wazuh manager finds on its own. Write ``IP Address:`` entries as ``IP:``, use ``DNS:`` for a name, and separate the entries with commas. For a Wazuh manager API address, set ``WAZUH_MANAGER_APID_CERT_SANS`` the same way. Then restrict the file to root:

   .. code-block:: console

      $ sudo chown root:root /etc/wazuh-manager/local.env
      $ sudo chmod 600 /etc/wazuh-manager/local.env

#. Move the agent listener certificate pair to a backup directory. A pair left in place keeps its old addresses:

   .. code-block:: console

      $ sudo mkdir -p /root/wazuh-certs-backup
      $ sudo mv /etc/wazuh-manager/certs/remoted.pem /etc/wazuh-manager/certs/remoted-key.pem /root/wazuh-certs-backup/

   For a Wazuh manager API address, move ``/etc/wazuh-manager/certs/apid.pem`` and ``/etc/wazuh-manager/certs/apid-key.pem`` too.

#. Issue the new certificates and publish the certificate authority bundle to the agents:

   .. code-block:: console

      $ sudo /var/wazuh-manager/bin/wazuh-manager-resolve-credentials --install
      $ sudo /var/wazuh-manager/bin/wazuh-manager-certs stamp

   The output includes a line that starts with ``resolve-credentials: /etc/wazuh-manager/certs/remoted.pem: issued;`` and lists the new address. If that line is missing, the certificate wasn't issued. Move the files in ``/root/wazuh-certs-backup/`` back to ``/etc/wazuh-manager/certs/`` and start the Wazuh manager.

#. Start the Wazuh manager and create an enrollment token for the new address to confirm the change:

   .. code-block:: console

      $ sudo systemctl start wazuh-manager
      $ sudo /var/wazuh-manager/bin/wazuh-manager-authd --create-enrollment-token --address <NEW_ADDRESS>

Agents enrolled before the change keep connecting to their old address. To point them to the new one, follow :ref:`Move enrolled agents to the new address <vm_move_enrolled_agents>` in the Virtual machine (VM) documentation. For a Wazuh manager API address, also set ``host: ['0.0.0.0', '::']`` in the :ref:`Wazuh manager API configuration file <api_configuration_wazuh_manager_api_configuration_file>` and restart the Wazuh manager.
