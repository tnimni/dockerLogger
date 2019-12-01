cd demoContainer
docker build -t logger:latest . -f Dockerfile
IMAGE_ID=`docker images --format="{{.Repository}} {{.ID}}" | 
grep "logger" | 
cut -d' ' -f2`
echo $IMAGE_ID
cd ..
docker build -t codefresh:latest . -f Dockerfile
IMAGE_ID2=`docker images --format="{{.Repository}} {{.ID}}" | 
grep "codefresh" | 
cut -d' ' -f2`
echo $IMAGE_ID2

docker run --env CLEAR_INTERVAL_TIME=10 -l logThis=true $IMAGE_ID &
docker run --env CLEAR_INTERVAL_TIME=10 -l logThis=true $IMAGE_ID &
docker run --env CLEAR_INTERVAL_TIME=10 -l logThis=true $IMAGE_ID &
docker run -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 $IMAGE_ID2
