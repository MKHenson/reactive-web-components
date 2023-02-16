import { Component, register } from "../core/Component";
import { userStore } from "../stores/UserStore";

@register("x-store-example")
export class StoreExample extends Component {
  init() {
    return () => (
      <div>
        <h2>Store Example</h2>
        <div class="info">
          This example show cases how you can create and use a global store.
          Below we have two isolated components that both make use of the same
          store. Notice how editing the store in one affects the other.
        </div>
        <div class="col-2">
          <StoreReader />
          <StoreWriter />
        </div>
      </div>
    );
  }

  stlye() {
    return css`
      h2 {
        margin: 0 0 1rem 0;
      }

      .info {
        display: block;
        width: 400px;
        margin: 0 0 1rem 0;
      }

      .col-2 {
        display: flex;
        align-items: center;
        width: 835px;
      }

      .col-2 > * {
        flex: 1;
        margin: 0 1rem 0 0;
      }
    `;
  }
}

@register("x-store-reader")
export class StoreReader extends Component {
  init() {
    // Get a proxy to read
    const userProxy = this.observeStore(userStore);

    return () => (
      <div>
        <h4>
          The reader component is just interested in reading the store data.
        </h4>
        <div>
          <label>User's name: {userProxy.user.name}</label>
        </div>
        <div>
          <label>User's age: {userProxy.age}</label>
        </div>
        <div>
          <label>
            Is logged in:{" "}
            {userProxy.loading ? (
              <span class="loading">LOADING</span>
            ) : (
              userProxy.loggedIn
            )}
          </label>
        </div>
      </div>
    );
  }

  stlye() {
    return css`
      :host {
        display: block;
        width: 400px;
        height: 100px;
        padding: 1rem;
        background: #efefef;
        border-radius: 5px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
        margin: 1rem 0;
      }

      .loading {
        color: #5151c9;
      }

      h4 {
        margin: 0 0 1rem 0;
      }
    `;
  }
}

@register("x-store-writer")
export class StoreWriter extends Component {
  init() {
    // Get a proxy to write to
    const userProxy = this.observeStore(userStore);

    return () => (
      <div>
        <h4>The writer component can be used to edit the global</h4>
        <div>
          <label>
            Add some years directly onto the user:{" → "}
            <a href="" onclick={(e) => (userProxy.age += 1)}>
              ADD
            </a>
          </label>
        </div>
        <div>
          <label>
            Call a function on the store itself{" → "}
            <a href="" onclick={(e) => userStore.login()}>
              LOG IN
            </a>
          </label>
        </div>
      </div>
    );
  }

  stlye() {
    return css`
      :host {
        display: block;
        width: 400px;
        height: 100px;
        padding: 1rem;
        background: #efefef;
        border-radius: 5px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      }

      h4 {
        margin: 0 0 1rem 0;
      }
    `;
  }
}
