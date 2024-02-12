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

export const Year = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const [field, setField] = useState("Likelihood");
  const [startYear, setStartYear] = useState("2016");
  const [endYear, setEndYear] = useState("2200");
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
        text: field,
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
        `${process.env.REACT_APP_BACKEND_URL}data/year/${startYear}/${endYear}`
      );
      console.log("results: ", chartData.data);
      setData(chartData.data);
      setIsLoading(false);
    }
    fetchData();
  }, [startYear, endYear]);

  return (
    <>
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="relevance"
          width={1300}
          height={500}
        />
      ) : (
        <>
          <div className="flex items-center justify-between">
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Start Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={startYear}
                onChange={(e) => {
                  setStartYear(e.target.value);
                }}
                autoWidth
                label="Age"
              >
                <MenuItem value="2016">
                  <em>2016</em>
                </MenuItem>
                <MenuItem value="2017">2017</MenuItem>
                <MenuItem value="2018">2018</MenuItem>
                <MenuItem value="2019">2019</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
                <MenuItem value="2027">2027</MenuItem>
                <MenuItem value="2028">2028</MenuItem>
                <MenuItem value="2030">2030</MenuItem>
                <MenuItem value="2034">2034</MenuItem>
                <MenuItem value="2035">2035</MenuItem>
                <MenuItem value="2036">2036</MenuItem>
                <MenuItem value="2040">2040</MenuItem>
                <MenuItem value="2041">2041</MenuItem>
                <MenuItem value="2046">2046</MenuItem>
                <MenuItem value="2050">2050</MenuItem>
                <MenuItem value="2051">2051</MenuItem>
                <MenuItem value="2055">2055</MenuItem>
                <MenuItem value="2060">2060</MenuItem>
                <MenuItem value="2126">2126</MenuItem>
                <MenuItem value="2200">2200</MenuItem>
              </Select>
            </FormControl>
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
                <MenuItem value="Likelihood">Likelihood</MenuItem>
                <MenuItem value="Intensity">Intensity</MenuItem>
                <MenuItem value="Relevance">Relevance</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                End Year
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={endYear}
                onChange={(e) => {
                  setEndYear(e.target.value);
                }}
                autoWidth
                label="Age"
              >
                <MenuItem value="2016">
                  <em>2016</em>
                </MenuItem>
                <MenuItem value="2017">2017</MenuItem>
                <MenuItem value="2018">2018</MenuItem>
                <MenuItem value="2019">2019</MenuItem>
                <MenuItem value="2020">2020</MenuItem>
                <MenuItem value="2021">2021</MenuItem>
                <MenuItem value="2022">2022</MenuItem>
                <MenuItem value="2024">2024</MenuItem>
                <MenuItem value="2025">2025</MenuItem>
                <MenuItem value="2026">2026</MenuItem>
                <MenuItem value="2027">2027</MenuItem>
                <MenuItem value="2028">2028</MenuItem>
                <MenuItem value="2030">2030</MenuItem>
                <MenuItem value="2034">2034</MenuItem>
                <MenuItem value="2035">2035</MenuItem>
                <MenuItem value="2036">2036</MenuItem>
                <MenuItem value="2040">2040</MenuItem>
                <MenuItem value="2041">2041</MenuItem>
                <MenuItem value="2046">2046</MenuItem>
                <MenuItem value="2050">2050</MenuItem>
                <MenuItem value="2051">2051</MenuItem>
                <MenuItem value="2055">2055</MenuItem>
                <MenuItem value="2060">2060</MenuItem>
                <MenuItem value="2126">2126</MenuItem>
                <MenuItem value="2200">2200</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className=" grid grid-cols-1 space-y-10">
            {data && (
              <Bar
                options={options}
                data={{
                  labels: data.map((row) => {
                    return row._id;
                  }),
                  datasets: [
                    {
                      label: field, // Add label for the dataset
                      data: data.map((row) => row[field]),
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
