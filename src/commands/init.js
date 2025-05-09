import { askProjectDetails } from "../prompts/prompts.js";
import { installDependencies } from "../tasks/instalingDependecies.js";
import { setupNpm } from "../tasks/setupNpm.js";
import { setupESLintConfig } from "../tasks/setUpEslint.js";
import { setupFolderStructure } from "../tasks/setUpFolderStructure.js";
import { setupEnv } from "../tasks/setupEnv.js";
import { configureIndex } from "../tasks/configureIndex.js";
import { setupDb } from "../tasks/setupDb.js";
import { configureMulter } from "../tasks/configureMulter.js";
const project = async () => {

  try {


    const projectDetails = await askProjectDetails();

    await setupNpm(projectDetails.projectName, projectDetails.language);

    await installDependencies({ ...projectDetails });



    if (projectDetails.features.includes('eslint')) {


      await setupESLintConfig(projectDetails.language);

    }

    if (projectDetails.features.includes('multer')) {


      await configureMulter(projectDetails.language);

    }


    await setupFolderStructure(projectDetails.projectName);

    if (projectDetails.database === "MongoDB") {

      await setupDb(projectDetails.projectName, projectDetails.language);
      await configureIndex(projectDetails.projectName, projectDetails.language, projectDetails.framework, projectDetails.database);
    } else {
      await configureIndex(projectDetails.projectName, projectDetails.language, projectDetails.framework, null);
    }

    await setupEnv(projectDetails.projectName, projectDetails.language);





    return projectDetails.projectName;
  } catch (error) {
    throw error;

  }
};

export default project;
