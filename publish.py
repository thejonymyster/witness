import os
import zipfile
import sys
import hashlib
import subprocess

if len(sys.argv) < 2:
  print('Please specify the release version as the first argument, e.g. ./publish.py v0.1')
  exit(-1)
version = sys.argv[1]

z = zipfile.ZipFile(f'{version}.zip', 'w')
hashfile = '''# This file is automatically generated by publish.py
from application_utils import *

'''

def write(filename):
  global hashfile
  if os.path.isdir(filename):
    for f in os.listdir(filename):
      write(filename + '/' + f)
    return

  name, ext = filename.rsplit('.', 1)
  sourcemap = 'sourcemaps/' + filename.rsplit('/', 1)[-1] + '.map'

  if ext == 'js':
#    contents = subprocess.run([
#      'java', '-jar', 'closure-compiler-v20190325.jar',
#      '--js', filename,
#      '--create_source_map', sourcemap,
#      '--source_map_format', 'V3'
#    ], capture_output=True).stdout
#    contents += f'\n//# sourceMappingURL=/{sourcemap}'.encode('utf-8')
#    z.write(sourcemap)
#    z.write(filename, f'sourcemaps/{filename}')
    contents = open(filename).read()

    hash = hashlib.sha256()
    hash.update(contents)
    # TODO: figure out how to get redirects / etc working
    # hashed_filename = f'{name}-{hash.hexdigest()[:8]}.{ext}'
    z.writestr(filename, contents)

    # hashfile += f"host_redirect('/{hashed_filename}', '/{filename}')\n"
  else:
    z.write(filename)

write('application.py')
write('application_database.py')
write('application_utils.py')
write('data')
write('engine')
write('pages')
write('requirements.txt')
z.writestr('application_hashes.py', hashfile)
z.close()
