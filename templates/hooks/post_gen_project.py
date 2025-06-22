# Create a "hooks" directory at the root of your Cookiecutter project, then add this file to it.
import os


for path, subdirs, files in os.walk("."):
    for name in files:
        if name.endswith(".j2"):
            os.rename(os.path.join(path, name), os.path.join(path, name.rstrip(".j2")))
