<script lang="ts">
import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import Icon from "@iconify/svelte";
import { getDefaultHue, getHue, setHue, getChroma, setChroma } from "@utils/setting-utils";

let hue = getHue();
let chroma = getChroma();
const defaultHue = getDefaultHue();

function resetHue() {
	hue = getDefaultHue();
	chroma = 0.14;
}

$: if (hue || hue === 0) {
	setHue(hue);
}
$: if (chroma || chroma === 0) {
	setChroma(chroma);
}
</script>

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-80 right-4 px-4 py-4">
    <div class="flex flex-row gap-2 mb-3 items-center justify-between">
        <div class="flex gap-2 font-bold text-lg text-neutral-900 dark:text-neutral-100 transition relative ml-3
            before:w-1 before:h-4 before:rounded-md before:bg-[var(--primary)]
            before:absolute before:-left-3 before:top-[0.33rem]"
        >
            {i18n(I18nKey.themeColor)}
            <button aria-label="Reset to Default" class="btn-regular w-7 h-7 rounded-md  active:scale-90 will-change-transform"
                    class:opacity-0={hue === defaultHue} class:pointer-events-none={hue === defaultHue} on:click={resetHue}>
                <div class="text-[var(--btn-content)]">
                    <Icon icon="fa6-solid:arrow-rotate-left" class="text-[0.875rem]"></Icon>
                </div>
            </button>
        </div>
        <div class="flex gap-1">
            <div id="hueValue" class="transition bg-[var(--btn-regular-bg)] w-10 h-7 rounded-md flex justify-center
            font-bold text-sm items-center text-[var(--btn-content)]">
                {hue}
            </div>
        </div>
    </div>
    <div class="w-full h-6 px-1 bg-[oklch(0.80_0.10_0)] dark:bg-[oklch(0.70_0.10_0)] rounded select-none">
        <input aria-label={i18n(I18nKey.themeColor)} type="range" min="0" max="360" bind:value={hue}
               class="slider" id="colorSlider" step="5" style="width: 100%">
    </div>
    <div class="flex flex-wrap gap-3 mt-4 px-1 justify-center">
        {#each [
            {h: 250, c: 0, name: 'Black'}, 
            {h: 10, c: 0.25, name: 'Strong Red'}, 
            {h: 250, c: 0.14, name: 'Default'},
            {h: 340, c: 0.2, name: 'Rose'},
            {h: 180, c: 0.2, name: 'Teal'},
            {h: 30, c: 0.2, name: 'Orange'},
            {h: 120, c: 0.15, name: 'Green'},
            {h: 280, c: 0.15, name: 'Purple'}
        ] as p}
            <button
                class="w-6 h-6 rounded-full border-2 border-white/50 hover:scale-110 hover:border-white transition-all shadow-sm"
                class:!border-white={hue === p.h && chroma === p.c}
                class:ring-2={hue === p.h && chroma === p.c}
                class:ring-[var(--primary)]={hue === p.h && chroma === p.c}
                style="background-color: oklch(0.70 {p.c} {p.h})"
                on:click={() => { hue = p.h; chroma = p.c; }}
                title={p.name}
                aria-label="Set theme to {p.name}"
            ></button>
        {/each}
    </div>
</div>


<style lang="stylus">
    #display-setting
      input[type="range"]
        -webkit-appearance none
        height 1.5rem
        background-image var(--color-selection-bar)
        transition background-image 0.15s ease-in-out

        /* Input Thumb */
        &::-webkit-slider-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-moz-range-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          border-width 0
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

        &::-ms-thumb
          -webkit-appearance none
          height 1rem
          width 0.5rem
          border-radius 0.125rem
          background rgba(255, 255, 255, 0.7)
          box-shadow none
          &:hover
            background rgba(255, 255, 255, 0.8)
          &:active
            background rgba(255, 255, 255, 0.6)

</style>
