import docker

class DockerClient:
    def __init__(self):
        self.client = docker.from_env()
    def build_image(self, path, tag):
        options = {
            'path': path,
            'tag': tag,
        }
        return self.client.images.build(**options)
    def run_container(self, image_name, command=None):
        return self.client.containers.run(**options)