.. Copyright (C) 2018 Wazuh, Inc.

.. _splunk_distributed:

Install Splunk in multi-instance mode
=====================================

This document will guide you through the multi-instance distributed architecture installation process, recommended for larger environments with huge amounts of data (in this case, Wazuh alerts) and users.

.. note::
  Many of the commands described below need to be executed with root user privileges.

.. warning::
  This documentation will install Splunk using the multi-instance deployment schema. If you want a simpler installation, check out the :ref:`single-instance <splunk_basic>` deployment schema.

Install Splunk Enterprise instances
-----------------------------------

We're going to perform the most basic installation for a multi-instance deployment. We'll use two instances of **Splunk Enterprise**, one of them being the *Search head* and the other one, a *Search peer*. You can have multiple Search peer instances, but in this case we're going to stick with the essentials.
