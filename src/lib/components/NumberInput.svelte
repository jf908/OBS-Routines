<script lang="ts">
  import { createEventDispatcher, tick } from 'svelte';

  export let value: number = 0;
  export let suffix: string = '';
  export let slider: boolean = false;
  export let step: number = 1;

  export let disabled: boolean = false;
  export let label: string = '';

  export let min: number | undefined = undefined;
  export let max: number | undefined = undefined;

  // Don't know if this prop is a good idea yet
  export let multiplier: number = 1;

  export let format: ((value: number) => string) | undefined = undefined;

  let focused = false;
  let cancel = false;
  let inputEl: HTMLInputElement;
  let el: HTMLElement;
  let sliderWidth: number;
  let dispatch = createEventDispatcher();

  let mouseDownInfo: { value: number; x: number; y: number } | null = null;
  let mouseMoved = false;

  function changeValue(val: number | string) {
    if (disabled) return;
    if (typeof val === 'string') {
      val = parseFloat(val);
    }

    if (isNaN(val)) {
      return;
    }
    if (min !== undefined && val < min) val = min;
    if (max !== undefined && val > max) val = max;
    const newValue = round(val, step);
    if (value !== newValue) {
      value = newValue;
      dispatch('input', value);
    }
  }
  function round(value: number, step: number) {
    let x = 1 / step;
    return Math.round(value * x) / x;
  }

  function onMouseDown(e: MouseEvent) {
    if (e.button !== 0) return;
    mouseDownInfo = {
      value,
      x: e.screenX,
      y: e.screenY,
    };
    mouseMoved = false;
    startGrabbing();
  }
  function onMouseUp() {
    if (mouseDownInfo && !mouseMoved) {
      onFocus();
    }
  }

  function startGrabbing() {
    function onMouseMove(e: MouseEvent) {
      mouseMoved = true;
      if (mouseDownInfo) {
        const f =
          slider && max !== undefined && min !== undefined
            ? (max - min) / sliderWidth
            : step;
        changeValue(mouseDownInfo.value + f * (e.screenX - mouseDownInfo.x));
      }
    }
    function onMouseUpGlobal(e: MouseEvent) {
      if (e.button !== 0) return;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUpGlobal);
      mouseDownInfo = null;
    }

    // el.requestPointerLock();
    // el.addEventListener('mousemove', onMouseMove);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUpGlobal);
  }

  async function onFocus() {
    if (disabled) return;
    focused = true;
    await tick();
    if (inputEl) {
      inputEl.select();
    }
  }

  function onBlur(e: FocusEvent) {
    focused = false;
    if (!cancel) {
      changeValue(
        parseFloat((e.target as HTMLInputElement).value) * multiplier
      );
      cancel = false;
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.code === 'Escape' && inputEl) {
      cancel = true;
      inputEl.blur();
    }
  }

  function decrement(e: MouseEvent) {
    if (e.button !== 0) return;
    changeValue(value - step);
  }
  function increment(e: MouseEvent) {
    if (e.button !== 0) return;
    changeValue(value + step);
  }
</script>

<div
  class="numeric w-full py-1px px-2px bg-bg b-1 b-solid b-border.dark rounded hover:bg-bg.hover"
  class:labelled={label !== ''}
  class:slider
  class:opacity-50={disabled}
  class:focus={focused}
  bind:clientWidth={sliderWidth}
  bind:this={el}
>
  {#if focused}
    <input
      class="b-0 p-0 w-full"
      bind:this={inputEl}
      type="text"
      value={value / multiplier}
      on:blur={onBlur}
      on:keydown={onKeyDown}
    />
  {:else}
    {#if !slider}
      <div
        class="incdec flex items-center h-full bg-bg hover:bg-bg.hover left-0"
        on:mousedown={decrement}
      >
        <div class="i-ph-caret-left" />
      </div>
    {/if}
    {#if label}
      <div class="absolute z-1">{label}</div>
    {/if}
    <div
      class="value bg-bg hover:bg-bg.hover"
      class:cursor-ew-resize={!disabled}
      on:mousedown={onMouseDown}
      on:mouseup={onMouseUp}
    >
      {format ? format(value) : value * multiplier}{suffix}
    </div>
    <!-- Empty focus detecting element -->
    <div tabindex={disabled ? -1 : 0} on:focus={onFocus} />
    {#if !slider}
      <div
        class="incdec flex items-center h-full bg-bg hover:bg-bg.hover right-0"
        on:mousedown={increment}
      >
        <div class="i-ph-caret-right" />
      </div>
    {/if}
  {/if}
  <!-- {#if slider && !focused}
    <div
      class="slider-background"
      style={`width: ${((value - min) / (max - min)) * 100}%`}
    />
  {/if} -->
</div>

<style>
  .numeric {
    position: relative;
    text-align: center;
    user-select: none;
    overflow: hidden; /* Hide corners of incdec */
  }

  .labelled {
    text-align: right;
  }

  .incdec {
    position: absolute;
    z-index: 2;
    top: 0;
    visibility: hidden;
  }

  .numeric:hover .incdec {
    visibility: visible;
  }

  .value {
    position: relative;
    z-index: 1;
  }

  .slider .value {
    background: 0;
  }

  /* .slider-background {
    position: absolute;
    background: var(--accent);
    height: 100%;
    top: 0;
    left: 0;
  } */
</style>
