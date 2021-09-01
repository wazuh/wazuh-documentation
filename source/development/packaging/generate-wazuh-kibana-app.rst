.. Copyright (C) 2021 Wazuh, Inc.

.. _create-kibana-app:

Wazuh Kibana plugin
===================

Wazuh provides an automated way of building our Wazuh Kibana plugin packages.

To create a Wazuh Kibana plugin package follow these steps:

Requirements
^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh-packages repository from GitHub and go to the wazuhapp directory.

.. code-block:: console

  $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/wazuhapp

If you want to build a version later or equal to |WAZUH_GCC_CHANGE|, you must change to |WAZUH_PACKAGES_BRANCH| branch.

.. code-block:: console

 $ git checkout |WAZUH_PACKAGES_BRANCH|

If you want to build a version prior to |WAZUH_GCC_CHANGE|, you must change to the corresponding tag, e.g. v|WAZUH_PREGCC_CHANGE|

.. code-block:: console

 $ git checkout v|WAZUH_PREGCC_CHANGE|

Execute the ``generate_wazuh_app.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the Wazuh Kibana plugin package and run a container that will build it:

.. code-block:: console

  $ ./generate_wazuh_app.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_wazuh_app.sh [OPTIONS]
  
      -b, --branch <branch>     [Required] Select Git branch or tag.
      -s, --store <path>        [Optional] Set the destination path of package, by defauly /tmp/wazuh-app.
      -r, --revision <rev>      [Optional] Package revision that append to version e.g. x.x.x-rev
      -c, --checksum <path>     [Optional] Generate checksum
      -h, --help                Show this help.

Below, you will find some examples of how to build Wazuh Kibana plugin packages.

.. code-block:: console

  # ./generate_wazuh_app.sh -b v|WAZUH_LATEST|-|ELASTICSEARCH_LATEST| -s /wazuh-app -r 1

This will generate a Wazuh Kibana plugin package for Wazuh |WAZUH_LATEST| and ELK |ELASTICSEARCH_LATEST| with revision 1 and store it in /wazuh-app.

.. code-block:: console

  # ./generate_wazuh_app.sh -b v|WAZUH_LATEST|-|ELASTICSEARCH_LATEST| -s /wazuh-app -r 1 -c

This will generate a Wazuh Kibana plugin package for Wazuh |WAZUH_LATEST| and ELK |ELASTICSEARCH_LATEST| with revision 1, the sha512 checksum and store them in /wazuh-app .

Remember that the branch or tag for the script has to come from our wazuh-kibana-app repository.
