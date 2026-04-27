.. Copyright (C) 2015, Wazuh, Inc.

#. Install the following packages if missing:

   .. code-block:: console

     # apt-get install gnupg apt-transport-https

#. Install the GPG key:

   .. code-block:: console

     # curl -s https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

#. Add the repository:

    .. code-block:: console

      # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/apt/ unstable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

.. note::

   For Debian 7, 8, and Ubuntu 14 systems import the GPG key and add the Wazuh repository (steps 1 and 2) using the following commands.

   .. code-block:: console

      # apt-get install gnupg apt-transport-https
      # curl -s https://packages-staging.xdrsiem.wazuh.info/key/GPG-KEY-WAZUH | apt-key add -
      # echo "deb https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/apt/ unstable main" | tee -a /etc/apt/sources.list.d/wazuh.list

.. End of include file
