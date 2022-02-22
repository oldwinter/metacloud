
# 镜像如果不是vscode启动,需要手动执行docker-init脚本;
# docker run -it --privileged -u 1000  f5d bash
# /usr/local/share/docker-init.sh

# process.env.WORKSPACE_DIR = ""

# 安装minikube集群
minikube start \
# --memory 6g \ ## 提示: Your cgroup does not allow setting memory.
--addons registry --addons ingress #--addons istio

# 起第二个集群
# minikube start -p cluster2

# 安装istio, 一般用istioctl命令或helm安装 https://istio.io/latest/docs/setup/install/helm/
helm repo add istio https://istio-release.storage.googleapis.com/charts
helm repo update
kubectl create namespace istio-system
helm install istio-base istio/base -n istio-system
helm install istiod istio/istiod -n istio-system --wait
kubectl label namespace default istio-injection=enabled

# 安装istio-ingress
kubectl create namespace istio-ingress
kubectl label namespace istio-ingress istio-injection=enabled
helm install istio-ingress istio/gateway -n istio-ingress --wait

# 安装Prometheus
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/prometheus.yaml
# 安装grafana
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/grafana.yaml
# 安装jaeger
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.13/samples/addons/jaeger.yaml


# 安装可视化 kiali ,依赖prometheus采集上报的数据
helm install \
  --namespace istio-system \
  --set auth.strategy="anonymous" \
  --repo https://kiali.org/helm-charts \
  kiali-server \
  kiali-server

nohup kubectl port-forward svc/kiali 20001:20001 -n istio-system >/dev/null 2>&1 &


# 将 minikube cli所在机器的5000端口转发至service/registry 的80cluster端口,它会帮我们转发至内部的registry的5000端口
nohup kubectl port-forward --namespace kube-system service/registry 5000:80 >/dev/null 2>&1 &

# 镜像 build tag  localhost:5000/{name}:{tag}
zx docker-build.mjs --repo localhost --port 5000 --version v1

# helm里面的镜像地址改成localhost:5000/{name}:{tag}
helm install -f devops/helm/metacloud-workflow/values.yaml  metacloud-stack devops/helm/metacloud-workflow/


