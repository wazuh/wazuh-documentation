.. Copyright (C) 2018 Wazuh, Inc.

.. _kubernetes_conf:

Kubernetes Installation & Configuration
=========================================

- `Installation`_
- `Pre-requisites`_
- `Overview`_
- `Verifying the deployment`_
- `Agents`_


Installation
------------

To select the best installation type for you, go to the `Official installation guide. <https://kubernetes.io/docs/setup/>`_

Pre-requisites
--------------


    - Kubernetes cluster already deployed.

    - Kubernetes can run on a wide range of Cloud providers and bare-metal environments, this repository focuses on AWS. It was tested using Amazon EKS. You should be able to:

        - Create Persistent Volumes on top of AWS EBS when using a *volumeClaimTemplates*
        - Create a record set in AWS Route 53 from a Kubernetes LoadBalancer.

    - Having at least two Kubernetes nodes in order to meet the *podAntiAffinity* policy.

Overview
--------

StateFulSet and Deployments Controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Like a *Deployment*, a *StatefulSet* manages Pods that are based on an identical container specification, but it maintains an identity attached to each of its pods. These pods are created from the same specification, but they are not interchangeable: each one has a persistent identifier maintained across any rescheduling.

It is useful for stateful applications like databases that save the data to a persistent storage. The states of each Wazuh manager as well as Elasticsearch are desirable to maintain, so we declare them using StatefulSet to ensure that they maintain their states in every startup.

Deployments are intended for stateless use and are quite lightweight and seem to be appropriate for Logstash, Kibana and Nginx, where it is not necessary to maintain the states.

Users can read more information about the *Persistent volumes* in the `Kubernetes Official documentation. <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`_
Pods
^^^^
.. note::
    In this `link <https://github.com/wazuh/wazuh-docker>`_ you can check the data Wazuh uses in its docker deployments.

**Wazuh master**

This pod contains the master node of the Wazuh cluster. The master node centralizes and coordinates worker nodes, making sure the critical and required data is consistent across all nodes. The management is performed only in this node, so the agent registration service (authd) and the API are placed here.

Details:
    - Image: Docker Hub 'wazuh/wazuh:3.8.2_6.5.4'
    - Controller: StatefulSet

**Wazuh worker 0 / 1**

These pods contain a worker node of the Wazuh cluster. They will receive the agent events.

Details:
    - Image: Docker Hub 'wazuh/wazuh:3.8.2_6.5.4'
    - Controller: StatefulSet

**Elasticsearch**

Elasticsearch pod. It receives and stores alerts received from Logstash. No Elasticsearch cluster is supported yet.

Details:
    - Image: Docker Hub 'wazuh/wazuh-elasticsearch:3.8.2_6.5.4'
    - Controller: StatefulSet

**Logstash**

Logstash pod. It receives the alerts from each Filebeat located in every Wazuh manager. Then, the alerts are sent to Elasticsearch.

Details:
    - image: Docker Hub 'wazuh/wazuh-logstash:3.8.2_6.5.4'
    - Controller: Deployment

**Kibana**

Kibana pod. It lets you visualize your Elasticsearch data, along with other features as the Wazuh app.

Details:
    - image: Docker Hub 'wazuh/wazuh-kibana:3.8.2_6.5.4'
    - Controller: Deployment

**Nginx**

The nginx pod acts as a reverse proxy for a safer access to Kibana.

Details:
    - image: Docker Hub 'wazuh/wazuh-nginx:3.8.2_6.5.4'
    - Controller: Deployment

Services
^^^^^^^^

**Elastic stack**

    - wazuh-elasticsearch:
        Communication for Elasticsearch nodes.
    - elasticsearch:
        Elasticsearch API. Used by Logstash/Kibana to write/read alerts.
    - wazuh-nginx:
        Service for https access to Kibana.
    - kibana:
        Kibana service.
    - Logstash:
        Logstash service, each Manager node has a Filebeat pointing to this service.

**Wazuh**

    - wazuh:
        Wazuh API: wazuh-master.your-domain.com:55000

        Agent registration service (authd): wazuh-master.your-domain.com:1515
    
    - wazuh-workers:
        Reporting service: wazuh-manager.your-domain.com:1514
    - wazuh-cluster:
        Communication for Wazuh manager nodes.

