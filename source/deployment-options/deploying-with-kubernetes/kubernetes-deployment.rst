.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
   :description: This section covers deploying Wazuh on Kubernetes for Amazon EKS and Local Kubernetes clusters, from environment preparation to verifying that all components are running correctly.

Deployment
==========

Deploying the Wazuh central components
--------------------------------------

This section covers steps for deploying Wazuh central components on Kubernetes for Amazon EKS and local Kubernetes clusters, and to verify the deployment.

-  :ref:`amazon-eks-deployment`
-  :ref:`local-cluster-deployment`
-  :ref:`verifying-the-deployment`

.. _amazon-eks-deployment:

Amazon EKS deployment
^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy Wazuh central components on an Amazon EKS cluster.

Clone the Wazuh Kubernetes repository for the necessary services and pods:

.. code-block:: console

   $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b v|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV| --depth=1
   $ cd wazuh-kubernetes

.. _kubernetes_ssl_certificates:

Setup SSL certificates
~~~~~~~~~~~~~~~~~~~~~~

Perform the steps below to generate the required certificates for the deployment:

#. Download the ``wazuh-certs-tool.sh`` script and the ``config.yml`` configuration file. These files are used to create the certificates that encrypt communications between the Wazuh central components.

   .. code-block:: console

      $ cd wazuh
      $ curl -o wazuh-certs-tool.sh https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|.sh
      $ curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|.yml

#. Edit ``./config.yml`` and replace the node names and IP values with the corresponding names and IP addresses. You need to do this for the Wazuh manager, Wazuh indexer, and Wazuh dashboard node.

   .. code-block:: yaml

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: indexer
            dns:
              - "wazuh-indexer"
              - "wazuh-indexer.wazuh.svc.cluster.local"

        # Wazuh manager nodes
        manager:
          - name: manager
            dns:
              - "wazuh-api"
              - "wazuh-api.wazuh.svc.cluster.local"

        # Wazuh dashboard nodes
        dashboard:
          - name: dashboard
            dns:
              - "dashboard"
              - "dashboard.wazuh.svc.cluster.local"

#. Run script ``/tools/utils/deployment/certificates-conf.sh`` to create and import the certificates via ``secretGenerator`` on the ``kustomization.yml`` file.

   .. code-block:: console

      $ sudo bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv

   .. code-block:: none
      :class: output

      Detected indexer nodes:   indexer
      Detected manager nodes:   manager
      Detected dashboard nodes: dashboard
      Generating certificates
      29/04/2026 11:52:47 INFO: Verbose logging redirected to /home/vagrant/wazuh-kubernetes/wazuh/wazuh-certificates-tool.log
      29/04/2026 11:52:47 INFO: Generating the root certificate.
      29/04/2026 11:52:48 INFO: Generating Admin certificates.
      29/04/2026 11:52:48 INFO: Admin certificates created.
      29/04/2026 11:52:48 INFO: Generating Wazuh indexer certificates.
      29/04/2026 11:52:48 INFO: Wazuh indexer certificates created.
      29/04/2026 11:52:48 INFO: Generating Wazuh manager certificates.
      29/04/2026 11:52:49 INFO: Wazuh manager certificates created.
      29/04/2026 11:52:49 INFO: Generating Wazuh dashboard certificates.
      29/04/2026 11:52:49 INFO: Wazuh dashboard certificates created.
      Copying certificates for indexer: indexer -> config/indexer/certs/
      Copying certificates for manager: manager -> config/manager/certs/
      Copying certificates for dashboard: dashboard -> config/dashboard/certs/
      Setting permissions for indexer indexer (1000:1000)
      Setting permissions for manager manager (999:999)
      Setting permissions for dashboard dashboard (1000:1000)
      Process completed.

Apply Traefik ingress controller
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The Traefik ingress controller routes and load balances external traffic to the appropriate internal Kubernetes services. It is also used to expose the Wazuh services outside the EKS cluster.

#. Run the command below to deploy Traefik CRD:

   .. code-block:: console

      $ cd ..
      $ kubectl apply -f traefik/crd/kubernetes-crd-definition-v1.yml

   .. code-block:: none
      :class: output

      customresourcedefinition.apiextensions.k8s.io/ingressroutes.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/ingressroutetcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/ingressrouteudps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/middlewares.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/middlewaretcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/serverstransports.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/serverstransporttcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/tlsoptions.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/tlsstores.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/traefikservices.traefik.io created

#. Deploy the Traefik runtime for the ingress controller:

   .. code-block:: console

      $ kubectl apply -k traefik/runtime/

   .. code-block:: none
      :class: output

      namespace/traefik created
      serviceaccount/traefik created
      clusterrole.rbac.authorization.k8s.io/traefik created
      clusterrolebinding.rbac.authorization.k8s.io/traefik created
      service/traefik created
      deployment.apps/traefik created

#. Run the command below to view all running services in the ``traefik`` namespace:

   .. code-block:: console

      $ kubectl -n traefik get svc

   .. code-block:: none
      :class: output

      NAME      TYPE           CLUSTER-IP     EXTERNAL-IP                                                              PORT(S)                                       AGE
      traefik   LoadBalancer   10.100.34.51   a7ffe29bfcf38420988fd52a698be422-862207742.us-west-1.elb.amazonaws.com   443:30725/TCP,1514:32036/TCP,1515:30354/TCP   6m29s

Apply all manifests
~~~~~~~~~~~~~~~~~~~

The Wazuh Kubernetes cluster manifest for Amazon EKS clusters is located in ``envs/eks``.

You can adjust cluster resources by editing patch files in ``envs/eks/`` or ``envs/local-env/``. These files override specific values in the base manifests for each environment, such as CPU, memory, and storage for persistent volumes.

.. note::

   Edit the following document to update ``image`` value for the Wazuh indexer, manager, and dashboard.

   -  Edit the manifest file ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml`` that defines the Wazuh dashboard deployment. Locate the ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest``.
   -  Edit the manifest file ``wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml`` that defines the Wazuh indexer statefulset. Locate the ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest``.
   -  Edit the manifest file ``wazuh/wazuh_managers/wazuh-master-sts.yaml`` that defines the Wazuh manager master statefulset. Locate the ``initContainers`` and ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest``.
   -  Edit the manifest file ``wazuh/wazuh_managers/wazuh-workers-sts.yaml`` that defines the Wazuh manager worker statefulset. Locate the ``initContainers`` and ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest``.

