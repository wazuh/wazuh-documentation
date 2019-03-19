.. Copyright (C) 2018 Wazuh, Inc.

.. _kubernetes_clean_up:


Clean Up
========

Steps to perform a clean up of all deployments, services and volumes.

Wazuh cluster
-------------

The deployment of the Wazuh cluster of managers involves the use of different `StatefulSet <https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/>`_ elements as well as configuration maps and services.

1. First, remove the services related to the Wazuh cluster.

    List the services created:

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get services --namespace wazuh
        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)                          AGE
        elasticsearch         ClusterIP      172.20.247.17    <none>             9200/TCP                         6d
        kibana                ClusterIP      172.20.121.19    <none>             5601/TCP                         6d
        logstash              ClusterIP      172.20.160.68    <none>             5000/TCP                         6d
        wazuh                 LoadBalancer   172.20.240.162   internal-ae32...   1515:30732/TCP,55000:30839/TCP   6d
        wazuh-cluster         ClusterIP      None             <none>             1516/TCP                         6d
        wazuh-elasticsearch   ClusterIP      None             <none>             9300/TCP                         6d
        wazuh-nginx           LoadBalancer   172.20.166.239   internal-ac0c...   80:30409/TCP,443:32575/TCP       6d
        wazuh-workers         LoadBalancer   172.20.17.252    internal-aec3...   1514:32047/TCP                   6d

    Delete the corresponding services:

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl delete service wazuh-cluster --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete service wazuh-workers --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete service wazuh --namespace wazuh

2. In this step delete the *StatefulSet*.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get StatefulSet --namespace wazuh
        NAME                     DESIRED   CURRENT   AGE
        wazuh-elasticsearch      1         1         6d
        wazuh-manager-master     1         1         6d
        wazuh-manager-worker-0   1         1         6d
        wazuh-manager-worker-1   1         1         6d

    Remove the three StatefulSets from the Wazuh cluster managers:

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl delete StatefulSet wazuh-manager-master --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete StatefulSet wazuh-manager-worker-0 --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete StatefulSet wazuh-manager-worker-1 --namespace wazuh

3. Take care of deleting the configuration maps.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get ConfigMap --namespace wazuh
        NAME                          DATA      AGE
        wazuh-manager-master-conf     1         6d
        wazuh-manager-worker-0-conf   1         6d
        wazuh-manager-worker-1-conf   1         6d


        ubuntu@k8s-control-server:~$ kubectl delete ConfigMap wazuh-manager-master-conf --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete ConfigMap wazuh-manager-worker-0-conf --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete ConfigMap wazuh-manager-worker-1-conf --namespace wazuh


4. Now eliminate the persistent volume claims.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get persistentvolumeclaim --namespace wazuh
        NAME                                            STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS             AGE
        wazuh-elasticsearch-wazuh-elasticsearch-0       Bound     pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac   30Gi       RWO            gp2-encrypted-retained   6d
        wazuh-manager-master-wazuh-manager-master-0     Bound     pvc-fb821971-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            gp2-encrypted-retained   6d
        wazuh-manager-worker-wazuh-manager-worker-0-0   Bound     pvc-ffe7bf66-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            gp2-encrypted-retained   6d
        wazuh-manager-worker-wazuh-manager-worker-1-0   Bound     pvc-024466da-f7c5-11e8-b9b8-022ada63b4ac   10Gi       RWO            gp2-encrypted-retained   6d


        ubuntu@k8s-control-server:~$ kubectl delete persistentvolumeclaim wazuh-manager-master-wazuh-manager-master-0 --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete persistentvolumeclaim wazuh-manager-master-wazuh-manager-worker-0-0 --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete persistentvolumeclaim wazuh-manager-master-wazuh-manager-worker-1-0 --namespace wazuh

5. Finally, eliminate the persistent volumes.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get persistentvolume
        NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS        CLAIM                                                         STORAGECLASS             REASON    AGE
        pvc-024466da-f7c5-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Bound         wazuh/wazuh-manager-worker-wazuh-manager-worker-1-0           gp2-encrypted-retained             6d
        pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac   30Gi       RWO            Retain           Bound         wazuh/wazuh-elasticsearch-wazuh-elasticsearch-0               gp2-encrypted-retained             6d
        pvc-fb821971-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Bound         wazuh/wazuh-manager-master-wazuh-manager-master-0             gp2-encrypted-retained             6d
        pvc-ffe7bf66-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Bound         wazuh/wazuh-manager-worker-wazuh-manager-worker-0-0           gp2-encrypted-retained             6d


        ubuntu@k8s-control-server:~$ kubectl delete persistentvolume pvc-fb821971-f7c4-11e8-b9b8-022ada63b4ac
        ubuntu@k8s-control-server:~$ kubectl delete persistentvolume pvc-ffe7bf66-f7c4-11e8-b9b8-022ada63b4ac
        ubuntu@k8s-control-server:~$ kubectl delete persistentvolume pvc-024466da-f7c5-11e8-b9b8-022ada63b4ac

.. warning::
    Do not forget to delete the volumes manually in AWS.

Elasticsearch
-------------

