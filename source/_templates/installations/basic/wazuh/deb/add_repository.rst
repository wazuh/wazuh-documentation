.. Copyright (C) 2015, Wazuh, Inc.

#. For this, the ``curl``, ``apt-transport-https`` and ``lsb-release`` packages must be installed on the system. The ``zip`` package will be necessary for the certificates management. If they are not already present, they must be installed using the commands below:

    .. code-block:: console

      # apt-get update
      # apt-get install curl apt-transport-https lsb-release unzip

#. Install the GPG key:

    .. code-block:: console

      # curl -s https://packages.wazuh.com/key/GPG-KEY-WAZUH -o /etc/apt/trusted.gpg.d/wazuh.asc && chmod 644 /etc/apt/trusted.gpg.d/wazuh.asc

#. Add the repository:

    .. code-block:: console

      # echo "deb https://packages.wazuh.com/4.x/apt/ stable main" | tee -a /etc/apt/sources.list.d/wazuh.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

.. End of include file