#. Edit ``wazuh/base/ingressRoute-tcp-dashboard.yaml`` and replace ``<FQDN_OF_THE_INGRESS>`` with the fully qualified domain name (FQDN) of the external load balancer created for the Traefik service. This configures TLS pass-through for the Wazuh dashboard.

   .. code-block:: yaml
      :emphasize-lines: 10

      apiVersion: traefik.io/v1alpha1
      kind: IngressRouteTCP
      metadata:
        name: wazuh-dashboard
        namespace: wazuh
      spec:
        entryPoints:
          - websecure
        routes:
        - match: HostSNI(`<FQDN_OF_THE_INGRESS>`)
          middlewares:
          - name: ip-allowlist
          services:
          - name: dashboard
            port: 443
        tls:
          passthrough: true

   Run the command ``kubectl -n traefik get svc`` to get the FQDN  of the load balancer created for the Traefik service.

   .. code-block:: none
      :class: output

      NAME      TYPE           CLUSTER-IP     EXTERNAL-IP                                                              PORT(S)                                       AGE
      traefik   LoadBalancer   10.100.34.51   a7ffe29bfcf38420988fd52a698be422-862207742.us-west-1.elb.amazonaws.com   443:30725/TCP,1514:32036/TCP,1515:30354/TCP   6m29s                                                   35s

#. Deploy the Wazuh Kubernetes cluster using the ``kustomization`` file:

   .. code-block:: console

      $ kubectl apply -k envs/eks/

Refer to :ref:`verifying-the-deployment` to confirm the deployment is successful.

.. _local-cluster-deployment:

Local cluster deployment
^^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to deploy a Wazuh Kubernetes cluster on a local Kubernetes cluster.

#. Clone the Wazuh Kubernetes repository for the necessary services and pods.

   .. code-block:: console

      $ git clone https://github.com/wazuh/wazuh-kubernetes.git -b v|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV| --depth=1
      $ cd wazuh-kubernetes

#. Edit ``wazuh/base/ingressRoute-tcp-dashboard.yaml`` and clear its contents for local deployments to prevent the EKS ingress configuration from being applied:

   .. code-block:: console

      $ echo "" > wazuh/base/ingressRoute-tcp-dashboard.yaml

Set up storage class
~~~~~~~~~~~~~~~~~~~~

The storage class provisioner varies depending on your cluster. Edit the ``envs/local-env/storage-class.yaml`` file to set the provisioner that matches your cluster type.

Check your storage class by running the command below:

.. code-block:: console

   # kubectl get sc

.. code-block:: none
   :class: output

   NAME                 PROVISIONER                RECLAIMPOLICY   VOLUMEBINDINGMODE   ALLOWVOLUMEEXPANSION   AGE
   standard (default)   k8s.io/minikube-hostpath   Delete          Immediate           false                  10m

The provisioner column displays ``k8s.io/minikube-hostpath``.

Set up SSL certificates
~~~~~~~~~~~~~~~~~~~~~~~

Perform the steps below to generate the required certificates for the deployment:

#. Download the ``wazuh-certs-tool.sh`` script and the ``config.yml`` configuration file. These files are used to generate certificates that encrypt communications between Wazuh's central components.

   .. code-block:: console

      $ cd wazuh
      $ curl -o wazuh-certs-tool.sh  https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/wazuh-certs-tool-|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|.sh
      $ curl -o config.yml https://packages-staging.xdrsiem.wazuh.info/pre-release/|WAZUH_CURRENT_MAJOR|/installation-assistant/config-|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|.yml

#. Edit the ``./config.yml`` file and replace node names and IP values with the corresponding names and IP addresses. You need to do this for the Wazuh manager, Wazuh indexer, and Wazuh dashboard nodes.

   .. code-block:: yaml

      nodes:
        # Wazuh indexer nodes
        indexer:
          - name: indexer
            dns:
              - "wazuh-indexer"
              - "wazuh-indexer.wazuh.svc.cluster.local"

        # Wazuh manager nodes
        manager:
          - name: manager
            dns:
              - "wazuh-api"
              - "wazuh-api.wazuh.svc.cluster.local"

        # Wazuh dashboard nodes
        dashboard:
          - name: dashboard
            dns:
              - "dashboard"
              - "dashboard.wazuh.svc.cluster.local"

#. Run the script ``/tools/utils/deployment/certificates-conf.sh`` to create and import the certificates via secretGenerator on the ``kustomization.yml`` file.:

   .. code-block:: console

      $ sudo bash ../tools/utils/deployment/certificates-conf.sh --cert --copy --priv

   .. code-block:: none
      :class: output

      Detected indexer nodes:   indexer
      Detected manager nodes:   manager
      Detected dashboard nodes: dashboard
      Generating certificates
      29/04/2026 11:52:47 INFO: Verbose logging redirected to /home/vagrant/wazuh-kubernetes/wazuh/wazuh-certificates-tool.log
      29/04/2026 11:52:47 INFO: Generating the root certificate.
      29/04/2026 11:52:48 INFO: Generating Admin certificates.
      29/04/2026 11:52:48 INFO: Admin certificates created.
      29/04/2026 11:52:48 INFO: Generating Wazuh indexer certificates.
      29/04/2026 11:52:48 INFO: Wazuh indexer certificates created.
      29/04/2026 11:52:48 INFO: Generating Wazuh manager certificates.
      29/04/2026 11:52:49 INFO: Wazuh manager certificates created.
      29/04/2026 11:52:49 INFO: Generating Wazuh dashboard certificates.
      29/04/2026 11:52:49 INFO: Wazuh dashboard certificates created.
      Copying certificates for indexer: indexer -> config/indexer/certs/
      Copying certificates for manager: manager -> config/manager/certs/
      Copying certificates for dashboard: dashboard -> config/dashboard/certs/
      Setting permissions for indexer indexer (1000:1000)
      Setting permissions for manager manager (999:999)
      Setting permissions for dashboard dashboard (1000:1000)
      Process completed.

Apply all manifests
~~~~~~~~~~~~~~~~~~~

The Wazuh Kubernetes cluster manifest for local cluster types is located in ``envs/local-env``.

You can adjust cluster resources by editing patch files in ``envs/local-env/``. These files override specific values in the base manifests for each environment, such as CPU, memory, and storage for persistent volumes.

