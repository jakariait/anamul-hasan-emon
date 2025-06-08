const PageContentModel = require("../models/PageContentModel");

const getPageContent = async () => {
  return await PageContentModel.findOne();
};

const updatePageContent = async (data) => {
  const existing = await PageContentModel.findOne();

  if (existing) {
    return await PageContentModel.findOneAndUpdate({}, data, { new: true });
  } else {
    return await PageContentModel.create(data);
  }
};



const deletePageContent = async (id) => {
  return await PageContentModel.findByIdAndDelete(id);
};

module.exports = {
  getPageContent,
  updatePageContent,
  deletePageContent,
};
