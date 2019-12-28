.. Copyright (C) 2019 Wazuh, Inc.

.. code-block:: console

  # curl -so /etc/kibana/kibana.yml https://raw.githubusercontent.com/wazuh/wazuh/elastic-secured-3.10/extensions/kibana/7.x/kibana.yml

Edit the file ``/etc/kibana/kibana.yml``:

.. code-block:: yaml

    server.host: <kibana_ip>
    elasticsearch.hosts: https://<elasticsearch_ip>:9200
    elasticsearch.password: <elasticsearch_password>

The values to be replaced:

- ``<elasticsearch_ip>``: the host IP. If you have more than one Elasticsearch node, you can separate the nodes with commas.
- ``<kibana_ip>``: Kibana will only listen on the loopback interface (localhost) by default, which means that it can be only accessed from the same machine. To access Kibana from the outside make it listen on its network IP by replacing ``kibana_ip`` with the Kibana host IP.
- ``<elasticsearch_password>``: The password generated in Elasticsearch installation and configuration.


**Alternative Method**

.. code-block:: console

  # sudo ip=\""$(ip route get 8.8.8.8 | awk -F"src " 'NR==1{split($2,a," ");print a[1]}')\""
  # sudo sed -i "s/^#server\.host: \"localhost\"/server\.host: $ip/" /etc/kibana/kibana.yml
  # sudo ip="$(ip route get 8.8.8.8 | awk -F"src " 'NR==1{split($2,a," ");print a[1]}'):9200"
  # sudo sed -i "s/^#elasticsearch\.hosts/elasticsearch.hosts/" /etc/kibana/kibana.yml
  # sudo pw="<elasticsearch_password>"
  # sudo sed -i "s/^#elasticsearch\.password: /elasticsearch.password: $pw/" /etc/kibana/kibana.yml

Replace ``<elasticsearch_password>`` with the password in the above block.




.. End of configure_kibana.rst
