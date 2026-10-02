.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install Wazuh dashboard, a flexible and intuitive web interface for mining and visualizing security data.

Installing the Wazuh dashboard step-by-step
===========================================

Install and configure the Wazuh dashboard following step-by-step instructions. The Wazuh dashboard is a web interface for mining and visualizing security data.

.. note:: You need root user privileges to run all the commands described below.

Wazuh dashboard installation
----------------------------

Follow these steps to install the Wazuh dashboard.

Installing package dependencies
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. include:: /_templates/installations/dashboard/install-dependencies.rst

Adding the Wazuh repository
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. note::

   If you are installing the Wazuh dashboard on the same host as the Wazuh indexer or the Wazuh manager, you may skip these steps as you may have added the Wazuh repository already.

.. tabs::

   .. group-tab:: APT

      .. include:: /_templates/installations/common/deb/add-repository.rst

   .. group-tab:: Yum

      .. include:: /_templates/installations/common/yum/add-repository.rst

   .. group-tab:: DNF

      .. include:: /_templates/installations/common/dnf/add-repository.rst

Installing the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Install the Wazuh dashboard package:

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # apt-get -y install wazuh-dashboard|WAZUH_DASHBOARD_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # yum -y install wazuh-dashboard|WAZUH_DASHBOARD_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # dnf -y install wazuh-dashboard|WAZUH_DASHBOARD_RPM_PKG_INSTALL|

Configuring the Wazuh dashboard
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Edit the ``/etc/wazuh-dashboard/opensearch_dashboards.yml`` file. The package ships it pre-filled with single-host values, so change only ``opensearch.hosts`` and ``wazuh_core.hosts.default.url``, and leave the rest of the file as shipped:

   #. ``server.host``: The package sets ``0.0.0.0``, which accepts connections on every address of the host. You don't need to change it.

   #. ``opensearch.hosts``: Replace ``localhost`` with the URLs of the Wazuh indexer instances to use for all your queries. The Wazuh dashboard can be configured to connect to multiple Wazuh indexer nodes in the same cluster. The addresses of the nodes can be separated by commas. For example, ``["https://10.0.0.2:9200", "https://10.0.0.3:9200","https://10.0.0.4:9200"]``

      .. code-block:: yaml
         :emphasize-lines: 3

         server.host: 0.0.0.0
         server.port: 443
         opensearch.hosts: https://localhost:9200
         opensearch.ssl.verificationMode: certificate

   #. ``wazuh_core.hosts.default.url``: The Wazuh manager master node. Replace ``<WAZUH_MANAGER_IP_ADDRESS>`` with the IP address or DNS name of the master node. If the Wazuh manager master node is on this host, keep the shipped value, ``https://localhost``.

      .. code-block:: yaml
         :emphasize-lines: 3

         wazuh_core.hosts:
           default:
             url: https://<WAZUH_MANAGER_IP_ADDRESS>
             port: 55000
             username: wazuh-wui
             run_as: true

   .. note::

      Firewalls can block communication between Wazuh components on different hosts. Refer to the :ref:`Required ports <default_ports>` section and ensure the necessary ports are open.

Deploying certificates
^^^^^^^^^^^^^^^^^^^^^^

.. note::

   Make sure that a copy of ``wazuh-certificates.tar`` file, created during the initial configuration step, is placed in your working directory.

#. Replace ``<DASHBOARD_NODE_NAME>`` with your Wazuh dashboard node name, the same one used in the ``config.yml`` file to create the certificates. In our case, the node name is, ``dashboard``. Then move the certificates to their corresponding location:

   .. code-block:: console

      # NODE_NAME=<DASHBOARD_NODE_NAME>

   .. code-block:: console

      # mkdir -p /etc/wazuh-dashboard/certs ./wazuh-certificates
      # tar -xf ./wazuh-certificates.tar -C ./wazuh-certificates
      # install -m 0400 ./wazuh-certificates/$NODE_NAME.pem /etc/wazuh-dashboard/certs/dashboard.pem
      # install -m 0400 ./wazuh-certificates/$NODE_NAME-key.pem /etc/wazuh-dashboard/certs/dashboard-key.pem
      # install -m 0400 ./wazuh-certificates/root-ca.pem /etc/wazuh-dashboard/certs/
      # rm -rf ./wazuh-certificates
      # chmod 500 /etc/wazuh-dashboard/certs
      # chown -R wazuh-dashboard:wazuh-dashboard /etc/wazuh-dashboard/certs

   These files replace the certificates the package issued.