.. note::
    Here, we are going to use the `Kubernetes ConfigMaps <https://cloud.google.com/kubernetes-engine/docs/concepts/configmap>`_ to configure ths Wazuh instances.
    We will use them to configure the ``ossec.conf`` file that contains all the manager's configuration. 
    So, for example, if we want to use a wodle, it will be added in the ``ossec.conf`` that will be charged by the ConfigMap.

Deploy
------

1. Deploy Kubernetes
    
    Follow the `Official guide <https://kubernetes.io/docs/tutorials/kubernetes-basics/create-cluster/cluster-intro/>`_ to deploy a Kubernetes Cluster.
    This repository focuses on `AWS <https://aws.amazon.com/es/>`_ but it should be easy to adapt it to another Cloud provider. In case you are using AWS, we recommend `EKS <https://docs.aws.amazon.com/en_us/eks/latest/userguide/getting-started.html>`_.

2. Create domains to access the services

    We recommend creating domains and certificates to access the services. Examples:

        - wazuh-master.your-domain.com: Wazuh API and authd registration service.
        - wazuh-manager.your-domain.com: Reporting service.
        - wazuh.your-domain.com: Kibana and Wazuh app.

    .. note::
        You can skip this step and the services will be accessible using the Load balancer DNS from the VPC.

3. Deployment

    Clone this repository to deploy the necessary services and pods.

    .. code-block:: bash
            
        $ git clone https://github.com/wazuh/wazuh-kubernetes.git
        $ cd wazuh-kubernetes

3.1. Wazuh namespace and StorageClass

    The Wazuh namespace is used to handle all the Kubernetes elements (services, deployments, pods) necessary for Wazuh. In addition, you must create a StorageClass to use AWS EBS storage in our StateFulSet applications.

        .. code-block:: bash

            $ kubectl apply -f base/wazuh-ns.yaml
            $ kubectl apply -f base/aws-gp2-storage-class.yaml

3.2. Deploy Elasticsearch

            .. code-block:: bash

                $ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-svc.yaml
                $ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-api-svc.yaml
                $ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-sts.yaml

3.3. Deploy Kibana and Nginx
    
    In case you need to provide a domain name, update the *domainName* annotation value in the ``nginx-svc.yaml`` file before deploying that service. You should also set a valid AWS ACM certificate ARN in the ``nginx-svc.yaml`` for the `service.beta.kubernetes.io/aws-load-balancer-ssl-cert` annotation. That certificate should match with the `domainName`.
        
        .. code-block:: bash

            $ kubectl apply -f elastic_stack/kibana/kibana-svc.yaml
            $ kubectl apply -f elastic_stack/kibana/nginx-svc.yaml

            $ kubectl apply -f elastic_stack/kibana/kibana-deploy.yaml
            $ kubectl apply -f elastic_stack/kibana/nginx-deploy.yaml

3.4. Deploy Logstash

        .. code-block:: bash

            $ kubectl apply -f elastic_stack/logstash/logstash-svc.yaml
            $ kubectl apply -f elastic_stack/logstash/logstash-deploy.yaml

4. Deploy Wazuh

    .. code-block:: bash

        $ kubectl apply -f wazuh_managers/wazuh-master-svc.yaml
        $ kubectl apply -f wazuh_managers/wazuh-cluster-svc.yaml
        $ kubectl apply -f wazuh_managers/wazuh-workers-svc.yaml

        $ kubectl apply -f wazuh_managers/wazuh-master-conf.yaml
        $ kubectl apply -f wazuh_managers/wazuh-worker-0-conf.yaml
        $ kubectl apply -f wazuh_managers/wazuh-worker-1-conf.yaml

        $ kubectl apply -f wazuh_managers/wazuh-master-sts.yaml
        $ kubectl apply -f wazuh_managers/wazuh-worker-0-sts.yaml
        $ kubectl apply -f wazuh_managers/wazuh-worker-1-sts.yaml

Verifying the deployment
------------------------

**Namespace**

    .. code-block:: bash

        $ kubectl get namespaces | grep wazuh
        wazuh         Active    12m

