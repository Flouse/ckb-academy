import { createResource, createSignal, ParentComponent, Show, Suspense } from 'solid-js';
import HoverCard from '~/components/HoverCard';
import './index.css';
import { BiRegularBookmarks } from 'solid-icons/bi';
import { useNavigate } from '@solidjs/router';
import { keywordAnnotationList } from '~/content/keyword-annotation';

interface Props {
  id: string;
}

const AnnotationView: ParentComponent<Props> = (props) => {
  const [open, setOpen] = createSignal(false);
  const go = useNavigate();
  const [res] = createResource(
    () => open(),
    async (open) => {
      if (open) {
        try {
          const { keywordAnnotationList } = await import('~/content/keyword-annotation');
          const key = (props.id ?? props.children).toLowerCase();
          const annotation = keywordAnnotationList[key];
          const content = await annotation.content();
          return { content: content.default, url: annotation.url };
        } catch (e) {
          throw Error('Fetch data error');
        }
      }
    },
  );

  const jumpUrl = () => {
    const url = res()?.url;
    if (url === undefined) return;
    if (url.startsWith('http')) {
      window.open(url);
    } else {
      go(url);
    }
  };

  return (
    <HoverCard
      arrowSize={12}
      positioning={{ gutter: 2 }}
      class="annotation-view"
      onOpenChange={(open) => setOpen(open)}
      arrow={true}
      content={
        <div class="min-w-96 max-w-md">
          <div class="font-bold text-lg px-4 py-2 border-b border-light-border dark:border-dark-border flex items-center">
            <BiRegularBookmarks class="mr-1" />
            {props.children}
          </div>
          <div class="mx-6 my-4">
            <Suspense fallback="Loading...">
              <Show when={res.error === undefined} keyed fallback="Unable to display content">
                <article class="annotation-content">{res()?.content}</article>
              </Show>
            </Suspense>
          </div>
        </div>
      }
    >
      <div
        onClick={jumpUrl}
        class="font-bold underline decoration-dotted underline-offset-4 hover:cursor-pointer px-1"
      >
        {props.children}
      </div>
    </HoverCard>
  );
};

export default AnnotationView;
