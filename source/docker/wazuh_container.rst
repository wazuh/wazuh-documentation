.. _wazuh_container:

Wazuh containers
===============================

Requirements
-------------

Increase max_map_count on your host (Linux)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

You need to increase ``max_map_count`` on your Docker host::

  $ sudo sysctl -w vm.max_map_count=262144

To set this value permanently, update the vm.max_map_count setting in /etc/sysctl.conf. To verify after rebooting, run sysctl vm.max_map_count.

SELinux
^^^^^^^^^^

On distributions which have SELinux enabled out-of-the-box you will need to either re-context the files or set SELinux into Permissive mode in order for docker-elk to start properly.
For example on Red Hat and CentOS, the following will apply the proper context::


  .-root@centos ~
  -$ chcon -R system_u:object_r:admin_home_t:s0 docker-elk/

Usage
-------------------------------

Clone *wazuh-docker* repository::

    git clone https://github.com/wazuh/wazuh-docker
    cd wazuh-docker


Start the ELK stack using *docker-compose*:

    a) Foreground::

        $ docker-compose up


    b) Background::

        $ docker-compose up -d

And then access Kibana UI by hitting `http://localhost:5601 <http://localhost:5601>`_ with a web browser.

By default, the stack exposes the following ports:

    - 1514: Wazuh UDP.
    - 1515: Wazuh TCP.
    - 514 : Wazuh UDP.
    - 55000: Wazuh API.
    - 5000: Logstash TCP input.
    - 9200: Elasticsearch HTTP.
    - 9300: Elasticsearch TCP transport
    - 5601: Kibana

.. note:: Configuration is not dynamically reloaded, you will need to restart the stack after any change in the configuration of a component.
