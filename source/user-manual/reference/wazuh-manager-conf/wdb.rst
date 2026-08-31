.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn about the wdb configuration section of wazuh-manager.conf, which configures automatic backups of the Wazuh global agent database.

.. _reference_wazuh_manager_conf_wdb:

wdb
===

.. topic:: XML section name

   .. code-block:: xml

      <wdb>
      </wdb>

The ``<wdb>`` section configures automatic backups of the Wazuh global agent database.

Options
-------

The ``<backup>`` sub-element configures automatic database backups. The database attribute specifies the database to back up. Currently, the only supported value is ``global``.

backup/enabled
^^^^^^^^^^^^^^^

Enables or disables automatic backups of the selected database.

+----------------------+-----------+
| **Default value**    | yes       |
+----------------------+-----------+
| **Allowed values**   | yes, no   |
+----------------------+-----------+

backup/interval
^^^^^^^^^^^^^^^^

Specifies how often the Wazuh manager creates a backup.

+----------------------+---------------------------------------------------------+
| **Default value**    | 1d (86400 seconds)                                      |
+----------------------+---------------------------------------------------------+
| **Allowed values**   | Positive time value with optional suffix - s, m, h, d   |
+----------------------+---------------------------------------------------------+

backup/max_files
^^^^^^^^^^^^^^^^^

Specifies the maximum number of backup files to retain. When this limit is reached, the oldest backup files are removed automatically.

+----------------------+--------------------+
| **Default value**    | 3                  |
+----------------------+--------------------+
| **Allowed values**   | Positive integer   |
+----------------------+--------------------+

Sample configuration
---------------------

.. code-block:: xml

   <wdb>
     <backup database="global">
       <enabled>yes</enabled>
       <interval>1d</interval>
       <max_files>3</max_files>
     </backup>
   </wdb>

Backup files are written to ``/var/wazuh-manager/backup/db/``.
