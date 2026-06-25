import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [
        // ...,
        lazyImport({
            resolvers: [
                VxeResolver({
                    libraryName: 'vxe-pc-ui'
                }),
                VxeResolver({
                    libraryName: 'vxe-table'
                })
            ]
        })
        // ...
    ]
})
