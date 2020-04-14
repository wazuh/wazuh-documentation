.. Copyright (C) 2020 Wazuh, Inc.

.. tabs::

    .. group-tab:: APT

        #. Download and add the signing keys for the repositories:

            .. code-block:: console

                # wget -qO - https://d3g5vo6xdbdb9a.cloudfront.net/GPG-KEY-opendistroforelasticsearch | apt-key add -

        #. Add the repositories:

            .. code-block:: console

                # echo "deb https://d3g5vo6xdbdb9a.cloudfront.net/apt stable main" | tee -a   /etc/apt/sources.list.d/opendistroforelasticsearch.list

        #. Install Elasticsearch OSS:

            .. code-block:: console

                # wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-oss-7.6.1-amd64.deb
                # dpkg -i elasticsearch-oss-7.6.1-amd64.deb

        #. Install the latest version of Open Distro for Elasticsearch:

            .. code-block:: console

                # apt-get update
                # apt install opendistroforelasticsearch



    .. group-tab:: Yum

        #. Create the repository file:

            .. code-block:: console

                # curl https://d3g5vo6xdbdb9a.cloudfront.net/yum/opendistroforelasticsearch-artifacts.repo -o /etc/yum.repos.d/opendistroforelasticsearch-artifacts.repo  

        #. Install the latest version of Open Distro for Elasticsearch: 

            .. code-block:: console

                # yum install opendistroforelasticsearch-1.6.0

.. End of include file
