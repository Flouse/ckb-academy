import { ICourseStore } from '~/types/course';
import { createStore } from 'solid-js/store';
import { SetStoreFunction, Store } from 'solid-js/store/types/store';

export abstract class CourseStore<T extends object> implements ICourseStore<T> {
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

  setState(state: T) {
    this.setState(state);
  }
}

export class EmptyCourseStore extends CourseStore<object> {
  protected initState(): object {
    return {};
  }
}
