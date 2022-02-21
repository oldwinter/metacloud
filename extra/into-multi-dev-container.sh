id=`docker ps |grep vsc-metacloud | awk '{print $1}'`
docker exec -it ${id} bash