.. note::

   Edit the following document to update ``image`` value for the Wazuh indexer, manager, and dashboard.

   -  Edit the manifest file ``wazuh/indexer_stack/wazuh-dashboard/dashboard-deploy.yaml`` that defines the Wazuh dashboard deployment. Locate the ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest``.
   -  Edit the manifest file ``wazuh/indexer_stack/wazuh-indexer/cluster/indexer-sts.yaml`` that defines the Wazuh indexer statefulset. Locate the ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest``.
   -  Edit the manifest file ``wazuh/wazuh_managers/wazuh-master-sts.yaml`` that defines the Wazuh manager master statefulset. Locate the ``initContainers`` and ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest``.
   -  Edit the manifest file ``wazuh/wazuh_managers/wazuh-workers-sts.yaml`` that defines the Wazuh manager worker statefulset. Locate the ``initContainers`` and ``containers`` section and replace the ``image`` value with ``wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest``.

#. Run the command below to deploy Traefik CRD:

   .. code-block:: console

      $ cd ..
      $ kubectl apply -f traefik/crd/

   .. code-block:: none
      :class: output

      customresourcedefinition.apiextensions.k8s.io/ingressroutes.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/ingressroutetcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/ingressrouteudps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/middlewares.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/middlewaretcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/serverstransports.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/serverstransporttcps.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/tlsoptions.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/tlsstores.traefik.io created
      customresourcedefinition.apiextensions.k8s.io/traefikservices.traefik.io created

#. Deploy the Wazuh cluster using the ``kustomization`` file:

   .. code-block:: console

      $ kubectl apply -k envs/local-env/

   .. note::

      For Kubernetes clusters running on Minikube, run the command below to load the docker images into Minikube before deploying the Wazuh Kubernetes cluster.

      .. code-block:: console

         # docker pull wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|
         # docker pull wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
         # docker pull wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|
         # minikube image load wazuh/wazuh-indexer:|WAZUH_CURRENT_KUBERNETES|
         # minikube image load wazuh/wazuh-manager:|WAZUH_CURRENT_KUBERNETES|
         # minikube image load wazuh/wazuh-dashboard:|WAZUH_CURRENT_KUBERNETES|

#. Run the following commands to expose the Wazuh manager ports for agent enrollment and connection service using port forwarding:

   .. code-block:: console

      $ kubectl -n wazuh port-forward service/wazuh-events 1514:1514
      $ kubectl -n wazuh port-forward service/wazuh-registration 1515:1515

#. Access the dashboard with port forwarding. The Wazuh Dashboard will be accessible on ``https://<KUBERNETES_HOST_IP_ADDRESS>:8443``:

   .. code-block:: console

      $ kubectl -n wazuh port-forward service/dashboard --address <KUBERNETES_HOST_IP_ADDRESS> 8443:443 > /tmp/wazuh-dashboard-port-forward.log 2>&1 &

   Replace ``<KUBERNETES_HOST_IP_ADDRESS>`` with the IP address of the Kubernetes endpoint:

   .. note::

      You can run the process in background by adding ``&`` to the ``port-forward`` command.

      .. code-block:: console

         $ kubectl -n wazuh port-forward service/wazuh-events 1514:1514 &
         $ kubectl -n wazuh port-forward service/wazuh-registration 1515:1515 &

Refer to the :ref:`verifying-the-deployment` section to confirm the deployment is successful.

.. _verifying-the-deployment:

Verifying the deployment
^^^^^^^^^^^^^^^^^^^^^^^^

Namespace
~~~~~~~~~

Run the following command to check that the Wazuh namespace is active:

.. code-block:: console

   $ kubectl get namespaces | grep wazuh

.. code-block:: none
   :class: output

   wazuh         Active    12m

Services
~~~~~~~~

Run the command below to view all running services in the Wazuh namespace:

.. code-block:: console

   $ kubectl get services -n wazuh

.. code-block:: none
   :class: output

   NAME                 TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)             AGE
   dashboard            ClusterIP   10.100.196.140   <none>        443/TCP             23m
   wazuh-api            ClusterIP   10.100.58.98     <none>        55000/TCP           23m
   wazuh-cluster        ClusterIP   None             <none>        1516/TCP            23m
   wazuh-events         ClusterIP   10.100.63.117    <none>        1514/TCP            23m
   wazuh-indexer        ClusterIP   None             <none>        9300/TCP,9200/TCP   23m
   wazuh-registration   ClusterIP   10.100.40.83     <none>        1515/TCP            23m

.. note::

   Record the External IP addresses for the ``wazuh-registration`` and ``wazuh-events`` services, as they are required during Wazuh agent installation.

   The ``wazuh-registration`` External IP is used as the Wazuh registration server IP address (port ``1515``), while the ``wazuh-events`` External IP is used as the Wazuh manager IP address for event transmission (port ``1514``) after enrollment.

Deployments
~~~~~~~~~~~

Run the command below to check for the deployments in the Wazuh namespace:

.. code-block:: console

   $ kubectl get deployments -n wazuh

.. code-block:: none
   :class: output

   NAME             DESIRED   CURRENT   UP-TO-DATE   AVAILABLE   AGE
   wazuh-dashboard  1         1         1            1           11m

StatefulSets
~~~~~~~~~~~~

Run the command below to check the active StatefulSets in the Wazuh namespace:

.. code-block:: console

   $ kubectl get statefulsets -n wazuh

.. code-block:: none
   :class: output

   NAME                   READY   AGE
   wazuh-indexer          3/3     15m
   wazuh-manager-master   1/1     15m
   wazuh-manager-worker   2/2     15m

Pods
~~~~

Run the command below to view the pods' status in the Wazuh namespace:

.. code-block:: console

   $ kubectl get pods -n wazuh

.. code-block:: none
   :class: output

   NAME                               READY   STATUS    RESTARTS   AGE
   wazuh-dashboard-57d455f894-ffwsk   1/1     Running   0          4h17m
   wazuh-indexer-0                    1/1     Running   0          4h17m
   wazuh-indexer-1                    1/1     Running   0          4h17m
   wazuh-indexer-2                    1/1     Running   0          4h17m
   wazuh-manager-master-0             1/1     Running   0          4h17m
   wazuh-manager-worker-0             1/1     Running   0          4h17m
   wazuh-manager-worker-1             1/1     Running   0          4h17m

Note that the Wazuh manager assigns a Wazuh agent enrollment password by default. Run the command below to confirm the password string.

.. code-block:: console

   # kubectl exec -it wazuh-manager-master-0 -n wazuh -- cat /var/ossec/etc/authd.pass

Accessing the Wazuh dashboard (EKS users only)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you created domain names for the services, access the dashboard at ``https://wazuh.<YOUR_DOMAIN>.com``. Otherwise, access the Wazuh dashboard using the ``EXTERNAL-IP`` address or hostname that your cloud provider assigned.

