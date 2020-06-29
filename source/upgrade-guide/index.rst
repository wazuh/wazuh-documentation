.. Copyright (C) 2020 Wazuh, Inc.

.. _upgrade_guide:

Upgrade guide
=============

This document aims to describe the upgrade process of the Wazuh server, including the Wazuh manager and the Wazuh API, the Wazuh agent and Elastic Stack.

The Elastic Stack section walks the user through the upgrade process of Elasticsearch, Filebeat and Kibana for both Elastic and Open Distro for Elasticsearch distributions.

The :ref:`Upgrading from a legacy version <upgrading_wazuh_legacy>` section is for those who need to upgrade the Wazuh installation from a version prior to 2.0.

In case of having any doubt about operating system compatibility, please check the `compatibility matrix <https://github.com/wazuh/wazuh-kibana-app#older-packages>`_.


    .. toctree::
        :maxdepth: 1

        upgrading-wazuh/index
        upgrading-elastic-stack/index
        upgrading-agent/index
        legacy/index
