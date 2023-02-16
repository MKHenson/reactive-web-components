import { Component, register } from "../core/Component";
import { Route } from "../core/Route";
import { RouterProvider } from "../core/RouterProvider";
import { RouterSwitch } from "../core/RouterSwitch";
import { Calculator } from "./Calculator";
import { StoreExample } from "./StoreExample";

@register("x-application")
export class Application extends Component {
  init() {
    return () => (
      <RouterProvider>
        <div class="content">
          <div class="nav">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/calculator/5">Calculator</a>
              </li>
              <li>
                <a href="/store">Store Example</a>
              </li>
            </ul>
          </div>
          <div class="routes">
            <RouterSwitch>
              <Route
                path="/"
                onRender={() => (
                  <div>
                    <h1>Home</h1>
                    <div>Click on the links to see some examples</div>
                  </div>
                )}
              />
              <Route
                path="/calculator/:initial"
                onRender={(params) => (
                  <Calculator initial={parseInt(params.initial)} />
                )}
              />
              <Route path="/store" onRender={() => <StoreExample />} />
            </RouterSwitch>
          </div>
        </div>
      </RouterProvider>
    );
  }

  stlye() {
    return css`
      h1 {
        margin: 0 0 2rem 0;
      }

      .content {
        display: flex;
        padding: 1rem;
      }

      .nav {
        flex: 1;
      }

      .routes {
        flex: 4;
      }
    `;
  }
}
