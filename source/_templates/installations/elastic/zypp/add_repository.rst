.. Copyright (C) 2022 Wazuh, Inc.

#. Install the certificates deployment dependencies:

    .. code-block:: console

      # zypper install zip unzip tar

#. Import the GPG key:

    .. code-block:: console

      # rpm --import https://packages.elastic.co/GPG-KEY-elasticsearch

#. Add the repository:

    .. code-block:: console

      # cat > /etc/zypp/repos.d/elastic.repo <<\EOF
      [elasticsearch-7.x]
      name=Elasticsearch repository for 7.x packages
      baseurl=https://artifacts.elastic.co/packages/7.x/yum
      gpgcheck=1
      gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
      enabled=1
      autorefresh=1
      type=rpm-md
      EOF

.. End of include file
