import { askProjectDetails } from "../prompts/prompts.js";
import { installDependencies } from "../tasks/instalingDependecies.js";
import { setupNpm } from "../tasks/setupNpm.js";
import { setupESLintConfig } from "../tasks/setUpEslint.js";
import { setupFolderStructure } from "../tasks/setUpFolderStructure.js";
import { setupEnv } from "../tasks/setupEnv.js";
import { configureIndex } from "../tasks/configureIndex.js";
const project = async () => {

  try {


    const projectDetails = await askProjectDetails();

    await setupNpm(projectDetails.projectName, projectDetails.language);

    await installDependencies({ ...projectDetails });


    if (projectDetails.features.includes('eslint')) {


      await setupESLintConfig(projectDetails.language);

    }

    await setupFolderStructure(projectDetails.projectName);

    await setupEnv(projectDetails.projectName, projectDetails.language);

    await configureIndex(projectDetails.projectName, projectDetails.language, projectDetails.framework);

    return projectDetails.projectName;
  } catch (error) {
    throw error;

  }
};

export default project;
