.. Copyright (C) 2019 Wazuh, Inc.

.. meta:: :description: Learn how to install Wazuh

.. _installation_guide_aio:

All in one installation guide
=============================

.. meta::
  :description: Read this guide to know how to install Wazuh and the Elasticsearch integration.

Community
---------

.. include:: ../../_templates/installations/introduction/community.rst

Supported platforms
-------------------

.. include:: ../../_templates/installations/introduction/supported_platforms.rst

Wazuh cloud (SAAS)
------------------

.. include:: ../../_templates/installations/introduction/wazuh_saas.rst

Basic concepts
--------------

.. include:: ../../_templates/installations/introduction/basics.rst

Installation types
------------------

The Wazuh server and Elastic stack can be installed and operated in either of these five deployments:

- **Single-host**: the Wazuh server and Elastic Stack subsystems run on a single host.

.. thumbnail:: ../../images/installation/installing_wazuh_architecture_onehost.png
    :title: Installing Wazuh manager - single server architecture
    :align: center
    :width: 100%

+ **Wazuh host and Elastic Stack host**: the Wazuh and Elastic Stack subsystems run on separate host systems.

.. thumbnail:: ../../images/installation/installing_wazuh_architecture_twohosts.png
    :title: Installing Wazuh manager and Elastic stack each in a single host
    :align: center
    :width: 100%

- **Wazuh cluster and Elastic Stack host**: Wazuh can be configured to work in two or more servers (cluster mode) and Elastic Stack in a single host.

.. thumbnail:: ../../images/installation/installing_wazuh_architecture_wazuhcluster.png
    :title: Installing Wazuh manager as cluster with Elastic Stack in a single host
    :align: center
    :width: 100%

+ **Wazuh host and Elastic Stack cluster**: Wazuh run in a single host and Elastic Stack can be configured in three or more servers (cluster mode).

.. thumbnail:: ../../images/installation/installing_wazuh_architecture_elkcluster.png
    :title: Installing Wazuh manager in a single host  with Elastic Stack as cluster
    :align: center
    :width: 100%

- **Wazuh cluster and Elastic Stack cluster**: Wazuh can be configured to work in two or more servers (cluster mode) and Elastic Stack as well.

.. thumbnail:: ../../images/installation/installing_wazuh_architecture_bothcluster.png
    :title: Installing Wazuh manager as cluster with Elastic Stack as cluster
    :align: center
    :width: 100%

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        elastic_stack_packages
        wazuh_server_packages
        other-installation-options/index

