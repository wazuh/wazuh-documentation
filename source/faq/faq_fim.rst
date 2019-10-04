.. Copyright (C) 2019 Wazuh, Inc.

.. _faq_fim:

FIM(File integrity monitoring)
==============================

Is it possible to run FIM only through the Whodata or Real-time mode and completely disable the scheduled scans? 
-----------------------------------------------------------------------------------------------------------------------

It's possible to set a high ``<frequency>`` value leading to a low Scheduled scan rate. When using ``Real-time/Whodata`` and with many events taking place in a short space of time, there is event loss chance. In this case the scheduled scan would report the lost changes since it conserves the last state of each file.
It hasn't been considered to fully disabling the scheduled scan: it allows to recover lost events in Real-time and Whodata modes. As the internal representation for ``<frequency>`` value is a 32 bit integer and the ``<frequency>`` value is required to be positive, you can set the maximum positive value for a 32-bit signed integer: ``<frequency>2147483647</frequency>``
