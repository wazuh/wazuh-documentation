.. Copyright (C) 2021 Wazuh, Inc.

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

  $ ./generate_ova.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_ova.sh [OPTIONS]

    -w, --wazuh            [Optional] Version of wazuh to install on VM.
    -o, --opendistro       [Optional] Version of Open Distro for Elasticsearch.
    -e, --elk              [Optional] Versions of Elasticsearch, Logstash and Kibana.
    -r, --repository       [Optional] Select the software repository [dev/prod]. By default: prod
    -b, --branch           [Optional] Branch/tag of the Wazuh repository. By default: v|WAZUH_LATEST|
                           [Required by -r|--repository]
    -d, --doc              [Optional] Branch/tag of the Wazuh documentation repository. By default: v|WAZUH_LATEST|
                           [Required by -r|--repository]
    -s, --store <path>     [Optional] Set the destination absolute path where the ova file will be stored.
    -c, --checksum         [Optional] Generate checksum [yes/no]. By default: no
    -u, --ui-revision      [Optional] Revision of the UI package. By default: 1
    -g, --debug            [Optional] Set debug mode on [yes/no]. By default: no
    -h, --help             [  Util  ] Show this help.

The options for the repository indicates whether the packages used to install Wazuh are the production ones or not.

 * prod: The OVA uses released packages.
 * dev: The OVA uses not released packages.

Below, you will find some examples of how to build a Wazuh virtual machine.

.. code-block:: console

  # ./generate_ova.sh

This will generate a Virtual machine with Wazuh manager |WAZUH_LATEST|, Opendistro |OPEN_DISTRO_LATEST| and ELK |ELASTICSEARCH_LATEST| using stable packages.

.. code-block:: console

  # ./generate_ova.sh -w |WAZUH_LATEST| -o |OPEN_DISTRO_LATEST| -e |ELASTICSEARCH_LATEST|

This will generate a Virtual machine with the specified Wazuh manager |WAZUH_LATEST|, Opendistro |OPEN_DISTRO_LATEST| and ELK |ELASTICSEARCH_LATEST| using stable packages.

.. code-block:: console

  # ./generate_ova.sh -w |WAZUH_LATEST| -o |OPEN_DISTRO_LATEST| -e |ELASTICSEARCH_LATEST| -b v4.2.0-rc6 -d 4.2-rc -r dev -g yes

This will generate a Virtual machine with Wazuh manager |WAZUH_LATEST|, Opendistro |OPEN_DISTRO_LATEST| and ELK |ELASTICSEARCH_LATEST| using v4.2.0-rc6 tag of wazuh repository and 4.2-rc branch documentation repository with development packages and debug mode on.

It is highly recommended to change Elasticsearch default passwords for the users' found at the ``/usr/share/elasticsearch/plugins/opendistro_security/securityconfig/internal_users.yml`` file. More information about this process can be found in the :ref:`user manual <change_elastic_pass>`.
