.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

Installation guide
==================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

This section aims to guide the user through the process of installing Wazuh. There are two available types of installation depending on the version of Elasticsearch used, Elasticsearch with Basic License or Open Distro for Elasticsearch. There are two methods for deploying the Wazuh installation, *All-in-one* and *Distributed*. Down below the different types of installation will be described.

Elasticsearch is formed by two different components. The first one is ``Elasticsearch-oss``. It has the basic functionalities of Elasticsearch and is fully open-source licensed under `Apache 2.0`. It includes functionalities such as searching and analyzing, data visualization and dashboarding, etc. The other component which adds more functionalities to ``Elasticsearch-oss`` is the one that will vary depending on the installation type:

  - **X-Pack**: This component is under Elasticsearch license. Some of its functionalities are free to use but some others are paid. Elasticsearch-oss and X-Pack together form Elasticsearch with basic license.

  - **Open Distro for Elasticsearch**: Is born from the necessity of having a completely open-source alternative to X-Pack functionalities. This project is created by Amazon and is under `Apache 2.0` license. With the Open Distro for Elasticsearch installation, the open-source packages of Kibana and Filebeat will be also installed.

Depending on the necessities, the user can choose between `Elasticsearch with basic license`, which has some features that are not open-source and paid or `Open Distro for Elasticsearch`, which is an open-source alternative.

.. toctree::
    :maxdepth: 1

    basic/index
    open-distro/index