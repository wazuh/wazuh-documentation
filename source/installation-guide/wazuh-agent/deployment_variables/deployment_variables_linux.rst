.. Copyright (C) 2021 Wazuh, Inc.

.. meta:: :description: Learn how to use deployment variables on Linux

.. _deployment_variables_linux:

Deployment variables for Linux
==============================

Below you can find a table showing the different Linux distributions with which you can make an automatic deployment.

+-------------------------------+-------------------------------------------------------------------------+
| Operating system              | Version                                                                 |
+===============================+=========================================================================+
| Amazon Linux                  | :ref:`1 or greater <deployment_variables_yum>`                          |
+-------------------------------+-------------------------------------------------------------------------+
| CentOS                        | :ref:`5 or greater <deployment_variables_yum>`                          |
+-------------------------------+-------------------------------------------------------------------------+
| Debian                        | :ref:`7 or greater <deployment_variables_apt>`                          |
+-------------------------------+-------------------------------------------------------------------------+
| Fedora                        | :ref:`22 or greater <deployment_variables_dnf>`                         |
+-------------------------------+-------------------------------------------------------------------------+
| Oracle Linux                  | :ref:`5 or greater <deployment_variables_yum>`                          |
+-------------------------------+-------------------------------------------------------------------------+
| OpenSUSE                      | :ref:`42 or greater <deployment_variables_zypper>`                      |
+-------------------------------+-------------------------------------------------------------------------+
| Red Hat Enterprise Linux      | :ref:`5 or greater <deployment_variables_yum>`                          |
+-------------------------------+-------------------------------------------------------------------------+
| SUSE                          | :ref:`11 or 12 <deployment_variables_zypper>`                           |
+-------------------------------+-------------------------------------------------------------------------+
| Ubuntu                        | :ref:`12.10 or greater <deployment_variables_apt>`                      |
+-------------------------------+-------------------------------------------------------------------------+

.. toctree::
    :hidden:
    :maxdepth: 2

    linux/deployment_variables_apt
    linux/deployment_variables_dnf
    linux/deployment_variables_yum
    linux/deployment_variables_zypper