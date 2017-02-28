.. _agentless-examples:

Examples
======================

#. `Integrity check BSD`_
#. `Integrity check Linux`_
#. `Generic Diff`_
#. `Pix config`_


Integrity check BSD
-------------------
In this example, the configuration is set to monitor the ``/bin`` and ``/var`` directories

::

  <agentless>
    <type>ssh_integrity_check_bsd</type>
    <frequency>20000</frequency>
    <host>root@test.com</host>
    <state>periodic</state>
    <arguments>/bin /var/</arguments>
  </agentless>



Integrity check Linux
---------------------

For Linux systems, set the ``type`` as ``ssh_integrity_check_linux`` as referenced below.  A space-separated list of directories may be referenced in the configuration section using the arguments tag.  Using this configuration, Wazuh will do an integrity check on the remote box.

The below example is configured to monitor the ``/bin`` and ``/etc /sbin`` directories

::

  <agentless>
    <type>ssh_integrity_check_linux</type>
    <frequency>36000</frequency>
    <host>root@test.com</host>
    <state>periodic</state>
    <arguments>/bin /etc/ /sbin</arguments>
  </agentless>



Generic Diff
---------------------

In this example, the configuration is set to execute ``ls -la /etc`` and ``cat /etc/passwd`` commands every 20000 seconds. An alert will be triggered if the output of those commands change.

.. code-block:: xml

  <agentless>
    <type>ssh_generic_diff</type>
    <frequency>20000</frequency>
    <host>root@test.com</host>
    <state>periodic_diff</state>
    <arguments>ls -la /etc; cat /etc/passwd</arguments>
  </agentless>

Pix config
---------------------

In this example, the configuration is set to trigger an alert when a Cisco PIX or router configuration changes.

.. code-block:: xml

  <agentless>
    <type>ssh_pixconfig_diff</type>
    <frequency>36000</frequency>
    <host>pix@pix.fw.local</host>
    <state>periodic_diff</state>
  </agentless>
