import { Component } from 'solid-js';
import { Course } from '~/types/course';
import {
  BiRegularBookContent,
  BiRegularExpand,
  BiRegularLeftArrowCircle,
  BiRegularReset,
  BiSolidBookContent,
} from 'solid-icons/bi';
import Tooltip from '~/components/Tooltip';

interface Props {
  course?: Course;
  onBackClick?: () => void;
  onResetClick?: () => void;
  fullScreen?: boolean;
  catalogueVisible?: boolean;
  onCatalogueVisibleClick?: () => void;
  onFullScreenClick?: () => void;
}

const Header: Component<Props> = (props) => {
  return (
    <header class="flex flex-none py-6 items-center" classList={{ 'px-6': props.fullScreen }}>
      <div class="mr-8 flex items-center text-2xl space-x-4">
        <Tooltip content={'Back'}>
          <i class="link">
            <BiRegularLeftArrowCircle class="cursor-pointer" onClick={props.onBackClick} />
          </i>
        </Tooltip>
        <Tooltip content={props.catalogueVisible ? 'Collapse Catalogue' : 'Expand Catalogue'}>
          <i class="link" onClick={props.onCatalogueVisibleClick}>
            {props.catalogueVisible ? <BiSolidBookContent /> : <BiRegularBookContent />}
          </i>
        </Tooltip>
        <Tooltip content={'Relearn'}>
          <i class="link">
            <BiRegularReset class="cursor-pointer" onClick={props.onResetClick} />
          </i>
        </Tooltip>
      </div>
      <div class="flex-auto">
        <h1 class="font-bold text-base">{props.course?.name}</h1>
      </div>
      <div class="flex items-center text-xl space-x-4 ml-4">
        <Tooltip content="Full screen">
          <i class="link">
            <BiRegularExpand onClick={props.onFullScreenClick} />
          </i>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
