export const excludeExtensions = [
  '.png',
  '.jpg',
  '.bmp',
  '.pdf',
  '.zip',
  '.rar',
  '.7z',
  '.tar',
  '.gz',
  '.bz2',
  '.xz',
  '.iso',
  '.mp3',
  '.mp4',
  '.avi',
  '.mkv',
  '.flv',
  '.wmv',
  '.mov',
  '.webm',
  '.ogg',
  '.ogv',
  '.oga',
  '.ogx',
  '.spx',
  '.opus',
  '.m4a',
  '.m4v',
  '.mpg',
  '.mpeg',
  '.mpe',
  '.mp2',
  '.m2v',
  '.m4p',
  '.m4b',
  '.m4r',
  '.3gp',
  '.3g2',
  '.3gpp',
  '.3gpp2',
  '.3g',
];

type GitRepoFile = {
  name: string;
  path: string;
  doc: string;
};

type Options = {
  subPath?: string;
  apiKey?: string;
};

export const createFileTreeFromRepo = async (repo: string, options: Options) => {
  const output: GitRepoFile[] = [];
  await getFiles({ repo, options, output, basPath: options.subPath });
  return output;
};

async function getFiles(params: {
  repo: string;
  options: Options;
  output: GitRepoFile[];
  basPath?: string;
}) {
  const root = await fetch(
    `https://api.github.com/repos/${params.repo}/contents/${params.options?.subPath ?? ''}`,
  ).then((res) => res.json());
  for (const file of root) {
    switch (file.type) {
      case 'file':
        if (excludeExtensions.includes(file.name.substr(file.name.lastIndexOf('.')))) {
          continue;
        }
        params.output.push({
          name: file.name,
          path: file.path.replace(params.basPath + '/', ''),
          doc: await fetch(file.download_url).then((res) => res.text()),
        });
        break;
      case 'dir':
        await getFiles({
          repo: params.repo,
          options: { subPath: file.path, apiKey: params.options.apiKey },
          output: params.output,
          basPath: params.basPath,
        });
        break;
      case 'symlink':
      case 'submodule':
      default:
        throw new Error('Unsupported file type: ' + file.type);
    }
  }
}
