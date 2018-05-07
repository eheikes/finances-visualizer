// There are no built-in or DT types for react-highcharts.
// See https://github.com/kirjs/react-highcharts/issues/387
declare module 'react-highcharts' {
  let ReactHighcharts: any
  export = ReactHighcharts
}
