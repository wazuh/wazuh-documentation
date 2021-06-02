.. Copyright (C) 2020 Wazuh, Inc.

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

 $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/ova && git checkout |WAZUH_PACKAGES_BRANCH|

Execute the ``generate_ova.sh`` script, with the different options you desire.

.. code-block:: console

  $ ./generate_wazuh_packages.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_ova.sh [OPTIONS]
  
    -b, --build            [Required] Build the OVA and OVF.
    -v, --version          [Required] Version of wazuh to install on VM.
    -e, --elastic-version  [Required] Elastic version to download inside VM.
    -r, --repository       [Required] Status of the packages [stable/unstable]
    -d, --directory        [Optional] Where will be installed manager. Default /var/ossec
    -s, --store <path>     [Optional] Set the destination absolute path of package.
    -c, --checksum <path>  [Optional] Generate checksum.
    -h, --help             [  Util  ] Show this help.

The options for the repository indicates whether the packages used to install Wazuh are the production ones or not.

 * Stable: The OVA uses released packages.
 * Unstable: The OVA uses not released packages.

Below, you will find some examples of how to build a Wazuh virtual machine.

.. code-block:: console

  # ./generate_ova.sh -b -v |WAZUH_LATEST| -e |ELASTICSEARCH_LATEST| -r stable

This will generate a Virtual machine with Wazuh manager |WAZUH_LATEST| and ELK |ELASTICSEARCH_LATEST| installed using stable packages

.. code-block:: console

  # ./generate_ova.sh -b -v |WAZUH_LATEST| -e |ELASTICSEARCH_LATEST| -r unstable -c

This will generate a Virtual machine with Wazuh manager |WAZUH_LATEST| and ELK |ELASTICSEARCH_LATEST| installed using unstable packages and generate the sha512 checksum
