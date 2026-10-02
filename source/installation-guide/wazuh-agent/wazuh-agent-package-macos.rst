.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn more about how to successfully install the Wazuh agent on macOS systems in this section of our Installation Guide.

Deploying Wazuh agents on macOS endpoints
=========================================

The Wazuh agent runs on the endpoint you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

.. note:: You need root user privileges to run all the commands described below.

.. |macOS_intel_64| replace:: `wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg>`__
.. |macOS_arm64| replace:: `wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg <https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg>`__


#. To start the installation process, download the Wazuh agent according to your architecture:

   -  Intel: |macOS_intel_64|. Suitable for macOS Sonoma (14) and Sequoia (15) on Intel.
   -  Apple silicon: |macOS_arm64|. Suitable for macOS Sonoma (14) and Sequoia (15) on Apple silicon.

#. Select the installation method you want to follow: command line interface (CLI) or graphical user interface (GUI).

   .. tabs::

      .. group-tab:: CLI

         #. Run the following command to deploy the Wazuh agent on your endpoint.

            Replace

            -  ``WAZUH_ENROLLMENT_TOKEN`` value with the enrollment token generated in :ref:`generate the enrollment token <generate_enrollment_token>`.
            -  ``WAZUH_AGENT_NAME`` value with the agent's name for identification in the Wazuh manager.

            .. tabs::

               .. group-tab:: Intel

                  .. code-block:: console

                     # curl -O https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg
                     # echo "WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>'" > /tmp/wazuh_envs && echo "WAZUH_AGENT_NAME=<AGENT_NAME>" >> /tmp/wazuh_envs && sudo installer -pkg wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.intel64.pkg -target /

               .. group-tab:: Apple silicon

                  .. code-block:: console

                     # curl -O https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR_OSX|/macos/wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg
                     # echo "WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>'" > /tmp/wazuh_envs && echo "WAZUH_AGENT_NAME=<AGENT_NAME>" >> /tmp/wazuh_envs && sudo installer -pkg wazuh-agent-|WAZUH_CURRENT_OSX|-|WAZUH_REVISION_OSX|.arm64.pkg -target /

         #. Start the Wazuh agent to complete the installation process:

            .. code-block:: console

               # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist

         The installation process is now complete and the Wazuh agent is now successfully running on your macOS endpoint.

      .. group-tab:: GUI

         #. To install the Wazuh agent on your system, run the downloaded file and follow the steps in the installation wizard. If you are not sure how to answer some of the prompts, use the default answers.

            .. thumbnail:: ../../images/installation/macos-agent.png
               :align: center
               :title: macOS agent installer
               :alt: macOS agent installer

         #. Enroll the Wazuh agent before you start it. An agent installed without an enrollment token doesn't start until you enroll it. To enroll it, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

         #. Start the Wazuh agent to complete the installation process:

            .. code-block:: console

               # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist

         The installation process is now complete and the Wazuh agent is successfully running on your macOS endpoint.

By default, all agent files are stored in ``/Library/Ossec/`` after the installation.
