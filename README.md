# Reactive Web Components

This project is a demonstration of how you can create reactive Web Components with a JSX syntax and Typescript static type checking. The JSX gets converted to native JS elements and the Web Components do the same with a few other key features. The project comes with a demo to learn from.

## Installation

    npm i
    npm run start

## Example Usage

```
interface Props {
  onMaxReached: () => void;
  disabled?: boolean;
  fullwidth?: boolean;
}

@register("x-button-counter")
export class ButtonCounter extends Component<Props> {
  constructor() {
    super({ props: { fullwidth: false, disabled: false } });
  }

  init() {
    const [count, setCount] = this.useState(0)

    const onClick = (e) => {
        if (count() < 10>)
            setCount(count() + 1)
        else
            this.props.onMaxReached();
    }

    return () => (
      <button disabled={this.props.disabled} onclick={onClick}>
        This button count is {count()}
      </button>
    );
  }

  stlye() {
    return css`
      :host {
        display: ${this.props.fullwidth ? "block" : "inline-block"};
      }

      button {
        padding: 1rem;
        background: #396ab8;
        color: white;
      }

      button:hover {
        background: #284b84;
      }
    `;
  }
}
```
