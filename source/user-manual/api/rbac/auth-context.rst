.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This guide outlines how to start using the authorization context login method.

Authorization context
=====================

An authorization context is data a user sends at login, which the Wazuh manager API matches against security rules to assign roles.

Authorization context login method
----------------------------------

The authorization context login method (:api-ref:`POST /security/user/authenticate/run_as <operation/api.controllers.security_controller.run_as_login>`) lets a trusted user log in and receive a different, dynamically-assigned set of permissions. The new set replaces the fixed permissions tied to their own role. The user includes a custom piece of data called the authorization context in their login request (for example, a name and department). The Wazuh manager checks this data against a set of rules you've defined, and grants whatever role each matching rule points to. An empty authorization context ({}) matches no rule, so its token has no roles.

To use this method, you must first allow a user to use the authorization context. Details on creating and enabling a user for the authorization context are in the :ref:`RBAC configuration <api_rbac_configuration_create_a_new_user>` section. Once you have established the necessary security rules, you must send an authorization context containing all the required information. The system verifies the authorization context against the security rules and grants the associated permissions.

The following image outlines the decision process for granting permissions through authorization context. It covers the steps from a user's login attempt to the assignment of permissions based on enabled settings and rule validation.

.. thumbnail:: /images/manual/api/granting-permissions-process-outline.png
   :title: Granting permissions process outline
   :alt: Granting permissions process outline
   :align: center
   :width: 80%

API log for authorization context login method
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

An authorization-context login can grant a different set of permissions every time, depending on what data is sent. This way, the API log tags each one with a unique fingerprint of that data, shown in parentheses right after the username. With this fingerprint, you can trace exactly which authorization context produced a given request.

Below are example log entries for both methods, so you can see the difference:

#. The following command demonstrates how to authenticate a user using the authorization context feature:

   .. code-block:: bash

      curl -k -u <WAZUH_API_USER>:<WAZUH_API_PASSWORD> -X POST \
       "https://<WAZUH_MANAGER_IP_ADDRESS>:55000/security/user/authenticate/run_as?raw=true" \
       -H "content-type: application/json" \
       -d '{
       "name": "Initial_auth",
       "auth": {
       "name": "Bill",
       "office": ["20", "21", "30"]
       }
      }'

   Replace:

   -  ``<WAZUH_API_USER>`` with a Wazuh manager API user that has ``allow_run_as`` enabled, such as wazuh-internal-client. The ``wazuh`` user has ``allow_run_as`` disabled by default, so the Wazuh manager API rejects its request with HTTP ``403`` and error ``6004``.
   -  ``<WAZUH_API_PASSWORD>`` with the password of that user. The ``wazuh-internal-client`` password is the ``WAZUH_MANAGER_WUI_PASSWORD`` value in ``/etc/wazuh-manager/export/credentials.env`` on the Wazuh manager. This file holds the value set at installation.

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ3YXp1aCIsImF1ZCI6IldhenVoIEFQSSBSRVNUIiwibmJmIjoxNzkyNzY1MDIzLCJuYmZfbXMiOjE3OTI3NjUwMjMwMzEsImV4cCI6MTc5Mjc2NTkyMywic3ViIjoid2F6dWgtaW50ZXJuYWwtY2xpZW50IiwicnVuX2FzIjp0cnVlLCJyYmFjX3JvbGVzIjpbXSwicmJhY19tb2RlIjoid2hpdGUiLCJoYXNoX2F1dGhfY29udGV4dCI6IjY2YTI4ZWZiNWY4ZGIyZTkzZGEyYjVmYjEwN2JlYzM1In0.ATuIhrgIglW5iNYjdvAaZgqWBuKU7scPHrcgXE72PYSNduK02xgDfOjQcmgcW2TsfL24XIa9ct6TF0rSkfIlNxzSAcd468-K23hFdak6VRQnAj0ohylfIu9ZRave_nSt9pl_6xYKX9xQ2NYZf0fZUw-6JLGS_rWjompB-2gXVoX2DYWF

#. Check the API log for the corresponding log entries using the following command:

   .. code-block:: console

      # tail -n 2 /var/wazuh-manager/logs/api.log

   The command output looks similar to this:

   .. code-block:: none
      :class: output

      2026/09/29 20:19:02 INFO: wazuh-internal-client (66a28efb5f8db2e93da2b5fb107bec35) 192.168.71.11 "POST /security/user/authenticate/run_as" with parameters {"raw": "true"} and body "<authorization context not logged; see hash_auth_context>" done in 0.259s: 200
      2026/09/29 20:19:39 INFO: wazuh-internal-client (66a28efb5f8db2e93da2b5fb107bec35) 192.168.71.11 "GET /" with parameters {} and body {} done in 0.025s: 200

