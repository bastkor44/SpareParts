groovy
pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'your_dockerhub_username/spareparts:latest'  // Replace with your Docker Hub username and image name
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the code from GitHub
                git url: 'https://github.com/bastkor44/SpareParts.git', branch: 'frontend'  // Specify the branch if necessary
            }
        }

        stage('Build Docker Image') {
            steps {
                // Build the Docker image
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Run Tests') {
            steps {
                // You can run tests inside a Docker container, if applicable
                // Example: docker.run(DOCKER_IMAGE, 'npm test')
                sh 'npm test'  // Adjust according to your test command
            }
        }

        stage('Deploy') {
            steps {
                // Push the Docker image to Docker Hub
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub_credentials_id') { // Replace with your credentials ID
                        docker.image(DOCKER_IMAGE).push()
                    }
                }
                // Optionally, deploy the container to a server or orchestrator
                // For example, using SSH to run a command on a remote server:
                // sshagent(['your-ssh-credentials-id']) {
                //     sh 'ssh user@your-server "docker run -d -p 3000:3000 your_dockerhub_username/spareparts:latest"'
                // }
            }
        }
    }

    post {
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}