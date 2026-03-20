const { z } = require("zod");

function buildZodSchema(schema) {
  const shape = {};

  for (const [fieldName, fieldConfig] of Object.entries(schema.fields)) {
    if (fieldConfig.type === "string") {
      let fieldSchema = z.string();

      if (fieldConfig.format === "email") {
        fieldSchema = fieldSchema.email();
      }

      shape[fieldName] = fieldSchema;
      continue;
    }

    throw new Error(`Unsupported field type: ${fieldConfig.type}`);
  }

  return z.object(shape);
}

module.exports = buildZodSchema;
