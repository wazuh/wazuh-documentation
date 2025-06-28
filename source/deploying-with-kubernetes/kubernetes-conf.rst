.. Copyright (C) 2021 Wazuh, Inc.

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

Deployments are intended for stateless use and are quite lightweight and seem to be appropriate for Kibana and Nginx, where it is not necessary to maintain the states.

Persistent volumes are pieces of storage in the provisioned cluster. It is a resource in the cluster just like a node is a cluster resource. Persistent volumes are volume plugins like Volumes but have a lifecycle independent of any individual pod that uses the PV. This API object captures the details of the implementation of the storage, be that NFS, iSCSI, or a cloud-provider-specific storage system.

Here, we use persistent volumes to store data from both Wazuh and Elasticsearch.

Read more about persistent volumes `here <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`_.

Pods
^^^^

You can check how we build our Wazuh docker containers in our `repository <https://github.com/wazuh/wazuh-docker>`_.

**Wazuh master**

This pod contains the master node of the Wazuh cluster. The master node centralizes and coordinates worker nodes, making sure the critical and required data is consistent across all nodes. The management is performed only in this node, so the agent registration service (authd) is placed here.

+-------------------------------+-------------+
| Image                         | Controller  |
+===============================+=============+
| wazuh/wazuh-odfe:|WAZUH_LATEST_KUBERNETES|_|OPENDISTRO_LATEST_KUBERNETES| | StatefulSet |
+-------------------------------+-------------+

**Wazuh worker 0 / 1**

These pods contain a worker node of the Wazuh cluster. They will receive the agent events.

+-------------------------------+-------------+
| Image                         | Controller  |
+===============================+=============+
| wazuh/wazuh-odfe:|WAZUH_LATEST_KUBERNETES|_|OPENDISTRO_LATEST_KUBERNETES| | StatefulSet |
+-------------------------------+-------------+

**Elasticsearch**

Elasticsearch pod, it ingests events received from Filebeat.

+--------------------------------------------+-------------+
| Image                                      | Controller  |
+============================================+=============+
| amazon/opendistro-for-elasticsearch:|OPENDISTRO_LATEST_KUBERNETES| | StatefulSet |
+--------------------------------------------+-------------+

**Kibana**

Kibana pod, the frontend for Elasticsearch, it also includes the Wazuh app.

+--------------------------------------+-------------+
| Image                                | Controller  |
+======================================+=============+
| wazuh/wazuh-kibana-odfe:|WAZUH_LATEST_KUBERNETES|_|OPENDISTRO_LATEST_KUBERNETES| | Deployment  |
+--------------------------------------+-------------+

Services
^^^^^^^^

**Elastic stack**

+----------------------+-------------------------------------------------------------------------------------+
| Name                 | Description                                                                         |
+======================+=====================================================================================+
| wazuh-elasticsearch  | Communication for Elasticsearch nodes.                                              |
+----------------------+-------------------------------------------------------------------------------------+
| elasticsearch        | Elasticsearch service. Used by Kibana and Filebeat.                                 |
+----------------------+-------------------------------------------------------------------------------------+
| kibana               | Kibana service. The UI for Elasticsearch.                                           |
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
    Our Kubernetes repository focuses on `AWS <https://aws.amazon.com/es/>`_ but it should be easy to adapt it to another Cloud provider. In case you are using AWS, we recommend `EKS <https://docs.aws.amazon.com/en_us/eks/latest/userguide/getting-started.html>`_.

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

        $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b v|WAZUH_LATEST_KUBERNETES|_|OPENDISTRO_LATEST_KUBERNETES| --depth=1
        $ cd wazuh-kubernetes

    3.1. Setup SSL certificates

        You can generate self-signed certificates for the ODFE cluster using the script at ``certs/odfe_cluster/generate_certs.sh`` or provide your own.

        Since Kibana has HTTPS enabled it will require its own certificates, these may be generated with:

        .. code-block:: console

            $ openssl req -x509 -batch -nodes -days 365 -newkey rsa:2048 -keyout key.pem -out cert.pem

        The required certificates are imported via secretGenerator on the `kustomization.yml` file:

        .. code-block:: yaml

            secretGenerator:
            - name: odfe-ssl-certs
                files:
                - certs/odfe_cluster/root-ca.pem
                - certs/odfe_cluster/node.pem
                - certs/odfe_cluster/node-key.pem
                - certs/odfe_cluster/kibana.pem
                - certs/odfe_cluster/kibana-key.pem
                - certs/odfe_cluster/admin.pem
                - certs/odfe_cluster/admin-key.pem
                - certs/odfe_cluster/filebeat.pem
                - certs/odfe_cluster/filebeat-key.pem
            - name: kibana-certs
                files:
                - certs/kibana_http/cert.pem
                - certs/kibana_http/key.pem

    3.2. Apply all manifests using kustomize

        We are using the overlay feature of `Kustomize <https://https://kubernetes.io/docs/tasks/manage-kubernetes-objects/kustomization/>`_ to create two variants: ``eks`` and ``local-env``, in this guide we're using ``eks``. (For a deployment on a local environment check the guide :ref:`Deployment on local environment <kubernetes_local_env>`)

        You can adjust resources for the cluster on ``envs/eks/``, you can tune cpu, memory as well as storage for persistent volumes of each of the cluster objects.

        By using the kustomization file on the ``eks`` variant we can now deploy the whole cluster with a single command:

        .. code-block:: console

            $ kubectl apply -k envs/eks/


