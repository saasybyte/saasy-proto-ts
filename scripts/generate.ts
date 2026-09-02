import fs from "fs";
import { promisify } from "util";
import { exec as _exec } from "child_process";
import fg from "fast-glob";
import path from "path";

const exec = promisify(_exec);

const OUT_DIR = "src/generated";
const PROTO_DIR = "saasy-proto/protos";
const TEMP_DIR = "temp-proto-web";

const main = async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(TEMP_DIR, { recursive: true });

  try {
    const files = await fg(`${PROTO_DIR}/**/*.proto`);
    if (files.length === 0) {
      throw new Error("No .proto files found");
    }

    const modifiedFiles: string[] = [];

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      const modifiedContent = content.replace(/import "protos\//g, 'import "');
      const relativePath = path.relative(PROTO_DIR, file);
      const tempFile = path.join(TEMP_DIR, relativePath);
      
      fs.mkdirSync(path.dirname(tempFile), { recursive: true });
      fs.writeFileSync(tempFile, modifiedContent);

      modifiedFiles.push(tempFile);
    }

    await exec(`npx pbjs -t static-module -w es6 -p ${TEMP_DIR} -o ${OUT_DIR}/bundle.js ${modifiedFiles.join(' ')}`);
    await exec(`npx pbts --no-global -o ${OUT_DIR}/bundle.d.ts ${OUT_DIR}/bundle.js`);

  } finally {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
};

main().catch((err) => {
  console.error("Failed to generate types:", err);
  process.exit(1);
});
