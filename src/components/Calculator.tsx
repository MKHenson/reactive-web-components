import { Component, register } from "../core/Component";
import { Button } from "./Button";

interface Props {
  initial: number;
}

@register("x-calculator")
export class Calculator extends Component<Props> {
  init() {
    const [curValue, setCurValue] = this.useState(0);

    return () => (
      <div>
        <h2>Calculator Example</h2>
        <div class="calc-body">
          <div>Calculator example that uses state to increment a value</div>
          <div>
            <label>Initial Value: {this.props.initial}</label>
          </div>
          <div>
            <label>Additional Value To Add: {curValue()}</label>
          </div>
          <div>
            <label>
              THE TOTAL IS: <b>{this.props.initial + curValue()}</b>
            </label>
          </div>
          <div>
            <Button onClick={(e) => setCurValue(curValue() + 1)}>
              Add More
            </Button>
          </div>
        </div>
      </div>
    );
  }

  stlye() {
    return css`
      .calc-body {
        display: block;
        width: 400px;
        padding: 1rem;
        background: #efefef;
        border-radius: 5px;
        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      }

      h2 {
        margin: 0 0 1rem 0;
      }

      x-button {
        margin: 1rem 0 0 0;
      }
    `;
  }
}
