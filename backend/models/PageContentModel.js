const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    heroContent: [{ type: String, required: true }],
    heroImage: { type: String, required: true },
    socialLinks: {
      linkedin: { type: String, required: true },
      facebook: { type: String, required: true },
      youtube: { type: String, required: true },
      tiktok: { type: String, required: true },
      instagram: { type: String, required: true },
    },
    stats: {
      happyClients: { type: Number, default: 0 },
      projectCompleted: { type: Number, default: 0 },
      yearsExperience: { type: Number, default: 0 },
      adSpend: { type: Number, default: 0 },
    },
    services: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        iconName: { type: String },
      },
    ],
    toolsIUse: [
      {
        title: { type: String, required: true },
        iconName: { type: String, required: true },
        items: [{ type: String, required: true }],
      },
    ],
    howIwork: [
      {
        title: { type: String, required: true },
        whatTheyWant: { type: String, required: true },
        whatIDeliver: { type: String, required: true },
      },
    ],

    workingProcess: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],

    plans: {
      monthly: [
        {
          title: String,
          price: String,
          isHighlighted: Boolean,
          highlights: [String],
        },
      ],
      project: [
        {
          title: String,
          price: String,
          isHighlighted: Boolean,
          highlights: [String],
        },
      ],
    },

  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const PageContentModel = mongoose.model("PageContent", DataSchema);
module.exports = PageContentModel;
