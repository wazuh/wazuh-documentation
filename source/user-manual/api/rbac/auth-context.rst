.. Copyright (C) 2015, Wazuh, Inc.

.. _authorization_context_method:

Authorization Context
=====================

This guide provides the basic information needed to start using the Authorization Context login method.

Authorization context login method
----------------------------------

This authentication method (:api-ref:`POST /security/user/authenticate/run_as <operation/api.controllers.security_controller.run_as_login>`) is used to obtain the permissions dynamically. It allows any authorized user to possibly obtain any desired permissions without it being assigned to any role. To do this, a proper formalization of the authorization context is needed. In this case, the user-roles relations are not taken into consideration.

In order to use this authentication method, a user allowed to use authorization context is needed (how to create and allow a user to use authorization context information :ref:`here <api_rbac_user>`). After that, and having created the necessary security rules, an authorization context with all the required information must be sent, it will be checked against the security rules and finally, the permissions associated with them will be granted:

.. code-block:: none

        # curl -k -u <user>:<password> -X POST https://localhost:55000/security/user/authenticate/run_as -H 'content-type: application/json' -d '{
                "name": "Initial_auth",
                "auth": {
                        "name": "Bill",
                        "office": ["20", "21", "30"]
                }
        }'

.. code-block:: json
        :class: output

        {
                "data": {
                        "token": "<YOUR_JWT_TOKEN>"
                }
        }

.. thumbnail:: ../../../images/rbac/auth-context-login.png
    :title: Authorization context login method
    :align: center
    :width: 80%

API log for authorization context login method
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

As explained in the last section, authorization context allows any authorized user to obtain extra permissions. To identify that a user has extra permissions due to an authorization context login, the API logs include an identifier after the string representing the username. This ID is unique and it corresponds to the authorization context used.

API logs when using the authorization context login method:

.. code-block:: none
        :class: output

        2022/02/10 11:23:14 INFO: wazuh (66a28efb5f8db2e93da2b5fb107bec35) 127.0.0.1 "POST /security/user/authenticate/run_as" with parameters {"raw": "true"} and body {"name": "Initial_auth", "auth": {"name": "Bill", "office": ["20", "21", "30"]}} done in 0.363s: 200
        2022/02/10 11:23:18 INFO: wazuh (66a28efb5f8db2e93da2b5fb107bec35) 127.0.0.1 "GET /" with parameters {} and body {} done in 0.051s: 200

API logs when using the :ref:`basic login method <api_log_in>`:

.. code-block:: none
        :class: output

        2022/02/02 08:59:19 INFO: wazuh 127.0.0.1 "POST /security/user/authenticate" with parameters {"raw": "true"} and body {} done in 0.253s: 200
        2022/02/02 08:59:23 INFO: wazuh 127.0.0.1 "GET /" with parameters {} and body {} done in 0.039s: 200

If the JSON log format is enabled, the following will be logged when using the authorization context login method:

.. code-block:: none
        :class: output

        {"timestamp": "2022/02/10 11:23:14", "levelname": "INFO", "data": {"type": "request", "payload": {"user": "wazuh", "hash_auth_context": "66a28efb5f8db2e93da2b5fb107bec35", "ip": "127.0.0.1", "http_method": "POST", "uri": "POST /security/user/authenticate/run_as", "parameters": {"raw": "true"}, "body": {"name": "Initial_auth", "auth": {"name": "Bill", "office": ["20", "21", "30"]}}, "time": "0.352s", "status_code": 200}}}
        {"timestamp": "2022/02/10 11:23:18", "levelname": "INFO", "data": {"type": "request", "payload": {"user": "wazuh", "hash_auth_context": "66a28efb5f8db2e93da2b5fb107bec35", "ip": "127.0.0.1", "http_method": "GET", "uri": "GET /", "parameters": {}, "body": {}, "time": "0.159", "status_code": 200}}}


Rules and roles
---------------

A role is a set of policies. Therefore, the user's final permissions are the set of all policies associated with all user roles. Roles, besides the relationship with policies, also have a relationship with rules. This last relationship will only apply to users who have the authentication enabled through the authorization contexts.

