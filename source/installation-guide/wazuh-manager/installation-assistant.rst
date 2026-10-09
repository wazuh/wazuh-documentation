.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to install the Wazuh manager using the assisted installation method. The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer.

Installing the Wazuh manager using the assisted installation method
===================================================================

Install the Wazuh manager as a single-node or multi-node cluster on a 64-bit (x86_64/AMD64 or AARCH64/ARM64) architecture using the assisted installation method. The Wazuh manager analyzes event data received from Wazuh agents and forwards the processed events to the Wazuh indexer.

You need root user privileges to run all the commands described below.

Wazuh manager cluster installation
----------------------------------

#. Download the Wazuh installation assistant. Skip this step if the Wazuh installation assistant is already in your working directory:

   .. code-block:: console

      # curl -sO https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh

#. Run the Wazuh installation assistant with the option ``--wazuh-manager`` followed by the node name to install the Wazuh manager. The node name must be the same one used in ``config.yml`` for the initial configuration, for example, ``manager``:

   .. note::

      Make sure that a copy of ``wazuh-install-files.tar``, created in **Initial configuration** of the Wazuh indexer assisted installation, is in your working directory.

   .. code-block:: console

      # bash wazuh-install-|WAZUH_CURRENT|-|WAZUH_MANAGER_CURRENT_REV|.sh --wazuh-manager manager -id -d pre-release

   To check which addresses agents can use to reach this node, run:

   .. code-block:: console

      # openssl x509 -in /var/wazuh-manager/etc/certs/remoted.pem -noout -ext subjectAltName

   The output lists them, for example ``IP Address:<WAZUH_MANAGER_ADDRESS>, DNS:manager``. Make sure that every address your agents connect to is in this list.

Your Wazuh manager is now successfully installed.

Testing the Wazuh manager cluster
---------------------------------

On the master node, run the following command. The output lists every node of the cluster:

.. code-block:: console

   # /var/wazuh-manager/bin/cluster_control -l

The command output looks similar to this:

.. code-block:: none
   :class: output

   NAME       TYPE    VERSION  ADDRESS
   manager    master  5.0.0    <WAZUH_MASTER_ADDRESS>
   manager-2  worker  5.0.0    <WAZUH_WORKER_ADDRESS>

With a single Wazuh manager, the output lists one node, ``node01``, with the address ``127.0.0.1``.

Next steps
----------

-  If you want a Wazuh manager single-node cluster, everything is set, and you can proceed directly with :doc:`Installing the Wazuh dashboard <../wazuh-dashboard/installation-assistant>` using the assisted installation method.

-  If you want a Wazuh manager multi-node cluster, repeat this process on every Wazuh manager node, replacing ``manager`` with that node's name in ``config.yml``, for example ``manager-2``.
