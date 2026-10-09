.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: Learn how to deploy the Wazuh agent on Linux with deployment variables that facilitate the task of installing, enrolling, and configuring the agent.

Deploying Wazuh agents on Linux endpoints
=========================================

The Wazuh agent runs on the endpoint you want to monitor and communicates with the Wazuh manager, sending data in near real-time through an encrypted and authenticated channel.

Install the Wazuh agent from the Wazuh repository. The ``WAZUH_ENROLLMENT_TOKEN`` and ``WAZUH_AGENT_NAME`` variables in the install command enroll the agent with the Wazuh manager when it first starts. To download the package instead, see :doc:`Packages list </installation-guide/packages-list>`.

Before you start, create an enrollment token on the Wazuh manager, as described in :ref:`Generate the enrollment token <generate_enrollment_token>`. The endpoint must reach the Wazuh manager on port 1517/TCP.

.. note::

   Run the commands below as root. If you use ``sudo``, put the variables after it, for example ``sudo WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>' WAZUH_AGENT_NAME='<AGENT_NAME>' apt-get install -y wazuh-agent``, because ``sudo`` doesn't pass your environment variables to the command.

.. _agent-installation-add-wazuh-repository:

Add the Wazuh repository
------------------------

Add the Wazuh repository to download the official packages.

Use the tab of your system's package manager: DNF on Red Hat Enterprise Linux 8 and later and compatible systems, Yum on systems without DNF, ZYpp on SUSE, and APT on Debian and Ubuntu.

.. tabs::

   .. group-tab:: APT

      #. Install the following packages if missing:

         .. code-block:: console

            # apt-get install -y gnupg apt-transport-https curl

      #. Install the GPG key:

         .. code-block:: console

            # curl -s https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

      #. Add the repository:

         .. code-block:: console

            # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/apt/ unstable main" | tee /etc/apt/sources.list.d/wazuh.list

      #. Update the package information:

         .. code-block:: console

            # apt-get update

   .. group-tab:: Yum

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH

      #. Add the repository:

         .. code-block:: console

            # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/\nprotect=1' | tee /etc/yum.repos.d/wazuh.repo

   .. group-tab:: DNF

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH

      #. Add the repository:

         .. code-block:: console

            # echo -e '[wazuh]\ngpgcheck=1\ngpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH\nenabled=1\nname=EL-$releasever - Wazuh\nbaseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/\npriority=1' | tee /etc/yum.repos.d/wazuh.repo

   .. group-tab:: ZYpp

      #. Import the GPG key:

         .. code-block:: console

            # rpm --import https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH

      #. Add the repository:

         .. code-block:: console

            # cat > /etc/zypp/repos.d/wazuh.repo <<\EOF
            [wazuh]
            gpgcheck=1
            gpgkey=https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH
            enabled=1
            name=Wazuh repository
            baseurl=https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/yum/
            EOF

      #. Refresh the repository:

         .. code-block:: console

            # zypper refresh

Deploy a Wazuh agent
--------------------

Follow these steps to deploy the Wazuh agent on your Linux endpoint.

#. Select your package manager and run the following command. Replace ``<ENROLLMENT_TOKEN>`` with the token you created in :ref:`Generate the enrollment token <generate_enrollment_token>`, and ``<AGENT_NAME>`` with a name for this endpoint that no other agent uses, for example, its host name. If you omit ``WAZUH_AGENT_NAME``, the agent enrolls under the host name. The Wazuh manager refuses a name that another agent already uses.

   .. tabs::

      .. group-tab:: APT

         .. code-block:: console

            # WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>' WAZUH_AGENT_NAME='<AGENT_NAME>' apt-get install -y wazuh-agent|WAZUH_AGENT_DEB_PKG_INSTALL|

      .. group-tab:: Yum

         .. code-block:: console

            # WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>' WAZUH_AGENT_NAME='<AGENT_NAME>' yum install -y wazuh-agent|WAZUH_AGENT_RPM_PKG_INSTALL|

      .. group-tab:: DNF

         .. code-block:: console

            # WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>' WAZUH_AGENT_NAME='<AGENT_NAME>' dnf install -y wazuh-agent|WAZUH_AGENT_RPM_PKG_INSTALL|

      .. group-tab:: ZYpp

         .. code-block:: console

            # WAZUH_ENROLLMENT_TOKEN='<ENROLLMENT_TOKEN>' WAZUH_AGENT_NAME='<AGENT_NAME>' zypper install -y wazuh-agent|WAZUH_AGENT_ZYPP_PKG_INSTALL|

