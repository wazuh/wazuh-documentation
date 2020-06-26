.. Copyright (C) 2020 Wazuh, Inc.

Step-by-step installation
=========================

The following sections provide information about how to install each involved component. During the Open Distro for Elasticsearch cluster installation, the certificates necessary to securitize the installation will be created, so it is recommended to start by installing Open Distro for Elasticsearch.

Every component described below can be installed in different machines, except Open Distro for Kibana, that can be installed either in a separate machine or along with Open Distro for Elasticsearch.

.. toctree::
    :maxdepth: 2

    elasticsearch-cluster/index
    wazuh-cluster/index
    kibana/index