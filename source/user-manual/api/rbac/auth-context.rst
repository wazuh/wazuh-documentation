.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This guide outlines how to start using the authorization context login method.

Authorization Context
=====================

This guide outlines how to start using the authorization context login method.

Authorization context login method
----------------------------------

The authorization context login method (:api-ref:`POST /security/user/authenticate/run_as <operation/api.controllers.security_controller.run_as_login>`) dynamically obtains permissions. It enables any authorized user to acquire any desired permissions without assignment to a specific role, bypassing the usual user-role relationships. This requires a precise formalization of the authorization context.

To employ this method, you must first allow a user to use the authorization context (details on creating and enabling a user for authorization context is available in the :ref:`RESTful API RBAC configuration <api_rbac_user>` section). Once you have established the necessary security rules, you must send an authorization context containing all the required information. The system will verify this against the security rules and grant the associated permissions.

The image below outlines the decision process for granting permissions through authorization context, detailing the steps from a user's login attempt to the assignment of permissions based on enabled settings and rule validation.

.. thumbnail:: /images/manual/api/granting-permissions-process-outline.png
   :title: Granting permissions process outline
   :alt: Granting permissions process outline
   :align: center
   :width: 80%

The command below demonstrates how to authenticate a user using the authorization context feature. Replace ``<WAZUH_API_USER>`` and ``<WAZUH_API_PASSWORD>`` with your credentials:

.. code-block:: none

   # curl -k -u <WAZUH_API_USER>:<WAZUH_API_PASSWORD> -X POST https://localhost:55000/security/user/authenticate/run_as -H 'content-type: application/json' -d '{
           "name": "Initial_auth",
           "auth": {
                   "name": "Bill",
                   "office": ["20", "21", "30"]
           }
   }'

.. code-block:: none
   :class: output

   {
           "data": {
                   "token": "<YOUR_JWT_TOKEN>"
           }
   }

API log for authorization context login method
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As explained in the last section, authorization context grants additional permissions to any authorized user. The API logs tag these extra permissions with a unique identifier following the username, linking to the used authorization context.

Here are API log examples for authorization context login and basic login methods:

Authorization context login method:

.. code-block:: none
   :class: output

   2022/02/10 11:23:14 INFO: wazuh (66a28efb5f8db2e93da2b5fb107bec35) 127.0.0.1 "POST /security/user/authenticate/run_as" with parameters {"raw": "true"} and body {"name": "Initial_auth", "auth": {"name": "Bill", "office": ["20", "21", "30"]}} done in 0.363s: 200
   2022/02/10 11:23:18 INFO: wazuh (66a28efb5f8db2e93da2b5fb107bec35) 127.0.0.1 "GET /" with parameters {} and body {} done in 0.051s: 200

:ref:`Basic login <api_log_in>` method:

.. code-block:: none
   :class: output

   2022/02/02 08:59:19 INFO: wazuh 127.0.0.1 "POST /security/user/authenticate" with parameters {"raw": "true"} and body {} done in 0.253s: 200
   2022/02/02 08:59:23 INFO: wazuh 127.0.0.1 "GET /" with parameters {} and body {} done in 0.039s: 200

If JSON log format is enabled, logs for the authorization context login method will appear as follows:

.. code-block:: none
   :class: output

   {
     "timestamp": "2022/02/10 11:23:14",
     "levelname": "INFO",
     "data": {
       "type": "request",
       "payload": {
         "user": "wazuh",
         "hash_auth_context": "66a28efb5f8db2e93da2b5fb107bec35",
         "ip": "127.0.0.1",
         "http_method": "POST",
         "uri": "POST /security/user/authenticate/run_as",
         "parameters": {
           "raw": "true"
         },
         "body": {
           "name": "Initial_auth",
           "auth": {
             "name": "Bill",
             "office": [
               "20",
               "21",
               "30"
             ]
           }
         },
         "time": "0.352s",
         "status_code": 200
       }
     }
   }
   {
     "timestamp": "2022/02/10 11:23:18",
     "levelname": "INFO",
     "data": {
       "type": "request",
       "payload": {
         "user": "wazuh",
         "hash_auth_context": "66a28efb5f8db2e93da2b5fb107bec35",
         "ip": "127.0.0.1",
         "http_method": "GET",
         "uri": "GET /",
         "parameters": {},
         "body": {},
         "time": "0.159",
         "status_code": 200
       }
     }
   }

