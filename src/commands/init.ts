import { askProjectDetails } from "../prompts/prompts.js";
import { installDependencies } from "../tasks/instalingDependecies.js";
import { setupNpm } from "../tasks/setupNpm.js";
import { setupESLintConfig } from "../tasks/setupESLint.js";
import { setupFolderStructure } from "../tasks/setupFolderStructure.js";
import { setupEnv } from "../tasks/setupEnv.js";
import { configureIndex } from "../tasks/configureIndex.js";
import { setupMongoDb } from "../tasks/setupMongoDb.js";
import { setupSql } from "../tasks/setupSql.js";
import { setupPostgresPrisma } from "../tasks/setupPostgresPrisma.js";
import { configureMulter } from "../tasks/configureMulter.js";
import { ProjectDetails } from "../types/index.js";
import { logHeader, logStep, logFeature, logInfo } from "../utils/logger.js";
import { CliFlags } from "../utils/cliArgs.js";

const project = async (flagBasedConfig?: Partial<ProjectDetails>, flags?: CliFlags): Promise<string> => {

  try {

    let projectDetails: ProjectDetails;

    // If we have flag-based config and --yes flag, use defaults for missing values
    if (flagBasedConfig && flags?.yes) {
      logInfo("🚀 Using flag-based configuration with defaults...");
      projectDetails = {
        projectName: flagBasedConfig.projectName || 'my-node-app',
        language: flagBasedConfig.language || 'JavaScript',
        framework: flagBasedConfig.framework || 'none',
        database: flagBasedConfig.database || 'none',
        packageManager: flagBasedConfig.packageManager || 'npm',
        features: flagBasedConfig.features || [],
      };
    }
    // If we have partial flag config, merge with interactive prompts
    else if (flagBasedConfig && Object.keys(flagBasedConfig).length > 0) {
      logInfo("🔧 Using flag-based configuration with interactive prompts for missing options...");
      projectDetails = await askProjectDetails(flagBasedConfig);
    }
    // Pure interactive mode
    else {
      projectDetails = await askProjectDetails();
    }

    logHeader("Building Your Project");

    logStep(1, 6, "Setting up npm and project structure");
    await setupNpm(projectDetails.projectName, projectDetails.language, projectDetails.packageManager);

    logStep(2, 6, "Installing dependencies");
    await installDependencies({ ...projectDetails });

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
      await configureMulter(projectDetails.language, projectDetails.packageManager);
    }

    logStep(stepCount++, totalSteps, "Creating folder structure");
    await setupFolderStructure(projectDetails.projectName);

    if (projectDetails.database !== 'none') {
      logStep(stepCount++, totalSteps, `Setting up ${projectDetails.database} database`);

      if (projectDetails.database === 'MySQL') {
        await setupSql(projectDetails.projectName, projectDetails.language, projectDetails.packageManager);
      }

      if (projectDetails.database === 'MongoDB') {
        await setupMongoDb(projectDetails.projectName, projectDetails.language, projectDetails.packageManager);
      }

      if (projectDetails.database === 'PostgreSQL') {
        await setupPostgresPrisma(projectDetails.projectName, projectDetails.language, projectDetails.packageManager, projectDetails.framework);
      }

      await configureIndex(projectDetails.projectName, projectDetails.language, projectDetails.framework, projectDetails.database);
    } else {
      await configureIndex(projectDetails.projectName, projectDetails.language, projectDetails.framework, null);
    }

    logStep(stepCount++, totalSteps, "Setting up environment configuration");
    await setupEnv(projectDetails.projectName, projectDetails.language, projectDetails.database !== 'none' ? projectDetails.database : undefined);

    logStep(stepCount, totalSteps, "Finalizing project setup");

    return projectDetails.projectName;
  } catch (error) {
    throw error;

  }
};

export default project;
