#!/usr/bin/env zx

// minikube + istio环境安装
// 执行前需要确保 minikube kubectl 和 helm 的二进制已经安装

await $`minikube start \
        --addons registry --addons ingress \
        --apiserver-names 127.0.0.1 host.docker.internal`

await $`helm repo add istio https://istio-release.storage.googleapis.com/charts
        helm repo update
        kubectl create namespace istio-system
        helm install istio-base istio/base -n istio-system
        helm install istiod istio/istiod -n istio-system 
        kubectl label namespace default istio-injection=enabled`

await $`kubectl create namespace istio-ingress
kubectl label namespace istio-ingress istio-injection=enabled
helm install istio-ingress istio/gateway -n istio-ingress `

// # 安装Prometheus
// # 安装grafana
// # 安装jaeger
await $`
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/prometheus.yaml

kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/grafana.yaml

kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/jaeger.yaml
`

await $`
    helm install \
    --namespace istio-system \
    --set auth.strategy="anonymous" \
    --repo https://kiali.org/helm-charts \
    kiali-server \
    kiali-server
`
// 如果是本地minikube ，得设置insucure repo。https://minikube.sigs.k8s.io/docs/handbook/pushing/#4-pushing-to-an-in-cluster-using-registry-addon

// await $`
// nohup kubectl port-forward --namespace kube-system service/registry 5000:80 >/dev/null 2>&1 &
// `
