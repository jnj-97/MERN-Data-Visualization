import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

export const Likelihood = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const [field, setField] = useState("sector");
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Likelihood according to ${field}`,
      },
      zoom: {
        // Zoom options
        pan: {
          enabled: true,
          mode: "x",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      let chartData = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}data/likelihood`
      );
      setData(chartData.data.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="likelihood"
          width={1300}
          height={500}
        />
      ) : (
        <>
          <div className="flex items-end justify-end">
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Field
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={field}
                onChange={(e) => {
                  setField(e.target.value);
                }}
                autoWidth
                label="Age"
              >
                <MenuItem value="sector">
                  <em>Sector</em>
                </MenuItem>
                <MenuItem value="topic">Topic</MenuItem>
                <MenuItem value="insight">Insight</MenuItem>
                <MenuItem value="region">Region</MenuItem>
                <MenuItem value="start_year">Start Year</MenuItem>
                <MenuItem value="end_year">End Year</MenuItem>
                <MenuItem value="country">Country</MenuItem>
                <MenuItem value="pestle">Pestle</MenuItem>
                <MenuItem value="source">Source</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className=" grid grid-cols-1 space-y-10">
            {data && (
              <Bar
                options={options}
                data={{
                  labels: data[field].map((row) => {
                    if (row._id === "") return "other";
                    else return row._id;
                  }),
                  datasets: [
                    {
                      label: "Likelihood", // Add label for the dataset
                      data: data[field].map((row) => row.totalLikelihood),
                      backgroundColor: "rgba(255, 9, 9, 0.5)", // Add background color if needed
                      borderColor: "rgba(255, 99, 132, 1)", // Add border color if needed
                      borderWidth: 1, // Add border width if needed
                    },
                  ],
                }}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
