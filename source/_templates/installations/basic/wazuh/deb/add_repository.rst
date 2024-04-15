.. Copyright (C) 2015, Wazuh, Inc.

#. For this, the ``curl``, ``apt-transport-https`` and ``lsb-release`` packages must be installed on the system. The ``zip`` package will be necessary for the certificates management. If they are not already present, they must be installed using the commands below:

    .. code-block:: console

      # apt-get update
      # apt-get install curl apt-transport-https lsb-release unzip

#. Install the GPG key:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH | gpg --no-default-keyring --keyring gnupg-ring:/usr/share/keyrings/wazuh.gpg --import && chmod 644 /usr/share/keyrings/wazuh.gpg

#. Add the repository:

    .. code-block:: console

      # echo "deb [signed-by=/usr/share/keyrings/wazuh.gpg] https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

.. End of include file