The process for cleaning the Elasticsearch installation environment is similar to that of the Wazuh cluster. In order to do this remove the Elasticsearch deployment as well as its associated services and volumes.

1. The first step is to remove the services related to Elasticsearch.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get services --namespace wazuh
        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)                          AGE
        elasticsearch         ClusterIP      172.20.247.17    <none>             9200/TCP                         6d
        kibana                ClusterIP      172.20.121.19    <none>             5601/TCP                         6d
        logstash              ClusterIP      172.20.160.68    <none>             5000/TCP                         6d
        wazuh-elasticsearch   ClusterIP      None             <none>             9300/TCP                         6d
        wazuh-nginx           LoadBalancer   172.20.166.239   internal-ac0c...   80:30409/TCP,443:32575/TCP       6d

        ubuntu@k8s-control-server:~$ kubectl delete service elasticsearch --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete service wazuh-elasticsearch --namespace wazuh

2. Next, delete the StatefulSet.

    .. code-block:: bash
            
        ubuntu@k8s-control-server:~$ kubectl get StatefulSet --namespace wazuh
        NAME                     DESIRED   CURRENT   AGE
        wazuh-elasticsearch      1         1         6d

        ubuntu@k8s-control-server:~$ kubectl delete StatefulSet wazuh-elasticsearch --namespace wazuh

3. Now eliminate the persistent volume claims.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get persistentvolumeclaim --namespace wazuh
        NAME                                            STATUS    VOLUME                                     CAPACITY   ACCESS MODES   STORAGECLASS             AGE
        wazuh-elasticsearch-wazuh-elasticsearch-0       Bound     pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac   30Gi       RWO            gp2-encrypted-retained   6d

        ubuntu@k8s-control-server:~$ kubectl delete persistentvolumeclaim wazuh-elasticsearch-wazuh-elasticsearch-0 --namespace wazuh

4. Finally delete the persistent volumes.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get persistentvolume
        NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS        CLAIM                                                         STORAGECLASS             REASON    AGE
        pvc-024466da-f7c5-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-worker-wazuh-manager-worker-1-0           gp2-encrypted-retained             6d
        pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac   30Gi       RWO            Retain           Bound         wazuh/wazuh-elasticsearch-wazuh-elasticsearch-0               gp2-encrypted-retained             6d
        pvc-fb821971-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-master-wazuh-manager-master-0             gp2-encrypted-retained             6d
        pvc-ffe7bf66-f7c4-11e8-b9b8-022ada63b4ac   10Gi       RWO            Retain           Released      wazuh/wazuh-manager-worker-wazuh-manager-worker-0-0           gp2-encrypted-retained             6d

        ubuntu@k8s-control-server:~$ kubectl delete persistentvolume pvc-b3226ad3-f7c4-11e8-b9b8-022ada63b4ac

.. warning::
    Do not forget to delete the volumes manually in AWS.

Logstash
--------

To clean the Logstash installation remove the Logstash deployments and services.

1. The first step is to remove the services related to Logstash.

    .. code-block:: bash
            
        ubuntu@k8s-control-server:~$ kubectl get services --namespace wazuh
        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)                          AGE
        kibana                ClusterIP      172.20.121.19    <none>             5601/TCP                         6d
        logstash              ClusterIP      172.20.160.68    <none>             5000/TCP                         6d
        wazuh-nginx           LoadBalancer   172.20.166.239   internal-ac0c...   80:30409/TCP,443:32575/TCP       6d

        ubuntu@k8s-control-server:~$ kubectl delete service logstash --namespace wazuh

2. And the second and last step is to eliminate the deployment.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get deploy --namespace wazuh
        NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
        wazuh-kibana     1         1         1            1           6d
        wazuh-logstash   1         1         1            1           6d
        wazuh-nginx      1         1         1            1           6d

        ubuntu@k8s-control-server:~$ kubectl delete deploy wazuh-logstash --namespace wazuh

Kibana and Nginx
----------------

To clean the Kibana and Nginx installation remove their deployments and services.

1. First, remove the services related to Kibana and Nginx.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get services --namespace wazuh
        NAME                  TYPE           CLUSTER-IP       EXTERNAL-IP        PORT(S)                          AGE
        kibana                ClusterIP      172.20.121.19    <none>             5601/TCP                         6d
        wazuh-nginx           LoadBalancer   172.20.166.239   internal-ac0c...   80:30409/TCP,443:32575/TCP       6d

        ubuntu@k8s-control-server:~$ kubectl delete service kibana --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete service wazuh-nginx --namespace wazuh

2. To finish, delete the deployments.

    .. code-block:: bash

        ubuntu@k8s-control-server:~$ kubectl get deploy --namespace wazuh
        NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
        wazuh-kibana     1         1         1            1           6d
        wazuh-nginx      1         1         1            1           6d

        ubuntu@k8s-control-server:~$ kubectl delete deploy wazuh-kibana --namespace wazuh
        ubuntu@k8s-control-server:~$ kubectl delete deploy wazuh-nginx --namespace wazuh

Once these steps are completed, our Kubernetes environment will be clean of deployments relating to the Wazuh cluster and related Elastic Stack components.
