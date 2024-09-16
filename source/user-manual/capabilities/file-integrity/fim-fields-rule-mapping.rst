.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Wazuh File integrity monitoring triggers alerts when monitored files change. Learn how to map FIM fields into rules in this section of our documentation.   

FIM fields rule mapping
=======================

This guide aims to help you understand how FIM fields can be mapped into rules.


FIM - Alerts: fields correspondence
------------------------------------

The following table establishes a correspondence between the decoded FIM fields and their counterpart in rules.

+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  **FIM field**       |  **Alert field**            | **Field description**                                                   |
+======================+=============================+=========================================================================+
|  file                |  path                       |  File path in the current event                                         |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  size                |  size_after                 |  File size in the current event                                         |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  hard_links          |  hard_links                 |  List of hard links of the file                                         |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  mode                |  mode                       |  FIM event mode                                                         |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  perm                |  perm_after,win_perm_after  |  File permissions                                                       |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  uid                 |  uid_after                  |  User ID of the owner of the file                                       |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  gid                 |  gid_after                  |  Group ID of the group that shares ownership of the file                |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  uname               |  uname_after                |  User name of the owner of the file                                     |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  gname               |  gname_after                |  Group name of the group that shares ownership of the file              |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  md5                 |  md5_after                  |  MD5 hash of the file in the current event (after changes)              |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  sha1                |  sha1_after                 |  SHA1 hash of the file in the current event (after changes)             |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  sha256              |  sha256_after               |  SHA256 hash of the file in the current event (after changes)           |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  mtime               |  mtime_after                |  Timestamp of the file changes                                          |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  inode               |  inode_after                |  Inode of the file in the current event                                 |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  changed_content     |  diff                       |  Reported changes on the file of the current event                      |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  changed_fields      |  changed_attributes         |  Changed fields in the file (permissions, content, etc...)              |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  win_attributes      |  attrs_after                |  File attributes (hidden, read-only, etc...)                            |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  tag                 |  tag                        |  Custom tags to be added to one specific event                          |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  user_id             |  audit.user.id              |  The actual ID of the user that triggered the event                     |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  user_name           |  audit.user.name            |  The actual name of the user that triggered the event                   |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  group_id            |  audit.group.id             |  The actual group ID of the user that triggered the event               |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  group_name          |  audit.group.name           |  The actual group name of the user that triggered the event             |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  process_name        |  audit.process.name         |  The name of the process run by a user that triggered the event         |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  process_id          |  audit.process.id           |  The ID of the process run by a user that triggered the event           |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  ppid                |  audit.process.ppid         |  The parent ID of the process that triggered the event                  |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  effective_uid       |  audit.effective.user_id    |  Effective user ID used by the process triggering the event             |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  effective_name      |  audit.effective_user.name  |  Effective user name used by the process triggering the event           |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  parent_name         |  audit.process.parent_name  |  The process name of the parent of the process triggering the event     |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  cwd                 |  audit.process.cwd          |  Current work directory of the process triggering the event             |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  parent_cwd          |  audit.process.parent_cwd   |  Current work directory of the parent process                           |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  audit_uid           |  audit.login_user.id        |  The ID of the user logged in to the system that triggered the event    |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  audit_name          |  audit.login_user.name      |  The name of the user logged in to the system that triggered the event  |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  arch                |  arch                       |  Registry architecture (32 or 64 bits)                                  |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  value_name          |  value_name                 |  Registry value name                                                    |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  value_type          |  value_type                 |  Registry value type                                                    |
+----------------------+-----------------------------+-------------------------------------------------------------------------+
|  entry_type          |  entry_type                 |  Registry entry type                                                    |
+----------------------+-----------------------------+-------------------------------------------------------------------------+


Rule mapping examples
---------------------

The following example rules aim to show how to apply FIM fields to correctly extract information from the FIM
events. Every rule is shown alongside the FIM event that fires it and the subsequent alert if the rule does not silence it.

The first rule silence alerts from the change of permissions from mask 600 to  mask 644.

.. code-block:: xml

  <rule id="100002" level="0">
    <if_sid>550</if_sid>
    <field name="file">.log$</field>
    <field name="changed_fields">^permission$</field>
    <field name="perm">rw-r--r--</field>
    <match>rw-------</match>
    <description>Silence perm changes</description>
  </rule>

