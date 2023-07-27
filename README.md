# react-netron

> netron via react

- Demo https://wolanx.github.io/react-netron
- Docs https://wolanx.github.io/react-netron/docs/intro

# Intro

View Neural Network model with graphs.

## Install

```shell
# https://www.npmjs.com/package/@wolanx/react-netron
npm i @wolanx/react-netron
```

## Prepare file

- download https://github.com/onnx/models/blob/main/vision/classification/mnist/model/mnist-12.onnx

## Demo - open with button

```jsx
export default function Demo1 () {
    const ref = useRef(null)

    return (
        <div>
            <button onClick={() => ref.current?.open()}>Open Model...</button>
            <ReactOnnx ref={ref} width={'100%'} height={600} file={null}/>
        </div>
    )
}
```

## Demo - open with link

```jsx
export default function Demo2 () {
    const file = useOnnx('./model/demo.onnx')
    return <ReactOnnx width={'100%'} height={600} file={file}/>
}
```
