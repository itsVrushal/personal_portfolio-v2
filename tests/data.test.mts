import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { skills, experience, projects, achievements, personalInfo, education } from "../lib/data.ts";

describe("Portfolio Data Integrity & Structure Validation", () => {
  it("contains complete personal info and education", () => {
    assert.equal(personalInfo.name, "Vrushal Patil");
    assert.ok(personalInfo.email.includes("@"));
    assert.ok(personalInfo.github.length > 0);
    assert.ok(education.institution.length > 0);
  });

  it("contains non-empty skills with all expected domain clusters", () => {
    assert.ok(skills.languages.length > 0, "Languages should not be empty");
    assert.ok(skills.agentic_ai.length > 0, "Agentic AI skills should not be empty");
    assert.ok(skills.ml_vision.length > 0, "ML & Vision skills should not be empty");
    assert.ok(skills.mlops_infra.length > 0, "MLOps & Infra skills should not be empty");
    assert.ok(skills.databases_vectors.length > 0, "Databases & Vectors should not be empty");
    assert.ok(skills.backend_networking.length > 0, "Backend skills should not be empty");
    assert.ok(skills.web_interfaces.length > 0, "Web & Interfaces should not be empty");
  });

  it("validates that all experiences have required fields", () => {
    assert.ok(experience.roles.length > 0, "Experiences should have at least 1 item");
    for (const exp of experience.roles) {
      assert.ok(exp.role.length > 0, "Role must be non-empty");
      assert.ok(exp.company.length > 0, "Company must be non-empty");
      assert.ok(exp.period.length > 0, "Period must be non-empty");
      assert.ok(Array.isArray(exp.description) && exp.description.length > 0, "Description must be non-empty array");
    }
  });

  it("validates that all projects have complete metadata", () => {
    assert.ok(projects.length > 0, "Projects should have at least 1 item");
    for (const proj of projects) {
      assert.ok(proj.name.length > 0, "Project name must be non-empty");
      assert.ok(proj.category.length > 0, "Project category must be non-empty");
      assert.ok(Array.isArray(proj.tech) && proj.tech.length > 0, "Project tech must be non-empty array");
      assert.ok(Array.isArray(proj.description) && proj.description.length > 0, "Project description must be non-empty array");
    }
  });

  it("validates that all achievements are properly formed non-empty strings", () => {
    assert.ok(achievements.length > 0, "Achievements should have at least 1 item");
    for (const ach of achievements) {
      assert.equal(typeof ach, "string", "Each achievement should be a string");
      assert.ok(ach.trim().length > 0, "Achievement text must not be whitespace");
    }
  });
});
