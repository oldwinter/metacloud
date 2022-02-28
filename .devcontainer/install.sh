
# 镜像如果不是vscode启动,需要手动执行docker-init脚本;
# docker run -it --privileged -u 1000  f5d bash
# /usr/local/share/docker-init.sh

# process.env.WORKSPACE_DIR = ""

###! docker in docker

# 安装常用工具
npm i -g zx && npm i -g http-server


sudo chown -R $USER $HOME/.minikube; chmod -R u+wrx $HOME/.minikube
# 安装minikube集群
minikube start \
  --addons registry --addons ingress #--addons istio

# 起第二个集群
# minikube start -p cluster2

# 安装istio, 一般用istioctl命令或helm安装 https://istio.io/latest/docs/setup/install/helm/

curl -L https://istio.io/downloadIstio | sh -
cd istio-*
sudo cp bin/istioctl /usr/local/bin

istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled

kubectl wait --for=condition=Ready pods --all -n kube-system  --timeout=1200s

# 安装Prometheus
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/prometheus.yaml
# 安装grafana
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/grafana.yaml
# 安装jaeger
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/jaeger.yaml
# 安装可视化 kiali 
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/kiali.yaml

kubectl wait --for=condition=Ready pods --all -n istio-system  --timeout=1200s


istioctl dashboard kiali &
istioctl dashboard jaeger &
istioctl dashboard grafana &
istioctl dashboard prometheus &



# nohup kubectl port-forward svc/kiali 20001:20001 -n istio-system >/dev/null 2>&1 &
# kiali:20001  jaeger:16686   grafana:3000  skywalking:8080

# 将 minikube cli所在机器的5000端口转发至service/registry 的80cluster端口,它会帮我们转发至内部的registry的5000端口
nohup kubectl port-forward --namespace kube-system service/registry 5000:80 >/dev/null 2>&1 &




# 安装skywalking https://skywalking.apache.org/zh/observe-service-mesh-with-skywalking-and-envoy-access-log-service/
# istioctl  manifest install \
#         --set meshConfig.enableEnvoyAccessLogService=true \
#         --set meshConfig.defaultConfig.envoyAccessLogService.address=skywalking-oap.istio-system:11800

# export SKYWALKING_RELEASE_NAME=skywalking  # change the release name according to your scenario
# export SKYWALKING_RELEASE_NAMESPACE=istio-system  # change the namespace to where you want to install SkyWalking
# export REPO=skywalking
# helm repo add ${REPO} https://apache.jfrog.io/artifactory/skywalking-helm                                
# helm install "${SKYWALKING_RELEASE_NAME}" ${REPO}/skywalking -n "${SKYWALKING_RELEASE_NAMESPACE}" \
#         --set oap.storageType='h2' \
#         --set ui.image.tag=8.8.1 \
#         --set oap.image.tag=8.8.1 \
#         --set oap.replicas=1 \
#         --set oap.env.SW_ENVOY_METRIC_ALS_HTTP_ANALYSIS=k8s-mesh \
#         --set oap.envoy.als.enabled=true 
#         # helm -n istio-system install skywalking skywalking \
#         # --set oap.storageType='h2'\
#         # --set ui.image.tag=8.3.0 \
#         # --set oap.image.tag=8.3.0-es7 \
#         # --set oap.replicas=1 \
#         # --set oap.env.SW_ENVOY_METRIC_ALS_HTTP_ANALYSIS=k8s-mesh \
#         # --set oap.env.JAVA_OPTS='-Dmode=' \
#         # --set oap.envoy.als.enabled=true \
#         # --set elasticsearch.enabled=false


# nohup kubectl port-forward svc/skywalking-ui 8080:80 --namespace istio-system >/dev/null 2>&1 &