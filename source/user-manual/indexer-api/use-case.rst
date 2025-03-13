.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This shows you suitable use cases to use the Wazuh indexer API.

Use cases
=========

This section provides several use cases to demonstrate some of the potentials of the Wazuh indexer API.

Exploring alerts
----------------

Wazuh stores triggered alerts in the ``wazuh-alerts*`` index in the Wazuh indexer; we can use the Wazuh indexer API to query the alerts. In this use case, we identify the most risky users. This is done using the ``_search`` endpoint to search through all alerts in the index and aggregate the ``srcuser`` field to identify the top three (3) users associated with triggered alerts.

Follow the steps below.

#. Navigate to **Index management** > **Dev Tools**.
#. Input the following query and execute:

   .. code-block:: none

      POST /wazuh-alerts*/_search
      {
        "size": 0,
        "aggs": {
          "top_risky_users": {
            "terms": {
              "field": "data.dstuser",
              "size": 3,
              "order": { "_count": "desc" }
            }
          }
        }
      }

As seen in the response, three different users and their number of occurrences are identified. This depicts the users with the most alerts. This information is useful to security analysts and threat hunters as they prioritize defense and discovery efforts.

.. code-block:: none
   :class: output

   {
     "took": 19,
     "timed_out": false,
     "_shards": {
       "total": 9,
       "successful": 9,
       "skipped": 0,
       "failed": 0
     },
     "hits": {
       "total": {
         "value": 2352,
         "relation": "eq"
       },
       "max_score": null,
       "hits": []
     },
     "aggregations": {
       "top_risky_users": {
         "doc_count_error_upper_bound": 0,
         "sum_other_doc_count": 10,
         "buckets": [
           {
             "key": "root(uid=0)",
             "doc_count": 21
           },
           {
             "key": "cain",
             "doc_count": 18
           },
           {
             "key": "abel",
             "doc_count": 5
           }
         ]
       }
     }
   }

Getting information about the Wazuh indexer configuration
---------------------------------------------------------

You can retrieve details about the Wazuh indexer through the Wazuh indexer API, such as configuration settings, status, logs, and more. The following example demonstrates how to retrieve the current security configuration (authentication) settings of the Wazuh indexer.

#. Navigate to **Index management** > **Dev Tools**.
#. Input the following query and execute:

   .. code-block:: none

      GET _plugins/_security/api/securityconfig

The following output shows us the current authentication settings in the Wazuh indexer.

.. code-block:: none
   :class: output

   {
     "config": {
       "dynamic": {
         "filtered_alias_mode": "warn",
         "disable_rest_auth": false,
         "disable_intertransport_auth": false,
         "respect_request_indices_options": false,
         "kibana": {
           "multitenancy_enabled": true,
           "private_tenant_enabled": true,
           "default_tenant": "",
           "server_username": "kibanaserver",
           "index": ".kibana"
         },
         "http": {
           "anonymous_auth_enabled": false,
           "xff": {
             "enabled": false,
             "internalProxies": """192\.168\.0\.10|192\.168\.0\.11""",
             "remoteIpHeader": "X-Forwarded-For"
           }
         },
         "authc": {
           "jwt_auth_domain": {
             "http_enabled": true,
             "order": 0,
             "http_authenticator": {
               "challenge": false,
               "type": "jwt",
               "config": {
                 "signing_key": "base64 encoded HMAC key or public RSA/ECDSA pem key",
                 "jwt_header": "Authorization",
                 "jwt_clock_skew_tolerance_seconds": 30,
                 "roles_key": "roles",
                 "subject_key": "sub"
               }
             },
             "authentication_backend": {
               "type": "noop",
               "config": {}
             },
             "description": "Authenticate via Json Web Token"
           },
           "ldap": {
             "http_enabled": false,
             "order": 5,
             "http_authenticator": {
               "challenge": false,
               "type": "basic",
               "config": {}
             },
             "authentication_backend": {
               "type": "ldap",
               "config": {
                 "enable_ssl": false,
                 "enable_start_tls": false,
                 "enable_ssl_client_auth": false,
                 "verify_hostnames": true,
                 "hosts": [
                   "localhost:8389"
                 ],
                 "userbase": "ou=people,dc=example,dc=com",
                 "usersearch": "(sAMAccountName={0})"
               }
             },
             "description": "Authenticate via LDAP or Active Directory"
           },
           "basic_internal_auth_domain": {
             "http_enabled": true,
             "order": 4,
             "http_authenticator": {
               "challenge": true,
               "type": "basic",
               "config": {}
             },
             "authentication_backend": {
               "type": "intern",
               "config": {}
             },
             "description": "Authenticate via HTTP Basic against internal users database"
           },
           "proxy_auth_domain": {
             "http_enabled": false,
             "order": 3,
             "http_authenticator": {
               "challenge": false,
               "type": "proxy",
               "config": {
                 "user_header": "x-proxy-user",
                 "roles_header": "x-proxy-roles"
               }
             },
             "authentication_backend": {
               "type": "noop",
               "config": {}
             },
             "description": "Authenticate via proxy"
           },
           "clientcert_auth_domain": {
             "http_enabled": false,
             "order": 2,
             "http_authenticator": {
               "challenge": false,
               "type": "clientcert",
               "config": {
                 "username_attribute": "cn"
               }
             },
             "authentication_backend": {
               "type": "noop",
               "config": {}
             },
             "description": "Authenticate via SSL client certificates"
           },
           "kerberos_auth_domain": {
             "http_enabled": false,
             "order": 6,
             "http_authenticator": {
               "challenge": true,
               "type": "kerberos",
               "config": {
                 "krb_debug": false,
                 "strip_realm_from_principal": true
               }
             },
             "authentication_backend": {
               "type": "noop",
               "config": {}
             }
           }
         },
         "authz": {
           "roles_from_another_ldap": {
             "http_enabled": false,
             "authorization_backend": {
               "type": "ldap",
               "config": {}
             },
             "description": "Authorize via another Active Directory"
           },
           "roles_from_myldap": {
             "http_enabled": false,
             "authorization_backend": {
               "type": "ldap",
               "config": {
                 "enable_ssl": false,
                 "enable_start_tls": false,
                 "enable_ssl_client_auth": false,
                 "verify_hostnames": true,
                 "hosts": [
                   "localhost:8389"
                 ],
                 "rolebase": "ou=groups,dc=example,dc=com",
                 "rolesearch": "(member={0})",
                 "userrolename": "disabled",
                 "rolename": "cn",
                 "resolve_nested_roles": true,
                 "userbase": "ou=people,dc=example,dc=com",
                 "usersearch": "(uid={0})"
               }
             },
             "description": "Authorize via LDAP or Active Directory"
           }
         },
         "auth_failure_listeners": {},
         "do_not_fail_on_forbidden": false,
         "multi_rolespan_enabled": true,
         "hosts_resolver_mode": "ip-only",
         "do_not_fail_on_forbidden_empty": false,
         "on_behalf_of": {
           "enabled": false
         }
       }
     }
   }

