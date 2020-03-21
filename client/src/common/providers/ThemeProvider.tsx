import { amber as primaryColor, grey as secondaryColor, deepPurple, teal, pink, lime } from '@material-ui/core/colors'
import { createMuiTheme, MuiThemeProvider, Theme, fade, lighten, darken } from '@material-ui/core/styles'
import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme'
import React, { createContext, FC, ReactNode, useContext, useState, useEffect, useCallback } from 'react'
import * as Highcharts from 'highcharts'
import { useMediaQuery } from '@material-ui/core'
import { isNull } from 'util'
import { useDispatch } from 'react-redux'
import { DispatchAction } from 'src/lib/redux/rootReducer'
import { GlobalActions, IGlobalState } from 'src/lib/redux/globalReducer'
import { getLocalItem } from '../utils/offlineManager'

interface IThemeContext {
  theme: ThemeOptions
  setTheme: (theme: ThemeOptions) => void
}

type ThemeType = 'dark' | 'light'
const localValue = getLocalItem<IGlobalState>(`IGlobalState`)
const localThemeType = !isNull(localValue) ? localValue.themeType as ThemeType : undefined

const initialTheme: ThemeOptions = {
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    type: localThemeType,
  },
}

const ThemeContext = createContext<IThemeContext>({
  theme: initialTheme,
  setTheme: (_: ThemeOptions) => {},
})

const generateTheme = (options: ThemeOptions): Theme => createMuiTheme(options)

const generateHighchartsTheme = (theme: Theme): Highcharts.Options => {
  const isDarkMode = theme.palette.type === 'dark' ? true : false
  const textColor = theme.palette.text.primary
  const lineColor = isDarkMode
    ? lighten(theme.palette.background.paper, 0.3)
    : darken(theme.palette.background.paper, 0.3)
  const strokeColor = isDarkMode
    ? darken(theme.palette.background.paper, 0.3)
    : lighten(theme.palette.background.paper, 0.3)
  const fillColor = isDarkMode
    ? darken(theme.palette.background.paper, 0.2)
    : lighten(theme.palette.background.paper, 0.2)
  const highlightColor = theme.palette.primary.main

  return {
    colors: [
      // Main
      theme.palette.primary.main,
      theme.palette.secondary.main,
      theme.palette.info.main,
      theme.palette.error.main,
      theme.palette.success.main,
      // Others
      deepPurple[500],
      teal[500],
      pink[500],
      lime[500],
      // too conflicting with main theme
      theme.palette.warning.main,
    ],
    chart: {
      backgroundColor: theme.palette.background.paper,
      plotBorderColor: theme.palette.info.light,
      type: 'spline',
    },
    title: {
      style: {
        color: textColor,
      },
    },
    subtitle: {
      style: {
        color: textColor,
      },
    },
    xAxis: {
      gridLineColor: lineColor,
      labels: {
        style: {
          color: textColor,
        },
      },
      lineColor: lineColor,
      minorGridLineColor: isDarkMode ? darken(lineColor, 0.2) : lighten(lineColor, 0.2),
      tickColor: lineColor,
      title: {
        style: {
          color: textColor,
        },
      },
    },
    yAxis: {
      gridLineColor: lineColor,
      labels: {
        style: {
          color: textColor,
        },
      },
      lineColor: lineColor,
      minorGridLineColor: isDarkMode ? darken(lineColor, 0.2) : lighten(lineColor, 0.2),
      tickColor: lineColor,
      title: {
        style: {
          color: textColor,
        },
      },
    },
    tooltip: {
      shared: true,
      backgroundColor: fade(theme.palette.background.paper, 0.75),
      style: {
        color: textColor,
      },
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: textColor,
        },
        marker: {
          lineColor: lineColor,
        },
      },
      boxplot: {
        fillColor: fillColor,
      },
      candlestick: {
        lineColor: lineColor,
      },
      errorbar: {
        color: lineColor,
      },
      map: {
        nullColor: fillColor,
      },
      spline: { lineWidth: 5, marker: { symbol: 'circle' } },
    },
    legend: {
      backgroundColor: 'transparent',
      itemStyle: {
        color: textColor,
      },
      itemHoverStyle: {
        color: isDarkMode ? lighten(lineColor, 0.5) : darken(lineColor, 0.5),
      },
      itemHiddenStyle: {
        color: fade(highlightColor, 0.2),
      },
      title: {
        style: {
          color: textColor,
        },
      },
    },
    credits: {
      style: {
        color: textColor,
      },
    },
    drilldown: {
      activeAxisLabelStyle: {
        color: textColor,
      },
      activeDataLabelStyle: {
        color: textColor,
      },
    },
    navigation: {
      buttonOptions: {
        symbolStroke: strokeColor,
        theme: {
          fill: fillColor,
        },
      },
    },
    rangeSelector: {
      buttonTheme: {
        fill: fillColor,
        stroke: strokeColor,
        style: {
          color: textColor,
        },
        states: {
          hover: {
            fill: lineColor,
            stroke: strokeColor,
            style: {
              color: textColor,
            },
          },
          select: {
            fill: fillColor,
            stroke: strokeColor,
            style: {
              color: textColor,
            },
          },
        },
      },
      inputBoxBorderColor: strokeColor,
      inputStyle: {
        backgroundColor: fillColor,
        color: textColor,
      },
      labelStyle: {
        color: textColor,
      },
    },
    navigator: {
      handles: {
        backgroundColor: fillColor,
        borderColor: strokeColor,
      },
      outlineColor: strokeColor,
      maskFill: fade(highlightColor, 0.2),
      series: {
        color: highlightColor,
        lineColor: fade(highlightColor, 0.2),
      },
      xAxis: {
        gridLineColor: lineColor,
      },
    },
    scrollbar: {
      barBackgroundColor: strokeColor,
      barBorderColor: strokeColor,
      buttonArrowColor: isDarkMode ? lighten(lineColor, 0.5) : darken(lineColor, 0.5),
      buttonBackgroundColor: fillColor,
      buttonBorderColor: fade(highlightColor, 0.2),
      rifleColor: isDarkMode ? lighten(lineColor, 0.5) : darken(lineColor, 0.5),
      trackBackgroundColor: fillColor,
      trackBorderColor: strokeColor,
    },
  }
}

