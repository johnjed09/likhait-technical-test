/**
 * Form component for adding/editing category
 */

import React from "react";
import { CategoryFormData } from "../types";
import { Button, TextField } from "../vibes";
import { useCategoryForm } from "../hooks/useCategoryForm";

interface CategoryFormProps {
  initialData?: Partial<CategoryFormData>;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
}

export function CategoryForm({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Add Category",
}: CategoryFormProps) {
  const { formData, errors, isSubmitting, handleChange, handleSubmit } =
    useCategoryForm({
      initialData,
      onSubmit,
    });

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label="Category Name"
        type="text"
        placeholder="Enter category name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        fullWidth
        required
      />

      <div style={buttonGroupStyle}>
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Submitting..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