.. code-block:: console

  {
    "type": "event",
    "data": {
      "path": "/specialdir/file.log",
      "mode": "whodata",
      "type": "modified",
      "timestamp": 1623745234,
      "attributes": {
        "type": "file",
        "size": 0,
        "perm": "rw-------",
        "uid": "0",
        "gid": "0",
        "user_name": "root",
        "group_name": "root",
        "inode": 4352002,
        "mtime": 1623665041,
        "hash_md5": "d41d8cd98f00b204e9800998ecf8427e",
        "hash_sha1": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        "hash_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "checksum": "25e338d1eca897691bacd33246c38650bdcd5630"
      },
      "changed_attributes": [
        "permission"
      ],
      "old_attributes": {
        "type": "file",
        "size": 0,
        "perm": "rw-r--r--",
        "uid": "0",
        "gid": "0",
        "user_name": "root",
        "group_name": "root",
        "inode": 4352002,
        "mtime": 1623665041,
        "hash_md5": "d41d8cd98f00b204e9800998ecf8427e",
        "hash_sha1": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        "hash_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "checksum": "a1e1975f6f2799cb9f7e25af0b8f0bd1c4e183e4"
      },
      "audit": {
        "user_id": "0",
        "user_name": "root",
        "process_name": "/usr/bin/chmod",
        "process_id": 8866,
        "cwd": "/specialdir",
        "group_id": "0",
        "group_name": "root",
        "audit_uid": "1000",
        "audit_name": "vagrant",
        "effective_uid": "0",
        "effective_name": "root",
        "parent_name": "/usr/bin/bash",
        "parent_cwd": "/specialdir",
        "ppid": 3275
      }
    }
  }


This second rule fires when a .txt file under a monitored directory is modified and contains the word keyword in it.

.. code-block:: xml

  <rule id="100010" level="12">
    <if_sid>550</if_sid>
    <field name="file">.txt$</field>
    <field name="changed_content">keyword</field>
    <match>modified</match>
    <description>Fire alert when .txt file is modified and contains word "keyword"</description>
  </rule>


.. code-block:: console

  {
      "type": "event",
      "data": {
        "path": "/test/file.txt",
        "mode": "realtime",
        "type": "modified",
        "timestamp": 1623660202,
        "attributes": {
          "type": "file",
          "size": 26,
          "perm": "rw-r--r--",
          "uid": "0",
          "gid": "0",
          "user_name": "root",
          "group_name": "root",
          "inode": 4096002,
          "mtime": 1623660202,
          "hash_md5": "126b42ce036035a50516f067aae33418",
          "hash_sha1": "5b0c286906ea60075d47b22ceab830681e906365",
          "hash_sha256": "d3c558c76a0c62e0917516a3aaf02d0512beb4ef6c1af19ca3c79e913cefcdfe",
          "checksum": "6c895291c3c9c20acee3f822c429a0901a77f7b4"
        },
        "changed_attributes": [
          "size",
          "mtime",
          "md5",
          "sha1",
          "sha256"
        ],
        "old_attributes": {
          "type": "file",
          "size": 0,
          "perm": "rw-r--r--",
          "uid": "0",
          "gid": "0",
          "user_name": "root",
          "group_name": "root",
          "inode": 4096002,
          "mtime": 1623660184,
          "hash_md5": "d41d8cd98f00b204e9800998ecf8427e",
          "hash_sha1": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
          "hash_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          "checksum": "eed9691633569779f515786b6eccbdbfd3dc1e1a"
        },
        "content_changes": "0a1\n> 12313213215681568 keyword\n"
      }
  }

.. code-block:: console

  {
      "timestamp": "2021-06-14T08:43:22.999+0000",
      "rule": {
        "level": 12,
        "description": "Fire alert when .txt file is modified and contains word \"keyword\"",
        "id": "100010",
        "firedtimes": 1,
        "mail": true,
        "groups": [
          "local",
          "syslog",
          "sshd"
        ]
      },
      "agent": {
        "id": "004",
        "name": "ubuntu201",
        "ip": "10.0.2.15"
      },
      "manager": {
        "name": "ubuntu20"
      },
      "id": "1623660202.17987",
      "full_log": "File '/test/file.txt' modified\nMode: realtime\nChanged attributes: size,mtime,md5,sha1,sha256\nSize changed from '0' to '26'\nOld modification time was: '1623660184', now it is '1623660202'\nOld md5sum was: 'd41d8cd98f00b204e9800998ecf8427e'\nNew md5sum is : '126b42ce036035a50516f067aae33418'\nOld sha1sum was: 'da39a3ee5e6b4b0d3255bfef95601890afd80709'\nNew sha1sum is : '5b0c286906ea60075d47b22ceab830681e906365'\nOld sha256sum was: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'\nNew sha256sum is : 'd3c558c76a0c62e0917516a3aaf02d0512beb4ef6c1af19ca3c79e913cefcdfe'\n",
      "syscheck": {
        "path": "/test/file.txt",
        "mode": "realtime",
        "size_before": "0",
        "size_after": "26",
        "perm_after": "rw-r--r--",
        "uid_after": "0",
        "gid_after": "0",
        "md5_before": "d41d8cd98f00b204e9800998ecf8427e",
        "md5_after": "126b42ce036035a50516f067aae33418",
        "sha1_before": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
        "sha1_after": "5b0c286906ea60075d47b22ceab830681e906365",
        "sha256_before": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "sha256_after": "d3c558c76a0c62e0917516a3aaf02d0512beb4ef6c1af19ca3c79e913cefcdfe",
        "uname_after": "root",
        "gname_after": "root",
        "mtime_before": "2021-06-14T08:43:04",
        "mtime_after": "2021-06-14T08:43:22",
        "inode_after": 4096002,
        "diff": "0a1\n> 12313213215681568 keyword\n",
        "changed_attributes": [
          "size",
          "mtime",
          "md5",
          "sha1",
          "sha256"
        ],
        "event": "modified"
      },
      "decoder": {
        "name": "syscheck_integrity_changed"
      },
      "location": "syscheck"
  }

