.. Copyright (C) 2021 Wazuh, Inc.

Fim fields rule mapping
=======================

This guide aims to help to understand how FIM fields can be mapped into rules.


FIM - Alerts : fields correspondence
------------------------------------

The following table establishes a correspondence between the syscheck fields and their homologs in the alert generation.

+----------------------+-----------------------------+-----------------------------------------------------------------+
|  **Syscheck field**  |  **Alert field**            | **Field description**                                           |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  file                |  path                       |  File path in the current alert                                 |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  size                |  size_after                 |  File size in the current alert                                 |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  hard_links          |  hard_links                 |  List of hard links of the file                                 |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  mode                |  mode                       |  Syscheck scan mode                                             |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  perm                |  perm_after,win_perm_after  |  File permissions                                               |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  uid                 |  uid_after                  |  User ID of the process                                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  gid                 |  gid_after                  |  Group ID of the process                                        |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  md5                 |  md5_after                  |  md5 hash of the file in the current alert (after changes)      |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  sha1                |  sha1_after                 |  sha1 hash of the file in the current alert (after changes)     |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  uname               |  uname_after                |  User name of the process                                       |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  gname               |  gname_after                |  Group name of the process                                      |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  mtime               |  mtime_after                |  Timestamp of the file changes                                  |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  inode               |  inode_after                |  Inode of the file in the current alert                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  sha256              |  sha256_after               |  sha256 hash of the file in the current alert (after changes)   |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  changed_content     |  diff                       |  Reported changes on the file of the current alert              |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  changed_fields      |  changed_attributes         |  Changed fields in the file (permissions, content, etc...)      |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  win_attributes      |  attrs_after                |  File attributtes (hidden, read-only, etc...)                   |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  tag                 |  tag                        |  Custom tags to be added to one specific alert                  |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  symbolic_path       |                             |                                                                 |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  user_id             |  audit.user.id              |  (Audit) user ID of the process                                 |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  user_name           |  audit.user.name            |  (Audit) user name of the process                               |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  group_id            |  audit.group.id             |  (Audit) group ID of the process                                |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  group_name          |  audit.group.name           |  (Audit) group name of the process                              |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  process_name        |  audit.process.name         |  (Audit) name of the process                                    |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  ppid                |  audit.process.ppid         |  (Audit) parent ID of the process                               |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  process_id          |  audit.process.id           |  (Audit) ID of the process                                      |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  effective_uid       |  audit.effective.user_id    |  (Audit) effective user ID of the process                       |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  effective_name      |  audit.effective_user.name  |  (Audit) effective user name of the process                     |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  parent_name         |  audit.process.parent_name  |  (Audit) parent process name                                    |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  cwd                 |  audit.process.cwd          |  (Audit) current work directory                                 |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  parent_cwd          |  audit.process.parent_cwd   |  (Audit) parent process's current work directory                |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  audit_uid           |  audit.login_user.id        |  (Audit) User login ID used by Audit                            |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  audit_name          |  audit.login_user.name      |  (Audit) User name used by Audit                                |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  arch                |  arch                       |  Registry architecture (32 or 64)                               |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  value_name          |  value_name                 |  Registry value name                                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  value_type          |  value_type                 |  Registry value type                                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  entry_type          |  entry_type                 |  Registry entry type                                          |
+----------------------+-----------------------------+-----------------------------------------------------------------+


Rule mapping examples
---------------------

The following example rules aim to show how to apply syscheck fields to correctly extract information from alerts.

  .. code-block:: xml

    <rule id="100001" level="0">
      <if_sid>550</if_sid>
      <field name="file">.log$</field>
      <field name="changed_fields">^permission$</field>
      <field name="perm">rw-r--r--r--</field>
      <match>rw-------</match>
      <description>Silence perm changes</description>
    </rule>


  .. code-block:: xml

    <rule id="100010" level="12">
      <if_sid>550</if_sid>
      <field name="file">.txt$</field>
      <field name="changed_content">keyword</field>
      <match>modified</match>
      <description>Fire alert when .txt file is modified and contains keyword word</description>
    </rule>


  .. code-block:: xml

    <rule id="100011" level="0">
      <if_sid>553</if_sid>
      <field name="process_name">explorer.exe$</field>
      <field name="uname">Administradores$</field>
      <match>deleted</match>
      <description>Silence delete events triggered by windows explorer with admin privileges</description>
    </rule>


  .. code-block:: xml

    <rule id="100012" level="0">
      <if_sid>554</if_sid>
      <field name="parent_cwd">/specialdir</field>
      <field name="process_name">/usr/bin/touch</field>
      <field name="group_id">0</field>
      <field name="effective_uid">0</field>
      <field name="audit_name">vagrant</field>
      <field name="audit_uid">1000</field>
      <match>added</match>
      <description>Silence added event created with touch command in parent's current directory /specialdir with group ID 0,
      effective user ID 0, audit ID 1000 and audit user name vagrant</description>
    </rule>
