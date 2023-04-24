// @refresh reload
import { Suspense } from 'solid-js';
import {
  Body,
  ErrorBoundary,
  Head,
  Html,
  Link,
  Meta,
  Scripts,
  Title,
  useRoutes,
} from 'solid-start';
import '~/assets/css/root.css';
import { routes } from '~/routes';
import Header from '~/components/Header';
import { AppContextProvider } from '~/AppContext';
import ToastProvider from '~/components/Toast/ToastContext';

export default function Root() {
  const Routes = useRoutes(routes);
  return (
    <ToastProvider>
      <AppContextProvider>
        <Html lang="en">
          <Head>
            <Link href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css" />
            <Title>CKB Academy</Title>
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
      </AppContextProvider>
    </ToastProvider>
  );
}
