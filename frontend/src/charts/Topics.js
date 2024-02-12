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

export const Topics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(false);
  const [topic, setTopic] = useState("other");
  const [topicList, setTopicList] = useState(false);
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
        text: topic,
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

      let topicsList = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}data/topicList`
      );
      setTopicList(topicsList.data);

      if (topicsList.data[0] === "") setTopic("other");
      else setTopic(topicsList[0]);
      setIsLoading(false);
    }
    fetchData();
    changeTopic(topic);
  }, []);

  async function changeTopic(value) {
    setIsLoading(true);
    if (value == "") value = "other";
    let chartData = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}data/topic/${value}`
    );
    setData(chartData.data);
    console.log(chartData.data);
    setTopic(value);
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
                Topic
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={topic}
                onChange={(e) => {
                  changeTopic(e.target.value.toLowerCase());
                }}
                autoWidth
                label="Age"
              >
                {topicList &&
                  topicList.map((t) => {
                    if (t == "")
                      return (
                        <MenuItem value="other" className="capitalize">
                          other
                        </MenuItem>
                      );
                    else
                      return (
                        <MenuItem value={t} className="capitalize">
                          {t}
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
