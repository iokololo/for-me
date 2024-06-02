import mongoose from "mongoose";

const schema = new mongoose.Schema({
  mainPageImage: { type: String, required: true },
  mainPageTitle: { type: [String], required: true },
  mainPageSubtitle: { type: [String], required: true },
  mainPageBannerLink: { type: String, required: true },
  mainPageBannerText: { type: [String], required: true },
  mainPageBannerTextSubtitle: { type: [String], required: true },
  propertyPageBannerText: { type: [String], required: true },
  propertyPageBannerTextSubtitle: { type: [String], required: true },
  propertyPageBannerLink: { type: String, required: true },
  propertyPageBannerImage: { type: String, required: true },
  showMorePageBannerText: { type: [String], required: true },
  showMorePageBannerTextSubtitle: { type: [String], required: true },
  showMorePageBannerLink: { type: String, required: true },
  SearchPageBannerTextTitle: { type: [String], required: true },
  SearchPageBannerTextSubtitle: { type: [String], required: true },
  SearchPageBannerLink: { type: String, required: true },
  SearchPageBannerImage: { type: String, required: true },
});

export default mongoose.model("Settings", schema);
