import React, { useEffect, useRef, useState } from 'react'
import { BrowserHost } from './browser'
import { View } from './view'
import css from './index.module.scss'
import { SvgMenu, SvgZoomIn, SvgZoomOut } from './icon'


export function useOnnx(url) {
    const [data, setData] = useState(null)
    useEffect(() => {
        console.log(url)
        setTimeout(async () => {
            const resp = await fetch(url)
            const blob = await resp.blob()
            setData(blob)
        }, 0)
    }, [])
    return data
}

export default function ReactOnnx({ width, height, file, openSlot }) {
    const refIns = useRef(null)
    const refFile = useRef(null)

    useEffect(() => {
        let host = new BrowserHost()
        refIns.current = new View(host)
        refIns.current?.start()
    }, [])

    useEffect(() => {
        if (file) {
            refIns.current?.openByBlob(file)
        }
    }, [file])

    function doOpen() {
        refFile.current?.click()
    }

    function doLoadByFile({ target }) {
        const files = Array.from(target.files)
        const file = files[0]
        refIns.current?.openByFile(file, files)
    }

    // onClick={doOpen}
    return (
        <>
            {openSlot && React.cloneElement(openSlot, { onClick: doOpen })}
            <input ref={refFile} type="file" multiple={false} accept=".onnx" onChange={doLoadByFile}
                   style={{ display: 'none' }}/>
            <section className={css.onnxGraph} style={{ width: width || '100%', height: height || 400 }}>
                <div id="graph" className="graph" tabIndex="0">
                    <svg id="canvas" className="canvas" preserveAspectRatio="xMidYMid meet" width="100%"
                         height="100%"></svg>
                </div>
                <div id="sidebar" className="sidebar">
                    <h1 id="sidebar-title" className="sidebar-title"></h1>
                    <a id="sidebar-closebutton" className="sidebar-closebutton" draggable="false">&times;</a>
                    <div id="sidebar-content" className="sidebar-content"></div>
                </div>
                <div id="toolbar" className="toolbar">
                    <button id="sidebar-button" className="toolbar-button" title="Model Properties">
                        <SvgMenu/>
                    </button>
                    <button id="zoom-in-button" className="toolbar-button" title="Zoom In">
                        <SvgZoomIn/>
                    </button>
                    <button id="zoom-out-button" className="toolbar-button" title="Zoom Out">
                        <SvgZoomOut/>
                    </button>
                    <button id="back-button" className="toolbar-back-button" title="Back">
                        &#x276E;
                    </button>
                    <button id="name-button" className="toolbar-name-button" title="Name"/>
                </div>
                <div id="menu" className="menu"/>
                <div id="menu-button" className="menu-button">&#9776;</div>
            </section>
        </>
    )
}
