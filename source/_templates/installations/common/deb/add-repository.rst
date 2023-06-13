.. Copyright (C) 2015, Wazuh, Inc.

#. Install the following packages if missing.

    .. code-block:: console

      # apt-get install gnupg apt-transport-https

#. Install the GPG key.

    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH -o /etc/apt/trusted.gpg.d/wazuh.asc && chmod 644 /etc/apt/trusted.gpg.d/wazuh.asc

#. Add the repository.

    .. code-block:: console

       # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the packages information.

    .. code-block:: console

      # apt-get update

.. End of include file
