import { Store } from "../core/Store";

interface IUserStore {
  user: {
    name: string;
  };
  loggedIn: boolean;
  loading: boolean;
  age: number;
}

class UserStore extends Store<IUserStore> {
  constructor() {
    super({
      loggedIn: false,
      user: { name: "Mathew Henson" },
      age: 36,
      loading: false,
    });
  }

  async login() {
    this.defaultProxy.loading = true;
    await this.sleep(2000);
    this.defaultProxy.loading = false;
    this.defaultProxy.loggedIn = true;
  }

  sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

export const userStore = new UserStore();
