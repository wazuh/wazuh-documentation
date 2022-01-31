.. Copyright (C) 2015-2022 Wazuh, Inc.

#. Install the GPG key.

    .. code-block:: console

      # curl -s https://s3-us-west-1.amazonaws.com/packages-dev.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

#. Add the repository.

    .. code-block:: console

      # echo "deb https://s3-us-west-1.amazonaws.com/packages-dev.wazuh.com/pre-release/apt/ unstable main" | tee -a /etc/apt/sources.list.d/wazuh_pre_release.list

#. Update the package information.

    .. code-block:: console

      # apt-get update

.. End of include file
