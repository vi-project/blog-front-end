import presetAttributify from "@unocss/preset-attributify";
import presetUno from "@unocss/preset-uno";
import {defineConfig, presetIcons} from "unocss";

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            collections: {
                tabler: () => import('@iconify-json/tabler').then((i) => i.icons as any)
            }
        })
    ],
});
