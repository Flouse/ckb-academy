import { Component } from 'solid-js';
import { BiRegularCheckCircle, BiRegularChevronLeft } from 'solid-icons/bi';
import { useCourseContext } from '~/components/Course/CourseContext';

const Exercise2: Component = () => {
  const context = useCourseContext();
  return (
    <div class="">
      <h1 class="font-bold text-base mb-2">Example</h1>
      <p class="mb-4">
        Type in something as the cell data to see the real-time changes in the length of the cell.
        Click on the cell to view the cell content and the actual length of each field.
      </p>

      <p class="mb-8">
        The capacity of the cell is set as 0x1dcd65000, which is 80 bytes in size. If the change in
        data causes the actual occupancy to grow beyond the value of capacity, the cell will be
        considered invalid.
      </p>

      <input class="input mb-8 font-bold" placeholder="data: input here" />
      <div class="flex flex-col items-center justify-center mb-6">
        <div class="w-40 h-40 border-4 border-success rounded-full hover:cursor-pointer hover:bg-light-hover hover:dark:bg-dark-hover overflow-hidden text-center break-all">
          <div class="h-20 w-full flex flex-col items-center justify-center mb-2 border-b-2 border-success">
            <h6 class="text-sm font-bold mb-1">Occupancy</h6>
            <p class="text-xs">64 Bytes</p>
          </div>
          <div class="text-xs overflow-hidden">0x</div>
        </div>
      </div>
      <h1 class="font-bold text-base">Capacity Availability？</h1>
      <p class="mb-4">Please observe the changes in the data and status below. </p>
      <div class="flex bg-light-divider/50 dark:bg-dark-divider/10 text-light-secondary dark:text-dark-secondary rounded-lg items-center overflow-hidden">
        <i class="text-2xl py-5 px-4 bg-error text-white">
          <BiRegularCheckCircle />
        </i>
        <div class="px-4">
          <span class="text-sm font-medium">Capacity</span>
          <p class="text-xs">0x1dcd65000 ( shannon ) = 80 ( CKB )</p>
        </div>
        <i class="text-5xl py-2 px-1">
          <BiRegularChevronLeft />
        </i>
        <div class="px-4">
          <span class="text-sm font-medium">Actual occupancy</span>
          <p class="text-xs">61 ( CKB )</p>
        </div>
      </div>
      <div class="button button-sm mt-6" onClick={() => context.finishChapter()}>
        我已理解
      </div>
    </div>
  );
};

export default Exercise2;
