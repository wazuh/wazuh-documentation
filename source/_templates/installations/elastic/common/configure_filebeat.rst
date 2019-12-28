.. Copyright (C) 2019 Wazuh, Inc.

.. code-block:: yaml

  output.elasticsearch.hosts: <elasticsearch_ip>:9200
  output.elasticsearch.password: <elasticsearch_password>

Replace ``elasticsearch_ip`` with the IP address or the hostname of the Elasticsearch server and ``elasticsearch_password`` with the previously generated password.

*Alternative Method

.. code-block:: console

  # sudo ip="$(ip route get 8.8.8.8 | awk -F"src " 'NR==1{split($2,a," ");print a[1]}'):9200"
  # sudo sed -i "s/YOUR_ELASTIC_SERVER_IP:9200/$ip/" /etc/filebeat/filebeat.yml
  


.. End of include file
