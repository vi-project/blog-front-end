import presetAttributify from "@unocss/preset-attributify";
import presetUno from "@unocss/preset-uno";
import presetWebFonts from "@unocss/preset-web-fonts";
import {defineConfig, presetIcons} from "unocss";

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify(),
        presetWebFonts({
            fonts: {
                sans: 'Inter:400,600,800',
                mono: 'DM Mono',
            },
        }),
        presetIcons({
            collections: {
                tabler: () => import('@iconify-json/tabler').then((i) => i.icons as any)
            }
        })
    ],
});
