.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about auditing who-data in Linux and Windows, and the manual configuration of the Local Audit Policies in Windows. 

.. _auditing-whodata:

Auditing who-data
=================

From version 3.4.0, Wazuh incorporates a new functionality which obtains the who-data information from monitored files.

This information contains the user who made the changes on the monitored files and also the program name or process used to carry them out.

.. topic:: Contents

    .. toctree::
        :maxdepth: 1

        who-linux
        who-windows
        who-windows-policies
