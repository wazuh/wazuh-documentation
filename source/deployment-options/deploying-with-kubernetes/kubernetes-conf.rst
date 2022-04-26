.. Copyright (C) 2022 Wazuh, Inc.
.. meta::
  :description: Learn more about Kubernetes configuration for Wazuh: prerequisites, overview, how to verify the deployment, and more. 

.. _kubernetes_conf:

Kubernetes configuration
========================

Pre-requisites
--------------

    - Kubernetes cluster already deployed.

   
Resource Requirement
--------------------

To deploy Wazuh on Kubernetes, the cluster should have at least the following resources available:

- 2 CPU units
- 3 Gi of memory
- 2 Gi of storage
   
   
Overview
--------

StatefulSet and deployment controllers
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

as a *Deployment*, a *StatefulSet* manages Pods that are based on an identical container specification, but it maintains an identity attached to each of its pods. These pods are created from the same specification, but they are not interchangeable: each one has a persistent identifier maintained across any rescheduling.

It is useful for stateful applications like databases that save the data to persistent storage. The states of each Wazuh manager, as well as Wazuh indexer should be maintained, so we declare them using StatefulSet to ensure that they maintain their states in every startup.

Deployments are intended for stateless use and are quite lightweight, and seem to be appropriate for the Wazuh dashboard, where it is not necessary to maintain the states.

Persistent volumes (PV) are pieces of storage in the provisioned cluster. It is a resource in the cluster just like a node is a cluster resource. Persistent volumes are volume plugins like Volumes but have a lifecycle independent of any individual pod that uses the PV. This API object captures the details of the implementation of the storage, be that NFS, iSCSI, or a cloud-provider-specific storage system.

Here, we use persistent volumes to store data from both Wazuh manager and Wazuh indexer.

Read more about persistent volumes `here <https://kubernetes.io/docs/concepts/storage/persistent-volumes/>`_.

Pods
^^^^

You can check how we build our Wazuh docker containers in our `repository <https://github.com/wazuh/wazuh-docker>`_.

**Wazuh master**

This pod contains the master node of the Wazuh cluster. The master node centralizes and coordinates worker nodes, making sure the critical and required data is consistent across all nodes. The management is performed only in this node, so the agent enrollment service (authd) is placed here.

+-------------------------------+-------------+
| Image                         | Controller  |
+===============================+=============+
| wazuh/wazuh-manager           | StatefulSet |
+-------------------------------+-------------+

**Wazuh worker 0 / 1**

These pods contain a worker node of the Wazuh cluster. They will receive the agent events.

+-------------------------------+-------------+
| Image                         | Controller  |
+===============================+=============+
| wazuh/wazuh-manager           | StatefulSet |
+-------------------------------+-------------+

**Wazuh indexer**

The Wazuh indexer pod ingests events received from Filebeat.

+--------------------------------------------+-------------+
| Image                                      | Controller  |
+============================================+=============+
| wazuh/wazuh-indexer                        | StatefulSet |
+--------------------------------------------+-------------+

**Wazuh dashboard**

The Wazuh dashboard pod lets you visualize your Wazuh indexer data, along with other features such as the Wazuh app.

+--------------------------------------+-------------+
| Image                                | Controller  |
+======================================+=============+
| wazuh/wazuh-dashboard                | Deployment  |
+--------------------------------------+-------------+

Services
^^^^^^^^

**Wazuh indexer and dashboard**

+----------------------+-------------------------------------------------------------------------------------+
| Name                 | Description                                                                         |
+======================+=====================================================================================+
| wazuh-indexer        | Communication for Wazuh indexer nodes.                                              |
+----------------------+-------------------------------------------------------------------------------------+
| indexer              | This is the Wazuh indexer API used by Wazuh dashboard to read/write alerts.         |
+----------------------+-------------------------------------------------------------------------------------+
| dashboard            | Wazuh dashboard service. https://wazuh.your-domain.com:443                          |
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

Deployment
----------

Clone this repository to deploy the necessary services and pods.

    .. code-block:: console

        $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b v|WAZUH_LATEST_KUBERNETES| --depth=1
        $ cd wazuh-kubernetes


Setup SSL certificates
^^^^^^^^^^^^^^^^^^^^^^

You can generate self-signed certificates for the Wazuh indexer cluster using the script at ``wazuh/certs/indexer_cluster/generate_certs.sh`` or provide your own.

You can generate self-signed certificates for the Wazuh dashboard cluster using the script at ``wazuh/certs/dashboard_http/generate_certs.sh`` or provide your own.

