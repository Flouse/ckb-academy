import { unstable_clientOnly } from 'solid-start';
import { CodeEditorOption } from '~/components/CodeEditor/CodeEditor';

const CodeEditor = unstable_clientOnly(() => import('~/components/CodeEditor/CodeEditor'));
export default function (props: CodeEditorOption) {
  return <CodeEditor {...props} />;
}
