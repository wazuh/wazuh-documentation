.. Copyright (C) 2022 Wazuh, Inc.

.. _create-ova:

Virtual machine
===============

Wazuh provides an automated way of generating a Virtual machine in OVA format that is ready to run a Wazuh manager and ELK.

To create the virtual machine follow these steps:

Requirements
^^^^^^^^^^^^

 * `Virtual Box <https://www.virtualbox.org/manual/UserManual.html#installation>`_
 * `Vagrant <https://www.vagrantup.com/docs/installation/>`_
 * `Git <https://git-scm.com/book/en/v2/Getting-Started-Installing-Git>`_
 * `Python <https://www.python.org/download/releases/2.7/>`_

Download our wazuh-packages repository from GitHub and go to the ova directory of the |WAZUH_PACKAGES_BRANCH| branch.

.. code-block:: console

 $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/ova && git checkout v|WAZUH_LATEST|

Execute the ``generate_ova.sh`` script, with the different options you desire.

.. code-block:: console

  $ ./generate_ova.sh -h

.. code-block:: none
  :class: output

  General usage: generate_ova.sh [OPTIONS]
    -r,    --repository       [Optional] Select the software repository [prod/dev]. By default: prod
    -s,    --store <path>     [Optional] Set the destination absolute path where the OVA file will be stored.
    -c,    --checksum         [Optional] Generate checksum [yes/no]. By default: no
    -g,    --debug            [Optional] Set debug mode on [yes/no]. By default: no
    -h,    --help             [  Util  ] Show this help.

The options for the repository indicates whether the packages used to install Wazuh are the production ones or not.

 * prod: The OVA uses released packages.
 * dev: The OVA uses pre-release packages.

Below, you will find some examples of how to build a Wazuh virtual machine.

.. code-block:: console

  # ./generate_ova.sh

This will generate a Virtual machine with Wazuh manager |WAZUH_LATEST| and ELK |ELASTICSEARCH_LATEST| installed using production packages.

.. code-block:: console

  # ./generate_ova.sh -r dev

This will generate a Virtual machine with Wazuh manager |WAZUH_LATEST| and ELK |ELASTICSEARCH_LATEST| installed using development packages.