#. For additional deployment options such as agent group, see the :doc:`Deployment variables </user-manual/agent/agent-enrollment/deployment-variables/index>` section. Enable and start the Wazuh agent service:

   .. tabs::

      .. group-tab:: Systemd

         .. code-block:: console

            # systemctl daemon-reload
            # systemctl enable wazuh-agent
            # systemctl start wazuh-agent

      .. group-tab:: SysV Init

         Choose one option according to your operating system.

         #. RPM-based operating systems:

            .. code-block:: console

               # chkconfig --add wazuh-agent
               # service wazuh-agent start

         #. Debian-based operating systems:

            .. code-block:: console

               # update-rc.d wazuh-agent defaults 95 10
               # service wazuh-agent start

      .. group-tab:: No service manager

         On some systems, you need to start the Wazuh agent manually:

         .. code-block:: console

            # /var/ossec/bin/wazuh-control start

#. Check that the Wazuh agent is enrolled and connected:

   .. code-block:: console

      # grep ^status /var/ossec/var/run/wazuh-agentd.state
      # grep 'Token bootstrap: enrollment succeeded' /var/ossec/logs/ossec.log

   The first command prints ``status='connected'``. If it prints ``status='pending'``, wait a few seconds and run it again. The second prints a line that ends in ``Token bootstrap: enrollment succeeded; the manager's CA is now the agent's trust anchor.`` In the Wazuh dashboard, **Agents management** > **Summary** lists the agent as **Active**.

   If ``systemctl start wazuh-agent`` failed or the agent didn't enroll, the cause is one of these:

   -  The install command printed ``no manager configured [INFO_NO_MANAGER]``: the token didn't reach the installer, for example because ``sudo`` dropped it.
   -  The install command printed ``deployment variables refused [ERR_BAD_TOKEN]``: the token changed when you copied it.
   -  ``/var/ossec/logs/ossec.log`` shows ``Enrollment-token bootstrap failed``: the Wazuh manager refused the token, for example because it was revoked, it expired, or it was already used as many times as ``--max-uses`` allows.

   In each case, save a valid token to a file, enroll the agent, delete the file, and start the agent. In the first two cases, the installer kept no agent name, so the agent enrolls under the endpoint's host name.

   .. code-block:: console
      :emphasize-lines: 1,2

      # /var/ossec/bin/wazuh-agent-auth --token-file <TOKEN_FILE_PATH>
      # rm -f <TOKEN_FILE_PATH>
      # systemctl start wazuh-agent

The deployment process is now complete, and the Wazuh agent is successfully running on your Linux endpoint.

Disable Wazuh updates
---------------------

Compatibility between the Wazuh agent and the Wazuh manager is guaranteed when the Wazuh manager version is later than or equal to that of the Wazuh agent. Therefore, we recommend disabling the Wazuh repository to prevent accidental upgrades. To do so, use the following command:

.. tabs::

   .. group-tab:: APT

      .. code-block:: console

         # sed -i "s/^deb /#deb /" /etc/apt/sources.list.d/wazuh.list
         # apt-get update

      Alternatively, you can set the package state to ``hold``. This action stops updates. To upgrade or uninstall the Wazuh agent later, run ``apt-mark unhold wazuh-agent`` first.

      .. code-block:: console

         # echo "wazuh-agent hold" | dpkg --set-selections

   .. group-tab:: Yum

      .. code-block:: console

         # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

   .. group-tab:: DNF

      .. code-block:: console

         # sed -i "s/^enabled=1/enabled=0/" /etc/yum.repos.d/wazuh.repo

   .. group-tab:: ZYpp

      .. code-block:: console

         # sed -i "s/^enabled=1/enabled=0/" /etc/zypp/repos.d/wazuh.repo
