import { Component } from 'solid-js';
import { Course } from '~/types/course';
import {
  BiRegularBookContent,
  BiRegularExpand,
  BiRegularLeftArrowCircle,
  BiRegularReset,
  BiSolidBookContent,
} from 'solid-icons/bi';

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
        <i class="link">
          <BiRegularLeftArrowCircle class="cursor-pointer" onClick={props.onBackClick} />
        </i>
        <i class="link" onClick={props.onCatalogueVisibleClick}>
          {props.catalogueVisible ? <BiSolidBookContent /> : <BiRegularBookContent />}
        </i>
        <i class="link">
          <BiRegularReset class="cursor-pointer" onClick={props.onResetClick} />
        </i>
      </div>
      <div class="flex-auto">
        <h1 class="font-bold text-base">{props.course?.name}</h1>
      </div>
      <div class="flex items-center text-xl space-x-4 ml-4">
        <i class="link">
          <BiRegularExpand onClick={props.onFullScreenClick} />
        </i>
      </div>
    </header>
  );
};

export default Header;