A rule is an element that will be checked against the authorization context provided by the user. Based on this check, the user is granted the appropriate permissions. Therefore, the internal structure of the relationships is like this:

.. thumbnail:: ../../../images/rbac/auth-context-rule.png
    :title: Rules and roles
    :align: center
    :width: 80%

Rule structure
--------------

A rule is a set of logical and search operations that will be applied to the incoming authorization context. This way, when the Wazuh API attends an authentication request through an authorization context, all the rules will be checked against the authorization context, and the user will be given the roles associated with the rules whose result is affirmative.

To explain each of the operations of the rules, let's use this authorization context as an example. It will be matched to each of the examples:

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

- **MATCH**: This operation will search in the authorization context the structure indicated inside MATCH. An **exact match** is not necessary. I.e, in the following case it will try to search for  ``auth`` key and, within it, an ``office`` key whose value must contain the number ``20``:

.. code-block:: json

        {
            "MATCH": {
                "auth": {
                    "office": "20"
                }
            }
        }

- **MATCH$**: This operation is the same as the previous one with the difference that it is strict in terms of content, that is, it will be evaluated as False even though the clause is contained in a larger set (list) in the authorization context. The previous example would not be evaluated as True since the content of the ``auth`` key is not an exact match. To get this rule evaluated as True, it would be necessary to use the exact list of values:

.. code-block:: json

        {
            "MATCH$": {
                "auth": {
                    "office": ["20", "21", "30"]
                }
            }
        }

- **FIND**: This operation is a recursive MATCH at all levels of the authorization context. In the MATCH case, the structure is searched at the root of the authorization context. In the FIND case, the structure will be searched at all depth levels. In the following example it is unneeded to specify the key ``auth`` because the FIND operation will search the key ``office`` inside all the authorization contexts:

.. code-block:: json

        {
            "FIND": {
                "office": "20"
            }
        }

- **FIND$**: This operation is a recursive MATCH$ at all depth levels of the authorization context. As with the MATCH$ operation, if we want it to be evaluated as True, the exact list of values in the ``office`` key must be included. The ``name`` is optional, it depends on how specific it needs to be:

.. code-block:: json

        {
            "FIND$": {
                "name": "Wazuh",
                "office": ["20", "21", "30"]
            }
        }

Logical operations
^^^^^^^^^^^^^^^^^^

Regarding logical operations, there are three different options:

- **AND**: All clauses encapsulated within this operation must be satisfied for it to be true. Example:

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

- **OR**: At least one of the clauses encapsulated within this operation must be satisfied for the result to be True. Example:

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

- **NOT**: For this operation to be True, the clause it encloses must be False. Example:

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

- This is the rule that the user wants to match:

.. code-block:: json
        :class: output

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

.. thumbnail:: ../../../images/rbac/rule-example-1.png
    :title: Example rule 1
    :align: center
    :width: 80%

- To achieve this, the user uses the following authorization context:

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

In this case, there is an OR that contains two operations. The first one is a FIND$, which will search through the authorization context for the ``office`` key whose value is any positive number. This operation will result in False since it is not present in the authorization context.

The second operation is an AND. It has only one operation inside so it could be omitted. In any case if the operation is evaluated as True, the AND operation will be True. The MATCH operation is fulfilled because in the root of the authorization context both keys and the values are contained in the authorization context.

As a result, the initial OR operation will be True since the AND operation returns True.

Example 2
^^^^^^^^^

- This is the rule that the user wants to match:

.. code-block:: json
        :class: output

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

.. thumbnail:: ../../../images/rbac/rule-example-2.png
    :title: Example rule 2
    :align: center
    :width: 80%

- To achieve this match, the user sends the following authorization context:

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


In this case, the first search operation (MATCH) within the most external AND is satisfied since in the authorization context the ``"office": "20"`` key-value appears. The second search operation (FIND) is also satisfied, the regular expressions help to do this.

Finally, there is an OR operation. Inside, the first of the search operations (MATCH$) is satisfied because the value of the ``office`` key is ``20`` and the name is ``Wazuh``, both in the root of our authorization context. Since it is inside an OR operation, as soon as one of the clauses is evaluated as true, the OR operation returns true.
