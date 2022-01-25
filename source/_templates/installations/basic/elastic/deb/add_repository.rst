.. Copyright (C) 2022 Wazuh, Inc.

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
