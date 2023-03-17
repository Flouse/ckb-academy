// @refresh reload
import { Suspense } from 'solid-js';
import { Body, ErrorBoundary, Head, Html, Meta, Scripts, Title, useRoutes } from 'solid-start';
import '~/root.css';
import { routes } from '~/routes';
import Header from '~/components/Header';
import { AppContextProvider } from '~/AppContext';
import { StudentProvider } from '~/components/Student/StudentContext';
import ToastProvider from '~/components/Toast/ToastContext';

export default function Root() {
  const Routes = useRoutes(routes);
  return (
    <ToastProvider>
      <AppContextProvider>
        <StudentProvider>
          <Html lang="en">
            <Head>
              <Title>CKB School</Title>
              <Meta charset="utf-8" />
              <Meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Body>
              <ErrorBoundary>
                <Header />
                <Suspense>
                  <Routes />
                </Suspense>
              </ErrorBoundary>
              <Scripts />
            </Body>
          </Html>
        </StudentProvider>
      </AppContextProvider>
    </ToastProvider>
  );
}
