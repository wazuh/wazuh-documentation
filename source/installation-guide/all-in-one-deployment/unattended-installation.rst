.. Copyright (C) 2020 Wazuh, Inc.

Unattended installation
=======================

This section will explain how to install a full Wazuh-Elastic enviroment on a single machine by using a single script. The script will automatically detect wether the operating system uses ``rpm`` or ``deb`` packages.

.. note:: Root user privileges are required to execute all the commands described below.

In order to download the script, ``curl`` package must be installed on the system: 

.. tabs::

  .. group-tab:: Yum

    .. code-block:: console

        # yum install curl


  .. group-tab:: APT

    .. code-block:: console

        # apt install curl

Download the script and run it: 

.. code-block:: console

    # curl -so ~/all-in-one-installation.sh https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/all-in-one-installation.sh && bash ~/all-in-one-installation.sh