Verifying the deployment
------------------------

**Namespace**

    .. code-block:: console

        $ kubectl get namespaces | grep wazuh

    .. code-block:: none
        :class: output

        wazuh         Active    12m

**Services**

    .. code-block:: console

        $ kubectl get services -n wazuh

    .. code-block:: none
        :class: output

        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)                          AGE
        elasticsearch         ClusterIP      xxx.yy.zzz.24    <none>             9200/TCP                         12m
        kibana                ClusterIP      xxx.yy.zzz.76    <none>             5601/TCP                         11m
        wazuh                 LoadBalancer   xxx.yy.zzz.209   internal-a7a8...   1515:32623/TCP,55000:30283/TCP   9m
        wazuh-cluster         ClusterIP      None             <none>             1516/TCP                         9m
        wazuh-elasticsearch   ClusterIP      None             <none>             9300/TCP                         12m
        wazuh-workers         LoadBalancer   xxx.yy.zzz.26    internal-a7f9...   1514:31593/TCP                   9m

**Deployments**

    .. code-block:: console

        $ kubectl get deployments -n wazuh

    .. code-block:: none
        :class: output

        NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
        wazuh-kibana     1         1         1            1           11m

**Statefulset**

    .. code-block:: console

        $ kubectl get statefulsets -n wazuh

    .. code-block:: none
        :class: output

        NAME                   READY   AGE
        wazuh-elasticsearch    3/3     15m
        wazuh-manager-master   1/1     15m
        wazuh-manager-worker   2/2     15m

**Pods**

    .. code-block:: console

        $ kubectl get pods -n wazuh

    .. code-block:: none
        :class: output

        NAME                              READY     STATUS    RESTARTS   AGE
        wazuh-elasticsearch-0             1/1       Running   0          15m
        wazuh-kibana-f4d9c7944-httsd      1/1       Running   0          14m
        wazuh-manager-master-0            1/1       Running   0          12m
        wazuh-manager-worker-0-0          1/1       Running   0          11m
        wazuh-manager-worker-1-0          1/1       Running   0          11m
        wazuh-nginx-748fb8494f-xwwhw      1/1       Running   0          14m

**Accessing Kibana**

    In case you created domain names for the services, you should be able to access Kibana using the proposed domain name: ``https://wazuh.your-domain.com``.

    Also, you can access using the DNS (e.g.: ``https://internal-xxx-yyy.us-east-1.elb.amazonaws.com``):

    .. code-block:: console

        $ kubectl get services -o wide -n wazuh

    .. code-block:: none
        :class: output

        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP                                                    PORT(S)                          AGE       SELECTOR
        kibana                LoadBalancer   xxx.xx.xxx.xxx   internal-xxx-yyy.us-east-1.elb.amazonaws.com                   80:31831/TCP,443:30974/TCP       15m       app=wazuh-kibana

.. note::
    `AWS route 53 <https://aws.amazon.com/route53/?nc1=h_ls>`_ can be used to create a DNS that points to the load balancer and make it accessible through that DNS.

Agents
------

Wazuh agents are designed to monitor hosts. To start using them:

1. :ref:`Install the agent <installation_agents>`.


2. Now, register the agent using the :doc:`registration service <../../user-manual/registering/index>`.


3. Modify the file ``/var/ossec/etc/ossec.conf``, changing the "transport protocol" to *TCP* and changing the ``MANAGER_IP`` for the external IP of the service pointing to port 1514 or for the DNS provided by *AWS Route 53* if you are using it.


4. Using the `authd <https://documentation.wazuh.com/current/user-manual/reference/daemons/ossec-authd.html?highlight=authd>`_ daemon with option *-m* specifying the external IP of the Wazuh service that takes to the port 1515 or its DNS if using *AWS Route 53*.
