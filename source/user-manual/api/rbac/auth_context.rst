.. Copyright (C) 2020 Wazuh, Inc.

.. _authorization_context_method:

Authorization Context
=====================

This guide provides the basic information you need to start using the Authorization Context login method.

Authorization context login method
----------------------------------

With this method, we will tell the system what permissions we want to have. We will use this method of authentication when we want to get the permissions in a dynamic way. This allows any authorized user to get any permission. To do this we must properly formalize our authorization context. In this case the user-roles relations are not taken in consideration. In order to use this method of authentication, we must first have a user who is allowed to use authorization contexts (Link to the part of the document where this is explained). After that, having created our rules, we will only have to send an authorization context with all the information we want, this will be checked against the rules and finally the permissions associated with them will be granted:

.. code-block:: console
        :class: output

        curl -k -u <user>:<password> -X POST https://localhost:55000/security/user/authenticate/run_as -H 'content-type: application/json' -d '{
                "name": "Initial_auth",
                "auth": {
                        "name": "Bill",
                        "office": ["20", "21", "30"]
                }
        }'
        {"token": "TOKEN"}

.. thumbnail:: ../../../images/rbac/auth_context_login.png
    :align: center
    :width: 100%

Rules and roles
---------------

A role is a set of policies, therefore, the user's final permissions are the set of all policies associated with all user roles. Roles, besides the relationship with policies, also have a relationship with rules. This last relationship will only apply to users who have the authentication enabled through the authorization contexts.

A rule is an element that will be checked against the authorization context provided by the user, based on this check the user is granted with the appropriate permissions. Therefore, the internal structure of the relationships is like this:

.. thumbnail:: ../../../images/rbac/auth_context_rule.png
    :align: center
    :width: 100%

Rule structure
--------------

A rule is a set of logical and search operations that will be applied to the incoming authorization context. This way, when the API attends an authentication request through an authorization context, all the rules will be checked against the authorization context and the user will be given the roles associated to the rules whose result is affirmative.

To explain each of the operations of the rules, let's use this authorization context as an example. It will be matched to each of the examples:

.. code-block:: json
        :class: output

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

- **MATCH**: This operation will search for the structure indicated in the authorization context. It will look for the object inside the MATCH to be contained in the authorization context. It is not necessary to have an **exact match**, i.e. in the following case we try to search for the 'auth' key and within it an 'office' key and the value of this key must contain the value 20:

.. code-block:: json
        :class: output

        {
            "MATCH": {
                "auth": {
                    "office": "20"
                }
            }
        }

- **MATCH$**: This operation is the same as the previous one with the difference that it is strict in terms of content, that is, it will be evaluated as False even though the clause is contained in a larger set (list) in the authorization context. The previous example would not be evaluated as True since the content of the 'auth' key is not an exact match. To get this rule evaluated as True we would have to change the value 20 to the exact list of values:

.. code-block:: json
        :class: output

        {
            "MATCH$": {
                "auth": {
                    "office": ["20", "21", "30"]
                }
            }
        }

- **FIND**: This operation is a recursive MATCH at all levels of the authorization context. In the MATCH case, the structure is searched at the root of the authorization context. In the FIND case, the structure will be searched at all depth levels. In the following example we see how we do not need to specify the key 'auth' because the FIND operation will search the key 'office' for all the authorization context:

.. code-block:: json
        :class: output

        {
            "FIND": {
                "office": "20"
            }
        }

- **FIND$**: In this case we have a recursive MATCH$ at all depth levels of the authorization context. As with the MATCH$ operation, if we want it to evaluate as True we must include the exact list of values in the 'office' key, the name is optional, it depends on how specific we want to be:

.. code-block:: json
        :class: output

        {
            "FIND$": {
                "name": "Wazuh",
                "office": ["20", "21", "30"]
            }
        }

Logical operations
^^^^^^^^^^^^^^^^^^

As for the logical operations, we have at our disposal three:

- **AND**: All clauses encapsulated within this operation must be satisfied for it to be true. Example:

.. code-block:: json
        :class: output

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
        :class: output

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

- **NOT**: For this operation to result in True, the clause encapsulated within it must result in False. Example:

.. code-block:: json
        :class: output

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

- This is the rule that the user want to match:

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

.. thumbnail:: ../../../images/rbac/example1_rule.png
    :align: center
    :width: 100%

- To achieve this, the user uses the following authorization context:

.. code-block:: json
        :class: output

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

In this case, we have an OR that contains two operations, the first of which is a FIND$, which will search through the authorization context for the office key whose value is any positive number. This operation will result in False since it is not present in the authorization context.

The second operation is an AND, it has only one operation inside so it could be omitted, in any case if the operation is evaluated as True, our AND operation will be True. We see that the MATCH operation is fulfilled because in the root of our authorization context we have both keys and the values are contained in the values of the authorization context.

Then we have that the initial OR operation will result in True since the AND operation results in True.

Example 2
^^^^^^^^^

- This is the rule that the user want to match:

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

.. thumbnail:: ../../../images/rbac/example2_rule.png
    :align: center
    :width: 100%

- To achieve this match, the user send the following authorization context:

.. code-block:: json
        :class: output

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


In this case, the first search operation (MATCH) within our most external AND is satisfied since in the authorization context the office 20 appears. The second search operation (FIND) is also satisfied, the regular expressions help to do this.

Finally, there is an OR operation, within this operation we have that the first of the search operations (MATCH$) is satisfied because the office is the 20th and the name is Wazuh, both in the root of our authorization context. Since we are inside an OR operation, as soon as one of the clauses is evaluated as true, the OR operation returns true.
