import { CourseStore } from '~/types/course';
import { createStore } from 'solid-js/store';
import { SetStoreFunction, Store, StoreSetter } from 'solid-js/store/types/store';

export abstract class CourseStoreBase<T extends object> implements CourseStore<T> {
  private readonly store: Store<T>;
  private readonly storeSet: SetStoreFunction<T>;

  constructor() {
    const [get, set] = createStore<T>(this.initState());
    this.store = get;
    this.storeSet = set;
  }

  protected abstract initState(): T;

  get state(): T {
    return this.store;
  }

  updateState(setter: StoreSetter<T, []>) {
    this.storeSet(setter);
  }
}

export class EmptyCourseStore extends CourseStoreBase<object> {
  protected initState(): object {
    return {};
  }
}
