import type {
  ComponentRenderProxy,
  EmitsOptions,
  PropType as VuePropType,
  SetupContext,
  VNode,
  VNodeChild,
} from 'vue'

declare global {
  // vue
  declare type PropType<T> = VuePropType<T>
  declare type VueNode = VNodeChild | JSX.Element

  export type Writable<T> = {
    -readonly [P in keyof T]: T[P]
  }
  declare type Nullable<T> = T | null
  declare type NonNullable<T> = T extends null | undefined ? never : T
  declare type Recordable<T = any> = Record<string, T>
  declare type Key = string | number
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T
  }
  declare type Indexable<T = any> = {
    [key: string]: T
  }
  declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
  }

  declare type TimeoutHandle = ReturnType<typeof setTimeout>
  declare type IntervalHandle = ReturnType<typeof setInterval>

  declare interface ChangeEvent extends Event {
    target: HTMLInputElement
  }

  declare interface WheelEvent {
    path?: EventTarget[]
  }
  declare function parseInt(s: string | number, radix?: number): number

  declare function parseFloat(string: string | number): number

  declare type EmitFn<E = EmitsOptions> = SetupContext<E>['emit']

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy
    interface ElementAttributesProperty {
      $props: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
    interface IntrinsicAttributes {
      [elem: string]: any
    }
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}