const useThemeHandler = () => {
  const [ theme, setNewTheme ] = useState<ThemeOptions>(initialTheme)

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const dispatch = useDispatch<DispatchAction>()

  const setTheme = useCallback(
    (newTheme: ThemeOptions) => {
      if (newTheme.palette && newTheme.palette.type) {
        dispatch({
          type: GlobalActions.setThemeType,
          payload: newTheme.palette.type,
        })
      }

      // React mui
      setNewTheme(newTheme)

      // Highcharts
      setHighChart(generateTheme(newTheme))
    },
    [ dispatch ]
  )

  const setHighChart = (generatedTheme: Theme) => {
    Highcharts.setOptions(generateHighchartsTheme(generatedTheme))
  }

  useEffect(
    () => {
      if (!prefersDarkMode) return
      // Let's get the user comfortable, shall we
      const styleToUse = localThemeType ? localThemeType : prefersDarkMode ? 'dark' : 'light'
      setTheme({
        palette: {
          ...theme.palette,
          type: styleToUse,
        },
      })
    },
    [ prefersDarkMode, setTheme ] // @ts-ignore // TODO fix the inclusion of theme.palette
  )

  return { theme, setTheme, setHighChart }
}

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { Provider } = ThemeContext
  const { theme, setTheme, setHighChart } = useThemeHandler()

  // Mui theme
  const generatedTheme = generateTheme(theme)

  // Highcharts theme
  setHighChart(generatedTheme)

  return (
    <Provider value={{ theme, setTheme }}>
      <MuiThemeProvider theme={generatedTheme}>{children}</MuiThemeProvider>
    </Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
