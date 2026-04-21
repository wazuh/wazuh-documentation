.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about how to successfully install the Wazuh agent on macOS systems in this section of our Installation Guide.

Deploying Wazuh agents on macOS endpoints
=========================================

The Wazuh agent runs on the endpoint you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

.. note:: You need root user privileges to run all the commands described below.

.. |macOS_intel_64| replace:: `wazuh-agent-5.0.0-beta1.intel64.pkg <https://packages-staging.xdrsiem.wazuh.info/nightly/5.0.0/macos/wazuh-agent-5.0.0-latest.intel64.pkg>`__
.. |macOS_arm64| replace:: `wazuh-agent-5.0.0-beta1.arm64.pkg <https://packages-staging.xdrsiem.wazuh.info/nightly/5.0.0/macos/wazuh-agent-5.0.0-latest.arm64.pkg>`__


#. To start the installation process, download the Wazuh agent according to your architecture:

   - **Intel**: |macOS_intel_64|. Suitable for macOS Sierra and later versions.
   - **Apple silicon**: |macOS_arm64|. Suitable for macOS Big Sur and later versions.

#. Select the installation method you want to follow: command line interface (CLI) or graphical user interface (GUI).

   .. tabs::

      .. group-tab:: CLI

         #. To deploy the Wazuh agent to your system, replace the ``WAZUH_MANAGER`` value with your Wazuh manager IP address or hostname and run the following command: 

            .. tabs::

               .. group-tab:: Intel

                  .. code-block:: console

                     # echo "WAZUH_MANAGER='10.0.0.2'" > /tmp/wazuh_envs && sudo installer -pkg wazuh-agent-5.0.0-beta1.intel64.pkg -target /

               .. group-tab:: Apple silicon

                  .. code-block:: console

                     # echo "WAZUH_MANAGER='10.0.0.2'" > /tmp/wazuh_envs && sudo installer -pkg wazuh-agent-5.0.0-beta1.arm64.pkg -target /

            For additional deployment options such as agent name, agent group, and enrollment password, see the :doc:`Deployment variables for macOS </user-manual/agent/agent-enrollment/deployment-variables/deployment-variables-macos>` section.

            .. note::

               Alternatively, if you want to install an agent without enrolling it, omit the deployment variables. To learn more about the different enrollment methods, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.

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

         #. Start the Wazuh agent to complete the installation process:

            .. code-block:: console

               # launchctl bootstrap system /Library/LaunchDaemons/com.wazuh.agent.plist

         The installation process is now complete, and the Wazuh agent is successfully installed on your macOS endpoint. The next step is to enroll and configure the Wazuh agent to communicate with the Wazuh manager. To perform this action, see the :doc:`Wazuh agent enrollment </user-manual/agent/agent-enrollment/index>` section.  

By default, all agent files are stored in ``/Library/Ossec/`` after the installation.
