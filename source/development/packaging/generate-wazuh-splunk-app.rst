.. Copyright (C) 2022 Wazuh, Inc.

.. _create-splunk-app:

Splunk App
==========

Wazuh provides an automated way of building our Wazuh Splunk app packages.

To create a Wazuh Splunk app package follow these steps:

Requirements
^^^^^^^^^^^^

 * Docker
 * Git

Download our wazuh-packages repository from GitHub and go to the splunkapp directory.

.. code-block:: console

  $ git clone https://github.com/wazuh/wazuh-packages && cd wazuh-packages/splunkapp && git checkout |WAZUH_PACKAGES_BRANCH|

Execute the ``generate_wazuh_splunk_app.sh`` script, with the different options you desire. This script will build a Docker image with all the necessary tools to create the Wazuh Splunk App package and run a container that will build it:

.. code-block:: console

  $ ./generate_wazuh_splunk_app.sh -h

.. code-block:: none
  :class: output

  Usage: ./generate_wazuh_splunk_app.sh [OPTIONS]
  
      -b, --branch <branch>     [Required] Select Git branch or tag.
      -s, --store <directory>   [Optional] Destination directory by default /home/vagrant/wazuh-wazuh-packages-26460eb/splunkapp/output
      -r, --revision            [Optional] Package revision that append to version e.g. x.x.x-y.y.y_rev
      -c, --checksum <path>     [Optional] Generate checksum
      -h, --help                Show this help.

Below, you will find some examples of how to build Wazuh Splunk App packages.

.. code-block:: console

  # ./generate_wazuh_splunk_app.sh -b v|WAZUH_LATEST|-|SPLUNK_LATEST| -s /splunk-app -r 1

This will generate a Wazuh Splunk app package for Wazuh |WAZUH_LATEST| and Splunk |SPLUNK_LATEST| with revision 1 and store it in /splunk-app.

.. code-block:: console

  # ./generate_wazuh_splunk_app.sh -b v|WAZUH_LATEST|-|SPLUNK_LATEST| -s /splunk-app -r 1 -c

This will generate a Wazuh Splunk app package for Wazuh |WAZUH_LATEST| and Splunk |SPLUNK_LATEST| with revision 1, the sha512 checksum and store them in /splunk-app.

Remember that the branch or tag for the script has to come from our wazuh-splunk repository.
