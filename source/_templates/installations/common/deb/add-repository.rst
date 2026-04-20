.. Copyright (C) 2015, Wazuh, Inc.

#. Install the following packages if missing.

    .. code-block:: console

      # apt-get install -y gnupg apt-transport-https

#. Install the GPG key.

    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

#. Add the repository.

    .. code-block:: console

       # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages-staging.xdrsiem.wazuh.info/pre-release/5.x/apt/ unstable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the packages information.

    .. code-block:: console

      # apt-get update

.. End of include file