**Services**

    .. code-block:: bash

        $ kubectl get services -n wazuh
        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)                          AGE
        elasticsearch         ClusterIP      xxx.yy.zzz.24    <none>             9200/TCP                         12m
        kibana                ClusterIP      xxx.yy.zzz.76    <none>             5601/TCP                         11m
        logstash              ClusterIP      xxx.yy.zzz.41    <none>             5000/TCP                         10m
        wazuh                 LoadBalancer   xxx.yy.zzz.209   internal-a7a8...   1515:32623/TCP,55000:30283/TCP   9m
        wazuh-cluster         ClusterIP      None             <none>             1516/TCP                         9m
        wazuh-elasticsearch   ClusterIP      None             <none>             9300/TCP                         12m
        wazuh-nginx           LoadBalancer   xxx.yy.zzz.223   internal-a3b1...   80:31831/TCP,443:30974/TCP       11m
        wazuh-workers         LoadBalancer   xxx.yy.zzz.26    internal-a7f9...   1514:31593/TCP                   9m

**Deployments**

    .. code-block:: bash

        $ kubectl get deployments -n wazuh
        NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
        wazuh-kibana     1         1         1            1           11m
        wazuh-logstash   1         1         1            1           10m
        wazuh-nginx      1         1         1            1           11m

**Statefulsets**

    .. code-block:: bash

        $ kubectl get statefulsets -n wazuh
        NAME                     DESIRED   CURRENT   AGE
        wazuh-elasticsearch      1         1         13m
        wazuh-manager-master     1         1         9m
        wazuh-manager-worker-0   1         1         9m
        wazuh-manager-worker-1   1         1         9m

**Pods**

    .. code-block:: bash

        $ kubectl get pods -n wazuh
        NAME                              READY     STATUS    RESTARTS   AGE
        wazuh-elasticsearch-0             1/1       Running   0          15m
        wazuh-kibana-f4d9c7944-httsd      1/1       Running   0          14m
        wazuh-logstash-777b7cd47b-7cxfq   1/1       Running   0          13m
        wazuh-manager-master-0            1/1       Running   0          12m
        wazuh-manager-worker-0-0          1/1       Running   0          11m
        wazuh-manager-worker-1-0          1/1       Running   0          11m
        wazuh-nginx-748fb8494f-xwwhw      1/1       Running   0          14m

**Accesing Kibana**

    In case you created domain names for the services, you should be able to access Kibana using the proposed domain name: https://wazuh.your-domain.com.

    Also, you can access using the External-IP (from the VPC): https://internal-xxx-yyy.us-east-1.elb.amazonaws.com:443

    .. code-block:: bash

        $ kubectl get services -o wide -n wazuh
        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP                                                    PORT(S)                          AGE       SELECTOR
        wazuh-nginx           LoadBalancer   xxx.xx.xxx.xxx   internal-xxx-yyy.us-east-1.elb.amazonaws.com                   80:31831/TCP,443:30974/TCP       15m       app=wazuh-nginx

.. note::
    `AWS route 53 <https://aws.amazon.com/route53/?nc1=h_ls>`_ can be used to create a DNS that points to the load balancer and make it accessible through that DNS.

Agents
------

Monitoring hosts
^^^^^^^^^^^^^^^^

Wazuh agents are designed to monitor hosts. To start using them:

1. :doc:`Install the agent. <../installation-guide/installing-wazuh-agent/index>`

2. Now, register the agent using the :doc:`registration service <../user-manual/registering/use-registration-service>`, 

3. Then configure the agent to use the reporting service:
    To configure the agent this way, you should follow this 2 steps:

    a. Modify the ``/var/ossec/etc/ossec.conf`` file, setting the transport protocol to *TCP* and changing the ``MANAGER_IP`` field with the IP of the service that takes to port 1514.
    b. Using the `authd <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-authd.html?highlight=authd>`_ daemon with option *-m* specifying the IP of the Wazuh service that takes to the port 1515 or its DNS if using *AWS Route 53*.

.. note::
    If using ELK remember to configure the security groups to manage the access.


Monitoring containers
^^^^^^^^^^^^^^^^^^^^^

The objective here is to monitor the container from the node that has raised it.

In this case, we have 2 options:

    - Running the agent in the container: containers are sealed and designed to run a single process. It is not practicable solution.
    
    - Install the agent on the host: This is the option that we recommend since the agent was originally designed for this purpose.