.. _auth_context_rules_and_roles:

Rules and roles
---------------

A rule defines logical and search operations that apply to an incoming authorization context. Thus, when the Wazuh server API processes an authentication request via an authorization context, it checks all rules against it, granting the user any roles associated with the rules that yield an affirmative result.

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

-  **MATCH**: This operation will search in the authorization context the structure indicated inside ``MATCH``. An *exact* match is not necessary. I.e., in the following case, it will try to search for ``auth`` key and, within it, an ``office`` key whose value must contain the number 20:

   .. code-block:: json

      {
          "MATCH": {
              "auth": {
                  "office": "20"
              }
          }
      }

-  **MATCH$**: This operation is the same as ``MATCH`` with the difference that it is strict in terms of content. It will be evaluated as ``False`` even if the clause is contained in a larger set (list) in the authorization context. The previous example would not be evaluated as ``True`` since the content of the ``auth`` key is not an exact match. To get this rule evaluated as ``True``, it would be necessary to use the exact list of values:

   .. code-block:: json

      {
          "MATCH$": {
              "auth": {
                  "office": ["20", "21", "30"]
              }
          }
      }

-  **FIND**: This operation is a recursive ``MATCH`` at all levels of the authorization context. In the ``MATCH`` case, the structure is searched at the root of the authorization context. In the ``FIND`` case, the structure will be searched at all depth levels. In the following example it is unneeded to specify the key ``auth`` because the ``FIND`` operation will search the key ``office`` inside all the authorization contexts:

   .. code-block:: json

      {
          "FIND": {
              "office": "20"
          }
      }

-  **FIND$**: This operation is a recursive ``MATCH$`` at all depth levels of the authorization context. As with the ``MATCH$`` operation, the exact list of values in the office key must be included if we want it to be evaluated as True. The ``name`` is optional as it depends on how specific it needs to be:

   .. code-block:: json

      {
          "FIND$": {
              "name": "Wazuh",
              "office": ["20", "21", "30"]
          }
      }

Logical operations
^^^^^^^^^^^^^^^^^^

In defining rules for authorization contexts, logical operations play a crucial role. Here are the three core logical operations:

-  **AND**: Requires all contained clauses to be true for the overall expression to be true. For example:

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

-  **OR**: The result is true if at least one of the enclosed clauses is satisfied. For example:

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

-  **NOT**: This operation inverts the result of the enclosed clause, resulting in it being true only if the enclosed clause is false. For example:

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

Example 1
^^^^^^^^^

-  Consider the following rule that a user wants to match:

   .. code-block:: json

      {
          "id": "1",
          "name": "Second",
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

-  Using the authorization context below, the user intends to gain the necessary permissions:

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

   The ``OR`` operation in the rule contains two sub-operations: a ``FIND$`` operation looking for an ``office`` key matching any positive number and an ``AND`` operation requiring a ``MATCH`` on both ``authLevel`` as ``administrator`` and ``department`` as ``Technical``. The ``FIND$`` operation fails due to the absence of the ``office`` key in the context, but the ``AND`` operation succeeds as the authorization context directly matches the required ``authLevel`` and ``department``. Consequently, since one of the conditions within the ``OR`` operation succeeds, the rule matches, allowing the authorization process to proceed.

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

-  For this match, the user utilizes the following authorization context:

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

In this case, the outermost ``AND`` operation passes because the authorization context contains the key-value pair ``"office": "20"``. The ``FIND`` operation also meets the criteria with the help of the regular expression matching. The concluding ``OR`` operation contains a ``MATCH$`` that is satisfied with the ``office`` value of ``20`` and the ``name`` of ``Wazuh`` at the root of the context. Since this clause evaluates to true, and it is within an ``OR`` operation, the overall ``OR`` operation yields true. As a result, the user's authorization context satisfies the rule.