#. On a host where the package found no CA, it created its own root CA in ``/etc/wazuh/ca``, with its private key, and nothing you deployed chains to it. Remove that directory only when it holds the ``.wazuh-dashboard-bootstrap-ca`` marker file, which the package writes beside the CA it creates. Never remove ``/etc/wazuh/ca`` on the host where you ran ``wazuh-certs-tool-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh -A``: it holds ``root-ca.key``, the only copy of your root CA private key, and ``wazuh-certificates.tar`` doesn't include it.

   .. code-block:: console

      # [ -e /etc/wazuh/ca/.wazuh-dashboard-bootstrap-ca ] && rm -rf /etc/wazuh/ca

Copying the passwords to the Wazuh dashboard host
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

If the Wazuh indexer and the Wazuh manager are not on this host, copy two passwords to it before you start the service. Without them, the service fails to start with ``MISSING WAZUH_INDEXER_KIBANASERVER_PASSWORD`` and ``MISSING WAZUH_MANAGER_WUI_PASSWORD``.

#. On the Wazuh indexer node where you ran ``indexer-security-init.sh``, run the following command:

   .. code-block:: console

      # grep '^WAZUH_INDEXER_KIBANASERVER_PASSWORD=' /etc/wazuh/credentials.env

#. On the Wazuh manager master node, run the following command:

   .. code-block:: console

      # grep '^WAZUH_MANAGER_WUI_PASSWORD=' /etc/wazuh/credentials.env

#. Append both lines, exactly as printed, to ``/etc/wazuh/credentials.env`` on this host.

Starting the Wazuh dashboard service
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

#. Enable and start the Wazuh dashboard service:

   .. include:: /_templates/installations/dashboard/enable_dashboard.rst

#. Get the ``<WAZUH_INDEXER_ADMIN_PASSWORD>``. On the Wazuh indexer node where you ran ``indexer-security-init.sh``, run the following command. The quotes around the value are not part of the password.

   .. code-block:: console

      # grep WAZUH_INDEXER_ADMIN_PASSWORD /etc/wazuh/credentials.env

#. Access the Wazuh web interface with your ``admin`` user credentials. This is the default administrator account for the Wazuh indexer and it allows you to access the Wazuh dashboard.

   -  **URL**: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
   -  **Username**: ``admin``
   -  **Password**: ``<WAZUH_INDEXER_ADMIN_PASSWORD>``

   When you access the Wazuh dashboard for the first time, the browser shows a warning message stating that the certificate was not issued by a trusted authority. An exception can be added in the advanced options of the web browser. For increased security, the ``root-ca.pem`` file previously generated can be imported to the certificate manager of the browser. Alternatively, you can :doc:`configure a certificate </user-manual/wazuh-dashboard/configuring-third-party-certs/index>` from a trusted authority.

Securing your Wazuh installation
--------------------------------

Each Wazuh package writes the passwords it generated to ``/etc/wazuh/credentials.env`` on its own host. The values that work are on two nodes: the Wazuh indexer user passwords on the Wazuh indexer node where you ran ``indexer-security-init.sh``, and the API user passwords on the Wazuh manager master node. Other nodes can hold different values for the same keys, and those values don't work. For example, a second Wazuh indexer node's own ``WAZUH_INDEXER_ADMIN_PASSWORD`` is refused.

Securely store the passwords from those two nodes, then remove the ``/etc/wazuh/credentials.env`` file from every node. Wazuh components do not use this file after the installation process is complete.

To change a password after installation, see the :doc:`password management </user-manual/user-administration/password-management>` documentation.

Disable Wazuh updates
---------------------

.. include:: /_templates/installations/disable-wazuh-updates.rst

Next steps
----------

All the Wazuh central components are successfully installed and secured.

.. raw:: html

  <div class="link-boxes-group layout-3" data-step="4">
    <div class="steps-line">
      <div class="steps-number past-step">1</div>
      <div class="steps-number past-step">2</div>
      <div class="steps-number past-step">3</div>
    </div>
    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-indexer/index.html">
        <p class="link-boxes-label">Install the Wazuh indexer</p>

.. image:: ../../images/installation/Indexer-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="../wazuh-manager/index.html">
        <p class="link-boxes-label">Install the Wazuh manager</p>

.. image:: ../../images/installation/Server-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>

    <div class="link-boxes-item past-step">
      <a class="link-boxes-link" href="index.html">
        <p class="link-boxes-label">Install the Wazuh dashboard</p>

.. image:: ../../images/installation/Dashboard-Circle.png
     :align: center
     :height: 61px

.. raw:: html

      </a>
    </div>
  </div>


The Wazuh environment is now ready, and you can proceed with installing the Wazuh agent on the endpoints to be monitored. To perform this action, see the :doc:`Wazuh agent </installation-guide/wazuh-agent/index>` section.

If you want to uninstall the Wazuh dashboard, see :ref:`uninstall_dashboard`.
