.. Copyright (C) 2020 Wazuh, Inc.

#. For this, the ``curl``, ``apt-transport-https``, ``lsb-release`` and ``gnupg2`` packages must be installed on the system. The ``zip`` package will be necessary for the certificates management. If they are not already present, they must be installed using the commands below:

    .. code-block:: console

      # apt-get update
      # apt-get install curl apt-transport-https lsb-release gnupg2 unzip

#. Install the GPG key:

    .. code-block:: console

      # curl -s https://packages-dev.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

#. Add the repository:

    .. code-block:: console

      # echo "deb https://packages-dev.wazuh.com/trash/apt/ unstable main" | tee -a /etc/apt/sources.list.d/wazuh_trash.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

.. End of include file
