.. Copyright (C) 2019 Wazuh, Inc.

.. _agentless-examples:

Configuration
=============

#. `Integrity check BSD`_
#. `Integrity check Linux`_
#. `Generic Diff`_
#. `Pix config`_

Agentless monitoring is configured in the :ref:`ossec.conf <reference_ossec_conf>` file in the section :ref:`agentless <reference_ossec_agentless>`.

Integrity check BSD
-------------------
This sample configuration will monitor the ``/bin`` and ``/var`` directories:

::

  <agentless>
    <type>ssh_integrity_check_bsd</type>
    <frequency>20000</frequency>
    <host>root@test.com</host>
    <state>periodic</state>
    <arguments>/bin /var/</arguments>
  </agentless>

Notice in the ``<arguments>`` tag that multiple directories may be included, separated by a space.

Integrity check Linux
---------------------

For Linux systems, set the ``type`` as ``ssh_integrity_check_linux`` as referenced below.  Here also, a space-separated list of directories may be referenced in the configuration section using the ``<arguments>`` tag.  Using this configuration, Wazuh will do an integrity check on the remote box.

The sample configuration will monitor the ``/bin``, ``/etc`` and ``/sbin`` directories

::

  <agentless>
    <type>ssh_integrity_check_linux</type>
    <frequency>36000</frequency>
    <host>root@test.com</host>
    <state>periodic</state>
    <arguments>/bin /etc /sbin</arguments>
  </agentless>

Generic Diff
------------

In this configuration the ``ls -la /etc`` and ``cat /etc/passwd`` commands will execute every 20000 seconds. An alert will be triggered if the output of the commands changes.

.. code-block:: xml

  <agentless>
    <type>ssh_generic_diff</type>
    <frequency>20000</frequency>
    <host>root@test.com</host>
    <state>periodic_diff</state>
    <arguments>ls -la /etc; cat /etc/passwd</arguments>
  </agentless>

Notice that multiple entries in the ``<arguments>`` tag can be included, separated by a **";"**.

Pix config
----------

In this configuration, an alert will be triggered when a Cisco PIX or router configuration changes.

.. code-block:: xml

  <agentless>
    <type>ssh_pixconfig_diff</type>
    <frequency>36000</frequency>
    <host>pix@pix.fw.local</host>
    <state>periodic_diff</state>
  </agentless>
