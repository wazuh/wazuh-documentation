.. Copyright (C) 2018 Wazuh, Inc.

.. _who-windows-policies:

Manual configuration of the Local Audit Policies in Windows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To manually configure the audit policies needed to run Syscheck's whodata mode, it is necessary
to activate the capture of successful events on the following options:

1) Object Access -> File System
2) Object Access -> Handle Manipulation

You can edit these policies from the Local ``Group Policy Editor``, which you can access
with the following command:

.. code-block:: console

    gpedit.msc

.. thumbnail:: ../../../images/whodata/audit_policies.PNG
    :title: Configuration of audit policies
    :align: center
    :width: 70%
