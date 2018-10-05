.. Copyright (C) 2018 Wazuh, Inc.

.. _docker-monitor-index:

Using Wazuh to Monitor Docker
=============================

.. versionadded:: 3.7.0

This section provides instructions for monitoring Docker servers and container events with Wazuh.

All Wazuh capabilities (log data collection, file integrity monitoring, agentless monitoring...) are available for Docker servers. Furthermore, with the module ``docker-listener`` now it is possible to catch container events as starting, pausing or stopping among others.

.. topic:: Contents

    .. toctree::
       :maxdepth: 2

       monitoring_docker_server
       monitoring_containers_activity
