.. Copyright (C) 2019 Wazuh, Inc.

.. _who-windows-policies:

Manual configuration of the Local Audit Policies in Windows
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

To manually configure the audit policies needed to run Syscheck's whodata mode, it is necessary
to activate the capture of successful events. You can do it from the Local Group Policy Editor using the following command:

.. code-block:: console

    gpedit.msc

- `Advanced Audit Policy Configuration section method`_
- `Audit Policy section method`_

Advanced Audit Policy Configuration section method
--------------------------------------------------

Recommended option to configure policies. You have to activate the following options:

1) Object Access -> File System
2) Object Access -> Handle Manipulation

.. thumbnail:: ../../../images/whodata/audit_policies.PNG
    :title: Audit policies configuration
    :align: center
    :width: 60%

Audit Policy section method
---------------------------

This option is only recommended if the previous method cannot be followed because
your host is Windows Vista or Windows Server 2008. To do this, edit the following policy:

Security Settings -> Local Policies -> Audit Policy -> Audit object access

.. thumbnail:: ../../../images/whodata/audit_policies_old_method.PNG
    :title: Audit policies configuration (old method)
    :align: center
    :width: 60%
