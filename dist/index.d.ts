import * as lit from 'lit';
import { LitElement, HTMLTemplateResult, PropertyValueMap } from 'lit';
import { Rive } from '@rive-app/canvas-single';

/**
 *
 * Ideas here:
 * - transition between multiple riv files like stinger.
 * - canvas filters and color change
 * -
 */
declare class AtriumRive extends LitElement {
    static styles: lit.CSSResult;
    protected render(): HTMLTemplateResult;
    src?: string;
    width?: number;
    height?: number;
    stateMachine?: string;
    autoplay: boolean;
    container: HTMLElement;
    get activeStateMachine(): string;
    canvas: HTMLCanvasElement;
    bufferCanvas: HTMLCanvasElement;
    animations: Rive[];
    get pixelRatio(): number;
    format(): void;
    protected firstUpdated(): void;
    protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void;
    dispose(index: number): void;
    createAnimation(src: string, autoplay?: boolean, stateMachine?: string): Promise<unknown>;
    trigger(rive: Rive, stateMachine: string, name: string): void;
    transition(source: string, trigger?: string, duration?: number, offset?: number): void;
}

export { AtriumRive };
