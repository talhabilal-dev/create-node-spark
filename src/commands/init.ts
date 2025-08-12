import { askProjectDetails } from "../prompts/prompts.js";
import { installDependencies } from "../tasks/instalingDependecies.js";
import { setupNpm } from "../tasks/setupNpm.js";
import { setupESLintConfig } from "../tasks/setupESLint.js";
import { setupFolderStructure } from "../tasks/setupFolderStructure.js";
import { setupEnv } from "../tasks/setupEnv.js";
import { configureIndex } from "../tasks/configureIndex.js";
import { setupMongoDb } from "../tasks/setupMongoDb.js";
import { setupSql } from "../tasks/setupSql.js";
import { configureMulter } from "../tasks/configureMulter.js";
import { ProjectDetails } from "../types/index.js";
import { logHeader, logStep, logFeature } from "../utils/logger.js";

const project = async (): Promise<string> => {

  try {

    const projectDetails: ProjectDetails = await askProjectDetails();

    logHeader("Building Your Project");

    logStep(1, 6, "Setting up npm and project structure");
    await setupNpm(projectDetails.projectName, projectDetails.language);

    logStep(2, 6, "Installing dependencies");
    // await installDependencies({ ...projectDetails });

    let stepCount = 3;
    const totalSteps = 6 + 
      (projectDetails.features.includes('eslint') ? 1 : 0) + 
      (projectDetails.features.includes('multer') ? 1 : 0) +
      (projectDetails.database !== 'none' ? 1 : 0);

    if (projectDetails.features.includes('eslint')) {
      logStep(stepCount++, totalSteps, "Configuring ESLint");
      await setupESLintConfig(projectDetails.language);
    }

    if (projectDetails.features.includes('multer')) {
      logStep(stepCount++, totalSteps, "Setting up Multer for file uploads");
      await configureMulter(projectDetails.language);
    }

    logStep(stepCount++, totalSteps, "Creating folder structure");
    await setupFolderStructure(projectDetails.projectName);

    if (projectDetails.database !== 'none') {
      logStep(stepCount++, totalSteps, `Setting up ${projectDetails.database} database`);
      
      if (projectDetails.database === 'MySQL') {
        await setupSql(projectDetails.projectName, projectDetails.language);
      }

      if (projectDetails.database === 'MongoDB') {
        await setupMongoDb(projectDetails.projectName, projectDetails.language);
      }
      await configureIndex(projectDetails.projectName, projectDetails.language, projectDetails.framework, projectDetails.database);
    } else {
      await configureIndex(projectDetails.projectName, projectDetails.language, projectDetails.framework, null);
    }

    logStep(stepCount++, totalSteps, "Setting up environment configuration");
    await setupEnv(projectDetails.projectName, projectDetails.language);

    logStep(stepCount, totalSteps, "Finalizing project setup");

    return projectDetails.projectName;
  } catch (error) {
    throw error;

  }
};

export default project;
