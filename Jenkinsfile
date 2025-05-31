pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                bat 'docker build -t guardian-monitor .'
            }
        }

        stage('Test') {
            steps {
                dir('backend') {
                    bat 'npm install'
                    bat 'npm test'
                }
            }
        }

        stage('Code Quality') {
            steps {
                withSonarQubeEnv('My_Sonar_Qube') {
                    script {
                        def scannerHome = tool 'My_SonarQube_Scanner'
                        bat "\"${scannerHome}\\bin\\sonar-scanner\""
                    }
                }
            }
        }


        stage('Security') {
            steps {
                dir('backend') {
                    bat 'npm audit || exit /b 0'
                }
            }
        }

        stage('Deploy') {
            steps {
                bat 'docker run -d -p 3000:3000 --name guardian-monitor guardian-monitor'
            }
        }

        stage('Release') {
            steps {
                withCredentials([usernamePassword(credentialsId: '2a447f05-936d-4f0e-a765-d58f9464306d', usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
                    bat '''
                        git config --global user.email "saitejaswini72@gmail.com"
                        git config --global user.name "%GIT_USER%"
                        git tag -a v1.0 -m "Released v1.0 to production"
                        git push https://%GIT_USER%:%GIT_TOKEN%@github.com/saitejaswini72/guardian-monitor-pipeline.git --tags
                    '''
                }
            }
        }


        stage('Monitoring') {
            steps {
                script {
                    def healthCheck = bat(
                        script: 'curl --fail http://localhost:3000/api/health',
                        returnStatus: true
                    )
                    if (healthCheck != 0) {
                        emailext (
                            subject: "Issue in Guardian Monitor!",
                            body: "The app failed the health check on the /api/health endpoint. Please check the issue.",
                            to: "gajjisaitejaswini@gmail.com"
                        )
                        error("Health check failed! Notification sent.")
                    } else {
                        echo "App is healthy. Monitoring passed successfully!."
                     }
                }
            }
        }

    }
}
