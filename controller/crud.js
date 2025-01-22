import Template from "../schema/template.js";
export const sendTemplate = async (req, res) => {
  try {
    const {id}=req.params;
    const template = await Template.findOne({ id: id });

    if (template) {
      // If the template is found, send it in the response
      return res
        .status(200)
        .json({ message: "Send successful", template:template });
    }
    res.status(404).json({ message: "Template not found" });

  } catch (error) {
    res.status(404).json({ message: "Server is not responding" });
  }
};

export const saveTemplate = async (req, res) => {
    try {
      const { id } = req.params; // Extract the template ID from the request parameters
      const { currentTemplate } = req.body; // Extract the template data from the request body
  
      // Check if the template exists
      const existingTemplate = await Template.findOne({ id: id });
      if (existingTemplate) {
        // Replace the existing template
        const updateResult = await Template.replaceOne({ id: id }, currentTemplate);
        if (updateResult.acknowledged) {
          return res
            .status(200)
            .json({ message: "Template updated successfully", currentTemplate });
        } else {
          return res.status(500).json({ message: "Failed to update template" });
        }
      }
  
      // If the template does not exist, create a new one
      const newTemplate = new Template(template);
      await newTemplate.save();
  
      return res
        .status(201)
        .json({ message: "Template saved successfully", newTemplate });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  export const saveNewTemplate = async (req, res) => {
    try {
      const { currentTemplate } = req.body; // Extract the new template data from the request body
  
      // Check if a template with the same ID already exists
      const existingTemplate = await Template.findOne({ id: currentTemplate.id });
      if (existingTemplate) {
        return res.status(400).json({ message: "Template with this ID already exists" });
      }
  
      // Use Template.create to create a new template entry in the database
      const createdTemplate = await Template.create(currentTemplate);
  
      return res.status(201).json({
        message: "New template created successfully",
        createdTemplate,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  