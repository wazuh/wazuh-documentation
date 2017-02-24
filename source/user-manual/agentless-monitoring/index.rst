.. _manual_agentless:


Agentless monitoring
======================

.. warning::
	Draft document.

Agentless monitoring allows you to run integrity checking on systems without an agent installed such as: routers, firewalls, switches and even Linux/BSD systems.
It can be executed just like our normal file integrity checking, alerting of checksum changes or doing diffs and showing exactly what has changed.

Agentless monitoring is configured in :ref:`ossec.conf <reference_ossec_conf>`, in the section :ref:`Agentless <reference_ossec_agentless>`.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        how-it-works
        configuring-agentless