At the default info log level, the API log replaces the authorization context with a placeholder, and the hash in parentheses identifies it. The log records the full context only when ``logs.level`` is ``debug`` or ``debug2``.

Compare the preceding log output with the log output from the :ref:`basic login method <api_getting_started_authenticate_the_wazuh_manager_api_from_the_command_line>`:

The command output looks similar to this:

.. code-block:: none
   :class: output

   2026/09/29 21:06:31 INFO: wazuh 192.168.71.11 "GET /" with parameters {} and body {} done in 0.022s: 200

.. _api_rbac_auth_context_rules_and_roles:

Rules and roles
---------------

A rule defines logical and search operations that apply to an incoming authorization context. When the Wazuh manager API processes an authentication request through an authorization context, it checks all rules against it. It grants the user any roles associated with the rules that yield an affirmative result.

Let's use the following authorization context to illustrate each operation within the rules and how it matches up to the examples:

.. code-block:: json

   {
       "name": "Initial_auth",
       "auth": {
           "name": "Wazuh",
           "office": ["20", "21", "30"]
       }
   }

Search operations
^^^^^^^^^^^^^^^^^

The search operations in the rules are used to search in the authorization context for a specific object or string.

-  ``MATCH``\ **:** This operation searches the authorization context for the structure indicated inside MATCH. An **exact** match is not necessary. In the following case, it searches for an ``auth`` key and, within it, an ``office`` key whose value must contain the number ``20``:

.. code-block:: json

   {
       "MATCH": {
           "auth": {
               "office": "20"
           }
       }
   }

-  ``MATCH$``\ **:** This operation is the same as **MATCH** with the difference that it is strict in terms of content. It evaluates to **False** even if the clause is contained in a larger set (list) in the authorization context. The previous example does not evaluate to True, because the content of the ``auth`` key is not an exact match. For this rule to evaluate to True, use the exact list of values:

.. code-block:: json

   {
       "MATCH$": {
           "auth": {
               "office": ["20", "21", "30"]
           }
       }
   }

-  ``FIND``\ **:** This operation is a recursive MATCH, up to eight levels deep, of the authorization context. MATCH searches the structure only at the root of the authorization context. In the FIND case, the operation searches the structure up to eight levels deep. If the authorization context is nested more deeply, the role is not granted. In the following example, you can omit the key auth, because the FIND operation searches for the key ``office`` inside all the authorization contexts:

.. code-block:: json

   {
       "FIND": {
           "office": "20"
       }
   }

-  ``FIND$``\ **:** This operation is a recursive MATCH$, up to eight levels deep, of the authorization context. As with the **MATCH$** operation, the exact list of values in the office key must be included for it to evaluate to True. The ``name`` is optional as it depends on how specific it needs to be:

.. code-block:: json

   {
       "FIND$": {
           "name": "Wazuh",
           "office": ["20", "21", "30"]
       }
   }

Logical operations
^^^^^^^^^^^^^^^^^^

In defining rules for authorization contexts, logical operations play a crucial role. Rules combine clauses with the AND, OR, and NOT logical operations.

-  ``AND``\ **:** Requires all contained clauses to be true for the overall expression to be true. For example:

.. code-block:: json

   {
       "AND": [
           {
               "MATCH$": {
                   "name": "r'.+'"
               }
           },
           {
               "FIND": {
                   "auth": {
                       "office": "20"
                   }
               }
           }
       ]
   }

-  ``OR``\ **:** The result is true if at least one of the enclosed clauses is satisfied. For example:

.. code-block:: json

   {
       "OR": [
           {
               "MATCH$": {
                   "name": "NameNotFound"
               }
           },
           {
               "FIND$": {
                   "auth": {
                       "name": "Wazuh",
                       "office": ["20", "21", "30"]
                   }
               }
           }
       ]
   }

-  ``NOT``\ **:** This operation inverts the result of the enclosed clause, resulting in it being true only if the enclosed clause is false. For example:

