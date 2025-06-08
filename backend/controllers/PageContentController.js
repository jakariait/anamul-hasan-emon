const service = require("../services/PageContentService");

const getPageContent = async (req, res) => {
  try {
    const data = await service.getPageContent();
    if (!data) return res.status(404).json({ message: "Page content not found." });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch page content.", error: error.message });
  }
};

const updatePageContent = async (req, res) => {
  try {
    const data = req.body;

    // Check if heroImage is uploaded inside req.files (because you use upload.fields)
    if (req.files && req.files.heroImage && req.files.heroImage.length > 0) {
      // Use filename only (not full path)
      data.heroImage = req.files.heroImage[0].filename;
    }

    const updated = await service.updatePageContent(data);

    if (!updated) {
      return res.status(404).json({ message: "Page content not found." });
    }

    res.status(200).json({
      message: "Page content updated successfully.",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update page content.",
      error: error.message,
    });
  }
};




const deletePageContent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deletePageContent(id);
    if (!deleted) return res.status(404).json({ message: "Page content not found." });
    res.status(200).json({ message: "Page content deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete page content.", error: error.message });
  }
};

module.exports = {
  getPageContent,
  updatePageContent,
  deletePageContent,
};
