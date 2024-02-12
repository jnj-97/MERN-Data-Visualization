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

export const Country = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const [country, setCountry] = useState("other");
  const [countryList, setCountryList] = useState(false);
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
        text: country,
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

      let countriesList = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}data/countryList`
      );
      setCountryList(countriesList.data);
      console.log("countries: ", countriesList.data);
      if (countriesList.data[0] === "") setCountry("other");
      else setCountry(countryList[0]);
      setIsLoading(false);
    }
    fetchData();
    changeCountry(country);
  }, []);

  async function changeCountry(value) {
    setIsLoading(true);
    if (value == "") value = "other";
    let chartData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}data/country/${value}`
    );
    setData(chartData.data);
    console.log(chartData.data);
    setCountry(value);
    setIsLoading(false);
  }

  return (
    <>
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={1300}
          height={500}
        />
      ) : (
        <>
          <div className="flex items-start justify-between">
            <FormControl sx={{ m: 1, minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                Country
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={country}
                onChange={(e) => {
                  changeCountry(e.target.value.toLowerCase());
                }}
                autoWidth
                label="Age"
              >
                {countryList &&
                  countryList.map((c) => {
                    if (c == "")
                      return (
                        <MenuItem value="other" className="capitalize">
                          other
                        </MenuItem>
                      );
                    else
                      return (
                        <MenuItem value={c} className="capitalize">
                          {c}
                        </MenuItem>
                      );
                  })}
              </Select>
            </FormControl>
          </div>
          <div className=" grid grid-cols-1 space-y-10">
            {data && (
              <Bar
                options={options}
                data={{
                  datasets: [
                    {
                      // Add label for the dataset
                      data: data[0],

                      //{     relevance: data[0].relevance,
                      //     intensity: data[0].intensity,
                      //     likelihood: data[0].likelihood,
                      //   },
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
