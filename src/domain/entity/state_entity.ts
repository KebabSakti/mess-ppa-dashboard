interface StateEntity<T> {
  loading: boolean;
  data?: T | null;
  error?: string | null;
}

export type { StateEntity };
