.. Copyright (C) 2020 Wazuh, Inc.

.. _installation_guide:

Installation guide
==================

.. meta::
  :description: Find useful technical documentation about how Wazuh works, suitable for developers and tech enthusiasts.

The Installation guide section includes the :ref:`All-in-One installation <all_in_one>`, which aims to introduce Wazuh by installing it along with Elastic Stack on a single server. The All-in-One installation lacks the high availability and scalability capabilities of a distributed environment.

This section, however, will explain how to build a production environment that provides high availability and scalability of the services.

The Introduction document will go through the basic concepts and architecture of the Wazuh production environment and the Further configuration section will provide the
additional information about tuning the Wazuh environment.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        introduction/index
        all_in_one
        elasticsearch-cluster/index
        wazuh-cluster/index
        kibana/index
        further-configuration