.. code-block:: json

   {
       "NOT": {
           "OR": [
               {
                   "MATCH$": {
                       "name": "NameNotFound"
                   }
               },
               {
                   "FIND$": {
                       "auth": {
                           "name": "Wazuh",
                           "office": ["20", "30"]
                       }
                   }
               }
           ]
       }
   }

Advanced examples
-----------------

The following Rule blocks show the rule content. To create one of these rules, send the content of its rules list to the :api-ref:`POST /security/rules <operation/api.controllers.security_controller.add_rule>` endpoint as ``{"name": "<RULE_NAME>", "rule": { ... }}``.

Example 1
^^^^^^^^^

-  Consider the following rule that a user wants to match:

.. code-block:: json

   {
       "id": "1",
       "name": "First",
       "rules": [{
         "OR": [
           {
             "FIND$": {
               "office": "r'^[0-9]+$'"
             }
           },
           {
             "AND": [
               {
                 "MATCH": {
                   "authLevel": "administrator",
                   "department": "Technical"
                 }
               }
             ]
           }
         ]
       }]
     }

.. thumbnail:: /images/manual/api/example-1.png
   :title: Example 1
   :alt: Example 1
   :align: center
   :width: 80%

-  With the following authorization context, the user intends to gain the necessary permissions:

.. code-block:: json

   {
       "name": "Eleventh_auth",
       "auth": {
           "test": "New",
           "department": [
               "Technical1"
           ],
           "authLevel": [
               "basic1"
           ]
       },
       "authLevel": [
           "administrator"
       ],
       "department": [
           "Technical"
       ]
   }

The **OR** operation in the rule contains two sub-operations. The first is a **FIND$** operation looking for an ``office`` key matching any positive number. The second is an **AND** operation requiring a **MATCH** on both ``authLevel`` as ``administrator`` and ``department`` as ``Technical``. The **FIND$** operation fails because the context has no office key. The AND operation succeeds, because the authorization context directly matches the required ``authLevel`` and ``department``. Consequently, since one of the conditions within the **OR** operation succeeds, the rule matches, allowing the authorization process to proceed.

Example 2
^^^^^^^^^

-  Consider the following rule that a user wants to match:

.. code-block:: json

   {
       "id": "2",
       "name": "Second",
       "rules": [
           {
               "AND": [
                   {
                       "MATCH": {
                           "office": "r'^[0-9]+$'"
                       }
                   },
                   {
                       "FIND": {
                           "r'^auth[a-zA-Z]+$'": [
                               "r'^admin[a-z0-9]+$'"
                           ],
                           "area": [
                               "agents"
                           ]
                       }
                   },
                   {
                       "OR": [
                           {
                               "MATCH$": {
                                   "name": "Wazuh",
                                   "office": "20"
                               }
                           },
                           {
                               "OR": [
                                   {
                                       "FIND": {
                                           "department": [
                                               "Commercial"
                                           ]
                                       }
                                   },
                                   {
                                       "MATCH": {
                                           "authLevel": [
                                               "administrator"
                                           ],
                                           "department": [
                                               "Technical"
                                           ]
                                       }
                                   }
                               ]
                           }
                       ]
                   }
               ]
           }
       ]
   }

.. thumbnail:: /images/manual/api/example-2.png
   :title: Example 2
   :alt: Example 2
   :align: center
   :width: 80%

-  For this match, the user uses the following authorization context:

.. code-block:: json

   {
       "name": "First_example",
       "auth": {
           "disabled": false,
           "name": "Wazuh",
           "office": "20",
           "department": [
               "Technical"
           ],
           "bindings": {
               "authLevel": [
                   "basic",
                   "advanced-agents",
                   "administrator"
               ],
               "area": [
                   "agents",
                   "syscheck",
                   "syscollector"
               ]
           },
           "test": {
               "new": {
                   "test2": [
                       "new"
                   ],
                   "test3": {
                       "test4": [
                           "a",
                           "b",
                           "c",
                           "d4"
                       ]
                   }
               },
               "test": "new2"
           }
       }
   }

This context does not satisfy the rule. MATCH searches only at the root of the authorization context, and this context holds office under auth. The first MATCH clause of the outermost AND operation therefore fails. The **FIND** operation meets the criteria with the help of the regular expression matching. The concluding **OR** operation fails too. Its MATCH$ clause looks for the name Wazuh and the office 20 at the root of the context, where the name is First_example and there is no office key, and neither clause of the nested OR operation matches. An AND operation is true only when all its clauses are true, so the rule does not match. The login gets no role from this rule.
