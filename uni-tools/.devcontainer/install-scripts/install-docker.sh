apt-get update  
apt-get install -y apt-transport-https ca-certificates curl gnupg2 lsb-release  
curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | apt-key add - 2>/dev/null  
echo "deb [arch=amd64] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list  
apt-get update
DEBIAN_FRONTEND=noninteractive apt-get install -y docker-ce-cli  --no-install-recommends  

LATEST_COMPOSE_VERSION=$(curl -sSL "https://api.github.com/repos/docker/compose/releases/latest" | grep -o -P '(?<="tag_name": ").+(?=")')  
curl -sSL "https://github.com/docker/compose/releases/download/${LATEST_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose  
chmod +x /usr/local/bin/docker-compose
# 清理现场 ，精简layer
apt-get -y autoclean
rm -rf /var/lib/apt/lists/*
