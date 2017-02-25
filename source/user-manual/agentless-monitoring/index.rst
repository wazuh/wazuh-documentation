.. _manual_agentless:


Agentless monitoring
======================

.. warning::
	Draft document.

Agentless monitoring allows you to monitorize devices or systems whihout having an agent installed, through ssh. Systems as:

- routers
- firewalls
- switches
- linux/bsd systems

Agentless monitoring lets users who have restrictions on software being installed on systems meet security and compliance needs.

It can alert onece checksum changes or doing diffs, and showing what exactly changed.

Agentless monitoring is configured in :ref:`ossec.conf <reference_ossec_conf>`, in the section :ref:`Agentless <reference_ossec_agentless>`.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        agentless-configuration
        agentless-examples
        agentless-faq


How it works
------------

ToDo
