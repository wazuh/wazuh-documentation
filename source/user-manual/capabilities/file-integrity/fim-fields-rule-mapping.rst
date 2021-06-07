.. Copyright (C) 2021 Wazuh, Inc.

Fim fields rule mapping
=======================

The following guide offers you a broad look into how to FIM fields can be mapped into rules.


FIM - Alerts : fields correspondence
------------------------------------

The following table stablish a correspondence between the syscheck fields and their homologues in the alert generation.

+----------------------+-----------------------------+-----------------------------------------------------------------+
|  **Syscheck field**  |  **Alert field**            | **Field description**                                           |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  file                |  path                       |  File's path in the current alert                               |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  size                |  size_after                 |  File's size in the current alert                               |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  hard_links          |                             |                                                                 |
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
|  mtime               |  mtime_after                |  Timestamp of the file edition                                  |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  inode               |  inode_after                |  Inode of the file in the current alert                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  sha256              |  sha256_after               |  sha256 hash of the file in the current alert (after changes)   |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  changed_content     |  diff                       |  Reported changes on the specific file                          |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  changed_fields      |  changed_attributes         |  Changed fields in the file (permissions, content, etc...)      |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  win_attributes      |  attrs_after                |  File attributtes (hidden, read-only, etc...)                   |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  tag                 |  tag                        |  Custom tags to be added to one specific alert                  |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  symbolic_path       |                             |                                                                 |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  user_id             |  audit.user.id              |  User ID of the process                                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  user_name           |  audit.user.name            |  User name of the process                                       |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  group_id            |  audit.group.id             |  Group ID of the process                                        |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  group_name          |  audit.group.name           |  Group name of the process                                      |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  process_name        |  audit.process.name         |  Name of the process                                            |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  ppid                |  audit.process.ppid         |  Parent ID of the process                                       |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  process_id          |  audit.process.id           |  ID of the process                                              |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  effective_uid       |  audit.effective.user_id    |  Effective user ID of the process                               |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  effective_name      |  audit.effective_user.name  |  Effective user name of the process                             |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  parent_name         |  audit.process.parent_name  |  Parent process name                                            |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  cwd                 |  audit.process.cwd          |  Current work directory                                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  parent_cwd          |  audit.process.parent_cwd   |  Parent process's current work directory                        |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  audit_uid           |  audit.login_user.id        |  User login ID used by Audit                                    |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  audit_name          |  audit.login_user.name      |  User name used by Audit                                        |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  arch                |  arch                       |  Registry architecture (32 or 64)                               |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  value_name          |  value_name                 |  Registry's values name                                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  value_type          |  value_type                 |  Registry's values type                                         |
+----------------------+-----------------------------+-----------------------------------------------------------------+
|  entry_type          |  entry_type                 |  Registry's entry type                                          |
+----------------------+-----------------------------+-----------------------------------------------------------------+


Rule mapping examples
---------------------

The following example rules aim to show how to apply syscheck fields to correctly extract information from alert fields

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

    <rule id="100012" level="12">
      <if_sid>554</if_sid>
      <field name="parent_cwd">/specialdir</field>
      <field name="process_name">/usr/bin/touch</field>
      <field name="group_id">0</field>
      <field name="effective_uid">0</field>
      <field name="audit_name">vagrant</field>
      <field name="audit_uid">1000</field>
      <match>added</match>
      <description> Silence added event created with touch command in parent's current directory /specialdir with group ID 0,
      effective user ID 0, audit ID 1000 and audit user name vagrant</description>
    </rule>
