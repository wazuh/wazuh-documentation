.. Copyright (C) 2015, Wazuh, Inc.

.. meta::
  :description: Learn more about the what values the Wazuh chart has. 

Wazuh Chart Values
==================

.. list-table::
   :header-rows: 1

   * - Key
     - Type
     - Default
     - Description
   * - dashboard.affinity
     - object
     - `{}`
     - 
   * - dashboard.config.ServerSSL
     - bool
     - `true`
     - 
   * - dashboard.config.dashboardCustomConfig
     - string
     - `""`
     - The configmap name that includes the dashboard custom config file. Must have the key 'opensearch_dashboards.yml'.
   * - dashboard.config.secrets.dashboardPassword
     - string
     - `"kibanaserver"`
     - 
   * - dashboard.config.secrets.dashboardUsername
     - string
     - `"kibanaserver"`
     - WARN: Those are the default indexer dashboard credentials, do not change unless you changed the passwords and the usernames using the indexerInternalUsersSecretName in the indexer section.
   * - dashboard.config.secrets.existingSecretName
     - string
     - `""`
     - The secret must have the following keys: DASHBOARD_USERNAME, DASHBOARD_PASSWORD.
   * - dashboard.image.pullPolicy
     - string
     - `"IfNotPresent"`
     - 
   * - dashboard.image.repository
     - string
     - `"wazuh/wazuh-dashboard"`
     - 
   * - dashboard.image.tag
     - string
     - `"4.8.2"`
     - 
   * - dashboard.imagePullSecrets
     - list
     - `[]`
     - 
   * - dashboard.ingress.annotations
     - object
     - `{}`
     - 
   * - dashboard.ingress.className
     - string
     - `"nginx"`
     - 
   * - dashboard.ingress.enabled
     - bool
     - `false`
     - 
   * - dashboard.ingress.hosts[0].host
     - string
     - `"chart-example.local"`
     - 
   * - dashboard.ingress.hosts[0].paths[0].path
     - string
     - `"/"`
     - 
   * - dashboard.ingress.hosts[0].paths[0].pathType
     - string
     - `"ImplementationSpecific"`
     - 
   * - dashboard.ingress.tls
     - list
     - `[]`
     - 
   * - dashboard.livenessProbe.failureThreshold
     - int
     - `3`
     - 
   * - dashboard.livenessProbe.httpGet.path
     - string
     - `"/"`
     - 
   * - dashboard.livenessProbe.httpGet.port
     - string
     - `"dashboard"`
     - 
   * - dashboard.livenessProbe.initialDelaySeconds
     - int
     - `60`
     - 
   * - dashboard.livenessProbe.periodSeconds
     - int
     - `10`
     - 
   * - dashboard.livenessProbe.successThreshold
     - int
     - `1`
     - 
   * - dashboard.livenessProbe.timeoutSeconds
     - int
     - `5`
     - 
   * - dashboard.nodeSelector
     - object
     - `{}`
     - 
   * - dashboard.podAnnotations
     - object
     - `{}`
     - 
   * - dashboard.podLabels
     - object
     - `{}`
     - 
   * - dashboard.podSecurityContext
     - object
     - `{}`
     - 
   * - dashboard.readinessProbe.failureThreshold
     - int
     - `3`
     - 
   * - dashboard.readinessProbe.httpGet.path
     - string
     - `"/"`
     - 
   * - dashboard.readinessProbe.httpGet.port
     - string
     - `"dashboard"`
     - 
   * - dashboard.readinessProbe.initialDelaySeconds
     - int
     - `60`
     - 
   * - dashboard.readinessProbe.periodSeconds
     - int
     - `10`
     - 
   * - dashboard.readinessProbe.successThreshold
     - int
     - `1`
     - 
   * - dashboard.readinessProbe.timeoutSeconds
     - int
     - `5`
     - 
   * - dashboard.replicaCount
     - int
     - `1`
     - 
   * - dashboard.resources
     - object
     - `{}`
     - 
   * - dashboard.securityContext
     - object
     - `{}`
     - 
   * - dashboard.service.port
     - int
     - `5601`
     - 
   * - dashboard.service.type
     - string
     - `"ClusterIP"`
     - 
   * - dashboard.tolerations
     - list
     - `[]`
     - 
   * - dashboard.volumeMounts
     - list
     - `[]`
     - 
   * - dashboard.volumes
     - list
     - `[]`
     - 
   * - fullnameOverride
     - string
     - `""`
     - 
   * - global.indexerUrl
     - string
     - `"https://wazuh-indexer:9200"`
     - 
   * - global.wazuhApiUrl
     - string
     - `"https://wazuh-master"`
     - 
   * - indexer.affinity
     - object
     - `{}`
     - 
   * - indexer.config.indexerCustomConfig
     - string
     - `""`
     - 
   * - indexer.config.indexerInternalUsersSecretName
     - string
     - `""`
     - 
   * - indexer.config.sslEnabled
     - bool
     - `true`
     - 
   * - indexer.image.pullPolicy
     - string
     -
     -