import {
    Box,
    Card,

    styled,
    useTheme,

} from "@mui/material";
import { H5, Small } from "components/Typography";
import { FC } from "react";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
import FlexBox from "components/FlexBox";
import { NavLink } from "react-router-dom";


const data = {
    series: [
      {
        name: "Spent",
        data: [22, 80, 36, 50, 60, 30, 90, 26, 75, 10, 55, 65],
      },
    ],
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };
  




const GraphSample: FC = () => {
    const theme = useTheme();
  
    const chartOptions: ApexOptions = {
      chart: {
        background: "transparent",
        toolbar: { show: false },
      },
      colors: [theme.palette.primary.main],
      dataLabels: { enabled: false },
      // fill: { opacity: 1 },
      grid: {
        show: false,
      },
      states: {
        active: {
          filter: { type: "none" },
        },
        hover: {
          filter: { type: "none" },
        },
      },
      theme: {
        mode: theme.palette.mode,
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        categories: data.categories,
        labels: {
          style: {
            colors: theme.palette.text.disabled,
            fontFamily: theme.typography.fontFamily,
            fontWeight: 500,
          },
        },
      },
      yaxis: { show: false },
  
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: "60%",
          rangeBarOverlap: false,
        },
      },
      tooltip: {
        x: { show: false },
        y: {
          formatter: (val: number) => `$${val}`,
        },
      },
  
      responsive: [
        {
          breakpoint: 550,
          options: {
            chart: {
              height: 350,
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            xaxis: {
              labels: { show: false },
            },
            yaxis: {
              show: true,
              labels: {
                style: {
                  colors: theme.palette.text.disabled,
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: 500,
                },
              },
            },
          },
        },
      ],
    };
  
    const chartSeries = data.series;
    return (
        <Card sx={{ padding: 3 }}>
             <FlexBox justifyContent={"space-between"}>
                <H5>Graphs</H5>
                <NavLink to={{ pathname: "https://apexcharts.com/docs/react-charts/" }} target="_blank">
                    <Small color="primary.main">Docs</Small>
                </NavLink>
            </FlexBox>
            <Small color="text.disabled">
                Styled graph visuals with apex charts (react-apexcharts)
            </Small>
            <Box
                sx={{
                    "& .apexcharts-tooltip *": {
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: 500,
                    },
                    "& .apexcharts-tooltip": {
                        boxShadow: 0,
                        borderRadius: 4,
                        alignItems: "center",
                        "& .apexcharts-tooltip-text-y-value": { color: "primary.main" },
                        "& .apexcharts-tooltip.apexcharts-theme-light": {
                            border: `1px solid ${theme.palette.divider}`,
                        },
                        "& .apexcharts-tooltip-series-group:last-child": {
                            paddingBottom: 0,
                        },
                    },
                }}
            >
                <Chart
                    height={245}
                    options={chartOptions}
                    series={chartSeries}
                    type="bar"
                />
            </Box>

        </Card>
    );
};



export default GraphSample;
