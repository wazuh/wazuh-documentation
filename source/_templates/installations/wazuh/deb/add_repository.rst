.. Copyright (C) 2019 Wazuh, Inc.

#. For this, the ``curl``, ``apt-transport-https``, ``lsb-release`` and ``gnupg2`` packages must be installed on your system. The package ``zip`` will be necessary for the certificates management. If they are not already present, install them using the commands below:

    .. code-block:: console

      # apt-get update
      # apt-get install curl apt-transport-https lsb-release gnupg2 unzip

#. Install the GPG key:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | apt-key add -

#. Add the repository:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/3.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

.. End of include file
