const DataModel = require("../models/data.model");

class DataController {
  async Intensity(req, res) {
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

      res
        .status(200)
        .json({
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
}
module.exports = DataController;