The required certificates are imported via secretGenerator on the ``kustomization.yml`` file:


    .. code-block:: yaml

        secretGenerator:
            - name: indexer-certs
            files:
                - certs/indexer_cluster/root-ca.pem
                - certs/indexer_cluster/node.pem
                - certs/indexer_cluster/node-key.pem
                - certs/indexer_cluster/dashboard.pem
                - certs/indexer_cluster/dashboard-key.pem
                - certs/indexer_cluster/admin.pem
                - certs/indexer_cluster/admin-key.pem
                - certs/indexer_cluster/filebeat.pem
                - certs/indexer_cluster/filebeat-key.pem
            - name: dashboard-certs
            files:
                - certs/dashboard_http/cert.pem
                - certs/dashboard_http/key.pem
                - certs/indexer_cluster/root-ca.pem


Setup storage class (optional for non-EKS cluster)
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Depending on the type of cluster you’re running, the Storage Class may have a different provisioner.

You can check yours by running ``kubectl get sc``. You will see something like this:

   .. code-block:: console

        $ kubectl get sc
        NAME                          PROVISIONER            RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
        elk-gp2                       microk8s.io/hostpath   Delete          Immediate           false                  67d
        microk8s-hostpath (default)   microk8s.io/hostpath   Delete          Immediate           false                  54d

 
The provisioner column displays microk8s.io/hostpath, you must edit the file ``envs/local-env/storage-class.yaml`` and set up this provisioner.


Apply all manifests using kustomize
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

There are two variants of the manifest: ``eks`` and ``local-env``. The eks manifest should be used if you are using the EKS cluster while the local-env manifest should be used for other cluster types.

It is possible to adjust resources for the cluster by editing patches on ``envs/eks/`` or ``envs/local-env/`` depending on which manifest you want to deploy. You can tune cpu, memory as well as storage for persistent volumes of each of the cluster objects. This could be undone by removing these patches from the ``kustomization.yaml`` or alter the patches themselves with different values.

We can deploy the cluster with a single command by using the customization file:

- EKS cluster

  .. code-block:: console

      $ kubectl apply -k envs/eks/

 
- Other cluster types

  .. code-block:: console

      $ kubectl apply -k envs/local-env/


Verifying the deployment
^^^^^^^^^^^^^^^^^^^^^^^^

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
        wazuh-indexer          3/3     15m
        wazuh-manager-master   1/1     15m
        wazuh-manager-worker   2/2     15m

**Pods**

    .. code-block:: console

        $ kubectl get pods -n wazuh

    .. code-block:: none
        :class: output

        NAME                              READY     STATUS    RESTARTS   AGE
        wazuh-indexer-0                   1/1       Running   0          15m
        wazuh-kibana-f4d9c7944-httsd      1/1       Running   0          14m
        wazuh-manager-master-0            1/1       Running   0          12m
        wazuh-manager-worker-0-0          1/1       Running   0          11m
        wazuh-manager-worker-1-0          1/1       Running   0          11m


**Accessing Wazuh dashboard**

In case you created domain names for the services, you should be able to access the dashboard using the proposed domain name: ``https://wazuh.your-domain.com``. Cloud providers usually provide an external IP address or hostname for direct access to the dashboard. This can be viewed by checking the services:

    .. code-block:: console
 
         $ kubectl get services -o wide -n wazuh



    .. code-block:: none
        :class: output

         NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP                                                    PORT(S)                          AGE       SELECTOR
         dashboard             LoadBalancer   xxx.xx.xxx.xxx   internal-xxx-yyy.us-east-1.elb.amazonaws.com                   80:31831/TCP,443:30974/TCP       15m       app=wazuh-dashboard


**Optional**: On a local cluster deployment where the external IP address is not accessible, you can use port-forward:
 
    .. code-block:: console

         $ kubectl -n wazuh port-forward service/dashboard 8443:443

  
The Wazuh dashboard will be accessible on ``https://localhost:8443``.
The default credentials are ``admin:admin``.



Agents
^^^^^^

Wazuh agents are designed to monitor hosts. To start using them:

#. :ref:`Install the agent <installation_agents>`.
#. Enroll the agent by modifying the file ``/var/ossec/etc/ossec.conf``. Change the “transport protocol” to TCP and replace the ``MANAGER_IP`` with the external IP address of the service pointing to port 1514 or with the hostname provided by the cloud provider

To learn more about registering agents, see the :ref:`Wazuh agent enrollment <agent_enrollment>` section of the documentation.
