.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Install the following packages if missing.

    .. code-block:: console

      # apt install gnupg apt-transport-https

#. Install the GPG key.

    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/etc/apt/trusted.gpg.d/GPG-KEY-WAZUH.gpg --import && chmod 644 /etc/apt/trusted.gpg.d/GPG-KEY-WAZUH.gpg

#. Add the repository.

    .. code-block:: console

       # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the packages information.

    .. code-block:: console

      # apt-get update

.. End of include file
