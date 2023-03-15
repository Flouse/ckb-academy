import {
  createContext,
  createEffect,
  createResource,
  createSignal,
  ParentComponent,
} from 'solid-js';
import Student from '~/components/Student/Student';
import detectEthereumProvider from '@metamask/detect-provider';

interface EthereumProvider {
  on: (event: string, listen: (data?: never) => void) => void;
  request: (params: { method: string }) => Promise<never>;
}

interface AppContextInterface {
  student: () => Student | undefined;
  join: () => void;
}

export const StudentContext = createContext<AppContextInterface>({
  student: () => undefined,
  join: () => void 0,
});

export const StudentProvider: ParentComponent = (props) => {
  const [student, setStudent] = createSignal<Student | undefined>(undefined);

  const [ethereumProvider] = createResource<EthereumProvider | undefined, unknown>(async () => {
    const res = await detectEthereumProvider();
    return res as EthereumProvider | undefined;
  });

  const [ethAccounts] = createResource<string[], EthereumProvider | undefined>(
    () => ethereumProvider(),
    async (ethereumProvider) => {
      return ethereumProvider?.request?.({ method: 'eth_accounts' }) ?? [];
    },
  );

  createEffect(() => {
    ethereumProvider()?.on('accountsChanged', (accounts?: string[]) => {
      if (accounts && accounts.length > 0) {
        setStudent(new Student(accounts[0]));
      }
    });
  });

  createEffect(() => {
    const accounts = ethAccounts();
    if (accounts && accounts.length > 0) {
      setStudent(new Student(accounts[0]));
    }
  });

  const store = () => {
    return {
      get student() {
        return student;
      },
      async join() {
        if (student() == undefined && ethereumProvider()) {
          const accounts: string[] =
            (await ethereumProvider()?.request({ method: 'eth_requestAccounts' })) ?? [];
          if (accounts && accounts.length > 0) {
            setStudent(new Student(accounts[0]));
          }
        }
      },
    };
  };

  return <StudentContext.Provider value={store()}>{props.children}</StudentContext.Provider>;
};
