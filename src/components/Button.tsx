import { Component, register } from "../core/Component";

interface Props {
  onClick?: (e: MouseEvent) => void;
  disabled?: boolean;
  fullwidth?: boolean;
}

@register("x-button")
export class Button extends Component<Props> {
  constructor() {
    super({ props: { fullwidth: false, disabled: false } });
  }

  init() {
    return () => (
      <button disabled={this.props.disabled} onclick={this.props.onClick}>
        <slot></slot>
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
