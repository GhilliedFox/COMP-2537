const { UserModel } = require('../models/user.model');
const { ReportModel } = require('../models/report.model');

const fetchAllReports = async (req, res) => {
  if (!req.session.isAuthenticated) res.status(403);

  //!BLOCKED: need to finalize user stucture.
  // const { uid } = req.session;

  // const user = UserModel.find({ uid });

  const reports = await ReportModel.find();

  res.status(200).json({ reports });
}

const submitReport = async (req, res) => {
  const { postId } = req.body;

  if (!postId) return res.status(400).json({
    success: false,
    msg: "postId must not be empty.",
  });

  const report = new ReportModel({postId: postId, reporterId: req.session.uid });

  await report.save();

  res.status(200).json({ postId });
};

const deleteReport = async (req, res) => {
  const { reportId } = req.body;

  if (!reportId) return res.status(400).json({
    success: false,
    msg: 'reportId must not be empty.',
  });

  try {
    await ReportModel.deleteOne({ _id: reportId });
    res.status(200).json({
      success: true,
      data: {
        msg: 'Successfully deleted report ' + reportId,
      },
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      data: {
        msg: e.message
      },
    });
  }
};

module.exports = { submitReport, fetchAllReports, deleteReport };
