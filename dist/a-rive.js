var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/components/AtriumRive.ts
import {
  css,
  html,
  LitElement
} from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { Rive } from "@rive-app/canvas-single";
var AtriumRive = class extends LitElement {
  constructor() {
    super(...arguments);
    this.width = 600;
    this.height = 600;
    this.autoplay = true;
    this.canvas = document.createElement("canvas");
    this.bufferCanvas = document.createElement("canvas");
    this.animations = [];
  }
  render() {
    return html`<div class="container">${this.canvas}</div>`;
  }
  get activeStateMachine() {
    return this.stateMachine;
  }
  get pixelRatio() {
    return devicePixelRatio || 1;
  }
  format() {
    this.canvas.width = this.width * this.pixelRatio;
    this.canvas.height = this.height * this.pixelRatio;
    this.container.style.setProperty("--w", this.width + "px");
    this.container.style.setProperty("--h", this.height + "px");
  }
  firstUpdated() {
    this.format();
  }
  updated(_changedProperties) {
    if (_changedProperties.has("src")) {
      this.dispose(0);
      this.createAnimation(this.src, this.autoplay, this.stateMachine);
      this.format();
    }
  }
  dispose(index) {
    if (this.animations.length > 0) {
      this.animations[index].cleanup();
      this.animations.splice(index, 1);
    }
  }
  createAnimation(src, autoplay, stateMachine) {
    return new Promise((resolve) => {
      const rive = new Rive({
        canvas: this.canvas,
        src,
        stateMachines: stateMachine,
        autoplay,
        onLoad: () => resolve(rive)
      });
      console.log(rive);
      this.animations.push(rive);
    });
  }
  trigger(rive, stateMachine, name) {
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
  transition(source, trigger, duration, offset = 0) {
    if (trigger)
      this.trigger(this.animations[0], this.activeStateMachine, trigger);
    this.createAnimation(source, true);
  }
};
AtriumRive.styles = css`
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
__decorateClass([
  property({ type: String, reflect: true })
], AtriumRive.prototype, "src", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], AtriumRive.prototype, "width", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], AtriumRive.prototype, "height", 2);
__decorateClass([
  property({ type: String, reflect: true })
], AtriumRive.prototype, "stateMachine", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], AtriumRive.prototype, "autoplay", 2);
__decorateClass([
  query(".container")
], AtriumRive.prototype, "container", 2);
AtriumRive = __decorateClass([
  customElement("a-rive")
], AtriumRive);
export {
  AtriumRive
};
//# sourceMappingURL=a-rive.js.map