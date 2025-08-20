.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: The Wazuh clear_stats tool clears event stats. Learn more about this feature.

clear_stats
===========

The clear_stats program clears the events stats.

+--------+------------------------------+
| **-h** | Display the help message.    |
+--------+------------------------------+
| **-a** | Clear all the average stats. |
+--------+------------------------------+
| **-d** | Clear the daily averages.    |
+--------+------------------------------+
| **-w** | Clear the weekly averages.   |
+--------+------------------------------+

Example
-------

Clear daily averages:

.. code-block:: console

   # /var/ossec/bin/clear_stats -d

.. code-block:: none
   :class: output

   ** Internal stats clear.