Run a report on cluster health and statistics
---------------------------------------------

Keeping track of the Wazuh indexer health and associated node statistics is important to identify and resolve performance issues promptly. This use case demonstrates how we can programmatically interact with the Wazuh indexer API to generate reports. 

#. Export your Wazuh indexer authentication credentials as environment variables:

   .. code-block:: console

      # export WAZUH_INDEXER_USER= "<WAZUH_INDEXER_USERNAME>"
      # export WAZUH_INDEXER_PASS = "<WAZUH_INDEXER_PASSWORD>"

   Replace ``<WAZUH_INDEXER_USERNAME>`` and ``<WAZUH_INDEXER_PASSWORD>`` with your Wazuh indexer username and password.

#. Create a file ``indexer_check_report.sh`` and input the following script to the file:

   .. code-block:: bash

      #!/bin/bash

      # Configuration
      BASE_URL="https://localhost:9200"  # Change IP/hostname if you are not running script locally
      DATE=$(date +%Y-%m-%d)
      OUTPUT_FILE="wazuh_indexer_report_${DATE}.html"
      USER="${WAZUH_INDEXER_USER}"
      PASS="${WAZUH_INDEXER_PASS}"

      api_request() {
        local endpoint=$1
        curl -s -k -u $USER:$PASS -H "Content-Type: application/json" "$BASE_URL$endpoint"
      }

      # Fetch cluster health
      fetch_cluster_health() {
        api_request "/_cluster/health"
      }

      # Fetch index statistics
      fetch_index_stats() {
        api_request "/_cat/indices?format=json"
      }

      # Fetch node statistics
      fetch_node_stats() {
        api_request "/_nodes/stats"
      }

      # Format JSON to indented HTML
      format_json_html() {
        local json=$1
        echo "$json" | jq '.' | sed 's/&/&amp;/g; s/</\&lt;/g; s/>/\&gt;/g' | awk '{print "<div>" $0 "</div>"}'
      }

      # Generate HTML report
      generate_html_report() {
        local cluster_health=$1
        local index_stats=$2
        local node_stats=$3

        cat <<EOF > \$OUTPUT_FILE

      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Wazuh Indexer Report</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
          .json-block { font-family: monospace; background-color: #f9f9f9; padding: 10px; border: 1px solid #ddd; overflow-x: auto; }
          .json-block div { white-space: pre; }
        </style>

      </head>
      <body>
        <h1>Wazuh Indexer Report</h1>
        <h2>Cluster Health</h2>
        <div class="json-block">
          \$(format_json_html "\$cluster_health")
        </div>
        <h2>Index Statistics</h2>
        <table>
          <tr>
            <th>Index</th>
            <th>Status</th>
            <th>Docs Count</th>
            <th>Store Size</th>
          </tr>
      EOF

        # Parse and append index stats
        echo "\$index_stats" | jq -r '.[] | "<tr><td>\(.index)</td><td>\(.status)</td><td>\(.docs_count)</td><td>\(.store.size)</td></tr>"' >> \$OUTPUT_FILE

        cat <<EOF >> \$OUTPUT_FILE
        </table>
        <h2>Node Statistics</h2>
        <div class="json-block">
          \$(format_json_html "\$node_stats")
        </div>
      </body>
      </html>
      EOF
      }

      # Main execution
      echo "Fetching cluster health..."
      cluster_health=\$(fetch_cluster_health)
      echo "Fetching index statistics..."
      index_stats=\$(fetch_index_stats)
      echo "Fetching node statistics..."
      node_stats=\$(fetch_node_stats)

      echo "Generating HTML report..."
      generate_html_report "\$cluster_health" "\$index_stats" "\$node_stats"
      echo "Report generated at \$OUTPUT_FILE"

#. Execute the ``indexer_check_report.sh`` script:

   .. code-block:: console

      # ./indexer_check_report.sh

Upon successful execution of the script, a report is created where we can see the cluster health and state of the indexes. The below image shows an example of the report. 