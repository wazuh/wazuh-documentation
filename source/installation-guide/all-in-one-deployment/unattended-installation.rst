.. Copyright (C) 2020 Wazuh, Inc.

Unattended installation
=======================

This section will explain how to install a full Wazuh-Elastic enviroment on a single machine by using a single script. The script will automatically detect wether the Operating System used is ``yum`` or ``apt`` based.

.. note:: Root user privileges are required to execute all the commands described below.

#. Download the script: 

    .. code-block:: console

        # wget https://raw.githubusercontent.com/wazuh/wazuh/new-documentation-templates/extensions/unattended-installation/all-in-one-installation.sh

#. Give the script execution privileges and run it:

    .. code-block:: console

        # chmod +x all-in-one-installation.sh
        # ./all-in-one-installation.sh
