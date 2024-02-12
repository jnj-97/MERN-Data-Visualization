const DataModel = require("../models/data.model");

class DataController {
  async Likelihood(req, res) {
    try {
      let sector = await DataModel.aggregate([
        {
          $group: {
            _id: "$sector",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      let topic = await DataModel.aggregate([
        {
          $group: {
            _id: "$topic",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      let insight = await DataModel.aggregate([
        {
          $group: {
            _id: "$insight",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      let region = await DataModel.aggregate([
        {
          $group: {
            _id: "$region",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      let start_year = await DataModel.aggregate([
        {
          $group: {
            _id: "$start_year",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      let end_year = await DataModel.aggregate([
        {
          $group: {
            _id: "$end_year",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      let country = await DataModel.aggregate([
        {
          $group: {
            _id: "$country",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      let pestle = await DataModel.aggregate([
        {
          $group: {
            _id: "$pestle",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);
      let source = await DataModel.aggregate([
        {
          $group: {
            _id: "$source",
            totalLikelihood: { $sum: "$likelihood" },
          },
        },
      ]);

      res.status(200).json({
        data: {
          sector,
          topic,
          insight,
          region,
          start_year,
          end_year,
          country,
          pestle,
          source,
        },
      });
    } catch (err) {
      res.status(500).json({ status: false, message: "Server error occurred" });
    }
  }
  async Intensity(req, res) {
    try {
      let sector = await DataModel.aggregate([
        {
          $group: {
            _id: "$sector",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);
      let topic = await DataModel.aggregate([
        {
          $group: {
            _id: "$topic",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);
      let insight = await DataModel.aggregate([
        {
          $group: {
            _id: "$insight",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);
      let region = await DataModel.aggregate([
        {
          $group: {
            _id: "$region",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);
      let start_year = await DataModel.aggregate([
        {
          $group: {
            _id: "$start_year",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);
      let end_year = await DataModel.aggregate([
        {
          $group: {
            _id: "$end_year",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);
      let country = await DataModel.aggregate([
        {
          $group: {
            _id: "$country",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);
      let pestle = await DataModel.aggregate([
        {
          $group: {
            _id: "$pestle",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);
      let source = await DataModel.aggregate([
        {
          $group: {
            _id: "$source",
            totalIntensity: { $sum: "$intensity" },
          },
        },
      ]);

      res.status(200).json({
        data: {
          sector,
          topic,
          insight,
          region,
          start_year,
          end_year,
          country,
          pestle,
          source,
        },
      });
    } catch (err) {
      res.status(500).json({ status: false, message: "Server error occurred" });
    }
  }

  async Relevance(req, res) {
    try {
      let sector = await DataModel.aggregate([
        {
          $group: {
            _id: "$sector",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);
      let topic = await DataModel.aggregate([
        {
          $group: {
            _id: "$topic",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);
      let insight = await DataModel.aggregate([
        {
          $group: {
            _id: "$insight",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);
      let region = await DataModel.aggregate([
        {
          $group: {
            _id: "$region",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);
      let start_year = await DataModel.aggregate([
        {
          $group: {
            _id: "$start_year",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);
      let end_year = await DataModel.aggregate([
        {
          $group: {
            _id: "$end_year",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);
      let country = await DataModel.aggregate([
        {
          $group: {
            _id: "$country",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);
      let pestle = await DataModel.aggregate([
        {
          $group: {
            _id: "$pestle",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);
      let source = await DataModel.aggregate([
        {
          $group: {
            _id: "$source",
            totalRelevance: { $sum: "$relevance" },
          },
        },
      ]);

      res.status(200).json({
        data: {
          sector,
          topic,
          insight,
          region,
          start_year,
          end_year,
          country,
          pestle,
          source,
        },
      });
    } catch (err) {
      res.status(500).json({ status: false, message: "Server error occurred" });
    }
  }
  async Year(req, res) {
    let start_year = req.params.start_year;
    let end_year = req.params.end_year;
    try {
      DataModel.updateMany({}, [
        { $set: { start_year: { $toInt: "$start_year" } } },
        { $set: { end_year: { $toInt: "$end_year" } } },
      ]);
      const pipeline = [
        {
          $match: {
            $and: [
              {
                start_year: {
                  $gte: parseInt(start_year),
                  $lte: parseInt(end_year),
                  $nin: ["", null],
                },
              },
              {
                end_year: {
                  $gte: parseInt(start_year),
                  $lte: parseInt(end_year),
                  $nin: ["", null],
                },
              },
            ],
          },
        },
        {
          $group: {
            _id: "$start_year",
            Relevance: { $sum: "$relevance" },
            Likelihood: { $sum: "$likelihood" },
            Intensity: { $sum: "$intensity" },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ];

      const results = await DataModel.aggregate(pipeline);
      res.status(200).json(results);
    } catch (err) {
      res.status(200).json({ status: false, message: "Server Error" });
    }
  }
  async CountryList(req, res) {
    try {
      const uniqueCountries = await DataModel.distinct("country");
      res.status(200).json(uniqueCountries);
    } catch (err) {
      console.log(err);
      res.status(200).json({ status: false, message: "Server Error" });
    }
  }
  async Countries(req, res) {
    let country = req.params.country;
    if (country == "other") country = "";
    console.log("country: ", country);
    try {
      const results = await DataModel.aggregate([
        {
          $match: { country: { $regex: new RegExp("^" + country + "$", "i") } }, // Match exact country name (case-insensitive)
        },
        {
          $group: {
            _id: "$country",
            relevance: { $sum: "$relevance" },
            intensity: { $sum: "$intensity" },
            likelihood: { $sum: "$likelihood" },
          },
        },
      ]);

      console.log("results: ", results);
      const formattedResults = results.map((result) => {
        delete result._id;
        return result;
      });
      res.status(200).json(formattedResults);
    } catch (err) {
      console.log("Error: ", err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
  async TopicList(req, res) {
    try {
      const uniqueTopics = await DataModel.distinct("topic");
      res.status(200).json(uniqueTopics);
    } catch (err) {
      console.log(err);
      res.status(200).json({ status: false, message: "Server Error" });
    }
  }
  async Topics(req, res) {
    let topic = req.params.topic;
    if (topic == "other") topic = "";
    try {
      const results = await DataModel.aggregate([
        {
          $match: { topic: { $regex: new RegExp("^" + topic + "$", "i") } }, // Match exact topic name (case-insensitive)
        },
        {
          $group: {
            _id: "$topic",
            relevance: { $sum: "$relevance" },
            intensity: { $sum: "$intensity" },
            likelihood: { $sum: "$likelihood" },
          },
        },
      ]);

      console.log("results: ", results);
      const formattedResults = results.map((result) => {
        delete result._id;
        return result;
      });
      res.status(200).json(formattedResults);
    } catch (err) {
      console.log("Error: ", err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
  async RegionList(req, res) {
    try {
      const uniqueRegions = await DataModel.distinct("region");
      res.status(200).json(uniqueRegions);
    } catch (err) {
      console.log(err);
      res.status(200).json({ status: false, message: "Server Error" });
    }
  }
  async Regions(req, res) {
    let region = req.params.region;
    if (region == "other") region = "";
    try {
      const results = await DataModel.aggregate([
        {
          $match: { region: { $regex: new RegExp("^" + region + "$", "i") } }, // Match exact topic name (case-insensitive)
        },
        {
          $group: {
            _id: "$region",
            relevance: { $sum: "$relevance" },
            intensity: { $sum: "$intensity" },
            likelihood: { $sum: "$likelihood" },
          },
        },
      ]);

      console.log("results: ", results);
      const formattedResults = results.map((result) => {
        delete result._id;
        return result;
      });
      res.status(200).json(formattedResults);
    } catch (err) {
      console.log("Error: ", err);
      res.status(500).json({ status: false, message: "Server Error" });
    }
  }
}
module.exports = DataController;
