.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

Installation guide
==================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

This section aims to guide the user through the process of installing Wazuh. There are two available types of installation depending on the version of Elasticsearch used, Elasticsearch with Basic License or Open Distro for Elasticsearch. There are two methods for deploying the Wazuh installation, *All-in-one* and *Distributed*. In the following sections the different types of installation will be described.

Installation with Elasticsearch Basic license
---------------------------------------------

This installation process will use Elasticsearch with Basic license, which consists of two different components: 

    - Elasticsearch-OSS: This component is fully open-source and is under `Apache 2.0` license. It includes functionalities such as searching and analyzing, data visualization and dashboarding, etc.

    - X-Pack features: The code of X-Pack is under Elastic license and includes some functionalities such as security, alerting, monitoring, reporting, graph analytics, dedicated APM UIs, and machine learning.


Installation with Open Distro for Elasticsearch
-----------------------------------------------

Open Distro for Elasticsearch is a fully open-source and `Apache-2.0-licensed` distribution of both Elasticsearch and Kibana.


.. toctree::
    :maxdepth: 1

    basic/index
    open-distro/index