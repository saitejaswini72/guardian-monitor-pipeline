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
                bat 'echo Simulating release tagging'
            }
        }

        stage('Monitoring') {
            steps {
                bat 'curl --fail http://localhost:3000/api/health || exit /b 0'
            }
        }
    }
}
