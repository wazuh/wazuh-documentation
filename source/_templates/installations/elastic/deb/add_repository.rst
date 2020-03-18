.. Copyright (C) 2020 Wazuh, Inc.

#. The ``curl`` and ``apt-transport-https`` packages must be installed on the system. The ``zip`` package will be necessary for the certificates management. If they are not already present, they must be installed using the commands below:

    .. code-block:: console

      # apt-get update
      # apt-get install curl apt-transport-https zip unzip

#. Install the GPG key:

    .. code-block:: console

      # curl -s https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -

#. Add the repository:

    .. code-block:: console

      # echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | tee /etc/apt/sources.list.d/elastic-7.x.list

#. Update the package information:

    .. code-block:: console

      # apt-get update

.. End of include file
