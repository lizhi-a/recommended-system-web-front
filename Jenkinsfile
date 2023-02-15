podTemplate(inheritFrom: "node-16") {
    node(POD_LABEL){
        gitlabBuilds(builds: ["checkout", "build", "docker"]) {
        stage('checkout') {
            checkout scm
            env.WORKSPACE = pwd()
            if (BUILD_ENV == "release") {
              env.APP_VERSION = 'release-' + sh(returnStdout: true,
                script: "cat package.json | grep version | head -1 | awk -F: '{ print \$2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]'")
            } else {
              env.APP_VERSION = "default"
            }
            env.DOCKER_HOST = "tcp://dm0.nroad.com.cn:2375"
            env.REGISTRY = "harbor.nroad.com.cn/osp"
            env.IMAGE = "xjtu-vdp-customer-web"
        }

        stage('build') {
            container('node-16') {
                sh "yarn install"
                sh "yarn build"
                sh "cp package.json ${env.WORKSPACE}/dist/"
                sh "cp nginx.conf ${env.WORKSPACE}/dist/"
                sh "cp default.conf ${env.WORKSPACE}/dist/"
                sh "ls ${env.WORKSPACE}/dist"
            }
        }

        stage('docker') {
            container('docker') {
                sh "docker --host ${env.DOCKER_HOST} build \
                           --file ${env.WORKSPACE}/Dockerfile \
                           --tag ${env.REGISTRY}/${env.IMAGE}:${env.APP_VERSION} \
                            ${env.WORKSPACE}/dist/"
                sh '''echo azp9oaJ7vfJhZpTsoUH4J64s7rdQUy8e | docker login --username robot\\$ci --password-stdin harbor.nroad.com.cn'''
                sh "docker --host ${env.DOCKER_HOST} push ${env.REGISTRY}/${env.IMAGE}:${env.APP_VERSION}"
            }
        }

    }
    }
}
