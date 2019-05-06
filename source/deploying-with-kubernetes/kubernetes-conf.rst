.. Copyright (C) 2019 Wazuh, Inc.

.. _kubernetes_conf:

Kubernetes configuration
========================

- `Pre-requisites`_
- `Overview`_
- `Verifying the deployment`_
- `Agents`_

Pre-requisites
--------------

    - Kubernetes cluster already deployed.

    - Kubernetes can run on a wide range of Cloud providers and bare-metal environments, this repository focuses on AWS. It was tested using Amazon EKS.

    - Having at least two Kubernetes nodes in order to meet the *podAntiAffinity* policy.

Overview
--------

StatefulSet and deployment controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Like a *Deployment*, a *StatefulSet* manages Pods that are based on an identical container specification, but it maintains an identity attached to each of its pods. These pods are created from the same specification, but they are not interchangeable: each one has a persistent identifier maintained across any rescheduling.

It is useful for stateful applications like databases that save the data to persistent storage. The states of each Wazuh manager, as well as Elasticsearch, are desirable to maintain, so we declare them using *StatefulSet* to ensure that they maintain their states in every startup.

Deployments are intended for stateless use and are quite lightweight and seem to be appropriate for Logstash, Kibana and Nginx, where it is not necessary to maintain the states.

Persistent volumes are pieces of storage in the provisioned cluster. It is a resource in the cluster just like a node is a cluster resource. Persistent volumes are volume plugins like Volumes but have a lifecycle independent of any individual pod that uses the PV. This API object captures the details of the implementation of the storage, be that NFS, iSCSI, or a cloud-provider-specific storage system.

Here, we use persistent volumes to store data from both Wazuh and Elasticsearch.

Read more about persistent volumes `here <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`_.

Pods
^^^^

You can check how we build our Wazuh docker containers in our `repository <https://github.com/wazuh/wazuh-docker>`_.

**Wazuh master**

This pod contains the master node of the Wazuh cluster. The master node centralizes and coordinates worker nodes, making sure the critical and required data is consistent across all nodes. The management is performed only in this node, so the agent registration service (authd) and the API are placed here.

+-------------------------+-------------+
| Image                   | Controller  |
+=========================+=============+
| wazuh/wazuh:3.9.0_6.7.1 | StatefulSet |
+-------------------------+-------------+

**Wazuh worker 0 / 1**

These pods contain a worker node of the Wazuh cluster. They will receive the agent events.

+-------------------------+-------------+
| Image                   | Controller  |
+=========================+=============+
| wazuh/wazuh:3.9.0_6.7.1 | StatefulSet |
+-------------------------+-------------+

**Elasticsearch**

Elasticsearch pod, it ingests events received from Logstash.

+---------------------------------------+-------------+
| Image                                 | Controller  |
+=======================================+=============+
| wazuh/wazuh-elasticsearch:3.9.0_6.7.1 | StatefulSet |
+---------------------------------------+-------------+

**Logstash**

Logstash pod, it's listening to events from the Filebeat instances that are installed on every Wazuh manager node, then it sends all the events to Elasticsearch.

+----------------------------------+-------------+
| Image                            | Controller  |
+==================================+=============+
| wazuh/wazuh-logstash:3.9.0_6.7.1 | Deployment  |
+----------------------------------+-------------+

**Kibana**

Kibana pod, the frontend for Elasticsearch, it also includes the Wazuh app.

+--------------------------------+-------------+
| Image                          | Controller  |
+================================+=============+
| wazuh/wazuh-kibana:3.9.0_6.7.1 | Deployment  |
+--------------------------------+-------------+

**Nginx**

Nginx service used as a reverse proxy for Kibana.

+--------------------------------+-------------+
| Image                          | Controller  |
+================================+=============+
| wazuh/wazuh-nginx:3.9.0_6.7.1  | Deployment  |
+--------------------------------+-------------+

Services
^^^^^^^^

**Elastic stack**

    +----------------------+-------------------------------------------------------------------------------------+
    | Name                 | Description                                                                         |
    +======================+=====================================================================================+
    | wazuh-elasticsearch  | Communication for Elasticsearch nodes.                                              |
    +----------------------+-------------------------------------------------------------------------------------+
    | elasticsearch        | Elasticsearch service. Used by Kibana and Logstash.                                 |
    +----------------------+-------------------------------------------------------------------------------------+
    | wazuh-nginx          | Service for HTTPS access to Kibana.                                                 |
    +----------------------+-------------------------------------------------------------------------------------+
    | kibana               | Kibana service. The UI for Elasticsearch.                                           |
    +----------------------+-------------------------------------------------------------------------------------+
    | logstash             | Logstash service, each Wazuh node has a Filebeat instance pointing to this service. |
    +----------------------+-------------------------------------------------------------------------------------+

