
# 镜像起要手动执行脚本;
docker run -it --privileged -u 1000  f5d bash
/usr/local/share/docker-init.sh
minikube start
# 仓库本地

# istio https://istio.io/latest/docs/setup/getting-started/
curl -L https://istio.io/downloadIstio | sh -
cd istio-*/
export PATH=$PWD/bin:$PATH
istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled
