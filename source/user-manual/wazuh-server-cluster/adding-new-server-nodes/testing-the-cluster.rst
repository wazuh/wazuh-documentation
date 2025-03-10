.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to proceed with testing your cluster to ensure that the new Wazuh server node has been connected.

Testing the cluster
===================

Now that the installation and configuration are completed, you can proceed with testing your cluster to ensure that the new Wazuh server node has been connected. Two possible ways of doing this:

-  `Using the cluster control tool`_
-  `Using the Wazuh API console`_

Using the cluster control tool
------------------------------

Verify that the Wazuh server cluster is enabled and all the nodes are connected by executing the following command on any of the Wazuh server nodes:

.. code-block:: console

   # /var/ossec/bin/cluster_control -l

A sample output of the command:

.. code-block:: none
   :class: output

   NAME             TYPE    VERSION  ADDRESS
   wazuh-server-1   master  4.8.0    10.0.0.1
   wazuh-server-2   worker  4.8.0    10.0.0.2

Note that ``10.0.0.1``, ``10.0.0.2`` are example IP addresses.

Using the Wazuh API console
---------------------------

You can also check your new Wazuh server cluster by using the **Wazuh API Console** accessible via the Wazuh dashboard.

Access the Wazuh dashboard using the credentials below.

-  URL: ``https://<WAZUH_DASHBOARD_IP_ADDRESS>``
-  Username: ``admin``
-  Password: ``<ADMIN_PASSWORD>`` or ``admin`` in case you already have a distributed architecture and using the default password.

Navigate to **Tools** and select **API Console**.  On the console, run the query below:

.. code-block:: none

   GET /cluster/healthcheck

.. thumbnail:: /images/manual/wazuh-server/running-api-console-query.gif
   :title: Running query in the API console
   :alt: Running query in the API console
   :align: center
   :width: 80%

This query will display the global status of your Wazuh server cluster with the following information for each node:

-  ``Name`` indicates the name of the server node
-  ``Type`` indicates the role assigned to a node(Master or Worker)
-  ``Version`` indicates the version of the ``Wazuh-manager`` service running on the node
-  ``IP`` is the IP address of the node
-  ``n_active_agents`` indicates the number of active agents connected to the node

Having completed these steps, the Wazuh infrastructure has been successfully scaled up, and the new server nodes have been integrated into the cluster.

If you want to uninstall the Wazuh server, see :ref:`Uninstall the Wazuh server <uninstall_server>` documentation.
