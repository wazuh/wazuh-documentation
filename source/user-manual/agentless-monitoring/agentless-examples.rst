.. _agentless-examples:

Examples
======================

#. `Integrity check BSD`_
#. `Integrity check Linux`_
#. `Generic Diff`_
#. `Pix config`_


Integrity check BSD
-------------------
This will monitorize ``/bin`` and ``/var`` directories

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

For linux systems, it's possible to set a list of directories in the configuration and Wazuh will do the integrity check inside the remote box. This option is for linux based systems. You need to configure the ``type`` option to ``ssh_integrity_check_linux``

::

  <agentless>
    <type>ssh_integrity_check_linux</type>
    <frequency>36000</frequency>
    <host>root@test.com</host>
    <state>periodic</state>
    <arguments>/bin /etc/ /sbin</arguments>
  </agentless>

This will monitorize ``/bin`` and ``/etc /sbin`` directories


Generic Diff
---------------------

This will configure the host, to execute ``ls -la /etc`` and ``cat /etc/passwd`` every 20000 seconds, and will alert you if the output of those commands change at some point.

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

This option will alert when a Cisco PIX or router configuration changes.

.. code-block:: xml

  <agentless>
    <type>ssh_pixconfig_diff</type>
    <frequency>36000</frequency>
    <host>pix@pix.fw.local</host>
    <state>periodic_diff</state>
  </agentless>
