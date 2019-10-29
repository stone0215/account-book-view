<template>
  <div>
    <button @click="output" />
    <input
      type="file"
      @change="onChange"
    >
    <div
      id="mycanvas"
      ref="mycanvas"
    />
  </div>
</template>

<script>
import { fabric } from 'fabric'
import pdf from '../../static/pdfjs/build/pdf'

export default {
  name: 'TestPDF2Img',
  data() {
    return {
      pageList: []
    }
  },
  methods: {
    getPage(pdf, pageNumber, container, numPages) {
      // 获取pdf
      const _this = this
      pdf.getPage(pageNumber).then(page => {
        const scale = container.offsetWidth / page.view[2]
        const viewport = page.getViewport(scale)
        const canvas = document.createElement('canvas')
        canvas.id = 'mask' + pageNumber
        canvas.width = viewport.width
        canvas.height = viewport.height
        container.appendChild(canvas)
        const ctx = canvas.getContext('2d')
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        }
        page.render(renderContext).then(() => {
          const bg = canvas.toDataURL('image/jpeg')
          const fcanvas = new fabric.Canvas('mask' + pageNumber, {})
          fcanvas.setBackgroundImage(bg, fcanvas.renderAll.bind(fcanvas))
          fcanvas.setWidth(viewport.width)
          fcanvas.setHeight(viewport.height)
          const rect = new fabric.Rect({
            width: viewport.width,
            height: viewport.height / 3,
            fill: 'rgb(178, 178, 178, 1)',
            transparentCorners: false,
            cornerColor: 'rgb(178, 178, 178, 0.8)',
            strokeWidth: 1,
            cornerStrokeColor: 'black',
            borderColor: 'black',
            borderDashArray: [5, 5],
            cornerStyle: 'circle'
          })
          fcanvas.add(rect)
          fcanvas.renderAll()
          this.pageList.push(fcanvas)

          pageNumber += 1
          if (pageNumber <= numPages) {
            _this.getPage(pdf, pageNumber, container, numPages)
          }
        })
      })
    },
    onChange(event) {
      pdf.disableWorker = true
      const that = this
      const file = event.target.files[0]
      const fileReader = new FileReader()

      fileReader.onload = function() {
        // Step 4:turn array buffer into typed array
        const typedarray = new Uint8Array(this.result)

        // pdf.workerSrc = '../../static/pdfjs/build/pdf.worker'

        // Step 5:PDFJS should be able to read this
        pdf.getDocument(typedarray).promise.then(function(pdf) {
          const numPages = pdf.numPages
          const container = document.getElementById('mycanvas')
          const pageNumber = 1
          that.getPage(pdf, pageNumber, container, numPages)
        })
      }
      // Step 3:Read the file as ArrayBuffer
      fileReader.readAsArrayBuffer(file)
    },
    output() {
      const dataURL = this.pageList[0].toDataURL({
        format: `image/jpeg`,
        top: 0,
        left: 0,
        width: this.pageList[0].width,
        height: this.pageList[0].height,
        multiplier: 1
      })
      const a = document.createElement('a')
      a.href = dataURL
      a.download = `output.jpg`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      this.pageList[0].renderAll()
    }
  }
}
</script>
