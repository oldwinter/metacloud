KUBECTL_VERSION="${1:-"latest"}"
HELM_VERSION="${2:-"latest"}"

id=`docker ps |grep vsc-metacloud | awk '{print $1}'`
docker exec -it ${id} bash

