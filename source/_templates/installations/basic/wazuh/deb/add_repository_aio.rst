.. Copyright (C) 2022 Wazuh, Inc.

#. Install the GPG key:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

#. Add the repository:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

.. End of include file
