.. _ossec_elk_java:

Java 8 JDK
==========

Java 8 JDK is required by Logstash server and by the Elasticsearch engine to be able to run. That is why we need to install it both for single-host deployments or distributed ones (only in those systems running Logstash server or Elasticsearch).

Java 8 JDK for Debian
---------------------

To install Java 8 JDK on Debian based distributions we just need to add the ``webupd8team`` JAVA repository to our sources and then proceed to install Java 8 via apt-get install: ::

 $ sudo add-apt-repository ppa:webupd8team/java
 $ sudo apt-get update
 $ sudo apt-get install oracle-java8-installer

Java 8 JDK for CentOS
---------------------

To install Java 8 JDK on CentOS, download and run the ``Oracle Java 8 JDK RPM``, following these steps: ::

 $ cd ~
 $ wget --no-cookies --no-check-certificate --header "Cookie: gpw_e24=http%3A%2F%2Fwww.oracle.com%2F; oraclelicense=accept-securebackup-cookie" "http://download.oracle.com/otn-pub/java/jdk/8u60-b27/jdk-8u60-linux-x64.rpm"
 $ sudo yum localinstall jdk-8u60-linux-x64.rpm
 $ rm ~/jdk-8u60-linux-x64.rpm
 $ export JAVA_HOME=/usr/java/jdk1.8.0_60/jre

At last, to set the JAVA_HOME environment variable for all users, we need to add this line at the end of our ``/etc/profile`` file: ::

 export JAVA_HOME=/usr/java/jdk1.8.0_60/jre

What's next
-----------

Once you have Java 8 JDK installed you can move forward and install Logstash, Elasticsearch and Kibana:

* :ref:`Logstash <ossec_elk_logstash>`
* :ref:`Elasticsearch <ossec_elk_elasticsearch>`
* :ref:`Kibana <ossec_elk_kibana>`
* :ref:`OSSEC Wazuh RESTful API <ossec_api>`
* :ref:`OSSEC Wazuh Ruleset <ossec_ruleset>`
