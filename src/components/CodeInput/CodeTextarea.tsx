import { Component } from 'solid-js';
import { CodeInput, CodeInputProps } from '@srsholmes/solid-code-input';
import './CodeTextarea.css';

export const CodeTextarea: Component<CodeInputProps> = (props) => {
  return (
    <div class="code-textarea">
      <CodeInput {...props} />
    </div>
  );
};

export default CodeTextarea;
