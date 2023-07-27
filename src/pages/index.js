import React, { useRef } from 'react'
import clsx from 'clsx'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

import styles from './index.module.css'
import BrowserOnly from '@docusaurus/BrowserOnly'

function MyHome () {
    const mod = require('@wolanx/react-netron')
    const ReactOnnx = mod.default
    const useOnnx = mod.useOnnx

    const { siteConfig } = useDocusaurusContext()

    // https://github.com/onnx/models/blob/main/vision/classification/mnist/model/mnist-12.onnx
    const file = useOnnx('./model/demo.onnx')
    const ref = useRef(null)
    return (
        <>
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <div className="button button--secondary button--lg" onClick={() => ref.current?.open()}>Open Model...</div>
                    </div>
                </div>
            </header>
            <main>
                <ReactOnnx ref={ref} width={'100%'} height={600} file={file}/>
            </main>
        </>
    )
}

export default function Home () {
    const { siteConfig } = useDocusaurusContext()

    return (
        <Layout
            title={`Hello from ${siteConfig.title}`}
            description="Description will go into a meta tag in <head />">
            <BrowserOnly fallback={<div>Loading...</div>}>
                {MyHome}
            </BrowserOnly>
        </Layout>
    )
}
