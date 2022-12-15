.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the manual configuration of the Local Audit Policies and SACLs in Windows in this section of the Wazuh documentation.

.. _who-windows-policies:

Manual configuration of the Windows Audit Policies
==================================================

Local Audit Policies in Windows
-------------------------------

To manually configure the audit policies needed to run Syscheck's whodata mode, it is necessary
to activate the capture of successful events. You can do it from the Local Group Policy Editor using the following command:

.. code-block:: console

    gpedit.msc

Go to **Security Settings** -> **Advanced Audit Policy Configuration** and configure to ``Success`` the following policies:

1) **Object Access** -> **Audit File System**
2) **Object Access** -> **Audit Handle Manipulation**

.. thumbnail:: ../../../images/whodata/audit-policies.png
    :title: Audit policies configuration
    :align: center
    :width: 60%

If your system doesn't allow configuring subcategories through *Advanced Audit Policy Configuration*, you can configure to *Success* the entire category. These policies are part of the *Audit object access* category. Go to to **Security Settings** -> **Local Policies** -> **Audit Policy** and configure this category.

.. thumbnail:: ../../../images/whodata/audit-policies-old-method.png
    :title: Audit policies configuration (old method)
    :align: center
    :width: 60%

SACLs in Windows
^^^^^^^^^^^^^^^^

A system access control list (SACL) enables administrators to log attempts to access a secured object.
You can check and modify SACLs of each directory through **Properties**, selecting the **Security** tab, and clicking on **Advanced**:

.. thumbnail:: ../../../images/whodata/windows-security-setting.png
    :title: Windows advanced security settings
    :align: center
    :width: 60%

In the Auditing tab it's necessary to have a *Success* entry:

.. thumbnail:: ../../../images/whodata/sacl-configuration.png
    :title: Auditing entry success
    :align: center
    :width: 60%

You can create it by adding these advanced permissions:

.. thumbnail:: ../../../images/whodata/advanced-permissions.png
    :title: Advanced permissions
    :align: center
    :width: 60%
