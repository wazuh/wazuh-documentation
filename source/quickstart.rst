.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Install and configure Wazuh, the open source security platform, in just a few minutes using the Wazuh installation assistant.

Quickstart
==========

Install the Wazuh manager, Wazuh indexer, and Wazuh dashboard on one server with the :doc:`installation assistant </user-manual/reference/installation-utilities/installation-assistant>`. It takes about 10 minutes. For other options, such as a distributed deployment, see the :doc:`Installation guide </installation-guide/index>`.

.. _installation_requirements:

Requirements
------------

This all-in-one deployment is enough for up to 100 endpoints and 90 days of :doc:`findings </user-manual/data-analysis/findings>`. For more, use a :doc:`distributed deployment </installation-guide/index>`.

Hardware
^^^^^^^^

.. table::

   +------------+---------+---------+-----------------------+
   | **Agents** | **CPU** | **RAM** | **Storage (90 days)** |
   +============+=========+=========+=======================+
   | 1–25       | 4 vCPU  | 8 GB    | 50 GB                 |
   +------------+---------+---------+-----------------------+
   | 26–50      | 8 vCPU  | 16 GB   | 100 GB                |
   +------------+---------+---------+-----------------------+
   | 51–100     | 8 vCPU  | 16 GB   | 200 GB                |
   +------------+---------+---------+-----------------------+

Operating system
^^^^^^^^^^^^^^^^

A 64-bit Linux server (x86_64/AMD64 or AARCH64/ARM64) with one of these systems:

.. table::

   +--------------------------+--------------------------+
   | **Operating system**     | **Versions**             |
   +==========================+==========================+
   | Amazon Linux             | 2023                     |
   +--------------------------+--------------------------+
   | Ubuntu                   | 24.04 LTS, 26.04 LTS     |
   +--------------------------+--------------------------+
   | Red Hat Enterprise Linux | 9, 10                    |
   +--------------------------+--------------------------+

Before you start
----------------

-  A server that meets the :ref:`requirements <installation_requirements>`, with internet access and a user with sudo privileges.
-  Inbound ports open in the server's firewall and cloud security group: ``443/TCP`` for the Wazuh dashboard and ``1517/TCP`` for Wazuh agents. See :ref:`Required ports <default_ports>`.

.. _quickstart_installing_wazuh:

Installing Wazuh
----------------

Run the installation assistant:

.. code-block:: console

   $ curl -sO https://packages.wazuh.com/5.0/wazuh-install.sh && sudo bash ./wazuh-install.sh -a

When it finishes, the assistant prints the address of the Wazuh dashboard and the admin credentials:

.. code-block:: none
   :class: output

   INFO: --- Summary ---
   INFO: You can access the web interface https://<WAZUH_DASHBOARD_ADDRESS>:443
   INFO:     User: admin (Wazuh dashboard login and Wazuh indexer administrator)
   INFO:     Password: <ADMIN_PASSWORD>

Open ``https://<WAZUH_DASHBOARD_ADDRESS>`` in a browser and log in as ``admin`` with that password.

.. note::

   -  On a cloud instance, use its public IP address or DNS name, not the private address the summary shows.
   -  The browser warns about the certificate, because Wazuh creates its own certificate authority. Accept it, or :doc:`use a certificate from a trusted authority </user-manual/wazuh-dashboard/configuring-third-party-certs/index>`.

For where passwords are kept and how to change them, see :doc:`Password management </user-manual/user-administration/password-management>`.

Next steps
----------

Add your first agent from the Wazuh dashboard. The Wazuh manager doesn't monitor its own server: to monitor it, install an agent on it too.

#. Go to **Agents management** > **Summary**, click **Deploy new agent**, and select the package for your endpoint.
#. Enter the address the endpoint uses to reach the Wazuh manager, then click **Generate token**. To use an address that isn't in the list, such as a public IP address or a DNS name, see :ref:`Adding the address after the installation <wazuh_manager_adding_address_after_installation>`.
#. Run the installation and start commands on the endpoint.
#. Check that **Agents management** > **Summary** lists the agent as **Active**.

For more options, see :doc:`Deploying Wazuh agents </installation-guide/wazuh-agent/index>`.
