.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Check out our User manual to see the available tools and their supported installations for configuring and using each of the Wazuh components. 
  
.. _tools:

Tools
=====

+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| Tools                                             | Descriptions                                                               | Supported installations     |
+===================================================+============================================================================+=============================+
| :doc:`wazuh-control <wazuh-control>`              | Manages the status of Wazuh processes                                      | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`rbac_control <rbac-control>`                | Manage API RBAC resources and reset RBAC DB                                | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`fim_migrate <fim-migrate>`                  | Migrates older FIM databases to Wazuh-DB                                   | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+
| :doc:`wazuh-keystore <wazuh-keystore>`            | Stores sensitive information for increased security                        | manager                     |
+---------------------------------------------------+----------------------------------------------------------------------------+-----------------------------+



  .. toctree::
    :hidden:
    :maxdepth: 1

    rbac-control
    fim-migrate
    wazuh-control
    wazuh-keystore
