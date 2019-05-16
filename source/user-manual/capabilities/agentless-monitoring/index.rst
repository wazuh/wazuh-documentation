.. Copyright (C) 2019 Wazuh, Inc.

.. _manual_agentless:

Agentless monitoring
====================

Agentless monitoring allows you to monitor devices or systems with no agent via SSH, such as routers, firewalls, switches and linux/bsd systems. This allows users with software installation restrictions to meet security and compliance requirements.

Alerts will be triggered when the checksum on the output changes and will show either the checksum or the exact diff output of the change.

.. topic:: Contents

    .. toctree::
        :maxdepth: 2

        how-it-works
        agentless-configuration
        agentless-faq
