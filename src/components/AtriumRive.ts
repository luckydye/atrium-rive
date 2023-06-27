import {
  css,
  html,
  HTMLTemplateResult,
  LitElement,
  PropertyValueMap,
} from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Rive } from "@rive-app/canvas-single";

/**
 *
 * Ideas here:
 * - transition between multiple riv files like stinger.
 * - canvas filters and color change
 * -
 */

@customElement("a-rive")
export class AtriumRive extends LitElement {
  public static styles = css`
    :host {
      position: relative;
    }

    canvas {
      display: block;
      width: var(--w);
      height: var(--h);
    }

    .container {
      display: contents;
    }
  `;

  protected render(): HTMLTemplateResult {
    return html`<div class="container">${this.canvas}</div>`;
  }

  @property({ type: String, reflect: true }) public src?: string;
  @property({ type: Number, reflect: true }) public width?: number = 600;
  @property({ type: Number, reflect: true }) public height?: number = 600;
  @property({ type: String, reflect: true }) public stateMachine?: string;
  @property({ type: Boolean, reflect: true }) public autoplay: boolean = true;

  @query(".container") container: HTMLElement;

  get activeStateMachine() {
    return this.stateMachine;
  }

  canvas: HTMLCanvasElement = document.createElement("canvas");
  bufferCanvas: HTMLCanvasElement = document.createElement("canvas");

  animations: Rive[] = [];

  get pixelRatio() {
    return devicePixelRatio || 1;
  }

  format() {
    this.canvas.width = this.width * this.pixelRatio;
    this.canvas.height = this.height * this.pixelRatio;
    this.container.style.setProperty("--w", this.width + "px");
    this.container.style.setProperty("--h", this.height + "px");
  }

  protected firstUpdated(): void {
    this.format();
  }

  protected updated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    if (_changedProperties.has("src")) {
      this.dispose(0);
      this.createAnimation(this.src, this.autoplay, this.stateMachine);
      this.format();
    }
  }

  dispose(index: number) {
    if (this.animations.length > 0) {
      this.animations[index].cleanup();
      this.animations.splice(index, 1);
    }
  }

  createAnimation(src: string, autoplay?: boolean, stateMachine?: string) {
    return new Promise((resolve) => {
      const rive = new Rive({
        canvas: this.canvas,
        src: src,
        stateMachines: stateMachine,
        autoplay: autoplay,
        onLoad: () => resolve(rive),
      });
      console.log(rive);
      this.animations.push(rive);
    });
  }

  trigger(rive: Rive, stateMachine: string, name: string) {
    const inputs = rive.stateMachineInputs(stateMachine);
    if (inputs) {
      for (const input of inputs) {
        if (input.name === name) {
          input.fire();
          break;
        }
      }
    }
  }

  transition(
    source: string,
    trigger?: string,
    duration?: number,
    offset: number = 0
  ) {
    if (trigger)
      this.trigger(this.animations[0], this.activeStateMachine, trigger);
    this.createAnimation(source, true);
  }
}
