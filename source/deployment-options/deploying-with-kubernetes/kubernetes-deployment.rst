.. Copyright (C) 2022 Wazuh, Inc.

.. meta::
  :description: Learn more about Kubernetes deployment with Wazuh in this section of the Wazuh documentation. 

.. _kubernetes_deployment:

Deployment
==========

Clone this repository to deploy the necessary services and pods.

    .. code-block:: console

        $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b v|WAZUH_CURRENT_KUBERNETES| --depth=1
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

There are two variants of the manifest: ``eks`` and ``local-env``. The eks manifest should be used if you are using the EKS cluster, while the local-env manifest should be used for other cluster types.

It is possible to adjust resources for the cluster by editing patches on ``envs/eks/`` or ``envs/local-env/``, depending on which manifest you want to deploy. You can tune CPU, memory as well as storage for persistent volumes of each of the cluster objects. This could be undone by removing these patches from the ``kustomization.yaml`` or altering the patches themselves with different values.

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
        indexer               ClusterIP      xxx.yy.zzz.24    <none>             9200/TCP                         12m
        dashboard             ClusterIP      xxx.yy.zzz.76    <none>             5601/TCP                         11m
        wazuh                 LoadBalancer   xxx.yy.zzz.209   internal-a7a8...   1515:32623/TCP,55000:30283/TCP   9m
        wazuh-cluster         ClusterIP      None             <none>             1516/TCP                         9m
        Wazuh-indexer         ClusterIP      None             <none>             9300/TCP                         12m
        wazuh-workers         LoadBalancer   xxx.yy.zzz.26    internal-a7f9...   1514:31593/TCP                   9m


**Deployments**

    .. code-block:: console

        $ kubectl get deployments -n wazuh

    .. code-block:: none
        :class: output

        NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
        wazuh-dashboard  1         1         1            1           11m

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
        wazuh-dashboard-f4d9c7944-httsd   1/1       Running   0          14m
        wazuh-manager-master-0            1/1       Running   0          12m
        wazuh-manager-worker-0-0          1/1       Running   0          11m
        wazuh-manager-worker-1-0          1/1       Running   0          11m


**Accessing Wazuh dashboard**

In case you created domain names for the services, you should be able to access the dashboard using the proposed domain name: ``https://wazuh.your-domain.com``. Cloud providers usually provide an external IP address or hostname for direct access to the dashboard. This can be viewed by checking the services:

    .. code-block:: console
 
         $ kubectl get services -o wide -n wazuh



    .. code-block:: none
        :class: output

         NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP                      PORT(S)                          AGE       SELECTOR
         dashboard             LoadBalancer   xxx.xx.xxx.xxx   xxx.xx.xxx.xxx                   80:31831/TCP,443:30974/TCP       15m       app=wazuh-dashboard


**Optional**: On a local cluster deployment where the external IP address is not accessible, you can use port-forward:
 
    .. code-block:: console

         $ kubectl -n wazuh port-forward service/dashboard 8443:443

  
The Wazuh dashboard will be accessible on ``https://localhost:8443``.

The default credentials are ``admin:SecretPassword``.


Agents
^^^^^^

Wazuh agents are designed to monitor hosts. To start using them:

#. :doc:`Install the agent </installation-guide/wazuh-agent/index>`.
#. Enroll the agent by modifying the file ``/var/ossec/etc/ossec.conf``. Change the “transport protocol” to TCP and replace the ``MANAGER_IP`` with the external IP address of the service pointing to port 1514 or with the hostname provided by the cloud provider

To learn more about registering agents, see the :doc:`Wazuh agent enrollment </user-manual/agent-enrollment/index>` section of the documentation.
