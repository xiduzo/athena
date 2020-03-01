import { amber, grey, blue } from '@material-ui/core/colors'
import { createMuiTheme, MuiThemeProvider, Theme, fade } from '@material-ui/core/styles'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import React, { createContext, FC, ReactNode, useContext, useState } from 'react'
import * as Highcharts from 'highcharts'

interface IThemeContext {
  theme: ThemeOptions
  setTheme: (theme: ThemeOptions) => void
}

const localThemeStyle = localStorage.getItem('themeStyle') === 'dark' ? 'dark' : 'light'
const initialTheme: ThemeOptions = {
  palette: {
    primary: amber,
    secondary: grey,
    type: localThemeStyle,
  },
}

const ThemeContext = createContext<IThemeContext>({
  theme: initialTheme,
  setTheme: (_: ThemeOptions) => {},
})

const getHighchartsDarkTheme = (): Highcharts.Options => {
  const textBright = grey[50]
  return {
    colors: [
      '#a6f0ff',
      '#70d49e',
      '#e898a5',
      '#007faa',
      '#f9db72',
      '#f45b5b',
      '#1e824c',
      '#e7934c',
      '#dadfe1',
      '#a0618b',
    ],
    chart: {
      backgroundColor: grey[900],
      plotBorderColor: blue[100],
    },
    title: {
      style: {
        color: textBright,
      },
    },
    subtitle: {
      style: {
        color: textBright,
      },
    },
    xAxis: {
      gridLineColor: grey[600],
      labels: {
        style: {
          color: textBright,
        },
      },
      lineColor: grey[600],
      minorGridLineColor: grey[800],
      tickColor: grey[600],
      title: {
        style: {
          color: textBright,
        },
      },
    },
    yAxis: {
      gridLineColor: grey[600],
      labels: {
        style: {
          color: textBright,
        },
      },
      lineColor: grey[600],
      minorGridLineColor: grey[800],
      tickColor: grey[600],
      title: {
        style: {
          color: textBright,
        },
      },
    },
    tooltip: {
      backgroundColor: fade(grey[900], 0.85),
      style: {
        color: textBright,
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: textBright,
        },
        marker: {
          lineColor: grey[800],
        },
      },
      boxplot: {
        fillColor: grey[800],
      },
      candlestick: {
        lineColor: grey[50],
      },
      errorbar: {
        color: grey[50],
      },
      map: {
        nullColor: grey[800],
      },
    },
    legend: {
      backgroundColor: 'transparent',
      itemStyle: {
        color: textBright,
      },
      itemHoverStyle: {
        color: grey[50],
      },
      itemHiddenStyle: {
        color: blue[100],
      },
      title: {
        style: {
          color: grey[200],
        },
      },
    },
    credits: {
      style: {
        color: textBright,
      },
    },
    drilldown: {
      activeAxisLabelStyle: {
        color: textBright,
      },
      activeDataLabelStyle: {
        color: textBright,
      },
    },
    navigation: {
      buttonOptions: {
        symbolStroke: grey[200],
        theme: {
          fill: grey[800],
        },
      },
    },
    rangeSelector: {
      buttonTheme: {
        fill: grey[800],
        stroke: grey[900],
        style: {
          color: grey[200],
        },
        states: {
          hover: {
            fill: grey[600],
            stroke: grey[900],
            style: {
              color: textBright,
            },
          },
          select: {
            fill: grey[800],
            stroke: grey[900],
            style: {
              color: textBright,
            },
          },
        },
      },
      inputBoxBorderColor: grey[800],
      inputStyle: {
        backgroundColor: grey[800],
        color: textBright,
      },
      labelStyle: {
        color: textBright,
      },
    },
    navigator: {
      handles: {
        backgroundColor: grey[700],
        borderColor: grey[400],
      },
      outlineColor: grey[200],
      maskFill: fade(blue[100], 0.2),
      series: {
        color: blue[500],
        lineColor: blue[100],
      },
      xAxis: {
        gridLineColor: grey[800],
      },
    },
    scrollbar: {
      barBackgroundColor: grey[500],
      barBorderColor: grey[500],
      buttonArrowColor: grey[200],
      buttonBackgroundColor: blue[100],
      buttonBorderColor: blue[100],
      rifleColor: grey[50],
      trackBackgroundColor: grey[800],
      trackBorderColor: grey[800],
    },
  }
}

const getHighchartsLightTheme = () => {
  console.log(Highcharts.defaultOptions)
  // return Highcharts.defaultOptions
  return {
    ...Highcharts.defaultOptions,
    colors: [
      '#5f98cf',
      '#434348',
      '#49a65e',
      '#f45b5b',
      '#708090',
      '#b68c51',
      '#397550',
      '#c0493d',
      '#4f4a7a',
      '#b381b3',
    ],
    navigator: {
      series: {
        color: '#5f98cf',
        lineColor: '#5f98cf',
      },
    },
  }
}

const useThemeHandler = () => {
  const [ theme, setNewTheme ] = useState<ThemeOptions>(initialTheme)
  console.log(Highcharts.getOptions())

  const setTheme = (newTheme: ThemeOptions) => {
    if (newTheme.palette) {
      localStorage.setItem('themeStyle', newTheme.palette.type as string)
      console.log(newTheme.palette.type)
      setHighChart(newTheme.palette.type)
    }
    console.log(Highcharts.getOptions())
    setNewTheme(newTheme)
  }

  const setHighChart = (themeType?: string) => {
    themeType && Highcharts.setOptions(themeType === `dark` ? getHighchartsDarkTheme() : getHighchartsLightTheme())
  }

  return { theme, setTheme, setHighChart }
}

const { Provider } = ThemeContext

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, setTheme, setHighChart } = useThemeHandler()

  // Mui theme
  const generateTheme = (options: ThemeOptions): Theme => createMuiTheme(options)

  // Highcharts theme
  setHighChart(localThemeStyle)

  return (
    <Provider value={{ theme, setTheme }}>
      <MuiThemeProvider theme={generateTheme(theme)}>{children}</MuiThemeProvider>
    </Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
