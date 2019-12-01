Running from local folder:

 - Run npm install
 - Run npm start

Running from docker:

 - Run "docker build -t codefresh:latest . -f Dockerfile"
 - Once the image is ready run "docker run -v /var/run/docker.sock:/var/run/docker.sock -p 3000:3000 ContainerId"
 - Mounting the path is required for the docker api to be able to connect and listen to local machine containers
 - Port forwarding is required in order to access the api to retrive logs

Logging:

  - The code will automatically listen and log all running containers that has label logThis=true
  - The code will scan for new containers every 3 seconds

Api:
 - You can retrive logs from the following url:
   http://localhost:3000/api/v1/logs/:containerId
 - You mayb use query params offset and limit to control which rows are being retrived
 - Calling the api will retrieve rows 1-20 in the log file if no parameters are specified

Running the Demo:
  - run ./demo.sh

Scripts:
  - npm run test - no tests exists
  - npm start - starts the app
  - npm run buildDocker - builds the container
  - npm run lint - run linter
  
Please note: demoContainer folder is just for demo, not a part of the code