**Wazuh**

    +----------------------+-------------------------------------------------------------------------+
    | Name                 | Description                                                             |
    +======================+=========================================================================+
    | wazuh                | Wazuh API: wazuh-master.your-domain.com:55000                           |
    |                      +-------------------------------------------------------------------------+
    |                      | Agent registration service (authd): wazuh-master.your-domain.com:1515   |
    +----------------------+-------------------------------------------------------------------------+
    | wazuh-workers        | Reporting service: wazuh-manager.your-domain.com:1514                   |
    +----------------------+-------------------------------------------------------------------------+
    | wazuh-cluster        | Communication for Wazuh manager nodes.                                  |
    +----------------------+-------------------------------------------------------------------------+

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

    .. code-block:: console
            
        $ git clone https://github.com/wazuh/wazuh-kubernetes.git
        $ cd wazuh-kubernetes

3.1. Wazuh namespace and StorageClass

    The Wazuh namespace is used to handle all the Kubernetes elements (services, deployments, pods) necessary for Wazuh. In addition, you must create a StorageClass to use AWS EBS storage in our *StatefulSet* applications.

        .. code-block:: console

            $ kubectl apply -f base/wazuh-ns.yaml
            $ kubectl apply -f base/aws-gp2-storage-class.yaml

3.2. Deploy Elasticsearch

        .. code-block:: console

            $ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-svc.yaml
            $ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-api-svc.yaml
            $ kubectl apply -f elastic_stack/elasticsearch/elasticsearch-sts.yaml

3.3. Deploy Kibana and Nginx
    
    In case you need to provide a domain name, update the *domainName* annotation value in the ``nginx-svc.yaml`` file before deploying that service. You should also set a valid AWS ACM certificate ARN in the ``nginx-svc.yaml`` for the `service.beta.kubernetes.io/aws-load-balancer-ssl-cert` annotation. That certificate should match with the `domainName`.
        
        .. code-block:: console

            $ kubectl apply -f elastic_stack/kibana/kibana-svc.yaml
            $ kubectl apply -f elastic_stack/kibana/nginx-svc.yaml

            $ kubectl apply -f elastic_stack/kibana/kibana-deploy.yaml
            $ kubectl apply -f elastic_stack/kibana/nginx-deploy.yaml

3.4. Deploy Logstash

        .. code-block:: console

            $ kubectl apply -f elastic_stack/logstash/logstash-svc.yaml
            $ kubectl apply -f elastic_stack/logstash/logstash-deploy.yaml

4. Deploy Wazuh

    .. code-block:: console

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

    .. code-block:: console

        $ kubectl get namespaces | grep wazuh
        wazuh         Active    12m

**Services**

    .. code-block:: console

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

    .. code-block:: console

        $ kubectl get deployments -n wazuh
        NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
        wazuh-kibana     1         1         1            1           11m
        wazuh-logstash   1         1         1            1           10m
        wazuh-nginx      1         1         1            1           11m

**Statefulset**

    .. code-block:: console

        $ kubectl get statefulsets -n wazuh
        NAME                     DESIRED   CURRENT   AGE
        wazuh-elasticsearch      1         1         13m
        wazuh-manager-master     1         1         9m
        wazuh-manager-worker-0   1         1         9m
        wazuh-manager-worker-1   1         1         9m

**Pods**

    .. code-block:: console

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

    Also, you can access using the DNS (Eg: https://internal-xxx-yyy.us-east-1.elb.amazonaws.com):

    .. code-block:: console

        $ kubectl get services -o wide -n wazuh
        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP                                                    PORT(S)                          AGE       SELECTOR
        wazuh-nginx           LoadBalancer   xxx.xx.xxx.xxx   internal-xxx-yyy.us-east-1.elb.amazonaws.com                   80:31831/TCP,443:30974/TCP       15m       app=wazuh-nginx

.. note::
    `AWS route 53 <https://aws.amazon.com/route53/?nc1=h_ls>`_ can be used to create a DNS that points to the load balancer and make it accessible through that DNS.

Agents
------

Wazuh agents are designed to monitor hosts. To start using them:

1. :doc:`Install the agent <../installation-guide/installing-wazuh-agent/index>`.


2. Now, register the agent using the :doc:`registration service <../user-manual/agents/registering/use-registration-service>`.


3. Modify the file ``/var/ossec/etc/ossec.conf``, changing the "transport protocol" to *TCP* and changing the ``MANAGER_IP`` for the external IP of the service pointing to port 1514 or for the DNS provided by *AWS Route 53* if you are using it.


4. Using the `authd <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-authd.html?highlight=authd>`_ daemon with option *-m* specifying the external IP of the Wazuh service that takes to the port 1515 or its DNS if using *AWS Route 53*.
