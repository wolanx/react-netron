# react-netron

> Inspired by netron. In the react project and need to load the onnx file for display. So this project was created.

```jsx
// open with button
export default function Demo1() {
    return <ReactOnnx width={1000} height={400} openSlot={<Button>Open Model...</Button>}/>
}

// open with link
export default function Demo2() {
    const file = useOnnx('/model/ann.onnx')
    return <ReactOnnx width={1000} height={400} file={file}/>
}
```