Check the services to view ``EXTERNAL-IP``:

   .. code-block:: console

      # kubectl -n traefik get svc

   .. code-block:: none
      :class: output

      NAME                                 TYPE           CLUSTER-IP      EXTERNAL-IP                                                                     PORT(S)                                                    AGE
      ingress-Traefik-controller             LoadBalancer   10.100.228.67   a0c363db4315d484fa38751820a9e89b-e1811181631efef0.elb.us-west-1.amazonaws.com   80:30561/TCP,443:32533/TCP,1514:31784/TCP,1515:31274/TCP   36s
      ingress-Traefik-controller-admission   ClusterIP      10.100.118.85   <none>                                                                          443/TCP                                                    35s

.. note::

   For a local cluster deployment where the ``EXTERNAL-IP`` address is not accessible, you can access the Wazuh dashboard using a ``port-forward`` as shown below:

   .. code-block:: console

      # kubectl -n wazuh port-forward --address <KUBERNETES_HOST_IP_ADDRESS> service/dashboard 8443:443 > /tmp/wazuh-dashboard-port-forward.log 2>&1 &

The Wazuh dashboard is accessible at ``https://<KUBERNETES_HOST>:8443``.

The default credentials are ``admin:admin``.

Deploying a Wazuh agent
-----------------------

This section provides steps to enroll a Wazuh agent in a Wazuh manager running in a Kubernetes environment and deploy a Wazuh agent on Kubernetes.

.. contents::
   :local:
   :depth: 1
   :backlinks: none

Enrolling a Wazuh agent
^^^^^^^^^^^^^^^^^^^^^^^

Follow the steps below to enroll a Wazuh agent in a Wazuh manager running in a Kubernetes environment.

#. Execute this command on the Kubernetes cluster and note the external IP of the load balancer:

   .. code-block:: console

      # kubectl -n traefik get svc

   .. code-block:: none
      :class: output

      NAME                                 TYPE           CLUSTER-IP      EXTERNAL-IP                                                                     PORT(S)                                                    AGE
      ingress-Traefik-controller             LoadBalancer   10.100.228.67   a0c363db4315d484fa38751820a9e89b-e1811181631efef0.elb.us-west-1.amazonaws.com   80:30561/TCP,443:32533/TCP,1514:31784/TCP,1515:31274/TCP   36s
      ingress-Traefik-controller-admission   ClusterIP      10.100.118.85   <none>                                                                          443/TCP                                                    35s

#. Note the following Wazuh agent deployment variables to simplify the installation, enrollment, and configuration process of the Wazuh agent.

   -  ``WAZUH_MANAGER``: External IP of the load balancer.
   -  ``WAZUH_AGENT_NAME``: Name of the new Wazuh agent to be enrolled.

#. Use the deployment variables to install the Wazuh agent using the :doc:`Wazuh agent installation </installation-guide/wazuh-agent/index>` guide. The example below shows the command to install the Wazuh agent on a Linux endpoint after adding the :ref:`Wazuh repository <agent-installation-add-wazuh-repository>`.

   .. code-block:: console

      # WAZUH_MANAGER="<WAZUH_MANAGER>" \
      WAZUH_AGENT_NAME="<WAZUH_AGENT_NAME>" \
      apt-get install -y wazuh-agent

   Replace:

   -  ``<WAZUH_MANAGER>`` with the external IP address of the load balancer.
   -  ``<WAZUH_AGENT_NAME>`` with the Wazuh agent name that will be used for enrollment.

#. Enable and start the Wazuh agent service with the following commands.

   .. code-block:: console

      # systemctl daemon-reload
      # systemctl enable wazuh-agent
      # systemctl start wazuh-agent

Wazuh agent deployment on Kubernetes
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The Wazuh agent can be deployed directly within your Kubernetes environment to monitor workloads, pods, and container activity. This setup provides visibility into the cluster's runtime behavior, helping detect threats and configuration issues at the container and node levels.

There are two main deployment models for Wazuh agents in Kubernetes:

-  **DaemonSet deployment** where one Wazuh agent runs on each node to monitor the node and all containers on that node.
-  **Sidecar deployment** where the Wazuh agent runs as a companion container alongside a specific application pod to monitor that application only.

Deploying the Wazuh agent as a DaemonSet
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This is the most common approach for full-cluster monitoring. Each node runs one agent, ensuring complete coverage without manual intervention when new nodes are added.

