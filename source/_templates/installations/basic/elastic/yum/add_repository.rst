.. Copyright (C) 2015, Wazuh, Inc.

#. Import the GPG key:

    .. code-block:: console

      # rpm --import https://artifacts.elastic.co/GPG-KEY-elasticsearch

#. Add the repository:

    .. code-block:: console

      # cat > /etc/yum.repos.d/elastic.repo << EOF
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
