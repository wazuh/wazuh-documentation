.. Copyright (C) 2020 Wazuh, Inc.

.. code-block:: bash

    curl -X PUT "localhost:9200/_cluster/settings" -H 'Content-Type: application/json' -d'
    {
        "persistent": {
            "cluster.routing.allocation.enable": "primaries"
        }
    }
    '
    
.. End of include file