In the next example, the rule silence the deletion of files by the windows explorer.exe process with admin privileges.

.. code-block:: xml

  <rule id="100011" level="0">
    <if_sid>553</if_sid>
    <field name="process_name">explorer.exe$</field>
    <field name="uname">Administradores$</field>
    <match>deleted</match>
    <description>Silence delete events triggered by windows explorer with admin privileges</description>
  </rule>


.. code-block:: console

  {
      "type": "event",
      "data": {
        "path": "c:\\test\\adasdasd.txt",
        "version": 2,
        "mode": "whodata",
        "type": "deleted",
        "timestamp": 1623666683,
        "attributes": {
          "type": "file",
          "size": 40,
          "perm": "Administradores (allowed): delete|read_control|write_dac|write_owner|synchronize|read_data|write_data|append_data|read_ea|write_ea|execute|read_attributes|write_attributes, SYSTEM (allowed): delete|read_control|write_dac|write_owner|synchronize|read_data|write_data|append_data|read_ea|write_ea|execute|read_attributes|write_attributes, Usuarios (allowed): read_control|synchronize|read_data|read_ea|execute|read_attributes, Usuarios autentificados (allowed): delete|read_control|synchronize|read_data|write_data|append_data|read_ea|write_ea|execute|read_attributes|write_attributes",
          "uid": "S-1-5-32-544",
          "user_name": "Administradores",
          "inode": 0,
          "mtime": 1623408349,
          "hash_md5": "786e0bf0ffc3c466b19d4e68d7c6f155",
          "hash_sha1": "99028323b4d6b4b2db9c7fc73d3887163598865c",
          "hash_sha256": "c0fc9e1e16ea610b3627af0b91eb623ac74dfde6943e40361de9a3447fed81b4",
          "attributes": "ARCHIVE",
          "checksum": "9384acf30012c15bd72f5ca435b4b0d41ec55ae2"
        },
        "audit": {
          "user_id": "S-1-5-21-3527455827-79240758-596275861-1001",
          "user_name": "jmv74211",
          "process_name": "C:\\Windows\\explorer.exe",
          "process_id": 2484
        }
      }
  }


The last rule aims to silence any alert coming from a file created with the touch command and the following restrictions: the
father directory of the file is /specialdir, the group id and effective uid of the user adding the file are 0, the audit_uid
of the user is 1000 and his audit name is vagrant.

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


.. code-block:: console

  {
      "type": "event",
      "data": {
          "path": "/specialdir/file.txt",
          "mode": "whodata",
          "type": "added",
          "timestamp": 1623665041,
          "attributes": {
            "type": "file",
            "size": 0,
            "perm": "rw-r--r--",
            "uid": "0",
            "gid": "0",
            "user_name": "root",
            "group_name": "root",
            "inode": 4352002,
            "mtime": 1623665041,
            "hash_md5": "d41d8cd98f00b204e9800998ecf8427e",
            "hash_sha1": "da39a3ee5e6b4b0d3255bfef95601890afd80709",
            "hash_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            "checksum": "a1e1975f6f2799cb9f7e25af0b8f0bd1c4e183e4"
          },
          "audit": {
            "user_id": "0",
            "user_name": "root",
            "process_name": "/usr/bin/touch",
            "process_id": 53794,
            "cwd": "/specialdir",
            "group_id": "0",
            "group_name": "root",
            "audit_uid": "1000",
            "audit_name": "vagrant",
            "effective_uid": "0",
            "effective_name": "root",
            "parent_name": "/usr/bin/bash",
            "parent_cwd": "/specialdir",
            "ppid": 44025
          }
      }
  }