#. Create the Wazuh agent DaemonSet manifest ``wazuh-agent-daemonset.yaml``:

   .. tabs::

      .. group-tab:: EKS user

         .. code-block:: yaml
            :emphasize-lines: 84,90,167

            apiVersion: v1
            kind: Namespace
            metadata:
              name: wazuh-daemonset
            ---
            apiVersion: apps/v1
            kind: DaemonSet
            metadata:
              name: wazuh-agent
              namespace: wazuh-daemonset
            spec:
              selector:
                matchLabels:
                  app: wazuh-agent
              template:
                metadata:
                  labels:
                    app: wazuh-agent
                spec:
                  serviceAccountName: default
                  terminationGracePeriodSeconds: 20

                  #        INIT CONTAINERS
                  initContainers:
                    # 1) Clean stale PID / lock files
                    - name: cleanup-ossec-stale
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Cleaning old locks..."
                          mkdir -p /agent/var/run /agent/queue/ossec
                          rm -f /agent/var/run/*.pid || true
                          rm -f /agent/queue/ossec/*.lock || true
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent

                    # 2) Seed /var/ossec into hostPath (first run only)
                    - name: seed-ossec-tree
                      image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Checking if seeding is required..."
                          if [ ! -d /agent/bin ]; then
                            echo "[init] Seeding /var/ossec to hostPath..."
                            tar -C /var/ossec -cf - . | tar -C /agent -xpf -
                          else
                            echo "[init] Existing data found, skipping seed"
                          fi
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent

                    # 3) Fix ownership/permissions
                    - name: fix-permissions
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Fixing permissions..."
                          for d in etc logs queue var rids tmp "active-response"; do
                            [ -d "/agent/$d" ] && chown -R 999:999 "/agent/$d"
                          done
                          chown -R 0:0 /agent/bin /agent/lib || true
                          find /agent/bin -type f -exec chmod 0755 {} \; || true
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent

                    # 4) Write ossec.conf with PASSWORD ENROLLMENT
                    - name: write-ossec-config
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      env:
                        - name: WAZUH_MANAGER
                          value: "<EXTERNAL_IP_WAZUH_EVENTS>"
                        - name: WAZUH_PORT
                          value: "1514"
                        - name: WAZUH_PROTOCOL
                          value: "tcp"
                        - name: WAZUH_REGISTRATION_SERVER
                          value: "<EXTERNAL_IP_WAZUH_REGISTRATION>"
                        - name: WAZUH_REGISTRATION_PORT
                          value: "1515"
                        - name: NODE_NAME
                          valueFrom:
                            fieldRef:
                              fieldPath: spec.nodeName
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Writing ossec.conf..."
                          mkdir -p /agent/etc


                          cat > /agent/etc/ossec.conf <<EOF
                          <ossec_config>
                            <client>
                              <server>
                                <address>${WAZUH_MANAGER}</address>
                                <port>${WAZUH_PORT}</port>
                                <protocol>${WAZUH_PROTOCOL}</protocol>
                              </server>

                              <enrollment>
                                <enabled>yes</enabled>
                                <agent_name>${NODE_NAME}</agent_name>
                                <manager_address>${WAZUH_REGISTRATION_SERVER}</manager_address>
                                <port>${WAZUH_REGISTRATION_PORT}</port>
                                <authorization_pass_path>/var/ossec/etc/authd.pass</authorization_pass_path>
                              </enrollment>
                            </client>
                          </ossec_config>
                          EOF

                          chown 999:999 /agent/etc/ossec.conf
                          chmod 0640 /agent/etc/ossec.conf
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent

                    # 5) Copy authd.pass from Secret and fix ownership
                    - name: fix-authd-pass-perms
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Copying authd.pass from Secret..."
                          mkdir -p /agent/etc
                          cp /secret/authd.pass /agent/etc/authd.pass
                          chown 0:999 /agent/etc/authd.pass
                          chmod 0640 /agent/etc/authd.pass
                          ls -l /agent/etc/authd.pass
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent
                        - name: wazuh-authd-pass
                          mountPath: /secret/authd.pass
                          subPath: authd.pass
                          readOnly: true


                  #        MAIN CONTAINER
                  containers:
                    - name: wazuh-agent
                      image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          ln -sf /var/ossec/etc/ossec.conf /etc/ossec.conf || true
                          exec /init
                      env:
                        - name: WAZUH_MANAGER
                          value: "<EXTERNAL_IP_WAZUH_EVENTS>"
                        - name: NODE_NAME
                          valueFrom:
                            fieldRef:
                              fieldPath: spec.nodeName
                      securityContext:
                        runAsUser: 0
                        allowPrivilegeEscalation: true
                        capabilities:
                          add: ["SETGID","SETUID"]
                      volumeMounts:
                        - name: varlog
                          mountPath: /var/log
                          readOnly: true
                        - name: ossec-data
                          mountPath: /var/ossec


                  #            VOLUMES
                  volumes:
                    - name: varlog
                      hostPath:
                        path: /var/log
                        type: Directory
                    - name: ossec-data
                      hostPath:
                        path: /var/lib/wazuh
                        type: DirectoryOrCreate
                    - name: wazuh-authd-pass
                      secret:
                        secretName: wazuh-authd-pass

      .. group-tab:: Other cluster types

         .. code-block:: yaml
            :emphasize-lines: 84,90,167

            apiVersion: v1
            kind: Namespace
            metadata:
              name: wazuh-daemonset
            ---
            apiVersion: apps/v1
            kind: DaemonSet
            metadata:
              name: wazuh-agent
              namespace: wazuh-daemonset
            spec:
              selector:
                matchLabels:
                  app: wazuh-agent
              template:
                metadata:
                  labels:
                    app: wazuh-agent
                spec:
                  serviceAccountName: default
                  terminationGracePeriodSeconds: 20

                  #        INIT CONTAINERS
                  initContainers:
                    # 1) Clean stale PID / lock files
                    - name: cleanup-ossec-stale
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Cleaning old locks..."
                          mkdir -p /agent/var/run /agent/queue/ossec
                          rm -f /agent/var/run/*.pid || true
                          rm -f /agent/queue/ossec/*.lock || true
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent

                    # 2) Seed /var/ossec into hostPath (first run only)
                    - name: seed-ossec-tree
                      image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Checking if seeding is required..."
                          if [ ! -d /agent/bin ]; then
                            echo "[init] Seeding /var/ossec to hostPath..."
                            tar -C /var/ossec -cf - . | tar -C /agent -xpf -
                          else
                            echo "[init] Existing data found, skipping seed"
                          fi
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent

                    # 3) Fix ownership/permissions
                    - name: fix-permissions
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Fixing permissions..."
                          for d in etc logs queue var rids tmp "active-response"; do
                            [ -d "/agent/$d" ] && chown -R 999:999 "/agent/$d"
                          done
                          chown -R 0:0 /agent/bin /agent/lib || true
                          find /agent/bin -type f -exec chmod 0755 {} \; || true
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent

                    # 4) Write ossec.conf with PASSWORD ENROLLMENT
                    - name: write-ossec-config
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      env:
                        - name: WAZUH_MANAGER
                          value: "<EXTERNAL_IP_WAZUH_EVENTS>"
                        - name: WAZUH_PORT
                          value: "1514"
                        - name: WAZUH_PROTOCOL
                          value: "tcp"
                        - name: WAZUH_REGISTRATION_SERVER
                          value: "<EXTERNAL_IP_WAZUH_REGISTRATION>"
                        - name: WAZUH_REGISTRATION_PORT
                          value: "1515"
                        - name: NODE_NAME
                          valueFrom:
                            fieldRef:
                              fieldPath: spec.nodeName
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Writing ossec.conf..."
                          mkdir -p /agent/etc


                          cat > /agent/etc/ossec.conf <<EOF
                          <ossec_config>
                            <client>
                              <server>
                                <address>${WAZUH_MANAGER}</address>
                                <port>${WAZUH_PORT}</port>
                                <protocol>${WAZUH_PROTOCOL}</protocol>
                              </server>

                              <enrollment>
                                <enabled>yes</enabled>
                                <agent_name>${NODE_NAME}</agent_name>
                                <manager_address>${WAZUH_REGISTRATION_SERVER}</manager_address>
                                <port>${WAZUH_REGISTRATION_PORT}</port>
                                <authorization_pass_path>/var/ossec/etc/authd.pass</authorization_pass_path>
                              </enrollment>
                            </client>
                          </ossec_config>
                          EOF

                          chown 999:999 /agent/etc/ossec.conf
                          chmod 0640 /agent/etc/ossec.conf
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent

                    # 5) Copy authd.pass from Secret and fix ownership
                    - name: fix-authd-pass-perms
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "[init] Copying authd.pass from Secret..."
                          mkdir -p /agent/etc
                          cp /secret/authd.pass /agent/etc/authd.pass
                          chown 0:999 /agent/etc/authd.pass
                          chmod 0640 /agent/etc/authd.pass
                          ls -l /agent/etc/authd.pass
                      volumeMounts:
                        - name: ossec-data
                          mountPath: /agent
                        - name: wazuh-authd-pass
                          mountPath: /secret/authd.pass
                          subPath: authd.pass
                          readOnly: true


                  #        MAIN CONTAINER
                  containers:
                    - name: wazuh-agent
                      image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest
                      imagePullPolicy: IfNotPresent
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          ln -sf /var/ossec/etc/ossec.conf /etc/ossec.conf || true
                          exec /init
                      env:
                        - name: WAZUH_MANAGER
                          value: "<EXTERNAL_IP_WAZUH_EVENTS>"
                        - name: NODE_NAME
                          valueFrom:
                            fieldRef:
                              fieldPath: spec.nodeName
                      securityContext:
                        runAsUser: 0
                        allowPrivilegeEscalation: true
                        capabilities:
                          add: ["SETGID","SETUID"]
                      volumeMounts:
                        - name: varlog
                          mountPath: /var/log
                          readOnly: true
                        - name: dockersock
                          mountPath: /var/run/docker.sock
                          readOnly: true
                        - name: ossec-data
                          mountPath: /var/ossec


                  #            VOLUMES
                  volumes:
                    - name: varlog
                      hostPath:
                        path: /var/log
                        type: Directory
                    - name: dockersock
                      hostPath:
                        path: /var/run/docker.sock
                        type: Socket
                    - name: ossec-data
                      hostPath:
                        path: /var/lib/wazuh
                        type: DirectoryOrCreate
                    - name: wazuh-authd-pass
                      secret:
                        secretName: wazuh-authd-pass

   .. note::

      The manifest in this example is for the Docker container runtime.

   Replace:

   -  ``<EXTERNAL_IP_WAZUH_EVENTS>`` with the external IP of the ``wazuh-events`` load balancer.
   -  ``<EXTERNAL_IP_WAZUH_REGISTRATION>`` with the external IP of the ``wazuh_registration`` load balancer.

#. Create the namespace:

   .. code-block:: console

      $ kubectl create namespace wazuh-daemonset

#. Create the Kubernetes secret for the enrollment password:

   .. code-block:: console

      $ kubectl create secret generic wazuh-authd-pass \
        -n wazuh-daemonset \
        --from-literal=authd.pass=password

   .. note::

      The default password for enrolling the Wazuh agent in your Kubernetes cluster is ``password``. This value is stored in the ``/var/wazuh-manager/etc/authd.pass`` file on the Wazuh Manager.

#. Deploy the Wazuh agent:

   .. code-block:: console

      $ kubectl apply -f wazuh-agent-daemonset.yaml

#. Verify that the Wazuh agent is deployed across all nodes with the following command:

   .. code-block:: console

      $ kubectl get pods -n wazuh-daemonset -o wide

   .. code-block:: none
      :class: output

      NAME                READY   STATUS    RESTARTS   AGE   IP          NODE     NOMINATED NODE   READINESS GATES
      wazuh-agent-t2fwl   1/1     Running   0          21m   10.42.0.9   server   <none>           <none>

Deploying the Wazuh agent as a Sidecar
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The sidecar approach is ideal for targeted monitoring of sensitive applications or workloads that require isolated log collection. Perform the steps below to deploy Wazuh as a Sidecar:

#. Modify your application's deployment to include the Wazuh agent container. In the example below, we deploy Wazuh alongside the Apache Tomcat application from the ``wazuh-agent-sidecar.yaml`` deployment file:

   .. tabs::

      .. group-tab:: EKS user

         .. code-block:: yaml
            :emphasize-lines: 72,78,178,184

            apiVersion: v1
            kind: Namespace
            metadata:
              name: wazuh-sidecar
            ---
            apiVersion: apps/v1
            kind: StatefulSet
            metadata:
              name: tomcat-wazuh-agent
              namespace: wazuh-sidecar
            spec:
              serviceName: tomcat-app
              replicas: 1
              selector:
                matchLabels:
                  app: tomcat-wazuh-agent
              template:
                metadata:
                  labels:
                    app: tomcat-wazuh-agent
                spec:
                  terminationGracePeriodSeconds: 20
                  securityContext:
                    fsGroup: 999
                    fsGroupChangePolicy: OnRootMismatch

                  #        INIT CONTAINERS
                  initContainers:
                    - name: cleanup-ossec-stale
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      securityContext:
                        runAsUser: 0
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          mkdir -p /agent/var/run /agent/queue/ossec
                          rm -f /agent/var/run/*.pid || true
                          rm -f /agent/queue/ossec/*.lock || true
                          echo "Cleanup complete. Ready for next init step."
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /agent

                    - name: seed-ossec-tree
                      image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest
                      imagePullPolicy: IfNotPresent
                      securityContext:
                        runAsUser: 0
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          if [ ! -d /agent/bin ]; then
                            echo "Seeding /var/ossec into PVC..."
                            tar -C /var/ossec -cf - . | tar -C /agent -xpf -
                          else
                            echo "Existing Wazuh data found, skipping seed."
                          fi
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /agent

                    - name: write-ossec-config
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      securityContext:
                        runAsUser: 0
                      env:
                        - name: WAZUH_MANAGER
                          value: "<EXTERNAL_IP_WAZUH_EVENTS>"
                        - name: WAZUH_PORT
                          value: "1514"
                        - name: WAZUH_PROTOCOL
                          value: "tcp"
                        - name: WAZUH_REGISTRATION_SERVER
                          value: "<EXTERNAL_IP_WAZUH_REGISTRATION>"
                        - name: WAZUH_REGISTRATION_PORT
                          value: "1515"
                        - name: WAZUH_AGENT_NAME
                          valueFrom:
                            fieldRef:
                              fieldPath: metadata.name
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          mkdir -p /agent/etc
                          cat > /agent/etc/ossec.conf <<'EOF'
                          <ossec_config>
                            <client>
                              <server>
                                <address>${WAZUH_MANAGER}</address>
                                <port>${WAZUH_PORT}</port>
                                <protocol>${WAZUH_PROTOCOL}</protocol>
                              </server>
                              <enrollment>
                                <enabled>yes</enabled>
                                <agent_name>${WAZUH_AGENT_NAME}</agent_name>
                                <manager_address>${WAZUH_REGISTRATION_SERVER}</manager_address>
                                <port>${WAZUH_REGISTRATION_PORT}</port>
                                <authorization_pass_path>/var/ossec/etc/authd.pass</authorization_pass_path>
                              </enrollment>
                            </client>
                            <localfile>
                              <log_format>syslog</log_format>
                              <location>/usr/local/tomcat/logs/catalina.out</location>
                            </localfile>
                          </ossec_config>
                          EOF

                          sed -i \
                            -e "s|\${WAZUH_MANAGER}|${WAZUH_MANAGER}|g" \
                            -e "s|\${WAZUH_PORT}|${WAZUH_PORT}|g" \
                            -e "s|\${WAZUH_PROTOCOL}|${WAZUH_PROTOCOL}|g" \
                            -e "s|\${WAZUH_REGISTRATION_SERVER}|${WAZUH_REGISTRATION_SERVER}|g" \
                            -e "s|\${WAZUH_REGISTRATION_PORT}|${WAZUH_REGISTRATION_PORT}|g" \
                            -e "s|\${WAZUH_AGENT_NAME}|${WAZUH_AGENT_NAME}|g" \
                            /agent/etc/ossec.conf

                          chown 999:999 /agent/etc/ossec.conf
                          chmod 0640 /agent/etc/ossec.conf
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /agent

                    - name: fix-authd-pass-perms
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      securityContext:
                        runAsUser: 0
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "Copying authd.pass from Secret..."
                          mkdir -p /agent/etc
                          cp /secret/authd.pass /agent/etc/authd.pass
                          chown 0:999 /agent/etc/authd.pass
                          chmod 0640 /agent/etc/authd.pass
                          ls -l /agent/etc/authd.pass
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /agent
                        - name: wazuh-authd-pass
                          mountPath: /secret/authd.pass
                          subPath: authd.pass
                          readOnly: true


                  #        MAIN CONTAINERS
                  containers:
                    - name: tomcat
                      image: tomcat:10.1-jdk17
                      imagePullPolicy: IfNotPresent
                      ports:
                        - containerPort: 8080
                      volumeMounts:
                        - name: application-data
                          mountPath: /usr/local/tomcat/logs

                    - name: wazuh-agent
                      image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest
                      imagePullPolicy: IfNotPresent
                      lifecycle:
                        preStop:
                          exec:
                            command: ["/bin/sh", "-lc", "/var/ossec/bin/ossec-control stop || true; sleep 2"]
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          ln -sf /var/ossec/etc/ossec.conf /etc/ossec.conf
                          exec /init
                      env:
                        - name: WAZUH_MANAGER
                          value: "<EXTERNAL_IP_WAZUH_EVENTS>"
                        - name: WAZUH_PORT
                          value: "1514"
                        - name: WAZUH_PROTOCOL
                          value: "tcp"
                        - name: WAZUH_REGISTRATION_SERVER
                          value: "<EXTERNAL_IP_WAZUH_REGISTRATION>"
                        - name: WAZUH_REGISTRATION_PORT
                          value: "1515"
                        - name: WAZUH_AGENT_NAME
                          valueFrom:
                            fieldRef:
                              fieldPath: metadata.name
                      securityContext:
                        runAsUser: 0
                        runAsGroup: 0
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /var/ossec
                        - name: application-data
                          mountPath: /usr/local/tomcat/logs

                  #            VOLUMES
                  volumes:
                    - name: wazuh-authd-pass
                      secret:
                        secretName: wazuh-authd-pass

              volumeClaimTemplates:
                - metadata:
                    name: wazuh-agent-data
                  spec:
                    accessModes: ["ReadWriteOnce"]
                    storageClassName: gp2  # Adjust according to your cluster's StorageClass
                    resources:
                      requests:
                        storage: 3Gi
                - metadata:
                    name: application-data
                  spec:
                    accessModes: ["ReadWriteOnce"]
                    storageClassName: gp2  # Adjust according to your cluster's StorageClass
                    resources:
                      requests:
                        storage: 5Gi
            ---
            apiVersion: v1
            kind: Service
            metadata:
              name: tomcat-app
              namespace: wazuh-sidecar
            spec:
              selector:
                app: tomcat-wazuh-agent
              type: NodePort
              ports:
                - protocol: TCP
                  port: 80
                  targetPort: 8080
                  nodePort: 30013

              type: NodePort
              ports:
                - protocol: TCP
                  port: 80
                  targetPort: 8080
                  nodePort: 30013

         .. note::

            Before applying the manifest, confirm the StorageClass names in your cluster by running the command ``kubectl get sc``. In this example, the cluster uses the ``gp2`` StorageClass.

      .. group-tab:: Other cluster types

         .. code-block:: yaml
            :emphasize-lines: 72,78,178,184

            apiVersion: v1
            kind: Namespace
            metadata:
              name: wazuh-sidecar
            ---
            apiVersion: apps/v1
            kind: StatefulSet
            metadata:
              name: tomcat-wazuh-agent
              namespace: wazuh-sidecar
            spec:
              serviceName: tomcat-app
              replicas: 1
              selector:
                matchLabels:
                  app: tomcat-wazuh-agent
              template:
                metadata:
                  labels:
                    app: tomcat-wazuh-agent
                spec:
                  terminationGracePeriodSeconds: 20
                  securityContext:
                    fsGroup: 999
                    fsGroupChangePolicy: OnRootMismatch

                  #        INIT CONTAINERS
                  initContainers:
                    - name: cleanup-ossec-stale
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      securityContext:
                        runAsUser: 0
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          mkdir -p /agent/var/run /agent/queue/ossec
                          rm -f /agent/var/run/*.pid || true
                          rm -f /agent/queue/ossec/*.lock || true
                          echo "Cleanup complete. Ready for next init step."
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /agent

                    - name: seed-ossec-tree
                      image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest
                      imagePullPolicy: IfNotPresent
                      securityContext:
                        runAsUser: 0
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          if [ ! -d /agent/bin ]; then
                            echo "Seeding /var/ossec into PVC..."
                            tar -C /var/ossec -cf - . | tar -C /agent -xpf -
                          else
                            echo "Existing Wazuh data found, skipping seed."
                          fi
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /agent

                    - name: write-ossec-config
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      securityContext:
                        runAsUser: 0
                      env:
                        - name: WAZUH_MANAGER
                          value: "<EXTERNAL_IP_WAZUH_EVENTS>"
                        - name: WAZUH_PORT
                          value: "1514"
                        - name: WAZUH_PROTOCOL
                          value: "tcp"
                        - name: WAZUH_REGISTRATION_SERVER
                          value: "<EXTERNAL_IP_WAZUH_REGISTRATION>"
                        - name: WAZUH_REGISTRATION_PORT
                          value: "1515"
                        - name: WAZUH_AGENT_NAME
                          valueFrom:
                            fieldRef:
                              fieldPath: metadata.name
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          mkdir -p /agent/etc
                          cat > /agent/etc/ossec.conf <<'EOF'
                          <ossec_config>
                            <client>
                              <server>
                                <address>${WAZUH_MANAGER}</address>
                                <port>${WAZUH_PORT}</port>
                                <protocol>${WAZUH_PROTOCOL}</protocol>
                              </server>
                              <enrollment>
                                <enabled>yes</enabled>
                                <agent_name>${WAZUH_AGENT_NAME}</agent_name>
                                <manager_address>${WAZUH_REGISTRATION_SERVER}</manager_address>
                                <port>${WAZUH_REGISTRATION_PORT}</port>
                                <authorization_pass_path>/var/ossec/etc/authd.pass</authorization_pass_path>
                              </enrollment>
                            </client>
                            <localfile>
                              <log_format>syslog</log_format>
                              <location>/usr/local/tomcat/logs/catalina.out</location>
                            </localfile>
                          </ossec_config>
                          EOF

                          sed -i \
                            -e "s|\${WAZUH_MANAGER}|${WAZUH_MANAGER}|g" \
                            -e "s|\${WAZUH_PORT}|${WAZUH_PORT}|g" \
                            -e "s|\${WAZUH_PROTOCOL}|${WAZUH_PROTOCOL}|g" \
                            -e "s|\${WAZUH_REGISTRATION_SERVER}|${WAZUH_REGISTRATION_SERVER}|g" \
                            -e "s|\${WAZUH_REGISTRATION_PORT}|${WAZUH_REGISTRATION_PORT}|g" \
                            -e "s|\${WAZUH_AGENT_NAME}|${WAZUH_AGENT_NAME}|g" \
                            /agent/etc/ossec.conf

                          chown 999:999 /agent/etc/ossec.conf
                          chmod 0640 /agent/etc/ossec.conf
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /agent

                    - name: fix-authd-pass-perms
                      image: busybox:1.36
                      imagePullPolicy: IfNotPresent
                      securityContext:
                        runAsUser: 0
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          echo "Copying authd.pass from Secret..."
                          mkdir -p /agent/etc
                          cp /secret/authd.pass /agent/etc/authd.pass
                          chown 0:999 /agent/etc/authd.pass
                          chmod 0640 /agent/etc/authd.pass
                          ls -l /agent/etc/authd.pass
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /agent
                        - name: wazuh-authd-pass
                          mountPath: /secret/authd.pass
                          subPath: authd.pass
                          readOnly: true


                  #        MAIN CONTAINERS
                  containers:
                    - name: tomcat
                      image: tomcat:10.1-jdk17
                      imagePullPolicy: IfNotPresent
                      ports:
                        - containerPort: 8080
                      volumeMounts:
                        - name: application-data
                          mountPath: /usr/local/tomcat/logs

                    - name: wazuh-agent
                      image: wazuh/wazuh-agent:|WAZUH_CURRENT_KUBERNETES|-|WAZUH_CURRENT_KUBERNETES_REV|-latest
                      imagePullPolicy: IfNotPresent
                      lifecycle:
                        preStop:
                          exec:
                            command: ["/bin/sh", "-lc", "/var/ossec/bin/ossec-control stop || true; sleep 2"]
                      command: ["/bin/sh", "-lc"]
                      args:
                        - |
                          set -e
                          ln -sf /var/ossec/etc/ossec.conf /etc/ossec.conf
                          exec /init
                      env:
                        - name: WAZUH_MANAGER
                          value: "<EXTERNAL_IP_WAZUH_EVENTS>"
                        - name: WAZUH_PORT
                          value: "1514"
                        - name: WAZUH_PROTOCOL
                          value: "tcp"
                        - name: WAZUH_REGISTRATION_SERVER
                          value: "<EXTERNAL_IP_WAZUH_REGISTRATION>"
                        - name: WAZUH_REGISTRATION_PORT
                          value: "1515"
                        - name: WAZUH_AGENT_NAME
                          valueFrom:
                            fieldRef:
                              fieldPath: metadata.name
                      securityContext:
                        runAsUser: 0
                        runAsGroup: 0
                      volumeMounts:
                        - name: wazuh-agent-data
                          mountPath: /var/ossec
                        - name: application-data
                          mountPath: /usr/local/tomcat/logs

                  #            VOLUMES
                  volumes:
                    - name: wazuh-authd-pass
                      secret:
                        secretName: wazuh-authd-pass

              volumeClaimTemplates:
                - metadata:
                    name: wazuh-agent-data
                  spec:
                    accessModes: ["ReadWriteOnce"]
                    resources:
                      requests:
                        storage: 3Gi
                - metadata:
                    name: application-data
                  spec:
                    accessModes: ["ReadWriteOnce"]
                    resources:
                      requests:
                        storage: 5Gi
            ---
            apiVersion: v1
            kind: Service
            metadata:
              name: tomcat-app
              namespace: wazuh-sidecar
            spec:
              selector:
                app: tomcat-wazuh-agent
              type: NodePort
              ports:
                - protocol: TCP
                  port: 80
                  targetPort: 8080
                  nodePort: 30013

   .. note::

      The manifest in this example is for the Docker container runtime.

   Replace:

   -  ``<EXTERNAL_IP_WAZUH_EVENTS>`` with the external IP of the ``wazuh-events`` load balancer.
   -  ``<EXTERNAL_IP_WAZUH_REGISTRATION>`` with the external IP of the ``wazuh_registration`` load balancer.

#. Create the namespace for the Wazuh agent and the Node.js application:

   .. code-block:: console

      # kubectl create namespace wazuh-sidecar

#. Create the Kubernetes secret for the enrollment password:

   .. code-block:: console

      $ kubectl create secret generic wazuh-authd-pass \
        -n wazuh-sidecar \
        --from-literal=authd.pass=password

   .. note::

      The default password for enrolling the Wazuh agent in your Kubernetes cluster is ``password``. This value is stored in the ``/var/wazuh-manager/etc/authd.pass`` file on the Wazuh manager.

#. Deploy the sidecar setup:

   .. code-block:: console

      # kubectl apply -f wazuh-agent-sidecar.yaml

#. Run the command below to confirm that the ``tomcat-wazuh-agent`` pod is running:

   .. code-block:: console

      # kubectl get pods -n wazuh-sidecar

   .. code-block:: none
      :class: output

      NAME                           READY   STATUS     RESTARTS   AGE
      tomcat-wazuh-agent-0   2/2     Running           0          18s
