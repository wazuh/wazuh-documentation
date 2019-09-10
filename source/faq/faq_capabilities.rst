.. Copyright (C) 2019 Wazuh, Inc.

.. _faq_capabilities:

Capabilities
============


Can the wazuh-agent process any kind of hardware related events?
----------------------------------------------------------------

Wazuh agents can collect system information related to hardware and store it into a SQLite database on the manager side, producing alerts. Syscollector module is in charge of this task, you may find further information related to syscollector/hardware scan here. We also have rules related to external devices like USB.